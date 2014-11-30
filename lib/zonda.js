/*global module, require*/
(function () {
    "use strict";
    
    var zondajs     = Object.create(null),
        dispatcher  = require("./dspatcher.js"),
        http        = require("http");

    zondajs.component = zondajs.property = require("component.js").add;
    zondajs.property = require("property.js").add;
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