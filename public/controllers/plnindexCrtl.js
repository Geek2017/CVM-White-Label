angular.module('newApp').controller('plnindexCrtl', function($scope, $timeout) {

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

    firebase.database().ref('/portlocalnumber/').orderByChild('uid').on("value", function(snapshot) {
        let cdata = localStorage.getItem('curuserid');
        $timeout(function() {

            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    console.log(item, parseInt(cdata));

                    if (item.cusid == parseInt(cdata)) {
                        returnArr.push(item);
                    }
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

    $scope.trigersignpl = function() {
        var w = document.getElementById("signature-pad"),
            c = w.querySelector("canvas");


        document.getElementById('clear').addEventListener('click', function() {
            signaturePad.clear();

            $('#sign').prepend($('<canvas>'))
            $('#sigb64').remove();

            $scope.trigersignpl();

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

    let keyid;

    $scope.print = function() {

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
                location.replace('#/')
                location.replace('#/plnindex')
                setTimeout(function() {
                    nWindow.close();
                }, 2000)
            });
        }, 3000)

    }

    $scope.editpl = function(nsp) {

        console.log("edit data", nsp)

        $('canvas').remove();
        sigb64 = nsp.sign;
        $('#sign').prepend($('<img>', { id: 'sigb64', src: nsp.sign }))

        console.log(nsp)

        $scope.nsp = nsp;
        $scope.nsp.reqpd = new Date(nsp.reqpd);
        $scope.nsp.thedate = new Date(nsp.thedate);


        var onl = $scope.nsp.otherno;

        if (onl) {
            for (var i = 0; i < onl.length; i++) {
                if (i % 2 == 0) {
                    $("#left").append("<div class='form-group left'><span class='col-md-2'></span><div class='col-md-10'><div class='input-group'><input  type='text'  class='form-control oinput' value='" + $scope.nsp.otherno[i] + "' required/><span class='input-group-addon hover remt'><i class='fa fa-minus'></i></span></div></div></div>");
                } else {
                    $("#right").append("<div class='form-group right'><div class='col-md-10'><div class='input-group'><input type='text' class='form-control oinput' value='" + $scope.nsp.otherno[i] + "' required/><span class='input-group-addon hover remt'><i class='fa fa-minus'></i></span></div></div><span class='col-md-2'></span></div>");
                }
            }
        }




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

                var ref = firebase.database().ref("/portlocalnumber/" + nsp.key);
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

    let count = 0;


    $(document).on('click', '#addno', function(e) {
        if (count % 2 == 0) {

            $("#left").append("<div class='form-group left' ><span class='col-md-2'></span><div class='col-md-10'><div class='input-group' style='padding-top: 3px!important;'><input  type='text' id='ldata" + count + "' class='form-control oinput' required/><span class='input-group-addon hover remt'><i class='fa fa-minus'></i></span></div></div></div>");
            // console.log(count)
            count += 1;
            return (count)
        } else {

            $("#right").append("<div class='form-group right' ><div class='col-md-10'><div class='input-group' style='padding-top: 3px!important;'><input type='text' id='rdata" + count + "' class='form-control oinput' required/><span class='input-group-addon hover remt'><i class='fa fa-minus'></i></span></div></div><span class='col-md-2'></span></div>");
            // console.log(count)
            count += 1;
            return (count)
        }
    });

    $(document).on('click', '.remt', function() {

        if (count % 2 !== 0) {
            count = count - 1;
            $('#left div').last()[0].remove();

            console.log(count)
            return (count)
        } else {
            count = count - 1;
            $('#right div').last()[0].remove();

            console.log(count)
            return (count)
        }
    })

    var searchdate = localStorage.getItem('sdata')
    if (searchdate) {
        $('.clean').show()
        console.log(searchdate)
        $scope.findcf = searchdate
    } else {
        $('.clean').hide()
    }

    $scope.clean = function() {
        localStorage.removeItem("sdata");
        $scope.findcf = " "
        $('.clean').hide()
    }
}).filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})