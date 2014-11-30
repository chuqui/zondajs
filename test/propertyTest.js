/*global require, describe, it*/

var assert = require("assert"),
    injector = require("../lib/injector.js"),
    property = require("../lib/property.js");

describe("Property Tests", function () {
    "use strict";

    it("Should have an 'add' function receiving 2 parameters", function () {
        assert(property, "Property is not defined");
        assert(property.add, "Property.add is not defined");
        assert(property.add instanceof Function, "Property.add is not a function");
        assert.equal(property.add.length, 2, "Property.add is not receiving 2 params");
    });

    it("Should inject the parameters", function () {
        var key = "myTestKey",
            value = {
                userid: 17
            },
            fn = false;

        property.add(key, value);

        fn = injector.get(key);

        assert(fn, "Property is not adding to injector");
        assert(fn.userid, "Value added is different from the original");
        assert.equal(fn.userid, 17, "Value added is different from the original");
    });

});