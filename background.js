chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({
    origins: [
      {
        'name': 'local',
        'link': 'http://test.smartasset.com:8080'
      },
      {
        'name': 's2',   
        'link': 'https://staging2.smartasset.com'
      },
      {
        'name': 'qa',   
        'link': 'https://qa.smartasset.com'
      },
      {
        'name': 'r1',   
        'link': 'https://r1.smartasset.com'
      },
      {
        'name': 'dev',  
        'link': 'https://dev.smartasset.com'
      },
      {
        'name': 'sa.com',
        'link': 'https://smartasset.com'
      }
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