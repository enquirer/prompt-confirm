'use strict';

require('mocha');
var assert = require('assert');
var Prompt = require('..');
var prompt;
var unmute;

describe('.ask', function() {
  beforeEach(function() {
    prompt = new Prompt({name: 'fixture'});
    unmute = prompt.mute();
  });

  afterEach(function() {
    unmute();
  });

  it('should default to true', function(cb) {
    prompt.ask(function(answer) {
      assert.equal(answer, true);
      assert.equal(prompt.question.default, 'Y/n');
      cb();
    });

    assert.equal(prompt.question.default, 'Y/n');
    prompt.rl.emit('line');
  });
});
