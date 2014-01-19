require('colors');
var Issue       = require('model').getModelByName('Issue');
 
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
    issues.forEach(printIssues);

    function printIssues(issue){
      console.log('++++++++++++++++');
      console.log(issue.title);
      console.log(issue.htmlUrl);
      console.log('++++++++++++++++\n');
    }
  }
   
}