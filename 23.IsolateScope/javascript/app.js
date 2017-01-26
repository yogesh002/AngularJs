/*
 *@author -  Yogesh Ghimire
 */
(function () {
    angular.module("isolateApp", []).controller("isolateControllerOne", IsolateControllerOneFunction).controller("isolateControllerTwo", IsolateControllerTwoFunction).controller("directiveController", directiveControllerFunction).directive("isolateDirective", isolateDirectiveFunction);
    //directive
    function isolateDirectiveFunction() {
        var ddo = {
            templateUrl: "itemdetails.html"
            , scope: { //isolated scope
                //left side property will be found in javascript file. Right side value will be demormalized and is kept in html file.
                //'<' is one way binding. Parent pass data to directive; directive can use it, but cannot modify the parent's value.
                //"=". If '=' was used instead of "<" then both parent and directive can modify the value
                //"@" is used for String ONLY. 
                controller: "<controllerAttribute"
                , title: "@titleAttribute" //In html, it is denormalized like title-attribute="some string value here....";
                    
                , time: "&getTime" //While calling time in directive, since it is a function, we call like time() in javascript
                    //in html, get-time = "blah blah..". You retrieve blah blah from parent controller. e.g: get-time="controllerOne.time()"
            }
            , controller: directiveControllerFunction //Only specific to directive controller
                
            , controllerAs: "directiveController"
            , bindToController: false // false because we can use different controllers instead of only one "directiveController" //defined above.
                
            , link: linkDirectiveFunction
            , transclude: true
        }
        return ddo;
    }
    //attributes : all the attributes defined in the isolate scope above. E.g: controllerAttribute, getTime, etc.
    //element : to manipulate DOM. E.g- to add CSS
    //controller : ONLY Directive Controller. In our example, it is directiveControllerFunction
    //scope: has access to both parent IsolateControllerOneFunction and IsolateControllerTwoFunction and properties
    function linkDirectiveFunction(scope, element, attributes, controller) {
        console.log("Scope is: ", scope);
        console.log("attributes are : ", attributes);
        //look for controllers below :
        console.log(scope.controller); //IsolateControllerOneFunction and IsolateControllerTwoFunction
        console.log(controller); //directiveControllerFunction
        element.find("span").css("color", "red");
    }
    //1. Controller specific to Directive Controller ONLY
    //This controller will have access to all the proeprties defined in isolated scope above.
    function directiveControllerFunction() {
        var directiveController = this;
        directiveController.detail = "This detail is provided by directiveControllerFunction.";
    }
    IsolateControllerOneFunction.$inject = ["$interval"]
        //2. Parent controller 1 or in other word, controller bound to scope
    function IsolateControllerOneFunction($interval) {
        var controllerOne = this;
        controllerOne.header = "Controller One";
        controllerOne.time = function () {
            $interval(function () {
                controllerOne.updatedTime = new Date().toLocaleTimeString();
            }, 1000);
        }
    }
    IsolateControllerTwoFunction.$inject = ["$interval"]
        //2. Parent controller 2 or in other word, controller bound to scope
    function IsolateControllerTwoFunction($interval) {
        var controllerTwo = this;
        controllerTwo.header = "Controller Two";
        controllerTwo.time = function () {
            controllerTwo.updatedTime = "Clock is temporarily is broken!";
        }
    }
})();