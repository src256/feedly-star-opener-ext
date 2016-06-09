var FSO_TABCOUNT_KEY = "fso_tabcount";
var FSO_TABCOUNT_DEF = 8;

function normalized_fso_tabcount(raw_value) {
    //開くタブの数を正規化して返す
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
        var tabcount = normalized_fso_tabcount(localStorage.getItem(FSO_TABCOUNT_KEY));
        sendResponse({fso_tabcount: tabcount});
    } else {
        sendResponse({});
    }
});
