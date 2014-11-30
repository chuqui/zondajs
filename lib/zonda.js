/*global module, require*/
(function () {
    "use strict";
    
    var zondajs     = Object.create(null),
        router      = require("./router.js"),
        injector    = require("./injector.js"),
        stack       = require("./stack.js"),
        dispatcher  = require("./dspatcher.js"),
        http        = require("http"),
        url         = require("url");

    zondajs.component = zondajs.property = require("component.js").add;
    zondajs.loader = require("loader.js");
    zondajs.controller = require("controller.js");

    zondajs.startApp = function (port) {
        http.createServer(function (request, response) {
            try {
                dispatcher.go(request, response);
            } catch (e) {
                console.log(e.stack);
                response.sendError(500);
            }
        }).listen(port);
    };

    module.exports = zondajs;
}());
