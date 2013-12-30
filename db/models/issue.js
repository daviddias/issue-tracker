var model = require('model');
var adapter = require('./..').adapter;


var Issue = function () {
  this.adapter = adapter;
  this.property('id', 'string', {required: true});
  // this.property('password', 'string', {required: true});
  // this.property('lastName', 'string');
  // this.property('firstName', 'string');

  // this.validatesPresent('login');
  // this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  // this.validatesLength('login', {min: 3});
  // this.validatesConfirmed('password', 'confirmPassword');
  // this.validatesWithFunction('password', function (s) {
  //     // Something that returns true or false
  //     return s.length > 0;
  // });

  // // Can define methods for instances like this
  // this.someMethod = function () {
  //   // Do some stuff
  // };
};

// // Can also define them on the prototype
// User.prototype.someOtherMethod = function () {
//   // Do some other stuff
// };

model.register('Issue', Issue);

// model.getModelByName('Issue') ? console.log('yeei') : console.log('boo');