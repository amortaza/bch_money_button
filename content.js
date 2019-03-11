var logTime = false;
var timeout = 3000; 

var last_length = 0;
var last_addresses = {};

var bch_price = 0;

loop();

function loop() {
    chrome.runtime.sendMessage({
        type: "get-bch-price"
    }, 
    function(bchPrice) {
        if (bchPrice < 1) return;

        bch_price = bchPrice;

        scansite();
    }); 
}

// we scan and rescan every 5 seconds
// the dom could be changing in dynamic sites

function scansite() {

    var startTime = +new Date();

    if (document.visibilityState === 'hidden') {
        window.setTimeout( loop, timeout); 
        reportTime();
        return;
    }

    var page_changed = false;

    page_changed = pageChanged();

    if (!page_changed) {
        last_length = document.body.innerHTML.length;
        window.setTimeout( loop, timeout); 
        reportTime();
        return;
    }

    forEachAddress( function(elements, bch_address) {

        for ( var i = 0; i < elements.length; i++ ) 
            AcE_bCh_ExT_create_bch_money_button(elements[ i ], bch_address, bch_price); 
    });

    last_length = document.body.innerHTML.length;
    //console.log('setting last length to ' + last_length);

    // rescan in about 5 seconds
    window.setTimeout( loop, timeout); 

    reportTime();

    function reportTime() {
        if (!logTime) return;

        var endTime = +new Date();
        console.log('time ' + (endTime-startTime)/1000);
    }
}

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
        type: 'send_bch',
        amount: data.amount,
        bch_address: data.bch_address
    };

    chrome.runtime.sendMessage( msg );

    console.log('Sent message to background!');
    console.log(msg);
}

function pageChanged() {

    var totalAddresses = 0;
    var html = document.body.innerHTML;
    var new_length = html.length;
    var length_changed = (last_length != new_length);

    var new_addresses = {};    
    var address_changed = false;

    find(/((bitcoincash:)?(q|p)[a-z0-9]{41})/g);
    find(/((BITCOINCASH:)?(Q|P)[A-Z0-9]{41})/g);

    last_addresses = new_addresses;

    if (totalAddresses == 0) return false;

    // this could be because of hovering that introduced text
    if (length_changed && !address_changed) return false;

    return length_changed || address_changed;

    function find(re) {

        do 
        {
            m = re.exec(html);

            if (m) {

                totalAddresses++;
                var key = m[0];

                new_addresses[key] = true;

                if (key in last_addresses) continue;

                // console.log('changed! because of ' + key);
                address_changed = true;
            }
        } 
        while (m);
    }
}