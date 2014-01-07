var assert = require("assert")

describe('Runung zondajs tests', function(){
  describe('Router tests', function(){
    it('zondajs.__router must be defined', function(){
     
    });

    it('zondajs.__router.list must be defined', function(){
     
    });

    it('zondajs.__router.config must be defined', function(){
     
    });

    it('zondajs.__router.config.namedRegex must be defined', function(){
     
    });

    it('zondajs.__router.add must be defined', function(){
     
    });

    it('zondajs.__router.add is adding routes properly', function(){
     
    });

    it('zondajs.__router.add creates route object successfully', function(){
     
    });

    it('zondajs.__router.get must be defined', function(){
     
    });

    it('zondajs.__router.get is getting the route if exists', function(){
     
    });

    it('zondajs.__router.get returns false if there is no matching route', function(){
     
    });

    it('zondajs.__router.get returns an object with method and params properties', function(){
     
    });

  });


  describe('Dependency Injection tests', function(){
    
    it('zondajs.__di must be defined', function(){
     
    });

    it('zondajs.__di.map must be defined', function(){
     
    });

    it('zondajs.__di.get must be defined', function(){
     
    });

    it('zondajs.__di.get returns the candidate if exists', function(){
     
    });

    it('zondajs.__di.get returns undefined if the candidate does not exists', function(){
     
    });

    it('zondajs.__di.identifyParams must be defined', function(){
     
    });

    it('zondajs.__di.identifyParams returns an array with the parameters names', function(){
     
    });

    it('zondajs.__di.identifyParams ignores request and response params', function(){
     
    });

    it('zondajs.__di.getDependencies must be defined', function(){
     
    });

    it('zondajs.__di.getDependencies return an array', function(){
     
    });

    it('zondajs.__di.getDependencies return an object array', function(){
     
    });

    it('zondajs.__di.invoke must be defined', function(){
     
    });

    it('zondajs.__di.invoke injects recursively', function(){
     
    });

    it('zondajs.__di.invoke ignores injection of the hooks array params', function(){
     
    });

    it('zondajs.__di.invoke calling without hooks param', function(){
     
    });


  });

  describe('Properties tests', function(){
    
    it('zondajs.properties must be defined', function(){
     
    });
    it('zondajs.properties.map must be defined', function(){
     
    });

    it('zondajs.properties.set must be defined', function(){
     
    });

    it('zondajs.properties.set adds a key-value object to the map', function(){
     
    });

    it('zondajs.properties.get must be defined', function(){
     
    });

    it('zondajs.properties.get returns the property value if the property exists', function(){
     
    });

    it('zondajs.properties.get returns undefined if the property does not exits', function(){
     
    });
 
  });

  describe('Components tests', function(){
    
    it('zondajs.component must be defined', function(){
     
    });
    it('zondajs.component is adding the component to the DI map', function(){
     
    });
 
  });

  describe('Controllers tests', function(){
    
    it('zondajs.controllers must be defined', function(){
     
    });

    it('zondajs.controllers.get must be defined', function(){
     
    });

    it('zondajs.controllers.get is adding a HTTP GET route', function(){
     
    });

    it('zondajs.controllers.post must be defined', function(){
     
    });

    it('zondajs.controllers.post is adding a HTTP POST route', function(){
     
    });

    it('zondajs.controllers.put must be defined', function(){
     
    });

    it('zondajs.controllers.put is adding HTTP PUT route', function(){
     
    });

    it('zondajs.controllers.del must be defined', function(){
     
    });

    it('zondajs.controllers.del is adding a HTTP DELETE route', function(){
     
    });

  });

  describe('Middleware tests', function(){
    
    it('zondajs.middleware must be defined', function(){
     
    });

    it('zondajs.middleware.list must be defined', function(){
     
    });

    it('zondajs.middleware.use must be defined', function(){
     
    });

    it('zondajs.middleware.use is adding the passed param to the middleware list', function(){
     
    });

  });

  describe('Loader tests', function(){
    
    it('zondajs.load must be defined', function(){
     
    });

    it('zondajs.load is requiring each file for the given folder', function(){
     
    });

    it('zondajs.load callback is called for each file found', function(){
     
    });

    it('zondajs.load index.js is ignored', function(){
     
    });

    it('zondajs.load only *.js files are required', function(){
     
    });

  });

  describe('Enhancements tests', function(){

    it('zondajs.enhancements must be defined', function(){
     
    });

    it('zondajs.enhancements.response must be defined', function(){
     
    });

    it('zondajs.enhancements.response.render must be defined', function(){
     
    });

    it('zondajs.enhancements.response.render is rendering properly', function(){
     
    });

    it('zondajs.enhancements.response.redirect must be defined', function(){
     
    });

    it('zondajs.enhancements.response.redirect actually redirects', function(){
     
    });

    it('zondajs.enhancements.response.sendFile must be defined', function(){
     
    });

    it('zondajs.enhancements.response.sendFile is answering with the file', function(){
     
    });

    it('zondajs.enhancements.response.sendFile is only sending files located at the static folder', function(){
     
    });
    
    it('zondajs.enhancements.response.sendFile is setting the appropieate mime content-type', function(){
     
    });

    it('zondajs.enhancements.response.sendJSON must be defined', function(){
     
    });

    it('zondajs.enhancements.response.sendJSON is converting the provided object to string', function(){
     
    });

    it('zondajs.enhancements.response.sendJSON is setting content-type application/json', function(){
     
    });

    it('zondajs.enhancements.response.sendError must be defined', function(){
     
    });

    it('zondajs.enhancements.response.sendError is rendering the appropiate error file', function(){
     
    });

    it('zondajs.enhancements.response.sendError is setting the appropiate status header', function(){
     
    });
    
    it('zondajs.enhancements.run must be defined', function(){
     
    });

    it('zondajs.enhancements.run is loading the methods into the request/response', function(){
     
    });


  });

  describe('Dispatcher tests', function(){
    
    it('zondajs.dispatcher must be defined', function(){
     
    });

    it('zondajs.dispatcher.run must be defined', function(){
     
    });

    it('zondajs.dispatcher.run start the callback calling process', function(){
     
    });

    it('zondajs.dispatcher.runNext must be defined', function(){
     
    });

    it('zondajs.dispatcher.runNext calls the next item in the execution queue', function(){
     
    });

    it('zondajs.dispatcher.dispatch must be defined', function(){
     
    });

    it('zondajs.dispatcher.dispatch initializes the execution queue if the controller is found', function(){
     
    });

    it('zondajs.dispatcher.dispatch sends a 404 if the controller is not defined', function(){
     
    });

  });

  describe('App starter tests', function(){
    
    it('zondajs.startApp must be defined', function(){
     
    });

    it('zondajs.startApp creates a server on the given port', function(){
     
    });

  });
});
