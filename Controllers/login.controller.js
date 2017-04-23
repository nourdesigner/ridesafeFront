function LoginControllerFN($scope,$http,$location) {
    $scope.currentUser="0";
    $scope.pseudo="";
    $scope.password="";
    var currentUser = localStorage.getItem("currentUser");
    $scope.role=localStorage.getItem("role");
    if($scope.role=="admin"){
        $location.path('/dashboard');
    }
    if($scope.role=="player"){
        $location.path('/play');
    }
    if($scope.role=="parent"){
        $location.path('/historique');
    }
    if(currentUser!=undefined){
        $scope.currentUser=currentUser;
    }
    $scope.doLogin=function (login,password) {
        $http.get("http://localhost:3003/user/"+login+"/"+password).then(function(reponse){
            if (reponse.data.length!=0){
                localStorage.setItem("currentUser", login);
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
        $scope.currentUser=localStorage.getItem("currentUser");
        console.log(localStorage.getItem("currentUser"));
    }
}
angular
    .module("demo")
    .controller("LoginController",LoginControllerFN);