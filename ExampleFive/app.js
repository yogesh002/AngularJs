/**
 *
 *
 * @author Yogesh Ghimire 
 *
 *
 * Expressions evaluate to some value. If placeholder for interpolation is not found for example, we dont see any error in the javscript file.
 *For example: while providing the "inputState" of cat in below example: we dont see any error even if we provide random string. In HTML inside element tab in debugger, we dont see the result for that placeholder. It is simply ignored.
 */
(function () {
    'use strict';
    //1. Define a controller without () sign in angular module
    angular.module("expressionApp", []).controller("expressionController", expressionController);
    //2.use $inject to inject the services
    expressionController.$inject = ['$scope', '$filter'];
    //3.
    function expressionController($scope, $filter) {
        var CAT = {
            IMAGE: {
                separator: "."
                , format: "jpg"
            }
            , PLAYING: {
                value: "playing"
            }
            , HIDING: {
                value: "hiding"
            }
        };
        $scope.inputState = "";
        $scope.imageFormat = "";
        $scope.switchState = function () {
            var state = getLowerCase($scope.inputState).concat(CAT.IMAGE.separator).concat(CAT.IMAGE.format);
            if (state === CAT.HIDING.value.concat(CAT.IMAGE.separator).concat(CAT.IMAGE.format)) {
                $scope.inputState = CAT.PLAYING.value.concat(CAT.IMAGE.separator).concat(CAT.IMAGE.format);
            }
            else {
                $scope.inputState = CAT.HIDING.value.concat(CAT.IMAGE.separator).concat(CAT.IMAGE.format);
            }
        }

        function getLowerCase(state) {
            var lowerCase = $filter("lowercase");
            var result = lowerCase(state);
            if (result.includes(".jpg")) {
                result = result.replace(".jpg", "");
            }
            return result;
        }
    };
})();
//For future learning purpose.. few mistakes I made while making this app:
//In step 2: I was doing ( ['$scope', '$filter']); NOTE: we dont need (). Just pass string literals in array
//In step 3: I forgot to pass the services as parameter in the controller function