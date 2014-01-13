var formidable = require('formidable');
var util = require('util');

module.exports = function(request, response, next){

  var ctype = request.headers['content-type'];

  if( ctype && (ctype.indexOf('multipart/form-data') >= 0 || ctype.indexOf('x-www-form-urlencoded') >=0 )){
    
    var form = new formidable.IncomingForm();

    form.uploadDir = './uploads';
    form.keepExtensions = true;
    form.autoFiles = true;

    form.parse(request, function(err, fields, files){
      request.params = fields;
      request.files = files;

      next(request, response);
    });
  }else if(ctype && ctype.indexOf('application') >= 0){
    var body = '';

    request.on('data', function(chunk){
      body += chunk;
    });

    request.on('end', function(){
      request.body = body;
      next(request, response);
    });
  }else{
    next(request, response);
  }
};
