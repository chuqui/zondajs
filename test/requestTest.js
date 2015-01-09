/*global require, describe, it*/

var assert = require("assert"),
    requestWrapper = require("../lib/request.js");

describe("Request Tests", function () {
    "use strict";
    var mockedRequest = {
            params: {
                param1: 10,
                param2: 15,
                paramInCommon: 25
            }
        },
        mockedController = {
            params: {
                param3: 10,
                param4: 15,
                paramInCommon: 25
            }
        };

    it("Should wrap the request properly", function () {
        requestWrapper.wrap(mockedRequest, {parsed: true}, mockedController);

        assert(mockedRequest, "Wrapped request should be defined");
        assert(mockedRequest.params, "Wrapped request.params should be defined");
        assert(mockedRequest.parsedURL, "Wrapped request.parsedURL should be defined");
        assert.equal(Object.keys(mockedRequest.params).length, 5, "Should have 5 params");
        assert.equal(mockedRequest.params.param1, 10, "Param shouldn't be modified");
        assert.equal(mockedRequest.params.param2, 15, "Param shouldn't be modified");
        assert.equal(mockedRequest.params.param3, 10, "Param shouldn't be modified");
        assert.equal(mockedRequest.params.param4, 15, "Param shouldn't be modified");
        assert.equal(mockedRequest.params.paramInCommon, 25, "Param shouldn't be modified");
    });
});