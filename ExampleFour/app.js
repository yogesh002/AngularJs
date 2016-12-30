/**
 * @author Yogesh Ghimire 
 * This is the same example as Example Three. The only difference is we are using minified version of this javascript in our application. javascript can be minified from website - www.javascript-minifier.com
 * NOTE: String literals are not changed by minifier so they remain unchanged.
 */
(function () {
    'use strict';
    angular.module("serviceApp", [])
        //Array can hold string literals as well as function. The last index of array in angularJs controller always hold a function. The string 
        //literals are always the arguments to that function in the same order. Making the arguments as string literals so that minifier do not change //them and angularJs can find those services
        .controller("serviceAppController", ['$scope', '$filter', '$injector', dependencyInjectionAndFilterServiceController]);
    //Defining controller function separately
    function dependencyInjectionAndFilterServiceController($scope, $filter, $injector) {
        $scope.lowerCaseinput = "";
        $scope.amountInDollar = 0;
        //Example ONE:
        $scope.transformedText = function () {
            var transform = $filter("uppercase");
            $scope.lowerCaseinput = transform($scope.lowerCaseinput);
        };
        //Example TWO:   
        $scope.getCurrency = function () {
            $scope.amountInDollar = addDollarSign($scope.amountInDollar);
        }

        function addDollarSign(input) {
            var result = $filter("currency");
            return result(input);
        }
        console.log($injector.annotate(dependencyInjectionAndFilterServiceController));
    }
})();