/*
 *@author: Yogesh Ghimire
 */
(function () {
    angular.module("moduleApp").controller("animalsController", AnimalsController).controller("plantsController", PlantsController).controller("homeController", HomeController);

    function AnimalsController() {
        var animalsCtrl = this;
        animalsCtrl.title = "Welcome to Animals Section...";
        animalsCtrl.imgSrc = "images/tiger.jpg";
    }

    function PlantsController() {
        var plantsCtrl = this;
<<<<<<< HEAD
        plantsCtrl.plantsDetails = [{name: "rose", color: "red", smell : "sweet"}];
        plantsCtrl.title = "Welcome to Plants Section...";
        plantsCtrl.imgSrc = "images/rose.jpg";
        //INSECTS
        plantsCtrl.insects = [{name: "butterfly", color:"yellow", smell: "bad"}]
=======
        plantsCtrl.title = "Welcome to Plants Section...";
        plantsCtrl.imgSrc = "images/rose.jpg";
>>>>>>> f7a60a250ace6e1eafe218a692400e50070ee89b
    }

    function HomeController() {
        var homeCtrl = this;
        homeCtrl.imgSrc = "images/home.jpg";
    }
})();