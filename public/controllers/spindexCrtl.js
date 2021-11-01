angular.module('newApp').controller('spindexCrtl', function($scope, $timeout) {

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
    $scope.curem = localStorage.getItem('curuseremail');

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.osps = [];

    $scope.numberOfPages = () => {
        return Math.ceil(
            $scope.osps.length / $scope.pageSize
        );
    }

    for (var i = 0; i < 10; i++) {
        $scope.osps.push(`Question number ${i}`);
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



    firebase.database().ref('/salesproposal/').orderByChild('cusid').on("value", function(snapshot) {
        let cdata = localStorage.getItem('curuserid');
        console.log(snapshot.val())
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
                $scope.osps = returnArr;
                console.log($scope.osps);
            });

        })

    });



    // MRC

    $scope.mcritems = ["Select",
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

        $(".mtprice:input:last").val(parseFloat(u * up).toFixed(2));
    }

    function calc_mrc() {
        var calculated_total_sum = 0;

        console.log($('.mrcup').val());

        $("#mcrrowTable .mtprice").each(function() {
            var get_textbox_value = $(this).val();
            if ($.isNumeric(get_textbox_value)) {
                calculated_total_sum += parseFloat(get_textbox_value);
            }
        });
        console.log(calculated_total_sum + $scope.mrct);
        $('.mrcgtotal').text('$ ' + parseFloat(calculated_total_sum + $scope.mrct).toFixed(2))
    }

    $("#mcrrowTable").on('input', '.mrcu', function() {
        mrecalc();
        calc_mrc();
    });

    $("#mcrrowTable").on('input', '.mrcup', function() {
        mrecalc();
        calc_mrc();
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

        console.log($scope.mrct, $('.mrcup:input:last').val());
        $('.mrcgtotal').text('$ ' + parseFloat($scope.mrct - $('.mrcup:input:last').val()).toFixed(2));

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

    $scope.ncritems = ["Select",
        "Aastra/Mitel Basic | MSRP $100.00",
        "Aastra/Mitel Advanced Phone | MSRP $230.00",
        "Aastra/Mitel Executive Phone | MSRP $300.00",
        "Aastra/Mitel Advanced Touch Screen Executive Phone | MSRP $425.00",
        "Aastra/Mitel Expansion Module | MSRP $80.00",
        "Aastra/Mitel Expansion Module | MSRP $200.00",
        "Aastra/Mitel MiVoice Conference Phone | MSRP $1,195.00"
    ];

    $scope.nrcmodel = $scope.ncritems;

    console.log($scope.nrcmodel)

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

        $(".ntprice:input:last").val(parseFloat(u * up).toFixed(2));
    }

    function calc_nrc() {
        var calculated_total_sum = 0;
        $("#ncrrowTable .ntprice").each(function() {
            var get_textbox_value = $(this).val();
            if ($.isNumeric(get_textbox_value)) {
                calculated_total_sum += parseFloat(get_textbox_value);
            }
        });

        console.log(calculated_total_sum + $scope.nrct);
        $('.nrcgtotal').text('$ ' + parseFloat(calculated_total_sum + $scope.nrct).toFixed(2))
    }

    $("#ncrrowTable").on('input', '.nrcu', function() {
        nrecalc();
        calc_nrc();
    });

    $("#ncrrowTable").on('input', '.nrcup', function() {
        nrecalc();
        calc_nrc();
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


        console.log($scope.nrct, $('.nrcup:input:last').val());
        $('.nrcgtotal').text('$ ' + parseFloat($scope.nrct - $('.nrcup:input:last').val()).toFixed(2));


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
        "Select",
        "Aastra/Mitel Basic | MSRP $100.00",
        "Aastra/Mitel Advanced Phone | MSRP $230.00",
        "Aastra/Mitel Executive Phone | MSRP $300.00",
        "Aastra/Mitel Advanced Touch Screen Executive Phone | MSRP $425.00",
        "Aastra/Mitel Expansion Module | MSRP $80.00",
        "Aastra/Mitel Expansion Module | MSRP $200.00",
        "Aastra/Mitel MiVoice Conference Phone | MSRP $1,195.00"
    ];

    $scope.frcmodel = $scope.fcritems;

    console.log($scope.frcmodel)

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
        frecalc();
        calc_fpfh();
    });

    $("#fpfrowTable").on('input', '.fpfhup', function() {
        frecalc();
        calc_fpfh();
    });

    $scope.frc = [];

    $scope.frcadd = function(frc) {
        console.log($('.fprice').val())

        var frc = {};
        frc.unit = $scope.unit;
        frc.unitprice = $scope.unitprice;
        frc.tprice = $scope.fprice;
        $scope.frc.push(frc);
    }

    $scope.frcmin = function(frc) {

        console.log(frc.length);

        console.log($scope.nrct, $('.tfpfh:input:last').val());

        $('.fpfhgtotal').text('$ ' + parseFloat($scope.frct - $('.tfpfh:input:last').val()).toFixed(2));

        if (frc.length !== 0) {
            $scope.frc.splice(frc.length - 1, 1);
        } else {
            rowCount = $('#fcrrowTable tr#tr1').length;
            console.log(rowCount)
            if (rowCount !== 0) {
                $('table#fcrrowTable tr#tr1:last').remove();
            } else {
                $('table#fcrrowTable tr#tr0:last').remove();
            }
        }

    }



    $scope.genhashkey = function(nsp) {
        console.log(nsp.key)

        let comid = localStorage.getItem('curuserid');

        $scope.hash = window.location.origin + '/formsindex.html#/:' + nsp.key

        sessionStorage.setItem('hkc', nsp.key);
    }



    function savedmaildate() {
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
        firebase.database().ref().update(updates);
        if (updates) {
            console.log(updates)
            btn.value = 'SUCCESS!';
            btn.disabled = true;

            setTimeout(function() {
                window.location.replace("#/");
                window.location.replace("#/spindex");
            }, 2000)

        }

    }

    // Email

    (function() {
        emailjs.init('user_0dRWnov2yzJ0mYSTS3nqs')
    })();

    const btn = document.getElementById('button');

    $("#myform").submit(function(event) {
        event.preventDefault();

        try {
            btn.value = 'Sending...';

            const serviceID = 'default_service';
            const templateID = 'template_zbea5bx';

            emailjs.sendForm(serviceID, templateID, this)
                .then((resp) => {
                    btn.value = 'Send Email';
                    if (resp.status == 200) {
                        savedmaildate();
                    }

                }, (err) => {
                    btn.value = 'Erro!';
                    alert(JSON.stringify(err));
                });
        } catch (error) {

        }


    });


    var sigb64;

    $scope.trigersignsp = function() {


        var w = document.getElementById("signature-pad"),
            c = w.querySelector("canvas");

        document.getElementById('clear').addEventListener('click', function() {

            $('#sign').prepend($('<canvas>'))
            $('#sigb64').remove();

            $scope.trigersignsp();
            signaturePad.clear();
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
            $('.signmsg').text('Signature saved!');
            sigb64 = c.toDataURL(c);
            console.log(sigb64)
        });

    }

    let keyid;
    $scope.nrct;
    $scope.mrct;
    $scope.frct;

    $scope.editsp = function(nsp) {

        console.log(nsp)

        $scope.comlogo = sessionStorage.getItem('comlogo');

        console.log($scope.comlogo)

        $('canvas').remove();

        $(".m-signature-pad panel-success").css("border-top-color", fcolor);

        sigb64 = nsp.sign;

        $('#sign').prepend($('<img>', { id: 'sigb64', src: nsp.sign }))

        $scope.nsp = nsp;

        console.log($scope.nsp.mrc['Total Price']);

        $scope.nsp.date2 = new Date(nsp.date2);

        console.log($scope.nsp.mrc)

        console.log($scope.nsp.nrc[0]["Total Price"]);

        var nrct = 0;
        angular.forEach($scope.nsp.nrc, function(value, key) {
            nrct += parseFloat(value["Total Price"]);
        });

        var mrct = 0;
        angular.forEach($scope.nsp.mrc, function(value, key) {
            mrct += parseFloat(value["Total Price"]);
        });

        var frct = 0;
        angular.forEach($scope.nsp.fpfrow, function(value, key) {
            frct += parseFloat(value["Total Price"]);
        });

        return keyid = nsp.key,
            $scope.nrct = nrct,
            $scope.mrct = mrct,
            $scope.frct = frct;


    }

    $scope.download = function() {

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

        $('#printThis').animate({ scrollTop: 0 }, 'slow');


        html2canvas(document.querySelector("#printThis")).then(function(canvas) {
            console.log(canvas);
            simulateDownloadImageClick(canvas.toDataURL(), 'salesproposal.png');
        });





    }

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
                location.replace('#/spindex')
                setTimeout(function() {
                    nWindow.close();
                }, 2000)
            });
        }, 3000)

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

        var table2 = $('#fcrrowTable').tableToJSON({
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
                bizname2: $scope.nsp.bizname2,
                custname: $scope.nsp.custname,
                street: $scope.nsp.street,
                city: $scope.nsp.city,
                state: $scope.nsp.state,
                zipcode: $scope.nsp.zipcode,
                presentedby: $scope.nsp.presentedby,
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

                var ref = firebase.database().ref("/salesproposal/" + nsp.key);
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





    $(".icheckbox").click(function() {
        console.log($scope.nsp.phone, $scope.nsp.custname, $scope.nsp.bizname)

        $('.phone2').val($scope.nsp.phone);
        $('.custname2').val($scope.nsp.custname);
        $('.bizname2').val($scope.nsp.bizname);

        $('.street2').val($scope.nsp.street);
        $('.city2').val($scope.nsp.city);
        $('.state2').val($scope.nsp.state);
        $('.zipcode2').val($scope.nsp.zipcode);
    });

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