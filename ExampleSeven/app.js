/**
 * @author Yogesh Ghimire 
 */
(function () {
    //1. Define module, controller and filter by naming them
    angular.module("customFilterApp", []).controller("customFilterController", customFilterControllerFunction).filter("custom", customFilterFactoryFunction).filter("evenCharCapitalized", evenCharCapitalizedFilterFactoryFunction).filter("replaceLastCharWithNumber", replaceLastCharacterWithNumber);
    //2. Inject the services
    //NOTE: a) The name of filterfactory function is "custom" so while injecting we need to append "Filter" keyword!!!
    //b) $ is reserved for angularJs keywords, so in our custom filter service, we do not append "$" sign
    customFilterControllerFunction.$inject = ['$scope', '$filter', 'customFilter', 'evenCharCapitalizedFilter'];
    //3. Define controller function. Note: controller needs to have access to those services so, pass services as parameters. NOTE: NO "$" sign
    function customFilterControllerFunction($scope, $filter, customFilter, evenCharCapitalizedFilter) {
        $scope.input = "";
        $scope.reverseItNow = function () {
            var reversedInput = customFilter($scope.input);
            $scope.input = evenCharCapitalizedFilter(reversedInput);
        }
    };
    //This is my first custom filter factory function that reverses the input string
    function customFilterFactoryFunction() {
        return function (input) {
            var reverseOutput = "";
            for (var i = input.length - 1; i >= 0; i--) {
                var lastCharacter = input.charAt(i);
                reverseOutput += lastCharacter;
            }
            return reverseOutput;
        }
    };
    //This is my second custom filter factory function that capitalize every second letter from the input letters
    function evenCharCapitalizedFilterFactoryFunction() {
        return function (input) {
            var capsIncluded = "";
            for (var i = 0; i < input.length; i++) {
                if (i % 2 == 0) {
                    capsIncluded += input.charAt(i).toUpperCase();
                }
                else {
                    capsIncluded += input.charAt(i);
                }
            }
            return capsIncluded;
        }
    }
    //This is the third custom filter factory function. This one is used directly on HTML. No need to inject in controller
    function replaceLastCharacterWithNumber() {
        return function (input, initialText, finalText) {
            var lastCharacterInNumber = input.charCodeAt(input.length - 1);
            return (initialText).concat(" ").concat(lastCharacterInNumber).concat(" ").concat(finalText);
        }
    }
})();