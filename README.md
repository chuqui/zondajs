## ZondaJS [![Build Status](https://travis-ci.org/chuqui/zondajs.png?branch=master)](https://travis-ci.org/chuqui/zondajs)

ZondaJS is node.js web framework for building web apps.

<b>This framework is under development. NOT production-ready!</b>

### Introduction
Zonda is a 'powerful' 'dry' wind.
ZondaJS starts as a project to support an startup I'm working. I needed a couple or features for it, such us:
- Small footprint. You know, if you are responsible for a project, you need to know every detail on what you are usign.
- Customizable. I want to be able, without pain, to use the what I want to use and not what the framework makes me use.
- Skeleton oriented. I don't want to have 1 big .js file with all the controllers nor being requiring a lot of files.
- Component oriented. I really like having architecture. Having Controllers, Services, DTOs, Mappers, Models etc, etc.. will allow to find & fix issues and scale much faster.
- Simple to use. I wanted something declarative and well organized, without "magic" behind.
- API cappable. Support for building REST services without pain.

### Features
- MVC.
- Dependency Injection.
- Component oriented.
- Skeleton oriented.
- Properties support.
- Customizable middleware.
- Serve static files.
- REST support.
- Cookies support, also with signed cookies.
- Dead-Simple

### TO-DO
- Session middleware (using existing cookies support)
- Clean up and publish on NPM repo

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
### Project Creation
### Execution Flow
### Dependency Injection
### Middleware
### Routing
### Rendering
### Loader
### Custom Error Pages
### Static files

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
## License

This project is licensed under the MIT license. Read the LICENSE file for more info on it.
- Logo and favicon.ico By: Icons Land - http://www.icons-land.com
