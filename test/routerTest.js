/*global require, describe, it, console*/

var assert = require("assert"),
    router = require("../lib/router.js");

describe("Router Tests", function () {
    "use strict";

    it("Should have a 'get' function receiving 2 parameters", function () {
        assert(router, "Router is not defined");
        assert(router.get, "Router.get is not defined");
        assert(router.get instanceof Function, "Router.get is not a function");
        assert.equal(router.get.length, 2, "Router.get is not receiving 2 params");
    });
    
    it("Should have an 'add' function receiving 3 parameters", function () {
        assert(router, "Router is not defined");
        assert(router.add, "Router.add is not defined");
        assert(router.add instanceof Function, "Router.add is not a function");
        assert.equal(router.add.length, 3, "Router.add is not receiving 2 params");
    });

    it("Should return added routes when using get", function () {
        var path = "/users/:userid/profile",
            requestPath = "/users/17/profile",
            method = "GET",
            callable = function (a, b) {
                return a + b;
            },
            route = false;
      
        router.add(path, method, callable);

        route = router.get(requestPath, method);

        assert(route, "Route was not found");
        assert(route.params, "Route.params is not found");
        assert.equal(route.params.userid, 17, "Invalid parameter matching");
        assert.equal(route.method(1, 2), 3, "Callable added lost it's behavior");
    });

});