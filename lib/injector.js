// injects parameters into functions
module.exports = (function () {
	var injector = Object.create(null),
		map = Object.create(null),
		_ = require("underscore"),
		identifyParams: function(callable){
            var regexp = /^function\s*[^\( ]*\(\s*([^\)]*)\)/m,
            	fnParams =  callable.toString().match(regexp)[1].replace(/\s/g, "").split(",");
            
            // clean request and response
            return _.without(fnParams, "request", "response");
        },
        getDependencies = function(callable){
	        var params = [],
	            keys = identifyParams(callable);

	        keys.forEach(function (key) {
	            if (map.key) {
	                if (map.key instanceof Function) {
	                    params.push(map.key.apply(this, getDependencies(map.key)));
	                } else {
	                    params.push(map.key);
	                }
	            }
	        });

	        return params;
	    };

	injector.add = function (mappedObject) {
		map[mappedObject.key] = mappedObject.value;
	};

    injector.call = function (callable, hooks) {
        if (hooks) {
            callable.apply(this, _.union(hooks, getDependencies(callable)));
        }else{
            callable.apply(this, getDependencies(callable));
        }
    };

    return injector;
} ());
