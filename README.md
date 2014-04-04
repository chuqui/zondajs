## ZondaJS 

ZondaJS is node.js web framework for building web apps.

[![Build Status](https://travis-ci.org/chuqui/zondajs.png?branch=master)](https://travis-ci.org/chuqui/zondajs) [![Dependency Status](https://david-dm.org/chuqui/zondajs.png?theme=shields.io)](https://david-dm.org/chuqui/zondajs)

For a better experience, read this doc at http://documentup.com/chuqui/zondajs

### Introduction
Zonda is a <b>powerful</b>, <b>dry</b> wind.
ZondaJS starts as a project to support an startup I'm working. I needed a couple of features for it, such us:

* <b>Small footprint.</b> You know, if you are responsible for a project, you need to know every detail on what you are usign. Having a small footprint allows you to know whats happening without becoming crazy or spending hours or even days reading code.
* <b>Customizable.</b> I want to be able, without pain, to use the what I want to use and not what the framework makes me use.
* <b>Skeleton oriented.</b> I don't want to have 1 big .js file with all the controllers nor being requiring a lot of files.
* <b>Component oriented.</b> I really like having architecture. Having Controllers, Services, DTOs, Mappers, Models etc, etc.. will allow to find & fix issues and scale much faster.
* <b>Simple to use.</b> I wanted something declarative and well organized, without "magic" behind.
* <b>API cappable.</b> Support for building REST services without pain.
* <b>Though for big projects.</b> The way it works and the set of features makes it ideal for big projects.

### Features

* MVC.
* Dependency Injection.
* Component oriented.
* Skeleton oriented.
* Properties support.
* Customizable middleware.
* Serve static files.
* REST support.
* Cookies support, also with signed cookies.
* Dead-Simple

### TO-DO

* Session middleware (using existing cookies support)
* Clean up and publish on NPM repo
* <b>Important! REDO the dependency injection feature, as it doesn't provide a way to run on minified/uglyfied code.</b>

### Dependencies

<b>Node versions</b>

* node @ >=0.8.x

<b>Dependencies</b>

* underscore@1.5.2
* swig@~1.3.2
* formidable@1.0.14
* cookies@0.3.8
* keygrip@1.0.0
* mime@1.2.11

<b>Test dependencies</b>

* mocha@1.16.2

### Hello World

Say hello to our Hello World app example.

```javascript
var app = require('zondajs');

app.controller.get('/', function(request, response){
    response.end("Hello World");
});

app.startApp(8080);
```

Ok, Ok, the hardcoded "Hello World" strings looks really bad. So..
```javascript
var app = require('zondajs');

app.properties.set('greetings', "Hello World");

app.controller.get('/', function(request, response){
    response.end(app.properties.get('greetings'));
});

app.startApp(8080);
```

Or even imagine it comes from a Service (using dependency injection):

```javascript
var app = require('zondajs');

app.component('messageService', 
	{
		getGreeting : function(){
			return "Hello World":
		}
	}
);

app.controller.get('/', function(request, response, messageService){
    response.end(messageService.getGreeting());
});

app.startApp(8080);
```

## Topics
### Installation

Not available right now.
It'll be available on the npm repo soon... ;)

### Project Creation

Just run the zondajs command and it will drive you to the creation process.

```sh
$ zondajs
```

The command will ask you some basic data to build a default package.json file.
It will ask:

* Project name
* Project description 
* Author

After the project is created, you can start it by running

```sh
$ node app.js
```
And open a browser at http://localhost:8080

### Execution Flow

The following happens in ZondaJs when a request get to the server:

* The raw Node [request](#api-docs/request) and [response](#api-docs/response) objects are enhanced.
* The URL is parsed with the [node url module](http://nodejs.org/api/url.html).
* Zonda looks for a [controller](#api-docs/controllers), based on the requested URL and method.
* The [components](#api-docs/components) are injected recursively, if any.
* The [route](#topics/routing) named params are extracted and added to the request.params object.
* The query string params are added to the request.params object.
* All the [middleware](#api-docs/middleware) are ran. Without any default order.
* The [controller](#api-docs/controllers) is ran.
* The [response](#api-docs/response) is sent. Once the first step is completed, any other step has access to the [rendering](#topics/rendering), in order to send errors, redirections, files, etc.

### Dependency Injection

By Wikipedia: Dependency injection is a software design pattern that allows the removal of hard-coded dependencies and makes it possible to change them, whether at run-time or compile-time.

In ZondaJS, dependency injection is implemented by a key-object set, and triggered by the dispatcher when a [controller](#api-docs/controllers) that matches the requested URL is found.

You can set a new candidate component for dependency injection by usign the [ZondaJS's component object](#api-docs/components).

This way, you don't need to rewrite or repeat code. You only need to write it once as component and then, inject it whereever you need it.

### Middleware

Middleware are functions that get ran for every request, before the controller method is called.

Middleware is really usefull to prepare the request and response objects for your need.

As you have access to the full [request](#api-docs/request) and [response](#api-docs/response) objects, you can also render, redirect, validate, write a file, return an error page and any other task you could imagine doing.

### Routing

Routing in ZondaJS is pretty simple. It supports the GET, POST, PUT and DELETE HTTP methods.

You can match the exact url by typing it in your controller or use wildcards with the :name format.

```javascript
app.controller.get('/', function(request, response){response.end();});
// matches url / and only for GET requests
app.controller.post('/', function(request, response){response.end();});
// matches the / url only for POST requests

app.controller.get('/:all', function(request, response){response.end();});
// matches: 
//  /product
//  /product/12
//  /product/shoes/the-shoes-i-like

app.controller.get('/product/:id', function(request, response){response.end();});
// matches: 
//  /product/12
//  /product/shoes/the-shoes-i-like
// it does not match:
//  /product
//  /product/
//  /anyother

app.controller.get('/product/:category/:id', function(request, response){response.end();});
// matches
//  /product/shoes/12
//  /product/beers/frozen
// doesn't match
//  /product/beer
//  /product

```
And so on.
An important feature is that you can access that named value from your request.
```javascript
app.controller.get('/product/:category/:id', function(request, response){
  console.log(request.params.category);
  console.log(request.params.id)
  response.end();
});

```

### Rendering

By default, ZondaJS uses SWIG for rendering. Read more on the SWIG templating engine on http://paularmstrong.github.io/swig/

You can render at any point of the execution, actually after the step 1 (See execution flow),  and there are a couple of handy methods:

```javascript
var data = {
  title: 'Rendering',
  animals: [
    "Dog",
    "Cat",
    "Monkey"
  ]
};
response.render('mytemplate', data);
// renders the data object into the provided template

response.sendError(404);
// renders the 404 custom error page

response.sendJSON(data);
// returns the data serialized with JSON format and content-type.

```

<b>Modifying the default rendering engine.</b>

Anyways, you can override the zondajs.enhancements.response object to use the rendering engine you like. This would be like:
```javascript
app.enhancements.response.render = function(response){
  return function(template, data){
    // Do your rendering stuff
  };
};

app.enhancements.response.sendError = function(response){
  return function(code){
    //do your rendering stuff here
    //in this case, we need to fetch the templates from /views/errors/
  };
};
```

### Loader

ZondaJS comes with a load function that enables you yo load dinamically your project files.

The loader is not actually a loader but a file indexer, so when you load a folder, it will call you callback function giving it the complete relative path to the .js files in it (require ready path). Then you can decide if require them or not.

```javascript
app.loader.load('./controllers', function(name, filepath){
  console.log(name + ' controller about to be loaded');
  require(filepath);
  console.log(name + ' loaded');
});

```

### Custom Error Pages

ZondaJS supports Custom Error pages. When you create a ZondaJS project you will find a views/errors folder in your project path.
Error pages are plain HTML pages, with no binding or templating. This ensures you can send an error and render the error page from any point within your application.

By default, we include 3 (really simple) error pages.

* 400.html
* 404.html
* 500.html

Of course, you can add more pages and customize their contents in order to make them match your branding/ideas.

### Static files

We highly recommend to serve static files from CDN or having apache, nginx, cherokee or the server you like for doing this tasks.

Anyways, in order to let you run faster, we included a middleware called "static" which serve the files placed on the static folder.

## API Docs

I really encourage you to read the code, it has comments for every object created. You will end up with a much better understanding of the framework than by looking at the provided functions.

<b>Conventions for this docs</b>

The following function 'functionName' return undefined and takes parameter1 and parameter2 as it's parameters

<b>functionName(parameter1, parameter2)</b>

The following function 'functionName' return an object and takes parameter1 as it's parameters

<b>object: functionName(parameter1)</b>



### Components

<b>app.component(componentName, componentImplementation)</b>
Where:

* <b>componentName</b> is the name or key used to inject the component.
* <b>componentImplementation</b> is the object to be returned. See below more on functions.

```javascript
// lets start with a really simple component called "simpleComponent"
app.component('simpleComponent', {
  greeting : "Hello world!"
});

// lets make this component a bit smarter
app.component('simpleComponentSmarter', {
  greeting : "Hello world!"
  sayHello: function(){
    console.log(this.greeting);
  }
});

/** 
 * We have been creating components by declaring them as objects, but there is a
 * really powerfull feature here.
 * 
 * We can inject an existing component to another component!
 * In that case, we need to use a function which returns the actual object
 */

// We set an existing component name as parameter
app.component('greetingMessage', function(simpleComponent){
  return {
    sayHello: function(){
      // then we can just use it
      console.log(simpleComponent.greeting);
    }
  };
});

```

So, <b>Why we need to return an object?</b>

When the dispatcher start injecting the dependencies, it will run the component by providing it's parameters and use the result to be injected as object.
Then, ZondaJS does not inject functions, but only inject objects.

### Properties

<b>app.properties.set(key, value)</b>
Where:

* <b>key</b> is the key used to identify the property value.
* <b>value</b> is the object returned when the property key is fetched.

```javascript
// set a string
app.properties.set('greetings', "Hello World");

// set an object
app.properties.set('config', {
  port: 8080,
  version: '@1.0.1'
});

//since functions are objects...
app.properties.set('myWeirdFunction', function(){
  console.log('I should be a bad practice, but I am still possible');
});
```

<b>object : app.properties.get(key, value)</b>
Where:

* <b>key</b> is the key of the property you want to get.

If no property is found for the given key, undefined will be returned instead.
```javascript
app.properties.get('greetings'); // "Hello World"

app.properties.get('myWeirdFunction')(); // outputs 'I should be a bad practice, but I am still possible'

app.properties.get('typoedName'); // undefined
```

### Loader

<b>app.loader.load(path, callback)</b>
Where:

* <b>path</b> is the relative route to the folder you want to index.
* <b>callback</b> is function that receives 2 params.

* <b>callback(name, relativePath)</b>
*   name is the file name (e.g. cookies)
*   relativePath is the require ready path to the file (e.g. './components/cookies.js')

As seen before, the loader is not actually a loader but a file indexer, so when you load a folder, it will call you callback function giving it the complete relative path to the .js files in it (require ready path). Then you can decide if require them or not.

```javascript
app.loader.load('./controllers', function(name, filepath){
  console.log(name + ' controller about to be loaded');
  require(filepath);
  console.log(name + ' loaded');
});

// another kind of loader to save everything into an object
var myStuff = {};
app.loader.load('./myStuff', function(name, filepath){
  console.log(name + ' controller about to be loaded');
  myStuff[name] = require(filepath);
  console.log(name + ' loaded');
});

// then you can access it by doing something like:
myStuff.myModule.myFunction();

```

### Controllers

The app.controllers object let you add controllers based on the method you want to map. All the functions in the mentioned object receive 2 parameters, the path and the controller implementation. 

Basically, they add the controller to the routes array with the data required to be mapped and ran when a server request match the route.

<b>A HTTP GET controller</b>

<b>app.controller.get(path, controllerImplementation)</b>
Where:

* <b>path</b> is the controller path where the controller implementation will be mapped to.
* <b>controllerImplementation</b> is function that receives at least 2 params, request and response. If it receives more parameters, they will be injected based on the parameter name

```javascript
app.controller.get('/', function(request, response){
  response.end('GET /');
});
```

<b>A HTTP POST controller</b>

<b>app.controller.post(path, controllerImplementation)</b>
Where:

* <b>path</b> is the controller path where the controller implementation will be mapped to.
* <b>controllerImplementation</b> is function that receives at least 2 params, request and response. If it receives more parameters, they will be injected based on the parameter name

```javascript
app.controller.post('/', function(request, response){
  response.end('POST /');
});
```

<b>A HTTP PUT controller</b>

<b>app.controller.put(path, controllerImplementation)</b>
Where:

* <b>path</b> is the controller path where the controller implementation will be mapped to.
* <b>controllerImplementation</b> is function that receives at least 2 params, request and response. If it receives more parameters, they will be injected based on the parameter name

```javascript
app.controller.put('/', function(request, response){
  response.end('PUT /');
});
```

<b>A HTTP DELETE controller</b>

<b>app.controller.del(path, controllerImplementation)</b>
Where:

* <b>path</b> is the controller path where the controller implementation will be mapped to.
* <b>controllerImplementation</b> is function that receives at least 2 params, request and response. If it receives more parameters, they will be injected based on the parameter name

```javascript
app.controller.del('/', function(request, response){
  response.end('DELETE /');
});
```

### Views

ZondaJS uses SWIG for views. Check the SWIG site for more info. See http://paularmstrong.github.io/swig/

You can always modify it to use the rendering engine you like. See Rendering section above.

### Middleware

Middlewares are functions that are going to be ran for every request.

Middleware have access to the request and response object, both for reading and writing purpose.

When a middleware is done doing its activity, it must call a callback function, passing the request and response objects.

Adds a middleware

<b>app.middleware.use(middlewareFunction)</b>
Where:

* <b>middlewareFunction</b> is the function that implement the middleware functionality.

Also, <b>middlewareFunction</b> is expected to be like:

<b>function(request, response, next)</b>
Where:

* <b>request</b> is current request object.
* <b>response</b> is current response object.
* <b>next</b> is the callback function to be called when the middleware has ended doing it's tasks. It receives the request and response objects.


```javascript
// Dummy middleware
app.middleware.use(function(request, response, next){
  if(request.method === 'GET'){
	console.log('got a get baby');
  }
  next(request, response);
});


// add cookies support using the cookies and keygrip libraries
var cookies = require('cookies');
var keygrip = require('keygrip');

// change these passwords
keys = keygrip(['&083#$%^df8', 'Nk]L2E3Lmk', '65[5AyE3%'], 'sha256', 'hex');

var cookiesMiddleware = function(request, response, next){
  request.cookies = cookies(request, response, keys);
  next(request, response);
};

app.middleware.use(cookiesMiddleware);

```

### Response

ZondaJS uses the same HTTP server module node provides.

It adds some handy methods, know internally as enhancements, to facilitate the developer tasks.

<b>Rendering a view</b>

<b>response.render(template, dataObject)</b>
Where:

* <b>templateName</b> is the template file to render to.
* <b>dataObject</b> is the object containing the information (property-value) to be rendered.

```javascript
app.controller.get('/', function(request, response){
  response.render('home.html', {
    title: 'Home page',
	message: 'Welcome to my home page!'
  });
});
```

<b>Rendering JSON</b>

<b>response.sendJSON(dataObject)</b>
Where:

* <b>dataObject</b> is the object containing the information (property-value) to be serialized and rendered.

```javascript
app.controller.get('/json/test', function(request, response){
  response.sendJSON({
    id: 1242,
	name: 'Foo bar'
	categories: [
	  'javascript',
	  'css',
	  'html'
	]
  });
});
```

<b>Rendering a custom error page</b>

<b>response.sendError(errorCode)</b>
Where:

* <b>errorCode</b> is HTTP error code. Notice also that a HTML file must exist in the views/errors/ folder with the errorCode as file name (e.g. 404.html)

```javascript
app.controller.get('/testing404', function(request, response){
  response.sendError(404);
});
```

<b>Answering the request with a file.</b>

<b>response.sendFile(filePath)</b>
Where:

* <b>filePath</b> is the path to the file to be returned.

```javascript
app.controller.get('/get/report', function(request, response){
  response.sendFile('docs/report.pdf');
});
```

<b>Sending a redirection:</b>

<b>response.redirect(path)</b>
Where:

* <b>path</b> is the path/URL to be redirected to.

```javascript
app.controller.get('/logout', function(request, response){
  response.redirect('/');
});
```

### Request

Same as the response object. The request object comes from Node's HTTP module. Here are some enhancements on it.

It exposes a params object containingd the parameters (from named params, querystring and post methods)

<b>request.params</b>

```javascript
app.controller.get('/product/:id', function(request, response){
  console.log(request.params);
  console.log(request.params.id);
  response.end('Done');
});
```

If you are expecting a request body, it is available by:

<b>request.body</b>

```javascript
app.controller.put('/api/product/:id', function(request, response){
  console.log(request.params);
  console.log(request.params.id);
  updatingToObj = JSON.parse(request.body);
  response.end('Done');
});
```

If you are doing file uploads, it exposes an array with all the files:

<b>request.files</b>

```javascript
app.controller.post('/api/product/:id', function(request, response){
  console.log(request.params);
  console.log(request.params.id);
  console.log('And the uploaded fiels are:');
  console.log(request.files);
  response.end('Done');
});
```

A cookies object is always exposed (when using the default cookies middleware):

<b>request.cookies</b>

```javascript
app.controller.get('/cookietest', function(request, response){
  request.cookies.set( "unsigned", "foo", { httpOnly: false } );
  request.cookies.set( "signed", "bar", { signed: true } );

  response.redirect('/cookietestcheck');
});

app.controller.get('/cookietestcheck', function(request, response){
  var unsigned = request.cookies.get( "unsigned" );   // foo
  var signed = request.cookies.get( "signed", { signed: true } );  // bar

  response.end('Done');
});
```

### Internal Data

If you check the ZondaJS source code, you will find 2 more objects:

* <b>__routes</b> is the route handler.
* <b>__di</b> is the dependency injection manager.

These objects are meant to be private. Don't modify them unless you completely know what you are doing.

### Launcher

Finally, but not least, ZondaJS exposes the most important function.

Launching the app.

<b>app.startApp(port)</b>
Where:

* <b>port</b> is the port the server will listen for requests.

```javascript
app.startApp(8080);
```

## Contributing

Any kind of help/feedback is highly appreciated!

### Working/fixing ZondaJS core.

If you want to contribute by coding ZondaJS, please follow this steps:

* Fork
* Create your feature branch
* Send a pull request

### Working on components/middleware

Great! In this case you don't need to send a pull request. Just package your code and tests, and provide documentation on how to install and use it.
This code will be 100% yours and you will be the one maintaining and publishing it to npm. Of course, we are interested on supporting and helping you.

<b>Naming convention</b>

* zondajs-&lt;your_project_name&gt;-&lt;type&gt;

Where

* your_project_name is, well, you already know!, your project name.
* type is one of "component", "middleware", &c.

So, the idea is to keep names simple and self-explanatory. Example names are:

* zondajs-dbsession-middleware
* zondajs-validation-component
* zondajs-oAuth-component
* and so on...

### Sending feedback

Just create an issue, so we can discuss about it.

## More Info

Let me know if you are using ZondaJS. I wanna know what's your opinion and how can we improve the framework!.

## Known Issues

Check the [ZondaJS's github issues page](https://github.com/chuqui/zondajs/issues)

## License

This project is licensed under the MIT license. Read the LICENSE file for more info on it.
- Logo and favicon.ico By: Icons Land - http://www.icons-land.com
