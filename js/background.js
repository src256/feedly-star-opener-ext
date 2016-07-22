var FSO_TABCOUNT_KEY = "fso_tabcount";
var FSO_TABCOUNT_DEF = 8;

var FSO_UITYPE_KEY = "fso_tabcount";
var FSO_UITYPE_NEW = "newtype";
var FSO_UITYPE_OLD = "oldtype";
var FSO_UITYPE_DEF = FSO_UITYPE_OLD;

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

function normalized_fso_uitype(raw_value) {
    //UIタイプを正規化して返す
    var uitype = FSO_UITYPE_DEF;
    if (raw_value == "newtype") {
        uitype = FSO_UITYPE_NEW
    }
    return uitype;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getOptions") {
        var tabcount = normalized_fso_tabcount(localStorage.getItem(FSO_TABCOUNT_KEY));
        var uitype = normalized_fso_uitype(localStorage.getItem(FSO_UITYPE_KEY));
        sendResponse({fso_tabcount: tabcount, fso_uitype: uitype});
    } else {
        sendResponse({});
    }
});
