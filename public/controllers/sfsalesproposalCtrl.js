angular.module('sfApp').controller('sfsalesproposalCtrl', function($scope) {



    if (localStorage.getItem('comlogo')) {
        console.log('imageloaded')
        $('#comlogo').attr('src', localStorage.getItem('comlogo'));
        $("#comname").text(localStorage.getItem('comname'))
        $("#landmark").text(localStorage.getItem('landmark'))
        $("#comcity").text(localStorage.getItem('comcity'))
        $("#comstate").text(localStorage.getItem('comstate'))
        $("#compostalcode").text(localStorage.getItem('compostalcode'))
        $("#comno").text(localStorage.getItem('comcontact'))
    } else {
        console.log('imagenotloaded')
        $('#comlogo').attr('src', 'assets/images/plj.jpg')
        $("#comname").text('Company Name')
        $("#landmark").text('Company Landmark')
        $("#comcity").text('Company City')
        $("#comstate").text('Company State')
        $("#compostalcode").text('Company Code')
        $("#comno").text('Company Text')
    }

    if (sessionStorage.getItem('hashkey')) {
        console.log('valid hashkey')
    } else {
        $(location).attr('href', 'login');
    }
    document.getElementById('clear').addEventListener('click', function() {
        signaturePad.clear();
    });
    var w = document.getElementById("signature-pad"),
        c = w.querySelector("canvas");

    function resizeCanvas(canvas) {
        var ratio = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }

    resizeCanvas(c);

    var data = "";

    console.log("devicePixelRatio: ", window.devicePixelRatio);
    console.log("data length: ", data.length);

    var signaturePad = new SignaturePad(c);
    signaturePad.fromDataURL(data);

});