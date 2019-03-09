const Wallet = require('@amortaza/acewallet/wallet.js').Wallet;

// no 'var' because browserfy scopes these and I can't get them from the popup.js
WALLET = new Wallet();
BCH_PRICE = 0;
WALLET;
WALLET_LOAD_STATE = '';

var WORDS;

getBCH_Price();
getWallet();

function getWallet() {

    chrome.storage.sync.get('wallet-words', function(result) {
        WORDS = result['wallet-words'];

        if (!WORDS) {
            WORDS = WALLET.generateMnemonic();

            chrome.storage.sync.set({'wallet-words': WORDS}, function() {
                console.log('New wallet words generated and stored.');
            });
        } 

        loadWallet();
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

chrome.runtime.onMessage.addListener( onMessage );

function onMessage( msg, sender, response ) {

    console.log('background just received');
    console.log(msg);

    if (msg.type == 'load_wallet') {
        console.log('Background just received "load_wallet" message.');
        loadWallet();
    }
}


function loadWallet() {
    WALLET_LOAD_STATE = 'loading';

    console.log('Wallet load state is now "loading"');

    // we have the words
    WALLET.load( WORDS, 0, 
        function(first_change_utxo_index) {
            WALLET_LOAD_STATE = 'loaded';
            console.log('Wallet load state is now "loaded"');
        }, 
        function(error) {
            console.log('There was a problem loading the wallet.  See ' + e);
        }
    );
}
