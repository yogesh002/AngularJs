/*
 *@author: Yogesh Ghimire
 */
(function() {
    angular.module("moduleApp").config(RouterConfiguration);
    RouterConfiguration.$inject = ["$stateProvider", "$urlRouterProvider"]; //step 1: Inject $stateProvider and $urlRouterProvider

    function RouterConfiguration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home"); //If url has "/", it is changed to "/home"
        $stateProvider.state("home", { // "/home" now matches this state
                url: "/home", //keep url as it is. You can modify if you wish.
                templateUrl: "template/home.html", //If user has url with "/home", send them to this html template
                controller: "homeController as homeCtrl" //If "/template/home.html" has any data that depends on controller/service. Define a controller to fetch data.
            }).state("animalSection", {
                url: "/animals",
                templateUrl: "template/animals.html",
                controller: "animalsController as animalsCtrl",
                resolve: { //This is important. This means load data BEFORE you switch the view/state. Here we are defining a simple function. In real life, it can be a promise that returns
                    //some data after database call.
                    //protecting from minification. Can inject services below..
                    imagePath: ["$timeout", "$rootScope", function($timeout, $rootScope) { //It has a key. "imagePath", for example. Now this key has value before you switch the view. Just inject the key in the controller.
                        $rootScope.$broadcast("spinner", {
                            spin: true //until our below function executes, we make sure that spinner spins
                        });
                        return $timeout(function() {
                            return "images/tiger.jpg"; //Image will load before it switch the view.
                        }, 4000);
                        $rootScope.$broadcast("spinner", {
                            spin: false
                        }); //turn off the spinner
                    }]
                }
            }).state("plantSection", {
                url: "/plant/rose",
                templateUrl: "template/plants.html",
                controller: "plantsController as plantsCtrl"
            })

            .state("plants", {
                url: "/allplants/view",
                controller: "displayPlantsController as displayPlantsCtrl",
                templateUrl: "template/showallplants.html",
                resolve: {
                    allPlants: ["plantDetailService", function(plantDetailService) {
                        return plantDetailService.plantDetails;
                    }]
                }
            })
            .state("plantDetails", { //This is how it works: 1) Get user params 2) Use that data to call service/promise that returns some data in our example below it is 'plant' 3) use that data i.e 'plant' to build controller 4) controller will then build the view
                url: "/plants/{plantId}", //pass param here. For example: http://127.0.0.1:50275/#!/plants/1 <== This 1 is param
                templateUrl: "template/plantdetails.html", //The view where you want to display the specific plant
                controller: "plantDetailsController as plantDetailsCtrl", //register a controller
                resolve: {
                    plant: ["$stateParams", "plantDetailService", function($stateParams, plantDetailService, $rootScope) { //inject our service and $stateParams
                        return plantDetailService.plantDetails[$stateParams.plantId]; //get the paramId that user passed above using $stateParams.plantId. That acts as index to our array plantDetailService.plantDetails[index] where index is:$stateParams.plantId
                    }] //'plant' property that we injected above will be injected in our controller :  'plantDetailsController' so that the data inside the 'plant' is used to set our controller and controller in turn sets the data in view.
                }

            });
    }
})();
