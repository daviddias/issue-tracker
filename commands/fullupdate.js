require('colors');

var fetchIssues = require('../modules/fetchIssues.js');

exports = module.exports = fullupdate;

exports.usage =
function usage(name, args) {
  args.
    usage('trckr fullupdate');
};

function fullupdate(args) {
  console.log('→ FULL Update (closed and open issues)'.green);
  fetchIssues();
  fetchIssues('closed');

}