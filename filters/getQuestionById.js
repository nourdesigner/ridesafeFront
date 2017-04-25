angular.module('demo').filter('quesByID',['$http', function($http) {
var x = "";
    return function(input) {

    return  $http.get("http://localhost:3003/api/quiz/"+input).then(function(reponse){
            console.log(reponse.data[0]);
            x=reponse.data[0].Question;
        });
        console.log(x);

       // return output;

    }
}]);

/*
 ,

 */