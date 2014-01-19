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
    console.log('++++++++++++++++ \n',issues[0]);
  }
 
 
  Issue.all({number: 1}, function (err, things){
    console.log('**************** \n',things);
  });
 
   
}