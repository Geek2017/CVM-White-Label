angular.module('newApp').controller('eftauthorrationCtrl', function($scope) {

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


    $scope.eftsave = function() {


        try {
            var uid = firebase.database().ref().child('eftauthorization').push().key;

            localStorage.setItem('ukeyid', uid);

            var data = {
                fullname: $scope.fullname,
                compname: $scope.compname,
                acctpn: $scope.acctpn,
                bankname: $scope.bankname,
                bankroutingno: $scope.bankroutingno,
                bankacctno: $scope.bankacctno,
                date: $scope.date,
                email: $scope.email,
                sign: c.toDataURL(c)
            }

            var updates = {};
            updates['/eftauthorization/' + uid] = data;
            firebase.database().ref().update(updates);
            console.log(updates)

            if (updates) {
                $('#spsuccess').addClass('open')
                    // setTimeout(function() {
                    //     window.location.replace("#/");
                    //     window.location.replace("#/spindex");
                    // }, 2000)
            }

        } catch (err) {
            $("#errormsg").text(err);

            console.log(err)

            $('#sperror').addClass('open')
            setTimeout(function() {
                $('#sperror').removeClass('open')
            }, 8000)
        }

    }

    $scope.closesp = function() {
        $('#spsuccess').removeClass('open')
        window.location.replace("#/");
        window.location.replace("#/eftauthorration");
    }

    $scope.goindex = function() {
        window.location.replace("#/eftaindex");
    }
});