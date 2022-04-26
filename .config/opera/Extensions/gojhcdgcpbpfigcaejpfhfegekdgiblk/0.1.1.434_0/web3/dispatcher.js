class EventEmitter {
  _events = {};

  emit(eventName, ...args) {
    const listeners = this._events[eventName] || [];
    listeners.forEach((listener) => listener.apply(this, args));
    return this;
  }
  on(eventName, listener) {
    const listeners = this._events[eventName] || [];
    this._events[eventName] = listeners.concat(listener);
    return this;
  }
}

class IPCSender extends EventEmitter {
  name;
  port;
  pending = {};
  seq = 0;

  constructor(name) {
    super();
    this.name = name;
  }
  ensureConnected() {
    if (this.port) {
      return;
    }
    this.port = chrome.runtime.connect(undefined, { name: this.name });
    this.port.onMessage.addListener(this.onRecv.bind(this));
    this.port.onDisconnect.addListener(this.onDisconnect.bind(this));
  }
  disconnect() {
    this.port?.disconnect();
    this.port = undefined;
  }
  sendRaw(msg) {
    this.ensureConnected();
    this.port.postMessage(msg);
  }
  send(op, ...params) {
    const seq = ++this.seq;
    const msg = { op, seq, params };
    this.sendRaw(msg);
  }
  sendWithReply(op, ...params) {
    const seq = ++this.seq;
    const msg = { op, seq, params };
    const replyPromise = new Promise((resolve) => {
      this.pending[seq] = resolve;
    });
    this.sendRaw(msg);
    return replyPromise;
  }
  onRecv(msg) {
    if (msg.event) {
      this.emit(msg.event, msg.data);
      return;
    }
    const callback = this.pending[msg.seq];
    delete this.pending[msg.seq];
    callback(msg.result);
  }
  onDisconnect() {
    this.port = undefined;
  }
}

class RPCCall {
  req;
  port;

  static Error = {
    INVALID_REQUEST: [
      -32600,
      'Invalid request.',
    ],
    METHOD_NOT_FOUND: [
      -32601,
      'Method not found.',
    ],
    INVALID_PARAMS: [
      -32602,
      'Invalid parameters.',
    ],
    INTERNAL_ERROR: [
      -32603,
      'Internal error.',
    ],
    RESOURCE_UNAVAILABLE: [
      -32002,
      'Resource unavailable.',
    ],
    USER_REJECTED_REQUEST: [
      4001,
      'User rejected the request.',
    ],
    UNAUTHORIZED: [
      4100,
      'The requested account and/or method has not been authorized by the user.',
    ],
    UNSUPPORTED_METHOD: [
      4200,
      'The requested method is not supported by this Ethereum provider.',
    ],
  };

  constructor(req, port) {
    this.req = req;
    this.port = port;
  }
  valid() {
    return 'method' in this.req;
  }
  rewrite(method, ...params) {
    this.req.method = method;
    this.req.params = params;
  }
  reply(data) {
    this.send(
      Object.assign(data, {
        id: this.req.id,
        jsonrpc: this.req.jsonrpc,
      }),
    );
  }
  send(data) {
    const payload = data || this.req;
    this.port.postMessage(payload);
  }
  async forwardTo(rpcUrl) {
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        body: new Blob([JSON.stringify(this.req)], { type: 'application/json; charset=utf-8' }),
      });
      if (!response.ok) {
        return this.error(RPCCall.Error.RESOURCE_UNAVAILABLE);
      }
      const reply = await response.json();
      this.port.postMessage(reply);
    } catch (e) {
      this.error(RPCCall.Error.INTERNAL_ERROR);
    }
  }
  result(result) {
    this.reply({ result });
  }
  error(errorData) {
    const [code, message] = errorData;
    this.reply({ error: { code, message } });
  }
}

function accessDenied(call) {
  return call.error(RPCCall.Error.UNAUTHORIZED);
}

function shouldRedoAccessCheck(call) {
  return call.req.method === 'eth_requestAccounts' || call.req.method === 'eth_accounts';
}

class Web3Dispatcher {
  port;
  service;
  dispatch;
  enabled;
  state = {};
  pending = [];

  constructor() {
    this.service = new IPCSender('dispatcher'); // Connects lazily.
    this.service
      .on('chainChanged', this.chainChanged.bind(this))
      .on('accountsChanged', this.accountsChanged.bind(this));
    this.dispatch = {
      eth_accounts: this.listAccounts,
      eth_chainId: this.chainId,
      eth_coinbase: this.coinbase,
      eth_requestAccounts: this.listAccounts,
      eth_sendTransaction: this.sendTransaction,
      eth_sign: this.sign,
      eth_signTransaction: this.signTransaction,
      eth_signTypedData_v3: this.signTypedData,
      eth_signTypedData_v4: this.signTypedData,
      net_version: this.netVersion,
      personal_sign: this.personalSign,
      wallet_switchEthereumChain: this.switchChain,
    };
    this.service.sendWithReply('access', true).then(this.handleEarlyAccessCheck.bind(this));
  }

