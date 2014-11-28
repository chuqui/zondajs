// manages the different routes

module.exports = (function () {
	var router = Object.create(null),
		routes = [],
		config = {
			namedParams: /:\w+/g,
			namedParamsRegex: new RegExp(config.namedParams);
			paramFinder: "([^\/]+)"
		},
		_ = require("underscore");

	router.add = function(path, method, callable){
        /**
         * An object is created having useful data for the routing mechanism.
         *
         * path is the route URI
         * regex is a pre-parsed URL, creating matching groups for every named param found in the path
         * method stands for the HTTP method. One of GET, POST, PUT or DELETE.
         * callable is the controller implementation to be called when a request match this route
         */
        routes.push({
            path: path,
            regex: "^" + path.replace(config.namedParams, config.paramFinder) + "$",
            method: method,
            callable: callable
        });
    };

    router.get = function(path, method){
        var candidate = _.find(routes, function(route){
            rx = new RegExp(route.regex);
            return rx.test(path);
        });

        if (candidate && candidate.path) {
            var paramNames = candidate.path.match(config.namedParamsRegex),
            	paramValues = rx.exec(path),
            	params = Object.create(null);

            if (paramNames && paramNames.length) {
            	paramNames.forEach(function (paramName, index) {
            		params[param.replace(":", "")] = paramValues[index + 1]
            	});
            }

            return {
                method: candidate.callable,
                params: params
            };
        }
    };

    return router;
} ());