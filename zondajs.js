var http    = require("http");
var _       = require("underscore");
var url     = require("url");

/**
 * Anonimous function prevents from adding objects to the head scope
 */ 
(function(){

    /**
     * Our ZondaJS object, once it's defined we will export it
     */
    var zondajs = {
        /**
         * Meant to be private.
         * __routes handles the routing for ZondaJs
         */
        __routes:{
            /**
             * All the routes are going to be stored here.
             */
            list: [],
            /**
             * Config object has useful routing metadata, going to be extended in future versions
             */
            config: {
                /**
                 * RegExp used to match the named params
                 */
                namedRegex: /:\w+/g
            },
            /**
             * Add a route to out routes list
             */
            add: function(path, method, callable){
                /**
                 * An object is created having useful data for the routing mechanism.
                 *
                 * path is the route URI
                 * regex is a pre-parsed URL, creating matching groups for every named param found in the path
                 * method stands for the HTTP method. One of GET, POST, PUT or DELETE.
                 * callable is the controller implementation to be called when a request match this route
                 */
                zondajs.__routes.list.push({
                    path: path,
                    regex: '^' + path.replace(zondajs.__routes.config.namedRegex, '([^\/]+)') + '$',
                    method: method,
                    callable: callable
                });
            },
            /**
             * Fetch the route and parse it named params if any.
             *
             * Returns an object having method and params properties:
             *  - method is the controller implementation
             *  - params is an object having the named params as properties and their values as values
             *
             * If no route is found it returns false.
             */
            get: function(path, method){
                var candidate = _.find(zondajs.__routes.list, function(route){
                    rx = new RegExp(route.regex);
                    return rx.test(path);
                });

                if(typeof candidate !== 'undefined'){
                    var rx1 = new RegExp(zondajs.__routes.config.namedRegex);
                    var paramNames = candidate.path.match(rx1);
                    var paramValues = rx.exec(path);
                    var params = {};
                    _.each(paramNames, function(param, index){
                        params[param.replace(':', '')] = paramValues[index + 1]
                    });
                    return {
                        method: candidate.callable,
                        params: params
                    };
                }else{
                    return false;
                }
            }
        },
        /**
         * Meant to be private
         * This is the dependency injection main object
         */
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
        },
        /**
         * ZondaJS properties implementation
         *
         */
        properties: {
            /**
             * Where the properties are going to be stored
             */ 
            map:[],
            /**
             * Creates a new property.
             * It adds a new key-value object to the properties map.
             */ 
            set: function(key, value){
                zondajs.properties.map.push({
                    key: key,
                    value: value
                });
            },
            /**
             * Get a property value from the map based on the given key.
             *
             * If the property is not found, undefined is returned instead.
             */ 
            get: function(key){
                var prop =  _.find(zondajs.properties.map, function(entry){
                    return (entry.key === key);
                });

                if(prop){
                  return prop.value;
                }else{
                  return undefined;
                }
            }
        },
        /**
         * ZondaJS component wrapper for dependency injection.
         *
         * It creates a new key-value object in the dependency injection map.
         *
         */
        component:  function(name, object){
            zondajs.__di.map.push({
                key: name,
                value: object
            });    
        },
        /**
         * Controller wrapper object to add different kind of controllers to the app.
         */ 
        controller: {
            /**
             * Add a controller to the available routes, when using the GET HTTP method.
             */ 
            get: function(path, callable){
                zondajs.__routes.add(path, 'GET' ,callable);
            },
            /**
             * Add a controller to the available routes, when using the POST HTTP method.
             */ 
            post: function(path, callable){
                zondajs.__routes.add(path, 'POST' ,callable);
            },
            /**
             * Add a controller to the available routes, when using the PUT HTTP method.
             */ 
            put: function(path, callable){
                zondajs.__routes.add(path, 'PUT' ,callable);
            },
            /**
             * Add a controller to the available routes, when using the DELETE HTTP method.
             */ 
            del: function(path, callable){
                zondajs.__routes.add(path, 'DELETE' ,callable);
            }
        },
        /**
         * Handle the middleware implementations in ZondaJS
         */ 
        middleware: {
            /**
             * Stores the middleware function to be called for every request.
             */
            list: [],
            /**
             * Add the given middleware to the middleware stack to be called.
             */
            use: function(middleware){
                zondajs.middleware.list.push(middleware);
            }
        },
        /**
         * Well, ZondaJS loader is not actully a loader but intead a file indexer.
         * For a given relative path and a callback, it will call the callback with:
         *  - cleaned file name(e.g. 'db.js' file will be 'db')
         *  - the complete relative path to the file [require ready string](e.g. './components/db.js')
         */
        load: function(dir, callback){
            require('fs').readdirSync(dir + '/').forEach(function(file) {
                if (file.match(/.+\.js/g) !== null) {
                    var name = file.replace(/.js/g, '');
                    callback(name, dir + '/' + file);
                }
            });
        },
        /**
         * this section overrides the default request and response objects by enhance them with common methods.
         */ 
        enhancements: {
            /**
             * Response enhancements
             */
            response: {
                /**
                 * Render a template located in the views folder with the given data
                 */
                render : function(response){
                    return function(template, data){
                        var ejs = require('ejs')
                          , fs = require('fs')
                          , path = './views/' + template
                          , str = fs.readFileSync(path, 'utf8');

                        var html = ejs.render(str, data);

                        response.writeHead(200, {"Content-Type": "text/html"}); 
                        response.end(ejs.render(html));
                    };
                },
                /**
                 * Send a 302 redirect to the browser
                 */
                redirect: function(response){
                    return function(url){
                        response.writeHead(302, {"Location": url});
                        response.end();
                    };
                },
                /**
                 * Writes the specified file path to the response stream.
                 * It also sets the appropiate content type header.
                 *
                 * If the file path is not found, a 404 error will be sent.
                 */
                sendFile: function(response){
                    return function(filePath){
                        var fs = require('fs');
                        var mime = require('mime');

                        fs.exists(filePath, function(exists) {
                            if (exists) {
                                fs.readFile(filePath, function(error, content) {
                                    if(error) {
                                        response.sendError(404);
                                    }else{    
                                        response.writeHead(200, { 'Content-Type': mime.lookup(filePath) });
                                        response.end(content, 'utf-8');
                                    }
                                });
                            }else{
                                response.sendError(404);
                            }
                        });
                    };
                },
                /**
                 * Write a JSON serialized version of the given object to the response stream and set the appropiate content-type header
                 */
                sendJSON: function(response){
                    return function(o){
                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.end(JSON.stringify(o));
                    };
                },
                /**
                 * Render a custom error view, located in the views/errors/ folder.
                 */
                sendError: function(response){
                    return function(code){
                        var ejs = require('ejs')
                          , fs = require('fs')
                          , path = './views/errors/' + code + '.html'
                          , str = fs.readFileSync(path, 'utf8');

                        var html = ejs.render(str, {});

                        response.writeHead(code, {"Content-Type": "text/html"}); 
                        response.end(ejs.render(html));
                    };

                }
            },
            /**
             * Main function attach all the enhancements methods to the current request and response objects
             */
            run: function(request, response){
                response.sendError = zondajs.enhancements.response.sendError(response);
                response.render = zondajs.enhancements.response.render(response);
                response.redirect = zondajs.enhancements.response.redirect(response);
                response.sendJSON = zondajs.enhancements.response.sendJSON(response);
                response.sendFile = zondajs.enhancements.response.sendFile(response);
            }
        },
        /**
         * ZondaJS dispatcher.
         * This object take care for the request handling and routing.
         */
        dispatcher: {
            /**
             * Dispath a server request
             */
            dispatch: function(request, response){
                // parse the URL with the URL lib
                var parsedURL = url.parse(request.url, true);

                // get the controller, and if it has route params, the params too.
                controller = zondajs.__routes.get(parsedURL.pathname, request.method);
                
                //console.log(parsedURL.pathname);
                //console.log(parsedURL.pathname.indexOf('/static/'));

                if(controller || parsedURL.pathname.indexOf('/static/') === 0 || parsedURL.pathname === '/favicon.ico'){
                    request.zondajs = {};
                    request.zondajs.parsedURL = parsedURL;
                    request.zondajs.controller = controller;
                    request.zondajs.params = _.defaults(controller.params, parsedURL.query);

                    zondajs.dispatcher.run(request, response);
                }else{
                    response.sendError(404);
                 }
            },
            /**
             * Dispatcher method responsible for initializing the middleware stack call.
             */ 
            run: function(request, response){
              zondajs.dispatcher.runNext(request, response, 0);
            },
            /**
             * Dispatcher method that automatically creates a callback function sent to the middlewares.
             *
             * Once there are no more middlewares to run, the controller is ran.
             */ 
            runNext: function(request, response, idx){
              if(idx < zondajs.middleware.list.length){
                zondajs.middleware.list[idx].apply(this, [request, response, function(request, response){
                  zondajs.dispatcher.runNext(request, response, idx+1);
                }]);
              }else{
                request.params = request.params || {};
                request.params = _.defaults(request.params, request.zondajs.controller.params);
                zondajs.__di.invoke(request.zondajs.controller.method, [request, response]);             
              }
            }
        },
        /**
         *  Creates a HTTP server on the given port.
         *  Once this function is called, the app will be available on the given port.
         *
         *  You always can add controllers and components on the fly, 
         *  but we strongly suggest to have everything loaded before calling this method 
         *  to prevent 404 or 500 errors in those millisends the app 
         *  is loading the components, controllers, middleware, &c.
         */ 
        startApp: function(port){
            http.createServer(function(request, response) {
                try{
                    zondajs.enhancements.run(request, response);
                    zondajs.dispatcher.dispatch(request, response);
                }catch(e){
                    console.log(e.stack);
                    response.sendError(500);
                }
            }).listen(port);
        }
    };

    module.exports = zondajs;
}).call(this);
