(function() {
    var DEBUG = false;
    var onKeyDown = function(event) {
        // push "w" key
        if (event.keyCode == 87 && !event.shiftKey) {
            chrome.runtime.sendMessage({method: "getOptions"}, function(response) {
                var tab_count = response.fso_tabcount;
//                var entriesPath = '//main//div[contains(@class, "TitleOnlyLayout ")]';
                var entriesPath = '//main//article[contains(@class, "titleOnly")]'; 
                var starPath = './/button';
                var notOpenPath = './/*[name()="svg" and contains(@class, "color--accent")]';
                var linkPath = './/div/a[contains(@class, "EntryTitleLink")]';
                var entries = document.evaluate(entriesPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
                if (DEBUG) console.log("entries=" + entries.snapshotLength);
                for (var i = 0, m = tab_count; i < entries.snapshotLength && m > 0; i++) {
                    var entry = entries.snapshotItem(i);
                    var stars = document.evaluate(starPath, entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (DEBUG) console.log("stars=" + stars.snapshotLength);
                    if (stars.snapshotLength  == 0) {
                        // skip unmarked star entry
                        continue;
                    }
                    var star = stars.snapshotItem(0);
                    var notOpen = document.evaluate(notOpenPath, star, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (DEBUG) console.log("notOpen=" + notOpen.snapshotLength);
                    if (notOpen.snapshotLength == 0) {
                        // already Open
                        continue;
                    }
                    
                    m--
                    var links = document.evaluate(linkPath, entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (DEBUG) console.log("links=" + links.snapshotLength);
                    if (links.snapshotLength > 0) {
                        var link = links.snapshotItem(0);
                        window.open(link.href);  
                    }
                    var event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    star.dispatchEvent(event);                    
                }
            });
        }
    }
    document.addEventListener('keydown', onKeyDown, false);
})();

