function ShopControllerFN($scope,$http,CartService) {

    $scope.$watch('viewContentLoaded',function(){

        CartService.updateNumItems();
    });
    $scope.showmean=true;
    $scope.products=[];
    $scope.commentaires=[];
    $http.get("http://localhost:3003/api/produit").then(function(reponse){
        $scope.products=reponse.data;
    },function(reponse){
        $scope.products=reponse.data;
    })
      $http.get("http://localhost:3003/api/commentaire").then(function(reponse){
            $scope.commentaires=reponse.data;

        })

    $scope.showcomments = function (mean) {
        if(mean !=undefined)
            console.log(mean);
    }

    $scope.addcomment = function () {
        var data = {
            _id: $scope.comment._id,
            commentaire: $scope.comment.commentaire
        };
        $http.post('http://localhost:3003/api/commentaire', data).success(function (data, status) {
            console.log(status);
            init();
            alert('Comment added');
        });
        $location.path('/');
    };



    $scope.addToCart=function(item){
        CartService.add(item);
    }

}

angular
    .module("demo")
    .controller("ShopController", ShopControllerFN)