# file-normalize [![NPM version](https://img.shields.io/npm/v/file-normalize.svg?style=flat)](https://www.npmjs.com/package/file-normalize) [![NPM monthly downloads](https://img.shields.io/npm/dm/file-normalize.svg?style=flat)](https://npmjs.org/package/file-normalize)  [![NPM total downloads](https://img.shields.io/npm/dt/file-normalize.svg?style=flat)](https://npmjs.org/package/file-normalize) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/file-normalize.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/file-normalize) [![Windows Build Status](https://img.shields.io/appveyor/ci/jonschlinkert/file-normalize.svg?style=flat&label=AppVeyor)](https://ci.appveyor.com/project/jonschlinkert/file-normalize)

> File system utils for normalizing things like eol, encoding and BOM.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save file-normalize
```

Install with [yarn](https://yarnpkg.com):

```sh
$ yarn add file-normalize
```

## API

### [.normalizeSlash](index.js#L37)

Normalize slashes in the given filepath to forward slashes. Note that this is a simple replacement of `\\` with `/`, and this method does not check for URL or windows drive characters.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```js
var file = require('file-normalize');
console.log(file.normalizeSlash('foo\\bar'));
//=> 'foo/bar'
```

### [.normalizeEOL](index.js#L59)

Normalize line endings to use the given `eol` character, or the defaults of the current operating system.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```js
var fs = require('fs');
var file = require('file-normalize');
var str = fs.readFileSync('foo.txt', 'utf8');
console.log(file.normalizeEOL(str));
```

### [.normalizeNL](index.js#L80)

Normalize all line endings to unix newlines (strips carriage returns).

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```js
var fs = require('fs');
var file = require('file-normalize');
var str = fs.readFileSync('foo.txt', 'utf8');
console.log(file.normalizeNL(str));
```

### [.stripBOM](index.js#L101)

Strip byte-order marks.

**Params**

* `val` **{String|Buffer}**
* `returns` **{String}**

**Example**

```js
var fs = require('fs');
var file = require('file-normalize');
var str = file.readFileSync('foo.txt', 'utf8');
console.log(file.stripBOM(str));
```

### [.append](index.js#L141)

Append a string or buffer to another string or buffer ensuring to preserve line ending characters.

**Params**

* `prefix` **{String|Buffer}**: String or Buffer that will be used to check for an existing line ending. The suffix is appended to this.
* `suffix` **{String|Buffer}**: String or Buffer that will be appended to the prefix.
* `returns` **{String|Buffer}**: Final String or Buffer

**Example**

```js
console.log([append(new Buffer('abc\r\n'), new Buffer('def')).toString()]);
//=> [ 'abc\r\ndef\r\n' ]

console.log([append(new Buffer('abc\n'), new Buffer('def')).toString()]);
//=> [ 'abc\ndef\n' ]

// uses os.EOL when a line ending is not found
console.log([append(new Buffer('abc'), new Buffer('def')).toString()]);
//=> [ 'abc\ndef' ]

console.log([append('abc\r\n', 'def')]);
//=> [ 'abc\r\ndef\r\n' ]

console.log([append('abc\n', 'def')]);
//=> [ 'abc\ndef\n' ]

// uses os.EOL when a line ending is not found
console.log([append('abc', 'def')]);
//=> [ 'abc\ndef' ]
```

### [.appendString](index.js#L168)

Append a string to another string ensuring to preserve line ending characters.

**Params**

* `str` **{String}**: String that will be used to check for an existing line ending. The suffix is appended to this.
* `suffix` **{String}**: String that will be appended to the str.
* `returns` **{String}**: Final String

**Example**

```js
console.log([appendString('abc\r\n', 'def')]);
//=> [ 'abc\r\ndef\r\n' ]

console.log([appendString('abc\n', 'def')]);
//=> [ 'abc\ndef\n' ]

// uses os.EOL when a line ending is not found
console.log([appendString('abc', 'def')]);
//=> [ 'abc\ndef' ]
```

### [.appendBuffer](index.js#L190)

Append a buffer to another buffer ensuring to preserve line ending characters.

**Params**

* `buf` **{Buffer}**: Buffer that will be used to check for an existing line ending. The suffix is appended to this.
* `suffix` **{Buffer}**: Buffer that will be appended to the buf.
* `returns` **{Buffer}**: Final Buffer

**Example**

```js
console.log([appendBuffer(new Buffer('abc\r\n'), new Buffer('def')).toString()]);
//=> [ 'abc\r\ndef\r\n' ]

console.log([appendBuffer(new Buffer('abc\n'), new Buffer('def')).toString()]);
//=> [ 'abc\ndef\n' ]

// uses os.EOL when a line ending is not found
console.log([appendBuffer(new Buffer('abc'), new Buffer('def')).toString()]);
//=> [ 'abc\ndef' ]
```

## About

### Related projects

* [fs-utils](https://www.npmjs.com/package/fs-utils): fs extras and utilities to extend the node.js file system module. Used in Assemble and… [more](https://github.com/assemble/fs-utils) | [homepage](https://github.com/assemble/fs-utils "fs extras and utilities to extend the node.js file system module. Used in Assemble and many other projects.")
* [normalize-path](https://www.npmjs.com/package/normalize-path): Normalize file path slashes to be unix-like forward slashes. Also condenses repeat slashes to a… [more](https://github.com/jonschlinkert/normalize-path) | [homepage](https://github.com/jonschlinkert/normalize-path "Normalize file path slashes to be unix-like forward slashes. Also condenses repeat slashes to a single slash and removes and trailing slashes unless disabled.")
* [parse-filepath](https://www.npmjs.com/package/parse-filepath): Pollyfill for node.js `path.parse`, parses a filepath into an object. | [homepage](https://github.com/jonschlinkert/parse-filepath "Pollyfill for node.js `path.parse`, parses a filepath into an object.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** |  
| --- | --- |  
| 15 | [jonschlinkert](https://github.com/jonschlinkert) |  
| 6  | [doowb](https://github.com/doowb) |  
| 1  | [phated](https://github.com/phated) |  

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on August 01, 2017._