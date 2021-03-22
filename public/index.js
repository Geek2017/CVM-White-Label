angular.module('newApp').controller('indexdCtrl', function($scope, $rootScope) {

    var config = {
        apiKey: "AIzaSyArkU60LENXmQPHRvWoK26YagzprezV3dg",
        authDomain: "cmlformportal-b8674.firebaseapp.com",
        databaseURL: "https://cmlformportal-b8674.firebaseio.com/",
        projectId: "cmlformportal-b8674"
    };

    firebase.initializeApp(config);



    firebase.auth().onAuthStateChanged(function(user) {
        doSomething();

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

            console.log(snapshot.val().cusid);

            localStorage.setItem('curuserid', snapshot.val().cusid);

            $('#profile-image').attr('src', snapshot.val().userimage);

            $('#job').text(snapshot.val().designation);

            var ref = firebase.database().ref("theme_info");
            ref.orderByChild("cusid").equalTo(snapshot.val().cusid).on("child_added", function(snapshot) {
                console.log(snapshot.val());
                $("#theme").attr("href", snapshot.val().theme);
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
            });



        });



    });

    $(".activate").addClass("active");

    setTimeout(function() {

        document.getElementById("spinner").style.visibility = "hidden";

        document.getElementById("formportal").style.visibility = "visible";

    }, 5000)

    // var myVar = setInterval(myTimer, 100);

    // function myTimer() {

    //     var ref = firebase.database().ref("users");
    //     ref.orderByChild("cusemail").equalTo(localStorage.getItem('curusermail')).on("child_added", function(snapshot) {
    //         console.log('Processing....');
    //         if (snapshot.val()) {

    //             runtime();

    //             console.log('Processing User Complete!');

    //             sessionStorage.setItem('curuserid', snapshot.val().cusid);

    //             localStorage.setItem('childkey', snapshot.key)

    //             var datacontent = snapshot.val().role

    //             datacontent == "0" ? $('#gearup').hide() : $('#gearup').show();

    //             sessionStorage.setItem('cusname', snapshot.val().cusname);

    //             sessionStorage.setItem('role', snapshot.val().role);

    //             sessionStorage.setItem('designation', snapshot.val().designation);

    //             sessionStorage.setItem('userimg', snapshot.val().userimage);
    //         } else {
    //             console.log('Processing User Failed');
    //         }

    //     });
    //     if (sessionStorage.getItem('userimg')) {
    //         console.log('imageloaded')
    //         $scope.userimg = sessionStorage.getItem('userimg');
    //         $('#profile-mini').attr('src', sessionStorage.getItem('userimg'));
    //         $('#profile-image').attr('src', sessionStorage.getItem('userimg'));

    //         $("#job").text(sessionStorage.getItem('designation'));

    //         $("#curusername").text(sessionStorage.getItem('cusname'));

    //     } else {
    //         console.log('imagenotloaded')
    //         $('#profile-mini').attr('src', 'assets/images/users/avatar.jpg')
    //         $('#profile-image').attr('src', 'assets/images/users/avatar.jpg')
    //     }
    // }

    // function myStopFunction() {

    //     unicolorandtheme();
    //     clearInterval(myVar);
    //     setTimeout(function() {
    //         document.getElementById("formportal").style.visibility = "visible";
    //         document.getElementById("spinner").style.visibility = "hidden";
    //         $("#span").text(sessionStorage.getItem('curcomname'));


    //     }, 2000);
    // }

    // function runtime() {

    //     var ref = firebase.database().ref("com_profiles");
    //     ref.orderByChild("cusid").equalTo(sessionStorage.getItem('curuserid')).on("child_added", function(snapshot) {
    //         console.log('Logo is Set');
    //         sessionStorage.setItem('curcomname', snapshot.val().comname);
    //         sessionStorage.setItem('comlogo', snapshot.val().comlogo);
    //     });

    //     var ref = firebase.database().ref("theme_info");
    //     ref.orderByChild("cusid").equalTo(sessionStorage.getItem('curuserid')).on("child_added", function(snapshot) {
    //         console.log('Unicolor & Theme is Set');
    //         localStorage.setItem('unicolor', snapshot.val().formcolor);
    //         localStorage.setItem('theme', snapshot.val().theme);
    //         myStopFunction();
    //     });



    // }


    // function unicolorandtheme() {
    //     $(".widget.widget-info").css("background", localStorage.getItem('unicolor'));
    //     $(".panel").css("border-top-color", localStorage.getItem('unicolor'));
    //     $(".panel-warning").css("border-top-color", localStorage.getItem('unicolor'));
    //     $(".x-navigation>li.xn-logo>a:first-child").css("background", localStorage.getItem('unicolor'));
    //     console.log('red')
    //     $("#theme").prop("href", localStorage.getItem('theme'));
    // }





    $scope.logout = function() {

        firebase.auth().signOut().then(() => {
            console.log('Out')
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace("login.html");
        });
    }
});