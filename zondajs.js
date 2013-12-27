var http    = require("http");
var _       = require("underscore");
var url     = require("url");


(function(){

    var zondajs = {
        __routes:{
            list: [],
            config: {
                namedRegex: /:\w+/g
            },
            add: function(path, method, callable){
                zondajs.__routes.list.push({
                    path: path,
                    regex: '^' + path.replace(zondajs.__routes.config.namedRegex, '([^\/]+)') + '$',
                    method: method,
                    callable: callable
                });
            },
            get: function(path, method){
                var candidate = _.find(zondajs.__routes.list, function(route){
                    rx = new RegExp(route.regex);
                    return rx.test(path);
                });

                if(candidate != undefined){
                    rx1 = new RegExp(zondajs.__routes.config.namedRegex);
                    paramNames = candidate.path.match(rx1);
                    paramValues = rx.exec(path);
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
        __di : {
            map: [],
            get: function(key){
                if(this[key]){
                    return this.key;
                }

                var candidate =  _.find(zondajs.__di.map, function(entry){
                    return (entry.key == key);
                });

                if(candidate != undefined){
                    return candidate.value;
                }else{
                    return candidate;
                };
            },
            identifyParams: function(callable){
                var regexp = /^function\s*[^\( ]*\(\s*([^\)]*)\)/m;
                var fnParams =  callable.toString().match(regexp)[1].replace(/\s/g, '').split(',');
                
                // clean request and response
                return _.without(fnParams, 'request', 'response');
            },
            getDependencies: function(callable){
                var params = [];
                var keys = zondajs.__di.identifyParams(callable);
                _.each(keys, function(key){
                    var dependency = zondajs.__di.get(key);
                    if(dependency!=undefined){
                        if(dependency instanceof Function){
                            params.push(dependency.apply(this, zondajs.__di.getDependencies(dependency)));
                        }else{
                            params.push(dependency);
                        }
                    }
                });
                return params;
            },
            invoke: function(callable, hooks){
                if(hooks != undefined){
                    callable.apply(this, _.union(hooks, zondajs.__di.getDependencies(callable)));
                }else{
                    callable.apply(this, zondajs.__di.getDependencies(callable));
                }
            }
        },
        properties: {
            map:[],
            set: function(key, value){
                zondajs.properties.map.push({
                    key: key,
                    value: value
                });
            },
            get: function(key){
                // this will fail if the key isn't found
                return _.find(zondajs.properties.map, function(entry){
                    return (entry.key == key);
                }).value;
            }
        },
        component:  function(name, object){
            zondajs.__di.map.push({
                key: name,
                value: object
            });    
        },
        controller: {
            get: function(path, callable){
                zondajs.__routes.add(path, 'GET' ,callable);
            },
            post: function(path, callable){
                zondajs.__routes.add(path, 'POST' ,callable);
            }
            //add support (at least) for rest http methods put and delete
        },
        startApp: function(port){
            zondajs.load('./middleware', function(name, mid){
                zondajs.middleware.use(mid);
            });
            http.createServer(function(request, response) {
                try{
                    zondajs.middleware.run(request, response);
                    var parsedURL = url.parse(request.url, true);
                    controller = zondajs.__routes.get(parsedURL.pathname, request.method);
                    if(controller){
                        request.params = _.defaults(controller.params, parsedURL.query);
                        zondajs.__di.invoke(controller.method, [request, response]);
                        response.writeHead(200, {"Content-Type": "text/plain"});
                        response.write("200 OK");
                        response.end();
                    }else{
                        response.writeHead(404, {"Content-Type": "text/plain"});
                        response.write("File Not Found");
                        response.end();
                    }
                }catch(e){
                    console.log(e);
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write("Server error");
                    response.end();
                }
            }).listen(port);
        },
        middleware: {
            list: [],
            use: function(middleware){
                zondajs.middleware.list.push(middleware);
            },
            run: function(request, response){
                _.each(zondajs.middleware.list, function(middleware){
                    middleware.apply(this, [request, response]);
                });
            }
        },
        load: function(dir, callback){
            require('fs').readdirSync(dir + '/').forEach(function(file) {
                if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
                    var name = file.replace(/.js/g, '');
                    callback(name, require( dir + '/' + file));
                }
            });
        }
    };

    module.exports = zondajs;
}).call(this);
