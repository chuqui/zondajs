var app = require('zondajs');

app.controller.get('/', function(request, response, messageService){
    messageService.print();

    response.render('demo.ejs', {
      title: 'Demo App'
    });
});

