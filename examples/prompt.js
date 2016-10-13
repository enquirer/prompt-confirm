var Confirm = require('..');
var confirm = new Confirm({
  name: 'chocolate',
  message: 'Like chocolate?'
})

confirm.ask(function(answer) {
  console.log(answer);
});
