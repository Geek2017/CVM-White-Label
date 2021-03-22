angular.module('newApp').controller('portlocalnumberCtrl', function($scope) {




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





    $('#logoimg').hide()

    firebase.auth().onAuthStateChanged(function(user) {
        var databaseRef = firebase.database().ref('users/');
        databaseRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                if (childData.cusemail === user.email) {

                    var databaseRef1 = firebase.database().ref('com_profiles/');
                    databaseRef1.once('value', function(snapshot1) {
                        snapshot1.forEach(function(childSnapshot1) {
                            var childKey1 = childSnapshot1.key;
                            var childData1 = childSnapshot1.val();
                            if (childData1.cusid == childData.cusid) {
                                // localStorage.setItem('addnocusid',childKey)
                                localStorage.setItem('addnologo', childData1.comlogo)
                                    // console.log(childKey);
                                $("#logoimg").attr("src", localStorage.getItem('addnologo'));
                                $('#logoimg').show()
                            }
                        });
                    });
                }
            });
        });

    });

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



    $scope.saveaddnumber = function() {

        if ($scope.addno1 == null || $scope.addno2 == null || $scope.addno3 == null || $scope.cusbizname == null || $scope.serviceadd == null || $scope.serviceadd2 == null || $scope.servicecity == null || $scope.servicezip == null || $scope.authorname == null || $scope.yourtel1 == null || $scope.yourtel2 == null || $scope.yourtel3 == null) {
            alert('Some Fields are empty!')
        } else {

            var uid = firebase.database().ref().child('users').push().key;

            var data = {
                addnumber: $scope.addno1 + $scope.addno2 + $scope.addno3,
                cusbizname: $scope.cusbizname,
                serviceadd: $scope.serviceadd,
                serviceadd2: $scope.serviceadd2,
                servicecity: $scope.servicecity,
                servicezip: $scope.servicezip,
                authorname: $scope.authorname,
                yourtel: $scope.yourtel1 + $scope.yourtel2 + $scope.yourtel3,
            }

            var updates = {};
            updates['/addnumbers/' + uid] = data;
            firebase.database().ref().update(updates, alert('Data Saved!'));

        }



    }


});