angular.module('newApp').controller('portlocalnumberCtrl', function($scope) {




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



    let count = 0;


    $("#send").click(function() {



    });

    $(document).on('click', '#addno', function(e) {
        if (count % 2 == 0) {

            $("#left").append("<div class='form-group left'><span class='col-md-2'></span><div class='col-md-10'><div class='input-group'><input  type='text' id='ldata" + count + "' class='form-control' required/><span class='input-group-addon hover remt'><i class='fa fa-minus'></i></span></div></div></div>");
            // console.log(count)
            count += 1;
            return (count)
        } else {

            $("#right").append("<div class='form-group right'><div class='col-md-10'><div class='input-group'><input type='text' id='rdata" + count + "' class='form-control' required/><span class='input-group-addon hover remt'><i class='fa fa-minus'></i></span></div></div><span class='col-md-2'></span></div>");
            // console.log(count)
            count += 1;
            return (count)
        }
    });

    $(document).on('click', '.remt', function() {
        var r = confirm("Are you sure you want to remove this number ?");
        if (r == true) {
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


    $scope.savepln = function() {
        var otherno = [];
        for (var j = 0; j < count; j++) {
            var val0 = $("#ldata" + j).val();
            var val1 = $("#rdata" + j).val();
            if (val0) {
                otherno.push(val0);
                console.log(val0);
            } else {
                otherno.push(val1);
                console.log(val1);
            }
        }


        $scope.closed = function() {
            $('#spsuccess').removeClass('open')
            window.location.replace("#/");
            window.location.replace("#/portlocalnumber");
        }

        $scope.goindex = function() {
            window.location.replace("#/plnindex");
        }

        setTimeout(function() {
            try {

                var uid = firebase.database().ref().child('portlocalnumber').push().key;

                localStorage.setItem('ukeyid', uid);

                var data = {
                    mainbtn: $scope.mainbtn,
                    acctnumber: $scope.acctnumber,
                    street2: $scope.street2,
                    city2: $scope.city2,
                    state2: $scope.state2,
                    zipcode2: $scope.zipcode2,
                    e911: $scope.e911,
                    cname: $scope.cname,
                    numberbarn: $scope.numberbarn,
                    reqpd: $scope.reqpd,
                    custname: $scope.custname,
                    street1: $scope.street1,
                    city1: $scope.city1,
                    state1: $scope.state1,
                    zipcode1: $scope.zipcode1,
                    asname: $scope.asname,
                    asphone: $scope.asphone,
                    mainno: $scope.mainno,
                    addno: $scope.addno,
                    otherno: otherno,
                    thedate: $scope.thedate,
                    printname: $scope.printname,
                    emailadd: $scope.emailadd,
                    sign: c.toDataURL(c)
                }

                var updates = {};
                updates['/portlocalnumber/' + uid] = data;
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
        }, 2000)
    }



});