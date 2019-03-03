/*
$(document).ready(function(){
    let bg = chrome.extension.getBackgroundPage();
    console.log(bg.Addresses);

    var body = header();

    for (var i = 0; i < bg.Addresses.length; i++) {
        var addr = bg.Addresses[i];
        body += addAddress(addr);
    }

    if ( bg.Addresses.length == 0) {
        body += '<div class="nothing-found">No Bitcoin Cash Addresses Found on this page.</div>';
        $('body').css({height:'15em'});
    }

    $('body').append( body );

    setupHandlers();
});

function addAddress(addr) {
    var div = '<div class="block">';
    div    +=    '<div id="address" class="address">';
    div    +=        addr;
    div    +=    '</div>';
    div    +=    '<span class="dollar">$</span>';
    div    +=    '<input type="text" name="amount" id="amount" value="" />';
    div    +=    '<button class="button-pay">Pay</button>';
    div    += '</div>';

    return div;
}

function header() {
    var div = '<div class="header">';
    div    += '<span class="wallet-label">wallet</span> <span class="wallet-amount">$450.33</span>';
    div    += '<br/><span id="buttonOpenBackup" class="fake-anchor">backup wallet</span>'
    div    += '<span id="buttonOpenRefill" class="fake-anchor">refill wallet</span><br/>'
    div    += divBackupWallet();
    div    += divRefillWallet();
    div    += '</div>';

    return div;
}

function divBackupWallet() {
    var div = '';

    div += '<div id="backup" class="div-backup-wallet">';
    div += '<div class="bip39">witch collapse practice feed shame open despair creek road again ice least witch collapse practice feed shame open despair creek road again ice least</div>';
    div += '<button id="buttonCloseBackup" class="button-close">Close</button>';
    div += '</div>';

    return div;
}

function divRefillWallet() {
    var div = '';

    div += '<div id="refill" class="div-refill-wallet">';
    div += '<img id="qrcode" class="qrcode" src="qrcodes/qr.png"/>';
    div += '<br/>';
    div += '<button id="buttonCloseRefill" class="button-close">Close</button>';
    div += '</div>';

    return div;
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
    
    $('#buttonOpenRefill').click(function(){
        $('#refill').show();
    });

    $('#buttonOpenBackup').click(function(){
        $('#backup').show();
    });

    $('#buttonCloseRefill').click(function(){
        $('#refill').hide();
    });

    $('#buttonCloseBackup').click(function(){
        $('#backup').hide();
    });
}
*/
