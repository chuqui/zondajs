var app = require('zondajs');

app.load('./middleware', function(name, middleware){
  var m = require(middleware);
  app.middleware.use(m);
  console.log('Middleware loaded: ' + name);
});

app.load('./components', function(name, component){
  var c = require(component);
  console.log('Component loaded: \t'+name);
});

app.load('./controllers', function(name, controller){
  var c = require(controller);
  console.log('Controller loaded: \t'+name);
});

app.startApp(8080);

