#!/usr/bin/env node
var fs = require('fs');
var tpl = __dirname + '/../template/';

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
fs.createReadStream(tpl + 'demo.ejs').pipe(fs.createWriteStream('./views/demo.ejs'));
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
fs.createReadStream(tpl + 'package.json').pipe(fs.createWriteStream('./package.json'));

console.log('-------------------------------');
console.log('--- ZondaJS Project Created ---');
