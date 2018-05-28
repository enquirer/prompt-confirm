'use strict';

require('mocha');
const assert = require('assert');
const Prompt = require('..');
let prompt;
let unmute;

describe('.run', function() {
  beforeEach(function() {
    prompt = new Prompt({name: 'fixture'});
    unmute = prompt.mute();
  });

  afterEach(function() {
    unmute();
  });

  it('should support "false" as the default value', function(cb) {
    prompt = new Prompt({name: 'fixture', default: false});

    prompt.run()
      .then(function(answer) {
        assert.equal(prompt.question.default, 'y/N');
        assert.equal(answer, false);
        cb();
      })
      .catch(cb);

    setImmediate(function() {
      prompt.rl.emit('line', '');
    });
  });

  it('should support "true" as the default value', function(cb) {
    prompt = new Prompt({name: 'fixture', default: true});

    prompt.run()
      .then(function(answer) {
        assert.equal(prompt.question.default, 'Y/n');
        assert.equal(answer, true);
        cb();
      })
      .catch(cb);

    setImmediate(function() {
      prompt.rl.emit('line');
    });
  });

  it('should parse "Y" value to boolean true', function(cb) {
    prompt.run()
      .then(function(answer) {
        assert.equal(answer, true);
        cb();
      })
      .catch(cb);

    setImmediate(function() {
      prompt.rl.emit('line', 'Y');
    });
  });

  it('should parse "Yes" value to boolean true', function(cb) {
    prompt.run()
      .then(function(answer) {
        assert.equal(answer, true);
        cb();
      })
      .catch(cb);

    setImmediate(function() {
      prompt.rl.emit('line', 'Yes');
    });
  });

  it('should parse "No" value to boolean false', function(cb) {
    prompt.run()
      .then(function(answer) {
        assert.equal(answer, false);
        cb();
      })
      .catch(cb);

    setImmediate(function() {
      prompt.rl.emit('line', 'No');
    });
  });

  it('should parse every other string value to boolean false', function(cb) {
    prompt.run()
      .then(function(answer) {
        assert.equal(answer, false);
        cb();
      })
      .catch(cb);

    setImmediate(function() {
      prompt.rl.emit('line', 'bla bla foo');
    });
  });
});
