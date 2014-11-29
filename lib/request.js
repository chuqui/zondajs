/*global module, require*/

module.exports = (function () {
    "use strict";
    var requestWrapper = Object.create(null),
        underscore = require("underscore");

    requestWrapper.wrap = function (request, parsedURL, controller) {
        request.parsedURL = parsedURL;
        request.params = request.params || {};
        request.params = underscore.defaults(request.params, controller.params);
	};

    return requestWrapper;
}());
