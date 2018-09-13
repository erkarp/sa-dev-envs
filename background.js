chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({
    origins: [
      'http://test.smartasset.com:8080/',
      'https://staging2.smartasset.com/',
      'https://dev.smartasset.com/',
      'https://qa.smartasset.com/',
      'https://r1.smartasset.com/',
      'https://smartasset.com/'
    ]});

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'smartasset.com'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});