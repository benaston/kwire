# kwire

Enables CommonJS-like require and module.exports syntax in the browser.

File size: **989 bytes**.<br/>
Supported platforms: **server and browser (does nothing on the server)**.<br/>
Supported language versions: **ES5 and above**.

Also supports array syntax.

If you use this library in your software please tweet me @benastontweet.

## Installation

```npm install kwire```

## Example

```javascript
window.kwire(); // You can optionally supply a root object argument.

function MyController() {}
MyController._path_ = 'controllers/my-controller';
module.exports = MyController; // Registers MyController with kwire.

var MyCtrl = require('controllers/my-controller');
MyCtrl === MyController; // true

// -- or --

require('controllers/my-controller', function(MyCtrl) {
	MyCtrl === MyController; // true
});

// -- or --

require(['controllers/my-controller'], function(MyCtrl) {
	MyCtrl === MyController; // true
});
```

## License & Copyright

This software is released under the MIT License. It is Copyright 2015, Ben Aston. I may be contacted at ben@bj.ma.

## How to Contribute

Pull requests including bug fixes, new features and improved test coverage are welcomed. Please do your best, where possible, to follow the style of code found in the existing codebase.