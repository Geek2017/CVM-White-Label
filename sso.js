setInterval(function() {
    var check = localStorage.getItem('curuseremail')
    console.log(check)

    if (!check) {
        $(".menu-item-4114").show()
        $(".mini-login-header").hide();
        console.log(check)
    } else {
        $(".menu-item-4114").hide()
        $(".mini-login-header").show();
        console.log(check)
    }
}, 500);