/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    angular.module("nestedControllerApp", []).controller("parentController", parentControllerFunction).controller("childController", childControllerFunction);
    //NOTE: $scope is not injected as not necessary
    function parentControllerFunction() {
        var parentCtrller = this; //the keyword from html alias for controller refer to the instance of this controller function
        parentCtrller.name = "parent"; //create a property called 'name' and assign to the INSTANCE of the controller
    }
    //NOTE: injecting $scope because we are logging scope. Otherwise not required
    childControllerFunction.$inject = ["$scope"];

    function childControllerFunction($scope) {
        var childCtrller = this;
        childCtrller.name = "child"; //the child 'name' property CANNOT mask parent's property beacuase both belong to different instance of controller. Javascript engine appends the alias as: $scope.(alias_name).(property_name). Example: At first it does: 
        //$scope.parent = new parentControllerFunction(); //instantiating a function constructor and assigning value to the $scope.alias
        //$scope.child = new childControllerFunction(); //instantiating a function constructor and assigning value to the $scope.alias
        //Then it does: $scope.parent.name to acccess parent's name property and $scope.child.name to access child's name proprety
        console.log("before : ", $scope.parent.name); //To access parent name, we need to call $scope.(controller_alias_from_html).(property_name);
        $scope.parent.name = "parent_Changed_by_child";
        console.log("after: ", $scope.parent.name);
        console.log($scope)
    }
})();