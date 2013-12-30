var app = require('../zondajs');


// you can have objects as components if you 
// don't need to inject any dependency to them
app.component('message', {
    hello: 'hello world'
});

// if you need to inject a dependency, you need 
// to create a function and return an object
app.component('messageService', function(message){
    return {
        print: function(){
            console.log('Message from the service using dependency injection: ' + message.hello);
        }
    };
});


