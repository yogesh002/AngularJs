/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    angular.module("angularBindingTypesApp", []).controller("angularBindingTypesController", angularBindingTypesCtrlFunction);
    angularBindingTypesCtrlFunction.$inject = ["$scope", "$filter"];

    function angularBindingTypesCtrlFunction($scope, $filter) {
        $scope.getPhoneNumber = function () {
            $scope.clientPhoneNumber = getPhone();
        }

        function getPhone() {
            return $scope.phoneNumber;
        }
        $scope.numberOfWatchers = 0;
        $scope.getNumberOfWatchers = function () {
            console.log($scope)
            $scope.numberOfWatchers = $scope.$$watchersCount; //This is in-built angular property
        }
    }
})();