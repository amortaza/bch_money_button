function isUserEvent(callback) {
    if (!chrome.runtime) return;

    chrome.runtime.sendMessage('is-user-gesture', function(is_user) {
        is_user = is_user === true;
        callback(is_user);
    });
}


document.body.onclick = function() {
    console.log('body onclick');
     isUserEvent(function(is_user) {
         alert(is_user ? 'Triggered by user' : 'Spoofed event');
     });
};

/*chrome.runtime.onMessage.addListener( onMessage );

function onMessage( msg, sender, response ) {
    console.log('Content received message: ' + msg);
}

window.addEventListener("message", function(event) {
    console.log(event.data);

    chrome.runtime.sendMessage( {
        special: event.data
    } );
});*/

/*

let addresses = parseAddresses();

//console.log('content is sending ' + addresses);

chrome.runtime.sendMessage( {
    addresses: addresses
} );

function parseAddresses() {
    let addr = {};

    var all = document.getElementsByTagName("*");

    for (var i=0, max=all.length; i < max; i++) {
        if (!all[i]) continue;
        if (!all[i].innerText) continue;

        var w = all[i].innerText.trim();

        if ( isBCHAddress( w ) ) {
            console.log(w);
            addr[w] = true;
        }
    }

    var ret = [];

    for ( var key in addr) {
        ret.push(key);
    }

    return ret;

    function isBCHAddress(addr) {
        var a = /^([13][a-km-zA-HJ-NP-Z1-9]{25,34})/.test(addr)

        if ( a ) return true;

        a = /^((bitcoincash:)?(q|p)[a-z0-9]{41})/.test(addr)

        if ( a ) return true;

        a = /^((BITCOINCASH:)?(Q|P)[A-Z0-9]{41})$/.test(addr)

        return a;
    }
}
*/

/*
window.addEventListener('mouseup', selected);

function selected() {
    let text = window.getSelection().toString().trim();

    if ( text.length < 1 ) return;

    chrome.runtime.sendMessage( {
        text: text
    } );
}
*/

