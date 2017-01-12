/*
 *@author - Yogesh Ghimire
 *
 */
(function () {
    angular.module("groceryApp", []).controller("groceryController", groceryControllerFunction);
    groceryControllerFunction.$inject = ["$scope", "$filter"];

    function groceryControllerFunction($scope, $filter) {
        $scope.groceryCollection = groceryCollection_JSON;
        
        $scope.addItem = function (item, type, quantity) {
            var items = {};
            items['name'] = item;
            items['type'] = type;
            items['quantity'] = quantity;
            items['selected'] = false; //As soon as you add, do you want to select it or not? If yes, make it true. 
            $scope.groceryCollection.push(items);
            console.log($scope.groceryCollection);
            return $scope.groceryCollection;
        }
    }
})();