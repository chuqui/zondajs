var app = require('./zondajs');

zondajs.load('./middleware', function(name, mid){
  zondajs.middleware.use(mid);
});

app.load('./components', function(name, req){
  console.log('component file loaded: \t'+name);
});
app.load('./controllers', function(name, req){
  console.log('Controller file loaded: \t'+name);
});

app.startApp(8080);

