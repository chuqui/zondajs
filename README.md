ZondaJS
=======

ZondaJS is node.js web framework for building web apps.

Some of it's features include:
- MVC
- Dependency Injection
- Simple yet Powerful
- It doesn't pick for you any library.

TO-DO
-----

- [x] Dependency Injection
- [x] Routing
- [x] Middleware
- [x] Folder loader
- [x] Controllers
- [x] Settings/Properties
- [x] Params parsing (GET/URL routing)
- [ ] Params parsing (POST/Multipart)
- [x] Views
- [ ] Upload
- [ ] Favicon
- [ ] Sessions
- [ ] Request object (Raw request with handy methods/properties)
- [-] Response object (Raw response with handy methods/properties)
- [-] Error handler
- [ ] Custom error pages


REF: 
- [x] Finished
- [-] In Progress
- [ ] Not implemented yet.


How To
------

<b>Load your code folders</b>

```javascript
var app = require('./zondajs');
app.load('./myfolder', function(name, mylib){
  //do something with the loaded library
});

```
Notice that all the .js files in 'myfolder' will be required. The index.js is ignored.

*Expected callback should be like*
```javascript
var app = require('./zondajs');
var myObjs = {};
app.load('./myobjects', function(name, myobject){
  myObjs[name] = myobject;
});

// then use the loaded objects as myObjs.my_loaded_object_file_name.someFunction()

```
Notice that all the .js files in the 'myControllers' folder will be required. The index.js is ignored.

<b>Set/Use properties</b>

Properties is a dead-simple way to store and retrieve configurations.

```javascript
var app = require('./zondajs');
// set a string
app.properties.set('environment', 'production');

// or an object
app.properties.set('config', {
  db: 'mongodb',
  host: '127.0.0.1',
  otherProperty: 5
});

// then use them
var env = app.properties.get('environment');
console.log(env);  // prints environment

var config = app.properties.get('config');
console.log(config.db);  // prints mongodb
```

<b>Add middleware</b>

Middleware will get ran for every request, before the controller is called. It receives the request and response objects, so you can check for any state you want and perform your operations so the controller get the data already processed.

```javascript
var app = require('./zondajs');

// Example of a site under construction middleware
app.middleware.use(function(request, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Under construction!");
  response.end();
});
```

<b>Dependency Injection</b>

ZondaJS handles dependency injection under the 'component' word. It's cappable of doing recursive injection if needed.

```javascript
var app = require('./zondajs');

// Create a candidate object for dependency injection
app.component('config', {
    message: 'Hello World',
    framework: 'ZondaJS'
});

// Create a second candidate for dependency injection. This time
// it's a function having parameters, so the config param 
// will be injected on runtime.
app.component('messageService', function(config){
    // function return the object to be injected.
    return {
        // define a function to be called
        print: function(){
            console.log(config.message + " from " + config.framework);
        }
    };
});

// Create a controller mapped to the '/' url and the GET method.
// Is mandatory for controllers to receive request and response.
// Notice that we are also injecting the messageService
app.controller.get('/', function(request, response, messageService){
    // call the injected service's print function
    messageService.print();
    
    // just ending
    response.end("Ending this...");
});

// Start the app
app.startApp(8080);

// On console, it prints: 'Hello World from ZondaJS'
```

<b>Create a controller</b>

In ZondaJS you can create controllers in as many separated files as you like. You only need to load them before starting the App.

```javascript
var app = require('./zondajs');


// Creates a controller that mapped in / when usign the GET HTTP method.
app.controller.get('/', function(request, response){
    // By default, renders the second parameter in to views/demo.ejs template.
    // You can modify the response middleware to use the templating engine you like.
    response.render('demo.ejs', {
      title: 'Demo App',
      property1: 'hello',
      property2: 'world'
    });
});
```




API Docs
--------
