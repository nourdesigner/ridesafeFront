function HistoriqueControllerFN($scope,$http,$location) {
    $scope.hisotriques=[];
    $scope.kids=[];
    $http.get("http://localhost:3003/api/historique").then(function(reponse){
        $scope.hisotriques=reponse.data;
    })

    $scope.currentUser="0";
    $scope.pseudo="";
    $scope.password="";
    console.log($scope.kid);

    var currentUser = localStorage.getItem("currentUser");
    if(currentUser!=undefined){
        $scope.currentUser=currentUser;
    }

    if(localStorage.getItem("role")=='parent'){
        $http.get("http://localhost:3003/user/name/"+currentUser).then(function(reponse){
            console.log("kidsssssssssssssssssssssssss");
            console.log(reponse.data.kids[0]);
            $scope.kids=reponse.data.kids[0];
        })
    }
    $scope.showHistory=function (username) {
        alert(username);
    }
    $scope.kidsSession = function (username,niveau) {
        localStorage.setItem("kid", username);
        localStorage.setItem("niveau", niveau);
        console.log(niveau);
        $location.path("/play");
    }
    $scope.getTimes=function(n){
        return new Array($scope.niveau);
    }
    var currentUser = localStorage.getItem("currentUser");
    if(currentUser!=undefined){
        $scope.currentUser=currentUser;
    }

    $scope.doLogin=function (login,password) {
        $http.get("http://localhost:3003/user/"+login+"/"+password).then(function(response){
            if (response.length!=0){
                localStorage.setItem("currentUser", login);
                $scope.currentUser=localStorage.getItem("currentUser");
                    localStorage.setItem("role", response.data.role);
                   var result = response.data;
                $scope.role=localStorage.getItem("role");
                console.log($scope.currentUser);
            }else {
                alert('Failed to connect ');
            }

        })

    }

    $scope.logout=function () {
        localStorage.removeItem("currentUser", localStorage.getItem("currentUser"));
        localStorage.setItem("currentUser", "0");

        localStorage.removeItem("role", localStorage.getItem("role"));
        localStorage.setItem("role", "0");

        localStorage.removeItem("kids", localStorage.getItem("kids"));
        localStorage.setItem("kids", "0");

        localStorage.removeItem("kid", localStorage.getItem("kid"));
        $scope.kid="0";
        localStorage.setItem("kid", "0");

        localStorage.removeItem("niveau", localStorage.getItem("niveau"));
        localStorage.setItem("niveau", "0");

        $scope.currentUser=localStorage.getItem("currentUser");
        console.log(localStorage.getItem("currentUser"));
    }

}

angular
    .module("demo")
    .controller("HistoriqueController", HistoriqueControllerFN)