var formidable = require('formidable');
var util = require('util');

module.exports = function(request, response, next){
  if( request.method === 'POST'){
    
    var form = new formidable.IncomingForm();

    form.uploadDir = './uploads';
    form.keepExtensions = true;
    form.autoFiles = true;

    form.parse(request, function(err, fields, files){
      
      for(var f in fields){
        fields[f] = (fields[f].length > 1)? fields[f] : fields[f][0];
      }

      request.params = fields;
      request.files = files;

      next(request, response);
    });

  }else{
    next(request, response);
  }
};
