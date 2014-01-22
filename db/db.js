var userHome = require('osenv').home();

var dbConfig = {
  'level': {
    'db': userHome + '/.trckr-db/'
  }
};

if (process.env.NODE_ENV === 'dev'){
  console.log('RUNNING ON DEV MODE');
  dbConfig.level.db = userHome + '/.trckr-db-dev/';
}

module.exports = dbConfig;
