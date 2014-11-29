// execution stack including middleware, controllers, pre and post controller
/*global module, require*/
module.exports = (function () {
    "use strict";
	var stack = Object.create(null);

	stack.create = function () {
		var executionStack = Object.create(null),
			items = [],
			executionIndex = -1,
			injector = require("injector.js");

		executionStack.add = function (callable) {
			items = items.concat(callable);
		};

		executionStack.get = function (index) {
			return items[index];
		};

		executionStack.getSize = function () {
			return items.length;
		};

		executionStack.next = function () {
            executionIndex += 1;
			injector.call(executionStack.get(executionIndex));
		};

		return executionStack;
	};

	stack.meta = function (request, response, currentStack) {
		var meta = Object.create(null);

		meta.currentStack = meta.currentStack || stack.create();

		meta.request = request;
		meta.response = response;

		meta.next = meta.currentStack.next;
	};

    return stack;
}());
