function DashboardControllerFN($scope,$http,$location) {
    $scope.currentUser="0";
    $scope.pseudo="";
    $scope.password="";
    $scope.role="0";
    $scope.addAction=false;

    /* ****************************** */
    $scope.quiz="";
    $scope.products="";
    $scope.isBack=false;
    $scope.successMessage=false;
    $scope.role=localStorage.getItem("role");
    $http.get("http://localhost:3003/api/quiz").then(function(reponse){
        $scope.quizs=reponse.data;
        $scope.length=$scope.quizs.length;
    })
    $http.get("http://localhost:3003/api/produit").then(function(reponse){
        $scope.products=reponse.data;
    })
    /* ********QUIZ*********** */
    $scope.addQ=function () {
        $scope.isBack=true;$scope.quizAction=false;
    }
    $scope.addQuiz=function () {
        console.log("addQuiz");
        console.log($scope.quizAction);
        $scope.doError=false;
        if ($scope.quiz.Question==undefined  || $scope.quiz.Reponses[0]==undefined || $scope.quiz.Reponses[1]==undefined || $scope.quiz.Reponses[2]==undefined || $scope.quiz.tags==undefined || $scope.quiz.Reponse==undefined){
            $scope.doError=true;
        }else{
            var data = {
                Question: $scope.quiz.Question,
                Reponses:[$scope.quiz.Reponses[0],$scope.quiz.Reponses[1],$scope.quiz.Reponses[2]],
                tags:$scope.quiz.tags,
                Reponse:$scope.quiz.Reponse

            };
            $http.post('http://localhost:3003/api/quiz', data).success(function (data, status) {
                if(status==200){
                    $scope.isBack=false;
                    $scope.quizAction=false;
                    $scope.successMessage=true;
                    $scope.quizs.push(data);

                }
            });
        }

    }
    $scope.updateQuiz=function (id) {
        $scope.quizAction=true;
        console.log($scope.quizAction);
        $http.get("http://localhost:3003/api/quiz/"+id).then(function (reponse) {
            $scope.quiz = reponse.data[0];
            $scope.isBack=true;
            console.log($scope.quiz);
        })
    }
    $scope.doUpdateQuiz=function (id) {
        var data = {
            Question: $scope.quiz.Question,
            Reponses:[$scope.quiz.Reponses[0],$scope.quiz.Reponses[1],$scope.quiz.Reponses[2]],
            tags:$scope.quiz.tags,
            Reponse:$scope.quiz.Reponse

        };
        $http.put('http://localhost:3003/api/quiz/'+id, data).success(function (data, status) {
            if(status==200){
                $scope.isBack=false;
                $scope.successMessage=true;
                $http.get("http://localhost:3003/api/quiz").then(function(reponse){
                    $scope.quizs=reponse.data;
                })
            }
        });

    }
    $scope.resetAction=function () {
        $scope.quiz.Question=$scope.quiz.Reponses[1]=$scope.quiz.Reponses[0]=$scope.quiz.Reponses[2]=$scope.quiz.tags=$scope.quiz.Reponse="";
        $scope.p="";
    }
    $scope.removeQuiz=function (id) {
        $http.delete('http://localhost:3003/api/quiz/'+id).success(function (data, status) {
            if(status==200){
                $scope.isBack=false;
                $scope.successMessage=true;
                $scope.quizs.push(data);

                $scope.deleted=true;
            }
        });
    }

    /* ********PRODUCT*********** */
    $scope.updateProductShow=false;
    
    $scope.addProduct=function () {

        $scope.productAction=false;
        $scope.updateProductShow=true;
        $scope.isBackprod=true;

        console.log("Logged");
    }
    $scope.doAddProduct=function () {
        console.log($scope.p);
        $http.post("http://localhost:3003/api/produit",$scope.p).then(function (response) {
            console.log("added");
        })
    }
    $scope.updateProduct =function (p) {
        $scope.p=p;
        $scope.productAction=true;
        $scope.updateProductShow=true;
        $scope.isBackprod=true;

    }
    $scope.doUpdateProduct=function (p) {
        $http.put("http://localhost:3003/api/produit/"+p._id,p).then(function () {
            console.log("updateProduit");
            $scope.isBackprod=false;
            $scope.successMessage=true;
            $http.get("http://localhost:3003/api/produit").then(function(reponse){
                $scope.products=reponse.data;
            })
        })
    }
    $scope.deleteProduct=function (id,$index) {
        $http.delete("http://localhost:3003/api/produit/"+id).then(function (response) {
            $scope.products.splice($index,1);
        })
    }
    $scope.addP=function () {
        $scope.isBackP=true;
    }
    /* ***************************** */
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
        localStorage.removeItem("currentUser", localStorage.getItem("currentUser"));
        localStorage.setItem("currentUser", "0");

        localStorage.removeItem("role", localStorage.getItem("role"));
        localStorage.setItem("role", "0");
        $scope.role=localStorage.getItem("role");
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
    .controller("DashboardController",DashboardControllerFN);