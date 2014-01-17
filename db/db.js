var userHome = require('osenv').home();

module.exports =
{
  'level': {
    'db': userHome + '/.trkr-db/'
  }
};