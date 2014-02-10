#!/usr/bin/env node
var fs = require('fs');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var tpl = __dirname + '/../template/';

console.log('--------------------------------');
console.log('--- Creating ZondaJS Project ---');
console.log('--------------------------------');
console.log('');
console.log('------ Creating project skeleton');
console.log('');

fs.mkdirSync('./components');
console.log('Components folder created...');
fs.createReadStream(tpl + 'component.js').pipe(fs.createWriteStream('./components/component.js'));

fs.mkdirSync('./controllers');
console.log('Controllers folder created...');
fs.createReadStream(tpl + 'controller.js').pipe(fs.createWriteStream('./controllers/controller.js'));

fs.mkdirSync('./middleware');
console.log('Middleware folder created...');
fs.createReadStream(tpl + 'body_parser.js').pipe(fs.createWriteStream('./middleware/body_parser.js'));
fs.createReadStream(tpl + 'cookie.js').pipe(fs.createWriteStream('./middleware/cookies.js'));
fs.createReadStream(tpl + 'static.js').pipe(fs.createWriteStream('./middleware/static.js'));

fs.mkdirSync('./views');
console.log('Views folder created...');
fs.createReadStream(tpl + 'demo.html').pipe(fs.createWriteStream('./views/demo.html'));
fs.mkdirSync('./views/errors');
fs.createReadStream(tpl + 'errors/400.html').pipe(fs.createWriteStream('./views/errors/400.html'));
fs.createReadStream(tpl + 'errors/404.html').pipe(fs.createWriteStream('./views/errors/404.html'));
fs.createReadStream(tpl + 'errors/500.html').pipe(fs.createWriteStream('./views/errors/500.html'));

fs.mkdirSync('./static');
console.log('Static folder created...');
fs.createReadStream(tpl + 'favicon.ico').pipe(fs.createWriteStream('./static/favicon.ico'));

fs.mkdirSync('./uploads');
console.log('Uploads folder created...');


fs.createReadStream(tpl + 'app.js').pipe(fs.createWriteStream('./app.js'));

console.log('');
console.log('------ Creating package.json');
console.log('');

var packjson = {
  "author": "",
  "name": "",
  "description": "",
  "version": "0.0.1",
  "dependencies": {
    "underscore": "1.5.2",
    "formidable":"1.0.14",
    "cookies":"0.3.8",
    "keygrip":"1.0.0",
    "mime": "1.2.11",
    "swig": "~1.3.2"
  },
  "engines": {
    "node": ">=0.8.x"
  }
};

rl.question('Project name: ', function(name) {
  packjson.name = name;
  rl.question('Project description: ', function(desc) {
    packjson.description = desc;
    rl.question('Project Author: ', function(author) {
      packjson.author = author;
      fs.createWriteStream('./package.json').end(JSON.stringify(packjson));
      
      console.log('');
      console.log('------ Installing dependencies, please wait....');
      console.log('');

      var exec = require('child_process').exec
      exec('npm install', function(error, stdout, stderr){
        process.stdout.write(stdout);

        console.log('');
        console.log('');
        console.log('------ Project created, enjoy :)');
        process.exit();
      });

    });
  });
});

