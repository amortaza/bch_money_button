function AcE_bCh_ExT_create_bch_money_button(elem_parent, bch_address, price) {

    voodoo(elem_parent);

    // __create_money_button(i, elem_parent, bch_address, price, pos);

    function __create_money_button(ID, elem_parent, bch_address, price) {

        createOverlays();  
        createPaylays();  

        function createOverlays() {

            var div_overlay = $('<div class="AcE_bCh_ExT_overlay">Send</div>')                
                .prependTo(elem_parent);

            div_overlay.click( function(){
                /*if ( qframe.is(':hidden'))
                    qframe.show();
                else
                    qframe.hide();*/
            });
        }

        function createPaylays() {

/*
            paylay.find('#AcE_bCh_ExT_send_button_' + ID).click(function() {
                var amount = readBCHfromElem();
                var number = parseFloat(amount);

                /*if (isNaN(number) || number <= 0) {
                    console.log('BCH amount of ' + amount + ' is too low.');
                    return;
                }*/

  /*              console.log('sent message');

                window.postMessage({
                    AcE_bCh_ExT:true,
                    amount: amount,
                    bch_address: bch_address
                }, "*");
            });

            paylay.find('#AcE_bCh_ExT_input_' + ID).on('input', function(a) {
                setBCHonElem();
            });

            setBCHaddress();
            setBCHonElem();*/

            function setBCHaddress() {
                var elem = paylay.find('#AcE_bCh_ExT_address_' + ID);

                elem.text(bch_address) ;
            }

            function setBCHonElem() {
                var amount = paylay.find('#AcE_bCh_ExT_input_' + ID).val() + '';                

                amount = parseFloat(amount);

                var elem = paylay.find('#AcE_bCh_ExT_bch_' + ID);

                elem.text( dollarToBCH( amount ) + ' BCH') ;
            }

            function readBCHfromElem() {
                var elem = paylay.find('#AcE_bCh_ExT_bch_' + ID);
                
                var t = elem.text();

                t = t.replace(' BCH', '');

                return t;
            }
        }

        function dollarToBCH(amount) {
            var bch = 'unknown';

            if ( !isNaN(amount)) {
                bch = (amount / price);

                bch = bch.toFixed(6);
            }

            return bch;
        }
    }

    function voodoo(p, cb) {

        if (!p) return;

        var kids = p.childNodes;
        var regex = new RegExp(bch_address);
        var snip = '<span style="background-color:yellow;border:1px solid orange">$&</span>';

        for (var i = 0; i < kids.length; i++) {

            var kid = kids[i];

            if (kid.nodeType != 3) continue;

            if (!regex.test(kid.nodeValue)) continue;

            var nv = kid.nodeValue.replace(regex, snip);

            var newDiv = createDiv( nv );

            var nn = p.replaceChild( newDiv, kid );

            __create_money_button(i, newDiv, bch_address, 103);
        }

        function createDiv(html) {
            var div = document.createElement('div');
            div.innerHTML = html;
            return div;
        }
    }
}

