$(document).ready(function() {

    $(".alert").hide()

    $("#alert").click(function() {
        $(".alert").hide()
    });


    var config = {
        apiKey: "AIzaSyArkU60LENXmQPHRvWoK26YagzprezV3dg",
        authDomain: "cmlformportal-b8674.firebaseapp.com",
        databaseURL: "https://cmlformportal-b8674.firebaseio.com/",
        projectId: "cmlformportal-b8674"
    };
    firebase.initializeApp(config);

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        if ($('#loginEmail').val() != '' && $('#loginPassword').val() != '') {

            var data = {
                email: $('#loginEmail').val(),
                password: $('#loginPassword').val()
            };

            var ref = firebase.database().ref("users");
            ref.orderByChild("cusemail").equalTo($('#loginEmail').val()).on("child_added", function(snapshot) {
                if (snapshot.val().state == 0 && snapshot.val().userimage == "https://via.placeholder.com/150") {

                    console.log(snapshot.val().user_id);
                    console.log(snapshot.val().cusemail);
                    console.log(snapshot.val().userimage);

                    var actionCodeSettings = {
                        url: document.location.href,
                        handleCodeInApp: false
                    };
                    firebase.auth().sendPasswordResetEmail(snapshot.val().cusemail, actionCodeSettings)
                        .then(function() {
                            $(".alert").show()
                            setTimeout(function() {
                                $(".alert").hide()


                                var data = {
                                    cusemail: snapshot.val().cusemail,
                                    cusid: snapshot.val().user_id,
                                    designation: "Aaccount Manager",
                                    role: 1,
                                    user_id: snapshot.val().user_id,
                                    userimage: "https://via.placeholder.com/150",
                                    state: 1
                                }

                                var updates = {};

                                updates['/users/' + snapshot.val().user_id] = data;
                                firebase.database().ref().update(updates);

                                if (updates) {
                                    console.log(updates)
                                    window.location.replace("./login.html");
                                }


                            }, 5000)
                        }).catch(function(error) {
                            // Error occurred. Inspect error.code.
                        });
                } else {

                    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                        .then(function(authData) {
                            auth = authData;

                            console.log(auth);
                            if (authData.emailVerified) {
                                window.location.replace("./index.html");
                                console.log(authData);
                            } else {
                                alert('email not verified, please check your email for confirmation');
                            }
                            //cmv@t3st@2021
                            // mike@agape-it.com

                        })
                        .catch(function(error) {
                            console.log("Login Failed!", error.message);
                            alert(error.message + ' Check your input');

                        })
                }
            });






        }
    });




});