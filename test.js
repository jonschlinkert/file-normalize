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

  describe('appendBuffer', function() {
    it('should append the buffer suffix to the buffer prefix with \\r\\n', function() {
      assert.deepEqual(file.appendBuffer(new Buffer('abc\r\n'), new Buffer('def')), new Buffer('abc\r\ndef\r\n'));
    });

    it('should append the buffer suffix to the buffer prefix with \\n:', function() {
      assert.deepEqual(file.appendBuffer(new Buffer('abc\n'), new Buffer('def')), new Buffer('abc\ndef\n'));
    });

    it('should append the buffer suffix to the buffer prefix without EOL', function() {
      assert.deepEqual(file.appendBuffer(new Buffer('abc'), new Buffer('def')), new Buffer('abc' + os.EOL + 'def'));
    });

    it('should append the string suffix to the buffer prefix with \\r\\n', function() {
      assert.deepEqual(file.appendBuffer(new Buffer('abc\r\n'), 'def'), new Buffer('abc\r\ndef\r\n'));
    });

    it('should append the string suffix to the buffer prefix with \\n:', function() {
      assert.deepEqual(file.appendBuffer(new Buffer('abc\n'), 'def'), new Buffer('abc\ndef\n'));
    });

    it('should append the string suffix to the buffer prefix without EOL', function() {
      assert.deepEqual(file.appendBuffer(new Buffer('abc'), 'def'), new Buffer('abc' + os.EOL + 'def'));
    });
  });

  describe('appendString', function() {
    it('should append the string suffix to the string prefix with \\r\\n', function() {
      assert.equal(file.appendString('abc\r\n', 'def'), 'abc\r\ndef\r\n');
    });

    it('should append the string suffix to the string prefix with \\n:', function() {
      assert.equal(file.appendString('abc\n', 'def'), 'abc\ndef\n');
    });

    it('should append the string suffix to the string prefix without EOL', function() {
      assert.equal(file.appendString('abc', 'def'), 'abc' + os.EOL + 'def');
    });

    it('should append the buffer suffix to the string prefix with \\r\\n', function() {
      assert.equal(file.appendString('abc\r\n', new Buffer('def')), 'abc\r\ndef\r\n');
    });

    it('should append the buffer suffix to the string prefix with \\n:', function() {
      assert.equal(file.appendString('abc\n', new Buffer('def')), 'abc\ndef\n');
    });

    it('should append the buffer suffix to the string prefix without EOL', function() {
      assert.equal(file.appendString('abc', new Buffer('def')), 'abc' + os.EOL + 'def');
    });
  });

  describe('append', function() {
    it('should append the buffer suffix to the buffer prefix with \\r\\n', function() {
      assert.deepEqual(file.append(new Buffer('abc\r\n'), new Buffer('def')), new Buffer('abc\r\ndef\r\n'));
    });

    it('should append the buffer suffix to the buffer prefix with \\n:', function() {
      assert.deepEqual(file.append(new Buffer('abc\n'), new Buffer('def')), new Buffer('abc\ndef\n'));
    });

    it('should append the buffer suffix to the buffer prefix without EOL', function() {
      assert.deepEqual(file.append(new Buffer('abc'), new Buffer('def')), new Buffer('abc' + os.EOL + 'def'));
    });

    it('should append the string suffix to the string prefix with \\r\\n', function() {
      assert.equal(file.append('abc\r\n', 'def'), 'abc\r\ndef\r\n');
    });

    it('should append the string suffix to the string prefix with \\n:', function() {
      assert.equal(file.append('abc\n', 'def'), 'abc\ndef\n');
    });

    it('should append the string suffix to the string prefix without EOL', function() {
      assert.equal(file.append('abc', 'def'), 'abc' + os.EOL + 'def');
    });

    it('should append the string suffix to the buffer prefix with \\r\\n', function() {
      assert.deepEqual(file.append(new Buffer('abc\r\n'), 'def'), new Buffer('abc\r\ndef\r\n'));
    });

    it('should append the string suffix to the buffer prefix with \\n:', function() {
      assert.deepEqual(file.append(new Buffer('abc\n'), 'def'), new Buffer('abc\ndef\n'));
    });

    it('should append the string suffix to the buffer prefix without EOL', function() {
      assert.deepEqual(file.append(new Buffer('abc'), 'def'), new Buffer('abc' + os.EOL + 'def'));
    });

    it('should append the buffer suffix to the string prefix with \\r\\n', function() {
      assert.equal(file.append('abc\r\n', new Buffer('def')), 'abc\r\ndef\r\n');
    });

    it('should append the buffer suffix to the string prefix with \\n:', function() {
      assert.equal(file.append('abc\n', new Buffer('def')), 'abc\ndef\n');
    });

    it('should append the buffer suffix to the string prefix without EOL', function() {
      assert.equal(file.append('abc', new Buffer('def')), 'abc' + os.EOL + 'def');
    });
  });
});
