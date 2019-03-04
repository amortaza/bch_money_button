
$(document).ready(function() {

    setupHandlers();

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 200,
        height : 200
    });

    qrcode.makeCode('Ace Rimmer - first officer!');

});


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
        $('#backup').hide(); 
        $('#refill').show();
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

