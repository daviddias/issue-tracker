var pr = require('node-print');



exports = module.exports;


exports.issue = function(issue) {


};

exports.issues = function (issues) {
  var filtered = [];
  for (var i=0;i<issues.length;i++){
    filtered.push({
      number: issues[i].number,
      title: issues[i].title,
      url: issues[i].htmlUrl,
      last_review: issues[i].trckrLastReview
    });
  }
  pr.pt(filtered);
};