function ShopControllerFN($scope,$http) {
    $scope.showmean=true;
    $scope.products=[];
    $http.get("http://localhost:3003/api/produit").then(function(reponse){
        $scope.products=reponse.data;
        console.log($scope.products[0]);
    })

    $scope.showcomments = function (mean) {
        if(mean !=undefined)
            console.log(mean);
    }
}

angular
    .module("demo")
    .controller("ShopController", ShopControllerFN)