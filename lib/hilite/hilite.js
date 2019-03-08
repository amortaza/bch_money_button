function AcE_bCh_ExT_create_bch_money_button(elem_parent, bch_address, price) {

    var bch_elem = voodoo(elem_parent);

    if (!bch_elem) return;

    voodoo2(bch_elem);

    function voodoo2(bch_elem) {

        var div = document.createElement('div');

        bch_elem.prepend(div);

        var shadow = div.attachShadow({mode: 'open'});

        var send_html = sendHTML();

        shadow.innerHTML = send_html;

        /*var style = document.createElement('style');
        style.appendChild(document.createTextNode(styleCSS()));

        shadow.getElementById('main').appendChild(style);*/

        /**/        

        var linkElement = document.createElement('link');

        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', '../send.css');

        //document.getElementsByTagName('head')[0].appendChild(linkElement);
                shadow.getElementById('main').appendChild(linkElement);

        /**/


        $(shadow).find('#AcE_bCh_ExT_input').on('input', function(a) {
            setBCHonElem();
        });

        function setBCHonElem() {
            var amount = $(shadow).find('#AcE_bCh_ExT_input').val() + '';                

            amount = parseFloat(amount);

            var elem = $(shadow).find('#AcE_bCh_ExT_bch_amount');

            elem.text( dollarToBCH( amount ) + ' BCH') ;
        }    
    }

    function styleCSS() {
        var s = '';

        s +=        'input {';
        s +=            'width:60px;';
        s +=            'height:19px;';
        s +=            'margin-right:6px;';

        s +=        '}';

        s +=        'button {';
        s +=            'width:50px;';
        s +=            'height:19px;';
        s +=        '}';

        s +=        '.AcE_bCh_ExT_overlay {';
        s +=            'font-family:verdana;';
        s +=            'font-size:0.7em;';
        s +=            'opacity: 1;';
        s +=            'background-color:yellow;';
        s +=            'border:1px solid orange;';
        s +=            'z-index: 100;';

        s +=            'background-image: url("chrome-extension://nldmgdmhemjllgogonilfflggfohffmp/lib/hilite/bch.png");';
        s +=            'background-size: 2em 2em;';
        s +=            'background-repeat: no-repeat;';
        s +=            'background-position: 2 1;';
        s +=            'padding-left:2.5em;';
        s +=            'padding-right:0.5em;';
        s +=            'padding-top:0.45em;';
        s +=            'padding-bottom:0.45em;';
        s +=            'cursor:pointer;';
        s +=        '}';

        s +=        '.AcE_bCh_ExT_bch_amount {';
        s +=            'margin-left:1.5em;';
        s +=            'margin-right:1.5em;';
        s +=            'width:100px;';
        s +=            'border:1px solid red;';
        s +=        '}';

        return s;
    }

    function sendHTML() {
        var s = '<div id="main" style="margin-bottom:5px;">';
        
        s +=  '<div class="AcE_bCh_ExT_overlay" style="overflow:hidden">';

        s +=      '<div style="float:left;">Send</div>';
        s +=      '<div style="float:left;margin-left:20px;">';
        s +=          '<input id="AcE_bCh_ExT_input"></input>';
        s +=          '<span id="AcE_bCh_ExT_bch_amount" class="AcE_bCh_ExT_bch_amount"></span>';
        s +=          '<button>send</button>';
        s +=      '</div>';

        s +=  '</div>'

                // s += '<style >' + styleCSS() + '</style>';


        return s + '</div>';
    }

    function voodoo(p) {

        if (!p) return;

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
        var bch = 'unknown';

        if ( !isNaN(amount)) {
            bch = (amount / 130); // todo

            bch = bch.toFixed(6);
        }

        return bch;
    }


}

