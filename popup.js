const updateLinks = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.storage.sync.get('origins', function(data) {

      Array.from(document.getElementsByTagName('a')).forEach(linkElem => {
        const tabUrl = new URL(tabs[0].url), origins = data.origins;

        for (let i = 0; i < origins.length; i++) {
          if (origins[i].name === linkElem.getAttribute('data-name')) {
            const destination = origins[i].link + tabUrl.pathname + tabUrl.search;

            // This replaces typical anchor functionality 
            linkElem.onclick = element => {
              chrome.tabs.executeScript(tabs[0].id, 
                {code: 'document.location = "' + destination + '";'});
            }

            // For show; unused to avoid hitting the popup DOM
            linkElem.setAttribute('href', destination);
            
            linkElem.className = tabUrl.origin === origins[i].link ? 'current' : undefined;
            break;
          }
        }
      });

    });
  });
};

const createLinks = function() {
  const linkList = document.getElementById('link_list');

  chrome.storage.sync.get('origins', function(data) {
    data.origins.forEach((origin, index) => {

      let linkElem = document.createElement('a');
      // linkElem.setAttribute('title', `Cmd + ${index}`);
      linkElem.setAttribute('data-name', origin.name);
      
      linkElem.append(origin.name);
      linkList.appendChild(linkElem);
    });
  });
};

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
  updateLinks();
});  

(function() {
  createLinks();
  updateLinks();
})();