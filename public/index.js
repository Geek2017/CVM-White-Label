angular.module('newApp').controller('indexdCtrl', function($scope, $timeout) {


    var inc = 0;
    $(".collor").click(function() {

        let sdata = $('#collor').val();

        if (sdata) {
            inc++;
            if (inc % 2 === 0) {
                console.log('OFF', inc)
                $("#theme").attr("href", "./assets/css/theme-default.css");
                $('.dark').css('color', 'white');
                $('.ligth').css('color', 'white');
            } else {
                console.log('ON', inc)
                $("#theme").attr("href", "./assets/css/theme-white.css");
                $('.dark').css('color', 'black');
                $('.ligth').css('color', 'black');
            }
        }

    });



    $("#revertt").click(function() {
        console.log('revert')
        $("#theme").attr("href", "./assets/css/theme-default.css");
    });


    setTimeout(function() {
        var dms = Cookies.get('ne_pl_m');

        if (dms === '1') {
            $('#collor').prop('checked', true);
            $("#theme").attr("href", "./assets/css/theme-default.css");
        }
    }, 5000)




    var config = {
        apiKey: "AIzaSyArkU60LENXmQPHRvWoK26YagzprezV3dg",
        authDomain: "cmlformportal-b8674.firebaseapp.com",
        databaseURL: "https://cmlformportal-b8674.firebaseio.com/",
        projectId: "cmlformportal-b8674"
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function(user) {
        doSomething();
        console.log(user)

        function doSomething() {
            if (user) {
                return user.email
            } else {
                window.location.replace("login.html");
            }
        }
        var response = doSomething();



        console.log(response)
        localStorage.setItem('curuseremail', response);

        $(".mini-login-header").hide();

        document.cookie = "auth=true";
        var cokie = document.cookie = "auth=true";
        console.log(cokie);

        var ref = firebase.database().ref("users");
        ref.orderByChild("cusemail").equalTo(response).on("child_added", function(snapshot) {
            var sotp = localStorage.getItem('OTP')

            console.log(sotp, snapshot.val().otp)

            if (snapshot.val().otp === 1) {

                if (!sotp) {
                    localStorage.clear()
                    sessionStorage.clear()
                }

            }



            console.log(snapshot.val().cusid);

            localStorage.setItem('curuserid', snapshot.val().cusid);

            localStorage.setItem('cusid', snapshot.val().cusid);




            $('#profile-image').attr('src', snapshot.val().userimage);

            $('#job').text(snapshot.val().designation);

            var ref = firebase.database().ref("theme_info");
            ref.orderByChild("cusid").equalTo(snapshot.val().cusid).on("child_added", function(snapshot) {

                console.log(snapshot.val());

                localStorage.setItem('formcolor', snapshot.val().formcolor)

                $("#theme").attr("href", snapshot.val().theme);

                console.log($("#theme").attr("href"))

                $(".x-navigation .informer.informer-warning ").css("background", snapshot.val().formcolor);

                $(".panel").css("border-top-color", snapshot.val().formcolor);

                $(".btn-primary").css("background", snapshot.val().formcolor)

                $(".collor").css("background-color", snapshot.val().formcolor)



                $(".x-navigation>li.xn-logo>a:first-child").css("background", snapshot.val().formcolor);

                $(".x-navigation li.active>a").css("background", snapshot.val().formcolor);

                $(".panel-success>.panel-heading").css("color", snapshot.val().formcolor);

                localStorage.setItem('tuid', snapshot.val().user_id)
            });

            var ref = firebase.database().ref("com_profiles");
            ref.orderByChild("cusid").equalTo(snapshot.val().cusid).on("child_added", function(snapshot) {
                console.log(snapshot.val().landmark);

                $('#span').text(snapshot.val().comname);

                sessionStorage.setItem('comlogo', snapshot.val().comlogo)
                localStorage.setItem('comcity', snapshot.val().comcity)
                localStorage.setItem('comstate', snapshot.val().comstate)
                localStorage.setItem('compostalcode', snapshot.val().compostalcode)
                localStorage.setItem('comcontact', snapshot.val().comcontact)
                localStorage.setItem('comname', snapshot.val().comname)
                localStorage.setItem('landmark', snapshot.val().landmark)

                console.log(snapshot.val())
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
            });



        });



    });

    firebase.database().ref('/salesproposal/').orderByChild('cusid').on("value", function(snapshot) {
        let cdata = localStorage.getItem('curuserid');
        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    if (item.cusid == parseInt(cdata)) {
                        returnArr.push(item);
                    }
                });
                console.log(returnArr.length)
                if (returnArr.length) {
                    $scope.spcount = returnArr.length;
                } else {
                    $scope.spcount = 0;
                }
            });

        })
    })

    firebase.database().ref('/portlocalnumber/').orderByChild('cusid').on("value", function(snapshot) {
        let cdata = localStorage.getItem('curuserid');
        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    if (item.cusid == parseInt(cdata)) {
                        returnArr.push(item);
                    }
                });
                console.log(returnArr.length)

                if (returnArr.length) {
                    $scope.plncount = returnArr.length;
                } else {
                    $scope.plncount = 0;
                }
            });

        })
    })

    firebase.database().ref('/porttollfreenumber/').orderByChild('cusid').on("value", function(snapshot) {
        let cdata = localStorage.getItem('curuserid');
        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    if (item.cusid == parseInt(cdata)) {
                        returnArr.push(item);
                    }
                });
                console.log(returnArr.length)
                $scope.ptfncount = returnArr.length;

                if (returnArr.length) {
                    $scope.ptfncount = returnArr.length;
                } else {
                    $scope.ptfncount = 0;
                }


            });

        })
    })

    $(".activate").addClass("active");

    setTimeout(function() {
        document.getElementById("spinner").style.visibility = "hidden";

        document.getElementById("formportal").style.visibility = "visible";
    }, 3000)



    $scope.logout = function() {

        firebase.auth().signOut().then(() => {
            console.log('Out')
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace("login.html");
        });
    }

    // alert(Cookies.get('ne_pl_m'))




});