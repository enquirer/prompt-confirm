'use strict';

require('mocha');
const assert = require('assert');
const Prompt = require('..');

describe('prompt-confirm', function() {
  it('should export a function', function() {
    assert.equal(typeof Prompt, 'function');
  });

  it('should intantiate', function() {
    const prompt = new Prompt({name: 'foo'});
    assert(prompt instanceof Prompt);
  });

  it('should throw an error when invalid args are passed', function() {
    assert.throws(function() {
      Prompt();
    });
  });
});
