'use strict';

require('mocha');
var os = require('os');
var assert = require('assert');
var file = require('./');

describe('file-normalize', function() {
  it('should normalize slashes', function() {
    assert.equal(file.normalizeSlash('foo\\bar'), 'foo/bar');
  });

  it('should strip trailing slashes by default', function() {
    assert.equal(file.normalizeSlash('foo\\bar\\'), 'foo/bar');
  });

  it('should not strip trailing slashes when false is passed', function() {
    assert.equal(file.normalizeSlash('foo\\bar\\', false), 'foo/bar/');
  });

  it('should normalize EOL', function() {
    assert.equal(file.normalizeEOL('foo\r\nbar'), 'foo' + os.EOL + 'bar');
    assert.equal(file.normalizeEOL('foo\nbar'), 'foo' + os.EOL + 'bar');
  });

  it('should normalize EOL to unix newlines', function() {
    assert.equal(file.normalizeEOL('foo\r\nbar'), 'foo\nbar');
    assert.equal(file.normalizeEOL('foo\r\n\r\nbar'), 'foo\n\nbar');
    assert.equal(file.normalizeEOL('foo\rbar'), 'foo\nbar');
    assert.equal(file.normalizeEOL('foo\nbar'), 'foo\nbar');
  });

  it('should strip byte-order marks', function() {
    assert.equal(file.stripBOM('\ufefffoo\nbar'), 'foo\nbar');
  });
});
