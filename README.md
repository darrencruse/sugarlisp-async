# sugarlisp-async
a common syntax for callbacks/promises/generators/synchronous calls

These SugarLisp macros will generate code appropriate for:

* functions taking node style cb(err,result) callbacks
* functions returning standard A+ style Promises
* use with the "co" generator "task runner"
* synchronous calls via the "Sync" suffix naming convention.

The naming of the macros is based loosely on the ES7 async/await proposal.
(but is in no way "spec compliant" - this is sugarlisp not javascript!)

There is a pair of async/await macros for each of the styles mentioned
above.

Ideally there would be some kind of "meta data" allowing sugarlisp to
choose the appropriate macros for a particular library or function you're
using.

Since there is no such standard it's up to you to choose the appropriate
macro for your situation e.g. "awaitcb" if it's a function that uses
a node style callback, "awaitp" if it's a function returning a promise
etc.

