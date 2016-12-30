/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    angular.module("serviceApp", []) //1.
        .controller("serviceAppController", dependencyInjectionAndFilterServiceController);
   
    //Defining controller function separately
    function dependencyInjectionAndFilterServiceController($scope, $filter, $injector) {
        $scope.lowerCaseinput = "";
        $scope.amountInDollar = 0;
        //Example ONE:
        $scope.transformedText = function () {
            var transform = $filter("uppercase"); //2.
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
       
        //NOTE: For learning purpose only:
        //How angularJs Knows about dependency injection? The one we did for above services like - scope, filter and injector?
        //It internally calls injector service's annotate method. It parses the service passed as parameters then initializes them respecticely
        console.log($injector.annotate(dependencyInjectionAndFilterServiceController));
    }
})();
//Few mistakes I made while making this app. For learning purpose (commented as 1. and 2. in the code)
//1. Forgot to include dependencies in the module, although empty array
//2. Instead of $filter, I mentioned $scope.filter