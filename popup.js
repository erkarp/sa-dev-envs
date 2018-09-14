const generateLinks = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    // chrome.tabs.executeScript(
    //     tabs[0].id,
    //     {code: 'document.body.style.backgroundColor = "' + color + '";'});
    
    const linkList = document.getElementById('link_list');

    while (linkList.firstChild) {
      linkList.removeChild(linkList.firstChild);
    }

    chrome.storage.sync.get('origins', function(data) {
      data.origins.forEach(origin => {

        let linkElem = document.createElement('a');
        let linkName = Object.getOwnPropertyNames(origin)[0];

        let tabUrl = new URL(tabs[0].url);
        let suffix = tabUrl.pathname + tabUrl.search;

        linkElem.setAttribute('href', origin[linkName] + suffix);
        linkElem.setAttribute('title', origin[linkName] + suffix);

        linkElem.append(linkName);
        linkList.appendChild(linkElem);
      });
    });

  });
};

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
  generateLinks();
});  

(generateLinks());