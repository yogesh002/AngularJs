/**
 * @author Yogesh Ghimire 
 *
 *
 *******************************APPROACH 2: USING SERVICE PROVIDER *************************************************
 */
(function () {
    angular.module("httpServiceApp", [])
        .controller("httpServiceController", httpServiceControllerFunction)
        .provider("httpService", httpServiceProviderFunction)
        .config(configObj);

    configObj.$inject = ["httpServiceProvider"]
    function configObj(httpServiceProvider) {
        httpServiceProvider.configuration.baseUrl = "https://davids-restaurant.herokuapp.com/"; //overriding the http with https
    }

    function httpServiceProviderFunction() {
        var provider = this;
        provider.configuration = {
            baseUrl: "http://davids-restaurant.herokuapp.com/"
        }
        provider.$get = function () {
            var service = new httpService(provider.configuration.baseUrl);
            return service;
        }
    }

    function httpService(url) {
        var service = this;
        service.menuCategories = function ($http, itemCode) {
            if (itemCode === "") {
                var response = $http({
                    method: "GET"
                    , url: url + "categories.json"
                });
            }
            else {
                var response = $http({
                    method: "GET"
                    , url: url + "menu_items.json"
                    , params: {
                        category: itemCode
                    }
                });
            }
            return response;
        }
    }
    httpServiceControllerFunction.$inject = ["httpService", "$http"]

    function httpServiceControllerFunction(httpService, $http) {
        var service = httpService;
        var controller = this;
        var promise = service.menuCategories($http, "");
        promise.then(function (response) {
            controller.categories = response.data;
        }).catch(function (error) {
            console.log("Error occured", error);
        });
        controller.getItemDetails = function (itemCode) {
            var anotherPromise = service.menuCategories($http, itemCode);
            console.log(anotherPromise);
            anotherPromise.then(function (response) {
                controller.selectedItemDetail = response.data;
            }).catch(function (error) {
                console.log("Error occured. ", error);
            });
        }
    }
})();