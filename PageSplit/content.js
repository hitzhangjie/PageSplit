//window.onload = function() {

    console.log("content.js loaded");

    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        try {
        console.log("recv request: " + JSON.stringify(msg));

        if (msg.action == "reset_dom_left") {
            /*
            var f = document.getElementsByName('leftwindow')[0];
            if(!f) return;

            var fr = f.parentElement;
            fr.removeElement(f);
            var _f = document.createElement('frame');
            _f.name = "leftwindow";
            _f.src = "win_left.html";
            fr.appendElement(_f);
            */

            var url = msg.url;
            window.location.href = url;

            sendResponse({msg: "reset_dom_left succ"});
        } 

        if (msg.action == "reset_dom_right") {
            /*
            var f = document.getElementsByName('rightwindow')[0];
            if(!f) return;

            var fr = f.parentElement;
            fr.removeElement(f);
            var _f = document.createElement('frame');
            _f.name = "rightwindow";
            _f.src = "win_right.html";
            fr.appendElement(_f);
            */

            var url = msg.url;
            window.location.href = url;

            sendResponse({msg: "reset_dom_right succ"});
        }
        }
        catch(err) {
            alert(err);
        }
    });

    console.log("recv msg listener registered");
//};

/*
window.onload = function() {

    console.log("content.js loaded");

    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        console.log("recv request: " + JSON.stringify(msg));

        if (msg.action == "get_dom") {
            sendResponse({dom: document.body.innerHTML});
        } else{
           sendResponse({});
        }
    });

    console.log("recv msg listener registered");
};
*/
