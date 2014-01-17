require('colors');
var read           = require('read');
// var fs          = require('fs');
var error       = require('../modules/error.js');
exports = module.exports = update;

exports.usage =
function usage(name, args) {
  args.
    usage('trckr set <what> [<pipeline>] [<repo>] [<useragent>, accesstoken]');
};

function update(args) {
  console.log('→ Set'.green);

  setWhat(function (what){
    if( what === 'pipeline') {
      setPipeline();
    } else if( what === 'repo') {
      setRepo();
    } else if( what === 'secret') {
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




  }


  function setRepo(){




  }

  function setSecrets(){




  }

}