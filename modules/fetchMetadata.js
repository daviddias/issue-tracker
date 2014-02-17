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
      return error(err.detail);
    }
    var thing = JSON.parse(body);
    for(var i=0;i<thing.length;i++){
      metadata.labels.push(thing[i].name);
    }
    cb();
  }
}

function fetchAssignees(cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repo + '/assignees',
    headers: {
      'User-Agent': secret.useragent
    },
    qs: {
      state: 'open',
      page: 1,
      access_token: secret.accesstoken
    }
  };

  request.get(options, receiveAssignees);

  function receiveAssignees(err, response, body) {
    if (err) {
      return error(err.detail);
    }
    var thing = JSON.parse(body);
    for(var i=0;i<thing.length;i++){
      metadata.assignees.push(thing[i].login);
    }
    cb();
  }
}

function fetchMilestones(cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repo + '/milestones',
    headers: {
      'User-Agent': secret.useragent
    },
    qs: {
      state: 'open',
      page: 1,
      access_token: secret.accesstoken
    }
  };

  request.get(options, receiveMilestones);

  function receiveMilestones(err, response, body) {
    if (err) {
      return error(err.detail);
    }
    var thing = JSON.parse(body);
    for(var i=0;i<thing.length;i++){
      metadata.milestones.push(thing[i].title);
    }
    cb();
  }
}