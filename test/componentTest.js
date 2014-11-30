/*global require, describe, it*/

var assert = require("assert"),
    injector = require("../lib/injector.js"),
    component = require("../lib/component.js");

describe("Component Tests", function () {
    "use strict";

    it("Should have an 'add' function receiving 2 parameters", function () {
        assert(component, "Component is not defined");
        assert(component.add, "Component.add is not defined");
        assert(component.add instanceof Function, "Component.add is not a function");
        assert.equal(component.add.length, 2, "Component.add is not receiving 2 params");
    });

    it("Should inject the parameters", function () {
        var key = "myTestKey",
            value = function (a, b) {
                return a + b;
            },
            fn = false;

        component.add(key, value);

        fn = injector.get(key);

        assert(fn, "Component is not adding to injector");
        assert.equal(value, fn, "Value added is different from the original");
        assert.equal(fn(1, 2), 3, "Value added lost it's behavior");
    });

});