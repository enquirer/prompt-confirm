/**
 * `confirm` type prompt
 */

var util = require('util');
var Prompt = require('prompt-base');
var cyan = require('ansi-cyan');

/**
 * Create a new `Confirm` prompt, with the given `question`.
 */

function Confirm(/*question, answers, rl*/) {
  Prompt.apply(this, arguments);
  this.defaultValue = true

  if (typeof this.question.default === 'boolean') {
    this.defaultValue = this.question.default;
  }
  this.question.default = this.defaultValue ? 'Y/n' : 'y/N';
  return this;
}

/**
 * Inherit `Prompt`
 */

util.inherits(Confirm, Prompt);

/**
 * Start the prompt session
 * @param  {Function} `cb` Callback when prompt is finished
 * @return {Object} Returns the `Confirm` instance
 */

Confirm.prototype.ask = function(cb) {
  this.callback = cb;
  this.ui.once('line', this.onSubmit.bind(this));
  this.ui.on('keypress', this.onKeypress.bind(this));
  this.render();
  return this;
};

/**
 * When user presses the `enter` key
 */

Confirm.prototype.onSubmit = function(input) {
  this.answer = this.getAnswer(input);
  this.status = 'answered';
  this.submitAnswer();
};

/**
 * When a keypress is emitted (user types)
 */

Confirm.prototype.getAnswer = function(input) {
  return isString(input) ? isTrue(input) : this.defaultValue
};

/**
 * When a keypress is emitted (user types)
 */

Confirm.prototype.onKeypress = function() {
  this.render();
};

/**
 * Return true if `str` is a truthy value.
 * @param {String} `str`
 * @return {Boolean}
 */

function isTrue(str) {
  return /^(y|yes|ok|true)$/i.test(String(str));
}

/**
 * Return true if val is a non-empty string.
 */

function isString(val) {
  return typeof val === 'string' && val.length > 0
}

/**
 * Module exports
 */

module.exports = Confirm;
