## ZondaJS 

ZondaJS is node.js web framework for building web apps.

[![Build Status](https://travis-ci.org/chuqui/zondajs.png?branch=master)](https://travis-ci.org/chuqui/zondajs)

<b>This framework is under development. NOT production-ready!</b>

For a better experience, read this doc at http://documentup.com/chuqui/zondajs

### Introduction
Zonda is a <b>powerful</b>, <b>dry</b> wind.
ZondaJS starts as a project to support an startup I'm working. I needed a couple or features for it, such us:

* <b>Small footprint.</b> You know, if you are responsible for a project, you need to know every detail on what you are usign.
* <b>Customizable.</b> I want to be able, without pain, to use the what I want to use and not what the framework makes me use.
* <b>Skeleton oriented.</b> I don't want to have 1 big .js file with all the controllers nor being requiring a lot of files.
* <b>Component oriented.</b> I really like having architecture. Having Controllers, Services, DTOs, Mappers, Models etc, etc.. will allow to find & fix issues and scale much faster.
* <b>Simple to use.</b> I wanted something declarative and well organized, without "magic" behind.
* <b>API cappable.</b> Support for building REST services without pain.

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
* All the [middleware](#api-docs/middleware) is ran. Without any default order.
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

By default, ZondaJS uses EJS for rendering. Read more on EJS.

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
### Components
### Properties
### Loader
### Controllers
### Views
### Middleware
### Response
### Request
### Internal Data
### Launcher

## More Info

Let me know if you are using ZondaJS. I wanna know what's your opinion and how can we improve the framework!.

## Known Issues

Check the [ZondaJS's github issues page](https://github.com/chuqui/zondajs/issues)

## License

This project is licensed under the MIT license. Read the LICENSE file for more info on it.
- Logo and favicon.ico By: Icons Land - http://www.icons-land.com
