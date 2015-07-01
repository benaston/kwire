'use strict';

var kwire = self.kwire;

describe('kwire', function() {

	describe('when supplied with null or undefined', function() {

		it('should not throw an error because a root object will be created automatically behind the scenes', function() {
			// arrange & act & assert
			expect(kwire()).toBe(undefined);
		});

	});

	describe('when supplied with a root object that is a primitive type', function() {

		it('should throw an error', function() {
			// arrange & act & assert
			[0, 1, true, false].forEach(function(testCase) {
				expect(kwire.bind(null, testCase)).toThrow('root object must be an object.');
			})
		});

	});

	describe('when supplied with a root object that is a function', function() {

		it('should throw an error', function() {
			// arrange 
			function foo() {}

			// act & assert
			expect(kwire.bind(null, foo)).toThrow('root object must be an object.');

		});

	});

	describe('when supplied with a root object', function() {

		it('should not throw an error', function() {
			// arrange 
			var rootObject = {};

			// act & assert
			expect(kwire(rootObject)).toBe(undefined);
		});

		it('should add a module property to the window object', function() {
			// arrange 
			var rootObject, globalShadow;

			rootObject = {};
			globalShadow = {};

			//act
			kwire(rootObject, globalShadow);

			//assert
			expect(globalShadow.module).toBeDefined();
		});

		it('should add a require property to the window object', function() {
			// arrange 
			var rootObject, globalShadow;

			rootObject = {};
			globalShadow = {};

			//act
			kwire(rootObject, globalShadow);

			//assert
			expect(globalShadow.require).toBeDefined();
		});

	});

	describe('module.exports', function() {

		it('should register the module on the root object', function() {
			// arrange 
			var rootObject, windowShadow, path, module;

			rootObject = {};
			windowShadow = {};
			path = 'foo/bar';
			module = {
				_path_: path,
				foo: 'foo'
			};
			kwire(rootObject, windowShadow);

			// act
			windowShadow.module.exports = module;

			// assert
			expect(windowShadow.require(path).foo).toBe('foo');
		});

	});

	describe('module.require', function() {

		it('should invoke the callback synchronously supplying the requested module', function() {
			// arrange 
			var rootObject, windowShadow, path, module, injectedItem;

			rootObject = {};
			windowShadow = {};
			path = 'foo/bar';
			module = {
				_path_: path,
				foo: 'foo'
			};
			kwire(rootObject, windowShadow);

			// act
			windowShadow.module.exports = module;
			windowShadow.require(path, function(value) {
				// assert
				injectedItem = value;
			});

			expect(injectedItem === module).toBe(true);
		});

		it('should invoke the callback synchronously supplying the requested module', function() {
			// arrange 
			var rootObject, windowShadow, path1,
				path2, module1, module2,
				injectedItem1, injectedItem2;

			rootObject = {};
			windowShadow = {};
			path1 = 'foo/bar';
			path2 = 'bam/baz';
			module1 = {
				_path_: path1,
				foo: 'foo'
			};
			module2 = {
				_path_: path2,
				bar: 'bar'
			};
			kwire(rootObject, windowShadow);

			// act
			windowShadow.module.exports = module1;
			windowShadow.module.exports = module2;
			windowShadow.require([path1, path2], function(value1, value2) {
				// assert
				injectedItem1 = value1;
				injectedItem2 = value2;
			});

			expect(injectedItem1 === module1).toBe(true);
			expect(injectedItem2 === module2).toBe(true);
		});

	});

});