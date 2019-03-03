/*chrome.runtime.onMessage.addListener( onMessage );

function onMessage( msg, sender, response ) {

    console.log('background just received: ' + msg);

    if (msg === 'is-user-gesture') {

        chrome.permissions.request({}, function() {
            var is_user = !chrome.runtime.lastError;

            console.log('is user ' + is_user);

            //alert('from bg');

            response(is_user);
        });

        return true; // Async
    }
}

*/



/*chrome.browserAction.onClicked.addListener(clicked);

function clicked(tab) {
    chrome.tabs.sendMessage(tab.id, {});
}*/

function clicked_old(tab) {
    /*
    active: true
    audible: false
    autoDiscardable: true
    discarded: false
    height: 579
    highlighted: true
    id: 147
    incognito: false
    index: 1
    mutedInfo: {muted: false}
    pinned: false
    selected: true
    status: "complete"
    width: 1920
    windowId: 143 
    */
}