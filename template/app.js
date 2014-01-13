var app = require('zondajs');

app.load('./middleware', function(name, middleware){
  zondajs.middleware.use(middleware);
  console.log('Middleware loaded: ' + name);
});

app.load('./components', function(name, req){
  console.log('Component loaded: \t'+name);
});

app.load('./controllers', function(name, req){
  console.log('Controller loaded: \t'+name);
});

app.startApp(8080);

