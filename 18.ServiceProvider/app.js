/**
 * @author Yogesh Ghimire 
 */
(function () {
    angular.module("serviceProviderApp", [])
        .controller("asianCountriesController", asianCountriesControllerFunction)
        .provider("countriesService", serviceProviderFunction)  //"countriesService" is the name of custom service defined below
        .config(configuration); //define config 
    
    configuration.$inject = ["countriesServiceProvider"] //inject your service name + keyword provider so, it becomes countriesServiceProvider
    function configuration(countriesServiceProvider) {
        countriesServiceProvider.configuration.total = 2; //property from configuration property defined in provider function below. Here we are overriding default value defined below
    }    
    
    //provider function
    function serviceProviderFunction() {
        var provider = this;
        provider.configuration = { //define an object with property that corresponds to default configuration. Note: this default can be overridden by config function defined as above. In our example, default value is 10. We overrode with 2 above.
            total: 10
        }
        provider.$get = function () {
            var service = new countriesService(provider.configuration.total); //pass total as argument
            return service;
        }
    } 
    
    //Custom service 
    function countriesService(total) { //NOTE: this total argument comes from provider function
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
    
    asianCountriesControllerFunction.$inject = ["countriesService"];//inject the service in the controller
    function asianCountriesControllerFunction(countriesService) {
        var asiaTravel = this;
        asiaTravel.addCountry = function () {
            try {
                countriesService.addCountries(asiaTravel.countryName, asiaTravel.countryPrice);
            }
            catch (error) {
                asiaTravel.errorMessage = error.message;
            }
            asiaTravel.displayCountries = countriesService.allTravelCountries();
        }
    }
})();