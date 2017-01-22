/*
 *@author - Yogesh Ghimire
 */
(function () {
    'use strict';
    angular.module("promisesApp", []).controller("promisesController", promisesControllerFunction).service("selectCountryService", selectCountryServiceFunction).service("countryFilterService", countryFilterServiceFunction);
    countryFilterServiceFunction.$inject = ["$q", "$timeout"]

    function countryFilterServiceFunction($q, $timeout) {
        var logMessage = {
            message: ""
        };
        var filterService = this;
        filterService.filterCountryName = function (allCountries, countryName) {
            var deferred = $q.defer();
            $timeout(function () { //timeout to simulate asynchronous behavior
                for (var i = 0; i < allCountries.length; i++) {
                    if (allCountries[i].name.toLowerCase() === countryName.toLowerCase()) {
                        logMessage.message = " Country name filter failed - The selected country already exists. ";
                        return deferred.reject(logMessage);
                    }
                }
                logMessage.message = " Country name filter is success - Country Name is unique, adding : " + countryName;
                deferred.resolve(logMessage);
            }, 3000);
            return deferred.promise; //You must return deferred.promise in the end
        }
        filterService.filterPrice = function (price) {
            var deferred = $q.defer();
            $timeout(function () { //timeout to simulate asynchronous behavior
                if (price < 5000) {
                    logMessage.message = " Country price filter is success - Price is within the budget. Enjoy the trip. "
                    deferred.resolve(logMessage);
                }
                else {
                    logMessage.message = " Country name filter Failed -Price is too expensive. "
                    deferred.reject(logMessage);
                }
            }, 1000);
            return deferred.promise;
        }
    }
    selectCountryServiceFunction.$inject = ["countryFilterService", "$q"] //inject the helper service to the service
    function selectCountryServiceFunction(countryFilterService, $q) {
        var service = this;
        var countries = [{
            name: "Nepal"
            , price: 3000
        }, {
            name: "China"
            , price: 2000
        }, {
            name: "India"
            , price: 1000
        }];
        //These are the changes from previous example
        service.addCountry = function (country, price) {
            var promise = countryFilterService.filterCountryName(countries, country); //promise 1
            var anotherPromise = countryFilterService.filterPrice(price); //promise 2
            var addCountry = function (country, price) {
                    var newCountry = {
                        name: country
                        , price: price
                    }
                    countries.push(newCountry);
                }
                //pass array of promises
            $q.all([promise, anotherPromise]).then(function (result) { //This is for parallel execution. One promise cancels another promise if it fails. 
                addCountry(country, price);
                console.log(result);
            }).catch(function (errorMessage) {
                console.log(errorMessage.message);
            });
        }
        service.displayAllCountries = function () {
            return countries;
        }
    }
    promisesControllerFunction.$inject = ["selectCountryService"];

    function promisesControllerFunction(selectCountryService) {
        var service = selectCountryService;
        var promisesCtrller = this;
        promisesCtrller.addCountry = function () {
            service.addCountry(promisesCtrller.countryName, promisesCtrller.price);
        }
        promisesCtrller.removeCountry = function (index) {
            var countries = service.displayAllCountries();
            countries.splice(index, 1);
        }
        promisesCtrller.showCountries = service.displayAllCountries();
    }
})();