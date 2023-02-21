var FSO_TABCOUNT_DEF = 8;

function normalized_fso_tabcount(raw_value) {
    var tabcount = parseInt(raw_value);
    if (isNaN(tabcount) || tabcount <= 0 || tabcount > 20) {
        //エラーの場合は規定値
        tabcount = FSO_TABCOUNT_DEF;
    }
    //数値型
    return tabcount;
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getOptions") {
	    var raw_tabcount = null;
	    chrome.storage.local.get("fso_tabcount", function (value) {
	        raw_tabcount = value.fso_tabcount;
            var tabcount = normalized_fso_tabcount(raw_tabcount);
            sendResponse({fso_tabcount: tabcount});    
	    });
        return true;
    } else if (request.method == "setOptions") {
        var tabcount = normalized_fso_tabcount(request.tabcount);
        chrome.storage.local.set({"fso_tabcount": tabcount} , function () {
            sendResponse({farewell: "goodbye"});
//            chrome.storage.local.get("fso_tabcount", function (value) {
//                console.log("get=" + value.fso_tabcount);
//            }); 
        });
        return true;
    } else {
        sendResponse({});
        return true;
    }
});
