// folder loader for easy startup

module.exports = (function () {
	var loader = Object.create(null);

	loader.load = function(dir, iterator){
        require('fs').readdirSync(dir + '/').forEach(function(file) {
            if (file.match(/.+\.js/g) !== null) {
                var name = file.replace(/.js/g, '');
                iterator(name, dir + '/' + file);
            }
        });
    };

    return loader;
} ());