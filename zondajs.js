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
            },
            put: function(path, callable){
                zondajs.__routes.add(path, 'PUT' ,callable);
            },
            del: function(path, callable){
                zondajs.__routes.add(path, 'DELETE' ,callable);
            }
        },
        middleware: {
            list: [],
            use: function(middleware){
                zondajs.middleware.list.push(middleware);
            }
        },
        load: function(dir, callback){
            require('fs').readdirSync(dir + '/').forEach(function(file) {
                if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
                    var name = file.replace(/.js/g, '');
                    callback(name, require( dir + '/' + file));
                }
            });
        },
        enhancements: {
            response: {
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
                redirect: function(response){
                    return function(url){
                        response.writeHead(302, {"Location": url});
                        response.end();
                    };
                },
                sendFile: function(response){
                    return function(filePath){
                        var fs = require('fs');
                        var mime = require('mime');

                        fs.exists(filePath, function(exists) {
                            if (exists) {
                                fs.readFile(filePath, function(error, content) {
                                    if(error) {
                                        response.writeHead(404);
                                        response.end();
                                    }else{    
                                        response.writeHead(200, { 'Content-Type': mime.lookup(filePath) });
                                        response.end(content, 'utf-8');
                                    }
                                });
                            }else{
                                response.writeHead(404);
                                response.end();
                            }
                        });
                    };
                },
                sendJSON: function(response){
                    return function(o){
                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.end(JSON.stringify(o));
                    };
                }
            },
            run: function(request, response){
                response.render = zondajs.enhancements.response.render(response);
                response.redirect = zondajs.enhancements.response.redirect(response);
                response.sendJSON = zondajs.enhancements.response.sendJSON(response);
                response.sendFile = zondajs.enhancements.response.sendFile(response);
            }
        },
        dispatcher: {
            dispatch: function(request, response){
                // parse the URL with the URL lib
                var parsedURL = url.parse(request.url, true);

                // get the controller, and if it has route params, the params too.
                controller = zondajs.__routes.get(parsedURL.pathname, request.method);
                
                //console.log(parsedURL.pathname);
                //console.log(parsedURL.pathname.indexOf('/static/'));

                if(controller || parsedURL.pathname.indexOf('/static/') == 0 || parsedURL.pathname == '/favicon.ico'){
                    request.zondajs = {};
                    request.zondajs.parsedURL = parsedURL;
                    request.zondajs.controller = controller;
                    request.zondajs.params = _.defaults(controller.params, parsedURL.query);

                    zondajs.dispatcher.run(request, response);
                }else{
                    response.writeHead(404, {"Content-Type": "text/plain"});
                    response.end('Not Found');
                 }
            },
            run: function(request, response){
              zondajs.dispatcher.runNext(request, response, 0);
            },
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
        startApp: function(port){


            zondajs.load('./middleware', function(name, mid){
                zondajs.middleware.use(mid);
            });

            http.createServer(function(request, response) {
                try{
                    zondajs.enhancements.run(request, response);
                    zondajs.dispatcher.dispatch(request, response);
                }catch(e){
                    console.log(e.stack);
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.end('Internal Server Error');
 
                }
            }).listen(port);
        }
    };

    module.exports = zondajs;
}).call(this);
