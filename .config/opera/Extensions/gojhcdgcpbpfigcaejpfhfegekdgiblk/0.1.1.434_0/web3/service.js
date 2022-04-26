/*global chrome, opr*/

if (!Function.prototype.asPromise) {
  Object.defineProperty(Function.prototype, 'asPromise', {
    configurable: false,
    enumerable: false,
    writeable: false,
    value: function (...args) {
      const resolveIndex = args.findIndex((arg) => arg === Promise.resolve);
      const rejectIndex = args.findIndex((arg) => arg === Promise.reject);
      return new Promise((resolve, reject) => {
        const finalResolve = (...args) => {
          // Can by api call so need to catch lastError
          if (chrome && chrome.runtime && chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            // can have more than one arg then return array
            if (args.length > 1) {
              resolve(args);
            } else {
              resolve(...args);
            }
          }
        };

        if (resolveIndex !== -1) {
          args.splice(resolveIndex, 1, finalResolve);
        } else {
          args.push(finalResolve);
        }

        if (rejectIndex !== -1) {
          args.splice(rejectIndex, 1, reject);
        }

        try {
          this(...args);
        } catch (e) {
          reject(e);
        }
      });
    },
  });
}

function findAccountAddress(wallet) {
  const accounts = wallet.accounts || [];
  const account = accounts.find((account) => account.instrumentId === 'ethereum');
  return account && account.address;
}

function loadFromStorage(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (items) => {
      if (chrome.runtime.lastError) return reject(chrome.runtime.lastError.message);
      resolve(items);
    });
  });
}

const ChannelManager = {
  channels: {},

  makeRoutingId(port) {
    if (port.sender && port.sender.tab) {
      return [port.sender.tab.id, port.sender.frameId].join(':');
    }
    return port.name;
  },
  tabIdFromRoutingId(routingId) {
    const [tabId, frameId] = routingId.split(':');
    return Number(tabId);
  },
  isRoutingId(maybeRoutingId) {
    const routingIdPattern = /\d+:\d+/;
    return routingIdPattern.test(maybeRoutingId);
  },

  addChannel(channel) {
    this.channels[channel.meta.routingId] = channel;
  },
  getFirstChannelForTab(tabId) {
    const channelsKeys = Object.keys(this.channels);
    for (const channelKey of channelsKeys) {
      const channelTabId = this.tabIdFromRoutingId(channelKey);
      if (tabId === channelTabId) {
        return this.channels[channelKey];
      }
    }
    return false;
  },
  removeChannel(channel) {
    const routingId = channel.meta.routingId;
    delete this.channels[routingId];
    workerQueue.updateToFiltered((req) => req.routingId !== routingId);
  },
  fromRoutingId(routingId) {
    return this.channels[routingId];
  },
  forEachPage(func) {
    Object.entries(this.channels).forEach(([routingId, channel]) => {
      if (this.isRoutingId(routingId)) {
        func(channel);
      }
    });
  },
};

const WalletStorageDefaults = {
  wallet: '{}',
};
// Legacy keys (migrate on reuse): settings, web3access, web3access_session
const WalletStorageKeys = Object.keys(WalletStorageDefaults);

function mapChangedValues(items) {
  const resultItems = {};
  for (const key of WalletStorageKeys) {
    if (key in items) {
      resultItems[key] = items[key].newValue || WalletStorageDefaults[key];
    }
  }
  return resultItems;
}

class WalletMetadata {
  accountAddress;
  ready;

  constructor() {
    chrome.storage.local.onChanged.addListener(this.onChanged.bind(this));
  }
  update() {
    this.ready = loadFromStorage(WalletStorageKeys).then(this.updateItems.bind(this));
  }
  onChanged(items) {
    const newItems = mapChangedValues(items);
    this.updateItems(newItems);
  }
  updateItems(items) {
    if (items.wallet) {
      this.updateWallet(items.wallet);
    }
  }
  updateWallet(walletBlob) {
    const wallet = JSON.parse(walletBlob || '{}');
    const newAccountAddress = findAccountAddress(wallet);
    const addressHasChanged = this.accountAddress && this.accountAddress !== newAccountAddress;
    this.accountAddress = newAccountAddress;
    if (addressHasChanged) {
      const event = this.accountsEvent();
      ChannelManager.forEachPage((channel) => channel.send(event));
    }
  }
  chainIdEvent(chainData) {
    return { event: 'chainChanged', data: chainData };
  }
  accountsEvent() {
    const accounts = (this.accountAddress && [this.accountAddress]) || [];
    return { event: 'accountsChanged', data: accounts };
  }
  getRpcUrl(chainId) {
    const RpcUrlMap = {
      1: 'https://mainnet.infura.io/v3/d8995deb1f584649b9cc4df2ae2b908d',
      3: 'https://ropsten.infura.io/v3/d8995deb1f584649b9cc4df2ae2b908d',
      4: 'https://rinkeby.infura.io/v3/d8995deb1f584649b9cc4df2ae2b908d',
      42: 'https://kovan.infura.io/v3/d8995deb1f584649b9cc4df2ae2b908d',
      56: 'https://bsc-dataseed.binance.org/',
      137: 'https://polygon-rpc.com/',
      80001: 'https://matic-mumbai.chainstacklabs.com',
    };
    return RpcUrlMap[chainId] || 'about:invalid';
  }
  getChainData(chainId) {
    return {
      chainId,
      rpcUrl: this.getRpcUrl(chainId),
    };
  }
  isOurAddress(address) {
    if (typeof address !== 'string') {
      return false;
    }
    const lcWalletAddress = this.accountAddress?.toLowerCase();
    const lcAddress = address.toLowerCase();
    return lcAddress === lcWalletAddress;
  }
  checkAccess(method, address) {
    if (!this.accountAddress) {
      return false;
    }
    switch (method) {
      case 'access':
      case 'switchChain':
        return true;
      case 'populateAndSignTransaction':
      case 'sign':
      case 'signTransaction':
      case 'signTypedData':
        return this.isOurAddress(address);
    }
  }
}

