require('colors');
var Issue       = require('model').getModelByName('Issue');
 
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
    issues.forEach(printIssues);

    function printIssues(issue){
      console.log(daysBetween(issue.trckrLastReview,currentDate)); 
      if (daysBetween(issue.trckrLastReview,currentDate) > 7) {
        console.log('++++++++++++++++');
        console.log(issue.title);
        console.log(issue.htmlUrl);
        console.log('++++++++++++++++\n');
      }

    }
  }
  

  function daysBetween(date1, date2) {
    var one_day=1000*60*60*24;
    var difference_ms = date2.getTime() - date1.getTime();
    return Math.round(difference_ms/one_day);
  }
}