/*
 *
 *@author Yogesh Ghimire
 *
 *a simple clock to display current time. It uses $apply to check watchers that are outside of the scope of anguarJs. NOTE: we can use $digest but *it does not catch exceptions. So, $apply is preferred over $digest.
 *
 */
(function () {
    angular.module("digestLoopApp", []).controller("digestCycleController", digestCycleController);
    digestCycleController.$inject = ['$scope'];

    function digestCycleController($scope) {
        $scope.counter = "Loading time........";
        (function () {
            setInterval(function () {
                $scope.$apply(function () {
                    return $scope.counter = new Date().toLocaleTimeString();
                });
            }, 1000);
        })();
    };
})();