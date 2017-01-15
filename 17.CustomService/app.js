/**
 * @author Yogesh Ghimire 
 */
(function () {
    angular.module("customServiceApp", [])
        .controller("westernCountriesController", westernCountriesControllerFunction)
        .controller("asianCountriesController", asianCountriesControllerFunction)
        .factory("serviceFactory", serviceFactoryController); //register a factory
    //Note: I am not registering a service function provided by angularJs as .service(.....)

    //Factory
    function serviceFactoryController() {
        var serviceFactory = function (total) {
            return new countriesService(total);
        };
        return serviceFactory;
    }

    //Custom service
    function countriesService(total) {
        var service = this; //this should not be global.
        service.travelPackage = [];
        service.addCountries = function (name, price) {
            var countryTravelDetail = {
                name: name
                , price: price
            }
            if (service.travelPackage.length < total) {
                service.travelPackage.push(countryTravelDetail);
            }
            else {
                throw Error("You cannot select more than " + total + " countries");
            }
        }
        service.allTravelCountries = function () {
            return service.travelPackage;
        }
    }
    
    westernCountriesControllerFunction.$inject = ["serviceFactory"] //inject factory in controller 1
    function westernCountriesControllerFunction(serviceFactory) {
        var westTravel = this;
        var service = serviceFactory(2); //
        westTravel.addCountry = function () {
            try {
                service.addCountries(westTravel.countryName, westTravel.countryPrice);
            }
            catch (error) {
                westTravel.errorMessage = error.message;
            }
            westTravel.showAllCountries = service.allTravelCountries();
        }
    }
    
    asianCountriesControllerFunction.$inject = ["serviceFactory"];//inject factory in controller 2
    function asianCountriesControllerFunction(serviceFactory) {
        var asiaTravel = this;
        var service = serviceFactory(3); //
        asiaTravel.addCountry = function () {
            try {
                service.addCountries(asiaTravel.countryName, asiaTravel.countryPrice);
            }
            catch (error) {
                asiaTravel.errorMessage = error.message;
            }
            asiaTravel.displayCountries = service.allTravelCountries();
        }
    }
})();