/**
 * `confirm` type prompt
 */

var debug = require('debug')('prompt-confirm');
var Prompt = require('prompt-base');

/**
 * Create a new `Confirm` prompt, with the given `question`.
 */

function Confirm(/*question, answers, rl*/) {
  debug('initializing from <%s>', __filename);
  Prompt.apply(this, arguments);
  this.initialDefault = this.question.default !== false;
  this.question.default = this.initialDefault ? 'Y/n' : 'y/N';
}

/**
 * Inherit `Prompt`
 */

Prompt.extend(Confirm);

/**
 * Get the answer to use. Returns true if `input` is a truthy value.
 * @param {String} `input`
 * @return {Boolean}
 */

Confirm.prototype.getAnswer = function(input) {
  this.status = 'pending';
  if (input != null && input !== '') {
    this.answer = /^(y(es)?|true)$/i.test(String(input));
  } else {
    this.answer = this.initialDefault;
  }
  return this.answer;
};

/**
 * Module exports
 */

module.exports = Confirm;
