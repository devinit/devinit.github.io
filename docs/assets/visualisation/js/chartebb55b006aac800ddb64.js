(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_scattergl_attributes_js-node_modules_plotly_js_src_-2d45ae"],{

/***/ "./node_modules/abs-svg-path/index.js":
/*!********************************************!*\
  !*** ./node_modules/abs-svg-path/index.js ***!
  \********************************************/
/***/ ((module) => {


module.exports = absolutize

/**
 * redefine `path` with absolute coordinates
 *
 * @param {Array} path
 * @return {Array}
 */

function absolutize(path){
	var startX = 0
	var startY = 0
	var x = 0
	var y = 0

	return path.map(function(seg){
		seg = seg.slice()
		var type = seg[0]
		var command = type.toUpperCase()

		// is relative
		if (type != command) {
			seg[0] = command
			switch (type) {
				case 'a':
					seg[6] += x
					seg[7] += y
					break
				case 'v':
					seg[1] += y
					break
				case 'h':
					seg[1] += x
					break
				default:
					for (var i = 1; i < seg.length;) {
						seg[i++] += x
						seg[i++] += y
					}
			}
		}

		// update cursor state
		switch (command) {
			case 'Z':
				x = startX
				y = startY
				break
			case 'H':
				x = seg[1]
				break
			case 'V':
				y = seg[1]
				break
			case 'M':
				x = startX = seg[1]
				y = startY = seg[2]
				break
			default:
				x = seg[seg.length - 2]
				y = seg[seg.length - 1]
		}

		return seg
	})
}


/***/ }),

/***/ "./node_modules/array-bounds/index.js":
/*!********************************************!*\
  !*** ./node_modules/array-bounds/index.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";


module.exports = normalize;

function normalize (arr, dim) {
	if (!arr || arr.length == null) throw Error('Argument should be an array')

	if (dim == null) dim = 1
	else dim = Math.floor(dim)

	var bounds = Array(dim * 2)

	for (var offset = 0; offset < dim; offset++) {
		var max = -Infinity, min = Infinity, i = offset, l = arr.length;

		for (; i < l; i+=dim) {
			if (arr[i] > max) max = arr[i];
			if (arr[i] < min) min = arr[i];
		}

		bounds[offset] = min
		bounds[dim + offset] = max
	}

	return bounds;
}


/***/ }),

/***/ "./node_modules/array-normalize/index.js":
/*!***********************************************!*\
  !*** ./node_modules/array-normalize/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getBounds = __webpack_require__(/*! array-bounds */ "./node_modules/array-bounds/index.js")

module.exports = normalize;

function normalize (arr, dim, bounds) {
	if (!arr || arr.length == null) throw Error('Argument should be an array')

	if (dim == null) dim = 1
	if (bounds == null) bounds = getBounds(arr, dim)

	for (var offset = 0; offset < dim; offset++) {
		var max = bounds[dim + offset], min = bounds[offset], i = offset, l = arr.length;

		if (max === Infinity && min === -Infinity) {
			for (i = offset; i < l; i+=dim) {
				arr[i] = arr[i] === max ? 1 : arr[i] === min ? 0 : .5
			}
		}
		else if (max === Infinity) {
			for (i = offset; i < l; i+=dim) {
				arr[i] = arr[i] === max ? 1 : 0
			}
		}
		else if (min === -Infinity) {
			for (i = offset; i < l; i+=dim) {
				arr[i] = arr[i] === min ? 0 : 1
			}
		}
		else {
			var range = max - min
			for (i = offset; i < l; i+=dim) {
				if (!isNaN(arr[i])) {
					arr[i] = range === 0 ? .5 : (arr[i] - min) / range
				}
			}
		}
	}

	return arr;
}


/***/ }),

/***/ "./node_modules/assert/assert.js":
/*!***************************************!*\
  !*** ./node_modules/assert/assert.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (__webpack_require__.g.Buffer && typeof __webpack_require__.g.Buffer.isBuffer === 'function') {
    return __webpack_require__.g.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(/*! util/ */ "./node_modules/assert/node_modules/util/util.js");
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof __webpack_require__.g.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};


/***/ }),

/***/ "./node_modules/assert/node_modules/inherits/inherits_browser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/assert/node_modules/inherits/inherits_browser.js ***!
  \***********************************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/assert/node_modules/util/support/isBufferBrowser.js":
/*!**************************************************************************!*\
  !*** ./node_modules/assert/node_modules/util/support/isBufferBrowser.js ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/assert/node_modules/util/util.js":
/*!*******************************************************!*\
  !*** ./node_modules/assert/node_modules/util/util.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(__webpack_require__.g.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/assert/node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/assert/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


/***/ }),

/***/ "./node_modules/bitmap-sdf/index.js":
/*!******************************************!*\
  !*** ./node_modules/bitmap-sdf/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var clamp = __webpack_require__(/*! clamp */ "./node_modules/clamp/index.js")

module.exports = calcSDF

var INF = 1e20;

function calcSDF(src, options) {
    if (!options) options = {}

    var cutoff = options.cutoff == null ? 0.25 : options.cutoff
    var radius = options.radius == null ? 8 : options.radius
    var channel = options.channel || 0
    var w, h, size, data, intData, stride, ctx, canvas, imgData, i, l

    // handle image container
    if (ArrayBuffer.isView(src) || Array.isArray(src)) {
        if (!options.width || !options.height) throw Error('For raw data width and height should be provided by options')
        w = options.width, h = options.height
        data = src

        if (!options.stride) stride = Math.floor(src.length / w / h)
        else stride = options.stride
    }
    else {
        if (window.HTMLCanvasElement && src instanceof window.HTMLCanvasElement) {
            canvas = src
            ctx = canvas.getContext('2d')
            w = canvas.width, h = canvas.height
            imgData = ctx.getImageData(0, 0, w, h)
            data = imgData.data
            stride = 4
        }
        else if (window.CanvasRenderingContext2D && src instanceof window.CanvasRenderingContext2D) {
            canvas = src.canvas
            ctx = src
            w = canvas.width, h = canvas.height
            imgData = ctx.getImageData(0, 0, w, h)
            data = imgData.data
            stride = 4
        }
        else if (window.ImageData && src instanceof window.ImageData) {
            imgData = src
            w = src.width, h = src.height
            data = imgData.data
            stride = 4
        }
    }

    size = Math.max(w, h)

    //convert int data to floats
    if ((window.Uint8ClampedArray && data instanceof window.Uint8ClampedArray) || (window.Uint8Array && data instanceof window.Uint8Array)) {
        intData = data
        data = Array(w*h)

        for (i = 0, l = intData.length; i < l; i++) {
            data[i] = intData[i*stride + channel] / 255
        }
    }
    else {
        if (stride !== 1) throw Error('Raw data can have only 1 value per pixel')
    }

    // temporary arrays for the distance transform
    var gridOuter = Array(w * h)
    var gridInner = Array(w * h)
    var f = Array(size)
    var d = Array(size)
    var z = Array(size + 1)
    var v = Array(size)

    for (i = 0, l = w * h; i < l; i++) {
        var a = data[i]
        gridOuter[i] = a === 1 ? 0 : a === 0 ? INF : Math.pow(Math.max(0, 0.5 - a), 2)
        gridInner[i] = a === 1 ? INF : a === 0 ? 0 : Math.pow(Math.max(0, a - 0.5), 2)
    }

    edt(gridOuter, w, h, f, d, v, z)
    edt(gridInner, w, h, f, d, v, z)

    var dist = window.Float32Array ? new Float32Array(w * h) : new Array(w * h)

    for (i = 0, l = w*h; i < l; i++) {
        dist[i] = clamp(1 - ( (gridOuter[i] - gridInner[i]) / radius + cutoff), 0, 1)
    }

    return dist
}

// 2D Euclidean distance transform by Felzenszwalb & Huttenlocher https://cs.brown.edu/~pff/dt/
function edt(data, width, height, f, d, v, z) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            f[y] = data[y * width + x]
        }
        edt1d(f, d, v, z, height)
        for (y = 0; y < height; y++) {
            data[y * width + x] = d[y]
        }
    }
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            f[x] = data[y * width + x]
        }
        edt1d(f, d, v, z, width)
        for (x = 0; x < width; x++) {
            data[y * width + x] = Math.sqrt(d[x])
        }
    }
}

// 1D squared distance transform
function edt1d(f, d, v, z, n) {
    v[0] = 0;
    z[0] = -INF
    z[1] = +INF

    for (var q = 1, k = 0; q < n; q++) {
        var s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k])
        while (s <= z[k]) {
            k--
            s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k])
        }
        k++
        v[k] = q
        z[k] = s
        z[k + 1] = +INF
    }

    for (q = 0, k = 0; q < n; q++) {
        while (z[k + 1] < q) k++
        d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]
    }
}


/***/ }),

/***/ "./node_modules/color-id/index.js":
/*!****************************************!*\
  !*** ./node_modules/color-id/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/** @module  color-id */



var clamp = __webpack_require__(/*! clamp */ "./node_modules/clamp/index.js")

module.exports = toNumber
module.exports.to = toNumber
module.exports.from = fromNumber

function toNumber (rgba, normalized) {
	if(normalized == null) normalized = true

	var r = rgba[0], g = rgba[1], b = rgba[2], a = rgba[3]

	if (a == null) a = normalized ? 1 : 255

	if (normalized) {
		r *= 255
		g *= 255
		b *= 255
		a *= 255
	}

	r = clamp(r, 0, 255) & 0xFF
	g = clamp(g, 0, 255) & 0xFF
	b = clamp(b, 0, 255) & 0xFF
	a = clamp(a, 0, 255) & 0xFF

	//hi-order shift converts to -1, so we can't use <<24
	var n = (r * 0x01000000) + (g << 16) + (b << 8) + (a)

	return n
}

function fromNumber (n, normalized) {
	n = +n

	var r = n >>> 24
	var g = (n & 0x00ff0000) >>> 16
	var b = (n & 0x0000ff00) >>> 8
	var a = n & 0x000000ff

	if (normalized === false) return [r, g, b, a]

	return [r/255, g/255, b/255, a/255]
}


/***/ }),

/***/ "./node_modules/d/auto-bind.js":
/*!*************************************!*\
  !*** ./node_modules/d/auto-bind.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue             = __webpack_require__(/*! type/value/is */ "./node_modules/type/value/is.js")
  , ensureValue         = __webpack_require__(/*! type/value/ensure */ "./node_modules/type/value/ensure.js")
  , ensurePlainFunction = __webpack_require__(/*! type/plain-function/ensure */ "./node_modules/type/plain-function/ensure.js")
  , copy                = __webpack_require__(/*! es5-ext/object/copy */ "./node_modules/es5-ext/object/copy.js")
  , normalizeOptions    = __webpack_require__(/*! es5-ext/object/normalize-options */ "./node_modules/es5-ext/object/normalize-options.js")
  , map                 = __webpack_require__(/*! es5-ext/object/map */ "./node_modules/es5-ext/object/map.js");

var bind = Function.prototype.bind
  , defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, options) {
	var value = ensureValue(desc) && ensurePlainFunction(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (isValue(options.resolveContext)) ensurePlainFunction(options.resolveContext);
	return map(props, function (desc, name) { return define(name, desc, options); });
};


/***/ }),

/***/ "./node_modules/d/index.js":
/*!*********************************!*\
  !*** ./node_modules/d/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue         = __webpack_require__(/*! type/value/is */ "./node_modules/type/value/is.js")
  , isPlainFunction = __webpack_require__(/*! type/plain-function/is */ "./node_modules/type/plain-function/is.js")
  , assign          = __webpack_require__(/*! es5-ext/object/assign */ "./node_modules/es5-ext/object/assign/index.js")
  , normalizeOpts   = __webpack_require__(/*! es5-ext/object/normalize-options */ "./node_modules/es5-ext/object/normalize-options.js")
  , contains        = __webpack_require__(/*! es5-ext/string/#/contains */ "./node_modules/es5-ext/string/\u0000#/contains/index.js");

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),

/***/ "./node_modules/draw-svg-path/index.js":
/*!*********************************************!*\
  !*** ./node_modules/draw-svg-path/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var abs = __webpack_require__(/*! abs-svg-path */ "./node_modules/abs-svg-path/index.js")
var normalize = __webpack_require__(/*! normalize-svg-path */ "./node_modules/normalize-svg-path/index.js")

var methods = {
  'M': 'moveTo',
  'C': 'bezierCurveTo'
}

module.exports = function(context, segments) {
  context.beginPath()

  // Make path easy to reproduce.
  normalize(abs(segments)).forEach(
    function(segment) {
      var command = segment[0]
      var args = segment.slice(1)

      // Convert the path command to a context method.
      context[methods[command]].apply(context, args)
    }
  )

  context.closePath()
}


/***/ }),

/***/ "./node_modules/earcut/src/earcut.js":
/*!*******************************************!*\
  !*** ./node_modules/earcut/src/earcut.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


module.exports = earcut;
module.exports.default = earcut;

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode || outerNode.next === outerNode.prev) return triangles;

    var minX, minY, maxX, maxY, x, y, invSize;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and invSize are later used to transform coords into integers for z-order calculation
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 1 / invSize : 0;
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) break;
            again = true;

        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            // skipping the next vertex leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, invSize) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = zOrder(minTX, minTY, minX, minY, invSize),
        maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);

    var p = ear.prevZ,
        n = ear.nextZ;

    // look for points inside the triangle in both directions
    while (p && p.z >= minZ && n && n.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;

        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    // look for remaining points in decreasing z-order
    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    // look for remaining points in increasing z-order
    while (n && n.z <= maxZ) {
        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return filterPoints(p);
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, invSize);
                earcutLinked(c, triangles, dim, minX, minY, invSize);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);

        // filter collinear points around the cuts
        filterPoints(outerNode, outerNode.next);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m; // hole touches outer segment; pick leftmost endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m;

    do {
        if (hx >= p.x && p.x >= mx && hx !== p.x &&
                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if (locallyInside(p, hole) &&
                (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && sectorContainsSector(m, p)))))) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    } while (p !== stop);

    return m;
}

// whether sector in vertex m contains sector in vertex p in the same coordinates
function sectorContainsSector(m, p) {
    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, invSize) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }
            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;

    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and inverse of the longer side of data bbox
function zOrder(x, y, minX, minY, invSize) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) * invSize;
    y = 32767 * (y - minY) * invSize;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // dones't intersect other edges
           (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
            (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
            equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0); // special zero-length case
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    var o1 = sign(area(p1, q1, p2));
    var o2 = sign(area(p1, q1, q2));
    var o3 = sign(area(p2, q2, p1));
    var o4 = sign(area(p2, q2, q1));

    if (o1 !== o2 && o3 !== o4) return true; // general case

    if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1
    if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1
    if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2
    if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

    return false;
}

// for collinear points p, q, r, check if point q lies on segment pr
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}

function sign(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
                intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertex index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertex nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
        Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim},
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};


/***/ }),

/***/ "./node_modules/es5-ext/array/\u0000#/clear.js":
/*!************************************************!*\
  !*** ./node_modules/es5-ext/array/ #/clear.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear



var value = __webpack_require__(/*! ../../object/valid-value */ "./node_modules/es5-ext/object/valid-value.js");

module.exports = function () {
	value(this).length = 0;
	return this;
};


/***/ }),

/***/ "./node_modules/es5-ext/array/from/index.js":
/*!**************************************************!*\
  !*** ./node_modules/es5-ext/array/from/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es5-ext/array/from/is-implemented.js")() ? Array.from : __webpack_require__(/*! ./shim */ "./node_modules/es5-ext/array/from/shim.js");


/***/ }),

/***/ "./node_modules/es5-ext/array/from/is-implemented.js":
/*!***********************************************************!*\
  !*** ./node_modules/es5-ext/array/from/is-implemented.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== "function") return false;
	arr = ["raz", "dwa"];
	result = from(arr);
	return Boolean(result && result !== arr && result[1] === "dwa");
};


/***/ }),

/***/ "./node_modules/es5-ext/array/from/shim.js":
/*!*************************************************!*\
  !*** ./node_modules/es5-ext/array/from/shim.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var iteratorSymbol = __webpack_require__(/*! es6-symbol */ "./node_modules/es6-symbol/index.js").iterator
  , isArguments    = __webpack_require__(/*! ../../function/is-arguments */ "./node_modules/es5-ext/function/is-arguments.js")
  , isFunction     = __webpack_require__(/*! ../../function/is-function */ "./node_modules/es5-ext/function/is-function.js")
  , toPosInt       = __webpack_require__(/*! ../../number/to-pos-integer */ "./node_modules/es5-ext/number/to-pos-integer.js")
  , callable       = __webpack_require__(/*! ../../object/valid-callable */ "./node_modules/es5-ext/object/valid-callable.js")
  , validValue     = __webpack_require__(/*! ../../object/valid-value */ "./node_modules/es5-ext/object/valid-value.js")
  , isValue        = __webpack_require__(/*! ../../object/is-value */ "./node_modules/es5-ext/object/is-value.js")
  , isString       = __webpack_require__(/*! ../../string/is-string */ "./node_modules/es5-ext/string/is-string.js")
  , isArray        = Array.isArray
  , call           = Function.prototype.call
  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

// eslint-disable-next-line complexity, max-lines-per-function
module.exports = function (arrayLike/*, mapFn, thisArg*/) {
	var mapFn = arguments[1]
	  , thisArg = arguments[2]
	  , Context
	  , i
	  , j
	  , arr
	  , length
	  , code
	  , iterator
	  , result
	  , getIterator
	  , value;

	arrayLike = Object(validValue(arrayLike));

	if (isValue(mapFn)) callable(mapFn);
	if (!this || this === Array || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				length = arrayLike.length;
				if (length !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array((length = arrayLike.length));
				for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Context = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Context) arr = new Context();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
				result = iterator.next();
				++i;
			}
			length = i;
		} else if (isString(arrayLike)) {
			// Source: String
			length = arrayLike.length;
			if (Context) arr = new Context();
			for (i = 0, j = 0; i < length; ++i) {
				value = arrayLike[i];
				if (i + 1 < length) {
					code = value.charCodeAt(0);
					// eslint-disable-next-line max-depth
					if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, j, desc);
				} else {
					arr[j] = value;
				}
				++j;
			}
			length = j;
		}
	}
	if (length === undefined) {
		// Source: array or array-like
		length = toPosInt(arrayLike.length);
		if (Context) arr = new Context(length);
		for (i = 0; i < length; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (Context) {
				desc.value = value;
				defineProperty(arr, i, desc);
			} else {
				arr[i] = value;
			}
		}
	}
	if (Context) {
		desc.value = null;
		arr.length = length;
	}
	return arr;
};


/***/ }),

/***/ "./node_modules/es5-ext/function/is-arguments.js":
/*!*******************************************************!*\
  !*** ./node_modules/es5-ext/function/is-arguments.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


var objToString = Object.prototype.toString
  , id = objToString.call((function () { return arguments; })());

module.exports = function (value) { return objToString.call(value) === id; };


/***/ }),

/***/ "./node_modules/es5-ext/function/is-function.js":
/*!******************************************************!*\
  !*** ./node_modules/es5-ext/function/is-function.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


var objToString = Object.prototype.toString
  , isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);

module.exports = function (value) {
	return typeof value === "function" && isFunctionStringTag(objToString.call(value));
};


/***/ }),

/***/ "./node_modules/es5-ext/function/noop.js":
/*!***********************************************!*\
  !*** ./node_modules/es5-ext/function/noop.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),

/***/ "./node_modules/es5-ext/math/sign/index.js":
/*!*************************************************!*\
  !*** ./node_modules/es5-ext/math/sign/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es5-ext/math/sign/is-implemented.js")() ? Math.sign : __webpack_require__(/*! ./shim */ "./node_modules/es5-ext/math/sign/shim.js");


/***/ }),

/***/ "./node_modules/es5-ext/math/sign/is-implemented.js":
/*!**********************************************************!*\
  !*** ./node_modules/es5-ext/math/sign/is-implemented.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== "function") return false;
	return sign(10) === 1 && sign(-20) === -1;
};


/***/ }),

/***/ "./node_modules/es5-ext/math/sign/shim.js":
/*!************************************************!*\
  !*** ./node_modules/es5-ext/math/sign/shim.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || value === 0) return value;
	return value > 0 ? 1 : -1;
};


/***/ }),

/***/ "./node_modules/es5-ext/number/to-integer.js":
/*!***************************************************!*\
  !*** ./node_modules/es5-ext/number/to-integer.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var sign  = __webpack_require__(/*! ../math/sign */ "./node_modules/es5-ext/math/sign/index.js")
  , abs   = Math.abs
  , floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if (value === 0 || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};


/***/ }),

/***/ "./node_modules/es5-ext/number/to-pos-integer.js":
/*!*******************************************************!*\
  !*** ./node_modules/es5-ext/number/to-pos-integer.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toInteger = __webpack_require__(/*! ./to-integer */ "./node_modules/es5-ext/number/to-integer.js")
  , max       = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };


/***/ }),

/***/ "./node_modules/es5-ext/object/_iterate.js":
/*!*************************************************!*\
  !*** ./node_modules/es5-ext/object/_iterate.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable                = __webpack_require__(/*! ./valid-callable */ "./node_modules/es5-ext/object/valid-callable.js")
  , value                   = __webpack_require__(/*! ./valid-value */ "./node_modules/es5-ext/object/valid-value.js")
  , bind                    = Function.prototype.bind
  , call                    = Function.prototype.call
  , keys                    = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== "function") method = list[method];
		return call.call(method, list, function (key, index) {
			if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};


/***/ }),

/***/ "./node_modules/es5-ext/object/assign/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/es5-ext/object/assign/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es5-ext/object/assign/is-implemented.js")() ? Object.assign : __webpack_require__(/*! ./shim */ "./node_modules/es5-ext/object/assign/shim.js");


/***/ }),

/***/ "./node_modules/es5-ext/object/assign/is-implemented.js":
/*!**************************************************************!*\
  !*** ./node_modules/es5-ext/object/assign/is-implemented.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};


/***/ }),

/***/ "./node_modules/es5-ext/object/assign/shim.js":
/*!****************************************************!*\
  !*** ./node_modules/es5-ext/object/assign/shim.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys  = __webpack_require__(/*! ../keys */ "./node_modules/es5-ext/object/keys/index.js")
  , value = __webpack_require__(/*! ../valid-value */ "./node_modules/es5-ext/object/valid-value.js")
  , max   = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),

/***/ "./node_modules/es5-ext/object/copy.js":
/*!*********************************************!*\
  !*** ./node_modules/es5-ext/object/copy.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var aFrom  = __webpack_require__(/*! ../array/from */ "./node_modules/es5-ext/array/from/index.js")
  , assign = __webpack_require__(/*! ./assign */ "./node_modules/es5-ext/object/assign/index.js")
  , value  = __webpack_require__(/*! ./valid-value */ "./node_modules/es5-ext/object/valid-value.js");

module.exports = function (obj/*, propertyNames, options*/) {
	var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
	if (copy !== obj && !propertyNames) return copy;
	var result = {};
	if (propertyNames) {
		aFrom(propertyNames, function (propertyName) {
			if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
		});
	} else {
		assign(result, obj);
	}
	return result;
};


/***/ }),

/***/ "./node_modules/es5-ext/object/create.js":
/*!***********************************************!*\
  !*** ./node_modules/es5-ext/object/create.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804



var create = Object.create, shim;

if (!__webpack_require__(/*! ./set-prototype-of/is-implemented */ "./node_modules/es5-ext/object/set-prototype-of/is-implemented.js")()) {
	shim = __webpack_require__(/*! ./set-prototype-of/shim */ "./node_modules/es5-ext/object/set-prototype-of/shim.js");
}

module.exports = (function () {
	var nullObject, polyProps, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	polyProps = {};
	desc = { configurable: false, enumerable: false, writable: true, value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === "__proto__") {
			polyProps[name] = {
				configurable: true,
				enumerable: false,
				writable: true,
				value: undefined
			};
			return;
		}
		polyProps[name] = desc;
	});
	Object.defineProperties(nullObject, polyProps);

	Object.defineProperty(shim, "nullPolyfill", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: nullObject
	});

	return function (prototype, props) {
		return create(prototype === null ? nullObject : prototype, props);
	};
})();


/***/ }),

/***/ "./node_modules/es5-ext/object/for-each.js":
/*!*************************************************!*\
  !*** ./node_modules/es5-ext/object/for-each.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./_iterate */ "./node_modules/es5-ext/object/_iterate.js")("forEach");


/***/ }),

/***/ "./node_modules/es5-ext/object/is-object.js":
/*!**************************************************!*\
  !*** ./node_modules/es5-ext/object/is-object.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(/*! ./is-value */ "./node_modules/es5-ext/object/is-value.js");

var map = { function: true, object: true };

module.exports = function (value) { return (isValue(value) && map[typeof value]) || false; };


/***/ }),

/***/ "./node_modules/es5-ext/object/is-value.js":
/*!*************************************************!*\
  !*** ./node_modules/es5-ext/object/is-value.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _undefined = __webpack_require__(/*! ../function/noop */ "./node_modules/es5-ext/function/noop.js")(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),

/***/ "./node_modules/es5-ext/object/keys/index.js":
/*!***************************************************!*\
  !*** ./node_modules/es5-ext/object/keys/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es5-ext/object/keys/is-implemented.js")() ? Object.keys : __webpack_require__(/*! ./shim */ "./node_modules/es5-ext/object/keys/shim.js");


/***/ }),

/***/ "./node_modules/es5-ext/object/keys/is-implemented.js":
/*!************************************************************!*\
  !*** ./node_modules/es5-ext/object/keys/is-implemented.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};


/***/ }),

/***/ "./node_modules/es5-ext/object/keys/shim.js":
/*!**************************************************!*\
  !*** ./node_modules/es5-ext/object/keys/shim.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(/*! ../is-value */ "./node_modules/es5-ext/object/is-value.js");

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),

/***/ "./node_modules/es5-ext/object/map.js":
/*!********************************************!*\
  !*** ./node_modules/es5-ext/object/map.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callable = __webpack_require__(/*! ./valid-callable */ "./node_modules/es5-ext/object/valid-callable.js")
  , forEach  = __webpack_require__(/*! ./for-each */ "./node_modules/es5-ext/object/for-each.js")
  , call     = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		result[key] = call.call(cb, thisArg, value, key, targetObj, index);
	});
	return result;
};


/***/ }),

/***/ "./node_modules/es5-ext/object/normalize-options.js":
/*!**********************************************************!*\
  !*** ./node_modules/es5-ext/object/normalize-options.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(/*! ./is-value */ "./node_modules/es5-ext/object/is-value.js");

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),

/***/ "./node_modules/es5-ext/object/set-prototype-of/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/es5-ext/object/set-prototype-of/index.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es5-ext/object/set-prototype-of/is-implemented.js")() ? Object.setPrototypeOf : __webpack_require__(/*! ./shim */ "./node_modules/es5-ext/object/set-prototype-of/shim.js");


/***/ }),

/***/ "./node_modules/es5-ext/object/set-prototype-of/is-implemented.js":
/*!************************************************************************!*\
  !*** ./node_modules/es5-ext/object/set-prototype-of/is-implemented.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};

module.exports = function (/* CustomCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== "function") return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
};


/***/ }),

/***/ "./node_modules/es5-ext/object/set-prototype-of/shim.js":
/*!**************************************************************!*\
  !*** ./node_modules/es5-ext/object/set-prototype-of/shim.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint no-proto: "off" */

// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554



var isObject         = __webpack_require__(/*! ../is-object */ "./node_modules/es5-ext/object/is-object.js")
  , value            = __webpack_require__(/*! ../valid-value */ "./node_modules/es5-ext/object/valid-value.js")
  , objIsPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty   = Object.defineProperty
  , nullDesc         = { configurable: true, enumerable: false, writable: true, value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if (prototype === null || isObject(prototype)) return obj;
	throw new TypeError("Prototype must be null or an object");
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = objIsPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, "level", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: status.level
	});
})(
	(function () {
		var tmpObj1 = Object.create(null)
		  , tmpObj2 = {}
		  , set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(tmpObj1, tmpObj2);
			} catch (ignore) {}
			if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };
		}

		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };

		tmpObj1 = {};
		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };

		return false;
	})()
);

__webpack_require__(/*! ../create */ "./node_modules/es5-ext/object/create.js");


/***/ }),

/***/ "./node_modules/es5-ext/object/valid-callable.js":
/*!*******************************************************!*\
  !*** ./node_modules/es5-ext/object/valid-callable.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),

/***/ "./node_modules/es5-ext/object/valid-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/es5-ext/object/valid-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isObject = __webpack_require__(/*! ./is-object */ "./node_modules/es5-ext/object/is-object.js");

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};


/***/ }),

/***/ "./node_modules/es5-ext/object/valid-value.js":
/*!****************************************************!*\
  !*** ./node_modules/es5-ext/object/valid-value.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(/*! ./is-value */ "./node_modules/es5-ext/object/is-value.js");

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),

/***/ "./node_modules/es5-ext/string/\u0000#/contains/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/es5-ext/string/ #/contains/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es5-ext/string/\u0000#/contains/is-implemented.js")() ? String.prototype.contains : __webpack_require__(/*! ./shim */ "./node_modules/es5-ext/string/\u0000#/contains/shim.js");


/***/ }),

/***/ "./node_modules/es5-ext/string/\u0000#/contains/is-implemented.js":
/*!*******************************************************************!*\
  !*** ./node_modules/es5-ext/string/ #/contains/is-implemented.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};


/***/ }),

/***/ "./node_modules/es5-ext/string/\u0000#/contains/shim.js":
/*!*********************************************************!*\
  !*** ./node_modules/es5-ext/string/ #/contains/shim.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),

/***/ "./node_modules/es5-ext/string/is-string.js":
/*!**************************************************!*\
  !*** ./node_modules/es5-ext/string/is-string.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


var objToString = Object.prototype.toString, id = objToString.call("");

module.exports = function (value) {
	return (
		typeof value === "string" ||
		(value &&
			typeof value === "object" &&
			(value instanceof String || objToString.call(value) === id)) ||
		false
	);
};


/***/ }),

/***/ "./node_modules/es5-ext/string/random-uniq.js":
/*!****************************************************!*\
  !*** ./node_modules/es5-ext/string/random-uniq.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


var generated = Object.create(null), random = Math.random;

module.exports = function () {
	var str;
	do {
		str = random().toString(36).slice(2);
	} while (generated[str]);
	return str;
};


/***/ }),

/***/ "./node_modules/es6-iterator/array.js":
/*!********************************************!*\
  !*** ./node_modules/es6-iterator/array.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var setPrototypeOf = __webpack_require__(/*! es5-ext/object/set-prototype-of */ "./node_modules/es5-ext/object/set-prototype-of/index.js")
  , contains       = __webpack_require__(/*! es5-ext/string/#/contains */ "./node_modules/es5-ext/string/\u0000#/contains/index.js")
  , d              = __webpack_require__(/*! d */ "./node_modules/d/index.js")
  , Symbol         = __webpack_require__(/*! es6-symbol */ "./node_modules/es6-symbol/index.js")
  , Iterator       = __webpack_require__(/*! ./ */ "./node_modules/es6-iterator/index.js");

var defineProperty = Object.defineProperty, ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) throw new TypeError("Constructor requires 'new'");
	Iterator.call(this, arr);
	if (!kind) kind = "value";
	else if (contains.call(kind, "key+value")) kind = "key+value";
	else if (contains.call(kind, "key")) kind = "key";
	else kind = "value";
	defineProperty(this, "__kind__", d("", kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete ArrayIterator.prototype.constructor;

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	_resolve: d(function (i) {
		if (this.__kind__ === "value") return this.__list__[i];
		if (this.__kind__ === "key+value") return [i, this.__list__[i]];
		return i;
	})
});
defineProperty(ArrayIterator.prototype, Symbol.toStringTag, d("c", "Array Iterator"));


/***/ }),

/***/ "./node_modules/es6-iterator/for-of.js":
/*!*********************************************!*\
  !*** ./node_modules/es6-iterator/for-of.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isArguments = __webpack_require__(/*! es5-ext/function/is-arguments */ "./node_modules/es5-ext/function/is-arguments.js")
  , callable    = __webpack_require__(/*! es5-ext/object/valid-callable */ "./node_modules/es5-ext/object/valid-callable.js")
  , isString    = __webpack_require__(/*! es5-ext/string/is-string */ "./node_modules/es5-ext/string/is-string.js")
  , get         = __webpack_require__(/*! ./get */ "./node_modules/es6-iterator/get.js");

var isArray = Array.isArray, call = Function.prototype.call, some = Array.prototype.some;

module.exports = function (iterable, cb /*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, length, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = "array";
	else if (isString(iterable)) mode = "string";
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () {
		broken = true;
	};
	if (mode === "array") {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			return broken;
		});
		return;
	}
	if (mode === "string") {
		length = iterable.length;
		for (i = 0; i < length; ++i) {
			char = iterable[i];
			if (i + 1 < length) {
				code = char.charCodeAt(0);
				if (code >= 0xd800 && code <= 0xdbff) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};


/***/ }),

/***/ "./node_modules/es6-iterator/get.js":
/*!******************************************!*\
  !*** ./node_modules/es6-iterator/get.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isArguments    = __webpack_require__(/*! es5-ext/function/is-arguments */ "./node_modules/es5-ext/function/is-arguments.js")
  , isString       = __webpack_require__(/*! es5-ext/string/is-string */ "./node_modules/es5-ext/string/is-string.js")
  , ArrayIterator  = __webpack_require__(/*! ./array */ "./node_modules/es6-iterator/array.js")
  , StringIterator = __webpack_require__(/*! ./string */ "./node_modules/es6-iterator/string.js")
  , iterable       = __webpack_require__(/*! ./valid-iterable */ "./node_modules/es6-iterator/valid-iterable.js")
  , iteratorSymbol = __webpack_require__(/*! es6-symbol */ "./node_modules/es6-symbol/index.js").iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === "function") return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};


/***/ }),

/***/ "./node_modules/es6-iterator/index.js":
/*!********************************************!*\
  !*** ./node_modules/es6-iterator/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var clear    = __webpack_require__(/*! es5-ext/array/#/clear */ "./node_modules/es5-ext/array/\u0000#/clear.js")
  , assign   = __webpack_require__(/*! es5-ext/object/assign */ "./node_modules/es5-ext/object/assign/index.js")
  , callable = __webpack_require__(/*! es5-ext/object/valid-callable */ "./node_modules/es5-ext/object/valid-callable.js")
  , value    = __webpack_require__(/*! es5-ext/object/valid-value */ "./node_modules/es5-ext/object/valid-value.js")
  , d        = __webpack_require__(/*! d */ "./node_modules/d/index.js")
  , autoBind = __webpack_require__(/*! d/auto-bind */ "./node_modules/d/auto-bind.js")
  , Symbol   = __webpack_require__(/*! es6-symbol */ "./node_modules/es6-symbol/index.js");

var defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) throw new TypeError("Constructor requires 'new'");
	defineProperties(this, {
		__list__: d("w", value(list)),
		__context__: d("w", context),
		__nextIndex__: d("w", 0)
	});
	if (!context) return;
	callable(context.on);
	context.on("_add", this._onAdd);
	context.on("_delete", this._onDelete);
	context.on("_clear", this._onClear);
};

// Internal %IteratorPrototype% doesn't expose its constructor
delete Iterator.prototype.constructor;

defineProperties(
	Iterator.prototype,
	assign(
		{
			_next: d(function () {
				var i;
				if (!this.__list__) return undefined;
				if (this.__redo__) {
					i = this.__redo__.shift();
					if (i !== undefined) return i;
				}
				if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
				this._unBind();
				return undefined;
			}),
			next: d(function () {
				return this._createResult(this._next());
			}),
			_createResult: d(function (i) {
				if (i === undefined) return { done: true, value: undefined };
				return { done: false, value: this._resolve(i) };
			}),
			_resolve: d(function (i) {
				return this.__list__[i];
			}),
			_unBind: d(function () {
				this.__list__ = null;
				delete this.__redo__;
				if (!this.__context__) return;
				this.__context__.off("_add", this._onAdd);
				this.__context__.off("_delete", this._onDelete);
				this.__context__.off("_clear", this._onClear);
				this.__context__ = null;
			}),
			toString: d(function () {
				return "[object " + (this[Symbol.toStringTag] || "Object") + "]";
			})
		},
		autoBind({
			_onAdd: d(function (index) {
				if (index >= this.__nextIndex__) return;
				++this.__nextIndex__;
				if (!this.__redo__) {
					defineProperty(this, "__redo__", d("c", [index]));
					return;
				}
				this.__redo__.forEach(function (redo, i) {
					if (redo >= index) this.__redo__[i] = ++redo;
				}, this);
				this.__redo__.push(index);
			}),
			_onDelete: d(function (index) {
				var i;
				if (index >= this.__nextIndex__) return;
				--this.__nextIndex__;
				if (!this.__redo__) return;
				i = this.__redo__.indexOf(index);
				if (i !== -1) this.__redo__.splice(i, 1);
				this.__redo__.forEach(function (redo, j) {
					if (redo > index) this.__redo__[j] = --redo;
				}, this);
			}),
			_onClear: d(function () {
				if (this.__redo__) clear.call(this.__redo__);
				this.__nextIndex__ = 0;
			})
		})
	)
);

defineProperty(
	Iterator.prototype,
	Symbol.iterator,
	d(function () {
		return this;
	})
);


/***/ }),

/***/ "./node_modules/es6-iterator/is-iterable.js":
/*!**************************************************!*\
  !*** ./node_modules/es6-iterator/is-iterable.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isArguments = __webpack_require__(/*! es5-ext/function/is-arguments */ "./node_modules/es5-ext/function/is-arguments.js")
  , isValue     = __webpack_require__(/*! es5-ext/object/is-value */ "./node_modules/es5-ext/object/is-value.js")
  , isString    = __webpack_require__(/*! es5-ext/string/is-string */ "./node_modules/es5-ext/string/is-string.js");

var iteratorSymbol = __webpack_require__(/*! es6-symbol */ "./node_modules/es6-symbol/index.js").iterator
  , isArray        = Array.isArray;

module.exports = function (value) {
	if (!isValue(value)) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return typeof value[iteratorSymbol] === "function";
};


/***/ }),

/***/ "./node_modules/es6-iterator/string.js":
/*!*********************************************!*\
  !*** ./node_modules/es6-iterator/string.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols



var setPrototypeOf = __webpack_require__(/*! es5-ext/object/set-prototype-of */ "./node_modules/es5-ext/object/set-prototype-of/index.js")
  , d              = __webpack_require__(/*! d */ "./node_modules/d/index.js")
  , Symbol         = __webpack_require__(/*! es6-symbol */ "./node_modules/es6-symbol/index.js")
  , Iterator       = __webpack_require__(/*! ./ */ "./node_modules/es6-iterator/index.js");

var defineProperty = Object.defineProperty, StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) throw new TypeError("Constructor requires 'new'");
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, "__length__", d("", str.length));
};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete StringIterator.prototype.constructor;

StringIterator.prototype = Object.create(Iterator.prototype, {
	_next: d(function () {
		if (!this.__list__) return undefined;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
		return undefined;
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if (code >= 0xd800 && code <= 0xdbff) return char + this.__list__[this.__nextIndex__++];
		return char;
	})
});
defineProperty(StringIterator.prototype, Symbol.toStringTag, d("c", "String Iterator"));


/***/ }),

/***/ "./node_modules/es6-iterator/valid-iterable.js":
/*!*****************************************************!*\
  !*** ./node_modules/es6-iterator/valid-iterable.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isIterable = __webpack_require__(/*! ./is-iterable */ "./node_modules/es6-iterator/is-iterable.js");

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};


/***/ }),

/***/ "./node_modules/es6-symbol/index.js":
/*!******************************************!*\
  !*** ./node_modules/es6-symbol/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es6-symbol/is-implemented.js")()
	? __webpack_require__(/*! ext/global-this */ "./node_modules/ext/global-this/index.js").Symbol
	: __webpack_require__(/*! ./polyfill */ "./node_modules/es6-symbol/polyfill.js");


/***/ }),

/***/ "./node_modules/es6-symbol/is-implemented.js":
/*!***************************************************!*\
  !*** ./node_modules/es6-symbol/is-implemented.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var global     = __webpack_require__(/*! ext/global-this */ "./node_modules/ext/global-this/index.js")
  , validTypes = { object: true, symbol: true };

module.exports = function () {
	var Symbol = global.Symbol;
	var symbol;
	if (typeof Symbol !== "function") return false;
	symbol = Symbol("test symbol");
	try { String(symbol); }
	catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),

/***/ "./node_modules/es6-symbol/is-symbol.js":
/*!**********************************************!*\
  !*** ./node_modules/es6-symbol/is-symbol.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


module.exports = function (value) {
	if (!value) return false;
	if (typeof value === "symbol") return true;
	if (!value.constructor) return false;
	if (value.constructor.name !== "Symbol") return false;
	return value[value.constructor.toStringTag] === "Symbol";
};


/***/ }),

/***/ "./node_modules/es6-symbol/lib/private/generate-name.js":
/*!**************************************************************!*\
  !*** ./node_modules/es6-symbol/lib/private/generate-name.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var d = __webpack_require__(/*! d */ "./node_modules/d/index.js");

var create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype;

var created = create(null);
module.exports = function (desc) {
	var postfix = 0, name, ie11BugWorkaround;
	while (created[desc + (postfix || "")]) ++postfix;
	desc += postfix || "";
	created[desc] = true;
	name = "@@" + desc;
	defineProperty(
		objPrototype,
		name,
		d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		})
	);
	return name;
};


/***/ }),

/***/ "./node_modules/es6-symbol/lib/private/setup/standard-symbols.js":
/*!***********************************************************************!*\
  !*** ./node_modules/es6-symbol/lib/private/setup/standard-symbols.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var d            = __webpack_require__(/*! d */ "./node_modules/d/index.js")
  , NativeSymbol = __webpack_require__(/*! ext/global-this */ "./node_modules/ext/global-this/index.js").Symbol;

module.exports = function (SymbolPolyfill) {
	return Object.defineProperties(SymbolPolyfill, {
		// To ensure proper interoperability with other native functions (e.g. Array.from)
		// fallback to eventual native implementation of given symbol
		hasInstance: d(
			"", (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill("hasInstance")
		),
		isConcatSpreadable: d(
			"",
			(NativeSymbol && NativeSymbol.isConcatSpreadable) ||
				SymbolPolyfill("isConcatSpreadable")
		),
		iterator: d("", (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill("iterator")),
		match: d("", (NativeSymbol && NativeSymbol.match) || SymbolPolyfill("match")),
		replace: d("", (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill("replace")),
		search: d("", (NativeSymbol && NativeSymbol.search) || SymbolPolyfill("search")),
		species: d("", (NativeSymbol && NativeSymbol.species) || SymbolPolyfill("species")),
		split: d("", (NativeSymbol && NativeSymbol.split) || SymbolPolyfill("split")),
		toPrimitive: d(
			"", (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill("toPrimitive")
		),
		toStringTag: d(
			"", (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill("toStringTag")
		),
		unscopables: d(
			"", (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill("unscopables")
		)
	});
};


/***/ }),

/***/ "./node_modules/es6-symbol/lib/private/setup/symbol-registry.js":
/*!**********************************************************************!*\
  !*** ./node_modules/es6-symbol/lib/private/setup/symbol-registry.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var d              = __webpack_require__(/*! d */ "./node_modules/d/index.js")
  , validateSymbol = __webpack_require__(/*! ../../../validate-symbol */ "./node_modules/es6-symbol/validate-symbol.js");

var registry = Object.create(null);

module.exports = function (SymbolPolyfill) {
	return Object.defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (registry[key]) return registry[key];
			return (registry[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (symbol) {
			var key;
			validateSymbol(symbol);
			for (key in registry) {
				if (registry[key] === symbol) return key;
			}
			return undefined;
		})
	});
};


/***/ }),

/***/ "./node_modules/es6-symbol/polyfill.js":
/*!*********************************************!*\
  !*** ./node_modules/es6-symbol/polyfill.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var d                    = __webpack_require__(/*! d */ "./node_modules/d/index.js")
  , validateSymbol       = __webpack_require__(/*! ./validate-symbol */ "./node_modules/es6-symbol/validate-symbol.js")
  , NativeSymbol         = __webpack_require__(/*! ext/global-this */ "./node_modules/ext/global-this/index.js").Symbol
  , generateName         = __webpack_require__(/*! ./lib/private/generate-name */ "./node_modules/es6-symbol/lib/private/generate-name.js")
  , setupStandardSymbols = __webpack_require__(/*! ./lib/private/setup/standard-symbols */ "./node_modules/es6-symbol/lib/private/setup/standard-symbols.js")
  , setupSymbolRegistry  = __webpack_require__(/*! ./lib/private/setup/symbol-registry */ "./node_modules/es6-symbol/lib/private/setup/symbol-registry.js");

var create = Object.create
  , defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty;

var SymbolPolyfill, HiddenSymbol, isNativeSafe;

if (typeof NativeSymbol === "function") {
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
} else {
	NativeSymbol = null;
}

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = description === undefined ? "" : String(description);
	return defineProperties(symbol, {
		__description__: d("", description),
		__name__: d("", generateName(description))
	});
};

setupStandardSymbols(SymbolPolyfill);
setupSymbolRegistry(SymbolPolyfill);

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d("", function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return "Symbol (" + validateSymbol(this).__description__ + ")"; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(
	SymbolPolyfill.prototype,
	SymbolPolyfill.toPrimitive,
	d("", function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === "symbol") return symbol;
		return symbol.toString();
	})
);
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(
	HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
);

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(
	HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
);


/***/ }),

/***/ "./node_modules/es6-symbol/validate-symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/es6-symbol/validate-symbol.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isSymbol = __webpack_require__(/*! ./is-symbol */ "./node_modules/es6-symbol/is-symbol.js");

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),

/***/ "./node_modules/es6-weak-map/index.js":
/*!********************************************!*\
  !*** ./node_modules/es6-weak-map/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es6-weak-map/is-implemented.js")() ? WeakMap : __webpack_require__(/*! ./polyfill */ "./node_modules/es6-weak-map/polyfill.js");


/***/ }),

/***/ "./node_modules/es6-weak-map/is-implemented.js":
/*!*****************************************************!*\
  !*** ./node_modules/es6-weak-map/is-implemented.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


module.exports = function () {
	var weakMap, obj;

	if (typeof WeakMap !== "function") return false;
	try {
		// WebKit doesn't support arguments and crashes
		weakMap = new WeakMap([[obj = {}, "one"], [{}, "two"], [{}, "three"]]);
	} catch (e) {
		return false;
	}
	if (String(weakMap) !== "[object WeakMap]") return false;
	if (typeof weakMap.set !== "function") return false;
	if (weakMap.set({}, 1) !== weakMap) return false;
	if (typeof weakMap.delete !== "function") return false;
	if (typeof weakMap.has !== "function") return false;
	if (weakMap.get(obj) !== "one") return false;

	return true;
};


/***/ }),

/***/ "./node_modules/es6-weak-map/is-native-implemented.js":
/*!************************************************************!*\
  !*** ./node_modules/es6-weak-map/is-native-implemented.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
// Exports true if environment provides native `WeakMap` implementation, whatever that is.



module.exports = (function () {
	if (typeof WeakMap !== "function") return false;
	return Object.prototype.toString.call(new WeakMap()) === "[object WeakMap]";
}());


/***/ }),

/***/ "./node_modules/es6-weak-map/polyfill.js":
/*!***********************************************!*\
  !*** ./node_modules/es6-weak-map/polyfill.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue           = __webpack_require__(/*! es5-ext/object/is-value */ "./node_modules/es5-ext/object/is-value.js")
  , setPrototypeOf    = __webpack_require__(/*! es5-ext/object/set-prototype-of */ "./node_modules/es5-ext/object/set-prototype-of/index.js")
  , object            = __webpack_require__(/*! es5-ext/object/valid-object */ "./node_modules/es5-ext/object/valid-object.js")
  , ensureValue       = __webpack_require__(/*! es5-ext/object/valid-value */ "./node_modules/es5-ext/object/valid-value.js")
  , randomUniq        = __webpack_require__(/*! es5-ext/string/random-uniq */ "./node_modules/es5-ext/string/random-uniq.js")
  , d                 = __webpack_require__(/*! d */ "./node_modules/d/index.js")
  , getIterator       = __webpack_require__(/*! es6-iterator/get */ "./node_modules/es6-iterator/get.js")
  , forOf             = __webpack_require__(/*! es6-iterator/for-of */ "./node_modules/es6-iterator/for-of.js")
  , toStringTagSymbol = __webpack_require__(/*! es6-symbol */ "./node_modules/es6-symbol/index.js").toStringTag
  , isNative          = __webpack_require__(/*! ./is-native-implemented */ "./node_modules/es6-weak-map/is-native-implemented.js")

  , isArray = Array.isArray, defineProperty = Object.defineProperty
  , objHasOwnProperty = Object.prototype.hasOwnProperty, getPrototypeOf = Object.getPrototypeOf
  , WeakMapPoly;

module.exports = WeakMapPoly = function (/* Iterable*/) {
	var iterable = arguments[0], self;

	if (!(this instanceof WeakMapPoly)) throw new TypeError("Constructor requires 'new'");
	self = isNative && setPrototypeOf && (WeakMap !== WeakMapPoly)
		? setPrototypeOf(new WeakMap(), getPrototypeOf(this)) : this;

	if (isValue(iterable)) {
		if (!isArray(iterable)) iterable = getIterator(iterable);
	}
	defineProperty(self, "__weakMapData__", d("c", "$weakMap$" + randomUniq()));
	if (!iterable) return self;
	forOf(iterable, function (val) {
		ensureValue(val);
		self.set(val[0], val[1]);
	});
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(WeakMapPoly, WeakMap);
	WeakMapPoly.prototype = Object.create(WeakMap.prototype, { constructor: d(WeakMapPoly) });
}

Object.defineProperties(WeakMapPoly.prototype, {
	delete: d(function (key) {
		if (objHasOwnProperty.call(object(key), this.__weakMapData__)) {
			delete key[this.__weakMapData__];
			return true;
		}
		return false;
	}),
	get: d(function (key) {
		if (!objHasOwnProperty.call(object(key), this.__weakMapData__)) return undefined;
		return key[this.__weakMapData__];
	}),
	has: d(function (key) {
		return objHasOwnProperty.call(object(key), this.__weakMapData__);
	}),
	set: d(function (key, value) {
		defineProperty(object(key), this.__weakMapData__, d("c", value));
		return this;
	}),
	toString: d(function () {
		return "[object WeakMap]";
	})
});
defineProperty(WeakMapPoly.prototype, toStringTagSymbol, d("c", "WeakMap"));


/***/ }),

/***/ "./node_modules/ext/global-this/implementation.js":
/*!********************************************************!*\
  !*** ./node_modules/ext/global-this/implementation.js ***!
  \********************************************************/
/***/ ((module) => {

var naiveFallback = function () {
	if (typeof self === "object" && self) return self;
	if (typeof window === "object" && window) return window;
	throw new Error("Unable to resolve global `this`");
};

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module)

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	try {
		Object.defineProperty(Object.prototype, "__global__", {
			get: function () { return this; },
			configurable: true
		});
	} catch (error) {
		// Unfortunate case of Object.prototype being sealed (via preventExtensions, seal or freeze)
		return naiveFallback();
	}
	try {
		// Safari case (window.__global__ is resolved with global context, but __global__ does not)
		if (!__global__) return naiveFallback();
		return __global__;
	} finally {
		delete Object.prototype.__global__;
	}
})();


/***/ }),

/***/ "./node_modules/ext/global-this/index.js":
/*!***********************************************!*\
  !*** ./node_modules/ext/global-this/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/ext/global-this/is-implemented.js")() ? globalThis : __webpack_require__(/*! ./implementation */ "./node_modules/ext/global-this/implementation.js");


/***/ }),

/***/ "./node_modules/ext/global-this/is-implemented.js":
/*!********************************************************!*\
  !*** ./node_modules/ext/global-this/is-implemented.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function () {
	if (typeof globalThis !== "object") return false;
	if (!globalThis) return false;
	return globalThis.Array === Array;
};


/***/ }),

/***/ "./node_modules/flatten-vertex-data/index.js":
/*!***************************************************!*\
  !*** ./node_modules/flatten-vertex-data/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*eslint new-cap:0*/
var dtype = __webpack_require__(/*! dtype */ "./node_modules/dtype/index.js")

module.exports = flattenVertexData

function flattenVertexData (data, output, offset) {
  if (!data) throw new TypeError('must specify data as first parameter')
  offset = +(offset || 0) | 0

  if (Array.isArray(data) && (data[0] && typeof data[0][0] === 'number')) {
    var dim = data[0].length
    var length = data.length * dim
    var i, j, k, l

    // no output specified, create a new typed array
    if (!output || typeof output === 'string') {
      output = new (dtype(output || 'float32'))(length + offset)
    }

    var dstLength = output.length - offset
    if (length !== dstLength) {
      throw new Error('source length ' + length + ' (' + dim + 'x' + data.length + ')' +
        ' does not match destination length ' + dstLength)
    }

    for (i = 0, k = offset; i < data.length; i++) {
      for (j = 0; j < dim; j++) {
        output[k++] = data[i][j] === null ? NaN : data[i][j]
      }
    }
  } else {
    if (!output || typeof output === 'string') {
      // no output, create a new one
      var Ctor = dtype(output || 'float32')

      // handle arrays separately due to possible nulls
      if (Array.isArray(data) || output === 'array') {
        output = new Ctor(data.length + offset)
        for (i = 0, k = offset, l = output.length; k < l; k++, i++) {
          output[k] = data[i] === null ? NaN : data[i]
        }
      } else {
        if (offset === 0) {
          output = new Ctor(data)
        } else {
          output = new Ctor(data.length + offset)

          output.set(data, offset)
        }
      }
    } else {
      // store output in existing array
      output.set(data, offset)
    }
  }

  return output
}


/***/ }),

/***/ "./node_modules/is-iexplorer/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-iexplorer/index.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";

module.exports = typeof navigator !== 'undefined' &&
	(/MSIE/.test(navigator.userAgent) || /Trident\//.test(navigator.appVersion));


/***/ }),

/***/ "./node_modules/is-obj/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-obj/index.js ***!
  \**************************************/
/***/ ((module) => {

"use strict";

module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};


/***/ }),

/***/ "./node_modules/is-svg-path/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-svg-path/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


module.exports = function isPath(str) {
	if (typeof str !== 'string') return false

	str = str.trim()

	// https://www.w3.org/TR/SVG/paths.html#PathDataBNF
	if (/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(str) && /[\dz]$/i.test(str) && str.length > 4) return true

	return false
}


/***/ }),

/***/ "./node_modules/math-log2/index.js":
/*!*****************************************!*\
  !*** ./node_modules/math-log2/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";

module.exports = Math.log2 || function (x) {
	return Math.log(x) * Math.LOG2E;
};


/***/ }),

/***/ "./node_modules/normalize-svg-path/index.js":
/*!**************************************************!*\
  !*** ./node_modules/normalize-svg-path/index.js ***!
  \**************************************************/
/***/ ((module) => {


var π = Math.PI
var _120 = radians(120)

module.exports = normalize

/**
 * describe `path` in terms of cubic bézier 
 * curves and move commands
 *
 * @param {Array} path
 * @return {Array}
 */

function normalize(path){
	// init state
	var prev
	var result = []
	var bezierX = 0
	var bezierY = 0
	var startX = 0
	var startY = 0
	var quadX = null
	var quadY = null
	var x = 0
	var y = 0

	for (var i = 0, len = path.length; i < len; i++) {
		var seg = path[i]
		var command = seg[0]
		switch (command) {
			case 'M':
				startX = seg[1]
				startY = seg[2]
				break
			case 'A':
				seg = arc(x, y,seg[1],seg[2],radians(seg[3]),seg[4],seg[5],seg[6],seg[7])
				// split multi part
				seg.unshift('C')
				if (seg.length > 7) {
					result.push(seg.splice(0, 7))
					seg.unshift('C')
				}
				break
			case 'S':
				// default control point
				var cx = x
				var cy = y
				if (prev == 'C' || prev == 'S') {
					cx += cx - bezierX // reflect the previous command's control
					cy += cy - bezierY // point relative to the current point
				}
				seg = ['C', cx, cy, seg[1], seg[2], seg[3], seg[4]]
				break
			case 'T':
				if (prev == 'Q' || prev == 'T') {
					quadX = x * 2 - quadX // as with 'S' reflect previous control point
					quadY = y * 2 - quadY
				} else {
					quadX = x
					quadY = y
				}
				seg = quadratic(x, y, quadX, quadY, seg[1], seg[2])
				break
			case 'Q':
				quadX = seg[1]
				quadY = seg[2]
				seg = quadratic(x, y, seg[1], seg[2], seg[3], seg[4])
				break
			case 'L':
				seg = line(x, y, seg[1], seg[2])
				break
			case 'H':
				seg = line(x, y, seg[1], y)
				break
			case 'V':
				seg = line(x, y, x, seg[1])
				break
			case 'Z':
				seg = line(x, y, startX, startY)
				break
		}

		// update state
		prev = command
		x = seg[seg.length - 2]
		y = seg[seg.length - 1]
		if (seg.length > 4) {
			bezierX = seg[seg.length - 4]
			bezierY = seg[seg.length - 3]
		} else {
			bezierX = x
			bezierY = y
		}
		result.push(seg)
	}

	return result
}

function line(x1, y1, x2, y2){
	return ['C', x1, y1, x2, y2, x2, y2]
}

function quadratic(x1, y1, cx, cy, x2, y2){
	return [
		'C',
		x1/3 + (2/3) * cx,
		y1/3 + (2/3) * cy,
		x2/3 + (2/3) * cx,
		y2/3 + (2/3) * cy,
		x2,
		y2
	]
}

// This function is ripped from 
// github.com/DmitryBaranovskiy/raphael/blob/4d97d4/raphael.js#L2216-L2304 
// which references w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
// TODO: make it human readable

function arc(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
	if (!recursive) {
		var xy = rotate(x1, y1, -angle)
		x1 = xy.x
		y1 = xy.y
		xy = rotate(x2, y2, -angle)
		x2 = xy.x
		y2 = xy.y
		var x = (x1 - x2) / 2
		var y = (y1 - y2) / 2
		var h = (x * x) / (rx * rx) + (y * y) / (ry * ry)
		if (h > 1) {
			h = Math.sqrt(h)
			rx = h * rx
			ry = h * ry
		}
		var rx2 = rx * rx
		var ry2 = ry * ry
		var k = (large_arc_flag == sweep_flag ? -1 : 1)
			* Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)))
		if (k == Infinity) k = 1 // neutralize
		var cx = k * rx * y / ry + (x1 + x2) / 2
		var cy = k * -ry * x / rx + (y1 + y2) / 2
		var f1 = Math.asin(((y1 - cy) / ry).toFixed(9))
		var f2 = Math.asin(((y2 - cy) / ry).toFixed(9))

		f1 = x1 < cx ? π - f1 : f1
		f2 = x2 < cx ? π - f2 : f2
		if (f1 < 0) f1 = π * 2 + f1
		if (f2 < 0) f2 = π * 2 + f2
		if (sweep_flag && f1 > f2) f1 = f1 - π * 2
		if (!sweep_flag && f2 > f1) f2 = f2 - π * 2
	} else {
		f1 = recursive[0]
		f2 = recursive[1]
		cx = recursive[2]
		cy = recursive[3]
	}
	// greater than 120 degrees requires multiple segments
	if (Math.abs(f2 - f1) > _120) {
		var f2old = f2
		var x2old = x2
		var y2old = y2
		f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1)
		x2 = cx + rx * Math.cos(f2)
		y2 = cy + ry * Math.sin(f2)
		var res = arc(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy])
	}
	var t = Math.tan((f2 - f1) / 4)
	var hx = 4 / 3 * rx * t
	var hy = 4 / 3 * ry * t
	var curve = [
		2 * x1 - (x1 + hx * Math.sin(f1)),
		2 * y1 - (y1 - hy * Math.cos(f1)),
		x2 + hx * Math.sin(f2),
		y2 - hy * Math.cos(f2),
		x2,
		y2
	]
	if (recursive) return curve
	if (res) curve = curve.concat(res)
	for (var i = 0; i < curve.length;) {
		var rot = rotate(curve[i], curve[i+1], angle)
		curve[i++] = rot.x
		curve[i++] = rot.y
	}
	return curve
}

function rotate(x, y, rad){
	return {
		x: x * Math.cos(rad) - y * Math.sin(rad),
		y: x * Math.sin(rad) + y * Math.cos(rad)
	}
}

function radians(degress){
	return degress * (π / 180)
}


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/parse-rect/index.js":
/*!******************************************!*\
  !*** ./node_modules/parse-rect/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pick = __webpack_require__(/*! pick-by-alias */ "./node_modules/pick-by-alias/index.js")

module.exports = parseRect

function parseRect (arg) {
  var rect

  // direct arguments sequence
  if (arguments.length > 1) {
    arg = arguments
  }

  // svg viewbox
  if (typeof arg === 'string') {
    arg = arg.split(/\s/).map(parseFloat)
  }
  else if (typeof arg === 'number') {
    arg = [arg]
  }

  // 0, 0, 100, 100 - array-like
  if (arg.length && typeof arg[0] === 'number') {
    // [w, w]
    if (arg.length === 1) {
      rect = {
        width: arg[0],
        height: arg[0],
        x: 0, y: 0
      }
    }
    // [w, h]
    else if (arg.length === 2) {
      rect = {
        width: arg[0],
        height: arg[1],
        x: 0, y: 0
      }
    }
    // [l, t, r, b]
    else {
      rect = {
        x: arg[0],
        y: arg[1],
        width: (arg[2] - arg[0]) || 0,
        height: (arg[3] - arg[1]) || 0
      }
    }
  }
  // {x, y, w, h} or {l, t, b, r}
  else if (arg) {
    arg = pick(arg, {
      left: 'x l left Left',
      top: 'y t top Top',
      width: 'w width W Width',
      height: 'h height W Width',
      bottom: 'b bottom Bottom',
      right: 'r right Right'
    })

    rect = {
      x: arg.left || 0,
      y: arg.top || 0
    }

    if (arg.width == null) {
      if (arg.right) rect.width = arg.right - rect.x
      else rect.width = 0
    }
    else {
      rect.width = arg.width
    }

    if (arg.height == null) {
      if (arg.bottom) rect.height = arg.bottom - rect.y
      else rect.height = 0
    }
    else {
      rect.height = arg.height
    }
  }

  return rect
}


/***/ }),

/***/ "./node_modules/pick-by-alias/index.js":
/*!*********************************************!*\
  !*** ./node_modules/pick-by-alias/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";



module.exports = function pick (src, props, keepRest) {
	var result = {}, prop, i

	if (typeof props === 'string') props = toList(props)
	if (Array.isArray(props)) {
		var res = {}
		for (i = 0; i < props.length; i++) {
			res[props[i]] = true
		}
		props = res
	}

	// convert strings to lists
	for (prop in props) {
		props[prop] = toList(props[prop])
	}

	// keep-rest strategy requires unmatched props to be preserved
	var occupied = {}

	for (prop in props) {
		var aliases = props[prop]

		if (Array.isArray(aliases)) {
			for (i = 0; i < aliases.length; i++) {
				var alias = aliases[i]

				if (keepRest) {
					occupied[alias] = true
				}

				if (alias in src) {
					result[prop] = src[alias]

					if (keepRest) {
						for (var j = i; j < aliases.length; j++) {
							occupied[aliases[j]] = true
						}
					}

					break
				}
			}
		}
		else if (prop in src) {
			if (props[prop]) {
				result[prop] = src[prop]
			}

			if (keepRest) {
				occupied[prop] = true
			}
		}
	}

	if (keepRest) {
		for (prop in src) {
			if (occupied[prop]) continue
			result[prop] = src[prop]
		}
	}

	return result
}

var CACHE = {}

function toList(arg) {
	if (CACHE[arg]) return CACHE[arg]
	if (typeof arg === 'string') {
		arg = CACHE[arg] = arg.split(/\s*,\s*|\s+/)
	}
	return arg
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/attributes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/attributes.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;
var DASHES = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/scattergl/constants.js").DASHES;

var scatterLineAttrs = scatterAttrs.line;
var scatterMarkerAttrs = scatterAttrs.marker;
var scatterMarkerLineAttrs = scatterMarkerAttrs.line;

var attrs = module.exports = overrideAll({
    x: scatterAttrs.x,
    x0: scatterAttrs.x0,
    dx: scatterAttrs.dx,
    y: scatterAttrs.y,
    y0: scatterAttrs.y0,
    dy: scatterAttrs.dy,

    text: scatterAttrs.text,
    hovertext: scatterAttrs.hovertext,

    textposition: scatterAttrs.textposition,
    textfont: scatterAttrs.textfont,

    mode: {
        valType: 'flaglist',
        flags: ['lines', 'markers', 'text'],
        extras: ['none'],
        role: 'info',
        description: [
            'Determines the drawing mode for this scatter trace.'
        ].join(' ')
    },
    line: {
        color: scatterLineAttrs.color,
        width: scatterLineAttrs.width,
        shape: {
            valType: 'enumerated',
            values: ['linear', 'hv', 'vh', 'hvh', 'vhv'],
            dflt: 'linear',
            role: 'style',
            editType: 'plot',
            description: [
                'Determines the line shape.',
                'The values correspond to step-wise line shapes.'
            ].join(' ')
        },
        dash: {
            valType: 'enumerated',
            values: Object.keys(DASHES),
            dflt: 'solid',
            role: 'style',
            description: 'Sets the style of the lines.'
        }
    },
    marker: extendFlat({}, colorScaleAttrs('marker'), {
        symbol: scatterMarkerAttrs.symbol,
        size: scatterMarkerAttrs.size,
        sizeref: scatterMarkerAttrs.sizeref,
        sizemin: scatterMarkerAttrs.sizemin,
        sizemode: scatterMarkerAttrs.sizemode,
        opacity: scatterMarkerAttrs.opacity,
        colorbar: scatterMarkerAttrs.colorbar,
        line: extendFlat({}, colorScaleAttrs('marker.line'), {
            width: scatterMarkerLineAttrs.width
        })
    }),
    connectgaps: scatterAttrs.connectgaps,
    fill: extendFlat({}, scatterAttrs.fill, {dflt: 'none'}),
    fillcolor: scatterAttrs.fillcolor,

    // no hoveron

    selected: {
        marker: scatterAttrs.selected.marker,
        textfont: scatterAttrs.selected.textfont
    },
    unselected: {
        marker: scatterAttrs.unselected.marker,
        textfont: scatterAttrs.unselected.textfont
    },

    opacity: baseAttrs.opacity

}, 'calc', 'nested');

attrs.x.editType = attrs.y.editType = attrs.x0.editType = attrs.y0.editType = 'calc+clearAxisTypes';
attrs.hovertemplate = scatterAttrs.hovertemplate;
attrs.texttemplate = scatterAttrs.texttemplate;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/constants.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/constants.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var SYMBOL_SIZE = 20;

module.exports = {
    TOO_MANY_POINTS: 1e5,

    SYMBOL_SDF_SIZE: 200,
    SYMBOL_SIZE: SYMBOL_SIZE,
    SYMBOL_STROKE: SYMBOL_SIZE / 20,

    DOT_RE: /-dot/,
    OPEN_RE: /-open/,

    DASHES: {
        solid: [1],
        dot: [1, 1],
        dash: [4, 1],
        longdash: [8, 1],
        dashdot: [4, 1, 1, 1],
        longdashdot: [8, 1, 1, 1]
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/convert.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/convert.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var svgSdf = __webpack_require__(/*! svg-path-sdf */ "./node_modules/svg-path-sdf/index.js");
var rgba = __webpack_require__(/*! color-normalize */ "./node_modules/color-normalize/index.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var AxisIDs = __webpack_require__(/*! ../../plots/cartesian/axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js");

var formatColor = __webpack_require__(/*! ../../lib/gl_format_color */ "./node_modules/plotly.js/src/lib/gl_format_color.js").formatColor;
var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var makeBubbleSizeFn = __webpack_require__(/*! ../scatter/make_bubble_size_func */ "./node_modules/plotly.js/src/traces/scatter/make_bubble_size_func.js");

var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/scattergl/helpers.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/scattergl/constants.js");
var DESELECTDIM = __webpack_require__(/*! ../../constants/interactions */ "./node_modules/plotly.js/src/constants/interactions.js").DESELECTDIM;

var TEXTOFFSETSIGN = {
    start: 1, left: 1, end: -1, right: -1, middle: 0, center: 0, bottom: 1, top: -1
};

var appendArrayPointValue = __webpack_require__(/*! ../../components/fx/helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").appendArrayPointValue;

function convertStyle(gd, trace) {
    var i;

    var opts = {
        marker: undefined,
        markerSel: undefined,
        markerUnsel: undefined,
        line: undefined,
        fill: undefined,
        errorX: undefined,
        errorY: undefined,
        text: undefined,
        textSel: undefined,
        textUnsel: undefined
    };

    if(trace.visible !== true) return opts;

    if(subTypes.hasText(trace)) {
        opts.text = convertTextStyle(gd, trace);
        opts.textSel = convertTextSelection(gd, trace, trace.selected);
        opts.textUnsel = convertTextSelection(gd, trace, trace.unselected);
    }

    if(subTypes.hasMarkers(trace)) {
        opts.marker = convertMarkerStyle(trace);
        opts.markerSel = convertMarkerSelection(trace, trace.selected);
        opts.markerUnsel = convertMarkerSelection(trace, trace.unselected);

        if(!trace.unselected && Lib.isArrayOrTypedArray(trace.marker.opacity)) {
            var mo = trace.marker.opacity;
            opts.markerUnsel.opacity = new Array(mo.length);
            for(i = 0; i < mo.length; i++) {
                opts.markerUnsel.opacity[i] = DESELECTDIM * mo[i];
            }
        }
    }

    if(subTypes.hasLines(trace)) {
        opts.line = {
            overlay: true,
            thickness: trace.line.width,
            color: trace.line.color,
            opacity: trace.opacity
        };

        var dashes = (constants.DASHES[trace.line.dash] || [1]).slice();
        for(i = 0; i < dashes.length; ++i) {
            dashes[i] *= trace.line.width;
        }
        opts.line.dashes = dashes;
    }

    if(trace.error_x && trace.error_x.visible) {
        opts.errorX = convertErrorBarStyle(trace, trace.error_x);
    }

    if(trace.error_y && trace.error_y.visible) {
        opts.errorY = convertErrorBarStyle(trace, trace.error_y);
    }

    if(!!trace.fill && trace.fill !== 'none') {
        opts.fill = {
            closed: true,
            fill: trace.fillcolor,
            thickness: 0
        };
    }

    return opts;
}

function convertTextStyle(gd, trace) {
    var fullLayout = gd._fullLayout;
    var count = trace._length;
    var textfontIn = trace.textfont;
    var textpositionIn = trace.textposition;
    var textPos = Array.isArray(textpositionIn) ? textpositionIn : [textpositionIn];
    var tfc = textfontIn.color;
    var tfs = textfontIn.size;
    var tff = textfontIn.family;
    var optsOut = {};
    var i;

    var texttemplate = trace.texttemplate;
    if(texttemplate) {
        optsOut.text = [];

        var d3locale = fullLayout._d3locale;
        var isArray = Array.isArray(texttemplate);
        var N = isArray ? Math.min(texttemplate.length, count) : count;
        var txt = isArray ?
            function(i) { return texttemplate[i]; } :
            function() { return texttemplate; };

        for(i = 0; i < N; i++) {
            var d = {i: i};
            var labels = trace._module.formatLabels(d, trace, fullLayout);
            var pointValues = {};
            appendArrayPointValue(pointValues, trace, i);
            var meta = trace._meta || {};
            optsOut.text.push(Lib.texttemplateString(txt(i), labels, d3locale, pointValues, d, meta));
        }
    } else {
        if(Array.isArray(trace.text) && trace.text.length < count) {
            // if text array is shorter, we'll need to append to it, so let's slice to prevent mutating
            optsOut.text = trace.text.slice();
        } else {
            optsOut.text = trace.text;
        }
    }
    // pad text array with empty strings
    if(Array.isArray(optsOut.text)) {
        for(i = optsOut.text.length; i < count; i++) {
            optsOut.text[i] = '';
        }
    }

    optsOut.opacity = trace.opacity;
    optsOut.font = {};
    optsOut.align = [];
    optsOut.baseline = [];

    for(i = 0; i < textPos.length; i++) {
        var tp = textPos[i].split(/\s+/);

        switch(tp[1]) {
            case 'left':
                optsOut.align.push('right');
                break;
            case 'right':
                optsOut.align.push('left');
                break;
            default:
                optsOut.align.push(tp[1]);
        }
        switch(tp[0]) {
            case 'top':
                optsOut.baseline.push('bottom');
                break;
            case 'bottom':
                optsOut.baseline.push('top');
                break;
            default:
                optsOut.baseline.push(tp[0]);
        }
    }

    if(Array.isArray(tfc)) {
        optsOut.color = new Array(count);
        for(i = 0; i < count; i++) {
            optsOut.color[i] = tfc[i];
        }
    } else {
        optsOut.color = tfc;
    }

    if(Lib.isArrayOrTypedArray(tfs) || Array.isArray(tff)) {
        // if any textfont param is array - make render a batch
        optsOut.font = new Array(count);
        for(i = 0; i < count; i++) {
            var fonti = optsOut.font[i] = {};

            fonti.size = (
                Lib.isTypedArray(tfs) ? tfs[i] :
                Array.isArray(tfs) ? (
                    isNumeric(tfs[i]) ? tfs[i] : 0
                ) : tfs
            );

            fonti.family = Array.isArray(tff) ? tff[i] : tff;
        }
    } else {
        // if both are single values, make render fast single-value
        optsOut.font = {size: tfs, family: tff};
    }

    return optsOut;
}


function convertMarkerStyle(trace) {
    var count = trace._length;
    var optsIn = trace.marker;
    var optsOut = {};
    var i;

    var multiSymbol = Lib.isArrayOrTypedArray(optsIn.symbol);
    var multiColor = Lib.isArrayOrTypedArray(optsIn.color);
    var multiLineColor = Lib.isArrayOrTypedArray(optsIn.line.color);
    var multiOpacity = Lib.isArrayOrTypedArray(optsIn.opacity);
    var multiSize = Lib.isArrayOrTypedArray(optsIn.size);
    var multiLineWidth = Lib.isArrayOrTypedArray(optsIn.line.width);

    var isOpen;
    if(!multiSymbol) isOpen = helpers.isOpenSymbol(optsIn.symbol);

    // prepare colors
    if(multiSymbol || multiColor || multiLineColor || multiOpacity) {
        optsOut.colors = new Array(count);
        optsOut.borderColors = new Array(count);

        var colors = formatColor(optsIn, optsIn.opacity, count);
        var borderColors = formatColor(optsIn.line, optsIn.opacity, count);

        if(!Array.isArray(borderColors[0])) {
            var borderColor = borderColors;
            borderColors = Array(count);
            for(i = 0; i < count; i++) {
                borderColors[i] = borderColor;
            }
        }
        if(!Array.isArray(colors[0])) {
            var color = colors;
            colors = Array(count);
            for(i = 0; i < count; i++) {
                colors[i] = color;
            }
        }

        optsOut.colors = colors;
        optsOut.borderColors = borderColors;

        for(i = 0; i < count; i++) {
            if(multiSymbol) {
                var symbol = optsIn.symbol[i];
                isOpen = helpers.isOpenSymbol(symbol);
            }
            if(isOpen) {
                borderColors[i] = colors[i].slice();
                colors[i] = colors[i].slice();
                colors[i][3] = 0;
            }
        }

        optsOut.opacity = trace.opacity;
    } else {
        if(isOpen) {
            optsOut.color = rgba(optsIn.color, 'uint8');
            optsOut.color[3] = 0;
            optsOut.borderColor = rgba(optsIn.color, 'uint8');
        } else {
            optsOut.color = rgba(optsIn.color, 'uint8');
            optsOut.borderColor = rgba(optsIn.line.color, 'uint8');
        }

        optsOut.opacity = trace.opacity * optsIn.opacity;
    }

    // prepare symbols
    if(multiSymbol) {
        optsOut.markers = new Array(count);
        for(i = 0; i < count; i++) {
            optsOut.markers[i] = getSymbolSdf(optsIn.symbol[i]);
        }
    } else {
        optsOut.marker = getSymbolSdf(optsIn.symbol);
    }

    // prepare sizes
    var markerSizeFunc = makeBubbleSizeFn(trace);
    var s;

    if(multiSize || multiLineWidth) {
        var sizes = optsOut.sizes = new Array(count);
        var borderSizes = optsOut.borderSizes = new Array(count);
        var sizeTotal = 0;
        var sizeAvg;

        if(multiSize) {
            for(i = 0; i < count; i++) {
                sizes[i] = markerSizeFunc(optsIn.size[i]);
                sizeTotal += sizes[i];
            }
            sizeAvg = sizeTotal / count;
        } else {
            s = markerSizeFunc(optsIn.size);
            for(i = 0; i < count; i++) {
                sizes[i] = s;
            }
        }

        // See  https://github.com/plotly/plotly.js/pull/1781#discussion_r121820798
        if(multiLineWidth) {
            for(i = 0; i < count; i++) {
                borderSizes[i] = optsIn.line.width[i] / 2;
            }
        } else {
            s = optsIn.line.width / 2;
            for(i = 0; i < count; i++) {
                borderSizes[i] = s;
            }
        }

        optsOut.sizeAvg = sizeAvg;
    } else {
        optsOut.size = markerSizeFunc(optsIn && optsIn.size || 10);
        optsOut.borderSizes = markerSizeFunc(optsIn.line.width);
    }

    return optsOut;
}

function convertMarkerSelection(trace, target) {
    var optsIn = trace.marker;
    var optsOut = {};

    if(!target) return optsOut;

    if(target.marker && target.marker.symbol) {
        optsOut = convertMarkerStyle(Lib.extendFlat({}, optsIn, target.marker));
    } else if(target.marker) {
        if(target.marker.size) optsOut.size = target.marker.size / 2;
        if(target.marker.color) optsOut.colors = target.marker.color;
        if(target.marker.opacity !== undefined) optsOut.opacity = target.marker.opacity;
    }

    return optsOut;
}

function convertTextSelection(gd, trace, target) {
    var optsOut = {};

    if(!target) return optsOut;

    if(target.textfont) {
        var optsIn = {
            opacity: 1,
            text: trace.text,
            texttemplate: trace.texttemplate,
            textposition: trace.textposition,
            textfont: Lib.extendFlat({}, trace.textfont)
        };
        if(target.textfont) {
            Lib.extendFlat(optsIn.textfont, target.textfont);
        }
        optsOut = convertTextStyle(gd, optsIn);
    }

    return optsOut;
}

function convertErrorBarStyle(trace, target) {
    var optsOut = {
        capSize: target.width * 2,
        lineWidth: target.thickness,
        color: target.color
    };

    if(target.copy_ystyle) {
        optsOut = trace.error_y;
    }

    return optsOut;
}

var SYMBOL_SDF_SIZE = constants.SYMBOL_SDF_SIZE;
var SYMBOL_SIZE = constants.SYMBOL_SIZE;
var SYMBOL_STROKE = constants.SYMBOL_STROKE;
var SYMBOL_SDF = {};
var SYMBOL_SVG_CIRCLE = Drawing.symbolFuncs[0](SYMBOL_SIZE * 0.05);

function getSymbolSdf(symbol) {
    if(symbol === 'circle') return null;

    var symbolPath, symbolSdf;
    var symbolNumber = Drawing.symbolNumber(symbol);
    var symbolFunc = Drawing.symbolFuncs[symbolNumber % 100];
    var symbolNoDot = !!Drawing.symbolNoDot[symbolNumber % 100];
    var symbolNoFill = !!Drawing.symbolNoFill[symbolNumber % 100];

    var isDot = helpers.isDotSymbol(symbol);

    // get symbol sdf from cache or generate it
    if(SYMBOL_SDF[symbol]) return SYMBOL_SDF[symbol];

    if(isDot && !symbolNoDot) {
        symbolPath = symbolFunc(SYMBOL_SIZE * 1.1) + SYMBOL_SVG_CIRCLE;
    } else {
        symbolPath = symbolFunc(SYMBOL_SIZE);
    }

    symbolSdf = svgSdf(symbolPath, {
        w: SYMBOL_SDF_SIZE,
        h: SYMBOL_SDF_SIZE,
        viewBox: [-SYMBOL_SIZE, -SYMBOL_SIZE, SYMBOL_SIZE, SYMBOL_SIZE],
        stroke: symbolNoFill ? SYMBOL_STROKE : -SYMBOL_STROKE
    });
    SYMBOL_SDF[symbol] = symbolSdf;

    return symbolSdf || null;
}

function convertLinePositions(gd, trace, positions) {
    var len = positions.length;
    var count = len / 2;
    var linePositions;
    var i;

    if(subTypes.hasLines(trace) && count) {
        if(trace.line.shape === 'hv') {
            linePositions = [];
            for(i = 0; i < count - 1; i++) {
                if(isNaN(positions[i * 2]) || isNaN(positions[i * 2 + 1])) {
                    linePositions.push(NaN, NaN, NaN, NaN);
                } else {
                    linePositions.push(positions[i * 2], positions[i * 2 + 1]);
                    if(!isNaN(positions[i * 2 + 2]) && !isNaN(positions[i * 2 + 3])) {
                        linePositions.push(positions[i * 2 + 2], positions[i * 2 + 1]);
                    } else {
                        linePositions.push(NaN, NaN);
                    }
                }
            }
            linePositions.push(positions[len - 2], positions[len - 1]);
        } else if(trace.line.shape === 'hvh') {
            linePositions = [];
            for(i = 0; i < count - 1; i++) {
                if(isNaN(positions[i * 2]) || isNaN(positions[i * 2 + 1]) || isNaN(positions[i * 2 + 2]) || isNaN(positions[i * 2 + 3])) {
                    if(!isNaN(positions[i * 2]) && !isNaN(positions[i * 2 + 1])) {
                        linePositions.push(positions[i * 2], positions[i * 2 + 1]);
                    } else {
                        linePositions.push(NaN, NaN);
                    }
                    linePositions.push(NaN, NaN);
                } else {
                    var midPtX = (positions[i * 2] + positions[i * 2 + 2]) / 2;
                    linePositions.push(
                        positions[i * 2],
                        positions[i * 2 + 1],
                        midPtX,
                        positions[i * 2 + 1],
                        midPtX,
                        positions[i * 2 + 3]
                    );
                }
            }
            linePositions.push(positions[len - 2], positions[len - 1]);
        } else if(trace.line.shape === 'vhv') {
            linePositions = [];
            for(i = 0; i < count - 1; i++) {
                if(isNaN(positions[i * 2]) || isNaN(positions[i * 2 + 1]) || isNaN(positions[i * 2 + 2]) || isNaN(positions[i * 2 + 3])) {
                    if(!isNaN(positions[i * 2]) && !isNaN(positions[i * 2 + 1])) {
                        linePositions.push(positions[i * 2], positions[i * 2 + 1]);
                    } else {
                        linePositions.push(NaN, NaN);
                    }
                    linePositions.push(NaN, NaN);
                } else {
                    var midPtY = (positions[i * 2 + 1] + positions[i * 2 + 3]) / 2;
                    linePositions.push(
                        positions[i * 2],
                        positions[i * 2 + 1],
                        positions[i * 2],
                        midPtY,
                        positions[i * 2 + 2],
                        midPtY
                    );
                }
            }
            linePositions.push(positions[len - 2], positions[len - 1]);
        } else if(trace.line.shape === 'vh') {
            linePositions = [];
            for(i = 0; i < count - 1; i++) {
                if(isNaN(positions[i * 2]) || isNaN(positions[i * 2 + 1])) {
                    linePositions.push(NaN, NaN, NaN, NaN);
                } else {
                    linePositions.push(positions[i * 2], positions[i * 2 + 1]);
                    if(!isNaN(positions[i * 2 + 2]) && !isNaN(positions[i * 2 + 3])) {
                        linePositions.push(positions[i * 2], positions[i * 2 + 3]);
                    } else {
                        linePositions.push(NaN, NaN);
                    }
                }
            }
            linePositions.push(positions[len - 2], positions[len - 1]);
        } else {
            linePositions = positions;
        }
    }

    // If we have data with gaps, we ought to use rect joins
    // FIXME: get rid of this
    var hasNaN = false;
    for(i = 0; i < linePositions.length; i++) {
        if(isNaN(linePositions[i])) {
            hasNaN = true;
            break;
        }
    }

    var join = (hasNaN || linePositions.length > constants.TOO_MANY_POINTS) ? 'rect' :
        subTypes.hasMarkers(trace) ? 'rect' : 'round';

    // fill gaps
    if(hasNaN && trace.connectgaps) {
        var lastX = linePositions[0];
        var lastY = linePositions[1];

        for(i = 0; i < linePositions.length; i += 2) {
            if(isNaN(linePositions[i]) || isNaN(linePositions[i + 1])) {
                linePositions[i] = lastX;
                linePositions[i + 1] = lastY;
            } else {
                lastX = linePositions[i];
                lastY = linePositions[i + 1];
            }
        }
    }

    return {
        join: join,
        positions: linePositions
    };
}

function convertErrorBarPositions(gd, trace, positions, x, y) {
    var makeComputeError = Registry.getComponentMethod('errorbars', 'makeComputeError');
    var xa = AxisIDs.getFromId(gd, trace.xaxis);
    var ya = AxisIDs.getFromId(gd, trace.yaxis);
    var count = positions.length / 2;
    var out = {};

    function convertOneAxis(coords, ax) {
        var axLetter = ax._id.charAt(0);
        var opts = trace['error_' + axLetter];

        if(opts && opts.visible && (ax.type === 'linear' || ax.type === 'log')) {
            var computeError = makeComputeError(opts);
            var pOffset = {x: 0, y: 1}[axLetter];
            var eOffset = {x: [0, 1, 2, 3], y: [2, 3, 0, 1]}[axLetter];
            var errors = new Float64Array(4 * count);
            var minShoe = Infinity;
            var maxHat = -Infinity;

            for(var i = 0, j = 0; i < count; i++, j += 4) {
                var dc = coords[i];

                if(isNumeric(dc)) {
                    var dl = positions[i * 2 + pOffset];
                    var vals = computeError(dc, i);
                    var lv = vals[0];
                    var hv = vals[1];

                    if(isNumeric(lv) && isNumeric(hv)) {
                        var shoe = dc - lv;
                        var hat = dc + hv;

                        errors[j + eOffset[0]] = dl - ax.c2l(shoe);
                        errors[j + eOffset[1]] = ax.c2l(hat) - dl;
                        errors[j + eOffset[2]] = 0;
                        errors[j + eOffset[3]] = 0;

                        minShoe = Math.min(minShoe, dc - lv);
                        maxHat = Math.max(maxHat, dc + hv);
                    }
                }
            }

            out[axLetter] = {
                positions: positions,
                errors: errors,
                _bnds: [minShoe, maxHat]
            };
        }
    }

    convertOneAxis(x, xa);
    convertOneAxis(y, ya);
    return out;
}

function convertTextPosition(gd, trace, textOpts, markerOpts) {
    var count = trace._length;
    var out = {};
    var i;

    // corresponds to textPointPosition from component.drawing
    if(subTypes.hasMarkers(trace)) {
        var fontOpts = textOpts.font;
        var align = textOpts.align;
        var baseline = textOpts.baseline;
        out.offset = new Array(count);

        for(i = 0; i < count; i++) {
            var ms = markerOpts.sizes ? markerOpts.sizes[i] : markerOpts.size;
            var fs = Array.isArray(fontOpts) ? fontOpts[i].size : fontOpts.size;

            var a = Array.isArray(align) ?
                (align.length > 1 ? align[i] : align[0]) :
                align;
            var b = Array.isArray(baseline) ?
                (baseline.length > 1 ? baseline[i] : baseline[0]) :
                baseline;

            var hSign = TEXTOFFSETSIGN[a];
            var vSign = TEXTOFFSETSIGN[b];
            var xPad = ms ? ms / 0.8 + 1 : 0;
            var yPad = -vSign * xPad - vSign * 0.5;
            out.offset[i] = [hSign * xPad / fs, yPad / fs];
        }
    }

    return out;
}

module.exports = {
    style: convertStyle,

    markerStyle: convertMarkerStyle,
    markerSelection: convertMarkerSelection,

    linePositions: convertLinePositions,
    errorBarPositions: convertErrorBarPositions,
    textPosition: convertTextPosition
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/helpers.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/helpers.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/scattergl/constants.js");

exports.isOpenSymbol = function(symbol) {
    return (typeof symbol === 'string') ?
        constants.OPEN_RE.test(symbol) :
        symbol % 200 > 100;
};

exports.isDotSymbol = function(symbol) {
    return (typeof symbol === 'string') ?
        constants.DOT_RE.test(symbol) :
        symbol > 200;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/hover.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/hover.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var getTraceColor = __webpack_require__(/*! ../scatter/get_trace_color */ "./node_modules/plotly.js/src/traces/scatter/get_trace_color.js");

function hoverPoints(pointData, xval, yval, hovermode) {
    var cd = pointData.cd;
    var stash = cd[0].t;
    var trace = cd[0].trace;
    var xa = pointData.xa;
    var ya = pointData.ya;
    var x = stash.x;
    var y = stash.y;
    var xpx = xa.c2p(xval);
    var ypx = ya.c2p(yval);
    var maxDistance = pointData.distance;
    var ids;

    // FIXME: make sure this is a proper way to calc search radius
    if(stash.tree) {
        var xl = xa.p2c(xpx - maxDistance);
        var xr = xa.p2c(xpx + maxDistance);
        var yl = ya.p2c(ypx - maxDistance);
        var yr = ya.p2c(ypx + maxDistance);

        if(hovermode === 'x') {
            ids = stash.tree.range(
                Math.min(xl, xr), Math.min(ya._rl[0], ya._rl[1]),
                Math.max(xl, xr), Math.max(ya._rl[0], ya._rl[1])
            );
        } else {
            ids = stash.tree.range(
                Math.min(xl, xr), Math.min(yl, yr),
                Math.max(xl, xr), Math.max(yl, yr)
            );
        }
    } else {
        ids = stash.ids;
    }

    // pick the id closest to the point
    // note that point possibly may not be found
    var id, ptx, pty, i, dx, dy, dist, dxy;

    var minDist = maxDistance;
    if(hovermode === 'x') {
        for(i = 0; i < ids.length; i++) {
            ptx = x[ids[i]];
            dx = Math.abs(xa.c2p(ptx) - xpx);
            if(dx < minDist) {
                minDist = dx;
                dy = ya.c2p(y[ids[i]]) - ypx;
                dxy = Math.sqrt(dx * dx + dy * dy);
                id = ids[i];
            }
        }
    } else {
        for(i = ids.length - 1; i > -1; i--) {
            ptx = x[ids[i]];
            pty = y[ids[i]];
            dx = xa.c2p(ptx) - xpx;
            dy = ya.c2p(pty) - ypx;

            dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < minDist) {
                minDist = dxy = dist;
                id = ids[i];
            }
        }
    }

    pointData.index = id;
    pointData.distance = minDist;
    pointData.dxy = dxy;

    if(id === undefined) return [pointData];

    return [calcHover(pointData, x, y, trace)];
}

function calcHover(pointData, x, y, trace) {
    var xa = pointData.xa;
    var ya = pointData.ya;
    var minDist = pointData.distance;
    var dxy = pointData.dxy;
    var id = pointData.index;

    // the closest data point
    var di = {
        pointNumber: id,
        x: x[id],
        y: y[id]
    };

    // that is single-item arrays_to_calcdata excerpt, since we are doing it for a single point and we don't have to do it beforehead for 1e6 points
    di.tx = Array.isArray(trace.text) ? trace.text[id] : trace.text;
    di.htx = Array.isArray(trace.hovertext) ? trace.hovertext[id] : trace.hovertext;
    di.data = Array.isArray(trace.customdata) ? trace.customdata[id] : trace.customdata;
    di.tp = Array.isArray(trace.textposition) ? trace.textposition[id] : trace.textposition;

    var font = trace.textfont;
    if(font) {
        di.ts = Lib.isArrayOrTypedArray(font.size) ? font.size[id] : font.size;
        di.tc = Array.isArray(font.color) ? font.color[id] : font.color;
        di.tf = Array.isArray(font.family) ? font.family[id] : font.family;
    }

    var marker = trace.marker;
    if(marker) {
        di.ms = Lib.isArrayOrTypedArray(marker.size) ? marker.size[id] : marker.size;
        di.mo = Lib.isArrayOrTypedArray(marker.opacity) ? marker.opacity[id] : marker.opacity;
        di.mx = Lib.isArrayOrTypedArray(marker.symbol) ? marker.symbol[id] : marker.symbol;
        di.mc = Lib.isArrayOrTypedArray(marker.color) ? marker.color[id] : marker.color;
    }

    var line = marker && marker.line;
    if(line) {
        di.mlc = Array.isArray(line.color) ? line.color[id] : line.color;
        di.mlw = Lib.isArrayOrTypedArray(line.width) ? line.width[id] : line.width;
    }

    var grad = marker && marker.gradient;
    if(grad && grad.type !== 'none') {
        di.mgt = Array.isArray(grad.type) ? grad.type[id] : grad.type;
        di.mgc = Array.isArray(grad.color) ? grad.color[id] : grad.color;
    }

    var xp = xa.c2p(di.x, true);
    var yp = ya.c2p(di.y, true);
    var rad = di.mrc || 1;

    var hoverlabel = trace.hoverlabel;

    if(hoverlabel) {
        di.hbg = Array.isArray(hoverlabel.bgcolor) ? hoverlabel.bgcolor[id] : hoverlabel.bgcolor;
        di.hbc = Array.isArray(hoverlabel.bordercolor) ? hoverlabel.bordercolor[id] : hoverlabel.bordercolor;
        di.hts = Lib.isArrayOrTypedArray(hoverlabel.font.size) ? hoverlabel.font.size[id] : hoverlabel.font.size;
        di.htc = Array.isArray(hoverlabel.font.color) ? hoverlabel.font.color[id] : hoverlabel.font.color;
        di.htf = Array.isArray(hoverlabel.font.family) ? hoverlabel.font.family[id] : hoverlabel.font.family;
        di.hnl = Lib.isArrayOrTypedArray(hoverlabel.namelength) ? hoverlabel.namelength[id] : hoverlabel.namelength;
    }
    var hoverinfo = trace.hoverinfo;
    if(hoverinfo) {
        di.hi = Array.isArray(hoverinfo) ? hoverinfo[id] : hoverinfo;
    }

    var hovertemplate = trace.hovertemplate;
    if(hovertemplate) {
        di.ht = Array.isArray(hovertemplate) ? hovertemplate[id] : hovertemplate;
    }

    var fakeCd = {};
    fakeCd[pointData.index] = di;

    var pointData2 = Lib.extendFlat({}, pointData, {
        color: getTraceColor(trace, di),

        x0: xp - rad,
        x1: xp + rad,
        xLabelVal: di.x,

        y0: yp - rad,
        y1: yp + rad,
        yLabelVal: di.y,

        cd: fakeCd,
        distance: minDist,
        spikeDistance: dxy,

        hovertemplate: di.ht
    });

    if(di.htx) pointData2.text = di.htx;
    else if(di.tx) pointData2.text = di.tx;
    else if(trace.text) pointData2.text = trace.text;

    Lib.fillText(di, trace, pointData2);
    Registry.getComponentMethod('errorbars', 'hoverInfo')(di, trace, pointData2);

    return pointData2;
}

module.exports = {
    hoverPoints: hoverPoints,
    calcHover: calcHover
};


/***/ }),

/***/ "./node_modules/point-cluster/index.js":
/*!*********************************************!*\
  !*** ./node_modules/point-cluster/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./quad */ "./node_modules/point-cluster/quad.js")


/***/ }),

/***/ "./node_modules/point-cluster/quad.js":
/*!********************************************!*\
  !*** ./node_modules/point-cluster/quad.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * @module  point-cluster/quad
 *
 * Bucket based quad tree clustering
 */



const search = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")
const clamp = __webpack_require__(/*! clamp */ "./node_modules/clamp/index.js")
const rect = __webpack_require__(/*! parse-rect */ "./node_modules/parse-rect/index.js")
const getBounds = __webpack_require__(/*! array-bounds */ "./node_modules/array-bounds/index.js")
const pick = __webpack_require__(/*! pick-by-alias */ "./node_modules/pick-by-alias/index.js")
const defined = __webpack_require__(/*! defined */ "./node_modules/defined/index.js")
const flatten = __webpack_require__(/*! flatten-vertex-data */ "./node_modules/flatten-vertex-data/index.js")
const isObj = __webpack_require__(/*! is-obj */ "./node_modules/is-obj/index.js")
const dtype = __webpack_require__(/*! dtype */ "./node_modules/dtype/index.js")
const log2 = __webpack_require__(/*! math-log2 */ "./node_modules/math-log2/index.js")

const MAX_GROUP_ID = 1073741824

module.exports = function cluster (srcPoints, options) {
	if (!options) options = {}

	srcPoints = flatten(srcPoints, 'float64')

	options = pick(options, {
		bounds: 'range bounds dataBox databox',
		maxDepth: 'depth maxDepth maxdepth level maxLevel maxlevel levels',
		dtype: 'type dtype format out dst output destination'
		// sort: 'sortBy sortby sort',
		// pick: 'pick levelPoint',
		// nodeSize: 'node nodeSize minNodeSize minSize size'
	})

	// let nodeSize = defined(options.nodeSize, 1)
	let maxDepth = defined(options.maxDepth, 255)
	let bounds = defined(options.bounds, getBounds(srcPoints, 2))
	if (bounds[0] === bounds[2]) bounds[2]++
	if (bounds[1] === bounds[3]) bounds[3]++

	let points = normalize(srcPoints, bounds)

	// init variables
	let n = srcPoints.length >>> 1
	let ids
	if (!options.dtype) options.dtype = 'array'

	if (typeof options.dtype === 'string') {
		ids = new (dtype(options.dtype))(n)
	}
	else if (options.dtype) {
		ids = options.dtype
		if (Array.isArray(ids)) ids.length = n
	}
	for (let i = 0; i < n; ++i) {
		ids[i] = i
	}

	// representative point indexes for levels
	let levels = []

	// starting indexes of subranges in sub levels, levels.length * 4
	let sublevels = []

	// unique group ids, sorted in z-curve fashion within levels by shifting bits
	let groups = []

	// level offsets in `ids`
	let offsets = []


	// sort points
	sort(0, 0, 1, ids, 0, 1)


	// return reordered ids with provided methods
	// save level offsets in output buffer
	let offset = 0
	for (let level = 0; level < levels.length; level++) {
		let levelItems = levels[level]
		if (ids.set) ids.set(levelItems, offset)
		else {
			for (let i = 0, l = levelItems.length; i < l; i++) {
				ids[i + offset] = levelItems[i]
			}
		}
		let nextOffset = offset + levels[level].length
		offsets[level] = [offset, nextOffset]
		offset = nextOffset
	}

	ids.range = range

	return ids



	// FIXME: it is possible to create one typed array heap and reuse that to avoid memory blow
	function sort (x, y, diam, ids, level, group) {
		if (!ids.length) return null

		// save first point as level representative
		let levelItems = levels[level] || (levels[level] = [])
		let levelGroups = groups[level] || (groups[level] = [])
		let sublevel = sublevels[level] || (sublevels[level] = [])
		let offset = levelItems.length

		level++

		// max depth reached - put all items into a first group
		// alternatively - if group id overflow - avoid proceeding
		if (level > maxDepth || group > MAX_GROUP_ID) {
			for (let i = 0; i < ids.length; i++) {
				levelItems.push(ids[i])
				levelGroups.push(group)
				sublevel.push(null, null, null, null)
			}

			return offset
		}

		levelItems.push(ids[0])
		levelGroups.push(group)

		if (ids.length <= 1) {
			sublevel.push(null, null, null, null)
			return offset
		}


		let d2 = diam * .5
		let cx = x + d2, cy = y + d2

		// distribute points by 4 buckets
		let lolo = [], lohi = [], hilo = [], hihi = []

		for (let i = 1, l = ids.length; i < l; i++) {
			let idx = ids[i],
				x = points[idx * 2],
				y = points[idx * 2 + 1]
			x < cx ? (y < cy ? lolo.push(idx) : lohi.push(idx)) : (y < cy ? hilo.push(idx) : hihi.push(idx))
		}

		group <<= 2

		sublevel.push(
			sort(x, y, d2, lolo, level, group),
			sort(x, cy, d2, lohi, level, group + 1),
			sort(cx, y, d2, hilo, level, group + 2),
			sort(cx, cy, d2, hihi, level, group + 3)
		)

		return offset
	}

	// get all points within the passed range
	function range ( ...args ) {
		let options

		if (isObj(args[args.length - 1])) {
			let arg = args.pop()

			// detect if that was a rect object
			if (!args.length && (arg.x != null || arg.l != null || arg.left != null)) {
				args = [arg]
				options = {}
			}

			options = pick(arg, {
				level: 'level maxLevel',
				d: 'd diam diameter r radius px pxSize pixel pixelSize maxD size minSize',
				lod: 'lod details ranges offsets'
			})
		}
		else {
			options = {}
		}

		if (!args.length) args = bounds

		let box = rect( ...args )

		let [minX, minY, maxX, maxY] = [
			Math.min(box.x, box.x + box.width),
			Math.min(box.y, box.y + box.height),
			Math.max(box.x, box.x + box.width),
			Math.max(box.y, box.y + box.height)
		]

		let [nminX, nminY, nmaxX, nmaxY] = normalize([minX, minY, maxX, maxY], bounds )

		let maxLevel = defined(options.level, levels.length)

		// limit maxLevel by px size
		if (options.d != null) {
			let d
			if (typeof options.d === 'number') d = [options.d, options.d]
			else if (options.d.length) d = options.d

			maxLevel = Math.min(
				Math.max(
					Math.ceil(-log2(Math.abs(d[0]) / (bounds[2] - bounds[0]))),
					Math.ceil(-log2(Math.abs(d[1]) / (bounds[3] - bounds[1])))
				),
				maxLevel
			)
		}
		maxLevel = Math.min(maxLevel, levels.length)

		// return levels of details
		if (options.lod) {
			return lod(nminX, nminY, nmaxX, nmaxY, maxLevel)
		}



		// do selection ids
		let selection = []

		// FIXME: probably we can do LOD here beforehead
		select( 0, 0, 1, 0, 0, 1)

		function select ( lox, loy, d, level, from, to ) {
			if (from === null || to === null) return

			let hix = lox + d
			let hiy = loy + d

			// if box does not intersect level - ignore
			if ( nminX > hix || nminY > hiy || nmaxX < lox || nmaxY < loy ) return
			if ( level >= maxLevel ) return
			if ( from === to ) return

			// if points fall into box range - take it
			let levelItems = levels[level]

			if (to === undefined) to = levelItems.length

			for (let i = from; i < to; i++) {
				let id = levelItems[i]

				let px = srcPoints[ id * 2 ]
				let py = srcPoints[ id * 2 + 1 ]

				if ( px >= minX && px <= maxX && py >= minY && py <= maxY ) {selection.push(id)
				}
			}

			// for every subsection do select
			let offsets = sublevels[ level ]
			let off0 = offsets[ from * 4 + 0 ]
			let off1 = offsets[ from * 4 + 1 ]
			let off2 = offsets[ from * 4 + 2 ]
			let off3 = offsets[ from * 4 + 3 ]
			let end = nextOffset(offsets, from + 1)

			let d2 = d * .5
			let nextLevel = level + 1
			select( lox, loy, d2, nextLevel, off0, off1 || off2 || off3 || end)
			select( lox, loy + d2, d2, nextLevel, off1, off2 || off3 || end)
			select( lox + d2, loy, d2, nextLevel, off2, off3 || end)
			select( lox + d2, loy + d2, d2, nextLevel, off3, end)
		}

		function nextOffset(offsets, from) {
			let offset = null, i = 0
			while(offset === null) {
				offset = offsets[ from * 4 + i ]
				i++
				if (i > offsets.length) return null
			}
			return offset
		}

		return selection
	}

	// get range offsets within levels to render lods appropriate for zoom level
	// TODO: it is possible to store minSize of a point to optimize neede level calc
	function lod (lox, loy, hix, hiy, maxLevel) {
		let ranges = []

		for (let level = 0; level < maxLevel; level++) {
			let levelGroups = groups[level]
			let from = offsets[level][0]

			let levelGroupStart = group(lox, loy, level)
			let levelGroupEnd = group(hix, hiy, level)

			// FIXME: utilize sublevels to speed up search range here
			let startOffset = search.ge(levelGroups, levelGroupStart)
			let endOffset = search.gt(levelGroups, levelGroupEnd, startOffset, levelGroups.length - 1)

			ranges[level] = [startOffset + from, endOffset + from]
		}

		return ranges
	}

	// get group id closest to the x,y coordinate, corresponding to a level
	function group (x, y, level) {
		let group = 1

		let cx = .5, cy = .5
		let diam = .5

		for (let i = 0; i < level; i++) {
			group <<= 2

			group += x < cx ? (y < cy ? 0 : 1) : (y < cy ? 2 : 3)

			diam *= .5

			cx += x < cx ? -diam : diam
			cy += y < cy ? -diam : diam
		}

		return group
	}
}


// normalize points by bounds
function normalize (pts, bounds) {
	let [lox, loy, hix, hiy] = bounds
	let scaleX = 1.0 / (hix - lox)
	let scaleY = 1.0 / (hiy - loy)
	let result = new Array(pts.length)

	for (let i = 0, n = pts.length / 2; i < n; i++) {
		result[2*i] = clamp((pts[2*i] - lox) * scaleX, 0, 1)
		result[2*i+1] = clamp((pts[2*i+1] - loy) * scaleY, 0, 1)
	}

	return result
}


/***/ }),

/***/ "./node_modules/regl-line2d/index.js":
/*!*******************************************!*\
  !*** ./node_modules/regl-line2d/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



const rgba = __webpack_require__(/*! color-normalize */ "./node_modules/color-normalize/index.js")
const getBounds = __webpack_require__(/*! array-bounds */ "./node_modules/array-bounds/index.js")
const extend = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js")
const glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")
const pick = __webpack_require__(/*! pick-by-alias */ "./node_modules/pick-by-alias/index.js")
const flatten = __webpack_require__(/*! flatten-vertex-data */ "./node_modules/flatten-vertex-data/index.js")
const triangulate = __webpack_require__(/*! earcut */ "./node_modules/earcut/src/earcut.js")
const normalize = __webpack_require__(/*! array-normalize */ "./node_modules/array-normalize/index.js")
const { float32, fract32 } = __webpack_require__(/*! to-float32 */ "./node_modules/to-float32/index.js")
const WeakMap = __webpack_require__(/*! es6-weak-map */ "./node_modules/es6-weak-map/index.js")
const parseRect = __webpack_require__(/*! parse-rect */ "./node_modules/parse-rect/index.js")


module.exports = Line2D


/** @constructor */
function Line2D (regl, options) {
	if (!(this instanceof Line2D)) return new Line2D(regl, options)

	if (typeof regl === 'function') {
		if (!options) options = {}
		options.regl = regl
	}
	else {
		options = regl
	}
	if (options.length) options.positions = options
	regl = options.regl

	if (!regl.hasExtension('ANGLE_instanced_arrays')) {
		throw Error('regl-error2d: `ANGLE_instanced_arrays` extension should be enabled');
	}

	// persistent variables
	this.gl = regl._gl
	this.regl = regl

	// list of options for lines
	this.passes = []

	// cached shaders instance
	this.shaders = Line2D.shaders.has(regl) ? Line2D.shaders.get(regl) : Line2D.shaders.set(regl, Line2D.createShaders(regl)).get(regl)


	// init defaults
	this.update(options)
}


Line2D.dashMult = 2
Line2D.maxPatternLength = 256
Line2D.precisionThreshold = 3e6
Line2D.maxPoints = 1e4
Line2D.maxLines = 2048


// cache of created draw calls per-regl instance
Line2D.shaders = new WeakMap()


// create static shaders once
Line2D.createShaders = function (regl) {
	let offsetBuffer = regl.buffer({
		usage: 'static',
		type: 'float',
		data: [0,1, 0,0, 1,1, 1,0]
	})

	let shaderOptions = {
		primitive: 'triangle strip',
		instances: regl.prop('count'),
		count: 4,
		offset: 0,

		uniforms: {
			miterMode: (ctx, prop) => prop.join === 'round' ? 2 : 1,
			miterLimit: regl.prop('miterLimit'),
			scale: regl.prop('scale'),
			scaleFract: regl.prop('scaleFract'),
			translateFract: regl.prop('translateFract'),
			translate: regl.prop('translate'),
			thickness: regl.prop('thickness'),
			dashPattern: regl.prop('dashTexture'),
			opacity: regl.prop('opacity'),
			pixelRatio: regl.context('pixelRatio'),
			id: regl.prop('id'),
			dashSize: regl.prop('dashLength'),
			viewport: (c, p) => [p.viewport.x, p.viewport.y, c.viewportWidth, c.viewportHeight],
			depth: regl.prop('depth')
		},

		blend: {
			enable: true,
			color: [0,0,0,0],
			equation: {
				rgb: 'add',
				alpha: 'add'
			},
			func: {
				srcRGB: 'src alpha',
				dstRGB: 'one minus src alpha',
				srcAlpha: 'one minus dst alpha',
				dstAlpha: 'one'
			}
		},
		depth: {
			enable: (c, p) => {
				return !p.overlay
			}
		},
		stencil: {enable: false},
		scissor: {
			enable: true,
			box: regl.prop('viewport')
		},
		viewport: regl.prop('viewport')
	}


	// simplified rectangular line shader
	let drawRectLine = regl(extend({
		vert: glslify('./rect-vert.glsl'),
		frag: glslify('./rect-frag.glsl'),

		attributes: {
			// if point is at the end of segment
			lineEnd: {
				buffer: offsetBuffer,
				divisor: 0,
				stride: 8,
				offset: 0
			},
			// if point is at the top of segment
			lineTop: {
				buffer: offsetBuffer,
				divisor: 0,
				stride: 8,
				offset: 4
			},
			// beginning of line coordinate
			aCoord: {
				buffer: regl.prop('positionBuffer'),
				stride: 8,
				offset: 8,
				divisor: 1
			},
			// end of line coordinate
			bCoord: {
				buffer: regl.prop('positionBuffer'),
				stride: 8,
				offset: 16,
				divisor: 1
			},
			aCoordFract: {
				buffer: regl.prop('positionFractBuffer'),
				stride: 8,
				offset: 8,
				divisor: 1
			},
			bCoordFract: {
				buffer: regl.prop('positionFractBuffer'),
				stride: 8,
				offset: 16,
				divisor: 1
			},
			color: {
				buffer: regl.prop('colorBuffer'),
				stride: 4,
				offset: 0,
				divisor: 1
			}
		}
	}, shaderOptions))

	// create regl draw
	let drawMiterLine

	try {
		drawMiterLine = regl(extend({
			// culling removes polygon creasing
			cull: {
				enable: true,
				face: 'back'
			},

			vert: glslify('./miter-vert.glsl'),
			frag: glslify('./miter-frag.glsl'),

			attributes: {
				// is line end
				lineEnd: {
					buffer: offsetBuffer,
					divisor: 0,
					stride: 8,
					offset: 0
				},
				// is line top
				lineTop: {
					buffer: offsetBuffer,
					divisor: 0,
					stride: 8,
					offset: 4
				},
				// left color
				aColor: {
					buffer: regl.prop('colorBuffer'),
					stride: 4,
					offset: 0,
					divisor: 1
				},
				// right color
				bColor: {
					buffer: regl.prop('colorBuffer'),
					stride: 4,
					offset: 4,
					divisor: 1
				},
				prevCoord: {
					buffer: regl.prop('positionBuffer'),
					stride: 8,
					offset: 0,
					divisor: 1
				},
				aCoord: {
					buffer: regl.prop('positionBuffer'),
					stride: 8,
					offset: 8,
					divisor: 1
				},
				bCoord: {
					buffer: regl.prop('positionBuffer'),
					stride: 8,
					offset: 16,
					divisor: 1
				},
				nextCoord: {
					buffer: regl.prop('positionBuffer'),
					stride: 8,
					offset: 24,
					divisor: 1
				}
			}
		}, shaderOptions))
	} catch (e) {
		// IE/bad Webkit fallback
		drawMiterLine = drawRectLine
	}

	// fill shader
	let drawFill = regl({
		primitive: 'triangle',
		elements: (ctx, prop) => prop.triangles,
		offset: 0,

		vert: glslify('./fill-vert.glsl'),
		frag: glslify('./fill-frag.glsl'),

		uniforms: {
			scale: regl.prop('scale'),
			color: regl.prop('fill'),
			scaleFract: regl.prop('scaleFract'),
			translateFract: regl.prop('translateFract'),
			translate: regl.prop('translate'),
			opacity: regl.prop('opacity'),
			pixelRatio: regl.context('pixelRatio'),
			id: regl.prop('id'),
			viewport: (ctx, prop) => [prop.viewport.x, prop.viewport.y, ctx.viewportWidth, ctx.viewportHeight]
		},

		attributes: {
			position: {
				buffer: regl.prop('positionBuffer'),
				stride: 8,
				offset: 8
			},
			positionFract: {
				buffer: regl.prop('positionFractBuffer'),
				stride: 8,
				offset: 8
			}
		},

		blend: shaderOptions.blend,

		depth: { enable: false },
		scissor: shaderOptions.scissor,
		stencil: shaderOptions.stencil,
		viewport: shaderOptions.viewport
	})

	return {
		fill: drawFill, rect: drawRectLine, miter: drawMiterLine
	}
}


// used to for new lines instances
Line2D.defaults = {
	dashes: null,
	join: 'miter',
	miterLimit: 1,
	thickness: 10,
	cap: 'square',
	color: 'black',
	opacity: 1,
	overlay: false,
	viewport: null,
	range: null,
	close: false,
	fill: null
}


Line2D.prototype.render = function (...args) {
	if (args.length) {
		this.update(...args)
	}

	this.draw()
}


Line2D.prototype.draw = function (...args) {
	// render multiple polylines via regl batch
	(args.length ? args : this.passes).forEach((s, i) => {
		// render array pass as a list of passes
		if (s && Array.isArray(s)) return this.draw(...s)

		if (typeof s === 'number') s = this.passes[s]

		if (!(s && s.count > 1 && s.opacity)) return

		this.regl._refresh()

		if (s.fill && s.triangles && s.triangles.length > 2) {
			this.shaders.fill(s)
		}

		if (!s.thickness) return

		// high scale is only available for rect mode with precision
		if (s.scale[0] * s.viewport.width > Line2D.precisionThreshold || s.scale[1] * s.viewport.height > Line2D.precisionThreshold) {
			this.shaders.rect(s)
		}

		// thin this.passes or too many points are rendered as simplified rect shader
		else if (s.join === 'rect' || (!s.join && (s.thickness <= 2 || s.count >= Line2D.maxPoints))) {
			this.shaders.rect(s)
		}
		else {
			this.shaders.miter(s)
		}
	})

	return this
}

Line2D.prototype.update = function (options) {
	if (!options) return

	if (options.length != null) {
		if (typeof options[0] === 'number') options = [{positions: options}]
	}

	// make options a batch
	else if (!Array.isArray(options)) options = [options]

	let { regl, gl } = this

	// process per-line settings
	options.forEach((o, i) => {
		let state = this.passes[i]

		if (o === undefined) return

		// null-argument removes pass
		if (o === null) {
			this.passes[i] = null
			return
		}

		if (typeof o[0] === 'number') o = {positions: o}

		// handle aliases
		o = pick(o, {
			positions: 'positions points data coords',
			thickness: 'thickness lineWidth lineWidths line-width linewidth width stroke-width strokewidth strokeWidth',
			join: 'lineJoin linejoin join type mode',
			miterLimit: 'miterlimit miterLimit',
			dashes: 'dash dashes dasharray dash-array dashArray',
			color: 'color colour stroke colors colours stroke-color strokeColor',
			fill: 'fill fill-color fillColor',
			opacity: 'alpha opacity',
			overlay: 'overlay crease overlap intersect',
			close: 'closed close closed-path closePath',
			range: 'range dataBox',
			viewport: 'viewport viewBox',
			hole: 'holes hole hollow'
		})

		// init state
		if (!state) {
			this.passes[i] = state = {
				id: i,
				scale: null,
				scaleFract: null,
				translate: null,
				translateFract: null,
				count: 0,
				hole: [],
				depth: 0,

				dashLength: 1,
				dashTexture: regl.texture({
					channels: 1,
					data: new Uint8Array([255]),
					width: 1,
					height: 1,
					mag: 'linear',
					min: 'linear'
				}),

				colorBuffer: regl.buffer({
					usage: 'dynamic',
					type: 'uint8',
					data: new Uint8Array()
				}),
				positionBuffer: regl.buffer({
					usage: 'dynamic',
					type: 'float',
					data: new Uint8Array()
				}),
				positionFractBuffer: regl.buffer({
					usage: 'dynamic',
					type: 'float',
					data: new Uint8Array()
				})
			}

			o = extend({}, Line2D.defaults, o)
		}
		if (o.thickness != null) state.thickness = parseFloat(o.thickness)
		if (o.opacity != null) state.opacity = parseFloat(o.opacity)
		if (o.miterLimit != null) state.miterLimit = parseFloat(o.miterLimit)
		if (o.overlay != null) {
			state.overlay = !!o.overlay
			if (i < Line2D.maxLines) {
				state.depth = 2 * (Line2D.maxLines - 1 - i % Line2D.maxLines) / Line2D.maxLines - 1.;
			}
		}
		if (o.join != null) state.join = o.join
		if (o.hole != null) state.hole = o.hole
		if (o.fill != null) state.fill = !o.fill ? null : rgba(o.fill, 'uint8')
		if (o.viewport != null) state.viewport = parseRect(o.viewport)

		if (!state.viewport) {
			state.viewport = parseRect([
				gl.drawingBufferWidth,
				gl.drawingBufferHeight
			])
		}

		if (o.close != null) state.close = o.close

		// reset positions
		if (o.positions === null) o.positions = []
		if (o.positions) {
			let positions, count

			// if positions are an object with x/y
			if (o.positions.x && o.positions.y) {
				let xPos = o.positions.x
				let yPos = o.positions.y
				count = state.count = Math.max(
					xPos.length,
					yPos.length
				)
				positions = new Float64Array(count * 2)
				for (let i = 0; i < count; i++) {
					positions[i * 2] = xPos[i]
					positions[i * 2 + 1] = yPos[i]
				}
			}
			else {
				positions = flatten(o.positions, 'float64')
				count = state.count = Math.floor(positions.length / 2)
			}

			let bounds = state.bounds = getBounds(positions, 2)

			// create fill positions
			// FIXME: fill positions can be set only along with positions
			if (state.fill) {
				let pos = []

				// filter bad vertices and remap triangles to ensure shape
				let ids = {}
				let lastId = 0

				for (let i = 0, ptr = 0, l = state.count; i < l; i++) {
					let x = positions[i*2]
					let y = positions[i*2 + 1]
					if (isNaN(x) || isNaN(y) || x == null || y == null) {
						x = positions[lastId*2]
						y = positions[lastId*2 + 1]
						ids[i] = lastId
					}
					else {
						lastId = i
					}
					pos[ptr++] = x
					pos[ptr++] = y
				}

				let triangles = triangulate(pos, state.hole || [])

				for (let i = 0, l = triangles.length; i < l; i++) {
					if (ids[triangles[i]] != null) triangles[i] = ids[triangles[i]]
				}

				state.triangles = triangles
			}

			// update position buffers
			let npos = new Float64Array(positions)
			normalize(npos, 2, bounds)

			let positionData = new Float64Array(count * 2 + 6)

			// rotate first segment join
			if (state.close) {
				if (positions[0] === positions[count*2 - 2] &&
					positions[1] === positions[count*2 - 1]) {
					positionData[0] = npos[count*2 - 4]
					positionData[1] = npos[count*2 - 3]
				}
				else {
					positionData[0] = npos[count*2 - 2]
					positionData[1] = npos[count*2 - 1]
				}
			}
			else {
				positionData[0] = npos[0]
				positionData[1] = npos[1]
			}

			positionData.set(npos, 2)

			// add last segment
			if (state.close) {
				// ignore coinciding start/end
				if (positions[0] === positions[count*2 - 2] &&
					positions[1] === positions[count*2 - 1]) {
					positionData[count*2 + 2] = npos[2]
					positionData[count*2 + 3] = npos[3]
					state.count -= 1
				}
				else {
					positionData[count*2 + 2] = npos[0]
					positionData[count*2 + 3] = npos[1]
					positionData[count*2 + 4] = npos[2]
					positionData[count*2 + 5] = npos[3]
				}
			}
			// add stub
			else {
				positionData[count*2 + 2] = npos[count*2 - 2]
				positionData[count*2 + 3] = npos[count*2 - 1]
				positionData[count*2 + 4] = npos[count*2 - 2]
				positionData[count*2 + 5] = npos[count*2 - 1]
			}

			state.positionBuffer(float32(positionData))
			state.positionFractBuffer(fract32(positionData))
		}

		if (o.range) {
			state.range = o.range
		} else if (!state.range) {
			state.range = state.bounds
		}

		if ((o.range || o.positions) && state.count) {
			let bounds = state.bounds

			let boundsW = bounds[2] - bounds[0],
				boundsH = bounds[3] - bounds[1]

			let rangeW = state.range[2] - state.range[0],
				rangeH = state.range[3] - state.range[1]

			state.scale = [
				boundsW / rangeW,
				boundsH / rangeH
			]
			state.translate = [
				-state.range[0] / rangeW + bounds[0] / rangeW || 0,
				-state.range[1] / rangeH + bounds[1] / rangeH || 0
			]

			state.scaleFract = fract32(state.scale)
			state.translateFract = fract32(state.translate)
		}

		if (o.dashes) {
			let dashLength = 0., dashData

			if (!o.dashes || o.dashes.length < 2) {
				dashLength = 1.
				dashData = new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255])
			}

			else {
				dashLength = 0.;
				for(let i = 0; i < o.dashes.length; ++i) {
					dashLength += o.dashes[i]
				}
				dashData = new Uint8Array(dashLength * Line2D.dashMult)
				let ptr = 0
				let fillColor = 255

				// repeat texture two times to provide smooth 0-step
				for (let k = 0; k < 2; k++) {
					for(let i = 0; i < o.dashes.length; ++i) {
						for(let j = 0, l = o.dashes[i] * Line2D.dashMult * .5; j < l; ++j) {
							dashData[ptr++] = fillColor
						}
						fillColor ^= 255
					}
				}
			}

			state.dashLength = dashLength
			state.dashTexture({
				channels: 1,
				data: dashData,
				width: dashData.length,
				height: 1,
				mag: 'linear',
				min: 'linear'
			}, 0, 0)
		}

		if (o.color) {
			let count = state.count
			let colors = o.color

			if (!colors) colors = 'transparent'

			let colorData = new Uint8Array(count * 4 + 4)

			// convert colors to typed arrays
			if (!Array.isArray(colors) || typeof colors[0] === 'number') {
				let c = rgba(colors, 'uint8')

				for (let i = 0; i < count + 1; i++) {
					colorData.set(c, i * 4)
				}
			} else {
				for (let i = 0; i < count; i++) {
					let c = rgba(colors[i], 'uint8')
					colorData.set(c, i * 4)
				}
				colorData.set(rgba(colors[0], 'uint8'), count * 4)
			}

			state.colorBuffer({
				usage: 'dynamic',
				type: 'uint8',
				data: colorData
			})
		}
	})

	// remove unmentioned passes
	if (options.length < this.passes.length) {
		for (let i = options.length; i < this.passes.length; i++) {
			let pass = this.passes[i]
			if (!pass) continue
			pass.colorBuffer.destroy()
			pass.positionBuffer.destroy()
			pass.dashTexture.destroy()
		}
		this.passes.length = options.length
	}

	// remove null items
	let passes = []
	for (let i = 0; i < this.passes.length; i++) {
		if (this.passes[i] !== null) passes.push(this.passes[i])
	}
	this.passes = passes

	return this
}

Line2D.prototype.destroy = function () {
	this.passes.forEach(pass => {
		pass.colorBuffer.destroy()
		pass.positionBuffer.destroy()
		pass.dashTexture.destroy()
	})

	this.passes.length = 0

	return this
}



/***/ }),

/***/ "./node_modules/regl-scatter2d/bundle.js":
/*!***********************************************!*\
  !*** ./node_modules/regl-scatter2d/bundle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var rgba = __webpack_require__(/*! color-normalize */ "./node_modules/color-normalize/index.js");

var getBounds = __webpack_require__(/*! array-bounds */ "./node_modules/array-bounds/index.js");

var colorId = __webpack_require__(/*! color-id */ "./node_modules/color-id/index.js");

var cluster = __webpack_require__(/*! point-cluster */ "./node_modules/point-cluster/index.js");

var extend = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js");

var pick = __webpack_require__(/*! pick-by-alias */ "./node_modules/pick-by-alias/index.js");

var updateDiff = __webpack_require__(/*! update-diff */ "./node_modules/update-diff/index.js");

var flatten = __webpack_require__(/*! flatten-vertex-data */ "./node_modules/flatten-vertex-data/index.js");

var ie = __webpack_require__(/*! is-iexplorer */ "./node_modules/is-iexplorer/index.js");

var f32 = __webpack_require__(/*! to-float32 */ "./node_modules/to-float32/index.js");

var parseRect = __webpack_require__(/*! parse-rect */ "./node_modules/parse-rect/index.js");

var scatter = Scatter;

function Scatter(regl, options) {
  var _this = this;

  if (!(this instanceof Scatter)) return new Scatter(regl, options);

  if (typeof regl === 'function') {
    if (!options) options = {};
    options.regl = regl;
  } else {
    options = regl;
    regl = null;
  }

  if (options && options.length) options.positions = options;
  regl = options.regl; // persistent variables

  var gl = regl._gl,
      paletteTexture,
      palette = [],
      paletteIds = {},
      // state
  groups = [],
      // textures for marker keys
  markerTextures = [null],
      markerCache = [null];
  var maxColors = 255,
      maxSize = 100; // direct color buffer mode
  // IE does not support palette anyways

  this.tooManyColors = ie; // texture with color palette

  paletteTexture = regl.texture({
    data: new Uint8Array(maxColors * 4),
    width: maxColors,
    height: 1,
    type: 'uint8',
    format: 'rgba',
    wrapS: 'clamp',
    wrapT: 'clamp',
    mag: 'nearest',
    min: 'nearest'
  });
  extend(this, {
    regl: regl,
    gl: gl,
    groups: groups,
    markerCache: markerCache,
    markerTextures: markerTextures,
    palette: palette,
    paletteIds: paletteIds,
    paletteTexture: paletteTexture,
    maxColors: maxColors,
    maxSize: maxSize,
    canvas: gl.canvas
  });
  this.update(options); // common shader options

  var shaderOptions = {
    uniforms: {
      pixelRatio: regl.context('pixelRatio'),
      palette: paletteTexture,
      paletteSize: function paletteSize(ctx, prop) {
        return [_this.tooManyColors ? 0 : maxColors, paletteTexture.height];
      },
      scale: regl.prop('scale'),
      scaleFract: regl.prop('scaleFract'),
      translate: regl.prop('translate'),
      translateFract: regl.prop('translateFract'),
      opacity: regl.prop('opacity'),
      marker: regl.prop('markerTexture')
    },
    attributes: {
      // FIXME: optimize these parts
      x: function x(ctx, prop) {
        return prop.xAttr || {
          buffer: prop.positionBuffer,
          stride: 8,
          offset: 0
        };
      },
      y: function y(ctx, prop) {
        return prop.yAttr || {
          buffer: prop.positionBuffer,
          stride: 8,
          offset: 4
        };
      },
      xFract: function xFract(ctx, prop) {
        return prop.xAttr ? {
          constant: [0, 0]
        } : {
          buffer: prop.positionFractBuffer,
          stride: 8,
          offset: 0
        };
      },
      yFract: function yFract(ctx, prop) {
        return prop.yAttr ? {
          constant: [0, 0]
        } : {
          buffer: prop.positionFractBuffer,
          stride: 8,
          offset: 4
        };
      },
      size: function size(ctx, prop) {
        return prop.size.length ? {
          buffer: prop.sizeBuffer,
          stride: 2,
          offset: 0
        } : {
          constant: [Math.round(prop.size * 255 / _this.maxSize)]
        };
      },
      borderSize: function borderSize(ctx, prop) {
        return prop.borderSize.length ? {
          buffer: prop.sizeBuffer,
          stride: 2,
          offset: 1
        } : {
          constant: [Math.round(prop.borderSize * 255 / _this.maxSize)]
        };
      },
      colorId: function colorId(ctx, prop) {
        return prop.color.length ? {
          buffer: prop.colorBuffer,
          stride: _this.tooManyColors ? 8 : 4,
          offset: 0
        } : {
          constant: _this.tooManyColors ? palette.slice(prop.color * 4, prop.color * 4 + 4) : [prop.color]
        };
      },
      borderColorId: function borderColorId(ctx, prop) {
        return prop.borderColor.length ? {
          buffer: prop.colorBuffer,
          stride: _this.tooManyColors ? 8 : 4,
          offset: _this.tooManyColors ? 4 : 2
        } : {
          constant: _this.tooManyColors ? palette.slice(prop.borderColor * 4, prop.borderColor * 4 + 4) : [prop.borderColor]
        };
      },
      isActive: function isActive(ctx, prop) {
        return prop.activation === true ? {
          constant: [1]
        } : prop.activation ? prop.activation : {
          constant: [0]
        };
      }
    },
    blend: {
      enable: true,
      color: [0, 0, 0, 1],
      // photoshop blending
      func: {
        srcRGB: 'src alpha',
        dstRGB: 'one minus src alpha',
        srcAlpha: 'one minus dst alpha',
        dstAlpha: 'one'
      }
    },
    scissor: {
      enable: true,
      box: regl.prop('viewport')
    },
    viewport: regl.prop('viewport'),
    stencil: {
      enable: false
    },
    depth: {
      enable: false
    },
    elements: regl.prop('elements'),
    count: regl.prop('count'),
    offset: regl.prop('offset'),
    primitive: 'points'
  }; // draw sdf-marker

  var markerOptions = extend({}, shaderOptions);
  markerOptions.frag = glslify(["precision highp float;\n#define GLSLIFY 1\n\nvarying vec4 fragColor, fragBorderColor;\nvarying float fragWidth, fragBorderColorLevel, fragColorLevel;\n\nuniform sampler2D marker;\nuniform float pixelRatio, opacity;\n\nfloat smoothStep(float x, float y) {\n  return 1.0 / (1.0 + exp(50.0*(x - y)));\n}\n\nvoid main() {\n  float dist = texture2D(marker, gl_PointCoord).r, delta = fragWidth;\n\n  // max-distance alpha\n  if (dist < 0.003) discard;\n\n  // null-border case\n  if (fragBorderColorLevel == fragColorLevel || fragBorderColor.a == 0.) {\n    float colorAmt = smoothstep(.5 - delta, .5 + delta, dist);\n    gl_FragColor = vec4(fragColor.rgb, colorAmt * fragColor.a * opacity);\n  }\n  else {\n    float borderColorAmt = smoothstep(fragBorderColorLevel - delta, fragBorderColorLevel + delta, dist);\n    float colorAmt = smoothstep(fragColorLevel - delta, fragColorLevel + delta, dist);\n\n    vec4 color = fragBorderColor;\n    color.a *= borderColorAmt;\n    color = mix(color, fragColor, colorAmt);\n    color.a *= opacity;\n\n    gl_FragColor = color;\n  }\n\n}\n"]);
  markerOptions.vert = glslify(["precision highp float;\n#define GLSLIFY 1\n\nattribute float x, y, xFract, yFract;\nattribute float size, borderSize;\nattribute vec4 colorId, borderColorId;\nattribute float isActive;\n\nuniform vec2 scale, scaleFract, translate, translateFract, paletteSize;\nuniform float pixelRatio;\nuniform sampler2D palette;\n\nconst float maxSize = 100.;\nconst float borderLevel = .5;\n\nvarying vec4 fragColor, fragBorderColor;\nvarying float fragPointSize, fragBorderRadius, fragWidth, fragBorderColorLevel, fragColorLevel;\n\nbool isDirect = (paletteSize.x < 1.);\n\nvec4 getColor(vec4 id) {\n  return isDirect ? id / 255. : texture2D(palette,\n    vec2(\n      (id.x + .5) / paletteSize.x,\n      (id.y + .5) / paletteSize.y\n    )\n  );\n}\n\nvoid main() {\n  if (isActive == 0.) return;\n\n  vec2 position = vec2(x, y);\n  vec2 positionFract = vec2(xFract, yFract);\n\n  vec4 color = getColor(colorId);\n  vec4 borderColor = getColor(borderColorId);\n\n  float size = size * maxSize / 255.;\n  float borderSize = borderSize * maxSize / 255.;\n\n  gl_PointSize = 2. * size * pixelRatio;\n  fragPointSize = size * pixelRatio;\n\n  vec2 pos = (position + translate) * scale\n      + (positionFract + translateFract) * scale\n      + (position + translate) * scaleFract\n      + (positionFract + translateFract) * scaleFract;\n\n  gl_Position = vec4(pos * 2. - 1., 0, 1);\n\n  fragColor = color;\n  fragBorderColor = borderColor;\n  fragWidth = 1. / gl_PointSize;\n\n  fragBorderColorLevel = clamp(borderLevel - borderLevel * borderSize / size, 0., 1.);\n  fragColorLevel = clamp(borderLevel + (1. - borderLevel) * borderSize / size, 0., 1.);\n}"]);
  this.drawMarker = regl(markerOptions); // draw circle

  var circleOptions = extend({}, shaderOptions);
  circleOptions.frag = glslify(["precision highp float;\n#define GLSLIFY 1\n\nvarying vec4 fragColor, fragBorderColor;\n\nuniform float opacity;\nvarying float fragBorderRadius, fragWidth;\n\nfloat smoothStep(float edge0, float edge1, float x) {\n\tfloat t;\n\tt = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n\treturn t * t * (3.0 - 2.0 * t);\n}\n\nvoid main() {\n\tfloat radius, alpha = 1.0, delta = fragWidth;\n\n\tradius = length(2.0 * gl_PointCoord.xy - 1.0);\n\n\tif (radius > 1.0 + delta) {\n\t\tdiscard;\n\t}\n\n\talpha -= smoothstep(1.0 - delta, 1.0 + delta, radius);\n\n\tfloat borderRadius = fragBorderRadius;\n\tfloat ratio = smoothstep(borderRadius - delta, borderRadius + delta, radius);\n\tvec4 color = mix(fragColor, fragBorderColor, ratio);\n\tcolor.a *= alpha * opacity;\n\tgl_FragColor = color;\n}\n"]);
  circleOptions.vert = glslify(["precision highp float;\n#define GLSLIFY 1\n\nattribute float x, y, xFract, yFract;\nattribute float size, borderSize;\nattribute vec4 colorId, borderColorId;\nattribute float isActive;\n\nuniform vec2 scale, scaleFract, translate, translateFract;\nuniform float pixelRatio;\nuniform sampler2D palette;\nuniform vec2 paletteSize;\n\nconst float maxSize = 100.;\n\nvarying vec4 fragColor, fragBorderColor;\nvarying float fragBorderRadius, fragWidth;\n\nbool isDirect = (paletteSize.x < 1.);\n\nvec4 getColor(vec4 id) {\n  return isDirect ? id / 255. : texture2D(palette,\n    vec2(\n      (id.x + .5) / paletteSize.x,\n      (id.y + .5) / paletteSize.y\n    )\n  );\n}\n\nvoid main() {\n  // ignore inactive points\n  if (isActive == 0.) return;\n\n  vec2 position = vec2(x, y);\n  vec2 positionFract = vec2(xFract, yFract);\n\n  vec4 color = getColor(colorId);\n  vec4 borderColor = getColor(borderColorId);\n\n  float size = size * maxSize / 255.;\n  float borderSize = borderSize * maxSize / 255.;\n\n  gl_PointSize = (size + borderSize) * pixelRatio;\n\n  vec2 pos = (position + translate) * scale\n      + (positionFract + translateFract) * scale\n      + (position + translate) * scaleFract\n      + (positionFract + translateFract) * scaleFract;\n\n  gl_Position = vec4(pos * 2. - 1., 0, 1);\n\n  fragBorderRadius = 1. - 2. * borderSize / (size + borderSize);\n  fragColor = color;\n  fragBorderColor = borderColor.a == 0. || borderSize == 0. ? vec4(color.rgb, 0.) : borderColor;\n  fragWidth = 1. / gl_PointSize;\n}\n"]); // polyfill IE

  if (ie) {
    circleOptions.frag = circleOptions.frag.replace('smoothstep', 'smoothStep');
    markerOptions.frag = markerOptions.frag.replace('smoothstep', 'smoothStep');
  }

  this.drawCircle = regl(circleOptions);
} // single pass defaults


Scatter.defaults = {
  color: 'black',
  borderColor: 'transparent',
  borderSize: 0,
  size: 12,
  opacity: 1,
  marker: undefined,
  viewport: null,
  range: null,
  pixelSize: null,
  count: 0,
  offset: 0,
  bounds: null,
  positions: [],
  snap: 1e4
}; // update & redraw

Scatter.prototype.render = function () {
  if (arguments.length) {
    this.update.apply(this, arguments);
  }

  this.draw();
  return this;
}; // draw all groups or only indicated ones


Scatter.prototype.draw = function () {
  var _this2 = this;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var groups = this.groups; // if directly array passed - treat as passes

  if (args.length === 1 && Array.isArray(args[0]) && (args[0][0] === null || Array.isArray(args[0][0]))) {
    args = args[0];
  } // FIXME: remove once https://github.com/regl-project/regl/issues/474 resolved


  this.regl._refresh();

  if (args.length) {
    for (var i = 0; i < args.length; i++) {
      this.drawItem(i, args[i]);
    }
  } // draw all passes
  else {
      groups.forEach(function (group, i) {
        _this2.drawItem(i);
      });
    }

  return this;
}; // draw specific scatter group


Scatter.prototype.drawItem = function (id, els) {
  var groups = this.groups;
  var group = groups[id]; // debug viewport
  // let { viewport } = group
  // gl.enable(gl.SCISSOR_TEST);
  // gl.scissor(viewport.x, viewport.y, viewport.width, viewport.height);
  // gl.clearColor(0, 0, 0, .5);
  // gl.clear(gl.COLOR_BUFFER_BIT);

  if (typeof els === 'number') {
    id = els;
    group = groups[els];
    els = null;
  }

  if (!(group && group.count && group.opacity)) return; // draw circles

  if (group.activation[0]) {
    // TODO: optimize this performance by making groups and regl.this props
    this.drawCircle(this.getMarkerDrawOptions(0, group, els));
  } // draw all other available markers


  var batch = [];

  for (var i = 1; i < group.activation.length; i++) {
    if (!group.activation[i] || group.activation[i] !== true && !group.activation[i].data.length) continue;
    batch.push.apply(batch, _toConsumableArray(this.getMarkerDrawOptions(i, group, els)));
  }

  if (batch.length) {
    this.drawMarker(batch);
  }
}; // get options for the marker ids


Scatter.prototype.getMarkerDrawOptions = function (markerId, group, elements) {
  var range = group.range,
      tree = group.tree,
      viewport = group.viewport,
      activation = group.activation,
      selectionBuffer = group.selectionBuffer,
      count = group.count;
  var regl = this.regl; // direct points

  if (!tree) {
    // if elements array - draw unclustered points
    if (elements) {
      return [extend({}, group, {
        markerTexture: this.markerTextures[markerId],
        activation: activation[markerId],
        count: elements.length,
        elements: elements,
        offset: 0
      })];
    }

    return [extend({}, group, {
      markerTexture: this.markerTextures[markerId],
      activation: activation[markerId],
      offset: 0
    })];
  } // clustered points


  var batch = [];
  var lod = tree.range(range, {
    lod: true,
    px: [(range[2] - range[0]) / viewport.width, (range[3] - range[1]) / viewport.height]
  }); // enable elements by using selection buffer

  if (elements) {
    var markerActivation = activation[markerId];
    var mask = markerActivation.data;
    var data = new Uint8Array(count);

    for (var i = 0; i < elements.length; i++) {
      var id = elements[i];
      data[id] = mask ? mask[id] : 1;
    }

    selectionBuffer.subdata(data);
  }

  for (var l = lod.length; l--;) {
    var _lod$l = _slicedToArray(lod[l], 2),
        from = _lod$l[0],
        to = _lod$l[1];

    batch.push(extend({}, group, {
      markerTexture: this.markerTextures[markerId],
      activation: elements ? selectionBuffer : activation[markerId],
      offset: from,
      count: to - from
    }));
  }

  return batch;
}; // update groups options


Scatter.prototype.update = function () {
  var _this3 = this;

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (!args.length) return; // passes are as single array

  if (args.length === 1 && Array.isArray(args[0])) args = args[0];
  var groups = this.groups,
      gl = this.gl,
      regl = this.regl,
      maxSize = this.maxSize,
      maxColors = this.maxColors,
      palette = this.palette;
  this.groups = groups = args.map(function (options, i) {
    var group = groups[i];
    if (options === undefined) return group;
    if (options === null) options = {
      positions: null
    };else if (typeof options === 'function') options = {
      ondraw: options
    };else if (typeof options[0] === 'number') options = {
      positions: options
    }; // copy options to avoid mutation & handle aliases

    options = pick(options, {
      positions: 'positions data points',
      snap: 'snap cluster lod tree',
      size: 'sizes size radius',
      borderSize: 'borderSizes borderSize border-size bordersize borderWidth borderWidths border-width borderwidth stroke-width strokeWidth strokewidth outline',
      color: 'colors color fill fill-color fillColor',
      borderColor: 'borderColors borderColor stroke stroke-color strokeColor',
      marker: 'markers marker shape',
      range: 'range dataBox databox',
      viewport: 'viewport viewPort viewBox viewbox',
      opacity: 'opacity alpha transparency',
      bounds: 'bound bounds boundaries limits',
      tooManyColors: 'tooManyColors palette paletteMode optimizePalette enablePalette'
    });
    if (options.positions === null) options.positions = [];
    if (options.tooManyColors != null) _this3.tooManyColors = options.tooManyColors;

    if (!group) {
      groups[i] = group = {
        id: i,
        scale: null,
        translate: null,
        scaleFract: null,
        translateFract: null,
        // buffers for active markers
        activation: [],
        // buffer for filtered markers
        selectionBuffer: regl.buffer({
          data: new Uint8Array(0),
          usage: 'stream',
          type: 'uint8'
        }),
        // buffers with data: it is faster to switch them per-pass
        // than provide one congregate buffer
        sizeBuffer: regl.buffer({
          data: new Uint8Array(0),
          usage: 'dynamic',
          type: 'uint8'
        }),
        colorBuffer: regl.buffer({
          data: new Uint8Array(0),
          usage: 'dynamic',
          type: 'uint8'
        }),
        positionBuffer: regl.buffer({
          data: new Uint8Array(0),
          usage: 'dynamic',
          type: 'float'
        }),
        positionFractBuffer: regl.buffer({
          data: new Uint8Array(0),
          usage: 'dynamic',
          type: 'float'
        })
      };
      options = extend({}, Scatter.defaults, options);
    } // force update triggers


    if (options.positions && !('marker' in options)) {
      options.marker = group.marker;
      delete group.marker;
    } // updating markers cause recalculating snapping


    if (options.marker && !('positions' in options)) {
      options.positions = group.positions;
      delete group.positions;
    } // global count of points


    var hasSize = 0,
        hasColor = 0;
    updateDiff(group, options, [{
      snap: true,
      size: function size(s, group) {
        if (s == null) s = Scatter.defaults.size;
        hasSize += s && s.length ? 1 : 0;
        return s;
      },
      borderSize: function borderSize(s, group) {
        if (s == null) s = Scatter.defaults.borderSize;
        hasSize += s && s.length ? 1 : 0;
        return s;
      },
      opacity: parseFloat,
      // add colors to palette, save references
      color: function color(c, group) {
        if (c == null) c = Scatter.defaults.color;
        c = _this3.updateColor(c);
        hasColor++;
        return c;
      },
      borderColor: function borderColor(c, group) {
        if (c == null) c = Scatter.defaults.borderColor;
        c = _this3.updateColor(c);
        hasColor++;
        return c;
      },
      bounds: function bounds(_bounds, group, options) {
        if (!('range' in options)) options.range = null;
        return _bounds;
      },
      positions: function positions(_positions, group, options) {
        var snap = group.snap;
        var positionBuffer = group.positionBuffer,
            positionFractBuffer = group.positionFractBuffer,
            selectionBuffer = group.selectionBuffer; // separate buffers for x/y coordinates

        if (_positions.x || _positions.y) {
          if (_positions.x.length) {
            group.xAttr = {
              buffer: regl.buffer(_positions.x),
              offset: 0,
              stride: 4,
              count: _positions.x.length
            };
          } else {
            group.xAttr = {
              buffer: _positions.x.buffer,
              offset: _positions.x.offset * 4 || 0,
              stride: (_positions.x.stride || 1) * 4,
              count: _positions.x.count
            };
          }

          if (_positions.y.length) {
            group.yAttr = {
              buffer: regl.buffer(_positions.y),
              offset: 0,
              stride: 4,
              count: _positions.y.length
            };
          } else {
            group.yAttr = {
              buffer: _positions.y.buffer,
              offset: _positions.y.offset * 4 || 0,
              stride: (_positions.y.stride || 1) * 4,
              count: _positions.y.count
            };
          }

          group.count = Math.max(group.xAttr.count, group.yAttr.count);
          return _positions;
        }

        _positions = flatten(_positions, 'float64');
        var count = group.count = Math.floor(_positions.length / 2);
        var bounds = group.bounds = count ? getBounds(_positions, 2) : null; // if range is not provided updated - recalc it

        if (!options.range && !group.range) {
          delete group.range;
          options.range = bounds;
        } // reset marker


        if (!options.marker && !group.marker) {
          delete group.marker;
          options.marker = null;
        } // build cluster tree if required


        if (snap && (snap === true || count > snap)) {
          group.tree = cluster(_positions, {
            bounds: bounds
          });
        } // existing tree instance
        else if (snap && snap.length) {
            group.tree = snap;
          }

        if (group.tree) {
          var opts = {
            primitive: 'points',
            usage: 'static',
            data: group.tree,
            type: 'uint32'
          };
          if (group.elements) group.elements(opts);else group.elements = regl.elements(opts);
        } // update position buffers


        positionBuffer({
          data: f32.float(_positions),
          usage: 'dynamic'
        });
        positionFractBuffer({
          data: f32.fract(_positions),
          usage: 'dynamic'
        }); // expand selectionBuffer

        selectionBuffer({
          data: new Uint8Array(count),
          type: 'uint8',
          usage: 'stream'
        });
        return _positions;
      }
    }, {
      // create marker ids corresponding to known marker textures
      marker: function marker(markers, group, options) {
        var activation = group.activation; // reset marker elements

        activation.forEach(function (buffer) {
          return buffer && buffer.destroy && buffer.destroy();
        });
        activation.length = 0; // single sdf marker

        if (!markers || typeof markers[0] === 'number') {
          var id = _this3.addMarker(markers);

          activation[id] = true;
        } // per-point markers use mask buffers to enable markers in vert shader
        else {
            var markerMasks = [];

            for (var _i = 0, l = Math.min(markers.length, group.count); _i < l; _i++) {
              var _id = _this3.addMarker(markers[_i]);

              if (!markerMasks[_id]) markerMasks[_id] = new Uint8Array(group.count); // enable marker by default

              markerMasks[_id][_i] = 1;
            }

            for (var _id2 = 0; _id2 < markerMasks.length; _id2++) {
              if (!markerMasks[_id2]) continue;
              var opts = {
                data: markerMasks[_id2],
                type: 'uint8',
                usage: 'static'
              };

              if (!activation[_id2]) {
                activation[_id2] = regl.buffer(opts);
              } else {
                activation[_id2](opts);
              }

              activation[_id2].data = markerMasks[_id2];
            }
          }

        return markers;
      },
      range: function range(_range, group, options) {
        var bounds = group.bounds; // FIXME: why do we need this?

        if (!bounds) return;
        if (!_range) _range = bounds;
        group.scale = [1 / (_range[2] - _range[0]), 1 / (_range[3] - _range[1])];
        group.translate = [-_range[0], -_range[1]];
        group.scaleFract = f32.fract(group.scale);
        group.translateFract = f32.fract(group.translate);
        return _range;
      },
      viewport: function viewport(vp) {
        var rect = parseRect(vp || [gl.drawingBufferWidth, gl.drawingBufferHeight]); // normalize viewport to the canvas coordinates
        // rect.y = gl.drawingBufferHeight - rect.height - rect.y

        return rect;
      }
    }]); // update size buffer, if needed

    if (hasSize) {
      var _group = group,
          count = _group.count,
          size = _group.size,
          borderSize = _group.borderSize,
          sizeBuffer = _group.sizeBuffer;
      var sizes = new Uint8Array(count * 2);

      if (size.length || borderSize.length) {
        for (var _i2 = 0; _i2 < count; _i2++) {
          // we downscale size to allow for fractions
          sizes[_i2 * 2] = Math.round((size[_i2] == null ? size : size[_i2]) * 255 / maxSize);
          sizes[_i2 * 2 + 1] = Math.round((borderSize[_i2] == null ? borderSize : borderSize[_i2]) * 255 / maxSize);
        }
      }

      sizeBuffer({
        data: sizes,
        usage: 'dynamic'
      });
    } // update color buffer if needed


    if (hasColor) {
      var _group2 = group,
          _count = _group2.count,
          color = _group2.color,
          borderColor = _group2.borderColor,
          colorBuffer = _group2.colorBuffer;
      var colors; // if too many colors - put colors to buffer directly

      if (_this3.tooManyColors) {
        if (color.length || borderColor.length) {
          colors = new Uint8Array(_count * 8);

          for (var _i3 = 0; _i3 < _count; _i3++) {
            var _colorId = color[_i3];
            colors[_i3 * 8] = palette[_colorId * 4];
            colors[_i3 * 8 + 1] = palette[_colorId * 4 + 1];
            colors[_i3 * 8 + 2] = palette[_colorId * 4 + 2];
            colors[_i3 * 8 + 3] = palette[_colorId * 4 + 3];
            var borderColorId = borderColor[_i3];
            colors[_i3 * 8 + 4] = palette[borderColorId * 4];
            colors[_i3 * 8 + 5] = palette[borderColorId * 4 + 1];
            colors[_i3 * 8 + 6] = palette[borderColorId * 4 + 2];
            colors[_i3 * 8 + 7] = palette[borderColorId * 4 + 3];
          }
        }
      } // if limited amount of colors - keep palette color picking
      // that saves significant memory
      else {
          if (color.length || borderColor.length) {
            // we need slight data increase by 2 due to vec4 borderId in shader
            colors = new Uint8Array(_count * 4 + 2);

            for (var _i4 = 0; _i4 < _count; _i4++) {
              // put color coords in palette texture
              if (color[_i4] != null) {
                colors[_i4 * 4] = color[_i4] % maxColors;
                colors[_i4 * 4 + 1] = Math.floor(color[_i4] / maxColors);
              }

              if (borderColor[_i4] != null) {
                colors[_i4 * 4 + 2] = borderColor[_i4] % maxColors;
                colors[_i4 * 4 + 3] = Math.floor(borderColor[_i4] / maxColors);
              }
            }
          }
        }

      colorBuffer({
        data: colors || new Uint8Array(0),
        type: 'uint8',
        usage: 'dynamic'
      });
    }

    return group;
  });
}; // get (and create) marker texture id


Scatter.prototype.addMarker = function (sdf) {
  var markerTextures = this.markerTextures,
      regl = this.regl,
      markerCache = this.markerCache;
  var pos = sdf == null ? 0 : markerCache.indexOf(sdf);
  if (pos >= 0) return pos; // convert sdf to 0..255 range

  var distArr;

  if (sdf instanceof Uint8Array || sdf instanceof Uint8ClampedArray) {
    distArr = sdf;
  } else {
    distArr = new Uint8Array(sdf.length);

    for (var i = 0, l = sdf.length; i < l; i++) {
      distArr[i] = sdf[i] * 255;
    }
  }

  var radius = Math.floor(Math.sqrt(distArr.length));
  pos = markerTextures.length;
  markerCache.push(sdf);
  markerTextures.push(regl.texture({
    channels: 1,
    data: distArr,
    radius: radius,
    mag: 'linear',
    min: 'linear'
  }));
  return pos;
}; // register color to palette, return it's index or list of indexes


Scatter.prototype.updateColor = function (colors) {
  var paletteIds = this.paletteIds,
      palette = this.palette,
      maxColors = this.maxColors;

  if (!Array.isArray(colors)) {
    colors = [colors];
  }

  var idx = []; // if color groups - flatten them

  if (typeof colors[0] === 'number') {
    var grouped = [];

    if (Array.isArray(colors)) {
      for (var i = 0; i < colors.length; i += 4) {
        grouped.push(colors.slice(i, i + 4));
      }
    } else {
      for (var _i5 = 0; _i5 < colors.length; _i5 += 4) {
        grouped.push(colors.subarray(_i5, _i5 + 4));
      }
    }

    colors = grouped;
  }

  for (var _i6 = 0; _i6 < colors.length; _i6++) {
    var color = colors[_i6];
    color = rgba(color, 'uint8');
    var id = colorId(color, false); // if new color - save it

    if (paletteIds[id] == null) {
      var pos = palette.length;
      paletteIds[id] = Math.floor(pos / 4);
      palette[pos] = color[0];
      palette[pos + 1] = color[1];
      palette[pos + 2] = color[2];
      palette[pos + 3] = color[3];
    }

    idx[_i6] = paletteIds[id];
  } // detect if too many colors in palette


  if (!this.tooManyColors && palette.length > maxColors * 4) this.tooManyColors = true; // limit max color

  this.updatePalette(palette); // keep static index for single-color property

  return idx.length === 1 ? idx[0] : idx;
};

Scatter.prototype.updatePalette = function (palette) {
  if (this.tooManyColors) return;
  var maxColors = this.maxColors,
      paletteTexture = this.paletteTexture;
  var requiredHeight = Math.ceil(palette.length * .25 / maxColors); // pad data

  if (requiredHeight > 1) {
    palette = palette.slice();

    for (var i = palette.length * .25 % maxColors; i < requiredHeight * maxColors; i++) {
      palette.push(0, 0, 0, 0);
    }
  } // ensure height


  if (paletteTexture.height < requiredHeight) {
    paletteTexture.resize(maxColors, requiredHeight);
  } // update full data


  paletteTexture.subimage({
    width: Math.min(palette.length * .25, maxColors),
    height: requiredHeight,
    data: palette
  }, 0, 0);
}; // remove unused stuff


Scatter.prototype.destroy = function () {
  this.groups.forEach(function (group) {
    group.sizeBuffer.destroy();
    group.positionBuffer.destroy();
    group.positionFractBuffer.destroy();
    group.colorBuffer.destroy();
    group.activation.forEach(function (b) {
      return b && b.destroy && b.destroy();
    });
    group.selectionBuffer.destroy();
    if (group.elements) group.elements.destroy();
  });
  this.groups.length = 0;
  this.paletteTexture.destroy();
  this.markerTextures.forEach(function (txt) {
    return txt && txt.destroy && txt.destroy();
  });
  return this;
};

var extend$1 = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var reglScatter2d = function reglScatter2d(regl, options) {
  var scatter$1 = new scatter(regl, options);
  var render = scatter$1.render.bind(scatter$1); // expose API

  extend$1(render, {
    render: render,
    update: scatter$1.update.bind(scatter$1),
    draw: scatter$1.draw.bind(scatter$1),
    destroy: scatter$1.destroy.bind(scatter$1),
    regl: scatter$1.regl,
    gl: scatter$1.gl,
    canvas: scatter$1.gl.canvas,
    groups: scatter$1.groups,
    markers: scatter$1.markerCache,
    palette: scatter$1.palette
  });
  return render;
};

module.exports = reglScatter2d;


/***/ }),

/***/ "./node_modules/svg-arc-to-cubic-bezier/modules/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/svg-arc-to-cubic-bezier/modules/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var TAU = Math.PI * 2;

var mapToEllipse = function mapToEllipse(_ref, rx, ry, cosphi, sinphi, centerx, centery) {
  var x = _ref.x,
      y = _ref.y;

  x *= rx;
  y *= ry;

  var xp = cosphi * x - sinphi * y;
  var yp = sinphi * x + cosphi * y;

  return {
    x: xp + centerx,
    y: yp + centery
  };
};

var approxUnitArc = function approxUnitArc(ang1, ang2) {
  // If 90 degree circular arc, use a constant
  // as derived from http://spencermortensen.com/articles/bezier-circle
  var a = ang2 === 1.5707963267948966 ? 0.551915024494 : ang2 === -1.5707963267948966 ? -0.551915024494 : 4 / 3 * Math.tan(ang2 / 4);

  var x1 = Math.cos(ang1);
  var y1 = Math.sin(ang1);
  var x2 = Math.cos(ang1 + ang2);
  var y2 = Math.sin(ang1 + ang2);

  return [{
    x: x1 - y1 * a,
    y: y1 + x1 * a
  }, {
    x: x2 + y2 * a,
    y: y2 - x2 * a
  }, {
    x: x2,
    y: y2
  }];
};

var vectorAngle = function vectorAngle(ux, uy, vx, vy) {
  var sign = ux * vy - uy * vx < 0 ? -1 : 1;

  var dot = ux * vx + uy * vy;

  if (dot > 1) {
    dot = 1;
  }

  if (dot < -1) {
    dot = -1;
  }

  return sign * Math.acos(dot);
};

var getArcCenter = function getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp) {
  var rxsq = Math.pow(rx, 2);
  var rysq = Math.pow(ry, 2);
  var pxpsq = Math.pow(pxp, 2);
  var pypsq = Math.pow(pyp, 2);

  var radicant = rxsq * rysq - rxsq * pypsq - rysq * pxpsq;

  if (radicant < 0) {
    radicant = 0;
  }

  radicant /= rxsq * pypsq + rysq * pxpsq;
  radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1);

  var centerxp = radicant * rx / ry * pyp;
  var centeryp = radicant * -ry / rx * pxp;

  var centerx = cosphi * centerxp - sinphi * centeryp + (px + cx) / 2;
  var centery = sinphi * centerxp + cosphi * centeryp + (py + cy) / 2;

  var vx1 = (pxp - centerxp) / rx;
  var vy1 = (pyp - centeryp) / ry;
  var vx2 = (-pxp - centerxp) / rx;
  var vy2 = (-pyp - centeryp) / ry;

  var ang1 = vectorAngle(1, 0, vx1, vy1);
  var ang2 = vectorAngle(vx1, vy1, vx2, vy2);

  if (sweepFlag === 0 && ang2 > 0) {
    ang2 -= TAU;
  }

  if (sweepFlag === 1 && ang2 < 0) {
    ang2 += TAU;
  }

  return [centerx, centery, ang1, ang2];
};

var arcToBezier = function arcToBezier(_ref2) {
  var px = _ref2.px,
      py = _ref2.py,
      cx = _ref2.cx,
      cy = _ref2.cy,
      rx = _ref2.rx,
      ry = _ref2.ry,
      _ref2$xAxisRotation = _ref2.xAxisRotation,
      xAxisRotation = _ref2$xAxisRotation === undefined ? 0 : _ref2$xAxisRotation,
      _ref2$largeArcFlag = _ref2.largeArcFlag,
      largeArcFlag = _ref2$largeArcFlag === undefined ? 0 : _ref2$largeArcFlag,
      _ref2$sweepFlag = _ref2.sweepFlag,
      sweepFlag = _ref2$sweepFlag === undefined ? 0 : _ref2$sweepFlag;

  var curves = [];

  if (rx === 0 || ry === 0) {
    return [];
  }

  var sinphi = Math.sin(xAxisRotation * TAU / 360);
  var cosphi = Math.cos(xAxisRotation * TAU / 360);

  var pxp = cosphi * (px - cx) / 2 + sinphi * (py - cy) / 2;
  var pyp = -sinphi * (px - cx) / 2 + cosphi * (py - cy) / 2;

  if (pxp === 0 && pyp === 0) {
    return [];
  }

  rx = Math.abs(rx);
  ry = Math.abs(ry);

  var lambda = Math.pow(pxp, 2) / Math.pow(rx, 2) + Math.pow(pyp, 2) / Math.pow(ry, 2);

  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }

  var _getArcCenter = getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp),
      _getArcCenter2 = _slicedToArray(_getArcCenter, 4),
      centerx = _getArcCenter2[0],
      centery = _getArcCenter2[1],
      ang1 = _getArcCenter2[2],
      ang2 = _getArcCenter2[3];

  // If 'ang2' == 90.0000000001, then `ratio` will evaluate to
  // 1.0000000001. This causes `segments` to be greater than one, which is an
  // unecessary split, and adds extra points to the bezier curve. To alleviate
  // this issue, we round to 1.0 when the ratio is close to 1.0.


  var ratio = Math.abs(ang2) / (TAU / 4);
  if (Math.abs(1.0 - ratio) < 0.0000001) {
    ratio = 1.0;
  }

  var segments = Math.max(Math.ceil(ratio), 1);

  ang2 /= segments;

  for (var i = 0; i < segments; i++) {
    curves.push(approxUnitArc(ang1, ang2));
    ang1 += ang2;
  }

  return curves.map(function (curve) {
    var _mapToEllipse = mapToEllipse(curve[0], rx, ry, cosphi, sinphi, centerx, centery),
        x1 = _mapToEllipse.x,
        y1 = _mapToEllipse.y;

    var _mapToEllipse2 = mapToEllipse(curve[1], rx, ry, cosphi, sinphi, centerx, centery),
        x2 = _mapToEllipse2.x,
        y2 = _mapToEllipse2.y;

    var _mapToEllipse3 = mapToEllipse(curve[2], rx, ry, cosphi, sinphi, centerx, centery),
        x = _mapToEllipse3.x,
        y = _mapToEllipse3.y;

    return { x1: x1, y1: y1, x2: x2, y2: y2, x: x, y: y };
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arcToBezier);

/***/ }),

/***/ "./node_modules/svg-path-bounds/index.js":
/*!***********************************************!*\
  !*** ./node_modules/svg-path-bounds/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var parse = __webpack_require__(/*! parse-svg-path */ "./node_modules/parse-svg-path/index.js")
var abs = __webpack_require__(/*! abs-svg-path */ "./node_modules/abs-svg-path/index.js")
var normalize = __webpack_require__(/*! normalize-svg-path */ "./node_modules/svg-path-bounds/node_modules/normalize-svg-path/index.js")
var isSvgPath = __webpack_require__(/*! is-svg-path */ "./node_modules/is-svg-path/index.js")
var assert = __webpack_require__(/*! assert */ "./node_modules/assert/assert.js")

module.exports = pathBounds


function pathBounds(path) {
  // ES6 string tpl call
  if (Array.isArray(path) && path.length === 1 && typeof path[0] === 'string') path = path[0]

  // svg path string
  if (typeof path === 'string') {
    assert(isSvgPath(path), 'String is not an SVG path.')
    path = parse(path)
  }

  assert(Array.isArray(path), 'Argument should be a string or an array of path segments.')

  path = abs(path)
  path = normalize(path)

  if (!path.length) return [0, 0, 0, 0]

  var bounds = [Infinity, Infinity, -Infinity, -Infinity]

  for (var i = 0, l = path.length; i < l; i++) {
    var points = path[i].slice(1)

    for (var j = 0; j < points.length; j += 2) {
      if (points[j + 0] < bounds[0]) bounds[0] = points[j + 0]
      if (points[j + 1] < bounds[1]) bounds[1] = points[j + 1]
      if (points[j + 0] > bounds[2]) bounds[2] = points[j + 0]
      if (points[j + 1] > bounds[3]) bounds[3] = points[j + 1]
    }
  }

  return bounds
}


/***/ }),

/***/ "./node_modules/svg-path-bounds/node_modules/normalize-svg-path/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/svg-path-bounds/node_modules/normalize-svg-path/index.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = normalize

var arcToCurve = __webpack_require__(/*! svg-arc-to-cubic-bezier */ "./node_modules/svg-arc-to-cubic-bezier/modules/index.js")

function normalize(path){
  // init state
  var prev
  var result = []
  var bezierX = 0
  var bezierY = 0
  var startX = 0
  var startY = 0
  var quadX = null
  var quadY = null
  var x = 0
  var y = 0

  for (var i = 0, len = path.length; i < len; i++) {
    var seg = path[i]
    var command = seg[0]

    switch (command) {
      case 'M':
        startX = seg[1]
        startY = seg[2]
        break
      case 'A':
        var curves = arcToCurve({
          px: x,
          py: y,
          cx: seg[6],
          cy:  seg[7],
          rx: seg[1],
          ry: seg[2],
          xAxisRotation: seg[3],
          largeArcFlag: seg[4],
          sweepFlag: seg[5]
        })

        // null-curves
        if (!curves.length) continue

        for (var j = 0, c; j < curves.length; j++) {
          c = curves[j]
          seg = ['C', c.x1, c.y1, c.x2, c.y2, c.x, c.y]
          if (j < curves.length - 1) result.push(seg)
        }

        break
      case 'S':
        // default control point
        var cx = x
        var cy = y
        if (prev == 'C' || prev == 'S') {
          cx += cx - bezierX // reflect the previous command's control
          cy += cy - bezierY // point relative to the current point
        }
        seg = ['C', cx, cy, seg[1], seg[2], seg[3], seg[4]]
        break
      case 'T':
        if (prev == 'Q' || prev == 'T') {
          quadX = x * 2 - quadX // as with 'S' reflect previous control point
          quadY = y * 2 - quadY
        } else {
          quadX = x
          quadY = y
        }
        seg = quadratic(x, y, quadX, quadY, seg[1], seg[2])
        break
      case 'Q':
        quadX = seg[1]
        quadY = seg[2]
        seg = quadratic(x, y, seg[1], seg[2], seg[3], seg[4])
        break
      case 'L':
        seg = line(x, y, seg[1], seg[2])
        break
      case 'H':
        seg = line(x, y, seg[1], y)
        break
      case 'V':
        seg = line(x, y, x, seg[1])
        break
      case 'Z':
        seg = line(x, y, startX, startY)
        break
    }

    // update state
    prev = command
    x = seg[seg.length - 2]
    y = seg[seg.length - 1]
    if (seg.length > 4) {
      bezierX = seg[seg.length - 4]
      bezierY = seg[seg.length - 3]
    } else {
      bezierX = x
      bezierY = y
    }
    result.push(seg)
  }

  return result
}

function line(x1, y1, x2, y2){
  return ['C', x1, y1, x2, y2, x2, y2]
}

function quadratic(x1, y1, cx, cy, x2, y2){
  return [
    'C',
    x1/3 + (2/3) * cx,
    y1/3 + (2/3) * cy,
    x2/3 + (2/3) * cx,
    y2/3 + (2/3) * cy,
    x2,
    y2
  ]
}


/***/ }),

/***/ "./node_modules/svg-path-sdf/index.js":
/*!********************************************!*\
  !*** ./node_modules/svg-path-sdf/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pathBounds = __webpack_require__(/*! svg-path-bounds */ "./node_modules/svg-path-bounds/index.js")
var parsePath = __webpack_require__(/*! parse-svg-path */ "./node_modules/parse-svg-path/index.js")
var drawPath = __webpack_require__(/*! draw-svg-path */ "./node_modules/draw-svg-path/index.js")
var isSvgPath = __webpack_require__(/*! is-svg-path */ "./node_modules/is-svg-path/index.js")
var bitmapSdf = __webpack_require__(/*! bitmap-sdf */ "./node_modules/bitmap-sdf/index.js")

var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')


module.exports = pathSdf


function pathSdf (path, options) {
	if (!isSvgPath(path)) throw Error('Argument should be valid svg path string')

	if (!options) options = {}

	var w, h
	if (options.shape) {
		w = options.shape[0]
		h = options.shape[1]
	}
	else {
		w = canvas.width = options.w || options.width || 200
		h = canvas.height = options.h || options.height || 200
	}
	var size = Math.min(w, h)

	var stroke = options.stroke || 0

	var viewbox = options.viewbox || options.viewBox || pathBounds(path)
	var scale = [w / (viewbox[2] - viewbox[0]), h / (viewbox[3] - viewbox[1])]
	var maxScale = Math.min(scale[0] || 0, scale[1] || 0) / 2

	//clear ctx
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, w, h)

	ctx.fillStyle = 'white'

	if (stroke)	{
		if (typeof stroke != 'number') stroke = 1
		if (stroke > 0) {
			ctx.strokeStyle = 'white'
		}
		else {
			ctx.strokeStyle = 'black'
		}

		ctx.lineWidth = Math.abs(stroke)
	}

	ctx.translate(w * .5, h * .5)
	ctx.scale(maxScale, maxScale)

	//if canvas svg paths api is available
	if (isPath2DSupported()) {
		var path2d = new Path2D(path)
		ctx.fill(path2d)
		stroke && ctx.stroke(path2d)
	}
	//fallback to bezier-curves
	else {
		var segments = parsePath(path)
		drawPath(ctx, segments)
		ctx.fill()
		stroke && ctx.stroke()
	}

	ctx.setTransform(1, 0, 0, 1, 0, 0);

	var data = bitmapSdf(ctx, {
		cutoff: options.cutoff != null ? options.cutoff : .5,
		radius: options.radius != null ? options.radius : size * .5
	})

	return data
}

var path2DSupported

function isPath2DSupported () {
	if (path2DSupported != null) return path2DSupported

	var ctx = document.createElement('canvas').getContext('2d')
	ctx.canvas.width = ctx.canvas.height = 1

	if (!window.Path2D) return path2DSupported = false

	var path = new Path2D('M0,0h1v1h-1v-1Z')

	ctx.fillStyle = 'black'
	ctx.fill(path)

	var idata = ctx.getImageData(0,0,1,1)

	return path2DSupported = idata && idata.data && idata.data[3] === 255
}


/***/ }),

/***/ "./node_modules/to-float32/index.js":
/*!******************************************!*\
  !*** ./node_modules/to-float32/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";
/* @module to-float32 */



module.exports = float32
module.exports.float32 =
module.exports.float = float32
module.exports.fract32 =
module.exports.fract = fract32

var narr = new Float32Array(1)

// return fractional part of float32 array
function fract32 (arr) {
	if (arr.length) {
		var fract = float32(arr)
		for (var i = 0, l = fract.length; i < l; i++) {
			fract[i] = arr[i] - fract[i]
		}
		return fract
	}

	// number
	return float32(arr - float32(arr))
}

// make sure data is float32 array
function float32 (arr) {
	if (arr.length) {
		if (arr instanceof Float32Array) return arr
		var float = new Float32Array(arr)
		float.set(arr)
		return float
	}

	// number
	narr[0] = arr
	return narr[0]
}


/***/ }),

/***/ "./node_modules/type/function/is.js":
/*!******************************************!*\
  !*** ./node_modules/type/function/is.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isPrototype = __webpack_require__(/*! ../prototype/is */ "./node_modules/type/prototype/is.js");

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};


/***/ }),

/***/ "./node_modules/type/lib/resolve-exception.js":
/*!****************************************************!*\
  !*** ./node_modules/type/lib/resolve-exception.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue       = __webpack_require__(/*! ../value/is */ "./node_modules/type/value/is.js")
  , isObject      = __webpack_require__(/*! ../object/is */ "./node_modules/type/object/is.js")
  , stringCoerce  = __webpack_require__(/*! ../string/coerce */ "./node_modules/type/string/coerce.js")
  , toShortString = __webpack_require__(/*! ./to-short-string */ "./node_modules/type/lib/to-short-string.js");

var resolveMessage = function (message, value) {
	return message.replace("%v", toShortString(value));
};

module.exports = function (value, defaultMessage, inputOptions) {
	if (!isObject(inputOptions)) throw new TypeError(resolveMessage(defaultMessage, value));
	if (!isValue(value)) {
		if ("default" in inputOptions) return inputOptions["default"];
		if (inputOptions.isOptional) return null;
	}
	var errorMessage = stringCoerce(inputOptions.errorMessage);
	if (!isValue(errorMessage)) errorMessage = defaultMessage;
	throw new TypeError(resolveMessage(errorMessage, value));
};


/***/ }),

/***/ "./node_modules/type/lib/safe-to-string.js":
/*!*************************************************!*\
  !*** ./node_modules/type/lib/safe-to-string.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (value) {
	try {
		return value.toString();
	} catch (error) {
		try { return String(value); }
		catch (error2) { return null; }
	}
};


/***/ }),

/***/ "./node_modules/type/lib/to-short-string.js":
/*!**************************************************!*\
  !*** ./node_modules/type/lib/to-short-string.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var safeToString = __webpack_require__(/*! ./safe-to-string */ "./node_modules/type/lib/safe-to-string.js");

var reNewLine = /[\n\r\u2028\u2029]/g;

module.exports = function (value) {
	var string = safeToString(value);
	if (string === null) return "<Non-coercible to string value>";
	// Trim if too long
	if (string.length > 100) string = string.slice(0, 99) + "…";
	// Replace eventual new lines
	string = string.replace(reNewLine, function (char) {
		switch (char) {
			case "\n":
				return "\\n";
			case "\r":
				return "\\r";
			case "\u2028":
				return "\\u2028";
			case "\u2029":
				return "\\u2029";
			/* istanbul ignore next */
			default:
				throw new Error("Unexpected character");
		}
	});
	return string;
};


/***/ }),

/***/ "./node_modules/type/object/is.js":
/*!****************************************!*\
  !*** ./node_modules/type/object/is.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(/*! ../value/is */ "./node_modules/type/value/is.js");

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};


/***/ }),

/***/ "./node_modules/type/plain-function/ensure.js":
/*!****************************************************!*\
  !*** ./node_modules/type/plain-function/ensure.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var resolveException = __webpack_require__(/*! ../lib/resolve-exception */ "./node_modules/type/lib/resolve-exception.js")
  , is               = __webpack_require__(/*! ./is */ "./node_modules/type/plain-function/is.js");

module.exports = function (value/*, options*/) {
	if (is(value)) return value;
	return resolveException(value, "%v is not a plain function", arguments[1]);
};


/***/ }),

/***/ "./node_modules/type/plain-function/is.js":
/*!************************************************!*\
  !*** ./node_modules/type/plain-function/is.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isFunction = __webpack_require__(/*! ../function/is */ "./node_modules/type/function/is.js");

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};


/***/ }),

/***/ "./node_modules/type/prototype/is.js":
/*!*******************************************!*\
  !*** ./node_modules/type/prototype/is.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isObject = __webpack_require__(/*! ../object/is */ "./node_modules/type/object/is.js");

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};


/***/ }),

/***/ "./node_modules/type/string/coerce.js":
/*!********************************************!*\
  !*** ./node_modules/type/string/coerce.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue  = __webpack_require__(/*! ../value/is */ "./node_modules/type/value/is.js")
  , isObject = __webpack_require__(/*! ../object/is */ "./node_modules/type/object/is.js");

var objectToString = Object.prototype.toString;

module.exports = function (value) {
	if (!isValue(value)) return null;
	if (isObject(value)) {
		// Reject Object.prototype.toString coercion
		var valueToString = value.toString;
		if (typeof valueToString !== "function") return null;
		if (valueToString === objectToString) return null;
		// Note: It can be object coming from other realm, still as there's no ES3 and CSP compliant
		// way to resolve its realm's Object.prototype.toString it's left as not addressed edge case
	}
	try {
		return "" + value; // Ensure implicit coercion
	} catch (error) {
		return null;
	}
};


/***/ }),

/***/ "./node_modules/type/value/ensure.js":
/*!*******************************************!*\
  !*** ./node_modules/type/value/ensure.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var resolveException = __webpack_require__(/*! ../lib/resolve-exception */ "./node_modules/type/lib/resolve-exception.js")
  , is               = __webpack_require__(/*! ./is */ "./node_modules/type/value/is.js");

module.exports = function (value/*, options*/) {
	if (is(value)) return value;
	return resolveException(value, "Cannot use %v", arguments[1]);
};


/***/ }),

/***/ "./node_modules/type/value/is.js":
/*!***************************************!*\
  !*** ./node_modules/type/value/is.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";


// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ }),

/***/ "./node_modules/update-diff/index.js":
/*!*******************************************!*\
  !*** ./node_modules/update-diff/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
/**
 * @module update-diff
 */



module.exports = function updateDiff (obj, diff, mappers) {
	if (!Array.isArray(mappers)) mappers = [].slice.call(arguments, 2)

	for (var i = 0, l = mappers.length; i < l; i++) {
		var dict = mappers[i]
		for (var prop in dict) {
			if (diff[prop] !== undefined && !Array.isArray(diff[prop]) && obj[prop] === diff[prop]) continue

			if (prop in diff) {
				var result

				if (dict[prop] === true) result = diff[prop]
				else if (dict[prop] === false) continue
				else if (typeof dict[prop] === 'function') {
					result = dict[prop](diff[prop], obj, diff)
					if (result === undefined) continue
				}

				obj[prop] = result
			}
		}
	}

	return obj
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2Ficy1zdmctcGF0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2FycmF5LWJvdW5kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2FycmF5LW5vcm1hbGl6ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9hc3NlcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2JpdG1hcC1zZGYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9jb2xvci1pZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2QvYXV0by1iaW5kLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RyYXctc3ZnLXBhdGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lYXJjdXQvc3JjL2VhcmN1dC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvYXJyYXkvXHUwMDAwIy9jbGVhci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvYXJyYXkvZnJvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvYXJyYXkvZnJvbS9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvYXJyYXkvZnJvbS9zaGltLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9mdW5jdGlvbi9pcy1hcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczUtZXh0L2Z1bmN0aW9uL2lzLWZ1bmN0aW9uLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9mdW5jdGlvbi9ub29wLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9tYXRoL3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczUtZXh0L21hdGgvc2lnbi9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvbWF0aC9zaWduL3NoaW0uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczUtZXh0L251bWJlci90by1pbnRlZ2VyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9udW1iZXIvdG8tcG9zLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9faXRlcmF0ZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvY29weS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Zvci1lYWNoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvaXMtb2JqZWN0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvaXMtdmFsdWUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2tleXMvc2hpbS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L21hcC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9zZXQtcHJvdG90eXBlLW9mL3NoaW0uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC92YWxpZC1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L3ZhbGlkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9zdHJpbmcvXHUwMDAwIy9jb250YWlucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nL1x1MDAwMCMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczUtZXh0L3N0cmluZy9cdTAwMDAjL2NvbnRhaW5zL3NoaW0uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczUtZXh0L3N0cmluZy9pcy1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczUtZXh0L3N0cmluZy9yYW5kb20tdW5pcS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNi1pdGVyYXRvci9hcnJheS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNi1pdGVyYXRvci9mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczYtaXRlcmF0b3IvZ2V0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM2LWl0ZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM2LWl0ZXJhdG9yL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM2LWl0ZXJhdG9yL3N0cmluZy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNi1pdGVyYXRvci92YWxpZC1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczYtc3ltYm9sL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9pcy1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczYtc3ltYm9sL2xpYi9wcml2YXRlL2dlbmVyYXRlLW5hbWUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczYtc3ltYm9sL2xpYi9wcml2YXRlL3NldHVwL3N0YW5kYXJkLXN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczYtc3ltYm9sL2xpYi9wcml2YXRlL3NldHVwL3N5bWJvbC1yZWdpc3RyeS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczYtc3ltYm9sL3ZhbGlkYXRlLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNi13ZWFrLW1hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNi13ZWFrLW1hcC9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VzNi13ZWFrLW1hcC9pcy1uYXRpdmUtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lczYtd2Vhay1tYXAvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9leHQvZ2xvYmFsLXRoaXMvaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9leHQvZ2xvYmFsLXRoaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9leHQvZ2xvYmFsLXRoaXMvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9mbGF0dGVuLXZlcnRleC1kYXRhL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvaXMtaWV4cGxvcmVyL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvaXMtb2JqL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvaXMtc3ZnLXBhdGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9tYXRoLWxvZzIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUtc3ZnLXBhdGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGFyc2UtcmVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3BpY2stYnktYWxpYXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyZ2wvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJnbC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyZ2wvY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJnbC9oZWxwZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcmdsL2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcG9pbnQtY2x1c3Rlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3BvaW50LWNsdXN0ZXIvcXVhZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3JlZ2wtbGluZTJkL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcmVnbC1zY2F0dGVyMmQvYnVuZGxlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvc3ZnLWFyYy10by1jdWJpYy1iZXppZXIvbW9kdWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3N2Zy1wYXRoLWJvdW5kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3N2Zy1wYXRoLWJvdW5kcy9ub2RlX21vZHVsZXMvbm9ybWFsaXplLXN2Zy1wYXRoL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvc3ZnLXBhdGgtc2RmL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdG8tZmxvYXQzMi9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3R5cGUvZnVuY3Rpb24vaXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy90eXBlL2xpYi9yZXNvbHZlLWV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3R5cGUvbGliL3NhZmUtdG8tc3RyaW5nLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdHlwZS9saWIvdG8tc2hvcnQtc3RyaW5nLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdHlwZS9vYmplY3QvaXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy90eXBlL3BsYWluLWZ1bmN0aW9uL2Vuc3VyZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3R5cGUvcGxhaW4tZnVuY3Rpb24vaXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy90eXBlL3Byb3RvdHlwZS9pcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3R5cGUvc3RyaW5nL2NvZXJjZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3R5cGUvdmFsdWUvZW5zdXJlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdHlwZS92YWx1ZS9pcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3VwZGF0ZS1kaWZmL2luZGV4LmpzIl0s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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0Msb0JBQW9COztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDemZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxrQkFBa0IscUJBQU07QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7OztBQUdmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Q0FBNEMsS0FBSzs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNM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O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Q0FBeUM7O0FBRXpDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5Qzs7QUFFekMscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQSw0QkFBNEIsK0JBQStCOztBQUUzRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RkFBd0Y7QUFDeEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0Qzs7QUFFNUMsdURBQXVEO0FBQ3ZELHVEQUF1RDtBQUN2RCx1REFBdUQ7QUFDdkQsdURBQXVEOztBQUV2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpREFBaUQsU0FBUztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxzQkFBc0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix5Q0FBeUM7QUFDM0Q7O0FBRUEsbUJBQW1CLGlCQUFpQjtBQUNwQyx1QkFBdUIsb0JBQW9CO0FBQzNDLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RxQkE7QUFDQTtBQUNBOztBQUVhOztBQUViLFlBQVksbUJBQU8sQ0FBQyw4RUFBMEI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNYYTs7QUFFYixpQkFBaUIsbUJBQU8sQ0FBQyw2RUFBa0IsbUJBQW1CLG1CQUFPLENBQUMseURBQVE7Ozs7Ozs7Ozs7OztBQ0ZqRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUmE7O0FBRWIscUJBQXFCLG9GQUE4QjtBQUNuRCxxQkFBcUIsbUJBQU8sQ0FBQyxvRkFBNkI7QUFDMUQscUJBQXFCLG1CQUFPLENBQUMsa0ZBQTRCO0FBQ3pELHFCQUFxQixtQkFBTyxDQUFDLG9GQUE2QjtBQUMxRCxxQkFBcUIsbUJBQU8sQ0FBQyxvRkFBNkI7QUFDMUQscUJBQXFCLG1CQUFPLENBQUMsOEVBQTBCO0FBQ3ZELHFCQUFxQixtQkFBTyxDQUFDLHdFQUF1QjtBQUNwRCxxQkFBcUIsbUJBQU8sQ0FBQywwRUFBd0I7QUFDckQ7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsWUFBWTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxZQUFZO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0SGE7O0FBRWI7QUFDQSx3Q0FBd0Msa0JBQWtCLEVBQUU7O0FBRTVELG1DQUFtQyx1Q0FBdUM7Ozs7Ozs7Ozs7OztBQ0w3RDs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUGE7O0FBRWI7QUFDQTs7Ozs7Ozs7Ozs7O0FDSGE7O0FBRWIsaUJBQWlCLG1CQUFPLENBQUMsNEVBQWtCLGtCQUFrQixtQkFBTyxDQUFDLHdEQUFROzs7Ozs7Ozs7Ozs7QUNGaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLCtEQUFjO0FBQ2xDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNYYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyxpRUFBYztBQUN0Qzs7QUFFQSxtQ0FBbUMsaUNBQWlDOzs7Ozs7Ozs7Ozs7QUNMcEU7QUFDQTtBQUNBOztBQUVhOztBQUViLDhCQUE4QixtQkFBTyxDQUFDLHlFQUFrQjtBQUN4RCw4QkFBOEIsbUJBQU8sQ0FBQyxtRUFBZTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0JhOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLGdGQUFrQixzQkFBc0IsbUJBQU8sQ0FBQyw0REFBUTs7Ozs7Ozs7Ozs7O0FDRnBFOztBQUViO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixjQUFjLGFBQWEsR0FBRyxlQUFlO0FBQzdDO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JhOztBQUViLFlBQVksbUJBQU8sQ0FBQyw0REFBUztBQUM3QixZQUFZLG1CQUFPLENBQUMsb0VBQWdCO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxZQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0QmE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLGlFQUFlO0FBQ3BDLGFBQWEsbUJBQU8sQ0FBQywrREFBVTtBQUMvQixhQUFhLG1CQUFPLENBQUMsbUVBQWU7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEJBOztBQUVhOztBQUViOztBQUVBLEtBQUssbUJBQU8sQ0FBQywyR0FBbUM7QUFDaEQsUUFBUSxtQkFBTyxDQUFDLHVGQUF5QjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDMUNZOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLDZEQUFZOzs7Ozs7Ozs7Ozs7QUNGeEI7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLDZEQUFZOztBQUVsQyxXQUFXOztBQUVYLG1DQUFtQyx1REFBdUQ7Ozs7Ozs7Ozs7OztBQ043RTs7QUFFYixpQkFBaUIsbUJBQU8sQ0FBQyxpRUFBa0IsSUFBSTs7QUFFL0MsaUNBQWlDLDJDQUEyQzs7Ozs7Ozs7Ozs7O0FDSi9EOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLDhFQUFrQixvQkFBb0IsbUJBQU8sQ0FBQywwREFBUTs7Ozs7Ozs7Ozs7O0FDRmxFOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLDhEQUFhOztBQUVuQzs7QUFFQSxvQ0FBb0Msd0RBQXdEOzs7Ozs7Ozs7Ozs7QUNOL0U7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLHlFQUFrQjtBQUN6QyxlQUFlLG1CQUFPLENBQUMsNkRBQVk7QUFDbkM7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2JhOztBQUViLGNBQWMsbUJBQU8sQ0FBQyw2REFBWTs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25CYTs7QUFFYixpQkFBaUIsbUJBQU8sQ0FBQywwRkFBa0IsOEJBQThCLG1CQUFPLENBQUMsc0VBQVE7Ozs7Ozs7Ozs7OztBQ0Y1RTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNSQTs7QUFFQTtBQUNBOztBQUVhOztBQUViLHVCQUF1QixtQkFBTyxDQUFDLGdFQUFjO0FBQzdDLHVCQUF1QixtQkFBTyxDQUFDLG9FQUFnQjtBQUMvQztBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsSUFBSTtBQUNKLDJEQUEyRDtBQUMzRDs7QUFFQTtBQUNBLDBEQUEwRDs7QUFFMUQ7QUFDQTtBQUNBLDBEQUEwRDs7QUFFMUQ7QUFDQSxFQUFFO0FBQ0Y7O0FBRUEsbUJBQU8sQ0FBQywwREFBVzs7Ozs7Ozs7Ozs7O0FDaEZOOztBQUViO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNMYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsK0RBQWE7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNQYTs7QUFFYixjQUFjLG1CQUFPLENBQUMsNkRBQVk7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNQYTs7QUFFYixpQkFBaUIsbUJBQU8sQ0FBQywwRkFBa0Isa0NBQWtDLG1CQUFPLENBQUMsc0VBQVE7Ozs7Ozs7Ozs7OztBQ0ZoRjs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUGE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNOYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1phOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1ZhOztBQUViLHFCQUFxQixtQkFBTyxDQUFDLGdHQUFpQztBQUM5RCxxQkFBcUIsbUJBQU8sQ0FBQywwRkFBMkI7QUFDeEQscUJBQXFCLG1CQUFPLENBQUMsb0NBQUc7QUFDaEMscUJBQXFCLG1CQUFPLENBQUMsc0RBQVk7QUFDekMscUJBQXFCLG1CQUFPLENBQUMsZ0RBQUk7O0FBRWpDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7OztBQy9CYTs7QUFFYixrQkFBa0IsbUJBQU8sQ0FBQyxzRkFBK0I7QUFDekQsa0JBQWtCLG1CQUFPLENBQUMsc0ZBQStCO0FBQ3pELGtCQUFrQixtQkFBTyxDQUFDLDRFQUEwQjtBQUNwRCxrQkFBa0IsbUJBQU8sQ0FBQyxpREFBTzs7QUFFakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxZQUFZO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5Q2E7O0FBRWIscUJBQXFCLG1CQUFPLENBQUMsc0ZBQStCO0FBQzVELHFCQUFxQixtQkFBTyxDQUFDLDRFQUEwQjtBQUN2RCxxQkFBcUIsbUJBQU8sQ0FBQyxxREFBUztBQUN0QyxxQkFBcUIsbUJBQU8sQ0FBQyx1REFBVTtBQUN2QyxxQkFBcUIsbUJBQU8sQ0FBQyx1RUFBa0I7QUFDL0MscUJBQXFCLG9GQUE4Qjs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNkYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsNEVBQXVCO0FBQzlDLGVBQWUsbUJBQU8sQ0FBQyw0RUFBdUI7QUFDOUMsZUFBZSxtQkFBTyxDQUFDLHNGQUErQjtBQUN0RCxlQUFlLG1CQUFPLENBQUMsZ0ZBQTRCO0FBQ25ELGVBQWUsbUJBQU8sQ0FBQyxvQ0FBRztBQUMxQixlQUFlLG1CQUFPLENBQUMsa0RBQWE7QUFDcEMsZUFBZSxtQkFBTyxDQUFDLHNEQUFZOztBQUVuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsaUNBQWlDO0FBQ2pDLFlBQVk7QUFDWixJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ3pHYTs7QUFFYixrQkFBa0IsbUJBQU8sQ0FBQyxzRkFBK0I7QUFDekQsa0JBQWtCLG1CQUFPLENBQUMsMEVBQXlCO0FBQ25ELGtCQUFrQixtQkFBTyxDQUFDLDRFQUEwQjs7QUFFcEQscUJBQXFCLG9GQUE4QjtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTs7QUFFYTs7QUFFYixxQkFBcUIsbUJBQU8sQ0FBQyxnR0FBaUM7QUFDOUQscUJBQXFCLG1CQUFPLENBQUMsb0NBQUc7QUFDaEMscUJBQXFCLG1CQUFPLENBQUMsc0RBQVk7QUFDekMscUJBQXFCLG1CQUFPLENBQUMsZ0RBQUk7O0FBRWpDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7OztBQ3RDYTs7QUFFYixpQkFBaUIsbUJBQU8sQ0FBQyxpRUFBZTs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1BhOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLHFFQUFrQjtBQUMzQyxHQUFHLDRGQUFpQztBQUNwQyxHQUFHLG1CQUFPLENBQUMseURBQVk7Ozs7Ozs7Ozs7OztBQ0pWOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLGdFQUFpQjtBQUMxQyxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGdCQUFnQjtBQUN0QixZQUFZLGNBQWM7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25CYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUmE7O0FBRWIsUUFBUSxtQkFBTyxDQUFDLG9DQUFHOztBQUVuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVCYTs7QUFFYixtQkFBbUIsbUJBQU8sQ0FBQyxvQ0FBRztBQUM5QixtQkFBbUIsNEZBQWlDOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ2pDYTs7QUFFYixxQkFBcUIsbUJBQU8sQ0FBQyxvQ0FBRztBQUNoQyxxQkFBcUIsbUJBQU8sQ0FBQyw4RUFBMEI7O0FBRXZEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUN0QkE7O0FBRWE7O0FBRWIsMkJBQTJCLG1CQUFPLENBQUMsb0NBQUc7QUFDdEMsMkJBQTJCLG1CQUFPLENBQUMsdUVBQW1CO0FBQ3RELDJCQUEyQiw0RkFBaUM7QUFDNUQsMkJBQTJCLG1CQUFPLENBQUMsMkZBQTZCO0FBQ2hFLDJCQUEyQixtQkFBTyxDQUFDLDZHQUFzQztBQUN6RSwyQkFBMkIsbUJBQU8sQ0FBQywyR0FBcUM7O0FBRXhFO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixzQkFBc0IsRUFBRTtBQUN0RCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixnRUFBZ0UsRUFBRTtBQUM1Rix5QkFBeUIsNkJBQTZCLEVBQUU7QUFDeEQsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0RmE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLDJEQUFhOztBQUVwQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUGE7O0FBRWIsaUJBQWlCLG1CQUFPLENBQUMsdUVBQWtCLGdCQUFnQixtQkFBTyxDQUFDLDJEQUFZOzs7Ozs7Ozs7Ozs7QUNGbEU7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsYUFBYSxhQUFhO0FBQzVELEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEJBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ1BZOztBQUViLHdCQUF3QixtQkFBTyxDQUFDLDBFQUF5QjtBQUN6RCx3QkFBd0IsbUJBQU8sQ0FBQyxnR0FBaUM7QUFDakUsd0JBQXdCLG1CQUFPLENBQUMsa0ZBQTZCO0FBQzdELHdCQUF3QixtQkFBTyxDQUFDLGdGQUE0QjtBQUM1RCx3QkFBd0IsbUJBQU8sQ0FBQyxnRkFBNEI7QUFDNUQsd0JBQXdCLG1CQUFPLENBQUMsb0NBQUc7QUFDbkMsd0JBQXdCLG1CQUFPLENBQUMsNERBQWtCO0FBQ2xELHdCQUF3QixtQkFBTyxDQUFDLGtFQUFxQjtBQUNyRCx3QkFBd0IsdUZBQWlDO0FBQ3pELHdCQUF3QixtQkFBTyxDQUFDLHFGQUF5Qjs7QUFFekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJELDhCQUE4QjtBQUN6Rjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGFBQWEsRUFBRTtBQUNwQztBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzlCWTs7QUFFYixpQkFBaUIsbUJBQU8sQ0FBQywwRUFBa0IsbUJBQW1CLG1CQUFPLENBQUMsMEVBQWtCOzs7Ozs7Ozs7Ozs7QUNGM0U7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNOQTtBQUNBLFlBQVksbUJBQU8sQ0FBQyw0Q0FBTzs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLGlCQUFpQjtBQUM1QyxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxPQUFPO0FBQ3pEO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDekRhO0FBQ2I7QUFDQTs7Ozs7Ozs7Ozs7O0FDRmE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSlk7O0FBRVo7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1hhO0FBQ2I7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNGQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DLFNBQVM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsV0FBVztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsV0FBVztBQUM3QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsV0FBVztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHNCQUFzQixXQUFXO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLFdBQVc7QUFDakM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHNCQUFzQixXQUFXO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzREFBc0Q7QUFDdEQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFF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TyxDQUFDLHNEQUFZOzs7QUFHdEM7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUEsVUFBVSxnQkFBZ0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtELG1CQUFtQjtBQUNyRTs7QUFFQTtBQUNBOztBQUVBLE1BQU0sV0FBVzs7QUFFakI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZDQUE2QyxPQUFPO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHlDQUF5QyxPQUFPO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHlCQUF5QjtBQUN6QixLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEVBQTRFOztBQUU1RTtBQUNBO0FBQ0E7QUFDQSxTQUFTOzs7QUFHVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOzs7QUFHVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LDRCQUE0QixFQUFFOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsc0RBQWM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNaYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsb0RBQWE7QUFDcEMsZUFBZSxtQkFBTyxDQUFDLHNEQUFjOztBQUVyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLEVBQUU7QUFDRjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RCYTs7QUFFYix1QkFBdUIsbUJBQU8sQ0FBQyw4RUFBMEI7QUFDekQsdUJBQXVCLG1CQUFPLENBQUMsNkNBQU07O0FBRXJDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNSYTs7QUFFYjtBQUNBOztBQUVBLG1DQUFtQywrQ0FBK0M7Ozs7Ozs7Ozs7OztBQ0xsRjtBQUNBO0FBQ0E7O0FBRVk7O0FBRVo7QUFDQTs7QUFFQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydGViYjU1YjAwNmFhYzgwMGRkYjY0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5tb2R1bGUuZXhwb3J0cyA9IGFic29sdXRpemVcblxuLyoqXG4gKiByZWRlZmluZSBgcGF0aGAgd2l0aCBhYnNvbHV0ZSBjb29yZGluYXRlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGhcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFic29sdXRpemUocGF0aCl7XG5cdHZhciBzdGFydFggPSAwXG5cdHZhciBzdGFydFkgPSAwXG5cdHZhciB4ID0gMFxuXHR2YXIgeSA9IDBcblxuXHRyZXR1cm4gcGF0aC5tYXAoZnVuY3Rpb24oc2VnKXtcblx0XHRzZWcgPSBzZWcuc2xpY2UoKVxuXHRcdHZhciB0eXBlID0gc2VnWzBdXG5cdFx0dmFyIGNvbW1hbmQgPSB0eXBlLnRvVXBwZXJDYXNlKClcblxuXHRcdC8vIGlzIHJlbGF0aXZlXG5cdFx0aWYgKHR5cGUgIT0gY29tbWFuZCkge1xuXHRcdFx0c2VnWzBdID0gY29tbWFuZFxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdGNhc2UgJ2EnOlxuXHRcdFx0XHRcdHNlZ1s2XSArPSB4XG5cdFx0XHRcdFx0c2VnWzddICs9IHlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlICd2Jzpcblx0XHRcdFx0XHRzZWdbMV0gKz0geVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ2gnOlxuXHRcdFx0XHRcdHNlZ1sxXSArPSB4XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8IHNlZy5sZW5ndGg7KSB7XG5cdFx0XHRcdFx0XHRzZWdbaSsrXSArPSB4XG5cdFx0XHRcdFx0XHRzZWdbaSsrXSArPSB5XG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHVwZGF0ZSBjdXJzb3Igc3RhdGVcblx0XHRzd2l0Y2ggKGNvbW1hbmQpIHtcblx0XHRcdGNhc2UgJ1onOlxuXHRcdFx0XHR4ID0gc3RhcnRYXG5cdFx0XHRcdHkgPSBzdGFydFlcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ0gnOlxuXHRcdFx0XHR4ID0gc2VnWzFdXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdWJzpcblx0XHRcdFx0eSA9IHNlZ1sxXVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTSc6XG5cdFx0XHRcdHggPSBzdGFydFggPSBzZWdbMV1cblx0XHRcdFx0eSA9IHN0YXJ0WSA9IHNlZ1syXVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0eCA9IHNlZ1tzZWcubGVuZ3RoIC0gMl1cblx0XHRcdFx0eSA9IHNlZ1tzZWcubGVuZ3RoIC0gMV1cblx0XHR9XG5cblx0XHRyZXR1cm4gc2VnXG5cdH0pXG59XG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplO1xyXG5cclxuZnVuY3Rpb24gbm9ybWFsaXplIChhcnIsIGRpbSkge1xyXG5cdGlmICghYXJyIHx8IGFyci5sZW5ndGggPT0gbnVsbCkgdGhyb3cgRXJyb3IoJ0FyZ3VtZW50IHNob3VsZCBiZSBhbiBhcnJheScpXHJcblxyXG5cdGlmIChkaW0gPT0gbnVsbCkgZGltID0gMVxyXG5cdGVsc2UgZGltID0gTWF0aC5mbG9vcihkaW0pXHJcblxyXG5cdHZhciBib3VuZHMgPSBBcnJheShkaW0gKiAyKVxyXG5cclxuXHRmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBkaW07IG9mZnNldCsrKSB7XHJcblx0XHR2YXIgbWF4ID0gLUluZmluaXR5LCBtaW4gPSBJbmZpbml0eSwgaSA9IG9mZnNldCwgbCA9IGFyci5sZW5ndGg7XHJcblxyXG5cdFx0Zm9yICg7IGkgPCBsOyBpKz1kaW0pIHtcclxuXHRcdFx0aWYgKGFycltpXSA+IG1heCkgbWF4ID0gYXJyW2ldO1xyXG5cdFx0XHRpZiAoYXJyW2ldIDwgbWluKSBtaW4gPSBhcnJbaV07XHJcblx0XHR9XHJcblxyXG5cdFx0Ym91bmRzW29mZnNldF0gPSBtaW5cclxuXHRcdGJvdW5kc1tkaW0gKyBvZmZzZXRdID0gbWF4XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gYm91bmRzO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIGdldEJvdW5kcyA9IHJlcXVpcmUoJ2FycmF5LWJvdW5kcycpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZTtcclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZSAoYXJyLCBkaW0sIGJvdW5kcykge1xyXG5cdGlmICghYXJyIHx8IGFyci5sZW5ndGggPT0gbnVsbCkgdGhyb3cgRXJyb3IoJ0FyZ3VtZW50IHNob3VsZCBiZSBhbiBhcnJheScpXHJcblxyXG5cdGlmIChkaW0gPT0gbnVsbCkgZGltID0gMVxyXG5cdGlmIChib3VuZHMgPT0gbnVsbCkgYm91bmRzID0gZ2V0Qm91bmRzKGFyciwgZGltKVxyXG5cclxuXHRmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBkaW07IG9mZnNldCsrKSB7XHJcblx0XHR2YXIgbWF4ID0gYm91bmRzW2RpbSArIG9mZnNldF0sIG1pbiA9IGJvdW5kc1tvZmZzZXRdLCBpID0gb2Zmc2V0LCBsID0gYXJyLmxlbmd0aDtcclxuXHJcblx0XHRpZiAobWF4ID09PSBJbmZpbml0eSAmJiBtaW4gPT09IC1JbmZpbml0eSkge1xyXG5cdFx0XHRmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsOyBpKz1kaW0pIHtcclxuXHRcdFx0XHRhcnJbaV0gPSBhcnJbaV0gPT09IG1heCA/IDEgOiBhcnJbaV0gPT09IG1pbiA/IDAgOiAuNVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChtYXggPT09IEluZmluaXR5KSB7XHJcblx0XHRcdGZvciAoaSA9IG9mZnNldDsgaSA8IGw7IGkrPWRpbSkge1xyXG5cdFx0XHRcdGFycltpXSA9IGFycltpXSA9PT0gbWF4ID8gMSA6IDBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAobWluID09PSAtSW5maW5pdHkpIHtcclxuXHRcdFx0Zm9yIChpID0gb2Zmc2V0OyBpIDwgbDsgaSs9ZGltKSB7XHJcblx0XHRcdFx0YXJyW2ldID0gYXJyW2ldID09PSBtaW4gPyAwIDogMVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dmFyIHJhbmdlID0gbWF4IC0gbWluXHJcblx0XHRcdGZvciAoaSA9IG9mZnNldDsgaSA8IGw7IGkrPWRpbSkge1xyXG5cdFx0XHRcdGlmICghaXNOYU4oYXJyW2ldKSkge1xyXG5cdFx0XHRcdFx0YXJyW2ldID0gcmFuZ2UgPT09IDAgPyAuNSA6IChhcnJbaV0gLSBtaW4pIC8gcmFuZ2VcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBhcnI7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG4vLyBjb21wYXJlIGFuZCBpc0J1ZmZlciB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2Jsb2IvNjgwZTllNWU0ODhmMjJhYWMyNzU5OWE1N2RjODQ0YTYzMTU5MjhkZC9pbmRleC5qc1xuLy8gb3JpZ2luYWwgbm90aWNlOlxuXG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5mdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciB4ID0gYS5sZW5ndGg7XG4gIHZhciB5ID0gYi5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV07XG4gICAgICB5ID0gYltpXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICBpZiAoeSA8IHgpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMDtcbn1cbmZ1bmN0aW9uIGlzQnVmZmVyKGIpIHtcbiAgaWYgKGdsb2JhbC5CdWZmZXIgJiYgdHlwZW9mIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihiKTtcbiAgfVxuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKTtcbn1cblxuLy8gYmFzZWQgb24gbm9kZSBhc3NlcnQsIG9yaWdpbmFsIG5vdGljZTpcbi8vIE5COiBUaGUgVVJMIHRvIHRoZSBDb21tb25KUyBzcGVjIGlzIGtlcHQganVzdCBmb3IgdHJhZGl0aW9uLlxuLy8gICAgIG5vZGUtYXNzZXJ0IGhhcyBldm9sdmVkIGEgbG90IHNpbmNlIHRoZW4sIGJvdGggaW4gQVBJIGFuZCBiZWhhdmlvci5cblxuLy8gaHR0cDovL3dpa2kuY29tbW9uanMub3JnL3dpa2kvVW5pdF9UZXN0aW5nLzEuMFxuLy9cbi8vIFRISVMgSVMgTk9UIFRFU1RFRCBOT1IgTElLRUxZIFRPIFdPUksgT1VUU0lERSBWOCFcbi8vXG4vLyBPcmlnaW5hbGx5IGZyb20gbmFyd2hhbC5qcyAoaHR0cDovL25hcndoYWxqcy5vcmcpXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgVGhvbWFzIFJvYmluc29uIDwyODBub3J0aC5jb20+XG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgJ1NvZnR3YXJlJyksIHRvXG4vLyBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuLy8gcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4vLyBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICdBUyBJUycsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbC8nKTtcbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBmdW5jdGlvbnNIYXZlTmFtZXMgPSAoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZm9vKCkge30ubmFtZSA9PT0gJ2Zvbyc7XG59KCkpO1xuZnVuY3Rpb24gcFRvU3RyaW5nIChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xufVxuZnVuY3Rpb24gaXNWaWV3KGFycmJ1Zikge1xuICBpZiAoaXNCdWZmZXIoYXJyYnVmKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIGdsb2JhbC5BcnJheUJ1ZmZlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBBcnJheUJ1ZmZlci5pc1ZpZXcoYXJyYnVmKTtcbiAgfVxuICBpZiAoIWFycmJ1Zikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoYXJyYnVmIGluc3RhbmNlb2YgRGF0YVZpZXcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoYXJyYnVmLmJ1ZmZlciAmJiBhcnJidWYuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4vLyAxLiBUaGUgYXNzZXJ0IG1vZHVsZSBwcm92aWRlcyBmdW5jdGlvbnMgdGhhdCB0aHJvd1xuLy8gQXNzZXJ0aW9uRXJyb3IncyB3aGVuIHBhcnRpY3VsYXIgY29uZGl0aW9ucyBhcmUgbm90IG1ldC4gVGhlXG4vLyBhc3NlcnQgbW9kdWxlIG11c3QgY29uZm9ybSB0byB0aGUgZm9sbG93aW5nIGludGVyZmFjZS5cblxudmFyIGFzc2VydCA9IG1vZHVsZS5leHBvcnRzID0gb2s7XG5cbi8vIDIuIFRoZSBBc3NlcnRpb25FcnJvciBpcyBkZWZpbmVkIGluIGFzc2VydC5cbi8vIG5ldyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3IoeyBtZXNzYWdlOiBtZXNzYWdlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCB9KVxuXG52YXIgcmVnZXggPSAvXFxzKmZ1bmN0aW9uXFxzKyhbXlxcKFxcc10qKVxccyovO1xuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9mdW5jdGlvbi5wcm90b3R5cGUubmFtZS9ibG9iL2FkZWVlZWM4YmZjYzYwNjhiMTg3ZDdkOWZiM2Q1YmIxZDNhMzA4OTkvaW1wbGVtZW50YXRpb24uanNcbmZ1bmN0aW9uIGdldE5hbWUoZnVuYykge1xuICBpZiAoIXV0aWwuaXNGdW5jdGlvbihmdW5jKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZnVuY3Rpb25zSGF2ZU5hbWVzKSB7XG4gICAgcmV0dXJuIGZ1bmMubmFtZTtcbiAgfVxuICB2YXIgc3RyID0gZnVuYy50b1N0cmluZygpO1xuICB2YXIgbWF0Y2ggPSBzdHIubWF0Y2gocmVnZXgpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV07XG59XG5hc3NlcnQuQXNzZXJ0aW9uRXJyb3IgPSBmdW5jdGlvbiBBc3NlcnRpb25FcnJvcihvcHRpb25zKSB7XG4gIHRoaXMubmFtZSA9ICdBc3NlcnRpb25FcnJvcic7XG4gIHRoaXMuYWN0dWFsID0gb3B0aW9ucy5hY3R1YWw7XG4gIHRoaXMuZXhwZWN0ZWQgPSBvcHRpb25zLmV4cGVjdGVkO1xuICB0aGlzLm9wZXJhdG9yID0gb3B0aW9ucy5vcGVyYXRvcjtcbiAgaWYgKG9wdGlvbnMubWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZTtcbiAgICB0aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBnZXRNZXNzYWdlKHRoaXMpO1xuICAgIHRoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9IHRydWU7XG4gIH1cbiAgdmFyIHN0YWNrU3RhcnRGdW5jdGlvbiA9IG9wdGlvbnMuc3RhY2tTdGFydEZ1bmN0aW9uIHx8IGZhaWw7XG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHN0YWNrU3RhcnRGdW5jdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gbm9uIHY4IGJyb3dzZXJzIHNvIHdlIGNhbiBoYXZlIGEgc3RhY2t0cmFjZVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcbiAgICBpZiAoZXJyLnN0YWNrKSB7XG4gICAgICB2YXIgb3V0ID0gZXJyLnN0YWNrO1xuXG4gICAgICAvLyB0cnkgdG8gc3RyaXAgdXNlbGVzcyBmcmFtZXNcbiAgICAgIHZhciBmbl9uYW1lID0gZ2V0TmFtZShzdGFja1N0YXJ0RnVuY3Rpb24pO1xuICAgICAgdmFyIGlkeCA9IG91dC5pbmRleE9mKCdcXG4nICsgZm5fbmFtZSk7XG4gICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgLy8gb25jZSB3ZSBoYXZlIGxvY2F0ZWQgdGhlIGZ1bmN0aW9uIGZyYW1lXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gc3RyaXAgb3V0IGV2ZXJ5dGhpbmcgYmVmb3JlIGl0IChhbmQgaXRzIGxpbmUpXG4gICAgICAgIHZhciBuZXh0X2xpbmUgPSBvdXQuaW5kZXhPZignXFxuJywgaWR4ICsgMSk7XG4gICAgICAgIG91dCA9IG91dC5zdWJzdHJpbmcobmV4dF9saW5lICsgMSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhY2sgPSBvdXQ7XG4gICAgfVxuICB9XG59O1xuXG4vLyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3IgaW5zdGFuY2VvZiBFcnJvclxudXRpbC5pbmhlcml0cyhhc3NlcnQuQXNzZXJ0aW9uRXJyb3IsIEVycm9yKTtcblxuZnVuY3Rpb24gdHJ1bmNhdGUocywgbikge1xuICBpZiAodHlwZW9mIHMgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHMubGVuZ3RoIDwgbiA/IHMgOiBzLnNsaWNlKDAsIG4pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzO1xuICB9XG59XG5mdW5jdGlvbiBpbnNwZWN0KHNvbWV0aGluZykge1xuICBpZiAoZnVuY3Rpb25zSGF2ZU5hbWVzIHx8ICF1dGlsLmlzRnVuY3Rpb24oc29tZXRoaW5nKSkge1xuICAgIHJldHVybiB1dGlsLmluc3BlY3Qoc29tZXRoaW5nKTtcbiAgfVxuICB2YXIgcmF3bmFtZSA9IGdldE5hbWUoc29tZXRoaW5nKTtcbiAgdmFyIG5hbWUgPSByYXduYW1lID8gJzogJyArIHJhd25hbWUgOiAnJztcbiAgcmV0dXJuICdbRnVuY3Rpb24nICsgIG5hbWUgKyAnXSc7XG59XG5mdW5jdGlvbiBnZXRNZXNzYWdlKHNlbGYpIHtcbiAgcmV0dXJuIHRydW5jYXRlKGluc3BlY3Qoc2VsZi5hY3R1YWwpLCAxMjgpICsgJyAnICtcbiAgICAgICAgIHNlbGYub3BlcmF0b3IgKyAnICcgK1xuICAgICAgICAgdHJ1bmNhdGUoaW5zcGVjdChzZWxmLmV4cGVjdGVkKSwgMTI4KTtcbn1cblxuLy8gQXQgcHJlc2VudCBvbmx5IHRoZSB0aHJlZSBrZXlzIG1lbnRpb25lZCBhYm92ZSBhcmUgdXNlZCBhbmRcbi8vIHVuZGVyc3Rvb2QgYnkgdGhlIHNwZWMuIEltcGxlbWVudGF0aW9ucyBvciBzdWIgbW9kdWxlcyBjYW4gcGFzc1xuLy8gb3RoZXIga2V5cyB0byB0aGUgQXNzZXJ0aW9uRXJyb3IncyBjb25zdHJ1Y3RvciAtIHRoZXkgd2lsbCBiZVxuLy8gaWdub3JlZC5cblxuLy8gMy4gQWxsIG9mIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIG11c3QgdGhyb3cgYW4gQXNzZXJ0aW9uRXJyb3Jcbi8vIHdoZW4gYSBjb3JyZXNwb25kaW5nIGNvbmRpdGlvbiBpcyBub3QgbWV0LCB3aXRoIGEgbWVzc2FnZSB0aGF0XG4vLyBtYXkgYmUgdW5kZWZpbmVkIGlmIG5vdCBwcm92aWRlZC4gIEFsbCBhc3NlcnRpb24gbWV0aG9kcyBwcm92aWRlXG4vLyBib3RoIHRoZSBhY3R1YWwgYW5kIGV4cGVjdGVkIHZhbHVlcyB0byB0aGUgYXNzZXJ0aW9uIGVycm9yIGZvclxuLy8gZGlzcGxheSBwdXJwb3Nlcy5cblxuZnVuY3Rpb24gZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvciwgc3RhY2tTdGFydEZ1bmN0aW9uKSB7XG4gIHRocm93IG5ldyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3Ioe1xuICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgIG9wZXJhdG9yOiBvcGVyYXRvcixcbiAgICBzdGFja1N0YXJ0RnVuY3Rpb246IHN0YWNrU3RhcnRGdW5jdGlvblxuICB9KTtcbn1cblxuLy8gRVhURU5TSU9OISBhbGxvd3MgZm9yIHdlbGwgYmVoYXZlZCBlcnJvcnMgZGVmaW5lZCBlbHNld2hlcmUuXG5hc3NlcnQuZmFpbCA9IGZhaWw7XG5cbi8vIDQuIFB1cmUgYXNzZXJ0aW9uIHRlc3RzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0cnV0aHksIGFzIGRldGVybWluZWRcbi8vIGJ5ICEhZ3VhcmQuXG4vLyBhc3NlcnQub2soZ3VhcmQsIG1lc3NhZ2Vfb3B0KTtcbi8vIFRoaXMgc3RhdGVtZW50IGlzIGVxdWl2YWxlbnQgdG8gYXNzZXJ0LmVxdWFsKHRydWUsICEhZ3VhcmQsXG4vLyBtZXNzYWdlX29wdCk7LiBUbyB0ZXN0IHN0cmljdGx5IGZvciB0aGUgdmFsdWUgdHJ1ZSwgdXNlXG4vLyBhc3NlcnQuc3RyaWN0RXF1YWwodHJ1ZSwgZ3VhcmQsIG1lc3NhZ2Vfb3B0KTsuXG5cbmZ1bmN0aW9uIG9rKHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICghdmFsdWUpIGZhaWwodmFsdWUsIHRydWUsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5vayk7XG59XG5hc3NlcnQub2sgPSBvaztcblxuLy8gNS4gVGhlIGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzaGFsbG93LCBjb2VyY2l2ZSBlcXVhbGl0eSB3aXRoXG4vLyA9PS5cbi8vIGFzc2VydC5lcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uIGVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCAhPSBleHBlY3RlZCkgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnPT0nLCBhc3NlcnQuZXF1YWwpO1xufTtcblxuLy8gNi4gVGhlIG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHdoZXRoZXIgdHdvIG9iamVjdHMgYXJlIG5vdCBlcXVhbFxuLy8gd2l0aCAhPSBhc3NlcnQubm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90RXF1YWwgPSBmdW5jdGlvbiBub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICchPScsIGFzc2VydC5ub3RFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDcuIFRoZSBlcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgYSBkZWVwIGVxdWFsaXR5IHJlbGF0aW9uLlxuLy8gYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5kZWVwRXF1YWwgPSBmdW5jdGlvbiBkZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoIV9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgZmFsc2UpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnZGVlcEVxdWFsJywgYXNzZXJ0LmRlZXBFcXVhbCk7XG4gIH1cbn07XG5cbmFzc2VydC5kZWVwU3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBkZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoIV9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgdHJ1ZSkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdkZWVwU3RyaWN0RXF1YWwnLCBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBzdHJpY3QsIG1lbW9zKSB7XG4gIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGlzQnVmZmVyKGFjdHVhbCkgJiYgaXNCdWZmZXIoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGNvbXBhcmUoYWN0dWFsLCBleHBlY3RlZCkgPT09IDA7XG5cbiAgLy8gNy4yLiBJZiB0aGUgZXhwZWN0ZWQgdmFsdWUgaXMgYSBEYXRlIG9iamVjdCwgdGhlIGFjdHVhbCB2YWx1ZSBpc1xuICAvLyBlcXVpdmFsZW50IGlmIGl0IGlzIGFsc28gYSBEYXRlIG9iamVjdCB0aGF0IHJlZmVycyB0byB0aGUgc2FtZSB0aW1lLlxuICB9IGVsc2UgaWYgKHV0aWwuaXNEYXRlKGFjdHVhbCkgJiYgdXRpbC5pc0RhdGUoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAvLyA3LjMgSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgdGhlIGFjdHVhbCB2YWx1ZSBpc1xuICAvLyBlcXVpdmFsZW50IGlmIGl0IGlzIGFsc28gYSBSZWdFeHAgb2JqZWN0IHdpdGggdGhlIHNhbWUgc291cmNlIGFuZFxuICAvLyBwcm9wZXJ0aWVzIChgZ2xvYmFsYCwgYG11bHRpbGluZWAsIGBsYXN0SW5kZXhgLCBgaWdub3JlQ2FzZWApLlxuICB9IGVsc2UgaWYgKHV0aWwuaXNSZWdFeHAoYWN0dWFsKSAmJiB1dGlsLmlzUmVnRXhwKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwuc291cmNlID09PSBleHBlY3RlZC5zb3VyY2UgJiZcbiAgICAgICAgICAgYWN0dWFsLmdsb2JhbCA9PT0gZXhwZWN0ZWQuZ2xvYmFsICYmXG4gICAgICAgICAgIGFjdHVhbC5tdWx0aWxpbmUgPT09IGV4cGVjdGVkLm11bHRpbGluZSAmJlxuICAgICAgICAgICBhY3R1YWwubGFzdEluZGV4ID09PSBleHBlY3RlZC5sYXN0SW5kZXggJiZcbiAgICAgICAgICAgYWN0dWFsLmlnbm9yZUNhc2UgPT09IGV4cGVjdGVkLmlnbm9yZUNhc2U7XG5cbiAgLy8gNy40LiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5ID09LlxuICB9IGVsc2UgaWYgKChhY3R1YWwgPT09IG51bGwgfHwgdHlwZW9mIGFjdHVhbCAhPT0gJ29iamVjdCcpICYmXG4gICAgICAgICAgICAgKGV4cGVjdGVkID09PSBudWxsIHx8IHR5cGVvZiBleHBlY3RlZCAhPT0gJ29iamVjdCcpKSB7XG4gICAgcmV0dXJuIHN0cmljdCA/IGFjdHVhbCA9PT0gZXhwZWN0ZWQgOiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gSWYgYm90aCB2YWx1ZXMgYXJlIGluc3RhbmNlcyBvZiB0eXBlZCBhcnJheXMsIHdyYXAgdGhlaXIgdW5kZXJseWluZ1xuICAvLyBBcnJheUJ1ZmZlcnMgaW4gYSBCdWZmZXIgZWFjaCB0byBpbmNyZWFzZSBwZXJmb3JtYW5jZVxuICAvLyBUaGlzIG9wdGltaXphdGlvbiByZXF1aXJlcyB0aGUgYXJyYXlzIHRvIGhhdmUgdGhlIHNhbWUgdHlwZSBhcyBjaGVja2VkIGJ5XG4gIC8vIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgKGFrYSBwVG9TdHJpbmcpLiBOZXZlciBwZXJmb3JtIGJpbmFyeVxuICAvLyBjb21wYXJpc29ucyBmb3IgRmxvYXQqQXJyYXlzLCB0aG91Z2gsIHNpbmNlIGUuZy4gKzAgPT09IC0wIGJ1dCB0aGVpclxuICAvLyBiaXQgcGF0dGVybnMgYXJlIG5vdCBpZGVudGljYWwuXG4gIH0gZWxzZSBpZiAoaXNWaWV3KGFjdHVhbCkgJiYgaXNWaWV3KGV4cGVjdGVkKSAmJlxuICAgICAgICAgICAgIHBUb1N0cmluZyhhY3R1YWwpID09PSBwVG9TdHJpbmcoZXhwZWN0ZWQpICYmXG4gICAgICAgICAgICAgIShhY3R1YWwgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkgfHxcbiAgICAgICAgICAgICAgIGFjdHVhbCBpbnN0YW5jZW9mIEZsb2F0NjRBcnJheSkpIHtcbiAgICByZXR1cm4gY29tcGFyZShuZXcgVWludDhBcnJheShhY3R1YWwuYnVmZmVyKSxcbiAgICAgICAgICAgICAgICAgICBuZXcgVWludDhBcnJheShleHBlY3RlZC5idWZmZXIpKSA9PT0gMDtcblxuICAvLyA3LjUgRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcbiAgLy8gd2l0aCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwpLCB0aGUgc2FtZSBzZXQgb2Yga2V5c1xuICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG4gIC8vIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICB9IGVsc2UgaWYgKGlzQnVmZmVyKGFjdHVhbCkgIT09IGlzQnVmZmVyKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBtZW1vcyA9IG1lbW9zIHx8IHthY3R1YWw6IFtdLCBleHBlY3RlZDogW119O1xuXG4gICAgdmFyIGFjdHVhbEluZGV4ID0gbWVtb3MuYWN0dWFsLmluZGV4T2YoYWN0dWFsKTtcbiAgICBpZiAoYWN0dWFsSW5kZXggIT09IC0xKSB7XG4gICAgICBpZiAoYWN0dWFsSW5kZXggPT09IG1lbW9zLmV4cGVjdGVkLmluZGV4T2YoZXhwZWN0ZWQpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9zLmFjdHVhbC5wdXNoKGFjdHVhbCk7XG4gICAgbWVtb3MuZXhwZWN0ZWQucHVzaChleHBlY3RlZCk7XG5cbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCwgc3RyaWN0LCBtZW1vcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNBcmd1bWVudHMob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgc3RyaWN0LCBhY3R1YWxWaXNpdGVkT2JqZWN0cykge1xuICBpZiAoYSA9PT0gbnVsbCB8fCBhID09PSB1bmRlZmluZWQgfHwgYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvLyBpZiBvbmUgaXMgYSBwcmltaXRpdmUsIHRoZSBvdGhlciBtdXN0IGJlIHNhbWVcbiAgaWYgKHV0aWwuaXNQcmltaXRpdmUoYSkgfHwgdXRpbC5pc1ByaW1pdGl2ZShiKSlcbiAgICByZXR1cm4gYSA9PT0gYjtcbiAgaWYgKHN0cmljdCAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYSkgIT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIHZhciBhSXNBcmdzID0gaXNBcmd1bWVudHMoYSk7XG4gIHZhciBiSXNBcmdzID0gaXNBcmd1bWVudHMoYik7XG4gIGlmICgoYUlzQXJncyAmJiAhYklzQXJncykgfHwgKCFhSXNBcmdzICYmIGJJc0FyZ3MpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgaWYgKGFJc0FyZ3MpIHtcbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBfZGVlcEVxdWFsKGEsIGIsIHN0cmljdCk7XG4gIH1cbiAgdmFyIGthID0gb2JqZWN0S2V5cyhhKTtcbiAgdmFyIGtiID0gb2JqZWN0S2V5cyhiKTtcbiAgdmFyIGtleSwgaTtcbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuICAvLyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPT0ga2IubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy90aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT09IGtiW2ldKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFfZGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBzdHJpY3QsIGFjdHVhbFZpc2l0ZWRPYmplY3RzKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gOC4gVGhlIG5vbi1lcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgZm9yIGFueSBkZWVwIGluZXF1YWxpdHkuXG4vLyBhc3NlcnQubm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdERlZXBFcXVhbCA9IGZ1bmN0aW9uIG5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIGZhbHNlKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ25vdERlZXBFcXVhbCcsIGFzc2VydC5ub3REZWVwRXF1YWwpO1xuICB9XG59O1xuXG5hc3NlcnQubm90RGVlcFN0cmljdEVxdWFsID0gbm90RGVlcFN0cmljdEVxdWFsO1xuZnVuY3Rpb24gbm90RGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgdHJ1ZSkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdub3REZWVwU3RyaWN0RXF1YWwnLCBub3REZWVwU3RyaWN0RXF1YWwpO1xuICB9XG59XG5cblxuLy8gOS4gVGhlIHN0cmljdCBlcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgc3RyaWN0IGVxdWFsaXR5LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbi8vIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5zdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIHN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PT0nLCBhc3NlcnQuc3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG4vLyAxMC4gVGhlIHN0cmljdCBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciBzdHJpY3QgaW5lcXVhbGl0eSwgYXNcbi8vIGRldGVybWluZWQgYnkgIT09LiAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdFN0cmljdEVxdWFsID0gZnVuY3Rpb24gbm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9PScsIGFzc2VydC5ub3RTdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgaWYgKCFhY3R1YWwgfHwgIWV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChleHBlY3RlZCkgPT0gJ1tvYmplY3QgUmVnRXhwXScpIHtcbiAgICByZXR1cm4gZXhwZWN0ZWQudGVzdChhY3R1YWwpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAoYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIElnbm9yZS4gIFRoZSBpbnN0YW5jZW9mIGNoZWNrIGRvZXNuJ3Qgd29yayBmb3IgYXJyb3cgZnVuY3Rpb25zLlxuICB9XG5cbiAgaWYgKEVycm9yLmlzUHJvdG90eXBlT2YoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGV4cGVjdGVkLmNhbGwoe30sIGFjdHVhbCkgPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIF90cnlCbG9jayhibG9jaykge1xuICB2YXIgZXJyb3I7XG4gIHRyeSB7XG4gICAgYmxvY2soKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGVycm9yID0gZTtcbiAgfVxuICByZXR1cm4gZXJyb3I7XG59XG5cbmZ1bmN0aW9uIF90aHJvd3Moc2hvdWxkVGhyb3csIGJsb2NrLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICB2YXIgYWN0dWFsO1xuXG4gIGlmICh0eXBlb2YgYmxvY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJsb2NrXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGV4cGVjdGVkID09PSAnc3RyaW5nJykge1xuICAgIG1lc3NhZ2UgPSBleHBlY3RlZDtcbiAgICBleHBlY3RlZCA9IG51bGw7XG4gIH1cblxuICBhY3R1YWwgPSBfdHJ5QmxvY2soYmxvY2spO1xuXG4gIG1lc3NhZ2UgPSAoZXhwZWN0ZWQgJiYgZXhwZWN0ZWQubmFtZSA/ICcgKCcgKyBleHBlY3RlZC5uYW1lICsgJykuJyA6ICcuJykgK1xuICAgICAgICAgICAgKG1lc3NhZ2UgPyAnICcgKyBtZXNzYWdlIDogJy4nKTtcblxuICBpZiAoc2hvdWxkVGhyb3cgJiYgIWFjdHVhbCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgJ01pc3NpbmcgZXhwZWN0ZWQgZXhjZXB0aW9uJyArIG1lc3NhZ2UpO1xuICB9XG5cbiAgdmFyIHVzZXJQcm92aWRlZE1lc3NhZ2UgPSB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZyc7XG4gIHZhciBpc1Vud2FudGVkRXhjZXB0aW9uID0gIXNob3VsZFRocm93ICYmIHV0aWwuaXNFcnJvcihhY3R1YWwpO1xuICB2YXIgaXNVbmV4cGVjdGVkRXhjZXB0aW9uID0gIXNob3VsZFRocm93ICYmIGFjdHVhbCAmJiAhZXhwZWN0ZWQ7XG5cbiAgaWYgKChpc1Vud2FudGVkRXhjZXB0aW9uICYmXG4gICAgICB1c2VyUHJvdmlkZWRNZXNzYWdlICYmXG4gICAgICBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSkgfHxcbiAgICAgIGlzVW5leHBlY3RlZEV4Y2VwdGlvbikge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgJ0dvdCB1bndhbnRlZCBleGNlcHRpb24nICsgbWVzc2FnZSk7XG4gIH1cblxuICBpZiAoKHNob3VsZFRocm93ICYmIGFjdHVhbCAmJiBleHBlY3RlZCAmJlxuICAgICAgIWV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB8fCAoIXNob3VsZFRocm93ICYmIGFjdHVhbCkpIHtcbiAgICB0aHJvdyBhY3R1YWw7XG4gIH1cbn1cblxuLy8gMTEuIEV4cGVjdGVkIHRvIHRocm93IGFuIGVycm9yOlxuLy8gYXNzZXJ0LnRocm93cyhibG9jaywgRXJyb3Jfb3B0LCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC50aHJvd3MgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovZXJyb3IsIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcbiAgX3Rocm93cyh0cnVlLCBibG9jaywgZXJyb3IsIG1lc3NhZ2UpO1xufTtcblxuLy8gRVhURU5TSU9OISBUaGlzIGlzIGFubm95aW5nIHRvIHdyaXRlIG91dHNpZGUgdGhpcyBtb2R1bGUuXG5hc3NlcnQuZG9lc05vdFRocm93ID0gZnVuY3Rpb24oYmxvY2ssIC8qb3B0aW9uYWwqL2Vycm9yLCAvKm9wdGlvbmFsKi9tZXNzYWdlKSB7XG4gIF90aHJvd3MoZmFsc2UsIGJsb2NrLCBlcnJvciwgbWVzc2FnZSk7XG59O1xuXG5hc3NlcnQuaWZFcnJvciA9IGZ1bmN0aW9uKGVycikgeyBpZiAoZXJyKSB0aHJvdyBlcnI7IH07XG5cbi8vIEV4cG9zZSBhIHN0cmljdCBvbmx5IHZhcmlhbnQgb2YgYXNzZXJ0XG5mdW5jdGlvbiBzdHJpY3QodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkgZmFpbCh2YWx1ZSwgdHJ1ZSwgbWVzc2FnZSwgJz09Jywgc3RyaWN0KTtcbn1cbmFzc2VydC5zdHJpY3QgPSBvYmplY3RBc3NpZ24oc3RyaWN0LCBhc3NlcnQsIHtcbiAgZXF1YWw6IGFzc2VydC5zdHJpY3RFcXVhbCxcbiAgZGVlcEVxdWFsOiBhc3NlcnQuZGVlcFN0cmljdEVxdWFsLFxuICBub3RFcXVhbDogYXNzZXJ0Lm5vdFN0cmljdEVxdWFsLFxuICBub3REZWVwRXF1YWw6IGFzc2VydC5ub3REZWVwU3RyaWN0RXF1YWxcbn0pO1xuYXNzZXJ0LnN0cmljdC5zdHJpY3QgPSBhc3NlcnQuc3RyaWN0O1xuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXNPd24uY2FsbChvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiBrZXlzO1xufTtcbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihhcmcpIHtcbiAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0J1xuICAgICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcuZmlsbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcucmVhZFVJbnQ4ID09PSAnZnVuY3Rpb24nO1xufSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgZm9ybWF0UmVnRXhwID0gLyVbc2RqJV0vZztcbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZikge1xuICBpZiAoIWlzU3RyaW5nKGYpKSB7XG4gICAgdmFyIG9iamVjdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqZWN0cy5wdXNoKGluc3BlY3QoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHZhciBpID0gMTtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgdmFyIHN0ciA9IFN0cmluZyhmKS5yZXBsYWNlKGZvcm1hdFJlZ0V4cCwgZnVuY3Rpb24oeCkge1xuICAgIGlmICh4ID09PSAnJSUnKSByZXR1cm4gJyUnO1xuICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICclcyc6IHJldHVybiBTdHJpbmcoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWonOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KTtcbiAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuICAgICAgc3RyICs9ICcgJyArIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vLyBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuLy8gUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbi8vIElmIC0tbm8tZGVwcmVjYXRpb24gaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG5leHBvcnRzLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKGZuLCBtc2cpIHtcbiAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cbiAgaWYgKGlzVW5kZWZpbmVkKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBpZiAocHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLnRyYWNlRGVwcmVjYXRpb24pIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG5cblxudmFyIGRlYnVncyA9IHt9O1xudmFyIGRlYnVnRW52aXJvbjtcbmV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKGRlYnVnRW52aXJvbikpXG4gICAgZGVidWdFbnZpcm9uID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJztcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgnXFxcXGInICsgc2V0ICsgJ1xcXFxiJywgJ2knKS50ZXN0KGRlYnVnRW52aXJvbikpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYnVnc1tzZXRdO1xufTtcblxuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUjZ3JhcGhpY3Ncbmluc3BlY3QuY29sb3JzID0ge1xuICAnYm9sZCcgOiBbMSwgMjJdLFxuICAnaXRhbGljJyA6IFszLCAyM10sXG4gICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcbiAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgJ3doaXRlJyA6IFszNywgMzldLFxuICAnZ3JleScgOiBbOTAsIDM5XSxcbiAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAnYmx1ZScgOiBbMzQsIDM5XSxcbiAgJ2N5YW4nIDogWzM2LCAzOV0sXG4gICdncmVlbicgOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnIDogWzM1LCAzOV0sXG4gICdyZWQnIDogWzMxLCAzOV0sXG4gICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuXG5mdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHZhciBzdHlsZSA9IGluc3BlY3Quc3R5bGVzW3N0eWxlVHlwZV07XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuICAgICAgICAgICAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzFdICsgJ20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICByZXR1cm4gc3RyO1xufVxuXG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgIGhhc2hbdmFsXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAoY3R4LmN1c3RvbUluc3BlY3QgJiZcbiAgICAgIHZhbHVlICYmXG4gICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSB1dGlsIG1vZHVsZSwgaXQncyBpbnNwZWN0IGZ1bmN0aW9uIGlzIHNwZWNpYWxcbiAgICAgIHZhbHVlLmluc3BlY3QgIT09IGV4cG9ydHMuaW5zcGVjdCAmJlxuICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICAgICAhKHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9PT0gdmFsdWUpKSB7XG4gICAgdmFyIHJldCA9IHZhbHVlLmluc3BlY3QocmVjdXJzZVRpbWVzLCBjdHgpO1xuICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuICAgICAgcmV0ID0gZm9ybWF0VmFsdWUoY3R4LCByZXQsIHJlY3Vyc2VUaW1lcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQcmltaXRpdmUgdHlwZXMgY2Fubm90IGhhdmUgcHJvcGVydGllc1xuICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuICBpZiAocHJpbWl0aXZlKSB7XG4gICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgfVxuXG4gIC8vIExvb2sgdXAgdGhlIGtleXMgb2YgdGhlIG9iamVjdC5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG4gIGlmIChjdHguc2hvd0hpZGRlbikge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSk7XG4gIH1cblxuICAvLyBJRSBkb2Vzbid0IG1ha2UgZXJyb3IgZmllbGRzIG5vbi1lbnVtZXJhYmxlXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kd3c1MnNidCh2PXZzLjk0KS5hc3B4XG4gIGlmIChpc0Vycm9yKHZhbHVlKVxuICAgICAgJiYgKGtleXMuaW5kZXhPZignbWVzc2FnZScpID49IDAgfHwga2V5cy5pbmRleE9mKCdkZXNjcmlwdGlvbicpID49IDApKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZSArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJycsIGFycmF5ID0gZmFsc2UsIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgY3R4LnNlZW4ucG9wKCk7XG5cbiAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSkge1xuICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpICsgJ1xcJyc7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKGlzTnVsbCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyLCBkZXNjO1xuICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG4gIGlmIChkZXNjLmdldCkge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZihkZXNjLnZhbHVlKSA8IDApIHtcbiAgICAgIGlmIChpc051bGwocmVjdXJzZVRpbWVzKSkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5yZXBsYWNlKC9cXHUwMDFiXFxbXFxkXFxkP20vZywgJycpLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuXG4vLyBOT1RFOiBUaGVzZSB0eXBlIGNoZWNraW5nIGZ1bmN0aW9ucyBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBgaW5zdGFuY2VvZmBcbi8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuZnVuY3Rpb24gaXNBcnJheShhcikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcik7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnYm9vbGVhbic7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcblxuZnVuY3Rpb24gaXNOdWxsKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsT3JVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N0cmluZyc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCc7XG59XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKHJlKSB7XG4gIHJldHVybiBpc09iamVjdChyZSkgJiYgb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBpc09iamVjdChkKSAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gaXNPYmplY3QoZSkgJiZcbiAgICAgIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IHJlcXVpcmUoJy4vc3VwcG9ydC9pc0J1ZmZlcicpO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuZnVuY3Rpb24gcGFkKG4pIHtcbiAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4udG9TdHJpbmcoMTApIDogbi50b1N0cmluZygxMCk7XG59XG5cblxudmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLFxuICAgICAgICAgICAgICAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuLy8gMjYgRmViIDE2OjE5OjM0XG5mdW5jdGlvbiB0aW1lc3RhbXAoKSB7XG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldE1pbnV0ZXMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldFNlY29uZHMoKSldLmpvaW4oJzonKTtcbiAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcbn1cblxuXG4vLyBsb2cgaXMganVzdCBhIHRoaW4gd3JhcHBlciB0byBjb25zb2xlLmxvZyB0aGF0IHByZXBlbmRzIGEgdGltZXN0YW1wXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnJXMgLSAlcycsIHRpbWVzdGFtcCgpLCBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpKTtcbn07XG5cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXIuXG4gKlxuICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuICogZnVuY3Rpb24gKG5vdCBvbiBGdW5jdGlvbi5wcm90b3R5cGUpLiBOT1RFOiBJZiB0aGlzIGZpbGUgaXMgdG8gYmUgbG9hZGVkXG4gKiBkdXJpbmcgYm9vdHN0cmFwcGluZyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIHJld3JpdHRlbiB1c2luZyBzb21lIG5hdGl2ZVxuICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG4gKiBleHBlY3RlZCBkdXJpbmcgYm9vdHN0cmFwcGluZyAoc2VlIG1pcnJvci5qcyBpbiByMTE0OTAzKS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG4gKiAgICAgcHJvdG90eXBlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGluaGVyaXQgcHJvdG90eXBlIGZyb20uXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5leHBvcnRzLl9leHRlbmQgPSBmdW5jdGlvbihvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8ICFpc09iamVjdChhZGQpKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufTtcblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIGNsYW1wID0gcmVxdWlyZSgnY2xhbXAnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYWxjU0RGXHJcblxyXG52YXIgSU5GID0gMWUyMDtcclxuXHJcbmZ1bmN0aW9uIGNhbGNTREYoc3JjLCBvcHRpb25zKSB7XHJcbiAgICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxyXG5cclxuICAgIHZhciBjdXRvZmYgPSBvcHRpb25zLmN1dG9mZiA9PSBudWxsID8gMC4yNSA6IG9wdGlvbnMuY3V0b2ZmXHJcbiAgICB2YXIgcmFkaXVzID0gb3B0aW9ucy5yYWRpdXMgPT0gbnVsbCA/IDggOiBvcHRpb25zLnJhZGl1c1xyXG4gICAgdmFyIGNoYW5uZWwgPSBvcHRpb25zLmNoYW5uZWwgfHwgMFxyXG4gICAgdmFyIHcsIGgsIHNpemUsIGRhdGEsIGludERhdGEsIHN0cmlkZSwgY3R4LCBjYW52YXMsIGltZ0RhdGEsIGksIGxcclxuXHJcbiAgICAvLyBoYW5kbGUgaW1hZ2UgY29udGFpbmVyXHJcbiAgICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHNyYykgfHwgQXJyYXkuaXNBcnJheShzcmMpKSB7XHJcbiAgICAgICAgaWYgKCFvcHRpb25zLndpZHRoIHx8ICFvcHRpb25zLmhlaWdodCkgdGhyb3cgRXJyb3IoJ0ZvciByYXcgZGF0YSB3aWR0aCBhbmQgaGVpZ2h0IHNob3VsZCBiZSBwcm92aWRlZCBieSBvcHRpb25zJylcclxuICAgICAgICB3ID0gb3B0aW9ucy53aWR0aCwgaCA9IG9wdGlvbnMuaGVpZ2h0XHJcbiAgICAgICAgZGF0YSA9IHNyY1xyXG5cclxuICAgICAgICBpZiAoIW9wdGlvbnMuc3RyaWRlKSBzdHJpZGUgPSBNYXRoLmZsb29yKHNyYy5sZW5ndGggLyB3IC8gaClcclxuICAgICAgICBlbHNlIHN0cmlkZSA9IG9wdGlvbnMuc3RyaWRlXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAod2luZG93LkhUTUxDYW52YXNFbGVtZW50ICYmIHNyYyBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjYW52YXMgPSBzcmNcclxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcclxuICAgICAgICAgICAgdyA9IGNhbnZhcy53aWR0aCwgaCA9IGNhbnZhcy5oZWlnaHRcclxuICAgICAgICAgICAgaW1nRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgdywgaClcclxuICAgICAgICAgICAgZGF0YSA9IGltZ0RhdGEuZGF0YVxyXG4gICAgICAgICAgICBzdHJpZGUgPSA0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHdpbmRvdy5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgJiYgc3JjIGluc3RhbmNlb2Ygd2luZG93LkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgICAgICBjYW52YXMgPSBzcmMuY2FudmFzXHJcbiAgICAgICAgICAgIGN0eCA9IHNyY1xyXG4gICAgICAgICAgICB3ID0gY2FudmFzLndpZHRoLCBoID0gY2FudmFzLmhlaWdodFxyXG4gICAgICAgICAgICBpbWdEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB3LCBoKVxyXG4gICAgICAgICAgICBkYXRhID0gaW1nRGF0YS5kYXRhXHJcbiAgICAgICAgICAgIHN0cmlkZSA9IDRcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAod2luZG93LkltYWdlRGF0YSAmJiBzcmMgaW5zdGFuY2VvZiB3aW5kb3cuSW1hZ2VEYXRhKSB7XHJcbiAgICAgICAgICAgIGltZ0RhdGEgPSBzcmNcclxuICAgICAgICAgICAgdyA9IHNyYy53aWR0aCwgaCA9IHNyYy5oZWlnaHRcclxuICAgICAgICAgICAgZGF0YSA9IGltZ0RhdGEuZGF0YVxyXG4gICAgICAgICAgICBzdHJpZGUgPSA0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNpemUgPSBNYXRoLm1heCh3LCBoKVxyXG5cclxuICAgIC8vY29udmVydCBpbnQgZGF0YSB0byBmbG9hdHNcclxuICAgIGlmICgod2luZG93LlVpbnQ4Q2xhbXBlZEFycmF5ICYmIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3cuVWludDhDbGFtcGVkQXJyYXkpIHx8ICh3aW5kb3cuVWludDhBcnJheSAmJiBkYXRhIGluc3RhbmNlb2Ygd2luZG93LlVpbnQ4QXJyYXkpKSB7XHJcbiAgICAgICAgaW50RGF0YSA9IGRhdGFcclxuICAgICAgICBkYXRhID0gQXJyYXkodypoKVxyXG5cclxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gaW50RGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgZGF0YVtpXSA9IGludERhdGFbaSpzdHJpZGUgKyBjaGFubmVsXSAvIDI1NVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChzdHJpZGUgIT09IDEpIHRocm93IEVycm9yKCdSYXcgZGF0YSBjYW4gaGF2ZSBvbmx5IDEgdmFsdWUgcGVyIHBpeGVsJylcclxuICAgIH1cclxuXHJcbiAgICAvLyB0ZW1wb3JhcnkgYXJyYXlzIGZvciB0aGUgZGlzdGFuY2UgdHJhbnNmb3JtXHJcbiAgICB2YXIgZ3JpZE91dGVyID0gQXJyYXkodyAqIGgpXHJcbiAgICB2YXIgZ3JpZElubmVyID0gQXJyYXkodyAqIGgpXHJcbiAgICB2YXIgZiA9IEFycmF5KHNpemUpXHJcbiAgICB2YXIgZCA9IEFycmF5KHNpemUpXHJcbiAgICB2YXIgeiA9IEFycmF5KHNpemUgKyAxKVxyXG4gICAgdmFyIHYgPSBBcnJheShzaXplKVxyXG5cclxuICAgIGZvciAoaSA9IDAsIGwgPSB3ICogaDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHZhciBhID0gZGF0YVtpXVxyXG4gICAgICAgIGdyaWRPdXRlcltpXSA9IGEgPT09IDEgPyAwIDogYSA9PT0gMCA/IElORiA6IE1hdGgucG93KE1hdGgubWF4KDAsIDAuNSAtIGEpLCAyKVxyXG4gICAgICAgIGdyaWRJbm5lcltpXSA9IGEgPT09IDEgPyBJTkYgOiBhID09PSAwID8gMCA6IE1hdGgucG93KE1hdGgubWF4KDAsIGEgLSAwLjUpLCAyKVxyXG4gICAgfVxyXG5cclxuICAgIGVkdChncmlkT3V0ZXIsIHcsIGgsIGYsIGQsIHYsIHopXHJcbiAgICBlZHQoZ3JpZElubmVyLCB3LCBoLCBmLCBkLCB2LCB6KVxyXG5cclxuICAgIHZhciBkaXN0ID0gd2luZG93LkZsb2F0MzJBcnJheSA/IG5ldyBGbG9hdDMyQXJyYXkodyAqIGgpIDogbmV3IEFycmF5KHcgKiBoKVxyXG5cclxuICAgIGZvciAoaSA9IDAsIGwgPSB3Kmg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBkaXN0W2ldID0gY2xhbXAoMSAtICggKGdyaWRPdXRlcltpXSAtIGdyaWRJbm5lcltpXSkgLyByYWRpdXMgKyBjdXRvZmYpLCAwLCAxKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkaXN0XHJcbn1cclxuXHJcbi8vIDJEIEV1Y2xpZGVhbiBkaXN0YW5jZSB0cmFuc2Zvcm0gYnkgRmVsemVuc3p3YWxiICYgSHV0dGVubG9jaGVyIGh0dHBzOi8vY3MuYnJvd24uZWR1L35wZmYvZHQvXHJcbmZ1bmN0aW9uIGVkdChkYXRhLCB3aWR0aCwgaGVpZ2h0LCBmLCBkLCB2LCB6KSB7XHJcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgIGZbeV0gPSBkYXRhW3kgKiB3aWR0aCArIHhdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVkdDFkKGYsIGQsIHYsIHosIGhlaWdodClcclxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgZGF0YVt5ICogd2lkdGggKyB4XSA9IGRbeV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICBmW3hdID0gZGF0YVt5ICogd2lkdGggKyB4XVxyXG4gICAgICAgIH1cclxuICAgICAgICBlZHQxZChmLCBkLCB2LCB6LCB3aWR0aClcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICBkYXRhW3kgKiB3aWR0aCArIHhdID0gTWF0aC5zcXJ0KGRbeF0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyAxRCBzcXVhcmVkIGRpc3RhbmNlIHRyYW5zZm9ybVxyXG5mdW5jdGlvbiBlZHQxZChmLCBkLCB2LCB6LCBuKSB7XHJcbiAgICB2WzBdID0gMDtcclxuICAgIHpbMF0gPSAtSU5GXHJcbiAgICB6WzFdID0gK0lORlxyXG5cclxuICAgIGZvciAodmFyIHEgPSAxLCBrID0gMDsgcSA8IG47IHErKykge1xyXG4gICAgICAgIHZhciBzID0gKChmW3FdICsgcSAqIHEpIC0gKGZbdltrXV0gKyB2W2tdICogdltrXSkpIC8gKDIgKiBxIC0gMiAqIHZba10pXHJcbiAgICAgICAgd2hpbGUgKHMgPD0geltrXSkge1xyXG4gICAgICAgICAgICBrLS1cclxuICAgICAgICAgICAgcyA9ICgoZltxXSArIHEgKiBxKSAtIChmW3Zba11dICsgdltrXSAqIHZba10pKSAvICgyICogcSAtIDIgKiB2W2tdKVxyXG4gICAgICAgIH1cclxuICAgICAgICBrKytcclxuICAgICAgICB2W2tdID0gcVxyXG4gICAgICAgIHpba10gPSBzXHJcbiAgICAgICAgeltrICsgMV0gPSArSU5GXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChxID0gMCwgayA9IDA7IHEgPCBuOyBxKyspIHtcclxuICAgICAgICB3aGlsZSAoeltrICsgMV0gPCBxKSBrKytcclxuICAgICAgICBkW3FdID0gKHEgLSB2W2tdKSAqIChxIC0gdltrXSkgKyBmW3Zba11dXHJcbiAgICB9XHJcbn1cclxuIiwiLyoqIEBtb2R1bGUgIGNvbG9yLWlkICovXHJcblxyXG4ndXNlIHN0cmljdCdcclxuXHJcbnZhciBjbGFtcCA9IHJlcXVpcmUoJ2NsYW1wJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdG9OdW1iZXJcclxubW9kdWxlLmV4cG9ydHMudG8gPSB0b051bWJlclxyXG5tb2R1bGUuZXhwb3J0cy5mcm9tID0gZnJvbU51bWJlclxyXG5cclxuZnVuY3Rpb24gdG9OdW1iZXIgKHJnYmEsIG5vcm1hbGl6ZWQpIHtcclxuXHRpZihub3JtYWxpemVkID09IG51bGwpIG5vcm1hbGl6ZWQgPSB0cnVlXHJcblxyXG5cdHZhciByID0gcmdiYVswXSwgZyA9IHJnYmFbMV0sIGIgPSByZ2JhWzJdLCBhID0gcmdiYVszXVxyXG5cclxuXHRpZiAoYSA9PSBudWxsKSBhID0gbm9ybWFsaXplZCA/IDEgOiAyNTVcclxuXHJcblx0aWYgKG5vcm1hbGl6ZWQpIHtcclxuXHRcdHIgKj0gMjU1XHJcblx0XHRnICo9IDI1NVxyXG5cdFx0YiAqPSAyNTVcclxuXHRcdGEgKj0gMjU1XHJcblx0fVxyXG5cclxuXHRyID0gY2xhbXAociwgMCwgMjU1KSAmIDB4RkZcclxuXHRnID0gY2xhbXAoZywgMCwgMjU1KSAmIDB4RkZcclxuXHRiID0gY2xhbXAoYiwgMCwgMjU1KSAmIDB4RkZcclxuXHRhID0gY2xhbXAoYSwgMCwgMjU1KSAmIDB4RkZcclxuXHJcblx0Ly9oaS1vcmRlciBzaGlmdCBjb252ZXJ0cyB0byAtMSwgc28gd2UgY2FuJ3QgdXNlIDw8MjRcclxuXHR2YXIgbiA9IChyICogMHgwMTAwMDAwMCkgKyAoZyA8PCAxNikgKyAoYiA8PCA4KSArIChhKVxyXG5cclxuXHRyZXR1cm4gblxyXG59XHJcblxyXG5mdW5jdGlvbiBmcm9tTnVtYmVyIChuLCBub3JtYWxpemVkKSB7XHJcblx0biA9ICtuXHJcblxyXG5cdHZhciByID0gbiA+Pj4gMjRcclxuXHR2YXIgZyA9IChuICYgMHgwMGZmMDAwMCkgPj4+IDE2XHJcblx0dmFyIGIgPSAobiAmIDB4MDAwMGZmMDApID4+PiA4XHJcblx0dmFyIGEgPSBuICYgMHgwMDAwMDBmZlxyXG5cclxuXHRpZiAobm9ybWFsaXplZCA9PT0gZmFsc2UpIHJldHVybiBbciwgZywgYiwgYV1cclxuXHJcblx0cmV0dXJuIFtyLzI1NSwgZy8yNTUsIGIvMjU1LCBhLzI1NV1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzVmFsdWUgICAgICAgICAgICAgPSByZXF1aXJlKFwidHlwZS92YWx1ZS9pc1wiKVxuICAsIGVuc3VyZVZhbHVlICAgICAgICAgPSByZXF1aXJlKFwidHlwZS92YWx1ZS9lbnN1cmVcIilcbiAgLCBlbnN1cmVQbGFpbkZ1bmN0aW9uID0gcmVxdWlyZShcInR5cGUvcGxhaW4tZnVuY3Rpb24vZW5zdXJlXCIpXG4gICwgY29weSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoXCJlczUtZXh0L29iamVjdC9jb3B5XCIpXG4gICwgbm9ybWFsaXplT3B0aW9ucyAgICA9IHJlcXVpcmUoXCJlczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9uc1wiKVxuICAsIG1hcCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKFwiZXM1LWV4dC9vYmplY3QvbWFwXCIpO1xuXG52YXIgYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG4gICwgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHlcbiAgLCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgLCBkZWZpbmU7XG5cbmRlZmluZSA9IGZ1bmN0aW9uIChuYW1lLCBkZXNjLCBvcHRpb25zKSB7XG5cdHZhciB2YWx1ZSA9IGVuc3VyZVZhbHVlKGRlc2MpICYmIGVuc3VyZVBsYWluRnVuY3Rpb24oZGVzYy52YWx1ZSksIGRncztcblx0ZGdzID0gY29weShkZXNjKTtcblx0ZGVsZXRlIGRncy53cml0YWJsZTtcblx0ZGVsZXRlIGRncy52YWx1ZTtcblx0ZGdzLmdldCA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIW9wdGlvbnMub3ZlcndyaXRlRGVmaW5pdGlvbiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsIG5hbWUpKSByZXR1cm4gdmFsdWU7XG5cdFx0ZGVzYy52YWx1ZSA9IGJpbmQuY2FsbCh2YWx1ZSwgb3B0aW9ucy5yZXNvbHZlQ29udGV4dCA/IG9wdGlvbnMucmVzb2x2ZUNvbnRleHQodGhpcykgOiB0aGlzKTtcblx0XHRkZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCBkZXNjKTtcblx0XHRyZXR1cm4gdGhpc1tuYW1lXTtcblx0fTtcblx0cmV0dXJuIGRncztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHByb3BzLyosIG9wdGlvbnMqLykge1xuXHR2YXIgb3B0aW9ucyA9IG5vcm1hbGl6ZU9wdGlvbnMoYXJndW1lbnRzWzFdKTtcblx0aWYgKGlzVmFsdWUob3B0aW9ucy5yZXNvbHZlQ29udGV4dCkpIGVuc3VyZVBsYWluRnVuY3Rpb24ob3B0aW9ucy5yZXNvbHZlQ29udGV4dCk7XG5cdHJldHVybiBtYXAocHJvcHMsIGZ1bmN0aW9uIChkZXNjLCBuYW1lKSB7IHJldHVybiBkZWZpbmUobmFtZSwgZGVzYywgb3B0aW9ucyk7IH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSAgICAgICAgID0gcmVxdWlyZShcInR5cGUvdmFsdWUvaXNcIilcbiAgLCBpc1BsYWluRnVuY3Rpb24gPSByZXF1aXJlKFwidHlwZS9wbGFpbi1mdW5jdGlvbi9pc1wiKVxuICAsIGFzc2lnbiAgICAgICAgICA9IHJlcXVpcmUoXCJlczUtZXh0L29iamVjdC9hc3NpZ25cIilcbiAgLCBub3JtYWxpemVPcHRzICAgPSByZXF1aXJlKFwiZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnNcIilcbiAgLCBjb250YWlucyAgICAgICAgPSByZXF1aXJlKFwiZXM1LWV4dC9zdHJpbmcvIy9jb250YWluc1wiKTtcblxudmFyIGQgPSAobW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHNjciwgdmFsdWUvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCB3LCBvcHRpb25zLCBkZXNjO1xuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIgfHwgdHlwZW9mIGRzY3IgIT09IFwic3RyaW5nXCIpIHtcblx0XHRvcHRpb25zID0gdmFsdWU7XG5cdFx0dmFsdWUgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbMl07XG5cdH1cblx0aWYgKGlzVmFsdWUoZHNjcikpIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCBcImNcIik7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgXCJlXCIpO1xuXHRcdHcgPSBjb250YWlucy5jYWxsKGRzY3IsIFwid1wiKTtcblx0fSBlbHNlIHtcblx0XHRjID0gdyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9XG5cblx0ZGVzYyA9IHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUsIHdyaXRhYmxlOiB3IH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59KTtcblxuZC5ncyA9IGZ1bmN0aW9uIChkc2NyLCBnZXQsIHNldC8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICh0eXBlb2YgZHNjciAhPT0gXCJzdHJpbmdcIikge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gZ2V0O1xuXHRcdGdldCA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1szXTtcblx0fVxuXHRpZiAoIWlzVmFsdWUoZ2V0KSkge1xuXHRcdGdldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNQbGFpbkZ1bmN0aW9uKGdldCkpIHtcblx0XHRvcHRpb25zID0gZ2V0O1xuXHRcdGdldCA9IHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNWYWx1ZShzZXQpKSB7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc1BsYWluRnVuY3Rpb24oc2V0KSkge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9XG5cdGlmIChpc1ZhbHVlKGRzY3IpKSB7XG5cdFx0YyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgXCJjXCIpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsIFwiZVwiKTtcblx0fSBlbHNlIHtcblx0XHRjID0gdHJ1ZTtcblx0XHRlID0gZmFsc2U7XG5cdH1cblxuXHRkZXNjID0geyBnZXQ6IGdldCwgc2V0OiBzZXQsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcbiIsInZhciBhYnMgPSByZXF1aXJlKCdhYnMtc3ZnLXBhdGgnKVxudmFyIG5vcm1hbGl6ZSA9IHJlcXVpcmUoJ25vcm1hbGl6ZS1zdmctcGF0aCcpXG5cbnZhciBtZXRob2RzID0ge1xuICAnTSc6ICdtb3ZlVG8nLFxuICAnQyc6ICdiZXppZXJDdXJ2ZVRvJ1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbnRleHQsIHNlZ21lbnRzKSB7XG4gIGNvbnRleHQuYmVnaW5QYXRoKClcblxuICAvLyBNYWtlIHBhdGggZWFzeSB0byByZXByb2R1Y2UuXG4gIG5vcm1hbGl6ZShhYnMoc2VnbWVudHMpKS5mb3JFYWNoKFxuICAgIGZ1bmN0aW9uKHNlZ21lbnQpIHtcbiAgICAgIHZhciBjb21tYW5kID0gc2VnbWVudFswXVxuICAgICAgdmFyIGFyZ3MgPSBzZWdtZW50LnNsaWNlKDEpXG5cbiAgICAgIC8vIENvbnZlcnQgdGhlIHBhdGggY29tbWFuZCB0byBhIGNvbnRleHQgbWV0aG9kLlxuICAgICAgY29udGV4dFttZXRob2RzW2NvbW1hbmRdXS5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgIH1cbiAgKVxuXG4gIGNvbnRleHQuY2xvc2VQYXRoKClcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBlYXJjdXQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZWFyY3V0O1xuXG5mdW5jdGlvbiBlYXJjdXQoZGF0YSwgaG9sZUluZGljZXMsIGRpbSkge1xuXG4gICAgZGltID0gZGltIHx8IDI7XG5cbiAgICB2YXIgaGFzSG9sZXMgPSBob2xlSW5kaWNlcyAmJiBob2xlSW5kaWNlcy5sZW5ndGgsXG4gICAgICAgIG91dGVyTGVuID0gaGFzSG9sZXMgPyBob2xlSW5kaWNlc1swXSAqIGRpbSA6IGRhdGEubGVuZ3RoLFxuICAgICAgICBvdXRlck5vZGUgPSBsaW5rZWRMaXN0KGRhdGEsIDAsIG91dGVyTGVuLCBkaW0sIHRydWUpLFxuICAgICAgICB0cmlhbmdsZXMgPSBbXTtcblxuICAgIGlmICghb3V0ZXJOb2RlIHx8IG91dGVyTm9kZS5uZXh0ID09PSBvdXRlck5vZGUucHJldikgcmV0dXJuIHRyaWFuZ2xlcztcblxuICAgIHZhciBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZLCB4LCB5LCBpbnZTaXplO1xuXG4gICAgaWYgKGhhc0hvbGVzKSBvdXRlck5vZGUgPSBlbGltaW5hdGVIb2xlcyhkYXRhLCBob2xlSW5kaWNlcywgb3V0ZXJOb2RlLCBkaW0pO1xuXG4gICAgLy8gaWYgdGhlIHNoYXBlIGlzIG5vdCB0b28gc2ltcGxlLCB3ZSdsbCB1c2Ugei1vcmRlciBjdXJ2ZSBoYXNoIGxhdGVyOyBjYWxjdWxhdGUgcG9seWdvbiBiYm94XG4gICAgaWYgKGRhdGEubGVuZ3RoID4gODAgKiBkaW0pIHtcbiAgICAgICAgbWluWCA9IG1heFggPSBkYXRhWzBdO1xuICAgICAgICBtaW5ZID0gbWF4WSA9IGRhdGFbMV07XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IGRpbTsgaSA8IG91dGVyTGVuOyBpICs9IGRpbSkge1xuICAgICAgICAgICAgeCA9IGRhdGFbaV07XG4gICAgICAgICAgICB5ID0gZGF0YVtpICsgMV07XG4gICAgICAgICAgICBpZiAoeCA8IG1pblgpIG1pblggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPCBtaW5ZKSBtaW5ZID0geTtcbiAgICAgICAgICAgIGlmICh4ID4gbWF4WCkgbWF4WCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA+IG1heFkpIG1heFkgPSB5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWluWCwgbWluWSBhbmQgaW52U2l6ZSBhcmUgbGF0ZXIgdXNlZCB0byB0cmFuc2Zvcm0gY29vcmRzIGludG8gaW50ZWdlcnMgZm9yIHotb3JkZXIgY2FsY3VsYXRpb25cbiAgICAgICAgaW52U2l6ZSA9IE1hdGgubWF4KG1heFggLSBtaW5YLCBtYXhZIC0gbWluWSk7XG4gICAgICAgIGludlNpemUgPSBpbnZTaXplICE9PSAwID8gMSAvIGludlNpemUgOiAwO1xuICAgIH1cblxuICAgIGVhcmN1dExpbmtlZChvdXRlck5vZGUsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBpbnZTaXplKTtcblxuICAgIHJldHVybiB0cmlhbmdsZXM7XG59XG5cbi8vIGNyZWF0ZSBhIGNpcmN1bGFyIGRvdWJseSBsaW5rZWQgbGlzdCBmcm9tIHBvbHlnb24gcG9pbnRzIGluIHRoZSBzcGVjaWZpZWQgd2luZGluZyBvcmRlclxuZnVuY3Rpb24gbGlua2VkTGlzdChkYXRhLCBzdGFydCwgZW5kLCBkaW0sIGNsb2Nrd2lzZSkge1xuICAgIHZhciBpLCBsYXN0O1xuXG4gICAgaWYgKGNsb2Nrd2lzZSA9PT0gKHNpZ25lZEFyZWEoZGF0YSwgc3RhcnQsIGVuZCwgZGltKSA+IDApKSB7XG4gICAgICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IGRpbSkgbGFzdCA9IGluc2VydE5vZGUoaSwgZGF0YVtpXSwgZGF0YVtpICsgMV0sIGxhc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSA9IGVuZCAtIGRpbTsgaSA+PSBzdGFydDsgaSAtPSBkaW0pIGxhc3QgPSBpbnNlcnROb2RlKGksIGRhdGFbaV0sIGRhdGFbaSArIDFdLCBsYXN0KTtcbiAgICB9XG5cbiAgICBpZiAobGFzdCAmJiBlcXVhbHMobGFzdCwgbGFzdC5uZXh0KSkge1xuICAgICAgICByZW1vdmVOb2RlKGxhc3QpO1xuICAgICAgICBsYXN0ID0gbGFzdC5uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0O1xufVxuXG4vLyBlbGltaW5hdGUgY29saW5lYXIgb3IgZHVwbGljYXRlIHBvaW50c1xuZnVuY3Rpb24gZmlsdGVyUG9pbnRzKHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAoIXN0YXJ0KSByZXR1cm4gc3RhcnQ7XG4gICAgaWYgKCFlbmQpIGVuZCA9IHN0YXJ0O1xuXG4gICAgdmFyIHAgPSBzdGFydCxcbiAgICAgICAgYWdhaW47XG4gICAgZG8ge1xuICAgICAgICBhZ2FpbiA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghcC5zdGVpbmVyICYmIChlcXVhbHMocCwgcC5uZXh0KSB8fCBhcmVhKHAucHJldiwgcCwgcC5uZXh0KSA9PT0gMCkpIHtcbiAgICAgICAgICAgIHJlbW92ZU5vZGUocCk7XG4gICAgICAgICAgICBwID0gZW5kID0gcC5wcmV2O1xuICAgICAgICAgICAgaWYgKHAgPT09IHAubmV4dCkgYnJlYWs7XG4gICAgICAgICAgICBhZ2FpbiA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHAgPSBwLm5leHQ7XG4gICAgICAgIH1cbiAgICB9IHdoaWxlIChhZ2FpbiB8fCBwICE9PSBlbmQpO1xuXG4gICAgcmV0dXJuIGVuZDtcbn1cblxuLy8gbWFpbiBlYXIgc2xpY2luZyBsb29wIHdoaWNoIHRyaWFuZ3VsYXRlcyBhIHBvbHlnb24gKGdpdmVuIGFzIGEgbGlua2VkIGxpc3QpXG5mdW5jdGlvbiBlYXJjdXRMaW5rZWQoZWFyLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgaW52U2l6ZSwgcGFzcykge1xuICAgIGlmICghZWFyKSByZXR1cm47XG5cbiAgICAvLyBpbnRlcmxpbmsgcG9seWdvbiBub2RlcyBpbiB6LW9yZGVyXG4gICAgaWYgKCFwYXNzICYmIGludlNpemUpIGluZGV4Q3VydmUoZWFyLCBtaW5YLCBtaW5ZLCBpbnZTaXplKTtcblxuICAgIHZhciBzdG9wID0gZWFyLFxuICAgICAgICBwcmV2LCBuZXh0O1xuXG4gICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGVhcnMsIHNsaWNpbmcgdGhlbSBvbmUgYnkgb25lXG4gICAgd2hpbGUgKGVhci5wcmV2ICE9PSBlYXIubmV4dCkge1xuICAgICAgICBwcmV2ID0gZWFyLnByZXY7XG4gICAgICAgIG5leHQgPSBlYXIubmV4dDtcblxuICAgICAgICBpZiAoaW52U2l6ZSA/IGlzRWFySGFzaGVkKGVhciwgbWluWCwgbWluWSwgaW52U2l6ZSkgOiBpc0VhcihlYXIpKSB7XG4gICAgICAgICAgICAvLyBjdXQgb2ZmIHRoZSB0cmlhbmdsZVxuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2gocHJldi5pIC8gZGltKTtcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKGVhci5pIC8gZGltKTtcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKG5leHQuaSAvIGRpbSk7XG5cbiAgICAgICAgICAgIHJlbW92ZU5vZGUoZWFyKTtcblxuICAgICAgICAgICAgLy8gc2tpcHBpbmcgdGhlIG5leHQgdmVydGV4IGxlYWRzIHRvIGxlc3Mgc2xpdmVyIHRyaWFuZ2xlc1xuICAgICAgICAgICAgZWFyID0gbmV4dC5uZXh0O1xuICAgICAgICAgICAgc3RvcCA9IG5leHQubmV4dDtcblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBlYXIgPSBuZXh0O1xuXG4gICAgICAgIC8vIGlmIHdlIGxvb3BlZCB0aHJvdWdoIHRoZSB3aG9sZSByZW1haW5pbmcgcG9seWdvbiBhbmQgY2FuJ3QgZmluZCBhbnkgbW9yZSBlYXJzXG4gICAgICAgIGlmIChlYXIgPT09IHN0b3ApIHtcbiAgICAgICAgICAgIC8vIHRyeSBmaWx0ZXJpbmcgcG9pbnRzIGFuZCBzbGljaW5nIGFnYWluXG4gICAgICAgICAgICBpZiAoIXBhc3MpIHtcbiAgICAgICAgICAgICAgICBlYXJjdXRMaW5rZWQoZmlsdGVyUG9pbnRzKGVhciksIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBpbnZTaXplLCAxKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBkaWRuJ3Qgd29yaywgdHJ5IGN1cmluZyBhbGwgc21hbGwgc2VsZi1pbnRlcnNlY3Rpb25zIGxvY2FsbHlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFzcyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGVhciA9IGN1cmVMb2NhbEludGVyc2VjdGlvbnMoZmlsdGVyUG9pbnRzKGVhciksIHRyaWFuZ2xlcywgZGltKTtcbiAgICAgICAgICAgICAgICBlYXJjdXRMaW5rZWQoZWFyLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgaW52U2l6ZSwgMik7XG5cbiAgICAgICAgICAgIC8vIGFzIGEgbGFzdCByZXNvcnQsIHRyeSBzcGxpdHRpbmcgdGhlIHJlbWFpbmluZyBwb2x5Z29uIGludG8gdHdvXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhc3MgPT09IDIpIHtcbiAgICAgICAgICAgICAgICBzcGxpdEVhcmN1dChlYXIsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBpbnZTaXplKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIGNoZWNrIHdoZXRoZXIgYSBwb2x5Z29uIG5vZGUgZm9ybXMgYSB2YWxpZCBlYXIgd2l0aCBhZGphY2VudCBub2Rlc1xuZnVuY3Rpb24gaXNFYXIoZWFyKSB7XG4gICAgdmFyIGEgPSBlYXIucHJldixcbiAgICAgICAgYiA9IGVhcixcbiAgICAgICAgYyA9IGVhci5uZXh0O1xuXG4gICAgaWYgKGFyZWEoYSwgYiwgYykgPj0gMCkgcmV0dXJuIGZhbHNlOyAvLyByZWZsZXgsIGNhbid0IGJlIGFuIGVhclxuXG4gICAgLy8gbm93IG1ha2Ugc3VyZSB3ZSBkb24ndCBoYXZlIG90aGVyIHBvaW50cyBpbnNpZGUgdGhlIHBvdGVudGlhbCBlYXJcbiAgICB2YXIgcCA9IGVhci5uZXh0Lm5leHQ7XG5cbiAgICB3aGlsZSAocCAhPT0gZWFyLnByZXYpIHtcbiAgICAgICAgaWYgKHBvaW50SW5UcmlhbmdsZShhLngsIGEueSwgYi54LCBiLnksIGMueCwgYy55LCBwLngsIHAueSkgJiZcbiAgICAgICAgICAgIGFyZWEocC5wcmV2LCBwLCBwLm5leHQpID49IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNFYXJIYXNoZWQoZWFyLCBtaW5YLCBtaW5ZLCBpbnZTaXplKSB7XG4gICAgdmFyIGEgPSBlYXIucHJldixcbiAgICAgICAgYiA9IGVhcixcbiAgICAgICAgYyA9IGVhci5uZXh0O1xuXG4gICAgaWYgKGFyZWEoYSwgYiwgYykgPj0gMCkgcmV0dXJuIGZhbHNlOyAvLyByZWZsZXgsIGNhbid0IGJlIGFuIGVhclxuXG4gICAgLy8gdHJpYW5nbGUgYmJveDsgbWluICYgbWF4IGFyZSBjYWxjdWxhdGVkIGxpa2UgdGhpcyBmb3Igc3BlZWRcbiAgICB2YXIgbWluVFggPSBhLnggPCBiLnggPyAoYS54IDwgYy54ID8gYS54IDogYy54KSA6IChiLnggPCBjLnggPyBiLnggOiBjLngpLFxuICAgICAgICBtaW5UWSA9IGEueSA8IGIueSA/IChhLnkgPCBjLnkgPyBhLnkgOiBjLnkpIDogKGIueSA8IGMueSA/IGIueSA6IGMueSksXG4gICAgICAgIG1heFRYID0gYS54ID4gYi54ID8gKGEueCA+IGMueCA/IGEueCA6IGMueCkgOiAoYi54ID4gYy54ID8gYi54IDogYy54KSxcbiAgICAgICAgbWF4VFkgPSBhLnkgPiBiLnkgPyAoYS55ID4gYy55ID8gYS55IDogYy55KSA6IChiLnkgPiBjLnkgPyBiLnkgOiBjLnkpO1xuXG4gICAgLy8gei1vcmRlciByYW5nZSBmb3IgdGhlIGN1cnJlbnQgdHJpYW5nbGUgYmJveDtcbiAgICB2YXIgbWluWiA9IHpPcmRlcihtaW5UWCwgbWluVFksIG1pblgsIG1pblksIGludlNpemUpLFxuICAgICAgICBtYXhaID0gek9yZGVyKG1heFRYLCBtYXhUWSwgbWluWCwgbWluWSwgaW52U2l6ZSk7XG5cbiAgICB2YXIgcCA9IGVhci5wcmV2WixcbiAgICAgICAgbiA9IGVhci5uZXh0WjtcblxuICAgIC8vIGxvb2sgZm9yIHBvaW50cyBpbnNpZGUgdGhlIHRyaWFuZ2xlIGluIGJvdGggZGlyZWN0aW9uc1xuICAgIHdoaWxlIChwICYmIHAueiA+PSBtaW5aICYmIG4gJiYgbi56IDw9IG1heFopIHtcbiAgICAgICAgaWYgKHAgIT09IGVhci5wcmV2ICYmIHAgIT09IGVhci5uZXh0ICYmXG4gICAgICAgICAgICBwb2ludEluVHJpYW5nbGUoYS54LCBhLnksIGIueCwgYi55LCBjLngsIGMueSwgcC54LCBwLnkpICYmXG4gICAgICAgICAgICBhcmVhKHAucHJldiwgcCwgcC5uZXh0KSA+PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHAgPSBwLnByZXZaO1xuXG4gICAgICAgIGlmIChuICE9PSBlYXIucHJldiAmJiBuICE9PSBlYXIubmV4dCAmJlxuICAgICAgICAgICAgcG9pbnRJblRyaWFuZ2xlKGEueCwgYS55LCBiLngsIGIueSwgYy54LCBjLnksIG4ueCwgbi55KSAmJlxuICAgICAgICAgICAgYXJlYShuLnByZXYsIG4sIG4ubmV4dCkgPj0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBuID0gbi5uZXh0WjtcbiAgICB9XG5cbiAgICAvLyBsb29rIGZvciByZW1haW5pbmcgcG9pbnRzIGluIGRlY3JlYXNpbmcgei1vcmRlclxuICAgIHdoaWxlIChwICYmIHAueiA+PSBtaW5aKSB7XG4gICAgICAgIGlmIChwICE9PSBlYXIucHJldiAmJiBwICE9PSBlYXIubmV4dCAmJlxuICAgICAgICAgICAgcG9pbnRJblRyaWFuZ2xlKGEueCwgYS55LCBiLngsIGIueSwgYy54LCBjLnksIHAueCwgcC55KSAmJlxuICAgICAgICAgICAgYXJlYShwLnByZXYsIHAsIHAubmV4dCkgPj0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBwID0gcC5wcmV2WjtcbiAgICB9XG5cbiAgICAvLyBsb29rIGZvciByZW1haW5pbmcgcG9pbnRzIGluIGluY3JlYXNpbmcgei1vcmRlclxuICAgIHdoaWxlIChuICYmIG4ueiA8PSBtYXhaKSB7XG4gICAgICAgIGlmIChuICE9PSBlYXIucHJldiAmJiBuICE9PSBlYXIubmV4dCAmJlxuICAgICAgICAgICAgcG9pbnRJblRyaWFuZ2xlKGEueCwgYS55LCBiLngsIGIueSwgYy54LCBjLnksIG4ueCwgbi55KSAmJlxuICAgICAgICAgICAgYXJlYShuLnByZXYsIG4sIG4ubmV4dCkgPj0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBuID0gbi5uZXh0WjtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gZ28gdGhyb3VnaCBhbGwgcG9seWdvbiBub2RlcyBhbmQgY3VyZSBzbWFsbCBsb2NhbCBzZWxmLWludGVyc2VjdGlvbnNcbmZ1bmN0aW9uIGN1cmVMb2NhbEludGVyc2VjdGlvbnMoc3RhcnQsIHRyaWFuZ2xlcywgZGltKSB7XG4gICAgdmFyIHAgPSBzdGFydDtcbiAgICBkbyB7XG4gICAgICAgIHZhciBhID0gcC5wcmV2LFxuICAgICAgICAgICAgYiA9IHAubmV4dC5uZXh0O1xuXG4gICAgICAgIGlmICghZXF1YWxzKGEsIGIpICYmIGludGVyc2VjdHMoYSwgcCwgcC5uZXh0LCBiKSAmJiBsb2NhbGx5SW5zaWRlKGEsIGIpICYmIGxvY2FsbHlJbnNpZGUoYiwgYSkpIHtcblxuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goYS5pIC8gZGltKTtcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKHAuaSAvIGRpbSk7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChiLmkgLyBkaW0pO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdHdvIG5vZGVzIGludm9sdmVkXG4gICAgICAgICAgICByZW1vdmVOb2RlKHApO1xuICAgICAgICAgICAgcmVtb3ZlTm9kZShwLm5leHQpO1xuXG4gICAgICAgICAgICBwID0gc3RhcnQgPSBiO1xuICAgICAgICB9XG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgfSB3aGlsZSAocCAhPT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIGZpbHRlclBvaW50cyhwKTtcbn1cblxuLy8gdHJ5IHNwbGl0dGluZyBwb2x5Z29uIGludG8gdHdvIGFuZCB0cmlhbmd1bGF0ZSB0aGVtIGluZGVwZW5kZW50bHlcbmZ1bmN0aW9uIHNwbGl0RWFyY3V0KHN0YXJ0LCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgaW52U2l6ZSkge1xuICAgIC8vIGxvb2sgZm9yIGEgdmFsaWQgZGlhZ29uYWwgdGhhdCBkaXZpZGVzIHRoZSBwb2x5Z29uIGludG8gdHdvXG4gICAgdmFyIGEgPSBzdGFydDtcbiAgICBkbyB7XG4gICAgICAgIHZhciBiID0gYS5uZXh0Lm5leHQ7XG4gICAgICAgIHdoaWxlIChiICE9PSBhLnByZXYpIHtcbiAgICAgICAgICAgIGlmIChhLmkgIT09IGIuaSAmJiBpc1ZhbGlkRGlhZ29uYWwoYSwgYikpIHtcbiAgICAgICAgICAgICAgICAvLyBzcGxpdCB0aGUgcG9seWdvbiBpbiB0d28gYnkgdGhlIGRpYWdvbmFsXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBzcGxpdFBvbHlnb24oYSwgYik7XG5cbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIgY29saW5lYXIgcG9pbnRzIGFyb3VuZCB0aGUgY3V0c1xuICAgICAgICAgICAgICAgIGEgPSBmaWx0ZXJQb2ludHMoYSwgYS5uZXh0KTtcbiAgICAgICAgICAgICAgICBjID0gZmlsdGVyUG9pbnRzKGMsIGMubmV4dCk7XG5cbiAgICAgICAgICAgICAgICAvLyBydW4gZWFyY3V0IG9uIGVhY2ggaGFsZlxuICAgICAgICAgICAgICAgIGVhcmN1dExpbmtlZChhLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgaW52U2l6ZSk7XG4gICAgICAgICAgICAgICAgZWFyY3V0TGlua2VkKGMsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBpbnZTaXplKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiID0gYi5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGEgPSBhLm5leHQ7XG4gICAgfSB3aGlsZSAoYSAhPT0gc3RhcnQpO1xufVxuXG4vLyBsaW5rIGV2ZXJ5IGhvbGUgaW50byB0aGUgb3V0ZXIgbG9vcCwgcHJvZHVjaW5nIGEgc2luZ2xlLXJpbmcgcG9seWdvbiB3aXRob3V0IGhvbGVzXG5mdW5jdGlvbiBlbGltaW5hdGVIb2xlcyhkYXRhLCBob2xlSW5kaWNlcywgb3V0ZXJOb2RlLCBkaW0pIHtcbiAgICB2YXIgcXVldWUgPSBbXSxcbiAgICAgICAgaSwgbGVuLCBzdGFydCwgZW5kLCBsaXN0O1xuXG4gICAgZm9yIChpID0gMCwgbGVuID0gaG9sZUluZGljZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgc3RhcnQgPSBob2xlSW5kaWNlc1tpXSAqIGRpbTtcbiAgICAgICAgZW5kID0gaSA8IGxlbiAtIDEgPyBob2xlSW5kaWNlc1tpICsgMV0gKiBkaW0gOiBkYXRhLmxlbmd0aDtcbiAgICAgICAgbGlzdCA9IGxpbmtlZExpc3QoZGF0YSwgc3RhcnQsIGVuZCwgZGltLCBmYWxzZSk7XG4gICAgICAgIGlmIChsaXN0ID09PSBsaXN0Lm5leHQpIGxpc3Quc3RlaW5lciA9IHRydWU7XG4gICAgICAgIHF1ZXVlLnB1c2goZ2V0TGVmdG1vc3QobGlzdCkpO1xuICAgIH1cblxuICAgIHF1ZXVlLnNvcnQoY29tcGFyZVgpO1xuXG4gICAgLy8gcHJvY2VzcyBob2xlcyBmcm9tIGxlZnQgdG8gcmlnaHRcbiAgICBmb3IgKGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZWxpbWluYXRlSG9sZShxdWV1ZVtpXSwgb3V0ZXJOb2RlKTtcbiAgICAgICAgb3V0ZXJOb2RlID0gZmlsdGVyUG9pbnRzKG91dGVyTm9kZSwgb3V0ZXJOb2RlLm5leHQpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRlck5vZGU7XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVYKGEsIGIpIHtcbiAgICByZXR1cm4gYS54IC0gYi54O1xufVxuXG4vLyBmaW5kIGEgYnJpZGdlIGJldHdlZW4gdmVydGljZXMgdGhhdCBjb25uZWN0cyBob2xlIHdpdGggYW4gb3V0ZXIgcmluZyBhbmQgYW5kIGxpbmsgaXRcbmZ1bmN0aW9uIGVsaW1pbmF0ZUhvbGUoaG9sZSwgb3V0ZXJOb2RlKSB7XG4gICAgb3V0ZXJOb2RlID0gZmluZEhvbGVCcmlkZ2UoaG9sZSwgb3V0ZXJOb2RlKTtcbiAgICBpZiAob3V0ZXJOb2RlKSB7XG4gICAgICAgIHZhciBiID0gc3BsaXRQb2x5Z29uKG91dGVyTm9kZSwgaG9sZSk7XG5cbiAgICAgICAgLy8gZmlsdGVyIGNvbGxpbmVhciBwb2ludHMgYXJvdW5kIHRoZSBjdXRzXG4gICAgICAgIGZpbHRlclBvaW50cyhvdXRlck5vZGUsIG91dGVyTm9kZS5uZXh0KTtcbiAgICAgICAgZmlsdGVyUG9pbnRzKGIsIGIubmV4dCk7XG4gICAgfVxufVxuXG4vLyBEYXZpZCBFYmVybHkncyBhbGdvcml0aG0gZm9yIGZpbmRpbmcgYSBicmlkZ2UgYmV0d2VlbiBob2xlIGFuZCBvdXRlciBwb2x5Z29uXG5mdW5jdGlvbiBmaW5kSG9sZUJyaWRnZShob2xlLCBvdXRlck5vZGUpIHtcbiAgICB2YXIgcCA9IG91dGVyTm9kZSxcbiAgICAgICAgaHggPSBob2xlLngsXG4gICAgICAgIGh5ID0gaG9sZS55LFxuICAgICAgICBxeCA9IC1JbmZpbml0eSxcbiAgICAgICAgbTtcblxuICAgIC8vIGZpbmQgYSBzZWdtZW50IGludGVyc2VjdGVkIGJ5IGEgcmF5IGZyb20gdGhlIGhvbGUncyBsZWZ0bW9zdCBwb2ludCB0byB0aGUgbGVmdDtcbiAgICAvLyBzZWdtZW50J3MgZW5kcG9pbnQgd2l0aCBsZXNzZXIgeCB3aWxsIGJlIHBvdGVudGlhbCBjb25uZWN0aW9uIHBvaW50XG4gICAgZG8ge1xuICAgICAgICBpZiAoaHkgPD0gcC55ICYmIGh5ID49IHAubmV4dC55ICYmIHAubmV4dC55ICE9PSBwLnkpIHtcbiAgICAgICAgICAgIHZhciB4ID0gcC54ICsgKGh5IC0gcC55KSAqIChwLm5leHQueCAtIHAueCkgLyAocC5uZXh0LnkgLSBwLnkpO1xuICAgICAgICAgICAgaWYgKHggPD0gaHggJiYgeCA+IHF4KSB7XG4gICAgICAgICAgICAgICAgcXggPSB4O1xuICAgICAgICAgICAgICAgIGlmICh4ID09PSBoeCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaHkgPT09IHAueSkgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoeSA9PT0gcC5uZXh0LnkpIHJldHVybiBwLm5leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG0gPSBwLnggPCBwLm5leHQueCA/IHAgOiBwLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9IHdoaWxlIChwICE9PSBvdXRlck5vZGUpO1xuXG4gICAgaWYgKCFtKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChoeCA9PT0gcXgpIHJldHVybiBtOyAvLyBob2xlIHRvdWNoZXMgb3V0ZXIgc2VnbWVudDsgcGljayBsZWZ0bW9zdCBlbmRwb2ludFxuXG4gICAgLy8gbG9vayBmb3IgcG9pbnRzIGluc2lkZSB0aGUgdHJpYW5nbGUgb2YgaG9sZSBwb2ludCwgc2VnbWVudCBpbnRlcnNlY3Rpb24gYW5kIGVuZHBvaW50O1xuICAgIC8vIGlmIHRoZXJlIGFyZSBubyBwb2ludHMgZm91bmQsIHdlIGhhdmUgYSB2YWxpZCBjb25uZWN0aW9uO1xuICAgIC8vIG90aGVyd2lzZSBjaG9vc2UgdGhlIHBvaW50IG9mIHRoZSBtaW5pbXVtIGFuZ2xlIHdpdGggdGhlIHJheSBhcyBjb25uZWN0aW9uIHBvaW50XG5cbiAgICB2YXIgc3RvcCA9IG0sXG4gICAgICAgIG14ID0gbS54LFxuICAgICAgICBteSA9IG0ueSxcbiAgICAgICAgdGFuTWluID0gSW5maW5pdHksXG4gICAgICAgIHRhbjtcblxuICAgIHAgPSBtO1xuXG4gICAgZG8ge1xuICAgICAgICBpZiAoaHggPj0gcC54ICYmIHAueCA+PSBteCAmJiBoeCAhPT0gcC54ICYmXG4gICAgICAgICAgICAgICAgcG9pbnRJblRyaWFuZ2xlKGh5IDwgbXkgPyBoeCA6IHF4LCBoeSwgbXgsIG15LCBoeSA8IG15ID8gcXggOiBoeCwgaHksIHAueCwgcC55KSkge1xuXG4gICAgICAgICAgICB0YW4gPSBNYXRoLmFicyhoeSAtIHAueSkgLyAoaHggLSBwLngpOyAvLyB0YW5nZW50aWFsXG5cbiAgICAgICAgICAgIGlmIChsb2NhbGx5SW5zaWRlKHAsIGhvbGUpICYmXG4gICAgICAgICAgICAgICAgKHRhbiA8IHRhbk1pbiB8fCAodGFuID09PSB0YW5NaW4gJiYgKHAueCA+IG0ueCB8fCAocC54ID09PSBtLnggJiYgc2VjdG9yQ29udGFpbnNTZWN0b3IobSwgcCkpKSkpKSB7XG4gICAgICAgICAgICAgICAgbSA9IHA7XG4gICAgICAgICAgICAgICAgdGFuTWluID0gdGFuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9IHdoaWxlIChwICE9PSBzdG9wKTtcblxuICAgIHJldHVybiBtO1xufVxuXG4vLyB3aGV0aGVyIHNlY3RvciBpbiB2ZXJ0ZXggbSBjb250YWlucyBzZWN0b3IgaW4gdmVydGV4IHAgaW4gdGhlIHNhbWUgY29vcmRpbmF0ZXNcbmZ1bmN0aW9uIHNlY3RvckNvbnRhaW5zU2VjdG9yKG0sIHApIHtcbiAgICByZXR1cm4gYXJlYShtLnByZXYsIG0sIHAucHJldikgPCAwICYmIGFyZWEocC5uZXh0LCBtLCBtLm5leHQpIDwgMDtcbn1cblxuLy8gaW50ZXJsaW5rIHBvbHlnb24gbm9kZXMgaW4gei1vcmRlclxuZnVuY3Rpb24gaW5kZXhDdXJ2ZShzdGFydCwgbWluWCwgbWluWSwgaW52U2l6ZSkge1xuICAgIHZhciBwID0gc3RhcnQ7XG4gICAgZG8ge1xuICAgICAgICBpZiAocC56ID09PSBudWxsKSBwLnogPSB6T3JkZXIocC54LCBwLnksIG1pblgsIG1pblksIGludlNpemUpO1xuICAgICAgICBwLnByZXZaID0gcC5wcmV2O1xuICAgICAgICBwLm5leHRaID0gcC5uZXh0O1xuICAgICAgICBwID0gcC5uZXh0O1xuICAgIH0gd2hpbGUgKHAgIT09IHN0YXJ0KTtcblxuICAgIHAucHJldloubmV4dFogPSBudWxsO1xuICAgIHAucHJldlogPSBudWxsO1xuXG4gICAgc29ydExpbmtlZChwKTtcbn1cblxuLy8gU2ltb24gVGF0aGFtJ3MgbGlua2VkIGxpc3QgbWVyZ2Ugc29ydCBhbGdvcml0aG1cbi8vIGh0dHA6Ly93d3cuY2hpYXJrLmdyZWVuZW5kLm9yZy51ay9+c2d0YXRoYW0vYWxnb3JpdGhtcy9saXN0c29ydC5odG1sXG5mdW5jdGlvbiBzb3J0TGlua2VkKGxpc3QpIHtcbiAgICB2YXIgaSwgcCwgcSwgZSwgdGFpbCwgbnVtTWVyZ2VzLCBwU2l6ZSwgcVNpemUsXG4gICAgICAgIGluU2l6ZSA9IDE7XG5cbiAgICBkbyB7XG4gICAgICAgIHAgPSBsaXN0O1xuICAgICAgICBsaXN0ID0gbnVsbDtcbiAgICAgICAgdGFpbCA9IG51bGw7XG4gICAgICAgIG51bU1lcmdlcyA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHApIHtcbiAgICAgICAgICAgIG51bU1lcmdlcysrO1xuICAgICAgICAgICAgcSA9IHA7XG4gICAgICAgICAgICBwU2l6ZSA9IDA7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5TaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwU2l6ZSsrO1xuICAgICAgICAgICAgICAgIHEgPSBxLm5leHRaO1xuICAgICAgICAgICAgICAgIGlmICghcSkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxU2l6ZSA9IGluU2l6ZTtcblxuICAgICAgICAgICAgd2hpbGUgKHBTaXplID4gMCB8fCAocVNpemUgPiAwICYmIHEpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAocFNpemUgIT09IDAgJiYgKHFTaXplID09PSAwIHx8ICFxIHx8IHAueiA8PSBxLnopKSB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBwO1xuICAgICAgICAgICAgICAgICAgICBwID0gcC5uZXh0WjtcbiAgICAgICAgICAgICAgICAgICAgcFNpemUtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlID0gcTtcbiAgICAgICAgICAgICAgICAgICAgcSA9IHEubmV4dFo7XG4gICAgICAgICAgICAgICAgICAgIHFTaXplLS07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRhaWwpIHRhaWwubmV4dFogPSBlO1xuICAgICAgICAgICAgICAgIGVsc2UgbGlzdCA9IGU7XG5cbiAgICAgICAgICAgICAgICBlLnByZXZaID0gdGFpbDtcbiAgICAgICAgICAgICAgICB0YWlsID0gZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcCA9IHE7XG4gICAgICAgIH1cblxuICAgICAgICB0YWlsLm5leHRaID0gbnVsbDtcbiAgICAgICAgaW5TaXplICo9IDI7XG5cbiAgICB9IHdoaWxlIChudW1NZXJnZXMgPiAxKTtcblxuICAgIHJldHVybiBsaXN0O1xufVxuXG4vLyB6LW9yZGVyIG9mIGEgcG9pbnQgZ2l2ZW4gY29vcmRzIGFuZCBpbnZlcnNlIG9mIHRoZSBsb25nZXIgc2lkZSBvZiBkYXRhIGJib3hcbmZ1bmN0aW9uIHpPcmRlcih4LCB5LCBtaW5YLCBtaW5ZLCBpbnZTaXplKSB7XG4gICAgLy8gY29vcmRzIGFyZSB0cmFuc2Zvcm1lZCBpbnRvIG5vbi1uZWdhdGl2ZSAxNS1iaXQgaW50ZWdlciByYW5nZVxuICAgIHggPSAzMjc2NyAqICh4IC0gbWluWCkgKiBpbnZTaXplO1xuICAgIHkgPSAzMjc2NyAqICh5IC0gbWluWSkgKiBpbnZTaXplO1xuXG4gICAgeCA9ICh4IHwgKHggPDwgOCkpICYgMHgwMEZGMDBGRjtcbiAgICB4ID0gKHggfCAoeCA8PCA0KSkgJiAweDBGMEYwRjBGO1xuICAgIHggPSAoeCB8ICh4IDw8IDIpKSAmIDB4MzMzMzMzMzM7XG4gICAgeCA9ICh4IHwgKHggPDwgMSkpICYgMHg1NTU1NTU1NTtcblxuICAgIHkgPSAoeSB8ICh5IDw8IDgpKSAmIDB4MDBGRjAwRkY7XG4gICAgeSA9ICh5IHwgKHkgPDwgNCkpICYgMHgwRjBGMEYwRjtcbiAgICB5ID0gKHkgfCAoeSA8PCAyKSkgJiAweDMzMzMzMzMzO1xuICAgIHkgPSAoeSB8ICh5IDw8IDEpKSAmIDB4NTU1NTU1NTU7XG5cbiAgICByZXR1cm4geCB8ICh5IDw8IDEpO1xufVxuXG4vLyBmaW5kIHRoZSBsZWZ0bW9zdCBub2RlIG9mIGEgcG9seWdvbiByaW5nXG5mdW5jdGlvbiBnZXRMZWZ0bW9zdChzdGFydCkge1xuICAgIHZhciBwID0gc3RhcnQsXG4gICAgICAgIGxlZnRtb3N0ID0gc3RhcnQ7XG4gICAgZG8ge1xuICAgICAgICBpZiAocC54IDwgbGVmdG1vc3QueCB8fCAocC54ID09PSBsZWZ0bW9zdC54ICYmIHAueSA8IGxlZnRtb3N0LnkpKSBsZWZ0bW9zdCA9IHA7XG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgfSB3aGlsZSAocCAhPT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIGxlZnRtb3N0O1xufVxuXG4vLyBjaGVjayBpZiBhIHBvaW50IGxpZXMgd2l0aGluIGEgY29udmV4IHRyaWFuZ2xlXG5mdW5jdGlvbiBwb2ludEluVHJpYW5nbGUoYXgsIGF5LCBieCwgYnksIGN4LCBjeSwgcHgsIHB5KSB7XG4gICAgcmV0dXJuIChjeCAtIHB4KSAqIChheSAtIHB5KSAtIChheCAtIHB4KSAqIChjeSAtIHB5KSA+PSAwICYmXG4gICAgICAgICAgIChheCAtIHB4KSAqIChieSAtIHB5KSAtIChieCAtIHB4KSAqIChheSAtIHB5KSA+PSAwICYmXG4gICAgICAgICAgIChieCAtIHB4KSAqIChjeSAtIHB5KSAtIChjeCAtIHB4KSAqIChieSAtIHB5KSA+PSAwO1xufVxuXG4vLyBjaGVjayBpZiBhIGRpYWdvbmFsIGJldHdlZW4gdHdvIHBvbHlnb24gbm9kZXMgaXMgdmFsaWQgKGxpZXMgaW4gcG9seWdvbiBpbnRlcmlvcilcbmZ1bmN0aW9uIGlzVmFsaWREaWFnb25hbChhLCBiKSB7XG4gICAgcmV0dXJuIGEubmV4dC5pICE9PSBiLmkgJiYgYS5wcmV2LmkgIT09IGIuaSAmJiAhaW50ZXJzZWN0c1BvbHlnb24oYSwgYikgJiYgLy8gZG9uZXMndCBpbnRlcnNlY3Qgb3RoZXIgZWRnZXNcbiAgICAgICAgICAgKGxvY2FsbHlJbnNpZGUoYSwgYikgJiYgbG9jYWxseUluc2lkZShiLCBhKSAmJiBtaWRkbGVJbnNpZGUoYSwgYikgJiYgLy8gbG9jYWxseSB2aXNpYmxlXG4gICAgICAgICAgICAoYXJlYShhLnByZXYsIGEsIGIucHJldikgfHwgYXJlYShhLCBiLnByZXYsIGIpKSB8fCAvLyBkb2VzIG5vdCBjcmVhdGUgb3Bwb3NpdGUtZmFjaW5nIHNlY3RvcnNcbiAgICAgICAgICAgIGVxdWFscyhhLCBiKSAmJiBhcmVhKGEucHJldiwgYSwgYS5uZXh0KSA+IDAgJiYgYXJlYShiLnByZXYsIGIsIGIubmV4dCkgPiAwKTsgLy8gc3BlY2lhbCB6ZXJvLWxlbmd0aCBjYXNlXG59XG5cbi8vIHNpZ25lZCBhcmVhIG9mIGEgdHJpYW5nbGVcbmZ1bmN0aW9uIGFyZWEocCwgcSwgcikge1xuICAgIHJldHVybiAocS55IC0gcC55KSAqIChyLnggLSBxLngpIC0gKHEueCAtIHAueCkgKiAoci55IC0gcS55KTtcbn1cblxuLy8gY2hlY2sgaWYgdHdvIHBvaW50cyBhcmUgZXF1YWxcbmZ1bmN0aW9uIGVxdWFscyhwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEueCA9PT0gcDIueCAmJiBwMS55ID09PSBwMi55O1xufVxuXG4vLyBjaGVjayBpZiB0d28gc2VnbWVudHMgaW50ZXJzZWN0XG5mdW5jdGlvbiBpbnRlcnNlY3RzKHAxLCBxMSwgcDIsIHEyKSB7XG4gICAgdmFyIG8xID0gc2lnbihhcmVhKHAxLCBxMSwgcDIpKTtcbiAgICB2YXIgbzIgPSBzaWduKGFyZWEocDEsIHExLCBxMikpO1xuICAgIHZhciBvMyA9IHNpZ24oYXJlYShwMiwgcTIsIHAxKSk7XG4gICAgdmFyIG80ID0gc2lnbihhcmVhKHAyLCBxMiwgcTEpKTtcblxuICAgIGlmIChvMSAhPT0gbzIgJiYgbzMgIT09IG80KSByZXR1cm4gdHJ1ZTsgLy8gZ2VuZXJhbCBjYXNlXG5cbiAgICBpZiAobzEgPT09IDAgJiYgb25TZWdtZW50KHAxLCBwMiwgcTEpKSByZXR1cm4gdHJ1ZTsgLy8gcDEsIHExIGFuZCBwMiBhcmUgY29sbGluZWFyIGFuZCBwMiBsaWVzIG9uIHAxcTFcbiAgICBpZiAobzIgPT09IDAgJiYgb25TZWdtZW50KHAxLCBxMiwgcTEpKSByZXR1cm4gdHJ1ZTsgLy8gcDEsIHExIGFuZCBxMiBhcmUgY29sbGluZWFyIGFuZCBxMiBsaWVzIG9uIHAxcTFcbiAgICBpZiAobzMgPT09IDAgJiYgb25TZWdtZW50KHAyLCBwMSwgcTIpKSByZXR1cm4gdHJ1ZTsgLy8gcDIsIHEyIGFuZCBwMSBhcmUgY29sbGluZWFyIGFuZCBwMSBsaWVzIG9uIHAycTJcbiAgICBpZiAobzQgPT09IDAgJiYgb25TZWdtZW50KHAyLCBxMSwgcTIpKSByZXR1cm4gdHJ1ZTsgLy8gcDIsIHEyIGFuZCBxMSBhcmUgY29sbGluZWFyIGFuZCBxMSBsaWVzIG9uIHAycTJcblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy8gZm9yIGNvbGxpbmVhciBwb2ludHMgcCwgcSwgciwgY2hlY2sgaWYgcG9pbnQgcSBsaWVzIG9uIHNlZ21lbnQgcHJcbmZ1bmN0aW9uIG9uU2VnbWVudChwLCBxLCByKSB7XG4gICAgcmV0dXJuIHEueCA8PSBNYXRoLm1heChwLngsIHIueCkgJiYgcS54ID49IE1hdGgubWluKHAueCwgci54KSAmJiBxLnkgPD0gTWF0aC5tYXgocC55LCByLnkpICYmIHEueSA+PSBNYXRoLm1pbihwLnksIHIueSk7XG59XG5cbmZ1bmN0aW9uIHNpZ24obnVtKSB7XG4gICAgcmV0dXJuIG51bSA+IDAgPyAxIDogbnVtIDwgMCA/IC0xIDogMDtcbn1cblxuLy8gY2hlY2sgaWYgYSBwb2x5Z29uIGRpYWdvbmFsIGludGVyc2VjdHMgYW55IHBvbHlnb24gc2VnbWVudHNcbmZ1bmN0aW9uIGludGVyc2VjdHNQb2x5Z29uKGEsIGIpIHtcbiAgICB2YXIgcCA9IGE7XG4gICAgZG8ge1xuICAgICAgICBpZiAocC5pICE9PSBhLmkgJiYgcC5uZXh0LmkgIT09IGEuaSAmJiBwLmkgIT09IGIuaSAmJiBwLm5leHQuaSAhPT0gYi5pICYmXG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0cyhwLCBwLm5leHQsIGEsIGIpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9IHdoaWxlIChwICE9PSBhKTtcblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy8gY2hlY2sgaWYgYSBwb2x5Z29uIGRpYWdvbmFsIGlzIGxvY2FsbHkgaW5zaWRlIHRoZSBwb2x5Z29uXG5mdW5jdGlvbiBsb2NhbGx5SW5zaWRlKGEsIGIpIHtcbiAgICByZXR1cm4gYXJlYShhLnByZXYsIGEsIGEubmV4dCkgPCAwID9cbiAgICAgICAgYXJlYShhLCBiLCBhLm5leHQpID49IDAgJiYgYXJlYShhLCBhLnByZXYsIGIpID49IDAgOlxuICAgICAgICBhcmVhKGEsIGIsIGEucHJldikgPCAwIHx8IGFyZWEoYSwgYS5uZXh0LCBiKSA8IDA7XG59XG5cbi8vIGNoZWNrIGlmIHRoZSBtaWRkbGUgcG9pbnQgb2YgYSBwb2x5Z29uIGRpYWdvbmFsIGlzIGluc2lkZSB0aGUgcG9seWdvblxuZnVuY3Rpb24gbWlkZGxlSW5zaWRlKGEsIGIpIHtcbiAgICB2YXIgcCA9IGEsXG4gICAgICAgIGluc2lkZSA9IGZhbHNlLFxuICAgICAgICBweCA9IChhLnggKyBiLngpIC8gMixcbiAgICAgICAgcHkgPSAoYS55ICsgYi55KSAvIDI7XG4gICAgZG8ge1xuICAgICAgICBpZiAoKChwLnkgPiBweSkgIT09IChwLm5leHQueSA+IHB5KSkgJiYgcC5uZXh0LnkgIT09IHAueSAmJlxuICAgICAgICAgICAgICAgIChweCA8IChwLm5leHQueCAtIHAueCkgKiAocHkgLSBwLnkpIC8gKHAubmV4dC55IC0gcC55KSArIHAueCkpXG4gICAgICAgICAgICBpbnNpZGUgPSAhaW5zaWRlO1xuICAgICAgICBwID0gcC5uZXh0O1xuICAgIH0gd2hpbGUgKHAgIT09IGEpO1xuXG4gICAgcmV0dXJuIGluc2lkZTtcbn1cblxuLy8gbGluayB0d28gcG9seWdvbiB2ZXJ0aWNlcyB3aXRoIGEgYnJpZGdlOyBpZiB0aGUgdmVydGljZXMgYmVsb25nIHRvIHRoZSBzYW1lIHJpbmcsIGl0IHNwbGl0cyBwb2x5Z29uIGludG8gdHdvO1xuLy8gaWYgb25lIGJlbG9uZ3MgdG8gdGhlIG91dGVyIHJpbmcgYW5kIGFub3RoZXIgdG8gYSBob2xlLCBpdCBtZXJnZXMgaXQgaW50byBhIHNpbmdsZSByaW5nXG5mdW5jdGlvbiBzcGxpdFBvbHlnb24oYSwgYikge1xuICAgIHZhciBhMiA9IG5ldyBOb2RlKGEuaSwgYS54LCBhLnkpLFxuICAgICAgICBiMiA9IG5ldyBOb2RlKGIuaSwgYi54LCBiLnkpLFxuICAgICAgICBhbiA9IGEubmV4dCxcbiAgICAgICAgYnAgPSBiLnByZXY7XG5cbiAgICBhLm5leHQgPSBiO1xuICAgIGIucHJldiA9IGE7XG5cbiAgICBhMi5uZXh0ID0gYW47XG4gICAgYW4ucHJldiA9IGEyO1xuXG4gICAgYjIubmV4dCA9IGEyO1xuICAgIGEyLnByZXYgPSBiMjtcblxuICAgIGJwLm5leHQgPSBiMjtcbiAgICBiMi5wcmV2ID0gYnA7XG5cbiAgICByZXR1cm4gYjI7XG59XG5cbi8vIGNyZWF0ZSBhIG5vZGUgYW5kIG9wdGlvbmFsbHkgbGluayBpdCB3aXRoIHByZXZpb3VzIG9uZSAoaW4gYSBjaXJjdWxhciBkb3VibHkgbGlua2VkIGxpc3QpXG5mdW5jdGlvbiBpbnNlcnROb2RlKGksIHgsIHksIGxhc3QpIHtcbiAgICB2YXIgcCA9IG5ldyBOb2RlKGksIHgsIHkpO1xuXG4gICAgaWYgKCFsYXN0KSB7XG4gICAgICAgIHAucHJldiA9IHA7XG4gICAgICAgIHAubmV4dCA9IHA7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBwLm5leHQgPSBsYXN0Lm5leHQ7XG4gICAgICAgIHAucHJldiA9IGxhc3Q7XG4gICAgICAgIGxhc3QubmV4dC5wcmV2ID0gcDtcbiAgICAgICAgbGFzdC5uZXh0ID0gcDtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5vZGUocCkge1xuICAgIHAubmV4dC5wcmV2ID0gcC5wcmV2O1xuICAgIHAucHJldi5uZXh0ID0gcC5uZXh0O1xuXG4gICAgaWYgKHAucHJldlopIHAucHJldloubmV4dFogPSBwLm5leHRaO1xuICAgIGlmIChwLm5leHRaKSBwLm5leHRaLnByZXZaID0gcC5wcmV2Wjtcbn1cblxuZnVuY3Rpb24gTm9kZShpLCB4LCB5KSB7XG4gICAgLy8gdmVydGV4IGluZGV4IGluIGNvb3JkaW5hdGVzIGFycmF5XG4gICAgdGhpcy5pID0gaTtcblxuICAgIC8vIHZlcnRleCBjb29yZGluYXRlc1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIC8vIHByZXZpb3VzIGFuZCBuZXh0IHZlcnRleCBub2RlcyBpbiBhIHBvbHlnb24gcmluZ1xuICAgIHRoaXMucHJldiA9IG51bGw7XG4gICAgdGhpcy5uZXh0ID0gbnVsbDtcblxuICAgIC8vIHotb3JkZXIgY3VydmUgdmFsdWVcbiAgICB0aGlzLnogPSBudWxsO1xuXG4gICAgLy8gcHJldmlvdXMgYW5kIG5leHQgbm9kZXMgaW4gei1vcmRlclxuICAgIHRoaXMucHJldlogPSBudWxsO1xuICAgIHRoaXMubmV4dFogPSBudWxsO1xuXG4gICAgLy8gaW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBpcyBhIHN0ZWluZXIgcG9pbnRcbiAgICB0aGlzLnN0ZWluZXIgPSBmYWxzZTtcbn1cblxuLy8gcmV0dXJuIGEgcGVyY2VudGFnZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHBvbHlnb24gYXJlYSBhbmQgaXRzIHRyaWFuZ3VsYXRpb24gYXJlYTtcbi8vIHVzZWQgdG8gdmVyaWZ5IGNvcnJlY3RuZXNzIG9mIHRyaWFuZ3VsYXRpb25cbmVhcmN1dC5kZXZpYXRpb24gPSBmdW5jdGlvbiAoZGF0YSwgaG9sZUluZGljZXMsIGRpbSwgdHJpYW5nbGVzKSB7XG4gICAgdmFyIGhhc0hvbGVzID0gaG9sZUluZGljZXMgJiYgaG9sZUluZGljZXMubGVuZ3RoO1xuICAgIHZhciBvdXRlckxlbiA9IGhhc0hvbGVzID8gaG9sZUluZGljZXNbMF0gKiBkaW0gOiBkYXRhLmxlbmd0aDtcblxuICAgIHZhciBwb2x5Z29uQXJlYSA9IE1hdGguYWJzKHNpZ25lZEFyZWEoZGF0YSwgMCwgb3V0ZXJMZW4sIGRpbSkpO1xuICAgIGlmIChoYXNIb2xlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gaG9sZUluZGljZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGhvbGVJbmRpY2VzW2ldICogZGltO1xuICAgICAgICAgICAgdmFyIGVuZCA9IGkgPCBsZW4gLSAxID8gaG9sZUluZGljZXNbaSArIDFdICogZGltIDogZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICBwb2x5Z29uQXJlYSAtPSBNYXRoLmFicyhzaWduZWRBcmVhKGRhdGEsIHN0YXJ0LCBlbmQsIGRpbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHRyaWFuZ2xlc0FyZWEgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0cmlhbmdsZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgdmFyIGEgPSB0cmlhbmdsZXNbaV0gKiBkaW07XG4gICAgICAgIHZhciBiID0gdHJpYW5nbGVzW2kgKyAxXSAqIGRpbTtcbiAgICAgICAgdmFyIGMgPSB0cmlhbmdsZXNbaSArIDJdICogZGltO1xuICAgICAgICB0cmlhbmdsZXNBcmVhICs9IE1hdGguYWJzKFxuICAgICAgICAgICAgKGRhdGFbYV0gLSBkYXRhW2NdKSAqIChkYXRhW2IgKyAxXSAtIGRhdGFbYSArIDFdKSAtXG4gICAgICAgICAgICAoZGF0YVthXSAtIGRhdGFbYl0pICogKGRhdGFbYyArIDFdIC0gZGF0YVthICsgMV0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9seWdvbkFyZWEgPT09IDAgJiYgdHJpYW5nbGVzQXJlYSA9PT0gMCA/IDAgOlxuICAgICAgICBNYXRoLmFicygodHJpYW5nbGVzQXJlYSAtIHBvbHlnb25BcmVhKSAvIHBvbHlnb25BcmVhKTtcbn07XG5cbmZ1bmN0aW9uIHNpZ25lZEFyZWEoZGF0YSwgc3RhcnQsIGVuZCwgZGltKSB7XG4gICAgdmFyIHN1bSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0LCBqID0gZW5kIC0gZGltOyBpIDwgZW5kOyBpICs9IGRpbSkge1xuICAgICAgICBzdW0gKz0gKGRhdGFbal0gLSBkYXRhW2ldKSAqIChkYXRhW2kgKyAxXSArIGRhdGFbaiArIDFdKTtcbiAgICAgICAgaiA9IGk7XG4gICAgfVxuICAgIHJldHVybiBzdW07XG59XG5cbi8vIHR1cm4gYSBwb2x5Z29uIGluIGEgbXVsdGktZGltZW5zaW9uYWwgYXJyYXkgZm9ybSAoZS5nLiBhcyBpbiBHZW9KU09OKSBpbnRvIGEgZm9ybSBFYXJjdXQgYWNjZXB0c1xuZWFyY3V0LmZsYXR0ZW4gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBkaW0gPSBkYXRhWzBdWzBdLmxlbmd0aCxcbiAgICAgICAgcmVzdWx0ID0ge3ZlcnRpY2VzOiBbXSwgaG9sZXM6IFtdLCBkaW1lbnNpb25zOiBkaW19LFxuICAgICAgICBob2xlSW5kZXggPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgZm9yICh2YXIgZCA9IDA7IGQgPCBkaW07IGQrKykgcmVzdWx0LnZlcnRpY2VzLnB1c2goZGF0YVtpXVtqXVtkXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICBob2xlSW5kZXggKz0gZGF0YVtpIC0gMV0ubGVuZ3RoO1xuICAgICAgICAgICAgcmVzdWx0LmhvbGVzLnB1c2goaG9sZUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIEluc3BpcmVkIGJ5IEdvb2dsZSBDbG9zdXJlOlxuLy8gaHR0cDovL2Nsb3N1cmUtbGlicmFyeS5nb29nbGVjb2RlLmNvbS9zdm4vZG9jcy9cbi8vIGNsb3N1cmVfZ29vZ19hcnJheV9hcnJheS5qcy5odG1sI2dvb2cuYXJyYXkuY2xlYXJcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB2YWx1ZSA9IHJlcXVpcmUoXCIuLi8uLi9vYmplY3QvdmFsaWQtdmFsdWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YWx1ZSh0aGlzKS5sZW5ndGggPSAwO1xuXHRyZXR1cm4gdGhpcztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpID8gQXJyYXkuZnJvbSA6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBmcm9tID0gQXJyYXkuZnJvbSwgYXJyLCByZXN1bHQ7XG5cdGlmICh0eXBlb2YgZnJvbSAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG5cdGFyciA9IFtcInJhelwiLCBcImR3YVwiXTtcblx0cmVzdWx0ID0gZnJvbShhcnIpO1xuXHRyZXR1cm4gQm9vbGVhbihyZXN1bHQgJiYgcmVzdWx0ICE9PSBhcnIgJiYgcmVzdWx0WzFdID09PSBcImR3YVwiKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGl0ZXJhdG9yU3ltYm9sID0gcmVxdWlyZShcImVzNi1zeW1ib2xcIikuaXRlcmF0b3JcbiAgLCBpc0FyZ3VtZW50cyAgICA9IHJlcXVpcmUoXCIuLi8uLi9mdW5jdGlvbi9pcy1hcmd1bWVudHNcIilcbiAgLCBpc0Z1bmN0aW9uICAgICA9IHJlcXVpcmUoXCIuLi8uLi9mdW5jdGlvbi9pcy1mdW5jdGlvblwiKVxuICAsIHRvUG9zSW50ICAgICAgID0gcmVxdWlyZShcIi4uLy4uL251bWJlci90by1wb3MtaW50ZWdlclwiKVxuICAsIGNhbGxhYmxlICAgICAgID0gcmVxdWlyZShcIi4uLy4uL29iamVjdC92YWxpZC1jYWxsYWJsZVwiKVxuICAsIHZhbGlkVmFsdWUgICAgID0gcmVxdWlyZShcIi4uLy4uL29iamVjdC92YWxpZC12YWx1ZVwiKVxuICAsIGlzVmFsdWUgICAgICAgID0gcmVxdWlyZShcIi4uLy4uL29iamVjdC9pcy12YWx1ZVwiKVxuICAsIGlzU3RyaW5nICAgICAgID0gcmVxdWlyZShcIi4uLy4uL3N0cmluZy9pcy1zdHJpbmdcIilcbiAgLCBpc0FycmF5ICAgICAgICA9IEFycmF5LmlzQXJyYXlcbiAgLCBjYWxsICAgICAgICAgICA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsXG4gICwgZGVzYyAgICAgICAgICAgPSB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlOiBudWxsIH1cbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHksIG1heC1saW5lcy1wZXItZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5TGlrZS8qLCBtYXBGbiwgdGhpc0FyZyovKSB7XG5cdHZhciBtYXBGbiA9IGFyZ3VtZW50c1sxXVxuXHQgICwgdGhpc0FyZyA9IGFyZ3VtZW50c1syXVxuXHQgICwgQ29udGV4dFxuXHQgICwgaVxuXHQgICwgalxuXHQgICwgYXJyXG5cdCAgLCBsZW5ndGhcblx0ICAsIGNvZGVcblx0ICAsIGl0ZXJhdG9yXG5cdCAgLCByZXN1bHRcblx0ICAsIGdldEl0ZXJhdG9yXG5cdCAgLCB2YWx1ZTtcblxuXHRhcnJheUxpa2UgPSBPYmplY3QodmFsaWRWYWx1ZShhcnJheUxpa2UpKTtcblxuXHRpZiAoaXNWYWx1ZShtYXBGbikpIGNhbGxhYmxlKG1hcEZuKTtcblx0aWYgKCF0aGlzIHx8IHRoaXMgPT09IEFycmF5IHx8ICFpc0Z1bmN0aW9uKHRoaXMpKSB7XG5cdFx0Ly8gUmVzdWx0OiBQbGFpbiBhcnJheVxuXHRcdGlmICghbWFwRm4pIHtcblx0XHRcdGlmIChpc0FyZ3VtZW50cyhhcnJheUxpa2UpKSB7XG5cdFx0XHRcdC8vIFNvdXJjZTogQXJndW1lbnRzXG5cdFx0XHRcdGxlbmd0aCA9IGFycmF5TGlrZS5sZW5ndGg7XG5cdFx0XHRcdGlmIChsZW5ndGggIT09IDEpIHJldHVybiBBcnJheS5hcHBseShudWxsLCBhcnJheUxpa2UpO1xuXHRcdFx0XHRhcnIgPSBuZXcgQXJyYXkoMSk7XG5cdFx0XHRcdGFyclswXSA9IGFycmF5TGlrZVswXTtcblx0XHRcdFx0cmV0dXJuIGFycjtcblx0XHRcdH1cblx0XHRcdGlmIChpc0FycmF5KGFycmF5TGlrZSkpIHtcblx0XHRcdFx0Ly8gU291cmNlOiBBcnJheVxuXHRcdFx0XHRhcnIgPSBuZXcgQXJyYXkoKGxlbmd0aCA9IGFycmF5TGlrZS5sZW5ndGgpKTtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSBhcnJbaV0gPSBhcnJheUxpa2VbaV07XG5cdFx0XHRcdHJldHVybiBhcnI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFyciA9IFtdO1xuXHR9IGVsc2Uge1xuXHRcdC8vIFJlc3VsdDogTm9uIHBsYWluIGFycmF5XG5cdFx0Q29udGV4dCA9IHRoaXM7XG5cdH1cblxuXHRpZiAoIWlzQXJyYXkoYXJyYXlMaWtlKSkge1xuXHRcdGlmICgoZ2V0SXRlcmF0b3IgPSBhcnJheUxpa2VbaXRlcmF0b3JTeW1ib2xdKSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBTb3VyY2U6IEl0ZXJhdG9yXG5cdFx0XHRpdGVyYXRvciA9IGNhbGxhYmxlKGdldEl0ZXJhdG9yKS5jYWxsKGFycmF5TGlrZSk7XG5cdFx0XHRpZiAoQ29udGV4dCkgYXJyID0gbmV3IENvbnRleHQoKTtcblx0XHRcdHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcblx0XHRcdGkgPSAwO1xuXHRcdFx0d2hpbGUgKCFyZXN1bHQuZG9uZSkge1xuXHRcdFx0XHR2YWx1ZSA9IG1hcEZuID8gY2FsbC5jYWxsKG1hcEZuLCB0aGlzQXJnLCByZXN1bHQudmFsdWUsIGkpIDogcmVzdWx0LnZhbHVlO1xuXHRcdFx0XHRpZiAoQ29udGV4dCkge1xuXHRcdFx0XHRcdGRlc2MudmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0XHRkZWZpbmVQcm9wZXJ0eShhcnIsIGksIGRlc2MpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFycltpXSA9IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcblx0XHRcdFx0KytpO1xuXHRcdFx0fVxuXHRcdFx0bGVuZ3RoID0gaTtcblx0XHR9IGVsc2UgaWYgKGlzU3RyaW5nKGFycmF5TGlrZSkpIHtcblx0XHRcdC8vIFNvdXJjZTogU3RyaW5nXG5cdFx0XHRsZW5ndGggPSBhcnJheUxpa2UubGVuZ3RoO1xuXHRcdFx0aWYgKENvbnRleHQpIGFyciA9IG5ldyBDb250ZXh0KCk7XG5cdFx0XHRmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdHZhbHVlID0gYXJyYXlMaWtlW2ldO1xuXHRcdFx0XHRpZiAoaSArIDEgPCBsZW5ndGgpIHtcblx0XHRcdFx0XHRjb2RlID0gdmFsdWUuY2hhckNvZGVBdCgwKTtcblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWRlcHRoXG5cdFx0XHRcdFx0aWYgKGNvZGUgPj0gMHhkODAwICYmIGNvZGUgPD0gMHhkYmZmKSB2YWx1ZSArPSBhcnJheUxpa2VbKytpXTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YWx1ZSA9IG1hcEZuID8gY2FsbC5jYWxsKG1hcEZuLCB0aGlzQXJnLCB2YWx1ZSwgaikgOiB2YWx1ZTtcblx0XHRcdFx0aWYgKENvbnRleHQpIHtcblx0XHRcdFx0XHRkZXNjLnZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0ZGVmaW5lUHJvcGVydHkoYXJyLCBqLCBkZXNjKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhcnJbal0gPSB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQrK2o7XG5cdFx0XHR9XG5cdFx0XHRsZW5ndGggPSBqO1xuXHRcdH1cblx0fVxuXHRpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcblx0XHQvLyBTb3VyY2U6IGFycmF5IG9yIGFycmF5LWxpa2Vcblx0XHRsZW5ndGggPSB0b1Bvc0ludChhcnJheUxpa2UubGVuZ3RoKTtcblx0XHRpZiAoQ29udGV4dCkgYXJyID0gbmV3IENvbnRleHQobGVuZ3RoKTtcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRcdHZhbHVlID0gbWFwRm4gPyBjYWxsLmNhbGwobWFwRm4sIHRoaXNBcmcsIGFycmF5TGlrZVtpXSwgaSkgOiBhcnJheUxpa2VbaV07XG5cdFx0XHRpZiAoQ29udGV4dCkge1xuXHRcdFx0XHRkZXNjLnZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdGRlZmluZVByb3BlcnR5KGFyciwgaSwgZGVzYyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhcnJbaV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aWYgKENvbnRleHQpIHtcblx0XHRkZXNjLnZhbHVlID0gbnVsbDtcblx0XHRhcnIubGVuZ3RoID0gbGVuZ3RoO1xuXHR9XG5cdHJldHVybiBhcnI7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvYmpUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbiAgLCBpZCA9IG9ialRvU3RyaW5nLmNhbGwoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSkoKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gaWQ7IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9ialRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuICAsIGlzRnVuY3Rpb25TdHJpbmdUYWcgPSBSZWdFeHAucHJvdG90eXBlLnRlc3QuYmluZCgvXltvYmplY3QgW0EtWmEtejAtOV0qRnVuY3Rpb25dJC8pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgJiYgaXNGdW5jdGlvblN0cmluZ1RhZyhvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eS1mdW5jdGlvblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7fTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2lzLWltcGxlbWVudGVkXCIpKCkgPyBNYXRoLnNpZ24gOiByZXF1aXJlKFwiLi9zaGltXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc2lnbiA9IE1hdGguc2lnbjtcblx0aWYgKHR5cGVvZiBzaWduICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuIHNpZ24oMTApID09PSAxICYmIHNpZ24oLTIwKSA9PT0gLTE7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblx0aWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gMCkgcmV0dXJuIHZhbHVlO1xuXHRyZXR1cm4gdmFsdWUgPiAwID8gMSA6IC0xO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc2lnbiAgPSByZXF1aXJlKFwiLi4vbWF0aC9zaWduXCIpXG4gICwgYWJzICAgPSBNYXRoLmFic1xuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKGlzTmFOKHZhbHVlKSkgcmV0dXJuIDA7XG5cdHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblx0aWYgKHZhbHVlID09PSAwIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcblx0cmV0dXJuIHNpZ24odmFsdWUpICogZmxvb3IoYWJzKHZhbHVlKSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKFwiLi90by1pbnRlZ2VyXCIpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXg7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBtYXgoMCwgdG9JbnRlZ2VyKHZhbHVlKSk7IH07XG4iLCIvLyBJbnRlcm5hbCBtZXRob2QsIHVzZWQgYnkgaXRlcmF0aW9uIGZ1bmN0aW9ucy5cbi8vIENhbGxzIGEgZnVuY3Rpb24gZm9yIGVhY2gga2V5LXZhbHVlIHBhaXIgZm91bmQgaW4gb2JqZWN0XG4vLyBPcHRpb25hbGx5IHRha2VzIGNvbXBhcmVGbiB0byBpdGVyYXRlIG9iamVjdCBpbiBzcGVjaWZpYyBvcmRlclxuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNhbGxhYmxlICAgICAgICAgICAgICAgID0gcmVxdWlyZShcIi4vdmFsaWQtY2FsbGFibGVcIilcbiAgLCB2YWx1ZSAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoXCIuL3ZhbGlkLXZhbHVlXCIpXG4gICwgYmluZCAgICAgICAgICAgICAgICAgICAgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuICAsIGNhbGwgICAgICAgICAgICAgICAgICAgID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGxcbiAgLCBrZXlzICAgICAgICAgICAgICAgICAgICA9IE9iamVjdC5rZXlzXG4gICwgb2JqUHJvcGVydHlJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtZXRob2QsIGRlZlZhbCkge1xuXHRyZXR1cm4gZnVuY3Rpb24gKG9iaiwgY2IvKiwgdGhpc0FyZywgY29tcGFyZUZuKi8pIHtcblx0XHR2YXIgbGlzdCwgdGhpc0FyZyA9IGFyZ3VtZW50c1syXSwgY29tcGFyZUZuID0gYXJndW1lbnRzWzNdO1xuXHRcdG9iaiA9IE9iamVjdCh2YWx1ZShvYmopKTtcblx0XHRjYWxsYWJsZShjYik7XG5cblx0XHRsaXN0ID0ga2V5cyhvYmopO1xuXHRcdGlmIChjb21wYXJlRm4pIHtcblx0XHRcdGxpc3Quc29ydCh0eXBlb2YgY29tcGFyZUZuID09PSBcImZ1bmN0aW9uXCIgPyBiaW5kLmNhbGwoY29tcGFyZUZuLCBvYmopIDogdW5kZWZpbmVkKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBtZXRob2QgIT09IFwiZnVuY3Rpb25cIikgbWV0aG9kID0gbGlzdFttZXRob2RdO1xuXHRcdHJldHVybiBjYWxsLmNhbGwobWV0aG9kLCBsaXN0LCBmdW5jdGlvbiAoa2V5LCBpbmRleCkge1xuXHRcdFx0aWYgKCFvYmpQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwga2V5KSkgcmV0dXJuIGRlZlZhbDtcblx0XHRcdHJldHVybiBjYWxsLmNhbGwoY2IsIHRoaXNBcmcsIG9ialtrZXldLCBrZXksIG9iaiwgaW5kZXgpO1xuXHRcdH0pO1xuXHR9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2lzLWltcGxlbWVudGVkXCIpKCkgPyBPYmplY3QuYXNzaWduIDogcmVxdWlyZShcIi4vc2hpbVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24sIG9iajtcblx0aWYgKHR5cGVvZiBhc3NpZ24gIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXHRvYmogPSB7IGZvbzogXCJyYXpcIiB9O1xuXHRhc3NpZ24ob2JqLCB7IGJhcjogXCJkd2FcIiB9LCB7IHRyenk6IFwidHJ6eVwiIH0pO1xuXHRyZXR1cm4gb2JqLmZvbyArIG9iai5iYXIgKyBvYmoudHJ6eSA9PT0gXCJyYXpkd2F0cnp5XCI7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrZXlzICA9IHJlcXVpcmUoXCIuLi9rZXlzXCIpXG4gICwgdmFsdWUgPSByZXF1aXJlKFwiLi4vdmFsaWQtdmFsdWVcIilcbiAgLCBtYXggICA9IE1hdGgubWF4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkZXN0LCBzcmMvKiwg4oCmc3JjbiovKSB7XG5cdHZhciBlcnJvciwgaSwgbGVuZ3RoID0gbWF4KGFyZ3VtZW50cy5sZW5ndGgsIDIpLCBhc3NpZ247XG5cdGRlc3QgPSBPYmplY3QodmFsdWUoZGVzdCkpO1xuXHRhc3NpZ24gPSBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dHJ5IHtcblx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZTtcblx0XHR9XG5cdH07XG5cdGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdHNyYyA9IGFyZ3VtZW50c1tpXTtcblx0XHRrZXlzKHNyYykuZm9yRWFjaChhc3NpZ24pO1xuXHR9XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBlcnJvcjtcblx0cmV0dXJuIGRlc3Q7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhRnJvbSAgPSByZXF1aXJlKFwiLi4vYXJyYXkvZnJvbVwiKVxuICAsIGFzc2lnbiA9IHJlcXVpcmUoXCIuL2Fzc2lnblwiKVxuICAsIHZhbHVlICA9IHJlcXVpcmUoXCIuL3ZhbGlkLXZhbHVlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmovKiwgcHJvcGVydHlOYW1lcywgb3B0aW9ucyovKSB7XG5cdHZhciBjb3B5ID0gT2JqZWN0KHZhbHVlKG9iaikpLCBwcm9wZXJ0eU5hbWVzID0gYXJndW1lbnRzWzFdLCBvcHRpb25zID0gT2JqZWN0KGFyZ3VtZW50c1syXSk7XG5cdGlmIChjb3B5ICE9PSBvYmogJiYgIXByb3BlcnR5TmFtZXMpIHJldHVybiBjb3B5O1xuXHR2YXIgcmVzdWx0ID0ge307XG5cdGlmIChwcm9wZXJ0eU5hbWVzKSB7XG5cdFx0YUZyb20ocHJvcGVydHlOYW1lcywgZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuXHRcdFx0aWYgKG9wdGlvbnMuZW5zdXJlIHx8IHByb3BlcnR5TmFtZSBpbiBvYmopIHJlc3VsdFtwcm9wZXJ0eU5hbWVdID0gb2JqW3Byb3BlcnR5TmFtZV07XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0YXNzaWduKHJlc3VsdCwgb2JqKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIFdvcmthcm91bmQgZm9yIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTI4MDRcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjcmVhdGUgPSBPYmplY3QuY3JlYXRlLCBzaGltO1xuXG5pZiAoIXJlcXVpcmUoXCIuL3NldC1wcm90b3R5cGUtb2YvaXMtaW1wbGVtZW50ZWRcIikoKSkge1xuXHRzaGltID0gcmVxdWlyZShcIi4vc2V0LXByb3RvdHlwZS1vZi9zaGltXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBudWxsT2JqZWN0LCBwb2x5UHJvcHMsIGRlc2M7XG5cdGlmICghc2hpbSkgcmV0dXJuIGNyZWF0ZTtcblx0aWYgKHNoaW0ubGV2ZWwgIT09IDEpIHJldHVybiBjcmVhdGU7XG5cblx0bnVsbE9iamVjdCA9IHt9O1xuXHRwb2x5UHJvcHMgPSB7fTtcblx0ZGVzYyA9IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogdW5kZWZpbmVkIH07XG5cdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE9iamVjdC5wcm90b3R5cGUpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRpZiAobmFtZSA9PT0gXCJfX3Byb3RvX19cIikge1xuXHRcdFx0cG9seVByb3BzW25hbWVdID0ge1xuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRcdFx0dmFsdWU6IHVuZGVmaW5lZFxuXHRcdFx0fTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0cG9seVByb3BzW25hbWVdID0gZGVzYztcblx0fSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG51bGxPYmplY3QsIHBvbHlQcm9wcyk7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHNoaW0sIFwibnVsbFBvbHlmaWxsXCIsIHtcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHR2YWx1ZTogbnVsbE9iamVjdFxuXHR9KTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKHByb3RvdHlwZSwgcHJvcHMpIHtcblx0XHRyZXR1cm4gY3JlYXRlKHByb3RvdHlwZSA9PT0gbnVsbCA/IG51bGxPYmplY3QgOiBwcm90b3R5cGUsIHByb3BzKTtcblx0fTtcbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9faXRlcmF0ZVwiKShcImZvckVhY2hcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzVmFsdWUgPSByZXF1aXJlKFwiLi9pcy12YWx1ZVwiKTtcblxudmFyIG1hcCA9IHsgZnVuY3Rpb246IHRydWUsIG9iamVjdDogdHJ1ZSB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gKGlzVmFsdWUodmFsdWUpICYmIG1hcFt0eXBlb2YgdmFsdWVdKSB8fCBmYWxzZTsgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3VuZGVmaW5lZCA9IHJlcXVpcmUoXCIuLi9mdW5jdGlvbi9ub29wXCIpKCk7IC8vIFN1cHBvcnQgRVMzIGVuZ2luZXNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsKSB7IHJldHVybiB2YWwgIT09IF91bmRlZmluZWQgJiYgdmFsICE9PSBudWxsOyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKSA/IE9iamVjdC5rZXlzIDogcmVxdWlyZShcIi4vc2hpbVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRPYmplY3Qua2V5cyhcInByaW1pdGl2ZVwiKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuLi9pcy12YWx1ZVwiKTtcblxudmFyIGtleXMgPSBPYmplY3Qua2V5cztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBrZXlzKGlzVmFsdWUob2JqZWN0KSA/IE9iamVjdChvYmplY3QpIDogb2JqZWN0KTsgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY2FsbGFibGUgPSByZXF1aXJlKFwiLi92YWxpZC1jYWxsYWJsZVwiKVxuICAsIGZvckVhY2ggID0gcmVxdWlyZShcIi4vZm9yLWVhY2hcIilcbiAgLCBjYWxsICAgICA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIGNiLyosIHRoaXNBcmcqLykge1xuXHR2YXIgcmVzdWx0ID0ge30sIHRoaXNBcmcgPSBhcmd1bWVudHNbMl07XG5cdGNhbGxhYmxlKGNiKTtcblx0Zm9yRWFjaChvYmosIGZ1bmN0aW9uICh2YWx1ZSwga2V5LCB0YXJnZXRPYmosIGluZGV4KSB7XG5cdFx0cmVzdWx0W2tleV0gPSBjYWxsLmNhbGwoY2IsIHRoaXNBcmcsIHZhbHVlLCBrZXksIHRhcmdldE9iaiwgaW5kZXgpO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzVmFsdWUgPSByZXF1aXJlKFwiLi9pcy12YWx1ZVwiKTtcblxudmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCwgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxudmFyIHByb2Nlc3MgPSBmdW5jdGlvbiAoc3JjLCBvYmopIHtcblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gc3JjKSBvYmpba2V5XSA9IHNyY1trZXldO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRzMS8qLCDigKZvcHRpb25zKi8pIHtcblx0dmFyIHJlc3VsdCA9IGNyZWF0ZShudWxsKTtcblx0Zm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRpZiAoIWlzVmFsdWUob3B0aW9ucykpIHJldHVybjtcblx0XHRwcm9jZXNzKE9iamVjdChvcHRpb25zKSwgcmVzdWx0KTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKSA/IE9iamVjdC5zZXRQcm90b3R5cGVPZiA6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUsIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mLCBwbGFpbk9iamVjdCA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgvKiBDdXN0b21DcmVhdGUqLykge1xuXHR2YXIgc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YsIGN1c3RvbUNyZWF0ZSA9IGFyZ3VtZW50c1swXSB8fCBjcmVhdGU7XG5cdGlmICh0eXBlb2Ygc2V0UHJvdG90eXBlT2YgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXHRyZXR1cm4gZ2V0UHJvdG90eXBlT2Yoc2V0UHJvdG90eXBlT2YoY3VzdG9tQ3JlYXRlKG51bGwpLCBwbGFpbk9iamVjdCkpID09PSBwbGFpbk9iamVjdDtcbn07XG4iLCIvKiBlc2xpbnQgbm8tcHJvdG86IFwib2ZmXCIgKi9cblxuLy8gQmlnIHRoYW5rcyB0byBAV2ViUmVmbGVjdGlvbiBmb3Igc29ydGluZyB0aGlzIG91dFxuLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi81NTkzNTU0XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNPYmplY3QgICAgICAgICA9IHJlcXVpcmUoXCIuLi9pcy1vYmplY3RcIilcbiAgLCB2YWx1ZSAgICAgICAgICAgID0gcmVxdWlyZShcIi4uL3ZhbGlkLXZhbHVlXCIpXG4gICwgb2JqSXNQcm90b3R5cGVPZiA9IE9iamVjdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZlxuICAsIGRlZmluZVByb3BlcnR5ICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHlcbiAgLCBudWxsRGVzYyAgICAgICAgID0geyBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9XG4gICwgdmFsaWRhdGU7XG5cbnZhbGlkYXRlID0gZnVuY3Rpb24gKG9iaiwgcHJvdG90eXBlKSB7XG5cdHZhbHVlKG9iaik7XG5cdGlmIChwcm90b3R5cGUgPT09IG51bGwgfHwgaXNPYmplY3QocHJvdG90eXBlKSkgcmV0dXJuIG9iajtcblx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIlByb3RvdHlwZSBtdXN0IGJlIG51bGwgb3IgYW4gb2JqZWN0XCIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKHN0YXR1cykge1xuXHR2YXIgZm4sIHNldDtcblx0aWYgKCFzdGF0dXMpIHJldHVybiBudWxsO1xuXHRpZiAoc3RhdHVzLmxldmVsID09PSAyKSB7XG5cdFx0aWYgKHN0YXR1cy5zZXQpIHtcblx0XHRcdHNldCA9IHN0YXR1cy5zZXQ7XG5cdFx0XHRmbiA9IGZ1bmN0aW9uIChvYmosIHByb3RvdHlwZSkge1xuXHRcdFx0XHRzZXQuY2FsbCh2YWxpZGF0ZShvYmosIHByb3RvdHlwZSksIHByb3RvdHlwZSk7XG5cdFx0XHRcdHJldHVybiBvYmo7XG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmbiA9IGZ1bmN0aW9uIChvYmosIHByb3RvdHlwZSkge1xuXHRcdFx0XHR2YWxpZGF0ZShvYmosIHByb3RvdHlwZSkuX19wcm90b19fID0gcHJvdG90eXBlO1xuXHRcdFx0XHRyZXR1cm4gb2JqO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm4gPSBmdW5jdGlvbiBzZWxmKG9iaiwgcHJvdG90eXBlKSB7XG5cdFx0XHR2YXIgaXNOdWxsQmFzZTtcblx0XHRcdHZhbGlkYXRlKG9iaiwgcHJvdG90eXBlKTtcblx0XHRcdGlzTnVsbEJhc2UgPSBvYmpJc1Byb3RvdHlwZU9mLmNhbGwoc2VsZi5udWxsUG9seWZpbGwsIG9iaik7XG5cdFx0XHRpZiAoaXNOdWxsQmFzZSkgZGVsZXRlIHNlbGYubnVsbFBvbHlmaWxsLl9fcHJvdG9fXztcblx0XHRcdGlmIChwcm90b3R5cGUgPT09IG51bGwpIHByb3RvdHlwZSA9IHNlbGYubnVsbFBvbHlmaWxsO1xuXHRcdFx0b2JqLl9fcHJvdG9fXyA9IHByb3RvdHlwZTtcblx0XHRcdGlmIChpc051bGxCYXNlKSBkZWZpbmVQcm9wZXJ0eShzZWxmLm51bGxQb2x5ZmlsbCwgXCJfX3Byb3RvX19cIiwgbnVsbERlc2MpO1xuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9O1xuXHR9XG5cdHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwibGV2ZWxcIiwge1xuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdHZhbHVlOiBzdGF0dXMubGV2ZWxcblx0fSk7XG59KShcblx0KGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdG1wT2JqMSA9IE9iamVjdC5jcmVhdGUobnVsbClcblx0XHQgICwgdG1wT2JqMiA9IHt9XG5cdFx0ICAsIHNldFxuXHRcdCAgLCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QucHJvdG90eXBlLCBcIl9fcHJvdG9fX1wiKTtcblxuXHRcdGlmIChkZXNjKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRzZXQgPSBkZXNjLnNldDsgLy8gT3BlcmEgY3Jhc2hlcyBhdCB0aGlzIHBvaW50XG5cdFx0XHRcdHNldC5jYWxsKHRtcE9iajEsIHRtcE9iajIpO1xuXHRcdFx0fSBjYXRjaCAoaWdub3JlKSB7fVxuXHRcdFx0aWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZih0bXBPYmoxKSA9PT0gdG1wT2JqMikgcmV0dXJuIHsgc2V0OiBzZXQsIGxldmVsOiAyIH07XG5cdFx0fVxuXG5cdFx0dG1wT2JqMS5fX3Byb3RvX18gPSB0bXBPYmoyO1xuXHRcdGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YodG1wT2JqMSkgPT09IHRtcE9iajIpIHJldHVybiB7IGxldmVsOiAyIH07XG5cblx0XHR0bXBPYmoxID0ge307XG5cdFx0dG1wT2JqMS5fX3Byb3RvX18gPSB0bXBPYmoyO1xuXHRcdGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YodG1wT2JqMSkgPT09IHRtcE9iajIpIHJldHVybiB7IGxldmVsOiAxIH07XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pKClcbik7XG5cbnJlcXVpcmUoXCIuLi9jcmVhdGVcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4pIHtcblx0aWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG5cdHJldHVybiBmbjtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZShcIi4vaXMtb2JqZWN0XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRpZiAoIWlzT2JqZWN0KHZhbHVlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcih2YWx1ZSArIFwiIGlzIG5vdCBhbiBPYmplY3RcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzVmFsdWUgPSByZXF1aXJlKFwiLi9pcy12YWx1ZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKCFpc1ZhbHVlKHZhbHVlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgbnVsbCBvciB1bmRlZmluZWRcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpID8gU3RyaW5nLnByb3RvdHlwZS5jb250YWlucyA6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0ciA9IFwicmF6ZHdhdHJ6eVwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiBzdHIuY29udGFpbnMgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXHRyZXR1cm4gc3RyLmNvbnRhaW5zKFwiZHdhXCIpID09PSB0cnVlICYmIHN0ci5jb250YWlucyhcImZvb1wiKSA9PT0gZmFsc2U7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbmRleE9mID0gU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcvKiwgcG9zaXRpb24qLykge1xuXHRyZXR1cm4gaW5kZXhPZi5jYWxsKHRoaXMsIHNlYXJjaFN0cmluZywgYXJndW1lbnRzWzFdKSA+IC0xO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb2JqVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLCBpZCA9IG9ialRvU3RyaW5nLmNhbGwoXCJcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdHJldHVybiAoXG5cdFx0dHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8XG5cdFx0KHZhbHVlICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcblx0XHRcdCh2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZyB8fCBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gaWQpKSB8fFxuXHRcdGZhbHNlXG5cdCk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBnZW5lcmF0ZWQgPSBPYmplY3QuY3JlYXRlKG51bGwpLCByYW5kb20gPSBNYXRoLnJhbmRvbTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzdHI7XG5cdGRvIHtcblx0XHRzdHIgPSByYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMik7XG5cdH0gd2hpbGUgKGdlbmVyYXRlZFtzdHJdKTtcblx0cmV0dXJuIHN0cjtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcImVzNS1leHQvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIilcbiAgLCBjb250YWlucyAgICAgICA9IHJlcXVpcmUoXCJlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zXCIpXG4gICwgZCAgICAgICAgICAgICAgPSByZXF1aXJlKFwiZFwiKVxuICAsIFN5bWJvbCAgICAgICAgID0gcmVxdWlyZShcImVzNi1zeW1ib2xcIilcbiAgLCBJdGVyYXRvciAgICAgICA9IHJlcXVpcmUoXCIuL1wiKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5LCBBcnJheUl0ZXJhdG9yO1xuXG5BcnJheUl0ZXJhdG9yID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyLCBraW5kKSB7XG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBBcnJheUl0ZXJhdG9yKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNvbnN0cnVjdG9yIHJlcXVpcmVzICduZXcnXCIpO1xuXHRJdGVyYXRvci5jYWxsKHRoaXMsIGFycik7XG5cdGlmICgha2luZCkga2luZCA9IFwidmFsdWVcIjtcblx0ZWxzZSBpZiAoY29udGFpbnMuY2FsbChraW5kLCBcImtleSt2YWx1ZVwiKSkga2luZCA9IFwia2V5K3ZhbHVlXCI7XG5cdGVsc2UgaWYgKGNvbnRhaW5zLmNhbGwoa2luZCwgXCJrZXlcIikpIGtpbmQgPSBcImtleVwiO1xuXHRlbHNlIGtpbmQgPSBcInZhbHVlXCI7XG5cdGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX19raW5kX19cIiwgZChcIlwiLCBraW5kKSk7XG59O1xuaWYgKHNldFByb3RvdHlwZU9mKSBzZXRQcm90b3R5cGVPZihBcnJheUl0ZXJhdG9yLCBJdGVyYXRvcik7XG5cbi8vIEludGVybmFsICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSBkb2Vzbid0IGV4cG9zZSBpdHMgY29uc3RydWN0b3JcbmRlbGV0ZSBBcnJheUl0ZXJhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvcjtcblxuQXJyYXlJdGVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yLnByb3RvdHlwZSwge1xuXHRfcmVzb2x2ZTogZChmdW5jdGlvbiAoaSkge1xuXHRcdGlmICh0aGlzLl9fa2luZF9fID09PSBcInZhbHVlXCIpIHJldHVybiB0aGlzLl9fbGlzdF9fW2ldO1xuXHRcdGlmICh0aGlzLl9fa2luZF9fID09PSBcImtleSt2YWx1ZVwiKSByZXR1cm4gW2ksIHRoaXMuX19saXN0X19baV1dO1xuXHRcdHJldHVybiBpO1xuXHR9KVxufSk7XG5kZWZpbmVQcm9wZXJ0eShBcnJheUl0ZXJhdG9yLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCBkKFwiY1wiLCBcIkFycmF5IEl0ZXJhdG9yXCIpKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKFwiZXM1LWV4dC9mdW5jdGlvbi9pcy1hcmd1bWVudHNcIilcbiAgLCBjYWxsYWJsZSAgICA9IHJlcXVpcmUoXCJlczUtZXh0L29iamVjdC92YWxpZC1jYWxsYWJsZVwiKVxuICAsIGlzU3RyaW5nICAgID0gcmVxdWlyZShcImVzNS1leHQvc3RyaW5nL2lzLXN0cmluZ1wiKVxuICAsIGdldCAgICAgICAgID0gcmVxdWlyZShcIi4vZ2V0XCIpO1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXksIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCwgc29tZSA9IEFycmF5LnByb3RvdHlwZS5zb21lO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgY2IgLyosIHRoaXNBcmcqLykge1xuXHR2YXIgbW9kZSwgdGhpc0FyZyA9IGFyZ3VtZW50c1syXSwgcmVzdWx0LCBkb0JyZWFrLCBicm9rZW4sIGksIGxlbmd0aCwgY2hhciwgY29kZTtcblx0aWYgKGlzQXJyYXkoaXRlcmFibGUpIHx8IGlzQXJndW1lbnRzKGl0ZXJhYmxlKSkgbW9kZSA9IFwiYXJyYXlcIjtcblx0ZWxzZSBpZiAoaXNTdHJpbmcoaXRlcmFibGUpKSBtb2RlID0gXCJzdHJpbmdcIjtcblx0ZWxzZSBpdGVyYWJsZSA9IGdldChpdGVyYWJsZSk7XG5cblx0Y2FsbGFibGUoY2IpO1xuXHRkb0JyZWFrID0gZnVuY3Rpb24gKCkge1xuXHRcdGJyb2tlbiA9IHRydWU7XG5cdH07XG5cdGlmIChtb2RlID09PSBcImFycmF5XCIpIHtcblx0XHRzb21lLmNhbGwoaXRlcmFibGUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0Y2FsbC5jYWxsKGNiLCB0aGlzQXJnLCB2YWx1ZSwgZG9CcmVhayk7XG5cdFx0XHRyZXR1cm4gYnJva2VuO1xuXHRcdH0pO1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAobW9kZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdGxlbmd0aCA9IGl0ZXJhYmxlLmxlbmd0aDtcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRcdGNoYXIgPSBpdGVyYWJsZVtpXTtcblx0XHRcdGlmIChpICsgMSA8IGxlbmd0aCkge1xuXHRcdFx0XHRjb2RlID0gY2hhci5jaGFyQ29kZUF0KDApO1xuXHRcdFx0XHRpZiAoY29kZSA+PSAweGQ4MDAgJiYgY29kZSA8PSAweGRiZmYpIGNoYXIgKz0gaXRlcmFibGVbKytpXTtcblx0XHRcdH1cblx0XHRcdGNhbGwuY2FsbChjYiwgdGhpc0FyZywgY2hhciwgZG9CcmVhayk7XG5cdFx0XHRpZiAoYnJva2VuKSBicmVhaztcblx0XHR9XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHJlc3VsdCA9IGl0ZXJhYmxlLm5leHQoKTtcblxuXHR3aGlsZSAoIXJlc3VsdC5kb25lKSB7XG5cdFx0Y2FsbC5jYWxsKGNiLCB0aGlzQXJnLCByZXN1bHQudmFsdWUsIGRvQnJlYWspO1xuXHRcdGlmIChicm9rZW4pIHJldHVybjtcblx0XHRyZXN1bHQgPSBpdGVyYWJsZS5uZXh0KCk7XG5cdH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzQXJndW1lbnRzICAgID0gcmVxdWlyZShcImVzNS1leHQvZnVuY3Rpb24vaXMtYXJndW1lbnRzXCIpXG4gICwgaXNTdHJpbmcgICAgICAgPSByZXF1aXJlKFwiZXM1LWV4dC9zdHJpbmcvaXMtc3RyaW5nXCIpXG4gICwgQXJyYXlJdGVyYXRvciAgPSByZXF1aXJlKFwiLi9hcnJheVwiKVxuICAsIFN0cmluZ0l0ZXJhdG9yID0gcmVxdWlyZShcIi4vc3RyaW5nXCIpXG4gICwgaXRlcmFibGUgICAgICAgPSByZXF1aXJlKFwiLi92YWxpZC1pdGVyYWJsZVwiKVxuICAsIGl0ZXJhdG9yU3ltYm9sID0gcmVxdWlyZShcImVzNi1zeW1ib2xcIikuaXRlcmF0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuXHRpZiAodHlwZW9mIGl0ZXJhYmxlKG9iailbaXRlcmF0b3JTeW1ib2xdID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBvYmpbaXRlcmF0b3JTeW1ib2xdKCk7XG5cdGlmIChpc0FyZ3VtZW50cyhvYmopKSByZXR1cm4gbmV3IEFycmF5SXRlcmF0b3Iob2JqKTtcblx0aWYgKGlzU3RyaW5nKG9iaikpIHJldHVybiBuZXcgU3RyaW5nSXRlcmF0b3Iob2JqKTtcblx0cmV0dXJuIG5ldyBBcnJheUl0ZXJhdG9yKG9iaik7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjbGVhciAgICA9IHJlcXVpcmUoXCJlczUtZXh0L2FycmF5LyMvY2xlYXJcIilcbiAgLCBhc3NpZ24gICA9IHJlcXVpcmUoXCJlczUtZXh0L29iamVjdC9hc3NpZ25cIilcbiAgLCBjYWxsYWJsZSA9IHJlcXVpcmUoXCJlczUtZXh0L29iamVjdC92YWxpZC1jYWxsYWJsZVwiKVxuICAsIHZhbHVlICAgID0gcmVxdWlyZShcImVzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlXCIpXG4gICwgZCAgICAgICAgPSByZXF1aXJlKFwiZFwiKVxuICAsIGF1dG9CaW5kID0gcmVxdWlyZShcImQvYXV0by1iaW5kXCIpXG4gICwgU3ltYm9sICAgPSByZXF1aXJlKFwiZXM2LXN5bWJvbFwiKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5LCBkZWZpbmVQcm9wZXJ0aWVzID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsIEl0ZXJhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZXJhdG9yID0gZnVuY3Rpb24gKGxpc3QsIGNvbnRleHQpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIEl0ZXJhdG9yKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNvbnN0cnVjdG9yIHJlcXVpcmVzICduZXcnXCIpO1xuXHRkZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcblx0XHRfX2xpc3RfXzogZChcIndcIiwgdmFsdWUobGlzdCkpLFxuXHRcdF9fY29udGV4dF9fOiBkKFwid1wiLCBjb250ZXh0KSxcblx0XHRfX25leHRJbmRleF9fOiBkKFwid1wiLCAwKVxuXHR9KTtcblx0aWYgKCFjb250ZXh0KSByZXR1cm47XG5cdGNhbGxhYmxlKGNvbnRleHQub24pO1xuXHRjb250ZXh0Lm9uKFwiX2FkZFwiLCB0aGlzLl9vbkFkZCk7XG5cdGNvbnRleHQub24oXCJfZGVsZXRlXCIsIHRoaXMuX29uRGVsZXRlKTtcblx0Y29udGV4dC5vbihcIl9jbGVhclwiLCB0aGlzLl9vbkNsZWFyKTtcbn07XG5cbi8vIEludGVybmFsICVJdGVyYXRvclByb3RvdHlwZSUgZG9lc24ndCBleHBvc2UgaXRzIGNvbnN0cnVjdG9yXG5kZWxldGUgSXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuXG5kZWZpbmVQcm9wZXJ0aWVzKFxuXHRJdGVyYXRvci5wcm90b3R5cGUsXG5cdGFzc2lnbihcblx0XHR7XG5cdFx0XHRfbmV4dDogZChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBpO1xuXHRcdFx0XHRpZiAoIXRoaXMuX19saXN0X18pIHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHRcdGlmICh0aGlzLl9fcmVkb19fKSB7XG5cdFx0XHRcdFx0aSA9IHRoaXMuX19yZWRvX18uc2hpZnQoKTtcblx0XHRcdFx0XHRpZiAoaSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5fX25leHRJbmRleF9fIDwgdGhpcy5fX2xpc3RfXy5sZW5ndGgpIHJldHVybiB0aGlzLl9fbmV4dEluZGV4X18rKztcblx0XHRcdFx0dGhpcy5fdW5CaW5kKCk7XG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHR9KSxcblx0XHRcdG5leHQ6IGQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY3JlYXRlUmVzdWx0KHRoaXMuX25leHQoKSk7XG5cdFx0XHR9KSxcblx0XHRcdF9jcmVhdGVSZXN1bHQ6IGQoZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0aWYgKGkgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuXHRcdFx0XHRyZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IHRoaXMuX3Jlc29sdmUoaSkgfTtcblx0XHRcdH0pLFxuXHRcdFx0X3Jlc29sdmU6IGQoZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX19saXN0X19baV07XG5cdFx0XHR9KSxcblx0XHRcdF91bkJpbmQ6IGQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aGlzLl9fbGlzdF9fID0gbnVsbDtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX19yZWRvX187XG5cdFx0XHRcdGlmICghdGhpcy5fX2NvbnRleHRfXykgcmV0dXJuO1xuXHRcdFx0XHR0aGlzLl9fY29udGV4dF9fLm9mZihcIl9hZGRcIiwgdGhpcy5fb25BZGQpO1xuXHRcdFx0XHR0aGlzLl9fY29udGV4dF9fLm9mZihcIl9kZWxldGVcIiwgdGhpcy5fb25EZWxldGUpO1xuXHRcdFx0XHR0aGlzLl9fY29udGV4dF9fLm9mZihcIl9jbGVhclwiLCB0aGlzLl9vbkNsZWFyKTtcblx0XHRcdFx0dGhpcy5fX2NvbnRleHRfXyA9IG51bGw7XG5cdFx0XHR9KSxcblx0XHRcdHRvU3RyaW5nOiBkKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIFwiW29iamVjdCBcIiArICh0aGlzW1N5bWJvbC50b1N0cmluZ1RhZ10gfHwgXCJPYmplY3RcIikgKyBcIl1cIjtcblx0XHRcdH0pXG5cdFx0fSxcblx0XHRhdXRvQmluZCh7XG5cdFx0XHRfb25BZGQ6IGQoZnVuY3Rpb24gKGluZGV4KSB7XG5cdFx0XHRcdGlmIChpbmRleCA+PSB0aGlzLl9fbmV4dEluZGV4X18pIHJldHVybjtcblx0XHRcdFx0Kyt0aGlzLl9fbmV4dEluZGV4X187XG5cdFx0XHRcdGlmICghdGhpcy5fX3JlZG9fXykge1xuXHRcdFx0XHRcdGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX19yZWRvX19cIiwgZChcImNcIiwgW2luZGV4XSkpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9fcmVkb19fLmZvckVhY2goZnVuY3Rpb24gKHJlZG8sIGkpIHtcblx0XHRcdFx0XHRpZiAocmVkbyA+PSBpbmRleCkgdGhpcy5fX3JlZG9fX1tpXSA9ICsrcmVkbztcblx0XHRcdFx0fSwgdGhpcyk7XG5cdFx0XHRcdHRoaXMuX19yZWRvX18ucHVzaChpbmRleCk7XG5cdFx0XHR9KSxcblx0XHRcdF9vbkRlbGV0ZTogZChmdW5jdGlvbiAoaW5kZXgpIHtcblx0XHRcdFx0dmFyIGk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSB0aGlzLl9fbmV4dEluZGV4X18pIHJldHVybjtcblx0XHRcdFx0LS10aGlzLl9fbmV4dEluZGV4X187XG5cdFx0XHRcdGlmICghdGhpcy5fX3JlZG9fXykgcmV0dXJuO1xuXHRcdFx0XHRpID0gdGhpcy5fX3JlZG9fXy5pbmRleE9mKGluZGV4KTtcblx0XHRcdFx0aWYgKGkgIT09IC0xKSB0aGlzLl9fcmVkb19fLnNwbGljZShpLCAxKTtcblx0XHRcdFx0dGhpcy5fX3JlZG9fXy5mb3JFYWNoKGZ1bmN0aW9uIChyZWRvLCBqKSB7XG5cdFx0XHRcdFx0aWYgKHJlZG8gPiBpbmRleCkgdGhpcy5fX3JlZG9fX1tqXSA9IC0tcmVkbztcblx0XHRcdFx0fSwgdGhpcyk7XG5cdFx0XHR9KSxcblx0XHRcdF9vbkNsZWFyOiBkKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHRoaXMuX19yZWRvX18pIGNsZWFyLmNhbGwodGhpcy5fX3JlZG9fXyk7XG5cdFx0XHRcdHRoaXMuX19uZXh0SW5kZXhfXyA9IDA7XG5cdFx0XHR9KVxuXHRcdH0pXG5cdClcbik7XG5cbmRlZmluZVByb3BlcnR5KFxuXHRJdGVyYXRvci5wcm90b3R5cGUsXG5cdFN5bWJvbC5pdGVyYXRvcixcblx0ZChmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0pXG4pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoXCJlczUtZXh0L2Z1bmN0aW9uL2lzLWFyZ3VtZW50c1wiKVxuICAsIGlzVmFsdWUgICAgID0gcmVxdWlyZShcImVzNS1leHQvb2JqZWN0L2lzLXZhbHVlXCIpXG4gICwgaXNTdHJpbmcgICAgPSByZXF1aXJlKFwiZXM1LWV4dC9zdHJpbmcvaXMtc3RyaW5nXCIpO1xuXG52YXIgaXRlcmF0b3JTeW1ib2wgPSByZXF1aXJlKFwiZXM2LXN5bWJvbFwiKS5pdGVyYXRvclxuICAsIGlzQXJyYXkgICAgICAgID0gQXJyYXkuaXNBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKCFpc1ZhbHVlKHZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuXHRpZiAoaXNBcnJheSh2YWx1ZSkpIHJldHVybiB0cnVlO1xuXHRpZiAoaXNTdHJpbmcodmFsdWUpKSByZXR1cm4gdHJ1ZTtcblx0aWYgKGlzQXJndW1lbnRzKHZhbHVlKSkgcmV0dXJuIHRydWU7XG5cdHJldHVybiB0eXBlb2YgdmFsdWVbaXRlcmF0b3JTeW1ib2xdID09PSBcImZ1bmN0aW9uXCI7XG59O1xuIiwiLy8gVGhhbmtzIEBtYXRoaWFzYnluZW5zXG4vLyBodHRwOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LXVuaWNvZGUjaXRlcmF0aW5nLW92ZXItc3ltYm9sc1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcImVzNS1leHQvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIilcbiAgLCBkICAgICAgICAgICAgICA9IHJlcXVpcmUoXCJkXCIpXG4gICwgU3ltYm9sICAgICAgICAgPSByZXF1aXJlKFwiZXM2LXN5bWJvbFwiKVxuICAsIEl0ZXJhdG9yICAgICAgID0gcmVxdWlyZShcIi4vXCIpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHksIFN0cmluZ0l0ZXJhdG9yO1xuXG5TdHJpbmdJdGVyYXRvciA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAoISh0aGlzIGluc3RhbmNlb2YgU3RyaW5nSXRlcmF0b3IpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ29uc3RydWN0b3IgcmVxdWlyZXMgJ25ldydcIik7XG5cdHN0ciA9IFN0cmluZyhzdHIpO1xuXHRJdGVyYXRvci5jYWxsKHRoaXMsIHN0cik7XG5cdGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX19sZW5ndGhfX1wiLCBkKFwiXCIsIHN0ci5sZW5ndGgpKTtcbn07XG5pZiAoc2V0UHJvdG90eXBlT2YpIHNldFByb3RvdHlwZU9mKFN0cmluZ0l0ZXJhdG9yLCBJdGVyYXRvcik7XG5cbi8vIEludGVybmFsICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSBkb2Vzbid0IGV4cG9zZSBpdHMgY29uc3RydWN0b3JcbmRlbGV0ZSBTdHJpbmdJdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cblN0cmluZ0l0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3IucHJvdG90eXBlLCB7XG5cdF9uZXh0OiBkKGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIXRoaXMuX19saXN0X18pIHJldHVybiB1bmRlZmluZWQ7XG5cdFx0aWYgKHRoaXMuX19uZXh0SW5kZXhfXyA8IHRoaXMuX19sZW5ndGhfXykgcmV0dXJuIHRoaXMuX19uZXh0SW5kZXhfXysrO1xuXHRcdHRoaXMuX3VuQmluZCgpO1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH0pLFxuXHRfcmVzb2x2ZTogZChmdW5jdGlvbiAoaSkge1xuXHRcdHZhciBjaGFyID0gdGhpcy5fX2xpc3RfX1tpXSwgY29kZTtcblx0XHRpZiAodGhpcy5fX25leHRJbmRleF9fID09PSB0aGlzLl9fbGVuZ3RoX18pIHJldHVybiBjaGFyO1xuXHRcdGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG5cdFx0aWYgKGNvZGUgPj0gMHhkODAwICYmIGNvZGUgPD0gMHhkYmZmKSByZXR1cm4gY2hhciArIHRoaXMuX19saXN0X19bdGhpcy5fX25leHRJbmRleF9fKytdO1xuXHRcdHJldHVybiBjaGFyO1xuXHR9KVxufSk7XG5kZWZpbmVQcm9wZXJ0eShTdHJpbmdJdGVyYXRvci5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywgZChcImNcIiwgXCJTdHJpbmcgSXRlcmF0b3JcIikpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc0l0ZXJhYmxlID0gcmVxdWlyZShcIi4vaXMtaXRlcmFibGVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICghaXNJdGVyYWJsZSh2YWx1ZSkpIHRocm93IG5ldyBUeXBlRXJyb3IodmFsdWUgKyBcIiBpcyBub3QgaXRlcmFibGVcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpXG5cdD8gcmVxdWlyZShcImV4dC9nbG9iYWwtdGhpc1wiKS5TeW1ib2xcblx0OiByZXF1aXJlKFwiLi9wb2x5ZmlsbFwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZ2xvYmFsICAgICA9IHJlcXVpcmUoXCJleHQvZ2xvYmFsLXRoaXNcIilcbiAgLCB2YWxpZFR5cGVzID0geyBvYmplY3Q6IHRydWUsIHN5bWJvbDogdHJ1ZSB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG5cdHZhciBzeW1ib2w7XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0c3ltYm9sID0gU3ltYm9sKFwidGVzdCBzeW1ib2xcIik7XG5cdHRyeSB7IFN0cmluZyhzeW1ib2wpOyB9XG5cdGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIFJldHVybiAndHJ1ZScgYWxzbyBmb3IgcG9seWZpbGxzXG5cdGlmICghdmFsaWRUeXBlc1t0eXBlb2YgU3ltYm9sLml0ZXJhdG9yXSkgcmV0dXJuIGZhbHNlO1xuXHRpZiAoIXZhbGlkVHlwZXNbdHlwZW9mIFN5bWJvbC50b1ByaW1pdGl2ZV0pIHJldHVybiBmYWxzZTtcblx0aWYgKCF2YWxpZFR5cGVzW3R5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWddKSByZXR1cm4gZmFsc2U7XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzeW1ib2xcIikgcmV0dXJuIHRydWU7XG5cdGlmICghdmFsdWUuY29uc3RydWN0b3IpIHJldHVybiBmYWxzZTtcblx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgIT09IFwiU3ltYm9sXCIpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuIHZhbHVlW3ZhbHVlLmNvbnN0cnVjdG9yLnRvU3RyaW5nVGFnXSA9PT0gXCJTeW1ib2xcIjtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGQgPSByZXF1aXJlKFwiZFwiKTtcblxudmFyIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5LCBvYmpQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG52YXIgY3JlYXRlZCA9IGNyZWF0ZShudWxsKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRlc2MpIHtcblx0dmFyIHBvc3RmaXggPSAwLCBuYW1lLCBpZTExQnVnV29ya2Fyb3VuZDtcblx0d2hpbGUgKGNyZWF0ZWRbZGVzYyArIChwb3N0Zml4IHx8IFwiXCIpXSkgKytwb3N0Zml4O1xuXHRkZXNjICs9IHBvc3RmaXggfHwgXCJcIjtcblx0Y3JlYXRlZFtkZXNjXSA9IHRydWU7XG5cdG5hbWUgPSBcIkBAXCIgKyBkZXNjO1xuXHRkZWZpbmVQcm9wZXJ0eShcblx0XHRvYmpQcm90b3R5cGUsXG5cdFx0bmFtZSxcblx0XHRkLmdzKG51bGwsIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0Ly8gRm9yIElFMTEgaXNzdWUgc2VlOlxuXHRcdFx0Ly8gaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2tkZXRhaWwvdmlldy8xOTI4NTA4L1xuXHRcdFx0Ly8gICAgaWUxMS1icm9rZW4tZ2V0dGVycy1vbi1kb20tb2JqZWN0c1xuXHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL21lZGlrb28vZXM2LXN5bWJvbC9pc3N1ZXMvMTJcblx0XHRcdGlmIChpZTExQnVnV29ya2Fyb3VuZCkgcmV0dXJuO1xuXHRcdFx0aWUxMUJ1Z1dvcmthcm91bmQgPSB0cnVlO1xuXHRcdFx0ZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwgZCh2YWx1ZSkpO1xuXHRcdFx0aWUxMUJ1Z1dvcmthcm91bmQgPSBmYWxzZTtcblx0XHR9KVxuXHQpO1xuXHRyZXR1cm4gbmFtZTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGQgICAgICAgICAgICA9IHJlcXVpcmUoXCJkXCIpXG4gICwgTmF0aXZlU3ltYm9sID0gcmVxdWlyZShcImV4dC9nbG9iYWwtdGhpc1wiKS5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFN5bWJvbFBvbHlmaWxsKSB7XG5cdHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhTeW1ib2xQb2x5ZmlsbCwge1xuXHRcdC8vIFRvIGVuc3VyZSBwcm9wZXIgaW50ZXJvcGVyYWJpbGl0eSB3aXRoIG90aGVyIG5hdGl2ZSBmdW5jdGlvbnMgKGUuZy4gQXJyYXkuZnJvbSlcblx0XHQvLyBmYWxsYmFjayB0byBldmVudHVhbCBuYXRpdmUgaW1wbGVtZW50YXRpb24gb2YgZ2l2ZW4gc3ltYm9sXG5cdFx0aGFzSW5zdGFuY2U6IGQoXG5cdFx0XHRcIlwiLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5oYXNJbnN0YW5jZSkgfHwgU3ltYm9sUG9seWZpbGwoXCJoYXNJbnN0YW5jZVwiKVxuXHRcdCksXG5cdFx0aXNDb25jYXRTcHJlYWRhYmxlOiBkKFxuXHRcdFx0XCJcIixcblx0XHRcdChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZSkgfHxcblx0XHRcdFx0U3ltYm9sUG9seWZpbGwoXCJpc0NvbmNhdFNwcmVhZGFibGVcIilcblx0XHQpLFxuXHRcdGl0ZXJhdG9yOiBkKFwiXCIsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLml0ZXJhdG9yKSB8fCBTeW1ib2xQb2x5ZmlsbChcIml0ZXJhdG9yXCIpKSxcblx0XHRtYXRjaDogZChcIlwiLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5tYXRjaCkgfHwgU3ltYm9sUG9seWZpbGwoXCJtYXRjaFwiKSksXG5cdFx0cmVwbGFjZTogZChcIlwiLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5yZXBsYWNlKSB8fCBTeW1ib2xQb2x5ZmlsbChcInJlcGxhY2VcIikpLFxuXHRcdHNlYXJjaDogZChcIlwiLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5zZWFyY2gpIHx8IFN5bWJvbFBvbHlmaWxsKFwic2VhcmNoXCIpKSxcblx0XHRzcGVjaWVzOiBkKFwiXCIsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnNwZWNpZXMpIHx8IFN5bWJvbFBvbHlmaWxsKFwic3BlY2llc1wiKSksXG5cdFx0c3BsaXQ6IGQoXCJcIiwgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wuc3BsaXQpIHx8IFN5bWJvbFBvbHlmaWxsKFwic3BsaXRcIikpLFxuXHRcdHRvUHJpbWl0aXZlOiBkKFxuXHRcdFx0XCJcIiwgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wudG9QcmltaXRpdmUpIHx8IFN5bWJvbFBvbHlmaWxsKFwidG9QcmltaXRpdmVcIilcblx0XHQpLFxuXHRcdHRvU3RyaW5nVGFnOiBkKFxuXHRcdFx0XCJcIiwgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wudG9TdHJpbmdUYWcpIHx8IFN5bWJvbFBvbHlmaWxsKFwidG9TdHJpbmdUYWdcIilcblx0XHQpLFxuXHRcdHVuc2NvcGFibGVzOiBkKFxuXHRcdFx0XCJcIiwgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wudW5zY29wYWJsZXMpIHx8IFN5bWJvbFBvbHlmaWxsKFwidW5zY29wYWJsZXNcIilcblx0XHQpXG5cdH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZCAgICAgICAgICAgICAgPSByZXF1aXJlKFwiZFwiKVxuICAsIHZhbGlkYXRlU3ltYm9sID0gcmVxdWlyZShcIi4uLy4uLy4uL3ZhbGlkYXRlLXN5bWJvbFwiKTtcblxudmFyIHJlZ2lzdHJ5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoU3ltYm9sUG9seWZpbGwpIHtcblx0cmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFN5bWJvbFBvbHlmaWxsLCB7XG5cdFx0Zm9yOiBkKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmIChyZWdpc3RyeVtrZXldKSByZXR1cm4gcmVnaXN0cnlba2V5XTtcblx0XHRcdHJldHVybiAocmVnaXN0cnlba2V5XSA9IFN5bWJvbFBvbHlmaWxsKFN0cmluZyhrZXkpKSk7XG5cdFx0fSksXG5cdFx0a2V5Rm9yOiBkKGZ1bmN0aW9uIChzeW1ib2wpIHtcblx0XHRcdHZhciBrZXk7XG5cdFx0XHR2YWxpZGF0ZVN5bWJvbChzeW1ib2wpO1xuXHRcdFx0Zm9yIChrZXkgaW4gcmVnaXN0cnkpIHtcblx0XHRcdFx0aWYgKHJlZ2lzdHJ5W2tleV0gPT09IHN5bWJvbCkgcmV0dXJuIGtleTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fSlcblx0fSk7XG59O1xuIiwiLy8gRVMyMDE1IFN5bWJvbCBwb2x5ZmlsbCBmb3IgZW52aXJvbm1lbnRzIHRoYXQgZG8gbm90IChvciBwYXJ0aWFsbHkpIHN1cHBvcnQgaXRcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBkICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoXCJkXCIpXG4gICwgdmFsaWRhdGVTeW1ib2wgICAgICAgPSByZXF1aXJlKFwiLi92YWxpZGF0ZS1zeW1ib2xcIilcbiAgLCBOYXRpdmVTeW1ib2wgICAgICAgICA9IHJlcXVpcmUoXCJleHQvZ2xvYmFsLXRoaXNcIikuU3ltYm9sXG4gICwgZ2VuZXJhdGVOYW1lICAgICAgICAgPSByZXF1aXJlKFwiLi9saWIvcHJpdmF0ZS9nZW5lcmF0ZS1uYW1lXCIpXG4gICwgc2V0dXBTdGFuZGFyZFN5bWJvbHMgPSByZXF1aXJlKFwiLi9saWIvcHJpdmF0ZS9zZXR1cC9zdGFuZGFyZC1zeW1ib2xzXCIpXG4gICwgc2V0dXBTeW1ib2xSZWdpc3RyeSAgPSByZXF1aXJlKFwiLi9saWIvcHJpdmF0ZS9zZXR1cC9zeW1ib2wtcmVnaXN0cnlcIik7XG5cbnZhciBjcmVhdGUgPSBPYmplY3QuY3JlYXRlXG4gICwgZGVmaW5lUHJvcGVydGllcyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzXG4gICwgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbnZhciBTeW1ib2xQb2x5ZmlsbCwgSGlkZGVuU3ltYm9sLCBpc05hdGl2ZVNhZmU7XG5cbmlmICh0eXBlb2YgTmF0aXZlU3ltYm9sID09PSBcImZ1bmN0aW9uXCIpIHtcblx0dHJ5IHtcblx0XHRTdHJpbmcoTmF0aXZlU3ltYm9sKCkpO1xuXHRcdGlzTmF0aXZlU2FmZSA9IHRydWU7XG5cdH0gY2F0Y2ggKGlnbm9yZSkge31cbn0gZWxzZSB7XG5cdE5hdGl2ZVN5bWJvbCA9IG51bGw7XG59XG5cbi8vIEludGVybmFsIGNvbnN0cnVjdG9yIChub3Qgb25lIGV4cG9zZWQpIGZvciBjcmVhdGluZyBTeW1ib2wgaW5zdGFuY2VzLlxuLy8gVGhpcyBvbmUgaXMgdXNlZCB0byBlbnN1cmUgdGhhdCBgc29tZVN5bWJvbCBpbnN0YW5jZW9mIFN5bWJvbGAgYWx3YXlzIHJldHVybiBmYWxzZVxuSGlkZGVuU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKGRlc2NyaXB0aW9uKSB7XG5cdGlmICh0aGlzIGluc3RhbmNlb2YgSGlkZGVuU3ltYm9sKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yXCIpO1xuXHRyZXR1cm4gU3ltYm9sUG9seWZpbGwoZGVzY3JpcHRpb24pO1xufTtcblxuLy8gRXhwb3NlZCBgU3ltYm9sYCBjb25zdHJ1Y3RvclxuLy8gKHJldHVybnMgaW5zdGFuY2VzIG9mIEhpZGRlblN5bWJvbClcbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sUG9seWZpbGwgPSBmdW5jdGlvbiBTeW1ib2woZGVzY3JpcHRpb24pIHtcblx0dmFyIHN5bWJvbDtcblx0aWYgKHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3JcIik7XG5cdGlmIChpc05hdGl2ZVNhZmUpIHJldHVybiBOYXRpdmVTeW1ib2woZGVzY3JpcHRpb24pO1xuXHRzeW1ib2wgPSBjcmVhdGUoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSk7XG5cdGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBTdHJpbmcoZGVzY3JpcHRpb24pO1xuXHRyZXR1cm4gZGVmaW5lUHJvcGVydGllcyhzeW1ib2wsIHtcblx0XHRfX2Rlc2NyaXB0aW9uX186IGQoXCJcIiwgZGVzY3JpcHRpb24pLFxuXHRcdF9fbmFtZV9fOiBkKFwiXCIsIGdlbmVyYXRlTmFtZShkZXNjcmlwdGlvbikpXG5cdH0pO1xufTtcblxuc2V0dXBTdGFuZGFyZFN5bWJvbHMoU3ltYm9sUG9seWZpbGwpO1xuc2V0dXBTeW1ib2xSZWdpc3RyeShTeW1ib2xQb2x5ZmlsbCk7XG5cbi8vIEludGVybmFsIHR3ZWFrcyBmb3IgcmVhbCBzeW1ib2wgcHJvZHVjZXJcbmRlZmluZVByb3BlcnRpZXMoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSwge1xuXHRjb25zdHJ1Y3RvcjogZChTeW1ib2xQb2x5ZmlsbCksXG5cdHRvU3RyaW5nOiBkKFwiXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX19uYW1lX187IH0pXG59KTtcblxuLy8gUHJvcGVyIGltcGxlbWVudGF0aW9uIG9mIG1ldGhvZHMgZXhwb3NlZCBvbiBTeW1ib2wucHJvdG90eXBlXG4vLyBUaGV5IHdvbid0IGJlIGFjY2Vzc2libGUgb24gcHJvZHVjZWQgc3ltYm9sIGluc3RhbmNlcyBhcyB0aGV5IGRlcml2ZSBmcm9tIEhpZGRlblN5bWJvbC5wcm90b3R5cGVcbmRlZmluZVByb3BlcnRpZXMoU3ltYm9sUG9seWZpbGwucHJvdG90eXBlLCB7XG5cdHRvU3RyaW5nOiBkKGZ1bmN0aW9uICgpIHsgcmV0dXJuIFwiU3ltYm9sIChcIiArIHZhbGlkYXRlU3ltYm9sKHRoaXMpLl9fZGVzY3JpcHRpb25fXyArIFwiKVwiOyB9KSxcblx0dmFsdWVPZjogZChmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZVN5bWJvbCh0aGlzKTsgfSlcbn0pO1xuZGVmaW5lUHJvcGVydHkoXG5cdFN5bWJvbFBvbHlmaWxsLnByb3RvdHlwZSxcblx0U3ltYm9sUG9seWZpbGwudG9QcmltaXRpdmUsXG5cdGQoXCJcIiwgZnVuY3Rpb24gKCkge1xuXHRcdHZhciBzeW1ib2wgPSB2YWxpZGF0ZVN5bWJvbCh0aGlzKTtcblx0XHRpZiAodHlwZW9mIHN5bWJvbCA9PT0gXCJzeW1ib2xcIikgcmV0dXJuIHN5bWJvbDtcblx0XHRyZXR1cm4gc3ltYm9sLnRvU3RyaW5nKCk7XG5cdH0pXG4pO1xuZGVmaW5lUHJvcGVydHkoU3ltYm9sUG9seWZpbGwucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywgZChcImNcIiwgXCJTeW1ib2xcIikpO1xuXG4vLyBQcm9wZXIgaW1wbGVtZW50YXRvbiBvZiB0b1ByaW1pdGl2ZSBhbmQgdG9TdHJpbmdUYWcgZm9yIHJldHVybmVkIHN5bWJvbCBpbnN0YW5jZXNcbmRlZmluZVByb3BlcnR5KFxuXHRIaWRkZW5TeW1ib2wucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyxcblx0ZChcImNcIiwgU3ltYm9sUG9seWZpbGwucHJvdG90eXBlW1N5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnXSlcbik7XG5cbi8vIE5vdGU6IEl0J3MgaW1wb3J0YW50IHRvIGRlZmluZSBgdG9QcmltaXRpdmVgIGFzIGxhc3Qgb25lLCBhcyBzb21lIGltcGxlbWVudGF0aW9uc1xuLy8gaW1wbGVtZW50IGB0b1ByaW1pdGl2ZWAgbmF0aXZlbHkgd2l0aG91dCBpbXBsZW1lbnRpbmcgYHRvU3RyaW5nVGFnYCAob3Igb3RoZXIgc3BlY2lmaWVkIHN5bWJvbHMpXG4vLyBBbmQgdGhhdCBtYXkgaW52b2tlIGVycm9yIGluIGRlZmluaXRpb24gZmxvdzpcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21lZGlrb28vZXM2LXN5bWJvbC9pc3N1ZXMvMTMjaXNzdWVjb21tZW50LTE2NDE0NjE0OVxuZGVmaW5lUHJvcGVydHkoXG5cdEhpZGRlblN5bWJvbC5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvUHJpbWl0aXZlLFxuXHRkKFwiY1wiLCBTeW1ib2xQb2x5ZmlsbC5wcm90b3R5cGVbU3ltYm9sUG9seWZpbGwudG9QcmltaXRpdmVdKVxuKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKFwiLi9pcy1zeW1ib2xcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICghaXNTeW1ib2wodmFsdWUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKHZhbHVlICsgXCIgaXMgbm90IGEgc3ltYm9sXCIpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKSA/IFdlYWtNYXAgOiByZXF1aXJlKFwiLi9wb2x5ZmlsbFwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHdlYWtNYXAsIG9iajtcblxuXHRpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXHR0cnkge1xuXHRcdC8vIFdlYktpdCBkb2Vzbid0IHN1cHBvcnQgYXJndW1lbnRzIGFuZCBjcmFzaGVzXG5cdFx0d2Vha01hcCA9IG5ldyBXZWFrTWFwKFtbb2JqID0ge30sIFwib25lXCJdLCBbe30sIFwidHdvXCJdLCBbe30sIFwidGhyZWVcIl1dKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoU3RyaW5nKHdlYWtNYXApICE9PSBcIltvYmplY3QgV2Vha01hcF1cIikgcmV0dXJuIGZhbHNlO1xuXHRpZiAodHlwZW9mIHdlYWtNYXAuc2V0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0aWYgKHdlYWtNYXAuc2V0KHt9LCAxKSAhPT0gd2Vha01hcCkgcmV0dXJuIGZhbHNlO1xuXHRpZiAodHlwZW9mIHdlYWtNYXAuZGVsZXRlICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0aWYgKHR5cGVvZiB3ZWFrTWFwLmhhcyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG5cdGlmICh3ZWFrTWFwLmdldChvYmopICE9PSBcIm9uZVwiKSByZXR1cm4gZmFsc2U7XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiLy8gRXhwb3J0cyB0cnVlIGlmIGVudmlyb25tZW50IHByb3ZpZGVzIG5hdGl2ZSBgV2Vha01hcGAgaW1wbGVtZW50YXRpb24sIHdoYXRldmVyIHRoYXQgaXMuXG5cblwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cdGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG5cdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3IFdlYWtNYXAoKSkgPT09IFwiW29iamVjdCBXZWFrTWFwXVwiO1xufSgpKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSAgICAgICAgICAgPSByZXF1aXJlKFwiZXM1LWV4dC9vYmplY3QvaXMtdmFsdWVcIilcbiAgLCBzZXRQcm90b3R5cGVPZiAgICA9IHJlcXVpcmUoXCJlczUtZXh0L29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpXG4gICwgb2JqZWN0ICAgICAgICAgICAgPSByZXF1aXJlKFwiZXM1LWV4dC9vYmplY3QvdmFsaWQtb2JqZWN0XCIpXG4gICwgZW5zdXJlVmFsdWUgICAgICAgPSByZXF1aXJlKFwiZXM1LWV4dC9vYmplY3QvdmFsaWQtdmFsdWVcIilcbiAgLCByYW5kb21VbmlxICAgICAgICA9IHJlcXVpcmUoXCJlczUtZXh0L3N0cmluZy9yYW5kb20tdW5pcVwiKVxuICAsIGQgICAgICAgICAgICAgICAgID0gcmVxdWlyZShcImRcIilcbiAgLCBnZXRJdGVyYXRvciAgICAgICA9IHJlcXVpcmUoXCJlczYtaXRlcmF0b3IvZ2V0XCIpXG4gICwgZm9yT2YgICAgICAgICAgICAgPSByZXF1aXJlKFwiZXM2LWl0ZXJhdG9yL2Zvci1vZlwiKVxuICAsIHRvU3RyaW5nVGFnU3ltYm9sID0gcmVxdWlyZShcImVzNi1zeW1ib2xcIikudG9TdHJpbmdUYWdcbiAgLCBpc05hdGl2ZSAgICAgICAgICA9IHJlcXVpcmUoXCIuL2lzLW5hdGl2ZS1pbXBsZW1lbnRlZFwiKVxuXG4gICwgaXNBcnJheSA9IEFycmF5LmlzQXJyYXksIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gICwgb2JqSGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LCBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZlxuICAsIFdlYWtNYXBQb2x5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXBQb2x5ID0gZnVuY3Rpb24gKC8qIEl0ZXJhYmxlKi8pIHtcblx0dmFyIGl0ZXJhYmxlID0gYXJndW1lbnRzWzBdLCBzZWxmO1xuXG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBXZWFrTWFwUG9seSkpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDb25zdHJ1Y3RvciByZXF1aXJlcyAnbmV3J1wiKTtcblx0c2VsZiA9IGlzTmF0aXZlICYmIHNldFByb3RvdHlwZU9mICYmIChXZWFrTWFwICE9PSBXZWFrTWFwUG9seSlcblx0XHQ/IHNldFByb3RvdHlwZU9mKG5ldyBXZWFrTWFwKCksIGdldFByb3RvdHlwZU9mKHRoaXMpKSA6IHRoaXM7XG5cblx0aWYgKGlzVmFsdWUoaXRlcmFibGUpKSB7XG5cdFx0aWYgKCFpc0FycmF5KGl0ZXJhYmxlKSkgaXRlcmFibGUgPSBnZXRJdGVyYXRvcihpdGVyYWJsZSk7XG5cdH1cblx0ZGVmaW5lUHJvcGVydHkoc2VsZiwgXCJfX3dlYWtNYXBEYXRhX19cIiwgZChcImNcIiwgXCIkd2Vha01hcCRcIiArIHJhbmRvbVVuaXEoKSkpO1xuXHRpZiAoIWl0ZXJhYmxlKSByZXR1cm4gc2VsZjtcblx0Zm9yT2YoaXRlcmFibGUsIGZ1bmN0aW9uICh2YWwpIHtcblx0XHRlbnN1cmVWYWx1ZSh2YWwpO1xuXHRcdHNlbGYuc2V0KHZhbFswXSwgdmFsWzFdKTtcblx0fSk7XG5cdHJldHVybiBzZWxmO1xufTtcblxuaWYgKGlzTmF0aXZlKSB7XG5cdGlmIChzZXRQcm90b3R5cGVPZikgc2V0UHJvdG90eXBlT2YoV2Vha01hcFBvbHksIFdlYWtNYXApO1xuXHRXZWFrTWFwUG9seS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFdlYWtNYXAucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiBkKFdlYWtNYXBQb2x5KSB9KTtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoV2Vha01hcFBvbHkucHJvdG90eXBlLCB7XG5cdGRlbGV0ZTogZChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0aWYgKG9iakhhc093blByb3BlcnR5LmNhbGwob2JqZWN0KGtleSksIHRoaXMuX193ZWFrTWFwRGF0YV9fKSkge1xuXHRcdFx0ZGVsZXRlIGtleVt0aGlzLl9fd2Vha01hcERhdGFfX107XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KSxcblx0Z2V0OiBkKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRpZiAoIW9iakhhc093blByb3BlcnR5LmNhbGwob2JqZWN0KGtleSksIHRoaXMuX193ZWFrTWFwRGF0YV9fKSkgcmV0dXJuIHVuZGVmaW5lZDtcblx0XHRyZXR1cm4ga2V5W3RoaXMuX193ZWFrTWFwRGF0YV9fXTtcblx0fSksXG5cdGhhczogZChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0cmV0dXJuIG9iakhhc093blByb3BlcnR5LmNhbGwob2JqZWN0KGtleSksIHRoaXMuX193ZWFrTWFwRGF0YV9fKTtcblx0fSksXG5cdHNldDogZChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdGRlZmluZVByb3BlcnR5KG9iamVjdChrZXkpLCB0aGlzLl9fd2Vha01hcERhdGFfXywgZChcImNcIiwgdmFsdWUpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSksXG5cdHRvU3RyaW5nOiBkKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gXCJbb2JqZWN0IFdlYWtNYXBdXCI7XG5cdH0pXG59KTtcbmRlZmluZVByb3BlcnR5KFdlYWtNYXBQb2x5LnByb3RvdHlwZSwgdG9TdHJpbmdUYWdTeW1ib2wsIGQoXCJjXCIsIFwiV2Vha01hcFwiKSk7XG4iLCJ2YXIgbmFpdmVGYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGYpIHJldHVybiBzZWxmO1xuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiAmJiB3aW5kb3cpIHJldHVybiB3aW5kb3c7XG5cdHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byByZXNvbHZlIGdsb2JhbCBgdGhpc2BcIik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cdGlmICh0aGlzKSByZXR1cm4gdGhpcztcblxuXHQvLyBVbmV4cGVjdGVkIHN0cmljdCBtb2RlIChtYXkgaGFwcGVuIGlmIGUuZy4gYnVuZGxlZCBpbnRvIEVTTSBtb2R1bGUpXG5cblx0Ly8gVGhhbmtzIEBtYXRoaWFzYnluZW5zIC0+IGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9nbG9iYWx0aGlzXG5cdC8vIEluIGFsbCBFUzUrIGVuZ2luZXMgZ2xvYmFsIG9iamVjdCBpbmhlcml0cyBmcm9tIE9iamVjdC5wcm90b3R5cGVcblx0Ly8gKGlmIHlvdSBhcHByb2FjaGVkIG9uZSB0aGF0IGRvZXNuJ3QgcGxlYXNlIHJlcG9ydClcblx0dHJ5IHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgXCJfX2dsb2JhbF9fXCIsIHtcblx0XHRcdGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFVuZm9ydHVuYXRlIGNhc2Ugb2YgT2JqZWN0LnByb3RvdHlwZSBiZWluZyBzZWFsZWQgKHZpYSBwcmV2ZW50RXh0ZW5zaW9ucywgc2VhbCBvciBmcmVlemUpXG5cdFx0cmV0dXJuIG5haXZlRmFsbGJhY2soKTtcblx0fVxuXHR0cnkge1xuXHRcdC8vIFNhZmFyaSBjYXNlICh3aW5kb3cuX19nbG9iYWxfXyBpcyByZXNvbHZlZCB3aXRoIGdsb2JhbCBjb250ZXh0LCBidXQgX19nbG9iYWxfXyBkb2VzIG5vdClcblx0XHRpZiAoIV9fZ2xvYmFsX18pIHJldHVybiBuYWl2ZUZhbGxiYWNrKCk7XG5cdFx0cmV0dXJuIF9fZ2xvYmFsX187XG5cdH0gZmluYWxseSB7XG5cdFx0ZGVsZXRlIE9iamVjdC5wcm90b3R5cGUuX19nbG9iYWxfXztcblx0fVxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2lzLWltcGxlbWVudGVkXCIpKCkgPyBnbG9iYWxUaGlzIDogcmVxdWlyZShcIi4vaW1wbGVtZW50YXRpb25cIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJvYmplY3RcIikgcmV0dXJuIGZhbHNlO1xuXHRpZiAoIWdsb2JhbFRoaXMpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuIGdsb2JhbFRoaXMuQXJyYXkgPT09IEFycmF5O1xufTtcbiIsIi8qZXNsaW50IG5ldy1jYXA6MCovXG52YXIgZHR5cGUgPSByZXF1aXJlKCdkdHlwZScpXG5cbm1vZHVsZS5leHBvcnRzID0gZmxhdHRlblZlcnRleERhdGFcblxuZnVuY3Rpb24gZmxhdHRlblZlcnRleERhdGEgKGRhdGEsIG91dHB1dCwgb2Zmc2V0KSB7XG4gIGlmICghZGF0YSkgdGhyb3cgbmV3IFR5cGVFcnJvcignbXVzdCBzcGVjaWZ5IGRhdGEgYXMgZmlyc3QgcGFyYW1ldGVyJylcbiAgb2Zmc2V0ID0gKyhvZmZzZXQgfHwgMCkgfCAwXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgKGRhdGFbMF0gJiYgdHlwZW9mIGRhdGFbMF1bMF0gPT09ICdudW1iZXInKSkge1xuICAgIHZhciBkaW0gPSBkYXRhWzBdLmxlbmd0aFxuICAgIHZhciBsZW5ndGggPSBkYXRhLmxlbmd0aCAqIGRpbVxuICAgIHZhciBpLCBqLCBrLCBsXG5cbiAgICAvLyBubyBvdXRwdXQgc3BlY2lmaWVkLCBjcmVhdGUgYSBuZXcgdHlwZWQgYXJyYXlcbiAgICBpZiAoIW91dHB1dCB8fCB0eXBlb2Ygb3V0cHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgb3V0cHV0ID0gbmV3IChkdHlwZShvdXRwdXQgfHwgJ2Zsb2F0MzInKSkobGVuZ3RoICsgb2Zmc2V0KVxuICAgIH1cblxuICAgIHZhciBkc3RMZW5ndGggPSBvdXRwdXQubGVuZ3RoIC0gb2Zmc2V0XG4gICAgaWYgKGxlbmd0aCAhPT0gZHN0TGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvdXJjZSBsZW5ndGggJyArIGxlbmd0aCArICcgKCcgKyBkaW0gKyAneCcgKyBkYXRhLmxlbmd0aCArICcpJyArXG4gICAgICAgICcgZG9lcyBub3QgbWF0Y2ggZGVzdGluYXRpb24gbGVuZ3RoICcgKyBkc3RMZW5ndGgpXG4gICAgfVxuXG4gICAgZm9yIChpID0gMCwgayA9IG9mZnNldDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBkaW07IGorKykge1xuICAgICAgICBvdXRwdXRbaysrXSA9IGRhdGFbaV1bal0gPT09IG51bGwgPyBOYU4gOiBkYXRhW2ldW2pdXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghb3V0cHV0IHx8IHR5cGVvZiBvdXRwdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBubyBvdXRwdXQsIGNyZWF0ZSBhIG5ldyBvbmVcbiAgICAgIHZhciBDdG9yID0gZHR5cGUob3V0cHV0IHx8ICdmbG9hdDMyJylcblxuICAgICAgLy8gaGFuZGxlIGFycmF5cyBzZXBhcmF0ZWx5IGR1ZSB0byBwb3NzaWJsZSBudWxsc1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgfHwgb3V0cHV0ID09PSAnYXJyYXknKSB7XG4gICAgICAgIG91dHB1dCA9IG5ldyBDdG9yKGRhdGEubGVuZ3RoICsgb2Zmc2V0KVxuICAgICAgICBmb3IgKGkgPSAwLCBrID0gb2Zmc2V0LCBsID0gb3V0cHV0Lmxlbmd0aDsgayA8IGw7IGsrKywgaSsrKSB7XG4gICAgICAgICAgb3V0cHV0W2tdID0gZGF0YVtpXSA9PT0gbnVsbCA/IE5hTiA6IGRhdGFbaV1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgIG91dHB1dCA9IG5ldyBDdG9yKGRhdGEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0cHV0ID0gbmV3IEN0b3IoZGF0YS5sZW5ndGggKyBvZmZzZXQpXG5cbiAgICAgICAgICBvdXRwdXQuc2V0KGRhdGEsIG9mZnNldClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzdG9yZSBvdXRwdXQgaW4gZXhpc3RpbmcgYXJyYXlcbiAgICAgIG91dHB1dC5zZXQoZGF0YSwgb2Zmc2V0KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXRcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcblx0KC9NU0lFLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IC9UcmlkZW50XFwvLy50ZXN0KG5hdmlnYXRvci5hcHBWZXJzaW9uKSk7XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh4KSB7XG5cdHZhciB0eXBlID0gdHlwZW9mIHg7XG5cdHJldHVybiB4ICE9PSBudWxsICYmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKTtcbn07XG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNQYXRoKHN0cikge1xyXG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykgcmV0dXJuIGZhbHNlXHJcblxyXG5cdHN0ciA9IHN0ci50cmltKClcclxuXHJcblx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRy9wYXRocy5odG1sI1BhdGhEYXRhQk5GXHJcblx0aWYgKC9eW216bGh2Y3NxdGFdXFxzKlstKy4wLTldW15tbGh2emNzcXRhXSsvaS50ZXN0KHN0cikgJiYgL1tcXGR6XSQvaS50ZXN0KHN0cikgJiYgc3RyLmxlbmd0aCA+IDQpIHJldHVybiB0cnVlXHJcblxyXG5cdHJldHVybiBmYWxzZVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5sb2cyIHx8IGZ1bmN0aW9uICh4KSB7XG5cdHJldHVybiBNYXRoLmxvZyh4KSAqIE1hdGguTE9HMkU7XG59O1xuIiwiXG52YXIgz4AgPSBNYXRoLlBJXG52YXIgXzEyMCA9IHJhZGlhbnMoMTIwKVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZVxuXG4vKipcbiAqIGRlc2NyaWJlIGBwYXRoYCBpbiB0ZXJtcyBvZiBjdWJpYyBiw6l6aWVyIFxuICogY3VydmVzIGFuZCBtb3ZlIGNvbW1hbmRzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGF0aFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplKHBhdGgpe1xuXHQvLyBpbml0IHN0YXRlXG5cdHZhciBwcmV2XG5cdHZhciByZXN1bHQgPSBbXVxuXHR2YXIgYmV6aWVyWCA9IDBcblx0dmFyIGJlemllclkgPSAwXG5cdHZhciBzdGFydFggPSAwXG5cdHZhciBzdGFydFkgPSAwXG5cdHZhciBxdWFkWCA9IG51bGxcblx0dmFyIHF1YWRZID0gbnVsbFxuXHR2YXIgeCA9IDBcblx0dmFyIHkgPSAwXG5cblx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdGgubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHR2YXIgc2VnID0gcGF0aFtpXVxuXHRcdHZhciBjb21tYW5kID0gc2VnWzBdXG5cdFx0c3dpdGNoIChjb21tYW5kKSB7XG5cdFx0XHRjYXNlICdNJzpcblx0XHRcdFx0c3RhcnRYID0gc2VnWzFdXG5cdFx0XHRcdHN0YXJ0WSA9IHNlZ1syXVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnQSc6XG5cdFx0XHRcdHNlZyA9IGFyYyh4LCB5LHNlZ1sxXSxzZWdbMl0scmFkaWFucyhzZWdbM10pLHNlZ1s0XSxzZWdbNV0sc2VnWzZdLHNlZ1s3XSlcblx0XHRcdFx0Ly8gc3BsaXQgbXVsdGkgcGFydFxuXHRcdFx0XHRzZWcudW5zaGlmdCgnQycpXG5cdFx0XHRcdGlmIChzZWcubGVuZ3RoID4gNykge1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKHNlZy5zcGxpY2UoMCwgNykpXG5cdFx0XHRcdFx0c2VnLnVuc2hpZnQoJ0MnKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdTJzpcblx0XHRcdFx0Ly8gZGVmYXVsdCBjb250cm9sIHBvaW50XG5cdFx0XHRcdHZhciBjeCA9IHhcblx0XHRcdFx0dmFyIGN5ID0geVxuXHRcdFx0XHRpZiAocHJldiA9PSAnQycgfHwgcHJldiA9PSAnUycpIHtcblx0XHRcdFx0XHRjeCArPSBjeCAtIGJlemllclggLy8gcmVmbGVjdCB0aGUgcHJldmlvdXMgY29tbWFuZCdzIGNvbnRyb2xcblx0XHRcdFx0XHRjeSArPSBjeSAtIGJlemllclkgLy8gcG9pbnQgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgcG9pbnRcblx0XHRcdFx0fVxuXHRcdFx0XHRzZWcgPSBbJ0MnLCBjeCwgY3ksIHNlZ1sxXSwgc2VnWzJdLCBzZWdbM10sIHNlZ1s0XV1cblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ1QnOlxuXHRcdFx0XHRpZiAocHJldiA9PSAnUScgfHwgcHJldiA9PSAnVCcpIHtcblx0XHRcdFx0XHRxdWFkWCA9IHggKiAyIC0gcXVhZFggLy8gYXMgd2l0aCAnUycgcmVmbGVjdCBwcmV2aW91cyBjb250cm9sIHBvaW50XG5cdFx0XHRcdFx0cXVhZFkgPSB5ICogMiAtIHF1YWRZXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cXVhZFggPSB4XG5cdFx0XHRcdFx0cXVhZFkgPSB5XG5cdFx0XHRcdH1cblx0XHRcdFx0c2VnID0gcXVhZHJhdGljKHgsIHksIHF1YWRYLCBxdWFkWSwgc2VnWzFdLCBzZWdbMl0pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdRJzpcblx0XHRcdFx0cXVhZFggPSBzZWdbMV1cblx0XHRcdFx0cXVhZFkgPSBzZWdbMl1cblx0XHRcdFx0c2VnID0gcXVhZHJhdGljKHgsIHksIHNlZ1sxXSwgc2VnWzJdLCBzZWdbM10sIHNlZ1s0XSlcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ0wnOlxuXHRcdFx0XHRzZWcgPSBsaW5lKHgsIHksIHNlZ1sxXSwgc2VnWzJdKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnSCc6XG5cdFx0XHRcdHNlZyA9IGxpbmUoeCwgeSwgc2VnWzFdLCB5KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnVic6XG5cdFx0XHRcdHNlZyA9IGxpbmUoeCwgeSwgeCwgc2VnWzFdKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnWic6XG5cdFx0XHRcdHNlZyA9IGxpbmUoeCwgeSwgc3RhcnRYLCBzdGFydFkpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXG5cdFx0Ly8gdXBkYXRlIHN0YXRlXG5cdFx0cHJldiA9IGNvbW1hbmRcblx0XHR4ID0gc2VnW3NlZy5sZW5ndGggLSAyXVxuXHRcdHkgPSBzZWdbc2VnLmxlbmd0aCAtIDFdXG5cdFx0aWYgKHNlZy5sZW5ndGggPiA0KSB7XG5cdFx0XHRiZXppZXJYID0gc2VnW3NlZy5sZW5ndGggLSA0XVxuXHRcdFx0YmV6aWVyWSA9IHNlZ1tzZWcubGVuZ3RoIC0gM11cblx0XHR9IGVsc2Uge1xuXHRcdFx0YmV6aWVyWCA9IHhcblx0XHRcdGJlemllclkgPSB5XG5cdFx0fVxuXHRcdHJlc3VsdC5wdXNoKHNlZylcblx0fVxuXG5cdHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gbGluZSh4MSwgeTEsIHgyLCB5Mil7XG5cdHJldHVybiBbJ0MnLCB4MSwgeTEsIHgyLCB5MiwgeDIsIHkyXVxufVxuXG5mdW5jdGlvbiBxdWFkcmF0aWMoeDEsIHkxLCBjeCwgY3ksIHgyLCB5Mil7XG5cdHJldHVybiBbXG5cdFx0J0MnLFxuXHRcdHgxLzMgKyAoMi8zKSAqIGN4LFxuXHRcdHkxLzMgKyAoMi8zKSAqIGN5LFxuXHRcdHgyLzMgKyAoMi8zKSAqIGN4LFxuXHRcdHkyLzMgKyAoMi8zKSAqIGN5LFxuXHRcdHgyLFxuXHRcdHkyXG5cdF1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyByaXBwZWQgZnJvbSBcbi8vIGdpdGh1Yi5jb20vRG1pdHJ5QmFyYW5vdnNraXkvcmFwaGFlbC9ibG9iLzRkOTdkNC9yYXBoYWVsLmpzI0wyMjE2LUwyMzA0IFxuLy8gd2hpY2ggcmVmZXJlbmNlcyB3My5vcmcvVFIvU1ZHMTEvaW1wbG5vdGUuaHRtbCNBcmNJbXBsZW1lbnRhdGlvbk5vdGVzXG4vLyBUT0RPOiBtYWtlIGl0IGh1bWFuIHJlYWRhYmxlXG5cbmZ1bmN0aW9uIGFyYyh4MSwgeTEsIHJ4LCByeSwgYW5nbGUsIGxhcmdlX2FyY19mbGFnLCBzd2VlcF9mbGFnLCB4MiwgeTIsIHJlY3Vyc2l2ZSkge1xuXHRpZiAoIXJlY3Vyc2l2ZSkge1xuXHRcdHZhciB4eSA9IHJvdGF0ZSh4MSwgeTEsIC1hbmdsZSlcblx0XHR4MSA9IHh5Lnhcblx0XHR5MSA9IHh5Lnlcblx0XHR4eSA9IHJvdGF0ZSh4MiwgeTIsIC1hbmdsZSlcblx0XHR4MiA9IHh5Lnhcblx0XHR5MiA9IHh5Lnlcblx0XHR2YXIgeCA9ICh4MSAtIHgyKSAvIDJcblx0XHR2YXIgeSA9ICh5MSAtIHkyKSAvIDJcblx0XHR2YXIgaCA9ICh4ICogeCkgLyAocnggKiByeCkgKyAoeSAqIHkpIC8gKHJ5ICogcnkpXG5cdFx0aWYgKGggPiAxKSB7XG5cdFx0XHRoID0gTWF0aC5zcXJ0KGgpXG5cdFx0XHRyeCA9IGggKiByeFxuXHRcdFx0cnkgPSBoICogcnlcblx0XHR9XG5cdFx0dmFyIHJ4MiA9IHJ4ICogcnhcblx0XHR2YXIgcnkyID0gcnkgKiByeVxuXHRcdHZhciBrID0gKGxhcmdlX2FyY19mbGFnID09IHN3ZWVwX2ZsYWcgPyAtMSA6IDEpXG5cdFx0XHQqIE1hdGguc3FydChNYXRoLmFicygocngyICogcnkyIC0gcngyICogeSAqIHkgLSByeTIgKiB4ICogeCkgLyAocngyICogeSAqIHkgKyByeTIgKiB4ICogeCkpKVxuXHRcdGlmIChrID09IEluZmluaXR5KSBrID0gMSAvLyBuZXV0cmFsaXplXG5cdFx0dmFyIGN4ID0gayAqIHJ4ICogeSAvIHJ5ICsgKHgxICsgeDIpIC8gMlxuXHRcdHZhciBjeSA9IGsgKiAtcnkgKiB4IC8gcnggKyAoeTEgKyB5MikgLyAyXG5cdFx0dmFyIGYxID0gTWF0aC5hc2luKCgoeTEgLSBjeSkgLyByeSkudG9GaXhlZCg5KSlcblx0XHR2YXIgZjIgPSBNYXRoLmFzaW4oKCh5MiAtIGN5KSAvIHJ5KS50b0ZpeGVkKDkpKVxuXG5cdFx0ZjEgPSB4MSA8IGN4ID8gz4AgLSBmMSA6IGYxXG5cdFx0ZjIgPSB4MiA8IGN4ID8gz4AgLSBmMiA6IGYyXG5cdFx0aWYgKGYxIDwgMCkgZjEgPSDPgCAqIDIgKyBmMVxuXHRcdGlmIChmMiA8IDApIGYyID0gz4AgKiAyICsgZjJcblx0XHRpZiAoc3dlZXBfZmxhZyAmJiBmMSA+IGYyKSBmMSA9IGYxIC0gz4AgKiAyXG5cdFx0aWYgKCFzd2VlcF9mbGFnICYmIGYyID4gZjEpIGYyID0gZjIgLSDPgCAqIDJcblx0fSBlbHNlIHtcblx0XHRmMSA9IHJlY3Vyc2l2ZVswXVxuXHRcdGYyID0gcmVjdXJzaXZlWzFdXG5cdFx0Y3ggPSByZWN1cnNpdmVbMl1cblx0XHRjeSA9IHJlY3Vyc2l2ZVszXVxuXHR9XG5cdC8vIGdyZWF0ZXIgdGhhbiAxMjAgZGVncmVlcyByZXF1aXJlcyBtdWx0aXBsZSBzZWdtZW50c1xuXHRpZiAoTWF0aC5hYnMoZjIgLSBmMSkgPiBfMTIwKSB7XG5cdFx0dmFyIGYyb2xkID0gZjJcblx0XHR2YXIgeDJvbGQgPSB4MlxuXHRcdHZhciB5Mm9sZCA9IHkyXG5cdFx0ZjIgPSBmMSArIF8xMjAgKiAoc3dlZXBfZmxhZyAmJiBmMiA+IGYxID8gMSA6IC0xKVxuXHRcdHgyID0gY3ggKyByeCAqIE1hdGguY29zKGYyKVxuXHRcdHkyID0gY3kgKyByeSAqIE1hdGguc2luKGYyKVxuXHRcdHZhciByZXMgPSBhcmMoeDIsIHkyLCByeCwgcnksIGFuZ2xlLCAwLCBzd2VlcF9mbGFnLCB4Mm9sZCwgeTJvbGQsIFtmMiwgZjJvbGQsIGN4LCBjeV0pXG5cdH1cblx0dmFyIHQgPSBNYXRoLnRhbigoZjIgLSBmMSkgLyA0KVxuXHR2YXIgaHggPSA0IC8gMyAqIHJ4ICogdFxuXHR2YXIgaHkgPSA0IC8gMyAqIHJ5ICogdFxuXHR2YXIgY3VydmUgPSBbXG5cdFx0MiAqIHgxIC0gKHgxICsgaHggKiBNYXRoLnNpbihmMSkpLFxuXHRcdDIgKiB5MSAtICh5MSAtIGh5ICogTWF0aC5jb3MoZjEpKSxcblx0XHR4MiArIGh4ICogTWF0aC5zaW4oZjIpLFxuXHRcdHkyIC0gaHkgKiBNYXRoLmNvcyhmMiksXG5cdFx0eDIsXG5cdFx0eTJcblx0XVxuXHRpZiAocmVjdXJzaXZlKSByZXR1cm4gY3VydmVcblx0aWYgKHJlcykgY3VydmUgPSBjdXJ2ZS5jb25jYXQocmVzKVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGN1cnZlLmxlbmd0aDspIHtcblx0XHR2YXIgcm90ID0gcm90YXRlKGN1cnZlW2ldLCBjdXJ2ZVtpKzFdLCBhbmdsZSlcblx0XHRjdXJ2ZVtpKytdID0gcm90Lnhcblx0XHRjdXJ2ZVtpKytdID0gcm90Lnlcblx0fVxuXHRyZXR1cm4gY3VydmVcbn1cblxuZnVuY3Rpb24gcm90YXRlKHgsIHksIHJhZCl7XG5cdHJldHVybiB7XG5cdFx0eDogeCAqIE1hdGguY29zKHJhZCkgLSB5ICogTWF0aC5zaW4ocmFkKSxcblx0XHR5OiB4ICogTWF0aC5zaW4ocmFkKSArIHkgKiBNYXRoLmNvcyhyYWQpXG5cdH1cbn1cblxuZnVuY3Rpb24gcmFkaWFucyhkZWdyZXNzKXtcblx0cmV0dXJuIGRlZ3Jlc3MgKiAoz4AgLyAxODApXG59XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgcGljayA9IHJlcXVpcmUoJ3BpY2stYnktYWxpYXMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVJlY3RcclxuXHJcbmZ1bmN0aW9uIHBhcnNlUmVjdCAoYXJnKSB7XHJcbiAgdmFyIHJlY3RcclxuXHJcbiAgLy8gZGlyZWN0IGFyZ3VtZW50cyBzZXF1ZW5jZVxyXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgYXJnID0gYXJndW1lbnRzXHJcbiAgfVxyXG5cclxuICAvLyBzdmcgdmlld2JveFxyXG4gIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJykge1xyXG4gICAgYXJnID0gYXJnLnNwbGl0KC9cXHMvKS5tYXAocGFyc2VGbG9hdClcclxuICB9XHJcbiAgZWxzZSBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcclxuICAgIGFyZyA9IFthcmddXHJcbiAgfVxyXG5cclxuICAvLyAwLCAwLCAxMDAsIDEwMCAtIGFycmF5LWxpa2VcclxuICBpZiAoYXJnLmxlbmd0aCAmJiB0eXBlb2YgYXJnWzBdID09PSAnbnVtYmVyJykge1xyXG4gICAgLy8gW3csIHddXHJcbiAgICBpZiAoYXJnLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByZWN0ID0ge1xyXG4gICAgICAgIHdpZHRoOiBhcmdbMF0sXHJcbiAgICAgICAgaGVpZ2h0OiBhcmdbMF0sXHJcbiAgICAgICAgeDogMCwgeTogMFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBbdywgaF1cclxuICAgIGVsc2UgaWYgKGFyZy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgcmVjdCA9IHtcclxuICAgICAgICB3aWR0aDogYXJnWzBdLFxyXG4gICAgICAgIGhlaWdodDogYXJnWzFdLFxyXG4gICAgICAgIHg6IDAsIHk6IDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gW2wsIHQsIHIsIGJdXHJcbiAgICBlbHNlIHtcclxuICAgICAgcmVjdCA9IHtcclxuICAgICAgICB4OiBhcmdbMF0sXHJcbiAgICAgICAgeTogYXJnWzFdLFxyXG4gICAgICAgIHdpZHRoOiAoYXJnWzJdIC0gYXJnWzBdKSB8fCAwLFxyXG4gICAgICAgIGhlaWdodDogKGFyZ1szXSAtIGFyZ1sxXSkgfHwgMFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIHt4LCB5LCB3LCBofSBvciB7bCwgdCwgYiwgcn1cclxuICBlbHNlIGlmIChhcmcpIHtcclxuICAgIGFyZyA9IHBpY2soYXJnLCB7XHJcbiAgICAgIGxlZnQ6ICd4IGwgbGVmdCBMZWZ0JyxcclxuICAgICAgdG9wOiAneSB0IHRvcCBUb3AnLFxyXG4gICAgICB3aWR0aDogJ3cgd2lkdGggVyBXaWR0aCcsXHJcbiAgICAgIGhlaWdodDogJ2ggaGVpZ2h0IFcgV2lkdGgnLFxyXG4gICAgICBib3R0b206ICdiIGJvdHRvbSBCb3R0b20nLFxyXG4gICAgICByaWdodDogJ3IgcmlnaHQgUmlnaHQnXHJcbiAgICB9KVxyXG5cclxuICAgIHJlY3QgPSB7XHJcbiAgICAgIHg6IGFyZy5sZWZ0IHx8IDAsXHJcbiAgICAgIHk6IGFyZy50b3AgfHwgMFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChhcmcud2lkdGggPT0gbnVsbCkge1xyXG4gICAgICBpZiAoYXJnLnJpZ2h0KSByZWN0LndpZHRoID0gYXJnLnJpZ2h0IC0gcmVjdC54XHJcbiAgICAgIGVsc2UgcmVjdC53aWR0aCA9IDBcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZWN0LndpZHRoID0gYXJnLndpZHRoXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFyZy5oZWlnaHQgPT0gbnVsbCkge1xyXG4gICAgICBpZiAoYXJnLmJvdHRvbSkgcmVjdC5oZWlnaHQgPSBhcmcuYm90dG9tIC0gcmVjdC55XHJcbiAgICAgIGVsc2UgcmVjdC5oZWlnaHQgPSAwXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmVjdC5oZWlnaHQgPSBhcmcuaGVpZ2h0XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVjdFxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGljayAoc3JjLCBwcm9wcywga2VlcFJlc3QpIHtcclxuXHR2YXIgcmVzdWx0ID0ge30sIHByb3AsIGlcclxuXHJcblx0aWYgKHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycpIHByb3BzID0gdG9MaXN0KHByb3BzKVxyXG5cdGlmIChBcnJheS5pc0FycmF5KHByb3BzKSkge1xyXG5cdFx0dmFyIHJlcyA9IHt9XHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0cmVzW3Byb3BzW2ldXSA9IHRydWVcclxuXHRcdH1cclxuXHRcdHByb3BzID0gcmVzXHJcblx0fVxyXG5cclxuXHQvLyBjb252ZXJ0IHN0cmluZ3MgdG8gbGlzdHNcclxuXHRmb3IgKHByb3AgaW4gcHJvcHMpIHtcclxuXHRcdHByb3BzW3Byb3BdID0gdG9MaXN0KHByb3BzW3Byb3BdKVxyXG5cdH1cclxuXHJcblx0Ly8ga2VlcC1yZXN0IHN0cmF0ZWd5IHJlcXVpcmVzIHVubWF0Y2hlZCBwcm9wcyB0byBiZSBwcmVzZXJ2ZWRcclxuXHR2YXIgb2NjdXBpZWQgPSB7fVxyXG5cclxuXHRmb3IgKHByb3AgaW4gcHJvcHMpIHtcclxuXHRcdHZhciBhbGlhc2VzID0gcHJvcHNbcHJvcF1cclxuXHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhbGlhc2VzKSkge1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgYWxpYXNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBhbGlhcyA9IGFsaWFzZXNbaV1cclxuXHJcblx0XHRcdFx0aWYgKGtlZXBSZXN0KSB7XHJcblx0XHRcdFx0XHRvY2N1cGllZFthbGlhc10gPSB0cnVlXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoYWxpYXMgaW4gc3JjKSB7XHJcblx0XHRcdFx0XHRyZXN1bHRbcHJvcF0gPSBzcmNbYWxpYXNdXHJcblxyXG5cdFx0XHRcdFx0aWYgKGtlZXBSZXN0KSB7XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSBpOyBqIDwgYWxpYXNlcy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0XHRcdG9jY3VwaWVkW2FsaWFzZXNbal1dID0gdHJ1ZVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHByb3AgaW4gc3JjKSB7XHJcblx0XHRcdGlmIChwcm9wc1twcm9wXSkge1xyXG5cdFx0XHRcdHJlc3VsdFtwcm9wXSA9IHNyY1twcm9wXVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoa2VlcFJlc3QpIHtcclxuXHRcdFx0XHRvY2N1cGllZFtwcm9wXSA9IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aWYgKGtlZXBSZXN0KSB7XHJcblx0XHRmb3IgKHByb3AgaW4gc3JjKSB7XHJcblx0XHRcdGlmIChvY2N1cGllZFtwcm9wXSkgY29udGludWVcclxuXHRcdFx0cmVzdWx0W3Byb3BdID0gc3JjW3Byb3BdXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbnZhciBDQUNIRSA9IHt9XHJcblxyXG5mdW5jdGlvbiB0b0xpc3QoYXJnKSB7XHJcblx0aWYgKENBQ0hFW2FyZ10pIHJldHVybiBDQUNIRVthcmddXHJcblx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRhcmcgPSBDQUNIRVthcmddID0gYXJnLnNwbGl0KC9cXHMqLFxccyp8XFxzKy8pXHJcblx0fVxyXG5cdHJldHVybiBhcmdcclxufVxyXG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBiYXNlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hdHRyaWJ1dGVzJyk7XG52YXIgc2NhdHRlckF0dHJzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBvdmVycmlkZUFsbCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL2VkaXRfdHlwZXMnKS5vdmVycmlkZUFsbDtcbnZhciBEQVNIRVMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpLkRBU0hFUztcblxudmFyIHNjYXR0ZXJMaW5lQXR0cnMgPSBzY2F0dGVyQXR0cnMubGluZTtcbnZhciBzY2F0dGVyTWFya2VyQXR0cnMgPSBzY2F0dGVyQXR0cnMubWFya2VyO1xudmFyIHNjYXR0ZXJNYXJrZXJMaW5lQXR0cnMgPSBzY2F0dGVyTWFya2VyQXR0cnMubGluZTtcblxudmFyIGF0dHJzID0gbW9kdWxlLmV4cG9ydHMgPSBvdmVycmlkZUFsbCh7XG4gICAgeDogc2NhdHRlckF0dHJzLngsXG4gICAgeDA6IHNjYXR0ZXJBdHRycy54MCxcbiAgICBkeDogc2NhdHRlckF0dHJzLmR4LFxuICAgIHk6IHNjYXR0ZXJBdHRycy55LFxuICAgIHkwOiBzY2F0dGVyQXR0cnMueTAsXG4gICAgZHk6IHNjYXR0ZXJBdHRycy5keSxcblxuICAgIHRleHQ6IHNjYXR0ZXJBdHRycy50ZXh0LFxuICAgIGhvdmVydGV4dDogc2NhdHRlckF0dHJzLmhvdmVydGV4dCxcblxuICAgIHRleHRwb3NpdGlvbjogc2NhdHRlckF0dHJzLnRleHRwb3NpdGlvbixcbiAgICB0ZXh0Zm9udDogc2NhdHRlckF0dHJzLnRleHRmb250LFxuXG4gICAgbW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZmxhZ2xpc3QnLFxuICAgICAgICBmbGFnczogWydsaW5lcycsICdtYXJrZXJzJywgJ3RleHQnXSxcbiAgICAgICAgZXh0cmFzOiBbJ25vbmUnXSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgdGhlIGRyYXdpbmcgbW9kZSBmb3IgdGhpcyBzY2F0dGVyIHRyYWNlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGxpbmU6IHtcbiAgICAgICAgY29sb3I6IHNjYXR0ZXJMaW5lQXR0cnMuY29sb3IsXG4gICAgICAgIHdpZHRoOiBzY2F0dGVyTGluZUF0dHJzLndpZHRoLFxuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ2xpbmVhcicsICdodicsICd2aCcsICdodmgnLCAndmh2J10sXG4gICAgICAgICAgICBkZmx0OiAnbGluZWFyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnRGV0ZXJtaW5lcyB0aGUgbGluZSBzaGFwZS4nLFxuICAgICAgICAgICAgICAgICdUaGUgdmFsdWVzIGNvcnJlc3BvbmQgdG8gc3RlcC13aXNlIGxpbmUgc2hhcGVzLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGRhc2g6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogT2JqZWN0LmtleXMoREFTSEVTKSxcbiAgICAgICAgICAgIGRmbHQ6ICdzb2xpZCcsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBzdHlsZSBvZiB0aGUgbGluZXMuJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtYXJrZXI6IGV4dGVuZEZsYXQoe30sIGNvbG9yU2NhbGVBdHRycygnbWFya2VyJyksIHtcbiAgICAgICAgc3ltYm9sOiBzY2F0dGVyTWFya2VyQXR0cnMuc3ltYm9sLFxuICAgICAgICBzaXplOiBzY2F0dGVyTWFya2VyQXR0cnMuc2l6ZSxcbiAgICAgICAgc2l6ZXJlZjogc2NhdHRlck1hcmtlckF0dHJzLnNpemVyZWYsXG4gICAgICAgIHNpemVtaW46IHNjYXR0ZXJNYXJrZXJBdHRycy5zaXplbWluLFxuICAgICAgICBzaXplbW9kZTogc2NhdHRlck1hcmtlckF0dHJzLnNpemVtb2RlLFxuICAgICAgICBvcGFjaXR5OiBzY2F0dGVyTWFya2VyQXR0cnMub3BhY2l0eSxcbiAgICAgICAgY29sb3JiYXI6IHNjYXR0ZXJNYXJrZXJBdHRycy5jb2xvcmJhcixcbiAgICAgICAgbGluZTogZXh0ZW5kRmxhdCh7fSwgY29sb3JTY2FsZUF0dHJzKCdtYXJrZXIubGluZScpLCB7XG4gICAgICAgICAgICB3aWR0aDogc2NhdHRlck1hcmtlckxpbmVBdHRycy53aWR0aFxuICAgICAgICB9KVxuICAgIH0pLFxuICAgIGNvbm5lY3RnYXBzOiBzY2F0dGVyQXR0cnMuY29ubmVjdGdhcHMsXG4gICAgZmlsbDogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLmZpbGwsIHtkZmx0OiAnbm9uZSd9KSxcbiAgICBmaWxsY29sb3I6IHNjYXR0ZXJBdHRycy5maWxsY29sb3IsXG5cbiAgICAvLyBubyBob3Zlcm9uXG5cbiAgICBzZWxlY3RlZDoge1xuICAgICAgICBtYXJrZXI6IHNjYXR0ZXJBdHRycy5zZWxlY3RlZC5tYXJrZXIsXG4gICAgICAgIHRleHRmb250OiBzY2F0dGVyQXR0cnMuc2VsZWN0ZWQudGV4dGZvbnRcbiAgICB9LFxuICAgIHVuc2VsZWN0ZWQ6IHtcbiAgICAgICAgbWFya2VyOiBzY2F0dGVyQXR0cnMudW5zZWxlY3RlZC5tYXJrZXIsXG4gICAgICAgIHRleHRmb250OiBzY2F0dGVyQXR0cnMudW5zZWxlY3RlZC50ZXh0Zm9udFxuICAgIH0sXG5cbiAgICBvcGFjaXR5OiBiYXNlQXR0cnMub3BhY2l0eVxuXG59LCAnY2FsYycsICduZXN0ZWQnKTtcblxuYXR0cnMueC5lZGl0VHlwZSA9IGF0dHJzLnkuZWRpdFR5cGUgPSBhdHRycy54MC5lZGl0VHlwZSA9IGF0dHJzLnkwLmVkaXRUeXBlID0gJ2NhbGMrY2xlYXJBeGlzVHlwZXMnO1xuYXR0cnMuaG92ZXJ0ZW1wbGF0ZSA9IHNjYXR0ZXJBdHRycy5ob3ZlcnRlbXBsYXRlO1xuYXR0cnMudGV4dHRlbXBsYXRlID0gc2NhdHRlckF0dHJzLnRleHR0ZW1wbGF0ZTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNZTUJPTF9TSVpFID0gMjA7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFRPT19NQU5ZX1BPSU5UUzogMWU1LFxuXG4gICAgU1lNQk9MX1NERl9TSVpFOiAyMDAsXG4gICAgU1lNQk9MX1NJWkU6IFNZTUJPTF9TSVpFLFxuICAgIFNZTUJPTF9TVFJPS0U6IFNZTUJPTF9TSVpFIC8gMjAsXG5cbiAgICBET1RfUkU6IC8tZG90LyxcbiAgICBPUEVOX1JFOiAvLW9wZW4vLFxuXG4gICAgREFTSEVTOiB7XG4gICAgICAgIHNvbGlkOiBbMV0sXG4gICAgICAgIGRvdDogWzEsIDFdLFxuICAgICAgICBkYXNoOiBbNCwgMV0sXG4gICAgICAgIGxvbmdkYXNoOiBbOCwgMV0sXG4gICAgICAgIGRhc2hkb3Q6IFs0LCAxLCAxLCAxXSxcbiAgICAgICAgbG9uZ2Rhc2hkb3Q6IFs4LCAxLCAxLCAxXVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIHN2Z1NkZiA9IHJlcXVpcmUoJ3N2Zy1wYXRoLXNkZicpO1xudmFyIHJnYmEgPSByZXF1aXJlKCdjb2xvci1ub3JtYWxpemUnKTtcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgQXhpc0lEcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGlzX2lkcycpO1xuXG52YXIgZm9ybWF0Q29sb3IgPSByZXF1aXJlKCcuLi8uLi9saWIvZ2xfZm9ybWF0X2NvbG9yJykuZm9ybWF0Q29sb3I7XG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgbWFrZUJ1YmJsZVNpemVGbiA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFrZV9idWJibGVfc2l6ZV9mdW5jJyk7XG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbnZhciBERVNFTEVDVERJTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9pbnRlcmFjdGlvbnMnKS5ERVNFTEVDVERJTTtcblxudmFyIFRFWFRPRkZTRVRTSUdOID0ge1xuICAgIHN0YXJ0OiAxLCBsZWZ0OiAxLCBlbmQ6IC0xLCByaWdodDogLTEsIG1pZGRsZTogMCwgY2VudGVyOiAwLCBib3R0b206IDEsIHRvcDogLTFcbn07XG5cbnZhciBhcHBlbmRBcnJheVBvaW50VmFsdWUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Z4L2hlbHBlcnMnKS5hcHBlbmRBcnJheVBvaW50VmFsdWU7XG5cbmZ1bmN0aW9uIGNvbnZlcnRTdHlsZShnZCwgdHJhY2UpIHtcbiAgICB2YXIgaTtcblxuICAgIHZhciBvcHRzID0ge1xuICAgICAgICBtYXJrZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgbWFya2VyU2VsOiB1bmRlZmluZWQsXG4gICAgICAgIG1hcmtlclVuc2VsOiB1bmRlZmluZWQsXG4gICAgICAgIGxpbmU6IHVuZGVmaW5lZCxcbiAgICAgICAgZmlsbDogdW5kZWZpbmVkLFxuICAgICAgICBlcnJvclg6IHVuZGVmaW5lZCxcbiAgICAgICAgZXJyb3JZOiB1bmRlZmluZWQsXG4gICAgICAgIHRleHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgdGV4dFNlbDogdW5kZWZpbmVkLFxuICAgICAgICB0ZXh0VW5zZWw6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBpZih0cmFjZS52aXNpYmxlICE9PSB0cnVlKSByZXR1cm4gb3B0cztcblxuICAgIGlmKHN1YlR5cGVzLmhhc1RleHQodHJhY2UpKSB7XG4gICAgICAgIG9wdHMudGV4dCA9IGNvbnZlcnRUZXh0U3R5bGUoZ2QsIHRyYWNlKTtcbiAgICAgICAgb3B0cy50ZXh0U2VsID0gY29udmVydFRleHRTZWxlY3Rpb24oZ2QsIHRyYWNlLCB0cmFjZS5zZWxlY3RlZCk7XG4gICAgICAgIG9wdHMudGV4dFVuc2VsID0gY29udmVydFRleHRTZWxlY3Rpb24oZ2QsIHRyYWNlLCB0cmFjZS51bnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBpZihzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlKSkge1xuICAgICAgICBvcHRzLm1hcmtlciA9IGNvbnZlcnRNYXJrZXJTdHlsZSh0cmFjZSk7XG4gICAgICAgIG9wdHMubWFya2VyU2VsID0gY29udmVydE1hcmtlclNlbGVjdGlvbih0cmFjZSwgdHJhY2Uuc2VsZWN0ZWQpO1xuICAgICAgICBvcHRzLm1hcmtlclVuc2VsID0gY29udmVydE1hcmtlclNlbGVjdGlvbih0cmFjZSwgdHJhY2UudW5zZWxlY3RlZCk7XG5cbiAgICAgICAgaWYoIXRyYWNlLnVuc2VsZWN0ZWQgJiYgTGliLmlzQXJyYXlPclR5cGVkQXJyYXkodHJhY2UubWFya2VyLm9wYWNpdHkpKSB7XG4gICAgICAgICAgICB2YXIgbW8gPSB0cmFjZS5tYXJrZXIub3BhY2l0eTtcbiAgICAgICAgICAgIG9wdHMubWFya2VyVW5zZWwub3BhY2l0eSA9IG5ldyBBcnJheShtby5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbW8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1hcmtlclVuc2VsLm9wYWNpdHlbaV0gPSBERVNFTEVDVERJTSAqIG1vW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoc3ViVHlwZXMuaGFzTGluZXModHJhY2UpKSB7XG4gICAgICAgIG9wdHMubGluZSA9IHtcbiAgICAgICAgICAgIG92ZXJsYXk6IHRydWUsXG4gICAgICAgICAgICB0aGlja25lc3M6IHRyYWNlLmxpbmUud2lkdGgsXG4gICAgICAgICAgICBjb2xvcjogdHJhY2UubGluZS5jb2xvcixcbiAgICAgICAgICAgIG9wYWNpdHk6IHRyYWNlLm9wYWNpdHlcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZGFzaGVzID0gKGNvbnN0YW50cy5EQVNIRVNbdHJhY2UubGluZS5kYXNoXSB8fCBbMV0pLnNsaWNlKCk7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGRhc2hlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZGFzaGVzW2ldICo9IHRyYWNlLmxpbmUud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgb3B0cy5saW5lLmRhc2hlcyA9IGRhc2hlcztcbiAgICB9XG5cbiAgICBpZih0cmFjZS5lcnJvcl94ICYmIHRyYWNlLmVycm9yX3gudmlzaWJsZSkge1xuICAgICAgICBvcHRzLmVycm9yWCA9IGNvbnZlcnRFcnJvckJhclN0eWxlKHRyYWNlLCB0cmFjZS5lcnJvcl94KTtcbiAgICB9XG5cbiAgICBpZih0cmFjZS5lcnJvcl95ICYmIHRyYWNlLmVycm9yX3kudmlzaWJsZSkge1xuICAgICAgICBvcHRzLmVycm9yWSA9IGNvbnZlcnRFcnJvckJhclN0eWxlKHRyYWNlLCB0cmFjZS5lcnJvcl95KTtcbiAgICB9XG5cbiAgICBpZighIXRyYWNlLmZpbGwgJiYgdHJhY2UuZmlsbCAhPT0gJ25vbmUnKSB7XG4gICAgICAgIG9wdHMuZmlsbCA9IHtcbiAgICAgICAgICAgIGNsb3NlZDogdHJ1ZSxcbiAgICAgICAgICAgIGZpbGw6IHRyYWNlLmZpbGxjb2xvcixcbiAgICAgICAgICAgIHRoaWNrbmVzczogMFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBvcHRzO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VGV4dFN0eWxlKGdkLCB0cmFjZSkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGNvdW50ID0gdHJhY2UuX2xlbmd0aDtcbiAgICB2YXIgdGV4dGZvbnRJbiA9IHRyYWNlLnRleHRmb250O1xuICAgIHZhciB0ZXh0cG9zaXRpb25JbiA9IHRyYWNlLnRleHRwb3NpdGlvbjtcbiAgICB2YXIgdGV4dFBvcyA9IEFycmF5LmlzQXJyYXkodGV4dHBvc2l0aW9uSW4pID8gdGV4dHBvc2l0aW9uSW4gOiBbdGV4dHBvc2l0aW9uSW5dO1xuICAgIHZhciB0ZmMgPSB0ZXh0Zm9udEluLmNvbG9yO1xuICAgIHZhciB0ZnMgPSB0ZXh0Zm9udEluLnNpemU7XG4gICAgdmFyIHRmZiA9IHRleHRmb250SW4uZmFtaWx5O1xuICAgIHZhciBvcHRzT3V0ID0ge307XG4gICAgdmFyIGk7XG5cbiAgICB2YXIgdGV4dHRlbXBsYXRlID0gdHJhY2UudGV4dHRlbXBsYXRlO1xuICAgIGlmKHRleHR0ZW1wbGF0ZSkge1xuICAgICAgICBvcHRzT3V0LnRleHQgPSBbXTtcblxuICAgICAgICB2YXIgZDNsb2NhbGUgPSBmdWxsTGF5b3V0Ll9kM2xvY2FsZTtcbiAgICAgICAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHRleHR0ZW1wbGF0ZSk7XG4gICAgICAgIHZhciBOID0gaXNBcnJheSA/IE1hdGgubWluKHRleHR0ZW1wbGF0ZS5sZW5ndGgsIGNvdW50KSA6IGNvdW50O1xuICAgICAgICB2YXIgdHh0ID0gaXNBcnJheSA/XG4gICAgICAgICAgICBmdW5jdGlvbihpKSB7IHJldHVybiB0ZXh0dGVtcGxhdGVbaV07IH0gOlxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7IHJldHVybiB0ZXh0dGVtcGxhdGU7IH07XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZCA9IHtpOiBpfTtcbiAgICAgICAgICAgIHZhciBsYWJlbHMgPSB0cmFjZS5fbW9kdWxlLmZvcm1hdExhYmVscyhkLCB0cmFjZSwgZnVsbExheW91dCk7XG4gICAgICAgICAgICB2YXIgcG9pbnRWYWx1ZXMgPSB7fTtcbiAgICAgICAgICAgIGFwcGVuZEFycmF5UG9pbnRWYWx1ZShwb2ludFZhbHVlcywgdHJhY2UsIGkpO1xuICAgICAgICAgICAgdmFyIG1ldGEgPSB0cmFjZS5fbWV0YSB8fCB7fTtcbiAgICAgICAgICAgIG9wdHNPdXQudGV4dC5wdXNoKExpYi50ZXh0dGVtcGxhdGVTdHJpbmcodHh0KGkpLCBsYWJlbHMsIGQzbG9jYWxlLCBwb2ludFZhbHVlcywgZCwgbWV0YSkpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0cmFjZS50ZXh0KSAmJiB0cmFjZS50ZXh0Lmxlbmd0aCA8IGNvdW50KSB7XG4gICAgICAgICAgICAvLyBpZiB0ZXh0IGFycmF5IGlzIHNob3J0ZXIsIHdlJ2xsIG5lZWQgdG8gYXBwZW5kIHRvIGl0LCBzbyBsZXQncyBzbGljZSB0byBwcmV2ZW50IG11dGF0aW5nXG4gICAgICAgICAgICBvcHRzT3V0LnRleHQgPSB0cmFjZS50ZXh0LnNsaWNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRzT3V0LnRleHQgPSB0cmFjZS50ZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHBhZCB0ZXh0IGFycmF5IHdpdGggZW1wdHkgc3RyaW5nc1xuICAgIGlmKEFycmF5LmlzQXJyYXkob3B0c091dC50ZXh0KSkge1xuICAgICAgICBmb3IoaSA9IG9wdHNPdXQudGV4dC5sZW5ndGg7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBvcHRzT3V0LnRleHRbaV0gPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wdHNPdXQub3BhY2l0eSA9IHRyYWNlLm9wYWNpdHk7XG4gICAgb3B0c091dC5mb250ID0ge307XG4gICAgb3B0c091dC5hbGlnbiA9IFtdO1xuICAgIG9wdHNPdXQuYmFzZWxpbmUgPSBbXTtcblxuICAgIGZvcihpID0gMDsgaSA8IHRleHRQb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRwID0gdGV4dFBvc1tpXS5zcGxpdCgvXFxzKy8pO1xuXG4gICAgICAgIHN3aXRjaCh0cFsxXSkge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgb3B0c091dC5hbGlnbi5wdXNoKCdyaWdodCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIG9wdHNPdXQuYWxpZ24ucHVzaCgnbGVmdCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBvcHRzT3V0LmFsaWduLnB1c2godHBbMV0pO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCh0cFswXSkge1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICBvcHRzT3V0LmJhc2VsaW5lLnB1c2goJ2JvdHRvbScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICBvcHRzT3V0LmJhc2VsaW5lLnB1c2goJ3RvcCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBvcHRzT3V0LmJhc2VsaW5lLnB1c2godHBbMF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoQXJyYXkuaXNBcnJheSh0ZmMpKSB7XG4gICAgICAgIG9wdHNPdXQuY29sb3IgPSBuZXcgQXJyYXkoY291bnQpO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBvcHRzT3V0LmNvbG9yW2ldID0gdGZjW2ldO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3B0c091dC5jb2xvciA9IHRmYztcbiAgICB9XG5cbiAgICBpZihMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh0ZnMpIHx8IEFycmF5LmlzQXJyYXkodGZmKSkge1xuICAgICAgICAvLyBpZiBhbnkgdGV4dGZvbnQgcGFyYW0gaXMgYXJyYXkgLSBtYWtlIHJlbmRlciBhIGJhdGNoXG4gICAgICAgIG9wdHNPdXQuZm9udCA9IG5ldyBBcnJheShjb3VudCk7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBmb250aSA9IG9wdHNPdXQuZm9udFtpXSA9IHt9O1xuXG4gICAgICAgICAgICBmb250aS5zaXplID0gKFxuICAgICAgICAgICAgICAgIExpYi5pc1R5cGVkQXJyYXkodGZzKSA/IHRmc1tpXSA6XG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh0ZnMpID8gKFxuICAgICAgICAgICAgICAgICAgICBpc051bWVyaWModGZzW2ldKSA/IHRmc1tpXSA6IDBcbiAgICAgICAgICAgICAgICApIDogdGZzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBmb250aS5mYW1pbHkgPSBBcnJheS5pc0FycmF5KHRmZikgPyB0ZmZbaV0gOiB0ZmY7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBib3RoIGFyZSBzaW5nbGUgdmFsdWVzLCBtYWtlIHJlbmRlciBmYXN0IHNpbmdsZS12YWx1ZVxuICAgICAgICBvcHRzT3V0LmZvbnQgPSB7c2l6ZTogdGZzLCBmYW1pbHk6IHRmZn07XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdHNPdXQ7XG59XG5cblxuZnVuY3Rpb24gY29udmVydE1hcmtlclN0eWxlKHRyYWNlKSB7XG4gICAgdmFyIGNvdW50ID0gdHJhY2UuX2xlbmd0aDtcbiAgICB2YXIgb3B0c0luID0gdHJhY2UubWFya2VyO1xuICAgIHZhciBvcHRzT3V0ID0ge307XG4gICAgdmFyIGk7XG5cbiAgICB2YXIgbXVsdGlTeW1ib2wgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShvcHRzSW4uc3ltYm9sKTtcbiAgICB2YXIgbXVsdGlDb2xvciA9IExpYi5pc0FycmF5T3JUeXBlZEFycmF5KG9wdHNJbi5jb2xvcik7XG4gICAgdmFyIG11bHRpTGluZUNvbG9yID0gTGliLmlzQXJyYXlPclR5cGVkQXJyYXkob3B0c0luLmxpbmUuY29sb3IpO1xuICAgIHZhciBtdWx0aU9wYWNpdHkgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShvcHRzSW4ub3BhY2l0eSk7XG4gICAgdmFyIG11bHRpU2l6ZSA9IExpYi5pc0FycmF5T3JUeXBlZEFycmF5KG9wdHNJbi5zaXplKTtcbiAgICB2YXIgbXVsdGlMaW5lV2lkdGggPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShvcHRzSW4ubGluZS53aWR0aCk7XG5cbiAgICB2YXIgaXNPcGVuO1xuICAgIGlmKCFtdWx0aVN5bWJvbCkgaXNPcGVuID0gaGVscGVycy5pc09wZW5TeW1ib2wob3B0c0luLnN5bWJvbCk7XG5cbiAgICAvLyBwcmVwYXJlIGNvbG9yc1xuICAgIGlmKG11bHRpU3ltYm9sIHx8IG11bHRpQ29sb3IgfHwgbXVsdGlMaW5lQ29sb3IgfHwgbXVsdGlPcGFjaXR5KSB7XG4gICAgICAgIG9wdHNPdXQuY29sb3JzID0gbmV3IEFycmF5KGNvdW50KTtcbiAgICAgICAgb3B0c091dC5ib3JkZXJDb2xvcnMgPSBuZXcgQXJyYXkoY291bnQpO1xuXG4gICAgICAgIHZhciBjb2xvcnMgPSBmb3JtYXRDb2xvcihvcHRzSW4sIG9wdHNJbi5vcGFjaXR5LCBjb3VudCk7XG4gICAgICAgIHZhciBib3JkZXJDb2xvcnMgPSBmb3JtYXRDb2xvcihvcHRzSW4ubGluZSwgb3B0c0luLm9wYWNpdHksIGNvdW50KTtcblxuICAgICAgICBpZighQXJyYXkuaXNBcnJheShib3JkZXJDb2xvcnNbMF0pKSB7XG4gICAgICAgICAgICB2YXIgYm9yZGVyQ29sb3IgPSBib3JkZXJDb2xvcnM7XG4gICAgICAgICAgICBib3JkZXJDb2xvcnMgPSBBcnJheShjb3VudCk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3JzW2ldID0gYm9yZGVyQ29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkoY29sb3JzWzBdKSkge1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JzO1xuICAgICAgICAgICAgY29sb3JzID0gQXJyYXkoY291bnQpO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbG9yc1tpXSA9IGNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb3B0c091dC5jb2xvcnMgPSBjb2xvcnM7XG4gICAgICAgIG9wdHNPdXQuYm9yZGVyQ29sb3JzID0gYm9yZGVyQ29sb3JzO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGlmKG11bHRpU3ltYm9sKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN5bWJvbCA9IG9wdHNJbi5zeW1ib2xbaV07XG4gICAgICAgICAgICAgICAgaXNPcGVuID0gaGVscGVycy5pc09wZW5TeW1ib2woc3ltYm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGlzT3Blbikge1xuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yc1tpXSA9IGNvbG9yc1tpXS5zbGljZSgpO1xuICAgICAgICAgICAgICAgIGNvbG9yc1tpXSA9IGNvbG9yc1tpXS5zbGljZSgpO1xuICAgICAgICAgICAgICAgIGNvbG9yc1tpXVszXSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzT3V0Lm9wYWNpdHkgPSB0cmFjZS5vcGFjaXR5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGlzT3Blbikge1xuICAgICAgICAgICAgb3B0c091dC5jb2xvciA9IHJnYmEob3B0c0luLmNvbG9yLCAndWludDgnKTtcbiAgICAgICAgICAgIG9wdHNPdXQuY29sb3JbM10gPSAwO1xuICAgICAgICAgICAgb3B0c091dC5ib3JkZXJDb2xvciA9IHJnYmEob3B0c0luLmNvbG9yLCAndWludDgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdHNPdXQuY29sb3IgPSByZ2JhKG9wdHNJbi5jb2xvciwgJ3VpbnQ4Jyk7XG4gICAgICAgICAgICBvcHRzT3V0LmJvcmRlckNvbG9yID0gcmdiYShvcHRzSW4ubGluZS5jb2xvciwgJ3VpbnQ4Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzT3V0Lm9wYWNpdHkgPSB0cmFjZS5vcGFjaXR5ICogb3B0c0luLm9wYWNpdHk7XG4gICAgfVxuXG4gICAgLy8gcHJlcGFyZSBzeW1ib2xzXG4gICAgaWYobXVsdGlTeW1ib2wpIHtcbiAgICAgICAgb3B0c091dC5tYXJrZXJzID0gbmV3IEFycmF5KGNvdW50KTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgb3B0c091dC5tYXJrZXJzW2ldID0gZ2V0U3ltYm9sU2RmKG9wdHNJbi5zeW1ib2xbaV0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3B0c091dC5tYXJrZXIgPSBnZXRTeW1ib2xTZGYob3B0c0luLnN5bWJvbCk7XG4gICAgfVxuXG4gICAgLy8gcHJlcGFyZSBzaXplc1xuICAgIHZhciBtYXJrZXJTaXplRnVuYyA9IG1ha2VCdWJibGVTaXplRm4odHJhY2UpO1xuICAgIHZhciBzO1xuXG4gICAgaWYobXVsdGlTaXplIHx8IG11bHRpTGluZVdpZHRoKSB7XG4gICAgICAgIHZhciBzaXplcyA9IG9wdHNPdXQuc2l6ZXMgPSBuZXcgQXJyYXkoY291bnQpO1xuICAgICAgICB2YXIgYm9yZGVyU2l6ZXMgPSBvcHRzT3V0LmJvcmRlclNpemVzID0gbmV3IEFycmF5KGNvdW50KTtcbiAgICAgICAgdmFyIHNpemVUb3RhbCA9IDA7XG4gICAgICAgIHZhciBzaXplQXZnO1xuXG4gICAgICAgIGlmKG11bHRpU2l6ZSkge1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHNpemVzW2ldID0gbWFya2VyU2l6ZUZ1bmMob3B0c0luLnNpemVbaV0pO1xuICAgICAgICAgICAgICAgIHNpemVUb3RhbCArPSBzaXplc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNpemVBdmcgPSBzaXplVG90YWwgLyBjb3VudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBtYXJrZXJTaXplRnVuYyhvcHRzSW4uc2l6ZSk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2l6ZXNbaV0gPSBzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VlICBodHRwczovL2dpdGh1Yi5jb20vcGxvdGx5L3Bsb3RseS5qcy9wdWxsLzE3ODEjZGlzY3Vzc2lvbl9yMTIxODIwNzk4XG4gICAgICAgIGlmKG11bHRpTGluZVdpZHRoKSB7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyU2l6ZXNbaV0gPSBvcHRzSW4ubGluZS53aWR0aFtpXSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzID0gb3B0c0luLmxpbmUud2lkdGggLyAyO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGJvcmRlclNpemVzW2ldID0gcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHNPdXQuc2l6ZUF2ZyA9IHNpemVBdmc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3B0c091dC5zaXplID0gbWFya2VyU2l6ZUZ1bmMob3B0c0luICYmIG9wdHNJbi5zaXplIHx8IDEwKTtcbiAgICAgICAgb3B0c091dC5ib3JkZXJTaXplcyA9IG1hcmtlclNpemVGdW5jKG9wdHNJbi5saW5lLndpZHRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0c091dDtcbn1cblxuZnVuY3Rpb24gY29udmVydE1hcmtlclNlbGVjdGlvbih0cmFjZSwgdGFyZ2V0KSB7XG4gICAgdmFyIG9wdHNJbiA9IHRyYWNlLm1hcmtlcjtcbiAgICB2YXIgb3B0c091dCA9IHt9O1xuXG4gICAgaWYoIXRhcmdldCkgcmV0dXJuIG9wdHNPdXQ7XG5cbiAgICBpZih0YXJnZXQubWFya2VyICYmIHRhcmdldC5tYXJrZXIuc3ltYm9sKSB7XG4gICAgICAgIG9wdHNPdXQgPSBjb252ZXJ0TWFya2VyU3R5bGUoTGliLmV4dGVuZEZsYXQoe30sIG9wdHNJbiwgdGFyZ2V0Lm1hcmtlcikpO1xuICAgIH0gZWxzZSBpZih0YXJnZXQubWFya2VyKSB7XG4gICAgICAgIGlmKHRhcmdldC5tYXJrZXIuc2l6ZSkgb3B0c091dC5zaXplID0gdGFyZ2V0Lm1hcmtlci5zaXplIC8gMjtcbiAgICAgICAgaWYodGFyZ2V0Lm1hcmtlci5jb2xvcikgb3B0c091dC5jb2xvcnMgPSB0YXJnZXQubWFya2VyLmNvbG9yO1xuICAgICAgICBpZih0YXJnZXQubWFya2VyLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkgb3B0c091dC5vcGFjaXR5ID0gdGFyZ2V0Lm1hcmtlci5vcGFjaXR5O1xuICAgIH1cblxuICAgIHJldHVybiBvcHRzT3V0O1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VGV4dFNlbGVjdGlvbihnZCwgdHJhY2UsIHRhcmdldCkge1xuICAgIHZhciBvcHRzT3V0ID0ge307XG5cbiAgICBpZighdGFyZ2V0KSByZXR1cm4gb3B0c091dDtcblxuICAgIGlmKHRhcmdldC50ZXh0Zm9udCkge1xuICAgICAgICB2YXIgb3B0c0luID0ge1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIHRleHQ6IHRyYWNlLnRleHQsXG4gICAgICAgICAgICB0ZXh0dGVtcGxhdGU6IHRyYWNlLnRleHR0ZW1wbGF0ZSxcbiAgICAgICAgICAgIHRleHRwb3NpdGlvbjogdHJhY2UudGV4dHBvc2l0aW9uLFxuICAgICAgICAgICAgdGV4dGZvbnQ6IExpYi5leHRlbmRGbGF0KHt9LCB0cmFjZS50ZXh0Zm9udClcbiAgICAgICAgfTtcbiAgICAgICAgaWYodGFyZ2V0LnRleHRmb250KSB7XG4gICAgICAgICAgICBMaWIuZXh0ZW5kRmxhdChvcHRzSW4udGV4dGZvbnQsIHRhcmdldC50ZXh0Zm9udCk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0c091dCA9IGNvbnZlcnRUZXh0U3R5bGUoZ2QsIG9wdHNJbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdHNPdXQ7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRFcnJvckJhclN0eWxlKHRyYWNlLCB0YXJnZXQpIHtcbiAgICB2YXIgb3B0c091dCA9IHtcbiAgICAgICAgY2FwU2l6ZTogdGFyZ2V0LndpZHRoICogMixcbiAgICAgICAgbGluZVdpZHRoOiB0YXJnZXQudGhpY2tuZXNzLFxuICAgICAgICBjb2xvcjogdGFyZ2V0LmNvbG9yXG4gICAgfTtcblxuICAgIGlmKHRhcmdldC5jb3B5X3lzdHlsZSkge1xuICAgICAgICBvcHRzT3V0ID0gdHJhY2UuZXJyb3JfeTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0c091dDtcbn1cblxudmFyIFNZTUJPTF9TREZfU0laRSA9IGNvbnN0YW50cy5TWU1CT0xfU0RGX1NJWkU7XG52YXIgU1lNQk9MX1NJWkUgPSBjb25zdGFudHMuU1lNQk9MX1NJWkU7XG52YXIgU1lNQk9MX1NUUk9LRSA9IGNvbnN0YW50cy5TWU1CT0xfU1RST0tFO1xudmFyIFNZTUJPTF9TREYgPSB7fTtcbnZhciBTWU1CT0xfU1ZHX0NJUkNMRSA9IERyYXdpbmcuc3ltYm9sRnVuY3NbMF0oU1lNQk9MX1NJWkUgKiAwLjA1KTtcblxuZnVuY3Rpb24gZ2V0U3ltYm9sU2RmKHN5bWJvbCkge1xuICAgIGlmKHN5bWJvbCA9PT0gJ2NpcmNsZScpIHJldHVybiBudWxsO1xuXG4gICAgdmFyIHN5bWJvbFBhdGgsIHN5bWJvbFNkZjtcbiAgICB2YXIgc3ltYm9sTnVtYmVyID0gRHJhd2luZy5zeW1ib2xOdW1iZXIoc3ltYm9sKTtcbiAgICB2YXIgc3ltYm9sRnVuYyA9IERyYXdpbmcuc3ltYm9sRnVuY3Nbc3ltYm9sTnVtYmVyICUgMTAwXTtcbiAgICB2YXIgc3ltYm9sTm9Eb3QgPSAhIURyYXdpbmcuc3ltYm9sTm9Eb3Rbc3ltYm9sTnVtYmVyICUgMTAwXTtcbiAgICB2YXIgc3ltYm9sTm9GaWxsID0gISFEcmF3aW5nLnN5bWJvbE5vRmlsbFtzeW1ib2xOdW1iZXIgJSAxMDBdO1xuXG4gICAgdmFyIGlzRG90ID0gaGVscGVycy5pc0RvdFN5bWJvbChzeW1ib2wpO1xuXG4gICAgLy8gZ2V0IHN5bWJvbCBzZGYgZnJvbSBjYWNoZSBvciBnZW5lcmF0ZSBpdFxuICAgIGlmKFNZTUJPTF9TREZbc3ltYm9sXSkgcmV0dXJuIFNZTUJPTF9TREZbc3ltYm9sXTtcblxuICAgIGlmKGlzRG90ICYmICFzeW1ib2xOb0RvdCkge1xuICAgICAgICBzeW1ib2xQYXRoID0gc3ltYm9sRnVuYyhTWU1CT0xfU0laRSAqIDEuMSkgKyBTWU1CT0xfU1ZHX0NJUkNMRTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzeW1ib2xQYXRoID0gc3ltYm9sRnVuYyhTWU1CT0xfU0laRSk7XG4gICAgfVxuXG4gICAgc3ltYm9sU2RmID0gc3ZnU2RmKHN5bWJvbFBhdGgsIHtcbiAgICAgICAgdzogU1lNQk9MX1NERl9TSVpFLFxuICAgICAgICBoOiBTWU1CT0xfU0RGX1NJWkUsXG4gICAgICAgIHZpZXdCb3g6IFstU1lNQk9MX1NJWkUsIC1TWU1CT0xfU0laRSwgU1lNQk9MX1NJWkUsIFNZTUJPTF9TSVpFXSxcbiAgICAgICAgc3Ryb2tlOiBzeW1ib2xOb0ZpbGwgPyBTWU1CT0xfU1RST0tFIDogLVNZTUJPTF9TVFJPS0VcbiAgICB9KTtcbiAgICBTWU1CT0xfU0RGW3N5bWJvbF0gPSBzeW1ib2xTZGY7XG5cbiAgICByZXR1cm4gc3ltYm9sU2RmIHx8IG51bGw7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRMaW5lUG9zaXRpb25zKGdkLCB0cmFjZSwgcG9zaXRpb25zKSB7XG4gICAgdmFyIGxlbiA9IHBvc2l0aW9ucy5sZW5ndGg7XG4gICAgdmFyIGNvdW50ID0gbGVuIC8gMjtcbiAgICB2YXIgbGluZVBvc2l0aW9ucztcbiAgICB2YXIgaTtcblxuICAgIGlmKHN1YlR5cGVzLmhhc0xpbmVzKHRyYWNlKSAmJiBjb3VudCkge1xuICAgICAgICBpZih0cmFjZS5saW5lLnNoYXBlID09PSAnaHYnKSB7XG4gICAgICAgICAgICBsaW5lUG9zaXRpb25zID0gW107XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBjb3VudCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKGlzTmFOKHBvc2l0aW9uc1tpICogMl0pIHx8IGlzTmFOKHBvc2l0aW9uc1tpICogMiArIDFdKSkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25zLnB1c2goTmFOLCBOYU4sIE5hTiwgTmFOKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25zLnB1c2gocG9zaXRpb25zW2kgKiAyXSwgcG9zaXRpb25zW2kgKiAyICsgMV0pO1xuICAgICAgICAgICAgICAgICAgICBpZighaXNOYU4ocG9zaXRpb25zW2kgKiAyICsgMl0pICYmICFpc05hTihwb3NpdGlvbnNbaSAqIDIgKyAzXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVQb3NpdGlvbnMucHVzaChwb3NpdGlvbnNbaSAqIDIgKyAyXSwgcG9zaXRpb25zW2kgKiAyICsgMV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVBvc2l0aW9ucy5wdXNoKE5hTiwgTmFOKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmVQb3NpdGlvbnMucHVzaChwb3NpdGlvbnNbbGVuIC0gMl0sIHBvc2l0aW9uc1tsZW4gLSAxXSk7XG4gICAgICAgIH0gZWxzZSBpZih0cmFjZS5saW5lLnNoYXBlID09PSAnaHZoJykge1xuICAgICAgICAgICAgbGluZVBvc2l0aW9ucyA9IFtdO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgY291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihpc05hTihwb3NpdGlvbnNbaSAqIDJdKSB8fCBpc05hTihwb3NpdGlvbnNbaSAqIDIgKyAxXSkgfHwgaXNOYU4ocG9zaXRpb25zW2kgKiAyICsgMl0pIHx8IGlzTmFOKHBvc2l0aW9uc1tpICogMiArIDNdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZighaXNOYU4ocG9zaXRpb25zW2kgKiAyXSkgJiYgIWlzTmFOKHBvc2l0aW9uc1tpICogMiArIDFdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uc1tpICogMl0sIHBvc2l0aW9uc1tpICogMiArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVQb3NpdGlvbnMucHVzaChOYU4sIE5hTik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGluZVBvc2l0aW9ucy5wdXNoKE5hTiwgTmFOKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWlkUHRYID0gKHBvc2l0aW9uc1tpICogMl0gKyBwb3NpdGlvbnNbaSAqIDIgKyAyXSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAyICsgMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRQdFgsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDIgKyAxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pZFB0WCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tpICogMiArIDNdXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGluZVBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uc1tsZW4gLSAyXSwgcG9zaXRpb25zW2xlbiAtIDFdKTtcbiAgICAgICAgfSBlbHNlIGlmKHRyYWNlLmxpbmUuc2hhcGUgPT09ICd2aHYnKSB7XG4gICAgICAgICAgICBsaW5lUG9zaXRpb25zID0gW107XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBjb3VudCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKGlzTmFOKHBvc2l0aW9uc1tpICogMl0pIHx8IGlzTmFOKHBvc2l0aW9uc1tpICogMiArIDFdKSB8fCBpc05hTihwb3NpdGlvbnNbaSAqIDIgKyAyXSkgfHwgaXNOYU4ocG9zaXRpb25zW2kgKiAyICsgM10pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc05hTihwb3NpdGlvbnNbaSAqIDJdKSAmJiAhaXNOYU4ocG9zaXRpb25zW2kgKiAyICsgMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25zLnB1c2gocG9zaXRpb25zW2kgKiAyXSwgcG9zaXRpb25zW2kgKiAyICsgMV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVBvc2l0aW9ucy5wdXNoKE5hTiwgTmFOKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25zLnB1c2goTmFOLCBOYU4pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtaWRQdFkgPSAocG9zaXRpb25zW2kgKiAyICsgMV0gKyBwb3NpdGlvbnNbaSAqIDIgKyAzXSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAyICsgMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWlkUHRZLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAyICsgMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtaWRQdFlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW5lUG9zaXRpb25zLnB1c2gocG9zaXRpb25zW2xlbiAtIDJdLCBwb3NpdGlvbnNbbGVuIC0gMV0pO1xuICAgICAgICB9IGVsc2UgaWYodHJhY2UubGluZS5zaGFwZSA9PT0gJ3ZoJykge1xuICAgICAgICAgICAgbGluZVBvc2l0aW9ucyA9IFtdO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgY291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihpc05hTihwb3NpdGlvbnNbaSAqIDJdKSB8fCBpc05hTihwb3NpdGlvbnNbaSAqIDIgKyAxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZVBvc2l0aW9ucy5wdXNoKE5hTiwgTmFOLCBOYU4sIE5hTik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZVBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uc1tpICogMl0sIHBvc2l0aW9uc1tpICogMiArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzTmFOKHBvc2l0aW9uc1tpICogMiArIDJdKSAmJiAhaXNOYU4ocG9zaXRpb25zW2kgKiAyICsgM10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lUG9zaXRpb25zLnB1c2gocG9zaXRpb25zW2kgKiAyXSwgcG9zaXRpb25zW2kgKiAyICsgM10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVBvc2l0aW9ucy5wdXNoKE5hTiwgTmFOKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmVQb3NpdGlvbnMucHVzaChwb3NpdGlvbnNbbGVuIC0gMl0sIHBvc2l0aW9uc1tsZW4gLSAxXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaW5lUG9zaXRpb25zID0gcG9zaXRpb25zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgd2UgaGF2ZSBkYXRhIHdpdGggZ2Fwcywgd2Ugb3VnaHQgdG8gdXNlIHJlY3Qgam9pbnNcbiAgICAvLyBGSVhNRTogZ2V0IHJpZCBvZiB0aGlzXG4gICAgdmFyIGhhc05hTiA9IGZhbHNlO1xuICAgIGZvcihpID0gMDsgaSA8IGxpbmVQb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoaXNOYU4obGluZVBvc2l0aW9uc1tpXSkpIHtcbiAgICAgICAgICAgIGhhc05hTiA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBqb2luID0gKGhhc05hTiB8fCBsaW5lUG9zaXRpb25zLmxlbmd0aCA+IGNvbnN0YW50cy5UT09fTUFOWV9QT0lOVFMpID8gJ3JlY3QnIDpcbiAgICAgICAgc3ViVHlwZXMuaGFzTWFya2Vycyh0cmFjZSkgPyAncmVjdCcgOiAncm91bmQnO1xuXG4gICAgLy8gZmlsbCBnYXBzXG4gICAgaWYoaGFzTmFOICYmIHRyYWNlLmNvbm5lY3RnYXBzKSB7XG4gICAgICAgIHZhciBsYXN0WCA9IGxpbmVQb3NpdGlvbnNbMF07XG4gICAgICAgIHZhciBsYXN0WSA9IGxpbmVQb3NpdGlvbnNbMV07XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGluZVBvc2l0aW9ucy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgaWYoaXNOYU4obGluZVBvc2l0aW9uc1tpXSkgfHwgaXNOYU4obGluZVBvc2l0aW9uc1tpICsgMV0pKSB7XG4gICAgICAgICAgICAgICAgbGluZVBvc2l0aW9uc1tpXSA9IGxhc3RYO1xuICAgICAgICAgICAgICAgIGxpbmVQb3NpdGlvbnNbaSArIDFdID0gbGFzdFk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhc3RYID0gbGluZVBvc2l0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICBsYXN0WSA9IGxpbmVQb3NpdGlvbnNbaSArIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgam9pbjogam9pbixcbiAgICAgICAgcG9zaXRpb25zOiBsaW5lUG9zaXRpb25zXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY29udmVydEVycm9yQmFyUG9zaXRpb25zKGdkLCB0cmFjZSwgcG9zaXRpb25zLCB4LCB5KSB7XG4gICAgdmFyIG1ha2VDb21wdXRlRXJyb3IgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Vycm9yYmFycycsICdtYWtlQ29tcHV0ZUVycm9yJyk7XG4gICAgdmFyIHhhID0gQXhpc0lEcy5nZXRGcm9tSWQoZ2QsIHRyYWNlLnhheGlzKTtcbiAgICB2YXIgeWEgPSBBeGlzSURzLmdldEZyb21JZChnZCwgdHJhY2UueWF4aXMpO1xuICAgIHZhciBjb3VudCA9IHBvc2l0aW9ucy5sZW5ndGggLyAyO1xuICAgIHZhciBvdXQgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRPbmVBeGlzKGNvb3JkcywgYXgpIHtcbiAgICAgICAgdmFyIGF4TGV0dGVyID0gYXguX2lkLmNoYXJBdCgwKTtcbiAgICAgICAgdmFyIG9wdHMgPSB0cmFjZVsnZXJyb3JfJyArIGF4TGV0dGVyXTtcblxuICAgICAgICBpZihvcHRzICYmIG9wdHMudmlzaWJsZSAmJiAoYXgudHlwZSA9PT0gJ2xpbmVhcicgfHwgYXgudHlwZSA9PT0gJ2xvZycpKSB7XG4gICAgICAgICAgICB2YXIgY29tcHV0ZUVycm9yID0gbWFrZUNvbXB1dGVFcnJvcihvcHRzKTtcbiAgICAgICAgICAgIHZhciBwT2Zmc2V0ID0ge3g6IDAsIHk6IDF9W2F4TGV0dGVyXTtcbiAgICAgICAgICAgIHZhciBlT2Zmc2V0ID0ge3g6IFswLCAxLCAyLCAzXSwgeTogWzIsIDMsIDAsIDFdfVtheExldHRlcl07XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gbmV3IEZsb2F0NjRBcnJheSg0ICogY291bnQpO1xuICAgICAgICAgICAgdmFyIG1pblNob2UgPSBJbmZpbml0eTtcbiAgICAgICAgICAgIHZhciBtYXhIYXQgPSAtSW5maW5pdHk7XG5cbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGogPSAwOyBpIDwgY291bnQ7IGkrKywgaiArPSA0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRjID0gY29vcmRzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYoaXNOdW1lcmljKGRjKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGwgPSBwb3NpdGlvbnNbaSAqIDIgKyBwT2Zmc2V0XTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHMgPSBjb21wdXRlRXJyb3IoZGMsIGkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbHYgPSB2YWxzWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaHYgPSB2YWxzWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzTnVtZXJpYyhsdikgJiYgaXNOdW1lcmljKGh2KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNob2UgPSBkYyAtIGx2O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhhdCA9IGRjICsgaHY7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yc1tqICsgZU9mZnNldFswXV0gPSBkbCAtIGF4LmMybChzaG9lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yc1tqICsgZU9mZnNldFsxXV0gPSBheC5jMmwoaGF0KSAtIGRsO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzW2ogKyBlT2Zmc2V0WzJdXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnNbaiArIGVPZmZzZXRbM11dID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbWluU2hvZSA9IE1hdGgubWluKG1pblNob2UsIGRjIC0gbHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGF0ID0gTWF0aC5tYXgobWF4SGF0LCBkYyArIGh2KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3V0W2F4TGV0dGVyXSA9IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IHBvc2l0aW9ucyxcbiAgICAgICAgICAgICAgICBlcnJvcnM6IGVycm9ycyxcbiAgICAgICAgICAgICAgICBfYm5kczogW21pblNob2UsIG1heEhhdF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb252ZXJ0T25lQXhpcyh4LCB4YSk7XG4gICAgY29udmVydE9uZUF4aXMoeSwgeWEpO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRUZXh0UG9zaXRpb24oZ2QsIHRyYWNlLCB0ZXh0T3B0cywgbWFya2VyT3B0cykge1xuICAgIHZhciBjb3VudCA9IHRyYWNlLl9sZW5ndGg7XG4gICAgdmFyIG91dCA9IHt9O1xuICAgIHZhciBpO1xuXG4gICAgLy8gY29ycmVzcG9uZHMgdG8gdGV4dFBvaW50UG9zaXRpb24gZnJvbSBjb21wb25lbnQuZHJhd2luZ1xuICAgIGlmKHN1YlR5cGVzLmhhc01hcmtlcnModHJhY2UpKSB7XG4gICAgICAgIHZhciBmb250T3B0cyA9IHRleHRPcHRzLmZvbnQ7XG4gICAgICAgIHZhciBhbGlnbiA9IHRleHRPcHRzLmFsaWduO1xuICAgICAgICB2YXIgYmFzZWxpbmUgPSB0ZXh0T3B0cy5iYXNlbGluZTtcbiAgICAgICAgb3V0Lm9mZnNldCA9IG5ldyBBcnJheShjb3VudCk7XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1zID0gbWFya2VyT3B0cy5zaXplcyA/IG1hcmtlck9wdHMuc2l6ZXNbaV0gOiBtYXJrZXJPcHRzLnNpemU7XG4gICAgICAgICAgICB2YXIgZnMgPSBBcnJheS5pc0FycmF5KGZvbnRPcHRzKSA/IGZvbnRPcHRzW2ldLnNpemUgOiBmb250T3B0cy5zaXplO1xuXG4gICAgICAgICAgICB2YXIgYSA9IEFycmF5LmlzQXJyYXkoYWxpZ24pID9cbiAgICAgICAgICAgICAgICAoYWxpZ24ubGVuZ3RoID4gMSA/IGFsaWduW2ldIDogYWxpZ25bMF0pIDpcbiAgICAgICAgICAgICAgICBhbGlnbjtcbiAgICAgICAgICAgIHZhciBiID0gQXJyYXkuaXNBcnJheShiYXNlbGluZSkgP1xuICAgICAgICAgICAgICAgIChiYXNlbGluZS5sZW5ndGggPiAxID8gYmFzZWxpbmVbaV0gOiBiYXNlbGluZVswXSkgOlxuICAgICAgICAgICAgICAgIGJhc2VsaW5lO1xuXG4gICAgICAgICAgICB2YXIgaFNpZ24gPSBURVhUT0ZGU0VUU0lHTlthXTtcbiAgICAgICAgICAgIHZhciB2U2lnbiA9IFRFWFRPRkZTRVRTSUdOW2JdO1xuICAgICAgICAgICAgdmFyIHhQYWQgPSBtcyA/IG1zIC8gMC44ICsgMSA6IDA7XG4gICAgICAgICAgICB2YXIgeVBhZCA9IC12U2lnbiAqIHhQYWQgLSB2U2lnbiAqIDAuNTtcbiAgICAgICAgICAgIG91dC5vZmZzZXRbaV0gPSBbaFNpZ24gKiB4UGFkIC8gZnMsIHlQYWQgLyBmc107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdHlsZTogY29udmVydFN0eWxlLFxuXG4gICAgbWFya2VyU3R5bGU6IGNvbnZlcnRNYXJrZXJTdHlsZSxcbiAgICBtYXJrZXJTZWxlY3Rpb246IGNvbnZlcnRNYXJrZXJTZWxlY3Rpb24sXG5cbiAgICBsaW5lUG9zaXRpb25zOiBjb252ZXJ0TGluZVBvc2l0aW9ucyxcbiAgICBlcnJvckJhclBvc2l0aW9uczogY29udmVydEVycm9yQmFyUG9zaXRpb25zLFxuICAgIHRleHRQb3NpdGlvbjogY29udmVydFRleHRQb3NpdGlvblxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmV4cG9ydHMuaXNPcGVuU3ltYm9sID0gZnVuY3Rpb24oc3ltYm9sKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygc3ltYm9sID09PSAnc3RyaW5nJykgP1xuICAgICAgICBjb25zdGFudHMuT1BFTl9SRS50ZXN0KHN5bWJvbCkgOlxuICAgICAgICBzeW1ib2wgJSAyMDAgPiAxMDA7XG59O1xuXG5leHBvcnRzLmlzRG90U3ltYm9sID0gZnVuY3Rpb24oc3ltYm9sKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygc3ltYm9sID09PSAnc3RyaW5nJykgP1xuICAgICAgICBjb25zdGFudHMuRE9UX1JFLnRlc3Qoc3ltYm9sKSA6XG4gICAgICAgIHN5bWJvbCA+IDIwMDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgZ2V0VHJhY2VDb2xvciA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvZ2V0X3RyYWNlX2NvbG9yJyk7XG5cbmZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlKSB7XG4gICAgdmFyIGNkID0gcG9pbnREYXRhLmNkO1xuICAgIHZhciBzdGFzaCA9IGNkWzBdLnQ7XG4gICAgdmFyIHRyYWNlID0gY2RbMF0udHJhY2U7XG4gICAgdmFyIHhhID0gcG9pbnREYXRhLnhhO1xuICAgIHZhciB5YSA9IHBvaW50RGF0YS55YTtcbiAgICB2YXIgeCA9IHN0YXNoLng7XG4gICAgdmFyIHkgPSBzdGFzaC55O1xuICAgIHZhciB4cHggPSB4YS5jMnAoeHZhbCk7XG4gICAgdmFyIHlweCA9IHlhLmMycCh5dmFsKTtcbiAgICB2YXIgbWF4RGlzdGFuY2UgPSBwb2ludERhdGEuZGlzdGFuY2U7XG4gICAgdmFyIGlkcztcblxuICAgIC8vIEZJWE1FOiBtYWtlIHN1cmUgdGhpcyBpcyBhIHByb3BlciB3YXkgdG8gY2FsYyBzZWFyY2ggcmFkaXVzXG4gICAgaWYoc3Rhc2gudHJlZSkge1xuICAgICAgICB2YXIgeGwgPSB4YS5wMmMoeHB4IC0gbWF4RGlzdGFuY2UpO1xuICAgICAgICB2YXIgeHIgPSB4YS5wMmMoeHB4ICsgbWF4RGlzdGFuY2UpO1xuICAgICAgICB2YXIgeWwgPSB5YS5wMmMoeXB4IC0gbWF4RGlzdGFuY2UpO1xuICAgICAgICB2YXIgeXIgPSB5YS5wMmMoeXB4ICsgbWF4RGlzdGFuY2UpO1xuXG4gICAgICAgIGlmKGhvdmVybW9kZSA9PT0gJ3gnKSB7XG4gICAgICAgICAgICBpZHMgPSBzdGFzaC50cmVlLnJhbmdlKFxuICAgICAgICAgICAgICAgIE1hdGgubWluKHhsLCB4ciksIE1hdGgubWluKHlhLl9ybFswXSwgeWEuX3JsWzFdKSxcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh4bCwgeHIpLCBNYXRoLm1heCh5YS5fcmxbMF0sIHlhLl9ybFsxXSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZHMgPSBzdGFzaC50cmVlLnJhbmdlKFxuICAgICAgICAgICAgICAgIE1hdGgubWluKHhsLCB4ciksIE1hdGgubWluKHlsLCB5ciksXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoeGwsIHhyKSwgTWF0aC5tYXgoeWwsIHlyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlkcyA9IHN0YXNoLmlkcztcbiAgICB9XG5cbiAgICAvLyBwaWNrIHRoZSBpZCBjbG9zZXN0IHRvIHRoZSBwb2ludFxuICAgIC8vIG5vdGUgdGhhdCBwb2ludCBwb3NzaWJseSBtYXkgbm90IGJlIGZvdW5kXG4gICAgdmFyIGlkLCBwdHgsIHB0eSwgaSwgZHgsIGR5LCBkaXN0LCBkeHk7XG5cbiAgICB2YXIgbWluRGlzdCA9IG1heERpc3RhbmNlO1xuICAgIGlmKGhvdmVybW9kZSA9PT0gJ3gnKSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHR4ID0geFtpZHNbaV1dO1xuICAgICAgICAgICAgZHggPSBNYXRoLmFicyh4YS5jMnAocHR4KSAtIHhweCk7XG4gICAgICAgICAgICBpZihkeCA8IG1pbkRpc3QpIHtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZHg7XG4gICAgICAgICAgICAgICAgZHkgPSB5YS5jMnAoeVtpZHNbaV1dKSAtIHlweDtcbiAgICAgICAgICAgICAgICBkeHkgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgICAgIGlkID0gaWRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcbiAgICAgICAgICAgIHB0eCA9IHhbaWRzW2ldXTtcbiAgICAgICAgICAgIHB0eSA9IHlbaWRzW2ldXTtcbiAgICAgICAgICAgIGR4ID0geGEuYzJwKHB0eCkgLSB4cHg7XG4gICAgICAgICAgICBkeSA9IHlhLmMycChwdHkpIC0geXB4O1xuXG4gICAgICAgICAgICBkaXN0ID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgIGlmKGRpc3QgPCBtaW5EaXN0KSB7XG4gICAgICAgICAgICAgICAgbWluRGlzdCA9IGR4eSA9IGRpc3Q7XG4gICAgICAgICAgICAgICAgaWQgPSBpZHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb2ludERhdGEuaW5kZXggPSBpZDtcbiAgICBwb2ludERhdGEuZGlzdGFuY2UgPSBtaW5EaXN0O1xuICAgIHBvaW50RGF0YS5keHkgPSBkeHk7XG5cbiAgICBpZihpZCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW3BvaW50RGF0YV07XG5cbiAgICByZXR1cm4gW2NhbGNIb3Zlcihwb2ludERhdGEsIHgsIHksIHRyYWNlKV07XG59XG5cbmZ1bmN0aW9uIGNhbGNIb3Zlcihwb2ludERhdGEsIHgsIHksIHRyYWNlKSB7XG4gICAgdmFyIHhhID0gcG9pbnREYXRhLnhhO1xuICAgIHZhciB5YSA9IHBvaW50RGF0YS55YTtcbiAgICB2YXIgbWluRGlzdCA9IHBvaW50RGF0YS5kaXN0YW5jZTtcbiAgICB2YXIgZHh5ID0gcG9pbnREYXRhLmR4eTtcbiAgICB2YXIgaWQgPSBwb2ludERhdGEuaW5kZXg7XG5cbiAgICAvLyB0aGUgY2xvc2VzdCBkYXRhIHBvaW50XG4gICAgdmFyIGRpID0ge1xuICAgICAgICBwb2ludE51bWJlcjogaWQsXG4gICAgICAgIHg6IHhbaWRdLFxuICAgICAgICB5OiB5W2lkXVxuICAgIH07XG5cbiAgICAvLyB0aGF0IGlzIHNpbmdsZS1pdGVtIGFycmF5c190b19jYWxjZGF0YSBleGNlcnB0LCBzaW5jZSB3ZSBhcmUgZG9pbmcgaXQgZm9yIGEgc2luZ2xlIHBvaW50IGFuZCB3ZSBkb24ndCBoYXZlIHRvIGRvIGl0IGJlZm9yZWhlYWQgZm9yIDFlNiBwb2ludHNcbiAgICBkaS50eCA9IEFycmF5LmlzQXJyYXkodHJhY2UudGV4dCkgPyB0cmFjZS50ZXh0W2lkXSA6IHRyYWNlLnRleHQ7XG4gICAgZGkuaHR4ID0gQXJyYXkuaXNBcnJheSh0cmFjZS5ob3ZlcnRleHQpID8gdHJhY2UuaG92ZXJ0ZXh0W2lkXSA6IHRyYWNlLmhvdmVydGV4dDtcbiAgICBkaS5kYXRhID0gQXJyYXkuaXNBcnJheSh0cmFjZS5jdXN0b21kYXRhKSA/IHRyYWNlLmN1c3RvbWRhdGFbaWRdIDogdHJhY2UuY3VzdG9tZGF0YTtcbiAgICBkaS50cCA9IEFycmF5LmlzQXJyYXkodHJhY2UudGV4dHBvc2l0aW9uKSA/IHRyYWNlLnRleHRwb3NpdGlvbltpZF0gOiB0cmFjZS50ZXh0cG9zaXRpb247XG5cbiAgICB2YXIgZm9udCA9IHRyYWNlLnRleHRmb250O1xuICAgIGlmKGZvbnQpIHtcbiAgICAgICAgZGkudHMgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShmb250LnNpemUpID8gZm9udC5zaXplW2lkXSA6IGZvbnQuc2l6ZTtcbiAgICAgICAgZGkudGMgPSBBcnJheS5pc0FycmF5KGZvbnQuY29sb3IpID8gZm9udC5jb2xvcltpZF0gOiBmb250LmNvbG9yO1xuICAgICAgICBkaS50ZiA9IEFycmF5LmlzQXJyYXkoZm9udC5mYW1pbHkpID8gZm9udC5mYW1pbHlbaWRdIDogZm9udC5mYW1pbHk7XG4gICAgfVxuXG4gICAgdmFyIG1hcmtlciA9IHRyYWNlLm1hcmtlcjtcbiAgICBpZihtYXJrZXIpIHtcbiAgICAgICAgZGkubXMgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShtYXJrZXIuc2l6ZSkgPyBtYXJrZXIuc2l6ZVtpZF0gOiBtYXJrZXIuc2l6ZTtcbiAgICAgICAgZGkubW8gPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShtYXJrZXIub3BhY2l0eSkgPyBtYXJrZXIub3BhY2l0eVtpZF0gOiBtYXJrZXIub3BhY2l0eTtcbiAgICAgICAgZGkubXggPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShtYXJrZXIuc3ltYm9sKSA/IG1hcmtlci5zeW1ib2xbaWRdIDogbWFya2VyLnN5bWJvbDtcbiAgICAgICAgZGkubWMgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShtYXJrZXIuY29sb3IpID8gbWFya2VyLmNvbG9yW2lkXSA6IG1hcmtlci5jb2xvcjtcbiAgICB9XG5cbiAgICB2YXIgbGluZSA9IG1hcmtlciAmJiBtYXJrZXIubGluZTtcbiAgICBpZihsaW5lKSB7XG4gICAgICAgIGRpLm1sYyA9IEFycmF5LmlzQXJyYXkobGluZS5jb2xvcikgPyBsaW5lLmNvbG9yW2lkXSA6IGxpbmUuY29sb3I7XG4gICAgICAgIGRpLm1sdyA9IExpYi5pc0FycmF5T3JUeXBlZEFycmF5KGxpbmUud2lkdGgpID8gbGluZS53aWR0aFtpZF0gOiBsaW5lLndpZHRoO1xuICAgIH1cblxuICAgIHZhciBncmFkID0gbWFya2VyICYmIG1hcmtlci5ncmFkaWVudDtcbiAgICBpZihncmFkICYmIGdyYWQudHlwZSAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGRpLm1ndCA9IEFycmF5LmlzQXJyYXkoZ3JhZC50eXBlKSA/IGdyYWQudHlwZVtpZF0gOiBncmFkLnR5cGU7XG4gICAgICAgIGRpLm1nYyA9IEFycmF5LmlzQXJyYXkoZ3JhZC5jb2xvcikgPyBncmFkLmNvbG9yW2lkXSA6IGdyYWQuY29sb3I7XG4gICAgfVxuXG4gICAgdmFyIHhwID0geGEuYzJwKGRpLngsIHRydWUpO1xuICAgIHZhciB5cCA9IHlhLmMycChkaS55LCB0cnVlKTtcbiAgICB2YXIgcmFkID0gZGkubXJjIHx8IDE7XG5cbiAgICB2YXIgaG92ZXJsYWJlbCA9IHRyYWNlLmhvdmVybGFiZWw7XG5cbiAgICBpZihob3ZlcmxhYmVsKSB7XG4gICAgICAgIGRpLmhiZyA9IEFycmF5LmlzQXJyYXkoaG92ZXJsYWJlbC5iZ2NvbG9yKSA/IGhvdmVybGFiZWwuYmdjb2xvcltpZF0gOiBob3ZlcmxhYmVsLmJnY29sb3I7XG4gICAgICAgIGRpLmhiYyA9IEFycmF5LmlzQXJyYXkoaG92ZXJsYWJlbC5ib3JkZXJjb2xvcikgPyBob3ZlcmxhYmVsLmJvcmRlcmNvbG9yW2lkXSA6IGhvdmVybGFiZWwuYm9yZGVyY29sb3I7XG4gICAgICAgIGRpLmh0cyA9IExpYi5pc0FycmF5T3JUeXBlZEFycmF5KGhvdmVybGFiZWwuZm9udC5zaXplKSA/IGhvdmVybGFiZWwuZm9udC5zaXplW2lkXSA6IGhvdmVybGFiZWwuZm9udC5zaXplO1xuICAgICAgICBkaS5odGMgPSBBcnJheS5pc0FycmF5KGhvdmVybGFiZWwuZm9udC5jb2xvcikgPyBob3ZlcmxhYmVsLmZvbnQuY29sb3JbaWRdIDogaG92ZXJsYWJlbC5mb250LmNvbG9yO1xuICAgICAgICBkaS5odGYgPSBBcnJheS5pc0FycmF5KGhvdmVybGFiZWwuZm9udC5mYW1pbHkpID8gaG92ZXJsYWJlbC5mb250LmZhbWlseVtpZF0gOiBob3ZlcmxhYmVsLmZvbnQuZmFtaWx5O1xuICAgICAgICBkaS5obmwgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShob3ZlcmxhYmVsLm5hbWVsZW5ndGgpID8gaG92ZXJsYWJlbC5uYW1lbGVuZ3RoW2lkXSA6IGhvdmVybGFiZWwubmFtZWxlbmd0aDtcbiAgICB9XG4gICAgdmFyIGhvdmVyaW5mbyA9IHRyYWNlLmhvdmVyaW5mbztcbiAgICBpZihob3ZlcmluZm8pIHtcbiAgICAgICAgZGkuaGkgPSBBcnJheS5pc0FycmF5KGhvdmVyaW5mbykgPyBob3ZlcmluZm9baWRdIDogaG92ZXJpbmZvO1xuICAgIH1cblxuICAgIHZhciBob3ZlcnRlbXBsYXRlID0gdHJhY2UuaG92ZXJ0ZW1wbGF0ZTtcbiAgICBpZihob3ZlcnRlbXBsYXRlKSB7XG4gICAgICAgIGRpLmh0ID0gQXJyYXkuaXNBcnJheShob3ZlcnRlbXBsYXRlKSA/IGhvdmVydGVtcGxhdGVbaWRdIDogaG92ZXJ0ZW1wbGF0ZTtcbiAgICB9XG5cbiAgICB2YXIgZmFrZUNkID0ge307XG4gICAgZmFrZUNkW3BvaW50RGF0YS5pbmRleF0gPSBkaTtcblxuICAgIHZhciBwb2ludERhdGEyID0gTGliLmV4dGVuZEZsYXQoe30sIHBvaW50RGF0YSwge1xuICAgICAgICBjb2xvcjogZ2V0VHJhY2VDb2xvcih0cmFjZSwgZGkpLFxuXG4gICAgICAgIHgwOiB4cCAtIHJhZCxcbiAgICAgICAgeDE6IHhwICsgcmFkLFxuICAgICAgICB4TGFiZWxWYWw6IGRpLngsXG5cbiAgICAgICAgeTA6IHlwIC0gcmFkLFxuICAgICAgICB5MTogeXAgKyByYWQsXG4gICAgICAgIHlMYWJlbFZhbDogZGkueSxcblxuICAgICAgICBjZDogZmFrZUNkLFxuICAgICAgICBkaXN0YW5jZTogbWluRGlzdCxcbiAgICAgICAgc3Bpa2VEaXN0YW5jZTogZHh5LFxuXG4gICAgICAgIGhvdmVydGVtcGxhdGU6IGRpLmh0XG4gICAgfSk7XG5cbiAgICBpZihkaS5odHgpIHBvaW50RGF0YTIudGV4dCA9IGRpLmh0eDtcbiAgICBlbHNlIGlmKGRpLnR4KSBwb2ludERhdGEyLnRleHQgPSBkaS50eDtcbiAgICBlbHNlIGlmKHRyYWNlLnRleHQpIHBvaW50RGF0YTIudGV4dCA9IHRyYWNlLnRleHQ7XG5cbiAgICBMaWIuZmlsbFRleHQoZGksIHRyYWNlLCBwb2ludERhdGEyKTtcbiAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Vycm9yYmFycycsICdob3ZlckluZm8nKShkaSwgdHJhY2UsIHBvaW50RGF0YTIpO1xuXG4gICAgcmV0dXJuIHBvaW50RGF0YTI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGhvdmVyUG9pbnRzOiBob3ZlclBvaW50cyxcbiAgICBjYWxjSG92ZXI6IGNhbGNIb3ZlclxufTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcXVhZCcpXG4iLCIvKipcbiAqIEBtb2R1bGUgIHBvaW50LWNsdXN0ZXIvcXVhZFxuICpcbiAqIEJ1Y2tldCBiYXNlZCBxdWFkIHRyZWUgY2x1c3RlcmluZ1xuICovXG5cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBzZWFyY2ggPSByZXF1aXJlKCdiaW5hcnktc2VhcmNoLWJvdW5kcycpXG5jb25zdCBjbGFtcCA9IHJlcXVpcmUoJ2NsYW1wJylcbmNvbnN0IHJlY3QgPSByZXF1aXJlKCdwYXJzZS1yZWN0JylcbmNvbnN0IGdldEJvdW5kcyA9IHJlcXVpcmUoJ2FycmF5LWJvdW5kcycpXG5jb25zdCBwaWNrID0gcmVxdWlyZSgncGljay1ieS1hbGlhcycpXG5jb25zdCBkZWZpbmVkID0gcmVxdWlyZSgnZGVmaW5lZCcpXG5jb25zdCBmbGF0dGVuID0gcmVxdWlyZSgnZmxhdHRlbi12ZXJ0ZXgtZGF0YScpXG5jb25zdCBpc09iaiA9IHJlcXVpcmUoJ2lzLW9iaicpXG5jb25zdCBkdHlwZSA9IHJlcXVpcmUoJ2R0eXBlJylcbmNvbnN0IGxvZzIgPSByZXF1aXJlKCdtYXRoLWxvZzInKVxuXG5jb25zdCBNQVhfR1JPVVBfSUQgPSAxMDczNzQxODI0XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2x1c3RlciAoc3JjUG9pbnRzLCBvcHRpb25zKSB7XG5cdGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG5cblx0c3JjUG9pbnRzID0gZmxhdHRlbihzcmNQb2ludHMsICdmbG9hdDY0JylcblxuXHRvcHRpb25zID0gcGljayhvcHRpb25zLCB7XG5cdFx0Ym91bmRzOiAncmFuZ2UgYm91bmRzIGRhdGFCb3ggZGF0YWJveCcsXG5cdFx0bWF4RGVwdGg6ICdkZXB0aCBtYXhEZXB0aCBtYXhkZXB0aCBsZXZlbCBtYXhMZXZlbCBtYXhsZXZlbCBsZXZlbHMnLFxuXHRcdGR0eXBlOiAndHlwZSBkdHlwZSBmb3JtYXQgb3V0IGRzdCBvdXRwdXQgZGVzdGluYXRpb24nXG5cdFx0Ly8gc29ydDogJ3NvcnRCeSBzb3J0Ynkgc29ydCcsXG5cdFx0Ly8gcGljazogJ3BpY2sgbGV2ZWxQb2ludCcsXG5cdFx0Ly8gbm9kZVNpemU6ICdub2RlIG5vZGVTaXplIG1pbk5vZGVTaXplIG1pblNpemUgc2l6ZSdcblx0fSlcblxuXHQvLyBsZXQgbm9kZVNpemUgPSBkZWZpbmVkKG9wdGlvbnMubm9kZVNpemUsIDEpXG5cdGxldCBtYXhEZXB0aCA9IGRlZmluZWQob3B0aW9ucy5tYXhEZXB0aCwgMjU1KVxuXHRsZXQgYm91bmRzID0gZGVmaW5lZChvcHRpb25zLmJvdW5kcywgZ2V0Qm91bmRzKHNyY1BvaW50cywgMikpXG5cdGlmIChib3VuZHNbMF0gPT09IGJvdW5kc1syXSkgYm91bmRzWzJdKytcblx0aWYgKGJvdW5kc1sxXSA9PT0gYm91bmRzWzNdKSBib3VuZHNbM10rK1xuXG5cdGxldCBwb2ludHMgPSBub3JtYWxpemUoc3JjUG9pbnRzLCBib3VuZHMpXG5cblx0Ly8gaW5pdCB2YXJpYWJsZXNcblx0bGV0IG4gPSBzcmNQb2ludHMubGVuZ3RoID4+PiAxXG5cdGxldCBpZHNcblx0aWYgKCFvcHRpb25zLmR0eXBlKSBvcHRpb25zLmR0eXBlID0gJ2FycmF5J1xuXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5kdHlwZSA9PT0gJ3N0cmluZycpIHtcblx0XHRpZHMgPSBuZXcgKGR0eXBlKG9wdGlvbnMuZHR5cGUpKShuKVxuXHR9XG5cdGVsc2UgaWYgKG9wdGlvbnMuZHR5cGUpIHtcblx0XHRpZHMgPSBvcHRpb25zLmR0eXBlXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoaWRzKSkgaWRzLmxlbmd0aCA9IG5cblx0fVxuXHRmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuXHRcdGlkc1tpXSA9IGlcblx0fVxuXG5cdC8vIHJlcHJlc2VudGF0aXZlIHBvaW50IGluZGV4ZXMgZm9yIGxldmVsc1xuXHRsZXQgbGV2ZWxzID0gW11cblxuXHQvLyBzdGFydGluZyBpbmRleGVzIG9mIHN1YnJhbmdlcyBpbiBzdWIgbGV2ZWxzLCBsZXZlbHMubGVuZ3RoICogNFxuXHRsZXQgc3VibGV2ZWxzID0gW11cblxuXHQvLyB1bmlxdWUgZ3JvdXAgaWRzLCBzb3J0ZWQgaW4gei1jdXJ2ZSBmYXNoaW9uIHdpdGhpbiBsZXZlbHMgYnkgc2hpZnRpbmcgYml0c1xuXHRsZXQgZ3JvdXBzID0gW11cblxuXHQvLyBsZXZlbCBvZmZzZXRzIGluIGBpZHNgXG5cdGxldCBvZmZzZXRzID0gW11cblxuXG5cdC8vIHNvcnQgcG9pbnRzXG5cdHNvcnQoMCwgMCwgMSwgaWRzLCAwLCAxKVxuXG5cblx0Ly8gcmV0dXJuIHJlb3JkZXJlZCBpZHMgd2l0aCBwcm92aWRlZCBtZXRob2RzXG5cdC8vIHNhdmUgbGV2ZWwgb2Zmc2V0cyBpbiBvdXRwdXQgYnVmZmVyXG5cdGxldCBvZmZzZXQgPSAwXG5cdGZvciAobGV0IGxldmVsID0gMDsgbGV2ZWwgPCBsZXZlbHMubGVuZ3RoOyBsZXZlbCsrKSB7XG5cdFx0bGV0IGxldmVsSXRlbXMgPSBsZXZlbHNbbGV2ZWxdXG5cdFx0aWYgKGlkcy5zZXQpIGlkcy5zZXQobGV2ZWxJdGVtcywgb2Zmc2V0KVxuXHRcdGVsc2Uge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGwgPSBsZXZlbEl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRpZHNbaSArIG9mZnNldF0gPSBsZXZlbEl0ZW1zW2ldXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGxldCBuZXh0T2Zmc2V0ID0gb2Zmc2V0ICsgbGV2ZWxzW2xldmVsXS5sZW5ndGhcblx0XHRvZmZzZXRzW2xldmVsXSA9IFtvZmZzZXQsIG5leHRPZmZzZXRdXG5cdFx0b2Zmc2V0ID0gbmV4dE9mZnNldFxuXHR9XG5cblx0aWRzLnJhbmdlID0gcmFuZ2VcblxuXHRyZXR1cm4gaWRzXG5cblxuXG5cdC8vIEZJWE1FOiBpdCBpcyBwb3NzaWJsZSB0byBjcmVhdGUgb25lIHR5cGVkIGFycmF5IGhlYXAgYW5kIHJldXNlIHRoYXQgdG8gYXZvaWQgbWVtb3J5IGJsb3dcblx0ZnVuY3Rpb24gc29ydCAoeCwgeSwgZGlhbSwgaWRzLCBsZXZlbCwgZ3JvdXApIHtcblx0XHRpZiAoIWlkcy5sZW5ndGgpIHJldHVybiBudWxsXG5cblx0XHQvLyBzYXZlIGZpcnN0IHBvaW50IGFzIGxldmVsIHJlcHJlc2VudGF0aXZlXG5cdFx0bGV0IGxldmVsSXRlbXMgPSBsZXZlbHNbbGV2ZWxdIHx8IChsZXZlbHNbbGV2ZWxdID0gW10pXG5cdFx0bGV0IGxldmVsR3JvdXBzID0gZ3JvdXBzW2xldmVsXSB8fCAoZ3JvdXBzW2xldmVsXSA9IFtdKVxuXHRcdGxldCBzdWJsZXZlbCA9IHN1YmxldmVsc1tsZXZlbF0gfHwgKHN1YmxldmVsc1tsZXZlbF0gPSBbXSlcblx0XHRsZXQgb2Zmc2V0ID0gbGV2ZWxJdGVtcy5sZW5ndGhcblxuXHRcdGxldmVsKytcblxuXHRcdC8vIG1heCBkZXB0aCByZWFjaGVkIC0gcHV0IGFsbCBpdGVtcyBpbnRvIGEgZmlyc3QgZ3JvdXBcblx0XHQvLyBhbHRlcm5hdGl2ZWx5IC0gaWYgZ3JvdXAgaWQgb3ZlcmZsb3cgLSBhdm9pZCBwcm9jZWVkaW5nXG5cdFx0aWYgKGxldmVsID4gbWF4RGVwdGggfHwgZ3JvdXAgPiBNQVhfR1JPVVBfSUQpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldmVsSXRlbXMucHVzaChpZHNbaV0pXG5cdFx0XHRcdGxldmVsR3JvdXBzLnB1c2goZ3JvdXApXG5cdFx0XHRcdHN1YmxldmVsLnB1c2gobnVsbCwgbnVsbCwgbnVsbCwgbnVsbClcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9mZnNldFxuXHRcdH1cblxuXHRcdGxldmVsSXRlbXMucHVzaChpZHNbMF0pXG5cdFx0bGV2ZWxHcm91cHMucHVzaChncm91cClcblxuXHRcdGlmIChpZHMubGVuZ3RoIDw9IDEpIHtcblx0XHRcdHN1YmxldmVsLnB1c2gobnVsbCwgbnVsbCwgbnVsbCwgbnVsbClcblx0XHRcdHJldHVybiBvZmZzZXRcblx0XHR9XG5cblxuXHRcdGxldCBkMiA9IGRpYW0gKiAuNVxuXHRcdGxldCBjeCA9IHggKyBkMiwgY3kgPSB5ICsgZDJcblxuXHRcdC8vIGRpc3RyaWJ1dGUgcG9pbnRzIGJ5IDQgYnVja2V0c1xuXHRcdGxldCBsb2xvID0gW10sIGxvaGkgPSBbXSwgaGlsbyA9IFtdLCBoaWhpID0gW11cblxuXHRcdGZvciAobGV0IGkgPSAxLCBsID0gaWRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0bGV0IGlkeCA9IGlkc1tpXSxcblx0XHRcdFx0eCA9IHBvaW50c1tpZHggKiAyXSxcblx0XHRcdFx0eSA9IHBvaW50c1tpZHggKiAyICsgMV1cblx0XHRcdHggPCBjeCA/ICh5IDwgY3kgPyBsb2xvLnB1c2goaWR4KSA6IGxvaGkucHVzaChpZHgpKSA6ICh5IDwgY3kgPyBoaWxvLnB1c2goaWR4KSA6IGhpaGkucHVzaChpZHgpKVxuXHRcdH1cblxuXHRcdGdyb3VwIDw8PSAyXG5cblx0XHRzdWJsZXZlbC5wdXNoKFxuXHRcdFx0c29ydCh4LCB5LCBkMiwgbG9sbywgbGV2ZWwsIGdyb3VwKSxcblx0XHRcdHNvcnQoeCwgY3ksIGQyLCBsb2hpLCBsZXZlbCwgZ3JvdXAgKyAxKSxcblx0XHRcdHNvcnQoY3gsIHksIGQyLCBoaWxvLCBsZXZlbCwgZ3JvdXAgKyAyKSxcblx0XHRcdHNvcnQoY3gsIGN5LCBkMiwgaGloaSwgbGV2ZWwsIGdyb3VwICsgMylcblx0XHQpXG5cblx0XHRyZXR1cm4gb2Zmc2V0XG5cdH1cblxuXHQvLyBnZXQgYWxsIHBvaW50cyB3aXRoaW4gdGhlIHBhc3NlZCByYW5nZVxuXHRmdW5jdGlvbiByYW5nZSAoIC4uLmFyZ3MgKSB7XG5cdFx0bGV0IG9wdGlvbnNcblxuXHRcdGlmIChpc09iaihhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pKSB7XG5cdFx0XHRsZXQgYXJnID0gYXJncy5wb3AoKVxuXG5cdFx0XHQvLyBkZXRlY3QgaWYgdGhhdCB3YXMgYSByZWN0IG9iamVjdFxuXHRcdFx0aWYgKCFhcmdzLmxlbmd0aCAmJiAoYXJnLnggIT0gbnVsbCB8fCBhcmcubCAhPSBudWxsIHx8IGFyZy5sZWZ0ICE9IG51bGwpKSB7XG5cdFx0XHRcdGFyZ3MgPSBbYXJnXVxuXHRcdFx0XHRvcHRpb25zID0ge31cblx0XHRcdH1cblxuXHRcdFx0b3B0aW9ucyA9IHBpY2soYXJnLCB7XG5cdFx0XHRcdGxldmVsOiAnbGV2ZWwgbWF4TGV2ZWwnLFxuXHRcdFx0XHRkOiAnZCBkaWFtIGRpYW1ldGVyIHIgcmFkaXVzIHB4IHB4U2l6ZSBwaXhlbCBwaXhlbFNpemUgbWF4RCBzaXplIG1pblNpemUnLFxuXHRcdFx0XHRsb2Q6ICdsb2QgZGV0YWlscyByYW5nZXMgb2Zmc2V0cydcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucyA9IHt9XG5cdFx0fVxuXG5cdFx0aWYgKCFhcmdzLmxlbmd0aCkgYXJncyA9IGJvdW5kc1xuXG5cdFx0bGV0IGJveCA9IHJlY3QoIC4uLmFyZ3MgKVxuXG5cdFx0bGV0IFttaW5YLCBtaW5ZLCBtYXhYLCBtYXhZXSA9IFtcblx0XHRcdE1hdGgubWluKGJveC54LCBib3gueCArIGJveC53aWR0aCksXG5cdFx0XHRNYXRoLm1pbihib3gueSwgYm94LnkgKyBib3guaGVpZ2h0KSxcblx0XHRcdE1hdGgubWF4KGJveC54LCBib3gueCArIGJveC53aWR0aCksXG5cdFx0XHRNYXRoLm1heChib3gueSwgYm94LnkgKyBib3guaGVpZ2h0KVxuXHRcdF1cblxuXHRcdGxldCBbbm1pblgsIG5taW5ZLCBubWF4WCwgbm1heFldID0gbm9ybWFsaXplKFttaW5YLCBtaW5ZLCBtYXhYLCBtYXhZXSwgYm91bmRzIClcblxuXHRcdGxldCBtYXhMZXZlbCA9IGRlZmluZWQob3B0aW9ucy5sZXZlbCwgbGV2ZWxzLmxlbmd0aClcblxuXHRcdC8vIGxpbWl0IG1heExldmVsIGJ5IHB4IHNpemVcblx0XHRpZiAob3B0aW9ucy5kICE9IG51bGwpIHtcblx0XHRcdGxldCBkXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMuZCA9PT0gJ251bWJlcicpIGQgPSBbb3B0aW9ucy5kLCBvcHRpb25zLmRdXG5cdFx0XHRlbHNlIGlmIChvcHRpb25zLmQubGVuZ3RoKSBkID0gb3B0aW9ucy5kXG5cblx0XHRcdG1heExldmVsID0gTWF0aC5taW4oXG5cdFx0XHRcdE1hdGgubWF4KFxuXHRcdFx0XHRcdE1hdGguY2VpbCgtbG9nMihNYXRoLmFicyhkWzBdKSAvIChib3VuZHNbMl0gLSBib3VuZHNbMF0pKSksXG5cdFx0XHRcdFx0TWF0aC5jZWlsKC1sb2cyKE1hdGguYWJzKGRbMV0pIC8gKGJvdW5kc1szXSAtIGJvdW5kc1sxXSkpKVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRtYXhMZXZlbFxuXHRcdFx0KVxuXHRcdH1cblx0XHRtYXhMZXZlbCA9IE1hdGgubWluKG1heExldmVsLCBsZXZlbHMubGVuZ3RoKVxuXG5cdFx0Ly8gcmV0dXJuIGxldmVscyBvZiBkZXRhaWxzXG5cdFx0aWYgKG9wdGlvbnMubG9kKSB7XG5cdFx0XHRyZXR1cm4gbG9kKG5taW5YLCBubWluWSwgbm1heFgsIG5tYXhZLCBtYXhMZXZlbClcblx0XHR9XG5cblxuXG5cdFx0Ly8gZG8gc2VsZWN0aW9uIGlkc1xuXHRcdGxldCBzZWxlY3Rpb24gPSBbXVxuXG5cdFx0Ly8gRklYTUU6IHByb2JhYmx5IHdlIGNhbiBkbyBMT0QgaGVyZSBiZWZvcmVoZWFkXG5cdFx0c2VsZWN0KCAwLCAwLCAxLCAwLCAwLCAxKVxuXG5cdFx0ZnVuY3Rpb24gc2VsZWN0ICggbG94LCBsb3ksIGQsIGxldmVsLCBmcm9tLCB0byApIHtcblx0XHRcdGlmIChmcm9tID09PSBudWxsIHx8IHRvID09PSBudWxsKSByZXR1cm5cblxuXHRcdFx0bGV0IGhpeCA9IGxveCArIGRcblx0XHRcdGxldCBoaXkgPSBsb3kgKyBkXG5cblx0XHRcdC8vIGlmIGJveCBkb2VzIG5vdCBpbnRlcnNlY3QgbGV2ZWwgLSBpZ25vcmVcblx0XHRcdGlmICggbm1pblggPiBoaXggfHwgbm1pblkgPiBoaXkgfHwgbm1heFggPCBsb3ggfHwgbm1heFkgPCBsb3kgKSByZXR1cm5cblx0XHRcdGlmICggbGV2ZWwgPj0gbWF4TGV2ZWwgKSByZXR1cm5cblx0XHRcdGlmICggZnJvbSA9PT0gdG8gKSByZXR1cm5cblxuXHRcdFx0Ly8gaWYgcG9pbnRzIGZhbGwgaW50byBib3ggcmFuZ2UgLSB0YWtlIGl0XG5cdFx0XHRsZXQgbGV2ZWxJdGVtcyA9IGxldmVsc1tsZXZlbF1cblxuXHRcdFx0aWYgKHRvID09PSB1bmRlZmluZWQpIHRvID0gbGV2ZWxJdGVtcy5sZW5ndGhcblxuXHRcdFx0Zm9yIChsZXQgaSA9IGZyb207IGkgPCB0bzsgaSsrKSB7XG5cdFx0XHRcdGxldCBpZCA9IGxldmVsSXRlbXNbaV1cblxuXHRcdFx0XHRsZXQgcHggPSBzcmNQb2ludHNbIGlkICogMiBdXG5cdFx0XHRcdGxldCBweSA9IHNyY1BvaW50c1sgaWQgKiAyICsgMSBdXG5cblx0XHRcdFx0aWYgKCBweCA+PSBtaW5YICYmIHB4IDw9IG1heFggJiYgcHkgPj0gbWluWSAmJiBweSA8PSBtYXhZICkge3NlbGVjdGlvbi5wdXNoKGlkKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGZvciBldmVyeSBzdWJzZWN0aW9uIGRvIHNlbGVjdFxuXHRcdFx0bGV0IG9mZnNldHMgPSBzdWJsZXZlbHNbIGxldmVsIF1cblx0XHRcdGxldCBvZmYwID0gb2Zmc2V0c1sgZnJvbSAqIDQgKyAwIF1cblx0XHRcdGxldCBvZmYxID0gb2Zmc2V0c1sgZnJvbSAqIDQgKyAxIF1cblx0XHRcdGxldCBvZmYyID0gb2Zmc2V0c1sgZnJvbSAqIDQgKyAyIF1cblx0XHRcdGxldCBvZmYzID0gb2Zmc2V0c1sgZnJvbSAqIDQgKyAzIF1cblx0XHRcdGxldCBlbmQgPSBuZXh0T2Zmc2V0KG9mZnNldHMsIGZyb20gKyAxKVxuXG5cdFx0XHRsZXQgZDIgPSBkICogLjVcblx0XHRcdGxldCBuZXh0TGV2ZWwgPSBsZXZlbCArIDFcblx0XHRcdHNlbGVjdCggbG94LCBsb3ksIGQyLCBuZXh0TGV2ZWwsIG9mZjAsIG9mZjEgfHwgb2ZmMiB8fCBvZmYzIHx8IGVuZClcblx0XHRcdHNlbGVjdCggbG94LCBsb3kgKyBkMiwgZDIsIG5leHRMZXZlbCwgb2ZmMSwgb2ZmMiB8fCBvZmYzIHx8IGVuZClcblx0XHRcdHNlbGVjdCggbG94ICsgZDIsIGxveSwgZDIsIG5leHRMZXZlbCwgb2ZmMiwgb2ZmMyB8fCBlbmQpXG5cdFx0XHRzZWxlY3QoIGxveCArIGQyLCBsb3kgKyBkMiwgZDIsIG5leHRMZXZlbCwgb2ZmMywgZW5kKVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG5leHRPZmZzZXQob2Zmc2V0cywgZnJvbSkge1xuXHRcdFx0bGV0IG9mZnNldCA9IG51bGwsIGkgPSAwXG5cdFx0XHR3aGlsZShvZmZzZXQgPT09IG51bGwpIHtcblx0XHRcdFx0b2Zmc2V0ID0gb2Zmc2V0c1sgZnJvbSAqIDQgKyBpIF1cblx0XHRcdFx0aSsrXG5cdFx0XHRcdGlmIChpID4gb2Zmc2V0cy5sZW5ndGgpIHJldHVybiBudWxsXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2Zmc2V0XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNlbGVjdGlvblxuXHR9XG5cblx0Ly8gZ2V0IHJhbmdlIG9mZnNldHMgd2l0aGluIGxldmVscyB0byByZW5kZXIgbG9kcyBhcHByb3ByaWF0ZSBmb3Igem9vbSBsZXZlbFxuXHQvLyBUT0RPOiBpdCBpcyBwb3NzaWJsZSB0byBzdG9yZSBtaW5TaXplIG9mIGEgcG9pbnQgdG8gb3B0aW1pemUgbmVlZGUgbGV2ZWwgY2FsY1xuXHRmdW5jdGlvbiBsb2QgKGxveCwgbG95LCBoaXgsIGhpeSwgbWF4TGV2ZWwpIHtcblx0XHRsZXQgcmFuZ2VzID0gW11cblxuXHRcdGZvciAobGV0IGxldmVsID0gMDsgbGV2ZWwgPCBtYXhMZXZlbDsgbGV2ZWwrKykge1xuXHRcdFx0bGV0IGxldmVsR3JvdXBzID0gZ3JvdXBzW2xldmVsXVxuXHRcdFx0bGV0IGZyb20gPSBvZmZzZXRzW2xldmVsXVswXVxuXG5cdFx0XHRsZXQgbGV2ZWxHcm91cFN0YXJ0ID0gZ3JvdXAobG94LCBsb3ksIGxldmVsKVxuXHRcdFx0bGV0IGxldmVsR3JvdXBFbmQgPSBncm91cChoaXgsIGhpeSwgbGV2ZWwpXG5cblx0XHRcdC8vIEZJWE1FOiB1dGlsaXplIHN1YmxldmVscyB0byBzcGVlZCB1cCBzZWFyY2ggcmFuZ2UgaGVyZVxuXHRcdFx0bGV0IHN0YXJ0T2Zmc2V0ID0gc2VhcmNoLmdlKGxldmVsR3JvdXBzLCBsZXZlbEdyb3VwU3RhcnQpXG5cdFx0XHRsZXQgZW5kT2Zmc2V0ID0gc2VhcmNoLmd0KGxldmVsR3JvdXBzLCBsZXZlbEdyb3VwRW5kLCBzdGFydE9mZnNldCwgbGV2ZWxHcm91cHMubGVuZ3RoIC0gMSlcblxuXHRcdFx0cmFuZ2VzW2xldmVsXSA9IFtzdGFydE9mZnNldCArIGZyb20sIGVuZE9mZnNldCArIGZyb21dXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJhbmdlc1xuXHR9XG5cblx0Ly8gZ2V0IGdyb3VwIGlkIGNsb3Nlc3QgdG8gdGhlIHgseSBjb29yZGluYXRlLCBjb3JyZXNwb25kaW5nIHRvIGEgbGV2ZWxcblx0ZnVuY3Rpb24gZ3JvdXAgKHgsIHksIGxldmVsKSB7XG5cdFx0bGV0IGdyb3VwID0gMVxuXG5cdFx0bGV0IGN4ID0gLjUsIGN5ID0gLjVcblx0XHRsZXQgZGlhbSA9IC41XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxldmVsOyBpKyspIHtcblx0XHRcdGdyb3VwIDw8PSAyXG5cblx0XHRcdGdyb3VwICs9IHggPCBjeCA/ICh5IDwgY3kgPyAwIDogMSkgOiAoeSA8IGN5ID8gMiA6IDMpXG5cblx0XHRcdGRpYW0gKj0gLjVcblxuXHRcdFx0Y3ggKz0geCA8IGN4ID8gLWRpYW0gOiBkaWFtXG5cdFx0XHRjeSArPSB5IDwgY3kgPyAtZGlhbSA6IGRpYW1cblx0XHR9XG5cblx0XHRyZXR1cm4gZ3JvdXBcblx0fVxufVxuXG5cbi8vIG5vcm1hbGl6ZSBwb2ludHMgYnkgYm91bmRzXG5mdW5jdGlvbiBub3JtYWxpemUgKHB0cywgYm91bmRzKSB7XG5cdGxldCBbbG94LCBsb3ksIGhpeCwgaGl5XSA9IGJvdW5kc1xuXHRsZXQgc2NhbGVYID0gMS4wIC8gKGhpeCAtIGxveClcblx0bGV0IHNjYWxlWSA9IDEuMCAvIChoaXkgLSBsb3kpXG5cdGxldCByZXN1bHQgPSBuZXcgQXJyYXkocHRzLmxlbmd0aClcblxuXHRmb3IgKGxldCBpID0gMCwgbiA9IHB0cy5sZW5ndGggLyAyOyBpIDwgbjsgaSsrKSB7XG5cdFx0cmVzdWx0WzIqaV0gPSBjbGFtcCgocHRzWzIqaV0gLSBsb3gpICogc2NhbGVYLCAwLCAxKVxuXHRcdHJlc3VsdFsyKmkrMV0gPSBjbGFtcCgocHRzWzIqaSsxXSAtIGxveSkgKiBzY2FsZVksIDAsIDEpXG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0XG59XG4iLCIndXNlIHN0cmljdCdcblxuXG5jb25zdCByZ2JhID0gcmVxdWlyZSgnY29sb3Itbm9ybWFsaXplJylcbmNvbnN0IGdldEJvdW5kcyA9IHJlcXVpcmUoJ2FycmF5LWJvdW5kcycpXG5jb25zdCBleHRlbmQgPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJylcbmNvbnN0IGdsc2xpZnkgPSByZXF1aXJlKCdnbHNsaWZ5JylcbmNvbnN0IHBpY2sgPSByZXF1aXJlKCdwaWNrLWJ5LWFsaWFzJylcbmNvbnN0IGZsYXR0ZW4gPSByZXF1aXJlKCdmbGF0dGVuLXZlcnRleC1kYXRhJylcbmNvbnN0IHRyaWFuZ3VsYXRlID0gcmVxdWlyZSgnZWFyY3V0JylcbmNvbnN0IG5vcm1hbGl6ZSA9IHJlcXVpcmUoJ2FycmF5LW5vcm1hbGl6ZScpXG5jb25zdCB7IGZsb2F0MzIsIGZyYWN0MzIgfSA9IHJlcXVpcmUoJ3RvLWZsb2F0MzInKVxuY29uc3QgV2Vha01hcCA9IHJlcXVpcmUoJ2VzNi13ZWFrLW1hcCcpXG5jb25zdCBwYXJzZVJlY3QgPSByZXF1aXJlKCdwYXJzZS1yZWN0JylcblxuXG5tb2R1bGUuZXhwb3J0cyA9IExpbmUyRFxuXG5cbi8qKiBAY29uc3RydWN0b3IgKi9cbmZ1bmN0aW9uIExpbmUyRCAocmVnbCwgb3B0aW9ucykge1xuXHRpZiAoISh0aGlzIGluc3RhbmNlb2YgTGluZTJEKSkgcmV0dXJuIG5ldyBMaW5lMkQocmVnbCwgb3B0aW9ucylcblxuXHRpZiAodHlwZW9mIHJlZ2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxuXHRcdG9wdGlvbnMucmVnbCA9IHJlZ2xcblx0fVxuXHRlbHNlIHtcblx0XHRvcHRpb25zID0gcmVnbFxuXHR9XG5cdGlmIChvcHRpb25zLmxlbmd0aCkgb3B0aW9ucy5wb3NpdGlvbnMgPSBvcHRpb25zXG5cdHJlZ2wgPSBvcHRpb25zLnJlZ2xcblxuXHRpZiAoIXJlZ2wuaGFzRXh0ZW5zaW9uKCdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJykpIHtcblx0XHR0aHJvdyBFcnJvcigncmVnbC1lcnJvcjJkOiBgQU5HTEVfaW5zdGFuY2VkX2FycmF5c2AgZXh0ZW5zaW9uIHNob3VsZCBiZSBlbmFibGVkJyk7XG5cdH1cblxuXHQvLyBwZXJzaXN0ZW50IHZhcmlhYmxlc1xuXHR0aGlzLmdsID0gcmVnbC5fZ2xcblx0dGhpcy5yZWdsID0gcmVnbFxuXG5cdC8vIGxpc3Qgb2Ygb3B0aW9ucyBmb3IgbGluZXNcblx0dGhpcy5wYXNzZXMgPSBbXVxuXG5cdC8vIGNhY2hlZCBzaGFkZXJzIGluc3RhbmNlXG5cdHRoaXMuc2hhZGVycyA9IExpbmUyRC5zaGFkZXJzLmhhcyhyZWdsKSA/IExpbmUyRC5zaGFkZXJzLmdldChyZWdsKSA6IExpbmUyRC5zaGFkZXJzLnNldChyZWdsLCBMaW5lMkQuY3JlYXRlU2hhZGVycyhyZWdsKSkuZ2V0KHJlZ2wpXG5cblxuXHQvLyBpbml0IGRlZmF1bHRzXG5cdHRoaXMudXBkYXRlKG9wdGlvbnMpXG59XG5cblxuTGluZTJELmRhc2hNdWx0ID0gMlxuTGluZTJELm1heFBhdHRlcm5MZW5ndGggPSAyNTZcbkxpbmUyRC5wcmVjaXNpb25UaHJlc2hvbGQgPSAzZTZcbkxpbmUyRC5tYXhQb2ludHMgPSAxZTRcbkxpbmUyRC5tYXhMaW5lcyA9IDIwNDhcblxuXG4vLyBjYWNoZSBvZiBjcmVhdGVkIGRyYXcgY2FsbHMgcGVyLXJlZ2wgaW5zdGFuY2VcbkxpbmUyRC5zaGFkZXJzID0gbmV3IFdlYWtNYXAoKVxuXG5cbi8vIGNyZWF0ZSBzdGF0aWMgc2hhZGVycyBvbmNlXG5MaW5lMkQuY3JlYXRlU2hhZGVycyA9IGZ1bmN0aW9uIChyZWdsKSB7XG5cdGxldCBvZmZzZXRCdWZmZXIgPSByZWdsLmJ1ZmZlcih7XG5cdFx0dXNhZ2U6ICdzdGF0aWMnLFxuXHRcdHR5cGU6ICdmbG9hdCcsXG5cdFx0ZGF0YTogWzAsMSwgMCwwLCAxLDEsIDEsMF1cblx0fSlcblxuXHRsZXQgc2hhZGVyT3B0aW9ucyA9IHtcblx0XHRwcmltaXRpdmU6ICd0cmlhbmdsZSBzdHJpcCcsXG5cdFx0aW5zdGFuY2VzOiByZWdsLnByb3AoJ2NvdW50JyksXG5cdFx0Y291bnQ6IDQsXG5cdFx0b2Zmc2V0OiAwLFxuXG5cdFx0dW5pZm9ybXM6IHtcblx0XHRcdG1pdGVyTW9kZTogKGN0eCwgcHJvcCkgPT4gcHJvcC5qb2luID09PSAncm91bmQnID8gMiA6IDEsXG5cdFx0XHRtaXRlckxpbWl0OiByZWdsLnByb3AoJ21pdGVyTGltaXQnKSxcblx0XHRcdHNjYWxlOiByZWdsLnByb3AoJ3NjYWxlJyksXG5cdFx0XHRzY2FsZUZyYWN0OiByZWdsLnByb3AoJ3NjYWxlRnJhY3QnKSxcblx0XHRcdHRyYW5zbGF0ZUZyYWN0OiByZWdsLnByb3AoJ3RyYW5zbGF0ZUZyYWN0JyksXG5cdFx0XHR0cmFuc2xhdGU6IHJlZ2wucHJvcCgndHJhbnNsYXRlJyksXG5cdFx0XHR0aGlja25lc3M6IHJlZ2wucHJvcCgndGhpY2tuZXNzJyksXG5cdFx0XHRkYXNoUGF0dGVybjogcmVnbC5wcm9wKCdkYXNoVGV4dHVyZScpLFxuXHRcdFx0b3BhY2l0eTogcmVnbC5wcm9wKCdvcGFjaXR5JyksXG5cdFx0XHRwaXhlbFJhdGlvOiByZWdsLmNvbnRleHQoJ3BpeGVsUmF0aW8nKSxcblx0XHRcdGlkOiByZWdsLnByb3AoJ2lkJyksXG5cdFx0XHRkYXNoU2l6ZTogcmVnbC5wcm9wKCdkYXNoTGVuZ3RoJyksXG5cdFx0XHR2aWV3cG9ydDogKGMsIHApID0+IFtwLnZpZXdwb3J0LngsIHAudmlld3BvcnQueSwgYy52aWV3cG9ydFdpZHRoLCBjLnZpZXdwb3J0SGVpZ2h0XSxcblx0XHRcdGRlcHRoOiByZWdsLnByb3AoJ2RlcHRoJylcblx0XHR9LFxuXG5cdFx0YmxlbmQ6IHtcblx0XHRcdGVuYWJsZTogdHJ1ZSxcblx0XHRcdGNvbG9yOiBbMCwwLDAsMF0sXG5cdFx0XHRlcXVhdGlvbjoge1xuXHRcdFx0XHRyZ2I6ICdhZGQnLFxuXHRcdFx0XHRhbHBoYTogJ2FkZCdcblx0XHRcdH0sXG5cdFx0XHRmdW5jOiB7XG5cdFx0XHRcdHNyY1JHQjogJ3NyYyBhbHBoYScsXG5cdFx0XHRcdGRzdFJHQjogJ29uZSBtaW51cyBzcmMgYWxwaGEnLFxuXHRcdFx0XHRzcmNBbHBoYTogJ29uZSBtaW51cyBkc3QgYWxwaGEnLFxuXHRcdFx0XHRkc3RBbHBoYTogJ29uZSdcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRlcHRoOiB7XG5cdFx0XHRlbmFibGU6IChjLCBwKSA9PiB7XG5cdFx0XHRcdHJldHVybiAhcC5vdmVybGF5XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzdGVuY2lsOiB7ZW5hYmxlOiBmYWxzZX0sXG5cdFx0c2Npc3Nvcjoge1xuXHRcdFx0ZW5hYmxlOiB0cnVlLFxuXHRcdFx0Ym94OiByZWdsLnByb3AoJ3ZpZXdwb3J0Jylcblx0XHR9LFxuXHRcdHZpZXdwb3J0OiByZWdsLnByb3AoJ3ZpZXdwb3J0Jylcblx0fVxuXG5cblx0Ly8gc2ltcGxpZmllZCByZWN0YW5ndWxhciBsaW5lIHNoYWRlclxuXHRsZXQgZHJhd1JlY3RMaW5lID0gcmVnbChleHRlbmQoe1xuXHRcdHZlcnQ6IGdsc2xpZnkoJy4vcmVjdC12ZXJ0Lmdsc2wnKSxcblx0XHRmcmFnOiBnbHNsaWZ5KCcuL3JlY3QtZnJhZy5nbHNsJyksXG5cblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHQvLyBpZiBwb2ludCBpcyBhdCB0aGUgZW5kIG9mIHNlZ21lbnRcblx0XHRcdGxpbmVFbmQ6IHtcblx0XHRcdFx0YnVmZmVyOiBvZmZzZXRCdWZmZXIsXG5cdFx0XHRcdGRpdmlzb3I6IDAsXG5cdFx0XHRcdHN0cmlkZTogOCxcblx0XHRcdFx0b2Zmc2V0OiAwXG5cdFx0XHR9LFxuXHRcdFx0Ly8gaWYgcG9pbnQgaXMgYXQgdGhlIHRvcCBvZiBzZWdtZW50XG5cdFx0XHRsaW5lVG9wOiB7XG5cdFx0XHRcdGJ1ZmZlcjogb2Zmc2V0QnVmZmVyLFxuXHRcdFx0XHRkaXZpc29yOiAwLFxuXHRcdFx0XHRzdHJpZGU6IDgsXG5cdFx0XHRcdG9mZnNldDogNFxuXHRcdFx0fSxcblx0XHRcdC8vIGJlZ2lubmluZyBvZiBsaW5lIGNvb3JkaW5hdGVcblx0XHRcdGFDb29yZDoge1xuXHRcdFx0XHRidWZmZXI6IHJlZ2wucHJvcCgncG9zaXRpb25CdWZmZXInKSxcblx0XHRcdFx0c3RyaWRlOiA4LFxuXHRcdFx0XHRvZmZzZXQ6IDgsXG5cdFx0XHRcdGRpdmlzb3I6IDFcblx0XHRcdH0sXG5cdFx0XHQvLyBlbmQgb2YgbGluZSBjb29yZGluYXRlXG5cdFx0XHRiQ29vcmQ6IHtcblx0XHRcdFx0YnVmZmVyOiByZWdsLnByb3AoJ3Bvc2l0aW9uQnVmZmVyJyksXG5cdFx0XHRcdHN0cmlkZTogOCxcblx0XHRcdFx0b2Zmc2V0OiAxNixcblx0XHRcdFx0ZGl2aXNvcjogMVxuXHRcdFx0fSxcblx0XHRcdGFDb29yZEZyYWN0OiB7XG5cdFx0XHRcdGJ1ZmZlcjogcmVnbC5wcm9wKCdwb3NpdGlvbkZyYWN0QnVmZmVyJyksXG5cdFx0XHRcdHN0cmlkZTogOCxcblx0XHRcdFx0b2Zmc2V0OiA4LFxuXHRcdFx0XHRkaXZpc29yOiAxXG5cdFx0XHR9LFxuXHRcdFx0YkNvb3JkRnJhY3Q6IHtcblx0XHRcdFx0YnVmZmVyOiByZWdsLnByb3AoJ3Bvc2l0aW9uRnJhY3RCdWZmZXInKSxcblx0XHRcdFx0c3RyaWRlOiA4LFxuXHRcdFx0XHRvZmZzZXQ6IDE2LFxuXHRcdFx0XHRkaXZpc29yOiAxXG5cdFx0XHR9LFxuXHRcdFx0Y29sb3I6IHtcblx0XHRcdFx0YnVmZmVyOiByZWdsLnByb3AoJ2NvbG9yQnVmZmVyJyksXG5cdFx0XHRcdHN0cmlkZTogNCxcblx0XHRcdFx0b2Zmc2V0OiAwLFxuXHRcdFx0XHRkaXZpc29yOiAxXG5cdFx0XHR9XG5cdFx0fVxuXHR9LCBzaGFkZXJPcHRpb25zKSlcblxuXHQvLyBjcmVhdGUgcmVnbCBkcmF3XG5cdGxldCBkcmF3TWl0ZXJMaW5lXG5cblx0dHJ5IHtcblx0XHRkcmF3TWl0ZXJMaW5lID0gcmVnbChleHRlbmQoe1xuXHRcdFx0Ly8gY3VsbGluZyByZW1vdmVzIHBvbHlnb24gY3JlYXNpbmdcblx0XHRcdGN1bGw6IHtcblx0XHRcdFx0ZW5hYmxlOiB0cnVlLFxuXHRcdFx0XHRmYWNlOiAnYmFjaydcblx0XHRcdH0sXG5cblx0XHRcdHZlcnQ6IGdsc2xpZnkoJy4vbWl0ZXItdmVydC5nbHNsJyksXG5cdFx0XHRmcmFnOiBnbHNsaWZ5KCcuL21pdGVyLWZyYWcuZ2xzbCcpLFxuXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdC8vIGlzIGxpbmUgZW5kXG5cdFx0XHRcdGxpbmVFbmQ6IHtcblx0XHRcdFx0XHRidWZmZXI6IG9mZnNldEJ1ZmZlcixcblx0XHRcdFx0XHRkaXZpc29yOiAwLFxuXHRcdFx0XHRcdHN0cmlkZTogOCxcblx0XHRcdFx0XHRvZmZzZXQ6IDBcblx0XHRcdFx0fSxcblx0XHRcdFx0Ly8gaXMgbGluZSB0b3Bcblx0XHRcdFx0bGluZVRvcDoge1xuXHRcdFx0XHRcdGJ1ZmZlcjogb2Zmc2V0QnVmZmVyLFxuXHRcdFx0XHRcdGRpdmlzb3I6IDAsXG5cdFx0XHRcdFx0c3RyaWRlOiA4LFxuXHRcdFx0XHRcdG9mZnNldDogNFxuXHRcdFx0XHR9LFxuXHRcdFx0XHQvLyBsZWZ0IGNvbG9yXG5cdFx0XHRcdGFDb2xvcjoge1xuXHRcdFx0XHRcdGJ1ZmZlcjogcmVnbC5wcm9wKCdjb2xvckJ1ZmZlcicpLFxuXHRcdFx0XHRcdHN0cmlkZTogNCxcblx0XHRcdFx0XHRvZmZzZXQ6IDAsXG5cdFx0XHRcdFx0ZGl2aXNvcjogMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQvLyByaWdodCBjb2xvclxuXHRcdFx0XHRiQ29sb3I6IHtcblx0XHRcdFx0XHRidWZmZXI6IHJlZ2wucHJvcCgnY29sb3JCdWZmZXInKSxcblx0XHRcdFx0XHRzdHJpZGU6IDQsXG5cdFx0XHRcdFx0b2Zmc2V0OiA0LFxuXHRcdFx0XHRcdGRpdmlzb3I6IDFcblx0XHRcdFx0fSxcblx0XHRcdFx0cHJldkNvb3JkOiB7XG5cdFx0XHRcdFx0YnVmZmVyOiByZWdsLnByb3AoJ3Bvc2l0aW9uQnVmZmVyJyksXG5cdFx0XHRcdFx0c3RyaWRlOiA4LFxuXHRcdFx0XHRcdG9mZnNldDogMCxcblx0XHRcdFx0XHRkaXZpc29yOiAxXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFDb29yZDoge1xuXHRcdFx0XHRcdGJ1ZmZlcjogcmVnbC5wcm9wKCdwb3NpdGlvbkJ1ZmZlcicpLFxuXHRcdFx0XHRcdHN0cmlkZTogOCxcblx0XHRcdFx0XHRvZmZzZXQ6IDgsXG5cdFx0XHRcdFx0ZGl2aXNvcjogMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRiQ29vcmQ6IHtcblx0XHRcdFx0XHRidWZmZXI6IHJlZ2wucHJvcCgncG9zaXRpb25CdWZmZXInKSxcblx0XHRcdFx0XHRzdHJpZGU6IDgsXG5cdFx0XHRcdFx0b2Zmc2V0OiAxNixcblx0XHRcdFx0XHRkaXZpc29yOiAxXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG5leHRDb29yZDoge1xuXHRcdFx0XHRcdGJ1ZmZlcjogcmVnbC5wcm9wKCdwb3NpdGlvbkJ1ZmZlcicpLFxuXHRcdFx0XHRcdHN0cmlkZTogOCxcblx0XHRcdFx0XHRvZmZzZXQ6IDI0LFxuXHRcdFx0XHRcdGRpdmlzb3I6IDFcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIHNoYWRlck9wdGlvbnMpKVxuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUvYmFkIFdlYmtpdCBmYWxsYmFja1xuXHRcdGRyYXdNaXRlckxpbmUgPSBkcmF3UmVjdExpbmVcblx0fVxuXG5cdC8vIGZpbGwgc2hhZGVyXG5cdGxldCBkcmF3RmlsbCA9IHJlZ2woe1xuXHRcdHByaW1pdGl2ZTogJ3RyaWFuZ2xlJyxcblx0XHRlbGVtZW50czogKGN0eCwgcHJvcCkgPT4gcHJvcC50cmlhbmdsZXMsXG5cdFx0b2Zmc2V0OiAwLFxuXG5cdFx0dmVydDogZ2xzbGlmeSgnLi9maWxsLXZlcnQuZ2xzbCcpLFxuXHRcdGZyYWc6IGdsc2xpZnkoJy4vZmlsbC1mcmFnLmdsc2wnKSxcblxuXHRcdHVuaWZvcm1zOiB7XG5cdFx0XHRzY2FsZTogcmVnbC5wcm9wKCdzY2FsZScpLFxuXHRcdFx0Y29sb3I6IHJlZ2wucHJvcCgnZmlsbCcpLFxuXHRcdFx0c2NhbGVGcmFjdDogcmVnbC5wcm9wKCdzY2FsZUZyYWN0JyksXG5cdFx0XHR0cmFuc2xhdGVGcmFjdDogcmVnbC5wcm9wKCd0cmFuc2xhdGVGcmFjdCcpLFxuXHRcdFx0dHJhbnNsYXRlOiByZWdsLnByb3AoJ3RyYW5zbGF0ZScpLFxuXHRcdFx0b3BhY2l0eTogcmVnbC5wcm9wKCdvcGFjaXR5JyksXG5cdFx0XHRwaXhlbFJhdGlvOiByZWdsLmNvbnRleHQoJ3BpeGVsUmF0aW8nKSxcblx0XHRcdGlkOiByZWdsLnByb3AoJ2lkJyksXG5cdFx0XHR2aWV3cG9ydDogKGN0eCwgcHJvcCkgPT4gW3Byb3Audmlld3BvcnQueCwgcHJvcC52aWV3cG9ydC55LCBjdHgudmlld3BvcnRXaWR0aCwgY3R4LnZpZXdwb3J0SGVpZ2h0XVxuXHRcdH0sXG5cblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRidWZmZXI6IHJlZ2wucHJvcCgncG9zaXRpb25CdWZmZXInKSxcblx0XHRcdFx0c3RyaWRlOiA4LFxuXHRcdFx0XHRvZmZzZXQ6IDhcblx0XHRcdH0sXG5cdFx0XHRwb3NpdGlvbkZyYWN0OiB7XG5cdFx0XHRcdGJ1ZmZlcjogcmVnbC5wcm9wKCdwb3NpdGlvbkZyYWN0QnVmZmVyJyksXG5cdFx0XHRcdHN0cmlkZTogOCxcblx0XHRcdFx0b2Zmc2V0OiA4XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGJsZW5kOiBzaGFkZXJPcHRpb25zLmJsZW5kLFxuXG5cdFx0ZGVwdGg6IHsgZW5hYmxlOiBmYWxzZSB9LFxuXHRcdHNjaXNzb3I6IHNoYWRlck9wdGlvbnMuc2Npc3Nvcixcblx0XHRzdGVuY2lsOiBzaGFkZXJPcHRpb25zLnN0ZW5jaWwsXG5cdFx0dmlld3BvcnQ6IHNoYWRlck9wdGlvbnMudmlld3BvcnRcblx0fSlcblxuXHRyZXR1cm4ge1xuXHRcdGZpbGw6IGRyYXdGaWxsLCByZWN0OiBkcmF3UmVjdExpbmUsIG1pdGVyOiBkcmF3TWl0ZXJMaW5lXG5cdH1cbn1cblxuXG4vLyB1c2VkIHRvIGZvciBuZXcgbGluZXMgaW5zdGFuY2VzXG5MaW5lMkQuZGVmYXVsdHMgPSB7XG5cdGRhc2hlczogbnVsbCxcblx0am9pbjogJ21pdGVyJyxcblx0bWl0ZXJMaW1pdDogMSxcblx0dGhpY2tuZXNzOiAxMCxcblx0Y2FwOiAnc3F1YXJlJyxcblx0Y29sb3I6ICdibGFjaycsXG5cdG9wYWNpdHk6IDEsXG5cdG92ZXJsYXk6IGZhbHNlLFxuXHR2aWV3cG9ydDogbnVsbCxcblx0cmFuZ2U6IG51bGwsXG5cdGNsb3NlOiBmYWxzZSxcblx0ZmlsbDogbnVsbFxufVxuXG5cbkxpbmUyRC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0aWYgKGFyZ3MubGVuZ3RoKSB7XG5cdFx0dGhpcy51cGRhdGUoLi4uYXJncylcblx0fVxuXG5cdHRoaXMuZHJhdygpXG59XG5cblxuTGluZTJELnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0Ly8gcmVuZGVyIG11bHRpcGxlIHBvbHlsaW5lcyB2aWEgcmVnbCBiYXRjaFxuXHQoYXJncy5sZW5ndGggPyBhcmdzIDogdGhpcy5wYXNzZXMpLmZvckVhY2goKHMsIGkpID0+IHtcblx0XHQvLyByZW5kZXIgYXJyYXkgcGFzcyBhcyBhIGxpc3Qgb2YgcGFzc2VzXG5cdFx0aWYgKHMgJiYgQXJyYXkuaXNBcnJheShzKSkgcmV0dXJuIHRoaXMuZHJhdyguLi5zKVxuXG5cdFx0aWYgKHR5cGVvZiBzID09PSAnbnVtYmVyJykgcyA9IHRoaXMucGFzc2VzW3NdXG5cblx0XHRpZiAoIShzICYmIHMuY291bnQgPiAxICYmIHMub3BhY2l0eSkpIHJldHVyblxuXG5cdFx0dGhpcy5yZWdsLl9yZWZyZXNoKClcblxuXHRcdGlmIChzLmZpbGwgJiYgcy50cmlhbmdsZXMgJiYgcy50cmlhbmdsZXMubGVuZ3RoID4gMikge1xuXHRcdFx0dGhpcy5zaGFkZXJzLmZpbGwocylcblx0XHR9XG5cblx0XHRpZiAoIXMudGhpY2tuZXNzKSByZXR1cm5cblxuXHRcdC8vIGhpZ2ggc2NhbGUgaXMgb25seSBhdmFpbGFibGUgZm9yIHJlY3QgbW9kZSB3aXRoIHByZWNpc2lvblxuXHRcdGlmIChzLnNjYWxlWzBdICogcy52aWV3cG9ydC53aWR0aCA+IExpbmUyRC5wcmVjaXNpb25UaHJlc2hvbGQgfHwgcy5zY2FsZVsxXSAqIHMudmlld3BvcnQuaGVpZ2h0ID4gTGluZTJELnByZWNpc2lvblRocmVzaG9sZCkge1xuXHRcdFx0dGhpcy5zaGFkZXJzLnJlY3Qocylcblx0XHR9XG5cblx0XHQvLyB0aGluIHRoaXMucGFzc2VzIG9yIHRvbyBtYW55IHBvaW50cyBhcmUgcmVuZGVyZWQgYXMgc2ltcGxpZmllZCByZWN0IHNoYWRlclxuXHRcdGVsc2UgaWYgKHMuam9pbiA9PT0gJ3JlY3QnIHx8ICghcy5qb2luICYmIChzLnRoaWNrbmVzcyA8PSAyIHx8IHMuY291bnQgPj0gTGluZTJELm1heFBvaW50cykpKSB7XG5cdFx0XHR0aGlzLnNoYWRlcnMucmVjdChzKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuc2hhZGVycy5taXRlcihzKVxuXHRcdH1cblx0fSlcblxuXHRyZXR1cm4gdGhpc1xufVxuXG5MaW5lMkQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdGlmICghb3B0aW9ucykgcmV0dXJuXG5cblx0aWYgKG9wdGlvbnMubGVuZ3RoICE9IG51bGwpIHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbnNbMF0gPT09ICdudW1iZXInKSBvcHRpb25zID0gW3twb3NpdGlvbnM6IG9wdGlvbnN9XVxuXHR9XG5cblx0Ly8gbWFrZSBvcHRpb25zIGEgYmF0Y2hcblx0ZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucykpIG9wdGlvbnMgPSBbb3B0aW9uc11cblxuXHRsZXQgeyByZWdsLCBnbCB9ID0gdGhpc1xuXG5cdC8vIHByb2Nlc3MgcGVyLWxpbmUgc2V0dGluZ3Ncblx0b3B0aW9ucy5mb3JFYWNoKChvLCBpKSA9PiB7XG5cdFx0bGV0IHN0YXRlID0gdGhpcy5wYXNzZXNbaV1cblxuXHRcdGlmIChvID09PSB1bmRlZmluZWQpIHJldHVyblxuXG5cdFx0Ly8gbnVsbC1hcmd1bWVudCByZW1vdmVzIHBhc3Ncblx0XHRpZiAobyA9PT0gbnVsbCkge1xuXHRcdFx0dGhpcy5wYXNzZXNbaV0gPSBudWxsXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9bMF0gPT09ICdudW1iZXInKSBvID0ge3Bvc2l0aW9uczogb31cblxuXHRcdC8vIGhhbmRsZSBhbGlhc2VzXG5cdFx0byA9IHBpY2sobywge1xuXHRcdFx0cG9zaXRpb25zOiAncG9zaXRpb25zIHBvaW50cyBkYXRhIGNvb3JkcycsXG5cdFx0XHR0aGlja25lc3M6ICd0aGlja25lc3MgbGluZVdpZHRoIGxpbmVXaWR0aHMgbGluZS13aWR0aCBsaW5ld2lkdGggd2lkdGggc3Ryb2tlLXdpZHRoIHN0cm9rZXdpZHRoIHN0cm9rZVdpZHRoJyxcblx0XHRcdGpvaW46ICdsaW5lSm9pbiBsaW5lam9pbiBqb2luIHR5cGUgbW9kZScsXG5cdFx0XHRtaXRlckxpbWl0OiAnbWl0ZXJsaW1pdCBtaXRlckxpbWl0Jyxcblx0XHRcdGRhc2hlczogJ2Rhc2ggZGFzaGVzIGRhc2hhcnJheSBkYXNoLWFycmF5IGRhc2hBcnJheScsXG5cdFx0XHRjb2xvcjogJ2NvbG9yIGNvbG91ciBzdHJva2UgY29sb3JzIGNvbG91cnMgc3Ryb2tlLWNvbG9yIHN0cm9rZUNvbG9yJyxcblx0XHRcdGZpbGw6ICdmaWxsIGZpbGwtY29sb3IgZmlsbENvbG9yJyxcblx0XHRcdG9wYWNpdHk6ICdhbHBoYSBvcGFjaXR5Jyxcblx0XHRcdG92ZXJsYXk6ICdvdmVybGF5IGNyZWFzZSBvdmVybGFwIGludGVyc2VjdCcsXG5cdFx0XHRjbG9zZTogJ2Nsb3NlZCBjbG9zZSBjbG9zZWQtcGF0aCBjbG9zZVBhdGgnLFxuXHRcdFx0cmFuZ2U6ICdyYW5nZSBkYXRhQm94Jyxcblx0XHRcdHZpZXdwb3J0OiAndmlld3BvcnQgdmlld0JveCcsXG5cdFx0XHRob2xlOiAnaG9sZXMgaG9sZSBob2xsb3cnXG5cdFx0fSlcblxuXHRcdC8vIGluaXQgc3RhdGVcblx0XHRpZiAoIXN0YXRlKSB7XG5cdFx0XHR0aGlzLnBhc3Nlc1tpXSA9IHN0YXRlID0ge1xuXHRcdFx0XHRpZDogaSxcblx0XHRcdFx0c2NhbGU6IG51bGwsXG5cdFx0XHRcdHNjYWxlRnJhY3Q6IG51bGwsXG5cdFx0XHRcdHRyYW5zbGF0ZTogbnVsbCxcblx0XHRcdFx0dHJhbnNsYXRlRnJhY3Q6IG51bGwsXG5cdFx0XHRcdGNvdW50OiAwLFxuXHRcdFx0XHRob2xlOiBbXSxcblx0XHRcdFx0ZGVwdGg6IDAsXG5cblx0XHRcdFx0ZGFzaExlbmd0aDogMSxcblx0XHRcdFx0ZGFzaFRleHR1cmU6IHJlZ2wudGV4dHVyZSh7XG5cdFx0XHRcdFx0Y2hhbm5lbHM6IDEsXG5cdFx0XHRcdFx0ZGF0YTogbmV3IFVpbnQ4QXJyYXkoWzI1NV0pLFxuXHRcdFx0XHRcdHdpZHRoOiAxLFxuXHRcdFx0XHRcdGhlaWdodDogMSxcblx0XHRcdFx0XHRtYWc6ICdsaW5lYXInLFxuXHRcdFx0XHRcdG1pbjogJ2xpbmVhcidcblx0XHRcdFx0fSksXG5cblx0XHRcdFx0Y29sb3JCdWZmZXI6IHJlZ2wuYnVmZmVyKHtcblx0XHRcdFx0XHR1c2FnZTogJ2R5bmFtaWMnLFxuXHRcdFx0XHRcdHR5cGU6ICd1aW50OCcsXG5cdFx0XHRcdFx0ZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuXHRcdFx0XHR9KSxcblx0XHRcdFx0cG9zaXRpb25CdWZmZXI6IHJlZ2wuYnVmZmVyKHtcblx0XHRcdFx0XHR1c2FnZTogJ2R5bmFtaWMnLFxuXHRcdFx0XHRcdHR5cGU6ICdmbG9hdCcsXG5cdFx0XHRcdFx0ZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuXHRcdFx0XHR9KSxcblx0XHRcdFx0cG9zaXRpb25GcmFjdEJ1ZmZlcjogcmVnbC5idWZmZXIoe1xuXHRcdFx0XHRcdHVzYWdlOiAnZHluYW1pYycsXG5cdFx0XHRcdFx0dHlwZTogJ2Zsb2F0Jyxcblx0XHRcdFx0XHRkYXRhOiBuZXcgVWludDhBcnJheSgpXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHRcdG8gPSBleHRlbmQoe30sIExpbmUyRC5kZWZhdWx0cywgbylcblx0XHR9XG5cdFx0aWYgKG8udGhpY2tuZXNzICE9IG51bGwpIHN0YXRlLnRoaWNrbmVzcyA9IHBhcnNlRmxvYXQoby50aGlja25lc3MpXG5cdFx0aWYgKG8ub3BhY2l0eSAhPSBudWxsKSBzdGF0ZS5vcGFjaXR5ID0gcGFyc2VGbG9hdChvLm9wYWNpdHkpXG5cdFx0aWYgKG8ubWl0ZXJMaW1pdCAhPSBudWxsKSBzdGF0ZS5taXRlckxpbWl0ID0gcGFyc2VGbG9hdChvLm1pdGVyTGltaXQpXG5cdFx0aWYgKG8ub3ZlcmxheSAhPSBudWxsKSB7XG5cdFx0XHRzdGF0ZS5vdmVybGF5ID0gISFvLm92ZXJsYXlcblx0XHRcdGlmIChpIDwgTGluZTJELm1heExpbmVzKSB7XG5cdFx0XHRcdHN0YXRlLmRlcHRoID0gMiAqIChMaW5lMkQubWF4TGluZXMgLSAxIC0gaSAlIExpbmUyRC5tYXhMaW5lcykgLyBMaW5lMkQubWF4TGluZXMgLSAxLjtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKG8uam9pbiAhPSBudWxsKSBzdGF0ZS5qb2luID0gby5qb2luXG5cdFx0aWYgKG8uaG9sZSAhPSBudWxsKSBzdGF0ZS5ob2xlID0gby5ob2xlXG5cdFx0aWYgKG8uZmlsbCAhPSBudWxsKSBzdGF0ZS5maWxsID0gIW8uZmlsbCA/IG51bGwgOiByZ2JhKG8uZmlsbCwgJ3VpbnQ4Jylcblx0XHRpZiAoby52aWV3cG9ydCAhPSBudWxsKSBzdGF0ZS52aWV3cG9ydCA9IHBhcnNlUmVjdChvLnZpZXdwb3J0KVxuXG5cdFx0aWYgKCFzdGF0ZS52aWV3cG9ydCkge1xuXHRcdFx0c3RhdGUudmlld3BvcnQgPSBwYXJzZVJlY3QoW1xuXHRcdFx0XHRnbC5kcmF3aW5nQnVmZmVyV2lkdGgsXG5cdFx0XHRcdGdsLmRyYXdpbmdCdWZmZXJIZWlnaHRcblx0XHRcdF0pXG5cdFx0fVxuXG5cdFx0aWYgKG8uY2xvc2UgIT0gbnVsbCkgc3RhdGUuY2xvc2UgPSBvLmNsb3NlXG5cblx0XHQvLyByZXNldCBwb3NpdGlvbnNcblx0XHRpZiAoby5wb3NpdGlvbnMgPT09IG51bGwpIG8ucG9zaXRpb25zID0gW11cblx0XHRpZiAoby5wb3NpdGlvbnMpIHtcblx0XHRcdGxldCBwb3NpdGlvbnMsIGNvdW50XG5cblx0XHRcdC8vIGlmIHBvc2l0aW9ucyBhcmUgYW4gb2JqZWN0IHdpdGggeC95XG5cdFx0XHRpZiAoby5wb3NpdGlvbnMueCAmJiBvLnBvc2l0aW9ucy55KSB7XG5cdFx0XHRcdGxldCB4UG9zID0gby5wb3NpdGlvbnMueFxuXHRcdFx0XHRsZXQgeVBvcyA9IG8ucG9zaXRpb25zLnlcblx0XHRcdFx0Y291bnQgPSBzdGF0ZS5jb3VudCA9IE1hdGgubWF4KFxuXHRcdFx0XHRcdHhQb3MubGVuZ3RoLFxuXHRcdFx0XHRcdHlQb3MubGVuZ3RoXG5cdFx0XHRcdClcblx0XHRcdFx0cG9zaXRpb25zID0gbmV3IEZsb2F0NjRBcnJheShjb3VudCAqIDIpXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXHRcdFx0XHRcdHBvc2l0aW9uc1tpICogMl0gPSB4UG9zW2ldXG5cdFx0XHRcdFx0cG9zaXRpb25zW2kgKiAyICsgMV0gPSB5UG9zW2ldXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRwb3NpdGlvbnMgPSBmbGF0dGVuKG8ucG9zaXRpb25zLCAnZmxvYXQ2NCcpXG5cdFx0XHRcdGNvdW50ID0gc3RhdGUuY291bnQgPSBNYXRoLmZsb29yKHBvc2l0aW9ucy5sZW5ndGggLyAyKVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgYm91bmRzID0gc3RhdGUuYm91bmRzID0gZ2V0Qm91bmRzKHBvc2l0aW9ucywgMilcblxuXHRcdFx0Ly8gY3JlYXRlIGZpbGwgcG9zaXRpb25zXG5cdFx0XHQvLyBGSVhNRTogZmlsbCBwb3NpdGlvbnMgY2FuIGJlIHNldCBvbmx5IGFsb25nIHdpdGggcG9zaXRpb25zXG5cdFx0XHRpZiAoc3RhdGUuZmlsbCkge1xuXHRcdFx0XHRsZXQgcG9zID0gW11cblxuXHRcdFx0XHQvLyBmaWx0ZXIgYmFkIHZlcnRpY2VzIGFuZCByZW1hcCB0cmlhbmdsZXMgdG8gZW5zdXJlIHNoYXBlXG5cdFx0XHRcdGxldCBpZHMgPSB7fVxuXHRcdFx0XHRsZXQgbGFzdElkID0gMFxuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwLCBwdHIgPSAwLCBsID0gc3RhdGUuY291bnQ7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0XHRsZXQgeCA9IHBvc2l0aW9uc1tpKjJdXG5cdFx0XHRcdFx0bGV0IHkgPSBwb3NpdGlvbnNbaSoyICsgMV1cblx0XHRcdFx0XHRpZiAoaXNOYU4oeCkgfHwgaXNOYU4oeSkgfHwgeCA9PSBudWxsIHx8IHkgPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0eCA9IHBvc2l0aW9uc1tsYXN0SWQqMl1cblx0XHRcdFx0XHRcdHkgPSBwb3NpdGlvbnNbbGFzdElkKjIgKyAxXVxuXHRcdFx0XHRcdFx0aWRzW2ldID0gbGFzdElkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0bGFzdElkID0gaVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3NbcHRyKytdID0geFxuXHRcdFx0XHRcdHBvc1twdHIrK10gPSB5XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgdHJpYW5nbGVzID0gdHJpYW5ndWxhdGUocG9zLCBzdGF0ZS5ob2xlIHx8IFtdKVxuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwLCBsID0gdHJpYW5nbGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRcdGlmIChpZHNbdHJpYW5nbGVzW2ldXSAhPSBudWxsKSB0cmlhbmdsZXNbaV0gPSBpZHNbdHJpYW5nbGVzW2ldXVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c3RhdGUudHJpYW5nbGVzID0gdHJpYW5nbGVzXG5cdFx0XHR9XG5cblx0XHRcdC8vIHVwZGF0ZSBwb3NpdGlvbiBidWZmZXJzXG5cdFx0XHRsZXQgbnBvcyA9IG5ldyBGbG9hdDY0QXJyYXkocG9zaXRpb25zKVxuXHRcdFx0bm9ybWFsaXplKG5wb3MsIDIsIGJvdW5kcylcblxuXHRcdFx0bGV0IHBvc2l0aW9uRGF0YSA9IG5ldyBGbG9hdDY0QXJyYXkoY291bnQgKiAyICsgNilcblxuXHRcdFx0Ly8gcm90YXRlIGZpcnN0IHNlZ21lbnQgam9pblxuXHRcdFx0aWYgKHN0YXRlLmNsb3NlKSB7XG5cdFx0XHRcdGlmIChwb3NpdGlvbnNbMF0gPT09IHBvc2l0aW9uc1tjb3VudCoyIC0gMl0gJiZcblx0XHRcdFx0XHRwb3NpdGlvbnNbMV0gPT09IHBvc2l0aW9uc1tjb3VudCoyIC0gMV0pIHtcblx0XHRcdFx0XHRwb3NpdGlvbkRhdGFbMF0gPSBucG9zW2NvdW50KjIgLSA0XVxuXHRcdFx0XHRcdHBvc2l0aW9uRGF0YVsxXSA9IG5wb3NbY291bnQqMiAtIDNdXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cG9zaXRpb25EYXRhWzBdID0gbnBvc1tjb3VudCoyIC0gMl1cblx0XHRcdFx0XHRwb3NpdGlvbkRhdGFbMV0gPSBucG9zW2NvdW50KjIgLSAxXVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cG9zaXRpb25EYXRhWzBdID0gbnBvc1swXVxuXHRcdFx0XHRwb3NpdGlvbkRhdGFbMV0gPSBucG9zWzFdXG5cdFx0XHR9XG5cblx0XHRcdHBvc2l0aW9uRGF0YS5zZXQobnBvcywgMilcblxuXHRcdFx0Ly8gYWRkIGxhc3Qgc2VnbWVudFxuXHRcdFx0aWYgKHN0YXRlLmNsb3NlKSB7XG5cdFx0XHRcdC8vIGlnbm9yZSBjb2luY2lkaW5nIHN0YXJ0L2VuZFxuXHRcdFx0XHRpZiAocG9zaXRpb25zWzBdID09PSBwb3NpdGlvbnNbY291bnQqMiAtIDJdICYmXG5cdFx0XHRcdFx0cG9zaXRpb25zWzFdID09PSBwb3NpdGlvbnNbY291bnQqMiAtIDFdKSB7XG5cdFx0XHRcdFx0cG9zaXRpb25EYXRhW2NvdW50KjIgKyAyXSA9IG5wb3NbMl1cblx0XHRcdFx0XHRwb3NpdGlvbkRhdGFbY291bnQqMiArIDNdID0gbnBvc1szXVxuXHRcdFx0XHRcdHN0YXRlLmNvdW50IC09IDFcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRwb3NpdGlvbkRhdGFbY291bnQqMiArIDJdID0gbnBvc1swXVxuXHRcdFx0XHRcdHBvc2l0aW9uRGF0YVtjb3VudCoyICsgM10gPSBucG9zWzFdXG5cdFx0XHRcdFx0cG9zaXRpb25EYXRhW2NvdW50KjIgKyA0XSA9IG5wb3NbMl1cblx0XHRcdFx0XHRwb3NpdGlvbkRhdGFbY291bnQqMiArIDVdID0gbnBvc1szXVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBhZGQgc3R1YlxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHBvc2l0aW9uRGF0YVtjb3VudCoyICsgMl0gPSBucG9zW2NvdW50KjIgLSAyXVxuXHRcdFx0XHRwb3NpdGlvbkRhdGFbY291bnQqMiArIDNdID0gbnBvc1tjb3VudCoyIC0gMV1cblx0XHRcdFx0cG9zaXRpb25EYXRhW2NvdW50KjIgKyA0XSA9IG5wb3NbY291bnQqMiAtIDJdXG5cdFx0XHRcdHBvc2l0aW9uRGF0YVtjb3VudCoyICsgNV0gPSBucG9zW2NvdW50KjIgLSAxXVxuXHRcdFx0fVxuXG5cdFx0XHRzdGF0ZS5wb3NpdGlvbkJ1ZmZlcihmbG9hdDMyKHBvc2l0aW9uRGF0YSkpXG5cdFx0XHRzdGF0ZS5wb3NpdGlvbkZyYWN0QnVmZmVyKGZyYWN0MzIocG9zaXRpb25EYXRhKSlcblx0XHR9XG5cblx0XHRpZiAoby5yYW5nZSkge1xuXHRcdFx0c3RhdGUucmFuZ2UgPSBvLnJhbmdlXG5cdFx0fSBlbHNlIGlmICghc3RhdGUucmFuZ2UpIHtcblx0XHRcdHN0YXRlLnJhbmdlID0gc3RhdGUuYm91bmRzXG5cdFx0fVxuXG5cdFx0aWYgKChvLnJhbmdlIHx8IG8ucG9zaXRpb25zKSAmJiBzdGF0ZS5jb3VudCkge1xuXHRcdFx0bGV0IGJvdW5kcyA9IHN0YXRlLmJvdW5kc1xuXG5cdFx0XHRsZXQgYm91bmRzVyA9IGJvdW5kc1syXSAtIGJvdW5kc1swXSxcblx0XHRcdFx0Ym91bmRzSCA9IGJvdW5kc1szXSAtIGJvdW5kc1sxXVxuXG5cdFx0XHRsZXQgcmFuZ2VXID0gc3RhdGUucmFuZ2VbMl0gLSBzdGF0ZS5yYW5nZVswXSxcblx0XHRcdFx0cmFuZ2VIID0gc3RhdGUucmFuZ2VbM10gLSBzdGF0ZS5yYW5nZVsxXVxuXG5cdFx0XHRzdGF0ZS5zY2FsZSA9IFtcblx0XHRcdFx0Ym91bmRzVyAvIHJhbmdlVyxcblx0XHRcdFx0Ym91bmRzSCAvIHJhbmdlSFxuXHRcdFx0XVxuXHRcdFx0c3RhdGUudHJhbnNsYXRlID0gW1xuXHRcdFx0XHQtc3RhdGUucmFuZ2VbMF0gLyByYW5nZVcgKyBib3VuZHNbMF0gLyByYW5nZVcgfHwgMCxcblx0XHRcdFx0LXN0YXRlLnJhbmdlWzFdIC8gcmFuZ2VIICsgYm91bmRzWzFdIC8gcmFuZ2VIIHx8IDBcblx0XHRcdF1cblxuXHRcdFx0c3RhdGUuc2NhbGVGcmFjdCA9IGZyYWN0MzIoc3RhdGUuc2NhbGUpXG5cdFx0XHRzdGF0ZS50cmFuc2xhdGVGcmFjdCA9IGZyYWN0MzIoc3RhdGUudHJhbnNsYXRlKVxuXHRcdH1cblxuXHRcdGlmIChvLmRhc2hlcykge1xuXHRcdFx0bGV0IGRhc2hMZW5ndGggPSAwLiwgZGFzaERhdGFcblxuXHRcdFx0aWYgKCFvLmRhc2hlcyB8fCBvLmRhc2hlcy5sZW5ndGggPCAyKSB7XG5cdFx0XHRcdGRhc2hMZW5ndGggPSAxLlxuXHRcdFx0XHRkYXNoRGF0YSA9IG5ldyBVaW50OEFycmF5KFsyNTUsIDI1NSwgMjU1LCAyNTUsIDI1NSwgMjU1LCAyNTUsIDI1NV0pXG5cdFx0XHR9XG5cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRkYXNoTGVuZ3RoID0gMC47XG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBvLmRhc2hlcy5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRcdGRhc2hMZW5ndGggKz0gby5kYXNoZXNbaV1cblx0XHRcdFx0fVxuXHRcdFx0XHRkYXNoRGF0YSA9IG5ldyBVaW50OEFycmF5KGRhc2hMZW5ndGggKiBMaW5lMkQuZGFzaE11bHQpXG5cdFx0XHRcdGxldCBwdHIgPSAwXG5cdFx0XHRcdGxldCBmaWxsQ29sb3IgPSAyNTVcblxuXHRcdFx0XHQvLyByZXBlYXQgdGV4dHVyZSB0d28gdGltZXMgdG8gcHJvdmlkZSBzbW9vdGggMC1zdGVwXG5cdFx0XHRcdGZvciAobGV0IGsgPSAwOyBrIDwgMjsgaysrKSB7XG5cdFx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IG8uZGFzaGVzLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdFx0XHRmb3IobGV0IGogPSAwLCBsID0gby5kYXNoZXNbaV0gKiBMaW5lMkQuZGFzaE11bHQgKiAuNTsgaiA8IGw7ICsraikge1xuXHRcdFx0XHRcdFx0XHRkYXNoRGF0YVtwdHIrK10gPSBmaWxsQ29sb3Jcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGZpbGxDb2xvciBePSAyNTVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0c3RhdGUuZGFzaExlbmd0aCA9IGRhc2hMZW5ndGhcblx0XHRcdHN0YXRlLmRhc2hUZXh0dXJlKHtcblx0XHRcdFx0Y2hhbm5lbHM6IDEsXG5cdFx0XHRcdGRhdGE6IGRhc2hEYXRhLFxuXHRcdFx0XHR3aWR0aDogZGFzaERhdGEubGVuZ3RoLFxuXHRcdFx0XHRoZWlnaHQ6IDEsXG5cdFx0XHRcdG1hZzogJ2xpbmVhcicsXG5cdFx0XHRcdG1pbjogJ2xpbmVhcidcblx0XHRcdH0sIDAsIDApXG5cdFx0fVxuXG5cdFx0aWYgKG8uY29sb3IpIHtcblx0XHRcdGxldCBjb3VudCA9IHN0YXRlLmNvdW50XG5cdFx0XHRsZXQgY29sb3JzID0gby5jb2xvclxuXG5cdFx0XHRpZiAoIWNvbG9ycykgY29sb3JzID0gJ3RyYW5zcGFyZW50J1xuXG5cdFx0XHRsZXQgY29sb3JEYXRhID0gbmV3IFVpbnQ4QXJyYXkoY291bnQgKiA0ICsgNClcblxuXHRcdFx0Ly8gY29udmVydCBjb2xvcnMgdG8gdHlwZWQgYXJyYXlzXG5cdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkoY29sb3JzKSB8fCB0eXBlb2YgY29sb3JzWzBdID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRsZXQgYyA9IHJnYmEoY29sb3JzLCAndWludDgnKVxuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQgKyAxOyBpKyspIHtcblx0XHRcdFx0XHRjb2xvckRhdGEuc2V0KGMsIGkgKiA0KVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblx0XHRcdFx0XHRsZXQgYyA9IHJnYmEoY29sb3JzW2ldLCAndWludDgnKVxuXHRcdFx0XHRcdGNvbG9yRGF0YS5zZXQoYywgaSAqIDQpXG5cdFx0XHRcdH1cblx0XHRcdFx0Y29sb3JEYXRhLnNldChyZ2JhKGNvbG9yc1swXSwgJ3VpbnQ4JyksIGNvdW50ICogNClcblx0XHRcdH1cblxuXHRcdFx0c3RhdGUuY29sb3JCdWZmZXIoe1xuXHRcdFx0XHR1c2FnZTogJ2R5bmFtaWMnLFxuXHRcdFx0XHR0eXBlOiAndWludDgnLFxuXHRcdFx0XHRkYXRhOiBjb2xvckRhdGFcblx0XHRcdH0pXG5cdFx0fVxuXHR9KVxuXG5cdC8vIHJlbW92ZSB1bm1lbnRpb25lZCBwYXNzZXNcblx0aWYgKG9wdGlvbnMubGVuZ3RoIDwgdGhpcy5wYXNzZXMubGVuZ3RoKSB7XG5cdFx0Zm9yIChsZXQgaSA9IG9wdGlvbnMubGVuZ3RoOyBpIDwgdGhpcy5wYXNzZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBwYXNzID0gdGhpcy5wYXNzZXNbaV1cblx0XHRcdGlmICghcGFzcykgY29udGludWVcblx0XHRcdHBhc3MuY29sb3JCdWZmZXIuZGVzdHJveSgpXG5cdFx0XHRwYXNzLnBvc2l0aW9uQnVmZmVyLmRlc3Ryb3koKVxuXHRcdFx0cGFzcy5kYXNoVGV4dHVyZS5kZXN0cm95KClcblx0XHR9XG5cdFx0dGhpcy5wYXNzZXMubGVuZ3RoID0gb3B0aW9ucy5sZW5ndGhcblx0fVxuXG5cdC8vIHJlbW92ZSBudWxsIGl0ZW1zXG5cdGxldCBwYXNzZXMgPSBbXVxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFzc2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKHRoaXMucGFzc2VzW2ldICE9PSBudWxsKSBwYXNzZXMucHVzaCh0aGlzLnBhc3Nlc1tpXSlcblx0fVxuXHR0aGlzLnBhc3NlcyA9IHBhc3Nlc1xuXG5cdHJldHVybiB0aGlzXG59XG5cbkxpbmUyRC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5wYXNzZXMuZm9yRWFjaChwYXNzID0+IHtcblx0XHRwYXNzLmNvbG9yQnVmZmVyLmRlc3Ryb3koKVxuXHRcdHBhc3MucG9zaXRpb25CdWZmZXIuZGVzdHJveSgpXG5cdFx0cGFzcy5kYXNoVGV4dHVyZS5kZXN0cm95KClcblx0fSlcblxuXHR0aGlzLnBhc3Nlcy5sZW5ndGggPSAwXG5cblx0cmV0dXJuIHRoaXNcbn1cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTtcbn1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG4pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcblxuICByZXR1cm4gYXJyMjtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxudmFyIHJnYmEgPSByZXF1aXJlKCdjb2xvci1ub3JtYWxpemUnKTtcblxudmFyIGdldEJvdW5kcyA9IHJlcXVpcmUoJ2FycmF5LWJvdW5kcycpO1xuXG52YXIgY29sb3JJZCA9IHJlcXVpcmUoJ2NvbG9yLWlkJyk7XG5cbnZhciBjbHVzdGVyID0gcmVxdWlyZSgncG9pbnQtY2x1c3RlcicpO1xuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgZ2xzbGlmeSA9IHJlcXVpcmUoJ2dsc2xpZnknKTtcblxudmFyIHBpY2sgPSByZXF1aXJlKCdwaWNrLWJ5LWFsaWFzJyk7XG5cbnZhciB1cGRhdGVEaWZmID0gcmVxdWlyZSgndXBkYXRlLWRpZmYnKTtcblxudmFyIGZsYXR0ZW4gPSByZXF1aXJlKCdmbGF0dGVuLXZlcnRleC1kYXRhJyk7XG5cbnZhciBpZSA9IHJlcXVpcmUoJ2lzLWlleHBsb3JlcicpO1xuXG52YXIgZjMyID0gcmVxdWlyZSgndG8tZmxvYXQzMicpO1xuXG52YXIgcGFyc2VSZWN0ID0gcmVxdWlyZSgncGFyc2UtcmVjdCcpO1xuXG52YXIgc2NhdHRlciA9IFNjYXR0ZXI7XG5cbmZ1bmN0aW9uIFNjYXR0ZXIocmVnbCwgb3B0aW9ucykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTY2F0dGVyKSkgcmV0dXJuIG5ldyBTY2F0dGVyKHJlZ2wsIG9wdGlvbnMpO1xuXG4gIGlmICh0eXBlb2YgcmVnbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICAgIG9wdGlvbnMucmVnbCA9IHJlZ2w7XG4gIH0gZWxzZSB7XG4gICAgb3B0aW9ucyA9IHJlZ2w7XG4gICAgcmVnbCA9IG51bGw7XG4gIH1cblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCkgb3B0aW9ucy5wb3NpdGlvbnMgPSBvcHRpb25zO1xuICByZWdsID0gb3B0aW9ucy5yZWdsOyAvLyBwZXJzaXN0ZW50IHZhcmlhYmxlc1xuXG4gIHZhciBnbCA9IHJlZ2wuX2dsLFxuICAgICAgcGFsZXR0ZVRleHR1cmUsXG4gICAgICBwYWxldHRlID0gW10sXG4gICAgICBwYWxldHRlSWRzID0ge30sXG4gICAgICAvLyBzdGF0ZVxuICBncm91cHMgPSBbXSxcbiAgICAgIC8vIHRleHR1cmVzIGZvciBtYXJrZXIga2V5c1xuICBtYXJrZXJUZXh0dXJlcyA9IFtudWxsXSxcbiAgICAgIG1hcmtlckNhY2hlID0gW251bGxdO1xuICB2YXIgbWF4Q29sb3JzID0gMjU1LFxuICAgICAgbWF4U2l6ZSA9IDEwMDsgLy8gZGlyZWN0IGNvbG9yIGJ1ZmZlciBtb2RlXG4gIC8vIElFIGRvZXMgbm90IHN1cHBvcnQgcGFsZXR0ZSBhbnl3YXlzXG5cbiAgdGhpcy50b29NYW55Q29sb3JzID0gaWU7IC8vIHRleHR1cmUgd2l0aCBjb2xvciBwYWxldHRlXG5cbiAgcGFsZXR0ZVRleHR1cmUgPSByZWdsLnRleHR1cmUoe1xuICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KG1heENvbG9ycyAqIDQpLFxuICAgIHdpZHRoOiBtYXhDb2xvcnMsXG4gICAgaGVpZ2h0OiAxLFxuICAgIHR5cGU6ICd1aW50OCcsXG4gICAgZm9ybWF0OiAncmdiYScsXG4gICAgd3JhcFM6ICdjbGFtcCcsXG4gICAgd3JhcFQ6ICdjbGFtcCcsXG4gICAgbWFnOiAnbmVhcmVzdCcsXG4gICAgbWluOiAnbmVhcmVzdCdcbiAgfSk7XG4gIGV4dGVuZCh0aGlzLCB7XG4gICAgcmVnbDogcmVnbCxcbiAgICBnbDogZ2wsXG4gICAgZ3JvdXBzOiBncm91cHMsXG4gICAgbWFya2VyQ2FjaGU6IG1hcmtlckNhY2hlLFxuICAgIG1hcmtlclRleHR1cmVzOiBtYXJrZXJUZXh0dXJlcyxcbiAgICBwYWxldHRlOiBwYWxldHRlLFxuICAgIHBhbGV0dGVJZHM6IHBhbGV0dGVJZHMsXG4gICAgcGFsZXR0ZVRleHR1cmU6IHBhbGV0dGVUZXh0dXJlLFxuICAgIG1heENvbG9yczogbWF4Q29sb3JzLFxuICAgIG1heFNpemU6IG1heFNpemUsXG4gICAgY2FudmFzOiBnbC5jYW52YXNcbiAgfSk7XG4gIHRoaXMudXBkYXRlKG9wdGlvbnMpOyAvLyBjb21tb24gc2hhZGVyIG9wdGlvbnNcblxuICB2YXIgc2hhZGVyT3B0aW9ucyA9IHtcbiAgICB1bmlmb3Jtczoge1xuICAgICAgcGl4ZWxSYXRpbzogcmVnbC5jb250ZXh0KCdwaXhlbFJhdGlvJyksXG4gICAgICBwYWxldHRlOiBwYWxldHRlVGV4dHVyZSxcbiAgICAgIHBhbGV0dGVTaXplOiBmdW5jdGlvbiBwYWxldHRlU2l6ZShjdHgsIHByb3ApIHtcbiAgICAgICAgcmV0dXJuIFtfdGhpcy50b29NYW55Q29sb3JzID8gMCA6IG1heENvbG9ycywgcGFsZXR0ZVRleHR1cmUuaGVpZ2h0XTtcbiAgICAgIH0sXG4gICAgICBzY2FsZTogcmVnbC5wcm9wKCdzY2FsZScpLFxuICAgICAgc2NhbGVGcmFjdDogcmVnbC5wcm9wKCdzY2FsZUZyYWN0JyksXG4gICAgICB0cmFuc2xhdGU6IHJlZ2wucHJvcCgndHJhbnNsYXRlJyksXG4gICAgICB0cmFuc2xhdGVGcmFjdDogcmVnbC5wcm9wKCd0cmFuc2xhdGVGcmFjdCcpLFxuICAgICAgb3BhY2l0eTogcmVnbC5wcm9wKCdvcGFjaXR5JyksXG4gICAgICBtYXJrZXI6IHJlZ2wucHJvcCgnbWFya2VyVGV4dHVyZScpXG4gICAgfSxcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAvLyBGSVhNRTogb3B0aW1pemUgdGhlc2UgcGFydHNcbiAgICAgIHg6IGZ1bmN0aW9uIHgoY3R4LCBwcm9wKSB7XG4gICAgICAgIHJldHVybiBwcm9wLnhBdHRyIHx8IHtcbiAgICAgICAgICBidWZmZXI6IHByb3AucG9zaXRpb25CdWZmZXIsXG4gICAgICAgICAgc3RyaWRlOiA4LFxuICAgICAgICAgIG9mZnNldDogMFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHk6IGZ1bmN0aW9uIHkoY3R4LCBwcm9wKSB7XG4gICAgICAgIHJldHVybiBwcm9wLnlBdHRyIHx8IHtcbiAgICAgICAgICBidWZmZXI6IHByb3AucG9zaXRpb25CdWZmZXIsXG4gICAgICAgICAgc3RyaWRlOiA4LFxuICAgICAgICAgIG9mZnNldDogNFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHhGcmFjdDogZnVuY3Rpb24geEZyYWN0KGN0eCwgcHJvcCkge1xuICAgICAgICByZXR1cm4gcHJvcC54QXR0ciA/IHtcbiAgICAgICAgICBjb25zdGFudDogWzAsIDBdXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgYnVmZmVyOiBwcm9wLnBvc2l0aW9uRnJhY3RCdWZmZXIsXG4gICAgICAgICAgc3RyaWRlOiA4LFxuICAgICAgICAgIG9mZnNldDogMFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHlGcmFjdDogZnVuY3Rpb24geUZyYWN0KGN0eCwgcHJvcCkge1xuICAgICAgICByZXR1cm4gcHJvcC55QXR0ciA/IHtcbiAgICAgICAgICBjb25zdGFudDogWzAsIDBdXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgYnVmZmVyOiBwcm9wLnBvc2l0aW9uRnJhY3RCdWZmZXIsXG4gICAgICAgICAgc3RyaWRlOiA4LFxuICAgICAgICAgIG9mZnNldDogNFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHNpemU6IGZ1bmN0aW9uIHNpemUoY3R4LCBwcm9wKSB7XG4gICAgICAgIHJldHVybiBwcm9wLnNpemUubGVuZ3RoID8ge1xuICAgICAgICAgIGJ1ZmZlcjogcHJvcC5zaXplQnVmZmVyLFxuICAgICAgICAgIHN0cmlkZTogMixcbiAgICAgICAgICBvZmZzZXQ6IDBcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICBjb25zdGFudDogW01hdGgucm91bmQocHJvcC5zaXplICogMjU1IC8gX3RoaXMubWF4U2l6ZSldXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgYm9yZGVyU2l6ZTogZnVuY3Rpb24gYm9yZGVyU2l6ZShjdHgsIHByb3ApIHtcbiAgICAgICAgcmV0dXJuIHByb3AuYm9yZGVyU2l6ZS5sZW5ndGggPyB7XG4gICAgICAgICAgYnVmZmVyOiBwcm9wLnNpemVCdWZmZXIsXG4gICAgICAgICAgc3RyaWRlOiAyLFxuICAgICAgICAgIG9mZnNldDogMVxuICAgICAgICB9IDoge1xuICAgICAgICAgIGNvbnN0YW50OiBbTWF0aC5yb3VuZChwcm9wLmJvcmRlclNpemUgKiAyNTUgLyBfdGhpcy5tYXhTaXplKV1cbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBjb2xvcklkOiBmdW5jdGlvbiBjb2xvcklkKGN0eCwgcHJvcCkge1xuICAgICAgICByZXR1cm4gcHJvcC5jb2xvci5sZW5ndGggPyB7XG4gICAgICAgICAgYnVmZmVyOiBwcm9wLmNvbG9yQnVmZmVyLFxuICAgICAgICAgIHN0cmlkZTogX3RoaXMudG9vTWFueUNvbG9ycyA/IDggOiA0LFxuICAgICAgICAgIG9mZnNldDogMFxuICAgICAgICB9IDoge1xuICAgICAgICAgIGNvbnN0YW50OiBfdGhpcy50b29NYW55Q29sb3JzID8gcGFsZXR0ZS5zbGljZShwcm9wLmNvbG9yICogNCwgcHJvcC5jb2xvciAqIDQgKyA0KSA6IFtwcm9wLmNvbG9yXVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGJvcmRlckNvbG9ySWQ6IGZ1bmN0aW9uIGJvcmRlckNvbG9ySWQoY3R4LCBwcm9wKSB7XG4gICAgICAgIHJldHVybiBwcm9wLmJvcmRlckNvbG9yLmxlbmd0aCA/IHtcbiAgICAgICAgICBidWZmZXI6IHByb3AuY29sb3JCdWZmZXIsXG4gICAgICAgICAgc3RyaWRlOiBfdGhpcy50b29NYW55Q29sb3JzID8gOCA6IDQsXG4gICAgICAgICAgb2Zmc2V0OiBfdGhpcy50b29NYW55Q29sb3JzID8gNCA6IDJcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICBjb25zdGFudDogX3RoaXMudG9vTWFueUNvbG9ycyA/IHBhbGV0dGUuc2xpY2UocHJvcC5ib3JkZXJDb2xvciAqIDQsIHByb3AuYm9yZGVyQ29sb3IgKiA0ICsgNCkgOiBbcHJvcC5ib3JkZXJDb2xvcl1cbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUoY3R4LCBwcm9wKSB7XG4gICAgICAgIHJldHVybiBwcm9wLmFjdGl2YXRpb24gPT09IHRydWUgPyB7XG4gICAgICAgICAgY29uc3RhbnQ6IFsxXVxuICAgICAgICB9IDogcHJvcC5hY3RpdmF0aW9uID8gcHJvcC5hY3RpdmF0aW9uIDoge1xuICAgICAgICAgIGNvbnN0YW50OiBbMF1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJsZW5kOiB7XG4gICAgICBlbmFibGU6IHRydWUsXG4gICAgICBjb2xvcjogWzAsIDAsIDAsIDFdLFxuICAgICAgLy8gcGhvdG9zaG9wIGJsZW5kaW5nXG4gICAgICBmdW5jOiB7XG4gICAgICAgIHNyY1JHQjogJ3NyYyBhbHBoYScsXG4gICAgICAgIGRzdFJHQjogJ29uZSBtaW51cyBzcmMgYWxwaGEnLFxuICAgICAgICBzcmNBbHBoYTogJ29uZSBtaW51cyBkc3QgYWxwaGEnLFxuICAgICAgICBkc3RBbHBoYTogJ29uZSdcbiAgICAgIH1cbiAgICB9LFxuICAgIHNjaXNzb3I6IHtcbiAgICAgIGVuYWJsZTogdHJ1ZSxcbiAgICAgIGJveDogcmVnbC5wcm9wKCd2aWV3cG9ydCcpXG4gICAgfSxcbiAgICB2aWV3cG9ydDogcmVnbC5wcm9wKCd2aWV3cG9ydCcpLFxuICAgIHN0ZW5jaWw6IHtcbiAgICAgIGVuYWJsZTogZmFsc2VcbiAgICB9LFxuICAgIGRlcHRoOiB7XG4gICAgICBlbmFibGU6IGZhbHNlXG4gICAgfSxcbiAgICBlbGVtZW50czogcmVnbC5wcm9wKCdlbGVtZW50cycpLFxuICAgIGNvdW50OiByZWdsLnByb3AoJ2NvdW50JyksXG4gICAgb2Zmc2V0OiByZWdsLnByb3AoJ29mZnNldCcpLFxuICAgIHByaW1pdGl2ZTogJ3BvaW50cydcbiAgfTsgLy8gZHJhdyBzZGYtbWFya2VyXG5cbiAgdmFyIG1hcmtlck9wdGlvbnMgPSBleHRlbmQoe30sIHNoYWRlck9wdGlvbnMpO1xuICBtYXJrZXJPcHRpb25zLmZyYWcgPSBnbHNsaWZ5KFtcInByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG4jZGVmaW5lIEdMU0xJRlkgMVxcblxcbnZhcnlpbmcgdmVjNCBmcmFnQ29sb3IsIGZyYWdCb3JkZXJDb2xvcjtcXG52YXJ5aW5nIGZsb2F0IGZyYWdXaWR0aCwgZnJhZ0JvcmRlckNvbG9yTGV2ZWwsIGZyYWdDb2xvckxldmVsO1xcblxcbnVuaWZvcm0gc2FtcGxlcjJEIG1hcmtlcjtcXG51bmlmb3JtIGZsb2F0IHBpeGVsUmF0aW8sIG9wYWNpdHk7XFxuXFxuZmxvYXQgc21vb3RoU3RlcChmbG9hdCB4LCBmbG9hdCB5KSB7XFxuICByZXR1cm4gMS4wIC8gKDEuMCArIGV4cCg1MC4wKih4IC0geSkpKTtcXG59XFxuXFxudm9pZCBtYWluKCkge1xcbiAgZmxvYXQgZGlzdCA9IHRleHR1cmUyRChtYXJrZXIsIGdsX1BvaW50Q29vcmQpLnIsIGRlbHRhID0gZnJhZ1dpZHRoO1xcblxcbiAgLy8gbWF4LWRpc3RhbmNlIGFscGhhXFxuICBpZiAoZGlzdCA8IDAuMDAzKSBkaXNjYXJkO1xcblxcbiAgLy8gbnVsbC1ib3JkZXIgY2FzZVxcbiAgaWYgKGZyYWdCb3JkZXJDb2xvckxldmVsID09IGZyYWdDb2xvckxldmVsIHx8IGZyYWdCb3JkZXJDb2xvci5hID09IDAuKSB7XFxuICAgIGZsb2F0IGNvbG9yQW10ID0gc21vb3Roc3RlcCguNSAtIGRlbHRhLCAuNSArIGRlbHRhLCBkaXN0KTtcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChmcmFnQ29sb3IucmdiLCBjb2xvckFtdCAqIGZyYWdDb2xvci5hICogb3BhY2l0eSk7XFxuICB9XFxuICBlbHNlIHtcXG4gICAgZmxvYXQgYm9yZGVyQ29sb3JBbXQgPSBzbW9vdGhzdGVwKGZyYWdCb3JkZXJDb2xvckxldmVsIC0gZGVsdGEsIGZyYWdCb3JkZXJDb2xvckxldmVsICsgZGVsdGEsIGRpc3QpO1xcbiAgICBmbG9hdCBjb2xvckFtdCA9IHNtb290aHN0ZXAoZnJhZ0NvbG9yTGV2ZWwgLSBkZWx0YSwgZnJhZ0NvbG9yTGV2ZWwgKyBkZWx0YSwgZGlzdCk7XFxuXFxuICAgIHZlYzQgY29sb3IgPSBmcmFnQm9yZGVyQ29sb3I7XFxuICAgIGNvbG9yLmEgKj0gYm9yZGVyQ29sb3JBbXQ7XFxuICAgIGNvbG9yID0gbWl4KGNvbG9yLCBmcmFnQ29sb3IsIGNvbG9yQW10KTtcXG4gICAgY29sb3IuYSAqPSBvcGFjaXR5O1xcblxcbiAgICBnbF9GcmFnQ29sb3IgPSBjb2xvcjtcXG4gIH1cXG5cXG59XFxuXCJdKTtcbiAgbWFya2VyT3B0aW9ucy52ZXJ0ID0gZ2xzbGlmeShbXCJwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5hdHRyaWJ1dGUgZmxvYXQgeCwgeSwgeEZyYWN0LCB5RnJhY3Q7XFxuYXR0cmlidXRlIGZsb2F0IHNpemUsIGJvcmRlclNpemU7XFxuYXR0cmlidXRlIHZlYzQgY29sb3JJZCwgYm9yZGVyQ29sb3JJZDtcXG5hdHRyaWJ1dGUgZmxvYXQgaXNBY3RpdmU7XFxuXFxudW5pZm9ybSB2ZWMyIHNjYWxlLCBzY2FsZUZyYWN0LCB0cmFuc2xhdGUsIHRyYW5zbGF0ZUZyYWN0LCBwYWxldHRlU2l6ZTtcXG51bmlmb3JtIGZsb2F0IHBpeGVsUmF0aW87XFxudW5pZm9ybSBzYW1wbGVyMkQgcGFsZXR0ZTtcXG5cXG5jb25zdCBmbG9hdCBtYXhTaXplID0gMTAwLjtcXG5jb25zdCBmbG9hdCBib3JkZXJMZXZlbCA9IC41O1xcblxcbnZhcnlpbmcgdmVjNCBmcmFnQ29sb3IsIGZyYWdCb3JkZXJDb2xvcjtcXG52YXJ5aW5nIGZsb2F0IGZyYWdQb2ludFNpemUsIGZyYWdCb3JkZXJSYWRpdXMsIGZyYWdXaWR0aCwgZnJhZ0JvcmRlckNvbG9yTGV2ZWwsIGZyYWdDb2xvckxldmVsO1xcblxcbmJvb2wgaXNEaXJlY3QgPSAocGFsZXR0ZVNpemUueCA8IDEuKTtcXG5cXG52ZWM0IGdldENvbG9yKHZlYzQgaWQpIHtcXG4gIHJldHVybiBpc0RpcmVjdCA/IGlkIC8gMjU1LiA6IHRleHR1cmUyRChwYWxldHRlLFxcbiAgICB2ZWMyKFxcbiAgICAgIChpZC54ICsgLjUpIC8gcGFsZXR0ZVNpemUueCxcXG4gICAgICAoaWQueSArIC41KSAvIHBhbGV0dGVTaXplLnlcXG4gICAgKVxcbiAgKTtcXG59XFxuXFxudm9pZCBtYWluKCkge1xcbiAgaWYgKGlzQWN0aXZlID09IDAuKSByZXR1cm47XFxuXFxuICB2ZWMyIHBvc2l0aW9uID0gdmVjMih4LCB5KTtcXG4gIHZlYzIgcG9zaXRpb25GcmFjdCA9IHZlYzIoeEZyYWN0LCB5RnJhY3QpO1xcblxcbiAgdmVjNCBjb2xvciA9IGdldENvbG9yKGNvbG9ySWQpO1xcbiAgdmVjNCBib3JkZXJDb2xvciA9IGdldENvbG9yKGJvcmRlckNvbG9ySWQpO1xcblxcbiAgZmxvYXQgc2l6ZSA9IHNpemUgKiBtYXhTaXplIC8gMjU1LjtcXG4gIGZsb2F0IGJvcmRlclNpemUgPSBib3JkZXJTaXplICogbWF4U2l6ZSAvIDI1NS47XFxuXFxuICBnbF9Qb2ludFNpemUgPSAyLiAqIHNpemUgKiBwaXhlbFJhdGlvO1xcbiAgZnJhZ1BvaW50U2l6ZSA9IHNpemUgKiBwaXhlbFJhdGlvO1xcblxcbiAgdmVjMiBwb3MgPSAocG9zaXRpb24gKyB0cmFuc2xhdGUpICogc2NhbGVcXG4gICAgICArIChwb3NpdGlvbkZyYWN0ICsgdHJhbnNsYXRlRnJhY3QpICogc2NhbGVcXG4gICAgICArIChwb3NpdGlvbiArIHRyYW5zbGF0ZSkgKiBzY2FsZUZyYWN0XFxuICAgICAgKyAocG9zaXRpb25GcmFjdCArIHRyYW5zbGF0ZUZyYWN0KSAqIHNjYWxlRnJhY3Q7XFxuXFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zICogMi4gLSAxLiwgMCwgMSk7XFxuXFxuICBmcmFnQ29sb3IgPSBjb2xvcjtcXG4gIGZyYWdCb3JkZXJDb2xvciA9IGJvcmRlckNvbG9yO1xcbiAgZnJhZ1dpZHRoID0gMS4gLyBnbF9Qb2ludFNpemU7XFxuXFxuICBmcmFnQm9yZGVyQ29sb3JMZXZlbCA9IGNsYW1wKGJvcmRlckxldmVsIC0gYm9yZGVyTGV2ZWwgKiBib3JkZXJTaXplIC8gc2l6ZSwgMC4sIDEuKTtcXG4gIGZyYWdDb2xvckxldmVsID0gY2xhbXAoYm9yZGVyTGV2ZWwgKyAoMS4gLSBib3JkZXJMZXZlbCkgKiBib3JkZXJTaXplIC8gc2l6ZSwgMC4sIDEuKTtcXG59XCJdKTtcbiAgdGhpcy5kcmF3TWFya2VyID0gcmVnbChtYXJrZXJPcHRpb25zKTsgLy8gZHJhdyBjaXJjbGVcblxuICB2YXIgY2lyY2xlT3B0aW9ucyA9IGV4dGVuZCh7fSwgc2hhZGVyT3B0aW9ucyk7XG4gIGNpcmNsZU9wdGlvbnMuZnJhZyA9IGdsc2xpZnkoW1wicHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcbiNkZWZpbmUgR0xTTElGWSAxXFxuXFxudmFyeWluZyB2ZWM0IGZyYWdDb2xvciwgZnJhZ0JvcmRlckNvbG9yO1xcblxcbnVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcXG52YXJ5aW5nIGZsb2F0IGZyYWdCb3JkZXJSYWRpdXMsIGZyYWdXaWR0aDtcXG5cXG5mbG9hdCBzbW9vdGhTdGVwKGZsb2F0IGVkZ2UwLCBmbG9hdCBlZGdlMSwgZmxvYXQgeCkge1xcblxcdGZsb2F0IHQ7XFxuXFx0dCA9IGNsYW1wKCh4IC0gZWRnZTApIC8gKGVkZ2UxIC0gZWRnZTApLCAwLjAsIDEuMCk7XFxuXFx0cmV0dXJuIHQgKiB0ICogKDMuMCAtIDIuMCAqIHQpO1xcbn1cXG5cXG52b2lkIG1haW4oKSB7XFxuXFx0ZmxvYXQgcmFkaXVzLCBhbHBoYSA9IDEuMCwgZGVsdGEgPSBmcmFnV2lkdGg7XFxuXFxuXFx0cmFkaXVzID0gbGVuZ3RoKDIuMCAqIGdsX1BvaW50Q29vcmQueHkgLSAxLjApO1xcblxcblxcdGlmIChyYWRpdXMgPiAxLjAgKyBkZWx0YSkge1xcblxcdFxcdGRpc2NhcmQ7XFxuXFx0fVxcblxcblxcdGFscGhhIC09IHNtb290aHN0ZXAoMS4wIC0gZGVsdGEsIDEuMCArIGRlbHRhLCByYWRpdXMpO1xcblxcblxcdGZsb2F0IGJvcmRlclJhZGl1cyA9IGZyYWdCb3JkZXJSYWRpdXM7XFxuXFx0ZmxvYXQgcmF0aW8gPSBzbW9vdGhzdGVwKGJvcmRlclJhZGl1cyAtIGRlbHRhLCBib3JkZXJSYWRpdXMgKyBkZWx0YSwgcmFkaXVzKTtcXG5cXHR2ZWM0IGNvbG9yID0gbWl4KGZyYWdDb2xvciwgZnJhZ0JvcmRlckNvbG9yLCByYXRpbyk7XFxuXFx0Y29sb3IuYSAqPSBhbHBoYSAqIG9wYWNpdHk7XFxuXFx0Z2xfRnJhZ0NvbG9yID0gY29sb3I7XFxufVxcblwiXSk7XG4gIGNpcmNsZU9wdGlvbnMudmVydCA9IGdsc2xpZnkoW1wicHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcbiNkZWZpbmUgR0xTTElGWSAxXFxuXFxuYXR0cmlidXRlIGZsb2F0IHgsIHksIHhGcmFjdCwgeUZyYWN0O1xcbmF0dHJpYnV0ZSBmbG9hdCBzaXplLCBib3JkZXJTaXplO1xcbmF0dHJpYnV0ZSB2ZWM0IGNvbG9ySWQsIGJvcmRlckNvbG9ySWQ7XFxuYXR0cmlidXRlIGZsb2F0IGlzQWN0aXZlO1xcblxcbnVuaWZvcm0gdmVjMiBzY2FsZSwgc2NhbGVGcmFjdCwgdHJhbnNsYXRlLCB0cmFuc2xhdGVGcmFjdDtcXG51bmlmb3JtIGZsb2F0IHBpeGVsUmF0aW87XFxudW5pZm9ybSBzYW1wbGVyMkQgcGFsZXR0ZTtcXG51bmlmb3JtIHZlYzIgcGFsZXR0ZVNpemU7XFxuXFxuY29uc3QgZmxvYXQgbWF4U2l6ZSA9IDEwMC47XFxuXFxudmFyeWluZyB2ZWM0IGZyYWdDb2xvciwgZnJhZ0JvcmRlckNvbG9yO1xcbnZhcnlpbmcgZmxvYXQgZnJhZ0JvcmRlclJhZGl1cywgZnJhZ1dpZHRoO1xcblxcbmJvb2wgaXNEaXJlY3QgPSAocGFsZXR0ZVNpemUueCA8IDEuKTtcXG5cXG52ZWM0IGdldENvbG9yKHZlYzQgaWQpIHtcXG4gIHJldHVybiBpc0RpcmVjdCA/IGlkIC8gMjU1LiA6IHRleHR1cmUyRChwYWxldHRlLFxcbiAgICB2ZWMyKFxcbiAgICAgIChpZC54ICsgLjUpIC8gcGFsZXR0ZVNpemUueCxcXG4gICAgICAoaWQueSArIC41KSAvIHBhbGV0dGVTaXplLnlcXG4gICAgKVxcbiAgKTtcXG59XFxuXFxudm9pZCBtYWluKCkge1xcbiAgLy8gaWdub3JlIGluYWN0aXZlIHBvaW50c1xcbiAgaWYgKGlzQWN0aXZlID09IDAuKSByZXR1cm47XFxuXFxuICB2ZWMyIHBvc2l0aW9uID0gdmVjMih4LCB5KTtcXG4gIHZlYzIgcG9zaXRpb25GcmFjdCA9IHZlYzIoeEZyYWN0LCB5RnJhY3QpO1xcblxcbiAgdmVjNCBjb2xvciA9IGdldENvbG9yKGNvbG9ySWQpO1xcbiAgdmVjNCBib3JkZXJDb2xvciA9IGdldENvbG9yKGJvcmRlckNvbG9ySWQpO1xcblxcbiAgZmxvYXQgc2l6ZSA9IHNpemUgKiBtYXhTaXplIC8gMjU1LjtcXG4gIGZsb2F0IGJvcmRlclNpemUgPSBib3JkZXJTaXplICogbWF4U2l6ZSAvIDI1NS47XFxuXFxuICBnbF9Qb2ludFNpemUgPSAoc2l6ZSArIGJvcmRlclNpemUpICogcGl4ZWxSYXRpbztcXG5cXG4gIHZlYzIgcG9zID0gKHBvc2l0aW9uICsgdHJhbnNsYXRlKSAqIHNjYWxlXFxuICAgICAgKyAocG9zaXRpb25GcmFjdCArIHRyYW5zbGF0ZUZyYWN0KSAqIHNjYWxlXFxuICAgICAgKyAocG9zaXRpb24gKyB0cmFuc2xhdGUpICogc2NhbGVGcmFjdFxcbiAgICAgICsgKHBvc2l0aW9uRnJhY3QgKyB0cmFuc2xhdGVGcmFjdCkgKiBzY2FsZUZyYWN0O1xcblxcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvcyAqIDIuIC0gMS4sIDAsIDEpO1xcblxcbiAgZnJhZ0JvcmRlclJhZGl1cyA9IDEuIC0gMi4gKiBib3JkZXJTaXplIC8gKHNpemUgKyBib3JkZXJTaXplKTtcXG4gIGZyYWdDb2xvciA9IGNvbG9yO1xcbiAgZnJhZ0JvcmRlckNvbG9yID0gYm9yZGVyQ29sb3IuYSA9PSAwLiB8fCBib3JkZXJTaXplID09IDAuID8gdmVjNChjb2xvci5yZ2IsIDAuKSA6IGJvcmRlckNvbG9yO1xcbiAgZnJhZ1dpZHRoID0gMS4gLyBnbF9Qb2ludFNpemU7XFxufVxcblwiXSk7IC8vIHBvbHlmaWxsIElFXG5cbiAgaWYgKGllKSB7XG4gICAgY2lyY2xlT3B0aW9ucy5mcmFnID0gY2lyY2xlT3B0aW9ucy5mcmFnLnJlcGxhY2UoJ3Ntb290aHN0ZXAnLCAnc21vb3RoU3RlcCcpO1xuICAgIG1hcmtlck9wdGlvbnMuZnJhZyA9IG1hcmtlck9wdGlvbnMuZnJhZy5yZXBsYWNlKCdzbW9vdGhzdGVwJywgJ3Ntb290aFN0ZXAnKTtcbiAgfVxuXG4gIHRoaXMuZHJhd0NpcmNsZSA9IHJlZ2woY2lyY2xlT3B0aW9ucyk7XG59IC8vIHNpbmdsZSBwYXNzIGRlZmF1bHRzXG5cblxuU2NhdHRlci5kZWZhdWx0cyA9IHtcbiAgY29sb3I6ICdibGFjaycsXG4gIGJvcmRlckNvbG9yOiAndHJhbnNwYXJlbnQnLFxuICBib3JkZXJTaXplOiAwLFxuICBzaXplOiAxMixcbiAgb3BhY2l0eTogMSxcbiAgbWFya2VyOiB1bmRlZmluZWQsXG4gIHZpZXdwb3J0OiBudWxsLFxuICByYW5nZTogbnVsbCxcbiAgcGl4ZWxTaXplOiBudWxsLFxuICBjb3VudDogMCxcbiAgb2Zmc2V0OiAwLFxuICBib3VuZHM6IG51bGwsXG4gIHBvc2l0aW9uczogW10sXG4gIHNuYXA6IDFlNFxufTsgLy8gdXBkYXRlICYgcmVkcmF3XG5cblNjYXR0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICB0aGlzLnVwZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgdGhpcy5kcmF3KCk7XG4gIHJldHVybiB0aGlzO1xufTsgLy8gZHJhdyBhbGwgZ3JvdXBzIG9yIG9ubHkgaW5kaWNhdGVkIG9uZXNcblxuXG5TY2F0dGVyLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3RoaXMyID0gdGhpcztcblxuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgdmFyIGdyb3VwcyA9IHRoaXMuZ3JvdXBzOyAvLyBpZiBkaXJlY3RseSBhcnJheSBwYXNzZWQgLSB0cmVhdCBhcyBwYXNzZXNcblxuICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShhcmdzWzBdKSAmJiAoYXJnc1swXVswXSA9PT0gbnVsbCB8fCBBcnJheS5pc0FycmF5KGFyZ3NbMF1bMF0pKSkge1xuICAgIGFyZ3MgPSBhcmdzWzBdO1xuICB9IC8vIEZJWE1FOiByZW1vdmUgb25jZSBodHRwczovL2dpdGh1Yi5jb20vcmVnbC1wcm9qZWN0L3JlZ2wvaXNzdWVzLzQ3NCByZXNvbHZlZFxuXG5cbiAgdGhpcy5yZWdsLl9yZWZyZXNoKCk7XG5cbiAgaWYgKGFyZ3MubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmRyYXdJdGVtKGksIGFyZ3NbaV0pO1xuICAgIH1cbiAgfSAvLyBkcmF3IGFsbCBwYXNzZXNcbiAgZWxzZSB7XG4gICAgICBncm91cHMuZm9yRWFjaChmdW5jdGlvbiAoZ3JvdXAsIGkpIHtcbiAgICAgICAgX3RoaXMyLmRyYXdJdGVtKGkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIHJldHVybiB0aGlzO1xufTsgLy8gZHJhdyBzcGVjaWZpYyBzY2F0dGVyIGdyb3VwXG5cblxuU2NhdHRlci5wcm90b3R5cGUuZHJhd0l0ZW0gPSBmdW5jdGlvbiAoaWQsIGVscykge1xuICB2YXIgZ3JvdXBzID0gdGhpcy5ncm91cHM7XG4gIHZhciBncm91cCA9IGdyb3Vwc1tpZF07IC8vIGRlYnVnIHZpZXdwb3J0XG4gIC8vIGxldCB7IHZpZXdwb3J0IH0gPSBncm91cFxuICAvLyBnbC5lbmFibGUoZ2wuU0NJU1NPUl9URVNUKTtcbiAgLy8gZ2wuc2Npc3Nvcih2aWV3cG9ydC54LCB2aWV3cG9ydC55LCB2aWV3cG9ydC53aWR0aCwgdmlld3BvcnQuaGVpZ2h0KTtcbiAgLy8gZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAuNSk7XG4gIC8vIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xuXG4gIGlmICh0eXBlb2YgZWxzID09PSAnbnVtYmVyJykge1xuICAgIGlkID0gZWxzO1xuICAgIGdyb3VwID0gZ3JvdXBzW2Vsc107XG4gICAgZWxzID0gbnVsbDtcbiAgfVxuXG4gIGlmICghKGdyb3VwICYmIGdyb3VwLmNvdW50ICYmIGdyb3VwLm9wYWNpdHkpKSByZXR1cm47IC8vIGRyYXcgY2lyY2xlc1xuXG4gIGlmIChncm91cC5hY3RpdmF0aW9uWzBdKSB7XG4gICAgLy8gVE9ETzogb3B0aW1pemUgdGhpcyBwZXJmb3JtYW5jZSBieSBtYWtpbmcgZ3JvdXBzIGFuZCByZWdsLnRoaXMgcHJvcHNcbiAgICB0aGlzLmRyYXdDaXJjbGUodGhpcy5nZXRNYXJrZXJEcmF3T3B0aW9ucygwLCBncm91cCwgZWxzKSk7XG4gIH0gLy8gZHJhdyBhbGwgb3RoZXIgYXZhaWxhYmxlIG1hcmtlcnNcblxuXG4gIHZhciBiYXRjaCA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgZ3JvdXAuYWN0aXZhdGlvbi5sZW5ndGg7IGkrKykge1xuICAgIGlmICghZ3JvdXAuYWN0aXZhdGlvbltpXSB8fCBncm91cC5hY3RpdmF0aW9uW2ldICE9PSB0cnVlICYmICFncm91cC5hY3RpdmF0aW9uW2ldLmRhdGEubGVuZ3RoKSBjb250aW51ZTtcbiAgICBiYXRjaC5wdXNoLmFwcGx5KGJhdGNoLCBfdG9Db25zdW1hYmxlQXJyYXkodGhpcy5nZXRNYXJrZXJEcmF3T3B0aW9ucyhpLCBncm91cCwgZWxzKSkpO1xuICB9XG5cbiAgaWYgKGJhdGNoLmxlbmd0aCkge1xuICAgIHRoaXMuZHJhd01hcmtlcihiYXRjaCk7XG4gIH1cbn07IC8vIGdldCBvcHRpb25zIGZvciB0aGUgbWFya2VyIGlkc1xuXG5cblNjYXR0ZXIucHJvdG90eXBlLmdldE1hcmtlckRyYXdPcHRpb25zID0gZnVuY3Rpb24gKG1hcmtlcklkLCBncm91cCwgZWxlbWVudHMpIHtcbiAgdmFyIHJhbmdlID0gZ3JvdXAucmFuZ2UsXG4gICAgICB0cmVlID0gZ3JvdXAudHJlZSxcbiAgICAgIHZpZXdwb3J0ID0gZ3JvdXAudmlld3BvcnQsXG4gICAgICBhY3RpdmF0aW9uID0gZ3JvdXAuYWN0aXZhdGlvbixcbiAgICAgIHNlbGVjdGlvbkJ1ZmZlciA9IGdyb3VwLnNlbGVjdGlvbkJ1ZmZlcixcbiAgICAgIGNvdW50ID0gZ3JvdXAuY291bnQ7XG4gIHZhciByZWdsID0gdGhpcy5yZWdsOyAvLyBkaXJlY3QgcG9pbnRzXG5cbiAgaWYgKCF0cmVlKSB7XG4gICAgLy8gaWYgZWxlbWVudHMgYXJyYXkgLSBkcmF3IHVuY2x1c3RlcmVkIHBvaW50c1xuICAgIGlmIChlbGVtZW50cykge1xuICAgICAgcmV0dXJuIFtleHRlbmQoe30sIGdyb3VwLCB7XG4gICAgICAgIG1hcmtlclRleHR1cmU6IHRoaXMubWFya2VyVGV4dHVyZXNbbWFya2VySWRdLFxuICAgICAgICBhY3RpdmF0aW9uOiBhY3RpdmF0aW9uW21hcmtlcklkXSxcbiAgICAgICAgY291bnQ6IGVsZW1lbnRzLmxlbmd0aCxcbiAgICAgICAgZWxlbWVudHM6IGVsZW1lbnRzLFxuICAgICAgICBvZmZzZXQ6IDBcbiAgICAgIH0pXTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2V4dGVuZCh7fSwgZ3JvdXAsIHtcbiAgICAgIG1hcmtlclRleHR1cmU6IHRoaXMubWFya2VyVGV4dHVyZXNbbWFya2VySWRdLFxuICAgICAgYWN0aXZhdGlvbjogYWN0aXZhdGlvblttYXJrZXJJZF0sXG4gICAgICBvZmZzZXQ6IDBcbiAgICB9KV07XG4gIH0gLy8gY2x1c3RlcmVkIHBvaW50c1xuXG5cbiAgdmFyIGJhdGNoID0gW107XG4gIHZhciBsb2QgPSB0cmVlLnJhbmdlKHJhbmdlLCB7XG4gICAgbG9kOiB0cnVlLFxuICAgIHB4OiBbKHJhbmdlWzJdIC0gcmFuZ2VbMF0pIC8gdmlld3BvcnQud2lkdGgsIChyYW5nZVszXSAtIHJhbmdlWzFdKSAvIHZpZXdwb3J0LmhlaWdodF1cbiAgfSk7IC8vIGVuYWJsZSBlbGVtZW50cyBieSB1c2luZyBzZWxlY3Rpb24gYnVmZmVyXG5cbiAgaWYgKGVsZW1lbnRzKSB7XG4gICAgdmFyIG1hcmtlckFjdGl2YXRpb24gPSBhY3RpdmF0aW9uW21hcmtlcklkXTtcbiAgICB2YXIgbWFzayA9IG1hcmtlckFjdGl2YXRpb24uZGF0YTtcbiAgICB2YXIgZGF0YSA9IG5ldyBVaW50OEFycmF5KGNvdW50KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZCA9IGVsZW1lbnRzW2ldO1xuICAgICAgZGF0YVtpZF0gPSBtYXNrID8gbWFza1tpZF0gOiAxO1xuICAgIH1cblxuICAgIHNlbGVjdGlvbkJ1ZmZlci5zdWJkYXRhKGRhdGEpO1xuICB9XG5cbiAgZm9yICh2YXIgbCA9IGxvZC5sZW5ndGg7IGwtLTspIHtcbiAgICB2YXIgX2xvZCRsID0gX3NsaWNlZFRvQXJyYXkobG9kW2xdLCAyKSxcbiAgICAgICAgZnJvbSA9IF9sb2QkbFswXSxcbiAgICAgICAgdG8gPSBfbG9kJGxbMV07XG5cbiAgICBiYXRjaC5wdXNoKGV4dGVuZCh7fSwgZ3JvdXAsIHtcbiAgICAgIG1hcmtlclRleHR1cmU6IHRoaXMubWFya2VyVGV4dHVyZXNbbWFya2VySWRdLFxuICAgICAgYWN0aXZhdGlvbjogZWxlbWVudHMgPyBzZWxlY3Rpb25CdWZmZXIgOiBhY3RpdmF0aW9uW21hcmtlcklkXSxcbiAgICAgIG9mZnNldDogZnJvbSxcbiAgICAgIGNvdW50OiB0byAtIGZyb21cbiAgICB9KSk7XG4gIH1cblxuICByZXR1cm4gYmF0Y2g7XG59OyAvLyB1cGRhdGUgZ3JvdXBzIG9wdGlvbnNcblxuXG5TY2F0dGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgfVxuXG4gIGlmICghYXJncy5sZW5ndGgpIHJldHVybjsgLy8gcGFzc2VzIGFyZSBhcyBzaW5nbGUgYXJyYXlcblxuICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShhcmdzWzBdKSkgYXJncyA9IGFyZ3NbMF07XG4gIHZhciBncm91cHMgPSB0aGlzLmdyb3VwcyxcbiAgICAgIGdsID0gdGhpcy5nbCxcbiAgICAgIHJlZ2wgPSB0aGlzLnJlZ2wsXG4gICAgICBtYXhTaXplID0gdGhpcy5tYXhTaXplLFxuICAgICAgbWF4Q29sb3JzID0gdGhpcy5tYXhDb2xvcnMsXG4gICAgICBwYWxldHRlID0gdGhpcy5wYWxldHRlO1xuICB0aGlzLmdyb3VwcyA9IGdyb3VwcyA9IGFyZ3MubWFwKGZ1bmN0aW9uIChvcHRpb25zLCBpKSB7XG4gICAgdmFyIGdyb3VwID0gZ3JvdXBzW2ldO1xuICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHJldHVybiBncm91cDtcbiAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCkgb3B0aW9ucyA9IHtcbiAgICAgIHBvc2l0aW9uczogbnVsbFxuICAgIH07ZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIG9wdGlvbnMgPSB7XG4gICAgICBvbmRyYXc6IG9wdGlvbnNcbiAgICB9O2Vsc2UgaWYgKHR5cGVvZiBvcHRpb25zWzBdID09PSAnbnVtYmVyJykgb3B0aW9ucyA9IHtcbiAgICAgIHBvc2l0aW9uczogb3B0aW9uc1xuICAgIH07IC8vIGNvcHkgb3B0aW9ucyB0byBhdm9pZCBtdXRhdGlvbiAmIGhhbmRsZSBhbGlhc2VzXG5cbiAgICBvcHRpb25zID0gcGljayhvcHRpb25zLCB7XG4gICAgICBwb3NpdGlvbnM6ICdwb3NpdGlvbnMgZGF0YSBwb2ludHMnLFxuICAgICAgc25hcDogJ3NuYXAgY2x1c3RlciBsb2QgdHJlZScsXG4gICAgICBzaXplOiAnc2l6ZXMgc2l6ZSByYWRpdXMnLFxuICAgICAgYm9yZGVyU2l6ZTogJ2JvcmRlclNpemVzIGJvcmRlclNpemUgYm9yZGVyLXNpemUgYm9yZGVyc2l6ZSBib3JkZXJXaWR0aCBib3JkZXJXaWR0aHMgYm9yZGVyLXdpZHRoIGJvcmRlcndpZHRoIHN0cm9rZS13aWR0aCBzdHJva2VXaWR0aCBzdHJva2V3aWR0aCBvdXRsaW5lJyxcbiAgICAgIGNvbG9yOiAnY29sb3JzIGNvbG9yIGZpbGwgZmlsbC1jb2xvciBmaWxsQ29sb3InLFxuICAgICAgYm9yZGVyQ29sb3I6ICdib3JkZXJDb2xvcnMgYm9yZGVyQ29sb3Igc3Ryb2tlIHN0cm9rZS1jb2xvciBzdHJva2VDb2xvcicsXG4gICAgICBtYXJrZXI6ICdtYXJrZXJzIG1hcmtlciBzaGFwZScsXG4gICAgICByYW5nZTogJ3JhbmdlIGRhdGFCb3ggZGF0YWJveCcsXG4gICAgICB2aWV3cG9ydDogJ3ZpZXdwb3J0IHZpZXdQb3J0IHZpZXdCb3ggdmlld2JveCcsXG4gICAgICBvcGFjaXR5OiAnb3BhY2l0eSBhbHBoYSB0cmFuc3BhcmVuY3knLFxuICAgICAgYm91bmRzOiAnYm91bmQgYm91bmRzIGJvdW5kYXJpZXMgbGltaXRzJyxcbiAgICAgIHRvb01hbnlDb2xvcnM6ICd0b29NYW55Q29sb3JzIHBhbGV0dGUgcGFsZXR0ZU1vZGUgb3B0aW1pemVQYWxldHRlIGVuYWJsZVBhbGV0dGUnXG4gICAgfSk7XG4gICAgaWYgKG9wdGlvbnMucG9zaXRpb25zID09PSBudWxsKSBvcHRpb25zLnBvc2l0aW9ucyA9IFtdO1xuICAgIGlmIChvcHRpb25zLnRvb01hbnlDb2xvcnMgIT0gbnVsbCkgX3RoaXMzLnRvb01hbnlDb2xvcnMgPSBvcHRpb25zLnRvb01hbnlDb2xvcnM7XG5cbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICBncm91cHNbaV0gPSBncm91cCA9IHtcbiAgICAgICAgaWQ6IGksXG4gICAgICAgIHNjYWxlOiBudWxsLFxuICAgICAgICB0cmFuc2xhdGU6IG51bGwsXG4gICAgICAgIHNjYWxlRnJhY3Q6IG51bGwsXG4gICAgICAgIHRyYW5zbGF0ZUZyYWN0OiBudWxsLFxuICAgICAgICAvLyBidWZmZXJzIGZvciBhY3RpdmUgbWFya2Vyc1xuICAgICAgICBhY3RpdmF0aW9uOiBbXSxcbiAgICAgICAgLy8gYnVmZmVyIGZvciBmaWx0ZXJlZCBtYXJrZXJzXG4gICAgICAgIHNlbGVjdGlvbkJ1ZmZlcjogcmVnbC5idWZmZXIoe1xuICAgICAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KDApLFxuICAgICAgICAgIHVzYWdlOiAnc3RyZWFtJyxcbiAgICAgICAgICB0eXBlOiAndWludDgnXG4gICAgICAgIH0pLFxuICAgICAgICAvLyBidWZmZXJzIHdpdGggZGF0YTogaXQgaXMgZmFzdGVyIHRvIHN3aXRjaCB0aGVtIHBlci1wYXNzXG4gICAgICAgIC8vIHRoYW4gcHJvdmlkZSBvbmUgY29uZ3JlZ2F0ZSBidWZmZXJcbiAgICAgICAgc2l6ZUJ1ZmZlcjogcmVnbC5idWZmZXIoe1xuICAgICAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KDApLFxuICAgICAgICAgIHVzYWdlOiAnZHluYW1pYycsXG4gICAgICAgICAgdHlwZTogJ3VpbnQ4J1xuICAgICAgICB9KSxcbiAgICAgICAgY29sb3JCdWZmZXI6IHJlZ2wuYnVmZmVyKHtcbiAgICAgICAgICBkYXRhOiBuZXcgVWludDhBcnJheSgwKSxcbiAgICAgICAgICB1c2FnZTogJ2R5bmFtaWMnLFxuICAgICAgICAgIHR5cGU6ICd1aW50OCdcbiAgICAgICAgfSksXG4gICAgICAgIHBvc2l0aW9uQnVmZmVyOiByZWdsLmJ1ZmZlcih7XG4gICAgICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoMCksXG4gICAgICAgICAgdXNhZ2U6ICdkeW5hbWljJyxcbiAgICAgICAgICB0eXBlOiAnZmxvYXQnXG4gICAgICAgIH0pLFxuICAgICAgICBwb3NpdGlvbkZyYWN0QnVmZmVyOiByZWdsLmJ1ZmZlcih7XG4gICAgICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoMCksXG4gICAgICAgICAgdXNhZ2U6ICdkeW5hbWljJyxcbiAgICAgICAgICB0eXBlOiAnZmxvYXQnXG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgICAgb3B0aW9ucyA9IGV4dGVuZCh7fSwgU2NhdHRlci5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgfSAvLyBmb3JjZSB1cGRhdGUgdHJpZ2dlcnNcblxuXG4gICAgaWYgKG9wdGlvbnMucG9zaXRpb25zICYmICEoJ21hcmtlcicgaW4gb3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMubWFya2VyID0gZ3JvdXAubWFya2VyO1xuICAgICAgZGVsZXRlIGdyb3VwLm1hcmtlcjtcbiAgICB9IC8vIHVwZGF0aW5nIG1hcmtlcnMgY2F1c2UgcmVjYWxjdWxhdGluZyBzbmFwcGluZ1xuXG5cbiAgICBpZiAob3B0aW9ucy5tYXJrZXIgJiYgISgncG9zaXRpb25zJyBpbiBvcHRpb25zKSkge1xuICAgICAgb3B0aW9ucy5wb3NpdGlvbnMgPSBncm91cC5wb3NpdGlvbnM7XG4gICAgICBkZWxldGUgZ3JvdXAucG9zaXRpb25zO1xuICAgIH0gLy8gZ2xvYmFsIGNvdW50IG9mIHBvaW50c1xuXG5cbiAgICB2YXIgaGFzU2l6ZSA9IDAsXG4gICAgICAgIGhhc0NvbG9yID0gMDtcbiAgICB1cGRhdGVEaWZmKGdyb3VwLCBvcHRpb25zLCBbe1xuICAgICAgc25hcDogdHJ1ZSxcbiAgICAgIHNpemU6IGZ1bmN0aW9uIHNpemUocywgZ3JvdXApIHtcbiAgICAgICAgaWYgKHMgPT0gbnVsbCkgcyA9IFNjYXR0ZXIuZGVmYXVsdHMuc2l6ZTtcbiAgICAgICAgaGFzU2l6ZSArPSBzICYmIHMubGVuZ3RoID8gMSA6IDA7XG4gICAgICAgIHJldHVybiBzO1xuICAgICAgfSxcbiAgICAgIGJvcmRlclNpemU6IGZ1bmN0aW9uIGJvcmRlclNpemUocywgZ3JvdXApIHtcbiAgICAgICAgaWYgKHMgPT0gbnVsbCkgcyA9IFNjYXR0ZXIuZGVmYXVsdHMuYm9yZGVyU2l6ZTtcbiAgICAgICAgaGFzU2l6ZSArPSBzICYmIHMubGVuZ3RoID8gMSA6IDA7XG4gICAgICAgIHJldHVybiBzO1xuICAgICAgfSxcbiAgICAgIG9wYWNpdHk6IHBhcnNlRmxvYXQsXG4gICAgICAvLyBhZGQgY29sb3JzIHRvIHBhbGV0dGUsIHNhdmUgcmVmZXJlbmNlc1xuICAgICAgY29sb3I6IGZ1bmN0aW9uIGNvbG9yKGMsIGdyb3VwKSB7XG4gICAgICAgIGlmIChjID09IG51bGwpIGMgPSBTY2F0dGVyLmRlZmF1bHRzLmNvbG9yO1xuICAgICAgICBjID0gX3RoaXMzLnVwZGF0ZUNvbG9yKGMpO1xuICAgICAgICBoYXNDb2xvcisrO1xuICAgICAgICByZXR1cm4gYztcbiAgICAgIH0sXG4gICAgICBib3JkZXJDb2xvcjogZnVuY3Rpb24gYm9yZGVyQ29sb3IoYywgZ3JvdXApIHtcbiAgICAgICAgaWYgKGMgPT0gbnVsbCkgYyA9IFNjYXR0ZXIuZGVmYXVsdHMuYm9yZGVyQ29sb3I7XG4gICAgICAgIGMgPSBfdGhpczMudXBkYXRlQ29sb3IoYyk7XG4gICAgICAgIGhhc0NvbG9yKys7XG4gICAgICAgIHJldHVybiBjO1xuICAgICAgfSxcbiAgICAgIGJvdW5kczogZnVuY3Rpb24gYm91bmRzKF9ib3VuZHMsIGdyb3VwLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghKCdyYW5nZScgaW4gb3B0aW9ucykpIG9wdGlvbnMucmFuZ2UgPSBudWxsO1xuICAgICAgICByZXR1cm4gX2JvdW5kcztcbiAgICAgIH0sXG4gICAgICBwb3NpdGlvbnM6IGZ1bmN0aW9uIHBvc2l0aW9ucyhfcG9zaXRpb25zLCBncm91cCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgc25hcCA9IGdyb3VwLnNuYXA7XG4gICAgICAgIHZhciBwb3NpdGlvbkJ1ZmZlciA9IGdyb3VwLnBvc2l0aW9uQnVmZmVyLFxuICAgICAgICAgICAgcG9zaXRpb25GcmFjdEJ1ZmZlciA9IGdyb3VwLnBvc2l0aW9uRnJhY3RCdWZmZXIsXG4gICAgICAgICAgICBzZWxlY3Rpb25CdWZmZXIgPSBncm91cC5zZWxlY3Rpb25CdWZmZXI7IC8vIHNlcGFyYXRlIGJ1ZmZlcnMgZm9yIHgveSBjb29yZGluYXRlc1xuXG4gICAgICAgIGlmIChfcG9zaXRpb25zLnggfHwgX3Bvc2l0aW9ucy55KSB7XG4gICAgICAgICAgaWYgKF9wb3NpdGlvbnMueC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGdyb3VwLnhBdHRyID0ge1xuICAgICAgICAgICAgICBidWZmZXI6IHJlZ2wuYnVmZmVyKF9wb3NpdGlvbnMueCksXG4gICAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgICAgc3RyaWRlOiA0LFxuICAgICAgICAgICAgICBjb3VudDogX3Bvc2l0aW9ucy54Lmxlbmd0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXAueEF0dHIgPSB7XG4gICAgICAgICAgICAgIGJ1ZmZlcjogX3Bvc2l0aW9ucy54LmJ1ZmZlcixcbiAgICAgICAgICAgICAgb2Zmc2V0OiBfcG9zaXRpb25zLngub2Zmc2V0ICogNCB8fCAwLFxuICAgICAgICAgICAgICBzdHJpZGU6IChfcG9zaXRpb25zLnguc3RyaWRlIHx8IDEpICogNCxcbiAgICAgICAgICAgICAgY291bnQ6IF9wb3NpdGlvbnMueC5jb3VudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX3Bvc2l0aW9ucy55Lmxlbmd0aCkge1xuICAgICAgICAgICAgZ3JvdXAueUF0dHIgPSB7XG4gICAgICAgICAgICAgIGJ1ZmZlcjogcmVnbC5idWZmZXIoX3Bvc2l0aW9ucy55KSxcbiAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgICBzdHJpZGU6IDQsXG4gICAgICAgICAgICAgIGNvdW50OiBfcG9zaXRpb25zLnkubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cC55QXR0ciA9IHtcbiAgICAgICAgICAgICAgYnVmZmVyOiBfcG9zaXRpb25zLnkuYnVmZmVyLFxuICAgICAgICAgICAgICBvZmZzZXQ6IF9wb3NpdGlvbnMueS5vZmZzZXQgKiA0IHx8IDAsXG4gICAgICAgICAgICAgIHN0cmlkZTogKF9wb3NpdGlvbnMueS5zdHJpZGUgfHwgMSkgKiA0LFxuICAgICAgICAgICAgICBjb3VudDogX3Bvc2l0aW9ucy55LmNvdW50XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGdyb3VwLmNvdW50ID0gTWF0aC5tYXgoZ3JvdXAueEF0dHIuY291bnQsIGdyb3VwLnlBdHRyLmNvdW50KTtcbiAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIF9wb3NpdGlvbnMgPSBmbGF0dGVuKF9wb3NpdGlvbnMsICdmbG9hdDY0Jyk7XG4gICAgICAgIHZhciBjb3VudCA9IGdyb3VwLmNvdW50ID0gTWF0aC5mbG9vcihfcG9zaXRpb25zLmxlbmd0aCAvIDIpO1xuICAgICAgICB2YXIgYm91bmRzID0gZ3JvdXAuYm91bmRzID0gY291bnQgPyBnZXRCb3VuZHMoX3Bvc2l0aW9ucywgMikgOiBudWxsOyAvLyBpZiByYW5nZSBpcyBub3QgcHJvdmlkZWQgdXBkYXRlZCAtIHJlY2FsYyBpdFxuXG4gICAgICAgIGlmICghb3B0aW9ucy5yYW5nZSAmJiAhZ3JvdXAucmFuZ2UpIHtcbiAgICAgICAgICBkZWxldGUgZ3JvdXAucmFuZ2U7XG4gICAgICAgICAgb3B0aW9ucy5yYW5nZSA9IGJvdW5kcztcbiAgICAgICAgfSAvLyByZXNldCBtYXJrZXJcblxuXG4gICAgICAgIGlmICghb3B0aW9ucy5tYXJrZXIgJiYgIWdyb3VwLm1hcmtlcikge1xuICAgICAgICAgIGRlbGV0ZSBncm91cC5tYXJrZXI7XG4gICAgICAgICAgb3B0aW9ucy5tYXJrZXIgPSBudWxsO1xuICAgICAgICB9IC8vIGJ1aWxkIGNsdXN0ZXIgdHJlZSBpZiByZXF1aXJlZFxuXG5cbiAgICAgICAgaWYgKHNuYXAgJiYgKHNuYXAgPT09IHRydWUgfHwgY291bnQgPiBzbmFwKSkge1xuICAgICAgICAgIGdyb3VwLnRyZWUgPSBjbHVzdGVyKF9wb3NpdGlvbnMsIHtcbiAgICAgICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gLy8gZXhpc3RpbmcgdHJlZSBpbnN0YW5jZVxuICAgICAgICBlbHNlIGlmIChzbmFwICYmIHNuYXAubGVuZ3RoKSB7XG4gICAgICAgICAgICBncm91cC50cmVlID0gc25hcDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdyb3VwLnRyZWUpIHtcbiAgICAgICAgICB2YXIgb3B0cyA9IHtcbiAgICAgICAgICAgIHByaW1pdGl2ZTogJ3BvaW50cycsXG4gICAgICAgICAgICB1c2FnZTogJ3N0YXRpYycsXG4gICAgICAgICAgICBkYXRhOiBncm91cC50cmVlLFxuICAgICAgICAgICAgdHlwZTogJ3VpbnQzMidcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChncm91cC5lbGVtZW50cykgZ3JvdXAuZWxlbWVudHMob3B0cyk7ZWxzZSBncm91cC5lbGVtZW50cyA9IHJlZ2wuZWxlbWVudHMob3B0cyk7XG4gICAgICAgIH0gLy8gdXBkYXRlIHBvc2l0aW9uIGJ1ZmZlcnNcblxuXG4gICAgICAgIHBvc2l0aW9uQnVmZmVyKHtcbiAgICAgICAgICBkYXRhOiBmMzIuZmxvYXQoX3Bvc2l0aW9ucyksXG4gICAgICAgICAgdXNhZ2U6ICdkeW5hbWljJ1xuICAgICAgICB9KTtcbiAgICAgICAgcG9zaXRpb25GcmFjdEJ1ZmZlcih7XG4gICAgICAgICAgZGF0YTogZjMyLmZyYWN0KF9wb3NpdGlvbnMpLFxuICAgICAgICAgIHVzYWdlOiAnZHluYW1pYydcbiAgICAgICAgfSk7IC8vIGV4cGFuZCBzZWxlY3Rpb25CdWZmZXJcblxuICAgICAgICBzZWxlY3Rpb25CdWZmZXIoe1xuICAgICAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KGNvdW50KSxcbiAgICAgICAgICB0eXBlOiAndWludDgnLFxuICAgICAgICAgIHVzYWdlOiAnc3RyZWFtJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIF9wb3NpdGlvbnM7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgLy8gY3JlYXRlIG1hcmtlciBpZHMgY29ycmVzcG9uZGluZyB0byBrbm93biBtYXJrZXIgdGV4dHVyZXNcbiAgICAgIG1hcmtlcjogZnVuY3Rpb24gbWFya2VyKG1hcmtlcnMsIGdyb3VwLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBhY3RpdmF0aW9uID0gZ3JvdXAuYWN0aXZhdGlvbjsgLy8gcmVzZXQgbWFya2VyIGVsZW1lbnRzXG5cbiAgICAgICAgYWN0aXZhdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci5kZXN0cm95ICYmIGJ1ZmZlci5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhY3RpdmF0aW9uLmxlbmd0aCA9IDA7IC8vIHNpbmdsZSBzZGYgbWFya2VyXG5cbiAgICAgICAgaWYgKCFtYXJrZXJzIHx8IHR5cGVvZiBtYXJrZXJzWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHZhciBpZCA9IF90aGlzMy5hZGRNYXJrZXIobWFya2Vycyk7XG5cbiAgICAgICAgICBhY3RpdmF0aW9uW2lkXSA9IHRydWU7XG4gICAgICAgIH0gLy8gcGVyLXBvaW50IG1hcmtlcnMgdXNlIG1hc2sgYnVmZmVycyB0byBlbmFibGUgbWFya2VycyBpbiB2ZXJ0IHNoYWRlclxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBtYXJrZXJNYXNrcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGwgPSBNYXRoLm1pbihtYXJrZXJzLmxlbmd0aCwgZ3JvdXAuY291bnQpOyBfaSA8IGw7IF9pKyspIHtcbiAgICAgICAgICAgICAgdmFyIF9pZCA9IF90aGlzMy5hZGRNYXJrZXIobWFya2Vyc1tfaV0pO1xuXG4gICAgICAgICAgICAgIGlmICghbWFya2VyTWFza3NbX2lkXSkgbWFya2VyTWFza3NbX2lkXSA9IG5ldyBVaW50OEFycmF5KGdyb3VwLmNvdW50KTsgLy8gZW5hYmxlIG1hcmtlciBieSBkZWZhdWx0XG5cbiAgICAgICAgICAgICAgbWFya2VyTWFza3NbX2lkXVtfaV0gPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBfaWQyID0gMDsgX2lkMiA8IG1hcmtlck1hc2tzLmxlbmd0aDsgX2lkMisrKSB7XG4gICAgICAgICAgICAgIGlmICghbWFya2VyTWFza3NbX2lkMl0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB2YXIgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICBkYXRhOiBtYXJrZXJNYXNrc1tfaWQyXSxcbiAgICAgICAgICAgICAgICB0eXBlOiAndWludDgnLFxuICAgICAgICAgICAgICAgIHVzYWdlOiAnc3RhdGljJ1xuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIGlmICghYWN0aXZhdGlvbltfaWQyXSkge1xuICAgICAgICAgICAgICAgIGFjdGl2YXRpb25bX2lkMl0gPSByZWdsLmJ1ZmZlcihvcHRzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhY3RpdmF0aW9uW19pZDJdKG9wdHMpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYWN0aXZhdGlvbltfaWQyXS5kYXRhID0gbWFya2VyTWFza3NbX2lkMl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXJrZXJzO1xuICAgICAgfSxcbiAgICAgIHJhbmdlOiBmdW5jdGlvbiByYW5nZShfcmFuZ2UsIGdyb3VwLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBib3VuZHMgPSBncm91cC5ib3VuZHM7IC8vIEZJWE1FOiB3aHkgZG8gd2UgbmVlZCB0aGlzP1xuXG4gICAgICAgIGlmICghYm91bmRzKSByZXR1cm47XG4gICAgICAgIGlmICghX3JhbmdlKSBfcmFuZ2UgPSBib3VuZHM7XG4gICAgICAgIGdyb3VwLnNjYWxlID0gWzEgLyAoX3JhbmdlWzJdIC0gX3JhbmdlWzBdKSwgMSAvIChfcmFuZ2VbM10gLSBfcmFuZ2VbMV0pXTtcbiAgICAgICAgZ3JvdXAudHJhbnNsYXRlID0gWy1fcmFuZ2VbMF0sIC1fcmFuZ2VbMV1dO1xuICAgICAgICBncm91cC5zY2FsZUZyYWN0ID0gZjMyLmZyYWN0KGdyb3VwLnNjYWxlKTtcbiAgICAgICAgZ3JvdXAudHJhbnNsYXRlRnJhY3QgPSBmMzIuZnJhY3QoZ3JvdXAudHJhbnNsYXRlKTtcbiAgICAgICAgcmV0dXJuIF9yYW5nZTtcbiAgICAgIH0sXG4gICAgICB2aWV3cG9ydDogZnVuY3Rpb24gdmlld3BvcnQodnApIHtcbiAgICAgICAgdmFyIHJlY3QgPSBwYXJzZVJlY3QodnAgfHwgW2dsLmRyYXdpbmdCdWZmZXJXaWR0aCwgZ2wuZHJhd2luZ0J1ZmZlckhlaWdodF0pOyAvLyBub3JtYWxpemUgdmlld3BvcnQgdG8gdGhlIGNhbnZhcyBjb29yZGluYXRlc1xuICAgICAgICAvLyByZWN0LnkgPSBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0IC0gcmVjdC5oZWlnaHQgLSByZWN0LnlcblxuICAgICAgICByZXR1cm4gcmVjdDtcbiAgICAgIH1cbiAgICB9XSk7IC8vIHVwZGF0ZSBzaXplIGJ1ZmZlciwgaWYgbmVlZGVkXG5cbiAgICBpZiAoaGFzU2l6ZSkge1xuICAgICAgdmFyIF9ncm91cCA9IGdyb3VwLFxuICAgICAgICAgIGNvdW50ID0gX2dyb3VwLmNvdW50LFxuICAgICAgICAgIHNpemUgPSBfZ3JvdXAuc2l6ZSxcbiAgICAgICAgICBib3JkZXJTaXplID0gX2dyb3VwLmJvcmRlclNpemUsXG4gICAgICAgICAgc2l6ZUJ1ZmZlciA9IF9ncm91cC5zaXplQnVmZmVyO1xuICAgICAgdmFyIHNpemVzID0gbmV3IFVpbnQ4QXJyYXkoY291bnQgKiAyKTtcblxuICAgICAgaWYgKHNpemUubGVuZ3RoIHx8IGJvcmRlclNpemUubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGNvdW50OyBfaTIrKykge1xuICAgICAgICAgIC8vIHdlIGRvd25zY2FsZSBzaXplIHRvIGFsbG93IGZvciBmcmFjdGlvbnNcbiAgICAgICAgICBzaXplc1tfaTIgKiAyXSA9IE1hdGgucm91bmQoKHNpemVbX2kyXSA9PSBudWxsID8gc2l6ZSA6IHNpemVbX2kyXSkgKiAyNTUgLyBtYXhTaXplKTtcbiAgICAgICAgICBzaXplc1tfaTIgKiAyICsgMV0gPSBNYXRoLnJvdW5kKChib3JkZXJTaXplW19pMl0gPT0gbnVsbCA/IGJvcmRlclNpemUgOiBib3JkZXJTaXplW19pMl0pICogMjU1IC8gbWF4U2l6ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2l6ZUJ1ZmZlcih7XG4gICAgICAgIGRhdGE6IHNpemVzLFxuICAgICAgICB1c2FnZTogJ2R5bmFtaWMnXG4gICAgICB9KTtcbiAgICB9IC8vIHVwZGF0ZSBjb2xvciBidWZmZXIgaWYgbmVlZGVkXG5cblxuICAgIGlmIChoYXNDb2xvcikge1xuICAgICAgdmFyIF9ncm91cDIgPSBncm91cCxcbiAgICAgICAgICBfY291bnQgPSBfZ3JvdXAyLmNvdW50LFxuICAgICAgICAgIGNvbG9yID0gX2dyb3VwMi5jb2xvcixcbiAgICAgICAgICBib3JkZXJDb2xvciA9IF9ncm91cDIuYm9yZGVyQ29sb3IsXG4gICAgICAgICAgY29sb3JCdWZmZXIgPSBfZ3JvdXAyLmNvbG9yQnVmZmVyO1xuICAgICAgdmFyIGNvbG9yczsgLy8gaWYgdG9vIG1hbnkgY29sb3JzIC0gcHV0IGNvbG9ycyB0byBidWZmZXIgZGlyZWN0bHlcblxuICAgICAgaWYgKF90aGlzMy50b29NYW55Q29sb3JzKSB7XG4gICAgICAgIGlmIChjb2xvci5sZW5ndGggfHwgYm9yZGVyQ29sb3IubGVuZ3RoKSB7XG4gICAgICAgICAgY29sb3JzID0gbmV3IFVpbnQ4QXJyYXkoX2NvdW50ICogOCk7XG5cbiAgICAgICAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBfY291bnQ7IF9pMysrKSB7XG4gICAgICAgICAgICB2YXIgX2NvbG9ySWQgPSBjb2xvcltfaTNdO1xuICAgICAgICAgICAgY29sb3JzW19pMyAqIDhdID0gcGFsZXR0ZVtfY29sb3JJZCAqIDRdO1xuICAgICAgICAgICAgY29sb3JzW19pMyAqIDggKyAxXSA9IHBhbGV0dGVbX2NvbG9ySWQgKiA0ICsgMV07XG4gICAgICAgICAgICBjb2xvcnNbX2kzICogOCArIDJdID0gcGFsZXR0ZVtfY29sb3JJZCAqIDQgKyAyXTtcbiAgICAgICAgICAgIGNvbG9yc1tfaTMgKiA4ICsgM10gPSBwYWxldHRlW19jb2xvcklkICogNCArIDNdO1xuICAgICAgICAgICAgdmFyIGJvcmRlckNvbG9ySWQgPSBib3JkZXJDb2xvcltfaTNdO1xuICAgICAgICAgICAgY29sb3JzW19pMyAqIDggKyA0XSA9IHBhbGV0dGVbYm9yZGVyQ29sb3JJZCAqIDRdO1xuICAgICAgICAgICAgY29sb3JzW19pMyAqIDggKyA1XSA9IHBhbGV0dGVbYm9yZGVyQ29sb3JJZCAqIDQgKyAxXTtcbiAgICAgICAgICAgIGNvbG9yc1tfaTMgKiA4ICsgNl0gPSBwYWxldHRlW2JvcmRlckNvbG9ySWQgKiA0ICsgMl07XG4gICAgICAgICAgICBjb2xvcnNbX2kzICogOCArIDddID0gcGFsZXR0ZVtib3JkZXJDb2xvcklkICogNCArIDNdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSAvLyBpZiBsaW1pdGVkIGFtb3VudCBvZiBjb2xvcnMgLSBrZWVwIHBhbGV0dGUgY29sb3IgcGlja2luZ1xuICAgICAgLy8gdGhhdCBzYXZlcyBzaWduaWZpY2FudCBtZW1vcnlcbiAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChjb2xvci5sZW5ndGggfHwgYm9yZGVyQ29sb3IubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHNsaWdodCBkYXRhIGluY3JlYXNlIGJ5IDIgZHVlIHRvIHZlYzQgYm9yZGVySWQgaW4gc2hhZGVyXG4gICAgICAgICAgICBjb2xvcnMgPSBuZXcgVWludDhBcnJheShfY291bnQgKiA0ICsgMik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIF9pNCA9IDA7IF9pNCA8IF9jb3VudDsgX2k0KyspIHtcbiAgICAgICAgICAgICAgLy8gcHV0IGNvbG9yIGNvb3JkcyBpbiBwYWxldHRlIHRleHR1cmVcbiAgICAgICAgICAgICAgaWYgKGNvbG9yW19pNF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbG9yc1tfaTQgKiA0XSA9IGNvbG9yW19pNF0gJSBtYXhDb2xvcnM7XG4gICAgICAgICAgICAgICAgY29sb3JzW19pNCAqIDQgKyAxXSA9IE1hdGguZmxvb3IoY29sb3JbX2k0XSAvIG1heENvbG9ycyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoYm9yZGVyQ29sb3JbX2k0XSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29sb3JzW19pNCAqIDQgKyAyXSA9IGJvcmRlckNvbG9yW19pNF0gJSBtYXhDb2xvcnM7XG4gICAgICAgICAgICAgICAgY29sb3JzW19pNCAqIDQgKyAzXSA9IE1hdGguZmxvb3IoYm9yZGVyQ29sb3JbX2k0XSAvIG1heENvbG9ycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgY29sb3JCdWZmZXIoe1xuICAgICAgICBkYXRhOiBjb2xvcnMgfHwgbmV3IFVpbnQ4QXJyYXkoMCksXG4gICAgICAgIHR5cGU6ICd1aW50OCcsXG4gICAgICAgIHVzYWdlOiAnZHluYW1pYydcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBncm91cDtcbiAgfSk7XG59OyAvLyBnZXQgKGFuZCBjcmVhdGUpIG1hcmtlciB0ZXh0dXJlIGlkXG5cblxuU2NhdHRlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24gKHNkZikge1xuICB2YXIgbWFya2VyVGV4dHVyZXMgPSB0aGlzLm1hcmtlclRleHR1cmVzLFxuICAgICAgcmVnbCA9IHRoaXMucmVnbCxcbiAgICAgIG1hcmtlckNhY2hlID0gdGhpcy5tYXJrZXJDYWNoZTtcbiAgdmFyIHBvcyA9IHNkZiA9PSBudWxsID8gMCA6IG1hcmtlckNhY2hlLmluZGV4T2Yoc2RmKTtcbiAgaWYgKHBvcyA+PSAwKSByZXR1cm4gcG9zOyAvLyBjb252ZXJ0IHNkZiB0byAwLi4yNTUgcmFuZ2VcblxuICB2YXIgZGlzdEFycjtcblxuICBpZiAoc2RmIGluc3RhbmNlb2YgVWludDhBcnJheSB8fCBzZGYgaW5zdGFuY2VvZiBVaW50OENsYW1wZWRBcnJheSkge1xuICAgIGRpc3RBcnIgPSBzZGY7XG4gIH0gZWxzZSB7XG4gICAgZGlzdEFyciA9IG5ldyBVaW50OEFycmF5KHNkZi5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzZGYubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBkaXN0QXJyW2ldID0gc2RmW2ldICogMjU1O1xuICAgIH1cbiAgfVxuXG4gIHZhciByYWRpdXMgPSBNYXRoLmZsb29yKE1hdGguc3FydChkaXN0QXJyLmxlbmd0aCkpO1xuICBwb3MgPSBtYXJrZXJUZXh0dXJlcy5sZW5ndGg7XG4gIG1hcmtlckNhY2hlLnB1c2goc2RmKTtcbiAgbWFya2VyVGV4dHVyZXMucHVzaChyZWdsLnRleHR1cmUoe1xuICAgIGNoYW5uZWxzOiAxLFxuICAgIGRhdGE6IGRpc3RBcnIsXG4gICAgcmFkaXVzOiByYWRpdXMsXG4gICAgbWFnOiAnbGluZWFyJyxcbiAgICBtaW46ICdsaW5lYXInXG4gIH0pKTtcbiAgcmV0dXJuIHBvcztcbn07IC8vIHJlZ2lzdGVyIGNvbG9yIHRvIHBhbGV0dGUsIHJldHVybiBpdCdzIGluZGV4IG9yIGxpc3Qgb2YgaW5kZXhlc1xuXG5cblNjYXR0ZXIucHJvdG90eXBlLnVwZGF0ZUNvbG9yID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICB2YXIgcGFsZXR0ZUlkcyA9IHRoaXMucGFsZXR0ZUlkcyxcbiAgICAgIHBhbGV0dGUgPSB0aGlzLnBhbGV0dGUsXG4gICAgICBtYXhDb2xvcnMgPSB0aGlzLm1heENvbG9ycztcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoY29sb3JzKSkge1xuICAgIGNvbG9ycyA9IFtjb2xvcnNdO1xuICB9XG5cbiAgdmFyIGlkeCA9IFtdOyAvLyBpZiBjb2xvciBncm91cHMgLSBmbGF0dGVuIHRoZW1cblxuICBpZiAodHlwZW9mIGNvbG9yc1swXSA9PT0gJ251bWJlcicpIHtcbiAgICB2YXIgZ3JvdXBlZCA9IFtdO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sb3JzKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgZ3JvdXBlZC5wdXNoKGNvbG9ycy5zbGljZShpLCBpICsgNCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBfaTUgPSAwOyBfaTUgPCBjb2xvcnMubGVuZ3RoOyBfaTUgKz0gNCkge1xuICAgICAgICBncm91cGVkLnB1c2goY29sb3JzLnN1YmFycmF5KF9pNSwgX2k1ICsgNCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbG9ycyA9IGdyb3VwZWQ7XG4gIH1cblxuICBmb3IgKHZhciBfaTYgPSAwOyBfaTYgPCBjb2xvcnMubGVuZ3RoOyBfaTYrKykge1xuICAgIHZhciBjb2xvciA9IGNvbG9yc1tfaTZdO1xuICAgIGNvbG9yID0gcmdiYShjb2xvciwgJ3VpbnQ4Jyk7XG4gICAgdmFyIGlkID0gY29sb3JJZChjb2xvciwgZmFsc2UpOyAvLyBpZiBuZXcgY29sb3IgLSBzYXZlIGl0XG5cbiAgICBpZiAocGFsZXR0ZUlkc1tpZF0gPT0gbnVsbCkge1xuICAgICAgdmFyIHBvcyA9IHBhbGV0dGUubGVuZ3RoO1xuICAgICAgcGFsZXR0ZUlkc1tpZF0gPSBNYXRoLmZsb29yKHBvcyAvIDQpO1xuICAgICAgcGFsZXR0ZVtwb3NdID0gY29sb3JbMF07XG4gICAgICBwYWxldHRlW3BvcyArIDFdID0gY29sb3JbMV07XG4gICAgICBwYWxldHRlW3BvcyArIDJdID0gY29sb3JbMl07XG4gICAgICBwYWxldHRlW3BvcyArIDNdID0gY29sb3JbM107XG4gICAgfVxuXG4gICAgaWR4W19pNl0gPSBwYWxldHRlSWRzW2lkXTtcbiAgfSAvLyBkZXRlY3QgaWYgdG9vIG1hbnkgY29sb3JzIGluIHBhbGV0dGVcblxuXG4gIGlmICghdGhpcy50b29NYW55Q29sb3JzICYmIHBhbGV0dGUubGVuZ3RoID4gbWF4Q29sb3JzICogNCkgdGhpcy50b29NYW55Q29sb3JzID0gdHJ1ZTsgLy8gbGltaXQgbWF4IGNvbG9yXG5cbiAgdGhpcy51cGRhdGVQYWxldHRlKHBhbGV0dGUpOyAvLyBrZWVwIHN0YXRpYyBpbmRleCBmb3Igc2luZ2xlLWNvbG9yIHByb3BlcnR5XG5cbiAgcmV0dXJuIGlkeC5sZW5ndGggPT09IDEgPyBpZHhbMF0gOiBpZHg7XG59O1xuXG5TY2F0dGVyLnByb3RvdHlwZS51cGRhdGVQYWxldHRlID0gZnVuY3Rpb24gKHBhbGV0dGUpIHtcbiAgaWYgKHRoaXMudG9vTWFueUNvbG9ycykgcmV0dXJuO1xuICB2YXIgbWF4Q29sb3JzID0gdGhpcy5tYXhDb2xvcnMsXG4gICAgICBwYWxldHRlVGV4dHVyZSA9IHRoaXMucGFsZXR0ZVRleHR1cmU7XG4gIHZhciByZXF1aXJlZEhlaWdodCA9IE1hdGguY2VpbChwYWxldHRlLmxlbmd0aCAqIC4yNSAvIG1heENvbG9ycyk7IC8vIHBhZCBkYXRhXG5cbiAgaWYgKHJlcXVpcmVkSGVpZ2h0ID4gMSkge1xuICAgIHBhbGV0dGUgPSBwYWxldHRlLnNsaWNlKCk7XG5cbiAgICBmb3IgKHZhciBpID0gcGFsZXR0ZS5sZW5ndGggKiAuMjUgJSBtYXhDb2xvcnM7IGkgPCByZXF1aXJlZEhlaWdodCAqIG1heENvbG9yczsgaSsrKSB7XG4gICAgICBwYWxldHRlLnB1c2goMCwgMCwgMCwgMCk7XG4gICAgfVxuICB9IC8vIGVuc3VyZSBoZWlnaHRcblxuXG4gIGlmIChwYWxldHRlVGV4dHVyZS5oZWlnaHQgPCByZXF1aXJlZEhlaWdodCkge1xuICAgIHBhbGV0dGVUZXh0dXJlLnJlc2l6ZShtYXhDb2xvcnMsIHJlcXVpcmVkSGVpZ2h0KTtcbiAgfSAvLyB1cGRhdGUgZnVsbCBkYXRhXG5cblxuICBwYWxldHRlVGV4dHVyZS5zdWJpbWFnZSh7XG4gICAgd2lkdGg6IE1hdGgubWluKHBhbGV0dGUubGVuZ3RoICogLjI1LCBtYXhDb2xvcnMpLFxuICAgIGhlaWdodDogcmVxdWlyZWRIZWlnaHQsXG4gICAgZGF0YTogcGFsZXR0ZVxuICB9LCAwLCAwKTtcbn07IC8vIHJlbW92ZSB1bnVzZWQgc3R1ZmZcblxuXG5TY2F0dGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChncm91cCkge1xuICAgIGdyb3VwLnNpemVCdWZmZXIuZGVzdHJveSgpO1xuICAgIGdyb3VwLnBvc2l0aW9uQnVmZmVyLmRlc3Ryb3koKTtcbiAgICBncm91cC5wb3NpdGlvbkZyYWN0QnVmZmVyLmRlc3Ryb3koKTtcbiAgICBncm91cC5jb2xvckJ1ZmZlci5kZXN0cm95KCk7XG4gICAgZ3JvdXAuYWN0aXZhdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7XG4gICAgICByZXR1cm4gYiAmJiBiLmRlc3Ryb3kgJiYgYi5kZXN0cm95KCk7XG4gICAgfSk7XG4gICAgZ3JvdXAuc2VsZWN0aW9uQnVmZmVyLmRlc3Ryb3koKTtcbiAgICBpZiAoZ3JvdXAuZWxlbWVudHMpIGdyb3VwLmVsZW1lbnRzLmRlc3Ryb3koKTtcbiAgfSk7XG4gIHRoaXMuZ3JvdXBzLmxlbmd0aCA9IDA7XG4gIHRoaXMucGFsZXR0ZVRleHR1cmUuZGVzdHJveSgpO1xuICB0aGlzLm1hcmtlclRleHR1cmVzLmZvckVhY2goZnVuY3Rpb24gKHR4dCkge1xuICAgIHJldHVybiB0eHQgJiYgdHh0LmRlc3Ryb3kgJiYgdHh0LmRlc3Ryb3koKTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxudmFyIGV4dGVuZCQxID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgcmVnbFNjYXR0ZXIyZCA9IGZ1bmN0aW9uIHJlZ2xTY2F0dGVyMmQocmVnbCwgb3B0aW9ucykge1xuICB2YXIgc2NhdHRlciQxID0gbmV3IHNjYXR0ZXIocmVnbCwgb3B0aW9ucyk7XG4gIHZhciByZW5kZXIgPSBzY2F0dGVyJDEucmVuZGVyLmJpbmQoc2NhdHRlciQxKTsgLy8gZXhwb3NlIEFQSVxuXG4gIGV4dGVuZCQxKHJlbmRlciwge1xuICAgIHJlbmRlcjogcmVuZGVyLFxuICAgIHVwZGF0ZTogc2NhdHRlciQxLnVwZGF0ZS5iaW5kKHNjYXR0ZXIkMSksXG4gICAgZHJhdzogc2NhdHRlciQxLmRyYXcuYmluZChzY2F0dGVyJDEpLFxuICAgIGRlc3Ryb3k6IHNjYXR0ZXIkMS5kZXN0cm95LmJpbmQoc2NhdHRlciQxKSxcbiAgICByZWdsOiBzY2F0dGVyJDEucmVnbCxcbiAgICBnbDogc2NhdHRlciQxLmdsLFxuICAgIGNhbnZhczogc2NhdHRlciQxLmdsLmNhbnZhcyxcbiAgICBncm91cHM6IHNjYXR0ZXIkMS5ncm91cHMsXG4gICAgbWFya2Vyczogc2NhdHRlciQxLm1hcmtlckNhY2hlLFxuICAgIHBhbGV0dGU6IHNjYXR0ZXIkMS5wYWxldHRlXG4gIH0pO1xuICByZXR1cm4gcmVuZGVyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZWdsU2NhdHRlcjJkO1xuIiwidmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG52YXIgVEFVID0gTWF0aC5QSSAqIDI7XG5cbnZhciBtYXBUb0VsbGlwc2UgPSBmdW5jdGlvbiBtYXBUb0VsbGlwc2UoX3JlZiwgcngsIHJ5LCBjb3NwaGksIHNpbnBoaSwgY2VudGVyeCwgY2VudGVyeSkge1xuICB2YXIgeCA9IF9yZWYueCxcbiAgICAgIHkgPSBfcmVmLnk7XG5cbiAgeCAqPSByeDtcbiAgeSAqPSByeTtcblxuICB2YXIgeHAgPSBjb3NwaGkgKiB4IC0gc2lucGhpICogeTtcbiAgdmFyIHlwID0gc2lucGhpICogeCArIGNvc3BoaSAqIHk7XG5cbiAgcmV0dXJuIHtcbiAgICB4OiB4cCArIGNlbnRlcngsXG4gICAgeTogeXAgKyBjZW50ZXJ5XG4gIH07XG59O1xuXG52YXIgYXBwcm94VW5pdEFyYyA9IGZ1bmN0aW9uIGFwcHJveFVuaXRBcmMoYW5nMSwgYW5nMikge1xuICAvLyBJZiA5MCBkZWdyZWUgY2lyY3VsYXIgYXJjLCB1c2UgYSBjb25zdGFudFxuICAvLyBhcyBkZXJpdmVkIGZyb20gaHR0cDovL3NwZW5jZXJtb3J0ZW5zZW4uY29tL2FydGljbGVzL2Jlemllci1jaXJjbGVcbiAgdmFyIGEgPSBhbmcyID09PSAxLjU3MDc5NjMyNjc5NDg5NjYgPyAwLjU1MTkxNTAyNDQ5NCA6IGFuZzIgPT09IC0xLjU3MDc5NjMyNjc5NDg5NjYgPyAtMC41NTE5MTUwMjQ0OTQgOiA0IC8gMyAqIE1hdGgudGFuKGFuZzIgLyA0KTtcblxuICB2YXIgeDEgPSBNYXRoLmNvcyhhbmcxKTtcbiAgdmFyIHkxID0gTWF0aC5zaW4oYW5nMSk7XG4gIHZhciB4MiA9IE1hdGguY29zKGFuZzEgKyBhbmcyKTtcbiAgdmFyIHkyID0gTWF0aC5zaW4oYW5nMSArIGFuZzIpO1xuXG4gIHJldHVybiBbe1xuICAgIHg6IHgxIC0geTEgKiBhLFxuICAgIHk6IHkxICsgeDEgKiBhXG4gIH0sIHtcbiAgICB4OiB4MiArIHkyICogYSxcbiAgICB5OiB5MiAtIHgyICogYVxuICB9LCB7XG4gICAgeDogeDIsXG4gICAgeTogeTJcbiAgfV07XG59O1xuXG52YXIgdmVjdG9yQW5nbGUgPSBmdW5jdGlvbiB2ZWN0b3JBbmdsZSh1eCwgdXksIHZ4LCB2eSkge1xuICB2YXIgc2lnbiA9IHV4ICogdnkgLSB1eSAqIHZ4IDwgMCA/IC0xIDogMTtcblxuICB2YXIgZG90ID0gdXggKiB2eCArIHV5ICogdnk7XG5cbiAgaWYgKGRvdCA+IDEpIHtcbiAgICBkb3QgPSAxO1xuICB9XG5cbiAgaWYgKGRvdCA8IC0xKSB7XG4gICAgZG90ID0gLTE7XG4gIH1cblxuICByZXR1cm4gc2lnbiAqIE1hdGguYWNvcyhkb3QpO1xufTtcblxudmFyIGdldEFyY0NlbnRlciA9IGZ1bmN0aW9uIGdldEFyY0NlbnRlcihweCwgcHksIGN4LCBjeSwgcngsIHJ5LCBsYXJnZUFyY0ZsYWcsIHN3ZWVwRmxhZywgc2lucGhpLCBjb3NwaGksIHB4cCwgcHlwKSB7XG4gIHZhciByeHNxID0gTWF0aC5wb3cocngsIDIpO1xuICB2YXIgcnlzcSA9IE1hdGgucG93KHJ5LCAyKTtcbiAgdmFyIHB4cHNxID0gTWF0aC5wb3cocHhwLCAyKTtcbiAgdmFyIHB5cHNxID0gTWF0aC5wb3cocHlwLCAyKTtcblxuICB2YXIgcmFkaWNhbnQgPSByeHNxICogcnlzcSAtIHJ4c3EgKiBweXBzcSAtIHJ5c3EgKiBweHBzcTtcblxuICBpZiAocmFkaWNhbnQgPCAwKSB7XG4gICAgcmFkaWNhbnQgPSAwO1xuICB9XG5cbiAgcmFkaWNhbnQgLz0gcnhzcSAqIHB5cHNxICsgcnlzcSAqIHB4cHNxO1xuICByYWRpY2FudCA9IE1hdGguc3FydChyYWRpY2FudCkgKiAobGFyZ2VBcmNGbGFnID09PSBzd2VlcEZsYWcgPyAtMSA6IDEpO1xuXG4gIHZhciBjZW50ZXJ4cCA9IHJhZGljYW50ICogcnggLyByeSAqIHB5cDtcbiAgdmFyIGNlbnRlcnlwID0gcmFkaWNhbnQgKiAtcnkgLyByeCAqIHB4cDtcblxuICB2YXIgY2VudGVyeCA9IGNvc3BoaSAqIGNlbnRlcnhwIC0gc2lucGhpICogY2VudGVyeXAgKyAocHggKyBjeCkgLyAyO1xuICB2YXIgY2VudGVyeSA9IHNpbnBoaSAqIGNlbnRlcnhwICsgY29zcGhpICogY2VudGVyeXAgKyAocHkgKyBjeSkgLyAyO1xuXG4gIHZhciB2eDEgPSAocHhwIC0gY2VudGVyeHApIC8gcng7XG4gIHZhciB2eTEgPSAocHlwIC0gY2VudGVyeXApIC8gcnk7XG4gIHZhciB2eDIgPSAoLXB4cCAtIGNlbnRlcnhwKSAvIHJ4O1xuICB2YXIgdnkyID0gKC1weXAgLSBjZW50ZXJ5cCkgLyByeTtcblxuICB2YXIgYW5nMSA9IHZlY3RvckFuZ2xlKDEsIDAsIHZ4MSwgdnkxKTtcbiAgdmFyIGFuZzIgPSB2ZWN0b3JBbmdsZSh2eDEsIHZ5MSwgdngyLCB2eTIpO1xuXG4gIGlmIChzd2VlcEZsYWcgPT09IDAgJiYgYW5nMiA+IDApIHtcbiAgICBhbmcyIC09IFRBVTtcbiAgfVxuXG4gIGlmIChzd2VlcEZsYWcgPT09IDEgJiYgYW5nMiA8IDApIHtcbiAgICBhbmcyICs9IFRBVTtcbiAgfVxuXG4gIHJldHVybiBbY2VudGVyeCwgY2VudGVyeSwgYW5nMSwgYW5nMl07XG59O1xuXG52YXIgYXJjVG9CZXppZXIgPSBmdW5jdGlvbiBhcmNUb0JlemllcihfcmVmMikge1xuICB2YXIgcHggPSBfcmVmMi5weCxcbiAgICAgIHB5ID0gX3JlZjIucHksXG4gICAgICBjeCA9IF9yZWYyLmN4LFxuICAgICAgY3kgPSBfcmVmMi5jeSxcbiAgICAgIHJ4ID0gX3JlZjIucngsXG4gICAgICByeSA9IF9yZWYyLnJ5LFxuICAgICAgX3JlZjIkeEF4aXNSb3RhdGlvbiA9IF9yZWYyLnhBeGlzUm90YXRpb24sXG4gICAgICB4QXhpc1JvdGF0aW9uID0gX3JlZjIkeEF4aXNSb3RhdGlvbiA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYyJHhBeGlzUm90YXRpb24sXG4gICAgICBfcmVmMiRsYXJnZUFyY0ZsYWcgPSBfcmVmMi5sYXJnZUFyY0ZsYWcsXG4gICAgICBsYXJnZUFyY0ZsYWcgPSBfcmVmMiRsYXJnZUFyY0ZsYWcgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmMiRsYXJnZUFyY0ZsYWcsXG4gICAgICBfcmVmMiRzd2VlcEZsYWcgPSBfcmVmMi5zd2VlcEZsYWcsXG4gICAgICBzd2VlcEZsYWcgPSBfcmVmMiRzd2VlcEZsYWcgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmMiRzd2VlcEZsYWc7XG5cbiAgdmFyIGN1cnZlcyA9IFtdO1xuXG4gIGlmIChyeCA9PT0gMCB8fCByeSA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBzaW5waGkgPSBNYXRoLnNpbih4QXhpc1JvdGF0aW9uICogVEFVIC8gMzYwKTtcbiAgdmFyIGNvc3BoaSA9IE1hdGguY29zKHhBeGlzUm90YXRpb24gKiBUQVUgLyAzNjApO1xuXG4gIHZhciBweHAgPSBjb3NwaGkgKiAocHggLSBjeCkgLyAyICsgc2lucGhpICogKHB5IC0gY3kpIC8gMjtcbiAgdmFyIHB5cCA9IC1zaW5waGkgKiAocHggLSBjeCkgLyAyICsgY29zcGhpICogKHB5IC0gY3kpIC8gMjtcblxuICBpZiAocHhwID09PSAwICYmIHB5cCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJ4ID0gTWF0aC5hYnMocngpO1xuICByeSA9IE1hdGguYWJzKHJ5KTtcblxuICB2YXIgbGFtYmRhID0gTWF0aC5wb3cocHhwLCAyKSAvIE1hdGgucG93KHJ4LCAyKSArIE1hdGgucG93KHB5cCwgMikgLyBNYXRoLnBvdyhyeSwgMik7XG5cbiAgaWYgKGxhbWJkYSA+IDEpIHtcbiAgICByeCAqPSBNYXRoLnNxcnQobGFtYmRhKTtcbiAgICByeSAqPSBNYXRoLnNxcnQobGFtYmRhKTtcbiAgfVxuXG4gIHZhciBfZ2V0QXJjQ2VudGVyID0gZ2V0QXJjQ2VudGVyKHB4LCBweSwgY3gsIGN5LCByeCwgcnksIGxhcmdlQXJjRmxhZywgc3dlZXBGbGFnLCBzaW5waGksIGNvc3BoaSwgcHhwLCBweXApLFxuICAgICAgX2dldEFyY0NlbnRlcjIgPSBfc2xpY2VkVG9BcnJheShfZ2V0QXJjQ2VudGVyLCA0KSxcbiAgICAgIGNlbnRlcnggPSBfZ2V0QXJjQ2VudGVyMlswXSxcbiAgICAgIGNlbnRlcnkgPSBfZ2V0QXJjQ2VudGVyMlsxXSxcbiAgICAgIGFuZzEgPSBfZ2V0QXJjQ2VudGVyMlsyXSxcbiAgICAgIGFuZzIgPSBfZ2V0QXJjQ2VudGVyMlszXTtcblxuICAvLyBJZiAnYW5nMicgPT0gOTAuMDAwMDAwMDAwMSwgdGhlbiBgcmF0aW9gIHdpbGwgZXZhbHVhdGUgdG9cbiAgLy8gMS4wMDAwMDAwMDAxLiBUaGlzIGNhdXNlcyBgc2VnbWVudHNgIHRvIGJlIGdyZWF0ZXIgdGhhbiBvbmUsIHdoaWNoIGlzIGFuXG4gIC8vIHVuZWNlc3Nhcnkgc3BsaXQsIGFuZCBhZGRzIGV4dHJhIHBvaW50cyB0byB0aGUgYmV6aWVyIGN1cnZlLiBUbyBhbGxldmlhdGVcbiAgLy8gdGhpcyBpc3N1ZSwgd2Ugcm91bmQgdG8gMS4wIHdoZW4gdGhlIHJhdGlvIGlzIGNsb3NlIHRvIDEuMC5cblxuXG4gIHZhciByYXRpbyA9IE1hdGguYWJzKGFuZzIpIC8gKFRBVSAvIDQpO1xuICBpZiAoTWF0aC5hYnMoMS4wIC0gcmF0aW8pIDwgMC4wMDAwMDAxKSB7XG4gICAgcmF0aW8gPSAxLjA7XG4gIH1cblxuICB2YXIgc2VnbWVudHMgPSBNYXRoLm1heChNYXRoLmNlaWwocmF0aW8pLCAxKTtcblxuICBhbmcyIC89IHNlZ21lbnRzO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2VnbWVudHM7IGkrKykge1xuICAgIGN1cnZlcy5wdXNoKGFwcHJveFVuaXRBcmMoYW5nMSwgYW5nMikpO1xuICAgIGFuZzEgKz0gYW5nMjtcbiAgfVxuXG4gIHJldHVybiBjdXJ2ZXMubWFwKGZ1bmN0aW9uIChjdXJ2ZSkge1xuICAgIHZhciBfbWFwVG9FbGxpcHNlID0gbWFwVG9FbGxpcHNlKGN1cnZlWzBdLCByeCwgcnksIGNvc3BoaSwgc2lucGhpLCBjZW50ZXJ4LCBjZW50ZXJ5KSxcbiAgICAgICAgeDEgPSBfbWFwVG9FbGxpcHNlLngsXG4gICAgICAgIHkxID0gX21hcFRvRWxsaXBzZS55O1xuXG4gICAgdmFyIF9tYXBUb0VsbGlwc2UyID0gbWFwVG9FbGxpcHNlKGN1cnZlWzFdLCByeCwgcnksIGNvc3BoaSwgc2lucGhpLCBjZW50ZXJ4LCBjZW50ZXJ5KSxcbiAgICAgICAgeDIgPSBfbWFwVG9FbGxpcHNlMi54LFxuICAgICAgICB5MiA9IF9tYXBUb0VsbGlwc2UyLnk7XG5cbiAgICB2YXIgX21hcFRvRWxsaXBzZTMgPSBtYXBUb0VsbGlwc2UoY3VydmVbMl0sIHJ4LCByeSwgY29zcGhpLCBzaW5waGksIGNlbnRlcngsIGNlbnRlcnkpLFxuICAgICAgICB4ID0gX21hcFRvRWxsaXBzZTMueCxcbiAgICAgICAgeSA9IF9tYXBUb0VsbGlwc2UzLnk7XG5cbiAgICByZXR1cm4geyB4MTogeDEsIHkxOiB5MSwgeDI6IHgyLCB5MjogeTIsIHg6IHgsIHk6IHkgfTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhcmNUb0JlemllcjsiLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciBwYXJzZSA9IHJlcXVpcmUoJ3BhcnNlLXN2Zy1wYXRoJylcclxudmFyIGFicyA9IHJlcXVpcmUoJ2Ficy1zdmctcGF0aCcpXHJcbnZhciBub3JtYWxpemUgPSByZXF1aXJlKCdub3JtYWxpemUtc3ZnLXBhdGgnKVxyXG52YXIgaXNTdmdQYXRoID0gcmVxdWlyZSgnaXMtc3ZnLXBhdGgnKVxyXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGF0aEJvdW5kc1xyXG5cclxuXHJcbmZ1bmN0aW9uIHBhdGhCb3VuZHMocGF0aCkge1xyXG4gIC8vIEVTNiBzdHJpbmcgdHBsIGNhbGxcclxuICBpZiAoQXJyYXkuaXNBcnJheShwYXRoKSAmJiBwYXRoLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgcGF0aFswXSA9PT0gJ3N0cmluZycpIHBhdGggPSBwYXRoWzBdXHJcblxyXG4gIC8vIHN2ZyBwYXRoIHN0cmluZ1xyXG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcclxuICAgIGFzc2VydChpc1N2Z1BhdGgocGF0aCksICdTdHJpbmcgaXMgbm90IGFuIFNWRyBwYXRoLicpXHJcbiAgICBwYXRoID0gcGFyc2UocGF0aClcclxuICB9XHJcblxyXG4gIGFzc2VydChBcnJheS5pc0FycmF5KHBhdGgpLCAnQXJndW1lbnQgc2hvdWxkIGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHBhdGggc2VnbWVudHMuJylcclxuXHJcbiAgcGF0aCA9IGFicyhwYXRoKVxyXG4gIHBhdGggPSBub3JtYWxpemUocGF0aClcclxuXHJcbiAgaWYgKCFwYXRoLmxlbmd0aCkgcmV0dXJuIFswLCAwLCAwLCAwXVxyXG5cclxuICB2YXIgYm91bmRzID0gW0luZmluaXR5LCBJbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHldXHJcblxyXG4gIGZvciAodmFyIGkgPSAwLCBsID0gcGF0aC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgIHZhciBwb2ludHMgPSBwYXRoW2ldLnNsaWNlKDEpXHJcblxyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBwb2ludHMubGVuZ3RoOyBqICs9IDIpIHtcclxuICAgICAgaWYgKHBvaW50c1tqICsgMF0gPCBib3VuZHNbMF0pIGJvdW5kc1swXSA9IHBvaW50c1tqICsgMF1cclxuICAgICAgaWYgKHBvaW50c1tqICsgMV0gPCBib3VuZHNbMV0pIGJvdW5kc1sxXSA9IHBvaW50c1tqICsgMV1cclxuICAgICAgaWYgKHBvaW50c1tqICsgMF0gPiBib3VuZHNbMl0pIGJvdW5kc1syXSA9IHBvaW50c1tqICsgMF1cclxuICAgICAgaWYgKHBvaW50c1tqICsgMV0gPiBib3VuZHNbM10pIGJvdW5kc1szXSA9IHBvaW50c1tqICsgMV1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBib3VuZHNcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplXHJcblxyXG52YXIgYXJjVG9DdXJ2ZSA9IHJlcXVpcmUoJ3N2Zy1hcmMtdG8tY3ViaWMtYmV6aWVyJylcclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoKXtcclxuICAvLyBpbml0IHN0YXRlXHJcbiAgdmFyIHByZXZcclxuICB2YXIgcmVzdWx0ID0gW11cclxuICB2YXIgYmV6aWVyWCA9IDBcclxuICB2YXIgYmV6aWVyWSA9IDBcclxuICB2YXIgc3RhcnRYID0gMFxyXG4gIHZhciBzdGFydFkgPSAwXHJcbiAgdmFyIHF1YWRYID0gbnVsbFxyXG4gIHZhciBxdWFkWSA9IG51bGxcclxuICB2YXIgeCA9IDBcclxuICB2YXIgeSA9IDBcclxuXHJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdGgubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIHZhciBzZWcgPSBwYXRoW2ldXHJcbiAgICB2YXIgY29tbWFuZCA9IHNlZ1swXVxyXG5cclxuICAgIHN3aXRjaCAoY29tbWFuZCkge1xyXG4gICAgICBjYXNlICdNJzpcclxuICAgICAgICBzdGFydFggPSBzZWdbMV1cclxuICAgICAgICBzdGFydFkgPSBzZWdbMl1cclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdBJzpcclxuICAgICAgICB2YXIgY3VydmVzID0gYXJjVG9DdXJ2ZSh7XHJcbiAgICAgICAgICBweDogeCxcclxuICAgICAgICAgIHB5OiB5LFxyXG4gICAgICAgICAgY3g6IHNlZ1s2XSxcclxuICAgICAgICAgIGN5OiAgc2VnWzddLFxyXG4gICAgICAgICAgcng6IHNlZ1sxXSxcclxuICAgICAgICAgIHJ5OiBzZWdbMl0sXHJcbiAgICAgICAgICB4QXhpc1JvdGF0aW9uOiBzZWdbM10sXHJcbiAgICAgICAgICBsYXJnZUFyY0ZsYWc6IHNlZ1s0XSxcclxuICAgICAgICAgIHN3ZWVwRmxhZzogc2VnWzVdXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gbnVsbC1jdXJ2ZXNcclxuICAgICAgICBpZiAoIWN1cnZlcy5sZW5ndGgpIGNvbnRpbnVlXHJcblxyXG4gICAgICAgIGZvciAodmFyIGogPSAwLCBjOyBqIDwgY3VydmVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBjID0gY3VydmVzW2pdXHJcbiAgICAgICAgICBzZWcgPSBbJ0MnLCBjLngxLCBjLnkxLCBjLngyLCBjLnkyLCBjLngsIGMueV1cclxuICAgICAgICAgIGlmIChqIDwgY3VydmVzLmxlbmd0aCAtIDEpIHJlc3VsdC5wdXNoKHNlZylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ1MnOlxyXG4gICAgICAgIC8vIGRlZmF1bHQgY29udHJvbCBwb2ludFxyXG4gICAgICAgIHZhciBjeCA9IHhcclxuICAgICAgICB2YXIgY3kgPSB5XHJcbiAgICAgICAgaWYgKHByZXYgPT0gJ0MnIHx8IHByZXYgPT0gJ1MnKSB7XHJcbiAgICAgICAgICBjeCArPSBjeCAtIGJlemllclggLy8gcmVmbGVjdCB0aGUgcHJldmlvdXMgY29tbWFuZCdzIGNvbnRyb2xcclxuICAgICAgICAgIGN5ICs9IGN5IC0gYmV6aWVyWSAvLyBwb2ludCByZWxhdGl2ZSB0byB0aGUgY3VycmVudCBwb2ludFxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWcgPSBbJ0MnLCBjeCwgY3ksIHNlZ1sxXSwgc2VnWzJdLCBzZWdbM10sIHNlZ1s0XV1cclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdUJzpcclxuICAgICAgICBpZiAocHJldiA9PSAnUScgfHwgcHJldiA9PSAnVCcpIHtcclxuICAgICAgICAgIHF1YWRYID0geCAqIDIgLSBxdWFkWCAvLyBhcyB3aXRoICdTJyByZWZsZWN0IHByZXZpb3VzIGNvbnRyb2wgcG9pbnRcclxuICAgICAgICAgIHF1YWRZID0geSAqIDIgLSBxdWFkWVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBxdWFkWCA9IHhcclxuICAgICAgICAgIHF1YWRZID0geVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWcgPSBxdWFkcmF0aWMoeCwgeSwgcXVhZFgsIHF1YWRZLCBzZWdbMV0sIHNlZ1syXSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdRJzpcclxuICAgICAgICBxdWFkWCA9IHNlZ1sxXVxyXG4gICAgICAgIHF1YWRZID0gc2VnWzJdXHJcbiAgICAgICAgc2VnID0gcXVhZHJhdGljKHgsIHksIHNlZ1sxXSwgc2VnWzJdLCBzZWdbM10sIHNlZ1s0XSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdMJzpcclxuICAgICAgICBzZWcgPSBsaW5lKHgsIHksIHNlZ1sxXSwgc2VnWzJdKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ0gnOlxyXG4gICAgICAgIHNlZyA9IGxpbmUoeCwgeSwgc2VnWzFdLCB5KVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ1YnOlxyXG4gICAgICAgIHNlZyA9IGxpbmUoeCwgeSwgeCwgc2VnWzFdKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ1onOlxyXG4gICAgICAgIHNlZyA9IGxpbmUoeCwgeSwgc3RhcnRYLCBzdGFydFkpXHJcbiAgICAgICAgYnJlYWtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgc3RhdGVcclxuICAgIHByZXYgPSBjb21tYW5kXHJcbiAgICB4ID0gc2VnW3NlZy5sZW5ndGggLSAyXVxyXG4gICAgeSA9IHNlZ1tzZWcubGVuZ3RoIC0gMV1cclxuICAgIGlmIChzZWcubGVuZ3RoID4gNCkge1xyXG4gICAgICBiZXppZXJYID0gc2VnW3NlZy5sZW5ndGggLSA0XVxyXG4gICAgICBiZXppZXJZID0gc2VnW3NlZy5sZW5ndGggLSAzXVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmV6aWVyWCA9IHhcclxuICAgICAgYmV6aWVyWSA9IHlcclxuICAgIH1cclxuICAgIHJlc3VsdC5wdXNoKHNlZylcclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHRcclxufVxyXG5cclxuZnVuY3Rpb24gbGluZSh4MSwgeTEsIHgyLCB5Mil7XHJcbiAgcmV0dXJuIFsnQycsIHgxLCB5MSwgeDIsIHkyLCB4MiwgeTJdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHF1YWRyYXRpYyh4MSwgeTEsIGN4LCBjeSwgeDIsIHkyKXtcclxuICByZXR1cm4gW1xyXG4gICAgJ0MnLFxyXG4gICAgeDEvMyArICgyLzMpICogY3gsXHJcbiAgICB5MS8zICsgKDIvMykgKiBjeSxcclxuICAgIHgyLzMgKyAoMi8zKSAqIGN4LFxyXG4gICAgeTIvMyArICgyLzMpICogY3ksXHJcbiAgICB4MixcclxuICAgIHkyXHJcbiAgXVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIHBhdGhCb3VuZHMgPSByZXF1aXJlKCdzdmctcGF0aC1ib3VuZHMnKVxyXG52YXIgcGFyc2VQYXRoID0gcmVxdWlyZSgncGFyc2Utc3ZnLXBhdGgnKVxyXG52YXIgZHJhd1BhdGggPSByZXF1aXJlKCdkcmF3LXN2Zy1wYXRoJylcclxudmFyIGlzU3ZnUGF0aCA9IHJlcXVpcmUoJ2lzLXN2Zy1wYXRoJylcclxudmFyIGJpdG1hcFNkZiA9IHJlcXVpcmUoJ2JpdG1hcC1zZGYnKVxyXG5cclxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcbnZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGF0aFNkZlxyXG5cclxuXHJcbmZ1bmN0aW9uIHBhdGhTZGYgKHBhdGgsIG9wdGlvbnMpIHtcclxuXHRpZiAoIWlzU3ZnUGF0aChwYXRoKSkgdGhyb3cgRXJyb3IoJ0FyZ3VtZW50IHNob3VsZCBiZSB2YWxpZCBzdmcgcGF0aCBzdHJpbmcnKVxyXG5cclxuXHRpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxyXG5cclxuXHR2YXIgdywgaFxyXG5cdGlmIChvcHRpb25zLnNoYXBlKSB7XHJcblx0XHR3ID0gb3B0aW9ucy5zaGFwZVswXVxyXG5cdFx0aCA9IG9wdGlvbnMuc2hhcGVbMV1cclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHR3ID0gY2FudmFzLndpZHRoID0gb3B0aW9ucy53IHx8IG9wdGlvbnMud2lkdGggfHwgMjAwXHJcblx0XHRoID0gY2FudmFzLmhlaWdodCA9IG9wdGlvbnMuaCB8fCBvcHRpb25zLmhlaWdodCB8fCAyMDBcclxuXHR9XHJcblx0dmFyIHNpemUgPSBNYXRoLm1pbih3LCBoKVxyXG5cclxuXHR2YXIgc3Ryb2tlID0gb3B0aW9ucy5zdHJva2UgfHwgMFxyXG5cclxuXHR2YXIgdmlld2JveCA9IG9wdGlvbnMudmlld2JveCB8fCBvcHRpb25zLnZpZXdCb3ggfHwgcGF0aEJvdW5kcyhwYXRoKVxyXG5cdHZhciBzY2FsZSA9IFt3IC8gKHZpZXdib3hbMl0gLSB2aWV3Ym94WzBdKSwgaCAvICh2aWV3Ym94WzNdIC0gdmlld2JveFsxXSldXHJcblx0dmFyIG1heFNjYWxlID0gTWF0aC5taW4oc2NhbGVbMF0gfHwgMCwgc2NhbGVbMV0gfHwgMCkgLyAyXHJcblxyXG5cdC8vY2xlYXIgY3R4XHJcblx0Y3R4LmZpbGxTdHlsZSA9ICdibGFjaydcclxuXHRjdHguZmlsbFJlY3QoMCwgMCwgdywgaClcclxuXHJcblx0Y3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSdcclxuXHJcblx0aWYgKHN0cm9rZSlcdHtcclxuXHRcdGlmICh0eXBlb2Ygc3Ryb2tlICE9ICdudW1iZXInKSBzdHJva2UgPSAxXHJcblx0XHRpZiAoc3Ryb2tlID4gMCkge1xyXG5cdFx0XHRjdHguc3Ryb2tlU3R5bGUgPSAnd2hpdGUnXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y3R4LnN0cm9rZVN0eWxlID0gJ2JsYWNrJ1xyXG5cdFx0fVxyXG5cclxuXHRcdGN0eC5saW5lV2lkdGggPSBNYXRoLmFicyhzdHJva2UpXHJcblx0fVxyXG5cclxuXHRjdHgudHJhbnNsYXRlKHcgKiAuNSwgaCAqIC41KVxyXG5cdGN0eC5zY2FsZShtYXhTY2FsZSwgbWF4U2NhbGUpXHJcblxyXG5cdC8vaWYgY2FudmFzIHN2ZyBwYXRocyBhcGkgaXMgYXZhaWxhYmxlXHJcblx0aWYgKGlzUGF0aDJEU3VwcG9ydGVkKCkpIHtcclxuXHRcdHZhciBwYXRoMmQgPSBuZXcgUGF0aDJEKHBhdGgpXHJcblx0XHRjdHguZmlsbChwYXRoMmQpXHJcblx0XHRzdHJva2UgJiYgY3R4LnN0cm9rZShwYXRoMmQpXHJcblx0fVxyXG5cdC8vZmFsbGJhY2sgdG8gYmV6aWVyLWN1cnZlc1xyXG5cdGVsc2Uge1xyXG5cdFx0dmFyIHNlZ21lbnRzID0gcGFyc2VQYXRoKHBhdGgpXHJcblx0XHRkcmF3UGF0aChjdHgsIHNlZ21lbnRzKVxyXG5cdFx0Y3R4LmZpbGwoKVxyXG5cdFx0c3Ryb2tlICYmIGN0eC5zdHJva2UoKVxyXG5cdH1cclxuXHJcblx0Y3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcclxuXHJcblx0dmFyIGRhdGEgPSBiaXRtYXBTZGYoY3R4LCB7XHJcblx0XHRjdXRvZmY6IG9wdGlvbnMuY3V0b2ZmICE9IG51bGwgPyBvcHRpb25zLmN1dG9mZiA6IC41LFxyXG5cdFx0cmFkaXVzOiBvcHRpb25zLnJhZGl1cyAhPSBudWxsID8gb3B0aW9ucy5yYWRpdXMgOiBzaXplICogLjVcclxuXHR9KVxyXG5cclxuXHRyZXR1cm4gZGF0YVxyXG59XHJcblxyXG52YXIgcGF0aDJEU3VwcG9ydGVkXHJcblxyXG5mdW5jdGlvbiBpc1BhdGgyRFN1cHBvcnRlZCAoKSB7XHJcblx0aWYgKHBhdGgyRFN1cHBvcnRlZCAhPSBudWxsKSByZXR1cm4gcGF0aDJEU3VwcG9ydGVkXHJcblxyXG5cdHZhciBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpXHJcblx0Y3R4LmNhbnZhcy53aWR0aCA9IGN0eC5jYW52YXMuaGVpZ2h0ID0gMVxyXG5cclxuXHRpZiAoIXdpbmRvdy5QYXRoMkQpIHJldHVybiBwYXRoMkRTdXBwb3J0ZWQgPSBmYWxzZVxyXG5cclxuXHR2YXIgcGF0aCA9IG5ldyBQYXRoMkQoJ00wLDBoMXYxaC0xdi0xWicpXHJcblxyXG5cdGN0eC5maWxsU3R5bGUgPSAnYmxhY2snXHJcblx0Y3R4LmZpbGwocGF0aClcclxuXHJcblx0dmFyIGlkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLDAsMSwxKVxyXG5cclxuXHRyZXR1cm4gcGF0aDJEU3VwcG9ydGVkID0gaWRhdGEgJiYgaWRhdGEuZGF0YSAmJiBpZGF0YS5kYXRhWzNdID09PSAyNTVcclxufVxyXG4iLCIvKiBAbW9kdWxlIHRvLWZsb2F0MzIgKi9cclxuXHJcbid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmbG9hdDMyXHJcbm1vZHVsZS5leHBvcnRzLmZsb2F0MzIgPVxyXG5tb2R1bGUuZXhwb3J0cy5mbG9hdCA9IGZsb2F0MzJcclxubW9kdWxlLmV4cG9ydHMuZnJhY3QzMiA9XHJcbm1vZHVsZS5leHBvcnRzLmZyYWN0ID0gZnJhY3QzMlxyXG5cclxudmFyIG5hcnIgPSBuZXcgRmxvYXQzMkFycmF5KDEpXHJcblxyXG4vLyByZXR1cm4gZnJhY3Rpb25hbCBwYXJ0IG9mIGZsb2F0MzIgYXJyYXlcclxuZnVuY3Rpb24gZnJhY3QzMiAoYXJyKSB7XHJcblx0aWYgKGFyci5sZW5ndGgpIHtcclxuXHRcdHZhciBmcmFjdCA9IGZsb2F0MzIoYXJyKVxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBmcmFjdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0ZnJhY3RbaV0gPSBhcnJbaV0gLSBmcmFjdFtpXVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZyYWN0XHJcblx0fVxyXG5cclxuXHQvLyBudW1iZXJcclxuXHRyZXR1cm4gZmxvYXQzMihhcnIgLSBmbG9hdDMyKGFycikpXHJcbn1cclxuXHJcbi8vIG1ha2Ugc3VyZSBkYXRhIGlzIGZsb2F0MzIgYXJyYXlcclxuZnVuY3Rpb24gZmxvYXQzMiAoYXJyKSB7XHJcblx0aWYgKGFyci5sZW5ndGgpIHtcclxuXHRcdGlmIChhcnIgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpIHJldHVybiBhcnJcclxuXHRcdHZhciBmbG9hdCA9IG5ldyBGbG9hdDMyQXJyYXkoYXJyKVxyXG5cdFx0ZmxvYXQuc2V0KGFycilcclxuXHRcdHJldHVybiBmbG9hdFxyXG5cdH1cclxuXHJcblx0Ly8gbnVtYmVyXHJcblx0bmFyclswXSA9IGFyclxyXG5cdHJldHVybiBuYXJyWzBdXHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoXCIuLi9wcm90b3R5cGUvaXNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXG5cdGlmICghaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgXCJsZW5ndGhcIikpIHJldHVybiBmYWxzZTtcblxuXHR0cnkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUubGVuZ3RoICE9PSBcIm51bWJlclwiKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZS5jYWxsICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0XHRpZiAodHlwZW9mIHZhbHVlLmFwcGx5ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gIWlzUHJvdG90eXBlKHZhbHVlKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzVmFsdWUgICAgICAgPSByZXF1aXJlKFwiLi4vdmFsdWUvaXNcIilcbiAgLCBpc09iamVjdCAgICAgID0gcmVxdWlyZShcIi4uL29iamVjdC9pc1wiKVxuICAsIHN0cmluZ0NvZXJjZSAgPSByZXF1aXJlKFwiLi4vc3RyaW5nL2NvZXJjZVwiKVxuICAsIHRvU2hvcnRTdHJpbmcgPSByZXF1aXJlKFwiLi90by1zaG9ydC1zdHJpbmdcIik7XG5cbnZhciByZXNvbHZlTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlLCB2YWx1ZSkge1xuXHRyZXR1cm4gbWVzc2FnZS5yZXBsYWNlKFwiJXZcIiwgdG9TaG9ydFN0cmluZyh2YWx1ZSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIGRlZmF1bHRNZXNzYWdlLCBpbnB1dE9wdGlvbnMpIHtcblx0aWYgKCFpc09iamVjdChpbnB1dE9wdGlvbnMpKSB0aHJvdyBuZXcgVHlwZUVycm9yKHJlc29sdmVNZXNzYWdlKGRlZmF1bHRNZXNzYWdlLCB2YWx1ZSkpO1xuXHRpZiAoIWlzVmFsdWUodmFsdWUpKSB7XG5cdFx0aWYgKFwiZGVmYXVsdFwiIGluIGlucHV0T3B0aW9ucykgcmV0dXJuIGlucHV0T3B0aW9uc1tcImRlZmF1bHRcIl07XG5cdFx0aWYgKGlucHV0T3B0aW9ucy5pc09wdGlvbmFsKSByZXR1cm4gbnVsbDtcblx0fVxuXHR2YXIgZXJyb3JNZXNzYWdlID0gc3RyaW5nQ29lcmNlKGlucHV0T3B0aW9ucy5lcnJvck1lc3NhZ2UpO1xuXHRpZiAoIWlzVmFsdWUoZXJyb3JNZXNzYWdlKSkgZXJyb3JNZXNzYWdlID0gZGVmYXVsdE1lc3NhZ2U7XG5cdHRocm93IG5ldyBUeXBlRXJyb3IocmVzb2x2ZU1lc3NhZ2UoZXJyb3JNZXNzYWdlLCB2YWx1ZSkpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHR0cnkge1xuXHRcdHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHRyeSB7IHJldHVybiBTdHJpbmcodmFsdWUpOyB9XG5cdFx0Y2F0Y2ggKGVycm9yMikgeyByZXR1cm4gbnVsbDsgfVxuXHR9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzYWZlVG9TdHJpbmcgPSByZXF1aXJlKFwiLi9zYWZlLXRvLXN0cmluZ1wiKTtcblxudmFyIHJlTmV3TGluZSA9IC9bXFxuXFxyXFx1MjAyOFxcdTIwMjldL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdHZhciBzdHJpbmcgPSBzYWZlVG9TdHJpbmcodmFsdWUpO1xuXHRpZiAoc3RyaW5nID09PSBudWxsKSByZXR1cm4gXCI8Tm9uLWNvZXJjaWJsZSB0byBzdHJpbmcgdmFsdWU+XCI7XG5cdC8vIFRyaW0gaWYgdG9vIGxvbmdcblx0aWYgKHN0cmluZy5sZW5ndGggPiAxMDApIHN0cmluZyA9IHN0cmluZy5zbGljZSgwLCA5OSkgKyBcIuKAplwiO1xuXHQvLyBSZXBsYWNlIGV2ZW50dWFsIG5ldyBsaW5lc1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZU5ld0xpbmUsIGZ1bmN0aW9uIChjaGFyKSB7XG5cdFx0c3dpdGNoIChjaGFyKSB7XG5cdFx0XHRjYXNlIFwiXFxuXCI6XG5cdFx0XHRcdHJldHVybiBcIlxcXFxuXCI7XG5cdFx0XHRjYXNlIFwiXFxyXCI6XG5cdFx0XHRcdHJldHVybiBcIlxcXFxyXCI7XG5cdFx0XHRjYXNlIFwiXFx1MjAyOFwiOlxuXHRcdFx0XHRyZXR1cm4gXCJcXFxcdTIwMjhcIjtcblx0XHRcdGNhc2UgXCJcXHUyMDI5XCI6XG5cdFx0XHRcdHJldHVybiBcIlxcXFx1MjAyOVwiO1xuXHRcdFx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgY2hhcmFjdGVyXCIpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBzdHJpbmc7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1ZhbHVlID0gcmVxdWlyZShcIi4uL3ZhbHVlL2lzXCIpO1xuXG4vLyBwcmV0dGllci1pZ25vcmVcbnZhciBwb3NzaWJsZVR5cGVzID0geyBcIm9iamVjdFwiOiB0cnVlLCBcImZ1bmN0aW9uXCI6IHRydWUsIFwidW5kZWZpbmVkXCI6IHRydWUgLyogZG9jdW1lbnQuYWxsICovIH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICghaXNWYWx1ZSh2YWx1ZSkpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwocG9zc2libGVUeXBlcywgdHlwZW9mIHZhbHVlKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHJlc29sdmVFeGNlcHRpb24gPSByZXF1aXJlKFwiLi4vbGliL3Jlc29sdmUtZXhjZXB0aW9uXCIpXG4gICwgaXMgICAgICAgICAgICAgICA9IHJlcXVpcmUoXCIuL2lzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZS8qLCBvcHRpb25zKi8pIHtcblx0aWYgKGlzKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuXHRyZXR1cm4gcmVzb2x2ZUV4Y2VwdGlvbih2YWx1ZSwgXCIldiBpcyBub3QgYSBwbGFpbiBmdW5jdGlvblwiLCBhcmd1bWVudHNbMV0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoXCIuLi9mdW5jdGlvbi9pc1wiKTtcblxudmFyIGNsYXNzUmUgPSAvXlxccypjbGFzc1tcXHN7L31dLywgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKCFpc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuXHRpZiAoY2xhc3NSZS50ZXN0KGZ1bmN0aW9uVG9TdHJpbmcuY2FsbCh2YWx1ZSkpKSByZXR1cm4gZmFsc2U7XG5cdHJldHVybiB0cnVlO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKFwiLi4vb2JqZWN0L2lzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRpZiAoIWlzT2JqZWN0KHZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuXHR0cnkge1xuXHRcdGlmICghdmFsdWUuY29uc3RydWN0b3IpIHJldHVybiBmYWxzZTtcblx0XHRyZXR1cm4gdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzVmFsdWUgID0gcmVxdWlyZShcIi4uL3ZhbHVlL2lzXCIpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKFwiLi4vb2JqZWN0L2lzXCIpO1xuXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRpZiAoIWlzVmFsdWUodmFsdWUpKSByZXR1cm4gbnVsbDtcblx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdC8vIFJlamVjdCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nIGNvZXJjaW9uXG5cdFx0dmFyIHZhbHVlVG9TdHJpbmcgPSB2YWx1ZS50b1N0cmluZztcblx0XHRpZiAodHlwZW9mIHZhbHVlVG9TdHJpbmcgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG5cdFx0aWYgKHZhbHVlVG9TdHJpbmcgPT09IG9iamVjdFRvU3RyaW5nKSByZXR1cm4gbnVsbDtcblx0XHQvLyBOb3RlOiBJdCBjYW4gYmUgb2JqZWN0IGNvbWluZyBmcm9tIG90aGVyIHJlYWxtLCBzdGlsbCBhcyB0aGVyZSdzIG5vIEVTMyBhbmQgQ1NQIGNvbXBsaWFudFxuXHRcdC8vIHdheSB0byByZXNvbHZlIGl0cyByZWFsbSdzIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgaXQncyBsZWZ0IGFzIG5vdCBhZGRyZXNzZWQgZWRnZSBjYXNlXG5cdH1cblx0dHJ5IHtcblx0XHRyZXR1cm4gXCJcIiArIHZhbHVlOyAvLyBFbnN1cmUgaW1wbGljaXQgY29lcmNpb25cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgcmVzb2x2ZUV4Y2VwdGlvbiA9IHJlcXVpcmUoXCIuLi9saWIvcmVzb2x2ZS1leGNlcHRpb25cIilcbiAgLCBpcyAgICAgICAgICAgICAgID0gcmVxdWlyZShcIi4vaXNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlLyosIG9wdGlvbnMqLykge1xuXHRpZiAoaXModmFsdWUpKSByZXR1cm4gdmFsdWU7XG5cdHJldHVybiByZXNvbHZlRXhjZXB0aW9uKHZhbHVlLCBcIkNhbm5vdCB1c2UgJXZcIiwgYXJndW1lbnRzWzFdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gRVMzIHNhZmVcbnZhciBfdW5kZWZpbmVkID0gdm9pZCAwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgIT09IF91bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGw7IH07XG4iLCIvKipcclxuICogQG1vZHVsZSB1cGRhdGUtZGlmZlxyXG4gKi9cclxuXHJcbid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB1cGRhdGVEaWZmIChvYmosIGRpZmYsIG1hcHBlcnMpIHtcclxuXHRpZiAoIUFycmF5LmlzQXJyYXkobWFwcGVycykpIG1hcHBlcnMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMilcclxuXHJcblx0Zm9yICh2YXIgaSA9IDAsIGwgPSBtYXBwZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG5cdFx0dmFyIGRpY3QgPSBtYXBwZXJzW2ldXHJcblx0XHRmb3IgKHZhciBwcm9wIGluIGRpY3QpIHtcclxuXHRcdFx0aWYgKGRpZmZbcHJvcF0gIT09IHVuZGVmaW5lZCAmJiAhQXJyYXkuaXNBcnJheShkaWZmW3Byb3BdKSAmJiBvYmpbcHJvcF0gPT09IGRpZmZbcHJvcF0pIGNvbnRpbnVlXHJcblxyXG5cdFx0XHRpZiAocHJvcCBpbiBkaWZmKSB7XHJcblx0XHRcdFx0dmFyIHJlc3VsdFxyXG5cclxuXHRcdFx0XHRpZiAoZGljdFtwcm9wXSA9PT0gdHJ1ZSkgcmVzdWx0ID0gZGlmZltwcm9wXVxyXG5cdFx0XHRcdGVsc2UgaWYgKGRpY3RbcHJvcF0gPT09IGZhbHNlKSBjb250aW51ZVxyXG5cdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkaWN0W3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRyZXN1bHQgPSBkaWN0W3Byb3BdKGRpZmZbcHJvcF0sIG9iaiwgZGlmZilcclxuXHRcdFx0XHRcdGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkgY29udGludWVcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdG9ialtwcm9wXSA9IHJlc3VsdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gb2JqXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==