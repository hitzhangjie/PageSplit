function changeSplitLayout(layout) {

  if (layout == "none") {
      window.location.href = window.location.href;
      return;
  }
  else if (layout == 'horizontal') { 
    var chromeExtURL=chrome.extension.getURL("split-rows.html"); 
  }
  else if (layout == 'vertical') { 
    var chromeExtURL=chrome.extension.getURL("split-cols.html"); 
  }
  else {
      return;
  }

  console.log("chromeExtURL = " + chromeExtURL);

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];

    localStorage["selectedTabIndex"] = tab.index;
    chrome.windows.getCurrent(function(w) {
      localStorage["selectedWindow"] = w.id;
    });

    chrome.tabs.create({
      url: chromeExtURL, index: (tab.index+1), selected: true
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {

  console.log("dom content is loaded");

  var dropdown = document.getElementById('dropdown');
  dropdown.value = 'none';

  dropdown.addEventListener('change', () => {
    console.log("dropdown value changed: "+dropdown.value);
    changeSplitLayout(dropdown.value);
  });
});

