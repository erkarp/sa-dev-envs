const linkList = document.getElementById('link_list');
const suffix = document.location.pathname + document.location.search;

chrome.storage.sync.get('origins', function(data) {
  data.origins.forEach(origin => {

    let linkElem = document.createElement('a');
    linkElem.setAttribute('href', origin + suffix);

    linkElem.append(origin + suffix);
    linkList.appendChild(linkElem);
  });
});

// Onclick from tutorial https://developer.chrome.com/extensions/getstarted

// changeColor.onclick = function(element) {
//   let color = element.target.value;

//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });

// };

console.log(document.location);