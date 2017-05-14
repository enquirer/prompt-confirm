'use strict';

require('mocha');
var assert = require('assert');
var Prompt = require('..');
var prompt;

describe('prompt-confirm', function() {
  it('should export a function', function() {
    assert.equal(typeof Prompt, 'function');
  });

  it('should intantiate', function() {
    var prompt = new Prompt({name: 'foo'});
    assert(prompt instanceof Prompt);
  });

  it('should throw an error when invalid args are passed', function() {
    assert.throws(function() {
      Prompt();
    });
  });
});
