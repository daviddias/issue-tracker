var request     = require('request');
// require('./../db'); // for testing
var Issue       = require('model').getModelByName('Issue');


var options = {
  url: 'https://api.github.com/repos/joyent/node/issues',
  headers: {
    'User-Agent': 'diasdavid'
  },
  qs: {
    state: 'open',
    page: 1
  }
};

module.exports = function() {
  request.get(options, receiveIssues);
}



function receiveIssues(err, response, body) {
  if (err) {
    return console.log(err);
  }
  // console.log(response.headers.link);
  parseIssues(body);

  if (response.headers.link.indexOf('next') !== -1){
    // there is more to fetch
    options.qs.page = options.qs.page + 1;
    request.get(options, receiveIssues);
  } else {
    options.qs.page = 1;
  }
}

function parseIssues(body) {
  if(JSON.parse(body) instanceof Object === true) {
    console.log(body);
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
          console.log('Updated Issue: ' + new Date());
        });

      } else {
        // 1.b if not - store
        var trckr = {
          state: 'new',
          lastReviewd: null,
          pingBack: null
        };
        issue.trckr = trckr;

        var newIssue = Issue.create(issue);
        newIssue.save(function (err, data) {
          if (err) {
            return console.log(err);
          }
          console.log('New Issue Saved: ' + new Date());
        });
      }
    };
  }


}