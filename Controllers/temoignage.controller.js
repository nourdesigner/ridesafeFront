function TemoignageControllerFN($scope,$http,CartService,$timeout) {
    $scope.$watch('viewContentLoaded',function(){
        $timeout(function() {
            CartService.updateNumItems();
        },0);
    });
    $scope.currentUser="0";
    $scope.pseudo="";
    $scope.password="";
    $scope.role="0";
    var report="";

    $scope.reporting=[];
    $scope.added=false;
    $scope.addReviewAction=false;
    $http.get("http://localhost:3003/api/reporting").then(function(reponse){
        $scope.reporting=reponse.data;
    })
    $scope.addreview = function () {
        var username="";
        if($scope.currentUser==""){
            username="Visitor";
        }else{
            username=$scope.currentUser;
        }
        var data = {
            _id: $scope.review._id,
            description: $scope.review.subject
            , subjectReporting: $scope.review.message
            ,user:username
        };
        $http.post('http://localhost:3003/api/reporting/', data).success(function (data, status) {

        });
        $scope.reporting.push(data);
        $scope.addReviewAction=false;
        $scope.review.subject=$scope.review.message="";
        $scope.added=true;
    }
    
    $scope.likereport=function (id) {
        $http.get("http://localhost:3003/api/reporting/"+id).then(function (reponse) {
            report = reponse.data[0];
        });
        console.log($scope.currentUser.indexOf(report.like));
        if($scope.currentUser.indexOf(report.like)>-1){
            console.log("-");
        }
        else{
            console.log("++");
        }
console.log(report);
    }
    var currentUser = localStorage.getItem("currentUser");
    if(currentUser!=undefined){
        $scope.currentUser=currentUser;
    }
    $scope.role=localStorage.getItem("role");
    $scope.doLogin=function (login,password) {
        $http.get("http://localhost:3003/user/"+login+"/"+password).then(function(reponse){
            if (reponse.data.length!=0){
                localStorage.setItem("currentUser", login);
                localStorage.setItem("role", reponse.data.role);
                $scope.role=localStorage.getItem("role");
                $scope.currentUser=localStorage.getItem("currentUser");
                if(reponse.data.role=="admin"){
                    $location.path('/dashboard');
                }
                if(reponse.data.role=="player"){
                    $location.path('/play');
                }
                if(reponse.data.role=="parent"){
                    $location.path('/historique');
                }

            }else {
                alert('Failed to connect ');
            }

        })
    }
    $scope.logout=function () {
        localStorage.removeItem("currentUser", "Wemtek");
        localStorage.setItem("currentUser", "0");
        localStorage.removeItem("role", "admin");
        localStorage.setItem("role", "0");
        $scope.currentUser=localStorage.getItem("currentUser");
        $scope.role=localStorage.getItem("role");

        console.log(localStorage.getItem("currentUser"));
    }


}
angular
    .module("demo")
    .controller("TemoignageController", TemoignageControllerFN)