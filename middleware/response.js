module.exports = function(request, response, next){

  response.render = function(template, data){
    var ejs = require('ejs')
      , fs = require('fs')
      , path = './views/' + template
      , str = fs.readFileSync(path, 'utf8');


    var html = ejs.render(str, data);

    response.writeHead(200, {"Content-Type": "text/html"}); 
    response.end(ejs.render(html));
  };

  next(request, response);
};
