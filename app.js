angular.module("demo", ["ngRoute", "ngResource"]);

function configFN($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: "CarController",
            templateUrl: "views/car.view.html"
        })
        .when('/shop', {
            controller: "ShopController",
            templateUrl: "views/shop.view.html"
        })
        .when('/play', {
            controller: "PlayController",
            templateUrl: "views/quiz.view.html"
        })
        .when('/addreview', {
            controller: "TemoignageController",
            templateUrl: "views/addTemoignages.view.html"
        })
        .when('/review', {
            controller: "TemoignageController",
            templateUrl: "views/review.view.html"
        })
        .otherwise({redirectTo:'/home'});
}
configFN.$inject = ['$routeProvider'];

angular.module("demo").config(configFN);