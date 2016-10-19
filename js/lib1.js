var lib1 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Vue.js v1.0.28
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj._digest();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delimited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([^-])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && UA.indexOf('trident') > 0;
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/* istanbul ignore next */
	function isNative(Ctor) {
	  return (/native code/.test(Ctor.toString())
	  );
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc = undefined;

	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var noop = function noop() {};
	    timerFunc = function () {
	      p.then(nextTickHandler);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) setTimeout(noop);
	    };
	  } else if (typeof MutationObserver !== 'undefined') {
	    // use MutationObserver where native Promise is not available,
	    // e.g. IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = setTimeout;
	  }

	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	var _Set = undefined;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = function () {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;

	  var entry = this.get(key, true);
	  if (!entry) {
	    if (this.size === this.limit) {
	      removed = this.shift();
	    }
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var len;
	var index;
	var chr;
	var state;
	var startState = 0;
	var filterState = 1;
	var filterNameState = 2;
	var filterArgState = 3;

	var doubleChr = 0x22;
	var singleChr = 0x27;
	var pipeChr = 0x7C;
	var escapeChr = 0x5C;
	var spaceChr = 0x20;

	var expStartChr = { 0x5B: 1, 0x7B: 1, 0x28: 1 };
	var expChrPair = { 0x5B: 0x5D, 0x7B: 0x7D, 0x28: 0x29 };

	function peek() {
	  return str.charCodeAt(index + 1);
	}

	function next() {
	  return str.charCodeAt(++index);
	}

	function eof() {
	  return index >= len;
	}

	function eatSpace() {
	  while (peek() === spaceChr) {
	    next();
	  }
	}

	function isStringStart(chr) {
	  return chr === doubleChr || chr === singleChr;
	}

	function isExpStart(chr) {
	  return expStartChr[chr];
	}

	function isExpEnd(start, chr) {
	  return expChrPair[start] === chr;
	}

	function parseString() {
	  var stringQuote = next();
	  var chr;
	  while (!eof()) {
	    chr = next();
	    // escape char
	    if (chr === escapeChr) {
	      next();
	    } else if (chr === stringQuote) {
	      break;
	    }
	  }
	}

	function parseSpecialExp(chr) {
	  var inExp = 0;
	  var startChr = chr;

	  while (!eof()) {
	    chr = peek();
	    if (isStringStart(chr)) {
	      parseString();
	      continue;
	    }

	    if (startChr === chr) {
	      inExp++;
	    }
	    if (isExpEnd(startChr, chr)) {
	      inExp--;
	    }

	    next();

	    if (inExp === 0) {
	      break;
	    }
	  }
	}

	/**
	 * syntax:
	 * expression | filterName  [arg  arg [| filterName arg arg]]
	 */

	function parseExpression() {
	  var start = index;
	  while (!eof()) {
	    chr = peek();
	    if (isStringStart(chr)) {
	      parseString();
	    } else if (isExpStart(chr)) {
	      parseSpecialExp(chr);
	    } else if (chr === pipeChr) {
	      next();
	      chr = peek();
	      if (chr === pipeChr) {
	        next();
	      } else {
	        if (state === startState || state === filterArgState) {
	          state = filterState;
	        }
	        break;
	      }
	    } else if (chr === spaceChr && (state === filterNameState || state === filterArgState)) {
	      eatSpace();
	      break;
	    } else {
	      if (state === filterState) {
	        state = filterNameState;
	      }
	      next();
	    }
	  }

	  return str.slice(start + 1, index) || null;
	}

	function parseFilterList() {
	  var filters = [];
	  while (!eof()) {
	    filters.push(parseFilter());
	  }
	  return filters;
	}

	function parseFilter() {
	  var filter = {};
	  var args;

	  state = filterState;
	  filter.name = parseExpression().trim();

	  state = filterArgState;
	  args = parseFilterArguments();

	  if (args.length) {
	    filter.args = args;
	  }
	  return filter;
	}

	function parseFilterArguments() {
	  var args = [];
	  while (!eof() && state !== filterState) {
	    var arg = parseExpression();
	    if (!arg) {
	      break;
	    }
	    args.push(processFilterArg(arg));
	  }

	  return args;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  dir = {};
	  len = str.length;
	  index = -1;
	  chr = '';
	  state = startState;

	  var filters;

	  if (str.indexOf('|') < 0) {
	    dir.expression = str.trim();
	  } else {
	    dir.expression = parseExpression().trim();
	    filters = parseFilterList();
	    if (filters.length) {
	      dir.filters = filters;
	    }
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;
	var formatComponentName = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';

	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };

	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  if (!node) return false;
	  var doc = node.ownerDocument.documentElement;
	  var parent = node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;

	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        // Firefox returns unknown for some "Interactive elements."
	        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el, options);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el, options);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function getIsBinding(el, options) {
	  // dynamic syntax
	  var exp = el.getAttribute('is');
	  if (exp != null) {
	    if (resolveAsset(options, 'components', exp)) {
	      el.removeAttribute('is');
	      return { id: exp };
	    }
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  if (process.env.NODE_ENV !== 'production') {
	    if (child.propsData && !vm) {
	      warn('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child['extends']) {
	    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
	      parent = mergeOptions(parent, mixinOptions, vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */

	var shouldConvert = true;

	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE: isIE,
		isIE9: isIE9,
		isAndroid: isAndroid,
		isIOS: isIOS,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		get _Set () { return _Set; },
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to register itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initData().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression$1(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression$1(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\"']|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

	function noop() {}

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here because the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
	      } else {
	        warn('Invalid expression. ' + 'Generated function body: ' + body);
	      }
	    }
	    return noop;
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression$1(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat literal values as paths
	  !literalValueRE$1.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression$1,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue.length = 0;
	  userQueue.length = 0;
	  has = {};
	  circular = {};
	  waiting = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  var _again = true;

	  _function: while (_again) {
	    _again = false;

	    runBatcherQueue(queue);
	    runBatcherQueue(userQueue);
	    // user watchers triggered more watchers,
	    // keep flushing until it depletes
	    if (queue.length) {
	      _again = true;
	      continue _function;
	    }
	    // dev tool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	    resetBatcherState();
	  }
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	  queue.length = 0;
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression$1(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	var seenObjects = new _Set();
	function traverse(val, seen) {
	  var i = undefined,
	      keys = undefined;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = isArray(val);
	  var isO = isObject(val);
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) traverse(val[i], seen);
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]], seen);
	    }
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;
	var commentRE = /<!--/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	  var commentMatch = commentRE.test(templateString);

	  if (!tagMatch && !entityMatch && !commentMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment. However, iOS Safari has
	  // bug when using directly cloned template content with touch
	  // events and can cause crashes when the nodes are removed from DOM, so we
	  // have to treat template elements as string templates. (#2805)
	  /* istanbul ignore if */
	  if (isRealTemplate(node)) {
	    return stringToFragment(node.innerHTML);
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,
	  terminal: true,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('v-if')) {
	      warn('<' + this.el.tagName.toLowerCase() + ' v-for="' + this.expression + '" v-if="' + this.el.getAttribute('v-if') + '">: ' + 'Using v-if and v-for on the same element is not recommended - ' + 'consider filtering the source Array instead.', this.vm);
	    }

	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new instance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      var target = prevEl.nextSibling;
	      /* istanbul ignore if */
	      if (!target) {
	        // reset end anchor position in case the position was messed up
	        // by an external drag-n-drop library.
	        after(this.end, prevEl);
	        target = this.end;
	      }
	      frag.before(target);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = getTrackByKey(index, key, value, trackByKey);
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else if (Object.isExtensible(value)) {
	        def(value, id, frag);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * watcher's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	/**
	 * Get the track by key for an item.
	 *
	 * @param {Number} index
	 * @param {String} key
	 * @param {*} value
	 * @param {String} [trackByKey]
	 */

	function getTrackByKey(index, key, value, trackByKey) {
	  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	var vIf = {

	  priority: IF,
	  terminal: true,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    // #3029 only update when the value changes. This prevent
	    // browsers from overwriting values like selectionStart
	    value = _toString(value);
	    if (value !== this.el.value) this.el.value = value;
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var _this = this;

	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', function () {
	      nextTick(_this.forceUpdate);
	    });
	    if (!inDoc(el)) {
	      nextTick(this.forceUpdate);
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.get();
	      if (isArray(model)) {
	        var val = self.getValue();
	        var i = indexOf(model, val);
	        if (el.checked) {
	          if (i < 0) {
	            self.set(model.concat(val));
	          }
	        } else if (i > -1) {
	          self.set(model.slice(0, i).concat(model.slice(i + 1)));
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  if (camel !== 'filter' && camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;

	      if (el[attr] !== attrValue) {
	        el[attr] = attrValue;
	      }
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// logic control
	// two-way binding
	// event handling
	// attributes
	// ref & el
	// cloak
	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (!value) {
	      this.cleanup();
	    } else if (typeof value === 'string') {
	      this.setClass(value.trim().split(/\s+/));
	    } else {
	      this.setClass(normalize$1(value));
	    }
	  },

	  setClass: function setClass(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val) {
	        apply(this.el, val, addClass);
	      }
	    }
	    this.prevKeys = value;
	  },

	  cleanup: function cleanup(value) {
	    var prevKeys = this.prevKeys;
	    if (!prevKeys) return;
	    var i = prevKeys.length;
	    while (i--) {
	      var key = prevKeys[i];
	      if (!value || value.indexOf(key) < 0) {
	        apply(this.el, key, removeClass);
	      }
	    }
	  }
	};

	/**
	 * Normalize objects and arrays (potentially containing objects)
	 * into array of strings.
	 *
	 * @param {Object|Array<String|Object>} value
	 * @return {Array<String>}
	 */

	function normalize$1(value) {
	  var res = [];
	  if (isArray(value)) {
	    for (var i = 0, l = value.length; i < l; i++) {
	      var _key = value[i];
	      if (_key) {
	        if (typeof _key === 'string') {
	          res.push(_key);
	        } else {
	          for (var k in _key) {
	            if (_key[k]) res.push(k);
	          }
	        }
	      }
	    }
	  } else if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) res.push(key);
	    }
	  }
	  return res;
	}

	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */

	function apply(el, key, fn) {
	  key = key.trim();
	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }
	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      this.el.removeAttribute(':is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var propsData = vm.$options.propsData;
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (propsData && (value = propsData[name] || propsData[path]) !== null) {
	      // has propsData
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required && (!propsData || !(name in propsData) && !(path in propsData))) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var inlineProps = vm.$options.propsData;
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (inlineProps && hasOwn(inlineProps, path)) {
	        initProp(vm, prop, inlineProps[path]);
	      }if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */

	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value, vm);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}

	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */

	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */

	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value, vm) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  if (typeof coerce === 'function') {
	    return coerce(value);
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
	    return value;
	  }
	}

	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */

	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}

	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */

	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}

	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */

	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  var _this = this;

	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    oldId = oldId || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    removeClass(el, oldId + '-transition');
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  sortDirectives(dirs);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * sort directives by priority (stable sort)
	 *
	 * @param {Array} dirs
	 */
	function sortDirectives(dirs) {
	  if (dirs.length === 0) return;

	  var groupedMap = {};
	  var i, j, k, l;
	  var index = 0;
	  var priorities = [];
	  for (i = 0, j = dirs.length; i < j; i++) {
	    var dir = dirs[i];
	    var priority = dir.descriptor.def.priority || DEFAULT_PRIORITY;
	    var array = groupedMap[priority];
	    if (!array) {
	      array = groupedMap[priority] = [];
	      priorities.push(priority);
	    }
	    array.push(dir);
	  }

	  priorities.sort(function (a, b) {
	    return a > b ? -1 : a === b ? 0 : 1;
	  });
	  for (i = 0, j = priorities.length; i < j; i++) {
	    var group = groupedMap[priorities[i]];
	    for (k = 0, l = group.length; k < l; k++) {
	      dirs[index++] = group[k];
	    }
	  }
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;

	      var componentName = options.el.tagName.toLowerCase();
	      if (componentName === 'component' && options.name) {
	        componentName += ':' + options.name;
	      }

	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + componentName + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && !isScript(node)) {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    // a textarea which has v-pre attr should skip complie.
	    if (getAttr(el, 'v-pre') !== null) {
	      return skip;
	    }
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = _toString(value);
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }

	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          modifiers = parseModifiers(attr.name);
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }

	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for, v-if and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	function isScript(el) {
	  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    if (!replacer) {
	      return frag;
	    }
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    var nodes = content.childNodes;
	    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	      return;
	    }
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node, true);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key)) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, value, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        // force the expression into a statement so that
	        // it always dynamically resolves the method to call (#2670)
	        // kinda ugly hack, but does the job.
	        value = attrs[i].value;
	        if (isSimplePath(value)) {
	          value += '.apply(this, $arguments)';
	        }
	        handler = (vm._scope || vm._context).$eval(value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop$1() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop$1;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression$1(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // resolve slot distribution
	    resolveSlots(this, options._content);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data && this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    /* istanbul ignore if */
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression$1(exp);
	    if (res) {
	      if (asStatement) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression$1(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Order filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */

	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);

	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }

	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }

	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }

	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   * @param {Number} decimals Decimal places
	   */

	  currency: function currency(value, _currency, decimals) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    decimals = decimals != null ? decimals : 2;
	    var stringified = Math.abs(value).toFixed(decimals);
	    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = decimals ? stringified.slice(-1 - decimals) : '';
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    var length = args.length;
	    if (length > 1) {
	      var index = value % 10 - 1;
	      return index in args ? args[index] : args[length - 1];
	    } else {
	      return args[0] + (value === 1 ? '' : 's');
	    }
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          if (!definition.name) {
	            definition.name = id;
	          }
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.28';

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*!
	 * vue-resource v1.0.3
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */

	'use strict';

	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING = 2;

	function Promise$1(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise$1.reject = function (r) {
	    return new Promise$1(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise$1.resolve = function (x) {
	    return new Promise$1(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise$1.all = function all(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        var count = 0,
	            result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};

	Promise$1.race = function race(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};

	var p$1 = Promise$1.prototype;

	p$1.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }

	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p$1.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p$1.notify = function notify() {
	    var promise = this;

	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise$1(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	/**
	 * Promise adapter.
	 */

	if (typeof Promise === 'undefined') {
	    window.Promise = Promise$1;
	}

	function PromiseObj(executor, context) {

	    if (executor instanceof Promise) {
	        this.promise = executor;
	    } else {
	        this.promise = new Promise(executor.bind(context));
	    }

	    this.context = context;
	}

	PromiseObj.all = function (iterable, context) {
	    return new PromiseObj(Promise.all(iterable), context);
	};

	PromiseObj.resolve = function (value, context) {
	    return new PromiseObj(Promise.resolve(value), context);
	};

	PromiseObj.reject = function (reason, context) {
	    return new PromiseObj(Promise.reject(reason), context);
	};

	PromiseObj.race = function (iterable, context) {
	    return new PromiseObj(Promise.race(iterable), context);
	};

	var p = PromiseObj.prototype;

	p.bind = function (context) {
	    this.context = context;
	    return this;
	};

	p.then = function (fulfilled, rejected) {

	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
	};

	p.catch = function (rejected) {

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.catch(rejected), this.context);
	};

	p.finally = function (callback) {

	    return this.then(function (value) {
	        callback.call(this);
	        return value;
	    }, function (reason) {
	        callback.call(this);
	        return Promise.reject(reason);
	    });
	};

	/**
	 * Utility functions.
	 */

	var debug = false;var util = {};var slice = [].slice;


	function Util (Vue) {
	    util = Vue.util;
	    debug = Vue.config.debug || !Vue.config.silent;
	}

	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}

	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}

	function nextTick(cb, ctx) {
	    return util.nextTick(cb, ctx);
	}

	function trim(str) {
	    return str.replace(/^\s*|\s*$/g, '');
	}

	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}

	function toUpper(str) {
	    return str ? str.toUpperCase() : '';
	}

	var isArray = Array.isArray;

	function isString(val) {
	    return typeof val === 'string';
	}

	function isBoolean(val) {
	    return val === true || val === false;
	}

	function isFunction(val) {
	    return typeof val === 'function';
	}

	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}

	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}

	function isBlob(obj) {
	    return typeof Blob !== 'undefined' && obj instanceof Blob;
	}

	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}

	function when(value, fulfilled, rejected) {

	    var promise = PromiseObj.resolve(value);

	    if (arguments.length < 2) {
	        return promise;
	    }

	    return promise.then(fulfilled, rejected);
	}

	function options(fn, obj, opts) {

	    opts = opts || {};

	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }

	    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
	}

	function each(obj, iterator) {

	    var i, key;

	    if (obj && typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }

	    return obj;
	}

	var assign = Object.assign || _assign;

	function merge(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });

	    return target;
	}

	function defaults(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {

	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }
	    });

	    return target;
	}

	function _assign(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source);
	    });

	    return target;
	}

	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}

	/**
	 * Root Prefix Transform.
	 */

	function root (options, next) {

	    var url = next(options);

	    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }

	    return url;
	}

	/**
	 * Query Parameter Transform.
	 */

	function query (options, next) {

	    var urlParams = Object.keys(Url.options.params),
	        query = {},
	        url = next(options);

	    each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });

	    query = Url.params(query);

	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }

	    return url;
	}

	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */

	function expand(url, params, variables) {

	    var tmpl = parse(url),
	        expanded = tmpl.expand(params);

	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }

	    return expanded;
	}

	function parse(template) {

	    var operators = ['+', '#', '.', '/', ';', '?', '&'],
	        variables = [];

	    return {
	        vars: variables,
	        expand: function (context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {

	                    var operator = null,
	                        values = [];

	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }

	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });

	                    if (operator && operator !== '+') {

	                        var separator = ',';

	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }

	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}

	function getValues(context, operator, key, modifier) {

	    var value = context[key],
	        result = [];

	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();

	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }

	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];

	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }

	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }

	    return result;
	}

	function isDefined(value) {
	    return value !== undefined && value !== null;
	}

	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}

	function encodeValue(operator, value, key) {

	    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}

	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}

	/**
	 * URL Template (RFC 6570) Transform.
	 */

	function template (options) {

	    var variables = [],
	        url = expand(options.url, options.params, variables);

	    variables.forEach(function (key) {
	        delete options.params[key];
	    });

	    return url;
	}

	/**
	 * Service for URL templating.
	 */

	var ie = document.documentMode;
	var el = document.createElement('a');

	function Url(url, params) {

	    var self = this || {},
	        options = url,
	        transform;

	    if (isString(url)) {
	        options = { url: url, params: params };
	    }

	    options = merge({}, Url.options, self.$options, options);

	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });

	    return transform(options);
	}

	/**
	 * Url options.
	 */

	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};

	/**
	 * Url transforms.
	 */

	Url.transforms = [template, query, root];

	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */

	Url.params = function (obj) {

	    var params = [],
	        escape = encodeURIComponent;

	    params.add = function (key, value) {

	        if (isFunction(value)) {
	            value = value();
	        }

	        if (value === null) {
	            value = '';
	        }

	        this.push(escape(key) + '=' + escape(value));
	    };

	    serialize(params, obj);

	    return params.join('&').replace(/%20/g, '+');
	};

	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */

	Url.parse = function (url) {

	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }

	    el.href = url;

	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};

	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}

	function serialize(params, obj, scope) {

	    var array = isArray(obj),
	        plain = isPlainObject(obj),
	        hash;

	    each(obj, function (value, key) {

	        hash = isObject(value) || isArray(value);

	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }

	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}

	/**
	 * XDomain client (Internet Explorer).
	 */

	function xdrClient (request) {
	    return new PromiseObj(function (resolve) {

	        var xdr = new XDomainRequest(),
	            handler = function (_ref) {
	            var type = _ref.type;


	            var status = 0;

	            if (type === 'load') {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(xdr.responseText, { status: status }));
	        };

	        request.abort = function () {
	            return xdr.abort();
	        };

	        xdr.open(request.method, request.getUrl());
	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = handler;
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	}

	/**
	 * CORS Interceptor.
	 */

	var ORIGIN_URL = Url.parse(location.href);
	var SUPPORTS_CORS = 'withCredentials' in new XMLHttpRequest();

	function cors (request, next) {

	    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
	        request.crossOrigin = true;
	    }

	    if (request.crossOrigin) {

	        if (!SUPPORTS_CORS) {
	            request.client = xdrClient;
	        }

	        delete request.emulateHTTP;
	    }

	    next();
	}

	function crossOrigin(request) {

	    var requestUrl = Url.parse(Url(request));

	    return requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host;
	}

	/**
	 * Body Interceptor.
	 */

	function body (request, next) {

	    if (isFormData(request.body)) {

	        request.headers.delete('Content-Type');
	    } else if (isObject(request.body) || isArray(request.body)) {

	        if (request.emulateJSON) {
	            request.body = Url.params(request.body);
	            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
	        } else {
	            request.body = JSON.stringify(request.body);
	        }
	    }

	    next(function (response) {

	        Object.defineProperty(response, 'data', {
	            get: function () {
	                return this.body;
	            },
	            set: function (body) {
	                this.body = body;
	            }
	        });

	        return response.bodyText ? when(response.text(), function (text) {

	            var type = response.headers.get('Content-Type');

	            if (isString(type) && type.indexOf('application/json') === 0) {

	                try {
	                    response.body = JSON.parse(text);
	                } catch (e) {
	                    response.body = null;
	                }
	            } else {
	                response.body = text;
	            }

	            return response;
	        }) : response;
	    });
	}

	/**
	 * JSONP client.
	 */

	function jsonpClient (request) {
	    return new PromiseObj(function (resolve) {

	        var name = request.jsonp || 'callback',
	            callback = '_jsonp' + Math.random().toString(36).substr(2),
	            body = null,
	            handler,
	            script;

	        handler = function (_ref) {
	            var type = _ref.type;


	            var status = 0;

	            if (type === 'load' && body !== null) {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(body, { status: status }));

	            delete window[callback];
	            document.body.removeChild(script);
	        };

	        request.params[name] = callback;

	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };

	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;

	        document.body.appendChild(script);
	    });
	}

	/**
	 * JSONP Interceptor.
	 */

	function jsonp (request, next) {

	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }

	    next(function (response) {

	        if (request.method == 'JSONP') {

	            return when(response.json(), function (json) {

	                response.body = json;

	                return response;
	            });
	        }
	    });
	}

	/**
	 * Before Interceptor.
	 */

	function before (request, next) {

	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }

	    next();
	}

	/**
	 * HTTP method override Interceptor.
	 */

	function method (request, next) {

	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers.set('X-HTTP-Method-Override', request.method);
	        request.method = 'POST';
	    }

	    next();
	}

	/**
	 * Header Interceptor.
	 */

	function header (request, next) {

	    var headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[toLower(request.method)]);

	    each(headers, function (value, name) {
	        if (!request.headers.has(name)) {
	            request.headers.set(name, value);
	        }
	    });

	    next();
	}

	/**
	 * Timeout Interceptor.
	 */

	function timeout (request, next) {

	    var timeout;

	    if (request.timeout) {
	        timeout = setTimeout(function () {
	            request.abort();
	        }, request.timeout);
	    }

	    next(function (response) {

	        clearTimeout(timeout);
	    });
	}

	/**
	 * XMLHttp client.
	 */

	function xhrClient (request) {
	    return new PromiseObj(function (resolve) {

	        var xhr = new XMLHttpRequest(),
	            handler = function (event) {

	            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
	                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
	            });

	            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
	                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
	            });

	            resolve(response);
	        };

	        request.abort = function () {
	            return xhr.abort();
	        };

	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }

	        xhr.open(request.method, request.getUrl(), true);

	        if ('responseType' in xhr) {
	            xhr.responseType = 'blob';
	        }

	        if (request.credentials === true) {
	            xhr.withCredentials = true;
	        }

	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });

	        xhr.timeout = 0;
	        xhr.onload = handler;
	        xhr.onerror = handler;
	        xhr.send(request.getBody());
	    });
	}

	/**
	 * Base client.
	 */

	function Client (context) {

	    var reqHandlers = [sendRequest],
	        resHandlers = [],
	        handler;

	    if (!isObject(context)) {
	        context = null;
	    }

	    function Client(request) {
	        return new PromiseObj(function (resolve) {

	            function exec() {

	                handler = reqHandlers.pop();

	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn('Invalid interceptor of type ' + typeof handler + ', must be a function');
	                    next();
	                }
	            }

	            function next(response) {

	                if (isFunction(response)) {

	                    resHandlers.unshift(response);
	                } else if (isObject(response)) {

	                    resHandlers.forEach(function (handler) {
	                        response = when(response, function (response) {
	                            return handler.call(context, response) || response;
	                        });
	                    });

	                    when(response, resolve);

	                    return;
	                }

	                exec();
	            }

	            exec();
	        }, context);
	    }

	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };

	    return Client;
	}

	function sendRequest(request, resolve) {

	    var client = request.client || xhrClient;

	    resolve(client(request));
	}

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	/**
	 * HTTP Headers.
	 */

	var Headers = function () {
	    function Headers(headers) {
	        var _this = this;

	        classCallCheck(this, Headers);


	        this.map = {};

	        each(headers, function (value, name) {
	            return _this.append(name, value);
	        });
	    }

	    Headers.prototype.has = function has(name) {
	        return getName(this.map, name) !== null;
	    };

	    Headers.prototype.get = function get(name) {

	        var list = this.map[getName(this.map, name)];

	        return list ? list[0] : null;
	    };

	    Headers.prototype.getAll = function getAll(name) {
	        return this.map[getName(this.map, name)] || [];
	    };

	    Headers.prototype.set = function set(name, value) {
	        this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
	    };

	    Headers.prototype.append = function append(name, value) {

	        var list = this.getAll(name);

	        if (list.length) {
	            list.push(trim(value));
	        } else {
	            this.set(name, value);
	        }
	    };

	    Headers.prototype.delete = function _delete(name) {
	        delete this.map[getName(this.map, name)];
	    };

	    Headers.prototype.forEach = function forEach(callback, thisArg) {
	        var _this2 = this;

	        each(this.map, function (list, name) {
	            each(list, function (value) {
	                return callback.call(thisArg, value, name, _this2);
	            });
	        });
	    };

	    return Headers;
	}();

	function getName(map, name) {
	    return Object.keys(map).reduce(function (prev, curr) {
	        return toLower(name) === toLower(curr) ? curr : prev;
	    }, null);
	}

	function normalizeName(name) {

	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }

	    return trim(name);
	}

	/**
	 * HTTP Response.
	 */

	var Response = function () {
	    function Response(body, _ref) {
	        var url = _ref.url;
	        var headers = _ref.headers;
	        var status = _ref.status;
	        var statusText = _ref.statusText;
	        classCallCheck(this, Response);


	        this.url = url;
	        this.ok = status >= 200 && status < 300;
	        this.status = status || 0;
	        this.statusText = statusText || '';
	        this.headers = new Headers(headers);
	        this.body = body;

	        if (isString(body)) {

	            this.bodyText = body;
	        } else if (isBlob(body)) {

	            this.bodyBlob = body;

	            if (isBlobText(body)) {
	                this.bodyText = blobText(body);
	            }
	        }
	    }

	    Response.prototype.blob = function blob() {
	        return when(this.bodyBlob);
	    };

	    Response.prototype.text = function text() {
	        return when(this.bodyText);
	    };

	    Response.prototype.json = function json() {
	        return when(this.text(), function (text) {
	            return JSON.parse(text);
	        });
	    };

	    return Response;
	}();

	function blobText(body) {
	    return new PromiseObj(function (resolve) {

	        var reader = new FileReader();

	        reader.readAsText(body);
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	    });
	}

	function isBlobText(body) {
	    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
	}

	/**
	 * HTTP Request.
	 */

	var Request = function () {
	    function Request(options) {
	        classCallCheck(this, Request);


	        this.body = null;
	        this.params = {};

	        assign(this, options, {
	            method: toUpper(options.method || 'GET')
	        });

	        if (!(this.headers instanceof Headers)) {
	            this.headers = new Headers(this.headers);
	        }
	    }

	    Request.prototype.getUrl = function getUrl() {
	        return Url(this);
	    };

	    Request.prototype.getBody = function getBody() {
	        return this.body;
	    };

	    Request.prototype.respondWith = function respondWith(body, options) {
	        return new Response(body, assign(options || {}, { url: this.getUrl() }));
	    };

	    return Request;
	}();

	/**
	 * Service for sending network requests.
	 */

	var CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
	var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
	var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

	function Http(options) {

	    var self = this || {},
	        client = Client(self.$vm);

	    defaults(options || {}, self.$options, Http.options);

	    Http.interceptors.forEach(function (handler) {
	        client.use(handler);
	    });

	    return client(new Request(options)).then(function (response) {

	        return response.ok ? response : PromiseObj.reject(response);
	    }, function (response) {

	        if (response instanceof Error) {
	            error(response);
	        }

	        return PromiseObj.reject(response);
	    });
	}

	Http.options = {};

	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    custom: CUSTOM_HEADERS,
	    common: COMMON_HEADERS
	};

	Http.interceptors = [before, timeout, method, body, jsonp, header, cors];

	['get', 'delete', 'head', 'jsonp'].forEach(function (method) {

	    Http[method] = function (url, options) {
	        return this(assign(options || {}, { url: url, method: method }));
	    };
	});

	['post', 'put', 'patch'].forEach(function (method) {

	    Http[method] = function (url, body, options) {
	        return this(assign(options || {}, { url: url, method: method, body: body }));
	    };
	});

	/**
	 * Service for interacting with RESTful services.
	 */

	function Resource(url, params, actions, options) {

	    var self = this || {},
	        resource = {};

	    actions = assign({}, Resource.actions, actions);

	    each(actions, function (action, name) {

	        action = merge({ url: url, params: assign({}, params) }, options, action);

	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });

	    return resource;
	}

	function opts(action, args) {

	    var options = assign({}, action),
	        params = {},
	        body;

	    switch (args.length) {

	        case 2:

	            params = args[0];
	            body = args[1];

	            break;

	        case 1:

	            if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }

	            break;

	        case 0:

	            break;

	        default:

	            throw 'Expected up to 4 arguments [params, body], got ' + args.length + ' arguments';
	    }

	    options.body = body;
	    options.params = assign({}, options.params, params);

	    return options;
	}

	Resource.actions = {

	    get: { method: 'GET' },
	    save: { method: 'POST' },
	    query: { method: 'GET' },
	    update: { method: 'PUT' },
	    remove: { method: 'DELETE' },
	    delete: { method: 'DELETE' }

	};

	/**
	 * Install plugin.
	 */

	function plugin(Vue) {

	    if (plugin.installed) {
	        return;
	    }

	    Util(Vue);

	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = PromiseObj;

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function () {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function () {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        },

	        $promise: {
	            get: function () {
	                var _this = this;

	                return function (executor) {
	                    return new Vue.Promise(executor, _this);
	                };
	            }
	        }

	    });
	}

	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}

	module.exports = plugin;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
	 Highcharts JS v5.0.0 (2016-09-29)

	 (c) 2009-2016 Torstein Honsi

	 License: www.highcharts.com/license
	*/
	(function(K,a){"object"===typeof module&&module.exports?module.exports=K.document?a(K):a:K.Highcharts=a(K)})("undefined"!==typeof window?window:this,function(K){K=function(){var a=window,A=a.document,y=a.navigator&&a.navigator.userAgent||"",E=A&&A.createElementNS&&!!A.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,G=/(edge|msie|trident)/i.test(y)&&!window.opera,t=!E,g=/Firefox/.test(y),d=g&&4>parseInt(y.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",
	version:"5.0.0",deg2rad:2*Math.PI/360,doc:A,hasBidiBug:d,isMS:G,isWebKit:/AppleWebKit/.test(y),isFirefox:g,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(y),SVG_NS:"http://www.w3.org/2000/svg",idCounter:0,chartCount:0,seriesTypes:{},svg:E,vml:t,win:a,charts:[],marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){}}}();(function(a){var A=[],y=a.charts,E=a.doc,G=a.win;a.error=function(a,g){var d="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(g)throw Error(d);
	G.console&&console.log(d)};a.Fx=function(a,g,d){this.options=g;this.elem=a;this.prop=d};a.Fx.prototype={dSetter:function(){var a=this.paths[0],g=this.paths[1],d=[],m=this.now,r=a.length,n;if(1===m)d=this.toD;else if(r===g.length&&1>m)for(;r--;)n=parseFloat(a[r]),d[r]=isNaN(n)?a[r]:m*parseFloat(g[r]-n)+n;else d=g;this.elem.attr("d",d)},update:function(){var a=this.elem,g=this.prop,d=this.now,m=this.options.step;if(this[g+"Setter"])this[g+"Setter"]();else a.attr?a.element&&a.attr(g,d):a.style[g]=d+
	this.unit;m&&m.call(a,d,this)},run:function(a,g,d){var m=this,r=function(a){return r.stopped?!1:m.step(a)},n;this.startTime=+new Date;this.start=a;this.end=g;this.unit=d;this.now=this.start;this.pos=0;r.elem=this.elem;r()&&1===A.push(r)&&(r.timerId=setInterval(function(){for(n=0;n<A.length;n++)A[n]()||A.splice(n--,1);A.length||clearInterval(r.timerId)},13))},step:function(a){var g=+new Date,d,m=this.options;d=this.elem;var r=m.complete,n=m.duration,p=m.curAnim,b;if(d.attr&&!d.element)d=!1;else if(a||
	g>=n+this.startTime){this.now=this.end;this.pos=1;this.update();a=p[this.prop]=!0;for(b in p)!0!==p[b]&&(a=!1);a&&r&&r.call(d);d=!1}else this.pos=m.easing((g-this.startTime)/n),this.now=this.start+(this.end-this.start)*this.pos,this.update(),d=!0;return d},initPath:function(t,g,d){function m(a){for(l=a.length;l--;)"M"!==a[l]&&"L"!==a[l]||a.splice(l+1,0,a[l+1],a[l+2],a[l+1],a[l+2])}function r(a,f){for(;a.length<e;){a[0]=f[e-a.length];var c=a.slice(0,B);[].splice.apply(a,[0,0].concat(c));q&&(c=a.slice(a.length-
	B),[].splice.apply(a,[a.length,0].concat(c)),l--)}a[0]="M"}function n(a,f){for(var b=(e-a.length)/B;0<b&&b--;)c=a.slice().splice(a.length/h-B,B*h),c[0]=f[e-B-b*B],v&&(c[B-6]=c[B-2],c[B-5]=c[B-1]),[].splice.apply(a,[a.length/h,0].concat(c)),q&&b--}g=g||"";var p,b=t.startX,k=t.endX,v=-1<g.indexOf("C"),B=v?7:3,e,c,l;g=g.split(" ");d=d.slice();var q=t.isArea,h=q?2:1,f;v&&(m(g),m(d));if(b&&k){for(l=0;l<b.length;l++)if(b[l]===k[0]){p=l;break}else if(b[0]===k[k.length-b.length+l]){p=l;f=!0;break}void 0===
	p&&(g=[])}g.length&&a.isNumber(p)&&(e=d.length+p*h*B,f?(r(g,d),n(d,g)):(r(d,g),n(g,d)));return[g,d]}};a.extend=function(a,g){var d;a||(a={});for(d in g)a[d]=g[d];return a};a.merge=function(){var t,g=arguments,d,m={},r=function(n,d){var b,k;"object"!==typeof n&&(n={});for(k in d)d.hasOwnProperty(k)&&(b=d[k],a.isObject(b,!0)&&"renderTo"!==k&&"number"!==typeof b.nodeType?n[k]=r(n[k]||{},b):n[k]=d[k]);return n};!0===g[0]&&(m=g[1],g=Array.prototype.slice.call(g,2));d=g.length;for(t=0;t<d;t++)m=r(m,g[t]);
	return m};a.pInt=function(a,g){return parseInt(a,g||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(t,g){return t&&"object"===typeof t&&(!g||!a.isArray(t))};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,g){for(var d=a.length;d--;)if(a[d]===g){a.splice(d,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=
	function(t,g,d){var m,r;if(a.isString(g))a.defined(d)?t.setAttribute(g,d):t&&t.getAttribute&&(r=t.getAttribute(g));else if(a.defined(g)&&a.isObject(g))for(m in g)t.setAttribute(m,g[m]);return r};a.splat=function(t){return a.isArray(t)?t:[t]};a.syncTimeout=function(a,g,d){if(g)return setTimeout(a,g,d);a.call(0,d)};a.pick=function(){var a=arguments,g,d,m=a.length;for(g=0;g<m;g++)if(d=a[g],void 0!==d&&null!==d)return d};a.css=function(t,g){a.isMS&&!a.svg&&g&&void 0!==g.opacity&&(g.filter="alpha(opacity="+
	100*g.opacity+")");a.extend(t.style,g)};a.createElement=function(t,g,d,m,r){t=E.createElement(t);var n=a.css;g&&a.extend(t,g);r&&n(t,{padding:0,border:"none",margin:0});d&&n(t,d);m&&m.appendChild(t);return t};a.extendClass=function(t,g){var d=function(){};d.prototype=new t;a.extend(d.prototype,g);return d};a.pad=function(a,g,d){return Array((g||2)+1-String(a).length).join(d||0)+a};a.relativeLength=function(a,g){return/%$/.test(a)?g*parseFloat(a)/100:parseFloat(a)};a.wrap=function(a,g,d){var m=a[g];
	a[g]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(m);return d.apply(this,a)}};a.getTZOffset=function(t){var g=a.Date;return 6E4*(g.hcGetTimezoneOffset&&g.hcGetTimezoneOffset(t)||g.hcTimezoneOffset||0)};a.dateFormat=function(t,g,d){if(!a.defined(g)||isNaN(g))return a.defaultOptions.lang.invalidDate||"";t=a.pick(t,"%Y-%m-%d %H:%M:%S");var m=a.Date,r=new m(g-a.getTZOffset(g)),n,p=r[m.hcGetHours](),b=r[m.hcGetDay](),k=r[m.hcGetDate](),v=r[m.hcGetMonth](),B=r[m.hcGetFullYear](),e=a.defaultOptions.lang,
	c=e.weekdays,l=e.shortWeekdays,q=a.pad,m=a.extend({a:l?l[b]:c[b].substr(0,3),A:c[b],d:q(k),e:q(k,2," "),w:b,b:e.shortMonths[v],B:e.months[v],m:q(v+1),y:B.toString().substr(2,2),Y:B,H:q(p),k:p,I:q(p%12||12),l:p%12||12,M:q(r[m.hcGetMinutes]()),p:12>p?"AM":"PM",P:12>p?"am":"pm",S:q(r.getSeconds()),L:q(Math.round(g%1E3),3)},a.dateFormats);for(n in m)for(;-1!==t.indexOf("%"+n);)t=t.replace("%"+n,"function"===typeof m[n]?m[n](g):m[n]);return d?t.substr(0,1).toUpperCase()+t.substr(1):t};a.formatSingle=function(t,
	g){var d=/\.([0-9])/,m=a.defaultOptions.lang;/f$/.test(t)?(d=(d=t.match(d))?d[1]:-1,null!==g&&(g=a.numberFormat(g,d,m.decimalPoint,-1<t.indexOf(",")?m.thousandsSep:""))):g=a.dateFormat(t,g);return g};a.format=function(t,g){for(var d="{",m=!1,r,n,p,b,k=[],v;t;){d=t.indexOf(d);if(-1===d)break;r=t.slice(0,d);if(m){r=r.split(":");n=r.shift().split(".");b=n.length;v=g;for(p=0;p<b;p++)v=v[n[p]];r.length&&(v=a.formatSingle(r.join(":"),v));k.push(v)}else k.push(r);t=t.slice(d+1);d=(m=!m)?"}":"{"}k.push(t);
	return k.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(t,g,d,m,r){var n,p=t;d=a.pick(d,1);n=t/d;g||(g=[1,2,2.5,5,10],!1===m&&(1===d?g=[1,2,5,10]:.1>=d&&(g=[1/d])));for(m=0;m<g.length&&!(p=g[m],r&&p*d>=t||!r&&n<=(g[m]+(g[m+1]||g[m]))/2);m++);return p*d};a.stableSort=function(a,g){var d=a.length,m,r;for(r=0;r<d;r++)a[r].safeI=r;a.sort(function(a,d){m=g(a,d);return 0===m?a.safeI-d.safeI:m});for(r=0;r<d;r++)delete a[r].safeI};
	a.arrayMin=function(a){for(var g=a.length,d=a[0];g--;)a[g]<d&&(d=a[g]);return d};a.arrayMax=function(a){for(var g=a.length,d=a[0];g--;)a[g]>d&&(d=a[g]);return d};a.destroyObjectProperties=function(a,g){for(var d in a)a[d]&&a[d]!==g&&a[d].destroy&&a[d].destroy(),delete a[d]};a.discardElement=function(t){var g=a.garbageBin;g||(g=a.createElement("div"));t&&g.appendChild(t);g.innerHTML=""};a.correctFloat=function(a,g){return parseFloat(a.toPrecision(g||14))};a.setAnimation=function(t,g){g.renderer.globalAnimation=
	a.pick(t,g.options.chart.animation,!0)};a.animObject=function(t){return a.isObject(t)?a.merge(t):{duration:t?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(t,g,d,m){t=+t||0;g=+g;var r=a.defaultOptions.lang,n=(t.toString().split(".")[1]||"").length,p,b,k=Math.abs(t);-1===g?g=Math.min(n,20):a.isNumber(g)||(g=2);p=String(a.pInt(k.toFixed(g)));b=3<p.length?p.length%3:0;d=a.pick(d,r.decimalPoint);m=a.pick(m,
	r.thousandsSep);t=(0>t?"-":"")+(b?p.substr(0,b)+m:"");t+=p.substr(b).replace(/(\d{3})(?=\d)/g,"$1"+m);g&&(m=Math.abs(k-p+Math.pow(10,-Math.max(g,n)-1)),t+=d+m.toFixed(g).slice(2));return t};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(t,g){var d;return"width"===g?Math.min(t.offsetWidth,t.scrollWidth)-a.getStyle(t,"padding-left")-a.getStyle(t,"padding-right"):"height"===g?Math.min(t.offsetHeight,t.scrollHeight)-a.getStyle(t,"padding-top")-a.getStyle(t,"padding-bottom"):
	(d=G.getComputedStyle(t,void 0))&&a.pInt(d.getPropertyValue(g))};a.inArray=function(a,g){return g.indexOf?g.indexOf(a):[].indexOf.call(g,a)};a.grep=function(a,g){return[].filter.call(a,g)};a.map=function(a,g){for(var d=[],m=0,r=a.length;m<r;m++)d[m]=g.call(a[m],a[m],m,a);return d};a.offset=function(a){var g=E.documentElement;a=a.getBoundingClientRect();return{top:a.top+(G.pageYOffset||g.scrollTop)-(g.clientTop||0),left:a.left+(G.pageXOffset||g.scrollLeft)-(g.clientLeft||0)}};a.stop=function(a){for(var g=
	A.length;g--;)A[g].elem===a&&(A[g].stopped=!0)};a.each=function(a,g,d){return Array.prototype.forEach.call(a,g,d)};a.addEvent=function(a,g,d){function m(n){n.target=n.srcElement||G;d.call(a,n)}var r=a.hcEvents=a.hcEvents||{};a.addEventListener?a.addEventListener(g,d,!1):a.attachEvent&&(a.hcEventsIE||(a.hcEventsIE={}),a.hcEventsIE[d.toString()]=m,a.attachEvent("on"+g,m));r[g]||(r[g]=[]);r[g].push(d)};a.removeEvent=function(t,g,d){function m(a,b){t.removeEventListener?t.removeEventListener(a,b,!1):
	t.attachEvent&&(b=t.hcEventsIE[b.toString()],t.detachEvent("on"+a,b))}function r(){var a,b;if(t.nodeName)for(b in g?(a={},a[g]=!0):a=p,a)if(p[b])for(a=p[b].length;a--;)m(b,p[b][a])}var n,p=t.hcEvents,b;p&&(g?(n=p[g]||[],d?(b=a.inArray(d,n),-1<b&&(n.splice(b,1),p[g]=n),m(g,d)):(r(),p[g]=[])):(r(),t.hcEvents={}))};a.fireEvent=function(t,g,d,m){var r;r=t.hcEvents;var n,p;d=d||{};if(E.createEvent&&(t.dispatchEvent||t.fireEvent))r=E.createEvent("Events"),r.initEvent(g,!0,!0),a.extend(r,d),t.dispatchEvent?
	t.dispatchEvent(r):t.fireEvent(g,r);else if(r)for(r=r[g]||[],n=r.length,d.target||a.extend(d,{preventDefault:function(){d.defaultPrevented=!0},target:t,type:g}),g=0;g<n;g++)(p=r[g])&&!1===p.call(t,d)&&d.preventDefault();m&&!d.defaultPrevented&&m(d)};a.animate=function(t,g,d){var m,r="",n,p,b;a.isObject(d)||(m=arguments,d={duration:m[2],easing:m[3],complete:m[4]});a.isNumber(d.duration)||(d.duration=400);d.easing="function"===typeof d.easing?d.easing:Math[d.easing]||Math.easeInOutSine;d.curAnim=a.merge(g);
	for(b in g)p=new a.Fx(t,d,b),n=null,"d"===b?(p.paths=p.initPath(t,t.d,g.d),p.toD=g.d,m=0,n=1):t.attr?m=t.attr(b):(m=parseFloat(a.getStyle(t,b))||0,"opacity"!==b&&(r="px")),n||(n=g[b]),n.match&&n.match("px")&&(n=n.replace(/px/g,"")),p.run(m,n,r)};a.seriesType=function(t,g,d,m,r){var n=a.getOptions(),p=a.seriesTypes;n.plotOptions[t]=a.merge(n.plotOptions[g],d);p[t]=a.extendClass(p[g]||function(){},m);p[t].prototype.type=t;r&&(p[t].prototype.pointClass=a.extendClass(a.Point,r));return p[t]};G.jQuery&&
	(G.jQuery.fn.highcharts=function(){var t=[].slice.call(arguments);if(this[0])return t[0]?(new (a[a.isString(t[0])?t.shift():"Chart"])(this[0],t[0],t[1]),this):y[a.attr(this[0],"data-highcharts-chart")]});E&&!E.defaultView&&(a.getStyle=function(t,g){var d;d={width:"clientWidth",height:"clientHeight"}[g];if(t.style[g])return a.pInt(t.style[g]);"opacity"===g&&(g="filter");if(d)return t.style.zoom=1,Math.max(t[d]-2*a.getStyle(t,"padding"),0);d=t.currentStyle[g.replace(/\-(\w)/g,function(a,d){return d.toUpperCase()})];
	"filter"===g&&(d=d.replace(/alpha\(opacity=([0-9]+)\)/,function(a,d){return d/100}));return""===d?1:a.pInt(d)});Array.prototype.forEach||(a.each=function(a,g,d){for(var m=0,r=a.length;m<r;m++)if(!1===g.call(d,a[m],m,a))return m});Array.prototype.indexOf||(a.inArray=function(a,g){var d,m=0;if(g)for(d=g.length;m<d;m++)if(g[m]===a)return m;return-1});Array.prototype.filter||(a.grep=function(a,g){for(var d=[],m=0,r=a.length;m<r;m++)g(a[m],m)&&d.push(a[m]);return d})})(K);(function(a){var A=a.each,y=a.isNumber,
	E=a.map,G=a.merge,t=a.pInt;a.Color=function(g){if(!(this instanceof a.Color))return new a.Color(g);this.init(g)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[t(a[1]),t(a[2]),t(a[3]),parseFloat(a[4],10)]}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[t(a[1],16),t(a[2],16),t(a[3],16),1]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
	parse:function(a){return[t(a[1]),t(a[2]),t(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(g){var d,m,r,n;if((this.input=g=this.names[g]||g)&&g.stops)this.stops=E(g.stops,function(d){return new a.Color(d[1])});else for(r=this.parsers.length;r--&&!m;)n=this.parsers[r],(d=n.regex.exec(g))&&(m=n.parse(d));this.rgba=m||[]},get:function(a){var d=this.input,m=this.rgba,r;this.stops?(r=G(d),r.stops=[].concat(r.stops),A(this.stops,function(d,p){r.stops[p]=[r.stops[p][0],d.get(a)]})):r=m&&
	y(m[0])?"rgb"===a||!a&&1===m[3]?"rgb("+m[0]+","+m[1]+","+m[2]+")":"a"===a?m[3]:"rgba("+m.join(",")+")":d;return r},brighten:function(a){var d,m=this.rgba;if(this.stops)A(this.stops,function(d){d.brighten(a)});else if(y(a)&&0!==a)for(d=0;3>d;d++)m[d]+=t(255*a),0>m[d]&&(m[d]=0),255<m[d]&&(m[d]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};a.color=function(g){return new a.Color(g)}})(K);(function(a){var A,y,E=a.addEvent,G=a.animate,t=a.attr,g=a.charts,d=a.color,m=a.css,r=a.createElement,
	n=a.defined,p=a.deg2rad,b=a.destroyObjectProperties,k=a.doc,v=a.each,B=a.extend,e=a.erase,c=a.grep,l=a.hasTouch,q=a.isArray,h=a.isFirefox,f=a.isMS,u=a.isObject,D=a.isString,H=a.isWebKit,F=a.merge,I=a.noop,C=a.pick,w=a.pInt,J=a.removeEvent,M=a.stop,x=a.svg,z=a.SVG_NS,N=a.win;A=a.SVGElement=function(){return this};A.prototype={opacity:1,SVG_NS:z,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),init:function(a,f){this.element=
	"span"===f?r(f):k.createElementNS(this.SVG_NS,f);this.renderer=a},animate:function(a,f,L){f=C(f,this.renderer.globalAnimation,!0);M(this);f?(L&&(f.complete=L),G(this,a,f)):this.attr(a,null,L);return this},colorGradient:function(O,f,L){var c=this.renderer,x,z,e,u,b,h,l,D,d,C,k,w=[],H;O.linearGradient?z="linearGradient":O.radialGradient&&(z="radialGradient");if(z){e=O[z];b=c.gradients;l=O.stops;C=L.radialReference;q(e)&&(O[z]=e={x1:e[0],y1:e[1],x2:e[2],y2:e[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===
	z&&C&&!n(e.gradientUnits)&&(u=e,e=F(e,c.getRadialAttr(C,u),{gradientUnits:"userSpaceOnUse"}));for(k in e)"id"!==k&&w.push(k,e[k]);for(k in l)w.push(l[k]);w=w.join(",");b[w]?C=b[w].attr("id"):(e.id=C="highcharts-"+a.idCounter++,b[w]=h=c.createElement(z).attr(e).add(c.defs),h.radAttr=u,h.stops=[],v(l,function(O){0===O[1].indexOf("rgba")?(x=a.color(O[1]),D=x.get("rgb"),d=x.get("a")):(D=O[1],d=1);O=c.createElement("stop").attr({offset:O[0],"stop-color":D,"stop-opacity":d}).add(h);h.stops.push(O)}));H=
	"url("+c.url+"#"+C+")";L.setAttribute(f,H);L.gradient=w;O.toString=function(){return H}}},applyTextShadow:function(a){var c=this.element,L,x=-1!==a.indexOf("contrast"),z={},e=this.renderer.forExport,u=this.renderer.forExport||void 0!==c.style.textShadow&&!f;x&&(z.textShadow=a=a.replace(/contrast/g,this.renderer.getContrast(c.style.fill)));if(H||e)z.textRendering="geometricPrecision";u?this.css(z):(this.fakeTS=!0,this.ySetter=this.xSetter,L=[].slice.call(c.getElementsByTagName("tspan")),v(a.split(/\s?,\s?/g),
	function(a){var O=c.firstChild,f,x;a=a.split(" ");f=a[a.length-1];(x=a[a.length-2])&&v(L,function(a,L){var z;0===L&&(a.setAttribute("x",c.getAttribute("x")),L=c.getAttribute("y"),a.setAttribute("y",L||0),null===L&&c.setAttribute("y",0));z=a.cloneNode(1);t(z,{"class":"highcharts-text-shadow",fill:f,stroke:f,"stroke-opacity":1/Math.max(w(x),3),"stroke-width":x,"stroke-linejoin":"round"});c.insertBefore(z,O)})}))},attr:function(a,f,L){var c,x=this.element,z,e=this,u;"string"===typeof a&&void 0!==f&&
	(c=a,a={},a[c]=f);if("string"===typeof a)e=(this[a+"Getter"]||this._defaultGetter).call(this,a,x);else{for(c in a)f=a[c],u=!1,this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c)&&(z||(this.symbolAttr(a),z=!0),u=!0),!this.rotation||"x"!==c&&"y"!==c||(this.doTransform=!0),u||(u=this[c+"Setter"]||this._defaultSetter,u.call(this,f,c,x),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c)&&this.updateShadows(c,f,u));this.doTransform&&(this.updateTransform(),
	this.doTransform=!1)}L&&L();return e},updateShadows:function(a,f,c){for(var x=this.shadows,z=x.length;z--;)c.call(x[z],"height"===a?Math.max(f-(x[z].cutHeight||0),0):"d"===a?this.d:f,a,x[z])},addClass:function(a,f){var c=this.attr("class")||"";-1===c.indexOf(a)&&(f||(a=(c+(c?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==t(this.element,"class").indexOf(a)},removeClass:function(a){t(this.element,"class",(t(this.element,"class")||"").replace(a,""));
	return this},symbolAttr:function(a){var f=this;v("x y r start end width height innerR anchorX anchorY".split(" "),function(c){f[c]=C(a[c],f[c])});f.attr({d:f.renderer.symbols[f.symbolName](f.x,f.y,f.width,f.height,f)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,f){var c,x={},z;f=f||a.strokeWidth||0;z=Math.round(f)%2/2;a.x=Math.floor(a.x||this.x||0)+z;a.y=Math.floor(a.y||this.y||0)+z;a.width=Math.floor((a.width||this.width||0)-2*
	z);a.height=Math.floor((a.height||this.height||0)-2*z);n(a.strokeWidth)&&(a.strokeWidth=f);for(c in a)this[c]!==a[c]&&(this[c]=x[c]=a[c]);return x},css:function(a){var c=this.styles,L={},z=this.element,e,u,b="";e=!c;a&&a.color&&(a.fill=a.color);if(c)for(u in a)a[u]!==c[u]&&(L[u]=a[u],e=!0);if(e){e=this.textWidth=a&&a.width&&"text"===z.nodeName.toLowerCase()&&w(a.width)||this.textWidth;c&&(a=B(c,L));this.styles=a;e&&!x&&this.renderer.forExport&&delete a.width;if(f&&!x)m(this.element,a);else{c=function(a,
	O){return"-"+O.toLowerCase()};for(u in a)b+=u.replace(/([A-Z])/g,c)+":"+a[u]+";";t(z,"style",b)}this.added&&e&&this.renderer.buildText(this)}return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,f){var c=this,x=c.element;l&&"click"===a?(x.ontouchstart=function(a){c.touchEventFired=Date.now();a.preventDefault();f.call(x,a)},x.onclick=function(a){(-1===N.navigator.userAgent.indexOf("Android")||1100<Date.now()-(c.touchEventFired||0))&&f.call(x,a)}):x["on"+a]=f;return this},
	setRadialReference:function(a){var f=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;f&&f.radAttr&&f.animate(this.renderer.getRadialAttr(a,f.radAttr));return this},translate:function(a,f){return this.attr({translateX:a,translateY:f})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,f=this.translateY||0,c=this.scaleX,x=this.scaleY,z=this.inverted,e=this.rotation,u=this.element;z&&(a+=this.attr("width"),
	f+=this.attr("height"));a=["translate("+a+","+f+")"];z?a.push("rotate(90) scale(-1,1)"):e&&a.push("rotate("+e+" "+(u.getAttribute("x")||0)+" "+(u.getAttribute("y")||0)+")");(n(c)||n(x))&&a.push("scale("+C(c,1)+" "+C(x,1)+")");a.length&&u.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,f,c){var x,z,u,b,h={};z=this.renderer;u=z.alignedObjects;var l,q;if(a){if(this.alignOptions=a,this.alignByTranslate=f,!c||D(c))this.alignTo=
	x=c||"renderer",e(u,this),u.push(this),c=null}else a=this.alignOptions,f=this.alignByTranslate,x=this.alignTo;c=C(c,z[x],z);x=a.align;z=a.verticalAlign;u=(c.x||0)+(a.x||0);b=(c.y||0)+(a.y||0);"right"===x?l=1:"center"===x&&(l=2);l&&(u+=(c.width-(a.width||0))/l);h[f?"translateX":"x"]=Math.round(u);"bottom"===z?q=1:"middle"===z&&(q=2);q&&(b+=(c.height-(a.height||0))/q);h[f?"translateY":"y"]=Math.round(b);this[this.placed?"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this},getBBox:function(a,
	c){var x,z=this.renderer,u,e,b,l=this.element,D=this.styles,q=this.textStr,F,d=l.style,k,w=z.cache,H=z.cacheKeys,n;e=C(c,this.rotation);b=e*p;u=D&&D.fontSize;void 0!==q&&(n=q.toString().replace(/[0-9]/g,"0")+["",e||0,u,l.style.width].join());n&&!a&&(x=w[n]);if(!x){if(l.namespaceURI===this.SVG_NS||z.forExport){try{k=this.fakeTS&&function(a){v(l.querySelectorAll(".highcharts-text-shadow"),function(f){f.style.display=a})},h&&d.textShadow?(F=d.textShadow,d.textShadow=""):k&&k("none"),x=l.getBBox?B({},
	l.getBBox()):{width:l.offsetWidth,height:l.offsetHeight},F?d.textShadow=F:k&&k("")}catch(r){}if(!x||0>x.width)x={width:0,height:0}}else x=this.htmlGetBBox();z.isSVG&&(z=x.width,u=x.height,f&&D&&"11px"===D.fontSize&&"16.9"===u.toPrecision(3)&&(x.height=u=14),e&&(x.width=Math.abs(u*Math.sin(b))+Math.abs(z*Math.cos(b)),x.height=Math.abs(u*Math.cos(b))+Math.abs(z*Math.sin(b))));if(n&&0<x.height){for(;250<H.length;)delete w[H.shift()];w[n]||H.push(n);w[n]=x}}return x},show:function(a){return this.attr({visibility:a?
	"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var f=this;f.animate({opacity:0},{duration:a||150,complete:function(){f.attr({y:-9999})}})},add:function(a){var f=this.renderer,c=this.element,x;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&f.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)x=this.zIndexSetter();x||(a?a.element:f.box).appendChild(c);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var f=
	a.parentNode;f&&f.removeChild(a)},destroy:function(){var a=this.element||{},f=this.renderer.isSVG&&"SPAN"===a.nodeName&&this.parentGroup,c,x;a.onclick=a.onmouseout=a.onmouseover=a.onmousemove=a.point=null;M(this);this.clipPath&&(this.clipPath=this.clipPath.destroy());if(this.stops){for(x=0;x<this.stops.length;x++)this.stops[x]=this.stops[x].destroy();this.stops=null}this.safeRemoveChild(a);for(this.destroyShadows();f&&f.div&&0===f.div.childNodes.length;)a=f.parentGroup,this.safeRemoveChild(f.div),
	delete f.div,f=a;this.alignTo&&e(this.renderer.alignedObjects,this);for(c in this)delete this[c];return null},shadow:function(a,f,c){var x=[],z,u,e=this.element,b,l,h,D;if(!a)this.destroyShadows();else if(!this.shadows){l=C(a.width,3);h=(a.opacity||.15)/l;D=this.parentInverted?"(-1,-1)":"("+C(a.offsetX,1)+", "+C(a.offsetY,1)+")";for(z=1;z<=l;z++)u=e.cloneNode(0),b=2*l+1-2*z,t(u,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":h*z,"stroke-width":b,transform:"translate"+D,fill:"none"}),c&&
	(t(u,"height",Math.max(t(u,"height")-b,0)),u.cutHeight=b),f?f.element.appendChild(u):e.parentNode.insertBefore(u,e),x.push(u);this.shadows=x}return this},destroyShadows:function(){v(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=C(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));
	return a},dSetter:function(a,f,c){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");c.setAttribute(f,a);this[f]=a},dashstyleSetter:function(a){var f,c=this["stroke-width"];"inherit"===c&&(c=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(f=a.length;f--;)a[f]=w(a[f])*
	c;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},titleSetter:function(a){var f=this.element.getElementsByTagName("title")[0];f||(f=k.createElementNS(this.SVG_NS,"title"),this.element.appendChild(f));f.firstChild&&f.removeChild(f.firstChild);f.appendChild(k.createTextNode(String(C(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&
	(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,f,c){"string"===typeof a?c.setAttribute(f,a):a&&this.colorGradient(a,f,c)},visibilitySetter:function(a,f,c){"inherit"===a?c.removeAttribute(f):c.setAttribute(f,a)},zIndexSetter:function(a,f){var c=this.renderer,x=this.parentGroup,c=(x||c).element||c.box,z,u,e=this.element,b;z=this.added;var l;n(a)&&(e.zIndex=a,a=+a,this[f]===a&&(z=!1),this[f]=a);if(z){(a=this.zIndex)&&x&&(x.handleZ=!0);x=c.childNodes;
	for(l=0;l<x.length&&!b;l++)z=x[l],u=z.zIndex,z!==e&&(w(u)>a||!n(a)&&n(u))&&(c.insertBefore(e,z),b=!0);b||c.appendChild(e)}return b},_defaultSetter:function(a,f,c){c.setAttribute(f,a)}};A.prototype.yGetter=A.prototype.xGetter;A.prototype.translateXSetter=A.prototype.translateYSetter=A.prototype.rotationSetter=A.prototype.verticalAlignSetter=A.prototype.scaleXSetter=A.prototype.scaleYSetter=function(a,f){this[f]=a;this.doTransform=!0};A.prototype.opacitySetter=A.prototype.displaySetter=function(a,f,
	c){this[f]=a;c.setAttribute(f,a)};A.prototype["stroke-widthSetter"]=A.prototype.strokeSetter=function(a,f,c){this[f]=a;this.stroke&&this["stroke-width"]?(A.prototype.fillSetter.call(this,this.stroke,"stroke",c),c.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===f&&0===a&&this.hasStroke&&(c.removeAttribute("stroke"),this.hasStroke=!1)};y=a.SVGRenderer=function(){this.init.apply(this,arguments)};y.prototype={Element:A,SVG_NS:z,init:function(a,f,c,x,z,u){var e;x=
	this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(x));e=x.element;a.appendChild(e);-1===a.innerHTML.indexOf("xmlns")&&t(e,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=e;this.boxWrapper=x;this.alignedObjects=[];this.url=(h||H)&&k.getElementsByTagName("base").length?N.location.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 5.0.0"));this.defs=
	this.createElement("defs").add();this.allowHTML=u;this.forExport=z;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(f,c,!1);var b;h&&a.getBoundingClientRect&&(this.subPixelFix=f=function(){m(a,{left:0,top:0});b=a.getBoundingClientRect();m(a,{left:Math.ceil(b.left)-b.left+"px",top:Math.ceil(b.top)-b.top+"px"})},f(),E(N,"resize",f))},getStyle:function(a){return this.style=B({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},
	a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();b(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.subPixelFix&&J(N,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var f=new this.Element;f.init(this,a);return f},draw:I,getRadialAttr:function(a,f){return{cx:a[0]-a[2]/2+f.cx*
	a[2],cy:a[1]-a[2]/2+f.cy*a[2],r:f.r*a[2]}},buildText:function(a){for(var f=a.element,u=this,e=u.forExport,b=C(a.textStr,"").toString(),l=-1!==b.indexOf("<"),h=f.childNodes,D,q,F,d,n=t(f,"x"),H=a.styles,r=a.textWidth,J=H&&H.lineHeight,p=H&&H.textShadow,g=H&&"ellipsis"===H.textOverflow,N=h.length,B=r&&!a.added&&this.box,M=function(a){var f;f=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:H&&H.fontSize||u.style.fontSize||12;return J?w(J):u.fontMetrics(f,a).h};N--;)f.removeChild(h[N]);l||p||g||
	r||-1!==b.indexOf(" ")?(D=/<.*class="([^"]+)".*>/,q=/<.*style="([^"]+)".*>/,F=/<.*href="(http[^"]+)".*>/,B&&B.appendChild(f),b=l?b.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g):[b],b=c(b,function(a){return""!==a}),v(b,function(c,b){var l,h=0;c=c.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");l=c.split("|||");
	v(l,function(c){if(""!==c||1===l.length){var C={},w=k.createElementNS(u.SVG_NS,"tspan"),v,J;D.test(c)&&(v=c.match(D)[1],t(w,"class",v));q.test(c)&&(J=c.match(q)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),t(w,"style",J));F.test(c)&&!e&&(t(w,"onclick",'location.href="'+c.match(F)[1]+'"'),m(w,{cursor:"pointer"}));c=(c.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");if(" "!==c){w.appendChild(k.createTextNode(c));h?C.dx=0:b&&null!==n&&(C.x=n);t(w,C);f.appendChild(w);!h&&b&&(!x&&
	e&&m(w,{display:"block"}),t(w,"dy",M(w)));if(r){C=c.replace(/([^\^])-/g,"$1- ").split(" ");v="nowrap"===H.whiteSpace;for(var p=1<l.length||b||1<C.length&&!v,N,B,Q=[],T=M(w),I=a.rotation,P=c,y=P.length;(p||g)&&(C.length||Q.length);)a.rotation=0,N=a.getBBox(!0),B=N.width,!x&&u.forExport&&(B=u.measureSpanWidth(w.firstChild.data,a.styles)),N=B>r,void 0===d&&(d=N),g&&d?(y/=2,""===P||!N&&.5>y?C=[]:(P=c.substring(0,P.length+(N?-1:1)*Math.ceil(y)),C=[P+(3<r?"\u2026":"")],w.removeChild(w.firstChild))):N&&
	1!==C.length?(w.removeChild(w.firstChild),Q.unshift(C.pop())):(C=Q,Q=[],C.length&&!v&&(w=k.createElementNS(z,"tspan"),t(w,{dy:T,x:n}),J&&t(w,"style",J),f.appendChild(w)),B>r&&(r=B)),C.length&&w.appendChild(k.createTextNode(C.join(" ").replace(/- /g,"-")));a.rotation=I}h++}}})}),d&&a.attr("title",a.textStr),B&&B.removeChild(f),p&&a.applyTextShadow&&a.applyTextShadow(p)):f.appendChild(k.createTextNode(b.replace(/&lt;/g,"<").replace(/&gt;/g,">")))},getContrast:function(a){a=d(a).rgba;return 510<a[0]+
	a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,c,x,z,u,e,b,l,h){var D=this.label(a,c,x,h,null,null,null,null,"button"),q=0;D.attr(F({padding:8,r:2},u));var C,w,d,k;u=F({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},u);C=u.style;delete u.style;e=F(u,{fill:"#e6e6e6"},e);w=e.style;delete e.style;b=F(u,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},b);d=b.style;delete b.style;l=F(u,{style:{color:"#cccccc"}},l);k=l.style;delete l.style;
	E(D.element,f?"mouseover":"mouseenter",function(){3!==q&&D.setState(1)});E(D.element,f?"mouseout":"mouseleave",function(){3!==q&&D.setState(q)});D.setState=function(a){1!==a&&(D.state=q=a);D.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);D.attr([u,e,b,l][a||0]).css([C,w,d,k][a||0])};D.attr(u).css(B({cursor:"default"},C));return D.on("click",function(a){3!==q&&z.call(D,a)})},crispLine:function(a,f){a[1]===
	a[4]&&(a[1]=a[4]=Math.round(a[1])-f%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+f%2/2);return a},path:function(a){var f={fill:"none"};q(a)?f.d=a:u(a)&&B(f,a);return this.createElement("path").attr(f)},circle:function(a,f,c){a=u(a)?a:{x:a,y:f,r:c};f=this.createElement("circle");f.xSetter=f.ySetter=function(a,f,c){c.setAttribute("c"+f,a)};return f.attr(a)},arc:function(a,f,c,x,z,e){u(a)&&(f=a.y,c=a.r,x=a.innerR,z=a.start,e=a.end,a=a.x);a=this.symbol("arc",a||0,f||0,c||0,c||0,{innerR:x||0,start:z||
	0,end:e||0});a.r=c;return a},rect:function(a,f,c,x,z,e){z=u(a)?a.r:z;var b=this.createElement("rect");a=u(a)?a:void 0===a?{}:{x:a,y:f,width:Math.max(c,0),height:Math.max(x,0)};void 0!==e&&(a.strokeWidth=e,a=b.crisp(a));a.fill="none";z&&(a.r=z);b.rSetter=function(a,f,c){t(c,{rx:a,ry:a})};return b.attr(a)},setSize:function(a,f,c){var x=this.alignedObjects,z=x.length;this.width=a;this.height=f;for(this.boxWrapper.animate({width:a,height:f},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+
	" "+this.attr("height")})},duration:C(c,!0)?void 0:0});z--;)x[z].align()},g:function(a){var f=this.createElement("g");return a?f.attr({"class":"highcharts-"+a}):f},image:function(a,f,c,x,z){var u={preserveAspectRatio:"none"};1<arguments.length&&B(u,{x:f,y:c,width:x,height:z});u=this.createElement("image").attr(u);u.element.setAttributeNS?u.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):u.element.setAttribute("hc-svg-href",a);return u},symbol:function(a,f,c,x,z,u){var e=this,b,l=this.symbols[a],
	D=n(f)&&l&&l(Math.round(f),Math.round(c),x,z,u),h=/^url\((.*?)\)$/,q,w,d={};l?(b=this.path(D),b.attr("fill","none"),B(b,{symbolName:a,x:f,y:c,width:x,height:z}),u&&B(b,u)):h.test(a)&&(q=a.match(h)[1],b=this.image(q),b.imgwidth=C(d[q]&&d[q].width,u&&u.width),b.imgheight=C(d[q]&&d[q].height,u&&u.height),w=function(){b.attr({width:b.width,height:b.height})},v(["width","height"],function(a){b[a+"Setter"]=function(a,f){var c={},x=this["img"+f];this[f]=a;n(x)&&(this.element&&this.element.setAttribute(f,
	x),this.alignByTranslate||(c["width"===f?"translateX":"translateY"]=(this[f]-x)/2,this.attr(c)))}}),n(f)&&b.attr({x:f,y:c}),b.isImg=!0,n(b.imgwidth)&&n(b.imgheight)?w():(b.attr({width:0,height:0}),r("img",{onload:function(){var a=g[e.chartIndex];0===this.width&&(m(this,{position:"absolute",top:"-999em"}),k.body.appendChild(this));d[q]={width:this.width,height:this.height};b.imgwidth=this.width;b.imgheight=this.height;b.element&&w();this.parentNode&&this.parentNode.removeChild(this);e.imgCount--;if(!e.imgCount&&
	a&&a.onload)a.onload()},src:q}),this.imgCount++));return b},symbols:{circle:function(a,f,c,x){var z=.166*c;return["M",a+c/2,f,"C",a+c+z,f,a+c+z,f+x,a+c/2,f+x,"C",a-z,f+x,a-z,f,a+c/2,f,"Z"]},square:function(a,f,c,x){return["M",a,f,"L",a+c,f,a+c,f+x,a,f+x,"Z"]},triangle:function(a,f,c,x){return["M",a+c/2,f,"L",a+c,f+x,a,f+x,"Z"]},"triangle-down":function(a,f,c,x){return["M",a,f,"L",a+c,f,a+c/2,f+x,"Z"]},diamond:function(a,f,c,x){return["M",a+c/2,f,"L",a+c,f+x/2,a+c/2,f+x,a,f+x/2,"Z"]},arc:function(a,
	f,c,x,z){var u=z.start;c=z.r||c||x;var b=z.end-.001;x=z.innerR;var e=z.open,l=Math.cos(u),D=Math.sin(u),h=Math.cos(b),b=Math.sin(b);z=z.end-u<Math.PI?0:1;return["M",a+c*l,f+c*D,"A",c,c,0,z,1,a+c*h,f+c*b,e?"M":"L",a+x*h,f+x*b,"A",x,x,0,z,0,a+x*l,f+x*D,e?"":"Z"]},callout:function(a,f,c,x,z){var u=Math.min(z&&z.r||0,c,x),b=u+6,e=z&&z.anchorX;z=z&&z.anchorY;var l;l=["M",a+u,f,"L",a+c-u,f,"C",a+c,f,a+c,f,a+c,f+u,"L",a+c,f+x-u,"C",a+c,f+x,a+c,f+x,a+c-u,f+x,"L",a+u,f+x,"C",a,f+x,a,f+x,a,f+x-u,"L",a,f+u,
	"C",a,f,a,f,a+u,f];e&&e>c&&z>f+b&&z<f+x-b?l.splice(13,3,"L",a+c,z-6,a+c+6,z,a+c,z+6,a+c,f+x-u):e&&0>e&&z>f+b&&z<f+x-b?l.splice(33,3,"L",a,z+6,a-6,z,a,z-6,a,f+u):z&&z>x&&e>a+b&&e<a+c-b?l.splice(23,3,"L",e+6,f+x,e,f+x+6,e-6,f+x,a+u,f+x):z&&0>z&&e>a+b&&e<a+c-b&&l.splice(3,3,"L",e-6,f,e,f-6,e+6,f,c-u,f);return l}},clipRect:function(f,c,x,z){var u="highcharts-"+a.idCounter++,b=this.createElement("clipPath").attr({id:u}).add(this.defs);f=this.rect(f,c,x,z,0).add(b);f.id=u;f.clipPath=b;f.count=0;return f},
	text:function(a,f,c,z){var u=!x&&this.forExport,b={};if(z&&(this.allowHTML||!this.forExport))return this.html(a,f,c);b.x=Math.round(f||0);c&&(b.y=Math.round(c));if(a||0===a)b.text=a;a=this.createElement("text").attr(b);u&&a.css({position:"absolute"});z||(a.xSetter=function(a,f,c){var x=c.getElementsByTagName("tspan"),z,u=c.getAttribute(f),b;for(b=0;b<x.length;b++)z=x[b],z.getAttribute(f)===u&&z.setAttribute(f,a);c.setAttribute(f,a)});return a},fontMetrics:function(a,f){var c;a=a||this.style&&this.style.fontSize;
	a=/px/.test(a)?w(a):/em/.test(a)?12*parseFloat(a):12;c=24>a?a+3:Math.round(1.2*a);return{h:c,b:Math.round(.8*c),f:a}},rotCorr:function(a,f,c){var x=a;f&&c&&(x=Math.max(x*Math.cos(f*p),4));return{x:-a/3*Math.sin(f*p),y:x}},label:function(a,f,c,x,z,u,b,e,l){var D=this,h=D.g("button"!==l&&"label"),q=h.text=D.text("",0,0,b).attr({zIndex:1}),C,w,d=0,k=3,H=0,r,p,g,N,m,M={},I,t,y=/^url\((.*?)\)$/.test(x),E=y,G,K,X,V;l&&h.addClass("highcharts-"+l);E=y;G=function(){return(I||0)%2/2};K=function(){var a=q.element.style,
	f={};w=(void 0===r||void 0===p||m)&&n(q.textStr)&&q.getBBox();h.width=(r||w.width||0)+2*k+H;h.height=(p||w.height||0)+2*k;t=k+D.fontMetrics(a&&a.fontSize,q).b;E&&(C||(h.box=C=D.symbols[x]||y?D.symbol(x):D.rect(),C.addClass(("button"===l?"":"highcharts-label-box")+(l?" highcharts-"+l+"-box":"")),C.add(h),a=G(),f.x=a,f.y=(e?-t:0)+a),f.width=Math.round(h.width),f.height=Math.round(h.height),C.attr(B(f,M)),M={})};X=function(){var a=H+k,f;f=e?0:t;n(r)&&w&&("center"===m||"right"===m)&&(a+={center:.5,right:1}[m]*
	(r-w.width));if(a!==q.x||f!==q.y)q.attr("x",a),void 0!==f&&q.attr("y",f);q.x=a;q.y=f};V=function(a,f){C?C.attr(a,f):M[a]=f};h.onAdd=function(){q.add(h);h.attr({text:a||0===a?a:"",x:f,y:c});C&&n(z)&&h.attr({anchorX:z,anchorY:u})};h.widthSetter=function(a){r=a};h.heightSetter=function(a){p=a};h["text-alignSetter"]=function(a){m=a};h.paddingSetter=function(a){n(a)&&a!==k&&(k=h.padding=a,X())};h.paddingLeftSetter=function(a){n(a)&&a!==H&&(H=a,X())};h.alignSetter=function(a){a={left:0,center:.5,right:1}[a];
	a!==d&&(d=a,w&&h.attr({x:g}))};h.textSetter=function(a){void 0!==a&&q.textSetter(a);K();X()};h["stroke-widthSetter"]=function(a,f){a&&(E=!0);I=this["stroke-width"]=a;V(f,a)};h.strokeSetter=h.fillSetter=h.rSetter=function(a,f){"fill"===f&&a&&(E=!0);V(f,a)};h.anchorXSetter=function(a,f){z=a;V(f,Math.round(a)-G()-g)};h.anchorYSetter=function(a,f){u=a;V(f,a-N)};h.xSetter=function(a){h.x=a;d&&(a-=d*((r||w.width)+2*k));g=Math.round(a);h.attr("translateX",g)};h.ySetter=function(a){N=h.y=Math.round(a);h.attr("translateY",
	N)};var ba=h.css;return B(h,{css:function(a){if(a){var f={};a=F(a);v(h.textProps,function(c){void 0!==a[c]&&(f[c]=a[c],delete a[c])});q.css(f)}return ba.call(h,a)},getBBox:function(){return{width:w.width+2*k,height:w.height+2*k,x:w.x-k,y:w.y-k}},shadow:function(a){a&&(K(),C&&C.shadow(a));return h},destroy:function(){J(h.element,"mouseenter");J(h.element,"mouseleave");q&&(q=q.destroy());C&&(C=C.destroy());A.prototype.destroy.call(h);h=D=K=X=V=null}})}};a.Renderer=y})(K);(function(a){var A=a.attr,y=
	a.createElement,E=a.css,G=a.defined,t=a.each,g=a.extend,d=a.isFirefox,m=a.isMS,r=a.isWebKit,n=a.pInt,p=a.SVGRenderer,b=a.win,k=a.wrap;g(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=g(this.styles,a);E(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position=
	"absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,e=this.translateX||0,c=this.translateY||0,l=this.x||0,q=this.y||0,h=this.textAlign||"left",f={left:0,center:.5,right:1}[h],u=this.styles;E(b,{marginLeft:e,marginTop:c});this.shadows&&t(this.shadows,function(a){E(a,{marginLeft:e+1,marginTop:c+1})});this.inverted&&t(b.childNodes,function(f){a.invertChild(f,b)});if("SPAN"===b.tagName){var D=
	this.rotation,d=n(this.textWidth),k=u&&u.whiteSpace,p=[D,h,b.innerHTML,this.textWidth,this.textAlign].join();p!==this.cTT&&(u=a.fontMetrics(b.style.fontSize).b,G(D)&&this.setSpanRotation(D,f,u),E(b,{width:"",whiteSpace:k||"nowrap"}),b.offsetWidth>d&&/[ \-]/.test(b.textContent||b.innerText)&&E(b,{width:d+"px",display:"block",whiteSpace:k||"normal"}),this.getSpanCorrection(b.offsetWidth,u,f,D,h));E(b,{left:l+(this.xCorr||0)+"px",top:q+(this.yCorr||0)+"px"});r&&(u=b.offsetHeight);this.cTT=p}}else this.alignOnAdd=
	!0},setSpanRotation:function(a,k,e){var c={},l=m?"-ms-transform":r?"-webkit-transform":d?"MozTransform":b.opera?"-o-transform":"";c[l]=c.transform="rotate("+a+"deg)";c[l+(d?"Origin":"-origin")]=c.transformOrigin=100*k+"% "+e+"px";E(this.element,c)},getSpanCorrection:function(a,b,e){this.xCorr=-a*e;this.yCorr=-b}});g(p.prototype,{html:function(a,b,e){var c=this.createElement("span"),l=c.element,q=c.renderer,h=q.isSVG,f=function(a,f){t(["display","opacity","visibility"],function(c){k(a,c+"Setter",function(a,
	c,b,u){a.call(this,c,b,u);f[b]=c})})};c.textSetter=function(a){a!==l.innerHTML&&delete this.bBox;l.innerHTML=this.textStr=a;c.htmlUpdateTransform()};h&&f(c,c.element.style);c.xSetter=c.ySetter=c.alignSetter=c.rotationSetter=function(a,f){"align"===f&&(f="textAlign");c[f]=a;c.htmlUpdateTransform()};c.attr({text:a,x:Math.round(b),y:Math.round(e)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});l.style.whiteSpace="nowrap";c.css=c.htmlCss;h&&(c.add=function(a){var b,
	e=q.box.parentNode,h=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)h.push(a),a=a.parentGroup;t(h.reverse(),function(a){var c,u=A(a.element,"class");u&&(u={className:u});b=a.div=a.div||y("div",u,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||e);c=b.style;g(a,{translateXSetter:function(f,b){c.left=f+"px";a[b]=f;a.doTransform=!0},translateYSetter:function(f,b){c.top=f+"px";a[b]=f;a.doTransform=
	!0}});f(a,c)})}}else b=e;b.appendChild(l);c.added=!0;c.alignOnAdd&&c.htmlUpdateTransform();return c});return c}})})(K);(function(a){var A,y,E=a.createElement,G=a.css,t=a.defined,g=a.deg2rad,d=a.discardElement,m=a.doc,r=a.each,n=a.erase,p=a.extend;A=a.extendClass;var b=a.isArray,k=a.isNumber,v=a.isObject,B=a.merge;y=a.noop;var e=a.pick,c=a.pInt,l=a.SVGElement,q=a.SVGRenderer,h=a.win;a.svg||(y={docMode8:m&&8===m.documentMode,init:function(a,c){var b=["<",c,' filled="f" stroked="f"'],e=["position: ",
	"absolute",";"],h="div"===c;("shape"===c||h)&&e.push("left:0;top:0;width:1px;height:1px;");e.push("visibility: ",h?"hidden":"visible");b.push(' style="',e.join(""),'"/>');c&&(b=h||"span"===c||"img"===c?b.join(""):a.prepVML(b),this.element=E(b));this.renderer=a},add:function(a){var c=this.renderer,b=this.element,e=c.box,h=a&&a.inverted,e=a?a.element||a:e;a&&(this.parentGroup=a);h&&c.invertChild(b,e);e.appendChild(b);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();
	if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:l.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,c=Math.cos(a*g),b=Math.sin(a*g);G(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",c,", M12=",-b,", M21=",b,", M22=",c,", sizingMethod='auto expand')"].join(""):"none"})},getSpanCorrection:function(a,c,b,h,l){var q=h?Math.cos(h*g):1,d=h?Math.sin(h*g):0,w=e(this.elemHeight,this.element.offsetHeight),
	k;this.xCorr=0>q&&-a;this.yCorr=0>d&&-w;k=0>q*d;this.xCorr+=d*c*(k?1-b:b);this.yCorr-=q*c*(h?k?b:1-b:1);l&&"left"!==l&&(this.xCorr-=a*b*(0>q?-1:1),h&&(this.yCorr-=w*b*(0>d?-1:1)),G(this.element,{textAlign:l}))},pathToVML:function(a){for(var c=a.length,b=[];c--;)k(a[c])?b[c]=Math.round(10*a[c])-5:"Z"===a[c]?b[c]="x":(b[c]=a[c],!a.isArc||"wa"!==a[c]&&"at"!==a[c]||(b[c+5]===b[c+7]&&(b[c+7]+=a[c+7]>a[c+5]?1:-1),b[c+6]===b[c+8]&&(b[c+8]+=a[c+8]>a[c+6]?1:-1)));return b.join(" ")||"x"},clip:function(a){var c=
	this,b;a?(b=a.members,n(b,c),b.push(c),c.destroyClip=function(){n(b,c)},a=a.getCSS(c)):(c.destroyClip&&c.destroyClip(),a={clip:c.docMode8?"inherit":"rect(auto)"});return c.css(a)},css:l.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&d(a)},destroy:function(){this.destroyClip&&this.destroyClip();return l.prototype.destroy.apply(this)},on:function(a,c){this.element["on"+a]=function(){var a=h.event;a.target=a.srcElement;c(a)};return this},cutOffPath:function(a,b){var e;a=a.split(/[ ,]/);
	e=a.length;if(9===e||11===e)a[e-4]=a[e-2]=c(a[e-2])-10*b;return a.join(" ")},shadow:function(a,b,h){var l=[],q,d=this.element,k=this.renderer,w,n=d.style,r,x=d.path,z,p,v,g;x&&"string"!==typeof x.value&&(x="x");p=x;if(a){v=e(a.width,3);g=(a.opacity||.15)/v;for(q=1;3>=q;q++)z=2*v+1-2*q,h&&(p=this.cutOffPath(x.value,z+.5)),r=['<shape isShadow="true" strokeweight="',z,'" filled="false" path="',p,'" coordsize="10 10" style="',d.style.cssText,'" />'],w=E(k.prepVML(r),null,{left:c(n.left)+e(a.offsetX,1),
	top:c(n.top)+e(a.offsetY,1)}),h&&(w.cutOff=z+1),r=['<stroke color="',a.color||"#000000",'" opacity="',g*q,'"/>'],E(k.prepVML(r),null,null,w),b?b.element.appendChild(w):d.parentNode.insertBefore(w,d),l.push(w);this.shadows=l}return this},updateShadows:y,setAttr:function(a,c){this.docMode8?this.element[a]=c:this.element.setAttribute(a,c)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,c,b){(b.getElementsByTagName("stroke")[0]||E(this.renderer.prepVML(["<stroke/>"]),
	null,null,b))[c]=a||"solid";this[c]=a},dSetter:function(a,c,b){var e=this.shadows;a=a||[];this.d=a.join&&a.join(" ");b.path=a=this.pathToVML(a);if(e)for(b=e.length;b--;)e[b].path=e[b].cutOff?this.cutOffPath(a,e[b].cutOff):a;this.setAttr(c,a)},fillSetter:function(a,c,b){var e=b.nodeName;"SPAN"===e?b.style.color=a:"IMG"!==e&&(b.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,b,c,this)))},"fill-opacitySetter":function(a,c,b){E(this.renderer.prepVML(["<",c.split("-")[0],' opacity="',
	a,'"/>']),null,null,b)},opacitySetter:y,rotationSetter:function(a,c,b){b=b.style;this[c]=b[c]=a;b.left=-Math.round(Math.sin(a*g)+1)+"px";b.top=Math.round(Math.cos(a*g))+"px"},strokeSetter:function(a,c,b){this.setAttr("strokecolor",this.renderer.color(a,b,c,this))},"stroke-widthSetter":function(a,c,b){b.stroked=!!a;this[c]=a;k(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,c){this.setAttr(c,a)},visibilitySetter:function(a,c,b){"inherit"===a&&(a="visible");this.shadows&&r(this.shadows,
	function(b){b.style[c]=a});"DIV"===b.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(b.style[c]=a?"visible":"hidden"),c="top");b.style[c]=a},displaySetter:function(a,c,b){b.style[c]=a},xSetter:function(a,c,b){this[c]=a;"x"===c?c="left":"y"===c&&(c="top");this.updateClipping?(this[c]=a,this.updateClipping()):b.style[c]=a},zIndexSetter:function(a,c,b){b.style[c]=a}},y["stroke-opacitySetter"]=y["fill-opacitySetter"],a.VMLElement=y=A(l,y),y.prototype.ySetter=y.prototype.widthSetter=y.prototype.heightSetter=
	y.prototype.xSetter,y={Element:y,isIE8:-1<h.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,c,b){var e,h;this.alignedObjects=[];e=this.createElement("div").css({position:"relative"});h=e.element;a.appendChild(e.element);this.isVML=!0;this.box=h;this.boxWrapper=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(c,b,!1);if(!m.namespaces.hcv){m.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{m.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(l){m.styleSheets[0].cssText+=
	"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,c,b,e){var h=this.createElement(),l=v(a);return p(h,{members:[],count:0,left:(l?a.x:a)+1,top:(l?a.y:c)+1,width:(l?a.width:b)-1,height:(l?a.height:e)-1,getCSS:function(a){var c=a.element,f=c.nodeName,b=a.inverted,x=this.top-("shape"===f?c.offsetTop:0),z=this.left,c=z+this.width,e=x+this.height,x={clip:"rect("+Math.round(b?
	z:x)+"px,"+Math.round(b?e:c)+"px,"+Math.round(b?c:e)+"px,"+Math.round(b?x:z)+"px)"};!b&&a.docMode8&&"DIV"===f&&p(x,{width:c+"px",height:e+"px"});return x},updateClipping:function(){r(h.members,function(a){a.element&&a.css(h.getCSS(a))})}})},color:function(c,b,e,h){var l=this,q,d=/^rgba/,k,n,p="none";c&&c.linearGradient?n="gradient":c&&c.radialGradient&&(n="pattern");if(n){var x,z,v=c.linearGradient||c.radialGradient,g,m,L,B,t,Q="";c=c.stops;var P,Y=[],y=function(){k=['<fill colors="'+Y.join(",")+
	'" opacity="',L,'" o:opacity2="',m,'" type="',n,'" ',Q,'focus="100%" method="any" />'];E(l.prepVML(k),null,null,b)};g=c[0];P=c[c.length-1];0<g[0]&&c.unshift([0,g[1]]);1>P[0]&&c.push([1,P[1]]);r(c,function(c,f){d.test(c[1])?(q=a.color(c[1]),x=q.get("rgb"),z=q.get("a")):(x=c[1],z=1);Y.push(100*c[0]+"% "+x);f?(L=z,B=x):(m=z,t=x)});if("fill"===e)if("gradient"===n)e=v.x1||v[0]||0,c=v.y1||v[1]||0,g=v.x2||v[2]||0,v=v.y2||v[3]||0,Q='angle="'+(90-180*Math.atan((v-c)/(g-e))/Math.PI)+'"',y();else{var p=v.r,
	A=2*p,G=2*p,Z=v.cx,aa=v.cy,W=b.radialReference,U,p=function(){W&&(U=h.getBBox(),Z+=(W[0]-U.x)/U.width-.5,aa+=(W[1]-U.y)/U.height-.5,A*=W[2]/U.width,G*=W[2]/U.height);Q='src="'+a.getOptions().global.VMLRadialGradientURL+'" size="'+A+","+G+'" origin="0.5,0.5" position="'+Z+","+aa+'" color2="'+t+'" ';y()};h.added?p():h.onAdd=p;p=B}else p=x}else d.test(c)&&"IMG"!==b.tagName?(q=a.color(c),h[e+"-opacitySetter"](q.get("a"),e,b),p=q.get("rgb")):(p=b.getElementsByTagName(e),p.length&&(p[0].opacity=1,p[0].type=
	"solid"),p=c);return p},prepVML:function(a){var c=this.isIE8;a=a.join("");c?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=-1===a.indexOf('style="')?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:q.prototype.html,path:function(a){var c={coordsize:"10 10"};b(a)?c.d=a:v(a)&&p(c,a);return this.createElement("shape").attr(c)},circle:function(a,
	c,b){var e=this.symbol("circle");v(a)&&(b=a.r,c=a.y,a=a.x);e.isCircle=!0;e.r=b;return e.attr({x:a,y:c})},g:function(a){var c;a&&(c={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(c)},image:function(a,c,b,e,h){var l=this.createElement("img").attr({src:a});1<arguments.length&&l.attr({x:c,y:b,width:e,height:h});return l},createElement:function(a){return"rect"===a?this.symbol(a):q.prototype.createElement.call(this,a)},invertChild:function(a,b){var e=this,h=b.style,
	l="IMG"===a.tagName&&a.style;G(a,{flip:"x",left:c(h.width)-(l?c(l.top):1),top:c(h.height)-(l?c(l.left):1),rotation:-90});r(a.childNodes,function(c){e.invertChild(c,a)})},symbols:{arc:function(a,c,b,e,h){var l=h.start,q=h.end,d=h.r||b||e;b=h.innerR;e=Math.cos(l);var k=Math.sin(l),n=Math.cos(q),x=Math.sin(q);if(0===q-l)return["x"];l=["wa",a-d,c-d,a+d,c+d,a+d*e,c+d*k,a+d*n,c+d*x];h.open&&!b&&l.push("e","M",a,c);l.push("at",a-b,c-b,a+b,c+b,a+b*n,c+b*x,a+b*e,c+b*k,"x","e");l.isArc=!0;return l},circle:function(a,
	c,b,e,h){h&&t(h.r)&&(b=e=2*h.r);h&&h.isCircle&&(a-=b/2,c-=e/2);return["wa",a,c,a+b,c+e,a+b,c+e/2,a+b,c+e/2,"e"]},rect:function(a,c,b,e,h){return q.prototype.symbols[t(h)&&h.r?"callout":"square"].call(0,a,c,b,e,h)}}},a.VMLRenderer=A=function(){this.init.apply(this,arguments)},A.prototype=B(q.prototype,y),a.Renderer=A);q.prototype.measureSpanWidth=function(a,c){var b=m.createElement("span"),e;e=m.createTextNode(a);b.appendChild(e);G(b,c);this.box.appendChild(b);e=b.offsetWidth;d(b);return e}})(K);(function(a){function A(){var m=
	a.defaultOptions.global,r,n=m.useUTC,p=n?"getUTC":"get",b=n?"setUTC":"set";a.Date=r=m.Date||d.Date;r.hcTimezoneOffset=n&&m.timezoneOffset;r.hcGetTimezoneOffset=n&&m.getTimezoneOffset;r.hcMakeTime=function(a,b,d,e,c,l){var q;n?(q=r.UTC.apply(0,arguments),q+=G(q)):q=(new r(a,b,g(d,1),g(e,0),g(c,0),g(l,0))).getTime();return q};E("Minutes Hours Day Date Month FullYear".split(" "),function(a){r["hcGet"+a]=p+a});E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){r["hcSet"+
	a]=b+a})}var y=a.color,E=a.each,G=a.getTZOffset,t=a.merge,g=a.pick,d=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
	decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com@product.cdnpath@/5.0.0/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},
	title:{text:"Chart title",align:"center",margin:15,style:{color:"#333333",fontSize:"18px"},widthAdjust:-44},subtitle:{text:"",align:"center",style:{color:"#666666"},widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold"},
	itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
	second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:y("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",
	pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(d){a.defaultOptions=t(!0,a.defaultOptions,d);A();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;A()})(K);(function(a){var A=a.arrayMax,y=a.arrayMin,E=a.defined,G=a.destroyObjectProperties,
	t=a.each,g=a.erase,d=a.merge,m=a.pick;a.PlotLineOrBand=function(a,d){this.axis=a;d&&(this.options=d,this.id=d.id)};a.PlotLineOrBand.prototype={render:function(){var a=this,n=a.axis,p=n.horiz,b=a.options,k=b.label,v=a.label,g=b.to,e=b.from,c=b.value,l=E(e)&&E(g),q=E(c),h=a.svgElem,f=!h,u=[],D,H=b.color,F=m(b.zIndex,0),t=b.events,u={"class":"highcharts-plot-"+(l?"band ":"line ")+(b.className||"")},C={},w=n.chart.renderer,J=l?"bands":"lines",M=n.log2lin;n.isLog&&(e=M(e),g=M(g),c=M(c));q?(u={stroke:H,
	"stroke-width":b.width},b.dashStyle&&(u.dashstyle=b.dashStyle)):l&&(H&&(u.fill=H),b.borderWidth&&(u.stroke=b.borderColor,u["stroke-width"]=b.borderWidth));C.zIndex=F;J+="-"+F;(H=n[J])||(n[J]=H=w.g("plot-"+J).attr(C).add());f&&(a.svgElem=h=w.path().attr(u).add(H));if(q)u=n.getPlotLinePath(c,h.strokeWidth());else if(l)u=n.getPlotBandPath(e,g,b);else return;if(f&&u&&u.length){if(h.attr({d:u}),t)for(D in b=function(c){h.on(c,function(b){t[c].apply(a,[b])})},t)b(D)}else h&&(u?(h.show(),h.animate({d:u})):
	(h.hide(),v&&(a.label=v=v.destroy())));k&&E(k.text)&&u&&u.length&&0<n.width&&0<n.height&&!u.flat?(k=d({align:p&&l&&"center",x:p?!l&&4:10,verticalAlign:!p&&l&&"middle",y:p?l?16:10:l?6:-4,rotation:p&&!l&&90},k),this.renderLabel(k,u,l,F)):v&&v.hide();return a},renderLabel:function(a,d,p,b){var k=this.label,v=this.axis.chart.renderer;k||(k={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(p?"band":"line")+"-label "+(a.className||"")},k.zIndex=b,this.label=k=v.text(a.text,0,0,
	a.useHTML).attr(k).add(),k.css(a.style));b=[d[1],d[4],p?d[6]:d[1]];d=[d[2],d[5],p?d[7]:d[2]];p=y(b);v=y(d);k.align(a,!1,{x:p,y:v,width:A(b)-p,height:A(d)-v});k.show()},destroy:function(){g(this.axis.plotLinesAndBands,this);delete this.axis;G(this)}};a.AxisPlotLineOrBandExtension={getPlotBandPath:function(a,d){var p=this.getPlotLinePath(d,null,null,!0),b=this.getPlotLinePath(a,null,null,!0);b&&p?(b.flat=b.toString()===p.toString(),b.push(p[4],p[5],p[1],p[2])):b=null;return b},addPlotBand:function(a){return this.addPlotBandOrLine(a,
	"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(d,n){var p=(new a.PlotLineOrBand(this,d)).render(),b=this.userOptions;p&&(n&&(b[n]=b[n]||[],b[n].push(d)),this.plotLinesAndBands.push(p));return p},removePlotBandOrLine:function(a){for(var d=this.plotLinesAndBands,p=this.options,b=this.userOptions,k=d.length;k--;)d[k].id===a&&d[k].destroy();t([p.plotLines||[],b.plotLines||[],p.plotBands||[],b.plotBands||[]],function(b){for(k=b.length;k--;)b[k].id===
	a&&g(b,b[k])})}}})(K);(function(a){var A=a.correctFloat,y=a.defined,E=a.destroyObjectProperties,G=a.isNumber,t=a.merge,g=a.pick,d=a.stop,m=a.deg2rad;a.Tick=function(a,d,p,b){this.axis=a;this.pos=d;this.type=p||"";this.isNew=!0;p||b||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,d=a.options,p=a.chart,b=a.categories,k=a.names,v=this.pos,m=d.labels,e=a.tickPositions,c=v===e[0],l=v===e[e.length-1],k=b?g(b[v],k[v],v):v,b=this.label,e=e.info,q;a.isDatetimeAxis&&e&&(q=d.dateTimeLabelFormats[e.higherRanks[v]||
	e.unitName]);this.isFirst=c;this.isLast=l;d=a.labelFormatter.call({axis:a,chart:p,isFirst:c,isLast:l,dateTimeLabelFormat:q,value:a.isLog?A(a.lin2log(k)):k});y(b)?b&&b.attr({text:d}):(this.labelLength=(this.label=b=y(d)&&m.enabled?p.renderer.text(d,0,0,m.useHTML).css(t(m.style)).add(a.labelGroup):null)&&b.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var d=this.axis,p=a.x,b=d.chart.chartWidth,
	k=d.chart.spacing,v=g(d.labelLeft,Math.min(d.pos,k[3])),k=g(d.labelRight,Math.max(d.pos+d.len,b-k[1])),B=this.label,e=this.rotation,c={left:0,center:.5,right:1}[d.labelAlign],l=B.getBBox().width,q=d.getSlotWidth(),h=q,f=1,u,D={};if(e)0>e&&p-c*l<v?u=Math.round(p/Math.cos(e*m)-v):0<e&&p+c*l>k&&(u=Math.round((b-p)/Math.cos(e*m)));else if(b=p+(1-c)*l,p-c*l<v?h=a.x+h*(1-c)-v:b>k&&(h=k-a.x+h*c,f=-1),h=Math.min(q,h),h<q&&"center"===d.labelAlign&&(a.x+=f*(q-h-c*(q-Math.min(l,h)))),l>h||d.autoRotation&&(B.styles||
	{}).width)u=h;u&&(D.width=u,(d.options.labels.style||{}).textOverflow||(D.textOverflow="ellipsis"),B.css(D))},getPosition:function(a,d,p,b){var k=this.axis,v=k.chart,g=b&&v.oldChartHeight||v.chartHeight;return{x:a?k.translate(d+p,null,null,b)+k.transB:k.left+k.offset+(k.opposite?(b&&v.oldChartWidth||v.chartWidth)-k.right-k.left:0),y:a?g-k.bottom+k.offset-(k.opposite?k.height:0):g-k.translate(d+p,null,null,b)-k.transB}},getLabelPosition:function(a,d,p,b,k,v,g,e){var c=this.axis,l=c.transA,q=c.reversed,
	h=c.staggerLines,f=c.tickRotCorr||{x:0,y:0},u=k.y;y(u)||(u=0===c.side?p.rotation?-8:-p.getBBox().height:2===c.side?f.y+8:Math.cos(p.rotation*m)*(f.y-p.getBBox(!1,0).height/2));a=a+k.x+f.x-(v&&b?v*l*(q?-1:1):0);d=d+u-(v&&!b?v*l*(q?1:-1):0);h&&(p=g/(e||1)%h,c.opposite&&(p=h-p-1),d+=c.labelOffset/h*p);return{x:a,y:Math.round(d)}},getMarkPath:function(a,d,p,b,k,v){return v.crispLine(["M",a,d,"L",a+(k?0:-p),d+(k?p:0)],b)},render:function(a,n,p){var b=this.axis,k=b.options,v=b.chart.renderer,m=b.horiz,
	e=this.type,c=this.label,l=this.pos,q=k.labels,h=this.gridLine,f=e?e+"Tick":"tick",u=b.tickSize(f),D=this.mark,H=!D,F=q.step,t={},C=!0,w=b.tickmarkOffset,J=this.getPosition(m,l,w,n),M=J.x,J=J.y,x=m&&M===b.pos+b.len||!m&&J===b.pos?-1:1,z=e?e+"Grid":"grid",N=k[z+"LineWidth"],O=k[z+"LineColor"],S=k[z+"LineDashStyle"],z=g(k[f+"Width"],!e&&b.isXAxis?1:0),f=k[f+"Color"];p=g(p,1);this.isActive=!0;h||(t.stroke=O,t["stroke-width"]=N,S&&(t.dashstyle=S),e||(t.zIndex=1),n&&(t.opacity=0),this.gridLine=h=v.path().attr(t).addClass("highcharts-"+
	(e?e+"-":"")+"grid-line").add(b.gridGroup));if(!n&&h&&(l=b.getPlotLinePath(l+w,h.strokeWidth()*x,n,!0)))h[this.isNew?"attr":"animate"]({d:l,opacity:p});u&&(b.opposite&&(u[0]=-u[0]),H&&(this.mark=D=v.path().addClass("highcharts-"+(e?e+"-":"")+"tick").add(b.axisGroup),D.attr({stroke:f,"stroke-width":z})),D[H?"attr":"animate"]({d:this.getMarkPath(M,J,u[0],D.strokeWidth()*x,m,v),opacity:p}));c&&G(M)&&(c.xy=J=this.getLabelPosition(M,J,c,m,q,w,a,F),this.isFirst&&!this.isLast&&!g(k.showFirstLabel,1)||this.isLast&&
	!this.isFirst&&!g(k.showLastLabel,1)?C=!1:!m||b.isRadial||q.step||q.rotation||n||0===p||this.handleOverflow(J),F&&a%F&&(C=!1),C&&G(J.y)?(J.opacity=p,c[this.isNew?"attr":"animate"](J)):(d(c),c.attr("y",-9999)),this.isNew=!1)},destroy:function(){E(this,this.axis)}}})(K);(function(a){var A=a.addEvent,y=a.animObject,E=a.arrayMax,G=a.arrayMin,t=a.AxisPlotLineOrBandExtension,g=a.color,d=a.correctFloat,m=a.defaultOptions,r=a.defined,n=a.deg2rad,p=a.destroyObjectProperties,b=a.each,k=a.error,v=a.extend,B=
	a.fireEvent,e=a.format,c=a.getMagnitude,l=a.grep,q=a.inArray,h=a.isArray,f=a.isNumber,u=a.isString,D=a.merge,H=a.normalizeTickInterval,F=a.pick,I=a.PlotLineOrBand,C=a.removeEvent,w=a.splat,J=a.syncTimeout,M=a.Tick;a.Axis=function(){this.init.apply(this,arguments)};a.Axis.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",
	cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,
	labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textShadow:"1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],
	x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,c){var b=c.isX;this.chart=a;this.horiz=a.inverted?!b:b;this.isXAxis=b;this.coll=this.coll||(b?"xAxis":"yAxis");this.opposite=c.opposite;this.side=c.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(c);var f=this.options,e=f.type;this.labelFormatter=f.labels.formatter||this.defaultLabelFormatter;this.userOptions=c;this.minPixelPadding=0;this.reversed=f.reversed;this.visible=
	!1!==f.visible;this.zoomEnabled=!1!==f.zoomEnabled;this.hasNames="category"===e||!0===f.categories;this.categories=f.categories||this.hasNames;this.names=this.names||[];this.isLog="logarithmic"===e;this.isDatetimeAxis="datetime"===e;this.isLinked=r(f.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=f.minRange||f.maxZoom;this.range=f.range;this.offset=f.offset||0;this.stacks={};this.oldStacks={};
	this.stacksTouched=0;this.min=this.max=null;this.crosshair=F(f.crosshair,w(a.options.tooltip.crosshairs)[b?0:1],!1);var h,f=this.options.events;-1===q(this,a.axes)&&(b?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];a.inverted&&b&&void 0===this.reversed&&(this.reversed=!0);this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(h in f)A(this,h,f[h]);this.isLog&&(this.val2lin=this.log2lin,this.lin2val=this.lin2log)},setOptions:function(a){this.options=
	D(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],D(m[this.coll],a))},defaultLabelFormatter:function(){var c=this.axis,b=this.value,f=c.categories,h=this.dateTimeLabelFormat,l=m.lang.numericSymbols,q=l&&l.length,d,u=c.options.labels.format,c=c.isLog?b:c.tickInterval;if(u)d=e(u,this);else if(f)d=b;else if(h)d=a.dateFormat(h,b);else if(q&&1E3<=c)for(;q--&&
	void 0===d;)f=Math.pow(1E3,q+1),c>=f&&0===10*b%f&&null!==l[q]&&0!==b&&(d=a.numberFormat(b/f,-1)+l[q]);void 0===d&&(d=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return d},getSeriesExtremes:function(){var a=this,c=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();b(a.series,function(b){if(b.visible||!c.options.chart.ignoreHiddenSeries){var e=b.options,h=e.threshold,d;a.hasVisibleSeries=!0;a.isLog&&
	0>=h&&(h=null);if(a.isXAxis)e=b.xData,e.length&&(b=G(e),f(b)||b instanceof Date||(e=l(e,function(a){return f(a)}),b=G(e)),a.dataMin=Math.min(F(a.dataMin,e[0]),b),a.dataMax=Math.max(F(a.dataMax,e[0]),E(e)));else if(b.getExtremes(),d=b.dataMax,b=b.dataMin,r(b)&&r(d)&&(a.dataMin=Math.min(F(a.dataMin,b),b),a.dataMax=Math.max(F(a.dataMax,d),d)),r(h)&&(a.threshold=h),!e.softThreshold||a.isLog)a.softThreshold=!1}})},translate:function(a,c,b,e,h,l){var d=this.linkedParent||this,q=1,u=0,k=e?d.oldTransA:d.transA;
	e=e?d.oldMin:d.min;var w=d.minPixelPadding;h=(d.isOrdinal||d.isBroken||d.isLog&&h)&&d.lin2val;k||(k=d.transA);b&&(q*=-1,u=d.len);d.reversed&&(q*=-1,u-=q*(d.sector||d.len));c?(a=(a*q+u-w)/k+e,h&&(a=d.lin2val(a))):(h&&(a=d.val2lin(a)),"between"===l&&(l=.5),a=q*(a-e)*k+u+q*w+(f(l)?k*l*d.pointRange:0));return a},toPixels:function(a,c){return this.translate(a,!1,!this.horiz,null,!0)+(c?0:this.pos)},toValue:function(a,c){return this.translate(a-(c?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,
	c,b,e,h){var l=this.chart,d=this.left,q=this.top,u,k,w=b&&l.oldChartHeight||l.chartHeight,C=b&&l.oldChartWidth||l.chartWidth,p;u=this.transB;var v=function(a,c,b){if(a<c||a>b)e?a=Math.min(Math.max(c,a),b):p=!0;return a};h=F(h,this.translate(a,null,null,b));a=b=Math.round(h+u);u=k=Math.round(w-h-u);f(h)?this.horiz?(u=q,k=w-this.bottom,a=b=v(a,d,d+this.width)):(a=d,b=C-this.right,u=k=v(u,q,q+this.height)):p=!0;return p&&!e?null:l.renderer.crispLine(["M",a,u,"L",b,k],c||1)},getLinearTickPositions:function(a,
	c,b){var e,h=d(Math.floor(c/a)*a),l=d(Math.ceil(b/a)*a),q=[];if(c===b&&f(c))return[c];for(c=h;c<=l;){q.push(c);c=d(c+a);if(c===e)break;e=c}return q},getMinorTickPositions:function(){var a=this.options,c=this.tickPositions,b=this.minorTickInterval,f=[],e,h=this.pointRangePadding||0;e=this.min-h;var h=this.max+h,l=h-e;if(l&&l/b<this.len/3)if(this.isLog)for(h=c.length,e=1;e<h;e++)f=f.concat(this.getLogTickPositions(b,c[e-1],c[e],!0));else if(this.isDatetimeAxis&&"auto"===a.minorTickInterval)f=f.concat(this.getTimeTicks(this.normalizeTimeTickInterval(b),
	e,h,a.startOfWeek));else for(c=e+(c[0]-e)%b;c<=h;c+=b)f.push(c);0!==f.length&&this.trimTicks(f,a.startOnTick,a.endOnTick);return f},adjustForMinRange:function(){var a=this.options,c=this.min,f=this.max,e,h=this.dataMax-this.dataMin>=this.minRange,l,d,q,u,k,w;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(r(a.min)||r(a.max)?this.minRange=null:(b(this.series,function(a){u=a.xData;for(d=k=a.xIncrement?1:u.length-1;0<d;d--)if(q=u[d]-u[d-1],void 0===l||q<l)l=q}),this.minRange=Math.min(5*l,this.dataMax-
	this.dataMin)));f-c<this.minRange&&(w=this.minRange,e=(w-f+c)/2,e=[c-e,F(a.min,c-e)],h&&(e[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),c=E(e),f=[c+w,F(a.max,c+w)],h&&(f[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),f=G(f),f-c<w&&(e[0]=f-w,e[1]=F(a.min,f-w),c=E(e)));this.min=c;this.max=f},getClosest:function(){var a;this.categories?a=1:b(this.series,function(c){var b=c.closestPointRange;!c.noSharedTooltip&&r(b)&&(a=r(a)?Math.min(a,b):b)});return a},nameToX:function(a){var c=h(this.categories),
	b=c?this.categories:this.names,f=a.options.x,e;a.series.requireSorting=!1;r(f)||(f=!1===this.options.nameToX?a.series.autoIncrement():q(a.name,b));-1===f?c||(e=b.length):e=f;this.names[e]=a.name;return e},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=void 0,b(this.series||[],function(c){c.processedXData||(c.processData(),c.generatePoints());b(c.points,function(b,f){var e;b.options&&void 0===b.options.x&&(e=a.nameToX(b),e!==b.x&&(b.x=e,c.xData[f]=e))})}))},
	setAxisTranslation:function(a){var c=this,f=c.max-c.min,e=c.axisPointRange||0,h,l=0,d=0,q=c.linkedParent,k=!!c.categories,w=c.transA,C=c.isXAxis;if(C||k||e)q?(l=q.minPointOffset,d=q.pointRangePadding):(h=c.getClosest(),b(c.series,function(a){var b=k?1:C?F(a.options.pointRange,h,0):c.axisPointRange||0;a=a.options.pointPlacement;e=Math.max(e,b);c.single||(l=Math.max(l,u(a)?0:b/2),d=Math.max(d,"on"===a?0:b))})),q=c.ordinalSlope&&h?c.ordinalSlope/h:1,c.minPointOffset=l*=q,c.pointRangePadding=d*=q,c.pointRange=
	Math.min(e,f),C&&(c.closestPointRange=h);a&&(c.oldTransA=w);c.translationSlope=c.transA=w=c.len/(f+d||1);c.transB=c.horiz?c.left:c.bottom;c.minPixelPadding=w*l},minFromRange:function(){return this.max-this.range},setTickInterval:function(a){var e=this,h=e.chart,l=e.options,q=e.isLog,u=e.log2lin,w=e.isDatetimeAxis,C=e.isXAxis,p=e.isLinked,v=l.maxPadding,g=l.minPadding,D=l.tickInterval,n=l.tickPixelInterval,J=e.categories,m=e.threshold,M=e.softThreshold,t,I,y,A;w||J||p||this.getTickAmount();y=F(e.userMin,
	l.min);A=F(e.userMax,l.max);p?(e.linkedParent=h[e.coll][l.linkedTo],h=e.linkedParent.getExtremes(),e.min=F(h.min,h.dataMin),e.max=F(h.max,h.dataMax),l.type!==e.linkedParent.options.type&&k(11,1)):(!M&&r(m)&&(e.dataMin>=m?(t=m,g=0):e.dataMax<=m&&(I=m,v=0)),e.min=F(y,t,e.dataMin),e.max=F(A,I,e.dataMax));q&&(!a&&0>=Math.min(e.min,F(e.dataMin,e.min))&&k(10,1),e.min=d(u(e.min),15),e.max=d(u(e.max),15));e.range&&r(e.max)&&(e.userMin=e.min=y=Math.max(e.min,e.minFromRange()),e.userMax=A=e.max,e.range=null);
	B(e,"foundExtremes");e.beforePadding&&e.beforePadding();e.adjustForMinRange();!(J||e.axisPointRange||e.usePercentage||p)&&r(e.min)&&r(e.max)&&(u=e.max-e.min)&&(!r(y)&&g&&(e.min-=u*g),!r(A)&&v&&(e.max+=u*v));f(l.floor)&&(e.min=Math.max(e.min,l.floor));f(l.ceiling)&&(e.max=Math.min(e.max,l.ceiling));M&&r(e.dataMin)&&(m=m||0,!r(y)&&e.min<m&&e.dataMin>=m?e.min=m:!r(A)&&e.max>m&&e.dataMax<=m&&(e.max=m));e.tickInterval=e.min===e.max||void 0===e.min||void 0===e.max?1:p&&!D&&n===e.linkedParent.options.tickPixelInterval?
	D=e.linkedParent.tickInterval:F(D,this.tickAmount?(e.max-e.min)/Math.max(this.tickAmount-1,1):void 0,J?1:(e.max-e.min)*n/Math.max(e.len,n));C&&!a&&b(e.series,function(a){a.processData(e.min!==e.oldMin||e.max!==e.oldMax)});e.setAxisTranslation(!0);e.beforeSetTickPositions&&e.beforeSetTickPositions();e.postProcessTickInterval&&(e.tickInterval=e.postProcessTickInterval(e.tickInterval));e.pointRange&&!D&&(e.tickInterval=Math.max(e.pointRange,e.tickInterval));a=F(l.minTickInterval,e.isDatetimeAxis&&e.closestPointRange);
	!D&&e.tickInterval<a&&(e.tickInterval=a);w||q||D||(e.tickInterval=H(e.tickInterval,null,c(e.tickInterval),F(l.allowDecimals,!(.5<e.tickInterval&&5>e.tickInterval&&1E3<e.max&&9999>e.max)),!!this.tickAmount));this.tickAmount||(e.tickInterval=e.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,c,b=a.tickPositions,e=a.tickPositioner,f=a.startOnTick,h=a.endOnTick,l;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval=
	"auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=c=b&&b.slice();!c&&(c=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),c.length>this.len&&(c=[c[0],c.pop()]),this.tickPositions=
	c,e&&(e=e.apply(this,[this.min,this.max])))&&(this.tickPositions=c=e);this.isLinked||(this.trimTicks(c,f,h),this.min===this.max&&r(this.min)&&!this.tickAmount&&(l=!0,this.min-=.5,this.max+=.5),this.single=l,b||e||this.adjustTickAmount())},trimTicks:function(a,c,b){var e=a[0],f=a[a.length-1],h=this.minPointOffset||0;if(c)this.min=e;else for(;this.min-h>a[0];)a.shift();if(b)this.max=f;else for(;this.max+h<a[a.length-1];)a.pop();0===a.length&&r(e)&&a.push((f+e)/2)},alignToOthers:function(){var a={},
	c,e=this.options;!1!==this.chart.options.chart.alignTicks&&!1!==e.alignTicks&&b(this.chart[this.coll],function(b){var e=b.options,e=[b.horiz?e.left:e.top,e.width,e.height,e.pane].join();b.series.length&&(a[e]?c=!0:a[e]=1)});return c},getTickAmount:function(){var a=this.options,c=a.tickAmount,b=a.tickPixelInterval;!r(a.tickInterval)&&this.len<b&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(c=2);!c&&this.alignToOthers()&&(c=Math.ceil(this.len/b)+1);4>c&&(this.finalTickAmt=c,c=5);this.tickAmount=
	c},adjustTickAmount:function(){var a=this.tickInterval,c=this.tickPositions,b=this.tickAmount,e=this.finalTickAmt,f=c&&c.length;if(f<b){for(;c.length<b;)c.push(d(c[c.length-1]+a));this.transA*=(f-1)/(b-1);this.max=c[c.length-1]}else f>b&&(this.tickInterval*=2,this.setTickPositions());if(r(e)){for(a=b=c.length;a--;)(3===e&&1===a%2||2>=e&&0<a&&a<b-1)&&c.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,c;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();
	c=this.len!==this.oldAxisLength;b(this.series,function(c){if(c.isDirtyData||c.isDirty||c.xAxis.isDirty)a=!0});c||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=c||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},
	setExtremes:function(a,c,e,f,h){var l=this,d=l.chart;e=F(e,!0);b(l.series,function(a){delete a.kdTree});h=v(h,{min:a,max:c});B(l,"setExtremes",h,function(){l.userMin=a;l.userMax=c;l.eventArgs=h;e&&d.redraw(f)})},zoom:function(a,c){var b=this.dataMin,e=this.dataMax,f=this.options,h=Math.min(b,F(f.min,b)),f=Math.max(e,F(f.max,e));this.allowZoomOutside||(r(b)&&a<=h&&(a=h),r(e)&&c>=f&&(c=f));this.displayBtn=void 0!==a||void 0!==c;this.setExtremes(a,c,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var a=
	this.chart,c=this.options,b=c.offsetLeft||0,e=this.horiz,f=F(c.width,a.plotWidth-b+(c.offsetRight||0)),h=F(c.height,a.plotHeight),l=F(c.top,a.plotTop),c=F(c.left,a.plotLeft+b),b=/%$/;b.test(h)&&(h=Math.round(parseFloat(h)/100*a.plotHeight));b.test(l)&&(l=Math.round(parseFloat(l)/100*a.plotHeight+a.plotTop));this.left=c;this.top=l;this.width=f;this.height=h;this.bottom=a.chartHeight-h-l;this.right=a.chartWidth-f-c;this.len=Math.max(e?f:h,0);this.pos=e?c:l},getExtremes:function(){var a=this.isLog,c=
	this.lin2log;return{min:a?d(c(this.min)):this.min,max:a?d(c(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var c=this.isLog,b=this.lin2log,e=c?b(this.min):this.min,c=c?b(this.max):this.max;null===a?a=e:e>a?a=e:c<a&&(a=c);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(F(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var c=this.options,b=c[a+
	"Length"],e=F(c[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(e&&b)return"inside"===c[a+"Position"]&&(b=-b),[b,e]},labelMetrics:function(){return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[0]&&this.ticks[0].label)},unsquish:function(){var a=this.options.labels,c=this.horiz,e=this.tickInterval,f=e,h=this.len/(((this.categories?1:0)+this.max-this.min)/e),l,d=a.rotation,q=this.labelMetrics(),u,k=Number.MAX_VALUE,w,C=function(a){a/=h||1;a=1<
	a?Math.ceil(a):1;return a*e};c?(w=!a.staggerLines&&!a.step&&(r(d)?[d]:h<F(a.autoRotationLimit,80)&&a.autoRotation))&&b(w,function(a){var c;if(a===d||a&&-90<=a&&90>=a)u=C(Math.abs(q.h/Math.sin(n*a))),c=u+Math.abs(a/360),c<k&&(k=c,l=a,f=u)}):a.step||(f=C(q.h));this.autoRotation=w;this.labelRotation=F(l,d);return f},getSlotWidth:function(){var a=this.chart,c=this.horiz,b=this.options.labels,e=Math.max(this.tickPositions.length-(this.categories?0:1),1),f=a.margin[3];return c&&2>(b.step||0)&&!b.rotation&&
	(this.staggerLines||1)*a.plotWidth/e||!c&&(f&&f-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,c=a.renderer,e=this.tickPositions,f=this.ticks,h=this.options.labels,l=this.horiz,d=this.getSlotWidth(),q=Math.max(1,Math.round(d-2*(h.padding||5))),k={},w=this.labelMetrics(),C=h.style&&h.style.textOverflow,p,v=0,g,F;u(h.rotation)||(k.rotation=h.rotation||0);b(e,function(a){(a=f[a])&&a.labelLength>v&&(v=a.labelLength)});this.maxLabelLength=v;if(this.autoRotation)v>q&&v>w.h?
	k.rotation=this.labelRotation:this.labelRotation=0;else if(d&&(p={width:q+"px"},!C))for(p.textOverflow="clip",g=e.length;!l&&g--;)if(F=e[g],q=f[F].label)q.styles&&"ellipsis"===q.styles.textOverflow?q.css({textOverflow:"clip"}):f[F].labelLength>d&&q.css({width:d+"px"}),q.getBBox().height>this.len/e.length-(w.h-w.f)&&(q.specCss={textOverflow:"ellipsis"});k.rotation&&(p={width:(v>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},C||(p.textOverflow="ellipsis"));if(this.labelAlign=h.align||this.autoLabelAlign(this.labelRotation))k.align=
	this.labelAlign;b(e,function(a){var c=(a=f[a])&&a.label;c&&(c.attr(k),p&&c.css(D(p,c.specCss)),delete c.specCss,a.rotation=k.rotation)});this.tickRotCorr=c.rotCorr(w.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||r(this.min)&&r(this.max)&&!!this.tickPositions},getOffset:function(){var a=this,c=a.chart,e=c.renderer,f=a.options,h=a.tickPositions,l=a.ticks,d=a.horiz,q=a.side,u=c.inverted?[1,0,3,2][q]:q,k,w,C=0,p,v=0,g=f.title,D=f.labels,n=0,J=a.opposite,m=c.axisOffset,
	c=c.clipOffset,H=[-1,1,1,-1][q],B,t=f.className,I=a.axisParent,y=this.tickSize("tick");k=a.hasData();a.showAxis=w=k||F(f.showEmpty,!0);a.staggerLines=a.horiz&&D.staggerLines;a.axisGroup||(a.gridGroup=e.g("grid").attr({zIndex:f.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(t||"")).add(I),a.axisGroup=e.g("axis").attr({zIndex:f.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(t||"")).add(I),a.labelGroup=e.g("axis-labels").attr({zIndex:D.zIndex||7}).addClass("highcharts-"+
	a.coll.toLowerCase()+"-labels "+(t||"")).add(I));if(k||a.isLinked)b(h,function(c){l[c]?l[c].addLabel():l[c]=new M(a,c)}),a.renderUnsquish(),!1===D.reserveSpace||0!==q&&2!==q&&{1:"left",3:"right"}[q]!==a.labelAlign&&"center"!==a.labelAlign||b(h,function(a){n=Math.max(l[a].getLabelSize(),n)}),a.staggerLines&&(n*=a.staggerLines,a.labelOffset=n*(a.opposite?-1:1));else for(B in l)l[B].destroy(),delete l[B];g&&g.text&&!1!==g.enabled&&(a.axisTitle||((B=g.textAlign)||(B=(d?{low:"left",middle:"center",high:"right"}:
	{low:J?"right":"left",middle:"center",high:J?"left":"right"})[g.align]),a.axisTitle=e.text(g.text,0,0,g.useHTML).attr({zIndex:7,rotation:g.rotation||0,align:B}).addClass("highcharts-axis-title").css(g.style).add(a.axisGroup),a.axisTitle.isNew=!0),w&&(C=a.axisTitle.getBBox()[d?"height":"width"],p=g.offset,v=r(p)?0:F(g.margin,d?5:10)),a.axisTitle[w?"show":"hide"](!0));a.renderLine();a.offset=H*F(f.offset,m[q]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};e=0===q?-a.labelMetrics().h:2===q?a.tickRotCorr.y:
	0;v=Math.abs(n)+v;n&&(v=v-e+H*(d?F(D.y,a.tickRotCorr.y+8*H):D.x));a.axisTitleMargin=F(p,v);m[q]=Math.max(m[q],a.axisTitleMargin+C+H*a.offset,v,k&&h.length&&y?y[0]:0);f=f.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);c[u]=Math.max(c[u],f)},getLinePath:function(a){var c=this.chart,b=this.opposite,e=this.offset,f=this.horiz,h=this.left+(b?this.width:0)+e,e=c.chartHeight-this.bottom-(b?this.height:0)+e;b&&(a*=-1);return c.renderer.crispLine(["M",f?this.left:h,f?e:this.top,"L",f?c.chartWidth-this.right:
	h,f?e:c.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,c=this.left,e=this.top,b=this.len,f=this.options.title,h=a?c:e,l=this.opposite,d=this.offset,q=f.x||0,u=f.y||0,k=this.chart.renderer.fontMetrics(f.style&&f.style.fontSize,this.axisTitle).f,
	b={low:h+(a?0:b),middle:h+b/2,high:h+(a?b:0)}[f.align],c=(a?e+this.height:c)+(a?1:-1)*(l?-1:1)*this.axisTitleMargin+(2===this.side?k:0);return{x:a?b+q:c+(l?this.width:0)+d+q,y:a?c+u-(l?this.height:0)+d:b+u}},render:function(){var a=this,c=a.chart,e=c.renderer,h=a.options,l=a.isLog,d=a.lin2log,q=a.isLinked,u=a.tickPositions,k=a.axisTitle,w=a.ticks,C=a.minorTicks,p=a.alternateBands,v=h.stackLabels,g=h.alternateGridColor,D=a.tickmarkOffset,F=a.axisLine,n=c.hasRendered&&f(a.oldMin),m=a.showAxis,r=y(e.globalAnimation),
	H,B;a.labelEdge.length=0;a.overlap=!1;b([w,C,p],function(a){for(var c in a)a[c].isActive=!1});if(a.hasData()||q)a.minorTickInterval&&!a.categories&&b(a.getMinorTickPositions(),function(c){C[c]||(C[c]=new M(a,c,"minor"));n&&C[c].isNew&&C[c].render(null,!0);C[c].render(null,!1,1)}),u.length&&(b(u,function(c,b){if(!q||c>=a.min&&c<=a.max)w[c]||(w[c]=new M(a,c)),n&&w[c].isNew&&w[c].render(b,!0,.1),w[c].render(b)}),D&&(0===a.min||a.single)&&(w[-1]||(w[-1]=new M(a,-1,null,!0)),w[-1].render(-1))),g&&b(u,
	function(b,e){B=void 0!==u[e+1]?u[e+1]+D:a.max-D;0===e%2&&b<a.max&&B<=a.max+(c.polar?-D:D)&&(p[b]||(p[b]=new I(a)),H=b+D,p[b].options={from:l?d(H):H,to:l?d(B):B,color:g},p[b].render(),p[b].isActive=!0)}),a._addedPlotLB||(b((h.plotLines||[]).concat(h.plotBands||[]),function(c){a.addPlotBandOrLine(c)}),a._addedPlotLB=!0);b([w,C,p],function(a){var b,e,f=[],h=r.duration;for(b in a)a[b].isActive||(a[b].render(b,!1,0),a[b].isActive=!1,f.push(b));J(function(){for(e=f.length;e--;)a[f[e]]&&!a[f[e]].isActive&&
	(a[f[e]].destroy(),delete a[f[e]])},a!==p&&c.hasRendered&&h?h:0)});F&&(F[F.isPlaced?"animate":"attr"]({d:this.getLinePath(F.strokeWidth())}),F.isPlaced=!0,F[m?"show":"hide"](!0));k&&m&&(k[k.isNew?"attr":"animate"](a.getTitlePosition()),k.isNew=!1);v&&v.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&(this.render(),b(this.plotLinesAndBands,function(a){a.render()}));b(this.series,function(a){a.isDirty=!0})},destroy:function(a){var c=this,e=c.stacks,f,h=c.plotLinesAndBands,
	l;a||C(c);for(f in e)p(e[f]),e[f]=null;b([c.ticks,c.minorTicks,c.alternateBands],function(a){p(a)});if(h)for(a=h.length;a--;)h[a].destroy();b("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){c[a]&&(c[a]=c[a].destroy())});h=["names","series","userMax","userMin"];for(l in c)c.hasOwnProperty(l)&&-1===q(l,h)&&delete c[l]},drawCrosshair:function(a,c){var b,e=this.crosshair,f,h=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(r(c)||!F(e.snap,
	!0))?(F(e.snap,!0)?r(c)&&(b=this.isXAxis?c.plotX:this.len-c.plotY):b=this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos,b=this.isRadial?this.getPlotLinePath(this.isXAxis?c.x:F(c.stackY,c.y))||null:this.getPlotLinePath(null,null,null,null,b)||null,null===b?this.hideCrosshair():(f=this.categories&&!this.isRadial,h||(this.cross=h=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(f?"category ":"thin ")+e.className).attr({zIndex:F(e.zIndex,2)}).add(),h.attr({stroke:e.color||
	(f?g("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":F(e.width,1)}),e.dashStyle&&h.attr({dashstyle:e.dashStyle})),h.show().attr({d:b}),f&&h.attr({"stroke-width":this.transA}),this.cross.e=a)):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}};v(a.Axis.prototype,t)})(K);(function(a){var A=a.Axis,y=a.Date,E=a.defaultOptions,G=a.defined,t=a.each,g=a.extend,d=a.getMagnitude,m=a.getTZOffset,r=a.grep,n=a.normalizeTickInterval,p=a.pick,b=a.timeUnits;A.prototype.getTimeTicks=
	function(a,d,n,e){var c=[],l={},q=E.global.useUTC,h,f=new y(d-m(d)),u=y.hcMakeTime,D=a.unitRange,H=a.count;if(G(d)){f[y.hcSetMilliseconds](D>=b.second?0:H*Math.floor(f.getMilliseconds()/H));if(D>=b.second)f[y.hcSetSeconds](D>=b.minute?0:H*Math.floor(f.getSeconds()/H));if(D>=b.minute)f[y.hcSetMinutes](D>=b.hour?0:H*Math.floor(f[y.hcGetMinutes]()/H));if(D>=b.hour)f[y.hcSetHours](D>=b.day?0:H*Math.floor(f[y.hcGetHours]()/H));if(D>=b.day)f[y.hcSetDate](D>=b.month?1:H*Math.floor(f[y.hcGetDate]()/H));D>=
	b.month&&(f[y.hcSetMonth](D>=b.year?0:H*Math.floor(f[y.hcGetMonth]()/H)),h=f[y.hcGetFullYear]());if(D>=b.year)f[y.hcSetFullYear](h-h%H);if(D===b.week)f[y.hcSetDate](f[y.hcGetDate]()-f[y.hcGetDay]()+p(e,1));d=1;if(y.hcTimezoneOffset||y.hcGetTimezoneOffset)f=f.getTime(),f=new y(f+m(f));h=f[y.hcGetFullYear]();e=f.getTime();for(var F=f[y.hcGetMonth](),I=f[y.hcGetDate](),C=!q||!!y.hcGetTimezoneOffset,w=(b.day+(q?m(f):6E4*f.getTimezoneOffset()))%b.day;e<n;)c.push(e),e=D===b.year?u(h+d*H,0):D===b.month?
	u(h,F+d*H):!C||D!==b.day&&D!==b.week?e+D*H:u(h,F,I+d*H*(D===b.day?1:7)),d++;c.push(e);t(r(c,function(a){return D<=b.hour&&a%b.day===w}),function(a){l[a]="day"})}c.info=g(a,{higherRanks:l,totalRange:D*H});return c};A.prototype.normalizeTimeTickInterval=function(a,p){var g=p||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]],e=g[g.length-1],c=b[e[0]],l=e[1],
	q;for(q=0;q<g.length&&!(e=g[q],c=b[e[0]],l=e[1],g[q+1]&&a<=(c*l[l.length-1]+b[g[q+1][0]])/2);q++);c===b.year&&a<5*c&&(l=[1,2,5]);g=n(a/c,l,"year"===e[0]?Math.max(d(a/c),1):1);return{unitRange:c,count:g,unitName:e[0]}}})(K);(function(a){var A=a.Axis,y=a.getMagnitude,E=a.map,G=a.normalizeTickInterval,t=a.pick;A.prototype.getLogTickPositions=function(a,d,m,r){var n=this.options,p=this.len,b=this.lin2log,k=this.log2lin,v=[];r||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),v=this.getLinearTickPositions(a,
	d,m);else if(.08<=a)for(var p=Math.floor(d),B,e,c,l,q,n=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];p<m+1&&!q;p++)for(e=n.length,B=0;B<e&&!q;B++)c=k(b(p)*n[B]),c>d&&(!r||l<=m)&&void 0!==l&&v.push(l),l>m&&(q=!0),l=c;else d=b(d),m=b(m),a=n[r?"minorTickInterval":"tickInterval"],a=t("auto"===a?null:a,this._minorAutoInterval,n.tickPixelInterval/(r?5:1)*(m-d)/((r?p/this.tickPositions.length:p)||1)),a=G(a,null,y(a)),v=E(this.getLinearTickPositions(a,d,m),k),r||(this._minorAutoInterval=a/5);r||(this.tickInterval=
	a);return v};A.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};A.prototype.lin2log=function(a){return Math.pow(10,a)}})(K);(function(a){var A=a.addEvent,y=a.dateFormat,E=a.each,G=a.extend,t=a.format,g=a.isNumber,d=a.map,m=a.merge,r=a.pick,n=a.splat,p=a.stop,b=a.syncTimeout,k=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,b){this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=b.split&&!a.inverted;
	this.shared=b.shared||this.split;this.split?this.label=this.chart.renderer.g("tooltip"):(this.label=a.renderer.label("",0,0,b.shape||"callout",null,null,b.useHTML,null,"tooltip").attr({padding:b.padding,r:b.borderRadius,display:"none"}),this.label.attr({fill:b.backgroundColor,"stroke-width":b.borderWidth}).css(b.style).shadow(b.shadow));this.label.attr({zIndex:8}).add()},update:function(a){this.destroy();this.init(this.chart,m(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());
	clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,e,c){var l=this,d=l.now,h=!1!==l.options.animation&&!l.isHidden&&(1<Math.abs(a-d.x)||1<Math.abs(b-d.y)),f=l.followPointer||1<l.len;G(d,{x:h?(2*d.x+a)/3:a,y:h?(d.y+b)/2:b,anchorX:f?void 0:h?(2*d.anchorX+e)/3:e,anchorY:f?void 0:h?(d.anchorY+c)/2:c});l.label.attr(d);h&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){l&&l.move(a,b,e,c)},32))},hide:function(a){var d=this;clearTimeout(this.hideTimer);
	a=r(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=b(function(){d.label[a?"fadeOut":"hide"]();d.isHidden=!0},a))},getAnchor:function(a,b){var e,c=this.chart,l=c.inverted,q=c.plotTop,h=c.plotLeft,f=0,u=0,k,p;a=n(a);e=a[0].tooltipPos;this.followPointer&&b&&(void 0===b.chartX&&(b=c.pointer.normalize(b)),e=[b.chartX-c.plotLeft,b.chartY-q]);e||(E(a,function(a){k=a.series.yAxis;p=a.series.xAxis;f+=a.plotX+(!l&&p?p.left-h:0);u+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!l&&k?k.top-q:0)}),
	f/=a.length,u/=a.length,e=[l?c.plotWidth-u:f,this.shared&&!l&&1<a.length&&b?b.chartY-q:l?c.plotHeight-f:u]);return d(e,Math.round)},getPosition:function(a,b,e){var c=this.chart,l=this.distance,d={},h=e.h||0,f,u=["y",c.chartHeight,b,e.plotY+c.plotTop,c.plotTop,c.plotTop+c.plotHeight],k=["x",c.chartWidth,a,e.plotX+c.plotLeft,c.plotLeft,c.plotLeft+c.plotWidth],p=!this.followPointer&&r(e.ttBelow,!c.inverted===!!e.negative),g=function(a,c,b,e,f,u){var k=b<e-l,w=e+l+b<c,C=e-l-b;e+=l;if(p&&w)d[a]=e;else if(!p&&
	k)d[a]=C;else if(k)d[a]=Math.min(u-b,0>C-h?C:C-h);else if(w)d[a]=Math.max(f,e+h+b>c?e:e+h);else return!1},n=function(a,c,b,e){var f;e<l||e>c-l?f=!1:d[a]=e<b/2?1:e>c-b/2?c-b-2:e-b/2;return f},C=function(a){var c=u;u=k;k=c;f=a},w=function(){!1!==g.apply(0,u)?!1!==n.apply(0,k)||f||(C(!0),w()):f?d.x=d.y=0:(C(!0),w())};(c.inverted||1<this.len)&&C();w();return d},defaultFormatter:function(a){var b=this.points||n(this),e;e=[a.tooltipFooterHeaderFormatter(b[0])];e=e.concat(a.bodyFormatter(b));e.push(a.tooltipFooterHeaderFormatter(b[0],
	!0));return e},refresh:function(a,b){var e=this.chart,c=this.label,l=this.options,d,h,f,u={},k,g=[];k=l.formatter||this.defaultFormatter;var u=e.hoverPoints,F=this.shared;clearTimeout(this.hideTimer);this.followPointer=n(a)[0].series.tooltipOptions.followPointer;f=this.getAnchor(a,b);d=f[0];h=f[1];!F||a.series&&a.series.noSharedTooltip?u=a.getLabelConfig():(e.hoverPoints=a,u&&E(u,function(a){a.setState()}),E(a,function(a){a.setState("hover");g.push(a.getLabelConfig())}),u={x:a[0].category,y:a[0].y},
	u.points=g,this.len=g.length,a=a[0]);k=k.call(u,this);u=a.series;this.distance=r(u.tooltipOptions.distance,16);!1===k?this.hide():(this.isHidden&&(p(c),c.attr({opacity:1,display:"block"}).show()),this.split?this.renderSplit(k,e.hoverPoints):(c.attr({text:k.join?k.join(""):k}),c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+r(a.colorIndex,u.colorIndex)),c.attr({stroke:l.borderColor||a.color||u.color||"#666666"}),this.updatePosition({plotX:d,plotY:h,negative:a.negative,ttBelow:a.ttBelow,
	h:f[2]||0})),this.isHidden=!1)},renderSplit:function(b,d){var e=this,c=[],l=this.chart,q=l.renderer,h=!0,f=this.options,u;E(b.slice(0,b.length-1),function(a,b){var k=d[b-1]||{isHeader:!0,plotX:d[0].plotX},p=k.series||e,C=p.tt,w=k.series||{},g="highcharts-color-"+r(k.colorIndex,w.colorIndex,"none");C||(p.tt=C=q.label(null,null,null,k.isHeader&&"callout").addClass("highcharts-tooltip-box "+g).attr({padding:f.padding,r:f.borderRadius,fill:f.backgroundColor,stroke:k.color||w.color||"#333333","stroke-width":f.borderWidth}).add(e.label),
	k.series&&(C.connector=q.path().addClass("highcharts-tooltip-connector "+g).attr({"stroke-width":w.options.lineWidth||2,stroke:k.color||w.color||"#666666"}).add(e.label),A(k.series,"hide",function(){var a=this.tt;a.connector=a.connector.destroy();a.destroy();this.tt=void 0})));C.isActive=!0;C.attr({text:a});w=C.getBBox();k.isHeader?(u=w.height,g=k.plotX+l.plotLeft-w.width/2):g=k.plotX+l.plotLeft-r(f.distance,16)-w.width;0>g&&(h=!1);w=(k.series&&k.series.yAxis&&k.series.yAxis.pos)+(k.plotY||0);w-=
	l.plotTop;c.push({target:k.isHeader?l.plotHeight+u:w,rank:k.isHeader?1:0,size:p.tt.getBBox().height+1,point:k,x:g,tt:C})});E(l.series,function(a){var c=a.tt;c&&(c.isActive?c.isActive=!1:(c.connector=c.connector.destroy(),c.destroy(),a.tt=void 0))});a.distribute(c,l.plotHeight+u);E(c,function(a){var c=a.point,b=a.tt,e;e={display:void 0===a.pos?"none":"",x:h||c.isHeader?a.x:c.plotX+l.plotLeft+r(f.distance,16),y:a.pos+l.plotTop};c.isHeader&&(e.anchorX=c.plotX+l.plotLeft,e.anchorY=e.y-100);b.attr(e);
	c.isHeader||b.connector.attr({d:["M",c.plotX+l.plotLeft,c.plotY+c.series.yAxis.pos,"L",h?c.plotX+l.plotLeft-r(f.distance,16):c.plotX+l.plotLeft+r(f.distance,16),a.pos+l.plotTop+b.getBBox().height/2]})})},updatePosition:function(a){var b=this.chart,e=this.label,e=(this.options.positioner||this.getPosition).call(this,e.width,e.height,a);this.move(Math.round(e.x),Math.round(e.y||0),a.plotX+b.plotLeft,a.plotY+b.plotTop)},getXDateFormat:function(a,b,e){var c;b=b.dateTimeLabelFormats;var l=e&&e.closestPointRange,
	d,h={millisecond:15,second:12,minute:9,hour:6,day:3},f,u="millisecond";if(l){f=y("%m-%d %H:%M:%S.%L",a.x);for(d in k){if(l===k.week&&+y("%w",a.x)===e.options.startOfWeek&&"00:00:00.000"===f.substr(6)){d="week";break}if(k[d]>l){d=u;break}if(h[d]&&f.substr(h[d])!=="01-01 00:00:00.000".substr(h[d]))break;"week"!==d&&(u=d)}d&&(c=b[d])}else c=b.day;return c||b.year},tooltipFooterHeaderFormatter:function(a,b){var e=b?"footer":"header",c=a.series,l=c.tooltipOptions,d=l.xDateFormat,h=c.xAxis,f=h&&"datetime"===
	h.options.type&&g(a.key),e=l[e+"Format"];f&&!d&&(d=this.getXDateFormat(a,l,h));f&&d&&(e=e.replace("{point.key}","{point.key:"+d+"}"));return t(e,{point:a,series:c})},bodyFormatter:function(a){return d(a,function(a){var b=a.series.tooltipOptions;return(b.pointFormatter||a.point.tooltipFormatter).call(a.point,b.pointFormat)})}}})(K);(function(a){var A=a.addEvent,y=a.attr,E=a.charts,G=a.color,t=a.css,g=a.defined,d=a.doc,m=a.each,r=a.extend,n=a.fireEvent,p=a.offset,b=a.pick,k=a.removeEvent,v=a.splat,
	B=a.Tooltip,e=a.win;a.hasTouch=d&&void 0!==d.documentElement.ontouchstart;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,e){this.options=e;this.chart=a;this.runChartClick=e.chart.events&&!!e.chart.events.click;this.pinchDown=[];this.lastValidTouch={};B&&e.tooltip.enabled&&(a.tooltip=new B(a,e.tooltip),this.followTouchMove=b(e.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(){var a=this.chart,b=a.options.chart.zoomType,e=/x/.test(b),b=/y/.test(b),
	a=a.inverted;this.zoomX=e;this.zoomY=b;this.zoomHor=e&&!a||b&&a;this.zoomVert=b&&!a||e&&a;this.hasZoom=e||b},normalize:function(a,b){var d,h;a=a||e.event;a.target||(a.target=a.srcElement);h=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=p(this.chart.container));void 0===h.pageX?(d=Math.max(a.x,a.clientX-b.left),h=a.y):(d=h.pageX-b.left,h=h.pageY-b.top);return r(a,{chartX:Math.round(d),chartY:Math.round(h)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};
	m(this.chart.axes,function(e){b[e.isXAxis?"xAxis":"yAxis"].push({axis:e,value:e.toValue(a[e.horiz?"chartX":"chartY"])})});return b},runPointActions:function(c){var e=this.chart,q=e.series,h=e.tooltip,f=h?h.shared:!1,u=!0,k=e.hoverPoint,p=e.hoverSeries,g,n,C,w=[],J;if(!f&&!p)for(g=0;g<q.length;g++)if(q[g].directTouch||!q[g].options.stickyTracking)q=[];p&&(f?p.noSharedTooltip:p.directTouch)&&k?w=[k]:(f||!p||p.options.stickyTracking||(q=[p]),m(q,function(a){n=a.noSharedTooltip&&f;C=!f&&a.directTouch;
	a.visible&&!n&&!C&&b(a.options.enableMouseTracking,!0)&&(J=a.searchPoint(c,!n&&1===a.kdDimensions))&&J.series&&w.push(J)}),w.sort(function(a,c){var b=a.distX-c.distX,e=a.dist-c.dist;return 0!==b?b:0!==e?e:a.series.group.zIndex>c.series.group.zIndex?-1:1}));if(f)for(g=w.length;g--;)(w[g].clientX!==w[0].clientX||w[g].series.noSharedTooltip)&&w.splice(g,1);if(w[0]&&(w[0]!==this.hoverPoint||h&&h.isHidden)){if(f&&!w[0].series.noSharedTooltip){for(g=0;0<=g;g--)w[g].onMouseOver(c,w[g]!==(p&&p.directTouch&&
	k||w[0]));if(p&&p.directTouch&&k&&k!==w[0])k.onMouseOver(c,!1);w.length&&h&&h.refresh(w.sort(function(a,c){return a.series.index-c.series.index}),c)}else if(h&&h.refresh(w[0],c),!p||!p.directTouch)w[0].onMouseOver(c);this.prevKDPoint=w[0];u=!1}u&&(q=p&&p.tooltipOptions.followPointer,h&&q&&!h.isHidden&&(q=h.getAnchor([{}],c),h.updatePosition({plotX:q[0],plotY:q[1]})));this._onDocumentMouseMove||(this._onDocumentMouseMove=function(c){if(E[a.hoverChartIndex])E[a.hoverChartIndex].pointer.onDocumentMouseMove(c)},
	A(d,"mousemove",this._onDocumentMouseMove));m(f?w:[b(k,w[0])],function(a){m(e.axes,function(b){(!a||a.series&&a.series[b.coll]===b)&&b.drawCrosshair(c,a)})})},reset:function(a,b){var e=this.chart,h=e.hoverSeries,f=e.hoverPoint,u=e.hoverPoints,p=e.tooltip,g=p&&p.shared?u:f;a&&g&&m(v(g),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)p&&g&&(p.refresh(g),f&&(f.setState(f.state,!0),m(e.axes,function(a){a.crosshair&&a.drawCrosshair(null,f)})));else{if(f)f.onMouseOut();u&&m(u,function(a){a.setState()});
	if(h)h.onMouseOut();p&&p.hide(b);this._onDocumentMouseMove&&(k(d,"mousemove",this._onDocumentMouseMove),this._onDocumentMouseMove=null);m(e.axes,function(a){a.hideCrosshair()});this.hoverX=this.prevKDPoint=e.hoverPoints=e.hoverPoint=null}},scaleGroups:function(a,b){var e=this.chart,h;m(e.series,function(f){h=a||f.getPlotBox();f.xAxis&&f.xAxis.zoomEnabled&&(f.group.attr(h),f.markerGroup&&(f.markerGroup.attr(h),f.markerGroup.clip(b?e.clipRect:null)),f.dataLabelsGroup&&f.dataLabelsGroup.attr(h))});e.clipRect.attr(b||
	e.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,e=b.options.chart,h=a.chartX,f=a.chartY,d=this.zoomHor,k=this.zoomVert,p=b.plotLeft,g=b.plotTop,n=b.plotWidth,C=b.plotHeight,w,m=this.selectionMarker,v=this.mouseDownX,x=this.mouseDownY,r=e.panKey&&a[e.panKey+"Key"];m&&m.touch||(h<p?h=p:h>p+n&&(h=p+n),f<g?f=g:f>g+C&&(f=g+C),this.hasDragged=Math.sqrt(Math.pow(v-
	h,2)+Math.pow(x-f,2)),10<this.hasDragged&&(w=b.isInsidePlot(v-p,x-g),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&w&&!r&&!m&&(this.selectionMarker=m=b.renderer.rect(p,g,d?1:n,k?1:C,0).attr({fill:e.selectionMarkerFill||G("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),m&&d&&(h-=v,m.attr({width:Math.abs(h),x:(0<h?0:h)+v})),m&&k&&(h=f-x,m.attr({height:Math.abs(h),y:(0<h?0:h)+x})),w&&!m&&e.panning&&b.pan(a,e.panning)))},drop:function(a){var b=this,e=this.chart,
	h=this.hasPinched;if(this.selectionMarker){var f={originalEvent:a,xAxis:[],yAxis:[]},d=this.selectionMarker,k=d.attr?d.attr("x"):d.x,p=d.attr?d.attr("y"):d.y,v=d.attr?d.attr("width"):d.width,B=d.attr?d.attr("height"):d.height,C;if(this.hasDragged||h)m(e.axes,function(e){if(e.zoomEnabled&&g(e.min)&&(h||b[{xAxis:"zoomX",yAxis:"zoomY"}[e.coll]])){var d=e.horiz,u="touchend"===a.type?e.minPixelPadding:0,q=e.toValue((d?k:p)+u),d=e.toValue((d?k+v:p+B)-u);f[e.coll].push({axis:e,min:Math.min(q,d),max:Math.max(q,
	d)});C=!0}}),C&&n(e,"selection",f,function(a){e.zoom(r(a,h?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();h&&this.scaleGroups()}e&&(t(e.container,{cursor:e._cursor}),e.cancelClick=10<this.hasDragged,e.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption();a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(c){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(c)},
	onDocumentMouseMove:function(a){var b=this.chart,e=this.chartPosition;a=this.normalize(a,e);!e||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(c){var b=E[a.hoverChartIndex];b&&(c.relatedTarget||c.toElement)&&(b.pointer.reset(),b.pointer.chartPosition=null)},onContainerMouseMove:function(c){var b=this.chart;g(a.hoverChartIndex)&&E[a.hoverChartIndex]&&E[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=
	b.index);c=this.normalize(c);c.returnValue=!1;"mousedown"===b.mouseIsDown&&this.drag(c);!this.inClass(c.target,"highcharts-tracker")&&!b.isInsidePlot(c.chartX-b.plotLeft,c.chartY-b.plotTop)||b.openMenu||this.runPointActions(c)},inClass:function(a,b){for(var e;a;){if(e=y(a,"class")){if(-1!==e.indexOf(b))return!0;if(-1!==e.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;if(b&&a&&!b.options.stickyTracking&&
	!this.inClass(a,"highcharts-tooltip")&&!this.inClass(a,"highcharts-series-"+b.index))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,e=b.hoverPoint,h=b.plotLeft,f=b.plotTop;a=this.normalize(a);b.cancelClick||(e&&this.inClass(a.target,"highcharts-tracker")?(n(e.series,"click",r(a,{point:e})),b.hoverPoint&&e.firePointEvent("click",a)):(r(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-h,a.chartY-f)&&n(b,"click",a)))},setDOMEvents:function(){var c=this,b=c.chart.container;b.onmousedown=
	function(a){c.onContainerMouseDown(a)};b.onmousemove=function(a){c.onContainerMouseMove(a)};b.onclick=function(a){c.onContainerClick(a)};A(b,"mouseleave",c.onContainerMouseLeave);1===a.chartCount&&A(d,"mouseup",c.onDocumentMouseUp);a.hasTouch&&(b.ontouchstart=function(a){c.onContainerTouchStart(a)},b.ontouchmove=function(a){c.onContainerTouchMove(a)},1===a.chartCount&&A(d,"touchend",c.onDocumentTouchEnd))},destroy:function(){var c;k(this.chart.container,"mouseleave",this.onContainerMouseLeave);a.chartCount||
	(k(d,"mouseup",this.onDocumentMouseUp),k(d,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(c in this)this[c]=null}}})(K);(function(a){var A=a.charts,y=a.each,E=a.extend,G=a.map,t=a.noop,g=a.pick;E(a.Pointer.prototype,{pinchTranslate:function(a,g,r,n,p,b){(this.zoomHor||this.pinchHor)&&this.pinchTranslateDirection(!0,a,g,r,n,p,b);(this.zoomVert||this.pinchVert)&&this.pinchTranslateDirection(!1,a,g,r,n,p,b)},pinchTranslateDirection:function(a,g,r,n,p,b,k,v){var t=this.chart,
	e=a?"x":"y",c=a?"X":"Y",l="chart"+c,q=a?"width":"height",h=t["plot"+(a?"Left":"Top")],f,u,D=v||1,H=t.inverted,F=t.bounds[a?"h":"v"],I=1===g.length,C=g[0][l],w=r[0][l],J=!I&&g[1][l],M=!I&&r[1][l],x;r=function(){!I&&20<Math.abs(C-J)&&(D=v||Math.abs(w-M)/Math.abs(C-J));u=(h-w)/D+C;f=t["plot"+(a?"Width":"Height")]/D};r();g=u;g<F.min?(g=F.min,x=!0):g+f>F.max&&(g=F.max-f,x=!0);x?(w-=.8*(w-k[e][0]),I||(M-=.8*(M-k[e][1])),r()):k[e]=[w,M];H||(b[e]=u-h,b[q]=f);b=H?1/D:D;p[q]=f;p[e]=g;n[H?a?"scaleY":"scaleX":
	"scale"+c]=D;n["translate"+c]=b*h+(w-b*C)},pinch:function(a){var m=this,r=m.chart,n=m.pinchDown,p=a.touches,b=p.length,k=m.lastValidTouch,v=m.hasZoom,B=m.selectionMarker,e={},c=1===b&&(m.inClass(a.target,"highcharts-tracker")&&r.runTrackerClick||m.runChartClick),l={};1<b&&(m.initiated=!0);v&&m.initiated&&!c&&a.preventDefault();G(p,function(a){return m.normalize(a)});"touchstart"===a.type?(y(p,function(a,c){n[c]={chartX:a.chartX,chartY:a.chartY}}),k.x=[n[0].chartX,n[1]&&n[1].chartX],k.y=[n[0].chartY,
	n[1]&&n[1].chartY],y(r.axes,function(a){if(a.zoomEnabled){var c=r.bounds[a.horiz?"h":"v"],b=a.minPixelPadding,e=a.toPixels(g(a.options.min,a.dataMin)),d=a.toPixels(g(a.options.max,a.dataMax)),l=Math.max(e,d);c.min=Math.min(a.pos,Math.min(e,d)-b);c.max=Math.max(a.pos+a.len,l+b)}}),m.res=!0):n.length&&(B||(m.selectionMarker=B=E({destroy:t,touch:!0},r.plotBox)),m.pinchTranslate(n,p,e,B,l,k),m.hasPinched=v,m.scaleGroups(e,l),!v&&m.followTouchMove&&1===b?this.runPointActions(m.normalize(a)):m.res&&(m.res=
	!1,this.reset(!1,0)))},touch:function(d,m){var r=this.chart,n;a.hoverChartIndex=r.index;1===d.touches.length?(d=this.normalize(d),r.isInsidePlot(d.chartX-r.plotLeft,d.chartY-r.plotTop)&&!r.openMenu?(m&&this.runPointActions(d),"touchmove"===d.type&&(r=this.pinchDown,n=r[0]?4<=Math.sqrt(Math.pow(r[0].chartX-d.chartX,2)+Math.pow(r[0].chartY-d.chartY,2)):!1),g(n,!0)&&this.pinch(d)):m&&this.reset()):2===d.touches.length&&this.pinch(d)},onContainerTouchStart:function(a){this.zoomOption();this.touch(a,!0)},
	onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(d){A[a.hoverChartIndex]&&A[a.hoverChartIndex].pointer.drop(d)}})})(K);(function(a){var A=a.addEvent,y=a.charts,E=a.css,G=a.doc,t=a.extend,g=a.noop,d=a.Pointer,m=a.removeEvent,r=a.win,n=a.wrap;if(r.PointerEvent||r.MSPointerEvent){var p={},b=!!r.PointerEvent,k=function(){var a,b=[];b.item=function(a){return this[a]};for(a in p)p.hasOwnProperty(a)&&b.push({pageX:p[a].pageX,pageY:p[a].pageY,target:p[a].target});return b},v=function(b,
	e,c,d){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!y[a.hoverChartIndex]||(d(b),d=y[a.hoverChartIndex].pointer,d[e]({type:c,target:b.currentTarget,preventDefault:g,touches:k()}))};t(d.prototype,{onContainerPointerDown:function(a){v(a,"onContainerTouchStart","touchstart",function(a){p[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){v(a,"onContainerTouchMove","touchmove",function(a){p[a.pointerId]={pageX:a.pageX,pageY:a.pageY};
	p[a.pointerId].target||(p[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){v(a,"onDocumentTouchEnd","touchend",function(a){delete p[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,b?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,b?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(G,b?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});n(d.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&E(b.container,
	{"-ms-touch-action":"none","touch-action":"none"})});n(d.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(A)});n(d.prototype,"destroy",function(a){this.batchMSEvents(m);a.call(this)})}})(K);(function(a){var A,y=a.addEvent,E=a.css,G=a.discardElement,t=a.defined,g=a.each,d=a.extend,m=a.isFirefox,r=a.marginNames,n=a.merge,p=a.pick,b=a.setAnimation,k=a.stableSort,v=a.win,B=a.wrap;A=a.Legend=function(a,c){this.init(a,c)};A.prototype={init:function(a,
	c){this.chart=a;this.setOptions(c);c.enabled&&(this.render(),y(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var c=p(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=n(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.initialItemX=this.padding=c;this.initialItemY=c-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=p(a.symbolWidth,16);this.pages=[]},update:function(a,c){var b=this.chart;this.setOptions(n(!0,
	this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;p(c,!0)&&b.redraw()},colorizeItem:function(a,c){a.legendGroup[c?"removeClass":"addClass"]("highcharts-legend-item-hidden");var b=this.options,d=a.legendItem,h=a.legendLine,f=a.legendSymbol,k=this.itemHiddenStyle.color,b=c?b.itemStyle.color:k,p=c?a.color||k:k,g=a.options&&a.options.marker,n={fill:p},m;d&&d.css({fill:b,color:b});h&&h.attr({stroke:p});if(f){if(g&&f.isMarker&&(n=a.pointAttribs(),!c))for(m in n)n[m]=k;f.attr(n)}},positionItem:function(a){var c=
	this.options,b=c.symbolPadding,c=!c.rtl,d=a._legendItemPos,h=d[0],d=d[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(c?h:this.legendWidth-h-2*b-4,d);f&&(f.x=h,f.y=d)},destroyItem:function(a){var c=a.checkbox;g(["legendItem","legendLine","legendSymbol","legendGroup"],function(c){a[c]&&(a[c]=a[c].destroy())});c&&G(a.checkbox)},destroy:function(){var a=this.group,c=this.box;c&&(this.box=c.destroy());g(this.getAllItems(),function(a){g(["legendItem","legendGroup"],function(c){a[c]&&(a[c]=a[c].destroy())})});
	a&&(this.group=a.destroy())},positionCheckboxes:function(a){var c=this.group.alignAttr,b,d=this.clipHeight||this.legendHeight,h=this.titleHeight;c&&(b=c.translateY,g(this.allItems,function(f){var k=f.checkbox,p;k&&(p=b+h+k.y+(a||0)+3,E(k,{left:c.translateX+f.checkboxOffset+k.x-20+"px",top:p+"px",display:p>b-6&&p<b+d-6?"":"none"}))}))},renderTitle:function(){var a=this.padding,c=this.options.title,b=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,a-3,a-4,null,null,null,null,null,
	"legend-title").attr({zIndex:1}).css(c.style).add(this.group)),a=this.title.getBBox(),b=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:b}));this.titleHeight=b},setText:function(b){var c=this.options;b.legendItem.attr({text:c.labelFormat?a.format(c.labelFormat,b):c.labelFormatter.call(b)})},renderItem:function(a){var c=this.chart,b=c.renderer,d=this.options,h="horizontal"===d.layout,f=this.symbolWidth,k=d.symbolPadding,g=this.itemStyle,m=this.itemHiddenStyle,v=this.padding,r=
	h?p(d.itemDistance,20):0,C=!d.rtl,w=d.width,J=d.itemMarginBottom||0,t=this.itemMarginTop,x=this.initialItemX,z=a.legendItem,B=!a.series,O=!B&&a.series.drawLegendSymbol?a.series:a,y=O.options,y=this.createCheckboxForItem&&y&&y.showCheckbox,L=d.useHTML;z||(a.legendGroup=b.g("legend-item").addClass("highcharts-"+O.type+"-series highcharts-color-"+a.colorIndex+" "+(a.options.className||"")+(B?"highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=z=b.text("",C?f+k:-k,this.baseline||
	0,L).css(n(a.visible?g:m)).attr({align:C?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(g=g.fontSize,this.fontMetrics=b.fontMetrics(g,z),this.baseline=this.fontMetrics.f+3+t,z.attr("y",this.baseline)),O.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,z,L),y&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);this.setText(a);b=z.getBBox();f=a.checkboxOffset=d.itemWidth||a.legendItemWidth||f+k+b.width+r+(y?20:0);this.itemHeight=k=Math.round(a.legendItemHeight||
	b.height);h&&this.itemX-x+f>(w||c.chartWidth-2*v-x-d.x)&&(this.itemX=x,this.itemY+=t+this.lastLineHeight+J,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,f);this.lastItemY=t+this.itemY+J;this.lastLineHeight=Math.max(k,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];h?this.itemX+=f:(this.itemY+=t+k+J,this.lastLineHeight=k);this.offsetWidth=w||Math.max((h?this.itemX-x-r:f)+v,this.offsetWidth)},getAllItems:function(){var a=[];g(this.chart.series,function(c){var b=c&&
	c.options;c&&p(b.showInLegend,t(b.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===b.legendType?c.data:c)))});return a},adjustMargins:function(a,c){var b=this.chart,d=this.options,h=d.align.charAt(0)+d.verticalAlign.charAt(0)+d.layout.charAt(0);d.floating||g([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(f,k){f.test(h)&&!t(a[k])&&(b[r[k]]=Math.max(b[r[k]],b.legend[(k+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][k]*d[k%2?"x":"y"]+p(d.margin,12)+c[k]))})},render:function(){var a=
	this,c=a.chart,b=c.renderer,p=a.group,h,f,u,n,m=a.box,v=a.options,r=a.padding;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;p||(a.group=p=b.g("legend").attr({zIndex:7}).add(),a.contentGroup=b.g().attr({zIndex:1}).add(p),a.scrollGroup=b.g().add(a.contentGroup));a.renderTitle();h=a.getAllItems();k(h,function(a,c){return(a.options&&a.options.legendIndex||0)-(c.options&&c.options.legendIndex||0)});v.reversed&&h.reverse();a.allItems=h;a.display=f=!!h.length;a.lastLineHeight=
	0;g(h,function(c){a.renderItem(c)});u=(v.width||a.offsetWidth)+r;n=a.lastItemY+a.lastLineHeight+a.titleHeight;n=a.handleOverflow(n);n+=r;m||(a.box=m=b.rect().addClass("highcharts-legend-box").attr({r:v.borderRadius}).add(p),m.isNew=!0);m.attr({stroke:v.borderColor,"stroke-width":v.borderWidth||0,fill:v.backgroundColor||"none"}).shadow(v.shadow);0<u&&0<n&&(m[m.isNew?"attr":"animate"](m.crisp({x:0,y:0,width:u,height:n},m.strokeWidth())),m.isNew=!1);m[f?"show":"hide"]();a.legendWidth=u;a.legendHeight=
	n;g(h,function(c){a.positionItem(c)});f&&p.align(d({width:u,height:n},v),!0,"spacingBox");c.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var c=this,b=this.chart,d=b.renderer,h=this.options,f=h.y,f=b.spacingBox.height+("top"===h.verticalAlign?-f:f)-this.padding,k=h.maxHeight,n,m=this.clipRect,v=h.navigation,r=p(v.animation,!0),C=v.arrowSize||12,w=this.nav,J=this.pages,t=this.padding,x,z=this.allItems,B=function(a){m.attr({height:a});c.contentGroup.div&&(c.contentGroup.div.style.clip=
	"rect("+t+"px,9999px,"+(t+a)+"px,0)")};"horizontal"===h.layout&&(f/=2);k&&(f=Math.min(f,k));J.length=0;a>f&&!1!==v.enabled?(this.clipHeight=n=Math.max(f-20-this.titleHeight-t,0),this.currentPage=p(this.currentPage,1),this.fullHeight=a,g(z,function(a,c){var b=a._legendItemPos[1],e=Math.round(a.legendItem.getBBox().height),f=J.length;if(!f||b-J[f-1]>n&&(x||b)!==J[f-1])J.push(x||b),f++;c===z.length-1&&b+e-J[f-1]>n&&J.push(b);b!==x&&(x=b)}),m||(m=c.clipRect=d.clipRect(0,t,9999,0),c.contentGroup.clip(m)),
	B(n),w||(this.nav=w=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,C,C).on("click",function(){c.scroll(-1,r)}).add(w),this.pager=d.text("",15,10).addClass("highcharts-legend-navigation").css(v.style).add(w),this.down=d.symbol("triangle-down",0,0,C,C).on("click",function(){c.scroll(1,r)}).add(w)),c.scroll(0),a=f):w&&(B(b.chartHeight),w.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,c){var d=this.pages,k=d.length,h=this.currentPage+
	a,f=this.clipHeight,p=this.options.navigation,g=this.pager,n=this.padding;h>k&&(h=k);0<h&&(void 0!==c&&b(c,this.chart),this.nav.attr({translateX:n,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===h?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),g.attr({text:h+"/"+k}),this.down.attr({x:18+this.pager.getBBox().width,"class":h===k?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===h?p.inactiveColor:
	p.activeColor}).css({cursor:1===h?"default":"pointer"}),this.down.attr({fill:h===k?p.inactiveColor:p.activeColor}).css({cursor:h===k?"default":"pointer"}),d=-d[h-1]+this.initialItemY,this.scrollGroup.animate({translateY:d}),this.currentPage=h,this.positionCheckboxes(d))}};a.LegendSymbolMixin={drawRectangle:function(a,c){var b=a.options,d=b.symbolHeight||a.fontMetrics.f,b=b.squareSymbol;c.legendSymbol=this.chart.renderer.rect(b?(a.symbolWidth-d)/2:0,a.baseline-d+1,b?d:a.symbolWidth,d,p(a.options.symbolRadius,
	d/2)).addClass("highcharts-point").attr({zIndex:3}).add(c.legendGroup)},drawLineMarker:function(a){var c=this.options,b=c.marker,d=a.symbolWidth,h=this.chart.renderer,f=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var k;k={"stroke-width":c.lineWidth||0};c.dashStyle&&(k.dashstyle=c.dashStyle);this.legendLine=h.path(["M",0,a,"L",d,a]).addClass("highcharts-graph").attr(k).add(f);b&&!1!==b.enabled&&(c=b.radius,this.legendSymbol=b=h.symbol(this.symbol,d/2-c,a-c,2*c,2*c,b).addClass("highcharts-point").add(f),
	b.isMarker=!0)}};(/Trident\/7\.0/.test(v.navigator.userAgent)||m)&&B(A.prototype,"positionItem",function(a,b){var d=this,k=function(){b._legendItemPos&&a.call(d,b)};k();setTimeout(k)})})(K);(function(a){var A=a.addEvent,y=a.animate,E=a.animObject,G=a.attr,t=a.doc,g=a.Axis,d=a.createElement,m=a.defaultOptions,r=a.discardElement,n=a.charts,p=a.css,b=a.defined,k=a.each,v=a.error,B=a.extend,e=a.fireEvent,c=a.getStyle,l=a.grep,q=a.isNumber,h=a.isObject,f=a.isString,u=a.Legend,D=a.marginNames,H=a.merge,
	F=a.Pointer,I=a.pick,C=a.pInt,w=a.removeEvent,J=a.seriesTypes,M=a.splat,x=a.svg,z=a.syncTimeout,N=a.win,O=a.Renderer,S=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new S(a,b,c)};S.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(f(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var e,f=b.series;b.series=null;e=H(m,b);e.series=b.series=f;this.userOptions=b;this.respRules=[];var f=e.chart,d=f.events;
	this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=e;this.axes=[];this.series=[];this.hasCartesianSeries=f.showAxes;var h;this.index=n.length;n.push(this);a.chartCount++;if(d)for(h in d)A(this,h,d[h]);this.xAxis=[];this.yAxis=[];this.pointCount=this.colorCounter=this.symbolCounter=0;this.firstRender()},initSeries:function(a){var b=this.options.chart;(b=J[a.type||b.type||b.defaultSeriesType])||v(17,!0);b=new b;b.init(this,a);return b},isInsidePlot:function(a,
	b,c){var e=c?b:a;a=c?a:b;return 0<=e&&e<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var c=this.axes,f=this.series,d=this.pointer,h=this.legend,p=this.isDirtyLegend,l,u,g=this.hasCartesianSeries,w=this.isDirtyBox,C=f.length,q=C,n=this.renderer,m=n.isHidden(),v=[];a.setAnimation(b,this);m&&this.cloneRenderTo();for(this.layOutTitles();q--;)if(b=f[q],b.options.stacking&&(l=!0,b.isDirty)){u=!0;break}if(u)for(q=C;q--;)b=f[q],b.options.stacking&&(b.isDirty=!0);k(f,function(a){a.isDirty&&
	"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),p=!0);a.isDirtyData&&e(a,"updatedData")});p&&h.options.enabled&&(h.render(),this.isDirtyLegend=!1);l&&this.getStacks();g&&k(c,function(a){a.updateNames();a.setScale()});this.getMargins();g&&(k(c,function(a){a.isDirty&&(w=!0)}),k(c,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,v.push(function(){e(a,"afterSetExtremes",B(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(w||l)&&a.redraw()}));w&&this.drawChartBox();k(f,
	function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset(!0);n.draw();e(this,"redraw");m&&this.cloneRenderTo(!0);k(v,function(a){a.call()})},get:function(a){var b=this.axes,c=this.series,e,f;for(e=0;e<b.length;e++)if(b[e].options.id===a)return b[e];for(e=0;e<c.length;e++)if(c[e].options.id===a)return c[e];for(e=0;e<c.length;e++)for(f=c[e].points||[],b=0;b<f.length;b++)if(f[b].id===a)return f[b];return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=M(b.xAxis||
	{}),b=b.yAxis=M(b.yAxis||{});k(c,function(a,b){a.index=b;a.isX=!0});k(b,function(a,b){a.index=b});c=c.concat(b);k(c,function(b){new g(a,b)})},getSelectedPoints:function(){var a=[];k(this.series,function(b){a=a.concat(l(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return l(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var e=this,f=e.options,d;d=f.title=H(f.title,a);f=f.subtitle=H(f.subtitle,b);k([["title",a,d],["subtitle",b,f]],function(a,
	b){var c=a[0],f=e[c],d=a[1],h=a[2];f&&d&&(e[c]=f=f.destroy());h&&h.text&&!f&&(e[c]=e.renderer.text(h.text,0,0,h.useHTML).attr({align:h.align,"class":"highcharts-"+c,zIndex:h.zIndex||4}).add(),e[c].update=function(a){e.setTitle(!b&&a,b&&a)},e[c].css(h.style))});e.layOutTitles(c)},layOutTitles:function(a){var b=0,c,e=this.renderer,f=this.spacingBox;k(["title","subtitle"],function(a){var c=this[a],h=this.options[a],d;c&&(d=h.style.fontSize,d=e.fontMetrics(d,c).b,c.css({width:(h.width||f.width+h.widthAdjust)+
	"px"}).align(B({y:b+d+("title"===a?-3:2)},h),!1,"spacingBox"),h.floating||h.verticalAlign||(b=Math.ceil(b+c.getBBox().height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=c,this.hasRendered&&I(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var a=this.options.chart,e=a.width,a=a.height,f=this.renderToClone||this.renderTo;b(e)||(this.containerWidth=c(f,"width"));b(a)||(this.containerHeight=c(f,"height"));this.chartWidth=Math.max(0,e||this.containerWidth||
	600);this.chartHeight=Math.max(0,I(a,19<this.containerHeight?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;if(a){if(b){for(;b.childNodes.length;)this.renderTo.appendChild(b.firstChild);r(b);delete this.renderToClone}}else c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),p(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block","important"),
	t.body.appendChild(b),c&&b.appendChild(c)},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,e=c.chart,h,k;b=this.renderTo;var l="highcharts-"+a.idCounter++,p;b||(this.renderTo=b=e.renderTo);f(b)&&(this.renderTo=b=t.getElementById(b));b||v(13,!0);h=C(G(b,"data-highcharts-chart"));q(h)&&n[h]&&n[h].hasRendered&&n[h].destroy();G(b,"data-highcharts-chart",this.index);b.innerHTML="";e.skipClone||b.offsetWidth||this.cloneRenderTo();
	this.getChartSize();h=this.chartWidth;k=this.chartHeight;p=B({position:"relative",overflow:"hidden",width:h+"px",height:k+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"});this.container=b=d("div",{id:l},p,this.renderToClone||b);this._cursor=b.style.cursor;this.renderer=new (a[e.renderer]||O)(b,h,k,null,e.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(e.className);this.renderer.setStyle(e.style);this.renderer.chartIndex=this.index},
	getMargins:function(a){var c=this.spacing,e=this.margin,f=this.titleOffset;this.resetMargins();f&&!b(e[0])&&(this.plotTop=Math.max(this.plotTop,f+this.options.title.margin+c[0]));this.legend.display&&this.legend.adjustMargins(e,c);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,c=a.axisOffset=[0,0,0,0],e=a.margin;a.hasCartesianSeries&&k(a.axes,function(a){a.visible&&
	a.getOffset()});k(D,function(f,h){b(e[h])||(a[f]+=c[h])});a.setChartSize()},reflow:function(a){var e=this,f=e.options.chart,h=e.renderTo,d=b(f.width),k=f.width||c(h,"width"),f=f.height||c(h,"height"),h=a?a.target:N;if(!d&&!e.isPrinting&&k&&f&&(h===N||h===t)){if(k!==e.containerWidth||f!==e.containerHeight)clearTimeout(e.reflowTimeout),e.reflowTimeout=z(function(){e.container&&e.setSize(void 0,void 0,!1)},a?100:0);e.containerWidth=k;e.containerHeight=f}},initReflow:function(){var a=this,b=function(b){a.reflow(b)};
	A(N,"resize",b);A(a,"destroy",function(){w(N,"resize",b)})},setSize:function(b,c,f){var h=this,d=h.renderer;h.isResizing+=1;a.setAnimation(f,h);h.oldChartHeight=h.chartHeight;h.oldChartWidth=h.chartWidth;void 0!==b&&(h.options.chart.width=b);void 0!==c&&(h.options.chart.height=c);h.getChartSize();b=d.globalAnimation;(b?y:p)(h.container,{width:h.chartWidth+"px",height:h.chartHeight+"px"},b);h.setChartSize(!0);d.setSize(h.chartWidth,h.chartHeight,f);k(h.axes,function(a){a.isDirty=!0;a.setScale()});
	k(h.series,function(a){a.isDirty=!0});h.isDirtyLegend=!0;h.isDirtyBox=!0;h.layOutTitles();h.getMargins();h.setResponsive&&h.setResponsive(!1);h.redraw(f);h.oldChartHeight=null;e(h,"resize");z(function(){h&&e(h,"endResize",null,function(){--h.isResizing})},E(b).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,e=this.chartWidth,f=this.chartHeight,h=this.options.chart,d=this.spacing,p=this.clipOffset,l,u,g,w;this.plotLeft=l=Math.round(this.plotLeft);this.plotTop=u=Math.round(this.plotTop);
	this.plotWidth=g=Math.max(0,Math.round(e-l-this.marginRight));this.plotHeight=w=Math.max(0,Math.round(f-u-this.marginBottom));this.plotSizeX=b?w:g;this.plotSizeY=b?g:w;this.plotBorderWidth=h.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:d[3],y:d[0],width:e-d[3]-d[1],height:f-d[0]-d[2]};this.plotBox=c.plotBox={x:l,y:u,width:g,height:w};e=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(e,p[3])/2);c=Math.ceil(Math.max(e,p[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(e,
	p[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(e,p[2])/2-c))};a||k(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;k(["margin","spacing"],function(c){var e=b[c],f=h(e)?e:[e,e,e,e];k(["Top","Right","Bottom","Left"],function(e,h){a[c][h]=I(b[c+e],f[h])})});k(D,function(b,c){a[b]=I(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,
	c=this.chartWidth,e=this.chartHeight,f=this.chartBackground,h=this.plotBackground,d=this.plotBorder,k,p=this.plotBGImage,l=a.backgroundColor,u=a.plotBackgroundColor,g=a.plotBackgroundImage,w,C=this.plotLeft,q=this.plotTop,n=this.plotWidth,m=this.plotHeight,v=this.plotBox,x=this.clipRect,r=this.clipBox,J="animate";f||(this.chartBackground=f=b.rect().addClass("highcharts-background").add(),J="attr");k=a.borderWidth||0;w=k+(a.shadow?8:0);l={fill:l||"none"};if(k||f["stroke-width"])l.stroke=a.borderColor,
	l["stroke-width"]=k;f.attr(l).shadow(a.shadow);f[J]({x:w/2,y:w/2,width:c-w-k%2,height:e-w-k%2,r:a.borderRadius});J="animate";h||(J="attr",this.plotBackground=h=b.rect().addClass("highcharts-plot-background").add());h[J](v);h.attr({fill:u||"none"}).shadow(a.plotShadow);g&&(p?p.animate(v):this.plotBGImage=b.image(g,C,q,n,m).add());x?x.animate({width:r.width,height:r.height}):this.clipRect=b.clipRect(r);J="animate";d||(J="attr",this.plotBorder=d=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());
	d.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});d[J](d.crisp({x:C,y:q,width:n,height:m},-d.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,e=a.options.series,f,h;k(["inverted","angular","polar"],function(d){c=J[b.type||b.defaultSeriesType];h=b[d]||c&&c.prototype[d];for(f=e&&e.length;!h&&f--;)(c=J[e[f].type])&&c.prototype[d]&&(h=!0);a[d]=h})},linkSeries:function(){var a=this,b=a.series;k(b,function(a){a.linkedSeries.length=
	0});k(b,function(b){var c=b.options.linkedTo;f(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=I(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){k(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&k(b.items,function(c){var e=B(b.style,c.style),f=C(e.left)+a.plotLeft,h=C(e.top)+a.plotTop+12;delete e.left;delete e.top;a.renderer.text(c.html,
	f,h).attr({zIndex:2}).css(e).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,e,f,h;this.setTitle();this.legend=new u(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;e=this.plotHeight-=21;k(a,function(a){a.setScale()});this.getAxisMargins();f=1.1<c/this.plotWidth;h=1.05<e/this.plotHeight;if(f||h)k(a,function(a){(a.horiz&&f||!a.horiz&&h)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&
	k(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=H(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(N.location.href=a.href)}).attr({align:a.position.align,
	zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,f=b.series,h=b.container,d,l=h&&h.parentNode;e(b,"destroy");n[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");w(b);for(d=c.length;d--;)c[d]=c[d].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(d=f.length;d--;)f[d]=f[d].destroy();k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
	function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});h&&(h.innerHTML="",w(h),l&&r(h));for(d in b)delete b[d]},isReadyToRender:function(){var a=this;return x||N!=N.top||"complete"===t.readyState?!0:(t.attachEvent("onreadystatechange",function(){t.detachEvent("onreadystatechange",a.firstRender);"complete"===t.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();e(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();
	a.getAxes();k(b.series||[],function(b){a.initSeries(b)});a.linkSeries();e(a,"beforeRender");F&&(a.pointer=new F(a,b));a.render();a.renderer.draw();if(!a.renderer.imgCount&&a.onload)a.onload();a.cloneRenderTo(!0)}},onload:function(){k([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);e(this,"load");this.initReflow();this.onload=null}}})(K);(function(a){var A,y=a.each,E=a.extend,G=a.erase,t=a.fireEvent,g=a.format,d=a.isArray,m=a.isNumber,r=a.pick,
	n=a.removeEvent;A=a.Point=function(){};A.prototype={init:function(a,b,d){this.series=a;this.color=a.color;this.applyOptions(b,d);a.options.colorByPoint?(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter],b=b.length,d=a.colorCounter,a.colorCounter++,a.colorCounter===b&&(a.colorCounter=0)):d=a.colorIndex;this.colorIndex=r(this.colorIndex,d);a.chart.pointCount++;return this},applyOptions:function(a,b){var d=this.series,g=d.options.pointValKey||d.pointValKey;a=A.prototype.optionsToObject.call(this,
	a);E(this,a);this.options=this.options?E(this.options,a):a;a.group&&delete this.group;g&&(this.y=this[g]);this.isNull=r(this.isValid&&!this.isValid(),null===this.x||!m(this.y,!0));"name"in this&&void 0===b&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));void 0===this.x&&d&&(this.x=void 0===b?d.autoIncrement(this):b);return this},optionsToObject:function(a){var b={},k=this.series,g=k.options.keys,n=g||k.pointArrayMap||["y"],e=n.length,c=0,l=0;if(m(a)||null===a)b[n[0]]=a;else if(d(a))for(!g&&
	a.length>e&&(k=typeof a[0],"string"===k?b.name=a[0]:"number"===k&&(b.x=a[0]),c++);l<e;)g&&void 0===a[c]||(b[n[l]]=a[c]),c++,l++;else"object"===typeof a&&(b=a,a.dataLabels&&(k._hasPointLabels=!0),a.marker&&(k._hasPointMarkers=!0));return b},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")},getZone:function(){var a=
	this.series,b=a.zones,a=a.zoneAxis||"y",d=0,g;for(g=b[d];this[a]>=g.value;)g=b[++d];g&&g.color&&!this.options.color&&(this.color=g.color);return g},destroy:function(){var a=this.series.chart,b=a.hoverPoints,d;a.pointCount--;b&&(this.setState(),G(b,this),b.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)n(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(d in this)this[d]=null},destroyElements:function(){for(var a=["graphic",
	"dataLabel","dataLabelUpper","connector","shadowGroup"],b,d=6;d--;)b=a[d],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,d=b.tooltipOptions,n=r(d.valueDecimals,""),m=d.valuePrefix||"",e=d.valueSuffix||"";y(b.pointArrayMap||["y"],function(b){b="{point."+b;if(m||e)a=a.replace(b+
	"}",m+b+"}"+e);a=a.replace(b+"}",b+":,."+n+"f}")});return g(a,{point:this,series:this.series})},firePointEvent:function(a,b,d){var g=this,n=this.series.options;(n.point.events[a]||g.options&&g.options.events&&g.options.events[a])&&this.importEvents();"click"===a&&n.allowPointSelect&&(d=function(a){g.select&&g.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});t(this,a,b,d)},visible:!0}})(K);(function(a){var A=a.addEvent,y=a.animObject,E=a.arrayMax,G=a.arrayMin,t=a.correctFloat,g=a.Date,d=a.defaultOptions,
	m=a.defaultPlotOptions,r=a.defined,n=a.each,p=a.erase,b=a.error,k=a.extend,v=a.fireEvent,B=a.grep,e=a.isArray,c=a.isNumber,l=a.isString,q=a.merge,h=a.pick,f=a.removeEvent,u=a.splat,D=a.stableSort,H=a.SVGElement,F=a.syncTimeout,I=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",
	lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textShadow:"1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3},{isCartesian:!0,
	pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,e,f,d=a.series,l=function(a,b){return h(a.options.index,a._i)-h(b.options.index,b._i)};c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();k(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});f=b.events;for(e in f)A(c,e,f[e]);if(f&&f.click||b.point&&b.point.events&&b.point.events.click||
	b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();n(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);d.push(c);c._i=d.length-1;D(d,l);this.yAxis&&D(this.yAxis.series,l);n(d,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},bindAxes:function(){var a=this,c=a.options,e=a.chart,f;n(a.axisTypes||[],function(h){n(e[h],function(b){f=b.options;if(c[h]===f.index||void 0!==c[h]&&c[h]===f.id||void 0===c[h]&&0===f.index)b.series.push(a),
	a[h]=b,b.isDirty=!0});a[h]||a.optionalAxis===h||b(18,!0)})},updateParallelArrays:function(a,b){var e=a.series,f=arguments,h=c(b)?function(c){var f="y"===c&&e.toYData?e.toYData(a):a[c];e[c+"Data"][b]=f}:function(a){Array.prototype[b].apply(e[a+"Data"],Array.prototype.slice.call(f,2))};n(e.parallelArrays,h)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,e=a.pointIntervalUnit,b=h(b,a.pointStart,0);this.pointInterval=c=h(this.pointInterval,a.pointInterval,1);e&&(a=new g(b),"day"===e?
	a=+a[g.hcSetDate](a[g.hcGetDate]()+c):"month"===e?a=+a[g.hcSetMonth](a[g.hcGetMonth]()+c):"year"===e&&(a=+a[g.hcSetFullYear](a[g.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},e=b.plotOptions||{},f=c[this.type];this.userOptions=a;c=q(f,c.series,a);this.tooltipOptions=q(d.tooltip,d.plotOptions[this.type].tooltip,b.tooltip,e.series&&e.series.tooltip,e[this.type]&&e[this.type].tooltip,a.tooltip);null===f.marker&&
	delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();!c.negativeColor&&!c.negativeFillColor||c.zones||a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,className:"highcharts-negative",color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&r(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return c},getCyclic:function(a,b,c){var e,f=this.userOptions,d=a+"Index",k=a+"Counter",l=c?c.length:h(this.chart.options.chart[a+"Count"],this.chart[a+
	"Count"]);b||(e=h(f[d],f["_"+d]),r(e)||(f["_"+d]=e=this.chart[k]%l,this.chart[k]+=1),c&&(b=c[e]));void 0!==e&&(this[d]=e);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||m[this.type].color,this.chart.options.colors)},getSymbol:function(){var a=this.options.marker;this.getCyclic("symbol",a.symbol,this.chart.options.symbols);/^url/.test(this.symbol)&&(a.radius=0)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(a,
	f,d,k){var g=this,u=g.points,p=u&&u.length||0,q,m=g.options,r=g.chart,v=null,D=g.xAxis,t=m.turboThreshold,F=this.xData,H=this.yData,B=(q=g.pointArrayMap)&&q.length;a=a||[];q=a.length;f=h(f,!0);if(!1!==k&&q&&p===q&&!g.cropped&&!g.hasGroupedData&&g.visible)n(a,function(a,b){u[b].update&&a!==m.data[b]&&u[b].update(a,!1,null,!1)});else{g.xIncrement=null;g.colorCounter=0;n(this.parallelArrays,function(a){g[a+"Data"].length=0});if(t&&q>t){for(d=0;null===v&&d<q;)v=a[d],d++;if(c(v))for(d=0;d<q;d++)F[d]=this.autoIncrement(),
	H[d]=a[d];else if(e(v))if(B)for(d=0;d<q;d++)v=a[d],F[d]=v[0],H[d]=v.slice(1,B+1);else for(d=0;d<q;d++)v=a[d],F[d]=v[0],H[d]=v[1];else b(12)}else for(d=0;d<q;d++)void 0!==a[d]&&(v={series:g},g.pointClass.prototype.applyOptions.apply(v,[a[d]]),g.updateParallelArrays(v,d));l(H[0])&&b(14,!0);g.data=[];g.options.data=g.userOptions.data=a;for(d=p;d--;)u[d]&&u[d].destroy&&u[d].destroy();D&&(D.minRange=D.userMinRange);g.isDirty=r.isDirtyBox=!0;g.isDirtyData=!!u;d=!1}"point"===m.legendType&&(this.processData(),
	this.generatePoints());f&&r.redraw(d)},processData:function(a){var c=this.xData,e=this.yData,f=c.length,d;d=0;var h,k,l=this.xAxis,g,u=this.options;g=u.cropThreshold;var p=this.getExtremesFromAll||u.getExtremesFromAll,q=this.isCartesian,u=l&&l.val2lin,n=l&&l.isLog,m,v;if(q&&!this.isDirty&&!l.isDirty&&!this.yAxis.isDirty&&!a)return!1;l&&(a=l.getExtremes(),m=a.min,v=a.max);if(q&&this.sorted&&!p&&(!g||f>g||this.forceCrop))if(c[f-1]<m||c[0]>v)c=[],e=[];else if(c[0]<m||c[f-1]>v)d=this.cropData(this.xData,
	this.yData,m,v),c=d.xData,e=d.yData,d=d.start,h=!0;for(g=c.length||1;--g;)f=n?u(c[g])-u(c[g-1]):c[g]-c[g-1],0<f&&(void 0===k||f<k)?k=f:0>f&&this.requireSorting&&b(15);this.cropped=h;this.cropStart=d;this.processedXData=c;this.processedYData=e;this.closestPointRange=k},cropData:function(a,b,c,e){var f=a.length,d=0,k=f,l=h(this.cropShoulder,1),g;for(g=0;g<f;g++)if(a[g]>=c){d=Math.max(0,g-l);break}for(c=g;c<f;c++)if(a[c]>e){k=c+l;break}return{xData:a.slice(d,k),yData:b.slice(d,k),start:d,end:k}},generatePoints:function(){var a=
	this.options.data,b=this.data,c,e=this.processedXData,f=this.processedYData,d=this.pointClass,h=e.length,k=this.cropStart||0,l,g=this.hasGroupedData,p,q=[],n;b||g||(b=[],b.length=a.length,b=this.data=b);for(n=0;n<h;n++)l=k+n,g?(q[n]=(new d).init(this,[e[n]].concat(u(f[n]))),q[n].dataGroup=this.groupMap[n]):(b[l]?p=b[l]:void 0!==a[l]&&(b[l]=p=(new d).init(this,a[l],e[n])),q[n]=p),q[n].index=l;if(b&&(h!==(c=b.length)||g))for(n=0;n<c;n++)n!==k||g||(n+=h),b[n]&&(b[n].destroyElements(),b[n].plotX=void 0);
	this.data=b;this.points=q},getExtremes:function(a){var b=this.yAxis,f=this.processedXData,d,h=[],k=0;d=this.xAxis.getExtremes();var l=d.min,g=d.max,u,p,n,q;a=a||this.stackedYData||this.processedYData||[];d=a.length;for(q=0;q<d;q++)if(p=f[q],n=a[q],u=(c(n,!0)||e(n))&&(!b.isLog||n.length||0<n),p=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(f[q+1]||p)>=l&&(f[q-1]||p)<=g,u&&p)if(u=n.length)for(;u--;)null!==n[u]&&(h[k++]=n[u]);else h[k++]=n;this.dataMin=G(h);this.dataMax=E(h)},
	translate:function(){this.processedXData||this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,e=this.xAxis,f=e.categories,d=this.yAxis,k=this.points,l=k.length,g=!!this.modifyValue,u=a.pointPlacement,p="between"===u||c(u),n=a.threshold,q=a.startFromThreshold?n:0,m,v,D,F,H=Number.MAX_VALUE,a=0;a<l;a++){var B=k[a],I=B.x,y=B.y;v=B.low;var A=b&&d.stacks[(this.negStacks&&y<(q?0:n)?"-":"")+this.stackKey],E;d.isLog&&null!==y&&0>=y&&(B.isNull=!0);B.plotX=m=t(Math.min(Math.max(-1E5,
	e.translate(I,0,0,0,1,u,"flags"===this.type)),1E5));b&&this.visible&&!B.isNull&&A&&A[I]&&(F=this.getStackIndicator(F,I,this.index),E=A[I],y=E.points[F.key],v=y[0],y=y[1],v===q&&F.key===A[I].base&&(v=h(n,d.min)),d.isLog&&0>=v&&(v=null),B.total=B.stackTotal=E.total,B.percentage=E.total&&B.y/E.total*100,B.stackY=y,E.setOffset(this.pointXOffset||0,this.barW||0));B.yBottom=r(v)?d.translate(v,0,1,0,1):null;g&&(y=this.modifyValue(y,B));B.plotY=v="number"===typeof y&&Infinity!==y?Math.min(Math.max(-1E5,d.translate(y,
	0,1,0,1)),1E5):void 0;B.isInside=void 0!==v&&0<=v&&v<=d.len&&0<=m&&m<=e.len;B.clientX=p?t(e.translate(I,0,0,0,1,u)):m;B.negative=B.y<(n||0);B.category=f&&void 0!==f[B.x]?f[B.x]:B.x;B.isNull||(void 0!==D&&(H=Math.min(H,Math.abs(m-D))),D=m)}this.closestPointRangePx=H},getValidPoints:function(a,b){var c=this.chart;return B(a||this.points||[],function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,e=b.renderer,f=b.inverted,
	d=this.clipBox,h=d||b.clipBox,k=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,h.height,c.xAxis,c.yAxis].join(),l=b[k],g=b[k+"m"];l||(a&&(h.width=0,b[k+"m"]=g=e.clipRect(-99,f?-b.plotLeft:-b.plotTop,99,f?b.chartWidth:b.chartHeight)),b[k]=l=e.clipRect(h),l.count={length:0});a&&!l.count[this.index]&&(l.count[this.index]=!0,l.count.length+=1);!1!==c.clip&&(this.group.clip(a||d?l:b.clipRect),this.markerGroup.clip(g),this.sharedClipKey=k);a||(l.count[this.index]&&(delete l.count[this.index],
	--l.count.length),0===l.count.length&&k&&b[k]&&(d||(b[k]=b[k].destroy()),b[k+"m"]&&(b[k+"m"]=b[k+"m"].destroy())))},animate:function(a){var b=this.chart,c=y(this.options.animation),e;a?this.setClip(c):(e=this.sharedClipKey,(a=b[e])&&a.animate({width:b.plotSizeX},c),b[e+"m"]&&b[e+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();v(this,"afterAnimate")},drawPoints:function(){var a=this.points,b=this.chart,e,f,d,l,g,u,p,n,q=this.options.marker,m,v,r,D=
	this.markerGroup,t=h(q.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>2*q.radius);if(!1!==q.enabled||this._hasPointMarkers)for(d=a.length;d--;)l=a[d],e=Math.floor(l.plotX),f=l.plotY,n=l.graphic,m=l.marker||{},v=!!l.marker,g=t&&void 0===m.enabled||m.enabled,r=l.isInside,g&&c(f)&&null!==l.y?(g=q.radius,u=h(m.symbol,this.symbol),p=0===u.indexOf("url"),n?n[r?"show":"hide"](!0).animate(k({x:e-g,y:f-g},n.symbolName?{width:2*g,height:2*g}:{})):r&&(0<g||p)&&(l.graphic=n=b.renderer.symbol(u,
	e-g,f-g,2*g,2*g,v?m:q).attr({r:g}).add(D)),n&&n.attr(this.pointAttribs(l,l.selected&&"select")),n&&n.addClass(l.getClassName(),!0)):n&&(l.graphic=n.destroy())},pointAttribs:function(a,b){var c=this.options.marker,e=a&&a.options,f=e&&e.marker||{},d=c.lineWidth,h=this.color,e=e&&e.color,k=a&&a.color,l,g;a&&this.zones.length&&(g=a.getZone())&&g.color&&(l=g.color);h=e||l||k||h;l=f.fillColor||c.fillColor||h;h=f.lineColor||c.lineColor||h;b&&(c=c.states[b],f=f.states&&f.states[b]||{},d=c.lineWidth||d+c.lineWidthPlus,
	l=f.fillColor||c.fillColor||l,h=f.lineColor||c.lineColor||h);return{stroke:h,"stroke-width":d,fill:l}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(I.navigator.userAgent),e,d=a.data||[],h,k,l;v(a,"destroy");f(a);n(a.axisTypes||[],function(b){(l=a[b])&&l.series&&(p(l.series,a),l.isDirty=l.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(e=d.length;e--;)(h=d[e])&&h.destroy&&h.destroy();a.points=null;clearTimeout(a.animationTimeout);for(k in a)a[k]instanceof H&&
	!a[k].survive&&(e=c&&"group"===k?"hide":"destroy",a[k][e]());b.hoverSeries===a&&(b.hoverSeries=null);p(b.series,a);for(k in a)delete a[k]},getGraphPath:function(a,b,c){var e=this,f=e.options,d=f.step,h,k=[],l=[],g;a=a||e.points;(h=a.reversed)&&a.reverse();(d={right:1,center:2}[d]||d&&3)&&h&&(d=4-d);!f.connectNulls||b||c||(a=this.getValidPoints(a));n(a,function(h,u){var p=h.plotX,n=h.plotY,q=a[u-1];(h.leftCliff||q&&q.rightCliff)&&!c&&(g=!0);h.isNull&&!r(b)&&0<u?g=!f.connectNulls:h.isNull&&!b?g=!0:
	(0===u||g?q=["M",h.plotX,h.plotY]:e.getPointSpline?q=e.getPointSpline(a,h,u):d?(q=1===d?["L",q.plotX,n]:2===d?["L",(q.plotX+p)/2,q.plotY,"L",(q.plotX+p)/2,n]:["L",p,q.plotY],q.push("L",p,n)):q=["L",p,n],l.push(h.x),d&&l.push(h.x),k.push.apply(k,q),g=!1)});k.xMap=l;return e.graphPath=k},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),e=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];n(this.zones,function(c,f){e.push(["zone-graph-"+
	f,"highcharts-graph highcharts-zone-graph-"+f+" "+(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});n(e,function(e,f){var d=e[0],h=a[d];h?(h.endX=c.xMap,h.animate({d:c})):c.length&&(a[d]=a.chart.renderer.path(c).addClass(e[1]).attr({zIndex:1}).add(a.group),h={stroke:e[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},e[3]?h.dashstyle=e[3]:"square"!==b.linecap&&(h["stroke-linecap"]=h["stroke-linejoin"]="round"),h=a[d].attr(h).shadow(2>f&&b.shadow));h&&(h.startX=c.xMap,
	h.isArea=c.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,e=this.zones,f,d,k=this.clips||[],l,g=this.graph,u=this.area,p=Math.max(b.chartWidth,b.chartHeight),q=this[(this.zoneAxis||"y")+"Axis"],m,v,r=b.inverted,D,t,F,H,B=!1;e.length&&(g||u)&&q&&void 0!==q.min&&(v=q.reversed,D=q.horiz,g&&g.hide(),u&&u.hide(),m=q.getExtremes(),n(e,function(e,n){f=v?D?b.plotWidth:0:D?0:q.toPixels(m.min);f=Math.min(Math.max(h(d,f),0),p);d=Math.min(Math.max(Math.round(q.toPixels(h(e.value,m.max),
	!0)),0),p);B&&(f=d=q.toPixels(m.max));t=Math.abs(f-d);F=Math.min(f,d);H=Math.max(f,d);q.isXAxis?(l={x:r?H:F,y:0,width:t,height:p},D||(l.x=b.plotHeight-l.x)):(l={x:0,y:r?H:F,width:p,height:t},D&&(l.y=b.plotWidth-l.y));r&&c.isVML&&(l=q.isXAxis?{x:0,y:v?F:H,height:l.width,width:b.chartWidth}:{x:l.y-b.plotLeft-b.spacingBox.x,y:0,width:l.height,height:b.chartHeight});k[n]?k[n].animate(l):(k[n]=c.clipRect(l),g&&a["zone-graph-"+n].clip(k[n]),u&&a["zone-area-"+n].clip(k[n]));B=e.value>m.max}),this.clips=
	k)},invertGroups:function(a){function b(){var e={width:c.yAxis.len,height:c.xAxis.len};n(["group","markerGroup"],function(b){c[b]&&c[b].attr(e).invert(a)})}var c=this,e=c.chart;c.xAxis&&(A(e,"resize",b),A(c,"destroy",function(){f(e,"resize",b)}),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,e,f){var d=this[a],h=!d;h&&(this[a]=d=this.chart.renderer.g(b).attr({zIndex:e||.1}).add(f),d.addClass("highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+
	(this.options.className||"")));d.attr({visibility:c})[h?"attr":"animate"](this.getPlotBox());return d},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,e=a.options,f=!!a.animate&&b.renderer.isSVG&&y(e.animation).duration,d=a.visible?"inherit":"hidden",h=e.zIndex,k=a.hasRendered,l=b.seriesGroup,g=b.inverted;c=a.plotGroup("group",
	"series",d,h,l);a.markerGroup=a.plotGroup("markerGroup","markers",d,h,l);f&&a.animate(!0);c.inverted=a.isCartesian?g:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(g);!1===e.clip||a.sharedClipKey||k||c.clip(b.clipRect);f&&a.animate();k||(a.animationTimeout=F(function(){a.afterAnimate()},f));a.isDirty=a.isDirtyData=!1;a.hasRendered=!0},redraw:function(){var a=
	this.chart,b=this.isDirty||this.isDirtyData,c=this.group,e=this.xAxis,f=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:h(e&&e.left,a.plotLeft),translateY:h(f&&f.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdDimensions:1,kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,e=this.yAxis,f=this.chart.inverted;return this.searchKDTree({clientX:f?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:f?e.len-a.chartX+
	e.pos:a.chartY-e.pos},b)},buildKDTree:function(){function a(c,e,f){var d,h;if(h=c&&c.length)return d=b.kdAxisArray[e%f],c.sort(function(a,b){return a[d]-b[d]}),h=Math.floor(h/2),{point:c[h],left:a(c.slice(0,h),e+1,f),right:a(c.slice(h+1),e+1,f)}}var b=this,c=b.kdDimensions;delete b.kdTree;F(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c)},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,k,l){var g=b.point,u=e.kdAxisArray[k%l],q,n,p=g;n=r(a[f])&&r(g[f])?Math.pow(a[f]-
	g[f],2):null;q=r(a[d])&&r(g[d])?Math.pow(a[d]-g[d],2):null;q=(n||0)+(q||0);g.dist=r(q)?Math.sqrt(q):Number.MAX_VALUE;g.distX=r(n)?Math.sqrt(n):Number.MAX_VALUE;u=a[u]-g[u];q=0>u?"left":"right";n=0>u?"right":"left";b[q]&&(q=c(a,b[q],k+1,l),p=q[h]<p[h]?q:g);b[n]&&Math.sqrt(u*u)<p[h]&&(a=c(a,b[n],k+1,l),p=a[h]<p[h]?a:p);return p}var e=this,f=this.kdAxisArray[0],d=this.kdAxisArray[1],h=b?"distX":"dist";this.kdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,this.kdDimensions,this.kdDimensions)}})})(K);
	(function(a){function A(a,d,b,k,g){var m=a.chart.inverted;this.axis=a;this.isNegative=b;this.options=d;this.x=k;this.total=null;this.points={};this.stack=g;this.rightCliff=this.leftCliff=0;this.alignOptions={align:d.align||(m?b?"left":"right":"center"),verticalAlign:d.verticalAlign||(m?"middle":b?"bottom":"top"),y:r(d.y,m?4:b?14:-6),x:r(d.x,m?b?-6:6:0)};this.textAlign=d.textAlign||(m?b?"right":"left":"center")}var y=a.Axis,E=a.Chart,G=a.correctFloat,t=a.defined,g=a.destroyObjectProperties,d=a.each,
	m=a.format,r=a.pick;a=a.Series;A.prototype={destroy:function(){g(this,this.axis)},render:function(a){var d=this.options,b=d.format,b=b?m(b,this):d.formatter.call(this);this.label?this.label.attr({text:b,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(b,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,d){var b=this.axis,k=b.chart,g=k.inverted,m=b.reversed,m=this.isNegative&&!m||!this.isNegative&&m,e=b.translate(b.usePercentage?
	100:this.total,0,0,0,1),b=b.translate(0),b=Math.abs(e-b),c=k.xAxis[0].translate(this.x)+a,l=k.plotHeight,m={x:g?m?e:e-b:c,y:g?l-c-d:m?l-e-b:l-e,width:g?b:d,height:g?d:b};if(g=this.label)g.align(this.alignOptions,null,m),m=g.alignAttr,g[!1===this.options.crop||k.isInsidePlot(m.x,m.y)?"show":"hide"](!0)}};E.prototype.getStacks=function(){var a=this;d(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});d(a.series,function(d){!d.options.stacking||!0!==d.visible&&!1!==a.options.chart.ignoreHiddenSeries||
	(d.stackKey=d.type+r(d.options.stack,""))})};y.prototype.buildStacks=function(){var a=this.series,d,b=r(this.options.reversedStacks,!0),k=a.length,g;if(!this.isXAxis){this.usePercentage=!1;for(g=k;g--;)a[b?g:k-g-1].setStackedPoints();for(g=k;g--;)d=a[b?g:k-g-1],d.setStackCliffs&&d.setStackCliffs();if(this.usePercentage)for(g=0;g<k;g++)a[g].setPercentStacks()}};y.prototype.renderStackTotals=function(){var a=this.chart,d=a.renderer,b=this.stacks,k,g,m=this.stackTotalGroup;m||(this.stackTotalGroup=m=
	d.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());m.translate(a.plotLeft,a.plotTop);for(k in b)for(g in a=b[k],a)a[g].render(m)};y.prototype.resetStacks=function(){var a=this.stacks,d,b;if(!this.isXAxis)for(d in a)for(b in a[d])a[d][b].touched<this.stacksTouched?(a[d][b].destroy(),delete a[d][b]):(a[d][b].total=null,a[d][b].cum=0)};y.prototype.cleanStacks=function(){var a,d,b;if(!this.isXAxis)for(d in this.oldStacks&&(a=this.stacks=this.oldStacks),a)for(b in a[d])a[d][b].cum=a[d][b].total};
	a.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var a=this.processedXData,d=this.processedYData,b=[],k=d.length,g=this.options,m=g.threshold,e=g.startFromThreshold?m:0,c=g.stack,g=g.stacking,l=this.stackKey,q="-"+l,h=this.negStacks,f=this.yAxis,u=f.stacks,D=f.oldStacks,H,F,I,C,w,y,E;f.stacksTouched+=1;for(w=0;w<k;w++)y=a[w],E=d[w],H=this.getStackIndicator(H,y,this.index),C=H.key,I=(F=h&&E<(e?0:m))?q:l,u[I]||(u[I]=
	{}),u[I][y]||(D[I]&&D[I][y]?(u[I][y]=D[I][y],u[I][y].total=null):u[I][y]=new A(f,f.options.stackLabels,F,y,c)),I=u[I][y],null!==E&&(I.points[C]=I.points[this.index]=[r(I.cum,e)],t(I.cum)||(I.base=C),I.touched=f.stacksTouched,0<H.index&&!1===this.singleStacks&&(I.points[C][0]=I.points[this.index+","+y+",0"][0])),"percent"===g?(F=F?l:q,h&&u[F]&&u[F][y]?(F=u[F][y],I.total=F.total=Math.max(F.total,I.total)+Math.abs(E)||0):I.total=G(I.total+(Math.abs(E)||0))):I.total=G(I.total+(E||0)),I.cum=r(I.cum,e)+
	(E||0),null!==E&&(I.points[C].push(I.cum),b[w]=I.cum);"percent"===g&&(f.usePercentage=!0);this.stackedYData=b;f.oldStacks={}}};a.prototype.setPercentStacks=function(){var a=this,g=a.stackKey,b=a.yAxis.stacks,k=a.processedXData,m;d([g,"-"+g],function(d){for(var e=k.length,c,g;e--;)if(c=k[e],m=a.getStackIndicator(m,c,a.index),c=(g=b[d]&&b[d][c])&&g.points[m.key])g=g.total?100/g.total:0,c[0]=G(c[0]*g),c[1]=G(c[1]*g),a.stackedYData[e]=c[1]})};a.prototype.getStackIndicator=function(a,d,b){t(a)&&a.x===
	d?a.index++:a={x:d,index:0};a.key=[b,d,a.index].join();return a}})(K);(function(a){var A=a.addEvent,y=a.animate,E=a.Axis,G=a.createElement,t=a.css,g=a.defined,d=a.each,m=a.erase,r=a.extend,n=a.fireEvent,p=a.inArray,b=a.isObject,k=a.merge,v=a.pick,B=a.Point,e=a.Series,c=a.seriesTypes,l=a.setAnimation,q=a.splat;r(a.Chart.prototype,{addSeries:function(a,b,c){var e,d=this;a&&(b=v(b,!0),n(d,"addSeries",{options:a},function(){e=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();b&&d.redraw(c)}));return e},
	addAxis:function(a,b,c,e){var d=b?"xAxis":"yAxis",g=this.options;a=k(a,{index:this[d].length,isX:b});new E(this,a);g[d]=q(g[d]||{});g[d].push(a);v(c,!0)&&this.redraw(e)},showLoading:function(a){var b=this,c=b.options,e=b.loadingDiv,d=c.loading,g=function(){e&&t(e,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};e||(b.loadingDiv=e=G("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=G("span",{className:"highcharts-loading-inner"},
	null,e),A(b,"redraw",g));setTimeout(function(){e.className="highcharts-loading"});b.loadingSpan.innerHTML=a||c.lang.loading;t(e,r(d.style,{zIndex:10}));t(b.loadingSpan,d.labelStyle);b.loadingShown||(t(e,{opacity:0,display:""}),y(e,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));b.loadingShown=!0;g()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",y(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){t(b,
	{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:["chart.polar","chart.ignoreHiddenSeries","chart.type","colors","plotOptions"],update:function(a,b){var c,e={credits:"addCredits",title:"setTitle",
	subtitle:"setSubtitle"},l=a.chart,m,n;if(l){k(!0,this.options.chart,l);"className"in l&&this.setClassName(l.className);if("inverted"in l||"polar"in l)this.propFromSeries(),m=!0;for(c in l)l.hasOwnProperty(c)&&(-1!==p("chart."+c,this.propsRequireUpdateSeries)&&(n=!0),-1!==p(c,this.propsRequireDirtyBox)&&(this.isDirtyBox=!0));"style"in l&&this.renderer.setStyle(l.style)}for(c in a){if(this[c]&&"function"===typeof this[c].update)this[c].update(a[c],!1);else if("function"===typeof this[e[c]])this[e[c]](a[c]);
	"chart"!==c&&-1!==p(c,this.propsRequireUpdateSeries)&&(n=!0)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&k(!0,this.options.plotOptions,a.plotOptions);d(["xAxis","yAxis","series"],function(b){a[b]&&d(q(a[b]),function(a){var c=g(a.id)&&this.get(a.id)||this[b][0];c&&c.coll===b&&c.update(a,!1)},this)},this);m&&d(this.axes,function(a){a.update({},!1)});n&&d(this.series,function(a){a.update({},!1)});a.loading&&k(!0,this.options.loading,a.loading);l&&("width"in l||"height"in l)?this.setSize(l.width,
	l.height):v(b,!0)&&this.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});r(B.prototype,{update:function(a,c,e,d){function g(){k.applyOptions(a);null===k.y&&q&&(k.graphic=q.destroy());b(a,!0)&&(q&&q.element&&a&&a.marker&&a.marker.symbol&&(k.graphic=q.destroy()),a&&a.dataLabels&&k.dataLabel&&(k.dataLabel=k.dataLabel.destroy()));m=k.index;l.updateParallelArrays(k,m);p.data[m]=b(p.data[m],!0)?k.options:a;l.isDirty=l.isDirtyData=!0;!l.fixedBox&&l.hasCartesianSeries&&(n.isDirtyBox=!0);"point"===
	p.legendType&&(n.isDirtyLegend=!0);c&&n.redraw(e)}var k=this,l=k.series,q=k.graphic,m,n=l.chart,p=l.options;c=v(c,!0);!1===d?g():k.firePointEvent("update",{options:a},g)},remove:function(a,b){this.series.removePoint(p(this,this.series.data),a,b)}});r(e.prototype,{addPoint:function(a,b,c,e){var d=this.options,g=this.data,k=this.chart,l=this.xAxis&&this.xAxis.names,q=d.data,m,n,p=this.xData,r,t;b=v(b,!0);m={series:this};this.pointClass.prototype.applyOptions.apply(m,[a]);t=m.x;r=p.length;if(this.requireSorting&&
	t<p[r-1])for(n=!0;r&&p[r-1]>t;)r--;this.updateParallelArrays(m,"splice",r,0,0);this.updateParallelArrays(m,r);l&&m.name&&(l[t]=m.name);q.splice(r,0,a);n&&(this.data.splice(r,0,null),this.processData());"point"===d.legendType&&this.generatePoints();c&&(g[0]&&g[0].remove?g[0].remove(!1):(g.shift(),this.updateParallelArrays(m,"shift"),q.shift()));this.isDirtyData=this.isDirty=!0;b&&k.redraw(e)},removePoint:function(a,b,c){var e=this,d=e.data,g=d[a],k=e.points,q=e.chart,m=function(){k&&k.length===d.length&&
	k.splice(a,1);d.splice(a,1);e.options.data.splice(a,1);e.updateParallelArrays(g||{series:e},"splice",a,1);g&&g.destroy();e.isDirty=!0;e.isDirtyData=!0;b&&q.redraw()};l(c,q);b=v(b,!0);g?g.firePointEvent("remove",null,m):m()},remove:function(a,b,c){function e(){d.destroy();g.isDirtyLegend=g.isDirtyBox=!0;g.linkSeries();v(a,!0)&&g.redraw(b)}var d=this,g=d.chart;!1!==c?n(d,"remove",null,e):e()},update:function(a,b){var e=this,g=this.chart,l=this.userOptions,q=this.type,m=a.type||l.type||g.options.chart.type,
	n=c[q].prototype,p=["group","markerGroup","dataLabelsGroup"],t;if(m&&m!==q||void 0!==a.zIndex)p.length=0;d(p,function(a){p[a]=e[a];delete e[a]});a=k(l,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1,null,!1);for(t in n)this[t]=void 0;r(this,c[m||q].prototype);d(p,function(a){e[a]=p[a]});this.init(g,a);g.linkSeries();v(b,!0)&&g.redraw(!1)}});r(E.prototype,{update:function(a,b){var c=this.chart;a=c.options[this.coll][this.options.index]=k(this.userOptions,
	a);this.destroy(!0);this.init(c,r(a,{events:void 0}));c.isDirtyBox=!0;v(b,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,e=this.series,g=e.length;g--;)e[g]&&e[g].remove(!1);m(b.axes,this);m(b[c],this);b.options[c].splice(this.options.index,1);d(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;v(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(K);(function(a){var A=a.color,y=
	a.each,E=a.map,G=a.pick,t=a.Series,g=a.seriesType;g("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(){var a=[],g=[],r=this.xAxis,n=this.yAxis,p=n.stacks[this.stackKey],b={},k=this.points,v=this.index,t=n.series,e=t.length,c,l=G(n.options.reversedStacks,!0)?1:-1,q,h;if(this.options.stacking){for(q=0;q<k.length;q++)b[k[q].x]=k[q];for(h in p)null!==p[h].total&&g.push(h);g.sort(function(a,b){return a-b});c=E(t,function(){return this.visible});y(g,function(f,h){var k=
	0,t,F;if(b[f]&&!b[f].isNull)a.push(b[f]),y([-1,1],function(a){var d=1===a?"rightNull":"leftNull",k=0,n=p[g[h+a]];if(n)for(q=v;0<=q&&q<e;)t=n.points[q],t||(q===v?b[f][d]=!0:c[q]&&(F=p[f].points[q])&&(k-=F[1]-F[0])),q+=l;b[f][1===a?"rightCliff":"leftCliff"]=k});else{for(q=v;0<=q&&q<e;){if(t=p[f].points[q]){k=t[1];break}q+=l}k=n.toPixels(k,!0);a.push({isNull:!0,plotX:r.toPixels(f,!0),plotY:k,yBottom:k})}})}return a},getGraphPath:function(a){var g=t.prototype.getGraphPath,r=this.options,n=r.stacking,
	p=this.yAxis,b,k,v=[],B=[],e=this.index,c,l=p.stacks[this.stackKey],q=r.threshold,h=p.getThreshold(r.threshold),f,r=r.connectNulls||"percent"===n,u=function(b,f,g){var k=a[b];b=n&&l[k.x].points[e];var u=k[g+"Null"]||0;g=k[g+"Cliff"]||0;var m,r,k=!0;g||u?(m=(u?b[0]:b[1])+g,r=b[0]+g,k=!!u):!n&&a[f]&&a[f].isNull&&(m=r=q);void 0!==m&&(B.push({plotX:c,plotY:null===m?h:p.getThreshold(m),isNull:k}),v.push({plotX:c,plotY:null===r?h:p.getThreshold(r),doCurve:!1}))};a=a||this.points;n&&(a=this.getStackPoints());
	for(b=0;b<a.length;b++)if(k=a[b].isNull,c=G(a[b].rectPlotX,a[b].plotX),f=G(a[b].yBottom,h),!k||r)r||u(b,b-1,"left"),k&&!n&&r||(B.push(a[b]),v.push({x:b,plotX:c,plotY:f})),r||u(b,b+1,"right");b=g.call(this,B,!0,!0);v.reversed=!0;k=g.call(this,v,!0,!0);k.length&&(k[0]="L");k=b.concat(k);g=g.call(this,B,!1,r);k.xMap=b.xMap;this.areaPath=k;return g},drawGraph:function(){this.areaPath=[];t.prototype.drawGraph.apply(this);var a=this,g=this.areaPath,r=this.options,n=[["area","highcharts-area",this.color,
	r.fillColor]];y(this.zones,function(g,b){n.push(["zone-area-"+b,"highcharts-area highcharts-zone-area-"+b+" "+g.className,g.color||a.color,g.fillColor||r.fillColor])});y(n,function(n){var b=n[0],k=a[b];k?(k.endX=g.xMap,k.animate({d:g})):(k=a[b]=a.chart.renderer.path(g).addClass(n[1]).attr({fill:G(n[3],A(n[2]).setOpacity(G(r.fillOpacity,.75)).get()),zIndex:0}).add(a.group),k.isArea=!0);k.startX=g.xMap;k.shiftUnit=r.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var A=
	a.extendClass,y=a.merge,E=a.pick,G=a.Series,t=a.seriesTypes;a.defaultPlotOptions.spline=y(a.defaultPlotOptions.line);t.spline=A(G,{type:"spline",getPointSpline:function(a,d,m){var r=d.plotX,n=d.plotY,p=a[m-1];m=a[m+1];var b,k,v,t;if(p&&!p.isNull&&!1!==p.doCurve&&m&&!m.isNull&&!1!==m.doCurve){a=p.plotY;v=m.plotX;m=m.plotY;var e=0;b=(1.5*r+p.plotX)/2.5;k=(1.5*n+a)/2.5;v=(1.5*r+v)/2.5;t=(1.5*n+m)/2.5;v!==b&&(e=(t-k)*(v-r)/(v-b)+n-t);k+=e;t+=e;k>a&&k>n?(k=Math.max(a,n),t=2*n-k):k<a&&k<n&&(k=Math.min(a,
	n),t=2*n-k);t>m&&t>n?(t=Math.max(m,n),k=2*n-t):t<m&&t<n&&(t=Math.min(m,n),k=2*n-t);d.rightContX=v;d.rightContY=t}d=["C",E(p.rightContX,p.plotX),E(p.rightContY,p.plotY),E(b,r),E(k,n),r,n];p.rightContX=p.rightContY=null;return d}})})(K);(function(a){var A=a.seriesTypes.area.prototype,y=a.seriesType;y("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:A.getStackPoints,getGraphPath:A.getGraphPath,setStackCliffs:A.setStackCliffs,drawGraph:A.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);
	(function(a){var A=a.animObject,y=a.color,E=a.each,G=a.extend,t=a.isNumber,g=a.merge,d=a.pick,m=a.Series,r=a.seriesType,n=a.stop,p=a.svg;r("column","line",{borderRadius:0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,
	borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){m.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&E(d.series,function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,g=a.options,m=a.xAxis,n=a.yAxis,e=m.reversed,c,l={},q=0;!1===g.grouping?q=1:E(a.chart.series,function(e){var d=e.options,f=e.yAxis,h;e.type===a.type&&e.visible&&n.len===f.len&&n.pos===f.pos&&(d.stacking?(c=
	e.stackKey,void 0===l[c]&&(l[c]=q++),h=l[c]):!1!==d.grouping&&(h=q++),e.columnIndex=h)});var h=Math.min(Math.abs(m.transA)*(m.ordinalSlope||g.pointRange||m.closestPointRange||m.tickInterval||1),m.len),f=h*g.groupPadding,u=(h-2*f)/q,g=Math.min(g.maxPointWidth||m.len,d(g.pointWidth,u*(1-2*g.pointPadding)));a.columnMetrics={width:g,offset:(u-g)/2+(f+((a.columnIndex||0)+(e?1:0))*u-h/2)*(e?-1:1)};return a.columnMetrics},crispCol:function(a,d,g,m){var e=this.chart,c=this.borderWidth,l=-(c%2?.5:0),c=c%2?
	.5:1;e.inverted&&e.renderer.isVML&&(c+=1);g=Math.round(a+g)+l;a=Math.round(a)+l;m=Math.round(d+m)+c;l=.5>=Math.abs(d)&&.5<m;d=Math.round(d)+c;m-=d;l&&m&&(--d,m+=1);return{x:a,y:d,width:g-a,height:m}},translate:function(){var a=this,g=a.chart,n=a.options,p=a.dense=2>a.closestPointRange*a.xAxis.transA,p=a.borderWidth=d(n.borderWidth,p?0:1),e=a.yAxis,c=a.translatedThreshold=e.getThreshold(n.threshold),l=d(n.minPointLength,5),q=a.getColumnMetrics(),h=q.width,f=a.barW=Math.max(h,1+2*p),u=a.pointXOffset=
	q.offset;g.inverted&&(c-=.5);n.pointPadding&&(f=Math.ceil(f));m.prototype.translate.apply(a);E(a.points,function(q){var m=d(q.yBottom,c),n=999+Math.abs(m),n=Math.min(Math.max(-n,q.plotY),e.len+n),p=q.plotX+u,r=f,t=Math.min(n,m),v,B=Math.max(n,m)-t;Math.abs(B)<l&&l&&(B=l,v=!e.reversed&&!q.negative||e.reversed&&q.negative,t=Math.abs(t-c)>l?m-l:c-(v?l:0));q.barX=p;q.pointWidth=h;q.tooltipPos=g.inverted?[e.len+e.pos-g.plotLeft-n,a.xAxis.len-p-r/2,B]:[p+r/2,n+e.pos-g.plotTop,B];q.shapeType="rect";q.shapeArgs=
	a.crispCol.apply(a,q.isNull?[q.plotX,e.len/2,0,0]:[p,t,r,B])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,d){var g=this.options,m,e,c=this.pointAttrToOptions||{};e=c.stroke||"borderColor";var l=c["stroke-width"]||"borderWidth",q=a&&a.color||this.color,h=g[e]||this.color||q,c=g.dashStyle,f;a&&this.zones.length&&(q=(m=a.getZone())&&m.color||a.options.color||
	this.color);d&&(m=g.states[d],f=m.brightness,q=m.color||void 0!==f&&y(q).brighten(m.brightness).get()||q,h=m[e]||h,c=m.dashStyle||c);e={fill:q,stroke:h,"stroke-width":a[l]||g[l]||this[l]||0};g.borderRadius&&(e.r=g.borderRadius);c&&(e.dashstyle=c);return e},drawPoints:function(){var a=this,d=this.chart,m=a.options,p=d.renderer,e=m.animationLimit||250,c;E(a.points,function(l){var q=l.graphic;t(l.plotY)&&null!==l.y?(c=l.shapeArgs,q?(n(q),q[d.pointCount<e?"animate":"attr"](g(c))):l.graphic=q=p[l.shapeType](c).attr({"class":l.getClassName()}).add(l.group||
	a.group),q.attr(a.pointAttribs(l,l.selected&&"select")).shadow(m.shadow,null,m.stacking&&!m.borderRadius)):q&&(l.graphic=q.destroy())})},animate:function(a){var d=this,g=this.yAxis,m=d.options,e=this.chart.inverted,c={};p&&(a?(c.scaleY=.001,a=Math.min(g.pos+g.len,Math.max(g.pos,g.toPixels(m.threshold))),e?c.translateX=a-g.len:c.translateY=a,d.group.attr(c)):(c[e?"translateX":"translateY"]=g.pos,d.group.animate(c,G(A(d.options.animation),{step:function(a,b){d.group.attr({scaleY:Math.max(.001,b.pos)})}})),
	d.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&E(d.series,function(d){d.type===a.type&&(d.isDirty=!0)});m.prototype.remove.apply(a,arguments)}})})(K);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(K);(function(a){var A=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 0.85em"> {series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}},
	{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function(){this.options.lineWidth&&A.prototype.drawGraph.call(this)}})})(K);(function(a){var A=a.pick,y=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,G=this.chart,t=2*(a.slicedOffset||0),g=G.plotWidth-2*t,G=G.plotHeight-2*t,d=a.center,d=[A(d[0],"50%"),A(d[1],"50%"),a.size||"100%",a.innerSize||0],m=Math.min(g,G),r,
	n;for(r=0;4>r;++r)n=d[r],a=2>r||2===r&&/%$/.test(n),d[r]=y(n,[g,G,m,d[2]][r])+(a?t:0);d[3]>d[2]&&(d[3]=d[2]);return d}}})(K);(function(a){var A=a.addEvent,y=a.defined,E=a.each,G=a.extend,t=a.inArray,g=a.noop,d=a.pick,m=a.Point,r=a.Series,n=a.seriesType,p=a.setAnimation;n("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return null===this.y?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,
	slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var d=this,g=d.points,m=d.startAngleRad;a||(E(g,function(a){var b=a.graphic,g=a.shapeArgs;b&&(b.attr({r:a.startR||d.center[3]/2,start:m,end:m}),b.animate({r:g.r,start:g.start,
	end:g.end},d.options.animation))}),d.animate=null)},updateTotals:function(){var a,d=0,g=this.points,m=g.length,e,c=this.options.ignoreHiddenPoint;for(a=0;a<m;a++)e=g[a],0>e.y&&(e.y=null),d+=c&&!e.visible?0:e.y;this.total=d;for(a=0;a<m;a++)e=g[a],e.percentage=0<d&&(e.visible||!c)?e.y/d*100:0,e.total=d},generatePoints:function(){r.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var g=0,m=this.options,n=m.slicedOffset,e=n+(m.borderWidth||0),c,l,q,
	h=m.startAngle||0,f=this.startAngleRad=Math.PI/180*(h-90),h=(this.endAngleRad=Math.PI/180*(d(m.endAngle,h+360)-90))-f,u=this.points,p=m.dataLabels.distance,m=m.ignoreHiddenPoint,r,t=u.length,y;a||(this.center=a=this.getCenter());this.getX=function(c,e){q=Math.asin(Math.min((c-a[1])/(a[2]/2+p),1));return a[0]+(e?-1:1)*Math.cos(q)*(a[2]/2+p)};for(r=0;r<t;r++){y=u[r];c=f+g*h;if(!m||y.visible)g+=y.percentage/100;l=f+g*h;y.shapeType="arc";y.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*
	c)/1E3,end:Math.round(1E3*l)/1E3};q=(l+c)/2;q>1.5*Math.PI?q-=2*Math.PI:q<-Math.PI/2&&(q+=2*Math.PI);y.slicedTranslation={translateX:Math.round(Math.cos(q)*n),translateY:Math.round(Math.sin(q)*n)};c=Math.cos(q)*a[2]/2;l=Math.sin(q)*a[2]/2;y.tooltipPos=[a[0]+.7*c,a[1]+.7*l];y.half=q<-Math.PI/2||q>Math.PI/2?1:0;y.angle=q;e=Math.min(e,p/5);y.labelPos=[a[0]+c+Math.cos(q)*p,a[1]+l+Math.sin(q)*p,a[0]+c+Math.cos(q)*e,a[1]+l+Math.sin(q)*e,a[0]+c,a[1]+l,0>p?"center":y.half?"right":"left",q]}},drawGraph:null,
	drawPoints:function(){var a=this,d=a.chart.renderer,g,m,e,c,l=a.options.shadow;l&&!a.shadowGroup&&(a.shadowGroup=d.g("shadow").add(a.group));E(a.points,function(q){if(null!==q.y){m=q.graphic;c=q.shapeArgs;g=q.sliced?q.slicedTranslation:{};var h=q.shadowGroup;l&&!h&&(h=q.shadowGroup=d.g("shadow").add(a.shadowGroup));h&&h.attr(g);e=a.pointAttribs(q,q.selected&&"select");m?m.setRadialReference(a.center).attr(e).animate(G(c,g)):(q.graphic=m=d[q.shapeType](c).addClass(q.getClassName()).setRadialReference(a.center).attr(g).add(a.group),
	q.visible||m.attr({visibility:"hidden"}),m.attr(e).attr({"stroke-linejoin":"round"}).shadow(l,h))}})},searchPoint:g,sortByAngle:function(a,d){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*d})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:g},{init:function(){m.prototype.init.apply(this,arguments);var a=this,g;a.name=d(a.name,"Slice");g=function(d){a.slice("select"===d.type)};A(a,"select",g);A(a,"unselect",g);return a},setVisible:function(a,
	g){var m=this,n=m.series,e=n.chart,c=n.options.ignoreHiddenPoint;g=d(g,c);a!==m.visible&&(m.visible=m.options.visible=a=void 0===a?!m.visible:a,n.options.data[t(m,n.data)]=m.options,E(["graphic","dataLabel","connector","shadowGroup"],function(c){if(m[c])m[c][a?"show":"hide"](!0)}),m.legendItem&&e.legend.colorizeItem(m,a),a||"hover"!==m.state||m.setState(""),c&&(n.isDirty=!0),g&&e.redraw())},slice:function(a,g,m){var n=this.series;p(m,n.chart);d(g,!0);this.sliced=this.options.sliced=a=y(a)?a:!this.sliced;
	n.options.data[t(this,n.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)},haloPath:function(a){var d=this.shapeArgs,g=this.series.chart;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(g.plotLeft+d.x,g.plotTop+d.y,d.r+a,d.r+a,{innerR:this.shapeArgs.r,start:d.start,end:d.end})}})})(K);(function(a){var A=a.addEvent,y=a.arrayMax,E=a.defined,G=a.each,t=a.extend,g=a.format,d=a.map,
	m=a.merge,r=a.noop,n=a.pick,p=a.relativeLength,b=a.Series,k=a.seriesTypes,v=a.stableSort,B=a.stop;a.distribute=function(a,b){function g(a,b){return a.target-b.target}var k,h=!0,f=a,m=[],n;n=0;for(k=a.length;k--;)n+=a[k].size;if(n>b){v(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(n=k=0;n<=b;)n+=a[k].size,k++;m=a.splice(k-1,a.length)}v(a,g);for(a=d(a,function(a){return{size:a.size,targets:[a.target]}});h;){for(k=a.length;k--;)h=a[k],n=(Math.min.apply(0,h.targets)+Math.max.apply(0,h.targets))/
	2,h.pos=Math.min(Math.max(0,n-h.size/2),b-h.size);k=a.length;for(h=!1;k--;)0<k&&a[k-1].pos+a[k-1].size>a[k].pos&&(a[k-1].size+=a[k].size,a[k-1].targets=a[k-1].targets.concat(a[k].targets),a[k-1].pos+a[k-1].size>b&&(a[k-1].pos=b-a[k-1].size),a.splice(k,1),h=!0)}k=0;G(a,function(a){var b=0;G(a.targets,function(){f[k].pos=a.pos+b;b+=f[k].size;k++})});f.push.apply(f,m);v(f,g)};b.prototype.drawDataLabels=function(){var a=this,b=a.options,d=b.dataLabels,k=a.points,h,f,u=a.hasRendered||0,p,r,v=n(d.defer,
	!0),y=a.chart.renderer;if(d.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(d),r=a.plotGroup("dataLabelsGroup","data-labels",v&&!u?"hidden":"visible",d.zIndex||6),v&&(r.attr({opacity:+u}),u||A(a,"afterAnimate",function(){a.visible&&r.show(!0);r[b.animation?"animate":"attr"]({opacity:1},{duration:200})})),f=d,G(k,function(k){var u,q=k.dataLabel,v,x,F=k.connector,B=!0,A,G={};h=k.dlOptions||k.options&&k.options.dataLabels;u=n(h&&h.enabled,f.enabled)&&null!==k.y;if(q&&!u)k.dataLabel=
	q.destroy();else if(u){d=m(f,h);A=d.style;u=d.rotation;v=k.getLabelConfig();p=d.format?g(d.format,v):d.formatter.call(v,d);A.color=n(d.color,A.color,a.color,"#000000");if(q)E(p)?(q.attr({text:p}),B=!1):(k.dataLabel=q=q.destroy(),F&&(k.connector=F.destroy()));else if(E(p)){q={fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":d.borderWidth,r:d.borderRadius||0,rotation:u,padding:d.padding,zIndex:1};"contrast"===A.color&&(G.color=d.inside||0>d.distance||b.stacking?y.getContrast(k.color||a.color):
	"#000000");b.cursor&&(G.cursor=b.cursor);for(x in q)void 0===q[x]&&delete q[x];q=k.dataLabel=y[u?"text":"label"](p,0,-9999,d.shape,null,null,d.useHTML,null,"data-label").attr(q);q.addClass("highcharts-data-label-color-"+k.colorIndex+" "+(d.className||""));q.css(t(A,G));q.add(r);q.shadow(d.shadow)}q&&a.alignDataLabel(k,q,d,null,B)}})};b.prototype.alignDataLabel=function(a,b,d,g,h){var f=this.chart,k=f.inverted,m=n(a.plotX,-9999),p=n(a.plotY,-9999),r=b.getBBox(),v,y=d.rotation,w=d.align,A=this.visible&&
	(a.series.forceDL||f.isInsidePlot(m,Math.round(p),k)||g&&f.isInsidePlot(m,k?g.x+1:g.y+g.height-1,k)),E="justify"===n(d.overflow,"justify");A&&(v=d.style.fontSize,v=f.renderer.fontMetrics(v,b).b,g=t({x:k?f.plotWidth-p:m,y:Math.round(k?f.plotHeight-m:p),width:0,height:0},g),t(d,{width:r.width,height:r.height}),y?(E=!1,k=f.renderer.rotCorr(v,y),k={x:g.x+d.x+g.width/2+k.x,y:g.y+d.y+{top:0,middle:.5,bottom:1}[d.verticalAlign]*g.height},b[h?"attr":"animate"](k).attr({align:w}),m=(y+720)%360,m=180<m&&360>
	m,"left"===w?k.y-=m?r.height:0:"center"===w?(k.x-=r.width/2,k.y-=r.height/2):"right"===w&&(k.x-=r.width,k.y-=m?0:r.height)):(b.align(d,null,g),k=b.alignAttr),E?this.justifyDataLabel(b,d,k,r,g,h):n(d.crop,!0)&&(A=f.isInsidePlot(k.x,k.y)&&f.isInsidePlot(k.x+r.width,k.y+r.height)),d.shape&&!y&&b.attr({anchorX:a.plotX,anchorY:a.plotY}));A||(B(b),b.attr({y:-9999}),b.placed=!1)};b.prototype.justifyDataLabel=function(a,b,d,g,h,f){var k=this.chart,m=b.align,n=b.verticalAlign,p,r,t=a.box?0:a.padding||0;p=
	d.x+t;0>p&&("right"===m?b.align="left":b.x=-p,r=!0);p=d.x+g.width-t;p>k.plotWidth&&("left"===m?b.align="right":b.x=k.plotWidth-p,r=!0);p=d.y+t;0>p&&("bottom"===n?b.verticalAlign="top":b.y=-p,r=!0);p=d.y+g.height-t;p>k.plotHeight&&("top"===n?b.verticalAlign="bottom":b.y=k.plotHeight-p,r=!0);r&&(a.placed=!f,a.align(b,null,h))};k.pie&&(k.pie.prototype.drawDataLabels=function(){var e=this,c=e.data,g,k=e.chart,h=e.options.dataLabels,f=n(h.connectorPadding,10),m=n(h.connectorWidth,1),p=k.plotWidth,r=k.plotHeight,
	t,v=h.distance,C=e.center,w=C[2]/2,B=C[1],A=0<v,x,z,E,K,S=[[],[]],L,R,T,Q,P=[0,0,0,0];e.visible&&(h.enabled||e._hasPointLabels)&&(b.prototype.drawDataLabels.apply(e),G(c,function(a){a.dataLabel&&a.visible&&(S[a.half].push(a),a.dataLabel._pos=null)}),G(S,function(b,c){var m,n,u=b.length,t,y,F;if(u)for(e.sortByAngle(b,c-.5),0<v&&(m=Math.max(0,B-w-v),n=Math.min(B+w+v,k.plotHeight),t=d(b,function(a){if(a.dataLabel)return F=a.dataLabel.getBBox().height||21,{target:a.labelPos[1]-m+F/2,size:F,rank:a.y}}),
	a.distribute(t,n+F-m)),Q=0;Q<u;Q++)g=b[Q],E=g.labelPos,x=g.dataLabel,T=!1===g.visible?"hidden":"inherit",y=E[1],t?void 0===t[Q].pos?T="hidden":(K=t[Q].size,R=m+t[Q].pos):R=y,L=h.justify?C[0]+(c?-1:1)*(w+v):e.getX(R<m+2||R>n-2?y:R,c),x._attr={visibility:T,align:E[6]},x._pos={x:L+h.x+({left:f,right:-f}[E[6]]||0),y:R+h.y-10},E.x=L,E.y=R,null===e.options.size&&(z=x.width,L-z<f?P[3]=Math.max(Math.round(z-L+f),P[3]):L+z>p-f&&(P[1]=Math.max(Math.round(L+z-p+f),P[1])),0>R-K/2?P[0]=Math.max(Math.round(-R+
	K/2),P[0]):R+K/2>r&&(P[2]=Math.max(Math.round(R+K/2-r),P[2])))}),0===y(P)||this.verifyDataLabelOverflow(P))&&(this.placeDataLabels(),A&&m&&G(this.points,function(a){var b;t=a.connector;if((x=a.dataLabel)&&x._pos&&a.visible){T=x._attr.visibility;if(b=!t)a.connector=t=k.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(e.dataLabelsGroup),t.attr({"stroke-width":m,stroke:h.connectorColor||a.color||"#666666"});t[b?"attr":"animate"]({d:e.connectorPath(a.labelPos)});
	t.attr("visibility",T)}else t&&(a.connector=t.destroy())}))},k.pie.prototype.connectorPath=function(a){var b=a.x,d=a.y;return n(this.options.softConnector,!0)?["M",b+("left"===a[6]?5:-5),d,"C",b,d,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),d,"L",a[2],a[3],"L",a[4],a[5]]},k.pie.prototype.placeDataLabels=function(){G(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))})},
	k.pie.prototype.alignDataLabel=r,k.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,d=this.options,g=d.center,h=d.minSize||80,f,k;null!==g[0]?f=Math.max(b[2]-Math.max(a[1],a[3]),h):(f=Math.max(b[2]-a[1]-a[3],h),b[0]+=(a[3]-a[1])/2);null!==g[1]?f=Math.max(Math.min(f,b[2]-Math.max(a[0],a[2])),h):(f=Math.max(Math.min(f,b[2]-a[0]-a[2]),h),b[1]+=(a[0]-a[2])/2);f<b[2]?(b[2]=f,b[3]=Math.min(p(d.innerSize||0,f),f),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):k=!0;return k});
	k.column&&(k.column.prototype.alignDataLabel=function(a,c,d,g,h){var f=this.chart.inverted,k=a.series,p=a.dlBox||a.shapeArgs,r=n(a.below,a.plotY>n(this.translatedThreshold,k.yAxis.len)),t=n(d.inside,!!this.options.stacking);p&&(g=m(p),0>g.y&&(g.height+=g.y,g.y=0),p=g.y+g.height-k.yAxis.len,0<p&&(g.height-=p),f&&(g={x:k.yAxis.len-g.y-g.height,y:k.xAxis.len-g.x-g.width,width:g.height,height:g.width}),t||(f?(g.x+=r?0:g.width,g.width=0):(g.y+=r?g.height:0,g.height=0)));d.align=n(d.align,!f||t?"center":
	r?"right":"left");d.verticalAlign=n(d.verticalAlign,f||t?"middle":r?"top":"bottom");b.prototype.alignDataLabel.call(this,a,c,d,g,h)})})(K);(function(a){var A=a.Chart,y=a.each,E=a.pick,G=a.addEvent;A.prototype.callbacks.push(function(a){function g(){var d=[];y(a.series,function(a){var g=a.options.dataLabels,n=a.dataLabelCollections||["dataLabel"];(g.enabled||a._hasPointLabels)&&!g.allowOverlap&&a.visible&&y(n,function(g){y(a.points,function(a){a[g]&&(a[g].labelrank=E(a.labelrank,a.shapeArgs&&a.shapeArgs.height),
	d.push(a[g]))})})});a.hideOverlappingLabels(d)}g();G(a,"redraw",g)});A.prototype.hideOverlappingLabels=function(a){var g=a.length,d,m,r,n,p,b,k,v,B,e=function(a,b,d,e,f,g,k,m){return!(f>a+d||f+k<a||g>b+e||g+m<b)};for(m=0;m<g;m++)if(d=a[m])d.oldOpacity=d.opacity,d.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(m=0;m<g;m++)for(r=a[m],d=m+1;d<g;++d)if(n=a[d],r&&n&&r.placed&&n.placed&&0!==r.newOpacity&&0!==n.newOpacity&&(p=r.alignAttr,b=n.alignAttr,k=r.parentGroup,v=n.parentGroup,
	B=2*(r.box?0:r.padding),p=e(p.x+k.translateX,p.y+k.translateY,r.width-B,r.height-B,b.x+v.translateX,b.y+v.translateY,n.width-B,n.height-B)))(r.labelrank<n.labelrank?r:n).newOpacity=0;y(a,function(a){var b,d;a&&(d=a.newOpacity,a.oldOpacity!==d&&a.placed&&(d?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=d,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(K);(function(a){var A=a.addEvent,y=a.Chart,E=a.createElement,G=a.css,t=a.defaultOptions,g=a.defaultPlotOptions,d=a.each,m=
	a.extend,r=a.fireEvent,n=a.hasTouch,p=a.inArray,b=a.isObject,k=a.Legend,v=a.merge,B=a.pick,e=a.Point,c=a.Series,l=a.seriesTypes,q=a.svg;a=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,e=function(a){for(var c=a.target,d;c&&!d;)d=c.point,c=c.parentNode;if(void 0!==d&&d!==b.hoverPoint)d.onMouseOver(a)};d(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.element.point=a)});a._hasTracking||(d(a.trackerGroups,function(b){if(a[b]){a[b].addClass("highcharts-tracker").on("mouseover",
	e).on("mouseout",function(a){c.onTrackerMouseOut(a)});if(n)a[b].on("touchstart",e);a.options.cursor&&a[b].css(G).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,e=[].concat(c?a.areaPath:a.graphPath),g=e.length,k=a.chart,m=k.pointer,l=k.renderer,p=k.options.tooltip.snap,r=a.tracker,t,v=function(){if(k.hoverSeries!==a)a.onMouseOver()},y="rgba(192,192,192,"+(q?1E-4:.002)+")";if(g&&!c)for(t=g+1;t--;)"M"===e[t]&&e.splice(t+1,0,e[t+
	1]-p,e[t+2],"L"),(t&&"M"===e[t]||t===g)&&e.splice(t,0,"L",e[t-2]+p,e[t-1]);r?r.attr({d:e}):a.graph&&(a.tracker=l.path(e).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:y,fill:c?y:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*p),zIndex:2}).add(a.group),d([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",v).on("mouseout",function(a){m.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(n)a.on("touchstart",v)}))}};l.column&&
	(l.column.prototype.drawTracker=a.drawTrackerPoint);l.pie&&(l.pie.prototype.drawTracker=a.drawTrackerPoint);l.scatter&&(l.scatter.prototype.drawTracker=a.drawTrackerPoint);m(k.prototype,{setItemEvents:function(a,b,c){var d=this,e=d.chart,g="highcharts-legend-"+(a.series?"point":"series")+"-active";(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");e.seriesGroup.addClass(g);b.css(d.options.itemHoverStyle)}).on("mouseout",function(){b.css(a.visible?d.itemStyle:d.itemHiddenStyle);e.seriesGroup.removeClass(g);
	a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):r(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=E("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);A(a.checkbox,"click",function(b){r(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});t.legend.itemStyle.cursor=
	"pointer";m(y.prototype,{showResetZoom:function(){var a=this,b=t.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,g="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,!1,g)},zoomOut:function(){var a=this;r(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var c,e=this.pointer,
	g=!1,k;!a||a.resetSelection?d(this.axes,function(a){c=a.zoom()}):d(a.xAxis.concat(a.yAxis),function(a){var b=a.axis,d=b.isXAxis;if(e[d?"zoomX":"zoomY"]||e[d?"pinchX":"pinchY"])c=b.zoom(a.min,a.max),b.displayBtn&&(g=!0)});k=this.resetZoomButton;g&&!k?this.showResetZoom():!g&&b(k)&&(this.resetZoomButton=k.destroy());c&&this.redraw(B(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,e=c.hoverPoints,g;e&&d(e,function(a){a.setState()});d("xy"===b?[1,0]:[1],
	function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,e=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",f=c[d],k=(b.pointRange||0)/2,m=b.getExtremes(),l=b.toValue(f-e,!0)+k,k=b.toValue(f+b.len-e,!0)-k,f=f>e;b.series.length&&(f||l>Math.min(m.dataMin,m.min))&&(!f||k<Math.max(m.dataMax,m.max))&&(b.setExtremes(l,k,!1,!1,{trigger:"pan"}),g=!0);c[d]=e});g&&c.redraw(!1);G(c.container,{cursor:"move"})}});m(e.prototype,{select:function(a,b){var c=this,e=c.series,g=e.chart;a=B(a,!c.selected);c.firePointEvent(a?
	"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;e.options.data[p(c,e.data)]=c.options;c.setState(a&&"select");b||d(g.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,e.options.data[p(a,e.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a,b){var c=this.series,d=c.chart,e=d.tooltip,g=d.hoverPoint;if(d.hoverSeries!==c)c.onMouseOver();if(g&&g!==this)g.onMouseOut();this.series&&(this.firePointEvent("mouseOver"),
	!e||e.shared&&!c.noSharedTooltip||e.refresh(this,a),this.setState("hover"),b||(d.hoverPoint=this))},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");b&&-1!==p(this,b)||(this.setState(),a.hoverPoint=null)},importEvents:function(){if(!this.hasImportedEvents){var a=v(this.series.options.point,this.options).events,b;this.events=a;for(b in a)A(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,e=this.series,
	k=e.options.states[a]||{},l=g[e.type].marker&&e.options.marker||{},n=!1===l.enabled,p=l.states&&l.states[a]||{},q=!1===p.enabled,r=e.stateMarkerGraphic,t=this.marker||{},y=e.chart,A=e.halo;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===k.enabled||a&&(q||n&&!1===p.enabled)||a&&t.states&&t.states[a]&&!1===t.states[a].enabled)){l=p.radius||l.radius+(p.radiusPlus||0);if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+
	a),c=l?{x:c-l,y:d-l,width:2*l,height:2*l}:{},c=v(e.pointAttribs(this,a),c),this.graphic.attr(c),r&&r.hide();else{if(a&&p){p=t.symbol||e.symbol;r&&r.currentSymbol!==p&&(r=r.destroy());if(r)r[b?"animate":"attr"]({x:c-l,y:d-l});else p&&(e.stateMarkerGraphic=r=y.renderer.symbol(p,c-l,d-l,2*l,2*l).add(e.markerGroup),r.currentSymbol=p);r&&r.attr(e.pointAttribs(this,a))}r&&(r[a&&y.isInsidePlot(c,d,y.inverted)?"show":"hide"](),r.element.point=this)}(k=k.halo)&&k.size?(A||(e.halo=A=y.renderer.path().add(y.seriesGroup)),
	A[b?"animate":"attr"]({d:this.haloPath(k.size)}),A.attr({"class":"highcharts-halo highcharts-color-"+B(this.colorIndex,e.colorIndex)}),A.attr(m({fill:this.color||e.color,"fill-opacity":k.opacity,zIndex:-1},k.attributes))[b?"animate":"attr"]({d:this.haloPath(k.size)})):A&&A.attr({d:[]});this.state=a}},haloPath:function(a){var b=this.series,c=b.chart,d=b.getPlotBox(),e=c.inverted,g=Math.floor(this.plotX);return c.renderer.symbols.circle(d.translateX+(e?b.yAxis.len-this.plotY:g)-a,d.translateY+(e?b.xAxis.len-
	g:this.plotY)-a,2*a,2*a)}});m(c.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&r(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&r(this,"mouseOut");!c||a.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,c=
	b.options,e=b.graph,g=c.states,k=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(d([b.group,b.markerGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!g[a]||!1!==g[a].enabled)&&(a&&(k=g[a].lineWidth||k+(g[a].lineWidthPlus||0)),e&&!e.dashstyle))for(g={"stroke-width":k},e.attr(g);b["zone-graph-"+c];)b["zone-graph-"+c].attr(g),c+=1},setVisible:function(a,b){var c=this,e=c.chart,g=c.legendItem,k,l=e.options.chart.ignoreHiddenSeries,
	m=c.visible;k=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!m:a)?"show":"hide";d(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][k]()});if(e.hoverSeries===c||(e.hoverPoint&&e.hoverPoint.series)===c)c.onMouseOut();g&&e.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d(e.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});d(c.linkedSeries,function(b){b.setVisible(a,!1)});l&&(e.isDirtyBox=!0);!1!==b&&e.redraw();r(c,k)},show:function(){this.setVisible(!0)},
	hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);r(this,a?"select":"unselect")},drawTracker:a.drawTrackerGraph})})(K);(function(a){var A=a.Chart,y=a.each,E=a.inArray,G=a.isObject,t=a.pick,g=a.splat;A.prototype.setResponsive=function(a){var g=this.options.responsive;g&&g.rules&&y(g.rules,function(g){this.matchResponsiveRule(g,a)},this)};A.prototype.matchResponsiveRule=function(d,g){var r=this.respRules,n=d.condition,
	p;p=d.callback||function(){return this.chartWidth<=t(n.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=t(n.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=t(n.minWidth,0)&&this.chartHeight>=t(n.minHeight,0)};void 0===d._id&&(d._id=a.idCounter++);p=p.call(this);!r[d._id]&&p?d.chartOptions&&(r[d._id]=this.currentOptions(d.chartOptions),this.update(d.chartOptions,g)):r[d._id]&&!p&&(this.update(r[d._id],g),delete r[d._id])};A.prototype.currentOptions=function(a){function m(a,d,b){var k,r;for(k in a)if(-1<
	E(k,["series","xAxis","yAxis"]))for(a[k]=g(a[k]),b[k]=[],r=0;r<a[k].length;r++)b[k][r]={},m(a[k][r],d[k][r],b[k][r]);else G(a[k])?(b[k]={},m(a[k],d[k]||{},b[k])):b[k]=d[k]||null}var r={};m(a,this.options,r);return r}})(K);return K});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * wordcloud2.js
	 * http://timdream.org/wordcloud2.js/
	 *
	 * Copyright 2011 - 2013 Tim Chien
	 * Released under the MIT license
	 */

	'use strict';

	// setImmediate
	if (!window.setImmediate) {
	  window.setImmediate = (function setupSetImmediate() {
	    return window.msSetImmediate ||
	    window.webkitSetImmediate ||
	    window.mozSetImmediate ||
	    window.oSetImmediate ||
	    (function setupSetZeroTimeout() {
	      if (!window.postMessage || !window.addEventListener) {
	        return null;
	      }

	      var callbacks = [undefined];
	      var message = 'zero-timeout-message';

	      // Like setTimeout, but only takes a function argument.  There's
	      // no time argument (always zero) and no arguments (you have to
	      // use a closure).
	      var setZeroTimeout = function setZeroTimeout(callback) {
	        var id = callbacks.length;
	        callbacks.push(callback);
	        window.postMessage(message + id.toString(36), '*');

	        return id;
	      };

	      window.addEventListener('message', function setZeroTimeoutMessage(evt) {
	        // Skipping checking event source, retarded IE confused this window
	        // object with another in the presence of iframe
	        if (typeof evt.data !== 'string' ||
	            evt.data.substr(0, message.length) !== message/* ||
	            evt.source !== window */) {
	          return;
	        }

	        evt.stopImmediatePropagation();

	        var id = parseInt(evt.data.substr(message.length), 36);
	        if (!callbacks[id]) {
	          return;
	        }

	        callbacks[id]();
	        callbacks[id] = undefined;
	      }, true);

	      /* specify clearImmediate() here since we need the scope */
	      window.clearImmediate = function clearZeroTimeout(id) {
	        if (!callbacks[id]) {
	          return;
	        }

	        callbacks[id] = undefined;
	      };

	      return setZeroTimeout;
	    })() ||
	    // fallback
	    function setImmediateFallback(fn) {
	      window.setTimeout(fn, 0);
	    };
	  })();
	}

	if (!window.clearImmediate) {
	  window.clearImmediate = (function setupClearImmediate() {
	    return window.msClearImmediate ||
	    window.webkitClearImmediate ||
	    window.mozClearImmediate ||
	    window.oClearImmediate ||
	    // "clearZeroTimeout" is implement on the previous block ||
	    // fallback
	    function clearImmediateFallback(timer) {
	      window.clearTimeout(timer);
	    };
	  })();
	}

	(function(global) {

	  // Check if WordCloud can run on this browser
	  var isSupported = (function isSupported() {
	    var canvas = document.createElement('canvas');
	    if (!canvas || !canvas.getContext) {
	      return false;
	    }

	    var ctx = canvas.getContext('2d');
	    if (!ctx.getImageData) {
	      return false;
	    }
	    if (!ctx.fillText) {
	      return false;
	    }

	    if (!Array.prototype.some) {
	      return false;
	    }
	    if (!Array.prototype.push) {
	      return false;
	    }

	    return true;
	  }());

	  // Find out if the browser impose minium font size by
	  // drawing small texts on a canvas and measure it's width.
	  var minFontSize = (function getMinFontSize() {
	    if (!isSupported) {
	      return;
	    }

	    var ctx = document.createElement('canvas').getContext('2d');

	    // start from 20
	    var size = 20;

	    // two sizes to measure
	    var hanWidth, mWidth;

	    while (size) {
	      ctx.font = size.toString(10) + 'px sans-serif';
	      if ((ctx.measureText('\uFF37').width === hanWidth) &&
	          (ctx.measureText('m').width) === mWidth) {
	        return (size + 1);
	      }

	      hanWidth = ctx.measureText('\uFF37').width;
	      mWidth = ctx.measureText('m').width;

	      size--;
	    }

	    return 0;
	  })();

	  // Based on http://jsfromhell.com/array/shuffle
	  var shuffleArray = function shuffleArray(arr) {
	    for (var j, x, i = arr.length; i;
	      j = Math.floor(Math.random() * i),
	      x = arr[--i], arr[i] = arr[j],
	      arr[j] = x) {}
	    return arr;
	  };

	  var WordCloud = function WordCloud(elements, options) {
	    if (!isSupported) {
	      return;
	    }

	    if (!Array.isArray(elements)) {
	      elements = [elements];
	    }

	    elements.forEach(function(el, i) {
	      if (typeof el === 'string') {
	        elements[i] = document.getElementById(el);
	        if (!elements[i]) {
	          throw 'The element id specified is not found.';
	        }
	      } else if (!el.tagName && !el.appendChild) {
	        throw 'You must pass valid HTML elements, or ID of the element.';
	      }
	    });

	    /* Default values to be overwritten by options object */
	    var settings = {
	      list: [],
	      fontFamily: '"Trebuchet MS", "Heiti TC", "微軟正黑體", ' +
	                  '"Arial Unicode MS", "Droid Fallback Sans", sans-serif',
	      fontWeight: 'normal',
	      color: 'random-dark',
	      minSize: 0, // 0 to disable
	      weightFactor: 1,
	      clearCanvas: true,
	      backgroundColor: '#fff',  // opaque white = rgba(255, 255, 255, 1)

	      gridSize: 8,
	      drawOutOfBound: false,
	      origin: null,

	      drawMask: false,
	      maskColor: 'rgba(255,0,0,0.3)',
	      maskGapWidth: 0.3,

	      wait: 0,
	      abortThreshold: 0, // disabled
	      abort: function noop() {},

	      minRotation: - Math.PI / 2,
	      maxRotation: Math.PI / 2,

	      shuffle: true,
	      rotateRatio: 0.1,

	      shape: 'circle',
	      ellipticity: 0.65,

	      classes: null,

	      hover: null,
	      click: null
	    };

	    if (options) {
	      for (var key in options) {
	        if (key in settings) {
	          settings[key] = options[key];
	        }
	      }
	    }

	    /* Convert weightFactor into a function */
	    if (typeof settings.weightFactor !== 'function') {
	      var factor = settings.weightFactor;
	      settings.weightFactor = function weightFactor(pt) {
	        return pt * factor; //in px
	      };
	    }

	    /* Convert shape into a function */
	    if (typeof settings.shape !== 'function') {
	      switch (settings.shape) {
	        case 'circle':
	        /* falls through */
	        default:
	          // 'circle' is the default and a shortcut in the code loop.
	          settings.shape = 'circle';
	          break;

	        case 'cardioid':
	          settings.shape = function shapeCardioid(theta) {
	            return 1 - Math.sin(theta);
	          };
	          break;

	        /*

	        To work out an X-gon, one has to calculate "m",
	        where 1/(cos(2*PI/X)+m*sin(2*PI/X)) = 1/(cos(0)+m*sin(0))
	        http://www.wolframalpha.com/input/?i=1%2F%28cos%282*PI%2FX%29%2Bm*sin%28
	        2*PI%2FX%29%29+%3D+1%2F%28cos%280%29%2Bm*sin%280%29%29

	        Copy the solution into polar equation r = 1/(cos(t') + m*sin(t'))
	        where t' equals to mod(t, 2PI/X);

	        */

	        case 'diamond':
	        case 'square':
	          // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
	          // %28t%2C+PI%2F2%29%29%2Bsin%28mod+%28t%2C+PI%2F2%29%29%29%2C+t+%3D
	          // +0+..+2*PI
	          settings.shape = function shapeSquare(theta) {
	            var thetaPrime = theta % (2 * Math.PI / 4);
	            return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));
	          };
	          break;

	        case 'triangle-forward':
	          // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
	          // %28t%2C+2*PI%2F3%29%29%2Bsqrt%283%29sin%28mod+%28t%2C+2*PI%2F3%29
	          // %29%29%2C+t+%3D+0+..+2*PI
	          settings.shape = function shapeTriangle(theta) {
	            var thetaPrime = theta % (2 * Math.PI / 3);
	            return 1 / (Math.cos(thetaPrime) +
	                        Math.sqrt(3) * Math.sin(thetaPrime));
	          };
	          break;

	        case 'triangle':
	        case 'triangle-upright':
	          settings.shape = function shapeTriangle(theta) {
	            var thetaPrime = (theta + Math.PI * 3 / 2) % (2 * Math.PI / 3);
	            return 1 / (Math.cos(thetaPrime) +
	                        Math.sqrt(3) * Math.sin(thetaPrime));
	          };
	          break;

	        case 'pentagon':
	          settings.shape = function shapePentagon(theta) {
	            var thetaPrime = (theta + 0.955) % (2 * Math.PI / 5);
	            return 1 / (Math.cos(thetaPrime) +
	                        0.726543 * Math.sin(thetaPrime));
	          };
	          break;

	        case 'star':
	          settings.shape = function shapeStar(theta) {
	            var thetaPrime = (theta + 0.955) % (2 * Math.PI / 10);
	            if ((theta + 0.955) % (2 * Math.PI / 5) - (2 * Math.PI / 10) >= 0) {
	              return 1 / (Math.cos((2 * Math.PI / 10) - thetaPrime) +
	                          3.07768 * Math.sin((2 * Math.PI / 10) - thetaPrime));
	            } else {
	              return 1 / (Math.cos(thetaPrime) +
	                          3.07768 * Math.sin(thetaPrime));
	            }
	          };
	          break;
	      }
	    }

	    /* Make sure gridSize is a whole number and is not smaller than 4px */
	    settings.gridSize = Math.max(Math.floor(settings.gridSize), 4);

	    /* shorthand */
	    var g = settings.gridSize;
	    var maskRectWidth = g - settings.maskGapWidth;

	    /* normalize rotation settings */
	    var rotationRange = Math.abs(settings.maxRotation - settings.minRotation);
	    var minRotation = Math.min(settings.maxRotation, settings.minRotation);

	    /* information/object available to all functions, set when start() */
	    var grid, // 2d array containing filling information
	      ngx, ngy, // width and height of the grid
	      center, // position of the center of the cloud
	      maxRadius;

	    /* timestamp for measuring each putWord() action */
	    var escapeTime;

	    /* function for getting the color of the text */
	    var getTextColor;
	    function random_hsl_color(min, max) {
	      return 'hsl(' +
	        (Math.random() * 360).toFixed() + ',' +
	        (Math.random() * 30 + 70).toFixed() + '%,' +
	        (Math.random() * (max - min) + min).toFixed() + '%)';
	    }
	    switch (settings.color) {
	      case 'random-dark':
	        getTextColor = function getRandomDarkColor() {
	          return random_hsl_color(10, 50);
	        };
	        break;

	      case 'random-light':
	        getTextColor = function getRandomLightColor() {
	          return random_hsl_color(50, 90);
	        };
	        break;

	      default:
	        if (typeof settings.color === 'function') {
	          getTextColor = settings.color;
	        }
	        break;
	    }

	    /* function for getting the classes of the text */
	    var getTextClasses = null;
	    if (typeof settings.classes === 'function') {
	      getTextClasses = settings.classes;
	    }

	    /* Interactive */
	    var interactive = false;
	    var infoGrid = [];
	    var hovered;

	    var getInfoGridFromMouseTouchEvent =
	    function getInfoGridFromMouseTouchEvent(evt) {
	      var canvas = evt.currentTarget;
	      var rect = canvas.getBoundingClientRect();
	      var clientX;
	      var clientY;
	      /** Detect if touches are available */
	      if (evt.touches) {
	        clientX = evt.touches[0].clientX;
	        clientY = evt.touches[0].clientY;
	      } else {
	        clientX = evt.clientX;
	        clientY = evt.clientY;
	      }
	      var eventX = clientX - rect.left;
	      var eventY = clientY - rect.top;

	      var x = Math.floor(eventX * ((canvas.width / rect.width) || 1) / g);
	      var y = Math.floor(eventY * ((canvas.height / rect.height) || 1) / g);

	      return infoGrid[x][y];
	    };

	    var wordcloudhover = function wordcloudhover(evt) {
	      var info = getInfoGridFromMouseTouchEvent(evt);

	      if (hovered === info) {
	        return;
	      }

	      hovered = info;
	      if (!info) {
	        settings.hover(undefined, undefined, evt);

	        return;
	      }

	      settings.hover(info.item, info.dimension, evt);

	    };

	    var wordcloudclick = function wordcloudclick(evt) {
	      var info = getInfoGridFromMouseTouchEvent(evt);
	      if (!info) {
	        return;
	      }

	      settings.click(info.item, info.dimension, evt);
	      evt.preventDefault();
	    };

	    /* Get points on the grid for a given radius away from the center */
	    var pointsAtRadius = [];
	    var getPointsAtRadius = function getPointsAtRadius(radius) {
	      if (pointsAtRadius[radius]) {
	        return pointsAtRadius[radius];
	      }

	      // Look for these number of points on each radius
	      var T = radius * 8;

	      // Getting all the points at this radius
	      var t = T;
	      var points = [];

	      if (radius === 0) {
	        points.push([center[0], center[1], 0]);
	      }

	      while (t--) {
	        // distort the radius to put the cloud in shape
	        var rx = 1;
	        if (settings.shape !== 'circle') {
	          rx = settings.shape(t / T * 2 * Math.PI); // 0 to 1
	        }

	        // Push [x, y, t]; t is used solely for getTextColor()
	        points.push([
	          center[0] + radius * rx * Math.cos(-t / T * 2 * Math.PI),
	          center[1] + radius * rx * Math.sin(-t / T * 2 * Math.PI) *
	            settings.ellipticity,
	          t / T * 2 * Math.PI]);
	      }

	      pointsAtRadius[radius] = points;
	      return points;
	    };

	    /* Return true if we had spent too much time */
	    var exceedTime = function exceedTime() {
	      return ((settings.abortThreshold > 0) &&
	        ((new Date()).getTime() - escapeTime > settings.abortThreshold));
	    };

	    /* Get the deg of rotation according to settings, and luck. */
	    var getRotateDeg = function getRotateDeg() {
	      if (settings.rotateRatio === 0) {
	        return 0;
	      }

	      if (Math.random() > settings.rotateRatio) {
	        return 0;
	      }

	      if (rotationRange === 0) {
	        return minRotation;
	      }

	      return minRotation + Math.random() * rotationRange;
	    };

	    var getTextInfo = function getTextInfo(word, weight, rotateDeg) {
	      // calculate the acutal font size
	      // fontSize === 0 means weightFactor function wants the text skipped,
	      // and size < minSize means we cannot draw the text.
	      var debug = false;
	      var fontSize = settings.weightFactor(weight);
	      if (fontSize <= settings.minSize) {
	        return false;
	      }

	      // Scale factor here is to make sure fillText is not limited by
	      // the minium font size set by browser.
	      // It will always be 1 or 2n.
	      var mu = 1;
	      if (fontSize < minFontSize) {
	        mu = (function calculateScaleFactor() {
	          var mu = 2;
	          while (mu * fontSize < minFontSize) {
	            mu += 2;
	          }
	          return mu;
	        })();
	      }

	      var fcanvas = document.createElement('canvas');
	      var fctx = fcanvas.getContext('2d', { willReadFrequently: true });

	      fctx.font = settings.fontWeight + ' ' +
	        (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

	      // Estimate the dimension of the text with measureText().
	      var fw = fctx.measureText(word).width / mu;
	      var fh = Math.max(fontSize * mu,
	                        fctx.measureText('m').width,
	                        fctx.measureText('\uFF37').width) / mu;

	      // Create a boundary box that is larger than our estimates,
	      // so text don't get cut of (it sill might)
	      var boxWidth = fw + fh * 2;
	      var boxHeight = fh * 3;
	      var fgw = Math.ceil(boxWidth / g);
	      var fgh = Math.ceil(boxHeight / g);
	      boxWidth = fgw * g;
	      boxHeight = fgh * g;

	      // Calculate the proper offsets to make the text centered at
	      // the preferred position.

	      // This is simply half of the width.
	      var fillTextOffsetX = - fw / 2;
	      // Instead of moving the box to the exact middle of the preferred
	      // position, for Y-offset we move 0.4 instead, so Latin alphabets look
	      // vertical centered.
	      var fillTextOffsetY = - fh * 0.4;

	      // Calculate the actual dimension of the canvas, considering the rotation.
	      var cgh = Math.ceil((boxWidth * Math.abs(Math.sin(rotateDeg)) +
	                           boxHeight * Math.abs(Math.cos(rotateDeg))) / g);
	      var cgw = Math.ceil((boxWidth * Math.abs(Math.cos(rotateDeg)) +
	                           boxHeight * Math.abs(Math.sin(rotateDeg))) / g);
	      var width = cgw * g;
	      var height = cgh * g;

	      fcanvas.setAttribute('width', width);
	      fcanvas.setAttribute('height', height);

	      if (debug) {
	        // Attach fcanvas to the DOM
	        document.body.appendChild(fcanvas);
	        // Save it's state so that we could restore and draw the grid correctly.
	        fctx.save();
	      }

	      // Scale the canvas with |mu|.
	      fctx.scale(1 / mu, 1 / mu);
	      fctx.translate(width * mu / 2, height * mu / 2);
	      fctx.rotate(- rotateDeg);

	      // Once the width/height is set, ctx info will be reset.
	      // Set it again here.
	      fctx.font = settings.fontWeight + ' ' +
	        (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

	      // Fill the text into the fcanvas.
	      // XXX: We cannot because textBaseline = 'top' here because
	      // Firefox and Chrome uses different default line-height for canvas.
	      // Please read https://bugzil.la/737852#c6.
	      // Here, we use textBaseline = 'middle' and draw the text at exactly
	      // 0.5 * fontSize lower.
	      fctx.fillStyle = '#000';
	      fctx.textBaseline = 'middle';
	      fctx.fillText(word, fillTextOffsetX * mu,
	                    (fillTextOffsetY + fontSize * 0.5) * mu);

	      // Get the pixels of the text
	      var imageData = fctx.getImageData(0, 0, width, height).data;

	      if (exceedTime()) {
	        return false;
	      }

	      if (debug) {
	        // Draw the box of the original estimation
	        fctx.strokeRect(fillTextOffsetX * mu,
	                        fillTextOffsetY, fw * mu, fh * mu);
	        fctx.restore();
	      }

	      // Read the pixels and save the information to the occupied array
	      var occupied = [];
	      var gx = cgw, gy, x, y;
	      var bounds = [cgh / 2, cgw / 2, cgh / 2, cgw / 2];
	      while (gx--) {
	        gy = cgh;
	        while (gy--) {
	          y = g;
	          singleGridLoop: {
	            while (y--) {
	              x = g;
	              while (x--) {
	                if (imageData[((gy * g + y) * width +
	                               (gx * g + x)) * 4 + 3]) {
	                  occupied.push([gx, gy]);

	                  if (gx < bounds[3]) {
	                    bounds[3] = gx;
	                  }
	                  if (gx > bounds[1]) {
	                    bounds[1] = gx;
	                  }
	                  if (gy < bounds[0]) {
	                    bounds[0] = gy;
	                  }
	                  if (gy > bounds[2]) {
	                    bounds[2] = gy;
	                  }

	                  if (debug) {
	                    fctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
	                    fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
	                  }
	                  break singleGridLoop;
	                }
	              }
	            }
	            if (debug) {
	              fctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
	              fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
	            }
	          }
	        }
	      }

	      if (debug) {
	        fctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
	        fctx.fillRect(bounds[3] * g,
	                      bounds[0] * g,
	                      (bounds[1] - bounds[3] + 1) * g,
	                      (bounds[2] - bounds[0] + 1) * g);
	      }

	      // Return information needed to create the text on the real canvas
	      return {
	        mu: mu,
	        occupied: occupied,
	        bounds: bounds,
	        gw: cgw,
	        gh: cgh,
	        fillTextOffsetX: fillTextOffsetX,
	        fillTextOffsetY: fillTextOffsetY,
	        fillTextWidth: fw,
	        fillTextHeight: fh,
	        fontSize: fontSize
	      };
	    };

	    /* Determine if there is room available in the given dimension */
	    var canFitText = function canFitText(gx, gy, gw, gh, occupied) {
	      // Go through the occupied points,
	      // return false if the space is not available.
	      var i = occupied.length;
	      while (i--) {
	        var px = gx + occupied[i][0];
	        var py = gy + occupied[i][1];

	        if (px >= ngx || py >= ngy || px < 0 || py < 0) {
	          if (!settings.drawOutOfBound) {
	            return false;
	          }
	          continue;
	        }

	        if (!grid[px][py]) {
	          return false;
	        }
	      }
	      return true;
	    };

	    /* Actually draw the text on the grid */
	    var drawText = function drawText(gx, gy, info, word, weight,
	                                     distance, theta, rotateDeg, attributes) {

	      var fontSize = info.fontSize;
	      var color;
	      if (getTextColor) {
	        color = getTextColor(word, weight, fontSize, distance, theta);
	      } else {
	        color = settings.color;
	      }

	      var classes;
	      if (getTextClasses) {
	        classes = getTextClasses(word, weight, fontSize, distance, theta);
	      } else {
	        classes = settings.classes;
	      }

	      var dimension;
	      var bounds = info.bounds;
	      dimension = {
	        x: (gx + bounds[3]) * g,
	        y: (gy + bounds[0]) * g,
	        w: (bounds[1] - bounds[3] + 1) * g,
	        h: (bounds[2] - bounds[0] + 1) * g
	      };

	      elements.forEach(function(el) {
	        if (el.getContext) {
	          var ctx = el.getContext('2d');
	          var mu = info.mu;

	          // Save the current state before messing it
	          ctx.save();
	          ctx.scale(1 / mu, 1 / mu);

	          ctx.font = settings.fontWeight + ' ' +
	                     (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;
	          ctx.fillStyle = color;

	          // Translate the canvas position to the origin coordinate of where
	          // the text should be put.
	          ctx.translate((gx + info.gw / 2) * g * mu,
	                        (gy + info.gh / 2) * g * mu);

	          if (rotateDeg !== 0) {
	            ctx.rotate(- rotateDeg);
	          }

	          // Finally, fill the text.

	          // XXX: We cannot because textBaseline = 'top' here because
	          // Firefox and Chrome uses different default line-height for canvas.
	          // Please read https://bugzil.la/737852#c6.
	          // Here, we use textBaseline = 'middle' and draw the text at exactly
	          // 0.5 * fontSize lower.
	          ctx.textBaseline = 'middle';
	          ctx.fillText(word, info.fillTextOffsetX * mu,
	                             (info.fillTextOffsetY + fontSize * 0.5) * mu);

	          // The below box is always matches how <span>s are positioned
	          /* ctx.strokeRect(info.fillTextOffsetX, info.fillTextOffsetY,
	            info.fillTextWidth, info.fillTextHeight); */

	          // Restore the state.
	          ctx.restore();
	        } else {
	          // drawText on DIV element
	          var span = document.createElement('span');
	          var transformRule = '';
	          transformRule = 'rotate(' + (- rotateDeg / Math.PI * 180) + 'deg) ';
	          if (info.mu !== 1) {
	            transformRule +=
	              'translateX(-' + (info.fillTextWidth / 4) + 'px) ' +
	              'scale(' + (1 / info.mu) + ')';
	          }
	          var styleRules = {
	            'position': 'absolute',
	            'display': 'block',
	            'font': settings.fontWeight + ' ' +
	                    (fontSize * info.mu) + 'px ' + settings.fontFamily,
	            'left': ((gx + info.gw / 2) * g + info.fillTextOffsetX) + 'px',
	            'top': ((gy + info.gh / 2) * g + info.fillTextOffsetY) + 'px',
	            'width': info.fillTextWidth + 'px',
	            'height': info.fillTextHeight + 'px',
	            'lineHeight': fontSize + 'px',
	            'whiteSpace': 'nowrap',
	            'transform': transformRule,
	            'webkitTransform': transformRule,
	            'msTransform': transformRule,
	            'transformOrigin': '50% 40%',
	            'webkitTransformOrigin': '50% 40%',
	            'msTransformOrigin': '50% 40%'
	          };
	          if (color) {
	            styleRules.color = color;
	          }
	          span.textContent = word;
	          for (var cssProp in styleRules) {
	            span.style[cssProp] = styleRules[cssProp];
	          }
	          if (attributes) {
	            for (var attribute in attributes) {
	              span.setAttribute(attribute, attributes[attribute]);
	            }
	          }
	          if (classes) {
	            span.className += classes;
	          }
	          el.appendChild(span);
	        }
	      });
	    };

	    /* Help function to updateGrid */
	    var fillGridAt = function fillGridAt(x, y, drawMask, dimension, item) {
	      if (x >= ngx || y >= ngy || x < 0 || y < 0) {
	        return;
	      }

	      grid[x][y] = false;

	      if (drawMask) {
	        var ctx = elements[0].getContext('2d');
	        ctx.fillRect(x * g, y * g, maskRectWidth, maskRectWidth);
	      }

	      if (interactive) {
	        infoGrid[x][y] = { item: item, dimension: dimension };
	      }
	    };

	    /* Update the filling information of the given space with occupied points.
	       Draw the mask on the canvas if necessary. */
	    var updateGrid = function updateGrid(gx, gy, gw, gh, info, item) {
	      var occupied = info.occupied;
	      var drawMask = settings.drawMask;
	      var ctx;
	      if (drawMask) {
	        ctx = elements[0].getContext('2d');
	        ctx.save();
	        ctx.fillStyle = settings.maskColor;
	      }

	      var dimension;
	      if (interactive) {
	        var bounds = info.bounds;
	        dimension = {
	          x: (gx + bounds[3]) * g,
	          y: (gy + bounds[0]) * g,
	          w: (bounds[1] - bounds[3] + 1) * g,
	          h: (bounds[2] - bounds[0] + 1) * g
	        };
	      }

	      var i = occupied.length;
	      while (i--) {
	        var px = gx + occupied[i][0];
	        var py = gy + occupied[i][1];

	        if (px >= ngx || py >= ngy || px < 0 || py < 0) {
	          continue;
	        }

	        fillGridAt(px, py, drawMask, dimension, item);
	      }

	      if (drawMask) {
	        ctx.restore();
	      }
	    };

	    /* putWord() processes each item on the list,
	       calculate it's size and determine it's position, and actually
	       put it on the canvas. */
	    var putWord = function putWord(item) {
	      var word, weight, attributes;
	      if (Array.isArray(item)) {
	        word = item[0];
	        weight = item[1];
	      } else {
	        word = item.word;
	        weight = item.weight;
	        attributes = item.attributes;
	      }
	      var rotateDeg = getRotateDeg();

	      // get info needed to put the text onto the canvas
	      var info = getTextInfo(word, weight, rotateDeg);

	      // not getting the info means we shouldn't be drawing this one.
	      if (!info) {
	        return false;
	      }

	      if (exceedTime()) {
	        return false;
	      }

	      // If drawOutOfBound is set to false,
	      // skip the loop if we have already know the bounding box of
	      // word is larger than the canvas.
	      if (!settings.drawOutOfBound) {
	        var bounds = info.bounds;
	        if ((bounds[1] - bounds[3] + 1) > ngx ||
	          (bounds[2] - bounds[0] + 1) > ngy) {
	          return false;
	        }
	      }

	      // Determine the position to put the text by
	      // start looking for the nearest points
	      var r = maxRadius + 1;

	      var tryToPutWordAtPoint = function(gxy) {
	        var gx = Math.floor(gxy[0] - info.gw / 2);
	        var gy = Math.floor(gxy[1] - info.gh / 2);
	        var gw = info.gw;
	        var gh = info.gh;

	        // If we cannot fit the text at this position, return false
	        // and go to the next position.
	        if (!canFitText(gx, gy, gw, gh, info.occupied)) {
	          return false;
	        }

	        // Actually put the text on the canvas
	        drawText(gx, gy, info, word, weight,
	                 (maxRadius - r), gxy[2], rotateDeg, attributes);

	        // Mark the spaces on the grid as filled
	        updateGrid(gx, gy, gw, gh, info, item);

	        // Return true so some() will stop and also return true.
	        return true;
	      };

	      while (r--) {
	        var points = getPointsAtRadius(maxRadius - r);

	        if (settings.shuffle) {
	          points = [].concat(points);
	          shuffleArray(points);
	        }

	        // Try to fit the words by looking at each point.
	        // array.some() will stop and return true
	        // when putWordAtPoint() returns true.
	        // If all the points returns false, array.some() returns false.
	        var drawn = points.some(tryToPutWordAtPoint);

	        if (drawn) {
	          // leave putWord() and return true
	          return true;
	        }
	      }
	      // we tried all distances but text won't fit, return false
	      return false;
	    };

	    /* Send DOM event to all elements. Will stop sending event and return
	       if the previous one is canceled (for cancelable events). */
	    var sendEvent = function sendEvent(type, cancelable, detail) {
	      if (cancelable) {
	        return !elements.some(function(el) {
	          var evt = document.createEvent('CustomEvent');
	          evt.initCustomEvent(type, true, cancelable, detail || {});
	          return !el.dispatchEvent(evt);
	        }, this);
	      } else {
	        elements.forEach(function(el) {
	          var evt = document.createEvent('CustomEvent');
	          evt.initCustomEvent(type, true, cancelable, detail || {});
	          el.dispatchEvent(evt);
	        }, this);
	      }
	    };

	    /* Start drawing on a canvas */
	    var start = function start() {
	      // For dimensions, clearCanvas etc.,
	      // we only care about the first element.
	      var canvas = elements[0];

	      if (canvas.getContext) {
	        ngx = Math.ceil(canvas.width / g);
	        ngy = Math.ceil(canvas.height / g);
	      } else {
	        var rect = canvas.getBoundingClientRect();
	        ngx = Math.ceil(rect.width / g);
	        ngy = Math.ceil(rect.height / g);
	      }

	      // Sending a wordcloudstart event which cause the previous loop to stop.
	      // Do nothing if the event is canceled.
	      if (!sendEvent('wordcloudstart', true)) {
	        return;
	      }

	      // Determine the center of the word cloud
	      center = (settings.origin) ?
	        [settings.origin[0]/g, settings.origin[1]/g] :
	        [ngx / 2, ngy / 2];

	      // Maxium radius to look for space
	      maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));

	      /* Clear the canvas only if the clearCanvas is set,
	         if not, update the grid to the current canvas state */
	      grid = [];

	      var gx, gy, i;
	      if (!canvas.getContext || settings.clearCanvas) {
	        elements.forEach(function(el) {
	          if (el.getContext) {
	            var ctx = el.getContext('2d');
	            ctx.fillStyle = settings.backgroundColor;
	            ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));
	            ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));
	          } else {
	            el.textContent = '';
	            el.style.backgroundColor = settings.backgroundColor;
	          }
	        });

	        /* fill the grid with empty state */
	        gx = ngx;
	        while (gx--) {
	          grid[gx] = [];
	          gy = ngy;
	          while (gy--) {
	            grid[gx][gy] = true;
	          }
	        }
	      } else {
	        /* Determine bgPixel by creating
	           another canvas and fill the specified background color. */
	        var bctx = document.createElement('canvas').getContext('2d');

	        bctx.fillStyle = settings.backgroundColor;
	        bctx.fillRect(0, 0, 1, 1);
	        var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

	        /* Read back the pixels of the canvas we got to tell which part of the
	           canvas is empty.
	           (no clearCanvas only works with a canvas, not divs) */
	        var imageData =
	          canvas.getContext('2d').getImageData(0, 0, ngx * g, ngy * g).data;

	        gx = ngx;
	        var x, y;
	        while (gx--) {
	          grid[gx] = [];
	          gy = ngy;
	          while (gy--) {
	            y = g;
	            singleGridLoop: while (y--) {
	              x = g;
	              while (x--) {
	                i = 4;
	                while (i--) {
	                  if (imageData[((gy * g + y) * ngx * g +
	                                 (gx * g + x)) * 4 + i] !== bgPixel[i]) {
	                    grid[gx][gy] = false;
	                    break singleGridLoop;
	                  }
	                }
	              }
	            }
	            if (grid[gx][gy] !== false) {
	              grid[gx][gy] = true;
	            }
	          }
	        }

	        imageData = bctx = bgPixel = undefined;
	      }

	      // fill the infoGrid with empty state if we need it
	      if (settings.hover || settings.click) {

	        interactive = true;

	        /* fill the grid with empty state */
	        gx = ngx + 1;
	        while (gx--) {
	          infoGrid[gx] = [];
	        }

	        if (settings.hover) {
	          canvas.addEventListener('mousemove', wordcloudhover);
	        }

	        if (settings.click) {
	          canvas.addEventListener('click', wordcloudclick);
	          canvas.addEventListener('touchstart', wordcloudclick);
	          canvas.addEventListener('touchend', function (e) {
	            e.preventDefault();
	          });
	          canvas.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0)';
	        }

	        canvas.addEventListener('wordcloudstart', function stopInteraction() {
	          canvas.removeEventListener('wordcloudstart', stopInteraction);

	          canvas.removeEventListener('mousemove', wordcloudhover);
	          canvas.removeEventListener('click', wordcloudclick);
	          hovered = undefined;
	        });
	      }

	      i = 0;
	      var loopingFunction, stoppingFunction;
	      if (settings.wait !== 0) {
	        loopingFunction = window.setTimeout;
	        stoppingFunction = window.clearTimeout;
	      } else {
	        loopingFunction = window.setImmediate;
	        stoppingFunction = window.clearImmediate;
	      }

	      var addEventListener = function addEventListener(type, listener) {
	        elements.forEach(function(el) {
	          el.addEventListener(type, listener);
	        }, this);
	      };

	      var removeEventListener = function removeEventListener(type, listener) {
	        elements.forEach(function(el) {
	          el.removeEventListener(type, listener);
	        }, this);
	      };

	      var anotherWordCloudStart = function anotherWordCloudStart() {
	        removeEventListener('wordcloudstart', anotherWordCloudStart);
	        stoppingFunction(timer);
	      };

	      addEventListener('wordcloudstart', anotherWordCloudStart);

	      var timer = loopingFunction(function loop() {
	        if (i >= settings.list.length) {
	          stoppingFunction(timer);
	          sendEvent('wordcloudstop', false);
	          removeEventListener('wordcloudstart', anotherWordCloudStart);

	          return;
	        }
	        escapeTime = (new Date()).getTime();
	        var drawn = putWord(settings.list[i]);
	        var canceled = !sendEvent('wordclouddrawn', true, {
	          item: settings.list[i], drawn: drawn });
	        if (exceedTime() || canceled) {
	          stoppingFunction(timer);
	          settings.abort();
	          sendEvent('wordcloudabort', false);
	          sendEvent('wordcloudstop', false);
	          removeEventListener('wordcloudstart', anotherWordCloudStart);
	          return;
	        }
	        i++;
	        timer = loopingFunction(loop, settings.wait);
	      }, settings.wait);
	    };

	    // All set, start the drawing
	    start();
	  };

	  WordCloud.isSupported = isSupported;
	  WordCloud.minFontSize = minFontSize;

	  // Expose the library as an AMD module
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return WordCloud; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && module.exports) {
	    module.exports = WordCloud;
	  } else {
	    global.WordCloud = WordCloud;
	  }

	})(this); //jshint ignore:line


/***/ }
/******/ ]);