var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('confirm', require('./'));

enquirer.question('chocolate', 'Like chocolate?', {type: 'confirm'});
enquirer.question('vanilla', 'Like vanilla?', {type: 'confirm'});

enquirer.ask(['chocolate', 'vanilla'])
  .then(function(answers) {
    console.log(answers)
  });
