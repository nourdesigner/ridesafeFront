function CarControllerFN($scope,$http,CartService,$timeout) {
    $scope.$watch('viewContentLoaded',function(){
        $timeout(function() {
            CartService.updateNumItems();
        },0);
    });
}

angular
    .module("demo")
    .controller("CarController", CarControllerFN)