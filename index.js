'use strict';

const Prompt = require('prompt-base');
const cyan = require('ansi-cyan');

/**
 * Create a new `Confirm` prompt, with the given `question`.
 */

function Confirm(/*question, answers, rl*/) {
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
 * Render final selected answer when "line" ("enter" keypress)
 * is emitted
 */

Confirm.prototype.renderAnswer = function() {
  return cyan(this.getAnswer(this.answer) ? 'Yes' : 'No');
};

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
