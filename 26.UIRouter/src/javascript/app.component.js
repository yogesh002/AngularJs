/*
 *@author-Yogesh Ghimire
 */
(function () {
    //1. Component to define Rose
    angular.module("moduleApp").component("plantDetails", {
        templateUrl: "template/rose.html"
        , bindings: {
            details: "<plantDetails"
            , path: "@"
        }
        , controller: roseController
    });
    //2. Component to define Insect
    angular.module("moduleApp").component("insectDetails", {
        templateUrl: "template/insect.html"
        , bindings: {
            insects: "<"
        }
        , controller: insectDetails
    });

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