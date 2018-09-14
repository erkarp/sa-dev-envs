chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({
    origins: [
      {'local':  'http://test.smartasset.com:8080'},
      {'s2':     'https://staging2.smartasset.com'},
      {'qa':     'https://dev.smartasset.com'},
      {'r1':     'https://qa.smartasset.com'},
      {'dev':    'https://r1.smartasset.com'},
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