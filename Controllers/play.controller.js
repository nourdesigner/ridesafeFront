function PlayControllerFN($scope,$http,CartService,$timeout) {
    $scope.$watch('viewContentLoaded',function(){
        $timeout(function() {
            CartService.updateNumItems();
        },0);
    });
    $scope.questions=[];
    $scope.position=0;
    $scope.myVar="";
    $scope.score=0;
    $scope.length=0;
    $scope.type="";
    $scope.loadNiveau="";
    $scope.tags=[];
    $scope.falseTags=[];
    $scope.generatedTag="";
    $scope.generatedQuestions=[];
    $scope.result=[];
    $scope.user=[];
    $scope.kid="";
    $scope.newhighscore=false;
    $scope.connected=false;
    var pos=0;
    var len=0;
    var kidPosition=0;
    $scope.currentUser="0";
    $scope.pseudo="";
    $scope.password="";
    var parentId="";
    var i=0;
    var kids="";
    $scope.newhighscore=false;
    //localStorage.setItem("currentUser", "Wemtek");
    $scope.kid=localStorage.getItem("kid");
    $scope.niveau=localStorage.getItem("niveau");
     var currentUser = localStorage.getItem("currentUser");
     if(currentUser!=undefined){
        $scope.currentUser=currentUser;
     }
    $scope.connectPlease=function () {
        $scope.connected=true;

    }
    $scope.random = function() {
        return 0.5 - Math.random();
    }
    $scope.doLogin=function (login,password) {
        $http.get("http://localhost:3003/user/"+login+"/"+password).then(function(reponse){
            if (reponse.data.length!=0){
                localStorage.setItem("currentUser", login);
                $scope.currentUser=localStorage.getItem("currentUser");
                localStorage.setItem("role", reponse.data.role);
                $scope.role=localStorage.getItem("role");
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
    $scope.start3d=function (level) {
         if (level=='1'){
             $location.path('/play3d');

         }else
         {
             $location.path('/play3d2');
         }
    }
    $http.get("http://localhost:3003/api/quiz/niveau/"+$scope.niveau).then(function(reponse){
        $scope.questions=reponse.data;
        $scope.length=$scope.questions.length;
        len = $scope.questions.length;
        console.log($scope.position);
    })

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

    $scope.startQuiz=function (blind,niv) {
        $scope.type=blind;
        $scope.loadNiveau=niv;
        $scope.getQuestion();
    }
    $http.get("http://localhost:3003/user/name/"+currentUser).success(function(reponse){
        var parents=reponse;
        localStorage.setItem("parentId",parents._id);
        kids=parents.kids;
        console.log(kids.length);
        for(i=0;i<kids.length;i++){
            if(kids[i].username==$scope.kid){
                console.log(kids[i].username);
                kidPosition=i;
                localStorage.setItem("kids",JSON.stringify(kids));
                localStorage.setItem("kidPosition",kidPosition);

            }
        }
    })
    $scope.getQuestion = function  () {
        if($scope.currentUser!=0){


            $scope.question=$scope.questions[$scope.position];
            /* new highscore */

            var newKids=JSON.parse(localStorage.getItem("kids"));
            var newScore= newKids[localStorage.getItem("kidPosition")];
            console.log(newKids);
            console.log(newScore);
            if(newScore.highscore<$scope.score && !$scope.newhighscore){
                $scope.newhighscore=true;
                newScore.highscore=$scope.score;
                console.log(newKids[localStorage.getItem("kidPosition")]);
                newKids[localStorage.getItem("kidPosition")]=newScore;
                console.log("newkidsss");
                console.log(JSON.stringify(newKids));
                var data = {
                    kids:newKids
                };
                parentId = localStorage.getItem("parentId");
               $http.put('http://localhost:3003/user/'+parentId, data).success(function (data, status) {
                    console.log("done");
                });
            }

            /* end new highscore */
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
               // console.log($scope.tags)
            }

            $scope.myVar="";
            $scope.position++;
            pos++;

            if(pos==len){

                for(var i=0;i<$scope.tags.length;i+=3){
                    $scope.result.push({"tag":$scope.tags[i],"size":$scope.tags[i+1],"correct":$scope.tags[i+2]});
                }
            }

        }
        else {
            alert("Vous devez être authentifier");
            //lezem taamel compte ya msatek
        }
    }


}

angular
    .module("demo")
    .controller("PlayController", PlayControllerFN)