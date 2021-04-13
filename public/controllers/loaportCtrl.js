'use strict';

angular.module('newApp').controller('loaportCtrl', function($scope) {
    $scope.comname = localStorage.getItem('comname');
    $scope.comlandmark = localStorage.getItem('landmark');
    $scope.comcity = localStorage.getItem('comcity');
    $scope.comstate = localStorage.getItem('comstate');
    $scope.compostalcode = localStorage.getItem('compostalcode');
    $scope.comno = localStorage.getItem('comcontact');

    if (sessionStorage.getItem('comlogo')) {
        console.log('imageloaded')
        $('#comlogo').attr('src', sessionStorage.getItem('comlogo'));
    } else {
        console.log('imagenotloaded')
        $('#comlogo').attr('src', 'assets/images/plj.jpg')
    }

    $('.wrapper').on('click', '.clone', function() {
        $('.clone').closest('.wrapper').find('.element').first().clone().appendTo('.results');
    });
    $('.wrapper').on('click', '.remove', function() {
        $('.remove').closest('.wrapper').find('.element').not(':first').last().remove();
    });

    let ptfncount = 0;



    // object.addEventListener("hashchange", changePart);


    $(document).on('click', '#ptfnadd', function(e) {
        e.preventDefault();
        console.log(ptfncount)
        if (ptfncount % 2 == 0) {
            ptfncount = ptfncount + 1;
            $("#ptleft").append("<div  id='ptfnrem' class='form-group ptfnrem'><span class='col-md-2'></span><div class='col-md-10'><div class='input-group'><input type='text' class='form-control' required/><span class='input-group-addon hover'><i class='fa fa-minus'></i></span></div></div></div>");
            console.log(ptfncount)
            return (ptfncount)
        } else {
            ptfncount = ptfncount + 1;
            $("#ptright").append("<div id='ptfnrem' class='form-group ptfnrem'><div class='col-md-10'><div class='input-group'><input type='text' class='form-control' required/><span  class='input-group-addon hover'><i class='fa fa-minus'></i></span></div></div><span class='col-md-2'></span></div>");
            console.log(ptfncount)
            return (ptfncount)
        }
        ``

    });

    $(document).on('click', '#ptfnrem', function() {

        var r = confirm("Are you sure you want to remove this number ?");
        if (r == true) {
            if (ptfncount % 2 !== 0) {
                ptfncount = ptfncount - 1;
                $('#ptleft div').last()[0].remove();
                $('.ptleft div').last()[0].remove();
                console.log(ptfncount)
                return (ptfncount)
            } else {
                ptfncount = ptfncount - 1;
                $('#ptright div').last()[0].remove();
                $('.ptright div').last()[0].remove();
                console.log(ptfncount)
                return (ptfncount)
            }
        }
    })

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