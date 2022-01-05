// for logging
// - using `bg.console.log(msg)` for logging 
var bg = chrome.extension.getBackgroundPage();

// drop X-Frame-Options, allow iframe any page
var HEADERS_TO_STRIP_LOWERCASE = [
  'content-security-policy',
  'x-frame-options'
];

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    return {
      responseHeaders: details.responseHeaders.filter(function(header) {
        return HEADERS_TO_STRIP_LOWERCASE.indexOf(header.name.toLowerCase()) < 0;
      })
    };
  }, {
    urls: ["<all_urls>"]
  }, 
  [
    "blocking", 
    "responseHeaders"
  ]
);

chrome.contextMenus.create({
    "id": "menu_4_left",
    "title": "Reset left/top page",
    "contexts": ["page"]
});

chrome.contextMenus.create({
    "id": "menu_4_right",
    "title": "Reset right/bottom page",
    "contexts": ["page"]
});

//log打印不出来，用alert
//alert("menu created");

chrome.contextMenus.onClicked.addListener(function(ctxinfo) {

    bg.console.log(JSON.stringify(ctxinfo));

    try {
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {

            tab = tabs[0];
    
            if(ctxinfo.menuItemId == "menu_4_left") {

                var chromeExtURL=chrome.extension.getURL("win_left.html"); 
       
                localStorage["selectedTabIndex"] = -1;
                localStorage["selectedWindow"] = -1;

                bg.console.log("tab.id = " + tab.id);
        
                chrome.tabs.sendMessage(tab.id, {action: "reset_dom_left", url: chromeExtURL}, {frameId: ctxinfo.frameId}, function(response) {
                    bg.console.log("recv response: " + JSON.stringify(response));
                });
            }

            if(ctxinfo.menuItemId == "menu_4_right") {

                var chromeExtURL=chrome.extension.getURL("win_right.html"); 

                localStorage["selectedTabIndex"] = -1;
                localStorage["selectedWindow"] = -1;
        
                bg.console.log("tab.id = " + tab.id);

                chrome.tabs.sendMessage(tab.id, {action: "reset_dom_right", url: chromeExtURL}, {frameId: ctxinfo.frameId}, function(response) {
                    bg.console.log("recv response: " + JSON.stringify(response));
                });
            }
    
        });
    }
    catch(err) {
        alert(err);
    }
});

/*
chrome.contextMenus.onClicked.addListener(function(info) {

    try {
    if(info.menuItemId == "menu_4_left") {
        var chromeExtURL=chrome.extension.getURL("win_left.html"); 

        localStorage["selectedTabIndex"] = -1;
        localStorage["selectedWindow"] = -1;

        //var f = document.getElementsByName('leftwindow')[0];
        var f = localStorage["dom_left_win"];
        var fr = f.parentElement;
        fr.removeElement(f);
        var _f = document.createElement('frame');
        _f.name = "leftwindow";
        _f.src = "win_left.html";
        fr.appendElement(_f);
    }

    if(info.menuItemId == "menu_4_right") {
        var chromeExtURL=chrome.extension.getURL("win_right.html"); 

        localStorage["selectedTabIndex"] = -1;
        localStorage["selectedWindow"] = -1;

        //var f = document.getElementsByName('rightwindow')[0];
        var f = localStorage["dom_right_win"];
        var fr = f.parentElement;
        fr.removeElement(f);
        var _f = document.createElement('frame');
        _f.name = "rightwindow";
        _f.src = "win_right.html";
        fr.appendElement(_f);
    }
    }
    catch(err) {
        alert(err);
    }

});

chrome.tabs.onActivated.addListener(function(info) {
    bg.console.log("windowid:" + info.windowId + ", tabid:" + info.tabId + " activated");

    try {
        // Send a request to the content script.
        chrome.tabs.sendMessage(info.tabId, {action: "get_dom"}, {}, function(response) {
            bg.console.log("recv response: " + JSON.stringify(response));
        });
    }
    catch(err) {
        alert(err);
    }
});
*/
