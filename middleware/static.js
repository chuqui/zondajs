var fs = require('fs');
var path = require('path');
var mime = require('mime');

module.exports = function(request, response, next){
  var filePath = request.zondajs.parsedURL.pathname;
  
  if(filePath == '/favicon.ico'){
    filePath = '/static/favicon.ico';
  }  
  
  if(request.method === 'GET' && filePath.indexOf('/static/') == 0){
    filePath = '.' + filePath;

    path.exists(filePath, function(exists) {
      if (exists) {
        fs.readFile(filePath, function(error, content) {
          if(error) {
            response.writeHead(404);
            response.end();
          }else{    
            response.writeHead(200, { 'Content-Type': mime.lookup(filePath) });
            response.end(content, 'utf-8');
          }
        });
      }else{
        response.writeHead(404);
        response.end();
      }
    });
  }else{
    next(request, response);
  }
};
