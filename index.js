// All the per-implementation async macros are available for use when you #use "async".
// i.e. "awaitp" (promises), "asynccb" (callbacks), etc.
//
// To make the generic "await" and "async" keywords use a chosen implementation,
// #include one of the provided "async*-enable.ls" files (after your #use "async")

var utils = require('sugarlisp-core/utils');

module.exports = {
  name: "async",
  lextab: require('./lextab'),
  readtab: require('./readtab'),
  gentab: utils.merge(require('./gentab'),
             require('./macros/asynccb.js'),
             require('./macros/asyncgen-co.js'),
             require('./macros/asyncp.js'),
             require('./macros/sync.js'),
             require('./macros/sequence.js'))
};
