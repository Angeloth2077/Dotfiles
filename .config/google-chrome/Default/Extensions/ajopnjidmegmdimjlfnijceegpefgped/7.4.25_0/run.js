(function betterttv() {
    if (document.querySelector('script#betterttv')) {
        return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = chrome.runtime.getURL('betterttv.js');
    script.id = 'betterttv';
    const head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }

    head.appendChild(script);
})()
