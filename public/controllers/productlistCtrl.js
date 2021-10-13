angular.module('newApp').controller('productlistCtrl', function($scope, $timeout) {

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];

    firebase.database().ref('/cmvproductlist/').orderByChild('cusid').on("value", function(snapshot) {

        $timeout(function() {
            $scope.$apply(function() {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });

                $scope.productlists = returnArr;

                console.log(returnArr);

                $scope.numberOfPages = () => {
                    return Math.ceil(
                        $scope.productlists.length / $scope.pageSize
                    );
                }

                for (var i = 0; i < 10; i++) {
                    $scope.productlists.push(`Question number ${i}`);
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

    $scope.savenewproduct = function() {

        try {
            var uid = firebase.database().ref().child('saleshistory').push().key;

            var data = {
                transdate: $scope.transdate,
                custpono: $scope.custpono,
                itemid: $scope.itemid,
                qtyshipped: $scope.qtyshipped,
                extamt: $scope.extamt,
                unitprice: $scope.unitprice,
                transid: $scope.transid,
                custname: $scope.custname,
                description: $scope.description,
                freightamt: $scope.freightamt,
            }

            var updates = {};
            updates['/saleshistory/' + uid] = data;
            firebase.database().ref().update(updates);

            if (updates) {
                console.log(updates);
                $scope.transdate = "";
                $scope.custpono = "";
                $scope.itemid = "";
                $scope.qtyshipped = "";
                $scope.extamt = "";
                $scope.unitprice = "";
                $scope.transid = "";
                $scope.custname = "";
                $scope.description = "";
                $scope.freightamt = "";
                alert('Data saved!')
            }

        } catch (error) {
            alert(error)
        }

    }

    $scope.deleteproduct = function(productlist) {

        console.log(productlist.key);

        $('#delsales').addClass('open')

        $scope.confirmdel = function() {
            if ($scope.deleteconfirm == "remove") {

                var ref = firebase.database().ref("/cmvproductlist/" + productlist.key);
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

        var uid = firebase.database().ref().child('cmvproductlist').push().key;

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
        updates['/cmvproductlist/' + uid] = data;
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