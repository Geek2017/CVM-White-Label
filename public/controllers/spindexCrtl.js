angular.module('newApp').controller('spindexCrtl', function($scope, $timeout) {

    $("#comname").text(localStorage.getItem('comname'))
    $("#landmark").text(localStorage.getItem('landmark'))
    $("#comcity").text(localStorage.getItem('comcity'))
    $("#comstate").text(localStorage.getItem('comstate'))
    $("#compostalcode").text(localStorage.getItem('compostalcode'))
    $("#comno").text(localStorage.getItem('comcontact'))

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

    firebase.database().ref('/salesproposal/').orderByChild('uid').on("value", function(snapshot) {
        $timeout(function() {

            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                $scope.osps = returnArr;
                console.log($scope.osps);
            });

        })
    });

    // Email

    (function() {
        emailjs.init('user_0dRWnov2yzJ0mYSTS3nqs')
    })();

    const btn = document.getElementById('button');

    $("#myform").submit(function(event) {
        event.preventDefault();

        btn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_zbea5bx';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                alert('Sent!');
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });


    // MRC

    $scope.mcritems = [
        "Area Code Routing $50 monthly",
        "Batch FTP download $50 monthly",
        "Batch Zip files for recording $10 monthly",
        "Call Center Agent $5 per Agent",
        "Call Center Feature $50",
        "Conference Bridge $25 for up to 20 people",
        "Conference Bridge Additional people, $5 for each bundle of 5 people",
        "DID additional, first one free $2 each additional",
        "E911 by device $1 per device",
        "E911 by location $1 monthly per location",
        "Fax (vFax) $10",
        "Fax ATA $25",
        "International Dialing, client charged on the prevailing rate",
        "Smart CallerID $2 monthly per Smart CallerID",
        "Smart CardID Routing $10 monthly",
        "Teams Integration $4.50 per user monthly",
        "VCCComplete mobile app only device on extension, $2.50 monthly",
        "VCCComplete mobile app combined with any device on the extension, $ 5 monthly",
        "Voicemail Transcription $5 monthly per entire account"
    ];

    $scope.mrcmodel = $scope.mcritems;

    console.log($scope.mrcmodel)

    function calc_mrc() {

        var calculated_total_sum = 0;

        $("#mcrrowTable .mtprice").each(function() {
            var get_textbox_value = $(this).val();
            if ($.isNumeric(get_textbox_value)) {
                calculated_total_sum += parseFloat(get_textbox_value);
            }
        });
        console.log(calculated_total_sum);
        $('.mrcgtotal').text('$ ' + parseFloat(calculated_total_sum).toFixed(2))
    }

    $("#mcrrowTable").on('input', '.mrcu', function() {
        calc_mrc()
    });

    $("#mcrrowTable").on('input', '.mrcup', function() {
        calc_mrc()
    });

    $scope.mrc = [];

    $scope.mrcadd = function(mrc) {
        console.log($('.mtprice').val())
        var mrc = {};
        mrc.unit = $scope.unit;
        mrc.unitprice = $scope.unitprice;
        mrc.tprice = $scope.tprice;
        $scope.mrc.push(mrc);
    }

    $scope.mrcmin = function(mrc) {
        console.log(mrc.length);

        if (mrc.length !== 0) {
            $scope.mrc.splice(mrc.length - 1, 1);
        } else {
            rowCount = $('#mcrrowTable tr#tr1').length;
            console.log(rowCount)
            if (rowCount !== 0) {
                $('table#mcrrowTable tr#tr1:last').remove();
            } else {
                $('table#mcrrowTable tr#tr0:last').remove();
            }
        }

    }


    // NRC

    $scope.ncritems = [
        "Aastra/Mitel 6863i Basic | MSRP $100.00",
        "Aastra/Mitel 6867i Advanced Phone | MSRP $230.00",
        "Aastra/Mitel 6869i Executive Phone | MSRP $300.00",
        "Aastra/Mitel 6873i Advanced Touch Screen Executive Phone | MSRP $425.00 ",
        "Aastra/Mitel M680i Expansion Module | MSRP $80.00",
        "Aastra/Mitel M685i Expansion Module | MSRP $200.00",
        "Aastra/Mitel MiVoice Conference Phone | MSRP $1,195.00"
    ];

    $scope.nrcmodel = $scope.ncritems;

    console.log($scope.nrcmodel)

    function calc_mrc() {

        var calculated_total_sum = 0;

        $("#ncrrowTable .ntprice").each(function() {
            var get_textbox_value = $(this).val();
            if ($.isNumeric(get_textbox_value)) {
                calculated_total_sum += parseFloat(get_textbox_value);
            }
        });
        console.log(calculated_total_sum);
        $('.nrcgtotal').text('$ ' + parseFloat(calculated_total_sum).toFixed(2))
    }

    $("#ncrrowTable").on('input', '.nrcu', function() {
        calc_mrc()
    });

    $("#ncrrowTable").on('input', '.nrcup', function() {
        calc_mrc()
    });

    $scope.nrc = [];

    $scope.nrcadd = function(nrc) {
        console.log($('.ntprice').val())

        var nrc = {};
        nrc.unit = $scope.unit;
        nrc.unitprice = $scope.unitprice;
        nrc.tprice = $scope.tprice;
        $scope.nrc.push(nrc);
    }

    $scope.nrcmin = function(nrc) {
        console.log(nrc.length);

        if (nrc.length !== 0) {
            $scope.nrc.splice(nrc.length - 1, 1);
        } else {
            rowCount = $('#ncrrowTable tr#tr1').length;
            console.log(rowCount)
            if (rowCount !== 0) {
                $('table#ncrrowTable tr#tr1:last').remove();
            } else {
                $('table#ncrrowTable tr#tr0:last').remove();
            }
        }

    }




    // FPF

    $scope.fcritems = [
        "Aastra/Mitel 6863i Basic | MSRP $100.00",
        "Aastra/Mitel 6867i Advanced Phone | MSRP $230.00",
        "Aastra/Mitel 6869i Executive Phone | MSRP $300.00",
        "Aastra/Mitel 6873i Advanced Touch Screen Executive Phone | MSRP $425.00 ",
        "Aastra/Mitel M680i Expansion Module | MSRP $80.00",
        "Aastra/Mitel M685i Expansion Module | MSRP $200.00",
        "Aastra/Mitel MiVoice Conference Phone | MSRP $1,195.00"
    ];

    $scope.frcmodel = $scope.fcritems;

    console.log($scope.frcmodel)

    function calc_mrc() {

        var calculated_total_sum = 0;

        $("#fcrrowTable .ftprice").each(function() {
            var get_textbox_value = $(this).val();
            if ($.isNumeric(get_textbox_value)) {
                calculated_total_sum += parseFloat(get_textbox_value);
            }
        });
        console.log(calculated_total_sum);
        $('.nrcgtotal').text('$ ' + parseFloat(calculated_total_sum).toFixed(2))
    }

    $("#fcrrowTable").on('input', '.frcu', function() {
        calc_mrc()
    });

    $("#fcrrowTable").on('input', '.frcup', function() {
        calc_mrc()
    });

    $scope.frc = [];

    $scope.frcadd = function(frc) {
        console.log($('.ntprice').val())

        var nrc = {};
        nrc.unit = $scope.unit;
        nrc.unitprice = $scope.unitprice;
        nrc.tprice = $scope.tprice;
        $scope.nrc.push(nrc);
    }

    $scope.frcmin = function(frc) {
        console.log(nrc.length);

        if (nrc.length !== 0) {
            $scope.nrc.splice(nrc.length - 1, 1);
        } else {
            rowCount = $('#ncrrowTable tr#tr1').length;
            console.log(rowCount)
            if (rowCount !== 0) {
                $('table#ncrrowTable tr#tr1:last').remove();
            } else {
                $('table#ncrrowTable tr#tr0:last').remove();
            }
        }

    }



    $scope.passwordcall = function(length, special) {
        var iteration = 0;
        var password = "";
        var randomNumber;
        if (special == undefined) {
            var special = false;
        }
        while (iteration < length) {
            randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
            if (!special) {
                if ((randomNumber >= 33) && (randomNumber <= 47)) { continue; }
                if ((randomNumber >= 58) && (randomNumber <= 64)) { continue; }
                if ((randomNumber >= 91) && (randomNumber <= 96)) { continue; }
                if ((randomNumber >= 123) && (randomNumber <= 126)) { continue; }
            }
            iteration++;
            password += String.fromCharCode(randomNumber);
        }
        // document.getElementById('hash').innerHTML=password;

        $scope.hash = window.location.origin + '/formsindex.html#/:' + password;
        console.log(password);
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
        updates['/sfsalespropsal/' + uid] = data;
        firebase.database().ref().update(updates, alert('Data Saved!'));

    });

    var sigb64;

    $scope.trigersign = function() {
        var w = document.getElementById("signature-pad"),
            c = w.querySelector("canvas");


        document.getElementById('clear').addEventListener('click', function() {
            signaturePad.clear();

            $('#sign').prepend($('<canvas>'))
            $('#sigb64').remove();

            $scope.trigersign();

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

    $scope.edit = function(nsp) {
        $('canvas').remove();

        $('#sign').prepend($('<img>', { id: 'sigb64', src: nsp.sign }))

        console.log(nsp)

        $scope.nsp = nsp;
        $scope.nsp.date0 = new Date(nsp.date0);
        $scope.nsp.date1 = new Date(nsp.date1);

        console.log($scope.nsp.mrc)
        console.log($scope.nsp.nrc)

        return keyid = nsp.key;

    }

    $scope.updatesp = function(obj0) {


        console.log(keyid);
        console.log(sigb64);

        var table0 = $('#mcrrowTable').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.find("#type0 option:selected").text() ||
                    $cell.find("#type1 option:selected").text();
            }
        })

        const ino0 = table0.length - 1;
        console.log(table0, ino0)
        var newtable0 = table0.splice(ino0, 1);
        console.log(table0)

        var table1 = $('#ncrrowTable').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.find("#type0 option:selected").text() ||
                    $cell.find("#type1 option:selected").text();
            }
        })
        const ino1 = table1.length - 1;
        console.log(table1, ino1)
        var newtable1 = table1.splice(ino1, 1);
        console.log(table1)

        var table2 = $('#fpfrowTable').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.find("#type0 option:selected").text() ||
                    $cell.find("#type1 option:selected").text();
            }
        })
        const ino2 = table2.length - 1;
        console.log(table2, ino2)
        var newtable2 = table2.splice(ino2, 1);
        console.log(table2)

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

        } catch (err) {
            console.log(err)
        }

    }





}).filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})