function CartControllerFN($scope, $http, CartService, $timeout) {
    $scope.showmean = true;
    $scope.$watch('viewContentLoaded', function () {
        $timeout(function () {
            CartService.updateNumItems();
        }, 0);
    });

    $scope.cart = CartService.getCart();

    $scope.removeFromCart = function (item) {
        CartService.delete(item._id);
        $scope.cart = CartService.getCart();
        updateTotal();
    }

    function updateTotal(){
        $scope.total = CartService.getTotal();
    }

    updateTotal();

    $scope.checkout = function(){
        if($scope.total>0) {
            var yes = confirm("Are you sure you want to check out?");
            if (yes) {
                CartService.checkout();
                $scope.cart = CartService.getCart();
                updateTotal();
            }
        } else {
            alert('Your Cart Is Empty');
        }
    }
}

angular
    .module("demo")
    .controller("CartController", CartControllerFN)