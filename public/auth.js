$(document).ready(function() {
    // alert('checking')

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('User Login!')
        } else {
            console.log('User Logout!');
            localStorage.clear();
            sessionStorage.clear();
        }
    });
});