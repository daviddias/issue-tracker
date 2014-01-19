var model = require('model');
var adapter = require('./..').adapter;

var Issue = function () {
  this.adapter = adapter;
  this.property('url','string');
  this.property('html_url','string');
  this.property('number','number');
  this.property('state','string');
  this.property('title','string');
  this.property('body','string');
  this.property('user','object');
  this.property('labels','object');
  this.property('assignee','object');
  this.property('milestone','object');
  this.property('comments','number');
  this.property('pull_request','object');
  this.property('closed_at','date');
  this.property('created_at','date');
  this.property('updated_at','date');
  this.property('trckrState','string');
  this.property('trckrLastReview','string');
  this.property('trckrPingback','string');
};

model.register('Issue', Issue);