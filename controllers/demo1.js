var app = require('../zondajs');
var fs = require('fs');
var _ = require('underscore');
var utils = require('util');

app.controller.get('/hola', function(request, response, messageService){
    messageService.print();

    response.render('demo.ejs', {
      title: 'Demo App'
    });
});

app.controller.get('/upload/:juan', function(request, response){

  console.log('juan: '+ request.params.juan);

  response.render('demo.ejs', {
    title: 'Upload Demo'
  });
});
