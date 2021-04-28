angular.module('newApp').controller('ccaindexCrtl', function($scope, $timeout) {
    var fcolor = localStorage.getItem('formcolor')
    $(".panel").css("border-top-color", fcolor);
    $(".btn-primary").css("background", fcolor)
    $(".btn-primary").css("border-color", 'white')
    $(".x-navigation>li.xn-logo>a:first-child").css("background", fcolor);
    $(".x-navigation li.active>a").css("background", fcolor);
    $(".panel-success>.panel-heading").css("color", fcolor);
    $scope.comname = localStorage.getItem('comname');
    $scope.comlandmark = localStorage.getItem('landmark');
    $scope.comcity = localStorage.getItem('comcity');
    $scope.comstate = localStorage.getItem('comstate');
    $scope.compostalcode = localStorage.getItem('compostalcode');
    $scope.comno = localStorage.getItem('comcontact');

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];

    $scope.numberOfPages = () => {
        return Math.ceil(
            $scope.data.length / $scope.pageSize
        );
    }

    for (var i = 0; i < 10; i++) {
        $scope.data.push(`Question number ${i}`);
    }

    if (sessionStorage.getItem('comlogo')) {
        console.log('imageloaded')
        $('#comlogo').attr('src', sessionStorage.getItem('comlogo'));
    } else {
        console.log('imagenotloaded')
        $('#comlogo').attr('src', 'assets/images/plj.jpg')
    }

    firebase.database().ref('/creditcardauth/').orderByChild('uid').on("value", function(snapshot) {
        $timeout(function() {

            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                $scope.opln = returnArr;
                console.log($scope.opln);
            });

        })
    });




    $scope.passwordcall = function(length, special) {

        // document.getElementById('hash').innerHTML=password;

        $scope.hash = window.location.origin + '/formsindex.html#/:' + password;

        sessionStorage.setItem('hkc', password);
    }


    $("#myform").submit(function(event) {


        var uid = firebase.database().ref().child('users').push().key;

        var data = {
            mailfrom: $scope.mailfrom,
            cusid: localStorage.getItem('curuserid'),
            mailadd: $scope.mailto,
            sendername: $scope.mailfrom,
            recipientname: $scope.mailto,
            hashkeycode: sessionStorage.getItem('hkc')
        }

        var updates = {};
        updates['/portlocalnumber/' + uid] = data;
        firebase.database().ref().update(updates, alert('Data Saved!'));

    });

    var sigb64;

    $scope.trigersigncca = function() {
        var w = document.getElementById("signature-pad"),
            c = w.querySelector("canvas");

        document.getElementById('clear').addEventListener('click', function() {
            signaturePad.clear();

            $('#sign').prepend($('<canvas>'))
            $('#sigb64').remove();

            $scope.trigersigncca();

        });

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

        $("#savesign").click(function() {
            sigb64 = c.toDataURL(c);
        });

    }

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


    let keyid;

    $scope.editcca = function(nsp) {



        console.log(nsp.card);

        if (nsp.card == "Visa") {

            $('.visa').prop('checked', true);


        } else if (nsp.card = "AmericanExpress") {

            $('.americanExpress').prop('checked', true);


        } else if (nsp.card = 'Mastercard') {

            $('.mastercard').prop('checked', true);

        } else if (nsp.card = 'Discover') {

            $('.discover').prop('checked', true);

        }

        $('canvas').remove();
        sigb64 = nsp.sign;
        $('#sign').prepend($('<img>', { id: 'sigb64', src: nsp.sign }))

        console.log(nsp)

        $scope.nsp = nsp;

        $scope.nsp.date = new Date(nsp.date);

        $scope.nsp.expiredate = new Date(nsp.expiredate);

        console.log($scope.nsp.mrc)

        console.log($scope.nsp.nrc)

        return keyid = nsp.key;

    }

    $scope.updatepln = function() {


        try {
            var uid = keyid;

            var data = {
                mrc: table0,
                nrc: table1,
                fpfrow: table2,
                bizname: $scope.nsp.bizname,
                contactname: $scope.nsp.contactname,
                title: $scope.nsp.title,
                phone: $scope.nsp.phone,
                street: $scope.nsp.street,
                city: $scope.nsp.city,
                state: $scope.nsp.state,
                zipcode: $scope.nsp.zipcode,
                presentedby: $scope.nsp.presentedby,
                date0: $scope.nsp.date0,
                date1: $scope.nsp.date1,
                billing: $scope.nsp.billing,
                title2: $scope.nsp.title2,
                phone2: $scope.nsp.phone2,
                street2: $scope.nsp.street2,
                city2: $scope.nsp.city2,
                state2: $scope.nsp.state2,
                zipcode2: $scope.nsp.zipcode2,
                termlength: $scope.nsp.termlength,
                mainphoneno: $scope.nsp.mainphoneno,
                sign: sigb64
            }

            var updates = {};
            updates['/salesproposal/' + uid] = data;
            firebase.database().ref().update(updates);
            console.log(updates)


            if (updates) {
                $('#spsuccess').addClass('open')
                setTimeout(function() {
                    window.location.replace("#/");
                    window.location.replace("#/spindex");
                }, 2000)

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

    $scope.deletesp = function(nsp) {
        $('#spdelete').addClass('open')
        console.log(nsp.key);
        $scope.confirmdel = function() {
            if ($scope.deleteconfirm === "remove") {

                var ref = firebase.database().ref("/creditcardauth/" + nsp.key);
                ref.remove()
                    .then(function() {
                        console.log("Remove succeeded.")
                        $('#spdelete').removeClass('open')
                    })
                    .catch(function(error) {
                        console.log(error.message)
                    });

            }
        }
    }

    $scope.closesp = function() {
        $('#spdelete').removeClass('open')
    }

    $scope.printid = function() {
        html2canvas($("#qrids"), {
            onrendered: function(canvas) {
                var nWindow = window.open('');
                nWindow.document.body.appendChild(canvas);
                nWindow.focus();
                location.replace('#/')
                location.replace('#/ccaindex')
                nWindow.print();
            }
        });
    }


}).filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})