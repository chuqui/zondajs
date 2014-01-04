var app = require('../zondajs');
var fs = require('fs');
var _ = require('underscore');
var utils = require('util');

app.controller.get('/', function(request, response, messageService){
    messageService.print();

    response.render('demo.ejs', {
      title: 'Demo App'
    });
});

app.controller.post('/upload', function(request, response){

  console.log(request.params);
  console.log(request.files);

  response.render('demo.ejs', {
    title: 'Upload Demo'
  });
});

app.controller.get('/cookies', function(request, response){
  var mycookie = request.cookies.get('mycookie');
  var signed = request.cookies.get('signed');

  console.log(utils.inspect(mycookie));
  console.log(utils.inspect(signed));
  response.end('done');
});

app.controller.get('/setcookies', function(request, response){
  request.cookies.set('mycookie', 'this is the value!!');
  request.cookies.set('signed', 'this is ths signed cookie value!!', {signed:true});
  response.end('done');
});

app.controller.get('/redirecttest', function(request, response){
  response.redirect('/');
});
