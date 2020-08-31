'use strict';


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
        sessionStorage.setItem('comid', snapshot.val().cusid)
        $(location).attr('href', '/formsindex.html#/sfsalesproposal')


        if (snapshot.val().hashkeycode !== street) {
            alert('Invalid Access!');
            $(location).attr('href', 'login');
        }


    });

    var ref = firebase.database().ref("com_profiles");
    ref.orderByChild("cusid").equalTo(sessionStorage.getItem('comid')).on("child_added", function(snapshots) {
        console.log('Logo & name is Set');
        sessionStorage.setItem('curcomname', snapshots.val().comname);
        sessionStorage.setItem('comlogo', snapshots.val().comlogo);
    });


});