'use strict';

require('mocha');
const assert = require('assert');
const Prompt = require('..');
let prompt;
let unmute;

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
