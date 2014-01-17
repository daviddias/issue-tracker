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
 
  Issue.all({trckr_state:'new'}, gotIssues);
 
  function gotIssues(err, issues) {
    console.log("AAAAA \n",issues[0]);
  }
 
 
  Issue.all({number: 6718}, function (err, things){
    console.log("BBBBBB \n",things);
  });
 
   
}