var background = chrome.extension.getBackgroundPage();

$(document).ready(function() {

    chrome.runtime.onMessage.addListener( onMessage );

    function onMessage( msg, sender, response ) {
        console.log('Content received message: ' + msg);

        if (msg == 'wallet_loading') {

        }
    }

    $('#backup').hide();
    $('#refill').hide();

    if (background.BCH_PRICE == 0) {
        $('.bch-price').text('BCH Price unknown - cannot continue.');
        alert('I do not know what the going rate for BCH is - cannot continue.');
        return;
    }

    $('.bch-price').text('BCH Price $' + background.BCH_PRICE.toFixed(0));

    fetchWalletValue( function() {

        setupHandlers();

        fetchNextQrCode();
    });
});

function fetchWalletValue(cb) {

    $('.wallet-amount').text('$');
    $('.spinner').show();

    console.log('Wallet load state is ' + background.WALLET_LOAD_STATE);

    if (background.WALLET_LOAD_STATE == 'loading') {
        console.log('It was not ... waiting 5 seconds to retry.');

        window.setTimeout( function() {
            fetchWalletValue(cb);
        }, 5000);

        return;
    }

    if (background.WALLET_LOAD_STATE == 'loaded') {
        $('.spinner').hide();

        var sats = background.WALLET.getBalance();
        var dollars = background.BCH_PRICE * sats / 100000000;
        $('.wallet-amount').text('$' + dollars.toFixed(2));

        cb && cb();

        return;
    }

    // background doesn't even know its supposed to be loading...
    console.log('Sending message to "load_wallet".');
    chrome.runtime.sendMessage( { 
        type: 'load_wallet'
    } );

    $('.wallet-amount').text('$');
    $('.spinner').show();

    window.setTimeout( function() {
        fetchWalletValue(cb);
    }, 2000);
}

function renderQr(address) {

    $('.qrcode-address').text(address);

    var node = document.getElementById("qrcode");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 200,
        height : 200
    });

    address && qrcode.makeCode(address);
}

function fetchNextQrCode() {

    renderQr('');

    background.WALLET.fetch_ReceiveCashAddress( renderQr );
}

function closeRefill() {
    $('#refill').hide();
}

function closeBackup() {
    $('#backup').hide();
}

function setupHandlers() {

    $('#refill').hide(); 
    $('#backup').hide(); 
    
    $('#buttonRescanWallet').click(function(){

        console.log('Sending message to "load_wallet".');
        chrome.runtime.sendMessage( { type: 'load_wallet'} );
        
        $('.wallet-amount').text('$');
        $('.spinner').show();

        window.setTimeout( function() {
            fetchWalletValue(fetchNextQrCode);
        }, 2000);
    });

    $('#buttonOpenRefill').click(function(){
        $('#backup').hide(); 
        $('#refill').show();
    
        $('.wallet-amount').text('$');
        $('.spinner').show();

        window.setTimeout( function() {
            console.log('Sending message to "load_wallet".');
            chrome.runtime.sendMessage( { type: 'load_wallet'} );
            background.WALLET_LOAD_STATE = 'loading';

            fetchWalletValue(fetchNextQrCode);
        }, 30000);
    });

    $('#buttonOpenBackup').click(function(){
        $('#refill').hide(); 
        $('#backup').show();
    });

    $('#buttonCloseRefill').click(function(){
        $('#refill').hide();
    });

    $('#buttonCloseBackup').click(function(){
        $('#backup').hide();
    });
}

