function DashboardControllerFN($scope,$http,$location) {
    $scope.admin="Welcome Admin";
    $scope.currentUser="0";
    $scope.pseudo="";
    $scope.password="";
    $scope.role="0";
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
    .controller("DashboardController",DashboardControllerFN);