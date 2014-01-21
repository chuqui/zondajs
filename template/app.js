var app = require('zondajs');

app.loader.load('./middleware', function(name, middleware){
  var m = require(middleware);
  app.middleware.use(m);
  console.log('Middleware loaded: ' + name);
});

app.loader.load('./components', function(name, component){
  var c = require(component);
  console.log('Component loaded: \t'+name);
});

app.loader.load('./controllers', function(name, controller){
  var c = require(controller);
  console.log('Controller loaded: \t'+name);
});

app.startApp(8080);