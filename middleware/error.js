module.exports = function(request, response){
  response.sendError = function(code, message){
      response.writeHead(code, {"Content-Type": "text/plain"});
      response.write(message);
      response.end();
  };
  
  response.send301 = function(url){
  
  };
  
  response.send302 = function(url){
  
  };
};
