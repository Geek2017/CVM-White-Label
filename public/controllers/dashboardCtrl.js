angular.module('newApp').controller('dashboardCtrl', function($scope, $rootScope) {


    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
        console.log(current.originalPath); // Do not use $$route here it is private
    });

    var fcolor = localStorage.getItem('formcolor')
    $(".panel").css("border-top-color", fcolor);
    $(".btn-primary").css("background", fcolor)
    $(".btn-primary").css("border-color", 'white')
    $(".x-navigation>li.xn-logo>a:first-child").css("background", fcolor);
    $(".x-navigation li.active>a").css("background", fcolor);
    $(".panel-success>.panel-heading").css("color", fcolor);

});