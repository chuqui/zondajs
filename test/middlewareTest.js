/*global require, describe, it*/

var assert = require("assert"),
    middleware = require("../lib/middleware.js");

describe("Middleware Tests", function () {
    "use strict";

    it("Should have an 'items' function receiving 2 parameters", function () {
        assert(middleware, "Middleware is not defined");
        assert(middleware.items, "Middleware.items is not defined");
        assert(middleware.items instanceof Array, "Middleware.items is not an array");
    });
    
    it("Should have an 'use' function receiving 1 parameter", function () {
        assert(middleware, "Middleware is not defined");
        assert(middleware.use, "Middleware.use is not defined");
        assert(middleware.use instanceof Function, "Middleware.use is not a function");
        assert.equal(middleware.use.length, 1, "Middleware.use is not receiving 1 param");
    });

    it("Should add the middleware to the middleware items", function () {
        var mid = function (a, b) {
                return a + b;
            },
            wasAdded;

        middleware.use(mid);

        wasAdded = middleware.items.some(function (item) {
            return item === mid;
        });

        assert(wasAdded, "Middleware is not adding");
    });

});