/*
 *@author -  Yogesh Ghimire
 */
(function () {
    'use strict';
    angular.module("countriesApp", [])
        .component("addCountriesComponent", { //declare a component
            templateUrl: "addcountries.html"
            , bindings: { 
                title : "@titleAttribute"
                ,countryObj : "<"  //Denormalization in HTML as country-obj where we pass controller.allCountries. Note: 
                //'controller.allCountries' is parent data. To pass it to the template html, we do : '$ctrl.countryObj'. 
                //Since we do not have a controller separately defined for our component, it uses the default controllerAs: '$ctrl'
                //provided by AngularJs
                ,removeCountry : "&removeCountryAttribute"
                //Denormalized in HTML as remove-country-attribute = "controller.removeCountryFromList(index)"
                                                                    //'controller' is parent controller
                                                                    //index is something that component tells what it is.
                //Then parent controller simply gets the index value from controller and execute a function as 
                //controller.removeCountryFromList = function(index){......}
                //Mapping the component to parent controller as : $ctrl.removeCountry({$index : index}) 
            }
        , controller : componentControllerToAddCountry 
        //Declaring this controller just for second button defined in template html functionality.
        })
        .controller("addCountriesController", addCountriesControllerFunction)
        .service("addCountriesService", addCountriesServiceFunction);
    
    
//******************************************************************************************************************
//**************************CONTROLLERS******************************************************************************
//****************************************************************************************************************//
    //component controller
    componentControllerToAddCountry.$inject = ["$element"]
    function componentControllerToAddCountry($element){
        var $ctrl = this;
        $ctrl.removeCountryFunction = function(index){
            $ctrl.removeCountry({$index : index});
        }
            
        $ctrl.$postLink = function(){    //This is one of the life cycle method of component controller. It has $onInit, $OnChanges(obj),etc
               $element.find("h1").css("color", "red");
            }
    }
    
    //parent controller
    addCountriesControllerFunction.$inject = ["addCountriesService"]
    function addCountriesControllerFunction(addCountriesService){
        var controller = this;
        var service = addCountriesService;
        controller.addCountry = function(country){
            return service.addCountries(country);
        }
        controller.removeCountryFromList = function(index){
            service.removeCountryFromList(index);
        }
        controller.allCountries = service.allCountries;
    } 
  
//******************************************************************************************************************
//**************************SERVICE*********************************************************************************
//****************************************************************************************************************//    
    
    function addCountriesServiceFunction(){
        var service = this;
        var countries = [];
        service.addCountries = function(country){
            var country = {
                name: country
            }
            countries.push(country);
        }
        service.allCountries = countries;
        service.removeCountryFromList = function(index){
            countries.splice(index,1);
        }        
    }
  
    
})();