const metadata = new WalletMetadata();
metadata.update();

class WorkerQueue {
  queue = [];
  ready;

  constructor() {
    this.ready = loadFromStorage('workqueue').then((items) => {
      if (items.queue) {
        this.queue = items.queue;
      }
    });
    chrome.runtime.onStartup.addListener(this.clear.bind(this));
  }

  updateState() {
    chrome.storage.local.set({ workqueue: this.queue });
    const badgeText = this.queue.length ? this.queue.length.toString() : '';
    opr.sidebarAction.setBadgeText({ text: badgeText });
  }

  clear() {
    this.queue = [];
    chrome.storage.local.remove('workqueue');
    opr.sidebarAction.setBadgeText({ text: '' });
  }

  updateToFiltered(matcher) {
    const filtered = this.filter(matcher);
    if (filtered.length === this.queue.length) {
      return;
    }
    this.queue = filtered;
    this.updateState();
  }

  put(req) {
    this.queue.push(req);
    this.updateState();
  }

  filter(matcher) {
    return this.queue.filter(matcher);
  }

  consume(queueId) {
    const index = this.queue.findIndex((req) => req.queueId === queueId);
    if (index === -1) {
      return;
    }
    const req = this.queue.splice(index, 1)[0];
    this.updateState();
    return req;
  }
}

const workerQueue = new WorkerQueue();

class IPCMessage {
  msg;

  constructor(msg) {
    this.msg = msg;
  }
  get method() {
    return this.msg.op;
  }
  get params() {
    return this.msg.params;
  }
  raw() {
    return this.msg;
  }
  reply(result) {
    return {
      op: `${this.msg.op}_reply`, // Not used, debugging aid
      seq: this.msg.seq,
      result,
    };
  }
}

class IPCReceiver {
  port;
  recv;
  disconnect;
  meta;

  constructor(port, metadata, onRecv, onDisconnect) {
    this.port = port;
    this.meta = metadata;
    this.recv = onRecv;
    this.disconnect = onDisconnect;
    this.port.onDisconnect.addListener(this.onDisconnect.bind(this));
    this.port.onMessage.addListener(this.onRecv.bind(this));
  }
  onDisconnect() {
    this.disconnect?.(this);
  }
  onRecv(msg) {
    this.recv?.(this, new IPCMessage(msg));
  }
  send(msg) {
    this.port.postMessage(msg);
  }
}

function bindReceiver(routingId) {
  return routingId === 'app' ? handleAppMessage : handlePageMessage;
}

chrome.runtime.onConnect.addListener((port) => {
  const routingId = ChannelManager.makeRoutingId(port);
  const metadata = {
    origin: port.sender?.origin,
    url: port.sender?.url,
    routingId,
  };
  const channel = new IPCReceiver(
    port,
    metadata,
    bindReceiver(routingId),
    ChannelManager.removeChannel.bind(ChannelManager),
  );
  ChannelManager.addChannel(channel);
});

function updateChannelChain(channel, chainId) {
  const chainData = metadata.getChainData(chainId);
  channel.state = chainData;
  channel.send(metadata.chainIdEvent(chainData));
}

function switchDefaultChain(channel, chainId) {
  if (!channel.state || channel.state.wasSwitchedByPage) {
    return;
  }
  updateChannelChain(channel, chainId);
}

function preUserResponse(channel, msg, result) {
  if (!result) {
    return;
  }
  switch (msg.method) {
    case 'access':
      updateChannelChain(channel, result.chainId);
      channel.send(metadata.accountsEvent());
      break;
    case 'switchChain':
      updateChannelChain(channel, Number(msg.params[0].chainId));
      channel.state.wasSwitchedByPage = true;
      break;
  }
}

function getConnectionState(activeTabId) {
  const channel = ChannelManager.getFirstChannelForTab(activeTabId);
  return channel?.state;
}

function handleUserResponse(payload, result) {
  const sourceChannel = ChannelManager.fromRoutingId(payload.routingId);
  if (!sourceChannel) {
    return;
  }
  const queuedMsg = new IPCMessage(payload);
  preUserResponse(sourceChannel, queuedMsg, result);
  sourceChannel.send(queuedMsg.reply(result));
}

