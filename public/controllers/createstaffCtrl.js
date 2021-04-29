angular.module('newApp').controller('createstaffdCtrl', function($timeout, $scope, ) {
    var fcolor = localStorage.getItem('formcolor')
    $(".panel").css("border-top-color", fcolor);
    $(".btn-primary").css("background", fcolor)
    $(".btn-primary").css("border-color", 'white')
    $(".x-navigation>li.xn-logo>a:first-child").css("background", fcolor);
    $(".x-navigation li.active>a").css("background", fcolor);
    $(".panel-success>.panel-heading").css("color", fcolor);
    $scope.url0 = 'Forms';
    $scope.url1 = 'Credit Card Auth';

    $(".activate").removeClass("active");
    $(".activate").addClass("active");

    $scope.hideshow = function() {
        $(".increment").show();
        $(".decrement").hide();
    }

    $scope.confirmation = function(mail) {
        $('#message-box-danger').addClass('open')
        localStorage.setItem('delitem', mail);
        console.log('Confirmed.....')
    }

    $scope.confirmationclose = function() {
        $('#message-box-danger').removeClass('open')

    }

    $scope.deleteInfo = function() {

        var ref = firebase.database().ref("users");
        ref.orderByChild("cusemail").equalTo(localStorage.getItem('delitem')).on("child_added", function(snapshot) {

            // alert(snapshot.key);
            var adaRef = firebase.database().ref('users/' + snapshot.key);
            adaRef.remove()
                .then(function() {
                    console.log("Remove succeeded.")
                    $scope.confirmationclose();
                })
                .catch(function(error) {
                    console.log("Remove failed: " + error.message)
                });

        });
    }

    $scope.editinfo = function(mail) {

        localStorage.setItem('editstaff', mail)

        var ref = firebase.database().ref("users");
        ref.orderByChild("cusemail").equalTo(mail).on("child_added", function(snapshot) {


            localStorage.setItem('editstaffimg', snapshot.val().userimage)

            console.log(snapshot.val());

            $('#stuffname').val(snapshot.val().cusname);
            $('#stuffmail').val(snapshot.val().cusemail);
            $('#stuffcontacts').val(snapshot.val().mobile);
            $('#stuffdesignation').val(snapshot.val().designation);
            $(".toggle").modal("toggle");
            $(".increment").hide();
            $(".decrement").show();

            $(".pass").hide();
            $(".re-pass").hide();
        });

    }


    function snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
        });

        return returnArr;
    };
    var fb = firebase.database().ref().child("/users")

    fb.orderByChild("cusid").equalTo(sessionStorage.getItem('curuserid')).on("value", function(snapshot) {
        $timeout(function() {
            $scope.$apply(function() {
                console.log(snapshotToArray(snapshot))

                $scope.stafflists = localStorage.getItem('stafflists');

                console.log($scope.stafflist);
                $scope.stafflists = snapshotToArray(snapshot);
            });

        }, 300);
    });




    $('.parent').find('div:first').remove();


    $scope.addstaff = function() {
        $(".addstaff").addClass('open')

    }

    $scope.closestaff = function() {
        $(".addstaff").removeClass('open')

    }


    $scope.updatestaff = function() {



        var ref = firebase.database().ref("users");

        ref.orderByChild("cusemail").equalTo(localStorage.getItem('editstaff')).on("child_added", function(snapshot) {

            console.log(snapshot.key, 'this is the key');

            var uid = firebase.database().ref().child('users').push().key;

            var data = {
                cusid: sessionStorage.getItem('curuserid'),
                cusname: $('#stuffname').val(),
                cusemail: $('#stuffmail').val(),
                mobile: $('#stuffcontacts').val(),
                designation: $('#stuffdesignation').val(),
                userimage: localStorage.getItem('editstaffimg'),
                role: '0'
            }

            var updates = {};
            updates['/users/' + snapshot.key] = data;
            firebase.database().ref().update(updates);
            $(".toggle").modal("toggle");
        });

    }

    $scope.crearestaff = function() {

        console.log('checking....')
        var data = {
            stuffname: $('#stuffname').val(),
            stuffmail: $('#stuffmail').val(),
            stuffcontacts: $('#stuffcontacts').val()
        };




        var passwords = {
            password: $('#stuffpassword').val(),
            cPassword: $('#stuffre-password').val(),
        }

        if (data.stuffmail != '' && passwords.password != '' && passwords.cPassword != '') {
            if (passwords.password == passwords.cPassword) {
                //create the user

                firebase.auth()
                    .createUserWithEmailAndPassword(data.stuffmail, passwords.password)
                    .then(function(user) {



                        $(".toggle").modal("toggle");

                        sendEmailVerification(data);
                        save_cus_credencials();


                        var cusname = $('#stuffname').val();
                        var email = $('#stuffmail').val();

                        function sendEmailVerification(data) {
                            cusname = firebase.auth().currentUser;
                            email = data.email || user.email;
                            var urlr = "cmlformportal-b8674.web.app";

                            return user.emailVerified || user.sendEmailVerification({
                                url: urlr,
                            });
                        }
                        //save customer cred to firebase
                        function save_cus_credencials() {


                            var uid = firebase.database().ref().child('users').push().key;
                            var cusid = sessionStorage.getItem('curuserid');
                            var cusname = $('#stuffname').val();
                            var cusemail = $('#stuffmail').val();
                            var designation = $('#stuffdesignation').val();


                            var data = {
                                user_id: uid,
                                cusid: cusid,
                                designation: designation,
                                cusname: cusname,
                                cusemail: cusemail,
                                mobile: 'N/A',
                                phone: 'N/A',
                                userimage: 'data:image/jpeg;base64,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',
                                role: "0"
                            }

                            if (user) {
                                user.updateProfile({
                                    displayName: $('#stuffname').val()
                                })
                            }


                            var updates = {};
                            updates['/users/' + uid] = data;
                            firebase.database().ref().update(updates);
                            refresh();
                            $('.xn-openable').removeClass('activate')
                        }



                        function refresh() {
                            setTimeout(function() {

                                $('.xn-openable').addClass('active')
                                console.log('close open......')
                            }, 1000);
                        }

                    }).catch(function(error) {
                        console.log("Registration Failed!", error.message);
                        alert(error.message + ' Check your input');

                    });


            }
        }
    }
});