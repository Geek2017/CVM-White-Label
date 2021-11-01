angular.module('newApp').controller('mydocsCrtl', function($scope, $timeout) {

    var fcolor = localStorage.getItem('formcolor')
    $(".panel").css("border-top-color", fcolor);
    $(".btn-primary").css("background", fcolor)

    $(".x-navigation>li.xn-logo>a:first-child").css("background", fcolor);
    $(".x-navigation li.active>a").css("background", fcolor);
    $(".panel-success>.panel-heading").css("color", fcolor);

    $scope.comname = localStorage.getItem('comname');
    $scope.comlandmark = localStorage.getItem('landmark');
    $scope.comcity = localStorage.getItem('comcity');
    $scope.comstate = localStorage.getItem('comstate');
    $scope.compostalcode = localStorage.getItem('compostalcode');
    $scope.comno = localStorage.getItem('comcontact');
    $scope.curem = localStorage.getItem('curuseremail');

    var logo = sessionStorage.getItem('comlogo');
    if (logo) {

        console.log(logo.width, logo.height);
        var i = new Image();
        console.log(logo)
        i.onload = function() {
            console.log(i.width + ", " + i.height);

            if (i.width == i.height) {
                $('#comlogo').attr('src', logo).css({ 'width': '100px', 'height': '100px' });;
            } else {
                $('#comlogo').attr('src', logo).css({ 'width': '200px', 'height': '60px' });;
            }


        };
        i.src = logo;

    } else {
        console.log('imagenotloaded')
        $('#comlogo').attr('src', 'assets/images/plj.jpg')
    }

    $scope.viewfile = function(nsp) {
        console.log(nsp.key);
        localStorage.setItem('sdata', nsp.key);
        if (nsp.doctype === "Sales Proposal") {
            console.log(nsp.doctype);
            window.location.replace("#/spindex");
        } else {
            if (nsp.doctype === "Port Local No.") {
                console.log(nsp.doctype);
                window.location.replace("#/plnindex");
            } else {
                console.log(nsp.doctype);
                window.location.replace("#/ptfnindex");
            }
        }

    }

    firebase.database().ref('/salesproposal/').orderByChild('cusid').on("value", function(snapshot) {

        let cdata = localStorage.getItem('curuserid');

        console.log(snapshot.val())

        let returnArr = [];

        $timeout(function() {
            $scope.$apply(function() {
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    console.log(item, parseInt(cdata));

                    if (item.cusid == parseInt(cdata)) {

                        returnArr.push(item);
                    }

                });

            });

        })

        firebase.database().ref('/portlocalnumber/').orderByChild('cusid').on("value", function(snapshot) {
            $timeout(function() {
                $scope.$apply(function() {
                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;

                        console.log(item, parseInt(cdata));

                        if (item.cusid == parseInt(cdata)) {

                            returnArr.push(item);
                        }

                    });

                });

            })
        });

        firebase.database().ref('/porttollfreenumber/').orderByChild('cusid').on("value", function(snapshot) {
            $timeout(function() {
                $scope.$apply(function() {
                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;

                        console.log(item, parseInt(cdata));

                        if (item.cusid == parseInt(cdata)) {

                            returnArr.push(item);
                        }

                    });
                    $scope.osps = returnArr;
                    console.log(returnArr)
                });

            })
        });



        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.returnArr = [];

        $scope.numberOfPages = () => {
            return Math.ceil(
                $scope.returnArr.length / $scope.pageSize
            );
        }

        for (var i = 0; i < 10; i++) {
            $scope.returnArr.push(`Question number ${i}`);
        }

    });

});