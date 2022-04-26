window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('upgrade').addEventListener('click', () => {
        chrome.permissions.request({
            origins: ['*://*.youtube.com/*'],
        }, (granted) => {
            if (!granted) {
                return;
            }
            window.close();
        });
    });
});
