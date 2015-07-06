;(function(root) {

	'use strict';

	var namespace = {};

	;
(function(namespace) {

	'use strict';

	/**
	 * Augments the window object with a 
	 * module and a require property to 
	 * emulate CommonJS in the browser.
	 * @param  {Object} appRoot The object to use as the root object for your 'modules' reqistered with kwire.
	 * @param  {Object} globalShadow An object to shadow the global object for testing purposes.
	 */
	function kwire(appRoot, globalShadow) {
		appRoot = appRoot == null ? {} : appRoot;
		globalShadow = globalShadow || window;

		if (typeof appRoot !== 'object') {
			throw 'root object must be an object.'
		}

		if (isServerSide() ||
			isUsingRequireJS() ||
			rootIsAlreadyConfigured(globalShadow)) {
			return;
		}

		globalShadow.module = {
			set exports(value) {
				if (value === undefined) {
					throw 'module not defined.';
				}
				if (value === null) { // null or undefined.
					return;
				}
				if (!value.hasOwnProperty('_path_')) {
					throw '_path_ own-property must be present on modules registered with kwire.';
				}

				if (typeof value._path_ !== 'string') {
					throw '_path_ own-property must be a string.';
				}

				appRoot[value._path_] = value;
			}
		};

		/**
		 * cb is optional.
		 */
		globalShadow.require = function(value, cb) {
			var valueIsArray = Array.isArray(value);
			if (value == null) {
				throw 'value not defined.'
			}
			if (typeof value !== 'string' && !valueIsArray) {
				throw 'value must be a string or an array.'
			}

			if (cb) {
				if (!valueIsArray) {
					return cb(appRoot[value]);
				}

				return cb.apply(null, value.map(function(v) {
					return appRoot[v];
				}));
			}

			var result = appRoot[value];

			return result === undefined ? globalShadow[camelify(value)] : result;
		};

	}

	function camelify(str) {
		return str.replace(/(\-([^-]{1}))/g, function(match, $1, $2) {
			return $2.toUpperCase();
		});
	}

	function isServerSide() {
		return (typeof exports === 'object') && module;
	}

	function isUsingRequireJS() {
		return (typeof define === 'function') && define.amd;
	}

	function rootIsAlreadyConfigured(globalShadow) {
		return (globalShadow.module && globalShadow.require);
	}

	kwire.camelify = camelify;
	namespace.kwire = kwire;

}(namespace));

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