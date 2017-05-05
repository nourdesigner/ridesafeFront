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
    $scope.report=[];
    $scope.length=0;
    $scope.reporting=[];
    $scope.added=false;
    $scope.addReviewAction=false;

    $scope.addrev=function () {
        if(localStorage.getItem("currentUser")!=='0'){
            $scope.addReviewAction=true;
        }else
        {
            alert("you need to be logged");
            console.log("you need to be logged");

        }
    }
    $http.get("http://localhost:3003/api/reporting").then(function(reponse){
        $scope.reporting=reponse.data;
    })
    $scope.updateReport=function (id) {
        $scope.RepAction=true;
        console.log($scope.RepAction);
        $http.get("http://localhost:3003/api/reporting/"+id).then(function (reponse) {
            $scope.reporting = reponse.data[0];
            $scope.isBack=true;
            console.log($scope.reporting);
        })
    }

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
    
 /* $scope.likereport=function (id) {
        $http.get("http://localhost:3003/api/reporting/"+id).then(function (reponse) {
            
        })
        $http.get("http://localhost:3003/api/reporting/"+id).then(function (reponse) {
            $scope.report = reponse.data;
            console.log($scope.report);
            console.log($scope.currentUser);

                console.log($scope.report.like);
                var liked = "0";
                for (var i=0;i<$scope.report.like.length;i++){
                    if($scope.currentUser==$scope.report.like[i]){
                        var liked="1";
                    }
                };
                if(liked=="0"){
                    kk= $scope.report.like.push($scope.currentUser);
                    console.log($scope.report.like.push($scope.currentUser));
                    var data = {
                        like:kk
                    };
                    console.log(kk);
                    $http.put("http://localhost:3003/api/reporting/"+id,data).success(function (reponse,status){
                        if(status==200){
                            console.log("200");


                        }
                    });
                }


        });
        console.log($scope.report);
        console.log($scope.currentUser.indexOf(report.like));
        if($scope.currentUser.indexOf(report.like)>-1){
            console.log("-");
        }
        else{
            console.log("++");
        }

    } */
 $scope.likereport=function (id,type) {
     if(currentUser=='0'){
         alert("You can't like or dislike a review without login,please login first to continue");
     }else{


     $http.get("http://localhost:3003/api/likereporting/"+id+"/"+$scope.currentUser).then(function (reponse) {

            if(reponse.data==null){
                console.log(reponse.data);
                var data={
                    idReporting : id,
                    idUser:$scope.currentUser,
                    type:type
                };
                $http.post("http://localhost:3003/api/likereporting",data).success(function (reponse,status) {
                    if(status==200){
                        console.log("200");
                    }
                })
            }else{
                console.log(reponse.data.type==type);
                if (reponse.data.type==type) {
                    alert("already "+type+"ed")
                }
                else
                {

                var data={
                    idReporting : id,
                    idUser:$scope.currentUser,
                    type:type
                };
                $http.put("http://localhost:3003/api/likereporting/"+reponse.data._id,data).success(function (reponse,status) {
                    if(status==200){
                        console.log("put");
                        console.log(data);
                    }
                })
                $http.get("http://localhost:3003/api/reporting/"+id).then(function (rep) {
                    console.log(rep.data);
                    if(type=='like'){
                        var data2={
                            like:parseInt(rep.data.like)+1,
                            dislike:parseInt(rep.data.dislike)-1
                        }
                    }else{
                        var data2={
                            dislike:parseInt(rep.data.dislike)+1,
                            like:parseInt(rep.data.like)-1,
                        }
                    }

                    console.log(rep.data);

                    $http.put("http://localhost:3003/api/reporting/"+id,data2).success(function (reponse,status) {
                        if(status==200){
                            $http.get("http://localhost:3003/api/reporting").then(function (r) {
                                $scope.reporting=r.data;
                                console.log(r.data);
                            })
                        }
                    })
                })

            }

     }});
 }
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