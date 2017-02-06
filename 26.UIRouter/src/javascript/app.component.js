/*
 *@author-Yogesh Ghimire
 */
(function() {
    //1. Component to define Rose
    angular.module("moduleApp").component("plantDetails", {
        templateUrl: "template/rose.html",
        bindings: { //note: you can have access to the binding properties inside the component controller also
            details: "<plantDetails",
            path: "@"
        },
        controller: roseController
    });
    //2. Component to define Insect
    angular.module("moduleApp").component("insectDetails", {
        templateUrl: "template/insect.html",
        bindings: {
            insects: "<"
        },
        controller: insectDetails
    });

    //3. spinner
    angular.module("moduleApp").component("spinner", {
        templateUrl: "template/spinner.html",
        bindings: {
            status: "<"
        },
        controller: SpinnerController

    });


    SpinnerController.$inject = ["$rootScope"]

    function SpinnerController($rootScope) {
        var $ctrl = this;
        var spin = $rootScope.$on("spinner", function(event, data) {
            $ctrl.status = data.spin;
        });
        $ctrl.$onDestroy = function() {
            return spin();
        }
    }

    function roseController() {
        var roseCtrl = this;
        roseCtrl.title = "ROSE DETAILS...";
    }

    function insectDetails() {
        var insectCtrl = this;
        insectCtrl.insectTitle = "Insect Details...";
        insectCtrl.img_insect = "images/insect.jpg";
    }
})();
