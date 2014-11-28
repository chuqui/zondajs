var http    = require("http");
var _       = require("underscore");
var url     = require("url");

/**
 * Anonimous function prevents from adding objects to the head scope
 */ 
(function(){
    var router = require("router.js");
    var injector = require("injector.js");
    var loader = require("loader.js");
    var controller = require("controller.js");

    var zondajs = {
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
        component:  function(name, object){
            injector.push({
                key: name,
                value: object
            });
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
		 * Wrapper to support future updates
		 */
		,
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
                        var swig = require('swig')
                            , path = require('path')
                            , filepath = path.dirname(require.main.filename) + '/views/' + template;
                        
                        var html = swig.renderFile(filepath, data);

                        response.writeHead(200, {"Content-Type": "text/html"}); 
                        response.end(html);
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
                controller = router.get(parsedURL.pathname, request.method);
                
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
