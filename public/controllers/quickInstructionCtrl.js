angular.module('newApp').controller('quickInstructionCtrl', function($scope) {

    $scope.url0 = 'Forms';
    $scope.url1 = 'Q Instructions';

    var myVar = setInterval(myTimer, 100);

    $("#comname").text(localStorage.getItem('comname'))
    $("#landmark").text(localStorage.getItem('landmark'))
    $("#comcity").text(localStorage.getItem('comcity'))
    $("#comstate").text(localStorage.getItem('comstate'))
    $("#compostalcode").text(localStorage.getItem('compostalcode'))
    $("#comno").text(localStorage.getItem('comcontact'))

    function myTimer() {
        $(".widget.widget-info").css("background", localStorage.getItem('unicolor'));
        $(".panel").css("border-top-color", localStorage.getItem('unicolor'));
        $(".panel-warning").css("border-top-color", localStorage.getItem('unicolor'));
        $(".x-navigation>li.xn-logo>a:first-child").css("background", localStorage.getItem('unicolor'));
        console.log('Q Instructions color theme set')

        if (sessionStorage.getItem('comlogo')) {
            console.log('imageloaded')
            $('#comlogo').attr('src', sessionStorage.getItem('comlogo'));
        } else {
            console.log('imagenotloaded')
            $('#comlogo').attr('src', 'assets/images/plj.jpg')
        }
    }

    setTimeout(function() {
        clearInterval(myVar);
    }, 2000);

});