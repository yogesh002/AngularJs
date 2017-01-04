/*
 *@author - Yogesh Ghimire
 *
 */
(function () {
    angular.module("groceryApp", []).controller("groceryController", groceryControllerFunction);
    groceryControllerFunction.$inject = ["$scope", "$filter"];

    function groceryControllerFunction($scope, $filter) {
        $scope.groceryCollection = groceryCollection_JSON;
        $customItem = 0;
        customItemType = "";
        $scope.addItem = function (item, type) {
            var items = {};
            items['name'] = item;
            items['type'] = type;
            items['selected'] = false;
            $scope.groceryCollection.push(items);
            console.log($scope.groceryCollection);
            return $scope.groceryCollection;
        }
    }
})();