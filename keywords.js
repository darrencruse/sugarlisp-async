/**
 * Javascript code generation for SugarLisp Async
 */

var sl = require('sugarlisp-core/sl-types'),
    reader = require('sugarlisp-core/reader');

// THE NEXT TWO VARIATIONS ON TRY WERE PART OF GETTING THE ASYNC GENERATORS APPROACH TO WORK
// WHAT THE FINAL SOLUTION IS REMAINS TBD (ONE OR BOTH OF THESE WILL LIKELY GO AWAY)
exports["try*"] = function(forms) {
    if (forms.length < 3) {
      forms.error("try requires one or more expressions followed by a catch expression");
    }
    var c = forms.pop(),
        ind = " ".repeat(this.indent),
        transpiled = sl.transpiled();

    transpiled.push(["function*() {\n" + ind +
           "try {\n", this.transpileExpressions(forms.slice(1)), "\n" +
           ind + "} catch (e) {\n" +
           ind + "return (", (Array.isArray(c) ? this.transpileExpression(c) : c), ")(e);\n" +
           ind + "}\n" + ind + "}"]);

    return transpiled;
}

exports["try-"] = function(forms) {
    if (forms.length < 3) {
      forms.error("try requires one or more expressions followed by a catch expression");
    }
    var c = forms.pop(),
        ind = " ".repeat(this.indent),
        transpiled = sl.transpiled();

    transpiled.push(["try {\n", this.transpileExpressions(forms.slice(1)), "\n" +
           ind + "} catch (e) {\n" +
           ind + "return (", (Array.isArray(c) ? this.transpileExpression(c) : c), ")(e);\n" +
           ind + "}"]);

    this.noReturn = true;

    return transpiled;
}

exports["autoasync"] = function(forms) {

  // for each of our sibling forms
  var afterDirective = false;  // only apply on expressions *following* #autoasync
  forms.parent.forEach(function(form) {
    // but skip ourselves (of course)...
    if(form !== forms) {
      if (afterDirective && Array.isArray(form)) {
        asyncifyFunctions(form);
      }
    }
    else {
      afterDirective = true;
    }
  });

  // the directive has directly expanded the form tree -
  // (our return value can be ignored)
  this.noSemiColon = true;
  return reader.ignorable_form;
}

// Had to timebox this - double check it later -
// I've yet to handle functions nested down under
// other functions - in that case isn't co.wrap
// needed to be added both at the lowest level
// and at the higher levels?  Right now I stop
// at the higher levels.
function asyncifyFunctions(forms) {
  // for each subexpression form...
  forms.forEach(function(form) {
    if (sl.isList(form)) {
      if(sl.typeOf(form[0]) === 'symbol' &&
        sl.valueOf(form[0]) === 'function' &&
        asyncNeeded(form)) {
          form.unshift(sl.atom("async"));
          asyncifyFunctions(form);
      }
      else {
        asyncifyFunctions(form);
      }
    }
  });
}

// this needs beefing up, right now I'm only looking
// for awaits *directly* nested in the parent functions body
function asyncNeeded(funcDecl) {
  // the function body starts after the arguments
  var bodyPos;
  if(sl.typeOf(funcDecl[1]) === 'symbol') {
    bodyPos = 3;  // named function
  }
  else {
    bodyPos = 2;  // anonymous function
  }
  for(var i=bodyPos;i<funcDecl.length;i++) {
    if(sl.isList(funcDecl[i]) && sl.typeOf(funcDecl[i][0]) === 'symbol') {
      if(sl.valueOf(funcDecl[i][0]) === 'await') {
        return true;
      }
    }
  }
  return false;
}
