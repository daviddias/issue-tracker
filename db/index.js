var model   = require('model');
// var path    = require('path');
var fs      = require('fs');

var config  = require('./db.js');

if (!fs.existsSync(config.level.db)){
  fs.mkdirSync(config.level.db);
}

exports = module.exports;
exports.adapter = model.createAdapter('level', config.level);

/// require the models

require('./models/issue.js');


