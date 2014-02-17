var userHome    = require('osenv').home();

if (process.env.NODE_ENV === 'dev'){
  var metadataPath  = userHome + '/.trckr-metadata-dev.json';
} else {
  var metadataPath  = userHome + '/.trckr-metadata.json';
}

var fs          = require('fs');
var error       = require('./error');
var colors      = require('colors');
var async       = require('async');
var secret      = require('./config.js').getConfig().secret;
var request     = require('request');
var repo        = require('./config.js').getConfig().repo;

var metadata = {
  labels: [],
  assignees: [],
  milestones: []
};

// exports = module.exports = metadata;
module.exports = exports.fetchMetadata = fetchMetadata;
exports.getMetadata   = getMetadata;
exports.loadMetadata  = loadMetadata;

function getMetadata() {
  loadMetadata();
  return metadata;
}

function loadMetadata() {
  if (!fs.existsSync(metadataPath)) {
    return error('there is no metadata yet, please run trckr update first');
  } else {
    metadata = require(metadataPath);
  }
}

function saveMetadata() {
  fs.writeFileSync(metadataPath, JSON.stringify(metadata));
}

function fetchMetadata() {
  console.log('starting');
  async.parallel([
    fetchLabels,
    fetchAssignees,
    fetchMilestones
  ],done);
  

  function done(err) {
    if (err) {
      return error(err.detail);
    }
    saveMetadata();
    console.log('metadata fetched'.green);
  }
}


function fetchLabels(cb) {

  var options = {
    url: 'https://api.github.com/repos/' + repo + '/labels',
    headers: {
      'User-Agent': secret.useragent
    },
    qs: {
      state: 'open',
      page: 1,
      access_token: secret.accesstoken
    }
  };

  request.get(options, receiveLabels);

  function receiveLabels(err, response, body) {
    if (err) {
      return console.log(err);
    }
    var thing = JSON.parse(body);
    for(var i=0;i<thing.length;i++){
      metadata.labels.push(thing[i].name);
    }
    cb();
  }



}

function fetchAssignees(cb) {
  // assignees 
  // http://developer.github.com/v3/issues/assignees/#list-assignees

  cb();
}

function fetchMilestones(cb) {
  // Get milestones
  // http://developer.github.com/v3/issues/milestones/#list-milestones-for-a-repository
  cb();
}