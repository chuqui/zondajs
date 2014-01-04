var cookies = require('cookies');
var keygrip = require('keygrip');

// change these passwords
keys = keygrip(['&vN.2@{ w/]~%32088', 'Nki3hQ3135]L2E3Lmk', '65[5A9132@<^8IyE3%'], 'sha256', 'hex')


module.exports = function(request, response, next){

  request.cookies = cookies(request, response, keys);

  next(request, response);
};
