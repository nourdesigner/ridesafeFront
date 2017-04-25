function PlayControllerFN($scope,$http) {

    $scope.questions=[];
    $scope.position=0;
    $scope.myVar="";
    $scope.score=0;
    $scope.length=0;
    $scope.type="";
    $scope.tags=[];
    $scope.falseTags=[];
    $scope.generatedTag="";
    $scope.generatedQuestions=[];
    $scope.result=[];
    $scope.user=[];
    var pos=0;
    var len=0;

    $scope.currentUser="0";
    $scope.pseudo="";
    $scope.password="";
    //localStorage.setItem("currentUser", "Wemtek");

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
        /* if (login=="wemtek" && password=="wemtek"){
             localStorage.setItem("currentUser", "wemtek");
             $scope.currentUser=localStorage.getItem("currentUser");
             console.log($scope.currentUser);
         }else {
             alert('Failed to connect ');
         }*/

    }

    $http.get("http://localhost:3003/api/quiz").then(function(reponse){
        $scope.questions=reponse.data;
        $scope.length=$scope.questions.length;
        len = $scope.questions.length;
        console.log($scope.position);
    })

    $scope.logout=function () {
        localStorage.removeItem("currentUser", "Wemtek");
        localStorage.setItem("currentUser", "0");
        localStorage.removeItem("role", "admin");
        localStorage.setItem("role", "0");
        $scope.currentUser=localStorage.getItem("currentUser");
        console.log(localStorage.getItem("currentUser"));
    }

    $scope.startQuiz=function (blind) {
        $scope.type=blind;
        $scope.getQuestion();
    }

    $scope.getQuestion = function  () {
        if($scope.currentUser!=0){


            $scope.question=$scope.questions[$scope.position];

            if($scope.type=="blind"){
                window.speechSynthesis.speak(new SpeechSynthesisUtterance($scope.question.Question));
                window.speechSynthesis.speak(new SpeechSynthesisUtterance("A = "+$scope.question.Reponses[0]));
                window.speechSynthesis.speak(new SpeechSynthesisUtterance("B ="+$scope.question.Reponses[1]));
                window.speechSynthesis.speak(new SpeechSynthesisUtterance("C ="+$scope.question.Reponses[2]));
            }

            if($scope.position!=0){
                if($scope.myVar==$scope.questions[$scope.position-1].Reponse){
                    $scope.score++;
                   // console.log("indexOF "+$scope.questions[$scope.position-1].tags +":"+$scope.tags.indexOf($scope.questions[$scope.position-1].tags));
                    $scope.tags[$scope.tags.indexOf($scope.questions[$scope.position-1].tags)+2]++;
                  //  console.log("After Score ="+$scope.tags[$scope.tags.indexOf($scope.questions[$scope.position-1].tags)+3]);

                }
                else{
                    if($scope.falseTags.indexOf($scope.questions[$scope.position-1].tags)>-1 && $scope.questions.length<20){
                        $scope.generatedTag = $scope.questions[$scope.position-1].tags;
                        console.log("generated"+ $scope.generatedTag);
                        $http.get("http://localhost:3003/api/quiz/tags/"+$scope.generatedTag).then(function(reponse){
                            $scope.generatedQuestions = reponse.data;
                            $scope.questions  =$scope.questions.concat($scope.generatedQuestions);
                            $scope.length=$scope.questions.length;
                            len = $scope.questions.length;
                            $scope.falseTags.splice( $scope.falseTags.indexOf($scope.generatedTag),1);
                        })
                    }
                    else{
                        $scope.falseTags.push($scope.questions[$scope.position-1].tags);
                        console.log("False tags ="+$scope.falseTags);
                    }
                }
            }

            if($scope.tags.indexOf($scope.question.tags)>-1){
                $scope.tags[$scope.tags.indexOf($scope.question.tags)+1]++;
                console.log($scope.tags)
            }else {
                $scope.tags.push($scope.question.tags,1,0);
                console.log($scope.tags)
            }

            $scope.myVar="";
            $scope.position++;
            pos++;

            if(pos==len){
                for(var i=0;i<$scope.tags.length;i+=3){
                    console.log($scope.length-1+"*********"+$scope.position);
                    $scope.result.push({"tag":$scope.tags[i],"size":$scope.tags[i+1],"correct":$scope.tags[i+2]});
                }
            }
        }
        else {
            alert("Vous devez être authentifier");
        }
    }


}

angular
    .module("demo")
    .controller("PlayController", PlayControllerFN)