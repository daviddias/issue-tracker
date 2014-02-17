var pr = require('node-print');



exports = module.exports;


exports.issue = function(issue) {


};

exports.issues = function (issues) {
  var filtered = [];
  for (var i=0;i<issues.length;i++){
    var labels = [];
    var assignee = issues[i].assignee ? issues[i].assignee.login : '';
    var milestone = issues[i].milestone ? issues[i].milestone.title : '';
    var last_review =
    issues[i].trckrLastReview ? issues[i].trckrLastReview : 'not reviewed';

    if (issues[i].labels.length>0){
      for(var j=0;j<issues[i].labels.length;j++){
        labels.push(issues[i].labels[j].name);
      }
    } else {
      labels.push('');
    }

    filtered.push({
      number: issues[i].number,
      title: issues[i].title.substring(0, 42) + '...',
      url: issues[i].htmlUrl,
      last_review: last_review,
      labels: labels.toString(),
      assignee: assignee,
      milestone: milestone
    });
  }
  pr.pt(filtered);
};
