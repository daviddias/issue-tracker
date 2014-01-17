require('colors');
var request     = require('request');
var Issue       = require('model').getModelByName('Issue');
var secret      = require('./config.js').getConfig().secret;
var repo        = require('./config.js').getConfig().repo;
var pipeline    = require('./config.js').getConfig().pipeline;
var error       = require('./error.js');

var options = {
  url: 'https://api.github.com/repos/' + repo + '/issues',
  headers: {
    'User-Agent': secret.useragent
  },
  qs: {
    state: 'open',
    page: 1,
    access_token: secret.accesstoken
  }
};

module.exports = function(state) {
  if(!secret.useragent || !secret.accesstoken){
    error('No access credentials defined');
  }

  if (state) {
    options.qs.state = state;
  }
  request.get(options, receiveIssues);
};

function receiveIssues(err, response, body) {
  if (err) {
    return console.log(err);
  }
  parseIssues(body);

  if (response.headers.link && response.headers.link.indexOf('next') !== -1){
    // there is more to fetch
    options.qs.page = options.qs.page + 1;
    request.get(options, receiveIssues);
  } else {
    options.qs.page = 1;
  }
}

function parseIssues(body) {
  if(body.indexOf('API rate limit exceeded') !== -1) {
    console.log('API rate limit exceeded');
    process.exit(1);
  }

  JSON.parse(body).forEach(storeIssue);
}


function storeIssue(issue) {
  // 1. Verify if exists
  Issue.all({number: issue.number}, gotIssues(issue));

  function gotIssues(_issue) {
    var issue = _issue;

    return function (err, result) {
      if (err) {
        return console.log(err);
      }

      if (result.length > 0) {
        // 1.a if yes - update
        result[0].url = issue.url;
        result[0].html_url = issue.html_url;
        result[0].state = issue.state;
        if(result[0].state === 'closed') {
          result[0]['trckr_state'] = 'closed';
        }
        result[0].title = issue.title;
        result[0].body = issue.body;
        result[0].user = issue.user;
        result[0].labels = issue.labels;
        result[0].assignee = issue.assignee;
        result[0].milestone = issue.milestone;
        result[0].comments = issue.comments;
        result[0].pull_request = issue.pull_request;
        result[0].closed_at = issue.closed_at;
        result[0].created_at = issue.created_at;
        result[0].updated_at = issue.updated_at;
        result[0].save(function (err, data) {
          if (err) {
            return console.log(err);
          }
          console.log('Updated Issue: '.green + issue.number + ' ' + new Date());
        });

      } else {
        // 1.b if not - store
        var newIssue = Issue.create(issue);
        newIssue.trckr_state = 'new';
        newIssue.trckr_lastreview = null;
        newIssue.trckr_pingback = null;
        newIssue.save( function (err, data) {
          if (err) {
            return console.log(err);
          }
          console.log('Data saved \n'.yellow, data);
          console.log('New Issue Saved: '.green + data.number + ' ' + new Date());
        });
      }
    };
  }


}