const Wallet = require('@amortaza/acewallet/wallet.js').Wallet;

// no 'var' because browserfy scopes these and I can't get them from the popup.js
WALLET = new Wallet();
BCH_PRICE = 0;
WALLET;
WALLET_LOAD_STATE = '';
WALLET_WORDS = '';

var WALLET_INDEX = 0;

getBCH_Price();
initWallet();

function initWallet() {

    chrome.storage.sync.get('wallet-words', function(result) {
        var words = result['wallet-words'];

        if (!words) {
            words = WALLET.generateMnemonic();

            chrome.storage.sync.set({'wallet-words': words}, function() {
                console.log('New wallet words generated and stored.');
            });
        } 

        chrome.storage.sync.get('wallet-index', function(result) {
            WALLET_INDEX = parseInt( result['wallet-index'] );

            if (isNaN(WALLET_INDEX)) WALLET_INDEX = 0;

            console.log('Read wallet index as ' + WALLET_INDEX);

            loadWallet(words);
        });
    });
}

chrome.runtime.onMessage.addListener( onMessage );

function onMessage( msg, sender, response ) {

    if (msg.type == 'load_wallet') {
        console.log('Background just received "load_wallet" message.');
        reloadWallet();
    }
    else if (msg.type == 'send_bch') {
        var sats = parseFloat(msg.amount) * 100000000;
        var dollars = parseFloat(msg.amount) * BCH_PRICE;
        var confirm_msg = 'Confirm sending:\n' + msg.amount + ' BCH\nValued at $' + dollars.toFixed(2) + '\nTo ' + msg.bch_address;

        if (!confirm(confirm_msg)) return;

        WALLET.send(msg.bch_address, sats, function() {
            notify('Sent $' + dollars.toFixed(2) + ' to ' + msg.bch_address, msg.amount + ' BCH');
            reloadWallet();
        }, 
        function(err) {
            var err2 = 'There was an error sending ' + msg.amount + ' BCH to ' + msg.bch_address + ', see "' + err + '".';
            notify(err2);
            alert(err2);
        });
    }
    else if (msg.type == 'get-bch-price') {
        response(BCH_PRICE);
    }
    else if (msg.type == 'notify') {
        notify(msg.msg);
    }
}

function notify(line1, line2) {

    if (Notification.permission === "granted") {
        new Notification(line1, {body: line2 || '', icon: 'img/bch.png'});
    }
    else if (Notification.permission !== 'denied') {

        Notification.requestPermission(function (permission) {

            if (permission === "granted") 
                new Notification(line1, {body: line2 || '', icon: 'img/bch.png'});
        });
    }
}

function loadWallet(words) {

    WALLET_WORDS = words;
    WALLET_LOAD_STATE = 'loading';

    console.log('Wallet load state is now "loading"');

    // we have the words
    WALLET.load( words, WALLET_INDEX, 
        function(first_change_utxo_index) {
            WALLET_LOAD_STATE = 'loaded';
            setWalletIndex(first_change_utxo_index);
            console.log('Wallet load state is now "loaded"');
        }, 
        function(error) {
            console.log('There was a problem loading the wallet.  See ' + e);
        }
    );
}

function reloadWallet() {

    WALLET_LOAD_STATE = 'loading';

    console.log('Wallet load state is now "loading"');

    // we have the words
    WALLET.reload( 
        function(first_change_utxo_index) {
            WALLET_LOAD_STATE = 'loaded';
            setWalletIndex(first_change_utxo_index);
            console.log('Wallet load state is now "loaded"');
        }, 
        function(error) {
            console.log('There was a problem loading the wallet.  See ' + e);
        }
    );
}

function setWalletIndex(index) {

    WALLET_INDEX = index;

    chrome.storage.sync.set({'wallet-index': index}, function() {
        console.log('Wallet index stored as ' + index);
    });
}

function getBCH_Price() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState != 4) return;

        if (this.status == 200) {
            var data = JSON.parse(xhttp.responseText).data;

            BCH_PRICE = parseFloat(data.rates.USD, 2);

            if (isNaN(BCH_PRICE)) {
                BCH_PRICE = 0;

                alert('Read something funky for BCH price, see "' + data.rates.USD + '"');
                onError();
            } 
            else {
                console.log('Got the price as $' + BCH_PRICE);
                // we got the price....but would like to update the price every hour
                retryIn( 3600 );
            }
        } 
        else {
            onError();
        }
    };

    xhttp.open("GET", "https://api.coinbase.com/v2/exchange-rates?currency=BCH", true);
    xhttp.send();

    function retryIn(seconds) {

        window.setTimeout(function() {        
            console.log('Getting BCH Price.');
            getBCH_Price();
        }, 1000 * seconds);
    }

    function onError() {
        alert('BCH Money Button cannot determine current BCH price.  Trying again in a minute.');

        retryIn(60);
    }
}
