function change_frames(file1, file2) {
    if (file1 != undefined) {parent.leftwindow.location.href=file1;};
    if (file2 != undefined) {parent.rightwindow.location.href=file2;};
}

function openURL() {   
    chrome.tabs.getAllInWindow(null, function(tabs) {
        var selectedTab = localStorage["selectedTabIndex"];
        var selectedWindow = parseFloat(localStorage["selectedWindow"]); 

        if(selectedTab<0 && selectedWindow<0)
            return;

        fr1=chrome.extension.getURL("split-cols.html");
        fr2=chrome.extension.getURL("split-rows.html");
        dom = parent;
        hierarchy = 0;
        leveprave = [];

        while (dom.name == "leftwindow" || dom.name == "rightwindow") {
            hierarchy = hierarchy+1;
            leveprave = leveprave.concat([dom.name]);
            dom = dom.parent; 
        }

        if (hierarchy > 0) {
        }
        else {
            var pravyram = tabs[selectedTab].url;
            var levyram = tabs[selectedTab].url; 

            change_frames(levyram, pravyram); 
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {

    if(document.getElementById('win_left_urlToJump')) {
        document.getElementById('win_left_urlToJump').value = window.location.href;
    }

    if(document.getElementById("win_left_openTargetUrlBtn")) {
        document.getElementById("win_left_openTargetUrlBtn").addEventListener("click", function() {
            window.location.href=document.getElementById('win_left_urlToJump').value;
        });
    }

    openURL();
});

