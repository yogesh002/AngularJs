/*
 *@author: Yogesh Ghimire
 */
(function() {
    angular.module("moduleApp").controller("animalsController", AnimalsController).controller("plantsController", PlantsController)
        .controller("homeController", HomeController)
        .controller("plantDetailsController", PlantDetailsController)
        .controller("displayPlantsController", DisplayPlantsController);

    DisplayPlantsController.$inject = ["allPlants"]

    function DisplayPlantsController(allPlants) {
        var displayPlantsCtrl = this;
        displayPlantsCtrl.title = "View Plants Details by clicking the name below: "
        displayPlantsCtrl.allPlants = allPlants;

    }

    AnimalsController.$inject = ["$timeout", "imagePath"]

    function AnimalsController($timeout, imagePath) {
        var animalsCtrl = this;
        animalsCtrl.title = "Welcome to Animals Section...";
        animalsCtrl.imgSrc = imagePath;
    }

    PlantsController.$inject = ["plantDetailService"]

    function PlantsController(plantDetailService) {
        var plantsCtrl = this;
        plantsCtrl.plantsDetails = plantDetailService.plantDetails;
        plantsCtrl.title = "Welcome to Plants Section...";
        plantsCtrl.imgSrc = "images/rose.jpg";
        //INSECTS
        plantsCtrl.insects = [{
            name: "butterfly",
            color: "yellow",
            smell: "bad"
        }]

    }

    function HomeController() {
        var homeCtrl = this;
        homeCtrl.imgSrc = "images/home.jpg";
        homeCtrl.spinStatus = false;
    }
    PlantDetailsController.$inject = ["plant"]

    function PlantDetailsController(plant) {
        var plantDetailsCtrl = this;
        plantDetailsCtrl.color = plant.color;
        plantDetailsCtrl.smell = plant.smell;
        plantDetailsCtrl.name = plant.name;
    }
})();
