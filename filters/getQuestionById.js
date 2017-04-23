angular.module('demo').filter('quesByID',['$http', function($http) {
    return function(input) {
        var output="";

        $http.get("http://localhost:3003/api/quiz/"+input).then(function(reponse){
            console.log(reponse.data[0].Question);
             output = "done";
        });
        console.log(output);
        return output;

    }
}]);