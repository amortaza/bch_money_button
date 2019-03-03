function AcE_bCh_ExT_create_bch_money_button(elem_parent, bch_address, price) {
    var poss = voodoo(elem_parent);

    for (var i=0;i<poss.length;i++) {
        var pos=poss[i];

        __create_money_button(i, elem_parent, bch_address, price, pos);
    } 

    var resizeTimer;

    window.addEventListener('resize', function() { 

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {

            __delete_all();
            AcE_bCh_ExT_create_bch_money_button(elem_parent, bch_address, price);
            
        }, 1000);
    });

    function __delete_all() {
        $('.AcE_bCh_ExT_hilite').remove();
        $('.AcE_bCh_ExT_overlay').remove();
        $('.AcE_bCh_ExT_paylay').remove();
    }

    function __create_money_button(ID, elem_parent, bch_address, price, pos) {

        createOverlays();  
        createPaylays();  

        function createOverlays() {

            var div_overlay = $('<div class="AcE_bCh_ExT_overlay">Send</div>')                
                .prependTo(elem_parent)
                .css('left', pos.left)
                .css('top', pos.top - pos.height - 10)
                .height(pos.height + 0 );

            var high = $('<div class="AcE_bCh_ExT_hilite"></div>')
                .prependTo(elem_parent)
                .css('left', pos.left)
                .css('top', pos.top)
                .width(pos.width)
                .height(pos.height);

            div_overlay.click( function(){
                var div_paylay = $(elem_parent).find('#AcE_bCh_ExT_paylay_' + ID);

                if ( div_paylay.length === 0) { console.log('did not find paylay.'); return; }

                if ( div_paylay.is(':hidden'))
                    div_paylay.show();
                else
                    div_paylay.hide();
            });
        }

        function createPaylays() {
            var paylay = createPaylayHTML();

            paylay
                .prependTo(elem_parent)
                .css('left', pos.left)                
                .draggable()
                .hide();

            paylay.css('top', pos.top - paylay.height() - 20 - 10)

            paylay.find('#AcE_bCh_ExT_close_action_' + ID).click(function() {
                paylay.hide();
            });

            paylay.find('#AcE_bCh_ExT_send_button_' + ID).click(function() {
                var amount = readBCHfromElem();
                var number = parseFloat(amount);

                /*if (isNaN(number) || number <= 0) {
                    console.log('BCH amount of ' + amount + ' is too low.');
                    return;
                }*/

                console.log('sent message');

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
            setBCHonElem();

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

            function createPaylayHTML() {
                var overlay =   '<div id="AcE_bCh_ExT_paylay_' + ID + '" class="AcE_bCh_ExT_paylay">';
                overlay +=          '<div class="header">';
                overlay +=              '<span id="AcE_bCh_ExT_close_action_' + ID + '" class="AcE_bCh_ExT_close">close</span>';
                overlay +=          '</div>';
                overlay +=          '<div class="body">';
                overlay +=              '<div class="addressbox">';
                overlay +=                 '<div id="AcE_bCh_ExT_address_' + ID + '" class="address"></div>';
                overlay +=              '</div>';
                overlay +=              '<div class="payment">';
                overlay +=                  '<div class="left">';
                overlay +=                      '<span id="AcE_bCh_ExT_bch_' + ID + '" class="bch"></span>';            
                overlay +=                      '<input id="AcE_bCh_ExT_input_' + ID + '" type="text" value="0.00"/>';
                overlay +=                      '<span class="usd">USD</span>';
                overlay +=                  '</div>';
                overlay +=                  '<div class="right">';
                overlay +=                      '<button id="AcE_bCh_ExT_send_button_' + ID + '" >Send BCH</button>';
                overlay +=                  '</div>';
                overlay +=              '</div>';
                overlay +=          '</div>';
                overlay +=      '</div>';

                return $(overlay);
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

        var poss = [];

        function giveMeDOM(html) {

            var div = document.createElement('div'),
                frag = document.createDocumentFragment();

            div.innerHTML = html;

            while (div.firstChild) {
                frag.appendChild( div.firstChild );
            }

            return frag;
        }

        if (!p) return;

        var offset = p.getBoundingClientRect();

        var parent = p.parentNode;
        var elem = p.cloneNode(true);

        parent.insertBefore(elem, p);
        parent.removeChild(p);

        var kids = elem.childNodes;
        var regex = new RegExp(bch_address);

        for(var i=0;i<kids.length; i++) {
            var kid=kids[i];
            if (kid.nodeType != 3) continue;


            var newStructure = giveMeDOM( kid.nodeValue.replace(regex, '<span style="background-color:green;" class="ace">$&</span>') );

            elem.replaceChild( newStructure, kid );
        }

        var elements =  document.getElementsByClassName('ace');

        for(var i=0;i<elements.length;i++) {

            var pos = elements[i].getBoundingClientRect();

            if (!pos) continue;

            poss.push({
                left: pos.left + document.body.scrollLeft, 
                top:  pos.top + document.body.scrollTop, 
                width:pos.width, 
                height:pos.height});
        }

        parent.insertBefore(p, elem);
        parent.removeChild(elem);

        return poss;
    }
}

