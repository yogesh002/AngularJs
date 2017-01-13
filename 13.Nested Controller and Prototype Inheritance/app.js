/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    angular.module("nestedControllerApp", []).controller("parentController", parentControllerFunction).controller("childController", childControllerFunction);
    parentControllerFunction.$inject = ['$scope'];
    childControllerFunction.$inject = ['$scope'];

    function parentControllerFunction($scope) {
        $scope.parentName = "Parent Name";
        $scope.parentObj = this;
        $scope.parentObj.name = "Parent Object Name";
    }

    function childControllerFunction($scope) {
        $scope.parentName = "Child's Parent Name";
        $scope.parentObj.name = "Child changing Parent's name here";
        console.log($scope.parentName); //masks the value "Parent Name" from parentControllerFunction object
        console.log($scope.parentObj.name); //walks up the prototype chain to modify value, so parent's property gets changed too
        console.log($scope); //logging scope to see child as well as parent's properties
    }
})();