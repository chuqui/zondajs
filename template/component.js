var app = require('zondajs');

app.component('message', {
    hello: 'hello world'
});

app.component('messageService', function(message){
    return {
        print: function(){
            console.log('Message from the service using dependency injection: ' + message.hello);
        }
    };
}); 


