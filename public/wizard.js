$(document).ready(function() {
    //initialize the firebase app
    var str = window.location.pathname;
    var res = str.slice(0, 5);

    var config = {
        apiKey: "AIzaSyArkU60LENXmQPHRvWoK26YagzprezV3dg",
        authDomain: "cmlformportal-b8674.firebaseapp.com",
        databaseURL: "https://cmlformportal-b8674.firebaseio.com/",
        projectId: "cmlformportal-b8674"
    };
    firebase.initializeApp(config);

    //create firebase references
    var Auth = firebase.auth();
    var dbRef = firebase.database();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $("#uname").text(user.displayName);
        }
    });

    $("#showpwd").click(function() {
        var x = document.getElementById("registerPassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });

    var myInput = document.getElementById("registerPassword");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    // When the user clicks on the password field, show the message box
    myInput.onfocus = function() {
        document.getElementById("message").style.display = "block";
    }
    document.getElementById("message").style.display = "none";
    // When the user clicks outside of the password field, hide the message box
    myInput.onblur = function() {
        document.getElementById("message").style.display = "none";
    }

    // When the user starts to type something inside the password field
    myInput.onkeyup = function() {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }

    $("#comlogo").change(function() {

        if (this.files && this.files[0]) {

            var FR = new FileReader();

            FR.addEventListener("load", function(e) {
                sessionStorage.setItem('companylogo', e.target.result)

                console.log(e.target)

                var partcusid = $('#cusid').val();

                var dbRef = firebase.database().ref().child('partner_data');
                dbRef.on('value', snapshot => {
                    var data = snapshot.val();
                    for (i = 0; i <= data.length; i++) {
                        if (data[i].custid == partcusid) {
                            console.log(data[i])
                            $('#comname').val(data[i].company)
                            $('#comcontact').val(data[i].phone)
                            $('#comaddress').val(data[i].address + " " + data[i].state)
                            break;
                        }

                    }

                })
            });

            FR.readAsDataURL(this.files[0]);
        }

        console.log("A file has been selected.");

    });

    $("#userimg").change(function() {
        console.log("A Image has been selected.");
        var file = document.querySelector('input[type=file]')['files'][0];
        var reader = new FileReader();
        var baseString;
        reader.onloadend = function() {
            baseString = reader.result;

            localStorage.setItem('userimgbase64', baseString)
        };
        reader.readAsDataURL(file);
    });

    $('#wizard-validation').on('submit', function(e) {
        e.preventDefault();



        $('#mb-signout').addClass('open')

        $("#callregister").click(function() {
            registarion();
        });

        function registarion() {

            document.getElementById("spinner").style.visibility = "visible";
            document.getElementById("finishwb").style.visibility = "hidden";

            var data = {
                email: $('#cusemail').val()

            };
            var passwords = {
                password: $('#registerPassword').val()
            }




            if (passwords.password && data.email) {

                firebase.auth()
                    .createUserWithEmailAndPassword(data.email, passwords.password)
                    .then(function(user) {

                        if (user) {
                            user.updateProfile({
                                displayName: $('#cusname').val(),
                                photoURL: ""
                            })
                        }

                        sendEmailVerification(data);
                        save_cus_credencials();
                        save_cus_com_info();

                        var cusname = $('#cusname').val();
                        var email = $('#cusemail').val();

                        function sendEmailVerification(data) {
                            cusname = firebase.auth().currentUser;
                            email = data.email || user.email;
                            var urlr = location.origin;

                            return user.emailVerified || user.sendEmailVerification({
                                url: urlr,
                            });
                        }
                        //save customer cred to firebase
                        function save_cus_credencials() {


                            var uid = firebase.database().ref().child('users').push().key;
                            var cusid = $('#cusid').val();
                            var cusname = $('#cusname').val();
                            var cusemail = $('#cusemail').val();



                            var data = {
                                user_id: uid,
                                cusid: cusid,
                                cusname: cusname,
                                cusemail: cusemail,
                                role: "1",
                                designation: "Account Manager",
                                userimage: localStorage.getItem('userimgbase64')
                            }

                            var updates = {};
                            updates['/users/' + uid] = data;
                            firebase.database().ref().update(updates);


                        }

                        //save customer com_info to firebase
                        function save_cus_com_info() {

                            var uid = firebase.database().ref().child('com_profiles').push().key;
                            var cusid = $('#cusid').val();
                            var comlogo = sessionStorage.getItem('companylogo');
                            var comname = $('#comname').val();
                            var comcontact = $('#comcontact').val();
                            var landmark = $('#landmark').val();
                            var comcity = $('#comcity').val();
                            var compostalcode = $('#compostalcode').val();
                            var comstate = $('#comstate').val();

                            var data = {
                                user_id: uid,
                                cusid: cusid,
                                comlogo: comlogo,
                                comname: comname,
                                landmark: landmark,
                                comcontact: comcontact,
                                comcity: comcity,
                                compostalcode: compostalcode,
                                comstate: comstate
                            }

                            var updates = {};
                            updates['/com_profiles/' + uid] = data;
                            firebase.database().ref().update(updates);

                            refresh();
                        }



                        function refresh() {
                            $('#datasent').addClass('open')
                            setTimeout(function() {
                                document.getElementById("spinner").style.visibility = "hidden";
                                window.location.replace("./login.html");
                            }, 3000);
                        }

                    }).catch(function(error) {
                        document.getElementById("spinner").style.visibility = "hidden";
                        document.getElementById("finishwb").style.visibility = "visible";
                        console.log("Registration Failed!", error.message);
                        alert(error.message + ' Check your input');
                    });


            }

        }
    });

    function myFunction() {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }




    $('#loginForm').on('submit', function(e) {
        e.preventDefault();


        if ($('#loginEmail').val() != '' && $('#loginPassword').val() != '') {
            //login the user
            var data = {
                email: $('#loginEmail').val(),
                password: $('#loginPassword').val()
            };
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then(function(authData) {
                    auth = authData;
                    if (authData.emailVerified) {
                        window.location.replace("./index.html");
                        console.log(authData);
                    } else {
                        alert('email not verified, please check your email for confirmation');
                    }


                })
                .catch(function(error) {
                    document.getElementById("spinner").style.visibility = "hidden";
                    console.log("Login Failed!", error.message);
                    window.location.replace("./wizard.html");
                    alert(error.message + ' Check your input');
                });
        }
    });


    $('#wizard').on('click', function(e) {
        window.location.replace("wizard.html")
    });


    $('#nexthwb').on('click', function(e) {

    });

});