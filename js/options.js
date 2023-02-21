$(function() {
    function update_form_tabcount(val) {
        //値を正規化してフォームに設定する
		$("#fso_tabcount").val(val);
		return val;
	}

    //保存時の処理
    $("#save").click(function() {
		//フォームに入力された値を正規化して反映
		var tabcount = $("#fso_tabcount").val();
		// //正規化後の値をローカルストレージに保存
		// chrome.storage.local.set({bg.FSO_TABCOUNT_KEY : tabcount}, function () {});
		chrome.runtime.sendMessage({method: "setOptions", tabcount: tabcount}, function() {
			// console.log("ok");
		});
    });

    //初期値
	chrome.runtime.sendMessage({method: "getOptions"}, function(response) {
		var tabcount = response.fso_tabcount;
		update_form_tabcount(tabcount);
	});
});

