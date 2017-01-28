/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    angular.module("countriesApp", [])
        .component("addCountriesComponent", { //define a component
            templateUrl: "addcountries.html"
            , bindings: { //components have bindings similar to what directives have scope
                title: "@titleAttribute"
            }
        });
})();