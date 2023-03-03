chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get({
        ffsungpt_api_key: '',
    }, function(items) {
        let api_key = items.ffsungpt_api_key;
        chrome.scripting.executeScript({target: {tabId : tab.id}, files: ['content.js']}, () => {
            chrome.scripting.executeScript({
                target: {tabId : tab.id},
                args: [api_key],
                func: (...args) => __summarize(...args),
            });
        });
    });
});

