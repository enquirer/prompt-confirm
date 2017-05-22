var Confirm = require('..');
var confirm = new Confirm('Like chocolate?')
  .ask(function(answer) {
    console.log(answer);
  });
