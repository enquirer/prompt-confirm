/**
 * `confirm` type prompt
 */

var util = require('util');
var BasePrompt = require('enquirer-prompt');
var cyan = require('ansi-cyan');

/**
 * Constructor
 */

function Prompt(question, rl, answers) {
  BasePrompt.apply(this, arguments);
  var initialDefault = true;

  if (typeof this.question.default === 'boolean') {
    initialDefault = this.question.default;
  }

  this.filterFn = this.question.filter || function(input) {
    return isString(input) ? isTrue(input) : initialDefault;
  };

  this.question.default = initialDefault ? 'Y/n' : 'y/N';
  return this;
}

/**
 * Inherit `BasePrompt`
 */

util.inherits(Prompt, BasePrompt);

/**
 * Start the prompt session
 * @param  {Function} `cb` Callback when prompt is finished
 * @return {Object} Returns the `Prompt` instance
 */

Prompt.prototype.ask = function(cb) {
  this.callback = cb;
  this.ui.on('keypress', this.onKeypress.bind(this));
  this.ui.once('line', this.onSubmit.bind(this));
  this.render();
  return this;
};

/**
 * Render the prompt to the terminal
 */

Prompt.prototype.render = function(answer) {
  var message = this.message;
  if (typeof answer === 'boolean') {
    message += cyan(answer ? 'Yes' : 'No');
  } else {
    message += this.rl.line;
  }
  this.ui.render(message);
};

/**
 * When user press `enter` key
 */

Prompt.prototype.onSubmit = function(answer) {
  this.answer = this.filterFn(answer);
  this.status = 'answered';
  this.render(this.answer);
  this.ui.write();
  this.callback(this.answer);
};

/**
 * When user press a key
 */

Prompt.prototype.onKeypress = function() {
  this.render();
};

/**
 * Return true if val is a non-empty string.
 */

function isString(val) {
  return val && typeof val === 'string';
}

/**
 * Return true if `str` is a truthy value.
 * @param {String} `str`
 * @return {Boolean}
 */

function isTrue(str) {
  return /^y|yes|ok|true$/i.test(str);
}

/**
 * Module exports
 */

module.exports = Prompt;
