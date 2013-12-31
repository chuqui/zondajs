var fs = require('fs');
var _ = require('underscore');

function parseBody(request){
  var body = '';

  request.on('data', function(chunk){
    body += chunk;
  });
  
  request.on('end', function(){
    var boundary = body.substring(0, body.indexOf('\n'));
    var rawParams = body.split(boundary);
    _.each(rawParams, function(rawParam){
      if(rawParam){
        var paramData = rawParam.split('\n\n');
        if(paramData.length > 1){
          var header = paramData[0];
          paramData.splice(0, 1);
          var value = paramData.join('\n\n');

          var field = parseHeader(header);
          if(field.isFile){
            field.data = value;
            request.files.push(field);
          }else{
            request.params[field.name] = value;
          }
        }
      }
    });
  });
}

function parseHeader(headerToParse){
  var header = headerToParse.split('\n');
  var field = {};

  _.each(header, function(head){
    var headname = head.substring(0, head.indexOf(': '));
    var headvalues = head.substring(head.indexOf(': ')+2, head.length).split('; ');
    _.each(headvalues, function(val){
      var entry = val.split('=');

      field.isFile = (entry[0] == 'filename');

      if(entry.length > 1){
        field[entry[0]] = entry[1].replace(/"/g, '');
      }else{
        if(entry[0]!=''){
          field[headname] = entry[0];
        }
      }
    });
  });

  return field;
}

module.exports = function(request, response){
    request.files = [];
    if(request.headers['content-type'].indexOf('multipart/form-data') >= 0){
	request.setEncoding('utf-8');
	parseBody(request);
    }
};
