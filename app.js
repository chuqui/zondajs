// ignore this file, it's only used for quick concept testing
// this file will get deleted

var app = require('./zondajs');

console.log("Application started");

app.component('mensaje', {
    hola: 'hola',
    otro: 'mundo'
});

app.component('messageService', function(mensaje){
    return {
        print: function(){
            console.log('---- service ----'+mensaje.otro);
        }
    };
});

app.controller.get('/', function(request, response, messageService){
    console.log('in the controller /');
    messageService.print();
    response.end("hola juan");
});

app.controller.get('/hola', function(request, response, messageService, mensaje){
    console.log('in the controller /');
    messageService.print();
});

app.controller.get('/hola/:hola/:name', function(request, response, messageService, mensaje){
    console.log('in the controller /');
    messageService.print();
    console.log(request.params.hola + " " + request.params.name);
});


app.startApp(8080);

