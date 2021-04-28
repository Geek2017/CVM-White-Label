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

    var splitd0 = fields[0];
    var splitd1 = fields[1];


    console.log(splitd1, splitd0);

    sessionStorage.setItem('keyhash', splitd1);
    localStorage.setItem('keyhash', splitd1);
    let fetchd = localStorage.getItem('keyhash');

    var ref = firebase.database().ref("sfsalespropsal");
    ref.orderByChild("hashkeycode").equalTo(fetchd).on("child_added", function(snapshot) {
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




        if (snapshot.val().hashkeycode !== splid2[0]) {
            alert('Invalid Access!');
            $(location).attr('href', 'login');
        }


    });





});