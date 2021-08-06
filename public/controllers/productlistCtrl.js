angular.module('newApp').controller('productlistCtrl', function($scope, $timeout) {

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];




    firebase.database().ref('/productlist/').orderByChild('cusid').on("value", function(snapshot) {

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
            if ($scope.deleteconfirm === "remove") {

                var ref = firebase.database().ref("/productlist/" + productlist.key);
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

}).filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})