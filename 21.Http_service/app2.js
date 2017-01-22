/**
 * @author Yogesh Ghimire 
 *
 *
 *******************************APPROACH 3: USING CONSTANT *************************************************
 */

(function () {
    angular.module("httpServiceApp", [])
        .controller("httpServiceController", httpServiceControllerFunction)
        .service("itemDetailsService", displayItemDescriptionService)
        .service("displayAllItemsService", displayAllItemsServiceFunction)
        .constant("BaseUrl", "https://davids-restaurant.herokuapp.com/"); //declare a constant 

    displayAllItemsServiceFunction.$inject = ["$http", "BaseUrl"]; //dependency injection
    function displayAllItemsServiceFunction($http, BaseUrl) {
        var service = this;
        var response = $http({
            method: "GET"
            , url: BaseUrl + "categories.json"
        });
        service.showAllCategories = response;
    }
    httpServiceControllerFunction.$inject = ["itemDetailsService", "displayAllItemsService"];

    function httpServiceControllerFunction(itemDetailsService, displayAllItemsService) {
        var controller = this;
        controller.getItemDetails = function (itemCode) { //Functionality for click start
                var promise = itemDetailsService.itemDetail(itemCode);
                promise.then(function (response) {
                    controller.selectedItemDetail = response.data;
                }).catch(function (error) {
                    console.log("error occured : ", error)
                });
            }
            //Functionality for click end
        var anotherPromise = displayAllItemsService.showAllCategories;
        anotherPromise.then(function (response) {
            controller.categories = response.data;
        }).catch(function (error) {
            console.log("error occured: ", error);
        });
    }
    displayItemDescriptionService.$inject = ["$http", "BaseUrl"]

    function displayItemDescriptionService($http, BaseUrl) {
        var service = this;
        service.itemDetail = function (itemCode) {
            var response = $http({
                method: "GET"
                , url: BaseUrl + "menu_items.json"
                , params: {
                    category: itemCode //The use of params object is to for query string. So, for e.g url?category=C if "C" was clicked 
                }
            });
            return response;
        }
    }
})();