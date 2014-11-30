/*global module, require*/
module.exports = (function () {
    "use strict";
    
	var component = Object.create(null),
		injector = require("./injector.js");

	component.add = function (key, value) {
		injector.add({
			key: key,
			value: value
		});
	};

    return component;
}());