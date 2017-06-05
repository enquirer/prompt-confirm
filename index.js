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

  this.originalDefault = this.question.default !== false;
  this.question.default = this.originalDefault === true ? 'Y/n' : 'y/N';
  this.question.type = 'confirm';
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
  if (input != null && input !== '') {
    return /^(y(es)?|true)$/i.test(String(input).trim());
  }
  return this.originalDefault;
};

/**
 * Module exports
 */

module.exports = Confirm;
