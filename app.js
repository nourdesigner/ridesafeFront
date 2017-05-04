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
        .when('/play3d', {
            templateUrl: "views/playunity.view.html"
        })
        .when('/play3d2', {
            templateUrl: "views/playunity2.view.html"
        })
        .when('/addreview', {
            controller: "TemoignageController",
            templateUrl: "views/addTemoignages.view.html"
        })
        .when('/review', {
            controller: "TemoignageController",
            templateUrl: "views/review.view.html"
        })
        .when('/cart', {
            controller: "CartController",
            templateUrl: "views/cart.view.html"
        })
        .when('/addQuiz', {
            controller: "PlayController",
            templateUrl: "views/addQuiz.view.html"
        })
        .when('/historique', {
            controller: "HistoriqueController",
            templateUrl: "views/historique.view.html"
        })
        .when('/login',{
            controller:"LoginController",
            templateUrl:"views/loginpage.view.html"
        })
        .when('/logincart',{
            controller:"LoginController",
            templateUrl:"views/logincart.view.html"
        })
        .when('/dashboard', {
            controller: "DashboardController",
            templateUrl: "views/dashboard/dashboard.view.html"
        })


        .otherwise({redirectTo:'/home'});
}
configFN.$inject = ['$routeProvider'];
function runFN($rootScope){
    localStorage.users=([
        {pseudo:"wemtek",password:"wemtek"}]);
}
angular.module("demo").config(configFN).run(runFN);