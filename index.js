/*!
 * file-normalize <https://github.com/jonschlinkert/file-normalize>
 *
 * Copyright (c) 2014, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
'use strict';

var os = require('os');
var isBuffer = require('is-buffer');
var equals = require('buffer-equal');
var normalize = require('normalize-path');
var stripBomBuffer = require('strip-bom-buffer');
var stripBomString = require('strip-bom-string');
var file = module.exports;

file.cr = new Buffer('\r\n');
file.nl = new Buffer('\n');

/**
 * Normalize slashes in the given filepath to forward slashes.
 * Note that this is a simple replacement of `\\` with `/`, and
 * this method does not check for URL or windows drive characters.
 *
 * ```js
 * var file = require('file-normalize');
 * console.log(file.normalizeSlash('foo\\bar'));
 * //=> 'foo/bar'
 * ```
 * @param {String} `filepath`
 * @return {String}
 * @api public
 */

file.normalizeSlash = function(filepath, trailingSlash) {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }
  return normalize(filepath, trailingSlash);
};

/**
 * Normalize line endings to use the given `eol` character,
 * or the defaults of the current operating system.
 *
 * ```js
 * var fs = require('fs');
 * var file = require('file-normalize');
 * var str = fs.readFileSync('foo.txt', 'utf8');
 * console.log(file.normalizeEOL(str));
 * ```
 * @param {String} `str`
 * @return {String}
 * @api public
 */

file.normalizeEOL = function(str, eol) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  return str.replace(/(?:\r\n?|\n)/g, eol || os.EOL);
};

/**
 * Normalize all line endings to unix newlines (strips carriage returns).
 *
 * ```js
 * var fs = require('fs');
 * var file = require('file-normalize');
 * var str = fs.readFileSync('foo.txt', 'utf8');
 * console.log(file.normalizeNL(str));
 * ```
 * @param {String} `str`
 * @return {String}
 * @api public
 */

file.normalizeNL = function(str) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  return file.normalizeEOL(str, '\n');
};

/**
 * Strip byte-order marks.
 *
 * ```js
 * var fs = require('fs');
 * var file = require('file-normalize');
 * var str = file.readFileSync('foo.txt', 'utf8');
 * console.log(file.stripBOM(str));
 * ```
 * @param {String|Buffer} `val`
 * @return {String}
 * @api public
 */

file.stripBOM = function(val) {
  if (isBuffer(val)) {
    return stripBomBuffer(val);
  }
  if (typeof val !== 'string') {
    throw new TypeError('expected a string or buffer');
  }
  return stripBomString(val);
};

/**
 * Append a string or buffer to another string or buffer ensuring to preserve line ending characters.
 *
 * ```js
 * console.log([append(new Buffer('abc\r\n'), new Buffer('def')).toString()]);
 * //=> [ 'abc\r\ndef\r\n' ]
 *
 * console.log([append(new Buffer('abc\n'), new Buffer('def')).toString()]);
 * //=> [ 'abc\ndef\n' ]
 *
 * // uses os.EOL when a line ending is not found
 * console.log([append(new Buffer('abc'), new Buffer('def')).toString()]);
 * //=> [ 'abc\ndef' ]
 *
 * console.log([append('abc\r\n', 'def')]);
 * //=> [ 'abc\r\ndef\r\n' ]
 *
 * console.log([append('abc\n', 'def')]);
 * //=> [ 'abc\ndef\n' ]
 *
 * // uses os.EOL when a line ending is not found
 * console.log([append('abc', 'def')]);
 * //=> [ 'abc\ndef' ]
 * ```
 * @param  {String|Buffer} `prefix` String or Buffer that will be used to check for an existing line ending. The suffix is appended to this.
 * @param  {String|Buffer} `suffix` String or Buffer that will be appended to the prefix.
 * @return {String|Buffer} Final String or Buffer
 * @api public
 */

file.append = function(prefix, suffix) {
  if (isBuffer(prefix)) {
    return file.appendBuffer(prefix, suffix);
  }
  return file.appendString(prefix, suffix);
};

/**
 * Append a string to another string ensuring to preserve line ending characters.
 *
 * ```js
 * console.log([appendString('abc\r\n', 'def')]);
 * //=> [ 'abc\r\ndef\r\n' ]
 *
 * console.log([appendString('abc\n', 'def')]);
 * //=> [ 'abc\ndef\n' ]
 *
 * // uses os.EOL when a line ending is not found
 * console.log([appendString('abc', 'def')]);
 * //=> [ 'abc\ndef' ]
 * ```
 * @param  {String} `str` String that will be used to check for an existing line ending. The suffix is appended to this.
 * @param  {String} `suffix` String that will be appended to the str.
 * @return {String} Final String
 * @api public
 */

file.appendString = function(str, suffix) {
  var eol;
  if (str.slice(-2) === '\r\n') {
    eol = '\r\n';
  } else if (str.slice(-1) === '\n') {
    eol = '\n';
  } else {
    return [str, os.EOL, suffix].join('');
  }
  return [str, suffix, eol].join('');
};

/**
 * Append a buffer to another buffer ensuring to preserve line ending characters.
 *
 * ```js
 * console.log([appendBuffer(new Buffer('abc\r\n'), new Buffer('def')).toString()]);
 * //=> [ 'abc\r\ndef\r\n' ]
 *
 * console.log([appendBuffer(new Buffer('abc\n'), new Buffer('def')).toString()]);
 * //=> [ 'abc\ndef\n' ]
 *
 * // uses os.EOL when a line ending is not found
 * console.log([appendBuffer(new Buffer('abc'), new Buffer('def')).toString()]);
 * //=> [ 'abc\ndef' ]
 * * ```
 * @param  {Buffer} `buf` Buffer that will be used to check for an existing line ending. The suffix is appended to this.
 * @param  {Buffer} `suffix` Buffer that will be appended to the buf.
 * @return {Buffer} Final Buffer
 * @api public
 */

file.appendBuffer = function(buf, suffix) {
  var eol;
  if (equals(buf.slice(-2), file.cr)) {
    eol = file.cr;
  } else if (equals(buf.slice(-1), file.nl)) {
    eol = file.nl;
  } else {
    return Buffer.concat([buf, new Buffer(os.EOL), new Buffer(suffix)]);
  }
  return Buffer.concat([buf, new Buffer(suffix), eol]);
};
