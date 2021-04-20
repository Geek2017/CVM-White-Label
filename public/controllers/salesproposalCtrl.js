angular.module('newApp').controller('salesproposalCtrl', function($scope, ) {


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
    })





    // MRC
    $scope.mcritems = [{
        items: "Select"
    }, {
        items: "Area Code Routing $50 monthly"
    }, {
        items: "Batch FTP download $50 monthly "
    }, {
        items: "Batch Zip files for recording $10 monthly"
    }, {
        items: "Call Center Agent $5 per Agent"
    }, {
        items: "Call Center Feature $50"
    }, {
        items: "Conference Bridge $25 for up to twenty people"
    }, {
        items: "Conference Bridge Additional people, $5 for each bundle of 5 people"
    }, {
        items: "DID additional, first one free $2 each additional"
    }, {
        items: "E911 by device $1 per device"
    }, {
        items: "E911 by location $1 monthly per location"
    }, {
        items: "Fax (vFax) $10"
    }, {
        items: "Fax ATA $25"
    }, {
        items: "International Dialing, client charged on the prevailing rate"
    }, {
        items: "Smart CallerID $2 monthly per Smart CallerID"
    }, {
        items: "Smart CardID Routing $10 monthly"
    }, {
        items: "Teams Integration $4.50 per user monthly"
    }, {
        items: "VCCComplete mobile app only device on extension, $2.50 monthly"
    }, {
        items: "VCCComplete mobile app combined with any device on the extension, $ 5 monthly"
    }, {
        items: "Voicemail Transcription $5 monthly per entire account"
    }];

    $scope.mrcu = 1;
    $scope.nrcu = 1;
    $scope.fpfhu = 1;

    $("#mcrrowTable").on('change', 'select', function() {

        var unitp = $("#mcrrowTable option:selected:last").text().replace(/[^0-9\.]+/g, "");

        console.log(unitp)

        $('.mrcup:input:last').val(parseFloat(unitp).toFixed(2));

        $(".mrcu:input:last").focus();
        mrecalc();
        calc_mrc();
    });

    function mrecalc() {
        let u = $('.mrcu:input:last').val();
        let up = $('.mrcup:input:last').val();

        $(".tprice:input:last").val(parseFloat(u * up).toFixed(2));
    }

    function calc_mrc() {
        var calculated_total_sum = 0;

        console.log($('.mrcup').val());

        $("#mcrrowTable .tprice").each(function() {
            var get_textbox_value = $(this).val();
            if ($.isNumeric(get_textbox_value)) {
                calculated_total_sum += parseFloat(get_textbox_value);
            }
        });
        console.log(calculated_total_sum);
        $('.mrcgtotal').text('$ ' + parseFloat(calculated_total_sum).toFixed(2))
    }


    $("#mcrrowTable").on('input', '.mrcu', function() {
        mrecalc();
        calc_mrc();
    });

    $("#mcrrowTable").on('input', '.mrcup', function() {
        mrecalc();
        calc_mrc();
    });

    $scope.mrc = [{ unit: "0", unitprice: "0.00" }];

    $scope.mrcadd = function(mrc) {

        console.log($('.tprice').val())

        var mrc = {};
        mrc.unit = $scope.unit;
        mrc.unitprice = $scope.unitprice;
        mrc.tprice = $scope.tprice;
        $scope.mrc.push(mrc);
    }

    $scope.mrcmin = function(mrc) {
        console.log(mrc.length);
        $scope.mrc.splice(mrc.length - 1, 1);
    }

    $("#ncrrowTable").on('change', 'select', function() {

        var unitp = $("#ncrrowTable option:selected:last").text().replace(/[^0-9\.]+/g, "");

        console.log(unitp)

        $('.nrcup:input:last').val(parseFloat(unitp).toFixed(2));

        $(".nrcu:input:last").focus();
        nrecalc();
        calc_nrc();
    });

    function nrecalc() {
        let u = $('.nrcu:input:last').val();
        let up = $('.nrcup:input:last').val();

        $(".tnup:input:last").val(parseFloat(u * up).toFixed(2));
    }

    function calc_nrc() {
        var calculated_total_sum = 0;
        $("#ncrrowTable .tnup").each(function() {
            var get_textbox_value = $(this).val();
            if ($.isNumeric(get_textbox_value)) {
                calculated_total_sum += parseFloat(get_textbox_value);
            }
        });

        console.log(calculated_total_sum);
        $('.nrcgtotal').text('$ ' + parseFloat(calculated_total_sum).toFixed(2))
    }

    $("#ncrrowTable").on('input', '.nrcu', function() {
        nrecalc();
        calc_nrc();
    });

    $("#ncrrowTable").on('input', '.nrcup', function() {
        nrecalc();
        calc_nrc();
    });

    $scope.nrc = [{ unit: "0", unitprice: "0.00" }];

    $scope.nrcadd = function(nrc) {
        console.log($('.tnup').val())
        var nrc = {};
        nrc.unit = $scope.unit;
        nrc.unitprice = $scope.unitprice;
        nrc.tprice = $scope.tnup;
        $scope.nrc.push(nrc);
    }

    $scope.nrcmin = function(nrc) {
        console.log(nrc.length);
        $scope.nrc.splice(nrc.length - 1, 1);
    }

    $scope.ncritems = [{
        items: "Select"
    }, {
        items: "Aastra/Mitel  Basic | MSRP $100.00"
    }, {
        items: "Aastra/Mitel  Advanced Phone | MSRP $230.00"
    }, {
        items: "Aastra/Mitel  Executive Phone | MSRP $300.00"
    }, {
        items: "Aastra/Mitel  Advanced Touch Screen Executive Phone | MSRP $425.00"
    }, {
        items: "Aastra/Mitel  Expansion Module | MSRP $80.00"
    }, {
        items: "Aastra/Mitel  Expansion Module | MSRP $200.00"
    }, {
        items: "Aastra/Mitel MiVoice Conference Phone | MSRP $1,195.00"
    }];

    $("#fpfrowTable").on('change', 'select', function() {

        var unitp = $("#fpfrowTable option:selected:last").text().replace(/[^0-9\.]+/g, "");

        console.log(unitp)

        $('.fpfhup:input:last').val(parseFloat(unitp).toFixed(2));

        $(".fpfhup:input:last").focus();
        frecalc();
        calc_fpfh();
    });

    function frecalc() {
        let u = $('.fpfhu:input:last').val();
        let up = $('.fpfhup:input:last').val();
        $(".tfpfh:input:last").val(parseFloat(u * up).toFixed(2));
    }

    function calc_fpfh() {
        var calculated_total_sum = 0;
        $("#fpfrowTable .tfpfh").each(function() {
            var get_textbox_value = $(this).val();
            if ($.isNumeric(get_textbox_value)) {
                calculated_total_sum += parseFloat(get_textbox_value);
            }
        });

        console.log(calculated_total_sum);
        $('.fpfhgtotal').text('$ ' + parseFloat(calculated_total_sum).toFixed(2))
    }

    $("#fpfrowTable").on('input', '.fpfhu', function() {
        calc_fpfh();
        frecalc();
    });

    $("#fpfrowTable").on('input', '.fpfhup', function() {
        calc_fpfh();
        frecalc();
    });

    $scope.fpfh = [{ unit: "0", unitprice: "0.00" }];

    $scope.fpfhadd = function(fpfh) {
        console.log($('.tnup').val())
        var fpfh = {};
        fpfh.unit = $scope.unit;
        fpfh.unitprice = $scope.unitprice;
        fpfh.tprice = $scope.tnup;
        $scope.fpfh.push(fpfh);
    }

    $scope.fpfhmin = function(fpfh) {
        console.log(fpfh.length);
        $scope.fpfh.splice(fpfh.length - 1, 1);
    }

    $scope.fpfitems = [{
        items: "Select"
    }, {
        items: "Aastra/Mitel  Basic | MSRP $100.00"
    }, {
        items: "Aastra/Mitel  Advanced Phone | MSRP $230.00"
    }, {
        items: "Aastra/Mitel  Executive Phone | MSRP $300.00"
    }, {
        items: "Aastra/Mitel  Advanced Touch Screen Executive Phone | MSRP $425.00 "
    }, {
        items: "Aastra/Mitel  Expansion Module | MSRP $80.00"
    }, {
        items: "Aastra/Mitel  Expansion Module | MSRP $200.00"
    }, {
        items: "Aastra/Mitel MiVoice Conference Phone | MSRP $1,195.00"
    }];

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

    let ukeyid = localStorage.getItem('ukeyid');

    $scope.passwordcall = function(length, special) {



        $scope.hash = window.location.origin + '/formsindex.html#/:' + ukeyid;
        console.log(password);
        sessionStorage.setItem('hkc', password);
    }


    $scope.closesp = function() {
        $('#spsuccess').removeClass('open')
        window.location.replace("#/");
        window.location.replace("#/salesproposal");
    }

    $scope.goindex = function() {
        window.location.replace("#/spindex");
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

    $(".icheckbox").click(function() {

        $('.street2').val($scope.street);
        $('.city2').val($scope.city);
        $('.state2').val($scope.state);
        $('.zipcode2').val($scope.zipcode);
    });



    $scope.savesp = function() {

        var table0 = $('#mcrrowTable').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.find("#type option:selected").text();
            }
        })
        const ino0 = table0.length - 1;
        console.log(table0, ino0)
        var newtable0 = table0.splice(ino0, 1);
        console.log(table0)

        var table1 = $('#ncrrowTable').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.find("#type option:selected").text();
            }
        })
        const ino1 = table1.length - 1;
        console.log(table1, ino1)
        var newtable1 = table1.splice(ino1, 1);
        console.log(table1)

        var table2 = $('#fpfrowTable').tableToJSON({
            extractor: function(cellIndex, $cell) {
                return $cell.find('input').val() || $cell.find("#type option:selected").text();
            }
        })
        const ino2 = table2.length - 1;
        console.log(table2, ino2)
        var newtable2 = table2.splice(ino2, 1);
        console.log(table2)

        try {
            var uid = firebase.database().ref().child('salesproposal').push().key;

            localStorage.setItem('ukeyid', uid);

            var data = {
                mrc: table0,
                nrc: table1,
                fpfrow: table2,
                bizname: $scope.bizname,
                street: $scope.street,
                city: $scope.city,
                state: $scope.state,
                zipcode: $scope.zipcode,
                presentedby: $scope.presentedby,
                // date0: $scope.date0,
                // date1: $scope.date1,
                date2: $scope.date2,
                street2: $('.street2').val(),
                city2: $('.city2').val(),
                state2: $('.state2').val(),
                zipcode2: $('.zipcode2').val(),
                termlength: $scope.termlength,
                phone: $scope.phone,
                phone2: $scope.phone2,
                mainphoneno: $scope.mainphoneno,
                sign: c.toDataURL(c)
            }

            var updates = {};
            updates['/salesproposal/' + uid] = data;
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

})