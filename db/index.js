var model = require('model');
var path = require('path');

/// level adapter hack

// var Adapter = require(path.join(path.dirname(require.resolve('model')), 'adapters', 'level')).Adapter
var config  = require('./db.json');


exports = module.exports; 
// exports.adapter = new Adapter(config.level);
exports.adapter = model.createAdapter('level', config.level)

/// require the models

require('./models/issue.js');
