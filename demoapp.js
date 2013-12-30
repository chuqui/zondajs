// ignore this file, it's only used for quick concept testing
// this file will get deleted

var app = require('./zondajs');

console.log("Application started");

app.load('./components', function(name, req){
  console.log('component file loaded: \t'+name);
});
app.load('./controllers', function(name, req){
  console.log('Controller file loaded: \t'+name);
});

app.startApp(8080);

