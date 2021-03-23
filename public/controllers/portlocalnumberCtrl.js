angular.module('newApp').controller('portlocalnumberCtrl', function($scope) {




    $("#comname").text(localStorage.getItem('comname'))
    $("#landmark").text(localStorage.getItem('landmark'))
    $("#comcity").text(localStorage.getItem('comcity'))
    $("#comstate").text(localStorage.getItem('comstate'))
    $("#compostalcode").text(localStorage.getItem('compostalcode'))
    $("#comno").text(localStorage.getItem('comcontact'))


    if (sessionStorage.getItem('comlogo')) {
        console.log('imageloaded')
        $('#comlogo').attr('src', sessionStorage.getItem('comlogo'));
    } else {
        console.log('imagenotloaded')
        $('#comlogo').attr('src', 'assets/images/plj.jpg')
    }





    $('#logoimg').hide()



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
    // window.open(data)






});