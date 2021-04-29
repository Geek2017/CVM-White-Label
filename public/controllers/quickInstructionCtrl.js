angular.module('newApp').controller('quickInstructionCtrl', function($scope) {

    var fcolor = localStorage.getItem('formcolor')
    $(".panel").css("border-top-color", fcolor);
    $(".btn-primary").css("background", fcolor)
    $(".btn-primary").css("border-color", 'white')
    $(".x-navigation>li.xn-logo>a:first-child").css("background", fcolor);
    $(".x-navigation li.active>a").css("background", fcolor);
    $(".panel-success>.panel-heading").css("color", fcolor);

    $scope.comname = localStorage.getItem('comname');
    $scope.comlandmark = localStorage.getItem('landmark');
    $scope.comcity = localStorage.getItem('comcity');
    $scope.comstate = localStorage.getItem('comstate');
    $scope.compostalcode = localStorage.getItem('compostalcode');
    $scope.comno = localStorage.getItem('comcontact');


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




});