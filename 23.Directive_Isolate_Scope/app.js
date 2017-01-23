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
            //scope object has property called controller. It corresponds to "controller.showAllCountries" in countrieslist.html file. Since controller can be asiaController or westController. We want to make it dynamic. So, how we do it? We do it by assigning the value of that scope property 'controller', for instance, with denormalized attribute 'my-controller' in the html file. In that attribute we pass the controller like my-controller = 'asia'. Note: 'asia' represents asiaController as defined in the html using 'as syntax' 
            scope: {
                controller: "=myController"
                , title: "@title" //should be same. Front 'title' represents the current declared directive's scope object's property. To set its value, we have to set it in parent controller. '@title' means title property of parent controller. For example: asia.title = ".....". In countrieslist.html, it represents the directive, so {{title}} means it represents the directive's 'title'. Now, we have to define title attribute in index.html also. 
            }
            , templateUrl: "countrieslist.html" //NOTE: substiture chunk of repeatitive htmls with 'templateUrl' NOT template 
        }
        return ddo;
    }
    //directive
    function errorMessageFunction() {
        var ddo = {
            //define scope so as to make the controller dynamic here also.
            scope: {
                controller: "=myController" //"=myController" makes the property "controller" dynamic. So we retrieve error message from corresponding controller
            }
            , template: "{{controller.error}}" //since we already defined 'controller' in the scope property, it becomes dynamic
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
        var asia = this;
        var service = addCountriesFactory(2);
        asia.addCountry = function (country, price) {
            try {
                service.addCountry(country, price);
                asia.title = "Add Asian Countries" + " ( " + asia.showAllCountries.length + " ) "; //define a property called 'title' in parent so it can set directive's 'title' attribute.
            }
            catch (Error) {
                asia.error = Error.message;
            }
        }
        asia.showAllCountries = service.allCountries;
    }
    westControllerFunction.$inject = ["addCountriesFactory"];
    //controller
    function westControllerFunction(addCountriesFactory) {
        var service = addCountriesFactory(5);
        var west = this;
        west.addCountry = function (country, price) {
            try {
                service.addCountry(country, price);
                west.title = "Adding western country"+ "( "+west.showAllCountries.length+" )"; //same as above
            }
            catch (Error) {
                west.error = Error.message;
            }
        }
        west.showAllCountries = service.allCountries;
    }
    })();