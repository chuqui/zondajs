/*global module, require*/
module.exports = (function () {
    "use strict";
	var controller = Object.create(null),
		router = require("router.js");

	controller.get = function (path, callable) {
        router.add(path, "GET", callable);
    };

    controller.post = function (path, callable) {
        router.add(path, "POST", callable);
    };

    controller.put = function (path, callable) {
        router.add(path, "PUT", callable);
    };

    controller.del = function (path, callable) {
        router.add(path, "DELETE", callable);
    };

    return controller;
}());