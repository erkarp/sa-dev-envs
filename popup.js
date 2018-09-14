const linkList = document.getElementById('link_list');

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    const tabUrl = new URL(tabs[0].url);
    const suffix = tabUrl.pathname + tabUrl.search;

    // chrome.tabs.executeScript(
    //     tabs[0].id,
    //     {code: 'document.body.style.backgroundColor = "' + color + '";'});

    while (linkList.firstChild) {
      linkList.removeChild(linkList.firstChild);
    }

    chrome.storage.sync.get('origins', function(data) {
      data.origins.forEach(origin => {

        let linkElem = document.createElement('a');
        linkElem.setAttribute('href', origin + suffix);

        linkElem.append(origin + suffix);
        linkList.appendChild(linkElem);
      });
    });
  
  });
});