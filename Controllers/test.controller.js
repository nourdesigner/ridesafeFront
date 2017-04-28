function testControllerFN($scope) {
    $scope.test="testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed";
    $scope.doLoginPlease=function () {
        alert("donedonedone");
    }
}
angular.module("demo").controller("testController",testControllerFN);