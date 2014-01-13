module.exports = function(request, response, next){
  var filePath = request.zondajs.parsedURL.pathname;
  
  if(filePath == '/favicon.ico'){
    filePath = '/static/favicon.ico';
  }  
  
  if(request.method === 'GET' && filePath.indexOf('/static/') == 0){
    filePath = '.' + filePath;

    response.sendFile(filePath);
  }else{
    next(request, response);
  }
};
