$(function() {
    function update_form_tabcount(val) {
        //値を正規化してフォームに設定する
        var nval = bg.normalized_fso_tabcount(val);
        $("#fso_tabcount").val(nval);
        return nval;
    }
    //background.jsには直接アクセスできない
    var bg = chrome.extension.getBackgroundPage();
    
    //保存時の処理
    $("#save").click(function() {
        //フォームに入力された値を正規化して反映
        var tabcount = update_form_tabcount($("#fso_tabcount").val());
        //正規化後の値をローカルストレージに保存
        localStorage[bg.FSO_TABCOUNT_KEY] = tabcount;
    });
    //初期値
    update_form_tabcount(localStorage[bg.FSO_TABCOUNT_KEY]);
});
