require('colors');
var read        = require('read');
var fs          = require('fs');
var error       = require('../modules/error.js');
var fetchIssues = require('../modules/fetchIssues.js');

exports = module.exports = update;

exports.usage =
function usage(name, args) {
  args.
    usage('trckr update');
};

function update(args, authToken) {
  console.log('→ Update'.green);
  fetchIssues();
}