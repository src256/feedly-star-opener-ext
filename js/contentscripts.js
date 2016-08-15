(function() {
    var onKeyDown = function(event) {
        // push "w" key
        if (event.keyCode == 87 && !event.shiftKey) {
            chrome.runtime.sendMessage({method: "getOptions"}, function(response) {
                var tab_count = response.fso_tabcount
                var entriesPath = '//div[@id="section0_column0"]//div[@class="u0Entry quicklisted "]';
                var starPath = './/div[@class="quicklistHandle"]';
                var linkPath = './/a[@class="title read"]';
                if (response.fso_uitype == "newtype") {
                    //qlicklistedがスターマーク付きを表す(その中にreadとunreadがある)
                    entriesPath = '//div[@class="list-entries"]//div[contains(@class, "entry quicklisted")]'; 
                    starPath = './/button[@class="save-for-later saved"]';
                    linkPath = './/a[@class="title"]';
                }                
                var entries = document.evaluate(entriesPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
//                window.alert(entries.snapshotLength);
                for (var i = 0, m = tab_count; i < entries.snapshotLength && m > 0; i++) {
                    var entry = entries.snapshotItem(i);
                    m--
                    var stars = document.evaluate(starPath, entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (stars.snapshotLength  == 0) {
                        continue;
                    }
                    var links = document.evaluate(linkPath, entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (links.snapshotLength > 0) {
                        var link = links.snapshotItem(0);
                        window.open(link.href);  
                    }
                    var star = stars.snapshotItem(0);
                    var event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    star.dispatchEvent(event);                    
                }
            });
        }
    }
    document.addEventListener('keydown', onKeyDown, false);
})();

