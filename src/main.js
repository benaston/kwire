;(function(root) {

	'use strict';

	var namespace = {};

	@@kwire

	if ((typeof exports === 'object') && module) {
		module.exports = namespace; // CommonJS
	} else if ((typeof define === 'function') && define.amd) {
		define(function() {
			return namespace;
		}); // AMD
	} else {
		root.kwire = namespace.kwire; // Browser
	}

}(this));