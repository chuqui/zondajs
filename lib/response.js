/*global module, require*/

module.exports = (function () {
    "use strict";
    
    var responseWrapper = Object.create(null);

    responseWrapper.wrap = function (response) {
        response.render = function (template, data) {
            var swig = require("swig"),
                path = require("path"),
                filepath = path.dirname(require.main.filename) + "/views/" + template,
                html = swig.renderFile(filepath, data);

            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(html);
        };

        response.redirect = function (url) {
            response.writeHead(302, {"Location": url});
            response.end();
        };

        response.sendFile = function (filePath) {
            var fs = require("fs"),
                mime = require("mime");

            fs.exists(filePath, function (exists) {
                if (exists) {
                    fs.readFile(filePath, function (error, content) {
                        if (error) {
                            response.sendError(404);
                        } else {
                            response.writeHead(200, { "Content-Type": mime.lookup(filePath) });
                            response.end(content, "utf-8");
                        }
                    });
                } else {
                    response.sendError(404);
                }
            });
        };

        response.sendJSON = function (o) {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify(o));
        };

        response.sendError = function (code) {
            var path = require("path"),
                swig = require("swig"),
                filepath = path.dirname(require.main.filename) + "/" + code + ".html",
                html = swig.renderFile(filepath, {});

            response.writeHead(code, {"Content-Type": "text/html"});
            response.end(html);
        };
    };

    return responseWrapper;
}());
                