angular.module('newApp').controller('salesproposalCtrl', function($scope) {

    $("#comname").text(localStorage.getItem('comname'))
    $("#landmark").text(localStorage.getItem('landmark'))
    $("#comcity").text(localStorage.getItem('comcity'))
    $("#comstate").text(localStorage.getItem('comstate'))
    $("#compostalcode").text(localStorage.getItem('compostalcode'))
    $("#comno").text(localStorage.getItem('comcontact'))

    if (sessionStorage.getItem('comlogo')) {
        console.log('imageloaded')
        $('#comlogo').attr('src', sessionStorage.getItem('comlogo'));
    } else {
        console.log('imagenotloaded')
        $('#comlogo').attr('src', 'assets/images/plj.jpg')
    }



    (function() {
        emailjs.init("user_Vc5Bkgq73iehzqAZWo38i");
    })();


    var myform = $("form#myform");
    myform.submit(function(event) {
        event.preventDefault();

        var params = myform.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        // Change to your service ID, or keep using the default service
        var service_id = "default_service";

        var template_id = "template_Zi5Ei6W9";
        myform.find("button").text("Sending...");
        emailjs.send(service_id, template_id, params)
            .then(function() {
                alert("Sent!");
                myform.find("button").text("Send");
            }, function(err) {
                alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
                myform.find("button").text("Send");
            });

        return false;
    });

    // MRC
    $scope.mcritems = [{
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
        items: "Conference Bridge $25 for up to 20 people"
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

    function calc_mrc() {
        var calculated_total_sum = 0;

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
        calc_mrc()
    });

    $("#mcrrowTable").on('input', '.mrcup', function() {
        calc_mrc()
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
        calc_nrc();
    });

    $("#ncrrowTable").on('input', '.nrcup', function() {
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
        items: "Aastra/Mitel 6863i Basic | MSRP $100.00"
    }, {
        items: "Aastra/Mitel 6867i Advanced Phone | MSRP $230.00"
    }, {
        items: "Aastra/Mitel 6869i Executive Phone | MSRP $300.00"
    }, {
        items: "Aastra/Mitel 6873i Advanced Touch Screen Executive Phone | MSRP $425.00 "
    }, {
        items: "Aastra/Mitel M680i Expansion Module | MSRP $80.00"
    }, {
        items: "Aastra/Mitel M685i Expansion Module | MSRP $200.00"
    }, {
        items: "Aastra/Mitel MiVoice Conference Phone | MSRP $1,195.00"
    }];



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
    });

    $("#fpfrowTable").on('input', '.fpfhup', function() {
        calc_fpfh();
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
        items: "Aastra/Mitel 6863i Basic | MSRP $100.00"
    }, {
        items: "Aastra/Mitel 6867i Advanced Phone | MSRP $230.00"
    }, {
        items: "Aastra/Mitel 6869i Executive Phone | MSRP $300.00"
    }, {
        items: "Aastra/Mitel 6873i Advanced Touch Screen Executive Phone | MSRP $425.00 "
    }, {
        items: "Aastra/Mitel M680i Expansion Module | MSRP $80.00"
    }, {
        items: "Aastra/Mitel M685i Expansion Module | MSRP $200.00"
    }, {
        items: "Aastra/Mitel MiVoice Conference Phone | MSRP $1,195.00"
    }];


    (function() {



        window.requestAnimFrame = (function(callback) {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimaitonFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        var canvas = document.getElementById("sig-canvas");
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 4;

        var drawing = false;
        var mousePos = {
            x: 0,
            y: 0
        };
        var lastPos = mousePos;

        canvas.addEventListener("mousedown", function(e) {
            drawing = true;
            lastPos = getMousePos(canvas, e);
        }, false);

        canvas.addEventListener("mouseup", function(e) {
            drawing = false;
        }, false);

        canvas.addEventListener("mousemove", function(e) {
            mousePos = getMousePos(canvas, e);
        }, false);

        // Add touch event support for mobile
        canvas.addEventListener("touchstart", function(e) {

        }, false);

        canvas.addEventListener("touchmove", function(e) {
            var touch = e.touches[0];
            var me = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(me);
        }, false);

        canvas.addEventListener("touchstart", function(e) {
            mousePos = getTouchPos(canvas, e);
            var touch = e.touches[0];
            var me = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(me);
        }, false);

        canvas.addEventListener("touchend", function(e) {
            var me = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(me);
        }, false);

        function getMousePos(canvasDom, mouseEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - rect.left,
                y: mouseEvent.clientY - rect.top
            }
        }

        function getTouchPos(canvasDom, touchEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
                x: touchEvent.touches[0].clientX - rect.left,
                y: touchEvent.touches[0].clientY - rect.top
            }
        }

        function renderCanvas() {
            if (drawing) {
                ctx.moveTo(lastPos.x, lastPos.y);
                ctx.lineTo(mousePos.x, mousePos.y);
                ctx.stroke();
                lastPos = mousePos;
            }
        }

        // Prevent scrolling when touching the canvas
        document.body.addEventListener("touchstart", function(e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchend", function(e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchmove", function(e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        }, false);

        (function drawLoop() {
            requestAnimFrame(drawLoop);
            renderCanvas();
        })();

        function clearCanvas() {
            canvas.width = canvas.width;
        }


        var clearBtn = document.getElementById("sig-clearBtn");
        var submitBtn = document.getElementById("sig-submitBtn");
        clearBtn.addEventListener("click", function(e) {
            clearCanvas();
            sigText.innerHTML = "Data URL for your signature will go here!";
            sigImage.setAttribute("src", "");
        }, false);


        submitBtn.addEventListener("click", function(e) {
            e.preventDefault();
            var dataUrl = canvas.toDataURL();
            // sigText.innerHTML = dataUrl;

            var sign = dataUrl
            console.log(sign);
            localStorage.setItem('sign', sign)
                // sigImage.setAttribute("src", dataUrl);

        }, false);

    })();



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

        $scope.hash = 'https://cmlformportal-b8674.web.app/formsindex.html#/:' + password;
        console.log(password);
        sessionStorage.setItem('hkc', password);
    }


    $("#myform").submit(function(event) {


        var uid = firebase.database().ref().child('users').push().key;

        var data = {
            mailfrom: localStorage.getItem('curusermail'),
            cusid: sessionStorage.getItem('curuserid'),
            mailadd: $scope.mailto,
            sendername: $scope.mailfrom,
            recipientname: $scope.mailto,
            hashkeycode: sessionStorage.getItem('hkc')
        }

        var updates = {};
        updates['/sfsalespropsal/' + uid] = data;
        firebase.database().ref().update(updates, alert('Data Saved!'));

    });


})