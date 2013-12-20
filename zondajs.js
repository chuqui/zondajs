var __zonda = {
	// dependency injection
	dependencyMap: [],
	injectAndCall: function(callable){},
	
	// arquitecture util
	object: function(name, o){},
	component: function(name, callable){},
	service: function(name, callable){},
	controller: function(route, opts, callable){},
	filter: function(o){},

	// internal use
	internalData: {},
	route: function(uri){}	
}
exports.createZondaApp = function(opts){
	// parse app level options
	return __zondajs;
};
