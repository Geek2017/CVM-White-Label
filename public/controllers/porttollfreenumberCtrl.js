angular.module('newApp').controller('porttollfreenumber', function($scope) {

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

    let ptfncount = 0;

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

    $scope.saveptfn = function() {

        try {
            var uid = firebase.database().ref().child('porttollfreenumber').push().key;

            localStorage.setItem('ukeyid', uid);

            var data = {
                acctno: $scope.acctno,
                street0: $scope.street0,
                city0: $scope.city0,
                zipcode0: $scope.zipcode0,
                asname: $scope.asname,
                custname: $scope.custname,
                street1: $scope.street1,
                city1: $scope.city1,
                state0: $scope.state0,
                state1: $scope.state1,
                zipcode1: $scope.zipcode1,
                rpdate: $scope.rpdate,
                mainno: $scope.mainno,
                otherno: $scope.otherno,
                datesign: $scope.datesign,
                sign: c.toDataURL(c)
            }

            var updates = {};
            updates['/porttollfreenumber/' + uid] = data;
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
        window.location.replace("#/porttollfreenumber");
    }

    $scope.goindex = function() {
        window.location.replace("#/ptfnindex");
    }

});