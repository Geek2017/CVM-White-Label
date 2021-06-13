angular.module('newApp').controller('eftauthorrationCtrl', function($scope) {
    var fcolor = localStorage.getItem('formcolor')
    $(".panel").css("border-top-color", fcolor);
    $(".btn-primary").css("background", fcolor)

    $(".x-navigation>li.xn-logo>a:first-child").css("background", fcolor);
    $(".x-navigation li.active>a").css("background", fcolor);
    $(".panel-success>.panel-heading").css("color", fcolor);
    $scope.comname = localStorage.getItem('comname');
    $scope.comlandmark = localStorage.getItem('landmark');
    $scope.comcity = localStorage.getItem('comcity');
    $scope.comstate = localStorage.getItem('comstate');
    $scope.compostalcode = localStorage.getItem('compostalcode');
    $scope.comno = localStorage.getItem('comcontact');

    var logo = sessionStorage.getItem('comlogo');
    if (logo) {

        console.log(logo.width, logo.height);
        var i = new Image();
        console.log(logo)
        i.onload = function() {
            console.log(i.width + ", " + i.height);

            if (i.width == i.height) {
                $('#comlogo').attr('src', logo).css({ 'width': '100px', 'height': '100px' });;
            } else {
                $('#comlogo').attr('src', logo).css({ 'width': '200px', 'height': '60px' });;
            }


        };
        i.src = logo;

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

    $scope.print = function() {
        $scope.comlogo = sessionStorage.getItem('comlogo');

        $('.removepanel').hide();
        $('#savesign').hide();
        $('#clear').hide();

        $(".modal-footer").hide();

        $("#removepanel0").removeClass("panel panel-warning panel-heading");
        $("#removepanel1").removeClass("panel panel-warning panel-heading");
        $("#removepanel2").removeClass("panel panel-warning panel-heading");


        $("#printThis").removeClass("pabel-body");

        $("input").addClass("txtinput");
        $("select").addClass("txtinput");

        $('input').attr('style', 'height: 23px!important');
        $('input').attr('style', 'font-size: 14px!important');

        $('table').addClass('tables');

        $('.modal-content').addClass('modal-contents');
        $("#printThis").addClass('printls');

        setTimeout(function() {
            html2canvas(document.querySelector("#printThis")).then(canvas => {
                document.body.appendChild(canvas)
                var nWindow = window.open('', 'PrintWindow', 'width=1000,height=1000', 'overflow=hidden');
                nWindow.document.body.appendChild(canvas)
                nWindow.focus();
                nWindow.print();

                setTimeout(function() {
                    location.replace('#/')
                    location.replace('#/eftauthorration')
                    nWindow.close();
                }, 2000)
            });
        }, 1000)

    }

    $scope.goindex = function() {
        window.location.replace("#/eftaindex");
    }
});