function TemoignageControllerFN($scope,$http) {

    $scope.reporting=[];
    $http.get("http://localhost:3003/api/reporting").then(function(reponse){
        $scope.reporting=reponse.data;
    })
    $scope.addreview = function () {
        var data = {
            _id: $scope.review._id,
            description: $scope.review.subject
            , subjectReporting: $scope.review.message
        };
        $http.post('http://localhost:3003/api/reporting', data).success(function (data, status) {
            console.log(status);
            init();
            alert('Review added');
        });
        $location.path('/');
    };


}
angular
    .module("demo")
    .controller("TemoignageController", TemoignageControllerFN)