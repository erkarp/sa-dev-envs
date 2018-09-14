chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({
    origins: [
      {'local':  'http://test.smartasset.com:8080'},
      {'s2':     'https://staging2.smartasset.com'},
      {'qa':     'https://qa.smartasset.com'},
      {'r1':     'https://r1.smartasset.com'},
      {'dev':    'https://dev.smartasset.com'},
      {'sa.com': 'https://smartasset.com'}
    ]
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostSuffix: 'smartasset.com'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});