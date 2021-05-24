angular.module('newApp').controller('dashboardCtrl', function($scope, $rootScope, $timeout) {


    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
        console.log(current.originalPath); // Do not use $$route here it is private
    });

    var fcolor = localStorage.getItem('formcolor')
    $(".panel").css("border-top-color", fcolor);
    $(".btn-primary").css("background", fcolor)
    
    $(".x-navigation>li.xn-logo>a:first-child").css("background", fcolor);
    $(".x-navigation li.active>a").css("background", fcolor);
    $(".panel-success>.panel-heading").css("color", fcolor);





    firebase.database().ref('/salesproposal/').orderByChild('cusid').on("value", function(snapshot) {
        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                console.log(returnArr.length)
                if (returnArr.length) {
                    $scope.spcount = returnArr.length;
                } else {
                    $scope.spcount = 0;
                }
            });

        })
    })

    firebase.database().ref('/portlocalnumber/').orderByChild('cusid').on("value", function(snapshot) {
        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                console.log(returnArr.length)

                if (returnArr.length) {
                    $scope.plncount = returnArr.length;
                } else {
                    $scope.plncount = 0;
                }
            });

        })
    })

    firebase.database().ref('/porttollfreenumber/').orderByChild('cusid').on("value", function(snapshot) {
        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                console.log(returnArr.length)
                $scope.ptfncount = returnArr.length;

                if (returnArr.length) {
                    $scope.ptfncount = returnArr.length;
                } else {
                    $scope.ptfncount = 0;
                }


            });

        })
    })

});