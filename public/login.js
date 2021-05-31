$(document).ready(function() {

    $(".alert").hide()

    $("#otpholder").hide()

    $(".validatec").hide()

    $("#alert").click(function() {
        $(".alert").hide()
    });


    document.getElementById("year").innerHTML = new Date().getFullYear();

    var config = {
        apiKey: "AIzaSyArkU60LENXmQPHRvWoK26YagzprezV3dg",
        authDomain: "cmlformportal-b8674.firebaseapp.com",
        databaseURL: "https://cmlformportal-b8674.firebaseio.com/",
        projectId: "cmlformportal-b8674"
    };

    firebase.initializeApp(config);

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        if ($('#loginEmail').val() !== '' && $('#loginPassword').val() !== '') {

            var data = {
                email: $('#loginEmail').val(),
                password: $('#loginPassword').val()
            };

            // var ref = firebase.database().ref("users");
            // ref.orderByChild("cusemail").equalTo($('#loginEmail').val()).on("child_added", function(snapshot) {
            //     console.log(snapshot.val())
            // });
            var ref = firebase.database().ref("users");
            ref.orderByChild("cusemail").equalTo($('#loginEmail').val()).on("child_added", function(snapshot) {
                if (snapshot.val().state === 0 && snapshot.val().userimage === "https://via.placeholder.com/150") {

                    console.log(snapshot.val().user_id);
                    console.log(snapshot.val().cusemail);
                    console.log(snapshot.val().userimage);

                    var actionCodeSettings = {
                        url: "https://kb.voipcloudconnect.com/4109-2/",
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
                            let otp = Math.random().toString().substr(2, 7);

                            var votp = otp;


                            console.log(auth);
                            if (authData.emailVerified) {

                                var ref = firebase.database().ref("users");
                                ref.orderByChild("cusemail").equalTo($('#loginEmail').val()).on("child_added", function(snapshot) {
                                    console.log(snapshot.val().mobileno)

                                    if (snapshot.val().otp === 1) {

                                        $(".validatec").show()
                                        $("#otpholder").show()

                                        $("#mauth0").hide()
                                        $("#mauth1").hide()
                                        $(".loginh").hide()

                                        var form = new FormData();
                                        form.append("To", snapshot.val().mobileno);
                                        form.append("From", "+14157924897");
                                        form.append("Body", "Hello!, " + snapshot.val().cusname + " this is your ConnectMeVoice OTP " + otp);

                                        var settings = {
                                            "url": "https://api.twilio.com/2010-04-01/Accounts/AC616dd219c8bea3811d0c502f573af681/Messages.json",
                                            "method": "POST",
                                            "timeout": 0,
                                            "headers": {
                                                "Authorization": "Basic QUM2MTZkZDIxOWM4YmVhMzgxMWQwYzUwMmY1NzNhZjY4MTpiNThlNTYwNGRjNzE5MDlhODYwNDgzZjljZmZiZDU0Mg=="
                                            },
                                            "processData": false,
                                            "mimeType": "multipart/form-data",
                                            "contentType": false,
                                            "data": form
                                        };

                                        $.ajax(settings).done(function(response) {
                                            var resp = JSON.parse(response)
                                            let str = resp.body.replace(/^\D+/g, '');
                                            // console.log(str)

                                        });

                                    } else {
                                        window.location.replace("./index.html");
                                        console.log(authData);
                                    }
                                });

                            } else {
                                alert('email not verified, please check your email for confirmation');
                            }

                            $(".validate").click(function() {
                                let etop = $('#otpno').val();

                                if (votp === etop) {
                                    localStorage.setItem('OTP', etop)
                                    console.log(votp, etop)
                                    window.location.replace("./index.html");
                                } else {
                                    console.log(votp, etop)
                                    alert('INVALID OTP')
                                }

                            })

                        })
                        .catch(function(error) {
                            console.log("Login Failed!", error.message);
                            alert(error.message + ' Check your input');

                        })
                }
            });






        }
    });

    $('#container').hide()

    $("#showit").click(function() {
        $('#container').show()
        $('#showit').hide()
        $(".css").css("padding-top", "0%");
    });

    function getUiConfig() {
        return {
            'callbacks': {
                'signInSuccess': function(user, credential, redirectUrl) {
                    handleSignedInUser(user);
                    return false;
                }
            },
            'signInFlow': 'invisible',
            'signInOptions': [{
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image',
                    size: 'invisible',
                    badge: 'bottomleft'
                },
                defaultCountry: 'PH',
                defaultNationalNumber: '639216686509',
                loginHint: '+639216686509'
            }],
            'tosUrl': 'https://www.google.com'
        };
    }



});