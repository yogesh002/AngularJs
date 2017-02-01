/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    angular.module("eventsApp", []).controller("countryCtrller", countryCtrllerFunction).service("addCountriesService", addCountriesServiceFunction).component("displayImage", {
        templateUrl: "template.html"
        , controller: imageHandlerController
    });
    imageHandlerController.$inject = ["$rootScope"]

    function imageHandlerController($rootScope) {
        var $ctrl = this;
        $rootScope.$on("addCountriesService:checking", function (event, data) {
            return (data.on) ? ($ctrl.on = true) : ($ctrl.on = false);
        });
    }
    countryCtrllerFunction.$inject = ["addCountriesService"]

    function countryCtrllerFunction(addCountriesService) {
        var controller = this;
        var service = addCountriesService;
        controller.addCountry = function (countryName) {
            service.addCountry(countryName);
        }
    }
    addCountriesServiceFunction.$inject = ["$rootScope"]

    function addCountriesServiceFunction($rootScope) {
        var countries = [];
        var service = this;
        service.addCountry = function (country) {
            $rootScope.$broadcast("addCountriesService:checking", {
                on: false
            });
            var isPresent = service.checkIfNepalIsPresent(country);
            if (isPresent) {
                var country = {
                    name: country
                }
                countries.push(country);
                $rootScope.$broadcast("addCountriesService:checking", {
                    on: true
                });
            }
        }
        service.getAllCountries = function () {
            return countries;
        }
        service.checkIfNepalIsPresent = function (countryName) {
            if (countryName.toLowerCase() === "nepal") {
                return true;
            }
            return false;
        }
    }
})();