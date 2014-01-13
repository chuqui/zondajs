var assert = require("assert");
var zondajs = require('../zondajs');

describe('Running zondajs tests', function(){
  describe('Router tests', function(){
    it('zondajs.__routes must be defined', function(){
      assert(zondajs.__routes);     
    });

    it('zondajs.__routes.list must be defined', function(){
       assert(zondajs.__routes.list);
    });

    it('zondajs.__routes.config must be defined', function(){
       assert(zondajs.__routes.config);
    });

    it('zondajs.__routes.config.namedRegex must be defined', function(){
       assert(zondajs.__routes.config.namedRegex);
    });

    it('zondajs.__routes.add must be defined', function(){
       assert(zondajs.__routes.add);
    });

    it('zondajs.__routes.add is adding routes properly', function(){
      zondajs.__routes.add('/mypath', 'GET', function(){});
      assert(zondajs.__routes.list.length > 0);     
    });

    it('zondajs.__routes.add creates route object successfully', function(){
       var r = zondajs.__routes.list[0];

       assert(r);
       assert(r.path);
       assert(r.regex);
       assert(r.method);
       assert(r.callable);
       assert(r.path == '/mypath');
       assert(r.method == 'GET');
    });

    it('zondajs.__routes.get must be defined', function(){
       assert(zondajs.__routes.get);
    });

    it('zondajs.__routes.get is getting the route if exists', function(){
       var r = zondajs.__routes.get('/mypath', 'GET');
       assert(r);
    });

    it('zondajs.__routes.get returns false if there is no matching route', function(){
       var r = zondajs.__routes.get('/nonexisting', 'GET');
       assert(!r);
    });

    it('zondajs.__routes.get returns an object with method and params properties', function(){
       // same as the add successfully
       
       var r = zondajs.__routes.get('/mypath', 'GET');

       assert(r);
       assert(r.params);
       assert(r.method);

    });

  });


  describe('Dependency Injection tests', function(){
    
    it('zondajs.__di must be defined', function(){
       assert(zondajs.__di);     
    });

    it('zondajs.__di.map must be defined', function(){
       assert(zondajs.__di.map);
    });

    it('zondajs.__di.get must be defined', function(){
       assert(zondajs.__di.get);
    });

    it('zondajs.__di.get returns the candidate if exists', function(){
       zondajs.component('testcomp',{});
       assert(zondajs.__di.get('testcomp'));     
    });

    it('zondajs.__di.get returns undefined if the candidate does not exists', function(){
       assert(typeof zondajs.__di.get('notexisting') == 'undefined');     
    });

    it('zondajs.__di.identifyParams must be defined', function(){
       assert(zondajs.__di.identifyParams);
    });

    it('zondajs.__di.identifyParams returns an array with the parameters names', function(){
       var p = zondajs.__di.identifyParams(function(foo, bar){});
       assert(p);
       assert(p.length == 2);
       assert(p[0] == 'foo');
       assert(p[1] == 'bar');

    });

    it('zondajs.__di.identifyParams ignores request and response params', function(){
       var p = zondajs.__di.identifyParams(function(request, response, foo, bar){});
       assert(p);
       assert(p.length == 2);
       assert(p[0] == 'foo');
       assert(p[1] == 'bar');
    });

    it('zondajs.__di.getDependencies must be defined', function(){
       assert(zondajs.__di.getDependencies);
    });

    it('zondajs.__di.getDependencies return an array', function(){
       var a = zondajs.__di.getDependencies(function(){});
       assert(a instanceof Array);
    });

    it('zondajs.__di.getDependencies return an object array', function(){
      var a = zondajs.__di.getDependencies(function(testcomp){});
      assert(a instanceof Array);
      assert(a[0]);
    });

    it('zondajs.__di.invoke must be defined', function(){
       assert(zondajs.__di.invoke);
    });

    it('zondajs.__di.invoke injects recursively', function(){
       zondajs.component('testcomp1', function(testcomp){
          return {
              callme : function(){
                          return testcomp;
                       }
          };
       });

       zondajs.__di.invoke(function(testcomp1){
          return testcomp1.callme();
       });

       //invoke does not return
       //if the code got here without errors 
       //is because it is working, otherwise
       //it had thrown an error on the 
       //testcomp1.callme() function call
       //
       assert(true);
    });
  });

  describe('Properties tests', function(){
    
    it('zondajs.properties must be defined', function(){
       assert(zondajs.properties);
    });

    it('zondajs.properties.map must be defined', function(){
       assert(zondajs.properties.map);
    });

    it('zondajs.properties.set must be defined', function(){
       assert(zondajs.properties.set);
    });

    it('zondajs.properties.set adds a key-value object to the map', function(){
       zondajs.properties.set('property', 'value');
       assert(zondajs.properties.map.length == 1);
    });

    it('zondajs.properties.get must be defined', function(){
       assert(zondajs.properties.get);
    });

    it('zondajs.properties.get returns the property value if the property exists', function(){
       var p = zondajs.properties.get('property');

       assert(p == 'value');
    });

    it('zondajs.properties.get returns undefined if the property does not exits', function(){
       var p = zondajs.properties.get('notexisting');
       assert(typeof p == 'undefined');     
    
    });
 
  });

  describe('Components tests', function(){
    
    it('zondajs.component must be defined', function(){
       assert(zondajs.component);     
    });

    it('zondajs.component is adding the component to the DI map', function(){
       // we have already used this function twice, for testcomp and testcomp1
       assert(zondajs.__di.map.length == 2);
    });
 
  });

  describe('Controllers tests', function(){
    
    it('zondajs.controller must be defined', function(){
       assert(zondajs.controller);
    });

    it('zondajs.controller.get must be defined', function(){
       assert(zondajs.controller.get);
    });

    it('zondajs.controller.get is adding a HTTP GET route', function(){
       zondajs.controller.get('/controllerget', function(request, response){});
       var c = zondajs.__routes.get('/controllerget', 'GET');
       assert(c);
    });

    it('zondajs.controller.post must be defined', function(){
       assert(zondajs.controller.post);
    });

    it('zondajs.controller.post is adding a HTTP POST route', function(){
       zondajs.controller.post('/controllerpost', function(request, response){});
       var c = zondajs.__routes.get('/controllerpost', 'POST');
       assert(c);
    });

    it('zondajs.controller.put must be defined', function(){
       assert(zondajs.controller.put);
    });

    it('zondajs.controller.put is adding HTTP PUT route', function(){
       zondajs.controller.put('/controllerput', function(request, response){});
       var c = zondajs.__routes.get('/controllerput', 'PUT');
       assert(c);
    });

    it('zondajs.controller.del must be defined', function(){
       assert(zondajs.controller.del);
    });

    it('zondajs.controller.del is adding a HTTP DELETE route', function(){
       zondajs.controller.del('/controllerdel', function(request, response){});
       var c = zondajs.__routes.get('/controllerdel', 'DELETE');
       assert(c);
    });

  });

  describe('Middleware tests', function(){
    
    it('zondajs.middleware must be defined', function(){
       assert(zondajs.middleware);
    });

    it('zondajs.middleware.list must be defined', function(){
       assert(zondajs.middleware.list);
    });

    it('zondajs.middleware.use must be defined', function(){
       assert(zondajs.middleware.use);
    });

    it('zondajs.middleware.use is adding the passed param to the middleware list', function(){
       zondajs.middleware.use(function(request, response, next){next(request, response);});
       assert(zondajs.middleware.list.length == 1);
    });

  });

  describe('Loader tests', function(){
    
    it('zondajs.load must be defined', function(){
       assert(zondajs.load);
    });
  });

  describe('Enhancements tests', function(){

    it('zondajs.enhancements must be defined', function(){
       assert(zondajs.enhancements);
    });

    it('zondajs.enhancements.response must be defined', function(){
       assert(zondajs.enhancements.response);
    });

    it('zondajs.enhancements.response.render must be defined', function(){
       assert(zondajs.enhancements.response.render);
    });

    it('zondajs.enhancements.response.redirect must be defined', function(){
       assert(zondajs.enhancements.response.redirect);
    });

    it('zondajs.enhancements.response.sendFile must be defined', function(){
       assert(zondajs.enhancements.response.sendFile);
    });

    it('zondajs.enhancements.response.sendJSON must be defined', function(){
       assert(zondajs.enhancements.response.sendJSON);
    });

    it('zondajs.enhancements.response.sendError must be defined', function(){
       assert(zondajs.enhancements.response.sendError);
    });

    it('zondajs.enhancements.run must be defined', function(){
        assert(zondajs.enhancements.run);
    });

  });

  describe('Dispatcher tests', function(){
    
    it('zondajs.dispatcher must be defined', function(){
        assert(zondajs.dispatcher);     
    });

    it('zondajs.dispatcher.run must be defined', function(){
        assert(zondajs.dispatcher.run);
    });

    it('zondajs.dispatcher.runNext must be defined', function(){
        assert(zondajs.dispatcher.runNext);
    });

    it('zondajs.dispatcher.dispatch must be defined', function(){
        assert(zondajs.dispatcher.dispatch);
    });
  });

  describe('App starter tests', function(){
    
    it('zondajs.startApp must be defined', function(){
        assert(zondajs.startApp);     
    });
  });
});
