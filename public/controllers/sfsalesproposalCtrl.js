angular.module('sfApp').controller('sfsalesproposalCtrl', function($scope) {
    var fcolor = localStorage.getItem('formcolor')
    $(".panel").css("border-top-color", fcolor);
    $(".btn-primary").css("background", fcolor)
    $(".btn-primary").css("border-color", 'white')
    $(".x-navigation>li.xn-logo>a:first-child").css("background", fcolor);
    $(".x-navigation li.active>a").css("background", fcolor);
    $(".panel-success>.panel-heading").css("color", fcolor);

    if (localStorage.getItem('comlogo')) {
        console.log('imageloaded')
        $('#comlogo').attr('src', localStorage.getItem('comlogo'));
        if (localStorage.getItem('comname')) {
            $scope.comname = localStorage.getItem('comname');
            $scope.comlandmark = localStorage.getItem('landmark');
            $scope.comcity = localStorage.getItem('comcity');
            $scope.comstate = localStorage.getItem('comstate');
            $scope.compostalcode = localStorage.getItem('compostalcode');
            $scope.comno = localStorage.getItem('comcontact');;
        }
    } else {
        console.log('imagenotloaded')
        $('#comlogo').attr('src', 'assets/images/plj.jpg')
    }

    var hashkey = sessionStorage.getItem('hashkey');

    console.log(hashkey)



    firebase.database().ref("/salesproposal/" + hashkey).on("value", function(snapshot) {
        console.log(snapshot.val());

        $('.bizname').val(snapshot.val().bizname);
        $('.bizname2').val(snapshot.val().bizname2);
        $('.custname').val(snapshot.val().custname);
        $('.custname2').val(snapshot.val().custname2);

        $('.phone').val(snapshot.val().phone);
        $('.city').val(snapshot.val().city);
        $('.street').val(snapshot.val().street);
        $('.state').val(snapshot.val().state);
        $('.zipcode').val(snapshot.val().zipcode);

        $('.phone2').val(snapshot.val().phone2);
        $('.city2').val(snapshot.val().city2);
        $('.street2').val(snapshot.val().street2);
        $('.state2').val(snapshot.val().state2);
        $('.zipcode2').val(snapshot.val().zipcode2);

        $('.presentedby').val(snapshot.val().presentedby);
        $('.termlength').val(snapshot.val().termlength);


    });

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