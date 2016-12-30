/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    angular.module("filterApp", []).controller("useFilterService", useFilterServiceController);
    useFilterServiceController.$inject = ['$scope', '$filter'];

    function useFilterServiceController($scope, $filter) {
        var content = getContent();
        var title = getTitle();
        $scope.content = callingFilterServiceMethodOne(content);
        $scope.title = callingFilterFunctionMethodTwo(title);
        $scope.date = getDate();
        $scope.additionalInfo = getAdditionalInfo();
        $scope.gasAmount = getGasPrice();
        $scope.gasAmountInNepaliRupee = getGasAmountInNepaliRupee($scope.gasAmount);

        function getContent() {
            return "This is an example of filter service in AngularJs. Filter service creates filter function that accpts the input to perform certain modification e.g- uppercase to lowercase, handling currency etc. This text is converted to uppercase from javascript file.";
        }

        function getTitle() {
            return "Filter in AngularJs";
        }

        function callingFilterServiceMethodOne(inputText) {
            var result = $filter("uppercase")(inputText);
            return result;
        }

        function callingFilterFunctionMethodTwo(inputText) {
            var filterService = $filter("uppercase");
            return filterService(inputText);
        }

        function getDate() {
            return new Date();
        }

        function getAdditionalInfo() {
            return "ALSO TRY CURRENCY FILTER SERVICE PROVIDED BY ANGULARJS."
        }

        function getGasPrice() {
            return 2.09;
        }

        function getGasAmountInNepaliRupee(dollarAmount) {
            return dollarAmount * 108.59;
        }
    };
})();