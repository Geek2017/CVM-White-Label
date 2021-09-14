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
                    returnArr.push(item);
                });

                $scope.wishlists = returnArr;

                console.log(returnArr);

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


    $scope.editproduct = function(productlist) {
        console.log(productlist);
        $scope.productlist = productlist;
        prodkey = productlist.key;
    }

    $scope.updateproduct = function(productlist) {

        console.log(productlist);
        var updates = {};

        var ResourceUrl = [{ ResourceUrl: $scope.productlist.Imgs[0].ResourceUrl }];

        data = {
            BrandName: $scope.productlist.BrandName,
            Imgs: ResourceUrl,
            ItemID: $scope.productlist.ItemID,
            MSRP: $scope.productlist.MSRP,
            Manufacturer: $scope.productlist.Manufacturer,
            ProductDescription: $scope.productlist.ProductDescription,
            ProductName: $scope.productlist.ProductName,
            Sku: $scope.productlist.Sku,
            StandardPrice: $scope.productlist.StandardPrice,
            UnitPrice: $scope.productlist.UnitPrice
        }

        updates['/cmvproductlist/' + productlist.key] = data;

        firebase.database().ref().update(updates);
    }

    $scope.addproduct = function() {
        $('#add_modal').modal('show');
    }

    $scope.saveproduct = function() {

        var uid = firebase.database().ref().child('wishlist').push().key;

        var data = {
            BrandName: $scope.BrandName,
            ResourceUrl: $scope.ResourceUrl,
            ItemID: $scope.ItemID,
            MSRP: $scope.MSRP,
            Manufacturer: $scope.Manufacturer,
            ProductDescription: $scope.ProductDescription,
            ProductName: $scope.ProductName,
            Sku: $scope.Sku,
            StandardPrice: $scope.StandardPrice,
            UnitPrice: $scope.UnitPrice
        }

        var updates = {};
        updates['/wishlist/' + uid] = data;
        firebase.database().ref().update(updates);

        if (updates) {
            console.log(updates);
            alert('Data Saved!')
        }

    }

}).filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})