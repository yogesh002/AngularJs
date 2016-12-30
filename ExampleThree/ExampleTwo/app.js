/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    angular.module('additionApp', []).controller('additionController', function ($scope) {
        $scope.firstInput;
        $scope.secondInput;
        $scope.result = 0;
        $scope.getResult = function () {
            var calculatedResult = getAddition($scope.firstInput, $scope.secondInput);
            $scope.result = calculatedResult;
            return $scope.result;
        }
    })

    function getAddition(firstInputFromUser, secondInputFromUser) {
        return parseInt(firstInputFromUser) + parseInt(secondInputFromUser);
    }
})();