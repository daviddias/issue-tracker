require('colors');
var Issue       = require('model').getModelByName('Issue');
var printer     = require('./../modules/printer.js');

exports = module.exports = fullupdate;
 
exports.usage =
function usage(name, args) {
  args.
    usage('trckr new');
};
 
function fullupdate(args) {
  console.log('→ New issues'.green);
 
  Issue.all({trckrState:'new'}, gotIssues);
 
  function gotIssues(err, issues) {
    printer.issues(issues);
  }
   
}