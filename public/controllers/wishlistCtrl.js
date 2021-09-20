angular.module('newApp').controller('wishlistCtrl', function($scope, $timeout) {

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];




    firebase.database().ref('/wishlist/').orderByChild('cusid').on("value", function(snapshot) {

        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    let data = item.orders
                    var idata = {
                        key: item.key,
                        cusid: item.cusid,
                        date: item.cusid,
                        designation: item.designation,
                        email: item.email,
                        key: item.key,
                        name: item.name,
                        orders: JSON.parse(data),
                        state: item.state,
                        tprice: item.tprice
                    }

                    returnArr.push(idata);
                });

                $scope.wishlists = returnArr;

                console.log($scope.wishlists[0].orders)


                $scope.numberOfPages = () => {
                    return Math.ceil(
                        $scope.wishlists.length / $scope.pageSize
                    );
                }

                for (var i = 0; i < 10; i++) {
                    $scope.data.push(`Question number ${i}`);
                }
            });

        })

    });

    $scope.showproduct = function() {
        $('#addnewproduct').modal('toggle');
    }

    $scope.importproduct = function() {
        $('#importproduct').modal('toggle');
    }


    $scope.deletewishlist = function(productlist) {

        console.log(productlist.key);

        $('#delsales').addClass('open')

        $scope.confirmdel = function() {
            if ($scope.deleteconfirm == "remove") {

                var ref = firebase.database().ref("/wishlist/" + productlist.key);
                ref.remove()
                    .then(function() {
                        console.log("Remove succeeded.")
                        $('#delsales').removeClass('open')
                    })
                    .catch(function(error) {
                        console.log(error.message)
                    });

            }
        }
    }

    $scope.placeorder = function(w) {

        console.log(w);

        var uid = firebase.database().ref().child('/orders').push().key;

        var products = {
            date: firebase.database.ServerValue.TIMESTAMP,
            email: w.email,
            cusid: w.cusid,
            name: w.name,
            designation: w.designation,
            orders: JSON.stringify(w.orders),
            tprice: w.tprice,
            state: w.state
        }

        console.log(products)

        var updates = {};
        updates['/orders/' + uid] = products;
        firebase.database().ref().update(updates, alert('Order had been Placed!'));

        if (updates) {
            console.log(updates)
            setTimeout(function() {
                window.location.href = "#productorders";
            }, 1000)
        }



    }

}).filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})