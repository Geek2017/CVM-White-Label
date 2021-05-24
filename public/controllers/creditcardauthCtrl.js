angular.module('newApp').controller('creditcardauthCtrl', function($scope) {
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

    $(document).on('click', '#ptfnrem', function() {

        var r = confirm("Are you sure you want to remove this number ?");
        if (r == true) {
            $('#content div').last()[0].remove();

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


    var cardname;

    $("#cardused input[type=checkbox]").change(function() {
        if ($scope.mastercard) {

            console.log(cardname)

            $('.americanexpress').attr('checked', false);
            $('.discover').attr('checked', false);
            $('.visa').attr('checked', false);

            return cardname = "Mastercard";

        } else if ($scope.discover) {

            $('.americanexpress').attr('checked', false);
            $('.mastercard').attr('checked', false);
            $('.visa').attr('checked', false);

            return cardname = "Discover"

        } else if ($scope.visa) {

            console.log(cardname)

            $('.americanexpress').attr('checked', false);
            $('.mastercard').attr('checked', false);
            $('.discover').attr('checked', false);

            return cardname = "Visa"

        } else if ($scope.americanexpress) {

            console.log(cardname)

            $('.visa').attr('checked', false);
            $('.mastercard').attr('checked', false);
            $('.discover').attr('checked', false);

            return cardname = "AmericanExpress"

        }
    });

    $scope.savecca = function() {


        try {
            var uid = firebase.database().ref().child('porttollfreenumber').push().key;

            localStorage.setItem('ukeyid', uid);



            var data = {
                fullname: $scope.fullname,
                compname: $scope.comname,
                services: $scope.services,
                acid: $scope.acid,
                card: cardname,
                date: $scope.date,
                ccnumber: $scope.ccnumber,
                csvcode: $scope.csvcode,
                expiredate: $scope.expiredate,
                nocard: $scope.nocard,
                street: $scope.street,
                city: $scope.city,
                state: $scope.state,
                zipcode: $scope.zipcode,
                telephone: $scope.telephone,
                email: $scope.email,
                sign: c.toDataURL(c)
            }

            var updates = {};
            updates['/creditcardauth/' + uid] = data;
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
        window.location.replace("#/creditcardauth");
    }

    $scope.goindex = function() {
        window.location.replace("#/ccaindex");
    }

});