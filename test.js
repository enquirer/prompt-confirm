'use strict';

require('mocha');
var assert = require('assert');
var PromptConfirm = require('./');

describe('prompt-confirm', function() {
  it('should export a function', function() {
    assert.equal(typeof PromptConfirm, 'function');
  });

  it('should intantiate', function() {
    var prompt = new PromptConfirm({name: 'foo'});
    assert(prompt instanceof PromptConfirm);
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      PromptConfirm();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected question to be a string or object');
      cb();
    }
  });
});
