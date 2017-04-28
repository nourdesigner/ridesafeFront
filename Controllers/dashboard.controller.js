function DashboardControllerFN($scope,$http,$location) {
    $scope.admin="Welcome Admin";
    $scope.currentUser="0";
    $scope.pseudo="";
    $scope.password="";
    $scope.role="0";
    $scope.addAction=false;

    /* ****************************** */
    $scope.quiz="";
    $scope.isBack=false;
    $scope.successMessage=false;
    $http.get("http://localhost:3003/api/quiz").then(function(reponse){
        $scope.quizs=reponse.data;
        console.log(reponse);
        $scope.length=$scope.quizs.length;
    })

    $scope.addQuiz=function () {
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
                    $http.get("http://localhost:3003/api/quiz").then(function(reponse){
                        $scope.quizs=reponse.data;
                    })
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
        $scope.quiz.Question=$scope.quiz.c1=$scope.quiz.c2=$scope.quiz.c3=$scope.quiz.tags=$scope.quiz.Reponse="";
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