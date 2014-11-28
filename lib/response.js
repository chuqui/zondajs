// main response obj

        __di : {
            /**
             * Array where all the components available to be injected are stored
             */
            map: [],
            /**
             * Fetches the components to be injected by its key
             *
             * Returns the component if found, undefined if not found.
             */ 
            get: function(key){
                if(this[key]){
                    return this.key;
                }

                var candidate =  _.find(zondajs.__di.map, function(entry){
                    return (entry.key == key);
                });

                if(typeof candidate !== 'undefined'){
                    return candidate.value;
                }else{
                    return candidate;
                };
            },
            /**
             * From a given function, extract the parameter names in order to know what keys need to be injected.
             *
             * Notice that the request and response keys are reserved and ignored for dependency injection, 
             * since they are going to be the current request/response objects for a given server request.
             */ 
            identifyParams: function(callable){
                var regexp = /^function\s*[^\( ]*\(\s*([^\)]*)\)/m;
                var fnParams =  callable.toString().match(regexp)[1].replace(/\s/g, '').split(',');
                
                // clean request and response
                return _.without(fnParams, 'request', 'response');
            },
            /**
             * For each parameter of a given function get its dependecies
             *
             * If the dependency is a function, inject its dependencies recursively.
             *
             * Returns an array with the function expected parameters.
             */ 
            getDependencies: function(callable){
                var params = [];
                var keys = zondajs.__di.identifyParams(callable);
                _.each(keys, function(key){
                    var dependency = zondajs.__di.get(key);
                    if(typeof dependency !== 'undefined'){
                        if(dependency instanceof Function){
                            params.push(dependency.apply(this, zondajs.__di.getDependencies(dependency)));
                        }else{
                            params.push(dependency);
                        }
                    }
                });
                return params;
            },
            /**
             * For a given function (controller implementation), look for its dependencies and call it.
             *
             * The hooks param is used for the request and response objects, that are not injected.
             *
             */
            invoke: function(callable, hooks){
                if(typeof hooks !== 'undefined'){
                    callable.apply(this, _.union(hooks, zondajs.__di.getDependencies(callable)));
                }else{
                    callable.apply(this, zondajs.__di.getDependencies(callable));
                }
            }
        }