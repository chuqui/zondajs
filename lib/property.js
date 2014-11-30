/*global module, require*/
module.exports = (function () {
    "use strict";
    
	var property = Object.create(null),
		injector = require("./injector.js");

	property.add = function (key, value) {
		injector.add({
			key: key,
			value: value
		});
	};

    return property;
}());