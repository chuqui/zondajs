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
