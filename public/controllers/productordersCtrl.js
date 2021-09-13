angular.module('newApp').controller('productordersCtrl', function($scope, $timeout) {

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

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.osps = [];

    $scope.numberOfPages = () => {
        return Math.ceil(
            $scope.osps.length / $scope.pageSize
        );
    }

    for (var i = 0; i < 10; i++) {
        $scope.osps.push(`Question number ${i}`);
    }

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



    firebase.database().ref('/orders/').orderByChild('cusid').on("value", function(snapshot) {

        console.log(snapshot.val())
        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    returnArr.push(item);

                });
                $scope.orders = returnArr;
                console.log($scope.orders);

            });

        })

    });

    var uodata = [];

    $scope.editorders = function(order) {
        console.log(order);

        $scope.totalprice = order.tprice;

        uodata = [];
        uodata.push(order);

        $scope.orderstate = order.state;

        $timeout(function() {
            $scope.$apply(function() {

                var orders = JSON.parse(order.orders)

                $scope.odetails = orders;
                console.log($scope.odetails);

                setTimeout(function() {
                    txtslice();

                }, 500)
            });

        })
    }

    $scope.updatestate = function() {
        console.log(uodata[0]);
        var data = {
            cusid: uodata[0].cusid,
            date: uodata[0].date,
            designation: uodata[0].designation,
            email: uodata[0].email,
            key: uodata[0].key,
            name: uodata[0].name,
            orders: JSON.stringify($scope.odetails),
            state: $scope.orderstate,
            tprice: uodata[0].tprice
        }

        var updates = {};
        updates['/orders/' + uodata[0].key] = data;
        firebase.database().ref().update(updates);

        if (updates) {
            console.log(updates)
        }
    }


    function txtslice() {

        var minimized_elements = $('p.minimizes');

        minimized_elements.each(function() {
            var t = $(this).text();
            if (t.length < 50) return;

            $(this).html(
                t.slice(0, 50) + '<span>... </span><a href="#" class="more">More</a>' +
                '<span style="display:none;">' + t.slice(100, t.length) + ' <a href="#" class="less">Less</a></span>'
            );

        });

        $('a.more', minimized_elements).click(function(event) {
            event.preventDefault();
            $(this).hide().prev().hide();
            $(this).next().show();
        });

        $('a.less', minimized_elements).click(function(event) {
            event.preventDefault();
            $(this).parent().hide().prev().show().prev().show();
        });

    }

}).filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})