/*
 *@author: Yogesh Ghimire
 */
(function () {
    angular.module("moduleApp").config(RouterConfiguration);
    RouterConfiguration.$inject = ["$stateProvider", "$urlRouterProvider"];

    function RouterConfiguration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider.state("home", {
            url: "/home"
            , templateUrl: "template/home.html"
            , controller: "homeController as homeCtrl"
        }).state("animalSection", {
            url: "/animals"
            , templateUrl: "template/animals.html"
            , controller: "animalsController as animalsCtrl"
        }).state("plantSection", {
            url: "/plant/rose"
            , templateUrl: "template/plants.html"
            , controller: "plantsController as plantsCtrl"
        });
    }
})();