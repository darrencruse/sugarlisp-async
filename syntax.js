var reader = require('sugarlisp-core/reader');

// #autoasync infers the "async" keyword without them entering it.
// The code behind this must run after the form tree has been fully
// parsed and read in - we translate it here as if they'd
// entered the function call (autoasync...)
exports['#autoasync'] = reader.parenfree(0, {alternate:"autoasync"});

// these are experimental right now as part of generator support:
exports['try-'] = reader.symbol;
exports['try*'] = reader.symbol;
