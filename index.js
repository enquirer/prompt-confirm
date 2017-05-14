/**
 * `confirm` type prompt
 */

var koalas = require('koalas');
var debug = require('debug')('prompt-confirm');
var Prompt = require('prompt-base');

/**
 * Create a new `Confirm` prompt, with the given `question`.
 */

function Confirm(/*question, answers, rl*/) {
  debug('initializing from <%s>', __filename);
  Prompt.apply(this, arguments);
  this.setDefault();
  this.validate = function() {
    return true;
  };
}

/**
 * Inherit `Prompt`
 */

Prompt.extend(Confirm);

/**
 * Get the default value to use
 */

Confirm.prototype.setDefault = function() {
  var val = koalas(this.question.getAnswer(), this.question.default, true);
  this.question.default = val ? 'Y/n' : 'y/N';
  this.defaultValue = val;
};

/**
 * Get the answer to use
 */

Confirm.prototype.getAnswer = function(input) {
  return isString(input) ? isTrue(input) : koalas(input, this.defaultValue);
};

/**
 * Return true if `str` is a truthy value.
 * @param {String} `str`
 * @return {Boolean}
 */

function isTrue(str) {
  return /^(y|ye(s|ah)|ok(ay)?|true)$/i.test(String(str));
}

/**
 * Return true if val is a non-empty string.
 */

function isString(val) {
  return val && typeof val === 'string';
}

/**
 * Module exports
 */

module.exports = Confirm;
