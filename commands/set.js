require('colors');
var read           = require('read');
var error          = require('../modules/error.js');
var config         = require('../modules/config.js');


exports = module.exports = update;
exports.usage =
function usage(name, args) {
  args.
    usage('trckr set <what> [<pipeline>] [<repo>] [<useragent>, accesstoken]');
};

function update(args) {
  console.log('→ Set'.green);

  setWhat(function (what){
    if(what === 'pipeline' || what === 'p') {
      setPipeline();
    } else if(what === 'repo' || what === 'r') {
      setRepo();
    } else if(what === 'secret' || what === 's') {
      setSecrets();
    } else {
      error('You need to define what to set (pipeline,repo,secret)');
    }
  });

  function setWhat(cb) {
    var what = args._[0];
    if (what) {
      return cb(what);
    }

    read({
      prompt: 'set what (pipeline,repo,secret): '
    }, function(err, what) {
      cb(what);
    });
  }


  function setPipeline() {
    getPipeline(function (pipeline) {
      config.setPipeline(pipeline.split(','));
    });

    function getPipeline(cb) {
      var pipeline = args._[1];
      if (pipeline) {
        return cb(pipeline);
      }

      read({
        prompt: 'pipeline (e.g: new,a,b,c,close): '
      }, function(err, pipeline) {
        cb(pipeline);
      });
    }
  }


  function setRepo(){
    getRepo(function (repo) {
      config.setRepo(repo);
    });

    function getRepo(cb) {
      var repo = args._[1];
      if (repo) {
        return cb(repo);
      }

      read({
        prompt: 'repo (e.g: diasdavid/issue-tracker): '
      }, function(err, repo) {
        cb(repo);
      });
    }
  }

  function setSecrets() {
    getUseragent(function (useragent) {
      getAccesstoken(function (accesstoken) {
        config.setSecret(useragent, accesstoken);
      });
    });

    function getUseragent(cb) {
      var useragent = args._[1];
      if (useragent) {
        return cb(useragent);
      }

      read({
        prompt: 'useragent (e.g: diasdavid): '
      }, function(err, useragent) {
        cb(useragent);
      });
    }

    function getAccesstoken(cb) {
      var accesstoken = args._[2];
      if (accesstoken) {
        return cb(accesstoken);
      }

      read({
        prompt: 'accesstoken : '
      }, function(err, accesstoken) {
        cb(accesstoken);
      });
    }
  }

}