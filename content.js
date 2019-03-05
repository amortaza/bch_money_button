
forEachAddress( function(elements, bch_address) {

    for ( var i = 0; i < elements.length; i++ ) 
        AcE_bCh_ExT_create_bch_money_button(elements[ i ], bch_address, 143.23);
});

window.addEventListener("message", onSendBCH_Pressed);

function onSendBCH_Pressed(event) {

    if (!event.isTrusted) {
        console.log('Event was not trusted.');
        return;
    }

    var data = event.data;

    if (!data.AcE_bCh_ExT) {
        console.log('Event was not an AcE_bCh_ExT event.');
        return;
    }

    var msg = {
        amount: data.amount,
        bch_address: data.bch_address
    };

    chrome.runtime.sendMessage( msg );

    console.log('Sent message to background!');
    console.log(msg);
}

/*
chrome.runtime.onMessage.addListener( onMessage );

function onMessage( msg, sender, response ) {
    console.log('Content received message: ' + msg);
}*/

