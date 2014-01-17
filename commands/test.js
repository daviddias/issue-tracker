require('colors');

exports = module.exports = test;

exports.usage =
function usage(name, args) {
  args.
    usage('trckr test');
};

function test(args) {
  console.log('→ Test'.green);
}