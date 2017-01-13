/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    angular.module("countriesAndTravelApp", []).controller("travelController", travelControllerFunction);

    function travelControllerFunction() {
        var travelDiaries = this;
        travelDiaries.totalView = 100;
        travelDiaries.option = travelPackage;
        travelDiaries.visitedCountryList = [];
        //get name and price from user input box
        travelDiaries.addPackage = function (name, price) {
            name = travelDiaries.countryName;
            price = travelDiaries.price;
            //create an object
            var addedPackage = {
                name: name
                , price: price
            }
            travelDiaries.option.push(addedPackage); //push that object to the list
            travelDiaries.countryName = ""; //Clear input box
            travelDiaries.price = "";
        }
        travelDiaries.addToAlreadyVisited = function (currentIndex) {
            var removedCountry = travelDiaries.option.splice(currentIndex, 1)[0]; //Remove the particular country from the list and return it
            var visitedCountry = { //create an object
                name: removedCountry.name
                , price: removedCountry.price
            }
            travelDiaries.visitedCountryList.push(visitedCountry); //push to the new list
        }
    }
    
})();