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

    let count = 0;



    $(document).on('click', '#add', function(e) {
        e.preventDefault();

        if (count % 2 == 0) {

            count = count + 1;
            $("#content").append("<div  class='col-md-6' style='padding-left: 220px!important;'><div class='form-group'><label class='check'>&nbsp;</label><span class='col-md-0'></span><div class='input-group' style='width: 360px!important;'><input type='text' class='form-control' placeholder='Other Number' /><span id='rem' class='input-group-addon hover'><i class='fa fa-minus'></i></span></div></div></div>");
            console.log(count)
            return (count)
        } else {

            count = count + 1;
            $("#content").append("<div  class='col-md-6' style='padding-left: 114px!important;'><div class='form-group'><label class='check'>&nbsp;</label><span class='col-md-0'></span><div class='input-group' style='width: 380px!important;'><input type='text' class='form-control' placeholder='Other Number' /><span id='rem' class='input-group-addon hover'><i class='fa fa-minus'></i></span></div></div></div>");
            console.log(count)
            return (count)
        }

    });

    $(document).on('click', '#rem', function() {

        var r = confirm("Are you sure you want to remove this number ?");
        if (r == true) {
            $('#content div').last()[0].remove();
        }
    })





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