const goToOrigin = (origins, origin, tab) => {
  for (let i = 0; i < origins.length; i++) {
    if (origin === origins[i].name) {

      const url = new URL(tab.url);
      const destination = origins[i].link + url.pathname + url.search;

      chrome.tabs.executeScript(tab.id, 
        {code: 'document.location = "' +  destination + '";'}
      );
    }
  }
};

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
    ], 

    shortcutMap: {
      'view_live': 'sa.com', 
      'view_staging': 's2', 
      'view_local': 'local'
    }
  }, 
  
  function() {
    chrome.commands.onCommand.addListener(function(command) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.storage.sync.get(['shortcutMap', 'origins'], function(data) {
          goToOrigin(data.origins, data.shortcutMap[command], tabs[0]);
        });
      });
    });
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