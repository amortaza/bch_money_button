function forEachAddress(cb) {
    let addr = {};

    var all = document.getElementsByTagName("*");

    for (var i=0, max=all.length; i < max; i++) {

        if (!all[i]) continue;

        var elem = $(all[i]);

        var text = elem.text();

        if (!text) continue;

        var words = text.split(/[^a-zA-Z0-9]/);

        for (var j=0;j<words.length;j++) {
            var w = words[j];

            if (!w) continue;

            //console.log(w);

            if ( isBCHAddress( w ) ) {

                if (j > 0 && (words[ j-1 ] == 'bitcoincash' || words[ j-1 ] == 'BITCOINCASH'))
                addr['bitcoincash:' + w] = all[i]; // it is important we store the non-jquery object
            }
        }
    }

    var ret = [];

    for ( var key in addr) {
        ret.push(key);
        console.log('found one: ' + key);
        cb(addr[key], key);
    }

    return ret;

    function isBCHAddress(addr) {
        // we do not include legacy addresses for safety reasons - ONLY works on explicit bitcoincash addresses!
        //var a = /^([13][a-km-zA-HJ-NP-Z1-9]{25,34})/.test(addr)
        //if ( a ) return true;

        // because we split on non-letters and non-numbers, ':' is split upon.
        // we will never get 'bitcoincash:' hit from regex
        var a = /^((bitcoincash:)?(q|p)[a-z0-9]{41})$/.test(addr)

        if ( a ) return true;

        a = /^((BITCOINCASH:)?(Q|P)[A-Z0-9]{41})$/.test(addr)

        return a;
    }
}
