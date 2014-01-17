require('colors');
// var read        = require('read');
// var fs          = require('fs');
// var error       = require('../modules/error.js');
// var model       = require('model');
var fetchIssues = require('../modules/fetchIssues.js');

exports = module.exports = fullupdate;

exports.usage =
function usage(name, args) {
  args.
    usage('trckr fullupdate');
};

function fullupdate(args, authToken) {
  console.log('→ FULL Update (closed and open issues)'.green);
  fetchIssues();
  fetchIssues('closed');

}