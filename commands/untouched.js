require('colors');
var Issue       = require('model').getModelByName('Issue');
var printer     = require('./../modules/printer.js');

exports = module.exports = fullupdate;
 
exports.usage =
function usage(name, args) {
  args.
    usage('trckr untouched');
};
 
function fullupdate(args) {
  console.log('→ Review issues that weren\'t touched yet'.green);
 
  Issue.all({}, gotIssues);
 
  function gotIssues(err, issues) {
    var filtered = [];

    for (var i=0;i<issues.length;i++){
      if(issues[i].labels.length === 0 &&
        !issues[i].assignee && !issues[i].milestone) {
        filtered.push(issues[i]);
      }
    }
    printer.issues(filtered);
  }
}