function AcE_bCh_ExT_create_bch_money_button(elem_parent, bch_address, price) {

    var bch_elem = voodoo(elem_parent);

    if (!bch_elem) return;

    voodoo2(bch_elem);

    function voodoo2(bch_elem) {

        var div = document.createElement('div');

        bch_elem.prepend(div);

        var shadow = div.attachShadow({mode: 'closed'});

        var send_html = sendHTML();

        shadow.innerHTML = send_html;

        var style = document.createElement('style');
        style.appendChild(document.createTextNode(styleCSS()));

        shadow.getElementById('main').appendChild(style);

        setBCH_on_Elem();

        var elem = $(shadow).find('button');
        elem.text( 'Send to ' + bch_address.substring(12, 16) + '...' + bch_address.substring(50)) ;


        $(shadow).find('#AcE_bCh_ExT_input').on('input', function(a) {
            setBCH_on_Elem();
        });

        $(shadow).find('#AcE_bCh_ExT_button').click(function() {

            var amount = readBCH_from_Elem();

            if (parseFloat(amount) < 0.00005) {
                alert('Amount of ' + amount + ' BCH is too low.');
                return;
            }

            window.postMessage({
                AcE_bCh_ExT:true,
                amount: amount,
                bch_address: bch_address
            }, "*");

            $(shadow).find('#AcE_bCh_ExT_input').val('-');
            $(shadow).find('#AcE_bCh_ExT_bch_amount').text('- BCH');
        });

        function setBCH_on_Elem() {
            var amount = $(shadow).find('#AcE_bCh_ExT_input').val() + '';                

            amount = parseFloat(amount);

            var elem = $(shadow).find('#AcE_bCh_ExT_bch_amount');

            elem.text( dollarToBCH( amount ) + ' BCH') ;
        }    

        function readBCH_from_Elem() {
            var amount = $(shadow).find('#AcE_bCh_ExT_input').val() + '';                

            amount = parseFloat(amount);            

            return dollarToBCH( amount );
        }    
    }

    function styleCSS() {
        var s = '';

        s +=        '.send_label {';
        s +=            'font-family:verdana;';
        s +=            'font-style:normal;';
        s +=            'font-size:1em;';
        s +=            'float:left;';
        s +=            'margin-top:0.34em;';
        s +=            'margin-right:1.5em;';
        s +=        '}';

        s +=        '.dollar_sign {';
        s +=            'font-family:verdana;';
        s +=            'font-style:normal;';
        s +=            'font-size:1.3em;';
        s +=            'float:left;';
        s +=            'margin-top:0.0em;';
        s +=            'margin-right:0.2em;';

        s +=        '}';

        s +=        'input {';
        s +=            'font-family:courier;';
        s +=            'font-size:1.3em;';
        s +=            'width:6em;';
        s +=            'height:1.4em;';
        s +=            'margin-right:1em;';
        s +=        '}';

        s +=        'button {';
        s +=            'width:16em;';
        s +=            'font-family:verdana;';
        s +=            'font-size:1.1em;';
        s +=            'margin-top:0.2em';
        s +=        '}';

        s +=        '.send_overlay {';
        s +=            'overflow:hidden;';

        s +=            'font-family:verdana;';
        s +=            'font-size:0.7em;';

        s +=            'background-color:yellow;';
        s +=            'border:0px solid orange;';

        s +=            'background-image: url("chrome-extension://nldmgdmhemjllgogonilfflggfohffmp/lib/hilite/bch.png");';
        s +=            'background-size: 2em 2em;';
        s +=            'background-repeat: no-repeat;';
        s +=            'background-position: 3 4;';

        s +=            'padding-left:2.8em;';
        s +=            'padding-top:0.4em;';
        s +=            'padding-bottom:0.4em;';
        s +=        '}';

        s +=        '.bch_amount {';
        s +=            'margin-right:1.5em;';
        s +=            'border:0px solid red;';
        s +=            'margin-top:0.34em;';
        s +=            'float:left;';
        s +=        '}';

        return s;
    }

    function sendHTML() {
        var s = '<div id="main" style="margin-bottom:5px;">';
        
        s +=  '<div class="send_overlay">';

        s +=      '<div class="send_label">Send</div>';
        s +=      '<div class="dollar_sign">$</div>';
        s +=      '<div style="float:left;overflow:hidden;">';
        s +=          '<input id="AcE_bCh_ExT_input" style="float:left;"></input>';
        s +=          '<div id="AcE_bCh_ExT_bch_amount" class="bch_amount"></div>';
        s +=          '<button id="AcE_bCh_ExT_button">Send</button>';
        s +=      '</div>';

        s +=  '</div>'

        return s + '</div>';
    }

    function voodoo(p) {

        var kids = p.childNodes;
        var regex = new RegExp(bch_address);
        var snip = '<span class="class_' + bch_address + '" style="background-color:yellow;border:1px solid orange">$&</span>';

        var bch_elem;

        for (var i = 0; i < kids.length; i++) {

            var kid = kids[i];

            if (kid.nodeType != 3) continue;

            if (!regex.test(kid.nodeValue)) continue;

            var nv = kid.nodeValue.replace(regex, snip);

            bch_elem = createDiv( nv );

            p.replaceChild( bch_elem, kid );
        }

        return bch_elem;
    }

    function createDiv(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div;
    }

    function dollarToBCH(amount) {

        if (isNaN(amount)) amount = 0;

        var bch = (amount / price); 

        bch = bch.toFixed(6);

        return bch;
    }
}

