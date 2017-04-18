function PlayControllerFN($scope,$http) {

    $scope.questions=[];
    $scope.position=0;
    $scope.myVar="";
    $scope.score=0;
    $scope.length=0;
    $scope.type="";
    $http.get("http://localhost:3003/api/quiz").then(function(reponse){
        $scope.questions=reponse.data;
        $scope.length=$scope.questions.length;
        console.log($scope.length);
    })

    $scope.startQuiz=function (blind) {
        $scope.type=blind;
        $scope.getQuestion();
    }

    $scope.getQuestion = function  () {
        $scope.question=$scope.questions[$scope.position];
        if($scope.type=="blind"){
            window.speechSynthesis.speak(new SpeechSynthesisUtterance($scope.question.Question));
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("A = "+$scope.question.Reponses[0]));
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("B ="+$scope.question.Reponses[1]));
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("C ="+$scope.question.Reponses[2]));
        }
        if($scope.myVar==$scope.question.Reponse){
            $scope.score++;
        }
        $scope.position++;
        $scope.myVar="";
    }


}

angular
    .module("demo")
    .controller("PlayController", PlayControllerFN)