  connect(port) {
    port.onmessage = (event) => this.handleRpc(event.data);
    this.port = port;
  }
  handleRpc(req) {
    const call = new RPCCall(req, this.port);
    if (!this.enabled) {
      if (shouldRedoAccessCheck(call)) {
        this.enabled = undefined;
      }
      if (typeof this.enabled === 'undefined') {
        if (!this.pending.length) {
          this.service.sendWithReply('access', false).then(this.handleAccessCheck.bind(this));
        }
        this.pending.push(call);
        return;
      }
      return accessDenied(call);
    }
    return this.handleRpcChecked(call);
  }
  handleRpcChecked(call) {
    if (!call.valid()) {
      return call.error(RPCCall.Error.INVALID_REQUEST);
    }
    // Handle locally.
    const localHandler = this.dispatch[call.req.method];
    if (localHandler) {
      return localHandler.call(this, call);
    }
    // Reject wallet_*
    if (call.req.method.startsWith('wallet_')) {
      return call.error(RPCCall.Error.UNSUPPORTED_METHOD);
    }
    // Pass through the rest.
    call.forwardTo(this.state.rpcUrl);
  }

  handleEarlyAccessCheck(allowed) {
    // If the early check was negative, clean up our connection.
    if (!allowed) {
      // The page has made some form of request, so leave the connection alone
      // (it's in use).
      if (!this.pending.length) {
        this.service.disconnect();
      }
      return;
    }
    this.handleAccessCheck(allowed);
  }
  handleAccessCheck(allowed) {
    // An access check may race with the early access check.
    if (typeof this.enabled !== 'undefined') {
      return;
    }
    this.enabled = allowed;
    if (allowed) {
      if (this.state.chainId) {
        this.notify('op_connected', this.state.chainId);
        if (this.state.accounts) {
          this.notify('op_accountsChanged', this.state.accounts);
        }
      }
    }
    const pending = this.pending;
    this.pending = [];
    const closure = allowed ? this.handleRpcChecked.bind(this) : accessDenied;
    pending.forEach(closure);
  }
  notify(method, params) {
    if (!this.enabled) {
      return;
    }
    new RPCCall({ method, params, jsonrpc: '2.0' }, this.port).send();
  }
  chainChanged(chainData) {
    this.state.chainId = chainData.chainId;
    this.state.rpcUrl = chainData.rpcUrl;
    this.notify('op_chainChanged', chainData.chainId);
  }
  accountsChanged(accounts) {
    this.state.accounts = accounts;
    this.notify('op_accountsChanged', accounts);
  }

  chainId(call) {
    call.result(`0x${this.state.chainId.toString(16)}`);
  }
  netVersion(call) {
    call.result(this.state.chainId.toString());
  }
  coinbase(call) {
    call.result(this.state.accounts[0]);
  }
  listAccounts(call) {
    call.result(this.state.accounts);
  }
  sendTransaction(call) {
    // Sign the transaction.
    this.service.sendWithReply('populateAndSignTransaction', ...call.req.params).then(
      (txdata) => {
        if (!txdata) {
          call.error(RPCCall.Error.USER_REJECTED_REQUEST);
          return;
        }
        // Send the result by rewriting the RPC command.
        call.rewrite('eth_sendRawTransaction', txdata);
        call.forwardTo(this.state.rpcUrl);
      },
      (_) => call.error(RPCCall.Error.INTERNAL_ERROR),
    );
  }
  sign(call) {
    this.service.sendWithReply('sign', ...call.req.params).then(
      (signature) => {
        if (signature) {
          call.result(signature);
        } else {
          call.error(RPCCall.Error.USER_REJECTED_REQUEST);
        }
      },
      (_) => call.error(RPCCall.Error.INTERNAL_ERROR),
    );
  }
  signTransaction(call) {
    this.service.sendWithReply('signTransaction', ...call.req.params).then(
      (signedTx) => {
        if (signedTx) {
          call.result(signedTx);
        } else {
          call.error(RPCCall.Error.USER_REJECTED_REQUEST);
        }
      },
      (_) => call.error(RPCCall.Error.INTERNAL_ERROR),
    );
  }
  signTypedData(call) {
    this.service.sendWithReply('signTypedData', ...call.req.params).then(
      (signature) => {
        if (signature) {
          call.result(signature);
        } else {
          call.error(RPCCall.Error.USER_REJECTED_REQUEST);
        }
      },
      (_) => call.error(RPCCall.Error.INTERNAL_ERROR),
    );
  }
  personalSign(call) {
    const [message, address, password] = call.req.params;
    if (password) {
      return call.error(RPCCall.Error.INVALID_PARAMS);
    }
    this.service.sendWithReply('sign', address, message).then(
      (signature) => {
        if (signature) {
          call.result(signature);
        } else {
          call.error(RPCCall.Error.USER_REJECTED_REQUEST);
        }
      },
      (_) => call.error(RPCCall.Error.INTERNAL_ERROR),
    );
  }
  switchChain(call) {
    this.service.sendWithReply('switchChain', ...call.req.params).then(
      (success) => {
        if (success) {
          call.result(null);
        } else {
          call.error(RPCCall.Error.USER_REJECTED_REQUEST);
        }
      },
      (_) => call.error(RPCCall.Error.INTERNAL_ERROR),
    );
  }
}

function acceptProviderConnection() {
  return new Promise((resolve) => {
    const acceptPort = (event) => {
      if (event.data === 'InitializeOperaCryptoWalletWeb3Provider') {
        window.removeEventListener('message', acceptPort);
        resolve(event.ports[0]);
      }
    };
    window.addEventListener('message', acceptPort);
  });
}

function injectProvider() {
  const script = document.createElement('script');
  script.onload = script.onerror = (event) => event.target.remove();
  script.src = chrome.runtime.getURL('web3/provider.js');
  (document.head || document.documentElement).appendChild(script);
}

acceptProviderConnection().then((port) => {
  const dispatcher = new Web3Dispatcher();
  dispatcher.connect(port);
});
injectProvider();
