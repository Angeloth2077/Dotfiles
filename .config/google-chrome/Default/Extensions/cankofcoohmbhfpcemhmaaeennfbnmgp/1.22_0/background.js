chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return {
            redirectUrl: chrome.extension.getURL("cadmium-playercore-6.0033.414.911-1080p.js")
        };
    }, {
        urls: [
            "*://assets.nflxext.com/*/ffe/player/html/*",
            "*://www.assets.nflxext.com/*/ffe/player/html/*"
        ]
    }, ["blocking"]
);
