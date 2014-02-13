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
  console.log('→ Review issues with more than 7 days without touching'.green);
 
  var currentDate = new Date();

  Issue.all({trckrState:'reviewing'}, gotIssues);
 
  function gotIssues(err, issues) {
    var filtered = [];

    for (var i=0;i<issues.length;i++){
      if (daysBetween(issues[i].trckrLastReview,currentDate) > 7) {
        filtered.push(issues[i]);
      }
    }
    printer.issues(issues);
  }
  

  function daysBetween(date1, date2) {
    var one_day=1000*60*60*24;
    var difference_ms = date2.getTime() - date1.getTime();
    return Math.round(difference_ms/one_day);
  }
}