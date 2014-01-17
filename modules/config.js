var userHome    = require('osenv').home();
var configPath  = userHome + '/.trckr-config.json';
var fs          = require('fs');

var config;

// exports = module.exports = config;
exports.getConfig   = getConfig;
exports.loadConfig  = loadConfig;
exports.setDefault  = setDefault;
exports.setRepo     = setRepo;
exports.setPipeline = setPipeline;
exports.setSecret   = setSecret;

function getConfig() {
  return config;
}


function loadConfig() {
  if (!fs.existsSync(configPath)) {
    setDefault();
    saveConfig();
    return;
  } else {
    config = require(configPath);
  }
}


function setDefault(){
  config = {
    pipeline: ['new','beingReviewd','future','closed'],
    repo: 'diasdavid/issue-tracker',
    // repo: 'https://api.github.com/repos/' + joyent/node + '/issues',
    secret: {
      useragent: '',
      accesstoken: ''
    }
  };
}

function saveConfig() {
  fs.writeFileSync(configPath, JSON.stringify(config));
}

function setRepo(url) {
  config.repo = url;
  saveConfig();
}

function setPipeline(pipeline) {
  config.pipeline = pipeline;
  saveConfig();
}

function setSecret(useragent, accesstoken){
  config.secret.useragent   = useragent;
  config.secret.traccesstoken = accesstoken;
  saveConfig();
}