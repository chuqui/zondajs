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
       assert(false);     
    });

    it('zondajs.__routes.add creates route object successfully', function(){
       assert(false);     
    });

    it('zondajs.__routes.get must be defined', function(){
       assert(zondajs.__routes.get);
    });

    it('zondajs.__routes.get is getting the route if exists', function(){
       assert(false);
    });

    it('zondajs.__routes.get returns false if there is no matching route', function(){
       assert(false);
    });

    it('zondajs.__routes.get returns an object with method and params properties', function(){
       assert(false);     
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
       assert(false);     
    });

    it('zondajs.__di.get returns undefined if the candidate does not exists', function(){
       assert(false);     
    });

    it('zondajs.__di.identifyParams must be defined', function(){
       assert(zondajs.__di.identifyParams);
    });

    it('zondajs.__di.identifyParams returns an array with the parameters names', function(){
       assert(false);
    });

    it('zondajs.__di.identifyParams ignores request and response params', function(){
       assert(false);
    });

    it('zondajs.__di.getDependencies must be defined', function(){
       assert(zondajs.__di.getDependencies);
    });

    it('zondajs.__di.getDependencies return an array', function(){
       assert(false);     
    });

    it('zondajs.__di.getDependencies return an object array', function(){
       assert(false);     
    });

    it('zondajs.__di.invoke must be defined', function(){
       assert(zondajs.__di.invoke);
    });

    it('zondajs.__di.invoke injects recursively', function(){
       assert(false);     
    });

    it('zondajs.__di.invoke ignores injection of the hooks array params', function(){
       assert(false);     
    });

    it('zondajs.__di.invoke calling without hooks param', function(){
       assert(false);     
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
       assert(false);     
    });

    it('zondajs.properties.get must be defined', function(){
       assert(zondajs.properties.get);
    });

    it('zondajs.properties.get returns the property value if the property exists', function(){
       assert(false);     
    });

    it('zondajs.properties.get returns undefined if the property does not exits', function(){
       assert(false);     
    
    });
 
  });

  describe('Components tests', function(){
    
    it('zondajs.component must be defined', function(){
       assert(zondajs.component);     
    });

    it('zondajs.component is adding the component to the DI map', function(){
       assert(false);     
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
       assert(false);     
    });

    it('zondajs.controller.post must be defined', function(){
       assert(zondajs.controller.post);
    });

    it('zondajs.controller.post is adding a HTTP POST route', function(){
       assert(false);     
    });

    it('zondajs.controller.put must be defined', function(){
       assert(zondajs.controller.put);
    });

    it('zondajs.controller.put is adding HTTP PUT route', function(){
       assert(false);     
    });

    it('zondajs.controller.del must be defined', function(){
       assert(zondajs.controller.del);
    });

    it('zondajs.controller.del is adding a HTTP DELETE route', function(){
       assert(false);     
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
       assert(false);     
    });

  });

  describe('Loader tests', function(){
    
    it('zondajs.load must be defined', function(){
       assert(zondajs.load);
    });

    it('zondajs.load is requiring each file for the given folder', function(){
       assert(false);     
    });

    it('zondajs.load callback is called for each file found', function(){
       assert(false);     
    });

    it('zondajs.load index.js is ignored', function(){
       assert(false);     
    });

    it('zondajs.load only *.js files are required', function(){
       assert(false);     
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

    it('zondajs.enhancements.response.render is rendering properly', function(){
       assert(false);     
    });

    it('zondajs.enhancements.response.redirect must be defined', function(){
       assert(zondajs.enhancements.response.redirect);
    });

    it('zondajs.enhancements.response.redirect actually redirects', function(){
       assert(false);     
    });

    it('zondajs.enhancements.response.sendFile must be defined', function(){
       assert(zondajs.enhancements.response.sendFile);
    });

    it('zondajs.enhancements.response.sendFile is answering with the file', function(){
       assert(false);     
    });

    it('zondajs.enhancements.response.sendFile is only sending files located at the static folder', function(){
       assert(false);     
    });
    
    it('zondajs.enhancements.response.sendFile is setting the appropieate mime content-type', function(){
       assert(false);     
    });

    it('zondajs.enhancements.response.sendJSON must be defined', function(){
       assert(zondajs.enhancements.response.sendJSON);
    });

    it('zondajs.enhancements.response.sendJSON is converting the provided object to string', function(){
       assert(false);     
    });

    it('zondajs.enhancements.response.sendJSON is setting content-type application/json', function(){
       assert(false);     
    });

    it('zondajs.enhancements.response.sendError must be defined', function(){
       assert(zondajs.enhancements.response.sendError);
    });

    it('zondajs.enhancements.response.sendError is rendering the appropiate error file', function(){
        assert(false);      
    });

    it('zondajs.enhancements.response.sendError is setting the appropiate status header', function(){
        assert(false);     
    });
    
    it('zondajs.enhancements.run must be defined', function(){
        assert(zondajs.enhancements.run);
    });

    it('zondajs.enhancements.run is loading the methods into the request/response', function(){
        assert(false);     
    });


  });

  describe('Dispatcher tests', function(){
    
    it('zondajs.dispatcher must be defined', function(){
        assert(zondajs.dispatcher);     
    });

    it('zondajs.dispatcher.run must be defined', function(){
        assert(zondajs.dispatcher.run);
    });

    it('zondajs.dispatcher.run start the callback calling process', function(){
        assert(false);
    });

    it('zondajs.dispatcher.runNext must be defined', function(){
        assert(zondajs.dispatcher.runNext);
    });

    it('zondajs.dispatcher.runNext calls the next item in the execution queue', function(){
        assert(false);     
    });

    it('zondajs.dispatcher.dispatch must be defined', function(){
        assert(zondajs.dispatcher.dispatch);
    });

    it('zondajs.dispatcher.dispatch initializes the execution queue if the controller is found', function(){
        assert(false);     
    });

    it('zondajs.dispatcher.dispatch sends a 404 if the controller is not defined', function(){
        assert(false);     
    });

  });

  describe('App starter tests', function(){
    
    it('zondajs.startApp must be defined', function(){
        assert(zondajs.startApp);     
    });

    it('zondajs.startApp creates a server on the given port', function(){
        assert(false);     
    });

  });
});
