setInterval(function() {
    var check = localStorage.getItem('curuseremail')
    console.log(check)

    if (!check) {
        $(".menu-item-4114").show()
        $(".mini-login-header").hide();
        $(".fa-sign-in").show();
        $(".fa-sign-out").hide();
        console.log(check)
    } else {
        $(".menu-item-4114").hide()
        $(".mini-login-header").show();
        $(".fa-sign-in").hide();
        $(".fa-sign-out").show();
        console.log(check)
    }
}, 500);


window