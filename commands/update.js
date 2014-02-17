require('colors');
var fetchIssues = require('../modules/fetchIssues.js');
var fetchMetadata = require('../modules/fetchMetadata.js');

exports = module.exports = update;

exports.usage =
function usage(name, args) {
  args.
    usage('trckr update');
};

function update(args) {
  console.log('→ Update'.green);
  fetchIssues();
  fetchMetadata();
}