/*!
 * file-normalize <https://github.com/jonschlinkert/file-normalize>
 *
 * Copyright (c) 2014, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
'use strict';

var os = require('os');
var normalize = require('normalize-path');
var stripBOM = require('strip-bom-string');
var file = module.exports;

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
 * @param {String} `str`
 * @return {String}
 */

file.stripBOM = function(str) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  return stripBOM(str);
};
