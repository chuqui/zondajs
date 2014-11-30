/*global module, require*/
module.exports = (function () {
    "use strict";
    
	var dispatcher = Object.create(null),
	    requestWrapper = require("./request.js"),
	    responseWrapper = require("./response.js"),
	    stack = require("./stack.js"),
	    middleware = require("./middleware.js"),
	    injector = require("./injector.js"),
        router = require("./router.js"),
	    url = require("url");

	dispatcher.go = function (request, response) {
        var parsedURL = url.parse(request.url, true),
            controller = router.get(parsedURL.pathname, request.method),
            meta;

        if (controller) {
            // Initialize request and response
			responseWrapper.wrap(response);
            requestWrapper.wrap(request, parsedURL, controller);

            meta = stack.meta(request, response);

            // Add middleware to the execution stack
            middleware.items.forEach(function (callable) {
                callable.prototype = meta;
                meta.currentStack.add(callable);
            });

            // Add controller functions to the execution stack
            if (controller.isArray) {
                controller.forEach(function (callable) {
                    if (callable instanceof Function) {
                        callable.prototype = meta;
                        meta.currentStack.add(callable);
                    } else {
                        var fn = injector.get(callable);
                        
                        if (callable instanceof Function) {
                            fn.prototype = meta;
                            meta.currentStack.add(fn);
                        } else {
                            response.sendError(500);
                        }
                    }
	            });
            }

            meta.next();
        } else {
            response.sendError(404);
        }
    };

    return dispatcher;
}());