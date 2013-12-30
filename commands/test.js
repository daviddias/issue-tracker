require('colors');
var read     = require('read');
var fs       = require('fs');
var error    = require('../modules/error.js');
var model    = require('model');

exports = module.exports = test;

exports.usage =
function usage(name, args) {
  args.
    usage('trckr test');
};

function test(args, authToken) {
  console.log('→ Test'.green);

  var Issue = model.getModelByName('Issue');
  console.log('1');
  
  var issue = Issue.create( { "id" : "Bananas"} );
  console.log('2');

  issue.save(function (err, data) {
    if (err) {
      throw err;
    }
    console.log('New item saved!');
  });

}