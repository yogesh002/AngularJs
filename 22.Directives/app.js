/**
 * @author Yogesh Ghimire 
 */

(function(){
    angular.module("directiveApp", [])
    .controller("asiaController", asiaControllerFunction)
    .controller("westController", westControllerFunction)
    .factory("addCountriesFactory", addCountriesFactoryFunction)
    .directive("listCountriesByNameAndPrice", listCountriesByNameAndPriceFunction) //Define a directive. 'listCountriesByNameAndPrice' is normalized. It will be non-normalized in the HTML like list-countries-by-name-and-price
    .directive("errorMessage", errorMessageFunction)
    .directive("countriesList", countriesListFunction);
    
    //directive
    function countriesListFunction() {
        //directive definition object
      var ddo = {
          restrict : 'E', //restricting our ddo to be only Elements. We can restrict to 'A' for Attribute only or 'AE' for Attribute or Element. This is optional and default is "AE"
          templateUrl: "countrieslist.html" //NOTE: substiture chunk of repeatitive htmls with 'templateUrl' NOT template 
      }
      return ddo;
  }
      //directive
    function errorMessageFunction() {
        var ddo = {
            template: "{{controller.error}}"
        }
        return ddo;
    }

      //directive
    function listCountriesByNameAndPriceFunction() {
        var ddo = {
            template: '{{country.name}} for {{country.price}}'
        }
        return ddo;
    }

    //factory
    function addCountriesFactoryFunction() {
        var service = function (total) {
            return new countriesService(total);
        }
        return service;
    }

    //service
    function countriesService(total) {
        var service = this;
        var countries = [];
        service.addCountry = function (name, price) {
            var countryTravelDetail = {
                name: name
                , price: price
            }
            if (countries.length < total) {
                countries.push(countryTravelDetail);
            }
            else {
                throw Error("You cannot select more than " + total + " countries");
            }
        }
        service.allCountries = countries;
    }

    asiaControllerFunction.$inject = ["addCountriesFactory"];
    //controller
    function asiaControllerFunction(addCountriesFactory) {
        var controller = this;
        var service = addCountriesFactory(2);
        controller.addCountry = function (country, price) {
            try {
                return service.addCountry(country, price);
            }
            catch (Error) {
                controller.error = Error.message;
            }
        }
        controller.showAllCountries = service.allCountries;
    }
    
    westControllerFunction.$inject = ["addCountriesFactory"];
    //controller
    function westControllerFunction(addCountriesFactory) {
        var service = addCountriesFactory(5);
        var controller = this;
        controller.addCountry = function (country, price) {
            try {
                return service.addCountry(country, price);
            }
            catch (Error) {
                controller.error = Error.message;
            }
        }
        controller.showAllCountries = service.allCountries;
    }
    })();