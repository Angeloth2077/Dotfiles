(function () {
  function injectWeb3Provider() {
    const provider = new Web3Provider(new RpcChannel());
    const documentUrl = location.href;
    configureIdentity(provider, documentUrl);
    applySiteQuirks(provider, documentUrl);

    injectWeb3Shim(provider);
    window.ethereum = provider;
  }

  function defineReadOnly(obj, prop, value) {
    Object.defineProperty(obj, prop, { value, enumerable: true });
  }

  function injectWeb3Shim(provider) {
    const SHIM_MARKER = '__isMetaMaskShim__';
    if (window.web3) {
      const props = Object.keys(window.web3);
      const isProviderOnly = props.length === 1 && props[0] === 'currentProvider';
      const hasShimMarker = props.includes(SHIM_MARKER);
      const canReplaceWeb3 = isProviderOnly || hasShimMarker;
      if (!canReplaceWeb3) {
        return;
      }
    }
    const shim = { currentProvider: provider };
    defineReadOnly(shim, SHIM_MARKER, true);
    window.web3 = shim;
  }

  function applySiteQuirks(provider, documentUrl) {
    const DEFAULT_CHAIN_ID_SITES = [{ url: 'https://www.vibehub.io', defaultChainId: '0x1' }];
    const match = DEFAULT_CHAIN_ID_SITES.find(({ url }) => documentUrl.startsWith(url));
    if (match) {
      provider.chainId = match.defaultChainId;
    }
  }

  function configureIdentity(provider, documentUrl) {
    if (spoofAsMetaMask(documentUrl)) {
      defineReadOnly(provider, 'isMetaMask', true);
      defineReadOnly(provider, '_metamask', {});
      return;
    }
    defineReadOnly(provider, 'isOpera', true);
    defineReadOnly(provider, 'providerName', 'opera');
  }

  function spoofAsMetaMask(documentUrl) {
    const METAMASK_SPOOF_URL_LIST = [
      'https://app.deversifi.com',
      'https://app.hop.exchange',
      'https://app.launchpool.xyz',
      'https://beta.blockapescissors.com',
      'https://beta.curve.fi/',
      'https://coinracer.io',
      'https://cryptocars.me',
      'https://cryptoflowers.io',
      'https://cryptopioneers.co',
      'https://cryptounicorns.fun/',
      'https://curve.fi/',
      'https://etherlambos.io',
      'https://foundation.app/',
      'https://game.lordless.io',
      'https://guildfi.com',
      'https://hashelot.onrender.com',
      'https://knownorigin.io/',
      'https://market.x.immutable.com/',
      'https://matcha.xyz/',
      'https://mcp3d.com',
      'https://niftychars.com',
      'https://play.mcp3d.com',
      'https://play.pegaxy.io/',
      'https://qorpo.world/',
      'https://thedustland.com/',
      'https://unstoppabledomains.com/',
      'https://wolf.game/',
      'https://www.cryptovoxels.com/',
      'https://www.kingofeth.com',
      'https://www.larvalabs.com/cryptopunks',
      'https://www.nagemon.com/',
      'https://www.stateofthedapps.com',
      'https://www.vibehub.io',
    ];
    return !!METAMASK_SPOOF_URL_LIST.find((url) => documentUrl.startsWith(url));
  }

  function checkArguments(args, types, functionSignature) {
    const signature = `Web3Provider.${functionSignature}`;
    if (args.length !== types.length) {
      throw new TypeError(`${signature} got ${args.length} arguments`);
    }
    const TypeMap = { o: 'object', f: 'function', s: 'string' };
    for (let index = 0; index < types.length; ++index) {
      const expType = TypeMap[types.charAt(index)];
      const type = typeof args[index];
      if (type !== expType) {
        throw new TypeError(`${signature} argument ${index} got ${type}, expected ${expType}`);
      }
    }
  }

  function updateChainId(provider, chainId) {
    provider.chainId = chainId && `0x${chainId.toString(16)}` || null;
    provider.networkVersion = chainId && chainId.toString() || null;
  }

  class EventEmitter {
    _events = {};

    emit(eventName, ...args) {
      const listeners = this._events[eventName] || [];
      listeners.forEach(listener => listener.apply(this, args));
      return this;
    }
    on(eventName, listener) {
      const listeners = this._events[eventName] || [];
      this._events[eventName] = listeners.concat(listener);
      return this;
    }
    addListener(eventName, listener) {
      return this.on(eventName, listener);
    }
    off(eventName, listener) {
      const listeners = this._events[eventName];
      if (listeners) {
        const index = listeners.lastIndexOf(listener);
        if (index >= 0) {
          const newListeners = listeners.filter((_, i) => i !== index);
          if (newListeners.length) {
            this._events[eventName] = newListeners;
          } else {
            delete this._events[eventName];
          }
        }
      }
      return this;
    }
    removeListener(eventName, listener) {
      return this.off(eventName, listener);
    }
  }

  class RpcChannel extends EventEmitter {
    _port;
    _pending = {};
    _id = 0;

    connect() {
      const channel = new MessageChannel();
      window.postMessage('InitializeOperaCryptoWalletWeb3Provider', '*', [channel.port2]);

      const port = channel.port1;
      port.onmessage = (event) => this._handleResponse(event.data);
      this._port = port;
    }
    _nextId() {
      return ++this._id & 0xffffffff;
    }
    _handleResponse(response) {
      if (response.id == null) {
        this.emit(response.method, response.params);
        return;
      }
      if (!(response.id in this._pending)) {
        return;
      }
      const resolve = this._pending[response.id];
      delete this._pending[response.id];
      resolve(response);
    }
    send(request) {
      if (!request.jsonrpc) {
        request.jsonrpc = '2.0';
      }
      request.id = this._nextId();
      if (request.id in this._pending) {
        throw new Error(`Malformed request: RPC message with id ${request.id} pending`);
      }
      if (!this._port) {
        this.connect();
      }
      this._port.postMessage(request);
      return new Promise((resolve) => (this._pending[request.id] = resolve));
    }
    isConnected() {
      return !!this._port;
    }
  }

  class Web3Provider extends EventEmitter {
    _rpc;
    selectedAddress = null;
    chainId = null;
    networkVersion = null;

    constructor(rpcChannel) {
      super();
      this.enable = this.enable.bind(this);
      this.isConnected = this.isConnected.bind(this);
      this.send = this.send.bind(this);
      this.sendAsync = this.sendAsync.bind(this);
      this.request = this.request.bind(this);
      this._rpc = rpcChannel;
      this._rpc.on('op_connected', this._handleConnected.bind(this))
               .on('op_chainChanged', this._handleChainChange.bind(this))
               .on('op_accountsChanged', this._handleAccountsChange.bind(this));
      this._rpc.connect();
    }

    enable() {
      checkArguments(arguments, '', 'enable()');
      return new Promise((resolve, reject) => {
        try {
          this._rpc.send({ method: 'eth_requestAccounts' }).then((response) => {
            response.error ? reject(response.error) : resolve(response.result);
          });
        } catch {
          reject(new Error('enable() failed'));
        }
      });
    }
    isConnected() {
      checkArguments(arguments, '', 'isConnected()');
      return this._rpc.isConnected();
    }
    send(request) {
      checkArguments(arguments, 'o', 'send(request)');
      let result;
      switch (request.method) {
        case 'eth_accounts':
        case 'eth_requestAccounts':
          result = (this.selectedAddress && [this.selectedAddress]) || [];
          break;
        case 'eth_coinbase':
          result = this.selectedAddress || null;
          break;
        case 'eth_uninstallFilter':
          this._rpc.send(request);
          result = true;
          break;
        case 'net_version':
          result = this.networkVersion || null;
          break;
        default:
          throw new Error(`${request.method} not supported by synchronous send()`);
      }
      return {
        id: request.id,
        jsonrpc: request.jsonrpc,
        result,
      };
    }
    sendAsync(request, callback) {
      checkArguments(arguments, 'of', 'sendAsync(request, callback)');
      if (Array.isArray(request)) {
        if (request.length > 1) {
          const reqs = request.map(
            req => this._rpc.send(Object.assign({}, req)).then(resp => {
              resp.id = req.id;
              return resp;
            }));
          Promise.allSettled(reqs).then(
            resps => callback(undefined, resps.map(resp => resp.value)));
          return;
        }
        request = request[0];
      }
      this._rpc.send(Object.assign({}, request)).then((response) => {
        response.id = request.id;
        callback(undefined, response);
      });
    }
    request(args) {
      checkArguments(arguments, 'o', 'request(args)');
      const { method, params } = args;
      checkArguments([method], 's', 'request({method: string, ...})');
      const request = { method };
      if (params) {
        request.params = params;
      }
      return new Promise((resolve, reject) => {
        this._rpc.send(request).then((response) => {
          response.error ? reject(response.error) : resolve(response.result);
        });
      });
    }

    _handleConnected(chainId) {
      updateChainId(this, chainId);
      this.emit('connect', {chainId: this.chainId});
    }
    _handleChainChange(chainId) {
      updateChainId(this, chainId);
      this.emit('chainChanged', this.chainId);
    }
    _handleAccountsChange(accounts) {
      this.selectedAddress = accounts[0] || null;
      this.emit('accountsChanged', accounts);
    }
  }

  injectWeb3Provider();
})();
