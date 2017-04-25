function HistoriqueControllerFN($scope,$http) {
    $scope.hisotriques=[];

    $http.get("http://localhost:3003/api/historique").then(function(reponse){
        $scope.hisotriques=reponse.data;
    })

    $scope.currentUser="0";
    $scope.pseudo="";
    $scope.password="";
    console.log($scope.hisotriques);
    var currentUser = localStorage.getItem("currentUser");
    if(currentUser!=undefined){
        $scope.currentUser=currentUser;
    }
    $scope.doLogin=function (login,password) {
        $http.get("http://localhost:3003/user/"+login+"/"+password).then(function(reponse){
            if (reponse.data.length!=0){
                localStorage.setItem("currentUser", login);
                $scope.currentUser=localStorage.getItem("currentUser");
                console.log($scope.currentUser);
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
        console.log(localStorage.getItem("currentUser"));
    }

}

angular
    .module("demo")
    .controller("HistoriqueController", HistoriqueControllerFN)