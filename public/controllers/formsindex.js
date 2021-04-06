angular.module('sfApp').controller('formsindex', function($scope, $window) {

    var config = {
        apiKey: "AIzaSyArkU60LENXmQPHRvWoK26YagzprezV3dg",
        authDomain: "cmlformportal-b8674.firebaseapp.com",
        databaseURL: "https://cmlformportal-b8674.firebaseio.com/",
        projectId: "cmlformportal-b8674"
    };
    //load firabase ones 
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    //create firebase references
    var Auth = firebase.auth();
    var dbRef = firebase.database();

    // alert(window.location.pathname);
    var authurl = window.location.href

    var fields = authurl.split('#/:');

    var name = fields[0];
    var street = fields[1];

    console.log(street);

    localStorage.setItem('street', street)

    var ref = firebase.database().ref("sfsalespropsal");
    ref.orderByChild("hashkeycode").equalTo(localStorage.getItem('street')).on("child_added", function(snapshot) {
        console.log(snapshot.val().hashkeycode);
        sessionStorage.setItem('hashkey', snapshot.val().hashkeycode)



        var ref = firebase.database().ref("com_profiles");
        ref.orderByChild("cusid").equalTo(snapshot.val().cusid).on("child_added", function(snapshot) {

            $('#span').text(snapshot.val().comname);

            localStorage.setItem('comcity', snapshot.val().comcity)
            localStorage.setItem('comstate', snapshot.val().comstate)
            localStorage.setItem('compostalcode', snapshot.val().compostalcode)
            localStorage.setItem('comcontact', snapshot.val().comcontact)
            localStorage.setItem('comname', snapshot.val().comname)
            localStorage.setItem('landmark', snapshot.val().landmark)

            localStorage.setItem('comlogo', snapshot.val().comlogo)

            console.log(snapshot.val())
            $(location).attr('href', '/formsindex.html#/sfsalesproposal')

        });




        if (snapshot.val().hashkeycode !== street) {
            alert('Invalid Access!');
            $(location).attr('href', 'login');
        }


    });





});