(function(){
    'use strict';
angular.module("myFirstAngularApp", [])

.controller("myFirstAngularController", function($scope){
    $scope.name = "Yogesh";    
    $scope.askName = function(){
        return "What is your name?"
        }    
    });
})();

