// folder loader for easy startup
/*global module, require*/
module.exports = (function () {
    "use strict";
    
	var loader = Object.create(null);

	loader.load = function (dir, iterator) {
        require('fs').readdirSync(dir + '/').forEach(function (file) {
            if (file.match(/\.+\.js/g) !== null) {
                var name = file.replace(/\.js/g, '');
                iterator(name, dir + '/' + file);
            }
        });
    };

    return loader;
}());