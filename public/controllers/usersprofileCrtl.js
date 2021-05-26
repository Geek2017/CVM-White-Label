angular.module('newApp').controller('usersprofileCrtl', function($scope) {
    var fcolor = localStorage.getItem('formcolor')
    $(".panel").css("border-top-color", fcolor);
    $(".btn-primary").css("background", fcolor)

    $(".x-navigation>li.xn-logo>a:first-child").css("background", fcolor);
    $(".x-navigation li.active>a").css("background", fcolor);
    $(".panel-success>.panel-heading").css("color", fcolor);
    $scope.url0 = 'User';
    $scope.url1 = 'Profile';

    firebase.auth().onAuthStateChanged(function(user) {

        $("#userimg").change(function() {
            console.log("A file has been selected.");
            var file = document.querySelector('input[type=file]')['files'][0];
            var reader = new FileReader();
            var baseString;
            reader.onloadend = function() {
                baseString = reader.result;
                console.log(baseString);
                sessionStorage.setItem('userimg', baseString)
            };
            reader.readAsDataURL(file);
        });


        //   console.log(user)
        var databaseRef = firebase.database().ref('users/');
        databaseRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();


                if (user.providerData[0].email == childData.cusemail) {
                    console.log(childSnapshot.key);

                    console.log(childData);

                    localStorage.setItem('childkey', childSnapshot.key)

                    $('#usersname').val(childData.cusname);
                    $('#usersmail').val(childData.cusemail);
                    $('#mobile').val(childData.mobile);
                    $('#usersdesignation').val(childData.designation);
                    $('#phone').val(childData.phone)
                }

            });
        });

        $("#userimg").change(function() {
            console.log("A User Image has been selected.");
            var file = document.querySelector('input[type=file]')['files'][0];
            var reader = new FileReader();
            var baseString;
            reader.onloadend = function() {
                baseString = reader.result;
                console.log(baseString);
                sessionStorage.setItem('userimg', baseString)
            };
            // reader.readAsDataURL(file);
        });

        $('#updateprofile').on('submit', function(e) {
            e.preventDefault();

            var uid = firebase.database().ref().child('users').push().key;
            var data = {
                cusid: sessionStorage.getItem('curuserid'),
                cusname: $('#usersname').val(),
                cusemail: $('#usersmail').val(),
                phone: $('#phone').val(),
                designation: $('#usersdesignation').val(),
                mobile: $('#mobile').val(),
                userimage: sessionStorage.getItem('userimg'),
                used_id: localStorage.getItem('childkey'),
                role: sessionStorage.getItem('role')
            }

            if (user) {
                user.updateProfile({
                    displayName: $('#usersname').val()
                })
            }


            var myDiv = document.getElementById("curusername");
            myDiv.innerHTML = '<p>' + $('#usersname').val() + '</p>';
            $('#profile-mini').attr('src', sessionStorage.getItem('userimg'));
            $('#profile-image').attr('src', sessionStorage.getItem('userimg'));

            var updates = {};
            updates['/users/' + localStorage.getItem('childkey')] = data;
            firebase.database().ref().update(updates);

            alert('The user is updated successfully!');




        });
    });

});