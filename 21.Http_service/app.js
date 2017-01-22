/**
 * @author Yogesh Ghimire 
 *
 *
 *******************************APPROACH 1: USING FACTORY *************************************************
 */
(function () {
    angular.module("httpServiceApp", [])
        .controller("httpServiceController", httpServiceControllerFunction)
        .factory("httpServiceFactory", httpServiceFactoryFunction) //define a factory
        .constant("baseUrl", "http://davids-restaurant.herokuapp.com/");
    
    httpServiceFactoryFunction.$inject = ["$http"] //inject $http in factory so it becomes available in service
    function httpServiceFactoryFunction($http) {
        var result = function () {
            return new httpService(); //pass  url and $http service in all services we create
        }
        return result;
    }

    function httpService() {
        var service = this;
        service.menuCategories = function (itemCode, baseUrl, $http) {
            var response;
            if (itemCode === "" || itemCode == null) {
                response = $http({
                    method: "GET"
                    , url: baseUrl + "categories.json"
                });
            }
            else {
                response = $http({
                    method: "GET"
                    , url: baseUrl + "menu_items.json"
                    , params: {
                        category: itemCode
                    }
                });
            }
            return response;
        }
    }
    httpServiceControllerFunction.$inject = ["httpServiceFactory", "$http", "baseUrl"]

    function httpServiceControllerFunction(httpServiceFactory, $http, baseUrl) {
        var service = httpServiceFactory();
        var controller = this;
        var promise = service.menuCategories("", baseUrl, $http);
        promise.then(function (response) {
            controller.categories = response.data;
        }).catch(function (error) {
            console.log("Error occured", error);
        })
        controller.getItemDetails = function (itemCode) {
            var anotherPromise = service.menuCategories(itemCode, baseUrl, $http);
            anotherPromise.then(function (response) {
                controller.selectedItemDetail = response.data;
            }).catch(function (error) {
                console.log("Error occured. ", error);
            });
        }
    }
    })();