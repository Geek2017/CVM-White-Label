angular.module('newApp').controller('starcodeCtrl', function($scope) {

    $scope.url0 = 'Forms';
    $scope.url1 = 'Star Code Ref.';

    var myVar = setInterval(myTimer, 100);

    function myTimer() {
        $(".widget.widget-info").css("background", localStorage.getItem('unicolor'));
        $(".panel").css("border-top-color", localStorage.getItem('unicolor'));
        $(".panel-warning").css("border-top-color", localStorage.getItem('unicolor'));
        $(".x-navigation>li.xn-logo>a:first-child").css("background", localStorage.getItem('unicolor'));
        console.log('Star Code color theme set')
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