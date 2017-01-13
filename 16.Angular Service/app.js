/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    //define controllers and service in the angular module
    angular.module("countriesAndTravelApp", []).controller("displayCountriesController", displayCountriesControllerFunction).controller("travelController", travelControllerFunction).service("travelService", travelServiceFunction);

    //inject service in controller
    travelControllerFunction.$inject = ["travelService"];
   
    //1 . Controller to add package
    function travelControllerFunction(travelService) {
        var travelDiaries = this;
        travelDiaries.totalView = 100;
        travelDiaries.travelPackage = travelPackage;
        travelDiaries.option = travelService.option;
        travelDiaries.addPackage = function () {
            travelService.addPackage(travelDiaries.countryName, travelDiaries.price);
            travelDiaries.countryName = ""; //Clear input box
            travelDiaries.price = "";
        }
        travelDiaries.removeCountry = function (currentIndex) {
            travelService.alreadyVisitedCountries(currentIndex);
        }
    }

    //Service
    function travelServiceFunction() {
        var travelService = this;
        travelService.visitedCountryList = [];
        travelService.option = travelPackage;
        travelService.addPackage = function (name, price) {
            var addedPackage = {
                name: name
                , price: price
            }
            travelService.option.push(addedPackage); //push that object to the list
        };
        travelService.allCountriesList = function () {
            return travelService.option;
        }
        travelService.alreadyVisitedCountries = function (index) {
            travelService.removedCountry = travelService.option.splice(index, 1)[0];
            travelService.visitedCountryList.push(travelService.removedCountry);
        }
    }
    displayCountriesControllerFunction.$inject = ["travelService"];

    // 2. Controller to display package
    function displayCountriesControllerFunction(travelService) {
        var travelled = this;
        travelled.visitedCountries = travelService.visitedCountryList;
    }
})();