const matchAllRequests = () => true;

function makeRequestMatcher(options) {
  if (!options) return matchAllRequests;
  return (req) => {
    let match = true;
    if ('origin' in options) {
      match = match && req.origin === options.origin;
    }
    if ('tabId' in options) {
      match = match && ChannelManager.tabIdFromRoutingId(req.routingId) === options.tabId;
    }
    if ('url' in options) {
      match = match && req.url === options.url;
    }
    return match;
  };
}

// Messages from the app-side (popup/sidebar) of the extension.
function handleAppMessage(channel, msg) {
  switch (msg.method) {
    case 'userrequest':
      workerQueue.ready.then(() => {
        const [options] = msg.params;
        const matcher = makeRequestMatcher(options);
        const reqs = workerQueue.filter(matcher);
        channel.send(msg.reply(reqs.slice(0, options?.limit || 1)));
      });
      break;
    case 'userresponse':
      // Consume the queue entry with 'queueId' and send the result to the
      // originating source.
      workerQueue.ready.then(() => {
        const [result, queueId] = msg.params;
        const payload = workerQueue.consume(queueId);
        if (!payload) {
          return;
        }
        handleUserResponse(payload, result);
      });
      break;
    case 'setdefaultchainid':
      const [chainId] = msg.params;
      ChannelManager.forEachPage((channel) => switchDefaultChain(channel, chainId));
      break;
    case 'getconnectionstate':
      channel.send(msg.reply(getConnectionState(msg.params[0])));
      break;
    case 'cancelopsexcept':
      workerQueue.ready.then(() => {
        const [options] = msg.params;
        const keep = makeRequestMatcher(options);
        const reqs = workerQueue.filter((req) => !keep(req));
        workerQueue.updateToFiltered(keep);
        reqs.forEach((req) => handleUserResponse(req, false));
      });
      break;
  }
}

async function hashQueuePayload(payload) {
  const kHexChars = '0123456789abcdef';
  const s = JSON.stringify(payload) + Date.now();
  const buf = new TextEncoder('utf-8').encode(s);
  const hash = await self.crypto.subtle.digest('SHA-1', buf);
  return new Uint8Array(hash).reduce(
    (v, byte) => v + kHexChars[byte >>> 4] + kHexChars[byte & 0xf],
    '',
  );
}

const openPopup = async () => {
  try {
    const status = await opr.browserSidebarPrivate?.getPanelStatus?.asPromise();
    const isDocked = status?.docked;
    const isOpen = !!status?.shown_item_pref_id;
    if (isDocked && isOpen) {
      return;
    }
    if (isDocked) {
      opr.browserSidebarPrivate.undockPanel();
      chrome.runtime.sendMessage('redockAfterClose');
    }
    opr.browserSidebarPrivate?.expandItemUsingPrefId(chrome.runtime.id);
  } catch (openPopupSidebarError) {
    console.error(openPopupSidebarError);
  }
};

async function queueUserWork(channel, msg) {
  await workerQueue.ready;
  const payload = Object.assign(
    {
      origin: channel.meta.origin,
      url: channel.meta.url,
      routingId: channel.meta.routingId,
      chainId: channel.state?.chainId,
    },
    msg.raw(),
  );
  const payloadHash = await hashQueuePayload(payload);
  payload.queueId = payloadHash;
  workerQueue.put(payload);
}

// Messages from the page (content-script).
function handlePageMessage(channel, msg) {
  switch (msg.method) {
    case 'access':
      metadata.ready.then(() => {
        if (!metadata.checkAccess(msg.method)) {
          channel.send(msg.reply(false));
          return;
        }
        const [queryOnly] = msg.params;
        if (queryOnly) {
          channel.send(msg.reply(false));
          return;
        }
        openPopup();
        queueUserWork(channel, msg);
      });
      break;
    case 'switchChain':
      metadata.ready.then(() => {
        if (!metadata.checkAccess(msg.method)) {
          channel.send(msg.reply(false));
          return;
        }
        const targetChainId = Number(msg.params?.[0]?.chainId);
        if (metadata.getRpcUrl(targetChainId) === 'about:invalid') {
          channel.send(msg.reply(false));
          return;
        }
        if (channel.state?.chainId === targetChainId) {
          channel.send(msg.reply(true));
          return;
        }
        openPopup();
        queueUserWork(channel, msg);
      });
      break;
    case 'sign':
    case 'signTypedData':
      metadata.ready.then(() => {
        if (!metadata.checkAccess(msg.method, msg.params[0])) {
          channel.send(msg.reply(false));
          return;
        }
        openPopup();
        queueUserWork(channel, msg);
      });
      break;
    case 'populateAndSignTransaction':
    case 'signTransaction':
      metadata.ready.then(() => {
        if (!metadata.checkAccess(msg.method, msg.params[0].from)) {
          channel.send(msg.reply(false));
          return;
        }
        openPopup();
        queueUserWork(channel, msg);
      });
      break;
  }
}
