/*global module, require*/
module.exports = (function () {
    "use strict";
    
	var middleware = Object.create(null);

	middleware.items = [];

	middleware.use = function (callable) {
        middleware.items.push(callable);
    };

    return middleware;
}());