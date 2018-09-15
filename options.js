const optionsFormElem = document.getElementById('options');

chrome.storage.sync.get(['origins', 'shortcutMap'], function(data) {
  data.origins.forEach(function(origin) {

    if (origin.name !== 'local' && origin.name !== 'sa.com') {
      let inputElem = document.createElement('input');

      inputElem.setAttribute('type', 'radio');
      inputElem.setAttribute('name', 'defaultStagingEnvironment');

      if (origin.name === data.shortcutMap.view_staging) {
        inputElem.setAttribute('checked', true);
      }

      inputElem.addEventListener('click', function() {
        data.shortcutMap.view_staging = origin.name;
        chrome.storage.sync.set({shortcutMap: data.shortcutMap});
      });

      // Create label for radio input
      let labelElem = document.createElement('label');
      labelElem.append(origin.name);

      labelElem.appendChild(inputElem);
      optionsFormElem.appendChild(labelElem);
    }
  });
})