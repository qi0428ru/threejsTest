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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39);


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v1.9.0
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2013-1-14
	 */
	(function( window, undefined ) {
	"use strict";
	var
		// A central reference to the root jQuery(document)
		rootjQuery,

		// The deferred used on DOM ready
		readyList,

		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,
		location = window.location,

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$,

		// [[Class]] -> type pairs
		class2type = {},

		// List of deleted data cache ids, so we can reuse them
		core_deletedIds = [],

		core_version = "1.9.0",

		// Save a reference to some core methods
		core_concat = core_deletedIds.concat,
		core_push = core_deletedIds.push,
		core_slice = core_deletedIds.slice,
		core_indexOf = core_deletedIds.indexOf,
		core_toString = class2type.toString,
		core_hasOwn = class2type.hasOwnProperty,
		core_trim = core_version.trim,

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			return new jQuery.fn.init( selector, context, rootjQuery );
		},

		// Used for matching numbers
		core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

		// Used for splitting on whitespace
		core_rnotwhite = /\S+/g,

		// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		// Match a standalone tag
		rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

		// JSON RegExp
		rvalidchars = /^[\],:{}\s]*$/,
		rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
		rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		},

		// The ready event handler and self cleanup method
		DOMContentLoaded = function() {
			if ( document.addEventListener ) {
				document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
				jQuery.ready();
			} else if ( document.readyState === "complete" ) {
				// we're here because readyState === "complete" in oldIE
				// which is good enough for us to call the dom ready!
				document.detachEvent( "onreadystatechange", DOMContentLoaded );
				jQuery.ready();
			}
		};

	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: core_version,

		constructor: jQuery,
		init: function( selector, context, rootjQuery ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;

						// scripts is true for back-compat
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id !== match[2] ) {
								return rootjQuery.find( selector );
							}

							// Otherwise, we inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return rootjQuery.ready( selector );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		},

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		// The number of elements contained in the matched element set
		size: function() {
			return this.length;
		},

		toArray: function() {
			return core_slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num == null ?

				// Return a 'clean' array
				this.toArray() :

				// Return just the object
				( num < 0 ? this[ this.length + num ] : this[ num ] );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},

		ready: function( fn ) {
			// Add the callback
			jQuery.ready.promise().done( fn );

			return this;
		},

		slice: function() {
			return this.pushStack( core_slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},

		end: function() {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: core_push,
		sort: [].sort,
		splice: [].splice
	};

	// Give the init function the jQuery prototype for later instantiation
	jQuery.fn.init.prototype = jQuery.fn;

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		if ( length === i ) {
			target = this;
			--i;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({
		noConflict: function( deep ) {
			if ( window.$ === jQuery ) {
				window.$ = _$;
			}

			if ( deep && window.jQuery === jQuery ) {
				window.jQuery = _jQuery;
			}

			return jQuery;
		},

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger("ready").off("ready");
			}
		},

		// See test/unit/core.js for details concerning isFunction.
		// Since version 1.3, DOM methods and functions like alert
		// aren't supported. They return false on IE (#2968).
		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray || function( obj ) {
			return jQuery.type(obj) === "array";
		},

		isWindow: function( obj ) {
			return obj != null && obj == obj.window;
		},

		isNumeric: function( obj ) {
			return !isNaN( parseFloat(obj) ) && isFinite( obj );
		},

		type: function( obj ) {
			if ( obj == null ) {
				return String( obj );
			}
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ core_toString.call(obj) ] || "object" :
				typeof obj;
		},

		isPlainObject: function( obj ) {
			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			try {
				// Not own constructor property must be Object
				if ( obj.constructor &&
					!core_hasOwn.call(obj, "constructor") &&
					!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
					return false;
				}
			} catch ( e ) {
				// IE8,9 Will throw exceptions on certain host objects #9897
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.

			var key;
			for ( key in obj ) {}

			return key === undefined || core_hasOwn.call( obj, key );
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		error: function( msg ) {
			throw new Error( msg );
		},

		// data: string of html
		// context (optional): If specified, the fragment will be created in this context, defaults to document
		// keepScripts (optional): If true, will include scripts passed in the html string
		parseHTML: function( data, context, keepScripts ) {
			if ( !data || typeof data !== "string" ) {
				return null;
			}
			if ( typeof context === "boolean" ) {
				keepScripts = context;
				context = false;
			}
			context = context || document;

			var parsed = rsingleTag.exec( data ),
				scripts = !keepScripts && [];

			// Single tag
			if ( parsed ) {
				return [ context.createElement( parsed[1] ) ];
			}

			parsed = jQuery.buildFragment( [ data ], context, scripts );
			if ( scripts ) {
				jQuery( scripts ).remove();
			}
			return jQuery.merge( [], parsed.childNodes );
		},

		parseJSON: function( data ) {
			// Attempt to parse using the native JSON parser first
			if ( window.JSON && window.JSON.parse ) {
				return window.JSON.parse( data );
			}

			if ( data === null ) {
				return data;
			}

			if ( typeof data === "string" ) {

				// Make sure leading/trailing whitespace is removed (IE can't handle it)
				data = jQuery.trim( data );

				if ( data ) {
					// Make sure the incoming data is actual JSON
					// Logic borrowed from http://json.org/json2.js
					if ( rvalidchars.test( data.replace( rvalidescape, "@" )
						.replace( rvalidtokens, "]" )
						.replace( rvalidbraces, "")) ) {

						return ( new Function( "return " + data ) )();
					}
				}
			}

			jQuery.error( "Invalid JSON: " + data );
		},

		// Cross-browser xml parsing
		parseXML: function( data ) {
			var xml, tmp;
			if ( !data || typeof data !== "string" ) {
				return null;
			}
			try {
				if ( window.DOMParser ) { // Standard
					tmp = new DOMParser();
					xml = tmp.parseFromString( data , "text/xml" );
				} else { // IE
					xml = new ActiveXObject( "Microsoft.XMLDOM" );
					xml.async = "false";
					xml.loadXML( data );
				}
			} catch( e ) {
				xml = undefined;
			}
			if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
				jQuery.error( "Invalid XML: " + data );
			}
			return xml;
		},

		noop: function() {},

		// Evaluates a script in a global context
		// Workarounds based on findings by Jim Driscoll
		// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
		globalEval: function( data ) {
			if ( data && jQuery.trim( data ) ) {
				// We use execScript on Internet Explorer
				// We use an anonymous function so that context is window
				// rather than jQuery in Firefox
				( window.execScript || function( data ) {
					window[ "eval" ].call( window, data );
				} )( data );
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );

			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				}
			}

			return obj;
		},

		// Use native String.trim function wherever possible
		trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
			function( text ) {
				return text == null ?
					"" :
					core_trim.call( text );
			} :

			// Otherwise use our own trimming functionality
			function( text ) {
				return text == null ?
					"" :
					( text + "" ).replace( rtrim, "" );
			},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					core_push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			var len;

			if ( arr ) {
				if ( core_indexOf ) {
					return core_indexOf.call( arr, elem, i );
				}

				len = arr.length;
				i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

				for ( ; i < len; i++ ) {
					// Skip accessing in sparse arrays
					if ( i in arr && arr[ i ] === elem ) {
						return i;
					}
				}
			}

			return -1;
		},

		merge: function( first, second ) {
			var l = second.length,
				i = first.length,
				j = 0;

			if ( typeof l === "number" ) {
				for ( ; j < l; j++ ) {
					first[ i++ ] = second[ j ];
				}
			} else {
				while ( second[j] !== undefined ) {
					first[ i++ ] = second[ j++ ];
				}
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, inv ) {
			var retVal,
				ret = [],
				i = 0,
				length = elems.length;
			inv = !!inv;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				retVal = !!callback( elems[ i ], i );
				if ( inv !== retVal ) {
					ret.push( elems[ i ] );
				}
			}

			return ret;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];

			// Go through the array, translating each of the items to their
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret[ ret.length ] = value;
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret[ ret.length ] = value;
					}
				}
			}

			// Flatten any nested arrays
			return core_concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = core_slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		// Multifunctional method to get and set values of a collection
		// The value/s can optionally be executed if it's a function
		access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
			var i = 0,
				length = elems.length,
				bulk = key == null;

			// Sets many values
			if ( jQuery.type( key ) === "object" ) {
				chainable = true;
				for ( i in key ) {
					jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
				}

			// Sets one value
			} else if ( value !== undefined ) {
				chainable = true;

				if ( !jQuery.isFunction( value ) ) {
					raw = true;
				}

				if ( bulk ) {
					// Bulk operations run against the entire set
					if ( raw ) {
						fn.call( elems, value );
						fn = null;

					// ...except when executing function values
					} else {
						bulk = fn;
						fn = function( elem, key, value ) {
							return bulk.call( jQuery( elem ), value );
						};
					}
				}

				if ( fn ) {
					for ( ; i < length; i++ ) {
						fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
					}
				}
			}

			return chainable ?
				elems :

				// Gets
				bulk ?
					fn.call( elems ) :
					length ? fn( elems[0], key ) : emptyGet;
		},

		now: function() {
			return ( new Date() ).getTime();
		}
	});

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// we once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );

			// Standards-based browsers support DOMContentLoaded
			} else if ( document.addEventListener ) {
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", jQuery.ready, false );

			// If IE event model is used
			} else {
				// Ensure firing before onload, maybe late but safe also for iframes
				document.attachEvent( "onreadystatechange", DOMContentLoaded );

				// A fallback to window.onload, that will always work
				window.attachEvent( "onload", jQuery.ready );

				// If IE and not a frame
				// continually check to see if the document is ready
				var top = false;

				try {
					top = window.frameElement == null && document.documentElement;
				} catch(e) {}

				if ( top && top.doScroll ) {
					(function doScrollCheck() {
						if ( !jQuery.isReady ) {

							try {
								// Use the trick by Diego Perini
								// http://javascript.nwbox.com/IEContentLoaded/
								top.doScroll("left");
							} catch(e) {
								return setTimeout( doScrollCheck, 50 );
							}

							// and execute any waiting functions
							jQuery.ready();
						}
					})();
				}
			}
		}
		return readyList.promise( obj );
	};

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	function isArraylike( obj ) {
		var length = obj.length,
			type = jQuery.type( obj );

		if ( jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || type !== "function" &&
			( length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj );
	}

	// All jQuery objects should point back to these
	rootjQuery = jQuery(document);
	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );

		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Control if a given callback is in the list
				has: function( fn ) {
					return jQuery.inArray( fn, list ) > -1;
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( list && ( !fired || stack ) ) {
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};
	jQuery.extend({

		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var action = tuple[ 0 ],
									fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = core_slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
						if( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}

			// if we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	});
	jQuery.support = (function() {

		var support, all, a, select, opt, input, fragment, eventName, isSupported, i,
			div = document.createElement("div");

		// Setup
		div.setAttribute( "className", "t" );
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

		// Support tests won't run in some limited or non-browser environments
		all = div.getElementsByTagName("*");
		a = div.getElementsByTagName("a")[ 0 ];
		if ( !all || !a || !all.length ) {
			return {};
		}

		// First batch of tests
		select = document.createElement("select");
		opt = select.appendChild( document.createElement("option") );
		input = div.getElementsByTagName("input")[ 0 ];

		a.style.cssText = "top:1px;float:left;opacity:.5";
		support = {
			// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
			getSetAttribute: div.className !== "t",

			// IE strips leading whitespace when .innerHTML is used
			leadingWhitespace: div.firstChild.nodeType === 3,

			// Make sure that tbody elements aren't automatically inserted
			// IE will insert them into empty tables
			tbody: !div.getElementsByTagName("tbody").length,

			// Make sure that link elements get serialized correctly by innerHTML
			// This requires a wrapper element in IE
			htmlSerialize: !!div.getElementsByTagName("link").length,

			// Get the style information from getAttribute
			// (IE uses .cssText instead)
			style: /top/.test( a.getAttribute("style") ),

			// Make sure that URLs aren't manipulated
			// (IE normalizes it by default)
			hrefNormalized: a.getAttribute("href") === "/a",

			// Make sure that element opacity exists
			// (IE uses filter instead)
			// Use a regex to work around a WebKit issue. See #5145
			opacity: /^0.5/.test( a.style.opacity ),

			// Verify style float existence
			// (IE uses styleFloat instead of cssFloat)
			cssFloat: !!a.style.cssFloat,

			// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
			checkOn: !!input.value,

			// Make sure that a selected-by-default option has a working selected property.
			// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
			optSelected: opt.selected,

			// Tests for enctype support on a form (#6743)
			enctype: !!document.createElement("form").enctype,

			// Makes sure cloning an html5 element does not cause problems
			// Where outerHTML is undefined, this still works
			html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

			// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
			boxModel: document.compatMode === "CSS1Compat",

			// Will be defined later
			deleteExpando: true,
			noCloneEvent: true,
			inlineBlockNeedsLayout: false,
			shrinkWrapBlocks: false,
			reliableMarginRight: true,
			boxSizingReliable: true,
			pixelPosition: false
		};

		// Make sure checked status is properly cloned
		input.checked = true;
		support.noCloneChecked = input.cloneNode( true ).checked;

		// Make sure that the options inside disabled selects aren't marked as disabled
		// (WebKit marks them as disabled)
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<9
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}

		// Check if we can trust getAttribute("value")
		input = document.createElement("input");
		input.setAttribute( "value", "" );
		support.input = input.getAttribute( "value" ) === "";

		// Check if an input maintains its value after becoming a radio
		input.value = "t";
		input.setAttribute( "type", "radio" );
		support.radioValue = input.value === "t";

		// #11217 - WebKit loses check when the name is after the checked attribute
		input.setAttribute( "checked", "t" );
		input.setAttribute( "name", "t" );

		fragment = document.createDocumentFragment();
		fragment.appendChild( input );

		// Check if a disconnected checkbox will retain its checked
		// value of true after appended to the DOM (IE6/7)
		support.appendChecked = input.checked;

		// WebKit doesn't clone checked state correctly in fragments
		support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<9
		// Opera does not clone events (and typeof div.attachEvent === undefined).
		// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
		if ( div.attachEvent ) {
			div.attachEvent( "onclick", function() {
				support.noCloneEvent = false;
			});

			div.cloneNode( true ).click();
		}

		// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
		// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
		for ( i in { submit: true, change: true, focusin: true }) {
			div.setAttribute( eventName = "on" + i, "t" );

			support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
		}

		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		// Run tests that need a body at doc ready
		jQuery(function() {
			var container, marginDiv, tds,
				divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				body = document.getElementsByTagName("body")[0];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			container = document.createElement("div");
			container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName("td");
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			// Check box-sizing and margin behavior
			div.innerHTML = "";
			div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
			support.boxSizing = ( div.offsetWidth === 4 );
			support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( window.getComputedStyle ) {
				support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
				support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement("div") );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				support.reliableMarginRight =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
			}

			if ( typeof div.style.zoom !== "undefined" ) {
				// Support: IE<8
				// Check if natively block-level elements act like inline-block
				// elements when setting their display to 'inline' and giving
				// them layout
				div.innerHTML = "";
				div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
				support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.display = "block";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				body.style.zoom = 1;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE
			container = div = tds = marginDiv = null;
		});

		// Null elements to avoid leaks in IE
		all = select = fragment = opt = a = input = null;

		return support;
	})();

	var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		rmultiDash = /([A-Z])/g;
		
	function internalData( elem, name, data, pvt /* Internal Use Only */ ){
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	}

	function internalRemoveData( elem, name, pvt /* For internal use only */ ){
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				} else {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = name.concat( jQuery.map( name, jQuery.camelCase ) );
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	}

	jQuery.extend({
		cache: {},

		// Unique for each copy of jQuery on the page
		// Non-digits removed to match rinlinejQuery
		expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

		// The following elements throw uncatchable exceptions if you
		// attempt to add expando properties to them.
		noData: {
			"embed": true,
			// Ban all objects except for Flash (which handle expandos)
			"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			"applet": true
		},

		hasData: function( elem ) {
			elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
			return !!elem && !isEmptyDataObject( elem );
		},

		data: function( elem, name, data ) {
			return internalData( elem, name, data, false );
		},

		removeData: function( elem, name ) {
			return internalRemoveData( elem, name, false );
		},

		// For internal use only.
		_data: function( elem, name, data ) {
			return internalData( elem, name, data, true );
		},
		
		_removeData: function( elem, name ) {
			return internalRemoveData( elem, name, true );
		},

		// A method for determining if a DOM node can handle the data expando
		acceptData: function( elem ) {
			var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

			// nodes accept data unless otherwise specified; rejection can be conditional
			return !noData || noData !== true && elem.getAttribute("classid") === noData;
		}
	});

	jQuery.fn.extend({
		data: function( key, value ) {
			var attrs, name,
				elem = this[0],
				i = 0,
				data = null;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = jQuery.data( elem );

					if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
						attrs = elem.attributes;
						for ( ; i < attrs.length; i++ ) {
							name = attrs[i].name;

							if ( !name.indexOf( "data-" ) ) {
								name = jQuery.camelCase( name.substring(5) );

								dataAttr( elem, name, data[ name ] );
							}
						}
						jQuery._data( elem, "parsedAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					jQuery.data( this, key );
				});
			}

			return jQuery.access( this, function( value ) {

				if ( value === undefined ) {
					// Try to fetch any internally stored data first
					return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
				}

				this.each(function() {
					jQuery.data( this, key, value );
				});
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each(function() {
				jQuery.removeData( this, key );
			});
		}
	});

	function dataAttr( elem, key, data ) {
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {

			var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}

				// Make sure we set the data so it isn't changed later
				jQuery.data( elem, key, data );

			} else {
				data = undefined;
			}
		}

		return data;
	}

	// checks a cache object for emptiness
	function isEmptyDataObject( obj ) {
		var name;
		for ( name in obj ) {

			// if the public data object is empty, the private is still empty
			if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
				continue;
			}
			if ( name !== "toJSON" ) {
				return false;
			}
		}

		return true;
	}
	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = jQuery._data( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray(data) ) {
						queue = jQuery._data( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			hooks.cur = fn;
			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// not intended for public consumption - generates a queueHooks object, or returns the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return jQuery._data( elem, key ) || jQuery._data( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					jQuery._removeData( elem, type + "queue" );
					jQuery._removeData( elem, key );
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}

			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );

					// ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		// Based off of the plugin by Clint Helfers, with permission.
		// http://blindsignals.com/index.php/2009/07/jquery-delay/
		delay: function( time, type ) {
			time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
			type = type || "fx";

			return this.queue( type, function( next, hooks ) {
				var timeout = setTimeout( next, time );
				hooks.stop = function() {
					clearTimeout( timeout );
				};
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while( i-- ) {
				tmp = jQuery._data( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var nodeHook, boolHook,
		rclass = /[\t\r\n]/g,
		rreturn = /\r/g,
		rfocusable = /^(?:input|select|textarea|button|object)$/i,
		rclickable = /^(?:a|area)$/i,
		rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
		ruseDefault = /^(?:checked|selected)$/i,
		getSetAttribute = jQuery.support.getSetAttribute,
		getSetInput = jQuery.support.input;

	jQuery.fn.extend({
		attr: function( name, value ) {
			return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		},

		prop: function( name, value ) {
			return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			name = jQuery.propFix[ name ] || name;
			return this.each(function() {
				// try/catch handles cases where IE balks (such as removing a property on window)
				try {
					this[ name ] = undefined;
					delete this[ name ];
				} catch( e ) {}
			});
		},

		addClass: function( value ) {
			var classes, elem, cur, clazz, j,
				i = 0,
				len = this.length,
				proceed = typeof value === "string" && value;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}

			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( core_rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
						elem.className = jQuery.trim( cur );

					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, clazz, j,
				i = 0,
				len = this.length,
				proceed = arguments.length === 0 || typeof value === "string" && value;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( core_rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
						elem.className = value ? jQuery.trim( cur ) : "";
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value,
				isBool = typeof stateVal === "boolean";

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}

			return this.each(function() {
				if ( type === "string" ) {
					// toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						state = stateVal,
						classNames = value.match( core_rnotwhite ) || [];

					while ( (className = classNames[ i++ ]) ) {
						// check each className given, space separated list
						state = isBool ? state : !self.hasClass( className );
						self[ state ? "addClass" : "removeClass" ]( className );
					}

				// Toggle whole class name
				} else if ( type === "undefined" || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						jQuery._data( this, "__className__", this.className );
					}

					// If the element has a class name or if we're passed "false",
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
				}
			});
		},

		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}

			return false;
		},

		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?
						// handle most common string cases
						ret.replace(rreturn, "") :
						// handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each(function( i ) {
				var val,
					self = jQuery(this);

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, self.val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
				} else if ( typeof val === "number" ) {
					val += "";
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map(val, function ( value ) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					// attributes.value is undefined in Blackberry 4.7 but
					// uses .value. See #6932
					var val = elem.attributes.value;
					return !val || val.specified ? elem.value : elem.text;
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// oldIE doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var values = jQuery.makeArray( value );

					jQuery(elem).find("option").each(function() {
						this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
					});

					if ( !values.length ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		},

		attr: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;

			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( notxml ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
			}

			if ( value !== undefined ) {

				if ( value === null ) {
					jQuery.removeAttr( elem, name );

				} else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;

				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}

			} else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {

				// In IE9+, Flash objects don't have .getAttribute (#12945)
				// Support: IE9+
				if ( typeof elem.getAttribute !== "undefined" ) {
					ret =  elem.getAttribute( name );
				}

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( core_rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( rboolean.test( name ) ) {
						// Set corresponding property to false for boolean attributes
						// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
						if ( !getSetAttribute && ruseDefault.test( name ) ) {
							elem[ jQuery.camelCase( "default-" + name ) ] =
								elem[ propName ] = false;
						} else {
							elem[ propName ] = false;
						}

					// See #9699 for explanation of this approach (setting first, then removal)
					} else {
						jQuery.attr( elem, name, "" );
					}

					elem.removeAttribute( getSetAttribute ? name : propName );
				}
			}
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
						// Setting the type on a radio button after the value resets the value in IE6-9
						// Reset value to default in case type is set after value during creation
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},

		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;

			// don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;

				} else {
					return ( elem[ name ] = value );
				}

			} else {
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
					return ret;

				} else {
					return elem[ name ];
				}
			}
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {
					// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					var attributeNode = elem.getAttributeNode("tabindex");

					return attributeNode && attributeNode.specified ?
						parseInt( attributeNode.value, 10 ) :
						rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							undefined;
				}
			}
		}
	});

	// Hook for boolean attributes
	boolHook = {
		get: function( elem, name ) {
			var
				// Use .prop to determine if this attribute is understood as boolean
				prop = jQuery.prop( elem, name ),

				// Fetch it accordingly
				attr = typeof prop === "boolean" && elem.getAttribute( name ),
				detail = typeof prop === "boolean" ?

					getSetInput && getSetAttribute ?
						attr != null :
						// oldIE fabricates an empty string for missing boolean attributes
						// and conflates checked/selected into attroperties
						ruseDefault.test( name ) ?
							elem[ jQuery.camelCase( "default-" + name ) ] :
							!!attr :

					// fetch an attribute node for properties not recognized as boolean
					elem.getAttributeNode( name );

			return detail && detail.value !== false ?
				name.toLowerCase() :
				undefined;
		},
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
				// IE<8 needs the *property* name
				elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

			// Use defaultChecked and defaultSelected for oldIE
			} else {
				elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
			}

			return name;
		}
	};

	// fix oldIE value attroperty
	if ( !getSetInput || !getSetAttribute ) {
		jQuery.attrHooks.value = {
			get: function( elem, name ) {
				var ret = elem.getAttributeNode( name );
				return jQuery.nodeName( elem, "input" ) ?

					// Ignore the value *property* by using defaultValue
					elem.defaultValue :

					ret && ret.specified ? ret.value : undefined;
			},
			set: function( elem, value, name ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					// Does not return so that setAttribute is also used
					elem.defaultValue = value;
				} else {
					// Use nodeHook if defined (#1954); otherwise setAttribute is fine
					return nodeHook && nodeHook.set( elem, value, name );
				}
			}
		};
	}

	// IE6/7 do not support getting/setting some attributes with get/setAttribute
	if ( !getSetAttribute ) {

		// Use this for any attribute in IE6/7
		// This fixes almost every IE6/7 issue
		nodeHook = jQuery.valHooks.button = {
			get: function( elem, name ) {
				var ret = elem.getAttributeNode( name );
				return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
					ret.value :
					undefined;
			},
			set: function( elem, value, name ) {
				// Set the existing or create a new attribute node
				var ret = elem.getAttributeNode( name );
				if ( !ret ) {
					elem.setAttributeNode(
						(ret = elem.ownerDocument.createAttribute( name ))
					);
				}

				ret.value = value += "";

				// Break association with cloned elements by also using setAttribute (#9646)
				return name === "value" || value === elem.getAttribute( name ) ?
					value :
					undefined;
			}
		};

		// Set contenteditable to false on removals(#10429)
		// Setting to empty string throws an error as an invalid value
		jQuery.attrHooks.contenteditable = {
			get: nodeHook.get,
			set: function( elem, value, name ) {
				nodeHook.set( elem, value === "" ? false : value, name );
			}
		};

		// Set width and height to auto instead of 0 on empty string( Bug #8150 )
		// This is for removals
		jQuery.each([ "width", "height" ], function( i, name ) {
			jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
				set: function( elem, value ) {
					if ( value === "" ) {
						elem.setAttribute( name, "auto" );
						return value;
					}
				}
			});
		});
	}


	// Some attributes require a special call on IE
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !jQuery.support.hrefNormalized ) {
		jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
			jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
				get: function( elem ) {
					var ret = elem.getAttribute( name, 2 );
					return ret == null ? undefined : ret;
				}
			});
		});

		// href/src property should get the full normalized URL (#10299/#12915)
		jQuery.each([ "href", "src" ], function( i, name ) {
			jQuery.propHooks[ name ] = {
				get: function( elem ) {
					return elem.getAttribute( name, 4 );
				}
			};
		});
	}

	if ( !jQuery.support.style ) {
		jQuery.attrHooks.style = {
			get: function( elem ) {
				// Return undefined in the case of empty string
				// Note: IE uppercases css property names, but if we were to .toLowerCase()
				// .cssText, that would destroy case senstitivity in URL's, like in "background"
				return elem.style.cssText || undefined;
			},
			set: function( elem, value ) {
				return ( elem.style.cssText = value + "" );
			}
		};
	}

	// Safari mis-reports the default selected property of an option
	// Accessing the parent's selectedIndex property fixes it
	if ( !jQuery.support.optSelected ) {
		jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
			get: function( elem ) {
				var parent = elem.parentNode;

				if ( parent ) {
					parent.selectedIndex;

					// Make sure that it also works with optgroups, see #5701
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
				return null;
			}
		});
	}

	// IE6/7 call enctype encoding
	if ( !jQuery.support.enctype ) {
		jQuery.propFix.enctype = "encoding";
	}

	// Radios and checkboxes getter/setter
	if ( !jQuery.support.checkOn ) {
		jQuery.each([ "radio", "checkbox" ], function() {
			jQuery.valHooks[ this ] = {
				get: function( elem ) {
					// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
					return elem.getAttribute("value") === null ? "on" : elem.value;
				}
			};
		});
	}
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		});
	});
	var rformElems = /^(?:input|select|textarea)$/i,
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				// Don't attach events to noData or text/comment nodes (but allow plain objects)
				elemData = elem.nodeType !== 3 && elem.nodeType !== 8 && jQuery._data( elem );

			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
						jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
						undefined;
				};
				// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
				eventHandle.elem = elem;
			}

			// Handle multiple events separated by a space
			// jQuery(...).bind("mouseover mouseout", fn);
			types = ( types || "" ).match( core_rnotwhite ) || [""];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener/attachEvent if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						// Bind the global event handler to the element
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );

						} else if ( elem.attachEvent ) {
							elem.attachEvent( "on" + type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

			// Nullify elem to prevent memory leaks in IE
			elem = null;
		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = jQuery.hasData( elem ) && jQuery._data( elem );

			if ( !elemData || !(events = elemData.events) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( core_rnotwhite ) || [""];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;

				// removeData also checks for emptiness and clears the expando if empty
				// so use it instead of delete
				jQuery._removeData( elem, "events" );
			}
		},

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = event.type || event,
				namespaces = event.namespace ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			event.isTrigger = true;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
					event.preventDefault();
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
					!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Can't use an .isFunction() check here because IE6/7 fails that test.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						try {
							elem[ type ]();
						} catch ( e ) {
							// IE<9 dies on focus/blur to hidden element (#1486,#12518)
							// only reproducible on winXP IE8 native, not IE9 in IE8 mode
						}
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = core_slice.call( arguments ),
				handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or
					// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

				for ( ; cur != this; cur = cur.parentNode || this ) {

					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}

			return handlerQueue;
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop,
				originalEvent = event,
				fixHook = jQuery.event.fixHooks[ event.type ] || {},
				copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: IE<9
			// Fix target property (#1925)
			if ( !event.target ) {
				event.target = originalEvent.srcElement || document;
			}

			// Support: Chrome 23+, Safari?
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			// Support: IE<9
			// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
			event.metaKey = !!event.metaKey;

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button,
					fromElement = original.fromElement;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add relatedTarget, if necessary
				if ( !event.relatedTarget && fromElement ) {
					event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
						this.click();
						return false;
					}
				}
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== document.activeElement && this.focus ) {
						try {
							this.focus();
							return false;
						} catch ( e ) {
							// Support: IE<9
							// If we error on focus to hidden element (#1486, #12518),
							// let .trigger() run the handlers
						}
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === document.activeElement && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Even when returnValue equals to undefined Firefox will still show alert
					if ( event.result !== undefined ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},

		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{ type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};

	jQuery.removeEvent = document.removeEventListener ?
		function( elem, type, handle ) {
			if ( elem.removeEventListener ) {
				elem.removeEventListener( type, handle, false );
			}
		} :
		function( elem, type, handle ) {
			var name = "on" + type;

			if ( elem.detachEvent ) {

				// #8545, #7054, preventing memory leaks for custom events in IE6-8
				// detachEvent needed property on element, by name of that event, to properly expose it to GC
				if ( typeof elem[ name ] === "undefined" ) {
					elem[ name ] = null;
				}

				elem.detachEvent( name, handle );
			}
		};

	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
				src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;
			if ( !e ) {
				return;
			}

			// If preventDefault exists, run it on the original event
			if ( e.preventDefault ) {
				e.preventDefault();

			// Support: IE
			// Otherwise set the returnValue property of the original event to false
			} else {
				e.returnValue = false;
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;
			if ( !e ) {
				return;
			}
			// If stopPropagation exists, run it on the original event
			if ( e.stopPropagation ) {
				e.stopPropagation();
			}

			// Support: IE
			// Set the cancelBubble property of the original event to true
			e.cancelBubble = true;
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = returnTrue;
			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});

	// IE submit delegation
	if ( !jQuery.support.submitBubbles ) {

		jQuery.event.special.submit = {
			setup: function() {
				// Only need this for delegated form submit events
				if ( jQuery.nodeName( this, "form" ) ) {
					return false;
				}

				// Lazy-add a submit handler when a descendant form may potentially be submitted
				jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
					// Node name check avoids a VML-related crash in IE (#9807)
					var elem = e.target,
						form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
					if ( form && !jQuery._data( form, "submitBubbles" ) ) {
						jQuery.event.add( form, "submit._submit", function( event ) {
							event._submit_bubble = true;
						});
						jQuery._data( form, "submitBubbles", true );
					}
				});
				// return undefined since we don't need an event listener
			},

			postDispatch: function( event ) {
				// If form was submitted by the user, bubble the event up the tree
				if ( event._submit_bubble ) {
					delete event._submit_bubble;
					if ( this.parentNode && !event.isTrigger ) {
						jQuery.event.simulate( "submit", this.parentNode, event, true );
					}
				}
			},

			teardown: function() {
				// Only need this for delegated form submit events
				if ( jQuery.nodeName( this, "form" ) ) {
					return false;
				}

				// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
				jQuery.event.remove( this, "._submit" );
			}
		};
	}

	// IE change delegation and checkbox/radio fix
	if ( !jQuery.support.changeBubbles ) {

		jQuery.event.special.change = {

			setup: function() {

				if ( rformElems.test( this.nodeName ) ) {
					// IE doesn't fire change on a check/radio until blur; trigger it on click
					// after a propertychange. Eat the blur-change in special.change.handle.
					// This still fires onchange a second time for check/radio after blur.
					if ( this.type === "checkbox" || this.type === "radio" ) {
						jQuery.event.add( this, "propertychange._change", function( event ) {
							if ( event.originalEvent.propertyName === "checked" ) {
								this._just_changed = true;
							}
						});
						jQuery.event.add( this, "click._change", function( event ) {
							if ( this._just_changed && !event.isTrigger ) {
								this._just_changed = false;
							}
							// Allow triggered, simulated change events (#11500)
							jQuery.event.simulate( "change", this, event, true );
						});
					}
					return false;
				}
				// Delegated event; lazy-add a change handler on descendant inputs
				jQuery.event.add( this, "beforeactivate._change", function( e ) {
					var elem = e.target;

					if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
						jQuery.event.add( elem, "change._change", function( event ) {
							if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
								jQuery.event.simulate( "change", this.parentNode, event, true );
							}
						});
						jQuery._data( elem, "changeBubbles", true );
					}
				});
			},

			handle: function( event ) {
				var elem = event.target;

				// Swallow native change events from checkbox/radio, we already triggered them above
				if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
					return event.handleObj.handler.apply( this, arguments );
				}
			},

			teardown: function() {
				jQuery.event.remove( this, "._change" );

				return !rformElems.test( this.nodeName );
			}
		};
	}

	// Create "bubbling" focus and blur events
	if ( !jQuery.support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler while someone wants focusin/focusout
			var attaches = 0,
				handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};

			jQuery.event.special[ fix ] = {
				setup: function() {
					if ( attaches++ === 0 ) {
						document.addEventListener( orig, handler, true );
					}
				},
				teardown: function() {
					if ( --attaches === 0 ) {
						document.removeEventListener( orig, handler, true );
					}
				}
			};
		});
	}

	jQuery.fn.extend({

		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}

			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}

			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		},

		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		},

		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	});

	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};

		if ( rkeyEvent.test( name ) ) {
			jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
		}

		if ( rmouseEvent.test( name ) ) {
			jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
		}
	});
	/*!
	 * Sizzle CSS Selector Engine
	 * Copyright 2012 jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://sizzlejs.com/
	 */
	(function( window, undefined ) {

	var i,
		cachedruns,
		Expr,
		getText,
		isXML,
		compile,
		hasDuplicate,
		outermostContext,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsXML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
		sortOrder,

		// Instance-specific data
		expando = "sizzle" + -(new Date()),
		preferredDoc = window.document,
		support = {},
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),

		// General-purpose constants
		strundefined = typeof undefined,
		MAX_NEGATIVE = 1 << 31,

		// Array methods
		arr = [],
		pop = arr.pop,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf if we can't use a native one
		indexOf = arr.indexOf || function( elem ) {
			var i = 0,
				len = this.length;
			for ( ; i < len; i++ ) {
				if ( this[i] === elem ) {
					return i;
				}
			}
			return -1;
		},


		// Regular expressions

		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),

		// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
		operators = "([*^$|!~]?=)",
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
			"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

		// Prefer arguments quoted,
		//   then not containing pseudos/brackets,
		//   then attribute selectors/non-parenthetical expressions,
		//   then anything else
		// These preferences are here to reduce the number of selectors
		//   needing tokenize in the PSEUDO preFilter
		pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rsibling = /[\x20\t\r\n\f]*[+~]/,

		rnative = /\{\s*\[native code\]\s*\}/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rescape = /'|\\/g,
		rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
		funescape = function( _, escaped ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			return high !== high ?
				escaped :
				// BMP codepoint
				high < 0 ?
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		};

	// Use a stripped-down slice if we can't use a native one
	try {
		slice.call( docElem.childNodes, 0 )[0].nodeType;
	} catch ( e ) {
		slice = function( i ) {
			var elem,
				results = [];
			for ( ; (elem = this[i]); i++ ) {
				results.push( elem );
			}
			return results;
		};
	}

	/**
	 * For feature detection
	 * @param {Function} fn The function to test for native support
	 */
	function isNative( fn ) {
		return rnative.test( fn + "" );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var cache,
			keys = [];

		return (cache = function( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key += " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key ] = value);
		});
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return fn( div );
		} catch (e) {
			return false;
		} finally {
			// release memory in IE
			div = null;
		}
	}

	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}

		context = context || document;
		results = results || [];

		if ( !selector || typeof selector !== "string" ) {
			return results;
		}

		if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
			return [];
		}

		if ( !documentIsXML && !seed ) {

			// Shortcuts
			if ( (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}

				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
					return results;

				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
					push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
					return results;
				}
			}

			// QSA path
			if ( support.qsa && !rbuggyQSA.test(selector) ) {
				old = true;
				nid = expando;
				newContext = context;
				newSelector = nodeType === 9 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && context.parentNode || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							newSelector
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Detect xml
	 * @param {Element|Object} elem An element or a document
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var doc = node ? node.ownerDocument || node : preferredDoc;

		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Set our document
		document = doc;
		docElem = doc.documentElement;

		// Support tests
		documentIsXML = isXML( doc );

		// Check if getElementsByTagName("*") returns only elements
		support.tagNameNoComments = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Check if attributes should be retrieved by attribute nodes
		support.attributes = assert(function( div ) {
			div.innerHTML = "<select></select>";
			var type = typeof div.lastChild.getAttribute("multiple");
			// IE8 returns a string for some attributes even when not present
			return type !== "boolean" && type !== "string";
		});

		// Check if getElementsByClassName can be trusted
		support.getByClassName = assert(function( div ) {
			// Opera can't find a second classname (in 9.6)
			div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
			if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
				return false;
			}

			// Safari 3.2 caches class attributes and doesn't catch changes
			div.lastChild.className = "e";
			return div.getElementsByClassName("e").length === 2;
		});

		// Check if getElementById returns elements by name
		// Check if getElementsByName privileges form controls or returns elements by ID
		support.getByName = assert(function( div ) {
			// Inject content
			div.id = expando + 0;
			div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
			docElem.insertBefore( div, docElem.firstChild );

			// Test
			var pass = doc.getElementsByName &&
				// buggy browsers will return fewer than the correct 2
				doc.getElementsByName( expando ).length === 2 +
				// buggy browsers will return more than the correct 0
				doc.getElementsByName( expando + 0 ).length;
			support.getIdNotName = !doc.getElementById( expando );

			// Cleanup
			docElem.removeChild( div );

			return pass;
		});

		// IE6/7 return modified attributes
		Expr.attrHandle = assert(function( div ) {
			div.innerHTML = "<a href='#'></a>";
			return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
				div.firstChild.getAttribute("href") === "#";
		}) ?
			{} :
			{
				"href": function( elem ) {
					return elem.getAttribute( "href", 2 );
				},
				"type": function( elem ) {
					return elem.getAttribute("type");
				}
			};

		// ID find and filter
		if ( support.getIdNotName ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			};
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.tagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Name
		Expr.find["NAME"] = support.getByName && function( tag, context ) {
			if ( typeof context.getElementsByName !== strundefined ) {
				return context.getElementsByName( name );
			}
		};

		// Class
		Expr.find["CLASS"] = support.getByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== strundefined && !documentIsXML ) {
				return context.getElementsByClassName( className );
			}
		};

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21),
		// no need to also add to buggyMatches since matches checks buggyQSA
		// A support test would require too much code (would include document ready)
		rbuggyQSA = [ ":focus" ];

		if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explictly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				div.innerHTML = "<select><option selected=''></option></select>";

				// IE8 - Some boolean attributes are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
			});

			assert(function( div ) {

				// Opera 10-12/IE8 - ^= $= *= and empty values
				// Should not select anything
				div.innerHTML = "<input type='hidden' i=''/>";
				if ( div.querySelectorAll("[i^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.webkitMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		// Document order sorting
		sortOrder = docElem.compareDocumentPosition ?
		function( a, b ) {
			var compare;

			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
				if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
					if ( a === doc || contains( preferredDoc, a ) ) {
						return -1;
					}
					if ( b === doc || contains( preferredDoc, b ) ) {
						return 1;
					}
					return 0;
				}
				return compare & 4 ? -1 : 1;
			}

			return a.compareDocumentPosition ? -1 : 1;
		} :
		function( a, b ) {
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// The nodes are identical, we can exit early
			if ( a === b ) {
				hasDuplicate = true;
				return 0;

			// Fallback to using sourceIndex (in IE) if it's available on both nodes
			} else if ( a.sourceIndex && b.sourceIndex ) {
				return ( ~b.sourceIndex || MAX_NEGATIVE ) - ( contains( preferredDoc, a ) && ~a.sourceIndex || MAX_NEGATIVE );

			// Parentless nodes are either documents or disconnected
			} else if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		// Always assume the presence of duplicates if sort doesn't
		// pass them to our comparison function (as in Google Chrome).
		hasDuplicate = false;
		[0, 0].sort( sortOrder );
		support.detectDuplicates = hasDuplicate;

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		// rbuggyQSA always contains :focus, so no need for an existence check
		if ( support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch(e) {}
		}

		return Sizzle( expr, document, null, [elem] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		var val;

		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		if ( !documentIsXML ) {
			name = name.toLowerCase();
		}
		if ( (val = Expr.attrHandle[ name ]) ) {
			return val( elem );
		}
		if ( documentIsXML || support.attributes ) {
			return elem.getAttribute( name );
		}
		return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
			name :
			val && val.specified ? val.value : null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	// Document sorting and removing duplicates
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			i = 1,
			j = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( ; (elem = results[i]); i++ ) {
				if ( elem === results[ i - 1 ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		return results;
	};

	function siblingCheck( a, b ) {
		var cur = a && b && a.nextSibling;

		for ( ; cur; cur = cur.nextSibling ) {
			if ( cur === b ) {
				return -1;
			}
		}

		return a ? 1 : -1;
	}

	// Returns a function to use in pseudos for input types
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	// Returns a function to use in pseudos for buttons
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	// Returns a function to use in pseudos for positionals
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			for ( ; (node = elem[i]); i++ ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[5] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[4] ) {
					match[2] = match[4];

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeName ) {
				if ( nodeName === "*" ) {
					return function() { return true; };
				}

				nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.substr( result.length - check.length ) === check :
						operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];

							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf.call( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifider
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsXML ?
							elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
							elem.lang) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
				//   not comment, processing instructions, or others
				// Thanks to Diego Perini for the nodeName shortcut
				//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
				// use getAttribute instead to test this case
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	function tokenize( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( tokens = [] );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				} );
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push( {
						value: matched,
						type: type,
						matches: match
					} );
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	}

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && combinator.dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var data, cache, outerCache,
					dirkey = dirruns + " " + doneName;

				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
								if ( (data = cache[1]) === true || data === cachedruns ) {
									return data === true;
								}
							} else {
								cache = outerCache[ dir ] = [ dirkey ];
								cache[1] = matcher( elem, context, xml ) || cachedruns;
								if ( cache[1] === true ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf.call( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		// A counter to specify which element is currently being matched
		var matcherCachedRuns = 0,
			bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, expandContext ) {
				var elem, j, matcher,
					setMatched = [],
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					outermost = expandContext != null,
					contextBackup = outermostContext,
					// We must always have either seed elements or context
					elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
					// Nested matchers should use non-integer dirruns
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

				if ( outermost ) {
					outermostContext = context !== document && context;
					cachedruns = matcherCachedRuns;
				}

				// Add elements passing elementMatchers directly to results
				for ( ; (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
							cachedruns = ++matcherCachedRuns;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// Apply set filters to unmatched elements
				// `i` starts as a string, so matchedCount would equal "00" if there are no elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					for ( j = 0; (matcher = setMatchers[j]); j++ ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !group ) {
				group = tokenize( selector );
			}
			i = group.length;
			while ( i-- ) {
				cached = matcherFromTokens( group[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
		}
		return cached;
	};

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function select( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			match = tokenize( selector );

		if ( !seed ) {
			// Try to minimize operations if there is only one group
			if ( match.length === 1 ) {

				// Take a shortcut and set the context if the root selector is an ID
				tokens = match[0] = match[0].slice( 0 );
				if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
						context.nodeType === 9 && !documentIsXML &&
						Expr.relative[ tokens[1].type ] ) {

					context = Expr.find["ID"]( token.matches[0].replace( runescape, funescape ), context )[0];
					if ( !context ) {
						return results;
					}

					selector = selector.slice( tokens.shift().value.length );
				}

				// Fetch a seed set for right-to-left matching
				for ( i = matchExpr["needsContext"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
					token = tokens[i];

					// Abort if we hit a combinator
					if ( Expr.relative[ (type = token.type) ] ) {
						break;
					}
					if ( (find = Expr.find[ type ]) ) {
						// Search, expanding context for leading sibling combinators
						if ( (seed = find(
							token.matches[0].replace( runescape, funescape ),
							rsibling.test( tokens[0].type ) && context.parentNode || context
						)) ) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice( i, 1 );
							selector = seed.length && toSelector( tokens );
							if ( !selector ) {
								push.apply( results, slice.call( seed, 0 ) );
								return results;
							}

							break;
						}
					}
				}
			}
		}

		// Compile and execute a filtering function
		// Provide `match` to avoid retokenization if we modified the selector above
		compile( selector, match )(
			seed,
			context,
			documentIsXML,
			results,
			rsibling.test( selector )
		);
		return results;
	}

	// Deprecated
	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Easy API for creating new setFilters
	function setFilters() {}
	Expr.filters = setFilters.prototype = Expr.pseudos;
	Expr.setFilters = new setFilters();

	// Initialize with the default document
	setDocument();

	// Override sizzle attribute retrieval
	Sizzle.attr = jQuery.attr;
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;


	})( window );
	var runtil = /Until$/,
		rparentsprev = /^(?:parents|prev(?:Until|All))/,
		isSimple = /^.[^:#\[\.,]*$/,
		rneedsContext = jQuery.expr.match.needsContext,
		// methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend({
		find: function( selector ) {
			var i, ret, self;

			if ( typeof selector !== "string" ) {
				self = this;
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < self.length; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}

			ret = [];
			for ( i = 0; i < this.length; i++ ) {
				jQuery.find( selector, this[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( jQuery.unique( ret ) );
			ret.selector = ( this.selector ? this.selector + " " : "" ) + selector;
			return ret;
		},

		has: function( target ) {
			var i,
				targets = jQuery( target, this ),
				len = targets.length;

			return this.filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},

		not: function( selector ) {
			return this.pushStack( winnow(this, selector, false) );
		},

		filter: function( selector ) {
			return this.pushStack( winnow(this, selector, true) );
		},

		is: function( selector ) {
			return !!selector && (
				typeof selector === "string" ?
					// If this is a positional/relative selector, check membership in the returned set
					// so $("p:first").is("p:last") won't return true for a doc with two "p".
					rneedsContext.test( selector ) ?
						jQuery( selector, this.context ).index( this[0] ) >= 0 :
						jQuery.filter( selector, this ).length > 0 :
					this.filter( selector ).length > 0 );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				ret = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				cur = this[i];

				while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
					if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
						ret.push( cur );
						break;
					}
					cur = cur.parentNode;
				}
			}

			return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
		},

		// Determine the position of an element within
		// the matched set of elements
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
			}

			// index in selector
			if ( typeof elem === "string" ) {
				return jQuery.inArray( this[0], jQuery( elem ) );
			}

			// Locate the position of the desired element
			return jQuery.inArray(
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[0] : elem, this );
		},

		add: function( selector, context ) {
			var set = typeof selector === "string" ?
					jQuery( selector, context ) :
					jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
				all = jQuery.merge( this.get(), set );

			return this.pushStack( jQuery.unique(all) );
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	jQuery.fn.andSelf = jQuery.fn.addBack;

	function sibling( cur, dir ) {
		do {
			cur = cur[ dir ];
		} while ( cur && cur.nodeType !== 1 );

		return cur;
	}

	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return jQuery.nodeName( elem, "iframe" ) ?
				elem.contentDocument || elem.contentWindow.document :
				jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var ret = jQuery.map( this, fn, until );

			if ( !runtil.test( name ) ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				ret = jQuery.filter( selector, ret );
			}

			ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

			if ( this.length > 1 && rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}

			return this.pushStack( ret );
		};
	});

	jQuery.extend({
		filter: function( expr, elems, not ) {
			if ( not ) {
				expr = ":not(" + expr + ")";
			}

			return elems.length === 1 ?
				jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
				jQuery.find.matches(expr, elems);
		},

		dir: function( elem, dir, until ) {
			var matched = [],
				cur = elem[ dir ];

			while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
				if ( cur.nodeType === 1 ) {
					matched.push( cur );
				}
				cur = cur[dir];
			}
			return matched;
		},

		sibling: function( n, elem ) {
			var r = [];

			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					r.push( n );
				}
			}

			return r;
		}
	});

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, keep ) {

		// Can't pass null or undefined to indexOf in Firefox 4
		// Set to 0 to skip string check
		qualifier = qualifier || 0;

		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep(elements, function( elem, i ) {
				var retVal = !!qualifier.call( elem, i, elem );
				return retVal === keep;
			});

		} else if ( qualifier.nodeType ) {
			return jQuery.grep(elements, function( elem ) {
				return ( elem === qualifier ) === keep;
			});

		} else if ( typeof qualifier === "string" ) {
			var filtered = jQuery.grep(elements, function( elem ) {
				return elem.nodeType === 1;
			});

			if ( isSimple.test( qualifier ) ) {
				return jQuery.filter(qualifier, filtered, !keep);
			} else {
				qualifier = jQuery.filter( qualifier, filtered );
			}
		}

		return jQuery.grep(elements, function( elem ) {
			return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
		});
	}
	function createSafeFragment( document ) {
		var list = nodeNames.split( "|" ),
			safeFrag = document.createDocumentFragment();

		if ( safeFrag.createElement ) {
			while ( list.length ) {
				safeFrag.createElement(
					list.pop()
				);
			}
		}
		return safeFrag;
	}

	var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
			"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
		rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
		rleadingWhitespace = /^\s+/,
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rtbody = /<tbody/i,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

		// We have to close these tags to support XHTML (#13200)
		wrapMap = {
			option: [ 1, "<select multiple='multiple'>", "</select>" ],
			legend: [ 1, "<fieldset>", "</fieldset>" ],
			area: [ 1, "<map>", "</map>" ],
			param: [ 1, "<object>", "</object>" ],
			thead: [ 1, "<table>", "</table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

			// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
			// unless wrapped in a div with non-breaking characters in front of it.
			_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
		},
		safeFragment = createSafeFragment( document ),
		fragmentDiv = safeFragment.appendChild( document.createElement("div") );

	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	jQuery.fn.extend({
		text: function( value ) {
			return jQuery.access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().appendChild( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
			}, null, value, arguments.length );
		},

		wrapAll: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function(i) {
					jQuery(this).wrapAll( html.call(this, i) );
				});
			}

			if ( this[0] ) {
				// The elements to wrap the target around
				var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

				if ( this[0].parentNode ) {
					wrap.insertBefore( this[0] );
				}

				wrap.map(function() {
					var elem = this;

					while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
						elem = elem.firstChild;
					}

					return elem;
				}).appendChild( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function(i) {
					jQuery(this).wrapInner( html.call(this, i) );
				});
			}

			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.appendChild( html );
				}
			});
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each(function(i) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},

		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		},

		append: function() {
			return this.domManip(arguments, true, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					this.appendChild( elem );
				}
			});
		},

		prepend: function() {
			return this.domManip(arguments, true, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					this.insertBefore( elem, this.firstChild );
				}
			});
		},

		before: function() {
			return this.domManip( arguments, false, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},

		after: function() {
			return this.domManip( arguments, false, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},

		// keepData is for internal use only--do not document
		remove: function( selector, keepData ) {
			var elem,
				i = 0;

			for ( ; (elem = this[i]) != null; i++ ) {
				if ( !selector || jQuery.filter( selector, [ elem ] ).length > 0 ) {
					if ( !keepData && elem.nodeType === 1 ) {
						jQuery.cleanData( getAll( elem ) );
					}

					if ( elem.parentNode ) {
						if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
							setGlobalEval( getAll( elem, "script" ) );
						}
						elem.parentNode.removeChild( elem );
					}
				}
			}

			return this;
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; (elem = this[i]) != null; i++ ) {
				// Remove element nodes and prevent memory leaks
				if ( elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem, false ) );
				}

				// Remove any remaining nodes
				while ( elem.firstChild ) {
					elem.removeChild( elem.firstChild );
				}

				// If this is a select, ensure that it displays empty (#12336)
				// Support: IE<9
				if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
					elem.options.length = 0;
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function () {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},

		html: function( value ) {
			return jQuery.access( this, function( value ) {
				var elem = this[0] || {},
					i = 0,
					l = this.length;

				if ( value === undefined ) {
					return elem.nodeType === 1 ?
						elem.innerHTML.replace( rinlinejQuery, "" ) :
						undefined;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
					( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
					!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

					value = value.replace( rxhtmlTag, "<$1></$2>" );

					try {
						for (; i < l; i++ ) {
							// Remove element nodes and prevent memory leaks
							elem = this[i] || {};
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch(e) {}
				}

				if ( elem ) {
					this.empty().appendChild( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function( value ) {
			var isFunc = jQuery.isFunction( value );

			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( !isFunc && typeof value !== "string" ) {
				value = jQuery( value ).not( this ).detach();
			}

			return this.domManip( [ value ], true, function( elem ) {
				var next = this.nextSibling,
					parent = this.parentNode;

				if ( parent && this.nodeType === 1 || this.nodeType === 11 ) {

					jQuery( this ).remove();

					if ( next ) {
						next.parentNode.insertBefore( elem, next );
					} else {
						parent.appendChild( elem );
					}
				}
			});
		},

		detach: function( selector ) {
			return this.remove( selector, true );
		},

		domManip: function( args, table, callback ) {

			// Flatten any nested arrays
			args = core_concat.apply( [], args );

			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[0],
				isFunction = jQuery.isFunction( value );

			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[0] = value.call( this, index, table ? self.html() : undefined );
					}
					self.domManip( args, table, callback );
				});
			}

			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;

				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}

				if ( first ) {
					table = table && jQuery.nodeName( first, "tr" );
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;

					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;

						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );

							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}

						callback.call(
							table && jQuery.nodeName( this[i], "table" ) ?
								findOrAppend( this[i], "tbody" ) :
								this[i],
							node,
							i
						);
					}

					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;

						// Reenable scripts
						jQuery.map( scripts, restoreScript );

						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

								if ( node.src ) {
									// Hope ajax is available...
									jQuery.ajax({
										url: node.src,
										type: "GET",
										dataType: "script",
										async: false,
										global: false,
										"throws": true
									});
								} else {
									jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
								}
							}
						}
					}

					// Fix #11809: Avoid leaking memory
					fragment = first = null;
				}
			}

			return this;
		}
	});

	function findOrAppend( elem, tag ) {
		return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		var attr = elem.getAttributeNode("type");
		elem.type = ( attr && attr.specified ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
		if ( match ) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}
		return elem;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var elem,
			i = 0;
		for ( ; (elem = elems[i]) != null; i++ ) {
			jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
		}
	}

	function cloneCopyEvent( src, dest ) {

		if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
			return;
		}

		var type, i, l,
			oldData = jQuery._data( src ),
			curData = jQuery._data( dest, oldData ),
			events = oldData.events;

		if ( events ) {
			delete curData.handle;
			curData.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}

		// make the cloned public data object a copy from the original
		if ( curData.data ) {
			curData.data = jQuery.extend( {}, curData.data );
		}
	}

	function fixCloneNodeIssues( src, dest ) {
		var nodeName, data, e;

		// We do not need to do anything for non-Elements
		if ( dest.nodeType !== 1 ) {
			return;
		}

		nodeName = dest.nodeName.toLowerCase();

		// IE6-8 copies events bound via attachEvent when using cloneNode.
		if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
			data = jQuery._data( dest );

			for ( e in data.events ) {
				jQuery.removeEvent( dest, e, data.handle );
			}

			// Event data gets referenced instead of copied if the expando gets copied too
			dest.removeAttribute( jQuery.expando );
		}

		// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
		if ( nodeName === "script" && dest.text !== src.text ) {
			disableScript( dest ).text = src.text;
			restoreScript( dest );

		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		} else if ( nodeName === "object" ) {
			if ( dest.parentNode ) {
				dest.outerHTML = src.outerHTML;
			}

			// This path appears unavoidable for IE9. When cloning an object
			// element in IE9, the outerHTML strategy above is not sufficient.
			// If the src has innerHTML and the destination does not,
			// copy the src.innerHTML into the dest.innerHTML. #10324
			if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
				dest.innerHTML = src.innerHTML;
			}

		} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
			// IE6-8 fails to persist the checked state of a cloned checkbox
			// or radio button. Worse, IE6-7 fail to give the cloned element
			// a checked appearance if the defaultChecked value isn't also set

			dest.defaultChecked = dest.checked = src.checked;

			// IE6-7 get confused and end up setting the value of a cloned
			// checkbox/radio button to an empty string instead of "on"
			if ( dest.value !== src.value ) {
				dest.value = src.value;
			}

		// IE6-8 fails to return the selected option to the default selected
		// state when cloning options
		} else if ( nodeName === "option" ) {
			dest.defaultSelected = dest.selected = src.defaultSelected;

		// IE6-8 fails to set the defaultValue to the correct value when
		// cloning other types of input fields
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				i = 0,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone(true);
				jQuery( insert[i] )[ original ]( elems );

				// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
				core_push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	});

	function getAll( context, tag ) {
		var elems, elem,
			i = 0,
			found = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll( tag || "*" ) :
				undefined;

		if ( !found ) {
			for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
				if ( !tag || jQuery.nodeName( elem, tag ) ) {
					found.push( elem );
				} else {
					jQuery.merge( found, getAll( elem, tag ) );
				}
			}
		}

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], found ) :
			found;
	}

	// Used in buildFragment, fixes the defaultChecked property
	function fixDefaultChecked( elem ) {
		if ( manipulation_rcheckableType.test( elem.type ) ) {
			elem.defaultChecked = elem.checked;
		}
	}

	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var destElements, srcElements, node, i, clone,
				inPage = jQuery.contains( elem.ownerDocument, elem );

			if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
				clone = elem.cloneNode( true );

			// IE<=8 does not properly clone detached, unknown element nodes
			} else {
				fragmentDiv.innerHTML = elem.outerHTML;
				fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
			}

			if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
					(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				// Fix all IE cloning issues
				for ( i = 0; (node = srcElements[i]) != null; ++i ) {
					// Ensure that the destination node is not null; Fixes #9587
					if ( destElements[i] ) {
						fixCloneNodeIssues( node, destElements[i] );
					}
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0; (node = srcElements[i]) != null; i++ ) {
						cloneCopyEvent( node, destElements[i] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			destElements = srcElements = node = null;

			// Return the cloned set
			return clone;
		},

		buildFragment: function( elems, context, scripts, selection ) {
			var contains, elem, tag, tmp, wrap, tbody, j,
				l = elems.length,

				// Ensure a safe fragment
				safe = createSafeFragment( context ),

				nodes = [],
				i = 0;

			for ( ; i < l; i++ ) {
				elem = elems[ i ];

				if ( elem || elem === 0 ) {

					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );

					// Convert html into DOM nodes
					} else {
						tmp = tmp || safe.appendChild( context.createElement("div") );

						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;

						tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

						// Descend through wrappers to the right content
						j = wrap[0];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}

						// Manually add leading whitespace removed by IE
						if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
							nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
						}

						// Remove IE's autoinserted <tbody> from table fragments
						if ( !jQuery.support.tbody ) {

							// String was a <table>, *may* have spurious <tbody>
							elem = tag === "table" && !rtbody.test( elem ) ?
								tmp.firstChild :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !rtbody.test( elem ) ?
									tmp :
									0;

							j = elem && elem.childNodes.length;
							while ( j-- ) {
								if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
									elem.removeChild( tbody );
								}
							}
						}

						jQuery.merge( nodes, tmp.childNodes );

						// Fix #12392 for WebKit and IE > 9
						tmp.textContent = "";

						// Fix #12392 for oldIE
						while ( tmp.firstChild ) {
							tmp.removeChild( tmp.firstChild );
						}

						// Remember the top-level container for proper cleanup
						tmp = safe.lastChild;
					}
				}
			}

			// Fix #11356: Clear elements from fragment
			if ( tmp ) {
				safe.removeChild( tmp );
			}

			// Reset defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			if ( !jQuery.support.appendChecked ) {
				jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
			}

			i = 0;
			while ( (elem = nodes[ i++ ]) ) {

				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}

				contains = jQuery.contains( elem.ownerDocument, elem );

				// Append to fragment
				tmp = getAll( safe.appendChild( elem ), "script" );

				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}

				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}

			tmp = null;

			return safe;
		},

		cleanData: function( elems, /* internal */ acceptData ) {
			var data, id, elem, type,
				i = 0,
				internalKey = jQuery.expando,
				cache = jQuery.cache,
				deleteExpando = jQuery.support.deleteExpando,
				special = jQuery.event.special;

			for ( ; (elem = elems[i]) != null; i++ ) {

				if ( acceptData || jQuery.acceptData( elem ) ) {

					id = elem[ internalKey ];
					data = id && cache[ id ];

					if ( data ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Remove cache only if it was not already removed by jQuery.event.remove
						if ( cache[ id ] ) {

							delete cache[ id ];

							// IE does not allow us to delete expando properties from nodes,
							// nor does it have a removeAttribute function on Document nodes;
							// we must handle all of these cases
							if ( deleteExpando ) {
								delete elem[ internalKey ];

							} else if ( typeof elem.removeAttribute !== "undefined" ) {
								elem.removeAttribute( internalKey );

							} else {
								elem[ internalKey ] = null;
							}

							core_deletedIds.push( id );
						}
					}
				}
			}
		}
	});
	var curCSS, getStyles, iframe,
		ralpha = /alpha\([^)]*\)/i,
		ropacity = /opacity\s*=\s*([^)]*)/,
		rposition = /^(top|right|bottom|left)$/,
		// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rmargin = /^margin/,
		rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
		rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
		elemdisplay = { BODY: "block" },

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: 0,
			fontWeight: 400
		},

		cssExpand = [ "Top", "Right", "Bottom", "Left" ],
		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

	// return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {

		// shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}

		// check for vendor prefixed names
		var capName = name.charAt(0).toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}

		return origName;
	}

	function isHidden( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	}

	function showHide( elements, show ) {
		var elem,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			values[ index ] = jQuery._data( elem, "olddisplay" );
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && elem.style.display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
				}
			} else if ( !values[ index ] && !isHidden( elem ) ) {
				jQuery._data( elem, "olddisplay", jQuery.css( elem, "display" ) );
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.fn.extend({
		css: function( name, value ) {
			return jQuery.access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			var bool = typeof state === "boolean";

			return this.each(function() {
				if ( bool ? state : isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});

	jQuery.extend({
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Exclude the following css properties to add px
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			// normalize float css property
			"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

			// gets hook for the prefixed version
			// followed by the unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// convert relative number strings (+= or -=) to relative numbers. #7345
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}

				// Make sure that NaN and null values aren't set. See: #7116
				if ( value == null || type === "number" && isNaN( value ) ) {
					return;
				}

				// If a number was passed in, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}

				// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
				// but it would mean to define eight (for every problematic property) identical functions
				if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

					// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
					// Fixes bug #5509
					try {
						style[ name ] = value;
					} catch(e) {}
				}

			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

			// gets hook for the prefixed version
			// followed by the unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			//convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Return, converting to number if forced or a qualifier was provided and val looks numeric
			if ( extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		},

		// A method for quickly swapping in/out CSS properties to get correct calculations
		swap: function( elem, options, callback, args ) {
			var ret, name,
				old = {};

			// Remember the old values, and insert the new ones
			for ( name in options ) {
				old[ name ] = elem.style[ name ];
				elem.style[ name ] = options[ name ];
			}

			ret = callback.apply( elem, args || [] );

			// Revert the old values
			for ( name in options ) {
				elem.style[ name ] = old[ name ];
			}

			return ret;
		}
	});

	// NOTE: we've included the "window" in window.getComputedStyle
	// because jsdom on node.js will break without it.
	if ( window.getComputedStyle ) {
		getStyles = function( elem ) {
			return window.getComputedStyle( elem, null );
		};

		curCSS = function( elem, name, _computed ) {
			var width, minWidth, maxWidth,
				computed = _computed || getStyles( elem ),

				// getPropertyValue is only needed for .css('filter') in IE9, see #12537
				ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
				style = elem.style;

			if ( computed ) {

				if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
					ret = jQuery.style( elem, name );
				}

				// A tribute to the "awesome hack by Dean Edwards"
				// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
				// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
				// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
				if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

					// Remember the original values
					width = style.width;
					minWidth = style.minWidth;
					maxWidth = style.maxWidth;

					// Put in the new values to get a computed value out
					style.minWidth = style.maxWidth = style.width = ret;
					ret = computed.width;

					// Revert the changed values
					style.width = width;
					style.minWidth = minWidth;
					style.maxWidth = maxWidth;
				}
			}

			return ret;
		};
	} else if ( document.documentElement.currentStyle ) {
		getStyles = function( elem ) {
			return elem.currentStyle;
		};

		curCSS = function( elem, name, _computed ) {
			var left, rs, rsLeft,
				computed = _computed || getStyles( elem ),
				ret = computed ? computed[ name ] : undefined,
				style = elem.style;

			// Avoid setting ret to empty string here
			// so we don't default to auto
			if ( ret == null && style && style[ name ] ) {
				ret = style[ name ];
			}

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			// but not position css attributes, as those are proportional to the parent element instead
			// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
			if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

				// Remember the original values
				left = style.left;
				rs = elem.runtimeStyle;
				rsLeft = rs && rs.left;

				// Put in the new values to get a computed value out
				if ( rsLeft ) {
					rs.left = elem.currentStyle.left;
				}
				style.left = name === "fontSize" ? "1em" : ret;
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left = left;
				if ( rsLeft ) {
					rs.left = rsLeft;
				}
			}

			return ret === "" ? "auto" : ret;
		};
	}

	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {
			// both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// at this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// at this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// at this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}

			// we need the check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	// Try to determine the default display value of an element
	function css_defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {
				// Use the already-created iframe if possible
				iframe = ( iframe ||
					jQuery("<iframe frameborder='0' width='0' height='0'/>")
					.css( "cssText", "display:block !important" )
				).appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
				doc.write("<!doctype html><html><body>");
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}

	// Called ONLY from within css_defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
			display = jQuery.css( elem[0], "display" );
		elem.remove();
		return display;
	}

	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
					// certain elements can have dimension info if we invisibly show them
					// however, it must have a current display style that would benefit from this
					return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});

	if ( !jQuery.support.opacity ) {
		jQuery.cssHooks.opacity = {
			get: function( elem, computed ) {
				// IE uses filters for opacity
				return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
			},

			set: function( elem, value ) {
				var style = elem.style,
					currentStyle = elem.currentStyle,
					opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
					filter = currentStyle && currentStyle.filter || style.filter || "";

				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				style.zoom = 1;

				// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
				// if value === "", then remove inline opacity #12685
				if ( ( value >= 1 || value === "" ) &&
						jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
						style.removeAttribute ) {

					// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
					// if "filter:" is present at all, clearType is disabled, we want to avoid this
					// style.removeAttribute is IE Only, but so apparently is this code path...
					style.removeAttribute( "filter" );

					// if there is no filter style applied in a css rule or unset inline opacity, we are done
					if ( value === "" || currentStyle && !currentStyle.filter ) {
						return;
					}
				}

				// otherwise, set new filter values
				style.filter = ralpha.test( filter ) ?
					filter.replace( ralpha, opacity ) :
					filter + " " + opacity;
			}
		};
	}

	// These hooks cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	jQuery(function() {
		if ( !jQuery.support.reliableMarginRight ) {
			jQuery.cssHooks.marginRight = {
				get: function( elem, computed ) {
					if ( computed ) {
						// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
						// Work around by temporarily setting element display to inline-block
						return jQuery.swap( elem, { "display": "inline-block" },
							curCSS, [ elem, "marginRight" ] );
					}
				}
			};
		}

		// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
		// getComputedStyle returns percent when specified for top/left/bottom/right
		// rather than make the css module depend on the offset module, we just check for it here
		if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
			jQuery.each( [ "top", "left" ], function( i, prop ) {
				jQuery.cssHooks[ prop ] = {
					get: function( elem, computed ) {
						if ( computed ) {
							computed = curCSS( elem, prop );
							// if curCSS returns percentage, fallback to offset
							return rnumnonpx.test( computed ) ?
								jQuery( elem ).position()[ prop ] + "px" :
								computed;
						}
					}
				};
			});
		}

	});

	if ( jQuery.expr && jQuery.expr.filters ) {
		jQuery.expr.filters.hidden = function( elem ) {
			return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
		};

		jQuery.expr.filters.visible = function( elem ) {
			return !jQuery.expr.filters.hidden( elem );
		};
	}

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function(){
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function(){
				var type = this.type;
				// Use .is(":disabled") so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !manipulation_rcheckableType.test( type ) );
			})
			.map(function( i, elem ){
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ){
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});

	//Serialize an array of form elements or a set of
	//key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );

				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	var
		// Document location
		ajaxLocParts,
		ajaxLocation,
		
		ajax_nonce = jQuery.now(),

		ajax_rquery = /\?/,
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

		// Keep a copy of the old load method
		_load = jQuery.fn.load,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat("*");

	// #8138, IE may throw an exception when accessing
	// a field from window.location if document.domain has been set
	try {
		ajaxLocation = location.href;
	} catch( e ) {
		// Use the href attribute of an A element
		// since IE will modify it given document.location
		ajaxLocation = document.createElement( "a" );
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf(" ");

		if ( off >= 0 ) {
			selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,

				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").appendChild( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
		jQuery.fn[ type ] = function( fn ){
			return this.on( type, fn );
		};
	});

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": window.String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
				);
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			fireGlobals = s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// If successful, handle type chaining
				if ( status >= 200 && status < 300 || status === 304 ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// If not modified
					if ( status === 304 ) {
						isSuccess = true;
						statusText = "notmodified";

					// If we have data
					} else {
						isSuccess = ajaxConvert( s, response );
						statusText = isSuccess.state;
						success = isSuccess.data;
						error = isSuccess.error;
						isSuccess = !error;
					}
				} else {
					// We extract error from statusText
					// then normalize statusText and status for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		}
	});

	/* Handles responses to an ajax request:
	 * - sets all responseXXX fields accordingly
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes,
			responseFields = s.responseFields;

		// Fill responseXXX fields
		for ( type in responseFields ) {
			if ( type in responses ) {
				jqXHR[ responseFields[type] ] = responses[ type ];
			}
		}

		// Remove auto dataType and get content-type in the process
		while( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	// Chain conversions given the request and the original response
	function ajaxConvert( s, response ) {

		var conv, conv2, current, tmp,
			converters = {},
			i = 0,
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice(),
			prev = dataTypes[ 0 ];

		// Apply the dataFilter if provided
		if ( s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		// Convert to each sequential dataType, tolerating list modification
		for ( ; (current = dataTypes[++i]); ) {

			// There's only work to do if current dataType is non-auto
			if ( current !== "*" ) {

				// Convert response if prev dataType is non-auto and differs from current
				if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.splice( i--, 0, current );
									}

									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s["throws"] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}

				// Update prev for next iteration
				prev = current;
			}
		}

		return { state: "success", data: response };
	}
	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});

	// Handle cache's special case and global
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
			s.global = false;
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function(s) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {

			var script,
				head = document.head || jQuery("head")[0] || document.documentElement;

			return {

				send: function( _, callback ) {

					script = document.createElement("script");

					script.async = true;

					if ( s.scriptCharset ) {
						script.charset = s.scriptCharset;
					}

					script.src = s.url;

					// Attach handlers for all browsers
					script.onload = script.onreadystatechange = function( _, isAbort ) {

						if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

							// Handle memory leak in IE
							script.onload = script.onreadystatechange = null;

							// Remove the script
							if ( script.parentNode ) {
								script.parentNode.removeChild( script );
							}

							// Dereference the script
							script = null;

							// Callback if not abort
							if ( !isAbort ) {
								callback( 200, "success" );
							}
						}
					};

					// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					head.insertBefore( script, head.firstChild );
				},

				abort: function() {
					if ( script ) {
						script.onload( undefined, true );
					}
				}
			};
		}
	});
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;

				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});
	var xhrCallbacks, xhrSupported,
		xhrId = 0,
		// #5280: Internet Explorer will keep connections alive if we don't abort on unload
		xhrOnUnloadAbort = window.ActiveXObject && function() {
			// Abort all pending requests
			var key;
			for ( key in xhrCallbacks ) {
				xhrCallbacks[ key ]( undefined, true );
			}
		};

	// Functions to create xhrs
	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest();
		} catch( e ) {}
	}

	function createActiveXHR() {
		try {
			return new window.ActiveXObject("Microsoft.XMLHTTP");
		} catch( e ) {}
	}

	// Create the request object
	// (This is still attached to ajaxSettings for backward compatibility)
	jQuery.ajaxSettings.xhr = window.ActiveXObject ?
		/* Microsoft failed to properly
		 * implement the XMLHttpRequest in IE7 (can't request local files),
		 * so we use the ActiveXObject when it is available
		 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
		 * we need a fallback.
		 */
		function() {
			return !this.isLocal && createStandardXHR() || createActiveXHR();
		} :
		// For all other browsers, use the standard XMLHttpRequest object
		createStandardXHR;

	// Determine support properties
	xhrSupported = jQuery.ajaxSettings.xhr();
	jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	xhrSupported = jQuery.support.ajax = !!xhrSupported;

	// Create transport if the browser can provide an xhr
	if ( xhrSupported ) {

		jQuery.ajaxTransport(function( s ) {
			// Cross domain only allowed if supported through XMLHttpRequest
			if ( !s.crossDomain || jQuery.support.cors ) {

				var callback;

				return {
					send: function( headers, complete ) {

						// Get a new xhr
						var handle, i,
							xhr = s.xhr();

						// Open the socket
						// Passing null username, generates a login popup on Opera (#2865)
						if ( s.username ) {
							xhr.open( s.type, s.url, s.async, s.username, s.password );
						} else {
							xhr.open( s.type, s.url, s.async );
						}

						// Apply custom fields if provided
						if ( s.xhrFields ) {
							for ( i in s.xhrFields ) {
								xhr[ i ] = s.xhrFields[ i ];
							}
						}

						// Override mime type if needed
						if ( s.mimeType && xhr.overrideMimeType ) {
							xhr.overrideMimeType( s.mimeType );
						}

						// X-Requested-With header
						// For cross-domain requests, seeing as conditions for a preflight are
						// akin to a jigsaw puzzle, we simply never set it to be sure.
						// (it can always be set on a per-request basis or even using ajaxSetup)
						// For same-domain requests, won't change header if already provided.
						if ( !s.crossDomain && !headers["X-Requested-With"] ) {
							headers["X-Requested-With"] = "XMLHttpRequest";
						}

						// Need an extra try/catch for cross domain requests in Firefox 3
						try {
							for ( i in headers ) {
								xhr.setRequestHeader( i, headers[ i ] );
							}
						} catch( err ) {}

						// Do send the request
						// This may raise an exception which is actually
						// handled in jQuery.ajax (so no try/catch here)
						xhr.send( ( s.hasContent && s.data ) || null );

						// Listener
						callback = function( _, isAbort ) {

							var status,
								statusText,
								responseHeaders,
								responses,
								xml;

							// Firefox throws exceptions when accessing properties
							// of an xhr when a network error occurred
							// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
							try {

								// Was never called and is aborted or complete
								if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

									// Only called once
									callback = undefined;

									// Do not keep as active anymore
									if ( handle ) {
										xhr.onreadystatechange = jQuery.noop;
										if ( xhrOnUnloadAbort ) {
											delete xhrCallbacks[ handle ];
										}
									}

									// If it's an abort
									if ( isAbort ) {
										// Abort it manually if needed
										if ( xhr.readyState !== 4 ) {
											xhr.abort();
										}
									} else {
										responses = {};
										status = xhr.status;
										xml = xhr.responseXML;
										responseHeaders = xhr.getAllResponseHeaders();

										// Construct response list
										if ( xml && xml.documentElement /* #4958 */ ) {
											responses.xml = xml;
										}

										// When requesting binary data, IE6-9 will throw an exception
										// on any attempt to access responseText (#11426)
										if ( typeof xhr.responseText === "string" ) {
											responses.text = xhr.responseText;
										}

										// Firefox throws an exception when accessing
										// statusText for faulty cross-domain requests
										try {
											statusText = xhr.statusText;
										} catch( e ) {
											// We normalize with Webkit giving an empty statusText
											statusText = "";
										}

										// Filter status for non standard behaviors

										// If the request is local and we have data: assume a success
										// (success with no data won't get notified, that's the best we
										// can do given current implementations)
										if ( !status && s.isLocal && !s.crossDomain ) {
											status = responses.text ? 200 : 404;
										// IE - #1450: sometimes returns 1223 when it should be 204
										} else if ( status === 1223 ) {
											status = 204;
										}
									}
								}
							} catch( firefoxAccessException ) {
								if ( !isAbort ) {
									complete( -1, firefoxAccessException );
								}
							}

							// Call complete if needed
							if ( responses ) {
								complete( status, statusText, responses, responseHeaders );
							}
						};

						if ( !s.async ) {
							// if we're in sync mode we fire the callback
							callback();
						} else if ( xhr.readyState === 4 ) {
							// (IE6 & IE7) if it's in cache and has been
							// retrieved directly we need to fire the callback
							setTimeout( callback );
						} else {
							handle = ++xhrId;
							if ( xhrOnUnloadAbort ) {
								// Create the active xhrs callbacks list if needed
								// and attach the unload handler
								if ( !xhrCallbacks ) {
									xhrCallbacks = {};
									jQuery( window ).unload( xhrOnUnloadAbort );
								}
								// Add to list of active xhrs callbacks
								xhrCallbacks[ handle ] = callback;
							}
							xhr.onreadystatechange = callback;
						}
					},

					abort: function() {
						if ( callback ) {
							callback( undefined, true );
						}
					}
				};
			}
		});
	}
	var fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [function( prop, value ) {
				var end, unit,
					tween = this.createTween( prop, value ),
					parts = rfxnum.exec( value ),
					target = tween.cur(),
					start = +target || 0,
					scale = 1,
					maxIterations = 20;

				if ( parts ) {
					end = +parts[2];
					unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

					// We need to compute starting value
					if ( unit !== "px" && start ) {
						// Iteratively approximate from a nonzero starting point
						// Prefer the current property, because this process will be trivial if it uses the same units
						// Fallback to end or a simple constant
						start = jQuery.css( tween.elem, prop, true ) || end || 1;

						do {
							// If previous iteration zeroed out, double until we get *something*
							// Use a string for doubling factor so we don't accidentally see scale as unchanged below
							scale = scale || ".5";

							// Adjust and apply
							start = start / scale;
							jQuery.style( tween.elem, prop, start + unit );

						// Update scale, tolerating zero or NaN from tween.cur()
						// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
						} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
					}

					tween.unit = unit;
					tween.start = start;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
				}
				return tween;
			}]
		};

	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}

	function createTweens( animation, props ) {
		jQuery.each( props, function( prop, value ) {
			var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
				index = 0,
				length = collection.length;
			for ( ; index < length; index++ ) {
				if ( collection[ index ].call( animation, prop, value ) ) {

					// we're done with this property
					return;
				}
			}
		});
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ]);

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// if we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// resolve when we played the last frame
					// otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}

		createTweens( animation, props );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// not quite $.extend, this wont overwrite keys already present.
				// also - reusing 'index' from above because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});

	function defaultPrefilter( elem, props, opts ) {
		/*jshint validthis:true */
		var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
			anim = this,
			style = elem.style,
			orig = {},
			handled = [],
			hidden = elem.nodeType && isHidden( elem );

		// handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function() {
				// doing this makes sure that the complete handler will be called
				// before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}

		// height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE does not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			if ( jQuery.css( elem, "display" ) === "inline" &&
					jQuery.css( elem, "float" ) === "none" ) {

				// inline-level elements accept inline-block;
				// block-level elements need to be inline with layout
				if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
					style.display = "inline-block";

				} else {
					style.zoom = 1;
				}
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			if ( !jQuery.support.shrinkWrapBlocks ) {
				anim.done(function() {
					style.overflow = opts.overflow[ 0 ];
					style.overflowX = opts.overflow[ 1 ];
					style.overflowY = opts.overflow[ 2 ];
				});
			}
		}


		// show/hide pass
		for ( index in props ) {
			value = props[ index ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ index ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
					continue;
				}
				handled.push( index );
			}
		}

		length = handled.length;
		if ( length ) {
			dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}

			// store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;
				jQuery._removeData( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( index = 0 ; index < length ; index++ ) {
				prop = handled[ index ];
				tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
				orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}
		}
	}

	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}

				// passing a non empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails
				// so, simple values such as "10px" are parsed to Float.
				// complex values such as "rotate(1rad)" are returned as is.
				result = jQuery.css( tween.elem, tween.prop, "auto" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// use step hook for back compat - use cssHook if its there - use .style if its
				// available and use plain properties where available
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Remove in 2.0 - this supports IE8's panic based approach
	// to setting things on disconnected nodes

	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});

	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {

			// show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
					doAnimation.finish = function() {
						anim.stop( true );
					};
					// Empty animations, or finishing resolves immediately
					if ( empty || jQuery._data( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = jQuery._data( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// start the next in the queue if the last step wasn't forced
				// timers currently will call their complete callbacks, which will dequeue
				// but only if they were gotoEnd
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = jQuery._data( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// enable finishing flag on private data
				data.finish = true;

				// empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.cur && hooks.cur.finish ) {
					hooks.cur.finish.call( this );
				}

				// look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// turn off finishing flag
				delete data.finish;
			});
		}
	});

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			attrs = { height: type },
			i = 0;

		// if we include width, step value is 1 to do all cssExpand values,
		// if we don't include width, step value is 2 to skip over Left and Right
		includeWidth = includeWidth? 1 : 0;
		for( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p*Math.PI ) / 2;
		}
	};

	jQuery.timers = [];
	jQuery.fx = Tween.prototype.init;
	jQuery.fx.tick = function() {
		var timer,
			timers = jQuery.timers,
			i = 0;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		if ( timer() && jQuery.timers.push( timer ) ) {
			jQuery.fx.start();
		}
	};

	jQuery.fx.interval = 13;

	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};

	if ( jQuery.expr && jQuery.expr.filters ) {
		jQuery.expr.filters.animated = function( elem ) {
			return jQuery.grep(jQuery.timers, function( fn ) {
				return elem === fn.elem;
			}).length;
		};
	}
	jQuery.fn.offset = function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	};

	jQuery.offset = {

		setOffset: function( elem, options, i ) {
			var position = jQuery.css( elem, "position" );

			// set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			var curElem = jQuery( elem ),
				curOffset = curElem.offset(),
				curCSSTop = jQuery.css( elem, "top" ),
				curCSSLeft = jQuery.css( elem, "left" ),
				calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
				props = {}, curPosition = {}, curTop, curLeft;

			// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );
			} else {
				curElem.css( props );
			}
		}
	};


	jQuery.fn.extend({

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				parentOffset = { top: 0, left: 0 },
				elem = this[ 0 ];

			// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// we assume that getBoundingClientRect is available when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			// note: when an element has margin: auto the offsetLeft and marginLeft
			// are the same in Safari causing offset.left to incorrectly be 0
			return {
				top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
			};
		},

		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || document.documentElement;
				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}
				return offsetParent || document.documentElement;
			});
		}
	});


	// Create scrollLeft and scrollTop methods
	jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
		var top = /Y/.test( prop );

		jQuery.fn[ method ] = function( val ) {
			return jQuery.access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? (prop in win) ? win[ prop ] :
						win.document.documentElement[ method ] :
						elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : jQuery( win ).scrollLeft(),
						top ? val : jQuery( win ).scrollTop()
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});

	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ?
			elem :
			elem.nodeType === 9 ?
				elem.defaultView || elem.parentWindow :
				false;
	}
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return jQuery.access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
						// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});
	// Limit scope pollution from any deprecated API
	// (function() {

	// })();
	// Expose jQuery to the global object
	window.jQuery = window.$ = jQuery;

	// Expose jQuery as an AMD module, but only for AMD loaders that
	// understand the issues with loading multiple versions of jQuery
	// in a page that all might call define(). The loader will indicate
	// they have special allowances for multiple jQuery versions by
	// specifying define.amd.jQuery = true. Register as a named module,
	// since jQuery can be concatenated with other files that may use define,
	// but not use a proper concatenation script that understands anonymous
	// AMD modules. A named AMD is safest and most robust way to register.
	// Lowercase jquery is used because AMD module names are derived from
	// file names, and jQuery is normally delivered in a lowercase file name.
	// Do this after creating the global so that if an AMD module wants to call
	// noConflict to hide this version of jQuery, it will work.
	if ( "function" === "function" && __webpack_require__(3) && __webpack_require__(3).jQuery ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return jQuery; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	})( window );
	module.exports = jQuery;


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

	/*
	collada + KeyFrameAnimation

	使用THREE.ColladaLoader实现动画的过程：
	1.有一个包含场景动画的xml(.js)的文件
	2.创建场景，load xml(js)文件,将文件的动作转化为KeyFrameAnimation动画
	3.监听动作事件更新动画
	注：更新动画的原理：
	benchmarkAnimation：collada生成的对象的属性；
	获取当前所处的时间，计算更新的参数，进行更新，注意，这里更新时要去设置timeScale,否则会根据默认的timeScale去更新。默认timeScale为0.0001
	这样也就通过程序控制了xml文件的动画更新
	var current = currentChapter.benchmarkAnimation.currentTime;
	var length = currentChapter.benchmarkAnimation.data.length;
	var deltaFrameTime = 0;
	var deltaFrameTime = climp(deltaY, 0 - current, currentChapter.benchmarkAnimation.data.length - current);
	currentChapter.benchmarkAnimation.update(deltaFrameTime);
	for (var i = 0; i < currentChapter.kfAnimationsLength; ++i) {
	   if (current < currentChapter.kfAnimations[i].data.length) {
	      currentChapter.kfAnimations[i].currentTime = currentChapter.benchmarkAnimation.currentTime;
	      currentChapter.kfAnimations[i].update(0)
	   }
	}
	startAnimation();
	renderer.render(currentChapter.scene, currentChapter.camera)
	*/

	var jQuery = __webpack_require__(2);
	var THREE = __webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(44);
	jQuery.fn.momentus = function(cfg) {
	   var now = Date.now ||
	   function() {
	      return (new Date).valueOf()
	   }, start_point = {
	      x: 0,
	      y: 0
	   }, last_point = {
	      x: 0,
	      y: 0
	   }, current_coords = {
	      x: 0,
	      y: 0
	   }, last_coords = {
	      x: 0,
	      y: 0
	   }, velocity = {
	      x: 0,
	      y: 0
	   }, last_time = now(), inertia_time = last_time, mass = cfg.mass || 1e3, u = cfg.u || 4, wheel_ratio = cfg.wheelRatio || 1e3, mouse_ratio = cfg.mouseRatio || 20, touch_ratio = cfg.touchRatio || 2, on_change = cfg.onChange ||
	   function() {}, frame_rate = cfg.frameRate || 60;

	   function calculateVelocity(e) {
	      var time = now(),
	         delta_time = time - last_time,
	         vel_x = velocity.x + last_coords.x / delta_time / (e.pageX ? mouse_ratio : touch_ratio),
	         vel_y = velocity.y + last_coords.y / delta_time / (e.pageY ? mouse_ratio : touch_ratio);
	      vel_x = !isNaN(vel_x) ? vel_x : 0;
	      vel_y = !isNaN(vel_y) ? vel_y : 0;
	      return {
	         x: vel_x,
	         y: vel_y
	      }
	   }
	   var self = this;
	   $(this).on("mousedown touchstart", function(e) {
	      e.preventDefault();
	      var x = e.pageX || e.originalEvent.touches[0].pageX,
	         y = e.pageY || e.originalEvent.touches[0].pageY;
	      last_coords = {
	         x: 0,
	         y: 0
	      };
	      start_point = {
	         x: x,
	         y: y
	      };
	      velocity = {
	         x: 0,
	         y: 0
	      };
	      on_change(current_coords, velocity);
	      $("body").on("mousemove touchmove", function(e) {
	         e.preventDefault();
	         var vel = calculateVelocity(e);
	         last_time = now();
	         var x = e.pageX || e.originalEvent.touches[0].pageX,
	            y = e.pageY || e.originalEvent.touches[0].pageY,
	            delta_x = x - start_point.x,
	            delta_y = y - start_point.y;
	         last_point = start_point;
	         start_point = {
	            x: x,
	            y: y
	         };
	         last_coords.x = delta_x;
	         last_coords.y = delta_y;
	         current_coords.x += delta_x;
	         current_coords.y += delta_y;
	         on_change(current_coords, vel);
	         $(self).trigger("mousewheel")
	      });
	      $("body").on("mouseup touchend", function(e) {
	         velocity = calculateVelocity(e);
	         on_change(current_coords, velocity);
	         inertia_time = null;
	         $("body").off("mousemove touchmove mouseup touchend")
	      })
	   });
	   $(this).on("wheel mousewheel", function(e) {
	      if (velocity.x == 0 && velocity.y == 0) inertia_time = now();
	      var delta_x, delta_y;
	      if (e.originalEvent) {
	         delta_x = e.originalEvent.deltaX || 0, delta_y = e.originalEvent.deltaY || 0
	      } else {
	         delta_x = 0, delta_y = 0
	      }
	      velocity.x -= delta_x / wheel_ratio;
	      velocity.y -= delta_y / wheel_ratio
	   });
	   (function inertia() {
	      velocity.x = !isNaN(velocity.x) ? velocity.x : 0;
	      velocity.y = !isNaN(velocity.y) ? velocity.y : 0;
	      if (!inertia_time) {
	         inertia_time = now()
	      } else if (velocity.x != 0 || velocity.y != 0) {
	         var time = now(),
	            force_x = velocity.x * u,
	            force_y = velocity.y * u,
	            acc_x = force_x / mass,
	            acc_y = force_y / mass,
	            delta_time = time - inertia_time,
	            vel_x = velocity.x - acc_x * delta_time,
	            vel_y = velocity.y - acc_y * delta_time;
	         vel_x = !isNaN(vel_x) ? vel_x : 0;
	         vel_y = !isNaN(vel_y) ? vel_y : 0;
	         velocity.x = vel_x;
	         velocity.y = vel_y;
	         var delta_x = vel_x * delta_time,
	            delta_y = vel_y * delta_time;
	         last_coords.x = current_coords.x;
	         last_coords.y = current_coords.y;
	         current_coords.x += delta_x;
	         current_coords.y += delta_y;
	         inertia_time = time;
	         on_change(current_coords, velocity)
	      }
	      if (window.requestAnimationFrame) {
	         requestAnimationFrame(inertia)
	      } else {
	         setTimeout(inertia, 1e3 / frame_rate)
	      }
	   })();
	   return this
	};

	var gngs_dict = {
	   "材质.35": "liuchuanfeng-b.png",
	   "材质.34": "liuchuanfeng-a.png",
	   "材质.33": "yingmu-a.png",
	   "材质.32": "liuchuanfeng-b.png",
	   "材质.31": "chimu-a.png",
	   "材质.30": "chimu-b.png",
	   "材质.29": "yingmu-b.png",
	   "材质.2": "basketball.png",
	   "材质.28": "bj6.png",
	   "材质.27": "bj5.png",
	   "材质.26": "bj4.png",
	   "材质.25": "bj3.png",
	   "材质.24": "bj2.png",
	   "材质.23": "bj1.png",
	   "材质.22": "lcb2.png",
	   "材质.21": "lcb1.png",
	   "材质.20": "cms.png",
	   "材质.19": "liuchuangfeng-qiu.png",
	   "材质.18": "7.png",
	   "材质.17": "6.png",
	   "材质.16": "5_1.png",
	   "材质.15": "4_1.png",
	   "材质.14": "3.png",
	   "材质.13": "1_1.png",
	   "材质.12": "yingmuq.png",
	   "材质.11": "sanjing.png",
	   "材质.10": "sanbei2.png",
	   "材质.9": "sanbei1.png",
	   "材质.8": "cmq.png",
	   "材质.7": "篮球后直线背景.png",
	   "材质.6": "gb3.png",
	   "材质.5": "gb2.png",
	   "材质.4": "gb1.png",
	   "材质.3": "gc.png",
	   "材质.1": "2_1.png"
	};
	var chapter = {
	   model_path: "http://img5.cache.netease.com/utf8/3g/kfa-swiper/events/childrens-day-2017/asset/gngs.js",
	   texture_path: "http://img5.cache.netease.com/utf8/3g/kfa-swiper/events/childrens-day-2017/asset/texture/gngs/",
	   audio_file: "http://c.m.163.com/nc/qa/activity/kfa-swiper/events/childrens-day-2017/asset/mp3/gngs_bgm.mp3",
	   texture_dict: gngs_dict,
	   camera_fov: 80,
	   camera_far: 8e3,
	   bgcolor: 15658734,
	   length: 24
	}
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var defaultCameraFov = 70;
	var defaultCameraNear = 10;
	var defaultCameraFar = 6e3;
	var renderer;
	var currentChapter = null;
	var currentChapterIndex = chapterIndex = 0;
	var loader = new THREE.ColladaLoader;
	var wrapper = document.getElementById("kfa-wrapper");
	var timeStampControl = false;
	var timeScale = 1.2;
	var createScollSensor = function(wrapper) {
	   var scrollSensor = document.createElement("div");
	   if (!wrapper) wrapper = document.body;
	   scrollSensor.className = "kfa-scroll-sensor";
	   scrollSensor.style.cssText = "position:absolute;width:100%;height:100%;z-index:2;top:0";
	   wrapper.appendChild(scrollSensor);
	   return scrollSensor
	};
	var progressCallback = function(innerChapterIndex, progress){
	   /*if (chapterIndex === 0) {
	      if (progress < 5 && progress > .5) {
	         msgop.fadeOut()
	      } else if (progress < .5) {
	         msgop.fadeIn()
	      }
	   } else if (chapterIndex === 4) {
	      if (progress > 4 && progress < 7.6) {
	         msgmsn.fadeIn()
	      } else {
	         msgmsn.fadeOut()
	      }
	   }
	   if (progress > edtime) {
	      edlay.fadeIn(600)
	   } else {
	      edlay.fadeOut(600)
	   }*/
	}
	var textureLoadingCallback = function(item, loaded, total) {}
	var scrollCallback = function(deltaY){}
	var scrollSensor = createScollSensor();
	function initRenderer(callback) {
	   container = document.createElement("div");
	   wrapper.appendChild(container);
	   container.className = "chapter";
	   renderer = new THREE.WebGLRenderer({
	      antialias: true,
	      alpha: true,
	      logarithmicDepthBuffer: true
	   });
	   //renderer.setPixelRatio(window.devicePixelRatio);
	   renderer.setSize(window.innerWidth, window.innerHeight);
	   
	   container.appendChild(renderer.domElement);
	   if (callback) callback.call()
	}
	function init() {
	   initRenderer();
	   loadModel(chapter, function() {
	      self.currentChapter = currentChapter = chapter;
	      if (currentChapter.bgcolor !== undefined) {
	         renderer.setClearColor(currentChapter.bgcolor, 1)
	      }
	      initScene(chapter, function() {
	         window.scene = currentChapter.scene;
	         start();
	         bindEventListeners();
	      })
	   });
	}

	function isMobile() {
	   var isMob = false;
	   if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMob = true;
	   return isMob
	}
	function getParam(progress) {
	   //console.log('=======', progress);
	   var isMob = isMobile();
	   var isOpera = !! window.opr && !! opr.addons || !! window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
	   var isFirefox = typeof InstallTrigger !== "undefined";
	   var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0;
	   var isIE = false || !! document.documentMode;
	   var isEdge = !isIE && !! window.StyleMedia;
	   var isChrome = !! window.chrome && !! window.chrome.webstore;
	   var isBlink = (isChrome || isOpera) && !! window.CSS;
	   if (!isMob) {
	      if (isFirefox) {
	         return progress.toFixed(2) * -.1
	      }
	      return progress.toFixed(2) * -.01
	   } else {
	      //console.log('-----', progress);
	      if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
	         return progress.toFixed(2) * -.005
	      }
	      return progress.toFixed(2) * -.01
	   }
	}
	function initScene(chapter, callback) {
	   var scene = new THREE.Scene;
	   chapter.kfAnimations = [];
	   var longestAnimationLength = 0;
	   for (var i = 0; i < chapter.kfAnimationsLength; ++i) {
	      var animation = chapter.animations[i];
	      var kfAnimation = new THREE.KeyFrameAnimation(animation);
	      kfAnimation.loop = false;
	      kfAnimation.timeScale = timeScale;
	      chapter.kfAnimations.push(kfAnimation);
	      if (animation.length > longestAnimationLength) {
	         //console.log(kfAnimation)
	         chapter.benchmarkAnimation = kfAnimation;
	         longestAnimationLength = animation.length
	      }
	   }
	   scene.add(chapter.model);
	   var light = new THREE.AmbientLight(16777215);
	   light.name = "scene-ambient-light";
	   scene.add(light);
	   chapter.model.traverse(function(child) {
	      if (child instanceof THREE.PerspectiveCamera) {
	         var camera = child;
	         camera.fov = chapter.camera_fov || defaultCameraFov;
	         camera.far = chapter.camera_far || defaultCameraFar;
	         camera.near = chapter.camera_near || defaultCameraNear;
	         chapter.camera = camera;
	         camera.aspect = windowHalfX / windowHalfY;
	         camera.updateProjectionMatrix()
	      }
	   });
	   if (chapter.camera === undefined) {
	      chapter.camera = new THREE.PerspectiveCamera(chapter.camera_fov, window.innerWidth / window.innerHeight, chapter.camera_near, chapter.camera_far);
	      chapter.camera.name = "mycamera"
	   }
	   chapter.scene = scene;
	   if (callback) callback.call()
	}
	function start() {
	   for (var i = 0; i < currentChapter.kfAnimationsLength; ++i) {
	      var animation = currentChapter.kfAnimations[i];
	      for (var h = 0, hl = animation.hierarchy.length; h < hl; h++) {
	         var keys = animation.data.hierarchy[h].keys;
	         var sids = animation.data.hierarchy[h].sids;
	         var obj = animation.hierarchy[h];
	         if (keys.length && sids) {
	            for (var s = 0; s < sids.length; s++) {
	               var sid = sids[s];
	               var next = animation.getNextKeyWith(sid, h, 0);
	               if (next) next.apply(sid)
	            }
	            obj.matrixAutoUpdate = false;
	            animation.data.hierarchy[h].node.updateMatrix();
	            obj.matrixWorldNeedsUpdate = true
	         }
	      }
	      animation.play()
	   }
	   update(0)
	}
	function climp(n, min, max) {
	   if (n < min) {
	      return min
	   } else if (n > max) {
	      return max
	   } else {
	      return n
	   }
	}
	function update(deltaY) {
	   if (Math.abs(deltaY) > 10) return;
	   var current = currentChapter.benchmarkAnimation.currentTime;
	   var length = currentChapter.benchmarkAnimation.data.length;
	   var deltaFrameTime = 0;
	   var deltaFrameTime = climp(deltaY, 0 - current, currentChapter.benchmarkAnimation.data.length - current);
	   currentChapter.benchmarkAnimation.update(deltaFrameTime);
	   for (var i = 0; i < currentChapter.kfAnimationsLength; ++i) {
	      if (current < currentChapter.kfAnimations[i].data.length) {
	         currentChapter.kfAnimations[i].currentTime = currentChapter.benchmarkAnimation.currentTime;
	         currentChapter.kfAnimations[i].update(0)
	      }
	   }
	   startAnimation();
	   renderer.render(currentChapter.scene, currentChapter.camera)
	}
	var initialized = false;
	var requestId;

	function loop() {
	   requestId = window.requestAnimationFrame(tempReq)
	}
	function startAnimation() {
	   if (!requestId && !initialized) {
	      initialized = true;
	      loop()
	   }
	}
	function stopAnimation() {
	   if (requestId) {
	      window.cancelAnimationFrame(requestId);
	      requestId = undefined
	   }
	}
	var tempReq = function() {
	      update(0);
	      loop()
	   };
	function bindEventListeners() {
	   var lastTimestamp = 0;
	   $(scrollSensor).momentus({
	      onChange: function(coords) {
	         stopAnimation();
	         var progress = coords.y - lastTimestamp;
	         var param = getParam(progress);
	         update(param);
	         if (scrollCallback) {
	            scrollCallback.call(window, coords.y)
	         }
	         if (progressCallback) {
	            progressCallback.call(window, currentChapterIndex, currentChapter.benchmarkAnimation.currentTime)
	         }
	         lastTimestamp = coords.y
	      }
	   })
	}
	function loadModel(chapter, callback) {

	   var self = this;
	   var modelPath = chapter.model_path;
	   var texturePath = chapter.texture_path;
	   var textureDict = chapter.texture_dict;
	   console.log(loader)
	   loader.load(modelPath, function(collada) {
	      var model = collada.scene;
	      chapter.animations = collada.animations;
	      chapter.kfAnimationsLength = collada.animations.length;
	      chapter.model = model;
	      model.scale.x = model.scale.y = model.scale.z = 1;
	      if (texturePath) {
	         var manager = new THREE.LoadingManager;
	         manager.onProgress = function(item, loaded, total) {
	            /*if (loadingText && loadedIndex === 0) {
	               percentage.innerText = 50 + parseInt(loaded / total * 100 / 2)
	            }*/
	            textureLoadingCallback.call(window, item, loaded, total)
	         };
	         var loader = new THREE.ImageLoader(manager);
	         loader.crossOrigin = true;
	         var children = collada.scene.children || [];
	         processArray(children);

	         function processArray(array) {

	            var forbiddenNames = ["Light", "Plane", "Camera", "Nullo"];
	            var transparent = [];
	            for (var i = 0; i < array.length; i++) {
	               var name = array[i].name.toLowerCase();
	               if ($.inArray(name, forbiddenNames) < 0) {
	                  var object = array[i];
	                  if (name.indexOf("group") > -1) {
	                     processArray(object.children || [])
	                  } else {
	                     if (name) {
	                        loadAlpha(name, object)
	                     }
	                  }
	               }
	               if ($.inArray(name, transparent) >= 0) {
	                  var object = model.getObjectByName(name, true)
	               }
	            }
	         }
	         function loadAlpha(name, object) {
	            var mesh = object.children[0];
	            if (mesh instanceof THREE.Mesh) {
	               var material = mesh.material;
	               var texture_img = textureDict[material.name];
	               if (!texture_img) return;
	               var file = texturePath + texture_img,
	                  alpha = new THREE.Texture;
	               material.map = alpha;
	               material.transparent = true;
	               material.side = THREE.DoubleSide;
	               loader.load(file, function(image) {
	                  alpha.image = image;
	                  alpha.needsUpdate = true
	               })
	            }
	         }
	      }
	      callback.call()
	   })
	}
	init();
	renderer = renderer;


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

	(function(l,ra){ true?ra(exports):"function"===typeof define&&define.amd?define(["exports"],ra):ra(l.THREE=l.THREE||{})})(this,function(l){function ra(){}function E(a,b){this.x=a||0;this.y=b||0}function da(a,b,c,d,e,f,g,h,k,m){Object.defineProperty(this,"id",{value:kf++});this.uuid=X.generateUUID();this.name="";this.image=void 0!==a?a:da.DEFAULT_IMAGE;this.mipmaps=[];this.mapping=void 0!==b?b:da.DEFAULT_MAPPING;this.wrapS=void 0!==c?c:1001;this.wrapT=
	void 0!==d?d:1001;this.magFilter=void 0!==e?e:1006;this.minFilter=void 0!==f?f:1008;this.anisotropy=void 0!==k?k:1;this.format=void 0!==g?g:1023;this.type=void 0!==h?h:1009;this.offset=new E(0,0);this.repeat=new E(1,1);this.generateMipmaps=!0;this.premultiplyAlpha=!1;this.flipY=!0;this.unpackAlignment=4;this.encoding=void 0!==m?m:3E3;this.version=0;this.onUpdate=null}function ha(a,b,c,d){this.x=a||0;this.y=b||0;this.z=c||0;this.w=void 0!==d?d:1}function Db(a,b,c){this.uuid=X.generateUUID();this.width=
	a;this.height=b;this.scissor=new ha(0,0,a,b);this.scissorTest=!1;this.viewport=new ha(0,0,a,b);c=c||{};void 0===c.minFilter&&(c.minFilter=1006);this.texture=new da(void 0,void 0,c.wrapS,c.wrapT,c.magFilter,c.minFilter,c.format,c.type,c.anisotropy,c.encoding);this.depthBuffer=void 0!==c.depthBuffer?c.depthBuffer:!0;this.stencilBuffer=void 0!==c.stencilBuffer?c.stencilBuffer:!0;this.depthTexture=void 0!==c.depthTexture?c.depthTexture:null}function Eb(a,b,c){Db.call(this,a,b,c);this.activeMipMapLevel=
	this.activeCubeFace=0}function pa(a,b,c,d){this._x=a||0;this._y=b||0;this._z=c||0;this._w=void 0!==d?d:1}function p(a,b,c){this.x=a||0;this.y=b||0;this.z=c||0}function J(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];0<arguments.length&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}function eb(a,b,c,d,e,f,g,h,k,m,u,q){da.call(this,null,f,g,h,k,m,d,e,u,q);this.image={data:a,width:b,height:c};this.magFilter=void 0!==k?k:1003;this.minFilter=void 0!==
	m?m:1003;this.flipY=this.generateMipmaps=!1;this.unpackAlignment=1}function Za(a,b,c,d,e,f,g,h,k,m){a=void 0!==a?a:[];da.call(this,a,void 0!==b?b:301,c,d,e,f,g,h,k,m);this.flipY=!1}function Fb(a,b,c){var d=a[0];if(0>=d||0<d)return a;var e=b*c,f=ye[e];void 0===f&&(f=new Float32Array(e),ye[e]=f);if(0!==b)for(d.toArray(f,0),d=1,e=0;d!==b;++d)e+=c,a[d].toArray(f,e);return f}function ze(a,b){var c=Ae[b];void 0===c&&(c=new Int32Array(b),Ae[b]=c);for(var d=0;d!==b;++d)c[d]=a.allocTextureUnit();return c}
	function lf(a,b){a.uniform1f(this.addr,b)}function mf(a,b){a.uniform1i(this.addr,b)}function nf(a,b){void 0===b.x?a.uniform2fv(this.addr,b):a.uniform2f(this.addr,b.x,b.y)}function of(a,b){void 0!==b.x?a.uniform3f(this.addr,b.x,b.y,b.z):void 0!==b.r?a.uniform3f(this.addr,b.r,b.g,b.b):a.uniform3fv(this.addr,b)}function pf(a,b){void 0===b.x?a.uniform4fv(this.addr,b):a.uniform4f(this.addr,b.x,b.y,b.z,b.w)}function qf(a,b){a.uniformMatrix2fv(this.addr,!1,b.elements||b)}function rf(a,b){void 0===b.elements?
	a.uniformMatrix3fv(this.addr,!1,b):(Be.set(b.elements),a.uniformMatrix3fv(this.addr,!1,Be))}function sf(a,b){void 0===b.elements?a.uniformMatrix4fv(this.addr,!1,b):(Ce.set(b.elements),a.uniformMatrix4fv(this.addr,!1,Ce))}function tf(a,b,c){var d=c.allocTextureUnit();a.uniform1i(this.addr,d);c.setTexture2D(b||De,d)}function uf(a,b,c){var d=c.allocTextureUnit();a.uniform1i(this.addr,d);c.setTextureCube(b||Ee,d)}function Fe(a,b){a.uniform2iv(this.addr,b)}function Ge(a,b){a.uniform3iv(this.addr,b)}function He(a,
	b){a.uniform4iv(this.addr,b)}function vf(a){switch(a){case 5126:return lf;case 35664:return nf;case 35665:return of;case 35666:return pf;case 35674:return qf;case 35675:return rf;case 35676:return sf;case 35678:return tf;case 35680:return uf;case 5124:case 35670:return mf;case 35667:case 35671:return Fe;case 35668:case 35672:return Ge;case 35669:case 35673:return He}}function wf(a,b){a.uniform1fv(this.addr,b)}function xf(a,b){a.uniform1iv(this.addr,b)}function yf(a,b){a.uniform2fv(this.addr,Fb(b,
	this.size,2))}function zf(a,b){a.uniform3fv(this.addr,Fb(b,this.size,3))}function Af(a,b){a.uniform4fv(this.addr,Fb(b,this.size,4))}function Bf(a,b){a.uniformMatrix2fv(this.addr,!1,Fb(b,this.size,4))}function Cf(a,b){a.uniformMatrix3fv(this.addr,!1,Fb(b,this.size,9))}function Df(a,b){a.uniformMatrix4fv(this.addr,!1,Fb(b,this.size,16))}function Ef(a,b,c){var d=b.length,e=ze(c,d);a.uniform1iv(this.addr,e);for(a=0;a!==d;++a)c.setTexture2D(b[a]||De,e[a])}function Ff(a,b,c){var d=b.length,e=ze(c,d);a.uniform1iv(this.addr,
	e);for(a=0;a!==d;++a)c.setTextureCube(b[a]||Ee,e[a])}function Gf(a){switch(a){case 5126:return wf;case 35664:return yf;case 35665:return zf;case 35666:return Af;case 35674:return Bf;case 35675:return Cf;case 35676:return Df;case 35678:return Ef;case 35680:return Ff;case 5124:case 35670:return xf;case 35667:case 35671:return Fe;case 35668:case 35672:return Ge;case 35669:case 35673:return He}}function Hf(a,b,c){this.id=a;this.addr=c;this.setValue=vf(b.type)}function If(a,b,c){this.id=a;this.addr=c;
	this.size=b.size;this.setValue=Gf(b.type)}function Ie(a){this.id=a;this.seq=[];this.map={}}function fb(a,b,c){this.seq=[];this.map={};this.renderer=c;c=a.getProgramParameter(b,a.ACTIVE_UNIFORMS);for(var d=0;d<c;++d){var e=a.getActiveUniform(b,d),f=a.getUniformLocation(b,e.name),g=this,h=e.name,k=h.length;for(Qd.lastIndex=0;;){var m=Qd.exec(h),u=Qd.lastIndex,q=m[1],n=m[3];"]"===m[2]&&(q|=0);if(void 0===n||"["===n&&u+2===k){h=g;e=void 0===n?new Hf(q,e,f):new If(q,e,f);h.seq.push(e);h.map[e.id]=e;break}else n=
	g.map[q],void 0===n&&(n=new Ie(q),q=g,g=n,q.seq.push(g),q.map[g.id]=g),g=n}}}function G(a,b,c){return void 0===b&&void 0===c?this.set(a):this.setRGB(a,b,c)}function id(a,b){this.min=void 0!==a?a:new E(Infinity,Infinity);this.max=void 0!==b?b:new E(-Infinity,-Infinity)}function Jf(a,b){var c,d,e,f,g,h,k,m,u,q,n=a.context,t=a.state,l,r,y,x,v,H;this.render=function(w,S,W){if(0!==b.length){w=new p;var D=W.w/W.z,F=.5*W.z,aa=.5*W.w,N=16/W.w,ca=new E(N*D,N),la=new p(1,1,0),gb=new E(1,1),Gb=new id;Gb.min.set(W.x,
	W.y);Gb.max.set(W.x+(W.z-16),W.y+(W.w-16));if(void 0===x){var N=new Float32Array([-1,-1,0,0,1,-1,1,0,1,1,1,1,-1,1,0,1]),ka=new Uint16Array([0,1,2,0,2,3]);l=n.createBuffer();r=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,l);n.bufferData(n.ARRAY_BUFFER,N,n.STATIC_DRAW);n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,r);n.bufferData(n.ELEMENT_ARRAY_BUFFER,ka,n.STATIC_DRAW);v=n.createTexture();H=n.createTexture();t.bindTexture(n.TEXTURE_2D,v);n.texImage2D(n.TEXTURE_2D,0,n.RGB,16,16,0,n.RGB,n.UNSIGNED_BYTE,null);
	n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE);n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE);n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST);n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST);t.bindTexture(n.TEXTURE_2D,H);n.texImage2D(n.TEXTURE_2D,0,n.RGBA,16,16,0,n.RGBA,n.UNSIGNED_BYTE,null);n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE);n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE);n.texParameteri(n.TEXTURE_2D,
	n.TEXTURE_MAG_FILTER,n.NEAREST);n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST);var N=y={vertexShader:"uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif ( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility =        visibility.r / 9.0;\nvVisibility *= 1.0 - visibility.g / 9.0;\nvVisibility *=       visibility.b / 9.0;\nvVisibility *= 1.0 - visibility.a / 9.0;\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
	fragmentShader:"uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif ( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if ( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"},ka=n.createProgram(),Q=n.createShader(n.FRAGMENT_SHADER),
	K=n.createShader(n.VERTEX_SHADER),V="precision "+a.getPrecision()+" float;\n";n.shaderSource(Q,V+N.fragmentShader);n.shaderSource(K,V+N.vertexShader);n.compileShader(Q);n.compileShader(K);n.attachShader(ka,Q);n.attachShader(ka,K);n.linkProgram(ka);x=ka;u=n.getAttribLocation(x,"position");q=n.getAttribLocation(x,"uv");c=n.getUniformLocation(x,"renderType");d=n.getUniformLocation(x,"map");e=n.getUniformLocation(x,"occlusionMap");f=n.getUniformLocation(x,"opacity");g=n.getUniformLocation(x,"color");
	h=n.getUniformLocation(x,"scale");k=n.getUniformLocation(x,"rotation");m=n.getUniformLocation(x,"screenPosition")}n.useProgram(x);t.initAttributes();t.enableAttribute(u);t.enableAttribute(q);t.disableUnusedAttributes();n.uniform1i(e,0);n.uniform1i(d,1);n.bindBuffer(n.ARRAY_BUFFER,l);n.vertexAttribPointer(u,2,n.FLOAT,!1,16,0);n.vertexAttribPointer(q,2,n.FLOAT,!1,16,8);n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,r);t.disable(n.CULL_FACE);t.buffers.depth.setMask(!1);ka=0;for(Q=b.length;ka<Q;ka++)if(N=16/W.w,
	ca.set(N*D,N),K=b[ka],w.set(K.matrixWorld.elements[12],K.matrixWorld.elements[13],K.matrixWorld.elements[14]),w.applyMatrix4(S.matrixWorldInverse),w.applyMatrix4(S.projectionMatrix),la.copy(w),gb.x=W.x+la.x*F+F-8,gb.y=W.y+la.y*aa+aa-8,!0===Gb.containsPoint(gb)){t.activeTexture(n.TEXTURE0);t.bindTexture(n.TEXTURE_2D,null);t.activeTexture(n.TEXTURE1);t.bindTexture(n.TEXTURE_2D,v);n.copyTexImage2D(n.TEXTURE_2D,0,n.RGB,gb.x,gb.y,16,16,0);n.uniform1i(c,0);n.uniform2f(h,ca.x,ca.y);n.uniform3f(m,la.x,la.y,
	la.z);t.disable(n.BLEND);t.enable(n.DEPTH_TEST);n.drawElements(n.TRIANGLES,6,n.UNSIGNED_SHORT,0);t.activeTexture(n.TEXTURE0);t.bindTexture(n.TEXTURE_2D,H);n.copyTexImage2D(n.TEXTURE_2D,0,n.RGBA,gb.x,gb.y,16,16,0);n.uniform1i(c,1);t.disable(n.DEPTH_TEST);t.activeTexture(n.TEXTURE1);t.bindTexture(n.TEXTURE_2D,v);n.drawElements(n.TRIANGLES,6,n.UNSIGNED_SHORT,0);K.positionScreen.copy(la);K.customUpdateCallback?K.customUpdateCallback(K):K.updateLensFlares();n.uniform1i(c,2);t.enable(n.BLEND);for(var V=
	0,ba=K.lensFlares.length;V<ba;V++){var R=K.lensFlares[V];.001<R.opacity&&.001<R.scale&&(la.x=R.x,la.y=R.y,la.z=R.z,N=R.size*R.scale/W.w,ca.x=N*D,ca.y=N,n.uniform3f(m,la.x,la.y,la.z),n.uniform2f(h,ca.x,ca.y),n.uniform1f(k,R.rotation),n.uniform1f(f,R.opacity),n.uniform3f(g,R.color.r,R.color.g,R.color.b),t.setBlending(R.blending,R.blendEquation,R.blendSrc,R.blendDst),a.setTexture2D(R.texture,1),n.drawElements(n.TRIANGLES,6,n.UNSIGNED_SHORT,0))}}t.enable(n.CULL_FACE);t.enable(n.DEPTH_TEST);t.buffers.depth.setMask(!0);
	a.resetGLState()}}}function Kf(a,b){var c,d,e,f,g,h,k,m,u,q,n,t,l,r,y,x,v;function H(a,b){return a.renderOrder!==b.renderOrder?a.renderOrder-b.renderOrder:a.z!==b.z?b.z-a.z:b.id-a.id}var w=a.context,S=a.state,W,D,F,aa,N=new p,ca=new pa,la=new p;this.render=function(p,Gb){if(0!==b.length){if(void 0===F){var ka=new Float32Array([-.5,-.5,0,0,.5,-.5,1,0,.5,.5,1,1,-.5,.5,0,1]),Q=new Uint16Array([0,1,2,0,2,3]);W=w.createBuffer();D=w.createBuffer();w.bindBuffer(w.ARRAY_BUFFER,W);w.bufferData(w.ARRAY_BUFFER,
	ka,w.STATIC_DRAW);w.bindBuffer(w.ELEMENT_ARRAY_BUFFER,D);w.bufferData(w.ELEMENT_ARRAY_BUFFER,Q,w.STATIC_DRAW);var ka=w.createProgram(),Q=w.createShader(w.VERTEX_SHADER),K=w.createShader(w.FRAGMENT_SHADER);w.shaderSource(Q,["precision "+a.getPrecision()+" float;","uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position * scale;\nvec2 rotatedPosition;\nrotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\nrotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\nvec4 finalPosition;\nfinalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition;\nfinalPosition = projectionMatrix * finalPosition;\ngl_Position = finalPosition;\n}"].join("\n"));
	w.shaderSource(K,["precision "+a.getPrecision()+" float;","uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"].join("\n"));
	w.compileShader(Q);w.compileShader(K);w.attachShader(ka,Q);w.attachShader(ka,K);w.linkProgram(ka);F=ka;x=w.getAttribLocation(F,"position");v=w.getAttribLocation(F,"uv");c=w.getUniformLocation(F,"uvOffset");d=w.getUniformLocation(F,"uvScale");e=w.getUniformLocation(F,"rotation");f=w.getUniformLocation(F,"scale");g=w.getUniformLocation(F,"color");h=w.getUniformLocation(F,"map");k=w.getUniformLocation(F,"opacity");m=w.getUniformLocation(F,"modelViewMatrix");u=w.getUniformLocation(F,"projectionMatrix");
	q=w.getUniformLocation(F,"fogType");n=w.getUniformLocation(F,"fogDensity");t=w.getUniformLocation(F,"fogNear");l=w.getUniformLocation(F,"fogFar");r=w.getUniformLocation(F,"fogColor");y=w.getUniformLocation(F,"alphaTest");ka=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");ka.width=8;ka.height=8;Q=ka.getContext("2d");Q.fillStyle="white";Q.fillRect(0,0,8,8);aa=new da(ka);aa.needsUpdate=!0}w.useProgram(F);S.initAttributes();S.enableAttribute(x);S.enableAttribute(v);S.disableUnusedAttributes();
	S.disable(w.CULL_FACE);S.enable(w.BLEND);w.bindBuffer(w.ARRAY_BUFFER,W);w.vertexAttribPointer(x,2,w.FLOAT,!1,16,0);w.vertexAttribPointer(v,2,w.FLOAT,!1,16,8);w.bindBuffer(w.ELEMENT_ARRAY_BUFFER,D);w.uniformMatrix4fv(u,!1,Gb.projectionMatrix.elements);S.activeTexture(w.TEXTURE0);w.uniform1i(h,0);Q=ka=0;(K=p.fog)?(w.uniform3f(r,K.color.r,K.color.g,K.color.b),K.isFog?(w.uniform1f(t,K.near),w.uniform1f(l,K.far),w.uniform1i(q,1),Q=ka=1):K.isFogExp2&&(w.uniform1f(n,K.density),w.uniform1i(q,2),Q=ka=2)):
	(w.uniform1i(q,0),Q=ka=0);for(var K=0,V=b.length;K<V;K++){var ba=b[K];ba.modelViewMatrix.multiplyMatrices(Gb.matrixWorldInverse,ba.matrixWorld);ba.z=-ba.modelViewMatrix.elements[14]}b.sort(H);for(var R=[],K=0,V=b.length;K<V;K++){var ba=b[K],O=ba.material;!1!==O.visible&&(w.uniform1f(y,O.alphaTest),w.uniformMatrix4fv(m,!1,ba.modelViewMatrix.elements),ba.matrixWorld.decompose(N,ca,la),R[0]=la.x,R[1]=la.y,ba=0,p.fog&&O.fog&&(ba=Q),ka!==ba&&(w.uniform1i(q,ba),ka=ba),null!==O.map?(w.uniform2f(c,O.map.offset.x,
	O.map.offset.y),w.uniform2f(d,O.map.repeat.x,O.map.repeat.y)):(w.uniform2f(c,0,0),w.uniform2f(d,1,1)),w.uniform1f(k,O.opacity),w.uniform3f(g,O.color.r,O.color.g,O.color.b),w.uniform1f(e,O.rotation),w.uniform2fv(f,R),S.setBlending(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.premultipliedAlpha),S.buffers.depth.setTest(O.depthTest),S.buffers.depth.setMask(O.depthWrite),O.map?a.setTexture2D(O.map,0):a.setTexture2D(aa,0),w.drawElements(w.TRIANGLES,
	6,w.UNSIGNED_SHORT,0))}S.enable(w.CULL_FACE);a.resetGLState()}}}function Y(){Object.defineProperty(this,"id",{value:Lf++});this.uuid=X.generateUUID();this.name="";this.type="Material";this.lights=this.fog=!0;this.blending=1;this.side=0;this.shading=2;this.vertexColors=0;this.opacity=1;this.transparent=!1;this.blendSrc=204;this.blendDst=205;this.blendEquation=100;this.blendEquationAlpha=this.blendDstAlpha=this.blendSrcAlpha=null;this.depthFunc=3;this.depthWrite=this.depthTest=!0;this.clippingPlanes=
	null;this.clipShadows=this.clipIntersection=!1;this.colorWrite=!0;this.precision=null;this.polygonOffset=!1;this.polygonOffsetUnits=this.polygonOffsetFactor=0;this.dithering=!1;this.alphaTest=0;this.premultipliedAlpha=!1;this.overdraw=0;this.needsUpdate=this.visible=!0}function Da(a){Y.call(this);this.type="ShaderMaterial";this.defines={};this.uniforms={};this.vertexShader="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";this.fragmentShader="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
	this.linewidth=1;this.wireframe=!1;this.wireframeLinewidth=1;this.morphNormals=this.morphTargets=this.skinning=this.clipping=this.lights=this.fog=!1;this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1};this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]};this.index0AttributeName=void 0;void 0!==a&&(void 0!==a.attributes&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(a))}function $a(a){Y.call(this);
	this.type="MeshDepthMaterial";this.depthPacking=3200;this.morphTargets=this.skinning=!1;this.displacementMap=this.alphaMap=this.map=null;this.displacementScale=1;this.displacementBias=0;this.wireframe=!1;this.wireframeLinewidth=1;this.lights=this.fog=!1;this.setValues(a)}function Ta(a,b){this.min=void 0!==a?a:new p(Infinity,Infinity,Infinity);this.max=void 0!==b?b:new p(-Infinity,-Infinity,-Infinity)}function Ga(a,b){this.center=void 0!==a?a:new p;this.radius=void 0!==b?b:0}function Ka(){this.elements=
	[1,0,0,0,1,0,0,0,1];0<arguments.length&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}function va(a,b){this.normal=void 0!==a?a:new p(1,0,0);this.constant=void 0!==b?b:0}function jd(a,b,c,d,e,f){this.planes=[void 0!==a?a:new va,void 0!==b?b:new va,void 0!==c?c:new va,void 0!==d?d:new va,void 0!==e?e:new va,void 0!==f?f:new va]}function Je(a,b,c,d){function e(b,c,d,e){var f=b.geometry,g;g=r;var h=b.customDepthMaterial;d&&(g=y,h=b.customDistanceMaterial);
	h?g=h:(h=!1,c.morphTargets&&(f&&f.isBufferGeometry?h=f.morphAttributes&&f.morphAttributes.position&&0<f.morphAttributes.position.length:f&&f.isGeometry&&(h=f.morphTargets&&0<f.morphTargets.length)),b.isSkinnedMesh&&!1===c.skinning&&console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",b),b=b.isSkinnedMesh&&c.skinning,f=0,h&&(f|=1),b&&(f|=2),g=g[f]);a.localClippingEnabled&&!0===c.clipShadows&&0!==c.clippingPlanes.length&&(f=g.uuid,h=c.uuid,b=x[f],void 0===b&&(b=
	{},x[f]=b),f=b[h],void 0===f&&(f=g.clone(),b[h]=f),g=f);g.visible=c.visible;g.wireframe=c.wireframe;h=c.side;N.renderSingleSided&&2==h&&(h=0);N.renderReverseSided&&(0===h?h=1:1===h&&(h=0));g.side=h;g.clipShadows=c.clipShadows;g.clippingPlanes=c.clippingPlanes;g.wireframeLinewidth=c.wireframeLinewidth;g.linewidth=c.linewidth;d&&void 0!==g.uniforms.lightPos&&g.uniforms.lightPos.value.copy(e);return g}function f(b,d,g,h){if(!1!==b.visible){if(b.layers.test(d.layers)&&(b.isMesh||b.isLine||b.isPoints)&&
	b.castShadow&&(!b.frustumCulled||k.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,b.matrixWorld);var m=c.update(b),n=b.material;if(Array.isArray(n))for(var u=m.groups,q=0,t=u.length;q<t;q++){var x=u[q],v=n[x.materialIndex];v&&v.visible&&(v=e(b,v,h,l),a.renderBufferDirect(g,null,m,v,b,x))}else n.visible&&(v=e(b,n,h,l),a.renderBufferDirect(g,null,m,v,b,null))}b=b.children;m=0;for(n=b.length;m<n;m++)f(b[m],d,g,h)}}var g=a.context,h=a.state,k=new jd,m=new J,u=b.shadows,
	q=new E,n=new E(d.maxTextureSize,d.maxTextureSize),t=new p,l=new p,r=Array(4),y=Array(4),x={},v=[new p(1,0,0),new p(-1,0,0),new p(0,0,1),new p(0,0,-1),new p(0,1,0),new p(0,-1,0)],H=[new p(0,1,0),new p(0,1,0),new p(0,1,0),new p(0,1,0),new p(0,0,1),new p(0,0,-1)],w=[new ha,new ha,new ha,new ha,new ha,new ha];b=new $a;b.depthPacking=3201;b.clipping=!0;d=ab.distanceRGBA;for(var S=Ha.clone(d.uniforms),W=0;4!==W;++W){var D=0!==(W&1),F=0!==(W&2),aa=b.clone();aa.morphTargets=D;aa.skinning=F;r[W]=aa;D=new Da({defines:{USE_SHADOWMAP:""},
	uniforms:S,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,morphTargets:D,skinning:F,clipping:!0});y[W]=D}var N=this;this.enabled=!1;this.autoUpdate=!0;this.needsUpdate=!1;this.type=1;this.renderSingleSided=this.renderReverseSided=!0;this.render=function(b,c){if(!1!==N.enabled&&(!1!==N.autoUpdate||!1!==N.needsUpdate)&&0!==u.length){h.disable(g.BLEND);h.buffers.color.setClear(1,1,1,1);h.buffers.depth.setTest(!0);h.setScissorTest(!1);for(var d,e=0,x=u.length;e<x;e++){var r=u[e];d=r.shadow;
	var p=r&&r.isPointLight;if(void 0===d)console.warn("THREE.WebGLShadowMap:",r,"has no shadow.");else{var y=d.camera;q.copy(d.mapSize);q.min(n);if(p){var S=q.x,D=q.y;w[0].set(2*S,D,S,D);w[1].set(0,D,S,D);w[2].set(3*S,D,S,D);w[3].set(S,D,S,D);w[4].set(3*S,0,S,D);w[5].set(S,0,S,D);q.x*=4;q.y*=2}null===d.map&&(d.map=new Db(q.x,q.y,{minFilter:1003,magFilter:1003,format:1023}),d.map.texture.name=r.name+".shadowMap",y.updateProjectionMatrix());d.isSpotLightShadow&&d.update(r);S=d.map;D=d.matrix;l.setFromMatrixPosition(r.matrixWorld);
	y.position.copy(l);p?(d=6,D.makeTranslation(-l.x,-l.y,-l.z)):(d=1,t.setFromMatrixPosition(r.target.matrixWorld),y.lookAt(t),y.updateMatrixWorld(),D.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),D.multiply(y.projectionMatrix),D.multiply(y.matrixWorldInverse));a.setRenderTarget(S);a.clear();for(r=0;r<d;r++)p&&(t.copy(y.position),t.add(v[r]),y.up.copy(H[r]),y.lookAt(t),y.updateMatrixWorld(),h.viewport(w[r])),m.multiplyMatrices(y.projectionMatrix,y.matrixWorldInverse),k.setFromMatrix(m),f(b,c,y,p)}}e=a.getClearColor();
	x=a.getClearAlpha();a.setClearColor(e,x);N.needsUpdate=!1}}}function hb(a,b){this.origin=void 0!==a?a:new p;this.direction=void 0!==b?b:new p}function bb(a,b,c,d){this._x=a||0;this._y=b||0;this._z=c||0;this._order=d||bb.DefaultOrder}function Rd(){this.mask=1}function B(){Object.defineProperty(this,"id",{value:Mf++});this.uuid=X.generateUUID();this.name="";this.type="Object3D";this.parent=null;this.children=[];this.up=B.DefaultUp.clone();var a=new p,b=new bb,c=new pa,d=new p(1,1,1);b.onChange(function(){c.setFromEuler(b,
	!1)});c.onChange(function(){b.setFromQuaternion(c,void 0,!1)});Object.defineProperties(this,{position:{enumerable:!0,value:a},rotation:{enumerable:!0,value:b},quaternion:{enumerable:!0,value:c},scale:{enumerable:!0,value:d},modelViewMatrix:{value:new J},normalMatrix:{value:new Ka}});this.matrix=new J;this.matrixWorld=new J;this.matrixAutoUpdate=B.DefaultMatrixAutoUpdate;this.matrixWorldNeedsUpdate=!1;this.layers=new Rd;this.visible=!0;this.receiveShadow=this.castShadow=!1;this.frustumCulled=!0;this.renderOrder=
	0;this.userData={}}function Hb(a,b){this.start=void 0!==a?a:new p;this.end=void 0!==b?b:new p}function Ua(a,b,c){this.a=void 0!==a?a:new p;this.b=void 0!==b?b:new p;this.c=void 0!==c?c:new p}function Va(a,b,c,d,e,f){this.a=a;this.b=b;this.c=c;this.normal=d&&d.isVector3?d:new p;this.vertexNormals=Array.isArray(d)?d:[];this.color=e&&e.isColor?e:new G;this.vertexColors=Array.isArray(e)?e:[];this.materialIndex=void 0!==f?f:0}function Na(a){Y.call(this);this.type="MeshBasicMaterial";this.color=new G(16777215);
	this.lightMap=this.map=null;this.lightMapIntensity=1;this.aoMap=null;this.aoMapIntensity=1;this.envMap=this.alphaMap=this.specularMap=null;this.combine=0;this.reflectivity=1;this.refractionRatio=.98;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.lights=this.morphTargets=this.skinning=!1;this.setValues(a)}function L(a,b,c){if(Array.isArray(a))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.uuid=X.generateUUID();
	this.name="";this.array=a;this.itemSize=b;this.count=void 0!==a?a.length/b:0;this.normalized=!0===c;this.dynamic=!1;this.updateRange={offset:0,count:-1};this.onUploadCallback=function(){};this.version=0}function rc(a,b){L.call(this,new Int8Array(a),b)}function sc(a,b){L.call(this,new Uint8Array(a),b)}function tc(a,b){L.call(this,new Uint8ClampedArray(a),b)}function uc(a,b){L.call(this,new Int16Array(a),b)}function ib(a,b){L.call(this,new Uint16Array(a),b)}function vc(a,b){L.call(this,new Int32Array(a),
	b)}function jb(a,b){L.call(this,new Uint32Array(a),b)}function C(a,b){L.call(this,new Float32Array(a),b)}function wc(a,b){L.call(this,new Float64Array(a),b)}function Ke(){this.indices=[];this.vertices=[];this.normals=[];this.colors=[];this.uvs=[];this.uvs2=[];this.groups=[];this.morphTargets={};this.skinWeights=[];this.skinIndices=[];this.boundingSphere=this.boundingBox=null;this.groupsNeedUpdate=this.uvsNeedUpdate=this.colorsNeedUpdate=this.normalsNeedUpdate=this.verticesNeedUpdate=!1}function Sd(a){if(0===
	a.length)return-Infinity;for(var b=a[0],c=1,d=a.length;c<d;++c)a[c]>b&&(b=a[c]);return b}function M(){Object.defineProperty(this,"id",{value:Td++});this.uuid=X.generateUUID();this.name="";this.type="Geometry";this.vertices=[];this.colors=[];this.faces=[];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphNormals=[];this.skinWeights=[];this.skinIndices=[];this.lineDistances=[];this.boundingSphere=this.boundingBox=null;this.groupsNeedUpdate=this.lineDistancesNeedUpdate=this.colorsNeedUpdate=this.normalsNeedUpdate=
	this.uvsNeedUpdate=this.verticesNeedUpdate=this.elementsNeedUpdate=!1}function I(){Object.defineProperty(this,"id",{value:Td++});this.uuid=X.generateUUID();this.name="";this.type="BufferGeometry";this.index=null;this.attributes={};this.morphAttributes={};this.groups=[];this.boundingSphere=this.boundingBox=null;this.drawRange={start:0,count:Infinity}}function Ba(a,b){B.call(this);this.type="Mesh";this.geometry=void 0!==a?a:new I;this.material=void 0!==b?b:new Na({color:16777215*Math.random()});this.drawMode=
	0;this.updateMorphTargets()}function Ib(a,b,c,d,e,f){M.call(this);this.type="BoxGeometry";this.parameters={width:a,height:b,depth:c,widthSegments:d,heightSegments:e,depthSegments:f};this.fromBufferGeometry(new kb(a,b,c,d,e,f));this.mergeVertices()}function kb(a,b,c,d,e,f){function g(a,b,c,d,e,f,g,l,W,D,F){var aa=f/W,N=g/D,ca=f/2,la=g/2,E=l/2;g=W+1;var C=D+1,B=f=0,Q,K,V=new p;for(K=0;K<C;K++){var ba=K*N-la;for(Q=0;Q<g;Q++)V[a]=(Q*aa-ca)*d,V[b]=ba*e,V[c]=E,m.push(V.x,V.y,V.z),V[a]=0,V[b]=0,V[c]=0<l?
	1:-1,u.push(V.x,V.y,V.z),q.push(Q/W),q.push(1-K/D),f+=1}for(K=0;K<D;K++)for(Q=0;Q<W;Q++)a=n+Q+g*(K+1),b=n+(Q+1)+g*(K+1),c=n+(Q+1)+g*K,k.push(n+Q+g*K,a,c),k.push(a,b,c),B+=6;h.addGroup(t,B,F);t+=B;n+=f}I.call(this);this.type="BoxBufferGeometry";this.parameters={width:a,height:b,depth:c,widthSegments:d,heightSegments:e,depthSegments:f};var h=this;d=Math.floor(d)||1;e=Math.floor(e)||1;f=Math.floor(f)||1;var k=[],m=[],u=[],q=[],n=0,t=0;g("z","y","x",-1,-1,c,b,a,f,e,0);g("z","y","x",1,-1,c,b,-a,f,e,1);
	g("x","z","y",1,1,a,c,b,d,f,2);g("x","z","y",1,-1,a,c,-b,d,f,3);g("x","y","z",1,-1,a,b,c,d,e,4);g("x","y","z",-1,-1,a,b,-c,d,e,5);this.setIndex(k);this.addAttribute("position",new C(m,3));this.addAttribute("normal",new C(u,3));this.addAttribute("uv",new C(q,2))}function xc(a,b,c,d){M.call(this);this.type="PlaneGeometry";this.parameters={width:a,height:b,widthSegments:c,heightSegments:d};this.fromBufferGeometry(new lb(a,b,c,d));this.mergeVertices()}function lb(a,b,c,d){I.call(this);this.type="PlaneBufferGeometry";
	this.parameters={width:a,height:b,widthSegments:c,heightSegments:d};var e=a/2,f=b/2;c=Math.floor(c)||1;d=Math.floor(d)||1;var g=c+1,h=d+1,k=a/c,m=b/d,u=[],q=[],n=[],t=[];for(a=0;a<h;a++){var l=a*m-f;for(b=0;b<g;b++)q.push(b*k-e,-l,0),n.push(0,0,1),t.push(b/c),t.push(1-a/d)}for(a=0;a<d;a++)for(b=0;b<c;b++)e=b+g*(a+1),f=b+1+g*(a+1),h=b+1+g*a,u.push(b+g*a,e,h),u.push(e,f,h);this.setIndex(u);this.addAttribute("position",new C(q,3));this.addAttribute("normal",new C(n,3));this.addAttribute("uv",new C(t,
	2))}function Oa(){B.call(this);this.type="Camera";this.matrixWorldInverse=new J;this.projectionMatrix=new J}function wa(a,b,c,d){Oa.call(this);this.type="PerspectiveCamera";this.fov=void 0!==a?a:50;this.zoom=1;this.near=void 0!==c?c:.1;this.far=void 0!==d?d:2E3;this.focus=10;this.aspect=void 0!==b?b:1;this.view=null;this.filmGauge=35;this.filmOffset=0;this.updateProjectionMatrix()}function Jb(a,b,c,d,e,f){Oa.call(this);this.type="OrthographicCamera";this.zoom=1;this.view=null;this.left=a;this.right=
	b;this.top=c;this.bottom=d;this.near=void 0!==e?e:.1;this.far=void 0!==f?f:2E3;this.updateProjectionMatrix()}function Nf(a){var b={};return{get:function(a){a.isInterleavedBufferAttribute&&(a=a.data);return b[a.uuid]},remove:function(c){var d=b[c.uuid];d&&(a.deleteBuffer(d.buffer),delete b[c.uuid])},update:function(c,d){c.isInterleavedBufferAttribute&&(c=c.data);var e=b[c.uuid];if(void 0===e){var e=c.uuid,f=c,g=f.array,h=f.dynamic?a.DYNAMIC_DRAW:a.STATIC_DRAW,k=a.createBuffer();a.bindBuffer(d,k);a.bufferData(d,
	g,h);f.onUploadCallback();h=a.FLOAT;g instanceof Float32Array?h=a.FLOAT:g instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):g instanceof Uint16Array?h=a.UNSIGNED_SHORT:g instanceof Int16Array?h=a.SHORT:g instanceof Uint32Array?h=a.UNSIGNED_INT:g instanceof Int32Array?h=a.INT:g instanceof Int8Array?h=a.BYTE:g instanceof Uint8Array&&(h=a.UNSIGNED_BYTE);b[e]={buffer:k,type:h,bytesPerElement:g.BYTES_PER_ELEMENT,version:f.version}}else e.version<
	c.version&&(f=c,g=f.array,k=f.updateRange,a.bindBuffer(d,e.buffer),!1===f.dynamic?a.bufferData(d,g,a.STATIC_DRAW):-1===k.count?a.bufferSubData(d,0,g):0===k.count?console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually."):(a.bufferSubData(d,k.offset*g.BYTES_PER_ELEMENT,g.subarray(k.offset,k.offset+k.count)),k.count=0),e.version=c.version)}}}function Of(a,b){return a.renderOrder!==
	b.renderOrder?a.renderOrder-b.renderOrder:a.program&&b.program&&a.program!==b.program?a.program.id-b.program.id:a.material.id!==b.material.id?a.material.id-b.material.id:a.z!==b.z?a.z-b.z:a.id-b.id}function Pf(a,b){return a.renderOrder!==b.renderOrder?a.renderOrder-b.renderOrder:a.z!==b.z?b.z-a.z:a.id-b.id}function Qf(){var a=[],b=-1,c=[],d=-1;return{opaque:a,transparent:c,init:function(){d=b=-1},push:function(e,f,g,h,k){var m,u;g.transparent?(m=c,u=++d):(m=a,u=++b);(u=m[u])?(u.id=e.id,u.object=e,
	u.geometry=f,u.material=g,u.program=g.program,u.renderOrder=e.renderOrder,u.z=h,u.group=k):(u={id:e.id,object:e,geometry:f,material:g,program:g.program,renderOrder:e.renderOrder,z:h,group:k},m.push(u))},finish:function(){a.length=b+1;c.length=d+1},sort:function(){a.sort(Of);c.sort(Pf)}}}function Rf(){var a={};return{get:function(b,c){var d=b.id+","+c.id,e=a[d];void 0===e&&(e=new Qf,a[d]=e);return e},dispose:function(){a={}}}}function Sf(a,b,c){var d,e,f;this.setMode=function(a){d=a};this.setIndex=
	function(c){c.array instanceof Uint32Array&&b.get("OES_element_index_uint")?(e=a.UNSIGNED_INT,f=4):c.array instanceof Uint16Array?(e=a.UNSIGNED_SHORT,f=2):(e=a.UNSIGNED_BYTE,f=1)};this.render=function(b,h){a.drawElements(d,h,e,b*f);c.calls++;c.vertices+=h;d===a.TRIANGLES&&(c.faces+=h/3)};this.renderInstances=function(g,h,k){var m=b.get("ANGLE_instanced_arrays");null===m?console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays."):
	(m.drawElementsInstancedANGLE(d,k,e,h*f,g.maxInstancedCount),c.calls++,c.vertices+=k*g.maxInstancedCount,d===a.TRIANGLES&&(c.faces+=g.maxInstancedCount*k/3))}}function Tf(a,b,c){var d;this.setMode=function(a){d=a};this.render=function(b,f){a.drawArrays(d,b,f);c.calls++;c.vertices+=f;d===a.TRIANGLES&&(c.faces+=f/3)};this.renderInstances=function(e,f,g){var h=b.get("ANGLE_instanced_arrays");if(null===h)console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
	else{var k=e.attributes.position;k.isInterleavedBufferAttribute?(g=k.data.count,h.drawArraysInstancedANGLE(d,0,g,e.maxInstancedCount)):h.drawArraysInstancedANGLE(d,f,g,e.maxInstancedCount);c.calls++;c.vertices+=g*e.maxInstancedCount;d===a.TRIANGLES&&(c.faces+=e.maxInstancedCount*g/3)}}}function Uf(a,b,c){function d(a){a=a.target;var h=e[a.id];null!==h.index&&b.remove(h.index);for(var k in h.attributes)b.remove(h.attributes[k]);a.removeEventListener("dispose",d);delete e[a.id];if(k=f[a.id])b.remove(k),
	delete f[a.id];if(k=f[h.id])b.remove(k),delete f[h.id];c.geometries--}var e={},f={};return{get:function(a,b){var f=e[b.id];if(f)return f;b.addEventListener("dispose",d);b.isBufferGeometry?f=b:b.isGeometry&&(void 0===b._bufferGeometry&&(b._bufferGeometry=(new I).setFromObject(a)),f=b._bufferGeometry);e[b.id]=f;c.geometries++;return f},update:function(c){var d=c.index,e=c.attributes;null!==d&&b.update(d,a.ELEMENT_ARRAY_BUFFER);for(var f in e)b.update(e[f],a.ARRAY_BUFFER);c=c.morphAttributes;for(f in c)for(var d=
	c[f],e=0,u=d.length;e<u;e++)b.update(d[e],a.ARRAY_BUFFER)},getWireframeAttribute:function(c){var d=f[c.id];if(d)return d;var d=[],e=c.index,m=c.attributes;if(null!==e)for(var e=e.array,m=0,u=e.length;m<u;m+=3){var q=e[m+0],n=e[m+1],t=e[m+2];d.push(q,n,n,t,t,q)}else for(e=m.position.array,m=0,u=e.length/3-1;m<u;m+=3)q=m+0,n=m+1,t=m+2,d.push(q,n,n,t,t,q);d=new (65535<Sd(d)?jb:ib)(d,1);b.update(d,a.ELEMENT_ARRAY_BUFFER);return f[c.id]=d}}}function Vf(){var a={};return{get:function(b){if(void 0!==a[b.id])return a[b.id];
	var c;switch(b.type){case "DirectionalLight":c={direction:new p,color:new G,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new E};break;case "SpotLight":c={position:new p,direction:new p,color:new G,distance:0,coneCos:0,penumbraCos:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new E};break;case "PointLight":c={position:new p,color:new G,distance:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new E};break;case "HemisphereLight":c={direction:new p,skyColor:new G,
	groundColor:new G};break;case "RectAreaLight":c={color:new G,position:new p,halfWidth:new p,halfHeight:new p}}return a[b.id]=c}}}function Wf(a,b,c){var d={};return{update:function(a){var f=c.frame,g=a.geometry,h=b.get(a,g);d[h.id]!==f&&(g.isGeometry&&h.updateFromObject(a),b.update(h),d[h.id]=f);return h},clear:function(){d={}}}}function Xf(a){a=a.split("\n");for(var b=0;b<a.length;b++)a[b]=b+1+": "+a[b];return a.join("\n")}function Le(a,b,c){var d=a.createShader(b);a.shaderSource(d,c);a.compileShader(d);
	!1===a.getShaderParameter(d,a.COMPILE_STATUS)&&console.error("THREE.WebGLShader: Shader couldn't compile.");""!==a.getShaderInfoLog(d)&&console.warn("THREE.WebGLShader: gl.getShaderInfoLog()",b===a.VERTEX_SHADER?"vertex":"fragment",a.getShaderInfoLog(d),Xf(c));return d}function Me(a){switch(a){case 3E3:return["Linear","( value )"];case 3001:return["sRGB","( value )"];case 3002:return["RGBE","( value )"];case 3004:return["RGBM","( value, 7.0 )"];case 3005:return["RGBM","( value, 16.0 )"];case 3006:return["RGBD",
	"( value, 256.0 )"];case 3007:return["Gamma","( value, float( GAMMA_FACTOR ) )"];default:throw Error("unsupported encoding: "+a);}}function Ud(a,b){var c=Me(b);return"vec4 "+a+"( vec4 value ) { return "+c[0]+"ToLinear"+c[1]+"; }"}function Yf(a,b){var c=Me(b);return"vec4 "+a+"( vec4 value ) { return LinearTo"+c[0]+c[1]+"; }"}function Zf(a,b){var c;switch(b){case 1:c="Linear";break;case 2:c="Reinhard";break;case 3:c="Uncharted2";break;case 4:c="OptimizedCineon";break;default:throw Error("unsupported toneMapping: "+
	b);}return"vec3 "+a+"( vec3 color ) { return "+c+"ToneMapping( color ); }"}function $f(a,b,c){a=a||{};return[a.derivatives||b.envMapCubeUV||b.bumpMap||b.normalMap||b.flatShading?"#extension GL_OES_standard_derivatives : enable":"",(a.fragDepth||b.logarithmicDepthBuffer)&&c.get("EXT_frag_depth")?"#extension GL_EXT_frag_depth : enable":"",a.drawBuffers&&c.get("WEBGL_draw_buffers")?"#extension GL_EXT_draw_buffers : require":"",(a.shaderTextureLOD||b.envMap)&&c.get("EXT_shader_texture_lod")?"#extension GL_EXT_shader_texture_lod : enable":
	""].filter(yc).join("\n")}function ag(a){var b=[],c;for(c in a){var d=a[c];!1!==d&&b.push("#define "+c+" "+d)}return b.join("\n")}function yc(a){return""!==a}function Ne(a,b){return a.replace(/NUM_DIR_LIGHTS/g,b.numDirLights).replace(/NUM_SPOT_LIGHTS/g,b.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,b.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,b.numPointLights).replace(/NUM_HEMI_LIGHTS/g,b.numHemiLights)}function Vd(a){return a.replace(/^[ \t]*#include +<([\w\d.]+)>/gm,function(a,c){var d=T[c];
	if(void 0===d)throw Error("Can not resolve #include <"+c+">");return Vd(d)})}function Oe(a){return a.replace(/for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,function(a,c,d,e){a="";for(c=parseInt(c);c<parseInt(d);c++)a+=e.replace(/\[ i \]/g,"[ "+c+" ]");return a})}function bg(a,b,c,d){var e=a.context,f=c.extensions,g=c.defines,h=c.__webglShader.vertexShader,k=c.__webglShader.fragmentShader,m="SHADOWMAP_TYPE_BASIC";1===d.shadowMapType?m="SHADOWMAP_TYPE_PCF":2===d.shadowMapType&&
	(m="SHADOWMAP_TYPE_PCF_SOFT");var u="ENVMAP_TYPE_CUBE",q="ENVMAP_MODE_REFLECTION",n="ENVMAP_BLENDING_MULTIPLY";if(d.envMap){switch(c.envMap.mapping){case 301:case 302:u="ENVMAP_TYPE_CUBE";break;case 306:case 307:u="ENVMAP_TYPE_CUBE_UV";break;case 303:case 304:u="ENVMAP_TYPE_EQUIREC";break;case 305:u="ENVMAP_TYPE_SPHERE"}switch(c.envMap.mapping){case 302:case 304:q="ENVMAP_MODE_REFRACTION"}switch(c.combine){case 0:n="ENVMAP_BLENDING_MULTIPLY";break;case 1:n="ENVMAP_BLENDING_MIX";break;case 2:n="ENVMAP_BLENDING_ADD"}}var t=
	0<a.gammaFactor?a.gammaFactor:1,f=$f(f,d,a.extensions),l=ag(g),r=e.createProgram();c.isRawShaderMaterial?(g=[l,"\n"].filter(yc).join("\n"),m=[f,l,"\n"].filter(yc).join("\n")):(g=["precision "+d.precision+" float;","precision "+d.precision+" int;","#define SHADER_NAME "+c.__webglShader.name,l,d.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+t,"#define MAX_BONES "+d.maxBones,d.useFog&&d.fog?"#define USE_FOG":"",d.useFog&&d.fogExp?"#define FOG_EXP2":"",d.map?"#define USE_MAP":
	"",d.envMap?"#define USE_ENVMAP":"",d.envMap?"#define "+q:"",d.lightMap?"#define USE_LIGHTMAP":"",d.aoMap?"#define USE_AOMAP":"",d.emissiveMap?"#define USE_EMISSIVEMAP":"",d.bumpMap?"#define USE_BUMPMAP":"",d.normalMap?"#define USE_NORMALMAP":"",d.displacementMap&&d.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",d.specularMap?"#define USE_SPECULARMAP":"",d.roughnessMap?"#define USE_ROUGHNESSMAP":"",d.metalnessMap?"#define USE_METALNESSMAP":"",d.alphaMap?"#define USE_ALPHAMAP":"",d.vertexColors?
	"#define USE_COLOR":"",d.flatShading?"#define FLAT_SHADED":"",d.skinning?"#define USE_SKINNING":"",d.useVertexTexture?"#define BONE_TEXTURE":"",d.morphTargets?"#define USE_MORPHTARGETS":"",d.morphNormals&&!1===d.flatShading?"#define USE_MORPHNORMALS":"",d.doubleSided?"#define DOUBLE_SIDED":"",d.flipSided?"#define FLIP_SIDED":"","#define NUM_CLIPPING_PLANES "+d.numClippingPlanes,d.shadowMapEnabled?"#define USE_SHADOWMAP":"",d.shadowMapEnabled?"#define "+m:"",d.sizeAttenuation?"#define USE_SIZEATTENUATION":
	"",d.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",d.logarithmicDepthBuffer&&a.extensions.get("EXT_frag_depth")?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_COLOR","\tattribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","\tattribute vec3 morphTarget0;",
	"\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;",
	"#endif","\n"].filter(yc).join("\n"),m=[f,"precision "+d.precision+" float;","precision "+d.precision+" int;","#define SHADER_NAME "+c.__webglShader.name,l,d.alphaTest?"#define ALPHATEST "+d.alphaTest:"","#define GAMMA_FACTOR "+t,d.useFog&&d.fog?"#define USE_FOG":"",d.useFog&&d.fogExp?"#define FOG_EXP2":"",d.map?"#define USE_MAP":"",d.envMap?"#define USE_ENVMAP":"",d.envMap?"#define "+u:"",d.envMap?"#define "+q:"",d.envMap?"#define "+n:"",d.lightMap?"#define USE_LIGHTMAP":"",d.aoMap?"#define USE_AOMAP":
	"",d.emissiveMap?"#define USE_EMISSIVEMAP":"",d.bumpMap?"#define USE_BUMPMAP":"",d.normalMap?"#define USE_NORMALMAP":"",d.specularMap?"#define USE_SPECULARMAP":"",d.roughnessMap?"#define USE_ROUGHNESSMAP":"",d.metalnessMap?"#define USE_METALNESSMAP":"",d.alphaMap?"#define USE_ALPHAMAP":"",d.vertexColors?"#define USE_COLOR":"",d.gradientMap?"#define USE_GRADIENTMAP":"",d.flatShading?"#define FLAT_SHADED":"",d.doubleSided?"#define DOUBLE_SIDED":"",d.flipSided?"#define FLIP_SIDED":"","#define NUM_CLIPPING_PLANES "+
	d.numClippingPlanes,"#define UNION_CLIPPING_PLANES "+(d.numClippingPlanes-d.numClipIntersection),d.shadowMapEnabled?"#define USE_SHADOWMAP":"",d.shadowMapEnabled?"#define "+m:"",d.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",d.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",d.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",d.logarithmicDepthBuffer&&a.extensions.get("EXT_frag_depth")?"#define USE_LOGDEPTHBUF_EXT":"",d.envMap&&a.extensions.get("EXT_shader_texture_lod")?"#define TEXTURE_LOD_EXT":
	"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;",0!==d.toneMapping?"#define TONE_MAPPING":"",0!==d.toneMapping?T.tonemapping_pars_fragment:"",0!==d.toneMapping?Zf("toneMapping",d.toneMapping):"",d.dithering?"#define DITHERING":"",d.outputEncoding||d.mapEncoding||d.envMapEncoding||d.emissiveMapEncoding?T.encodings_pars_fragment:"",d.mapEncoding?Ud("mapTexelToLinear",d.mapEncoding):"",d.envMapEncoding?Ud("envMapTexelToLinear",d.envMapEncoding):"",d.emissiveMapEncoding?Ud("emissiveMapTexelToLinear",
	d.emissiveMapEncoding):"",d.outputEncoding?Yf("linearToOutputTexel",d.outputEncoding):"",d.depthPacking?"#define DEPTH_PACKING "+c.depthPacking:"","\n"].filter(yc).join("\n"));h=Vd(h);h=Ne(h,d);k=Vd(k);k=Ne(k,d);c.isShaderMaterial||(h=Oe(h),k=Oe(k));k=m+k;h=Le(e,e.VERTEX_SHADER,g+h);k=Le(e,e.FRAGMENT_SHADER,k);e.attachShader(r,h);e.attachShader(r,k);void 0!==c.index0AttributeName?e.bindAttribLocation(r,0,c.index0AttributeName):!0===d.morphTargets&&e.bindAttribLocation(r,0,"position");e.linkProgram(r);
	d=e.getProgramInfoLog(r);u=e.getShaderInfoLog(h);q=e.getShaderInfoLog(k);t=n=!0;if(!1===e.getProgramParameter(r,e.LINK_STATUS))n=!1,console.error("THREE.WebGLProgram: shader error: ",e.getError(),"gl.VALIDATE_STATUS",e.getProgramParameter(r,e.VALIDATE_STATUS),"gl.getProgramInfoLog",d,u,q);else if(""!==d)console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",d);else if(""===u||""===q)t=!1;t&&(this.diagnostics={runnable:n,material:c,programLog:d,vertexShader:{log:u,prefix:g},fragmentShader:{log:q,
	prefix:m}});e.deleteShader(h);e.deleteShader(k);var p;this.getUniforms=function(){void 0===p&&(p=new fb(e,r,a));return p};var x;this.getAttributes=function(){if(void 0===x){for(var a={},b=e.getProgramParameter(r,e.ACTIVE_ATTRIBUTES),c=0;c<b;c++){var d=e.getActiveAttrib(r,c).name;a[d]=e.getAttribLocation(r,d)}x=a}return x};this.destroy=function(){e.deleteProgram(r);this.program=void 0};Object.defineProperties(this,{uniforms:{get:function(){console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms().");
	return this.getUniforms()}},attributes:{get:function(){console.warn("THREE.WebGLProgram: .attributes is now .getAttributes().");return this.getAttributes()}}});this.id=cg++;this.code=b;this.usedTimes=1;this.program=r;this.vertexShader=h;this.fragmentShader=k;return this}function dg(a,b){function c(a,b){var c;a?a.isTexture?c=a.encoding:a.isWebGLRenderTarget&&(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),c=
	a.texture.encoding):c=3E3;3E3===c&&b&&(c=3007);return c}var d=[],e={MeshDepthMaterial:"depth",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"phong",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points"},f="precision supportsVertexTextures map mapEncoding envMap envMapMode envMapEncoding lightMap aoMap emissiveMap emissiveMapEncoding bumpMap normalMap displacementMap specularMap roughnessMap metalnessMap gradientMap alphaMap combine vertexColors fog useFog fogExp flatShading sizeAttenuation logarithmicDepthBuffer skinning maxBones useVertexTexture morphTargets morphNormals maxMorphTargets maxMorphNormals premultipliedAlpha numDirLights numPointLights numSpotLights numHemiLights numRectAreaLights shadowMapEnabled shadowMapType toneMapping physicallyCorrectLights alphaTest doubleSided flipSided numClippingPlanes numClipIntersection depthPacking dithering".split(" ");
	this.getParameters=function(d,f,k,m,u,q){var n=e[d.type],t;if(q.isSkinnedMesh)if(t=q.skeleton.bones,b.floatVertexTextures)t=1024;else{var l=Math.min(Math.floor((b.maxVertexUniforms-20)/4),t.length);l<t.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+t.length+" bones. This GPU supports "+l+"."),t=0):t=l}else t=0;l=a.getPrecision();null!==d.precision&&(l=b.getMaxPrecision(d.precision),l!==d.precision&&console.warn("THREE.WebGLProgram.getParameters:",d.precision,"not supported, using",l,"instead."));
	var r=a.getRenderTarget();return{shaderID:n,precision:l,supportsVertexTextures:b.vertexTextures,outputEncoding:c(r?r.texture:null,a.gammaOutput),map:!!d.map,mapEncoding:c(d.map,a.gammaInput),envMap:!!d.envMap,envMapMode:d.envMap&&d.envMap.mapping,envMapEncoding:c(d.envMap,a.gammaInput),envMapCubeUV:!!d.envMap&&(306===d.envMap.mapping||307===d.envMap.mapping),lightMap:!!d.lightMap,aoMap:!!d.aoMap,emissiveMap:!!d.emissiveMap,emissiveMapEncoding:c(d.emissiveMap,a.gammaInput),bumpMap:!!d.bumpMap,normalMap:!!d.normalMap,
	displacementMap:!!d.displacementMap,roughnessMap:!!d.roughnessMap,metalnessMap:!!d.metalnessMap,specularMap:!!d.specularMap,alphaMap:!!d.alphaMap,gradientMap:!!d.gradientMap,combine:d.combine,vertexColors:d.vertexColors,fog:!!k,useFog:d.fog,fogExp:k&&k.isFogExp2,flatShading:1===d.shading,sizeAttenuation:d.sizeAttenuation,logarithmicDepthBuffer:b.logarithmicDepthBuffer,skinning:d.skinning&&0<t,maxBones:t,useVertexTexture:b.floatVertexTextures,morphTargets:d.morphTargets,morphNormals:d.morphNormals,
	maxMorphTargets:a.maxMorphTargets,maxMorphNormals:a.maxMorphNormals,numDirLights:f.directional.length,numPointLights:f.point.length,numSpotLights:f.spot.length,numRectAreaLights:f.rectArea.length,numHemiLights:f.hemi.length,numClippingPlanes:m,numClipIntersection:u,dithering:d.dithering,shadowMapEnabled:a.shadowMap.enabled&&q.receiveShadow&&0<f.shadows.length,shadowMapType:a.shadowMap.type,toneMapping:a.toneMapping,physicallyCorrectLights:a.physicallyCorrectLights,premultipliedAlpha:d.premultipliedAlpha,
	alphaTest:d.alphaTest,doubleSided:2===d.side,flipSided:1===d.side,depthPacking:void 0!==d.depthPacking?d.depthPacking:!1}};this.getProgramCode=function(b,c){var d=[];c.shaderID?d.push(c.shaderID):(d.push(b.fragmentShader),d.push(b.vertexShader));if(void 0!==b.defines)for(var e in b.defines)d.push(e),d.push(b.defines[e]);for(e=0;e<f.length;e++)d.push(c[f[e]]);d.push(a.gammaOutput);return d.join()};this.acquireProgram=function(b,c,e){for(var f,u=0,q=d.length;u<q;u++){var n=d[u];if(n.code===e){f=n;++f.usedTimes;
	break}}void 0===f&&(f=new bg(a,e,b,c),d.push(f));return f};this.releaseProgram=function(a){if(0===--a.usedTimes){var b=d.indexOf(a);d[b]=d[d.length-1];d.pop();a.destroy()}};this.programs=d}function eg(a,b,c,d,e,f,g){function h(a,b){if(a.width>b||a.height>b){var c=b/Math.max(a.width,a.height),d=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");d.width=Math.floor(a.width*c);d.height=Math.floor(a.height*c);d.getContext("2d").drawImage(a,0,0,a.width,a.height,0,0,d.width,d.height);console.warn("THREE.WebGLRenderer: image is too big ("+
	a.width+"x"+a.height+"). Resized to "+d.width+"x"+d.height,a);return d}return a}function k(a){return X.isPowerOfTwo(a.width)&&X.isPowerOfTwo(a.height)}function m(b){return 1003===b||1004===b||1005===b?a.NEAREST:a.LINEAR}function u(b){b=b.target;b.removeEventListener("dispose",u);a:{var c=d.get(b);if(b.image&&c.__image__webglTextureCube)a.deleteTexture(c.__image__webglTextureCube);else{if(void 0===c.__webglInit)break a;a.deleteTexture(c.__webglTexture)}d.remove(b)}g.textures--}function q(b){b=b.target;
	b.removeEventListener("dispose",q);var c=d.get(b),e=d.get(b.texture);if(b){void 0!==e.__webglTexture&&a.deleteTexture(e.__webglTexture);b.depthTexture&&b.depthTexture.dispose();if(b.isWebGLRenderTargetCube)for(e=0;6>e;e++)a.deleteFramebuffer(c.__webglFramebuffer[e]),c.__webglDepthbuffer&&a.deleteRenderbuffer(c.__webglDepthbuffer[e]);else a.deleteFramebuffer(c.__webglFramebuffer),c.__webglDepthbuffer&&a.deleteRenderbuffer(c.__webglDepthbuffer);d.remove(b.texture);d.remove(b)}g.textures--}function n(b,
	m){var n=d.get(b);if(0<b.version&&n.__version!==b.version){var q=b.image;if(void 0===q)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined",b);else if(!1===q.complete)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete",b);else{void 0===n.__webglInit&&(n.__webglInit=!0,b.addEventListener("dispose",u),n.__webglTexture=a.createTexture(),g.textures++);c.activeTexture(a.TEXTURE0+m);c.bindTexture(a.TEXTURE_2D,n.__webglTexture);a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,
	b.flipY);a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha);a.pixelStorei(a.UNPACK_ALIGNMENT,b.unpackAlignment);var l=h(b.image,e.maxTextureSize);if((1001!==b.wrapS||1001!==b.wrapT||1003!==b.minFilter&&1006!==b.minFilter)&&!1===k(l))if(q=l,q instanceof HTMLImageElement||q instanceof HTMLCanvasElement){var r=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");r.width=X.nearestPowerOfTwo(q.width);r.height=X.nearestPowerOfTwo(q.height);r.getContext("2d").drawImage(q,0,0,
	r.width,r.height);console.warn("THREE.WebGLRenderer: image is not power of two ("+q.width+"x"+q.height+"). Resized to "+r.width+"x"+r.height,q);l=r}else l=q;var q=k(l),r=f(b.format),z=f(b.type);t(a.TEXTURE_2D,b,q);var F=b.mipmaps;if(b.isDepthTexture){F=a.DEPTH_COMPONENT;if(1015===b.type){if(!p)throw Error("Float Depth Texture only supported in WebGL2.0");F=a.DEPTH_COMPONENT32F}else p&&(F=a.DEPTH_COMPONENT16);1026===b.format&&F===a.DEPTH_COMPONENT&&1012!==b.type&&1014!==b.type&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),
	b.type=1012,z=f(b.type));1027===b.format&&(F=a.DEPTH_STENCIL,1020!==b.type&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=1020,z=f(b.type)));c.texImage2D(a.TEXTURE_2D,0,F,l.width,l.height,0,r,z,null)}else if(b.isDataTexture)if(0<F.length&&q){for(var aa=0,N=F.length;aa<N;aa++)l=F[aa],c.texImage2D(a.TEXTURE_2D,aa,r,l.width,l.height,0,r,z,l.data);b.generateMipmaps=!1}else c.texImage2D(a.TEXTURE_2D,0,r,l.width,l.height,0,r,z,l.data);else if(b.isCompressedTexture)for(aa=
	0,N=F.length;aa<N;aa++)l=F[aa],1023!==b.format&&1022!==b.format?-1<c.getCompressedTextureFormats().indexOf(r)?c.compressedTexImage2D(a.TEXTURE_2D,aa,r,l.width,l.height,0,l.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):c.texImage2D(a.TEXTURE_2D,aa,r,l.width,l.height,0,r,z,l.data);else if(0<F.length&&q){aa=0;for(N=F.length;aa<N;aa++)l=F[aa],c.texImage2D(a.TEXTURE_2D,aa,r,r,z,l);b.generateMipmaps=!1}else c.texImage2D(a.TEXTURE_2D,
	0,r,r,z,l);b.generateMipmaps&&q&&a.generateMipmap(a.TEXTURE_2D);n.__version=b.version;if(b.onUpdate)b.onUpdate(b);return}}c.activeTexture(a.TEXTURE0+m);c.bindTexture(a.TEXTURE_2D,n.__webglTexture)}function t(c,g,h){h?(a.texParameteri(c,a.TEXTURE_WRAP_S,f(g.wrapS)),a.texParameteri(c,a.TEXTURE_WRAP_T,f(g.wrapT)),a.texParameteri(c,a.TEXTURE_MAG_FILTER,f(g.magFilter)),a.texParameteri(c,a.TEXTURE_MIN_FILTER,f(g.minFilter))):(a.texParameteri(c,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(c,a.TEXTURE_WRAP_T,
	a.CLAMP_TO_EDGE),1001===g.wrapS&&1001===g.wrapT||console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.",g),a.texParameteri(c,a.TEXTURE_MAG_FILTER,m(g.magFilter)),a.texParameteri(c,a.TEXTURE_MIN_FILTER,m(g.minFilter)),1003!==g.minFilter&&1006!==g.minFilter&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.",g));!(h=b.get("EXT_texture_filter_anisotropic"))||
	1015===g.type&&null===b.get("OES_texture_float_linear")||1016===g.type&&null===b.get("OES_texture_half_float_linear")||!(1<g.anisotropy||d.get(g).__currentAnisotropy)||(a.texParameterf(c,h.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,e.getMaxAnisotropy())),d.get(g).__currentAnisotropy=g.anisotropy)}function l(b,e,g,h){var k=f(e.texture.format),m=f(e.texture.type);c.texImage2D(h,0,k,e.width,e.height,0,k,m,null);a.bindFramebuffer(a.FRAMEBUFFER,b);a.framebufferTexture2D(a.FRAMEBUFFER,g,h,d.get(e.texture).__webglTexture,
	0);a.bindFramebuffer(a.FRAMEBUFFER,null)}function r(b,c){a.bindRenderbuffer(a.RENDERBUFFER,b);c.depthBuffer&&!c.stencilBuffer?(a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_COMPONENT16,c.width,c.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,b)):c.depthBuffer&&c.stencilBuffer?(a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_STENCIL,c.width,c.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.RENDERBUFFER,b)):a.renderbufferStorage(a.RENDERBUFFER,
	a.RGBA4,c.width,c.height);a.bindRenderbuffer(a.RENDERBUFFER,null)}var p="undefined"!==typeof WebGL2RenderingContext&&a instanceof WebGL2RenderingContext;this.setTexture2D=n;this.setTextureCube=function(b,m){var n=d.get(b);if(6===b.image.length)if(0<b.version&&n.__version!==b.version){n.__image__webglTextureCube||(b.addEventListener("dispose",u),n.__image__webglTextureCube=a.createTexture(),g.textures++);c.activeTexture(a.TEXTURE0+m);c.bindTexture(a.TEXTURE_CUBE_MAP,n.__image__webglTextureCube);a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,
	b.flipY);for(var q=b&&b.isCompressedTexture,l=b.image[0]&&b.image[0].isDataTexture,r=[],z=0;6>z;z++)r[z]=q||l?l?b.image[z].image:b.image[z]:h(b.image[z],e.maxCubemapSize);var p=k(r[0]),y=f(b.format),N=f(b.type);t(a.TEXTURE_CUBE_MAP,b,p);for(z=0;6>z;z++)if(q)for(var ca,la=r[z].mipmaps,E=0,B=la.length;E<B;E++)ca=la[E],1023!==b.format&&1022!==b.format?-1<c.getCompressedTextureFormats().indexOf(y)?c.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+z,E,y,ca.width,ca.height,0,ca.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):
	c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+z,E,y,ca.width,ca.height,0,y,N,ca.data);else l?c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,y,r[z].width,r[z].height,0,y,N,r[z].data):c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,y,y,N,r[z]);b.generateMipmaps&&p&&a.generateMipmap(a.TEXTURE_CUBE_MAP);n.__version=b.version;if(b.onUpdate)b.onUpdate(b)}else c.activeTexture(a.TEXTURE0+m),c.bindTexture(a.TEXTURE_CUBE_MAP,n.__image__webglTextureCube)};this.setTextureCubeDynamic=function(b,e){c.activeTexture(a.TEXTURE0+
	e);c.bindTexture(a.TEXTURE_CUBE_MAP,d.get(b).__webglTexture)};this.setupRenderTarget=function(b){var e=d.get(b),f=d.get(b.texture);b.addEventListener("dispose",q);f.__webglTexture=a.createTexture();g.textures++;var h=!0===b.isWebGLRenderTargetCube,m=k(b);if(h){e.__webglFramebuffer=[];for(var u=0;6>u;u++)e.__webglFramebuffer[u]=a.createFramebuffer()}else e.__webglFramebuffer=a.createFramebuffer();if(h){c.bindTexture(a.TEXTURE_CUBE_MAP,f.__webglTexture);t(a.TEXTURE_CUBE_MAP,b.texture,m);for(u=0;6>u;u++)l(e.__webglFramebuffer[u],
	b,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+u);b.texture.generateMipmaps&&m&&a.generateMipmap(a.TEXTURE_CUBE_MAP);c.bindTexture(a.TEXTURE_CUBE_MAP,null)}else c.bindTexture(a.TEXTURE_2D,f.__webglTexture),t(a.TEXTURE_2D,b.texture,m),l(e.__webglFramebuffer,b,a.COLOR_ATTACHMENT0,a.TEXTURE_2D),b.texture.generateMipmaps&&m&&a.generateMipmap(a.TEXTURE_2D),c.bindTexture(a.TEXTURE_2D,null);if(b.depthBuffer){e=d.get(b);f=!0===b.isWebGLRenderTargetCube;if(b.depthTexture){if(f)throw Error("target.depthTexture not supported in Cube render targets");
	if(b&&b.isWebGLRenderTargetCube)throw Error("Depth Texture with cube render targets is not supported!");a.bindFramebuffer(a.FRAMEBUFFER,e.__webglFramebuffer);if(!b.depthTexture||!b.depthTexture.isDepthTexture)throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");d.get(b.depthTexture).__webglTexture&&b.depthTexture.image.width===b.width&&b.depthTexture.image.height===b.height||(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=
	!0);n(b.depthTexture,0);e=d.get(b.depthTexture).__webglTexture;if(1026===b.depthTexture.format)a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,e,0);else if(1027===b.depthTexture.format)a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,e,0);else throw Error("Unknown depthTexture format");}else if(f)for(e.__webglDepthbuffer=[],f=0;6>f;f++)a.bindFramebuffer(a.FRAMEBUFFER,e.__webglFramebuffer[f]),e.__webglDepthbuffer[f]=a.createRenderbuffer(),r(e.__webglDepthbuffer[f],
	b);else a.bindFramebuffer(a.FRAMEBUFFER,e.__webglFramebuffer),e.__webglDepthbuffer=a.createRenderbuffer(),r(e.__webglDepthbuffer,b);a.bindFramebuffer(a.FRAMEBUFFER,null)}};this.updateRenderTargetMipmap=function(b){var e=b.texture;e.generateMipmaps&&k(b)&&1003!==e.minFilter&&1006!==e.minFilter&&(b=b&&b.isWebGLRenderTargetCube?a.TEXTURE_CUBE_MAP:a.TEXTURE_2D,e=d.get(e).__webglTexture,c.bindTexture(b,e),a.generateMipmap(b),c.bindTexture(b,null))}}function fg(){var a={};return{get:function(b){b=b.uuid;
	var c=a[b];void 0===c&&(c={},a[b]=c);return c},remove:function(b){delete a[b.uuid]},clear:function(){a={}}}}function gg(a,b,c){function d(b,c,d){var e=new Uint8Array(4),f=a.createTexture();a.bindTexture(b,f);a.texParameteri(b,a.TEXTURE_MIN_FILTER,a.NEAREST);a.texParameteri(b,a.TEXTURE_MAG_FILTER,a.NEAREST);for(b=0;b<d;b++)a.texImage2D(c+b,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,e);return f}function e(b){!0!==v[b]&&(a.enable(b),v[b]=!0)}function f(b){!1!==v[b]&&(a.disable(b),v[b]=!1)}function g(b,d,
	g,h,k,m,n,u){0!==b?e(a.BLEND):f(a.BLEND);5===b||b===w&&u===ca||(2===b?u?(a.blendEquationSeparate(a.FUNC_ADD,a.FUNC_ADD),a.blendFuncSeparate(a.ONE,a.ONE,a.ONE,a.ONE)):(a.blendEquation(a.FUNC_ADD),a.blendFunc(a.SRC_ALPHA,a.ONE)):3===b?u?(a.blendEquationSeparate(a.FUNC_ADD,a.FUNC_ADD),a.blendFuncSeparate(a.ZERO,a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ONE_MINUS_SRC_ALPHA)):(a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ZERO,a.ONE_MINUS_SRC_COLOR)):4===b?u?(a.blendEquationSeparate(a.FUNC_ADD,a.FUNC_ADD),a.blendFuncSeparate(a.ZERO,
	a.SRC_COLOR,a.ZERO,a.SRC_ALPHA)):(a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ZERO,a.SRC_COLOR)):u?(a.blendEquationSeparate(a.FUNC_ADD,a.FUNC_ADD),a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA)):(a.blendEquationSeparate(a.FUNC_ADD,a.FUNC_ADD),a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA)),w=b,ca=u);if(5===b){k=k||d;m=m||g;n=n||h;if(d!==S||k!==F)a.blendEquationSeparate(c(d),c(k)),S=d,F=k;if(g!==W||h!==D||m!==aa||n!==N)a.blendFuncSeparate(c(g),
	c(h),c(m),c(n)),W=g,D=h,aa=m,N=n}else N=aa=F=D=W=S=null}function h(b){la!==b&&(b?a.frontFace(a.CW):a.frontFace(a.CCW),la=b)}function k(b){0!==b?(e(a.CULL_FACE),b!==E&&(1===b?a.cullFace(a.BACK):2===b?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):f(a.CULL_FACE);E=b}function m(b,c,d){if(b){if(e(a.POLYGON_OFFSET_FILL),C!==c||Q!==d)a.polygonOffset(c,d),C=c,Q=d}else f(a.POLYGON_OFFSET_FILL)}function u(b){void 0===b&&(b=a.TEXTURE0+V-1);R!==b&&(a.activeTexture(b),R=b)}var q=new function(){var b=!1,c=
	new ha,d=null,e=new ha;return{setMask:function(c){d===c||b||(a.colorMask(c,c,c,c),d=c)},setLocked:function(a){b=a},setClear:function(b,d,f,g,h){!0===h&&(b*=g,d*=g,f*=g);c.set(b,d,f,g);!1===e.equals(c)&&(a.clearColor(b,d,f,g),e.copy(c))},reset:function(){b=!1;d=null;e.set(0,0,0,1)}}},n=new function(){var b=!1,c=null,d=null,g=null;return{setTest:function(b){b?e(a.DEPTH_TEST):f(a.DEPTH_TEST)},setMask:function(d){c===d||b||(a.depthMask(d),c=d)},setFunc:function(b){if(d!==b){if(b)switch(b){case 0:a.depthFunc(a.NEVER);
	break;case 1:a.depthFunc(a.ALWAYS);break;case 2:a.depthFunc(a.LESS);break;case 3:a.depthFunc(a.LEQUAL);break;case 4:a.depthFunc(a.EQUAL);break;case 5:a.depthFunc(a.GEQUAL);break;case 6:a.depthFunc(a.GREATER);break;case 7:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}else a.depthFunc(a.LEQUAL);d=b}},setLocked:function(a){b=a},setClear:function(b){g!==b&&(a.clearDepth(b),g=b)},reset:function(){b=!1;g=d=c=null}}},t=new function(){var b=!1,c=null,d=null,g=null,h=null,k=null,m=null,n=null,
	u=null;return{setTest:function(b){b?e(a.STENCIL_TEST):f(a.STENCIL_TEST)},setMask:function(d){c===d||b||(a.stencilMask(d),c=d)},setFunc:function(b,c,e){if(d!==b||g!==c||h!==e)a.stencilFunc(b,c,e),d=b,g=c,h=e},setOp:function(b,c,d){if(k!==b||m!==c||n!==d)a.stencilOp(b,c,d),k=b,m=c,n=d},setLocked:function(a){b=a},setClear:function(b){u!==b&&(a.clearStencil(b),u=b)},reset:function(){b=!1;u=n=m=k=h=g=d=c=null}}},l=a.getParameter(a.MAX_VERTEX_ATTRIBS),r=new Uint8Array(l),p=new Uint8Array(l),x=new Uint8Array(l),
	v={},H=null,w=null,S=null,W=null,D=null,F=null,aa=null,N=null,ca=!1,la=null,E=null,B=null,C=null,Q=null,K=null,V=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS),l=parseFloat(/^WebGL\ ([0-9])/.exec(a.getParameter(a.VERSION))[1]),ba=1<=parseFloat(l),R=null,O={},I=new ha,G=new ha,J={};J[a.TEXTURE_2D]=d(a.TEXTURE_2D,a.TEXTURE_2D,1);J[a.TEXTURE_CUBE_MAP]=d(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6);return{buffers:{color:q,depth:n,stencil:t},init:function(){q.setClear(0,0,0,1);n.setClear(1);
	t.setClear(0);e(a.DEPTH_TEST);n.setFunc(3);h(!1);k(1);e(a.CULL_FACE);e(a.BLEND);g(1)},initAttributes:function(){for(var a=0,b=r.length;a<b;a++)r[a]=0},enableAttribute:function(c){r[c]=1;0===p[c]&&(a.enableVertexAttribArray(c),p[c]=1);0!==x[c]&&(b.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(c,0),x[c]=0)},enableAttributeAndDivisor:function(c,d){r[c]=1;0===p[c]&&(a.enableVertexAttribArray(c),p[c]=1);x[c]!==d&&(b.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(c,d),x[c]=d)},disableUnusedAttributes:function(){for(var b=
	0,c=p.length;b!==c;++b)p[b]!==r[b]&&(a.disableVertexAttribArray(b),p[b]=0)},enable:e,disable:f,getCompressedTextureFormats:function(){if(null===H&&(H=[],b.get("WEBGL_compressed_texture_pvrtc")||b.get("WEBGL_compressed_texture_s3tc")||b.get("WEBGL_compressed_texture_etc1")))for(var c=a.getParameter(a.COMPRESSED_TEXTURE_FORMATS),d=0;d<c.length;d++)H.push(c[d]);return H},setBlending:g,setMaterial:function(b){2===b.side?f(a.CULL_FACE):e(a.CULL_FACE);h(1===b.side);!0===b.transparent?g(b.blending,b.blendEquation,
	b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.premultipliedAlpha):g(0);n.setFunc(b.depthFunc);n.setTest(b.depthTest);n.setMask(b.depthWrite);q.setMask(b.colorWrite);m(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits)},setFlipSided:h,setCullFace:k,setLineWidth:function(b){b!==B&&(ba&&a.lineWidth(b),B=b)},setPolygonOffset:m,getScissorTest:function(){return K},setScissorTest:function(b){(K=b)?e(a.SCISSOR_TEST):f(a.SCISSOR_TEST)},activeTexture:u,bindTexture:function(b,
	c){null===R&&u();var d=O[R];void 0===d&&(d={type:void 0,texture:void 0},O[R]=d);if(d.type!==b||d.texture!==c)a.bindTexture(b,c||J[b]),d.type=b,d.texture=c},compressedTexImage2D:function(){try{a.compressedTexImage2D.apply(a,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage2D:function(){try{a.texImage2D.apply(a,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},scissor:function(b){!1===I.equals(b)&&(a.scissor(b.x,b.y,b.z,b.w),I.copy(b))},viewport:function(b){!1===G.equals(b)&&
	(a.viewport(b.x,b.y,b.z,b.w),G.copy(b))},reset:function(){for(var b=0;b<p.length;b++)1===p[b]&&(a.disableVertexAttribArray(b),p[b]=0);v={};R=H=null;O={};E=la=w=null;q.reset();n.reset();t.reset()}}}function hg(a,b,c){function d(b){if("highp"===b){if(0<a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision&&0<a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision)return"highp";b="mediump"}return"mediump"===b&&0<a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision&&
	0<a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision?"mediump":"lowp"}var e,f=void 0!==c.precision?c.precision:"highp",g=d(f);g!==f&&(console.warn("THREE.WebGLRenderer:",f,"not supported, using",g,"instead."),f=g);c=!0===c.logarithmicDepthBuffer&&!!b.get("EXT_frag_depth");var g=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),h=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),k=a.getParameter(a.MAX_TEXTURE_SIZE),m=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),u=a.getParameter(a.MAX_VERTEX_ATTRIBS),
	q=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),n=a.getParameter(a.MAX_VARYING_VECTORS),t=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),l=0<h,r=!!b.get("OES_texture_float");return{getMaxAnisotropy:function(){if(void 0!==e)return e;var c=b.get("EXT_texture_filter_anisotropic");return e=null!==c?a.getParameter(c.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0},getMaxPrecision:d,precision:f,logarithmicDepthBuffer:c,maxTextures:g,maxVertexTextures:h,maxTextureSize:k,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:q,
	maxVaryings:n,maxFragmentUniforms:t,vertexTextures:l,floatFragmentTextures:r,floatVertexTextures:l&&r}}function ig(a){var b={};return{get:function(c){if(void 0!==b[c])return b[c];var d;switch(c){case "WEBGL_depth_texture":d=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case "EXT_texture_filter_anisotropic":d=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||
	a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case "WEBGL_compressed_texture_s3tc":d=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case "WEBGL_compressed_texture_pvrtc":d=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;case "WEBGL_compressed_texture_etc1":d=a.getExtension("WEBGL_compressed_texture_etc1");
	break;default:d=a.getExtension(c)}null===d&&console.warn("THREE.WebGLRenderer: "+c+" extension not supported.");return b[c]=d}}}function jg(){function a(){m.value!==d&&(m.value=d,m.needsUpdate=0<e);c.numPlanes=e;c.numIntersection=0}function b(a,b,d,e){var f=null!==a?a.length:0,g=null;if(0!==f){g=m.value;if(!0!==e||null===g){e=d+4*f;b=b.matrixWorldInverse;k.getNormalMatrix(b);if(null===g||g.length<e)g=new Float32Array(e);for(e=0;e!==f;++e,d+=4)h.copy(a[e]).applyMatrix4(b,k),h.normal.toArray(g,d),g[d+
	3]=h.constant}m.value=g;m.needsUpdate=!0}c.numPlanes=f;return g}var c=this,d=null,e=0,f=!1,g=!1,h=new va,k=new Ka,m={value:null,needsUpdate:!1};this.uniform=m;this.numIntersection=this.numPlanes=0;this.init=function(a,c,g){var h=0!==a.length||c||0!==e||f;f=c;d=b(a,g,0);e=a.length;return h};this.beginShadows=function(){g=!0;b(null)};this.endShadows=function(){g=!1;a()};this.setState=function(c,h,k,t,l,r){if(!f||null===c||0===c.length||g&&!k)g?b(null):a();else{k=g?0:e;var p=4*k,x=l.clippingState||null;
	m.value=x;x=b(c,t,p,r);for(c=0;c!==p;++c)x[c]=d[c];l.clippingState=x;this.numIntersection=h?this.numPlanes:0;this.numPlanes+=k}}}function Xd(a){function b(){fa.init();fa.scissor(O.copy(ga).multiplyScalar(Ea));fa.viewport(Y.copy(zc).multiplyScalar(Ea));fa.buffers.color.setClear(Ia.r,Ia.g,Ia.b,da,D)}function c(){R=M=null;ba="";V=-1;fa.reset()}function d(a){a.preventDefault();c();b();ia.clear();va.clear()}function e(a){a=a.target;a.removeEventListener("dispose",e);f(a);ia.remove(a)}function f(a){var b=
	ia.get(a).program;a.program=void 0;void 0!==b&&xa.releaseProgram(b)}function g(a,b,c){a.render(function(a){C.renderBufferImmediate(a,b,c)})}function h(a,b){return Math.abs(b[0])-Math.abs(a[0])}function k(a,b,c){if(a.visible){if(a.layers.test(b.layers))if(a.isLight)aa.push(a);else if(a.isSprite)a.frustumCulled&&!ja.intersectsSprite(a)||E.push(a);else if(a.isLensFlare)B.push(a);else if(a.isImmediateRenderObject)c&&Qa.setFromMatrixPosition(a.matrixWorld).applyMatrix4(ld),N.push(a,null,a.material,Qa.z,
	null);else if(a.isMesh||a.isLine||a.isPoints)if(a.isSkinnedMesh&&a.skeleton.update(),!a.frustumCulled||ja.intersectsObject(a)){c&&Qa.setFromMatrixPosition(a.matrixWorld).applyMatrix4(ld);var d=va.update(a),e=a.material;if(Array.isArray(e))for(var f=d.groups,g=0,h=f.length;g<h;g++){var m=f[g],n=e[m.materialIndex];n&&n.visible&&N.push(a,d,n,Qa.z,m)}else e.visible&&N.push(a,d,e,Qa.z,null)}a=a.children;g=0;for(h=a.length;g<h;g++)k(a[g],b,c)}}function m(a,b,c,d){for(var e=0,f=a.length;e<f;e++){var g=a[e],
	h=g.object,k=g.geometry,m=void 0===d?g.material:d,g=g.group;h.onBeforeRender(C,b,c,k,m,g);if(c.isArrayCamera)for(var n=c.cameras,q=0,t=n.length;q<t;q++){var l=n[q],r=l.bounds,z=r.x*P*Ea,p=r.y*Z*Ea,v=r.z*P*Ea,r=r.w*Z*Ea;C.setViewport(z,p,v,r);C.setScissor(z,p,v,r);C.setScissorTest(!0);u(h,b,l,k,m,g)}else u(h,b,c,k,m,g);h.onAfterRender(C,b,c,k,m,g)}}function u(a,b,c,d,e,f){a.modelViewMatrix.multiplyMatrices(c.matrixWorldInverse,a.matrixWorld);a.normalMatrix.getNormalMatrix(a.modelViewMatrix);a.isImmediateRenderObject?
	(fa.setMaterial(e),b=n(c,b.fog,e,a),ba="",g(a,b,e)):C.renderBufferDirect(c,b.fog,d,e,a,f)}function q(a,b,c){var d=ia.get(a);c=xa.getParameters(a,ea,b,Pa.numPlanes,Pa.numIntersection,c);var g=xa.getProgramCode(a,c),h=d.program,k=!0;if(void 0===h)a.addEventListener("dispose",e);else if(h.code!==g)f(a);else{if(void 0!==c.shaderID)return;k=!1}k&&(c.shaderID?(h=ab[c.shaderID],d.__webglShader={name:a.type,uniforms:Ha.clone(h.uniforms),vertexShader:h.vertexShader,fragmentShader:h.fragmentShader}):d.__webglShader=
	{name:a.type,uniforms:a.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader},a.__webglShader=d.__webglShader,h=xa.acquireProgram(a,c,g),d.program=h,a.program=h);c=h.getAttributes();if(a.morphTargets)for(g=a.numSupportedMorphTargets=0;g<C.maxMorphTargets;g++)0<=c["morphTarget"+g]&&a.numSupportedMorphTargets++;if(a.morphNormals)for(g=a.numSupportedMorphNormals=0;g<C.maxMorphNormals;g++)0<=c["morphNormal"+g]&&a.numSupportedMorphNormals++;c=d.__webglShader.uniforms;if(!a.isShaderMaterial&&
	!a.isRawShaderMaterial||!0===a.clipping)d.numClippingPlanes=Pa.numPlanes,d.numIntersection=Pa.numIntersection,c.clippingPlanes=Pa.uniform;d.fog=b;d.lightsHash=ea.hash;a.lights&&(c.ambientLightColor.value=ea.ambient,c.directionalLights.value=ea.directional,c.spotLights.value=ea.spot,c.rectAreaLights.value=ea.rectArea,c.pointLights.value=ea.point,c.hemisphereLights.value=ea.hemi,c.directionalShadowMap.value=ea.directionalShadowMap,c.directionalShadowMatrix.value=ea.directionalShadowMatrix,c.spotShadowMap.value=
	ea.spotShadowMap,c.spotShadowMatrix.value=ea.spotShadowMatrix,c.pointShadowMap.value=ea.pointShadowMap,c.pointShadowMatrix.value=ea.pointShadowMatrix);a=d.program.getUniforms();a=fb.seqWithValue(a.seq,c);d.uniformsList=a}function n(a,b,c,d){T=0;var e=ia.get(c);kd&&(Wd||a!==R)&&Pa.setState(c.clippingPlanes,c.clipIntersection,c.clipShadows,a,e,a===R&&c.id===V);!1===c.needsUpdate&&(void 0===e.program?c.needsUpdate=!0:c.fog&&e.fog!==b?c.needsUpdate=!0:c.lights&&e.lightsHash!==ea.hash?c.needsUpdate=!0:
	void 0===e.numClippingPlanes||e.numClippingPlanes===Pa.numPlanes&&e.numIntersection===Pa.numIntersection||(c.needsUpdate=!0));c.needsUpdate&&(q(c,b,d),c.needsUpdate=!1);var f=!1,g=!1,h=!1,k=e.program,m=k.getUniforms(),n=e.__webglShader.uniforms;k.id!==M&&(A.useProgram(k.program),M=k.id,h=g=f=!0);c.id!==V&&(V=c.id,g=!0);if(f||a!==R){m.setValue(A,"projectionMatrix",a.projectionMatrix);ma.logarithmicDepthBuffer&&m.setValue(A,"logDepthBufFC",2/(Math.log(a.far+1)/Math.LN2));a!==R&&(R=a,h=g=!0);if(c.isShaderMaterial||
	c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.envMap)f=m.map.cameraPosition,void 0!==f&&f.setValue(A,Qa.setFromMatrixPosition(a.matrixWorld));(c.isMeshPhongMaterial||c.isMeshLambertMaterial||c.isMeshBasicMaterial||c.isMeshStandardMaterial||c.isShaderMaterial||c.skinning)&&m.setValue(A,"viewMatrix",a.matrixWorldInverse);m.setValue(A,"toneMappingExposure",C.toneMappingExposure);m.setValue(A,"toneMappingWhitePoint",C.toneMappingWhitePoint)}if(c.skinning&&(m.setOptional(A,d,"bindMatrix"),m.setOptional(A,
	d,"bindMatrixInverse"),a=d.skeleton))if(f=a.bones,ma.floatVertexTextures){if(void 0===a.boneTexture){var f=Math.sqrt(4*f.length),f=X.nextPowerOfTwo(Math.ceil(f)),f=Math.max(f,4),u=new Float32Array(f*f*4);u.set(a.boneMatrices);var r=new eb(u,f,f,1023,1015);a.boneMatrices=u;a.boneTexture=r;a.boneTextureSize=f}m.setValue(A,"boneTexture",a.boneTexture);m.setValue(A,"boneTextureSize",a.boneTextureSize)}else m.setOptional(A,a,"boneMatrices");if(g){c.lights&&(g=h,n.ambientLightColor.needsUpdate=g,n.directionalLights.needsUpdate=
	g,n.pointLights.needsUpdate=g,n.spotLights.needsUpdate=g,n.rectAreaLights.needsUpdate=g,n.hemisphereLights.needsUpdate=g);b&&c.fog&&(n.fogColor.value=b.color,b.isFog?(n.fogNear.value=b.near,n.fogFar.value=b.far):b.isFogExp2&&(n.fogDensity.value=b.density));if(c.isMeshBasicMaterial||c.isMeshLambertMaterial||c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.isMeshNormalMaterial||c.isMeshDepthMaterial){n.opacity.value=c.opacity;n.diffuse.value=c.color;c.emissive&&n.emissive.value.copy(c.emissive).multiplyScalar(c.emissiveIntensity);
	n.map.value=c.map;n.specularMap.value=c.specularMap;n.alphaMap.value=c.alphaMap;c.lightMap&&(n.lightMap.value=c.lightMap,n.lightMapIntensity.value=c.lightMapIntensity);c.aoMap&&(n.aoMap.value=c.aoMap,n.aoMapIntensity.value=c.aoMapIntensity);var p;c.map?p=c.map:c.specularMap?p=c.specularMap:c.displacementMap?p=c.displacementMap:c.normalMap?p=c.normalMap:c.bumpMap?p=c.bumpMap:c.roughnessMap?p=c.roughnessMap:c.metalnessMap?p=c.metalnessMap:c.alphaMap?p=c.alphaMap:c.emissiveMap&&(p=c.emissiveMap);void 0!==
	p&&(p.isWebGLRenderTarget&&(p=p.texture),b=p.offset,p=p.repeat,n.offsetRepeat.value.set(b.x,b.y,p.x,p.y));n.envMap.value=c.envMap;n.flipEnvMap.value=c.envMap&&c.envMap.isCubeTexture?-1:1;n.reflectivity.value=c.reflectivity;n.refractionRatio.value=c.refractionRatio}c.isLineBasicMaterial?(n.diffuse.value=c.color,n.opacity.value=c.opacity):c.isLineDashedMaterial?(n.diffuse.value=c.color,n.opacity.value=c.opacity,n.dashSize.value=c.dashSize,n.totalSize.value=c.dashSize+c.gapSize,n.scale.value=c.scale):
	c.isPointsMaterial?(n.diffuse.value=c.color,n.opacity.value=c.opacity,n.size.value=c.size*Ea,n.scale.value=.5*Z,n.map.value=c.map,null!==c.map&&(p=c.map.offset,c=c.map.repeat,n.offsetRepeat.value.set(p.x,p.y,c.x,c.y))):c.isMeshLambertMaterial?c.emissiveMap&&(n.emissiveMap.value=c.emissiveMap):c.isMeshToonMaterial?(t(n,c),c.gradientMap&&(n.gradientMap.value=c.gradientMap)):c.isMeshPhongMaterial?t(n,c):c.isMeshPhysicalMaterial?(n.clearCoat.value=c.clearCoat,n.clearCoatRoughness.value=c.clearCoatRoughness,
	l(n,c)):c.isMeshStandardMaterial?l(n,c):c.isMeshDepthMaterial?c.displacementMap&&(n.displacementMap.value=c.displacementMap,n.displacementScale.value=c.displacementScale,n.displacementBias.value=c.displacementBias):c.isMeshNormalMaterial&&(c.bumpMap&&(n.bumpMap.value=c.bumpMap,n.bumpScale.value=c.bumpScale),c.normalMap&&(n.normalMap.value=c.normalMap,n.normalScale.value.copy(c.normalScale)),c.displacementMap&&(n.displacementMap.value=c.displacementMap,n.displacementScale.value=c.displacementScale,
	n.displacementBias.value=c.displacementBias));void 0!==n.ltcMat&&(n.ltcMat.value=U.LTC_MAT_TEXTURE);void 0!==n.ltcMag&&(n.ltcMag.value=U.LTC_MAG_TEXTURE);fb.upload(A,e.uniformsList,n,C)}m.setValue(A,"modelViewMatrix",d.modelViewMatrix);m.setValue(A,"normalMatrix",d.normalMatrix);m.setValue(A,"modelMatrix",d.matrixWorld);return k}function t(a,b){a.specular.value=b.specular;a.shininess.value=Math.max(b.shininess,1E-4);b.emissiveMap&&(a.emissiveMap.value=b.emissiveMap);b.bumpMap&&(a.bumpMap.value=b.bumpMap,
	a.bumpScale.value=b.bumpScale);b.normalMap&&(a.normalMap.value=b.normalMap,a.normalScale.value.copy(b.normalScale));b.displacementMap&&(a.displacementMap.value=b.displacementMap,a.displacementScale.value=b.displacementScale,a.displacementBias.value=b.displacementBias)}function l(a,b){a.roughness.value=b.roughness;a.metalness.value=b.metalness;b.roughnessMap&&(a.roughnessMap.value=b.roughnessMap);b.metalnessMap&&(a.metalnessMap.value=b.metalnessMap);b.emissiveMap&&(a.emissiveMap.value=b.emissiveMap);
	b.bumpMap&&(a.bumpMap.value=b.bumpMap,a.bumpScale.value=b.bumpScale);b.normalMap&&(a.normalMap.value=b.normalMap,a.normalScale.value.copy(b.normalScale));b.displacementMap&&(a.displacementMap.value=b.displacementMap,a.displacementScale.value=b.displacementScale,a.displacementBias.value=b.displacementBias);b.envMap&&(a.envMapIntensity.value=b.envMapIntensity)}function r(a,b){var c,d,e,f,g=0,h=0,k=0,m,n,u,q=b.matrixWorldInverse,l=0,t=0,r=0,z=0,p=0;c=0;for(d=a.length;c<d;c++)if(e=a[c],f=e.color,m=e.intensity,
	n=e.distance,u=e.shadow&&e.shadow.map?e.shadow.map.texture:null,e.isAmbientLight)g+=f.r*m,h+=f.g*m,k+=f.b*m;else if(e.isDirectionalLight){var v=Aa.get(e);v.color.copy(e.color).multiplyScalar(e.intensity);v.direction.setFromMatrixPosition(e.matrixWorld);Qa.setFromMatrixPosition(e.target.matrixWorld);v.direction.sub(Qa);v.direction.transformDirection(q);if(v.shadow=e.castShadow)f=e.shadow,v.shadowBias=f.bias,v.shadowRadius=f.radius,v.shadowMapSize=f.mapSize;ea.directionalShadowMap[l]=u;ea.directionalShadowMatrix[l]=
	e.shadow.matrix;ea.directional[l]=v;l++}else if(e.isSpotLight){v=Aa.get(e);v.position.setFromMatrixPosition(e.matrixWorld);v.position.applyMatrix4(q);v.color.copy(f).multiplyScalar(m);v.distance=n;v.direction.setFromMatrixPosition(e.matrixWorld);Qa.setFromMatrixPosition(e.target.matrixWorld);v.direction.sub(Qa);v.direction.transformDirection(q);v.coneCos=Math.cos(e.angle);v.penumbraCos=Math.cos(e.angle*(1-e.penumbra));v.decay=0===e.distance?0:e.decay;if(v.shadow=e.castShadow)f=e.shadow,v.shadowBias=
	f.bias,v.shadowRadius=f.radius,v.shadowMapSize=f.mapSize;ea.spotShadowMap[r]=u;ea.spotShadowMatrix[r]=e.shadow.matrix;ea.spot[r]=v;r++}else if(e.isRectAreaLight)v=Aa.get(e),v.color.copy(f).multiplyScalar(m/(e.width*e.height)),v.position.setFromMatrixPosition(e.matrixWorld),v.position.applyMatrix4(q),qa.identity(),pa.copy(e.matrixWorld),pa.premultiply(q),qa.extractRotation(pa),v.halfWidth.set(.5*e.width,0,0),v.halfHeight.set(0,.5*e.height,0),v.halfWidth.applyMatrix4(qa),v.halfHeight.applyMatrix4(qa),
	ea.rectArea[z]=v,z++;else if(e.isPointLight){v=Aa.get(e);v.position.setFromMatrixPosition(e.matrixWorld);v.position.applyMatrix4(q);v.color.copy(e.color).multiplyScalar(e.intensity);v.distance=e.distance;v.decay=0===e.distance?0:e.decay;if(v.shadow=e.castShadow)f=e.shadow,v.shadowBias=f.bias,v.shadowRadius=f.radius,v.shadowMapSize=f.mapSize;ea.pointShadowMap[t]=u;ea.pointShadowMatrix[t]=e.shadow.matrix;ea.point[t]=v;t++}else e.isHemisphereLight&&(v=Aa.get(e),v.direction.setFromMatrixPosition(e.matrixWorld),
	v.direction.transformDirection(q),v.direction.normalize(),v.skyColor.copy(e.color).multiplyScalar(m),v.groundColor.copy(e.groundColor).multiplyScalar(m),ea.hemi[p]=v,p++);ea.ambient[0]=g;ea.ambient[1]=h;ea.ambient[2]=k;ea.directional.length=l;ea.spot.length=r;ea.rectArea.length=z;ea.point.length=t;ea.hemi.length=p;ea.hash=l+","+t+","+r+","+z+","+p+","+ea.shadows.length}function y(a){var b;if(1E3===a)return A.REPEAT;if(1001===a)return A.CLAMP_TO_EDGE;if(1002===a)return A.MIRRORED_REPEAT;if(1003===
	a)return A.NEAREST;if(1004===a)return A.NEAREST_MIPMAP_NEAREST;if(1005===a)return A.NEAREST_MIPMAP_LINEAR;if(1006===a)return A.LINEAR;if(1007===a)return A.LINEAR_MIPMAP_NEAREST;if(1008===a)return A.LINEAR_MIPMAP_LINEAR;if(1009===a)return A.UNSIGNED_BYTE;if(1017===a)return A.UNSIGNED_SHORT_4_4_4_4;if(1018===a)return A.UNSIGNED_SHORT_5_5_5_1;if(1019===a)return A.UNSIGNED_SHORT_5_6_5;if(1010===a)return A.BYTE;if(1011===a)return A.SHORT;if(1012===a)return A.UNSIGNED_SHORT;if(1013===a)return A.INT;if(1014===
	a)return A.UNSIGNED_INT;if(1015===a)return A.FLOAT;if(1016===a&&(b=oa.get("OES_texture_half_float"),null!==b))return b.HALF_FLOAT_OES;if(1021===a)return A.ALPHA;if(1022===a)return A.RGB;if(1023===a)return A.RGBA;if(1024===a)return A.LUMINANCE;if(1025===a)return A.LUMINANCE_ALPHA;if(1026===a)return A.DEPTH_COMPONENT;if(1027===a)return A.DEPTH_STENCIL;if(100===a)return A.FUNC_ADD;if(101===a)return A.FUNC_SUBTRACT;if(102===a)return A.FUNC_REVERSE_SUBTRACT;if(200===a)return A.ZERO;if(201===a)return A.ONE;
	if(202===a)return A.SRC_COLOR;if(203===a)return A.ONE_MINUS_SRC_COLOR;if(204===a)return A.SRC_ALPHA;if(205===a)return A.ONE_MINUS_SRC_ALPHA;if(206===a)return A.DST_ALPHA;if(207===a)return A.ONE_MINUS_DST_ALPHA;if(208===a)return A.DST_COLOR;if(209===a)return A.ONE_MINUS_DST_COLOR;if(210===a)return A.SRC_ALPHA_SATURATE;if(2001===a||2002===a||2003===a||2004===a)if(b=oa.get("WEBGL_compressed_texture_s3tc"),null!==b){if(2001===a)return b.COMPRESSED_RGB_S3TC_DXT1_EXT;if(2002===a)return b.COMPRESSED_RGBA_S3TC_DXT1_EXT;
	if(2003===a)return b.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(2004===a)return b.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(2100===a||2101===a||2102===a||2103===a)if(b=oa.get("WEBGL_compressed_texture_pvrtc"),null!==b){if(2100===a)return b.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(2101===a)return b.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(2102===a)return b.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(2103===a)return b.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(2151===a&&(b=oa.get("WEBGL_compressed_texture_etc1"),null!==b))return b.COMPRESSED_RGB_ETC1_WEBGL;
	if(103===a||104===a)if(b=oa.get("EXT_blend_minmax"),null!==b){if(103===a)return b.MIN_EXT;if(104===a)return b.MAX_EXT}return 1020===a&&(b=oa.get("WEBGL_depth_texture"),null!==b)?b.UNSIGNED_INT_24_8_WEBGL:0}console.log("THREE.WebGLRenderer","86dev");a=a||{};var x=void 0!==a.canvas?a.canvas:document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),v=void 0!==a.context?a.context:null,H=void 0!==a.alpha?a.alpha:!1,w=void 0!==a.depth?a.depth:!0,S=void 0!==a.stencil?a.stencil:!0,W=void 0!==a.antialias?
	a.antialias:!1,D=void 0!==a.premultipliedAlpha?a.premultipliedAlpha:!0,F=void 0!==a.preserveDrawingBuffer?a.preserveDrawingBuffer:!1,aa=[],N=null,ca=new Float32Array(8),E=[],B=[];this.domElement=x;this.context=null;this.sortObjects=this.autoClearStencil=this.autoClearDepth=this.autoClearColor=this.autoClear=!0;this.clippingPlanes=[];this.localClippingEnabled=!1;this.gammaFactor=2;this.physicallyCorrectLights=this.gammaOutput=this.gammaInput=!1;this.toneMappingWhitePoint=this.toneMappingExposure=this.toneMapping=
	1;this.maxMorphTargets=8;this.maxMorphNormals=4;var C=this,M=null,Q=null,K=null,V=-1,ba="",R=null,O=new ha,L=null,Y=new ha,T=0,Ia=new G(0),da=0,P=x.width,Z=x.height,Ea=1,ga=new ha(0,0,P,Z),Pe=!1,zc=new ha(0,0,P,Z),ja=new jd,Pa=new jg,kd=!1,Wd=!1,ld=new J,Qa=new p,pa=new J,qa=new J,ea={hash:"",ambient:[0,0,0],directional:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],point:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],shadows:[]},
	ua={geometries:0,textures:0},na={frame:0,calls:0,vertices:0,faces:0,points:0};this.info={render:na,memory:ua,programs:null};var A;try{H={alpha:H,depth:w,stencil:S,antialias:W,premultipliedAlpha:D,preserveDrawingBuffer:F};A=v||x.getContext("webgl",H)||x.getContext("experimental-webgl",H);if(null===A){if(null!==x.getContext("webgl"))throw"Error creating WebGL context with your selected attributes.";throw"Error creating WebGL context.";}void 0===A.getShaderPrecisionFormat&&(A.getShaderPrecisionFormat=
	function(){return{rangeMin:1,rangeMax:1,precision:1}});x.addEventListener("webglcontextlost",d,!1)}catch(kg){console.error("THREE.WebGLRenderer: "+kg)}var oa=new ig(A);oa.get("WEBGL_depth_texture");oa.get("OES_texture_float");oa.get("OES_texture_float_linear");oa.get("OES_texture_half_float");oa.get("OES_texture_half_float_linear");oa.get("OES_standard_derivatives");oa.get("ANGLE_instanced_arrays");oa.get("OES_element_index_uint")&&(I.MaxIndex=4294967296);var ma=new hg(A,oa,a),fa=new gg(A,oa,y),ia=
	new fg,ra=new eg(A,oa,fa,ia,ma,y,ua),za=new Nf(A),Ca=new Uf(A,za,ua),va=new Wf(A,Ca,na),xa=new dg(this,ma),Aa=new Vf,Ga=new Rf;this.info.programs=xa.programs;var Ka=new Tf(A,oa,na),La=new Sf(A,oa,na),Fa,ya,sa,ta;b();this.context=A;this.capabilities=ma;this.extensions=oa;this.properties=ia;this.state=fa;var Ja=new Je(this,ea,va,ma);this.shadowMap=Ja;var Ma=new Kf(this,E),Oa=new Jf(this,B);this.getContext=function(){return A};this.getContextAttributes=function(){return A.getContextAttributes()};this.forceContextLoss=
	function(){var a=oa.get("WEBGL_lose_context");a&&a.loseContext()};this.getMaxAnisotropy=function(){return ma.getMaxAnisotropy()};this.getPrecision=function(){return ma.precision};this.getPixelRatio=function(){return Ea};this.setPixelRatio=function(a){void 0!==a&&(Ea=a,this.setSize(zc.z,zc.w,!1))};this.getSize=function(){return{width:P,height:Z}};this.setSize=function(a,b,c){P=a;Z=b;x.width=a*Ea;x.height=b*Ea;!1!==c&&(x.style.width=a+"px",x.style.height=b+"px");this.setViewport(0,0,a,b)};this.setViewport=
	function(a,b,c,d){fa.viewport(zc.set(a,b,c,d))};this.setScissor=function(a,b,c,d){fa.scissor(ga.set(a,b,c,d))};this.setScissorTest=function(a){fa.setScissorTest(Pe=a)};this.getClearColor=function(){return Ia};this.setClearColor=function(a,b){Ia.set(a);da=void 0!==b?b:1;fa.buffers.color.setClear(Ia.r,Ia.g,Ia.b,da,D)};this.getClearAlpha=function(){return da};this.setClearAlpha=function(a){da=a;fa.buffers.color.setClear(Ia.r,Ia.g,Ia.b,da,D)};this.clear=function(a,b,c){var d=0;if(void 0===a||a)d|=A.COLOR_BUFFER_BIT;
	if(void 0===b||b)d|=A.DEPTH_BUFFER_BIT;if(void 0===c||c)d|=A.STENCIL_BUFFER_BIT;A.clear(d)};this.clearColor=function(){this.clear(!0,!1,!1)};this.clearDepth=function(){this.clear(!1,!0,!1)};this.clearStencil=function(){this.clear(!1,!1,!0)};this.clearTarget=function(a,b,c,d){this.setRenderTarget(a);this.clear(b,c,d)};this.resetGLState=c;this.dispose=function(){x.removeEventListener("webglcontextlost",d,!1);Ga.dispose()};this.renderBufferImmediate=function(a,b,c){fa.initAttributes();var d=ia.get(a);
	a.hasPositions&&!d.position&&(d.position=A.createBuffer());a.hasNormals&&!d.normal&&(d.normal=A.createBuffer());a.hasUvs&&!d.uv&&(d.uv=A.createBuffer());a.hasColors&&!d.color&&(d.color=A.createBuffer());b=b.getAttributes();a.hasPositions&&(A.bindBuffer(A.ARRAY_BUFFER,d.position),A.bufferData(A.ARRAY_BUFFER,a.positionArray,A.DYNAMIC_DRAW),fa.enableAttribute(b.position),A.vertexAttribPointer(b.position,3,A.FLOAT,!1,0,0));if(a.hasNormals){A.bindBuffer(A.ARRAY_BUFFER,d.normal);if(!c.isMeshPhongMaterial&&
	!c.isMeshStandardMaterial&&!c.isMeshNormalMaterial&&1===c.shading)for(var e=0,f=3*a.count;e<f;e+=9){var g=a.normalArray,h=(g[e+0]+g[e+3]+g[e+6])/3,k=(g[e+1]+g[e+4]+g[e+7])/3,m=(g[e+2]+g[e+5]+g[e+8])/3;g[e+0]=h;g[e+1]=k;g[e+2]=m;g[e+3]=h;g[e+4]=k;g[e+5]=m;g[e+6]=h;g[e+7]=k;g[e+8]=m}A.bufferData(A.ARRAY_BUFFER,a.normalArray,A.DYNAMIC_DRAW);fa.enableAttribute(b.normal);A.vertexAttribPointer(b.normal,3,A.FLOAT,!1,0,0)}a.hasUvs&&c.map&&(A.bindBuffer(A.ARRAY_BUFFER,d.uv),A.bufferData(A.ARRAY_BUFFER,a.uvArray,
	A.DYNAMIC_DRAW),fa.enableAttribute(b.uv),A.vertexAttribPointer(za.uv,2,A.FLOAT,!1,0,0));a.hasColors&&0!==c.vertexColors&&(A.bindBuffer(A.ARRAY_BUFFER,d.color),A.bufferData(A.ARRAY_BUFFER,a.colorArray,A.DYNAMIC_DRAW),fa.enableAttribute(b.color),A.vertexAttribPointer(b.color,3,A.FLOAT,!1,0,0));fa.disableUnusedAttributes();A.drawArrays(A.TRIANGLES,0,a.count);a.count=0};this.renderBufferDirect=function(a,b,c,d,e,f){fa.setMaterial(d);var g=n(a,b,d,e);a=c.id+"_"+g.id+"_"+(!0===d.wireframe);var k=!1;a!==
	ba&&(ba=a,k=!0);b=e.morphTargetInfluences;if(void 0!==b){var m=[];a=0;for(var u=b.length;a<u;a++)k=b[a],m.push([k,a]);m.sort(h);8<m.length&&(m.length=8);var q=c.morphAttributes;a=0;for(u=m.length;a<u;a++)k=m[a],ca[a]=k[0],0!==k[0]?(b=k[1],!0===d.morphTargets&&q.position&&c.addAttribute("morphTarget"+a,q.position[b]),!0===d.morphNormals&&q.normal&&c.addAttribute("morphNormal"+a,q.normal[b])):(!0===d.morphTargets&&c.removeAttribute("morphTarget"+a),!0===d.morphNormals&&c.removeAttribute("morphNormal"+
	a));a=m.length;for(b=ca.length;a<b;a++)ca[a]=0;g.getUniforms().setValue(A,"morphTargetInfluences",ca);k=!0}b=c.index;u=c.attributes.position;m=1;!0===d.wireframe&&(b=Ca.getWireframeAttribute(c),m=2);a=Ka;null!==b&&(a=La,a.setIndex(b));if(k){k=void 0;if(c&&c.isInstancedBufferGeometry&&null===oa.get("ANGLE_instanced_arrays"))console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");else{void 0===k&&
	(k=0);fa.initAttributes();var q=c.attributes,g=g.getAttributes(),l=d.defaultAttributeValues,t;for(t in g){var r=g[t];if(0<=r){var v=q[t];if(void 0!==v){var z=v.normalized,p=v.itemSize,w=za.get(v),y=w.buffer,x=w.type,w=w.bytesPerElement;if(v.isInterleavedBufferAttribute){var H=v.data,D=H.stride,v=v.offset;H&&H.isInstancedInterleavedBuffer?(fa.enableAttributeAndDivisor(r,H.meshPerAttribute),void 0===c.maxInstancedCount&&(c.maxInstancedCount=H.meshPerAttribute*H.count)):fa.enableAttribute(r);A.bindBuffer(A.ARRAY_BUFFER,
	y);A.vertexAttribPointer(r,p,x,z,D*w,(k*D+v)*w)}else v.isInstancedBufferAttribute?(fa.enableAttributeAndDivisor(r,v.meshPerAttribute),void 0===c.maxInstancedCount&&(c.maxInstancedCount=v.meshPerAttribute*v.count)):fa.enableAttribute(r),A.bindBuffer(A.ARRAY_BUFFER,y),A.vertexAttribPointer(r,p,x,z,0,k*p*w)}else if(void 0!==l&&(z=l[t],void 0!==z))switch(z.length){case 2:A.vertexAttrib2fv(r,z);break;case 3:A.vertexAttrib3fv(r,z);break;case 4:A.vertexAttrib4fv(r,z);break;default:A.vertexAttrib1fv(r,z)}}}fa.disableUnusedAttributes()}null!==
	b&&A.bindBuffer(A.ELEMENT_ARRAY_BUFFER,za.get(b).buffer)}t=0;null!==b?t=b.count:void 0!==u&&(t=u.count);u=c.drawRange.start*m;k=null!==f?f.start*m:0;b=Math.max(u,k);f=Math.max(0,Math.min(t,u+c.drawRange.count*m,k+(null!==f?f.count*m:Infinity))-1-b+1);if(0!==f){if(e.isMesh)if(!0===d.wireframe)fa.setLineWidth(d.wireframeLinewidth*(null===Q?Ea:1)),a.setMode(A.LINES);else switch(e.drawMode){case 0:a.setMode(A.TRIANGLES);break;case 1:a.setMode(A.TRIANGLE_STRIP);break;case 2:a.setMode(A.TRIANGLE_FAN)}else e.isLine?
	(d=d.linewidth,void 0===d&&(d=1),fa.setLineWidth(d*(null===Q?Ea:1)),e.isLineSegments?a.setMode(A.LINES):e.isLineLoop?a.setMode(A.LINE_LOOP):a.setMode(A.LINE_STRIP)):e.isPoints&&a.setMode(A.POINTS);c&&c.isInstancedBufferGeometry?0<c.maxInstancedCount&&a.renderInstances(c,b,f):a.render(b,f)}};this.compile=function(a,b){aa=[];a.traverse(function(a){a.isLight&&aa.push(a)});r(aa,b);a.traverse(function(b){if(b.material)if(Array.isArray(b.material))for(var c=0;c<b.material.length;c++)q(b.material[c],a.fog,
	b);else q(b.material,a.fog,b)})};this.render=function(a,b,c,d){if(void 0!==b&&!0!==b.isCamera)console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");else{ba="";V=-1;R=null;!0===a.autoUpdate&&a.updateMatrixWorld();b.onBeforeRender(C);null===b.parent&&b.updateMatrixWorld();ld.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse);ja.setFromMatrix(ld);aa.length=0;E.length=0;B.length=0;Wd=this.localClippingEnabled;kd=Pa.init(this.clippingPlanes,Wd,b);N=Ga.get(a,b);
	N.init();k(a,b,C.sortObjects);N.finish();!0===C.sortObjects&&N.sort();kd&&Pa.beginShadows();for(var e=aa,f=0,g=0,h=e.length;g<h;g++){var n=e[g];n.castShadow&&(ea.shadows[f]=n,f++)}ea.shadows.length=f;Ja.render(a,b);r(aa,b);kd&&Pa.endShadows();na.frame++;na.calls=0;na.vertices=0;na.faces=0;na.points=0;void 0===c&&(c=null);this.setRenderTarget(c);e=a.background;null===e?fa.buffers.color.setClear(Ia.r,Ia.g,Ia.b,da,D):e&&e.isColor&&(fa.buffers.color.setClear(e.r,e.g,e.b,1,D),d=!0);(this.autoClear||d)&&
	this.clear(this.autoClearColor,this.autoClearDepth,this.autoClearStencil);e&&e.isCubeTexture?(void 0===sa&&(sa=new wa,ta=new Ba(new kb(5,5,5),new Da({uniforms:ab.cube.uniforms,vertexShader:ab.cube.vertexShader,fragmentShader:ab.cube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1}))),sa.projectionMatrix.copy(b.projectionMatrix),sa.matrixWorld.extractRotation(b.matrixWorld),sa.matrixWorldInverse.getInverse(sa.matrixWorld),ta.material.uniforms.tCube.value=e,ta.modelViewMatrix.multiplyMatrices(sa.matrixWorldInverse,
	ta.matrixWorld),va.update(ta),C.renderBufferDirect(sa,null,ta.geometry,ta.material,ta,null)):e&&e.isTexture&&(void 0===Fa&&(Fa=new Jb(-1,1,1,-1,0,1),ya=new Ba(new lb(2,2),new Na({depthTest:!1,depthWrite:!1,fog:!1}))),ya.material.map=e,va.update(ya),C.renderBufferDirect(Fa,null,ya.geometry,ya.material,ya,null));d=N.opaque;e=N.transparent;a.overrideMaterial?(f=a.overrideMaterial,d.length&&m(d,a,b,f),e.length&&m(e,a,b,f)):(d.length&&m(d,a,b),e.length&&m(e,a,b));Ma.render(a,b);Oa.render(a,b,Y);c&&ra.updateRenderTargetMipmap(c);
	fa.buffers.depth.setTest(!0);fa.buffers.depth.setMask(!0);fa.buffers.color.setMask(!0);b.isArrayCamera&&C.setScissorTest(!1);b.onAfterRender(C)}};this.setFaceCulling=function(a,b){fa.setCullFace(a);fa.setFlipSided(0===b)};this.allocTextureUnit=function(){var a=T;a>=ma.maxTextures&&console.warn("THREE.WebGLRenderer: Trying to use "+a+" texture units while this GPU supports only "+ma.maxTextures);T+=1;return a};this.setTexture2D=function(){var a=!1;return function(b,c){b&&b.isWebGLRenderTarget&&(a||
	(console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."),a=!0),b=b.texture);ra.setTexture2D(b,c)}}();this.setTexture=function(){var a=!1;return function(b,c){a||(console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."),a=!0);ra.setTexture2D(b,c)}}();this.setTextureCube=function(){var a=!1;return function(b,c){b&&b.isWebGLRenderTargetCube&&(a||(console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."),
	a=!0),b=b.texture);b&&b.isCubeTexture||Array.isArray(b.image)&&6===b.image.length?ra.setTextureCube(b,c):ra.setTextureCubeDynamic(b,c)}}();this.getRenderTarget=function(){return Q};this.setRenderTarget=function(a){(Q=a)&&void 0===ia.get(a).__webglFramebuffer&&ra.setupRenderTarget(a);var b=a&&a.isWebGLRenderTargetCube,c;a?(c=ia.get(a),c=b?c.__webglFramebuffer[a.activeCubeFace]:c.__webglFramebuffer,O.copy(a.scissor),L=a.scissorTest,Y.copy(a.viewport)):(c=null,O.copy(ga).multiplyScalar(Ea),L=Pe,Y.copy(zc).multiplyScalar(Ea));
	K!==c&&(A.bindFramebuffer(A.FRAMEBUFFER,c),K=c);fa.scissor(O);fa.setScissorTest(L);fa.viewport(Y);b&&(b=ia.get(a.texture),A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+a.activeCubeFace,b.__webglTexture,a.activeMipMapLevel))};this.readRenderTargetPixels=function(a,b,c,d,e,f){if(!1===(a&&a.isWebGLRenderTarget))console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");else{var g=ia.get(a).__webglFramebuffer;if(g){var h=
	!1;g!==K&&(A.bindFramebuffer(A.FRAMEBUFFER,g),h=!0);try{var k=a.texture,m=k.format,n=k.type;1023!==m&&y(m)!==A.getParameter(A.IMPLEMENTATION_COLOR_READ_FORMAT)?console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format."):1009===n||y(n)===A.getParameter(A.IMPLEMENTATION_COLOR_READ_TYPE)||1015===n&&(oa.get("OES_texture_float")||oa.get("WEBGL_color_buffer_float"))||1016===n&&oa.get("EXT_color_buffer_half_float")?A.checkFramebufferStatus(A.FRAMEBUFFER)===
	A.FRAMEBUFFER_COMPLETE?0<=b&&b<=a.width-d&&0<=c&&c<=a.height-e&&A.readPixels(b,c,d,e,y(m),y(n),f):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete."):console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.")}finally{h&&A.bindFramebuffer(A.FRAMEBUFFER,K)}}}}}function Kb(a,b){this.name="";this.color=new G(a);this.density=void 0!==b?b:2.5E-4}function Lb(a,
	b,c){this.name="";this.color=new G(a);this.near=void 0!==b?b:1;this.far=void 0!==c?c:1E3}function md(){B.call(this);this.type="Scene";this.overrideMaterial=this.fog=this.background=null;this.autoUpdate=!0}function Yd(a,b,c,d,e){B.call(this);this.lensFlares=[];this.positionScreen=new p;this.customUpdateCallback=void 0;void 0!==a&&this.add(a,b,c,d,e)}function cb(a){Y.call(this);this.type="SpriteMaterial";this.color=new G(16777215);this.map=null;this.rotation=0;this.lights=this.fog=!1;this.setValues(a)}
	function Ac(a){B.call(this);this.type="Sprite";this.material=void 0!==a?a:new cb}function Bc(){B.call(this);this.type="LOD";Object.defineProperties(this,{levels:{enumerable:!0,value:[]}})}function Cc(a,b){a=a||[];this.bones=a.slice(0);this.boneMatrices=new Float32Array(16*this.bones.length);if(void 0===b)this.calculateInverses();else if(this.bones.length===b.length)this.boneInverses=b.slice(0);else{console.warn("THREE.Skeleton boneInverses is the wrong length.");this.boneInverses=[];for(var c=0,d=
	this.bones.length;c<d;c++)this.boneInverses.push(new J)}}function nd(){B.call(this);this.type="Bone"}function od(a,b){Ba.call(this,a,b);this.type="SkinnedMesh";this.bindMode="attached";this.bindMatrix=new J;this.bindMatrixInverse=new J;var c=this.initBones(),c=new Cc(c);this.bind(c,this.matrixWorld);this.normalizeSkinWeights()}function ga(a){Y.call(this);this.type="LineBasicMaterial";this.color=new G(16777215);this.linewidth=1;this.linejoin=this.linecap="round";this.lights=!1;this.setValues(a)}function xa(a,
	b,c){if(1===c)return console.warn("THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead."),new Z(a,b);B.call(this);this.type="Line";this.geometry=void 0!==a?a:new I;this.material=void 0!==b?b:new ga({color:16777215*Math.random()})}function Z(a,b){xa.call(this,a,b);this.type="LineSegments"}function pd(a,b){xa.call(this,a,b);this.type="LineLoop"}function La(a){Y.call(this);this.type="PointsMaterial";this.color=new G(16777215);this.map=null;this.size=1;this.sizeAttenuation=
	!0;this.lights=!1;this.setValues(a)}function Mb(a,b){B.call(this);this.type="Points";this.geometry=void 0!==a?a:new I;this.material=void 0!==b?b:new La({color:16777215*Math.random()})}function Dc(){B.call(this);this.type="Group"}function qd(a,b,c,d,e,f,g,h,k){function m(){requestAnimationFrame(m);a.readyState>=a.HAVE_CURRENT_DATA&&(u.needsUpdate=!0)}da.call(this,a,b,c,d,e,f,g,h,k);this.generateMipmaps=!1;var u=this;m()}function Nb(a,b,c,d,e,f,g,h,k,m,u,q){da.call(this,null,f,g,h,k,m,d,e,u,q);this.image=
	{width:b,height:c};this.mipmaps=a;this.generateMipmaps=this.flipY=!1}function rd(a,b,c,d,e,f,g,h,k){da.call(this,a,b,c,d,e,f,g,h,k);this.needsUpdate=!0}function Ec(a,b,c,d,e,f,g,h,k,m){m=void 0!==m?m:1026;if(1026!==m&&1027!==m)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");void 0===c&&1026===m&&(c=1012);void 0===c&&1027===m&&(c=1020);da.call(this,null,d,e,f,g,h,m,c,k);this.image={width:a,height:b};this.magFilter=void 0!==g?g:1003;this.minFilter=void 0!==
	h?h:1003;this.generateMipmaps=this.flipY=!1}function Ob(a){I.call(this);this.type="WireframeGeometry";var b=[],c,d,e,f,g=[0,0],h={},k,m,u=["a","b","c"];if(a&&a.isGeometry){var q=a.faces;c=0;for(e=q.length;c<e;c++){var n=q[c];for(d=0;3>d;d++)k=n[u[d]],m=n[u[(d+1)%3]],g[0]=Math.min(k,m),g[1]=Math.max(k,m),k=g[0]+","+g[1],void 0===h[k]&&(h[k]={index1:g[0],index2:g[1]})}for(k in h)c=h[k],u=a.vertices[c.index1],b.push(u.x,u.y,u.z),u=a.vertices[c.index2],b.push(u.x,u.y,u.z)}else if(a&&a.isBufferGeometry){var t,
	u=new p;if(null!==a.index){q=a.attributes.position;n=a.index;t=a.groups;0===t.length&&(t=[{start:0,count:n.count,materialIndex:0}]);a=0;for(f=t.length;a<f;++a)for(c=t[a],d=c.start,e=c.count,c=d,e=d+e;c<e;c+=3)for(d=0;3>d;d++)k=n.getX(c+d),m=n.getX(c+(d+1)%3),g[0]=Math.min(k,m),g[1]=Math.max(k,m),k=g[0]+","+g[1],void 0===h[k]&&(h[k]={index1:g[0],index2:g[1]});for(k in h)c=h[k],u.fromBufferAttribute(q,c.index1),b.push(u.x,u.y,u.z),u.fromBufferAttribute(q,c.index2),b.push(u.x,u.y,u.z)}else for(q=a.attributes.position,
	c=0,e=q.count/3;c<e;c++)for(d=0;3>d;d++)h=3*c+d,u.fromBufferAttribute(q,h),b.push(u.x,u.y,u.z),h=3*c+(d+1)%3,u.fromBufferAttribute(q,h),b.push(u.x,u.y,u.z)}this.addAttribute("position",new C(b,3))}function Fc(a,b,c){M.call(this);this.type="ParametricGeometry";this.parameters={func:a,slices:b,stacks:c};this.fromBufferGeometry(new Pb(a,b,c));this.mergeVertices()}function Pb(a,b,c){I.call(this);this.type="ParametricBufferGeometry";this.parameters={func:a,slices:b,stacks:c};var d=[],e=[],f=[],g=[],h=
	new p,k=new p,m=new p,u=new p,q=new p,n,t,l=b+1;for(n=0;n<=c;n++){var r=n/c;for(t=0;t<=b;t++){var y=t/b,k=a(y,r,k);e.push(k.x,k.y,k.z);0<=y-1E-5?(m=a(y-1E-5,r,m),u.subVectors(k,m)):(m=a(y+1E-5,r,m),u.subVectors(m,k));0<=r-1E-5?(m=a(y,r-1E-5,m),q.subVectors(k,m)):(m=a(y,r+1E-5,m),q.subVectors(m,k));h.crossVectors(u,q).normalize();f.push(h.x,h.y,h.z);g.push(y,r)}}for(n=0;n<c;n++)for(t=0;t<b;t++)a=n*l+t+1,h=(n+1)*l+t+1,k=(n+1)*l+t,d.push(n*l+t,a,k),d.push(a,h,k);this.setIndex(d);this.addAttribute("position",
	new C(e,3));this.addAttribute("normal",new C(f,3));this.addAttribute("uv",new C(g,2))}function Gc(a,b,c,d){M.call(this);this.type="PolyhedronGeometry";this.parameters={vertices:a,indices:b,radius:c,detail:d};this.fromBufferGeometry(new ia(a,b,c,d));this.mergeVertices()}function ia(a,b,c,d){function e(a){h.push(a.x,a.y,a.z)}function f(b,c){var d=3*b;c.x=a[d+0];c.y=a[d+1];c.z=a[d+2]}function g(a,b,c,d){0>d&&1===a.x&&(k[b]=a.x-1);0===c.x&&0===c.z&&(k[b]=d/2/Math.PI+.5)}I.call(this);this.type="PolyhedronBufferGeometry";
	this.parameters={vertices:a,indices:b,radius:c,detail:d};c=c||1;d=d||0;var h=[],k=[];(function(a){for(var c=new p,d=new p,g=new p,h=0;h<b.length;h+=3){f(b[h+0],c);f(b[h+1],d);f(b[h+2],g);var k=c,l=d,y=g,x=Math.pow(2,a),v=[],H,w;for(H=0;H<=x;H++){v[H]=[];var S=k.clone().lerp(y,H/x),W=l.clone().lerp(y,H/x),D=x-H;for(w=0;w<=D;w++)v[H][w]=0===w&&H===x?S:S.clone().lerp(W,w/D)}for(H=0;H<x;H++)for(w=0;w<2*(x-H)-1;w++)k=Math.floor(w/2),0===w%2?(e(v[H][k+1]),e(v[H+1][k]),e(v[H][k])):(e(v[H][k+1]),e(v[H+1][k+
	1]),e(v[H+1][k]))}})(d);(function(a){for(var b=new p,c=0;c<h.length;c+=3)b.x=h[c+0],b.y=h[c+1],b.z=h[c+2],b.normalize().multiplyScalar(a),h[c+0]=b.x,h[c+1]=b.y,h[c+2]=b.z})(c);(function(){for(var a=new p,b=0;b<h.length;b+=3)a.x=h[b+0],a.y=h[b+1],a.z=h[b+2],k.push(Math.atan2(a.z,-a.x)/2/Math.PI+.5,1-(Math.atan2(-a.y,Math.sqrt(a.x*a.x+a.z*a.z))/Math.PI+.5));for(var a=new p,b=new p,c=new p,d=new p,e=new E,f=new E,l=new E,y=0,x=0;y<h.length;y+=9,x+=6){a.set(h[y+0],h[y+1],h[y+2]);b.set(h[y+3],h[y+4],h[y+
	5]);c.set(h[y+6],h[y+7],h[y+8]);e.set(k[x+0],k[x+1]);f.set(k[x+2],k[x+3]);l.set(k[x+4],k[x+5]);d.copy(a).add(b).add(c).divideScalar(3);var v=Math.atan2(d.z,-d.x);g(e,x+0,a,v);g(f,x+2,b,v);g(l,x+4,c,v)}for(a=0;a<k.length;a+=6)b=k[a+0],c=k[a+2],d=k[a+4],e=Math.min(b,c,d),.9<Math.max(b,c,d)&&.1>e&&(.2>b&&(k[a+0]+=1),.2>c&&(k[a+2]+=1),.2>d&&(k[a+4]+=1))})();this.addAttribute("position",new C(h,3));this.addAttribute("normal",new C(h.slice(),3));this.addAttribute("uv",new C(k,2));0===d?this.computeVertexNormals():
	this.normalizeNormals()}function Hc(a,b){M.call(this);this.type="TetrahedronGeometry";this.parameters={radius:a,detail:b};this.fromBufferGeometry(new Qb(a,b));this.mergeVertices()}function Qb(a,b){ia.call(this,[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],a,b);this.type="TetrahedronBufferGeometry";this.parameters={radius:a,detail:b}}function Ic(a,b){M.call(this);this.type="OctahedronGeometry";this.parameters={radius:a,detail:b};this.fromBufferGeometry(new mb(a,b));this.mergeVertices()}
	function mb(a,b){ia.call(this,[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],a,b);this.type="OctahedronBufferGeometry";this.parameters={radius:a,detail:b}}function Jc(a,b){M.call(this);this.type="IcosahedronGeometry";this.parameters={radius:a,detail:b};this.fromBufferGeometry(new Rb(a,b));this.mergeVertices()}function Rb(a,b){var c=(1+Math.sqrt(5))/2;ia.call(this,[-1,c,0,1,c,0,-1,-c,0,1,-c,0,0,-1,c,0,1,c,0,-1,-c,0,1,-c,c,0,-1,c,0,1,-c,0,-1,-c,0,1],[0,11,
	5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],a,b);this.type="IcosahedronBufferGeometry";this.parameters={radius:a,detail:b}}function Kc(a,b){M.call(this);this.type="DodecahedronGeometry";this.parameters={radius:a,detail:b};this.fromBufferGeometry(new Sb(a,b));this.mergeVertices()}function Sb(a,b){var c=(1+Math.sqrt(5))/2,d=1/c;ia.call(this,[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-d,-c,0,-d,c,0,
	d,-c,0,d,c,-d,-c,0,-d,c,0,d,-c,0,d,c,0,-c,0,-d,c,0,-d,-c,0,d,c,0,d],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],a,b);this.type="DodecahedronBufferGeometry";this.parameters={radius:a,detail:b}}function Lc(a,b,c,d,e,f){M.call(this);this.type="TubeGeometry";this.parameters={path:a,
	tubularSegments:b,radius:c,radialSegments:d,closed:e};void 0!==f&&console.warn("THREE.TubeGeometry: taper has been removed.");a=new Tb(a,b,c,d,e);this.tangents=a.tangents;this.normals=a.normals;this.binormals=a.binormals;this.fromBufferGeometry(a);this.mergeVertices()}function Tb(a,b,c,d,e){function f(e){var f=a.getPointAt(e/b),m=g.normals[e];e=g.binormals[e];for(q=0;q<=d;q++){var u=q/d*Math.PI*2,r=Math.sin(u),u=-Math.cos(u);k.x=u*m.x+r*e.x;k.y=u*m.y+r*e.y;k.z=u*m.z+r*e.z;k.normalize();l.push(k.x,
	k.y,k.z);h.x=f.x+c*k.x;h.y=f.y+c*k.y;h.z=f.z+c*k.z;n.push(h.x,h.y,h.z)}}I.call(this);this.type="TubeBufferGeometry";this.parameters={path:a,tubularSegments:b,radius:c,radialSegments:d,closed:e};b=b||64;c=c||1;d=d||8;e=e||!1;var g=a.computeFrenetFrames(b,e);this.tangents=g.tangents;this.normals=g.normals;this.binormals=g.binormals;var h=new p,k=new p,m=new E,u,q,n=[],l=[],z=[],r=[];for(u=0;u<b;u++)f(u);f(!1===e?b:0);for(u=0;u<=b;u++)for(q=0;q<=d;q++)m.x=u/b,m.y=q/d,z.push(m.x,m.y);(function(){for(q=
	1;q<=b;q++)for(u=1;u<=d;u++){var a=(d+1)*q+(u-1),c=(d+1)*q+u,e=(d+1)*(q-1)+u;r.push((d+1)*(q-1)+(u-1),a,e);r.push(a,c,e)}})();this.setIndex(r);this.addAttribute("position",new C(n,3));this.addAttribute("normal",new C(l,3));this.addAttribute("uv",new C(z,2))}function Mc(a,b,c,d,e,f,g){M.call(this);this.type="TorusKnotGeometry";this.parameters={radius:a,tube:b,tubularSegments:c,radialSegments:d,p:e,q:f};void 0!==g&&console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead.");
	this.fromBufferGeometry(new Ub(a,b,c,d,e,f));this.mergeVertices()}function Ub(a,b,c,d,e,f){function g(a,b,c,d,e){var f=Math.sin(a);b=c/b*a;c=Math.cos(b);e.x=d*(2+c)*.5*Math.cos(a);e.y=d*(2+c)*f*.5;e.z=d*Math.sin(b)*.5}I.call(this);this.type="TorusKnotBufferGeometry";this.parameters={radius:a,tube:b,tubularSegments:c,radialSegments:d,p:e,q:f};a=a||100;b=b||40;c=Math.floor(c)||64;d=Math.floor(d)||8;e=e||2;f=f||3;var h=[],k=[],m=[],u=[],q,n,l=new p,z=new p,r=new p,y=new p,x=new p,v=new p,H=new p;for(q=
	0;q<=c;++q)for(n=q/c*e*Math.PI*2,g(n,e,f,a,r),g(n+.01,e,f,a,y),v.subVectors(y,r),H.addVectors(y,r),x.crossVectors(v,H),H.crossVectors(x,v),x.normalize(),H.normalize(),n=0;n<=d;++n){var w=n/d*Math.PI*2,S=-b*Math.cos(w),w=b*Math.sin(w);l.x=r.x+(S*H.x+w*x.x);l.y=r.y+(S*H.y+w*x.y);l.z=r.z+(S*H.z+w*x.z);k.push(l.x,l.y,l.z);z.subVectors(l,r).normalize();m.push(z.x,z.y,z.z);u.push(q/c);u.push(n/d)}for(n=1;n<=c;n++)for(q=1;q<=d;q++)a=(d+1)*n+(q-1),b=(d+1)*n+q,e=(d+1)*(n-1)+q,h.push((d+1)*(n-1)+(q-1),a,e),
	h.push(a,b,e);this.setIndex(h);this.addAttribute("position",new C(k,3));this.addAttribute("normal",new C(m,3));this.addAttribute("uv",new C(u,2))}function Nc(a,b,c,d,e){M.call(this);this.type="TorusGeometry";this.parameters={radius:a,tube:b,radialSegments:c,tubularSegments:d,arc:e};this.fromBufferGeometry(new Vb(a,b,c,d,e));this.mergeVertices()}function Vb(a,b,c,d,e){I.call(this);this.type="TorusBufferGeometry";this.parameters={radius:a,tube:b,radialSegments:c,tubularSegments:d,arc:e};a=a||100;b=
	b||40;c=Math.floor(c)||8;d=Math.floor(d)||6;e=e||2*Math.PI;var f=[],g=[],h=[],k=[],m=new p,u=new p,q=new p,n,l;for(n=0;n<=c;n++)for(l=0;l<=d;l++){var z=l/d*e,r=n/c*Math.PI*2;u.x=(a+b*Math.cos(r))*Math.cos(z);u.y=(a+b*Math.cos(r))*Math.sin(z);u.z=b*Math.sin(r);g.push(u.x,u.y,u.z);m.x=a*Math.cos(z);m.y=a*Math.sin(z);q.subVectors(u,m).normalize();h.push(q.x,q.y,q.z);k.push(l/d);k.push(n/c)}for(n=1;n<=c;n++)for(l=1;l<=d;l++)a=(d+1)*(n-1)+l-1,b=(d+1)*(n-1)+l,e=(d+1)*n+l,f.push((d+1)*n+l-1,a,e),f.push(a,
	b,e);this.setIndex(f);this.addAttribute("position",new C(g,3));this.addAttribute("normal",new C(h,3));this.addAttribute("uv",new C(k,2))}function db(a,b){M.call(this);this.type="ExtrudeGeometry";this.parameters={shapes:a,options:b};this.fromBufferGeometry(new Fa(a,b));this.mergeVertices()}function Fa(a,b){"undefined"!==typeof a&&(I.call(this),this.type="ExtrudeBufferGeometry",a=Array.isArray(a)?a:[a],this.addShapeList(a,b),this.computeVertexNormals())}function Oc(a,b){M.call(this);this.type="TextGeometry";
	this.parameters={text:a,parameters:b};this.fromBufferGeometry(new Wb(a,b));this.mergeVertices()}function Wb(a,b){b=b||{};var c=b.font;if(!1===(c&&c.isFont))return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."),new M;c=c.generateShapes(a,b.size,b.curveSegments);b.amount=void 0!==b.height?b.height:50;void 0===b.bevelThickness&&(b.bevelThickness=10);void 0===b.bevelSize&&(b.bevelSize=8);void 0===b.bevelEnabled&&(b.bevelEnabled=!1);Fa.call(this,c,b);this.type="TextBufferGeometry"}
	function Pc(a,b,c,d,e,f,g){M.call(this);this.type="SphereGeometry";this.parameters={radius:a,widthSegments:b,heightSegments:c,phiStart:d,phiLength:e,thetaStart:f,thetaLength:g};this.fromBufferGeometry(new nb(a,b,c,d,e,f,g));this.mergeVertices()}function nb(a,b,c,d,e,f,g){I.call(this);this.type="SphereBufferGeometry";this.parameters={radius:a,widthSegments:b,heightSegments:c,phiStart:d,phiLength:e,thetaStart:f,thetaLength:g};a=a||50;b=Math.max(3,Math.floor(b)||8);c=Math.max(2,Math.floor(c)||6);d=void 0!==
	d?d:0;e=void 0!==e?e:2*Math.PI;f=void 0!==f?f:0;g=void 0!==g?g:Math.PI;var h=f+g,k,m,u=0,q=[],n=new p,l=new p,z=[],r=[],y=[],x=[];for(m=0;m<=c;m++){var v=[],H=m/c;for(k=0;k<=b;k++){var w=k/b;n.x=-a*Math.cos(d+w*e)*Math.sin(f+H*g);n.y=a*Math.cos(f+H*g);n.z=a*Math.sin(d+w*e)*Math.sin(f+H*g);r.push(n.x,n.y,n.z);l.set(n.x,n.y,n.z).normalize();y.push(l.x,l.y,l.z);x.push(w,1-H);v.push(u++)}q.push(v)}for(m=0;m<c;m++)for(k=0;k<b;k++)a=q[m][k+1],d=q[m][k],e=q[m+1][k],g=q[m+1][k+1],(0!==m||0<f)&&z.push(a,d,
	g),(m!==c-1||h<Math.PI)&&z.push(d,e,g);this.setIndex(z);this.addAttribute("position",new C(r,3));this.addAttribute("normal",new C(y,3));this.addAttribute("uv",new C(x,2))}function Qc(a,b,c,d,e,f){M.call(this);this.type="RingGeometry";this.parameters={innerRadius:a,outerRadius:b,thetaSegments:c,phiSegments:d,thetaStart:e,thetaLength:f};this.fromBufferGeometry(new Xb(a,b,c,d,e,f));this.mergeVertices()}function Xb(a,b,c,d,e,f){I.call(this);this.type="RingBufferGeometry";this.parameters={innerRadius:a,
	outerRadius:b,thetaSegments:c,phiSegments:d,thetaStart:e,thetaLength:f};a=a||20;b=b||50;e=void 0!==e?e:0;f=void 0!==f?f:2*Math.PI;c=void 0!==c?Math.max(3,c):8;d=void 0!==d?Math.max(1,d):1;var g=[],h=[],k=[],m=[],u=a,q=(b-a)/d,n=new p,l=new E,z,r;for(z=0;z<=d;z++){for(r=0;r<=c;r++)a=e+r/c*f,n.x=u*Math.cos(a),n.y=u*Math.sin(a),h.push(n.x,n.y,n.z),k.push(0,0,1),l.x=(n.x/b+1)/2,l.y=(n.y/b+1)/2,m.push(l.x,l.y);u+=q}for(z=0;z<d;z++)for(b=z*(c+1),r=0;r<c;r++)a=r+b,e=a+c+1,f=a+c+2,u=a+1,g.push(a,e,u),g.push(e,
	f,u);this.setIndex(g);this.addAttribute("position",new C(h,3));this.addAttribute("normal",new C(k,3));this.addAttribute("uv",new C(m,2))}function Rc(a,b,c,d){M.call(this);this.type="LatheGeometry";this.parameters={points:a,segments:b,phiStart:c,phiLength:d};this.fromBufferGeometry(new Yb(a,b,c,d));this.mergeVertices()}function Yb(a,b,c,d){I.call(this);this.type="LatheBufferGeometry";this.parameters={points:a,segments:b,phiStart:c,phiLength:d};b=Math.floor(b)||12;c=c||0;d=d||2*Math.PI;d=X.clamp(d,
	0,2*Math.PI);var e=[],f=[],g=[],h=1/b,k=new p,m=new E,u,q;for(u=0;u<=b;u++){q=c+u*h*d;var n=Math.sin(q),l=Math.cos(q);for(q=0;q<=a.length-1;q++)k.x=a[q].x*n,k.y=a[q].y,k.z=a[q].x*l,f.push(k.x,k.y,k.z),m.x=u/b,m.y=q/(a.length-1),g.push(m.x,m.y)}for(u=0;u<b;u++)for(q=0;q<a.length-1;q++)c=q+u*a.length,h=c+a.length,k=c+a.length+1,m=c+1,e.push(c,h,m),e.push(h,k,m);this.setIndex(e);this.addAttribute("position",new C(f,3));this.addAttribute("uv",new C(g,2));this.computeVertexNormals();if(d===2*Math.PI)for(d=
	this.attributes.normal.array,e=new p,f=new p,g=new p,c=b*a.length*3,q=u=0;u<a.length;u++,q+=3)e.x=d[q+0],e.y=d[q+1],e.z=d[q+2],f.x=d[c+q+0],f.y=d[c+q+1],f.z=d[c+q+2],g.addVectors(e,f).normalize(),d[q+0]=d[c+q+0]=g.x,d[q+1]=d[c+q+1]=g.y,d[q+2]=d[c+q+2]=g.z}function Zb(a,b){M.call(this);this.type="ShapeGeometry";"object"===typeof b&&(console.warn("THREE.ShapeGeometry: Options parameter has been removed."),b=b.curveSegments);this.parameters={shapes:a,curveSegments:b};this.fromBufferGeometry(new $b(a,
	b));this.mergeVertices()}function $b(a,b){function c(a){var c,h,m=e.length/3;a=a.extractPoints(b);var l=a.shape,r=a.holes;if(!1===ya.isClockWise(l))for(l=l.reverse(),a=0,c=r.length;a<c;a++)h=r[a],!0===ya.isClockWise(h)&&(r[a]=h.reverse());var p=ya.triangulateShape(l,r);a=0;for(c=r.length;a<c;a++)h=r[a],l=l.concat(h);a=0;for(c=l.length;a<c;a++)h=l[a],e.push(h.x,h.y,0),f.push(0,0,1),g.push(h.x,h.y);a=0;for(c=p.length;a<c;a++)l=p[a],d.push(l[0]+m,l[1]+m,l[2]+m),k+=3}I.call(this);this.type="ShapeBufferGeometry";
	this.parameters={shapes:a,curveSegments:b};b=b||12;var d=[],e=[],f=[],g=[],h=0,k=0;if(!1===Array.isArray(a))c(a);else for(var m=0;m<a.length;m++)c(a[m]),this.addGroup(h,k,m),h+=k,k=0;this.setIndex(d);this.addAttribute("position",new C(e,3));this.addAttribute("normal",new C(f,3));this.addAttribute("uv",new C(g,2))}function ac(a,b){I.call(this);this.type="EdgesGeometry";this.parameters={thresholdAngle:b};var c=[],d=Math.cos(X.DEG2RAD*(void 0!==b?b:1)),e=[0,0],f={},g,h,k=["a","b","c"],m;a.isBufferGeometry?
	(m=new M,m.fromBufferGeometry(a)):m=a.clone();m.mergeVertices();m.computeFaceNormals();var u=m.vertices;m=m.faces;for(var l=0,n=m.length;l<n;l++)for(var t=m[l],p=0;3>p;p++)g=t[k[p]],h=t[k[(p+1)%3]],e[0]=Math.min(g,h),e[1]=Math.max(g,h),g=e[0]+","+e[1],void 0===f[g]?f[g]={index1:e[0],index2:e[1],face1:l,face2:void 0}:f[g].face2=l;for(g in f)if(e=f[g],void 0===e.face2||m[e.face1].normal.dot(m[e.face2].normal)<=d)k=u[e.index1],c.push(k.x,k.y,k.z),k=u[e.index2],c.push(k.x,k.y,k.z);this.addAttribute("position",
	new C(c,3))}function ob(a,b,c,d,e,f,g,h){M.call(this);this.type="CylinderGeometry";this.parameters={radiusTop:a,radiusBottom:b,height:c,radialSegments:d,heightSegments:e,openEnded:f,thetaStart:g,thetaLength:h};this.fromBufferGeometry(new Wa(a,b,c,d,e,f,g,h));this.mergeVertices()}function Wa(a,b,c,d,e,f,g,h){function k(c){var e,f,k,r=new E,D=new p,F=0,aa=!0===c?a:b,N=!0===c?1:-1;f=z;for(e=1;e<=d;e++)l.push(0,y*N,0),n.push(0,N,0),t.push(.5,.5),z++;k=z;for(e=0;e<=d;e++){var C=e/d*h+g,B=Math.cos(C),C=
	Math.sin(C);D.x=aa*C;D.y=y*N;D.z=aa*B;l.push(D.x,D.y,D.z);n.push(0,N,0);r.x=.5*B+.5;r.y=.5*C*N+.5;t.push(r.x,r.y);z++}for(e=0;e<d;e++)r=f+e,D=k+e,!0===c?u.push(D,D+1,r):u.push(D+1,D,r),F+=3;m.addGroup(x,F,!0===c?1:2);x+=F}I.call(this);this.type="CylinderBufferGeometry";this.parameters={radiusTop:a,radiusBottom:b,height:c,radialSegments:d,heightSegments:e,openEnded:f,thetaStart:g,thetaLength:h};var m=this;a=void 0!==a?a:20;b=void 0!==b?b:20;c=void 0!==c?c:100;d=Math.floor(d)||8;e=Math.floor(e)||1;
	f=void 0!==f?f:!1;g=void 0!==g?g:0;h=void 0!==h?h:2*Math.PI;var u=[],l=[],n=[],t=[],z=0,r=[],y=c/2,x=0;(function(){var f,k,w=new p,S=new p,W=0,D=(b-a)/c;for(k=0;k<=e;k++){var F=[],aa=k/e,C=aa*(b-a)+a;for(f=0;f<=d;f++){var E=f/d,B=E*h+g,I=Math.sin(B),B=Math.cos(B);S.x=C*I;S.y=-aa*c+y;S.z=C*B;l.push(S.x,S.y,S.z);w.set(I,D,B).normalize();n.push(w.x,w.y,w.z);t.push(E,1-aa);F.push(z++)}r.push(F)}for(f=0;f<d;f++)for(k=0;k<e;k++)w=r[k+1][f],S=r[k+1][f+1],D=r[k][f+1],u.push(r[k][f],w,D),u.push(w,S,D),W+=
	6;m.addGroup(x,W,0);x+=W})();!1===f&&(0<a&&k(!0),0<b&&k(!1));this.setIndex(u);this.addAttribute("position",new C(l,3));this.addAttribute("normal",new C(n,3));this.addAttribute("uv",new C(t,2))}function Sc(a,b,c,d,e,f,g){ob.call(this,0,a,b,c,d,e,f,g);this.type="ConeGeometry";this.parameters={radius:a,height:b,radialSegments:c,heightSegments:d,openEnded:e,thetaStart:f,thetaLength:g}}function Tc(a,b,c,d,e,f,g){Wa.call(this,0,a,b,c,d,e,f,g);this.type="ConeBufferGeometry";this.parameters={radius:a,height:b,
	radialSegments:c,heightSegments:d,openEnded:e,thetaStart:f,thetaLength:g}}function Uc(a,b,c,d){M.call(this);this.type="CircleGeometry";this.parameters={radius:a,segments:b,thetaStart:c,thetaLength:d};this.fromBufferGeometry(new bc(a,b,c,d));this.mergeVertices()}function bc(a,b,c,d){I.call(this);this.type="CircleBufferGeometry";this.parameters={radius:a,segments:b,thetaStart:c,thetaLength:d};a=a||50;b=void 0!==b?Math.max(3,b):8;c=void 0!==c?c:0;d=void 0!==d?d:2*Math.PI;var e=[],f=[],g=[],h=[],k,m,
	u=new p,l=new E;f.push(0,0,0);g.push(0,0,1);h.push(.5,.5);m=0;for(k=3;m<=b;m++,k+=3){var n=c+m/b*d;u.x=a*Math.cos(n);u.y=a*Math.sin(n);f.push(u.x,u.y,u.z);g.push(0,0,1);l.x=(f[k]/a+1)/2;l.y=(f[k+1]/a+1)/2;h.push(l.x,l.y)}for(k=1;k<=b;k++)e.push(k,k+1,0);this.setIndex(e);this.addAttribute("position",new C(f,3));this.addAttribute("normal",new C(g,3));this.addAttribute("uv",new C(h,2))}function cc(a){Da.call(this,{uniforms:Ha.merge([U.lights,{opacity:{value:1}}]),vertexShader:T.shadow_vert,fragmentShader:T.shadow_frag});
	this.transparent=this.lights=!0;Object.defineProperties(this,{opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(a){this.uniforms.opacity.value=a}}});this.setValues(a)}function dc(a){Da.call(this,a);this.type="RawShaderMaterial"}function Ra(a){Y.call(this);this.defines={STANDARD:""};this.type="MeshStandardMaterial";this.color=new G(16777215);this.metalness=this.roughness=.5;this.lightMap=this.map=null;this.lightMapIntensity=1;this.aoMap=null;this.aoMapIntensity=
	1;this.emissive=new G(0);this.emissiveIntensity=1;this.bumpMap=this.emissiveMap=null;this.bumpScale=1;this.normalMap=null;this.normalScale=new E(1,1);this.displacementMap=null;this.displacementScale=1;this.displacementBias=0;this.envMap=this.alphaMap=this.metalnessMap=this.roughnessMap=null;this.envMapIntensity=1;this.refractionRatio=.98;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)}
	function pb(a){Ra.call(this);this.defines={PHYSICAL:""};this.type="MeshPhysicalMaterial";this.reflectivity=.5;this.clearCoatRoughness=this.clearCoat=0;this.setValues(a)}function sa(a){Y.call(this);this.type="MeshPhongMaterial";this.color=new G(16777215);this.specular=new G(1118481);this.shininess=30;this.lightMap=this.map=null;this.lightMapIntensity=1;this.aoMap=null;this.aoMapIntensity=1;this.emissive=new G(0);this.emissiveIntensity=1;this.bumpMap=this.emissiveMap=null;this.bumpScale=1;this.normalMap=
	null;this.normalScale=new E(1,1);this.displacementMap=null;this.displacementScale=1;this.displacementBias=0;this.envMap=this.alphaMap=this.specularMap=null;this.combine=0;this.reflectivity=1;this.refractionRatio=.98;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)}function qb(a){sa.call(this);this.defines={TOON:""};this.type="MeshToonMaterial";this.gradientMap=null;this.setValues(a)}
	function rb(a){Y.call(this,a);this.type="MeshNormalMaterial";this.bumpMap=null;this.bumpScale=1;this.normalMap=null;this.normalScale=new E(1,1);this.displacementMap=null;this.displacementScale=1;this.displacementBias=0;this.wireframe=!1;this.wireframeLinewidth=1;this.morphNormals=this.morphTargets=this.skinning=this.lights=this.fog=!1;this.setValues(a)}function sb(a){Y.call(this);this.type="MeshLambertMaterial";this.color=new G(16777215);this.lightMap=this.map=null;this.lightMapIntensity=1;this.aoMap=
	null;this.aoMapIntensity=1;this.emissive=new G(0);this.emissiveIntensity=1;this.envMap=this.alphaMap=this.specularMap=this.emissiveMap=null;this.combine=0;this.reflectivity=1;this.refractionRatio=.98;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)}function tb(a){Y.call(this);this.type="LineDashedMaterial";this.color=new G(16777215);this.scale=this.linewidth=1;this.dashSize=3;this.gapSize=
	1;this.lights=!1;this.setValues(a)}function Zd(a,b,c){var d=this,e=!1,f=0,g=0;this.onStart=void 0;this.onLoad=a;this.onProgress=b;this.onError=c;this.itemStart=function(a){g++;if(!1===e&&void 0!==d.onStart)d.onStart(a,f,g);e=!0};this.itemEnd=function(a){f++;if(void 0!==d.onProgress)d.onProgress(a,f,g);if(f===g&&(e=!1,void 0!==d.onLoad))d.onLoad()};this.itemError=function(a){if(void 0!==d.onError)d.onError(a)}}function ta(a){this.manager=void 0!==a?a:za}function Qe(a){this.manager=void 0!==a?a:za;
	this._parser=null}function $d(a){this.manager=void 0!==a?a:za;this._parser=null}function Vc(a){this.manager=void 0!==a?a:za}function ae(a){this.manager=void 0!==a?a:za}function sd(a){this.manager=void 0!==a?a:za}function ja(a,b){B.call(this);this.type="Light";this.color=new G(a);this.intensity=void 0!==b?b:1;this.receiveShadow=void 0}function td(a,b,c){ja.call(this,a,c);this.type="HemisphereLight";this.castShadow=void 0;this.position.copy(B.DefaultUp);this.updateMatrix();this.groundColor=new G(b)}
	function ub(a){this.camera=a;this.bias=0;this.radius=1;this.mapSize=new E(512,512);this.map=null;this.matrix=new J}function ud(){ub.call(this,new wa(50,1,.5,500))}function vd(a,b,c,d,e,f){ja.call(this,a,b);this.type="SpotLight";this.position.copy(B.DefaultUp);this.updateMatrix();this.target=new B;Object.defineProperty(this,"power",{get:function(){return this.intensity*Math.PI},set:function(a){this.intensity=a/Math.PI}});this.distance=void 0!==c?c:0;this.angle=void 0!==d?d:Math.PI/3;this.penumbra=
	void 0!==e?e:0;this.decay=void 0!==f?f:1;this.shadow=new ud}function wd(a,b,c,d){ja.call(this,a,b);this.type="PointLight";Object.defineProperty(this,"power",{get:function(){return 4*this.intensity*Math.PI},set:function(a){this.intensity=a/(4*Math.PI)}});this.distance=void 0!==c?c:0;this.decay=void 0!==d?d:1;this.shadow=new ub(new wa(90,1,.5,500))}function xd(){ub.call(this,new Jb(-5,5,5,-5,.5,500))}function yd(a,b){ja.call(this,a,b);this.type="DirectionalLight";this.position.copy(B.DefaultUp);this.updateMatrix();
	this.target=new B;this.shadow=new xd}function zd(a,b){ja.call(this,a,b);this.type="AmbientLight";this.castShadow=void 0}function Ad(a,b,c,d){ja.call(this,a,b);this.type="RectAreaLight";this.position.set(0,1,0);this.updateMatrix();this.width=void 0!==c?c:10;this.height=void 0!==d?d:10}function Ca(a,b,c,d){this.parameterPositions=a;this._cachedIndex=0;this.resultBuffer=void 0!==d?d:new b.constructor(c);this.sampleValues=b;this.valueSize=c}function Bd(a,b,c,d){Ca.call(this,a,b,c,d);this._offsetNext=
	this._weightNext=this._offsetPrev=this._weightPrev=-0}function Wc(a,b,c,d){Ca.call(this,a,b,c,d)}function Cd(a,b,c,d){Ca.call(this,a,b,c,d)}function vb(a,b,c,d){if(void 0===a)throw Error("track name is undefined");if(void 0===b||0===b.length)throw Error("no keyframes in track named "+a);this.name=a;this.times=ua.convertArray(b,this.TimeBufferType);this.values=ua.convertArray(c,this.ValueBufferType);this.setInterpolation(d||this.DefaultInterpolation);this.validate();this.optimize()}function ec(a,b,
	c,d){vb.call(this,a,b,c,d)}function Dd(a,b,c,d){Ca.call(this,a,b,c,d)}function Xc(a,b,c,d){vb.call(this,a,b,c,d)}function fc(a,b,c,d){vb.call(this,a,b,c,d)}function Ed(a,b,c,d){vb.call(this,a,b,c,d)}function Fd(a,b,c){vb.call(this,a,b,c)}function Gd(a,b,c,d){vb.call(this,a,b,c,d)}function wb(a,b,c,d){vb.apply(this,arguments)}function Aa(a,b,c){this.name=a;this.tracks=c;this.duration=void 0!==b?b:-1;this.uuid=X.generateUUID();0>this.duration&&this.resetDuration();this.optimize()}function Hd(a){this.manager=
	void 0!==a?a:za;this.textures={}}function be(a){this.manager=void 0!==a?a:za}function gc(){this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){}}function ce(a){"boolean"===typeof a&&(console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."),a=void 0);this.manager=void 0!==a?a:za;this.withCredentials=!1}function Re(a){this.manager=void 0!==a?a:za;this.texturePath=""}function Se(a,b,c,d,e){b=.5*(d-b);e=.5*(e-c);var f=a*a;return(2*
	c-2*d+b+e)*a*f+(-3*c+3*d-2*b-e)*f+b*a+c}function xb(a,b,c,d){var e=1-a;return e*e*b+2*(1-a)*a*c+a*a*d}function yb(a,b,c,d,e){var f=1-a,g=1-a;return f*f*f*b+3*g*g*a*c+3*(1-a)*a*a*d+a*a*a*e}function ma(){this.arcLengthDivisions=200}function Sa(a,b){this.arcLengthDivisions=200;this.v1=a;this.v2=b}function Yc(){this.arcLengthDivisions=200;this.curves=[];this.autoClose=!1}function Xa(a,b,c,d,e,f,g,h){this.arcLengthDivisions=200;this.aX=a;this.aY=b;this.xRadius=c;this.yRadius=d;this.aStartAngle=e;this.aEndAngle=
	f;this.aClockwise=g;this.aRotation=h||0}function zb(a){this.arcLengthDivisions=200;this.points=void 0===a?[]:a}function hc(a,b,c,d){this.arcLengthDivisions=200;this.v0=a;this.v1=b;this.v2=c;this.v3=d}function ic(a,b,c){this.arcLengthDivisions=200;this.v0=a;this.v1=b;this.v2=c}function Zc(a){Yc.call(this);this.currentPoint=new E;a&&this.fromPoints(a)}function Ab(){Zc.apply(this,arguments);this.holes=[]}function de(){this.subPaths=[];this.currentPath=null}function ee(a){this.data=a}function Te(a){this.manager=
	void 0!==a?a:za}function fe(a){this.manager=void 0!==a?a:za}function Ue(){this.type="StereoCamera";this.aspect=1;this.eyeSep=.064;this.cameraL=new wa;this.cameraL.layers.enable(1);this.cameraL.matrixAutoUpdate=!1;this.cameraR=new wa;this.cameraR.layers.enable(2);this.cameraR.matrixAutoUpdate=!1}function Id(a,b,c){B.call(this);this.type="CubeCamera";var d=new wa(90,1,a,b);d.up.set(0,-1,0);d.lookAt(new p(1,0,0));this.add(d);var e=new wa(90,1,a,b);e.up.set(0,-1,0);e.lookAt(new p(-1,0,0));this.add(e);
	var f=new wa(90,1,a,b);f.up.set(0,0,1);f.lookAt(new p(0,1,0));this.add(f);var g=new wa(90,1,a,b);g.up.set(0,0,-1);g.lookAt(new p(0,-1,0));this.add(g);var h=new wa(90,1,a,b);h.up.set(0,-1,0);h.lookAt(new p(0,0,1));this.add(h);var k=new wa(90,1,a,b);k.up.set(0,-1,0);k.lookAt(new p(0,0,-1));this.add(k);this.renderTarget=new Eb(c,c,{format:1022,magFilter:1006,minFilter:1006});this.renderTarget.texture.name="CubeCamera";this.updateCubeMap=function(a,b){null===this.parent&&this.updateMatrixWorld();var c=
	this.renderTarget,n=c.texture.generateMipmaps;c.texture.generateMipmaps=!1;c.activeCubeFace=0;a.render(b,d,c);c.activeCubeFace=1;a.render(b,e,c);c.activeCubeFace=2;a.render(b,f,c);c.activeCubeFace=3;a.render(b,g,c);c.activeCubeFace=4;a.render(b,h,c);c.texture.generateMipmaps=n;c.activeCubeFace=5;a.render(b,k,c);a.setRenderTarget(null)}}function ge(a){wa.call(this);this.cameras=a||[]}function he(){B.call(this);this.type="AudioListener";this.context=ie.getContext();this.gain=this.context.createGain();
	this.gain.connect(this.context.destination);this.filter=null}function jc(a){B.call(this);this.type="Audio";this.context=a.context;this.gain=this.context.createGain();this.gain.connect(a.getInput());this.autoplay=!1;this.buffer=null;this.loop=!1;this.startTime=0;this.playbackRate=1;this.isPlaying=!1;this.hasPlaybackControl=!0;this.sourceType="empty";this.filters=[]}function je(a){jc.call(this,a);this.panner=this.context.createPanner();this.panner.connect(this.gain)}function ke(a,b){this.analyser=a.context.createAnalyser();
	this.analyser.fftSize=void 0!==b?b:2048;this.data=new Uint8Array(this.analyser.frequencyBinCount);a.getOutput().connect(this.analyser)}function le(a,b,c){this.binding=a;this.valueSize=c;a=Float64Array;switch(b){case "quaternion":b=this._slerp;break;case "string":case "bool":a=Array;b=this._select;break;default:b=this._lerp}this.buffer=new a(4*c);this._mixBufferRegion=b;this.referenceCount=this.useCount=this.cumulativeWeight=0}function Ve(a,b,c){c=c||na.parseTrackName(b);this._targetGroup=a;this._bindings=
	a.subscribe_(b,c)}function na(a,b,c){this.path=b;this.parsedPath=c||na.parseTrackName(b);this.node=na.findNode(a,this.parsedPath.nodeName)||a;this.rootNode=a}function We(a){this.uuid=X.generateUUID();this._objects=Array.prototype.slice.call(arguments);this.nCachedObjects_=0;var b={};this._indicesByUUID=b;for(var c=0,d=arguments.length;c!==d;++c)b[arguments[c].uuid]=c;this._paths=[];this._parsedPaths=[];this._bindings=[];this._bindingsIndicesByPath={};var e=this;this.stats={objects:{get total(){return e._objects.length},
	get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}function Xe(a,b,c){this._mixer=a;this._clip=b;this._localRoot=c||null;a=b.tracks;b=a.length;c=Array(b);for(var d={endingStart:2400,endingEnd:2400},e=0;e!==b;++e){var f=a[e].createInterpolant(null);c[e]=f;f.settings=d}this._interpolantSettings=d;this._interpolants=c;this._propertyBindings=Array(b);this._weightInterpolant=this._timeScaleInterpolant=this._byClipCacheIndex=this._cacheIndex=null;this.loop=
	2201;this._loopCount=-1;this._startTime=null;this.time=0;this._effectiveWeight=this.weight=this._effectiveTimeScale=this.timeScale=1;this.repetitions=Infinity;this.paused=!1;this.enabled=!0;this.clampWhenFinished=!1;this.zeroSlopeAtEnd=this.zeroSlopeAtStart=!0}function Ye(a){this._root=a;this._initMemoryManager();this.time=this._accuIndex=0;this.timeScale=1}function Jd(a,b){"string"===typeof a&&(console.warn("THREE.Uniform: Type parameter is no longer needed."),a=b);this.value=a}function me(){I.call(this);
	this.type="InstancedBufferGeometry";this.maxInstancedCount=void 0}function ne(a,b,c,d){this.uuid=X.generateUUID();this.data=a;this.itemSize=b;this.offset=c;this.normalized=!0===d}function kc(a,b){this.uuid=X.generateUUID();this.array=a;this.stride=b;this.count=void 0!==a?a.length/b:0;this.dynamic=!1;this.updateRange={offset:0,count:-1};this.onUploadCallback=function(){};this.version=0}function oe(a,b,c){kc.call(this,a,b);this.meshPerAttribute=c||1}function pe(a,b,c){L.call(this,a,b);this.meshPerAttribute=
	c||1}function Ze(a,b,c,d){this.ray=new hb(a,b);this.near=c||0;this.far=d||Infinity;this.params={Mesh:{},Line:{},LOD:{},Points:{threshold:1},Sprite:{}};Object.defineProperties(this.params,{PointCloud:{get:function(){console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points.");return this.Points}}})}function $e(a,b){return a.distance-b.distance}function qe(a,b,c,d){if(!1!==a.visible&&(a.raycast(b,c),!0===d)){a=a.children;d=0;for(var e=a.length;d<e;d++)qe(a[d],b,c,!0)}}function af(a){this.autoStart=
	void 0!==a?a:!0;this.elapsedTime=this.oldTime=this.startTime=0;this.running=!1}function bf(a,b,c){this.radius=void 0!==a?a:1;this.phi=void 0!==b?b:0;this.theta=void 0!==c?c:0;return this}function cf(a,b,c){this.radius=void 0!==a?a:1;this.theta=void 0!==b?b:0;this.y=void 0!==c?c:0;return this}function qa(a,b){Ba.call(this,a,b);this.animationsMap={};this.animationsList=[];var c=this.geometry.morphTargets.length;this.createAnimation("__default",0,c-1,c/1);this.setAnimationWeight("__default",1)}function $c(a){B.call(this);
	this.material=a;this.render=function(a){}}function ad(a,b,c,d){this.object=a;this.size=void 0!==b?b:1;a=void 0!==c?c:16711680;d=void 0!==d?d:1;b=0;(c=this.object.geometry)&&c.isGeometry?b=3*c.faces.length:c&&c.isBufferGeometry&&(b=c.attributes.normal.count);c=new I;b=new C(6*b,3);c.addAttribute("position",b);Z.call(this,c,new ga({color:a,linewidth:d}));this.matrixAutoUpdate=!1;this.update()}function lc(a){B.call(this);this.light=a;this.light.updateMatrixWorld();this.matrix=a.matrixWorld;this.matrixAutoUpdate=
	!1;a=new I;for(var b=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1],c=0,d=1;32>c;c++,d++){var e=c/32*Math.PI*2,f=d/32*Math.PI*2;b.push(Math.cos(e),Math.sin(e),1,Math.cos(f),Math.sin(f),1)}a.addAttribute("position",new C(b,3));b=new ga({fog:!1});this.cone=new Z(a,b);this.add(this.cone);this.update()}function df(a){var b=[];a&&a.isBone&&b.push(a);for(var c=0;c<a.children.length;c++)b.push.apply(b,df(a.children[c]));return b}function mc(a){for(var b=df(a),c=new I,d=[],e=[],f=new G(0,
	0,1),g=new G(0,1,0),h=0;h<b.length;h++){var k=b[h];k.parent&&k.parent.isBone&&(d.push(0,0,0),d.push(0,0,0),e.push(f.r,f.g,f.b),e.push(g.r,g.g,g.b))}c.addAttribute("position",new C(d,3));c.addAttribute("color",new C(e,3));d=new ga({vertexColors:2,depthTest:!1,depthWrite:!1,transparent:!0});Z.call(this,c,d);this.root=a;this.bones=b;this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1;this.onBeforeRender()}function nc(a,b){this.light=a;this.light.updateMatrixWorld();var c=new nb(b,4,2),d=new Na({wireframe:!0,
	fog:!1});d.color.copy(this.light.color);Ba.call(this,c,d);this.matrix=this.light.matrixWorld;this.matrixAutoUpdate=!1}function oc(a){B.call(this);this.light=a;this.light.updateMatrixWorld();this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1;a=new ga({color:a.color});var b=new I;b.addAttribute("position",new L(new Float32Array(15),3));this.add(new xa(b,a));this.update()}function pc(a,b){B.call(this);this.light=a;this.light.updateMatrixWorld();this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1;var c=
	new mb(b);c.rotateY(.5*Math.PI);var d=new Na({vertexColors:2,wireframe:!0}),e=c.getAttribute("position"),e=new Float32Array(3*e.count);c.addAttribute("color",new L(e,3));this.add(new Ba(c,d));this.update()}function bd(a,b,c,d){a=a||10;b=b||10;c=new G(void 0!==c?c:4473924);d=new G(void 0!==d?d:8947848);var e=b/2,f=a/b,g=a/2;a=[];for(var h=[],k=0,m=0,u=-g;k<=b;k++,u+=f){a.push(-g,0,u,g,0,u);a.push(u,0,-g,u,0,g);var l=k===e?c:d;l.toArray(h,m);m+=3;l.toArray(h,m);m+=3;l.toArray(h,m);m+=3;l.toArray(h,
	m);m+=3}b=new I;b.addAttribute("position",new C(a,3));b.addAttribute("color",new C(h,3));c=new ga({vertexColors:2});Z.call(this,b,c)}function Kd(a,b,c,d,e,f){a=a||10;b=b||16;c=c||8;d=d||64;e=new G(void 0!==e?e:4473924);f=new G(void 0!==f?f:8947848);var g=[],h=[],k,m,u,l,n;for(u=0;u<=b;u++)m=u/b*2*Math.PI,k=Math.sin(m)*a,m=Math.cos(m)*a,g.push(0,0,0),g.push(k,0,m),n=u&1?e:f,h.push(n.r,n.g,n.b),h.push(n.r,n.g,n.b);for(u=0;u<=c;u++)for(n=u&1?e:f,l=a-a/c*u,b=0;b<d;b++)m=b/d*2*Math.PI,k=Math.sin(m)*l,
	m=Math.cos(m)*l,g.push(k,0,m),h.push(n.r,n.g,n.b),m=(b+1)/d*2*Math.PI,k=Math.sin(m)*l,m=Math.cos(m)*l,g.push(k,0,m),h.push(n.r,n.g,n.b);a=new I;a.addAttribute("position",new C(g,3));a.addAttribute("color",new C(h,3));g=new ga({vertexColors:2});Z.call(this,a,g)}function cd(a,b,c,d){this.object=a;this.size=void 0!==b?b:1;a=void 0!==c?c:16776960;d=void 0!==d?d:1;b=0;(c=this.object.geometry)&&c.isGeometry?b=c.faces.length:console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");
	c=new I;b=new C(6*b,3);c.addAttribute("position",b);Z.call(this,c,new ga({color:a,linewidth:d}));this.matrixAutoUpdate=!1;this.update()}function qc(a,b){B.call(this);this.light=a;this.light.updateMatrixWorld();this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1;void 0===b&&(b=1);var c=new I;c.addAttribute("position",new C([-b,b,0,b,b,0,b,-b,0,-b,-b,0,-b,b,0],3));var d=new ga({fog:!1});this.add(new xa(c,d));c=new I;c.addAttribute("position",new C([0,0,0,0,0,1],3));this.add(new xa(c,d));this.update()}
	function dd(a){function b(a,b,d){c(a,d);c(b,d)}function c(a,b){f.push(0,0,0);g.push(b.r,b.g,b.b);void 0===h[a]&&(h[a]=[]);h[a].push(f.length/3-1)}var d=new I,e=new ga({color:16777215,vertexColors:1}),f=[],g=[],h={},k=new G(16755200),m=new G(16711680),u=new G(43775),l=new G(16777215),n=new G(3355443);b("n1","n2",k);b("n2","n4",k);b("n4","n3",k);b("n3","n1",k);b("f1","f2",k);b("f2","f4",k);b("f4","f3",k);b("f3","f1",k);b("n1","f1",k);b("n2","f2",k);b("n3","f3",k);b("n4","f4",k);b("p","n1",m);b("p",
	"n2",m);b("p","n3",m);b("p","n4",m);b("u1","u2",u);b("u2","u3",u);b("u3","u1",u);b("c","t",l);b("p","c",n);b("cn1","cn2",n);b("cn3","cn4",n);b("cf1","cf2",n);b("cf3","cf4",n);d.addAttribute("position",new C(f,3));d.addAttribute("color",new C(g,3));Z.call(this,d,e);this.camera=a;this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix();this.matrix=a.matrixWorld;this.matrixAutoUpdate=!1;this.pointMap=h;this.update()}function Bb(a,b){this.object=a;void 0===b&&(b=16776960);var c=new Uint16Array([0,
	1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),d=new Float32Array(24),e=new I;e.setIndex(new L(c,1));e.addAttribute("position",new L(d,3));Z.call(this,e,new ga({color:b}));this.matrixAutoUpdate=!1;this.update()}function Cb(a,b,c,d,e,f){B.call(this);void 0===d&&(d=16776960);void 0===c&&(c=1);void 0===e&&(e=.2*c);void 0===f&&(f=.2*e);void 0===Ld&&(Ld=new I,Ld.addAttribute("position",new C([0,0,0,0,1,0],3)),re=new Wa(0,.5,1,5,1),re.translate(0,-.5,0));this.position.copy(b);this.line=new xa(Ld,new ga({color:d}));
	this.line.matrixAutoUpdate=!1;this.add(this.line);this.cone=new Ba(re,new Na({color:d}));this.cone.matrixAutoUpdate=!1;this.add(this.cone);this.setDirection(a);this.setLength(c,e,f)}function Md(a){a=a||1;var b=[0,0,0,a,0,0,0,0,0,0,a,0,0,0,0,0,0,a];a=new I;a.addAttribute("position",new C(b,3));a.addAttribute("color",new C([1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],3));b=new ga({vertexColors:2});Z.call(this,a,b)}function se(){var a=0,b=0,c=0,d=0;return{initCatmullRom:function(e,f,g,h,k){e=k*(g-e);h=k*
	(h-f);a=f;b=e;c=-3*f+3*g-2*e-h;d=2*f-2*g+e+h},initNonuniformCatmullRom:function(e,f,g,h,k,m,u){e=((f-e)/k-(g-e)/(k+m)+(g-f)/m)*m;h=((g-f)/m-(h-f)/(m+u)+(h-g)/u)*m;a=f;b=e;c=-3*f+3*g-2*e-h;d=2*f-2*g+e+h},calc:function(e){var f=e*e;return a+b*e+c*f+d*f*e}}}function Ja(a){this.arcLengthDivisions=200;2>a.length&&console.warn("THREE.CatmullRomCurve3: Points array needs at least two entries.");this.points=a||[];this.closed=!1}function ed(a,b,c,d){this.arcLengthDivisions=200;this.v0=a;this.v1=b;this.v2=
	c;this.v3=d}function fd(a,b,c){this.arcLengthDivisions=200;this.v0=a;this.v1=b;this.v2=c}function gd(a,b){this.arcLengthDivisions=200;this.v1=a;this.v2=b}function Nd(a,b,c,d,e,f){Xa.call(this,a,b,c,c,d,e,f)}function ef(a){console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.");Ja.call(this,a);this.type="catmullrom";this.closed=!0}function ff(a){console.warn("THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.");Ja.call(this,a);this.type=
	"catmullrom"}function te(a){console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead.");Ja.call(this,a);this.type="catmullrom"}void 0===Number.EPSILON&&(Number.EPSILON=Math.pow(2,-52));void 0===Number.isInteger&&(Number.isInteger=function(a){return"number"===typeof a&&isFinite(a)&&Math.floor(a)===a});void 0===Math.sign&&(Math.sign=function(a){return 0>a?-1:0<a?1:+a});void 0===Function.prototype.name&&Object.defineProperty(Function.prototype,"name",{get:function(){return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]}});
	void 0===Object.assign&&function(){Object.assign=function(a){if(void 0===a||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var d=arguments[c];if(void 0!==d&&null!==d)for(var e in d)Object.prototype.hasOwnProperty.call(d,e)&&(b[e]=d[e])}return b}}();Object.assign(ra.prototype,{addEventListener:function(a,b){void 0===this._listeners&&(this._listeners={});var c=this._listeners;void 0===c[a]&&(c[a]=[]);-1===c[a].indexOf(b)&&c[a].push(b)},
	hasEventListener:function(a,b){if(void 0===this._listeners)return!1;var c=this._listeners;return void 0!==c[a]&&-1!==c[a].indexOf(b)},removeEventListener:function(a,b){if(void 0!==this._listeners){var c=this._listeners[a];if(void 0!==c){var d=c.indexOf(b);-1!==d&&c.splice(d,1)}}},dispatchEvent:function(a){if(void 0!==this._listeners){var b=this._listeners[a.type];if(void 0!==b){a.target=this;var c=[],d,e=b.length;for(d=0;d<e;d++)c[d]=b[d];for(d=0;d<e;d++)c[d].call(this,a)}}}});var X={DEG2RAD:Math.PI/
	180,RAD2DEG:180/Math.PI,generateUUID:function(){var a="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),b=Array(36),c=0,d;return function(){for(var e=0;36>e;e++)8===e||13===e||18===e||23===e?b[e]="-":14===e?b[e]="4":(2>=c&&(c=33554432+16777216*Math.random()|0),d=c&15,c>>=4,b[e]=a[19===e?d&3|8:d]);return b.join("")}}(),clamp:function(a,b,c){return Math.max(b,Math.min(c,a))},euclideanModulo:function(a,b){return(a%b+b)%b},mapLinear:function(a,b,c,d,e){return d+(a-b)*(e-d)/(c-
	b)},lerp:function(a,b,c){return(1-c)*a+c*b},smoothstep:function(a,b,c){if(a<=b)return 0;if(a>=c)return 1;a=(a-b)/(c-b);return a*a*(3-2*a)},smootherstep:function(a,b,c){if(a<=b)return 0;if(a>=c)return 1;a=(a-b)/(c-b);return a*a*a*(a*(6*a-15)+10)},randInt:function(a,b){return a+Math.floor(Math.random()*(b-a+1))},randFloat:function(a,b){return a+Math.random()*(b-a)},randFloatSpread:function(a){return a*(.5-Math.random())},degToRad:function(a){return a*X.DEG2RAD},radToDeg:function(a){return a*X.RAD2DEG},
	isPowerOfTwo:function(a){return 0===(a&a-1)&&0!==a},nearestPowerOfTwo:function(a){return Math.pow(2,Math.round(Math.log(a)/Math.LN2))},nextPowerOfTwo:function(a){a--;a|=a>>1;a|=a>>2;a|=a>>4;a|=a>>8;a|=a>>16;a++;return a}};Object.defineProperties(E.prototype,{width:{get:function(){return this.x},set:function(a){this.x=a}},height:{get:function(){return this.y},set:function(a){this.y=a}}});Object.assign(E.prototype,{isVector2:!0,set:function(a,b){this.x=a;this.y=b;return this},setScalar:function(a){this.y=
	this.x=a;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;default:throw Error("index is out of range: "+a);}return this},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+a);}},clone:function(){return new this.constructor(this.x,this.y)},copy:function(a){this.x=a.x;this.y=a.y;return this},add:function(a,
	b){if(void 0!==b)return console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;return this},addScalar:function(a){this.x+=a;this.y+=a;return this},addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;return this},addScaledVector:function(a,b){this.x+=a.x*b;this.y+=a.y*b;return this},sub:function(a,b){if(void 0!==b)return console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
	this.subVectors(a,b);this.x-=a.x;this.y-=a.y;return this},subScalar:function(a){this.x-=a;this.y-=a;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;return this},multiply:function(a){this.x*=a.x;this.y*=a.y;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;return this},divide:function(a){this.x/=a.x;this.y/=a.y;return this},divideScalar:function(a){return this.multiplyScalar(1/a)},min:function(a){this.x=Math.min(this.x,a.x);this.y=Math.min(this.y,a.y);return this},max:function(a){this.x=
	Math.max(this.x,a.x);this.y=Math.max(this.y,a.y);return this},clamp:function(a,b){this.x=Math.max(a.x,Math.min(b.x,this.x));this.y=Math.max(a.y,Math.min(b.y,this.y));return this},clampScalar:function(){var a=new E,b=new E;return function(c,d){a.set(c,c);b.set(d,d);return this.clamp(a,b)}}(),clampLength:function(a,b){var c=this.length();return this.multiplyScalar(Math.max(a,Math.min(b,c))/c)},floor:function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this},ceil:function(){this.x=Math.ceil(this.x);
	this.y=Math.ceil(this.y);return this},round:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this},roundToZero:function(){this.x=0>this.x?Math.ceil(this.x):Math.floor(this.x);this.y=0>this.y?Math.ceil(this.y):Math.floor(this.y);return this},negate:function(){this.x=-this.x;this.y=-this.y;return this},dot:function(a){return this.x*a.x+this.y*a.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},lengthManhattan:function(){return Math.abs(this.x)+
	Math.abs(this.y)},normalize:function(){return this.divideScalar(this.length())},angle:function(){var a=Math.atan2(this.y,this.x);0>a&&(a+=2*Math.PI);return a},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x;a=this.y-a.y;return b*b+a*a},distanceToManhattan:function(a){return Math.abs(this.x-a.x)+Math.abs(this.y-a.y)},setLength:function(a){return this.multiplyScalar(a/this.length())},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=
	(a.y-this.y)*b;return this},lerpVectors:function(a,b,c){return this.subVectors(b,a).multiplyScalar(c).add(a)},equals:function(a){return a.x===this.x&&a.y===this.y},fromArray:function(a,b){void 0===b&&(b=0);this.x=a[b];this.y=a[b+1];return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=this.x;a[b+1]=this.y;return a},fromBufferAttribute:function(a,b,c){void 0!==c&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute().");this.x=a.getX(b);this.y=a.getY(b);
	return this},rotateAround:function(a,b){var c=Math.cos(b),d=Math.sin(b),e=this.x-a.x,f=this.y-a.y;this.x=e*c-f*d+a.x;this.y=e*d+f*c+a.y;return this}});var kf=0;da.DEFAULT_IMAGE=void 0;da.DEFAULT_MAPPING=300;Object.defineProperty(da.prototype,"needsUpdate",{set:function(a){!0===a&&this.version++}});Object.assign(da.prototype,ra.prototype,{constructor:da,isTexture:!0,clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.name=a.name;this.image=a.image;this.mipmaps=a.mipmaps.slice(0);
	this.mapping=a.mapping;this.wrapS=a.wrapS;this.wrapT=a.wrapT;this.magFilter=a.magFilter;this.minFilter=a.minFilter;this.anisotropy=a.anisotropy;this.format=a.format;this.type=a.type;this.offset.copy(a.offset);this.repeat.copy(a.repeat);this.generateMipmaps=a.generateMipmaps;this.premultiplyAlpha=a.premultiplyAlpha;this.flipY=a.flipY;this.unpackAlignment=a.unpackAlignment;this.encoding=a.encoding;return this},toJSON:function(a){if(void 0!==a.textures[this.uuid])return a.textures[this.uuid];var b={metadata:{version:4.5,
	type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],wrap:[this.wrapS,this.wrapT],minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY};if(void 0!==this.image){var c=this.image;void 0===c.uuid&&(c.uuid=X.generateUUID());if(void 0===a.images[c.uuid]){var d=a.images,e=c.uuid,f=c.uuid,g;void 0!==c.toDataURL?g=c:(g=document.createElementNS("http://www.w3.org/1999/xhtml",
	"canvas"),g.width=c.width,g.height=c.height,g.getContext("2d").drawImage(c,0,0,c.width,c.height));g=2048<g.width||2048<g.height?g.toDataURL("image/jpeg",.6):g.toDataURL("image/png");d[e]={uuid:f,url:g}}b.image=c.uuid}return a.textures[this.uuid]=b},dispose:function(){this.dispatchEvent({type:"dispose"})},transformUv:function(a){if(300===this.mapping){a.multiply(this.repeat);a.add(this.offset);if(0>a.x||1<a.x)switch(this.wrapS){case 1E3:a.x-=Math.floor(a.x);break;case 1001:a.x=0>a.x?0:1;break;case 1002:a.x=
	1===Math.abs(Math.floor(a.x)%2)?Math.ceil(a.x)-a.x:a.x-Math.floor(a.x)}if(0>a.y||1<a.y)switch(this.wrapT){case 1E3:a.y-=Math.floor(a.y);break;case 1001:a.y=0>a.y?0:1;break;case 1002:a.y=1===Math.abs(Math.floor(a.y)%2)?Math.ceil(a.y)-a.y:a.y-Math.floor(a.y)}this.flipY&&(a.y=1-a.y)}}});Object.assign(ha.prototype,{isVector4:!0,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},setScalar:function(a){this.w=this.z=this.y=this.x=a;return this},setX:function(a){this.x=a;return this},
	setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},setW:function(a){this.w=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;case 3:this.w=b;break;default:throw Error("index is out of range: "+a);}return this},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+a);}},clone:function(){return new this.constructor(this.x,
	this.y,this.z,this.w)},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=void 0!==a.w?a.w:1;return this},add:function(a,b){if(void 0!==b)return console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;this.z+=a.z;this.w+=a.w;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;this.w+=a;return this},addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;this.w=a.w+b.w;return this},
	addScaledVector:function(a,b){this.x+=a.x*b;this.y+=a.y*b;this.z+=a.z*b;this.w+=a.w*b;return this},sub:function(a,b){if(void 0!==b)return console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b);this.x-=a.x;this.y-=a.y;this.z-=a.z;this.w-=a.w;return this},subScalar:function(a){this.x-=a;this.y-=a;this.z-=a;this.w-=a;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;this.w=a.w-b.w;return this},multiplyScalar:function(a){this.x*=
	a;this.y*=a;this.z*=a;this.w*=a;return this},applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z,e=this.w;a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d+a[12]*e;this.y=a[1]*b+a[5]*c+a[9]*d+a[13]*e;this.z=a[2]*b+a[6]*c+a[10]*d+a[14]*e;this.w=a[3]*b+a[7]*c+a[11]*d+a[15]*e;return this},divideScalar:function(a){return this.multiplyScalar(1/a)},setAxisAngleFromQuaternion:function(a){this.w=2*Math.acos(a.w);var b=Math.sqrt(1-a.w*a.w);1E-4>b?(this.x=1,this.z=this.y=0):(this.x=a.x/b,this.y=a.y/b,this.z=a.z/
	b);return this},setAxisAngleFromRotationMatrix:function(a){var b,c,d;a=a.elements;var e=a[0];d=a[4];var f=a[8],g=a[1],h=a[5],k=a[9];c=a[2];b=a[6];var m=a[10];if(.01>Math.abs(d-g)&&.01>Math.abs(f-c)&&.01>Math.abs(k-b)){if(.1>Math.abs(d+g)&&.1>Math.abs(f+c)&&.1>Math.abs(k+b)&&.1>Math.abs(e+h+m-3))return this.set(1,0,0,0),this;a=Math.PI;e=(e+1)/2;h=(h+1)/2;m=(m+1)/2;d=(d+g)/4;f=(f+c)/4;k=(k+b)/4;e>h&&e>m?.01>e?(b=0,d=c=.707106781):(b=Math.sqrt(e),c=d/b,d=f/b):h>m?.01>h?(b=.707106781,c=0,d=.707106781):
	(c=Math.sqrt(h),b=d/c,d=k/c):.01>m?(c=b=.707106781,d=0):(d=Math.sqrt(m),b=f/d,c=k/d);this.set(b,c,d,a);return this}a=Math.sqrt((b-k)*(b-k)+(f-c)*(f-c)+(g-d)*(g-d));.001>Math.abs(a)&&(a=1);this.x=(b-k)/a;this.y=(f-c)/a;this.z=(g-d)/a;this.w=Math.acos((e+h+m-1)/2);return this},min:function(a){this.x=Math.min(this.x,a.x);this.y=Math.min(this.y,a.y);this.z=Math.min(this.z,a.z);this.w=Math.min(this.w,a.w);return this},max:function(a){this.x=Math.max(this.x,a.x);this.y=Math.max(this.y,a.y);this.z=Math.max(this.z,
	a.z);this.w=Math.max(this.w,a.w);return this},clamp:function(a,b){this.x=Math.max(a.x,Math.min(b.x,this.x));this.y=Math.max(a.y,Math.min(b.y,this.y));this.z=Math.max(a.z,Math.min(b.z,this.z));this.w=Math.max(a.w,Math.min(b.w,this.w));return this},clampScalar:function(){var a=new ha,b=new ha;return function(c,d){a.set(c,c,c,c);b.set(d,d,d,d);return this.clamp(a,b)}}(),floor:function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);this.z=Math.floor(this.z);this.w=Math.floor(this.w);return this},
	ceil:function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);this.z=Math.ceil(this.z);this.w=Math.ceil(this.w);return this},round:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);this.z=Math.round(this.z);this.w=Math.round(this.w);return this},roundToZero:function(){this.x=0>this.x?Math.ceil(this.x):Math.floor(this.x);this.y=0>this.y?Math.ceil(this.y):Math.floor(this.y);this.z=0>this.z?Math.ceil(this.z):Math.floor(this.z);this.w=0>this.w?Math.ceil(this.w):Math.floor(this.w);return this},
	negate:function(){this.x=-this.x;this.y=-this.y;this.z=-this.z;this.w=-this.w;return this},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z+this.w*a.w},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)},normalize:function(){return this.divideScalar(this.length())},
	setLength:function(a){return this.multiplyScalar(a/this.length())},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;this.w+=(a.w-this.w)*b;return this},lerpVectors:function(a,b,c){return this.subVectors(b,a).multiplyScalar(c).add(a)},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z&&a.w===this.w},fromArray:function(a,b){void 0===b&&(b=0);this.x=a[b];this.y=a[b+1];this.z=a[b+2];this.w=a[b+3];return this},toArray:function(a,b){void 0===a&&(a=
	[]);void 0===b&&(b=0);a[b]=this.x;a[b+1]=this.y;a[b+2]=this.z;a[b+3]=this.w;return a},fromBufferAttribute:function(a,b,c){void 0!==c&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute().");this.x=a.getX(b);this.y=a.getY(b);this.z=a.getZ(b);this.w=a.getW(b);return this}});Object.assign(Db.prototype,ra.prototype,{isWebGLRenderTarget:!0,setSize:function(a,b){if(this.width!==a||this.height!==b)this.width=a,this.height=b,this.dispose();this.viewport.set(0,0,a,b);this.scissor.set(0,
	0,a,b)},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.width=a.width;this.height=a.height;this.viewport.copy(a.viewport);this.texture=a.texture.clone();this.depthBuffer=a.depthBuffer;this.stencilBuffer=a.stencilBuffer;this.depthTexture=a.depthTexture;return this},dispose:function(){this.dispatchEvent({type:"dispose"})}});Eb.prototype=Object.create(Db.prototype);Eb.prototype.constructor=Eb;Eb.prototype.isWebGLRenderTargetCube=!0;Object.assign(pa,{slerp:function(a,b,
	c,d){return c.copy(a).slerp(b,d)},slerpFlat:function(a,b,c,d,e,f,g){var h=c[d+0],k=c[d+1],m=c[d+2];c=c[d+3];d=e[f+0];var u=e[f+1],l=e[f+2];e=e[f+3];if(c!==e||h!==d||k!==u||m!==l){f=1-g;var n=h*d+k*u+m*l+c*e,t=0<=n?1:-1,p=1-n*n;p>Number.EPSILON&&(p=Math.sqrt(p),n=Math.atan2(p,n*t),f=Math.sin(f*n)/p,g=Math.sin(g*n)/p);t*=g;h=h*f+d*t;k=k*f+u*t;m=m*f+l*t;c=c*f+e*t;f===1-g&&(g=1/Math.sqrt(h*h+k*k+m*m+c*c),h*=g,k*=g,m*=g,c*=g)}a[b]=h;a[b+1]=k;a[b+2]=m;a[b+3]=c}});Object.defineProperties(pa.prototype,{x:{get:function(){return this._x},
	set:function(a){this._x=a;this.onChangeCallback()}},y:{get:function(){return this._y},set:function(a){this._y=a;this.onChangeCallback()}},z:{get:function(){return this._z},set:function(a){this._z=a;this.onChangeCallback()}},w:{get:function(){return this._w},set:function(a){this._w=a;this.onChangeCallback()}}});Object.assign(pa.prototype,{set:function(a,b,c,d){this._x=a;this._y=b;this._z=c;this._w=d;this.onChangeCallback();return this},clone:function(){return new this.constructor(this._x,this._y,this._z,
	this._w)},copy:function(a){this._x=a.x;this._y=a.y;this._z=a.z;this._w=a.w;this.onChangeCallback();return this},setFromEuler:function(a,b){if(!1===(a&&a.isEuler))throw Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var c=a._x,d=a._y,e=a._z,f=a.order,g=Math.cos,h=Math.sin,k=g(c/2),m=g(d/2),g=g(e/2),c=h(c/2),d=h(d/2),e=h(e/2);"XYZ"===f?(this._x=c*m*g+k*d*e,this._y=k*d*g-c*m*e,this._z=k*m*e+c*d*g,this._w=k*m*g-c*d*e):"YXZ"===f?(this._x=c*m*g+
	k*d*e,this._y=k*d*g-c*m*e,this._z=k*m*e-c*d*g,this._w=k*m*g+c*d*e):"ZXY"===f?(this._x=c*m*g-k*d*e,this._y=k*d*g+c*m*e,this._z=k*m*e+c*d*g,this._w=k*m*g-c*d*e):"ZYX"===f?(this._x=c*m*g-k*d*e,this._y=k*d*g+c*m*e,this._z=k*m*e-c*d*g,this._w=k*m*g+c*d*e):"YZX"===f?(this._x=c*m*g+k*d*e,this._y=k*d*g+c*m*e,this._z=k*m*e-c*d*g,this._w=k*m*g-c*d*e):"XZY"===f&&(this._x=c*m*g-k*d*e,this._y=k*d*g-c*m*e,this._z=k*m*e+c*d*g,this._w=k*m*g+c*d*e);if(!1!==b)this.onChangeCallback();return this},setFromAxisAngle:function(a,
	b){var c=b/2,d=Math.sin(c);this._x=a.x*d;this._y=a.y*d;this._z=a.z*d;this._w=Math.cos(c);this.onChangeCallback();return this},setFromRotationMatrix:function(a){var b=a.elements,c=b[0];a=b[4];var d=b[8],e=b[1],f=b[5],g=b[9],h=b[2],k=b[6],b=b[10],m=c+f+b;0<m?(c=.5/Math.sqrt(m+1),this._w=.25/c,this._x=(k-g)*c,this._y=(d-h)*c,this._z=(e-a)*c):c>f&&c>b?(c=2*Math.sqrt(1+c-f-b),this._w=(k-g)/c,this._x=.25*c,this._y=(a+e)/c,this._z=(d+h)/c):f>b?(c=2*Math.sqrt(1+f-c-b),this._w=(d-h)/c,this._x=(a+e)/c,this._y=
	.25*c,this._z=(g+k)/c):(c=2*Math.sqrt(1+b-c-f),this._w=(e-a)/c,this._x=(d+h)/c,this._y=(g+k)/c,this._z=.25*c);this.onChangeCallback();return this},setFromUnitVectors:function(){var a=new p,b;return function(c,d){void 0===a&&(a=new p);b=c.dot(d)+1;1E-6>b?(b=0,Math.abs(c.x)>Math.abs(c.z)?a.set(-c.y,c.x,0):a.set(0,-c.z,c.y)):a.crossVectors(c,d);this._x=a.x;this._y=a.y;this._z=a.z;this._w=b;return this.normalize()}}(),inverse:function(){return this.conjugate().normalize()},conjugate:function(){this._x*=
	-1;this._y*=-1;this._z*=-1;this.onChangeCallback();return this},dot:function(a){return this._x*a._x+this._y*a._y+this._z*a._z+this._w*a._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var a=this.length();0===a?(this._z=this._y=this._x=0,this._w=1):(a=1/a,this._x*=a,this._y*=a,this._z*=a,this._w*=a);this.onChangeCallback();return this},
	multiply:function(a,b){return void 0!==b?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(a,b)):this.multiplyQuaternions(this,a)},premultiply:function(a){return this.multiplyQuaternions(a,this)},multiplyQuaternions:function(a,b){var c=a._x,d=a._y,e=a._z,f=a._w,g=b._x,h=b._y,k=b._z,m=b._w;this._x=c*m+f*g+d*k-e*h;this._y=d*m+f*h+e*g-c*k;this._z=e*m+f*k+c*h-d*g;this._w=f*m-c*g-d*h-e*k;this.onChangeCallback();
	return this},slerp:function(a,b){if(0===b)return this;if(1===b)return this.copy(a);var c=this._x,d=this._y,e=this._z,f=this._w,g=f*a._w+c*a._x+d*a._y+e*a._z;0>g?(this._w=-a._w,this._x=-a._x,this._y=-a._y,this._z=-a._z,g=-g):this.copy(a);if(1<=g)return this._w=f,this._x=c,this._y=d,this._z=e,this;var h=Math.sqrt(1-g*g);if(.001>Math.abs(h))return this._w=.5*(f+this._w),this._x=.5*(c+this._x),this._y=.5*(d+this._y),this._z=.5*(e+this._z),this;var k=Math.atan2(h,g),g=Math.sin((1-b)*k)/h,h=Math.sin(b*
	k)/h;this._w=f*g+this._w*h;this._x=c*g+this._x*h;this._y=d*g+this._y*h;this._z=e*g+this._z*h;this.onChangeCallback();return this},equals:function(a){return a._x===this._x&&a._y===this._y&&a._z===this._z&&a._w===this._w},fromArray:function(a,b){void 0===b&&(b=0);this._x=a[b];this._y=a[b+1];this._z=a[b+2];this._w=a[b+3];this.onChangeCallback();return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=this._x;a[b+1]=this._y;a[b+2]=this._z;a[b+3]=this._w;return a},onChange:function(a){this.onChangeCallback=
	a;return this},onChangeCallback:function(){}});Object.assign(p.prototype,{isVector3:!0,set:function(a,b,c){this.x=a;this.y=b;this.z=c;return this},setScalar:function(a){this.z=this.y=this.x=a;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;default:throw Error("index is out of range: "+a);}return this},getComponent:function(a){switch(a){case 0:return this.x;
	case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+a);}},clone:function(){return new this.constructor(this.x,this.y,this.z)},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;return this},add:function(a,b){if(void 0!==b)return console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;this.z+=a.z;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;return this},
	addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;return this},addScaledVector:function(a,b){this.x+=a.x*b;this.y+=a.y*b;this.z+=a.z*b;return this},sub:function(a,b){if(void 0!==b)return console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b);this.x-=a.x;this.y-=a.y;this.z-=a.z;return this},subScalar:function(a){this.x-=a;this.y-=a;this.z-=a;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=
	a.z-b.z;return this},multiply:function(a,b){if(void 0!==b)return console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(a,b);this.x*=a.x;this.y*=a.y;this.z*=a.z;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;return this},multiplyVectors:function(a,b){this.x=a.x*b.x;this.y=a.y*b.y;this.z=a.z*b.z;return this},applyEuler:function(){var a=new pa;return function(b){!1===(b&&b.isEuler)&&console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.");
	return this.applyQuaternion(a.setFromEuler(b))}}(),applyAxisAngle:function(){var a=new pa;return function(b,c){return this.applyQuaternion(a.setFromAxisAngle(b,c))}}(),applyMatrix3:function(a){var b=this.x,c=this.y,d=this.z;a=a.elements;this.x=a[0]*b+a[3]*c+a[6]*d;this.y=a[1]*b+a[4]*c+a[7]*d;this.z=a[2]*b+a[5]*c+a[8]*d;return this},applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z;a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d+a[12];this.y=a[1]*b+a[5]*c+a[9]*d+a[13];this.z=a[2]*b+a[6]*c+a[10]*d+a[14];
	return this.divideScalar(a[3]*b+a[7]*c+a[11]*d+a[15])},applyQuaternion:function(a){var b=this.x,c=this.y,d=this.z,e=a.x,f=a.y,g=a.z;a=a.w;var h=a*b+f*d-g*c,k=a*c+g*b-e*d,m=a*d+e*c-f*b,b=-e*b-f*c-g*d;this.x=h*a+b*-e+k*-g-m*-f;this.y=k*a+b*-f+m*-e-h*-g;this.z=m*a+b*-g+h*-f-k*-e;return this},project:function(){var a=new J;return function(b){a.multiplyMatrices(b.projectionMatrix,a.getInverse(b.matrixWorld));return this.applyMatrix4(a)}}(),unproject:function(){var a=new J;return function(b){a.multiplyMatrices(b.matrixWorld,
	a.getInverse(b.projectionMatrix));return this.applyMatrix4(a)}}(),transformDirection:function(a){var b=this.x,c=this.y,d=this.z;a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d;this.y=a[1]*b+a[5]*c+a[9]*d;this.z=a[2]*b+a[6]*c+a[10]*d;return this.normalize()},divide:function(a){this.x/=a.x;this.y/=a.y;this.z/=a.z;return this},divideScalar:function(a){return this.multiplyScalar(1/a)},min:function(a){this.x=Math.min(this.x,a.x);this.y=Math.min(this.y,a.y);this.z=Math.min(this.z,a.z);return this},max:function(a){this.x=
	Math.max(this.x,a.x);this.y=Math.max(this.y,a.y);this.z=Math.max(this.z,a.z);return this},clamp:function(a,b){this.x=Math.max(a.x,Math.min(b.x,this.x));this.y=Math.max(a.y,Math.min(b.y,this.y));this.z=Math.max(a.z,Math.min(b.z,this.z));return this},clampScalar:function(){var a=new p,b=new p;return function(c,d){a.set(c,c,c);b.set(d,d,d);return this.clamp(a,b)}}(),clampLength:function(a,b){var c=this.length();return this.multiplyScalar(Math.max(a,Math.min(b,c))/c)},floor:function(){this.x=Math.floor(this.x);
	this.y=Math.floor(this.y);this.z=Math.floor(this.z);return this},ceil:function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);this.z=Math.ceil(this.z);return this},round:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);this.z=Math.round(this.z);return this},roundToZero:function(){this.x=0>this.x?Math.ceil(this.x):Math.floor(this.x);this.y=0>this.y?Math.ceil(this.y):Math.floor(this.y);this.z=0>this.z?Math.ceil(this.z):Math.floor(this.z);return this},negate:function(){this.x=-this.x;
	this.y=-this.y;this.z=-this.z;return this},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){return this.multiplyScalar(a/this.length())},lerp:function(a,b){this.x+=(a.x-this.x)*
	b;this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;return this},lerpVectors:function(a,b,c){return this.subVectors(b,a).multiplyScalar(c).add(a)},cross:function(a,b){if(void 0!==b)return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(a,b);var c=this.x,d=this.y,e=this.z;this.x=d*a.z-e*a.y;this.y=e*a.x-c*a.z;this.z=c*a.y-d*a.x;return this},crossVectors:function(a,b){var c=a.x,d=a.y,e=a.z,f=b.x,g=b.y,h=b.z;this.x=d*h-e*g;this.y=
	e*f-c*h;this.z=c*g-d*f;return this},projectOnVector:function(a){var b=a.dot(this)/a.lengthSq();return this.copy(a).multiplyScalar(b)},projectOnPlane:function(){var a=new p;return function(b){a.copy(this).projectOnVector(b);return this.sub(a)}}(),reflect:function(){var a=new p;return function(b){return this.sub(a.copy(b).multiplyScalar(2*this.dot(b)))}}(),angleTo:function(a){a=this.dot(a)/Math.sqrt(this.lengthSq()*a.lengthSq());return Math.acos(X.clamp(a,-1,1))},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},
	distanceToSquared:function(a){var b=this.x-a.x,c=this.y-a.y;a=this.z-a.z;return b*b+c*c+a*a},distanceToManhattan:function(a){return Math.abs(this.x-a.x)+Math.abs(this.y-a.y)+Math.abs(this.z-a.z)},setFromSpherical:function(a){var b=Math.sin(a.phi)*a.radius;this.x=b*Math.sin(a.theta);this.y=Math.cos(a.phi)*a.radius;this.z=b*Math.cos(a.theta);return this},setFromCylindrical:function(a){this.x=a.radius*Math.sin(a.theta);this.y=a.y;this.z=a.radius*Math.cos(a.theta);return this},setFromMatrixPosition:function(a){return this.setFromMatrixColumn(a,
	3)},setFromMatrixScale:function(a){var b=this.setFromMatrixColumn(a,0).length(),c=this.setFromMatrixColumn(a,1).length();a=this.setFromMatrixColumn(a,2).length();this.x=b;this.y=c;this.z=a;return this},setFromMatrixColumn:function(a,b){return this.fromArray(a.elements,4*b)},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z},fromArray:function(a,b){void 0===b&&(b=0);this.x=a[b];this.y=a[b+1];this.z=a[b+2];return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=
	this.x;a[b+1]=this.y;a[b+2]=this.z;return a},fromBufferAttribute:function(a,b,c){void 0!==c&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute().");this.x=a.getX(b);this.y=a.getY(b);this.z=a.getZ(b);return this}});Object.assign(J.prototype,{isMatrix4:!0,set:function(a,b,c,d,e,f,g,h,k,m,u,l,n,t,p,r){var y=this.elements;y[0]=a;y[4]=b;y[8]=c;y[12]=d;y[1]=e;y[5]=f;y[9]=g;y[13]=h;y[2]=k;y[6]=m;y[10]=u;y[14]=l;y[3]=n;y[7]=t;y[11]=p;y[15]=r;return this},identity:function(){this.set(1,
	0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},clone:function(){return(new J).fromArray(this.elements)},copy:function(a){var b=this.elements;a=a.elements;b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];b[13]=a[13];b[14]=a[14];b[15]=a[15];return this},copyPosition:function(a){var b=this.elements;a=a.elements;b[12]=a[12];b[13]=a[13];b[14]=a[14];return this},extractBasis:function(a,b,c){a.setFromMatrixColumn(this,0);
	b.setFromMatrixColumn(this,1);c.setFromMatrixColumn(this,2);return this},makeBasis:function(a,b,c){this.set(a.x,b.x,c.x,0,a.y,b.y,c.y,0,a.z,b.z,c.z,0,0,0,0,1);return this},extractRotation:function(){var a=new p;return function(b){var c=this.elements,d=b.elements,e=1/a.setFromMatrixColumn(b,0).length(),f=1/a.setFromMatrixColumn(b,1).length();b=1/a.setFromMatrixColumn(b,2).length();c[0]=d[0]*e;c[1]=d[1]*e;c[2]=d[2]*e;c[4]=d[4]*f;c[5]=d[5]*f;c[6]=d[6]*f;c[8]=d[8]*b;c[9]=d[9]*b;c[10]=d[10]*b;return this}}(),
	makeRotationFromEuler:function(a){!1===(a&&a.isEuler)&&console.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");var b=this.elements,c=a.x,d=a.y,e=a.z,f=Math.cos(c),c=Math.sin(c),g=Math.cos(d),d=Math.sin(d),h=Math.cos(e),e=Math.sin(e);if("XYZ"===a.order){a=f*h;var k=f*e,m=c*h,u=c*e;b[0]=g*h;b[4]=-g*e;b[8]=d;b[1]=k+m*d;b[5]=a-u*d;b[9]=-c*g;b[2]=u-a*d;b[6]=m+k*d;b[10]=f*g}else"YXZ"===a.order?(a=g*h,k=g*e,m=d*h,u=d*e,b[0]=a+u*c,b[4]=m*c-k,b[8]=
	f*d,b[1]=f*e,b[5]=f*h,b[9]=-c,b[2]=k*c-m,b[6]=u+a*c,b[10]=f*g):"ZXY"===a.order?(a=g*h,k=g*e,m=d*h,u=d*e,b[0]=a-u*c,b[4]=-f*e,b[8]=m+k*c,b[1]=k+m*c,b[5]=f*h,b[9]=u-a*c,b[2]=-f*d,b[6]=c,b[10]=f*g):"ZYX"===a.order?(a=f*h,k=f*e,m=c*h,u=c*e,b[0]=g*h,b[4]=m*d-k,b[8]=a*d+u,b[1]=g*e,b[5]=u*d+a,b[9]=k*d-m,b[2]=-d,b[6]=c*g,b[10]=f*g):"YZX"===a.order?(a=f*g,k=f*d,m=c*g,u=c*d,b[0]=g*h,b[4]=u-a*e,b[8]=m*e+k,b[1]=e,b[5]=f*h,b[9]=-c*h,b[2]=-d*h,b[6]=k*e+m,b[10]=a-u*e):"XZY"===a.order&&(a=f*g,k=f*d,m=c*g,u=c*d,b[0]=
	g*h,b[4]=-e,b[8]=d*h,b[1]=a*e+u,b[5]=f*h,b[9]=k*e-m,b[2]=m*e-k,b[6]=c*h,b[10]=u*e+a);b[3]=0;b[7]=0;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return this},makeRotationFromQuaternion:function(a){var b=this.elements,c=a._x,d=a._y,e=a._z,f=a._w,g=c+c,h=d+d,k=e+e;a=c*g;var m=c*h,c=c*k,u=d*h,d=d*k,e=e*k,g=f*g,h=f*h,f=f*k;b[0]=1-(u+e);b[4]=m-f;b[8]=c+h;b[1]=m+f;b[5]=1-(a+e);b[9]=d-g;b[2]=c-h;b[6]=d+g;b[10]=1-(a+u);b[3]=0;b[7]=0;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return this},lookAt:function(){var a=new p,
	b=new p,c=new p;return function(d,e,f){var g=this.elements;c.subVectors(d,e);0===c.lengthSq()&&(c.z=1);c.normalize();a.crossVectors(f,c);0===a.lengthSq()&&(c.z+=1E-4,a.crossVectors(f,c));a.normalize();b.crossVectors(c,a);g[0]=a.x;g[4]=b.x;g[8]=c.x;g[1]=a.y;g[5]=b.y;g[9]=c.y;g[2]=a.z;g[6]=b.z;g[10]=c.z;return this}}(),multiply:function(a,b){return void 0!==b?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(a,b)):
	this.multiplyMatrices(this,a)},premultiply:function(a){return this.multiplyMatrices(a,this)},multiplyMatrices:function(a,b){var c=a.elements,d=b.elements,e=this.elements,f=c[0],g=c[4],h=c[8],k=c[12],m=c[1],u=c[5],l=c[9],n=c[13],t=c[2],p=c[6],r=c[10],y=c[14],x=c[3],v=c[7],H=c[11],c=c[15],w=d[0],S=d[4],W=d[8],D=d[12],F=d[1],C=d[5],N=d[9],E=d[13],B=d[2],I=d[6],G=d[10],J=d[14],Q=d[3],K=d[7],V=d[11],d=d[15];e[0]=f*w+g*F+h*B+k*Q;e[4]=f*S+g*C+h*I+k*K;e[8]=f*W+g*N+h*G+k*V;e[12]=f*D+g*E+h*J+k*d;e[1]=m*w+u*
	F+l*B+n*Q;e[5]=m*S+u*C+l*I+n*K;e[9]=m*W+u*N+l*G+n*V;e[13]=m*D+u*E+l*J+n*d;e[2]=t*w+p*F+r*B+y*Q;e[6]=t*S+p*C+r*I+y*K;e[10]=t*W+p*N+r*G+y*V;e[14]=t*D+p*E+r*J+y*d;e[3]=x*w+v*F+H*B+c*Q;e[7]=x*S+v*C+H*I+c*K;e[11]=x*W+v*N+H*G+c*V;e[15]=x*D+v*E+H*J+c*d;return this},multiplyScalar:function(a){var b=this.elements;b[0]*=a;b[4]*=a;b[8]*=a;b[12]*=a;b[1]*=a;b[5]*=a;b[9]*=a;b[13]*=a;b[2]*=a;b[6]*=a;b[10]*=a;b[14]*=a;b[3]*=a;b[7]*=a;b[11]*=a;b[15]*=a;return this},applyToBufferAttribute:function(){var a=new p;return function(b){for(var c=
	0,d=b.count;c<d;c++)a.x=b.getX(c),a.y=b.getY(c),a.z=b.getZ(c),a.applyMatrix4(this),b.setXYZ(c,a.x,a.y,a.z);return b}}(),determinant:function(){var a=this.elements,b=a[0],c=a[4],d=a[8],e=a[12],f=a[1],g=a[5],h=a[9],k=a[13],m=a[2],u=a[6],l=a[10],n=a[14];return a[3]*(+e*h*u-d*k*u-e*g*l+c*k*l+d*g*n-c*h*n)+a[7]*(+b*h*n-b*k*l+e*f*l-d*f*n+d*k*m-e*h*m)+a[11]*(+b*k*u-b*g*n-e*f*u+c*f*n+e*g*m-c*k*m)+a[15]*(-d*g*m-b*h*u+b*g*l+d*f*u-c*f*l+c*h*m)},transpose:function(){var a=this.elements,b;b=a[1];a[1]=a[4];a[4]=
	b;b=a[2];a[2]=a[8];a[8]=b;b=a[6];a[6]=a[9];a[9]=b;b=a[3];a[3]=a[12];a[12]=b;b=a[7];a[7]=a[13];a[13]=b;b=a[11];a[11]=a[14];a[14]=b;return this},setPosition:function(a){var b=this.elements;b[12]=a.x;b[13]=a.y;b[14]=a.z;return this},getInverse:function(a,b){var c=this.elements,d=a.elements,e=d[0],f=d[1],g=d[2],h=d[3],k=d[4],m=d[5],l=d[6],q=d[7],n=d[8],t=d[9],p=d[10],r=d[11],y=d[12],x=d[13],v=d[14],d=d[15],H=t*v*q-x*p*q+x*l*r-m*v*r-t*l*d+m*p*d,w=y*p*q-n*v*q-y*l*r+k*v*r+n*l*d-k*p*d,S=n*x*q-y*t*q+y*m*r-
	k*x*r-n*m*d+k*t*d,W=y*t*l-n*x*l-y*m*p+k*x*p+n*m*v-k*t*v,D=e*H+f*w+g*S+h*W;if(0===D){if(!0===b)throw Error("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0");console.warn("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0");return this.identity()}D=1/D;c[0]=H*D;c[1]=(x*p*h-t*v*h-x*g*r+f*v*r+t*g*d-f*p*d)*D;c[2]=(m*v*h-x*l*h+x*g*q-f*v*q-m*g*d+f*l*d)*D;c[3]=(t*l*h-m*p*h-t*g*q+f*p*q+m*g*r-f*l*r)*D;c[4]=w*D;c[5]=(n*v*h-y*p*h+y*g*r-e*v*r-n*g*d+e*p*d)*D;c[6]=(y*l*h-k*v*h-
	y*g*q+e*v*q+k*g*d-e*l*d)*D;c[7]=(k*p*h-n*l*h+n*g*q-e*p*q-k*g*r+e*l*r)*D;c[8]=S*D;c[9]=(y*t*h-n*x*h-y*f*r+e*x*r+n*f*d-e*t*d)*D;c[10]=(k*x*h-y*m*h+y*f*q-e*x*q-k*f*d+e*m*d)*D;c[11]=(n*m*h-k*t*h-n*f*q+e*t*q+k*f*r-e*m*r)*D;c[12]=W*D;c[13]=(n*x*g-y*t*g+y*f*p-e*x*p-n*f*v+e*t*v)*D;c[14]=(y*m*g-k*x*g-y*f*l+e*x*l+k*f*v-e*m*v)*D;c[15]=(k*t*g-n*m*g+n*f*l-e*t*l-k*f*p+e*m*p)*D;return this},scale:function(a){var b=this.elements,c=a.x,d=a.y;a=a.z;b[0]*=c;b[4]*=d;b[8]*=a;b[1]*=c;b[5]*=d;b[9]*=a;b[2]*=c;b[6]*=d;b[10]*=
	a;b[3]*=c;b[7]*=d;b[11]*=a;return this},getMaxScaleOnAxis:function(){var a=this.elements;return Math.sqrt(Math.max(a[0]*a[0]+a[1]*a[1]+a[2]*a[2],a[4]*a[4]+a[5]*a[5]+a[6]*a[6],a[8]*a[8]+a[9]*a[9]+a[10]*a[10]))},makeTranslation:function(a,b,c){this.set(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1);return this},makeRotationX:function(a){var b=Math.cos(a);a=Math.sin(a);this.set(1,0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1);return this},makeRotationY:function(a){var b=Math.cos(a);a=Math.sin(a);this.set(b,0,a,0,0,1,0,0,-a,0,b,
	0,0,0,0,1);return this},makeRotationZ:function(a){var b=Math.cos(a);a=Math.sin(a);this.set(b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1);return this},makeRotationAxis:function(a,b){var c=Math.cos(b),d=Math.sin(b),e=1-c,f=a.x,g=a.y,h=a.z,k=e*f,m=e*g;this.set(k*f+c,k*g-d*h,k*h+d*g,0,k*g+d*h,m*g+c,m*h-d*f,0,k*h-d*g,m*h+d*f,e*h*h+c,0,0,0,0,1);return this},makeScale:function(a,b,c){this.set(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1);return this},makeShear:function(a,b,c){this.set(1,b,c,0,a,1,c,0,a,b,1,0,0,0,0,1);return this},
	compose:function(a,b,c){this.makeRotationFromQuaternion(b);this.scale(c);this.setPosition(a);return this},decompose:function(){var a=new p,b=new J;return function(c,d,e){var f=this.elements,g=a.set(f[0],f[1],f[2]).length(),h=a.set(f[4],f[5],f[6]).length(),k=a.set(f[8],f[9],f[10]).length();0>this.determinant()&&(g=-g);c.x=f[12];c.y=f[13];c.z=f[14];b.copy(this);c=1/g;var f=1/h,m=1/k;b.elements[0]*=c;b.elements[1]*=c;b.elements[2]*=c;b.elements[4]*=f;b.elements[5]*=f;b.elements[6]*=f;b.elements[8]*=
	m;b.elements[9]*=m;b.elements[10]*=m;d.setFromRotationMatrix(b);e.x=g;e.y=h;e.z=k;return this}}(),makePerspective:function(a,b,c,d,e,f){void 0===f&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");var g=this.elements;g[0]=2*e/(b-a);g[4]=0;g[8]=(b+a)/(b-a);g[12]=0;g[1]=0;g[5]=2*e/(c-d);g[9]=(c+d)/(c-d);g[13]=0;g[2]=0;g[6]=0;g[10]=-(f+e)/(f-e);g[14]=-2*f*e/(f-e);g[3]=0;g[7]=0;g[11]=-1;g[15]=0;return this},makeOrthographic:function(a,
	b,c,d,e,f){var g=this.elements,h=1/(b-a),k=1/(c-d),m=1/(f-e);g[0]=2*h;g[4]=0;g[8]=0;g[12]=-((b+a)*h);g[1]=0;g[5]=2*k;g[9]=0;g[13]=-((c+d)*k);g[2]=0;g[6]=0;g[10]=-2*m;g[14]=-((f+e)*m);g[3]=0;g[7]=0;g[11]=0;g[15]=1;return this},equals:function(a){var b=this.elements;a=a.elements;for(var c=0;16>c;c++)if(b[c]!==a[c])return!1;return!0},fromArray:function(a,b){void 0===b&&(b=0);for(var c=0;16>c;c++)this.elements[c]=a[c+b];return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);var c=this.elements;
	a[b]=c[0];a[b+1]=c[1];a[b+2]=c[2];a[b+3]=c[3];a[b+4]=c[4];a[b+5]=c[5];a[b+6]=c[6];a[b+7]=c[7];a[b+8]=c[8];a[b+9]=c[9];a[b+10]=c[10];a[b+11]=c[11];a[b+12]=c[12];a[b+13]=c[13];a[b+14]=c[14];a[b+15]=c[15];return a}});eb.prototype=Object.create(da.prototype);eb.prototype.constructor=eb;eb.prototype.isDataTexture=!0;Za.prototype=Object.create(da.prototype);Za.prototype.constructor=Za;Za.prototype.isCubeTexture=!0;Object.defineProperty(Za.prototype,"images",{get:function(){return this.image},set:function(a){this.image=
	a}});var De=new da,Ee=new Za,ye=[],Ae=[],Ce=new Float32Array(16),Be=new Float32Array(9);Ie.prototype.setValue=function(a,b){for(var c=this.seq,d=0,e=c.length;d!==e;++d){var f=c[d];f.setValue(a,b[f.id])}};var Qd=/([\w\d_]+)(\])?(\[|\.)?/g;fb.prototype.setValue=function(a,b,c){b=this.map[b];void 0!==b&&b.setValue(a,c,this.renderer)};fb.prototype.setOptional=function(a,b,c){b=b[c];void 0!==b&&this.setValue(a,c,b)};fb.upload=function(a,b,c,d){for(var e=0,f=b.length;e!==f;++e){var g=b[e],h=c[g.id];!1!==
	h.needsUpdate&&g.setValue(a,h.value,d)}};fb.seqWithValue=function(a,b){for(var c=[],d=0,e=a.length;d!==e;++d){var f=a[d];f.id in b&&c.push(f)}return c};var lg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,
	darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,
	fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,
	lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,
	navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,
	slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Object.assign(G.prototype,{isColor:!0,r:1,g:1,b:1,set:function(a){a&&a.isColor?this.copy(a):"number"===typeof a?this.setHex(a):"string"===typeof a&&this.setStyle(a);return this},setScalar:function(a){this.b=this.g=this.r=
	a;return this},setHex:function(a){a=Math.floor(a);this.r=(a>>16&255)/255;this.g=(a>>8&255)/255;this.b=(a&255)/255;return this},setRGB:function(a,b,c){this.r=a;this.g=b;this.b=c;return this},setHSL:function(){function a(a,c,d){0>d&&(d+=1);1<d&&--d;return d<1/6?a+6*(c-a)*d:.5>d?c:d<2/3?a+6*(c-a)*(2/3-d):a}return function(b,c,d){b=X.euclideanModulo(b,1);c=X.clamp(c,0,1);d=X.clamp(d,0,1);0===c?this.r=this.g=this.b=d:(c=.5>=d?d*(1+c):d+c-d*c,d=2*d-c,this.r=a(d,c,b+1/3),this.g=a(d,c,b),this.b=a(d,c,b-1/
	3));return this}}(),setStyle:function(a){function b(b){void 0!==b&&1>parseFloat(b)&&console.warn("THREE.Color: Alpha component of "+a+" will be ignored.")}var c;if(c=/^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(a)){var d=c[2];switch(c[1]){case "rgb":case "rgba":if(c=/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d))return this.r=Math.min(255,parseInt(c[1],10))/255,this.g=Math.min(255,parseInt(c[2],10))/255,this.b=Math.min(255,parseInt(c[3],10))/255,b(c[5]),this;if(c=/^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d))return this.r=
	Math.min(100,parseInt(c[1],10))/100,this.g=Math.min(100,parseInt(c[2],10))/100,this.b=Math.min(100,parseInt(c[3],10))/100,b(c[5]),this;break;case "hsl":case "hsla":if(c=/^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d)){var d=parseFloat(c[1])/360,e=parseInt(c[2],10)/100,f=parseInt(c[3],10)/100;b(c[5]);return this.setHSL(d,e,f)}}}else if(c=/^\#([A-Fa-f0-9]+)$/.exec(a)){c=c[1];d=c.length;if(3===d)return this.r=parseInt(c.charAt(0)+c.charAt(0),16)/255,this.g=parseInt(c.charAt(1)+
	c.charAt(1),16)/255,this.b=parseInt(c.charAt(2)+c.charAt(2),16)/255,this;if(6===d)return this.r=parseInt(c.charAt(0)+c.charAt(1),16)/255,this.g=parseInt(c.charAt(2)+c.charAt(3),16)/255,this.b=parseInt(c.charAt(4)+c.charAt(5),16)/255,this}a&&0<a.length&&(c=lg[a],void 0!==c?this.setHex(c):console.warn("THREE.Color: Unknown color "+a));return this},clone:function(){return new this.constructor(this.r,this.g,this.b)},copy:function(a){this.r=a.r;this.g=a.g;this.b=a.b;return this},copyGammaToLinear:function(a,
	b){void 0===b&&(b=2);this.r=Math.pow(a.r,b);this.g=Math.pow(a.g,b);this.b=Math.pow(a.b,b);return this},copyLinearToGamma:function(a,b){void 0===b&&(b=2);var c=0<b?1/b:1;this.r=Math.pow(a.r,c);this.g=Math.pow(a.g,c);this.b=Math.pow(a.b,c);return this},convertGammaToLinear:function(){var a=this.r,b=this.g,c=this.b;this.r=a*a;this.g=b*b;this.b=c*c;return this},convertLinearToGamma:function(){this.r=Math.sqrt(this.r);this.g=Math.sqrt(this.g);this.b=Math.sqrt(this.b);return this},getHex:function(){return 255*
	this.r<<16^255*this.g<<8^255*this.b<<0},getHexString:function(){return("000000"+this.getHex().toString(16)).slice(-6)},getHSL:function(a){a=a||{h:0,s:0,l:0};var b=this.r,c=this.g,d=this.b,e=Math.max(b,c,d),f=Math.min(b,c,d),g,h=(f+e)/2;if(f===e)f=g=0;else{var k=e-f,f=.5>=h?k/(e+f):k/(2-e-f);switch(e){case b:g=(c-d)/k+(c<d?6:0);break;case c:g=(d-b)/k+2;break;case d:g=(b-c)/k+4}g/=6}a.h=g;a.s=f;a.l=h;return a},getStyle:function(){return"rgb("+(255*this.r|0)+","+(255*this.g|0)+","+(255*this.b|0)+")"},
	offsetHSL:function(a,b,c){var d=this.getHSL();d.h+=a;d.s+=b;d.l+=c;this.setHSL(d.h,d.s,d.l);return this},add:function(a){this.r+=a.r;this.g+=a.g;this.b+=a.b;return this},addColors:function(a,b){this.r=a.r+b.r;this.g=a.g+b.g;this.b=a.b+b.b;return this},addScalar:function(a){this.r+=a;this.g+=a;this.b+=a;return this},sub:function(a){this.r=Math.max(0,this.r-a.r);this.g=Math.max(0,this.g-a.g);this.b=Math.max(0,this.b-a.b);return this},multiply:function(a){this.r*=a.r;this.g*=a.g;this.b*=a.b;return this},
	multiplyScalar:function(a){this.r*=a;this.g*=a;this.b*=a;return this},lerp:function(a,b){this.r+=(a.r-this.r)*b;this.g+=(a.g-this.g)*b;this.b+=(a.b-this.b)*b;return this},equals:function(a){return a.r===this.r&&a.g===this.g&&a.b===this.b},fromArray:function(a,b){void 0===b&&(b=0);this.r=a[b];this.g=a[b+1];this.b=a[b+2];return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=this.r;a[b+1]=this.g;a[b+2]=this.b;return a},toJSON:function(){return this.getHex()}});var U={common:{diffuse:{value:new G(15658734)},
	opacity:{value:1},map:{value:null},offsetRepeat:{value:new ha(0,0,1,1)},specularMap:{value:null},alphaMap:{value:null},envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new E(1,1)}},displacementmap:{displacementMap:{value:null},
	displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:2.5E-4},fogNear:{value:1},fogFar:{value:2E3},fogColor:{value:new G(16777215)}},lights:{ambientLightColor:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},
	spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],
	properties:{color:{},position:{},width:{},height:{}}}},points:{diffuse:{value:new G(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},offsetRepeat:{value:new ha(0,0,1,1)}}},Ha={merge:function(a){for(var b={},c=0;c<a.length;c++){var d=this.clone(a[c]),e;for(e in d)b[e]=d[e]}return b},clone:function(a){var b={},c;for(c in a){b[c]={};for(var d in a[c]){var e=a[c][d];e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture)?b[c][d]=e.clone():
	Array.isArray(e)?b[c][d]=e.slice():b[c][d]=e}}return b}},T={alphamap_fragment:"#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",alphamap_pars_fragment:"#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",alphatest_fragment:"#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",aomap_fragment:"#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",
	aomap_pars_fragment:"#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",begin_vertex:"\nvec3 transformed = vec3( position );\n",beginnormal_vertex:"\nvec3 objectNormal = vec3( normal );\n",bsdfs:"float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat theta = acos( dot( N, V ) );\n\tvec2 uv = vec2(\n\t\tsqrt( saturate( roughness ) ),\n\t\tsaturate( theta / ( 0.5 * PI ) ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.86267 + (0.49788 + 0.01436 * y ) * y;\n\tfloat b = 3.45068 + (4.18814 + y) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = (x > 0.0) ? v : 0.5 * inversesqrt( 1.0 - x * x ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tvec3 result = vec3( LTC_ClippedSphereFormFactor( vectorFormFactor ) );\n\treturn result;\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
	bumpmap_pars_fragment:"#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",
	clipping_planes_fragment:"#if NUM_CLIPPING_PLANES > 0\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; ++ i ) {\n\t\tvec4 plane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t\t\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; ++ i ) {\n\t\t\tvec4 plane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t\n\t#endif\n#endif\n",
	clipping_planes_pars_fragment:"#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",clipping_planes_pars_vertex:"#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",clipping_planes_vertex:"#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",
	color_fragment:"#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",color_pars_fragment:"#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",color_pars_vertex:"#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",common:"#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transpose( const in mat3 v ) {\n\tmat3 tmp;\n\ttmp[0] = vec3(v[0].x, v[1].x, v[2].x);\n\ttmp[1] = vec3(v[0].y, v[1].y, v[2].y);\n\ttmp[2] = vec3(v[0].z, v[1].z, v[2].z);\n\treturn tmp;\n}\n",
	cube_uv_reflection_fragment:"#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",
	defaultnormal_vertex:"#ifdef FLIP_SIDED\n\tobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;\n",displacementmap_pars_vertex:"#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",displacementmap_vertex:"#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normal * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",emissivemap_fragment:"#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",
	emissivemap_pars_fragment:"#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",encodings_fragment:"  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",encodings_pars_fragment:"\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM            = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat D      = max( maxRange / maxRGB, 1.0 );\n\tD            = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract(Le);\n\tvResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max(vRGB, 0.0), 1.0 );\n}\n",
	envmap_fragment:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\tvec3 reflectView = flipNormal * normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",
	envmap_pars_fragment:"#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",
	envmap_pars_vertex:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",envmap_vertex:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",
	fog_vertex:"\n#ifdef USE_FOG\nfogDepth = -mvPosition.z;\n#endif",fog_pars_vertex:"#ifdef USE_FOG\n  varying float fogDepth;\n#endif\n",fog_fragment:"#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",fog_pars_fragment:"#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n",
	gradientmap_pars_fragment:"#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",lightmap_fragment:"#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
	lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",lights_lambert_vertex:"vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",
	lights_pars:"uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltcMat;\tuniform sampler2D ltcMag;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar - 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = saturate( reflectVec.y * 0.5 + 0.5 );\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",
	lights_phong_fragment:"BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",lights_phong_pars_fragment:"varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",
	lights_physical_fragment:"PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",
	lights_physical_pars_fragment:"struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tfloat norm = texture2D( ltcMag, uv ).a;\n\t\tvec4 t = texture2D( ltcMat, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3(   1,   0, t.y ),\n\t\t\tvec3(   0, t.z,   0 ),\n\t\t\tvec3( t.w,   0, t.x )\n\t\t);\n\t\treflectedLight.directSpecular += lightColor * material.specularColor * norm * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
	lights_template:"\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, 8 );\n\t#endif\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tvec3 radiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n\t#ifndef STANDARD\n\t\tvec3 clearCoatRadiance = getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), 8 );\n\t#else\n\t\tvec3 clearCoatRadiance = vec3( 0.0 );\n\t#endif\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",
	logdepthbuf_fragment:"#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n#endif",logdepthbuf_pars_fragment:"#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n",logdepthbuf_pars_vertex:"#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",logdepthbuf_vertex:"#ifdef USE_LOGDEPTHBUF\n\tgl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\t#endif\n#endif\n",
	map_fragment:"#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",map_pars_fragment:"#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",map_particle_fragment:"#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",map_particle_pars_fragment:"#ifdef USE_MAP\n\tuniform vec4 offsetRepeat;\n\tuniform sampler2D map;\n#endif\n",
	metalnessmap_fragment:"float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n",metalnessmap_pars_fragment:"#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",morphnormal_vertex:"#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",
	morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",
	normal_flip:"#ifdef DOUBLE_SIDED\n\tfloat flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n#else\n\tfloat flipNormal = 1.0;\n#endif\n",normal_fragment:"#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal ) * flipNormal;\n#endif\n#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
	normalmap_pars_fragment:"#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n",
	packing:"vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 1.0 - 2.0 * rgb.xyz;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
	premultiplied_alpha_fragment:"#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",project_vertex:"#ifdef USE_SKINNING\n\tvec4 mvPosition = modelViewMatrix * skinned;\n#else\n\tvec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;\n",dithering_fragment:"#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n",dithering_pars_fragment:"#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n",
	roughnessmap_fragment:"float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n",roughnessmap_pars_fragment:"#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",shadowmap_pars_fragment:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\treturn (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn 1.0;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\tfloat dp = ( length( lightToPosition ) - shadowBias ) / 1000.0;\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",
	shadowmap_pars_vertex:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n",
	shadowmap_vertex:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n",
	shadowmask_pars_fragment:"float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",
	skinbase_vertex:"#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
	skinning_vertex:"#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\tskinned  = bindMatrixInverse * skinned;\n#endif\n",skinnormal_vertex:"#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
	specularmap_fragment:"float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",specularmap_pars_fragment:"#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",tonemapping_fragment:"#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",tonemapping_pars_fragment:"#define saturate(a) clamp( a, 0.0, 1.0 )\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
	uv_pars_fragment:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",uv_pars_vertex:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n#endif\n",
	uv_vertex:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",uv2_pars_fragment:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",uv2_pars_vertex:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
	uv2_vertex:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",worldpos_vertex:"#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( PHYSICAL ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\t#ifdef USE_SKINNING\n\t\tvec4 worldPosition = modelMatrix * skinned;\n\t#else\n\t\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n\t#endif\n#endif\n",cube_frag:"uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",
	cube_vert:"varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",depth_frag:"#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",
	depth_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
	distanceRGBA_frag:"uniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n#include <common>\n#include <packing>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tgl_FragColor = packDepthToRGBA( length( vWorldPosition.xyz - lightPos.xyz ) / 1000.0 );\n}\n",distanceRGBA_vert:"varying vec4 vWorldPosition;\n#include <common>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <skinbase_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition;\n}\n",
	equirect_frag:"uniform sampler2D tEquirect;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",equirect_vert:"varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
	linedashed_frag:"uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
	linedashed_vert:"uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n",
	meshbasic_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <normal_flip>\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
	meshbasic_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n",
	meshlambert_frag:"uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <normal_flip>\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
	meshlambert_vert:"#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
	meshphong_frag:"#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
	meshphong_vert:"#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
	meshphysical_frag:"#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
	meshphysical_vert:"#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
	normal_frag:"#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n",
	normal_vert:"#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",
	points_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
	points_vert:"uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
	shadow_frag:"uniform float opacity;\n#include <common>\n#include <packing>\n#include <bsdfs>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( 0.0, 0.0, 0.0, opacity * ( 1.0 - getShadowMask() ) );\n}\n",shadow_vert:"#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n"},ab={basic:{uniforms:Ha.merge([U.common,
	U.aomap,U.lightmap,U.fog]),vertexShader:T.meshbasic_vert,fragmentShader:T.meshbasic_frag},lambert:{uniforms:Ha.merge([U.common,U.aomap,U.lightmap,U.emissivemap,U.fog,U.lights,{emissive:{value:new G(0)}}]),vertexShader:T.meshlambert_vert,fragmentShader:T.meshlambert_frag},phong:{uniforms:Ha.merge([U.common,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.gradientmap,U.fog,U.lights,{emissive:{value:new G(0)},specular:{value:new G(1118481)},shininess:{value:30}}]),vertexShader:T.meshphong_vert,
	fragmentShader:T.meshphong_frag},standard:{uniforms:Ha.merge([U.common,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.roughnessmap,U.metalnessmap,U.fog,U.lights,{emissive:{value:new G(0)},roughness:{value:.5},metalness:{value:.5},envMapIntensity:{value:1}}]),vertexShader:T.meshphysical_vert,fragmentShader:T.meshphysical_frag},points:{uniforms:Ha.merge([U.points,U.fog]),vertexShader:T.points_vert,fragmentShader:T.points_frag},dashed:{uniforms:Ha.merge([U.common,U.fog,{scale:{value:1},
	dashSize:{value:1},totalSize:{value:2}}]),vertexShader:T.linedashed_vert,fragmentShader:T.linedashed_frag},depth:{uniforms:Ha.merge([U.common,U.displacementmap]),vertexShader:T.depth_vert,fragmentShader:T.depth_frag},normal:{uniforms:Ha.merge([U.common,U.bumpmap,U.normalmap,U.displacementmap,{opacity:{value:1}}]),vertexShader:T.normal_vert,fragmentShader:T.normal_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:T.cube_vert,fragmentShader:T.cube_frag},equirect:{uniforms:{tEquirect:{value:null},
	tFlip:{value:-1}},vertexShader:T.equirect_vert,fragmentShader:T.equirect_frag},distanceRGBA:{uniforms:{lightPos:{value:new p}},vertexShader:T.distanceRGBA_vert,fragmentShader:T.distanceRGBA_frag}};ab.physical={uniforms:Ha.merge([ab.standard.uniforms,{clearCoat:{value:0},clearCoatRoughness:{value:0}}]),vertexShader:T.meshphysical_vert,fragmentShader:T.meshphysical_frag};Object.assign(id.prototype,{set:function(a,b){this.min.copy(a);this.max.copy(b);return this},setFromPoints:function(a){this.makeEmpty();
	for(var b=0,c=a.length;b<c;b++)this.expandByPoint(a[b]);return this},setFromCenterAndSize:function(){var a=new E;return function(b,c){var d=a.copy(c).multiplyScalar(.5);this.min.copy(b).sub(d);this.max.copy(b).add(d);return this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.min.copy(a.min);this.max.copy(a.max);return this},makeEmpty:function(){this.min.x=this.min.y=Infinity;this.max.x=this.max.y=-Infinity;return this},isEmpty:function(){return this.max.x<this.min.x||
	this.max.y<this.min.y},getCenter:function(a){a=a||new E;return this.isEmpty()?a.set(0,0):a.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(a){a=a||new E;return this.isEmpty()?a.set(0,0):a.subVectors(this.max,this.min)},expandByPoint:function(a){this.min.min(a);this.max.max(a);return this},expandByVector:function(a){this.min.sub(a);this.max.add(a);return this},expandByScalar:function(a){this.min.addScalar(-a);this.max.addScalar(a);return this},containsPoint:function(a){return a.x<
	this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y?!1:!0},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y},getParameter:function(a,b){return(b||new E).set((a.x-this.min.x)/(this.max.x-this.min.x),(a.y-this.min.y)/(this.max.y-this.min.y))},intersectsBox:function(a){return a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y?!1:!0},clampPoint:function(a,b){return(b||new E).copy(a).clamp(this.min,this.max)},
	distanceToPoint:function(){var a=new E;return function(b){return a.copy(b).clamp(this.min,this.max).sub(b).length()}}(),intersect:function(a){this.min.max(a.min);this.max.min(a.max);return this},union:function(a){this.min.min(a.min);this.max.max(a.max);return this},translate:function(a){this.min.add(a);this.max.add(a);return this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)}});var Lf=0;Object.assign(Y.prototype,ra.prototype,{isMaterial:!0,setValues:function(a){if(void 0!==
	a)for(var b in a){var c=a[b];if(void 0===c)console.warn("THREE.Material: '"+b+"' parameter is undefined.");else{var d=this[b];void 0===d?console.warn("THREE."+this.type+": '"+b+"' is not a property of this material."):d&&d.isColor?d.set(c):d&&d.isVector3&&c&&c.isVector3?d.copy(c):this[b]="overdraw"===b?Number(c):c}}},toJSON:function(a){function b(a){var b=[],c;for(c in a){var d=a[c];delete d.metadata;b.push(d)}return b}var c=void 0===a;c&&(a={textures:{},images:{}});var d={metadata:{version:4.5,type:"Material",
	generator:"Material.toJSON"}};d.uuid=this.uuid;d.type=this.type;""!==this.name&&(d.name=this.name);this.color&&this.color.isColor&&(d.color=this.color.getHex());void 0!==this.roughness&&(d.roughness=this.roughness);void 0!==this.metalness&&(d.metalness=this.metalness);this.emissive&&this.emissive.isColor&&(d.emissive=this.emissive.getHex());this.specular&&this.specular.isColor&&(d.specular=this.specular.getHex());void 0!==this.shininess&&(d.shininess=this.shininess);void 0!==this.clearCoat&&(d.clearCoat=
	this.clearCoat);void 0!==this.clearCoatRoughness&&(d.clearCoatRoughness=this.clearCoatRoughness);this.map&&this.map.isTexture&&(d.map=this.map.toJSON(a).uuid);this.alphaMap&&this.alphaMap.isTexture&&(d.alphaMap=this.alphaMap.toJSON(a).uuid);this.lightMap&&this.lightMap.isTexture&&(d.lightMap=this.lightMap.toJSON(a).uuid);this.bumpMap&&this.bumpMap.isTexture&&(d.bumpMap=this.bumpMap.toJSON(a).uuid,d.bumpScale=this.bumpScale);this.normalMap&&this.normalMap.isTexture&&(d.normalMap=this.normalMap.toJSON(a).uuid,
	d.normalScale=this.normalScale.toArray());this.displacementMap&&this.displacementMap.isTexture&&(d.displacementMap=this.displacementMap.toJSON(a).uuid,d.displacementScale=this.displacementScale,d.displacementBias=this.displacementBias);this.roughnessMap&&this.roughnessMap.isTexture&&(d.roughnessMap=this.roughnessMap.toJSON(a).uuid);this.metalnessMap&&this.metalnessMap.isTexture&&(d.metalnessMap=this.metalnessMap.toJSON(a).uuid);this.emissiveMap&&this.emissiveMap.isTexture&&(d.emissiveMap=this.emissiveMap.toJSON(a).uuid);
	this.specularMap&&this.specularMap.isTexture&&(d.specularMap=this.specularMap.toJSON(a).uuid);this.envMap&&this.envMap.isTexture&&(d.envMap=this.envMap.toJSON(a).uuid,d.reflectivity=this.reflectivity);this.gradientMap&&this.gradientMap.isTexture&&(d.gradientMap=this.gradientMap.toJSON(a).uuid);void 0!==this.size&&(d.size=this.size);void 0!==this.sizeAttenuation&&(d.sizeAttenuation=this.sizeAttenuation);1!==this.blending&&(d.blending=this.blending);2!==this.shading&&(d.shading=this.shading);0!==this.side&&
	(d.side=this.side);0!==this.vertexColors&&(d.vertexColors=this.vertexColors);1>this.opacity&&(d.opacity=this.opacity);!0===this.transparent&&(d.transparent=this.transparent);d.depthFunc=this.depthFunc;d.depthTest=this.depthTest;d.depthWrite=this.depthWrite;0<this.alphaTest&&(d.alphaTest=this.alphaTest);!0===this.premultipliedAlpha&&(d.premultipliedAlpha=this.premultipliedAlpha);!0===this.wireframe&&(d.wireframe=this.wireframe);1<this.wireframeLinewidth&&(d.wireframeLinewidth=this.wireframeLinewidth);
	"round"!==this.wireframeLinecap&&(d.wireframeLinecap=this.wireframeLinecap);"round"!==this.wireframeLinejoin&&(d.wireframeLinejoin=this.wireframeLinejoin);d.skinning=this.skinning;d.morphTargets=this.morphTargets;d.dithering=this.dithering;c&&(c=b(a.textures),a=b(a.images),0<c.length&&(d.textures=c),0<a.length&&(d.images=a));return d},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.name=a.name;this.fog=a.fog;this.lights=a.lights;this.blending=a.blending;this.side=a.side;
	this.shading=a.shading;this.vertexColors=a.vertexColors;this.opacity=a.opacity;this.transparent=a.transparent;this.blendSrc=a.blendSrc;this.blendDst=a.blendDst;this.blendEquation=a.blendEquation;this.blendSrcAlpha=a.blendSrcAlpha;this.blendDstAlpha=a.blendDstAlpha;this.blendEquationAlpha=a.blendEquationAlpha;this.depthFunc=a.depthFunc;this.depthTest=a.depthTest;this.depthWrite=a.depthWrite;this.colorWrite=a.colorWrite;this.precision=a.precision;this.polygonOffset=a.polygonOffset;this.polygonOffsetFactor=
	a.polygonOffsetFactor;this.polygonOffsetUnits=a.polygonOffsetUnits;this.dithering=a.dithering;this.alphaTest=a.alphaTest;this.premultipliedAlpha=a.premultipliedAlpha;this.overdraw=a.overdraw;this.visible=a.visible;this.clipShadows=a.clipShadows;this.clipIntersection=a.clipIntersection;a=a.clippingPlanes;var b=null;if(null!==a)for(var c=a.length,b=Array(c),d=0;d!==c;++d)b[d]=a[d].clone();this.clippingPlanes=b;return this},dispose:function(){this.dispatchEvent({type:"dispose"})}});Da.prototype=Object.create(Y.prototype);
	Da.prototype.constructor=Da;Da.prototype.isShaderMaterial=!0;Da.prototype.copy=function(a){Y.prototype.copy.call(this,a);this.fragmentShader=a.fragmentShader;this.vertexShader=a.vertexShader;this.uniforms=Ha.clone(a.uniforms);this.defines=a.defines;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.lights=a.lights;this.clipping=a.clipping;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.morphNormals=a.morphNormals;this.extensions=a.extensions;return this};Da.prototype.toJSON=
	function(a){a=Y.prototype.toJSON.call(this,a);a.uniforms=this.uniforms;a.vertexShader=this.vertexShader;a.fragmentShader=this.fragmentShader;return a};$a.prototype=Object.create(Y.prototype);$a.prototype.constructor=$a;$a.prototype.isMeshDepthMaterial=!0;$a.prototype.copy=function(a){Y.prototype.copy.call(this,a);this.depthPacking=a.depthPacking;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.map=a.map;this.alphaMap=a.alphaMap;this.displacementMap=a.displacementMap;this.displacementScale=
	a.displacementScale;this.displacementBias=a.displacementBias;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;return this};Object.assign(Ta.prototype,{isBox3:!0,set:function(a,b){this.min.copy(a);this.max.copy(b);return this},setFromArray:function(a){for(var b=Infinity,c=Infinity,d=Infinity,e=-Infinity,f=-Infinity,g=-Infinity,h=0,k=a.length;h<k;h+=3){var m=a[h],l=a[h+1],q=a[h+2];m<b&&(b=m);l<c&&(c=l);q<d&&(d=q);m>e&&(e=m);l>f&&(f=l);q>g&&(g=q)}this.min.set(b,c,d);this.max.set(e,
	f,g);return this},setFromBufferAttribute:function(a){for(var b=Infinity,c=Infinity,d=Infinity,e=-Infinity,f=-Infinity,g=-Infinity,h=0,k=a.count;h<k;h++){var m=a.getX(h),l=a.getY(h),q=a.getZ(h);m<b&&(b=m);l<c&&(c=l);q<d&&(d=q);m>e&&(e=m);l>f&&(f=l);q>g&&(g=q)}this.min.set(b,c,d);this.max.set(e,f,g);return this},setFromPoints:function(a){this.makeEmpty();for(var b=0,c=a.length;b<c;b++)this.expandByPoint(a[b]);return this},setFromCenterAndSize:function(){var a=new p;return function(b,c){var d=a.copy(c).multiplyScalar(.5);
	this.min.copy(b).sub(d);this.max.copy(b).add(d);return this}}(),setFromObject:function(a){this.makeEmpty();return this.expandByObject(a)},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.min.copy(a.min);this.max.copy(a.max);return this},makeEmpty:function(){this.min.x=this.min.y=this.min.z=Infinity;this.max.x=this.max.y=this.max.z=-Infinity;return this},isEmpty:function(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z},getCenter:function(a){a=
	a||new p;return this.isEmpty()?a.set(0,0,0):a.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(a){a=a||new p;return this.isEmpty()?a.set(0,0,0):a.subVectors(this.max,this.min)},expandByPoint:function(a){this.min.min(a);this.max.max(a);return this},expandByVector:function(a){this.min.sub(a);this.max.add(a);return this},expandByScalar:function(a){this.min.addScalar(-a);this.max.addScalar(a);return this},expandByObject:function(){var a=new p;return function(b){var c=this;b.updateMatrixWorld(!0);
	b.traverse(function(b){var e,f;e=b.geometry;if(void 0!==e)if(e.isGeometry){var g=e.vertices;e=0;for(f=g.length;e<f;e++)a.copy(g[e]),a.applyMatrix4(b.matrixWorld),c.expandByPoint(a)}else if(e.isBufferGeometry&&(g=e.attributes.position,void 0!==g))for(e=0,f=g.count;e<f;e++)a.fromBufferAttribute(g,e).applyMatrix4(b.matrixWorld),c.expandByPoint(a)});return this}}(),containsPoint:function(a){return a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y||a.z<this.min.z||a.z>this.max.z?!1:!0},containsBox:function(a){return this.min.x<=
	a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y&&this.min.z<=a.min.z&&a.max.z<=this.max.z},getParameter:function(a,b){return(b||new p).set((a.x-this.min.x)/(this.max.x-this.min.x),(a.y-this.min.y)/(this.max.y-this.min.y),(a.z-this.min.z)/(this.max.z-this.min.z))},intersectsBox:function(a){return a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y||a.max.z<this.min.z||a.min.z>this.max.z?!1:!0},intersectsSphere:function(){var a=new p;return function(b){this.clampPoint(b.center,
	a);return a.distanceToSquared(b.center)<=b.radius*b.radius}}(),intersectsPlane:function(a){var b,c;0<a.normal.x?(b=a.normal.x*this.min.x,c=a.normal.x*this.max.x):(b=a.normal.x*this.max.x,c=a.normal.x*this.min.x);0<a.normal.y?(b+=a.normal.y*this.min.y,c+=a.normal.y*this.max.y):(b+=a.normal.y*this.max.y,c+=a.normal.y*this.min.y);0<a.normal.z?(b+=a.normal.z*this.min.z,c+=a.normal.z*this.max.z):(b+=a.normal.z*this.max.z,c+=a.normal.z*this.min.z);return b<=a.constant&&c>=a.constant},clampPoint:function(a,
	b){return(b||new p).copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new p;return function(b){return a.copy(b).clamp(this.min,this.max).sub(b).length()}}(),getBoundingSphere:function(){var a=new p;return function(b){b=b||new Ga;this.getCenter(b.center);b.radius=.5*this.getSize(a).length();return b}}(),intersect:function(a){this.min.max(a.min);this.max.min(a.max);this.isEmpty()&&this.makeEmpty();return this},union:function(a){this.min.min(a.min);this.max.max(a.max);return this},applyMatrix4:function(){var a=
	[new p,new p,new p,new p,new p,new p,new p,new p];return function(b){if(this.isEmpty())return this;a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(b);a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(b);a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(b);a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(b);a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(b);a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(b);a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(b);
	a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(b);this.setFromPoints(a);return this}}(),translate:function(a){this.min.add(a);this.max.add(a);return this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)}});Object.assign(Ga.prototype,{set:function(a,b){this.center.copy(a);this.radius=b;return this},setFromPoints:function(){var a=new Ta;return function(b,c){var d=this.center;void 0!==c?d.copy(c):a.setFromPoints(b).getCenter(d);for(var e=0,f=0,g=b.length;f<g;f++)e=Math.max(e,
	d.distanceToSquared(b[f]));this.radius=Math.sqrt(e);return this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.center.copy(a.center);this.radius=a.radius;return this},empty:function(){return 0>=this.radius},containsPoint:function(a){return a.distanceToSquared(this.center)<=this.radius*this.radius},distanceToPoint:function(a){return a.distanceTo(this.center)-this.radius},intersectsSphere:function(a){var b=this.radius+a.radius;return a.center.distanceToSquared(this.center)<=
	b*b},intersectsBox:function(a){return a.intersectsSphere(this)},intersectsPlane:function(a){return Math.abs(this.center.dot(a.normal)-a.constant)<=this.radius},clampPoint:function(a,b){var c=this.center.distanceToSquared(a),d=b||new p;d.copy(a);c>this.radius*this.radius&&(d.sub(this.center).normalize(),d.multiplyScalar(this.radius).add(this.center));return d},getBoundingBox:function(a){a=a||new Ta;a.set(this.center,this.center);a.expandByScalar(this.radius);return a},applyMatrix4:function(a){this.center.applyMatrix4(a);
	this.radius*=a.getMaxScaleOnAxis();return this},translate:function(a){this.center.add(a);return this},equals:function(a){return a.center.equals(this.center)&&a.radius===this.radius}});Object.assign(Ka.prototype,{isMatrix3:!0,set:function(a,b,c,d,e,f,g,h,k){var m=this.elements;m[0]=a;m[1]=d;m[2]=g;m[3]=b;m[4]=e;m[5]=h;m[6]=c;m[7]=f;m[8]=k;return this},identity:function(){this.set(1,0,0,0,1,0,0,0,1);return this},clone:function(){return(new this.constructor).fromArray(this.elements)},copy:function(a){var b=
	this.elements;a=a.elements;b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];return this},setFromMatrix4:function(a){a=a.elements;this.set(a[0],a[4],a[8],a[1],a[5],a[9],a[2],a[6],a[10]);return this},applyToBufferAttribute:function(){var a=new p;return function(b){for(var c=0,d=b.count;c<d;c++)a.x=b.getX(c),a.y=b.getY(c),a.z=b.getZ(c),a.applyMatrix3(this),b.setXYZ(c,a.x,a.y,a.z);return b}}(),multiply:function(a){return this.multiplyMatrices(this,a)},premultiply:function(a){return this.multiplyMatrices(a,
	this)},multiplyMatrices:function(a,b){var c=a.elements,d=b.elements,e=this.elements,f=c[0],g=c[3],h=c[6],k=c[1],m=c[4],l=c[7],q=c[2],n=c[5],c=c[8],t=d[0],p=d[3],r=d[6],y=d[1],x=d[4],v=d[7],H=d[2],w=d[5],d=d[8];e[0]=f*t+g*y+h*H;e[3]=f*p+g*x+h*w;e[6]=f*r+g*v+h*d;e[1]=k*t+m*y+l*H;e[4]=k*p+m*x+l*w;e[7]=k*r+m*v+l*d;e[2]=q*t+n*y+c*H;e[5]=q*p+n*x+c*w;e[8]=q*r+n*v+c*d;return this},multiplyScalar:function(a){var b=this.elements;b[0]*=a;b[3]*=a;b[6]*=a;b[1]*=a;b[4]*=a;b[7]*=a;b[2]*=a;b[5]*=a;b[8]*=a;return this},
	determinant:function(){var a=this.elements,b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],h=a[6],k=a[7],a=a[8];return b*f*a-b*g*k-c*e*a+c*g*h+d*e*k-d*f*h},getInverse:function(a,b){a&&a.isMatrix4&&console.error("THREE.Matrix3.getInverse no longer takes a Matrix4 argument.");var c=a.elements,d=this.elements,e=c[0],f=c[1],g=c[2],h=c[3],k=c[4],m=c[5],l=c[6],q=c[7],c=c[8],n=c*k-m*q,t=m*l-c*h,p=q*h-k*l,r=e*n+f*t+g*p;if(0===r){if(!0===b)throw Error("THREE.Matrix3.getInverse(): can't invert matrix, determinant is 0");
	console.warn("THREE.Matrix3.getInverse(): can't invert matrix, determinant is 0");return this.identity()}r=1/r;d[0]=n*r;d[1]=(g*q-c*f)*r;d[2]=(m*f-g*k)*r;d[3]=t*r;d[4]=(c*e-g*l)*r;d[5]=(g*h-m*e)*r;d[6]=p*r;d[7]=(f*l-q*e)*r;d[8]=(k*e-f*h)*r;return this},transpose:function(){var a,b=this.elements;a=b[1];b[1]=b[3];b[3]=a;a=b[2];b[2]=b[6];b[6]=a;a=b[5];b[5]=b[7];b[7]=a;return this},getNormalMatrix:function(a){return this.setFromMatrix4(a).getInverse(this).transpose()},transposeIntoArray:function(a){var b=
	this.elements;a[0]=b[0];a[1]=b[3];a[2]=b[6];a[3]=b[1];a[4]=b[4];a[5]=b[7];a[6]=b[2];a[7]=b[5];a[8]=b[8];return this},equals:function(a){var b=this.elements;a=a.elements;for(var c=0;9>c;c++)if(b[c]!==a[c])return!1;return!0},fromArray:function(a,b){void 0===b&&(b=0);for(var c=0;9>c;c++)this.elements[c]=a[c+b];return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);var c=this.elements;a[b]=c[0];a[b+1]=c[1];a[b+2]=c[2];a[b+3]=c[3];a[b+4]=c[4];a[b+5]=c[5];a[b+6]=c[6];a[b+7]=c[7];a[b+8]=
	c[8];return a}});Object.assign(va.prototype,{set:function(a,b){this.normal.copy(a);this.constant=b;return this},setComponents:function(a,b,c,d){this.normal.set(a,b,c);this.constant=d;return this},setFromNormalAndCoplanarPoint:function(a,b){this.normal.copy(a);this.constant=-b.dot(this.normal);return this},setFromCoplanarPoints:function(){var a=new p,b=new p;return function(c,d,e){d=a.subVectors(e,d).cross(b.subVectors(c,d)).normalize();this.setFromNormalAndCoplanarPoint(d,c);return this}}(),clone:function(){return(new this.constructor).copy(this)},
	copy:function(a){this.normal.copy(a.normal);this.constant=a.constant;return this},normalize:function(){var a=1/this.normal.length();this.normal.multiplyScalar(a);this.constant*=a;return this},negate:function(){this.constant*=-1;this.normal.negate();return this},distanceToPoint:function(a){return this.normal.dot(a)+this.constant},distanceToSphere:function(a){return this.distanceToPoint(a.center)-a.radius},projectPoint:function(a,b){return this.orthoPoint(a,b).sub(a).negate()},orthoPoint:function(a,
	b){var c=this.distanceToPoint(a);return(b||new p).copy(this.normal).multiplyScalar(c)},intersectLine:function(){var a=new p;return function(b,c){var d=c||new p,e=b.delta(a),f=this.normal.dot(e);if(0===f){if(0===this.distanceToPoint(b.start))return d.copy(b.start)}else return f=-(b.start.dot(this.normal)+this.constant)/f,0>f||1<f?void 0:d.copy(e).multiplyScalar(f).add(b.start)}}(),intersectsLine:function(a){var b=this.distanceToPoint(a.start);a=this.distanceToPoint(a.end);return 0>b&&0<a||0>a&&0<b},
	intersectsBox:function(a){return a.intersectsPlane(this)},intersectsSphere:function(a){return a.intersectsPlane(this)},coplanarPoint:function(a){return(a||new p).copy(this.normal).multiplyScalar(-this.constant)},applyMatrix4:function(){var a=new p,b=new Ka;return function(c,d){var e=this.coplanarPoint(a).applyMatrix4(c),f=d||b.getNormalMatrix(c),f=this.normal.applyMatrix3(f).normalize();this.constant=-e.dot(f);return this}}(),translate:function(a){this.constant-=a.dot(this.normal);return this},equals:function(a){return a.normal.equals(this.normal)&&
	a.constant===this.constant}});Object.assign(jd.prototype,{set:function(a,b,c,d,e,f){var g=this.planes;g[0].copy(a);g[1].copy(b);g[2].copy(c);g[3].copy(d);g[4].copy(e);g[5].copy(f);return this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){for(var b=this.planes,c=0;6>c;c++)b[c].copy(a.planes[c]);return this},setFromMatrix:function(a){var b=this.planes,c=a.elements;a=c[0];var d=c[1],e=c[2],f=c[3],g=c[4],h=c[5],k=c[6],m=c[7],l=c[8],q=c[9],n=c[10],t=c[11],p=c[12],r=c[13],
	y=c[14],c=c[15];b[0].setComponents(f-a,m-g,t-l,c-p).normalize();b[1].setComponents(f+a,m+g,t+l,c+p).normalize();b[2].setComponents(f+d,m+h,t+q,c+r).normalize();b[3].setComponents(f-d,m-h,t-q,c-r).normalize();b[4].setComponents(f-e,m-k,t-n,c-y).normalize();b[5].setComponents(f+e,m+k,t+n,c+y).normalize();return this},intersectsObject:function(){var a=new Ga;return function(b){var c=b.geometry;null===c.boundingSphere&&c.computeBoundingSphere();a.copy(c.boundingSphere).applyMatrix4(b.matrixWorld);return this.intersectsSphere(a)}}(),
	intersectsSprite:function(){var a=new Ga;return function(b){a.center.set(0,0,0);a.radius=.7071067811865476;a.applyMatrix4(b.matrixWorld);return this.intersectsSphere(a)}}(),intersectsSphere:function(a){var b=this.planes,c=a.center;a=-a.radius;for(var d=0;6>d;d++)if(b[d].distanceToPoint(c)<a)return!1;return!0},intersectsBox:function(){var a=new p,b=new p;return function(c){for(var d=this.planes,e=0;6>e;e++){var f=d[e];a.x=0<f.normal.x?c.min.x:c.max.x;b.x=0<f.normal.x?c.max.x:c.min.x;a.y=0<f.normal.y?
	c.min.y:c.max.y;b.y=0<f.normal.y?c.max.y:c.min.y;a.z=0<f.normal.z?c.min.z:c.max.z;b.z=0<f.normal.z?c.max.z:c.min.z;var g=f.distanceToPoint(a),f=f.distanceToPoint(b);if(0>g&&0>f)return!1}return!0}}(),containsPoint:function(a){for(var b=this.planes,c=0;6>c;c++)if(0>b[c].distanceToPoint(a))return!1;return!0}});Object.assign(hb.prototype,{set:function(a,b){this.origin.copy(a);this.direction.copy(b);return this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.origin.copy(a.origin);
	this.direction.copy(a.direction);return this},at:function(a,b){return(b||new p).copy(this.direction).multiplyScalar(a).add(this.origin)},lookAt:function(a){this.direction.copy(a).sub(this.origin).normalize();return this},recast:function(){var a=new p;return function(b){this.origin.copy(this.at(b,a));return this}}(),closestPointToPoint:function(a,b){var c=b||new p;c.subVectors(a,this.origin);var d=c.dot(this.direction);return 0>d?c.copy(this.origin):c.copy(this.direction).multiplyScalar(d).add(this.origin)},
	distanceToPoint:function(a){return Math.sqrt(this.distanceSqToPoint(a))},distanceSqToPoint:function(){var a=new p;return function(b){var c=a.subVectors(b,this.origin).dot(this.direction);if(0>c)return this.origin.distanceToSquared(b);a.copy(this.direction).multiplyScalar(c).add(this.origin);return a.distanceToSquared(b)}}(),distanceSqToSegment:function(){var a=new p,b=new p,c=new p;return function(d,e,f,g){a.copy(d).add(e).multiplyScalar(.5);b.copy(e).sub(d).normalize();c.copy(this.origin).sub(a);
	var h=.5*d.distanceTo(e),k=-this.direction.dot(b),m=c.dot(this.direction),l=-c.dot(b),q=c.lengthSq(),n=Math.abs(1-k*k),t;0<n?(d=k*l-m,e=k*m-l,t=h*n,0<=d?e>=-t?e<=t?(h=1/n,d*=h,e*=h,k=d*(d+k*e+2*m)+e*(k*d+e+2*l)+q):(e=h,d=Math.max(0,-(k*e+m)),k=-d*d+e*(e+2*l)+q):(e=-h,d=Math.max(0,-(k*e+m)),k=-d*d+e*(e+2*l)+q):e<=-t?(d=Math.max(0,-(-k*h+m)),e=0<d?-h:Math.min(Math.max(-h,-l),h),k=-d*d+e*(e+2*l)+q):e<=t?(d=0,e=Math.min(Math.max(-h,-l),h),k=e*(e+2*l)+q):(d=Math.max(0,-(k*h+m)),e=0<d?h:Math.min(Math.max(-h,
	-l),h),k=-d*d+e*(e+2*l)+q)):(e=0<k?-h:h,d=Math.max(0,-(k*e+m)),k=-d*d+e*(e+2*l)+q);f&&f.copy(this.direction).multiplyScalar(d).add(this.origin);g&&g.copy(b).multiplyScalar(e).add(a);return k}}(),intersectSphere:function(){var a=new p;return function(b,c){a.subVectors(b.center,this.origin);var d=a.dot(this.direction),e=a.dot(a)-d*d,f=b.radius*b.radius;if(e>f)return null;f=Math.sqrt(f-e);e=d-f;d+=f;return 0>e&&0>d?null:0>e?this.at(d,c):this.at(e,c)}}(),intersectsSphere:function(a){return this.distanceToPoint(a.center)<=
	a.radius},distanceToPlane:function(a){var b=a.normal.dot(this.direction);if(0===b)return 0===a.distanceToPoint(this.origin)?0:null;a=-(this.origin.dot(a.normal)+a.constant)/b;return 0<=a?a:null},intersectPlane:function(a,b){var c=this.distanceToPlane(a);return null===c?null:this.at(c,b)},intersectsPlane:function(a){var b=a.distanceToPoint(this.origin);return 0===b||0>a.normal.dot(this.direction)*b?!0:!1},intersectBox:function(a,b){var c,d,e,f,g;d=1/this.direction.x;f=1/this.direction.y;g=1/this.direction.z;
	var h=this.origin;0<=d?(c=(a.min.x-h.x)*d,d*=a.max.x-h.x):(c=(a.max.x-h.x)*d,d*=a.min.x-h.x);0<=f?(e=(a.min.y-h.y)*f,f*=a.max.y-h.y):(e=(a.max.y-h.y)*f,f*=a.min.y-h.y);if(c>f||e>d)return null;if(e>c||c!==c)c=e;if(f<d||d!==d)d=f;0<=g?(e=(a.min.z-h.z)*g,g*=a.max.z-h.z):(e=(a.max.z-h.z)*g,g*=a.min.z-h.z);if(c>g||e>d)return null;if(e>c||c!==c)c=e;if(g<d||d!==d)d=g;return 0>d?null:this.at(0<=c?c:d,b)},intersectsBox:function(){var a=new p;return function(b){return null!==this.intersectBox(b,a)}}(),intersectTriangle:function(){var a=
	new p,b=new p,c=new p,d=new p;return function(e,f,g,h,k){b.subVectors(f,e);c.subVectors(g,e);d.crossVectors(b,c);f=this.direction.dot(d);if(0<f){if(h)return null;h=1}else if(0>f)h=-1,f=-f;else return null;a.subVectors(this.origin,e);e=h*this.direction.dot(c.crossVectors(a,c));if(0>e)return null;g=h*this.direction.dot(b.cross(a));if(0>g||e+g>f)return null;e=-h*a.dot(d);return 0>e?null:this.at(e/f,k)}}(),applyMatrix4:function(a){this.direction.add(this.origin).applyMatrix4(a);this.origin.applyMatrix4(a);
	this.direction.sub(this.origin);this.direction.normalize();return this},equals:function(a){return a.origin.equals(this.origin)&&a.direction.equals(this.direction)}});bb.RotationOrders="XYZ YZX ZXY XZY YXZ ZYX".split(" ");bb.DefaultOrder="XYZ";Object.defineProperties(bb.prototype,{x:{get:function(){return this._x},set:function(a){this._x=a;this.onChangeCallback()}},y:{get:function(){return this._y},set:function(a){this._y=a;this.onChangeCallback()}},z:{get:function(){return this._z},set:function(a){this._z=
	a;this.onChangeCallback()}},order:{get:function(){return this._order},set:function(a){this._order=a;this.onChangeCallback()}}});Object.assign(bb.prototype,{isEuler:!0,set:function(a,b,c,d){this._x=a;this._y=b;this._z=c;this._order=d||this._order;this.onChangeCallback();return this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._order)},copy:function(a){this._x=a._x;this._y=a._y;this._z=a._z;this._order=a._order;this.onChangeCallback();return this},setFromRotationMatrix:function(a,
	b,c){var d=X.clamp,e=a.elements;a=e[0];var f=e[4],g=e[8],h=e[1],k=e[5],m=e[9],l=e[2],q=e[6],e=e[10];b=b||this._order;"XYZ"===b?(this._y=Math.asin(d(g,-1,1)),.99999>Math.abs(g)?(this._x=Math.atan2(-m,e),this._z=Math.atan2(-f,a)):(this._x=Math.atan2(q,k),this._z=0)):"YXZ"===b?(this._x=Math.asin(-d(m,-1,1)),.99999>Math.abs(m)?(this._y=Math.atan2(g,e),this._z=Math.atan2(h,k)):(this._y=Math.atan2(-l,a),this._z=0)):"ZXY"===b?(this._x=Math.asin(d(q,-1,1)),.99999>Math.abs(q)?(this._y=Math.atan2(-l,e),this._z=
	Math.atan2(-f,k)):(this._y=0,this._z=Math.atan2(h,a))):"ZYX"===b?(this._y=Math.asin(-d(l,-1,1)),.99999>Math.abs(l)?(this._x=Math.atan2(q,e),this._z=Math.atan2(h,a)):(this._x=0,this._z=Math.atan2(-f,k))):"YZX"===b?(this._z=Math.asin(d(h,-1,1)),.99999>Math.abs(h)?(this._x=Math.atan2(-m,k),this._y=Math.atan2(-l,a)):(this._x=0,this._y=Math.atan2(g,e))):"XZY"===b?(this._z=Math.asin(-d(f,-1,1)),.99999>Math.abs(f)?(this._x=Math.atan2(q,k),this._y=Math.atan2(g,a)):(this._x=Math.atan2(-m,e),this._y=0)):console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: "+
	b);this._order=b;if(!1!==c)this.onChangeCallback();return this},setFromQuaternion:function(){var a=new J;return function(b,c,d){a.makeRotationFromQuaternion(b);return this.setFromRotationMatrix(a,c,d)}}(),setFromVector3:function(a,b){return this.set(a.x,a.y,a.z,b||this._order)},reorder:function(){var a=new pa;return function(b){a.setFromEuler(this);return this.setFromQuaternion(a,b)}}(),equals:function(a){return a._x===this._x&&a._y===this._y&&a._z===this._z&&a._order===this._order},fromArray:function(a){this._x=
	a[0];this._y=a[1];this._z=a[2];void 0!==a[3]&&(this._order=a[3]);this.onChangeCallback();return this},toArray:function(a,b){void 0===a&&(a=[]);void 0===b&&(b=0);a[b]=this._x;a[b+1]=this._y;a[b+2]=this._z;a[b+3]=this._order;return a},toVector3:function(a){return a?a.set(this._x,this._y,this._z):new p(this._x,this._y,this._z)},onChange:function(a){this.onChangeCallback=a;return this},onChangeCallback:function(){}});Object.assign(Rd.prototype,{set:function(a){this.mask=1<<a|0},enable:function(a){this.mask=
	this.mask|1<<a|0},toggle:function(a){this.mask^=1<<a|0},disable:function(a){this.mask&=~(1<<a|0)},test:function(a){return 0!==(this.mask&a.mask)}});var Mf=0;B.DefaultUp=new p(0,1,0);B.DefaultMatrixAutoUpdate=!0;Object.assign(B.prototype,ra.prototype,{isObject3D:!0,onBeforeRender:function(){},onAfterRender:function(){},applyMatrix:function(a){this.matrix.multiplyMatrices(a,this.matrix);this.matrix.decompose(this.position,this.quaternion,this.scale)},applyQuaternion:function(a){this.quaternion.premultiply(a);
	return this},setRotationFromAxisAngle:function(a,b){this.quaternion.setFromAxisAngle(a,b)},setRotationFromEuler:function(a){this.quaternion.setFromEuler(a,!0)},setRotationFromMatrix:function(a){this.quaternion.setFromRotationMatrix(a)},setRotationFromQuaternion:function(a){this.quaternion.copy(a)},rotateOnAxis:function(){var a=new pa;return function(b,c){a.setFromAxisAngle(b,c);this.quaternion.multiply(a);return this}}(),rotateX:function(){var a=new p(1,0,0);return function(b){return this.rotateOnAxis(a,
	b)}}(),rotateY:function(){var a=new p(0,1,0);return function(b){return this.rotateOnAxis(a,b)}}(),rotateZ:function(){var a=new p(0,0,1);return function(b){return this.rotateOnAxis(a,b)}}(),translateOnAxis:function(){var a=new p;return function(b,c){a.copy(b).applyQuaternion(this.quaternion);this.position.add(a.multiplyScalar(c));return this}}(),translateX:function(){var a=new p(1,0,0);return function(b){return this.translateOnAxis(a,b)}}(),translateY:function(){var a=new p(0,1,0);return function(b){return this.translateOnAxis(a,
	b)}}(),translateZ:function(){var a=new p(0,0,1);return function(b){return this.translateOnAxis(a,b)}}(),localToWorld:function(a){return a.applyMatrix4(this.matrixWorld)},worldToLocal:function(){var a=new J;return function(b){return b.applyMatrix4(a.getInverse(this.matrixWorld))}}(),lookAt:function(){var a=new J;return function(b){this.isCamera?a.lookAt(this.position,b,this.up):a.lookAt(b,this.position,this.up);this.quaternion.setFromRotationMatrix(a)}}(),add:function(a){if(1<arguments.length){for(var b=
	0;b<arguments.length;b++)this.add(arguments[b]);return this}if(a===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",a),this;a&&a.isObject3D?(null!==a.parent&&a.parent.remove(a),a.parent=this,a.dispatchEvent({type:"added"}),this.children.push(a)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",a);return this},remove:function(a){if(1<arguments.length)for(var b=0;b<arguments.length;b++)this.remove(arguments[b]);b=this.children.indexOf(a);
	-1!==b&&(a.parent=null,a.dispatchEvent({type:"removed"}),this.children.splice(b,1))},getObjectById:function(a){return this.getObjectByProperty("id",a)},getObjectByName:function(a){return this.getObjectByProperty("name",a)},getObjectByProperty:function(a,b){if(this[a]===b)return this;for(var c=0,d=this.children.length;c<d;c++){var e=this.children[c].getObjectByProperty(a,b);if(void 0!==e)return e}},getWorldPosition:function(a){a=a||new p;this.updateMatrixWorld(!0);return a.setFromMatrixPosition(this.matrixWorld)},
	getWorldQuaternion:function(){var a=new p,b=new p;return function(c){c=c||new pa;this.updateMatrixWorld(!0);this.matrixWorld.decompose(a,c,b);return c}}(),getWorldRotation:function(){var a=new pa;return function(b){b=b||new bb;this.getWorldQuaternion(a);return b.setFromQuaternion(a,this.rotation.order,!1)}}(),getWorldScale:function(){var a=new p,b=new pa;return function(c){c=c||new p;this.updateMatrixWorld(!0);this.matrixWorld.decompose(a,b,c);return c}}(),getWorldDirection:function(){var a=new pa;
	return function(b){b=b||new p;this.getWorldQuaternion(a);return b.set(0,0,1).applyQuaternion(a)}}(),raycast:function(){},traverse:function(a){a(this);for(var b=this.children,c=0,d=b.length;c<d;c++)b[c].traverse(a)},traverseVisible:function(a){if(!1!==this.visible){a(this);for(var b=this.children,c=0,d=b.length;c<d;c++)b[c].traverseVisible(a)}},traverseAncestors:function(a){var b=this.parent;null!==b&&(a(b),b.traverseAncestors(a))},updateMatrix:function(){this.matrix.compose(this.position,this.quaternion,
	this.scale);this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(a){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||a)null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,a=!0;for(var b=this.children,c=0,d=b.length;c<d;c++)b[c].updateMatrixWorld(a)},toJSON:function(a){function b(b,c){void 0===b[c.uuid]&&(b[c.uuid]=c.toJSON(a));return c.uuid}function c(a){var b=[],
	c;for(c in a){var d=a[c];delete d.metadata;b.push(d)}return b}var d=void 0===a||""===a,e={};d&&(a={geometries:{},materials:{},textures:{},images:{}},e.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});var f={};f.uuid=this.uuid;f.type=this.type;""!==this.name&&(f.name=this.name);"{}"!==JSON.stringify(this.userData)&&(f.userData=this.userData);!0===this.castShadow&&(f.castShadow=!0);!0===this.receiveShadow&&(f.receiveShadow=!0);!1===this.visible&&(f.visible=!1);f.matrix=this.matrix.toArray();
	void 0!==this.geometry&&(f.geometry=b(a.geometries,this.geometry));if(void 0!==this.material)if(Array.isArray(this.material)){for(var g=[],h=0,k=this.material.length;h<k;h++)g.push(b(a.materials,this.material[h]));f.material=g}else f.material=b(a.materials,this.material);if(0<this.children.length)for(f.children=[],h=0;h<this.children.length;h++)f.children.push(this.children[h].toJSON(a).object);d&&(d=c(a.geometries),g=c(a.materials),h=c(a.textures),k=c(a.images),0<d.length&&(e.geometries=d),0<g.length&&
	(e.materials=g),0<h.length&&(e.textures=h),0<k.length&&(e.images=k));e.object=f;return e},clone:function(a){return(new this.constructor).copy(this,a)},copy:function(a,b){void 0===b&&(b=!0);this.name=a.name;this.up.copy(a.up);this.position.copy(a.position);this.quaternion.copy(a.quaternion);this.scale.copy(a.scale);this.matrix.copy(a.matrix);this.matrixWorld.copy(a.matrixWorld);this.matrixAutoUpdate=a.matrixAutoUpdate;this.matrixWorldNeedsUpdate=a.matrixWorldNeedsUpdate;this.layers.mask=a.layers.mask;
	this.visible=a.visible;this.castShadow=a.castShadow;this.receiveShadow=a.receiveShadow;this.frustumCulled=a.frustumCulled;this.renderOrder=a.renderOrder;this.userData=JSON.parse(JSON.stringify(a.userData));if(!0===b)for(var c=0;c<a.children.length;c++)this.add(a.children[c].clone());return this}});Object.assign(Hb.prototype,{set:function(a,b){this.start.copy(a);this.end.copy(b);return this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.start.copy(a.start);this.end.copy(a.end);
	return this},getCenter:function(a){return(a||new p).addVectors(this.start,this.end).multiplyScalar(.5)},delta:function(a){return(a||new p).subVectors(this.end,this.start)},distanceSq:function(){return this.start.distanceToSquared(this.end)},distance:function(){return this.start.distanceTo(this.end)},at:function(a,b){var c=b||new p;return this.delta(c).multiplyScalar(a).add(this.start)},closestPointToPointParameter:function(){var a=new p,b=new p;return function(c,d){a.subVectors(c,this.start);b.subVectors(this.end,
	this.start);var e=b.dot(b),e=b.dot(a)/e;d&&(e=X.clamp(e,0,1));return e}}(),closestPointToPoint:function(a,b,c){a=this.closestPointToPointParameter(a,b);c=c||new p;return this.delta(c).multiplyScalar(a).add(this.start)},applyMatrix4:function(a){this.start.applyMatrix4(a);this.end.applyMatrix4(a);return this},equals:function(a){return a.start.equals(this.start)&&a.end.equals(this.end)}});Object.assign(Ua,{normal:function(){var a=new p;return function(b,c,d,e){e=e||new p;e.subVectors(d,c);a.subVectors(b,
	c);e.cross(a);b=e.lengthSq();return 0<b?e.multiplyScalar(1/Math.sqrt(b)):e.set(0,0,0)}}(),barycoordFromPoint:function(){var a=new p,b=new p,c=new p;return function(d,e,f,g,h){a.subVectors(g,e);b.subVectors(f,e);c.subVectors(d,e);d=a.dot(a);e=a.dot(b);f=a.dot(c);var k=b.dot(b);g=b.dot(c);var m=d*k-e*e;h=h||new p;if(0===m)return h.set(-2,-1,-1);m=1/m;k=(k*f-e*g)*m;d=(d*g-e*f)*m;return h.set(1-k-d,d,k)}}(),containsPoint:function(){var a=new p;return function(b,c,d,e){b=Ua.barycoordFromPoint(b,c,d,e,
	a);return 0<=b.x&&0<=b.y&&1>=b.x+b.y}}()});Object.assign(Ua.prototype,{set:function(a,b,c){this.a.copy(a);this.b.copy(b);this.c.copy(c);return this},setFromPointsAndIndices:function(a,b,c,d){this.a.copy(a[b]);this.b.copy(a[c]);this.c.copy(a[d]);return this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.a.copy(a.a);this.b.copy(a.b);this.c.copy(a.c);return this},area:function(){var a=new p,b=new p;return function(){a.subVectors(this.c,this.b);b.subVectors(this.a,this.b);
	return.5*a.cross(b).length()}}(),midpoint:function(a){return(a||new p).addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)},normal:function(a){return Ua.normal(this.a,this.b,this.c,a)},plane:function(a){return(a||new va).setFromCoplanarPoints(this.a,this.b,this.c)},barycoordFromPoint:function(a,b){return Ua.barycoordFromPoint(a,this.a,this.b,this.c,b)},containsPoint:function(a){return Ua.containsPoint(a,this.a,this.b,this.c)},closestPointToPoint:function(){var a=new va,b=[new Hb,new Hb,new Hb],
	c=new p,d=new p;return function(e,f){var g=f||new p,h=Infinity;a.setFromCoplanarPoints(this.a,this.b,this.c);a.projectPoint(e,c);if(!0===this.containsPoint(c))g.copy(c);else{b[0].set(this.a,this.b);b[1].set(this.b,this.c);b[2].set(this.c,this.a);for(var k=0;k<b.length;k++){b[k].closestPointToPoint(c,!0,d);var m=c.distanceToSquared(d);m<h&&(h=m,g.copy(d))}}return g}}(),equals:function(a){return a.a.equals(this.a)&&a.b.equals(this.b)&&a.c.equals(this.c)}});Object.assign(Va.prototype,{clone:function(){return(new this.constructor).copy(this)},
	copy:function(a){this.a=a.a;this.b=a.b;this.c=a.c;this.normal.copy(a.normal);this.color.copy(a.color);this.materialIndex=a.materialIndex;for(var b=0,c=a.vertexNormals.length;b<c;b++)this.vertexNormals[b]=a.vertexNormals[b].clone();b=0;for(c=a.vertexColors.length;b<c;b++)this.vertexColors[b]=a.vertexColors[b].clone();return this}});Na.prototype=Object.create(Y.prototype);Na.prototype.constructor=Na;Na.prototype.isMeshBasicMaterial=!0;Na.prototype.copy=function(a){Y.prototype.copy.call(this,a);this.color.copy(a.color);
	this.map=a.map;this.lightMap=a.lightMap;this.lightMapIntensity=a.lightMapIntensity;this.aoMap=a.aoMap;this.aoMapIntensity=a.aoMapIntensity;this.specularMap=a.specularMap;this.alphaMap=a.alphaMap;this.envMap=a.envMap;this.combine=a.combine;this.reflectivity=a.reflectivity;this.refractionRatio=a.refractionRatio;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.wireframeLinecap=a.wireframeLinecap;this.wireframeLinejoin=a.wireframeLinejoin;this.skinning=a.skinning;this.morphTargets=
	a.morphTargets;return this};Object.defineProperty(L.prototype,"needsUpdate",{set:function(a){!0===a&&this.version++}});Object.assign(L.prototype,{isBufferAttribute:!0,setArray:function(a){if(Array.isArray(a))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.count=void 0!==a?a.length/this.itemSize:0;this.array=a},setDynamic:function(a){this.dynamic=a;return this},copy:function(a){this.array=new a.array.constructor(a.array);this.itemSize=a.itemSize;this.count=a.count;
	this.normalized=a.normalized;this.dynamic=a.dynamic;return this},copyAt:function(a,b,c){a*=this.itemSize;c*=b.itemSize;for(var d=0,e=this.itemSize;d<e;d++)this.array[a+d]=b.array[c+d];return this},copyArray:function(a){this.array.set(a);return this},copyColorsArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];void 0===f&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",d),f=new G);b[c++]=f.r;b[c++]=f.g;b[c++]=f.b}return this},copyIndicesArray:function(a){for(var b=
	this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];b[c++]=f.a;b[c++]=f.b;b[c++]=f.c}return this},copyVector2sArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];void 0===f&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",d),f=new E);b[c++]=f.x;b[c++]=f.y}return this},copyVector3sArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];void 0===f&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",
	d),f=new p);b[c++]=f.x;b[c++]=f.y;b[c++]=f.z}return this},copyVector4sArray:function(a){for(var b=this.array,c=0,d=0,e=a.length;d<e;d++){var f=a[d];void 0===f&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",d),f=new ha);b[c++]=f.x;b[c++]=f.y;b[c++]=f.z;b[c++]=f.w}return this},set:function(a,b){void 0===b&&(b=0);this.array.set(a,b);return this},getX:function(a){return this.array[a*this.itemSize]},setX:function(a,b){this.array[a*this.itemSize]=b;return this},getY:function(a){return this.array[a*
	this.itemSize+1]},setY:function(a,b){this.array[a*this.itemSize+1]=b;return this},getZ:function(a){return this.array[a*this.itemSize+2]},setZ:function(a,b){this.array[a*this.itemSize+2]=b;return this},getW:function(a){return this.array[a*this.itemSize+3]},setW:function(a,b){this.array[a*this.itemSize+3]=b;return this},setXY:function(a,b,c){a*=this.itemSize;this.array[a+0]=b;this.array[a+1]=c;return this},setXYZ:function(a,b,c,d){a*=this.itemSize;this.array[a+0]=b;this.array[a+1]=c;this.array[a+2]=
	d;return this},setXYZW:function(a,b,c,d,e){a*=this.itemSize;this.array[a+0]=b;this.array[a+1]=c;this.array[a+2]=d;this.array[a+3]=e;return this},onUpload:function(a){this.onUploadCallback=a;return this},clone:function(){return(new this.constructor(this.array,this.itemSize)).copy(this)}});rc.prototype=Object.create(L.prototype);rc.prototype.constructor=rc;sc.prototype=Object.create(L.prototype);sc.prototype.constructor=sc;tc.prototype=Object.create(L.prototype);tc.prototype.constructor=tc;uc.prototype=
	Object.create(L.prototype);uc.prototype.constructor=uc;ib.prototype=Object.create(L.prototype);ib.prototype.constructor=ib;vc.prototype=Object.create(L.prototype);vc.prototype.constructor=vc;jb.prototype=Object.create(L.prototype);jb.prototype.constructor=jb;C.prototype=Object.create(L.prototype);C.prototype.constructor=C;wc.prototype=Object.create(L.prototype);wc.prototype.constructor=wc;Object.assign(Ke.prototype,{computeGroups:function(a){var b,c=[],d=void 0;a=a.faces;for(var e=0;e<a.length;e++){var f=
	a[e];f.materialIndex!==d&&(d=f.materialIndex,void 0!==b&&(b.count=3*e-b.start,c.push(b)),b={start:3*e,materialIndex:d})}void 0!==b&&(b.count=3*e-b.start,c.push(b));this.groups=c},fromGeometry:function(a){var b=a.faces,c=a.vertices,d=a.faceVertexUvs,e=d[0]&&0<d[0].length,f=d[1]&&0<d[1].length,g=a.morphTargets,h=g.length,k;if(0<h){k=[];for(var m=0;m<h;m++)k[m]=[];this.morphTargets.position=k}var l=a.morphNormals,q=l.length,n;if(0<q){n=[];for(m=0;m<q;m++)n[m]=[];this.morphTargets.normal=n}for(var t=
	a.skinIndices,p=a.skinWeights,r=t.length===c.length,y=p.length===c.length,m=0;m<b.length;m++){var x=b[m];this.vertices.push(c[x.a],c[x.b],c[x.c]);var v=x.vertexNormals;3===v.length?this.normals.push(v[0],v[1],v[2]):(v=x.normal,this.normals.push(v,v,v));v=x.vertexColors;3===v.length?this.colors.push(v[0],v[1],v[2]):(v=x.color,this.colors.push(v,v,v));!0===e&&(v=d[0][m],void 0!==v?this.uvs.push(v[0],v[1],v[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ",m),this.uvs.push(new E,
	new E,new E)));!0===f&&(v=d[1][m],void 0!==v?this.uvs2.push(v[0],v[1],v[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ",m),this.uvs2.push(new E,new E,new E)));for(v=0;v<h;v++){var H=g[v].vertices;k[v].push(H[x.a],H[x.b],H[x.c])}for(v=0;v<q;v++)H=l[v].vertexNormals[m],n[v].push(H.a,H.b,H.c);r&&this.skinIndices.push(t[x.a],t[x.b],t[x.c]);y&&this.skinWeights.push(p[x.a],p[x.b],p[x.c])}this.computeGroups(a);this.verticesNeedUpdate=a.verticesNeedUpdate;this.normalsNeedUpdate=
	a.normalsNeedUpdate;this.colorsNeedUpdate=a.colorsNeedUpdate;this.uvsNeedUpdate=a.uvsNeedUpdate;this.groupsNeedUpdate=a.groupsNeedUpdate;return this}});var Td=0;Object.assign(M.prototype,ra.prototype,{isGeometry:!0,applyMatrix:function(a){for(var b=(new Ka).getNormalMatrix(a),c=0,d=this.vertices.length;c<d;c++)this.vertices[c].applyMatrix4(a);c=0;for(d=this.faces.length;c<d;c++){a=this.faces[c];a.normal.applyMatrix3(b).normalize();for(var e=0,f=a.vertexNormals.length;e<f;e++)a.vertexNormals[e].applyMatrix3(b).normalize()}null!==
	this.boundingBox&&this.computeBoundingBox();null!==this.boundingSphere&&this.computeBoundingSphere();this.normalsNeedUpdate=this.verticesNeedUpdate=!0;return this},rotateX:function(){var a=new J;return function(b){a.makeRotationX(b);this.applyMatrix(a);return this}}(),rotateY:function(){var a=new J;return function(b){a.makeRotationY(b);this.applyMatrix(a);return this}}(),rotateZ:function(){var a=new J;return function(b){a.makeRotationZ(b);this.applyMatrix(a);return this}}(),translate:function(){var a=
	new J;return function(b,c,d){a.makeTranslation(b,c,d);this.applyMatrix(a);return this}}(),scale:function(){var a=new J;return function(b,c,d){a.makeScale(b,c,d);this.applyMatrix(a);return this}}(),lookAt:function(){var a=new B;return function(b){a.lookAt(b);a.updateMatrix();this.applyMatrix(a.matrix)}}(),fromBufferGeometry:function(a){function b(a,b,d,e){var f=void 0!==g?[l[a].clone(),l[b].clone(),l[d].clone()]:[],t=void 0!==h?[c.colors[a].clone(),c.colors[b].clone(),c.colors[d].clone()]:[];e=new Va(a,
	b,d,f,t,e);c.faces.push(e);void 0!==k&&c.faceVertexUvs[0].push([q[a].clone(),q[b].clone(),q[d].clone()]);void 0!==m&&c.faceVertexUvs[1].push([n[a].clone(),n[b].clone(),n[d].clone()])}var c=this,d=null!==a.index?a.index.array:void 0,e=a.attributes,f=e.position.array,g=void 0!==e.normal?e.normal.array:void 0,h=void 0!==e.color?e.color.array:void 0,k=void 0!==e.uv?e.uv.array:void 0,m=void 0!==e.uv2?e.uv2.array:void 0;void 0!==m&&(this.faceVertexUvs[1]=[]);for(var l=[],q=[],n=[],t=e=0;e<f.length;e+=3,
	t+=2)c.vertices.push(new p(f[e],f[e+1],f[e+2])),void 0!==g&&l.push(new p(g[e],g[e+1],g[e+2])),void 0!==h&&c.colors.push(new G(h[e],h[e+1],h[e+2])),void 0!==k&&q.push(new E(k[t],k[t+1])),void 0!==m&&n.push(new E(m[t],m[t+1]));var z=a.groups;if(0<z.length)for(e=0;e<z.length;e++)for(var f=z[e],r=f.start,y=f.count,t=r,r=r+y;t<r;t+=3)void 0!==d?b(d[t],d[t+1],d[t+2],f.materialIndex):b(t,t+1,t+2,f.materialIndex);else if(void 0!==d)for(e=0;e<d.length;e+=3)b(d[e],d[e+1],d[e+2]);else for(e=0;e<f.length/3;e+=
	3)b(e,e+1,e+2);this.computeFaceNormals();null!==a.boundingBox&&(this.boundingBox=a.boundingBox.clone());null!==a.boundingSphere&&(this.boundingSphere=a.boundingSphere.clone());return this},center:function(){this.computeBoundingBox();var a=this.boundingBox.getCenter().negate();this.translate(a.x,a.y,a.z);return a},normalize:function(){this.computeBoundingSphere();var a=this.boundingSphere.center,b=this.boundingSphere.radius,b=0===b?1:1/b,c=new J;c.set(b,0,0,-b*a.x,0,b,0,-b*a.y,0,0,b,-b*a.z,0,0,0,1);
	this.applyMatrix(c);return this},computeFaceNormals:function(){for(var a=new p,b=new p,c=0,d=this.faces.length;c<d;c++){var e=this.faces[c],f=this.vertices[e.a],g=this.vertices[e.b];a.subVectors(this.vertices[e.c],g);b.subVectors(f,g);a.cross(b);a.normalize();e.normal.copy(a)}},computeVertexNormals:function(a){void 0===a&&(a=!0);var b,c,d;d=Array(this.vertices.length);b=0;for(c=this.vertices.length;b<c;b++)d[b]=new p;if(a){var e,f,g,h=new p,k=new p;a=0;for(b=this.faces.length;a<b;a++)c=this.faces[a],
	e=this.vertices[c.a],f=this.vertices[c.b],g=this.vertices[c.c],h.subVectors(g,f),k.subVectors(e,f),h.cross(k),d[c.a].add(h),d[c.b].add(h),d[c.c].add(h)}else for(this.computeFaceNormals(),a=0,b=this.faces.length;a<b;a++)c=this.faces[a],d[c.a].add(c.normal),d[c.b].add(c.normal),d[c.c].add(c.normal);b=0;for(c=this.vertices.length;b<c;b++)d[b].normalize();a=0;for(b=this.faces.length;a<b;a++)c=this.faces[a],e=c.vertexNormals,3===e.length?(e[0].copy(d[c.a]),e[1].copy(d[c.b]),e[2].copy(d[c.c])):(e[0]=d[c.a].clone(),
	e[1]=d[c.b].clone(),e[2]=d[c.c].clone());0<this.faces.length&&(this.normalsNeedUpdate=!0)},computeFlatVertexNormals:function(){var a,b,c;this.computeFaceNormals();a=0;for(b=this.faces.length;a<b;a++){c=this.faces[a];var d=c.vertexNormals;3===d.length?(d[0].copy(c.normal),d[1].copy(c.normal),d[2].copy(c.normal)):(d[0]=c.normal.clone(),d[1]=c.normal.clone(),d[2]=c.normal.clone())}0<this.faces.length&&(this.normalsNeedUpdate=!0)},computeMorphNormals:function(){var a,b,c,d,e;c=0;for(d=this.faces.length;c<
	d;c++)for(e=this.faces[c],e.__originalFaceNormal?e.__originalFaceNormal.copy(e.normal):e.__originalFaceNormal=e.normal.clone(),e.__originalVertexNormals||(e.__originalVertexNormals=[]),a=0,b=e.vertexNormals.length;a<b;a++)e.__originalVertexNormals[a]?e.__originalVertexNormals[a].copy(e.vertexNormals[a]):e.__originalVertexNormals[a]=e.vertexNormals[a].clone();var f=new M;f.faces=this.faces;a=0;for(b=this.morphTargets.length;a<b;a++){if(!this.morphNormals[a]){this.morphNormals[a]={};this.morphNormals[a].faceNormals=
	[];this.morphNormals[a].vertexNormals=[];e=this.morphNormals[a].faceNormals;var g=this.morphNormals[a].vertexNormals,h,k;c=0;for(d=this.faces.length;c<d;c++)h=new p,k={a:new p,b:new p,c:new p},e.push(h),g.push(k)}g=this.morphNormals[a];f.vertices=this.morphTargets[a].vertices;f.computeFaceNormals();f.computeVertexNormals();c=0;for(d=this.faces.length;c<d;c++)e=this.faces[c],h=g.faceNormals[c],k=g.vertexNormals[c],h.copy(e.normal),k.a.copy(e.vertexNormals[0]),k.b.copy(e.vertexNormals[1]),k.c.copy(e.vertexNormals[2])}c=
	0;for(d=this.faces.length;c<d;c++)e=this.faces[c],e.normal=e.__originalFaceNormal,e.vertexNormals=e.__originalVertexNormals},computeLineDistances:function(){for(var a=0,b=this.vertices,c=0,d=b.length;c<d;c++)0<c&&(a+=b[c].distanceTo(b[c-1])),this.lineDistances[c]=a},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new Ta);this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){null===this.boundingSphere&&(this.boundingSphere=new Ga);this.boundingSphere.setFromPoints(this.vertices)},
	merge:function(a,b,c){if(!1===(a&&a.isGeometry))console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",a);else{var d,e=this.vertices.length,f=this.vertices,g=a.vertices,h=this.faces,k=a.faces,m=this.faceVertexUvs[0],l=a.faceVertexUvs[0],q=this.colors,n=a.colors;void 0===c&&(c=0);void 0!==b&&(d=(new Ka).getNormalMatrix(b));a=0;for(var t=g.length;a<t;a++){var p=g[a].clone();void 0!==b&&p.applyMatrix4(b);f.push(p)}a=0;for(t=n.length;a<t;a++)q.push(n[a].clone());a=0;for(t=
	k.length;a<t;a++){var g=k[a],r=g.vertexNormals,n=g.vertexColors,q=new Va(g.a+e,g.b+e,g.c+e);q.normal.copy(g.normal);void 0!==d&&q.normal.applyMatrix3(d).normalize();b=0;for(f=r.length;b<f;b++)p=r[b].clone(),void 0!==d&&p.applyMatrix3(d).normalize(),q.vertexNormals.push(p);q.color.copy(g.color);b=0;for(f=n.length;b<f;b++)p=n[b],q.vertexColors.push(p.clone());q.materialIndex=g.materialIndex+c;h.push(q)}a=0;for(t=l.length;a<t;a++)if(c=l[a],d=[],void 0!==c){b=0;for(f=c.length;b<f;b++)d.push(c[b].clone());
	m.push(d)}}},mergeMesh:function(a){!1===(a&&a.isMesh)?console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",a):(a.matrixAutoUpdate&&a.updateMatrix(),this.merge(a.geometry,a.matrix))},mergeVertices:function(){var a={},b=[],c=[],d,e=Math.pow(10,4),f,g;f=0;for(g=this.vertices.length;f<g;f++)d=this.vertices[f],d=Math.round(d.x*e)+"_"+Math.round(d.y*e)+"_"+Math.round(d.z*e),void 0===a[d]?(a[d]=f,b.push(this.vertices[f]),c[f]=b.length-1):c[f]=c[a[d]];a=[];f=0;for(g=this.faces.length;f<
	g;f++)for(e=this.faces[f],e.a=c[e.a],e.b=c[e.b],e.c=c[e.c],e=[e.a,e.b,e.c],d=0;3>d;d++)if(e[d]===e[(d+1)%3]){a.push(f);break}for(f=a.length-1;0<=f;f--)for(e=a[f],this.faces.splice(e,1),c=0,g=this.faceVertexUvs.length;c<g;c++)this.faceVertexUvs[c].splice(e,1);f=this.vertices.length-b.length;this.vertices=b;return f},sortFacesByMaterialIndex:function(){for(var a=this.faces,b=a.length,c=0;c<b;c++)a[c]._id=c;a.sort(function(a,b){return a.materialIndex-b.materialIndex});var d=this.faceVertexUvs[0],e=this.faceVertexUvs[1],
	f,g;d&&d.length===b&&(f=[]);e&&e.length===b&&(g=[]);for(c=0;c<b;c++){var h=a[c]._id;f&&f.push(d[h]);g&&g.push(e[h])}f&&(this.faceVertexUvs[0]=f);g&&(this.faceVertexUvs[1]=g)},toJSON:function(){function a(a,b,c){return c?a|1<<b:a&~(1<<b)}function b(a){var b=a.x.toString()+a.y.toString()+a.z.toString();if(void 0!==m[b])return m[b];m[b]=k.length/3;k.push(a.x,a.y,a.z);return m[b]}function c(a){var b=a.r.toString()+a.g.toString()+a.b.toString();if(void 0!==q[b])return q[b];q[b]=l.length;l.push(a.getHex());
	return q[b]}function d(a){var b=a.x.toString()+a.y.toString();if(void 0!==t[b])return t[b];t[b]=n.length/2;n.push(a.x,a.y);return t[b]}var e={metadata:{version:4.5,type:"Geometry",generator:"Geometry.toJSON"}};e.uuid=this.uuid;e.type=this.type;""!==this.name&&(e.name=this.name);if(void 0!==this.parameters){var f=this.parameters,g;for(g in f)void 0!==f[g]&&(e[g]=f[g]);return e}f=[];for(g=0;g<this.vertices.length;g++){var h=this.vertices[g];f.push(h.x,h.y,h.z)}var h=[],k=[],m={},l=[],q={},n=[],t={};
	for(g=0;g<this.faces.length;g++){var p=this.faces[g],r=void 0!==this.faceVertexUvs[0][g],y=0<p.normal.length(),x=0<p.vertexNormals.length,v=1!==p.color.r||1!==p.color.g||1!==p.color.b,H=0<p.vertexColors.length,w=0,w=a(w,0,0),w=a(w,1,!0),w=a(w,2,!1),w=a(w,3,r),w=a(w,4,y),w=a(w,5,x),w=a(w,6,v),w=a(w,7,H);h.push(w);h.push(p.a,p.b,p.c);h.push(p.materialIndex);r&&(r=this.faceVertexUvs[0][g],h.push(d(r[0]),d(r[1]),d(r[2])));y&&h.push(b(p.normal));x&&(y=p.vertexNormals,h.push(b(y[0]),b(y[1]),b(y[2])));v&&
	h.push(c(p.color));H&&(p=p.vertexColors,h.push(c(p[0]),c(p[1]),c(p[2])))}e.data={};e.data.vertices=f;e.data.normals=k;0<l.length&&(e.data.colors=l);0<n.length&&(e.data.uvs=[n]);e.data.faces=h;return e},clone:function(){return(new M).copy(this)},copy:function(a){var b,c,d,e,f,g;this.vertices=[];this.colors=[];this.faces=[];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphNormals=[];this.skinWeights=[];this.skinIndices=[];this.lineDistances=[];this.boundingSphere=this.boundingBox=null;this.name=
	a.name;d=a.vertices;b=0;for(c=d.length;b<c;b++)this.vertices.push(d[b].clone());d=a.colors;b=0;for(c=d.length;b<c;b++)this.colors.push(d[b].clone());d=a.faces;b=0;for(c=d.length;b<c;b++)this.faces.push(d[b].clone());b=0;for(c=a.faceVertexUvs.length;b<c;b++){var h=a.faceVertexUvs[b];void 0===this.faceVertexUvs[b]&&(this.faceVertexUvs[b]=[]);d=0;for(e=h.length;d<e;d++){var k=h[d],m=[];f=0;for(g=k.length;f<g;f++)m.push(k[f].clone());this.faceVertexUvs[b].push(m)}}f=a.morphTargets;b=0;for(c=f.length;b<
	c;b++){g={};g.name=f[b].name;if(void 0!==f[b].vertices)for(g.vertices=[],d=0,e=f[b].vertices.length;d<e;d++)g.vertices.push(f[b].vertices[d].clone());if(void 0!==f[b].normals)for(g.normals=[],d=0,e=f[b].normals.length;d<e;d++)g.normals.push(f[b].normals[d].clone());this.morphTargets.push(g)}f=a.morphNormals;b=0;for(c=f.length;b<c;b++){g={};if(void 0!==f[b].vertexNormals)for(g.vertexNormals=[],d=0,e=f[b].vertexNormals.length;d<e;d++)h=f[b].vertexNormals[d],k={},k.a=h.a.clone(),k.b=h.b.clone(),k.c=
	h.c.clone(),g.vertexNormals.push(k);if(void 0!==f[b].faceNormals)for(g.faceNormals=[],d=0,e=f[b].faceNormals.length;d<e;d++)g.faceNormals.push(f[b].faceNormals[d].clone());this.morphNormals.push(g)}d=a.skinWeights;b=0;for(c=d.length;b<c;b++)this.skinWeights.push(d[b].clone());d=a.skinIndices;b=0;for(c=d.length;b<c;b++)this.skinIndices.push(d[b].clone());d=a.lineDistances;b=0;for(c=d.length;b<c;b++)this.lineDistances.push(d[b]);b=a.boundingBox;null!==b&&(this.boundingBox=b.clone());b=a.boundingSphere;
	null!==b&&(this.boundingSphere=b.clone());this.elementsNeedUpdate=a.elementsNeedUpdate;this.verticesNeedUpdate=a.verticesNeedUpdate;this.uvsNeedUpdate=a.uvsNeedUpdate;this.normalsNeedUpdate=a.normalsNeedUpdate;this.colorsNeedUpdate=a.colorsNeedUpdate;this.lineDistancesNeedUpdate=a.lineDistancesNeedUpdate;this.groupsNeedUpdate=a.groupsNeedUpdate;return this},dispose:function(){this.dispatchEvent({type:"dispose"})}});I.MaxIndex=65535;Object.assign(I.prototype,ra.prototype,{isBufferGeometry:!0,getIndex:function(){return this.index},
	setIndex:function(a){Array.isArray(a)?this.index=new (65535<Sd(a)?jb:ib)(a,1):this.index=a},addAttribute:function(a,b,c){if(!1===(b&&b.isBufferAttribute)&&!1===(b&&b.isInterleavedBufferAttribute))console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.addAttribute(a,new L(b,c));else if("index"===a)console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(b);else return this.attributes[a]=b,this},getAttribute:function(a){return this.attributes[a]},
	removeAttribute:function(a){delete this.attributes[a];return this},addGroup:function(a,b,c){this.groups.push({start:a,count:b,materialIndex:void 0!==c?c:0})},clearGroups:function(){this.groups=[]},setDrawRange:function(a,b){this.drawRange.start=a;this.drawRange.count=b},applyMatrix:function(a){var b=this.attributes.position;void 0!==b&&(a.applyToBufferAttribute(b),b.needsUpdate=!0);b=this.attributes.normal;void 0!==b&&((new Ka).getNormalMatrix(a).applyToBufferAttribute(b),b.needsUpdate=!0);null!==
	this.boundingBox&&this.computeBoundingBox();null!==this.boundingSphere&&this.computeBoundingSphere();return this},rotateX:function(){var a=new J;return function(b){a.makeRotationX(b);this.applyMatrix(a);return this}}(),rotateY:function(){var a=new J;return function(b){a.makeRotationY(b);this.applyMatrix(a);return this}}(),rotateZ:function(){var a=new J;return function(b){a.makeRotationZ(b);this.applyMatrix(a);return this}}(),translate:function(){var a=new J;return function(b,c,d){a.makeTranslation(b,
	c,d);this.applyMatrix(a);return this}}(),scale:function(){var a=new J;return function(b,c,d){a.makeScale(b,c,d);this.applyMatrix(a);return this}}(),lookAt:function(){var a=new B;return function(b){a.lookAt(b);a.updateMatrix();this.applyMatrix(a.matrix)}}(),center:function(){this.computeBoundingBox();var a=this.boundingBox.getCenter().negate();this.translate(a.x,a.y,a.z);return a},setFromObject:function(a){var b=a.geometry;if(a.isPoints||a.isLine){a=new C(3*b.vertices.length,3);var c=new C(3*b.colors.length,
	3);this.addAttribute("position",a.copyVector3sArray(b.vertices));this.addAttribute("color",c.copyColorsArray(b.colors));b.lineDistances&&b.lineDistances.length===b.vertices.length&&(a=new C(b.lineDistances.length,1),this.addAttribute("lineDistance",a.copyArray(b.lineDistances)));null!==b.boundingSphere&&(this.boundingSphere=b.boundingSphere.clone());null!==b.boundingBox&&(this.boundingBox=b.boundingBox.clone())}else a.isMesh&&b&&b.isGeometry&&this.fromGeometry(b);return this},updateFromObject:function(a){var b=
	a.geometry;if(a.isMesh){var c=b.__directGeometry;!0===b.elementsNeedUpdate&&(c=void 0,b.elementsNeedUpdate=!1);if(void 0===c)return this.fromGeometry(b);c.verticesNeedUpdate=b.verticesNeedUpdate;c.normalsNeedUpdate=b.normalsNeedUpdate;c.colorsNeedUpdate=b.colorsNeedUpdate;c.uvsNeedUpdate=b.uvsNeedUpdate;c.groupsNeedUpdate=b.groupsNeedUpdate;b.verticesNeedUpdate=!1;b.normalsNeedUpdate=!1;b.colorsNeedUpdate=!1;b.uvsNeedUpdate=!1;b.groupsNeedUpdate=!1;b=c}!0===b.verticesNeedUpdate&&(c=this.attributes.position,
	void 0!==c&&(c.copyVector3sArray(b.vertices),c.needsUpdate=!0),b.verticesNeedUpdate=!1);!0===b.normalsNeedUpdate&&(c=this.attributes.normal,void 0!==c&&(c.copyVector3sArray(b.normals),c.needsUpdate=!0),b.normalsNeedUpdate=!1);!0===b.colorsNeedUpdate&&(c=this.attributes.color,void 0!==c&&(c.copyColorsArray(b.colors),c.needsUpdate=!0),b.colorsNeedUpdate=!1);b.uvsNeedUpdate&&(c=this.attributes.uv,void 0!==c&&(c.copyVector2sArray(b.uvs),c.needsUpdate=!0),b.uvsNeedUpdate=!1);b.lineDistancesNeedUpdate&&
	(c=this.attributes.lineDistance,void 0!==c&&(c.copyArray(b.lineDistances),c.needsUpdate=!0),b.lineDistancesNeedUpdate=!1);b.groupsNeedUpdate&&(b.computeGroups(a.geometry),this.groups=b.groups,b.groupsNeedUpdate=!1);return this},fromGeometry:function(a){a.__directGeometry=(new Ke).fromGeometry(a);return this.fromDirectGeometry(a.__directGeometry)},fromDirectGeometry:function(a){var b=new Float32Array(3*a.vertices.length);this.addAttribute("position",(new L(b,3)).copyVector3sArray(a.vertices));0<a.normals.length&&
	(b=new Float32Array(3*a.normals.length),this.addAttribute("normal",(new L(b,3)).copyVector3sArray(a.normals)));0<a.colors.length&&(b=new Float32Array(3*a.colors.length),this.addAttribute("color",(new L(b,3)).copyColorsArray(a.colors)));0<a.uvs.length&&(b=new Float32Array(2*a.uvs.length),this.addAttribute("uv",(new L(b,2)).copyVector2sArray(a.uvs)));0<a.uvs2.length&&(b=new Float32Array(2*a.uvs2.length),this.addAttribute("uv2",(new L(b,2)).copyVector2sArray(a.uvs2)));0<a.indices.length&&(b=new (65535<
	Sd(a.indices)?Uint32Array:Uint16Array)(3*a.indices.length),this.setIndex((new L(b,1)).copyIndicesArray(a.indices)));this.groups=a.groups;for(var c in a.morphTargets){for(var b=[],d=a.morphTargets[c],e=0,f=d.length;e<f;e++){var g=d[e],h=new C(3*g.length,3);b.push(h.copyVector3sArray(g))}this.morphAttributes[c]=b}0<a.skinIndices.length&&(c=new C(4*a.skinIndices.length,4),this.addAttribute("skinIndex",c.copyVector4sArray(a.skinIndices)));0<a.skinWeights.length&&(c=new C(4*a.skinWeights.length,4),this.addAttribute("skinWeight",
	c.copyVector4sArray(a.skinWeights)));null!==a.boundingSphere&&(this.boundingSphere=a.boundingSphere.clone());null!==a.boundingBox&&(this.boundingBox=a.boundingBox.clone());return this},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new Ta);var a=this.attributes.position;void 0!==a?this.boundingBox.setFromBufferAttribute(a):this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
	this)},computeBoundingSphere:function(){var a=new Ta,b=new p;return function(){null===this.boundingSphere&&(this.boundingSphere=new Ga);var c=this.attributes.position;if(c){var d=this.boundingSphere.center;a.setFromBufferAttribute(c);a.getCenter(d);for(var e=0,f=0,g=c.count;f<g;f++)b.x=c.getX(f),b.y=c.getY(f),b.z=c.getZ(f),e=Math.max(e,d.distanceToSquared(b));this.boundingSphere.radius=Math.sqrt(e);isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
	this)}}}(),computeFaceNormals:function(){},computeVertexNormals:function(){var a=this.index,b=this.attributes,c=this.groups;if(b.position){var d=b.position.array;if(void 0===b.normal)this.addAttribute("normal",new L(new Float32Array(d.length),3));else for(var e=b.normal.array,f=0,g=e.length;f<g;f++)e[f]=0;var e=b.normal.array,h,k,m,l=new p,q=new p,n=new p,t=new p,z=new p;if(a){a=a.array;0===c.length&&this.addGroup(0,a.length);for(var r=0,y=c.length;r<y;++r)for(f=c[r],g=f.start,h=f.count,f=g,g+=h;f<
	g;f+=3)h=3*a[f+0],k=3*a[f+1],m=3*a[f+2],l.fromArray(d,h),q.fromArray(d,k),n.fromArray(d,m),t.subVectors(n,q),z.subVectors(l,q),t.cross(z),e[h]+=t.x,e[h+1]+=t.y,e[h+2]+=t.z,e[k]+=t.x,e[k+1]+=t.y,e[k+2]+=t.z,e[m]+=t.x,e[m+1]+=t.y,e[m+2]+=t.z}else for(f=0,g=d.length;f<g;f+=9)l.fromArray(d,f),q.fromArray(d,f+3),n.fromArray(d,f+6),t.subVectors(n,q),z.subVectors(l,q),t.cross(z),e[f]=t.x,e[f+1]=t.y,e[f+2]=t.z,e[f+3]=t.x,e[f+4]=t.y,e[f+5]=t.z,e[f+6]=t.x,e[f+7]=t.y,e[f+8]=t.z;this.normalizeNormals();b.normal.needsUpdate=
	!0}},merge:function(a,b){if(!1===(a&&a.isBufferGeometry))console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",a);else{void 0===b&&(b=0);var c=this.attributes,d;for(d in c)if(void 0!==a.attributes[d])for(var e=c[d].array,f=a.attributes[d],g=f.array,h=0,f=f.itemSize*b;h<g.length;h++,f++)e[f]=g[h];return this}},normalizeNormals:function(){for(var a=this.attributes.normal,b,c,d,e,f=0,g=a.count;f<g;f++)b=a.getX(f),c=a.getY(f),d=a.getZ(f),e=1/Math.sqrt(b*b+c*c+
	d*d),a.setXYZ(f,b*e,c*e,d*e)},toNonIndexed:function(){if(null===this.index)return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."),this;var a=new I,b=this.index.array,c=this.attributes,d;for(d in c){for(var e=c[d],f=e.array,e=e.itemSize,g=new f.constructor(b.length*e),h,k=0,m=0,l=b.length;m<l;m++){h=b[m]*e;for(var q=0;q<e;q++)g[k++]=f[h++]}a.addAttribute(d,new L(g,e))}return a},toJSON:function(){var a={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};
	a.uuid=this.uuid;a.type=this.type;""!==this.name&&(a.name=this.name);if(void 0!==this.parameters){var b=this.parameters,c;for(c in b)void 0!==b[c]&&(a[c]=b[c]);return a}a.data={attributes:{}};var d=this.index;null!==d&&(b=Array.prototype.slice.call(d.array),a.data.index={type:d.array.constructor.name,array:b});d=this.attributes;for(c in d){var e=d[c],b=Array.prototype.slice.call(e.array);a.data.attributes[c]={itemSize:e.itemSize,type:e.array.constructor.name,array:b,normalized:e.normalized}}c=this.groups;
	0<c.length&&(a.data.groups=JSON.parse(JSON.stringify(c)));c=this.boundingSphere;null!==c&&(a.data.boundingSphere={center:c.center.toArray(),radius:c.radius});return a},clone:function(){return(new I).copy(this)},copy:function(a){var b,c,d;this.index=null;this.attributes={};this.morphAttributes={};this.groups=[];this.boundingSphere=this.boundingBox=null;this.name=a.name;c=a.index;null!==c&&this.setIndex(c.clone());c=a.attributes;for(b in c)this.addAttribute(b,c[b].clone());var e=a.morphAttributes;for(b in e){var f=
	[],g=e[b];c=0;for(d=g.length;c<d;c++)f.push(g[c].clone());this.morphAttributes[b]=f}b=a.groups;c=0;for(d=b.length;c<d;c++)e=b[c],this.addGroup(e.start,e.count,e.materialIndex);b=a.boundingBox;null!==b&&(this.boundingBox=b.clone());b=a.boundingSphere;null!==b&&(this.boundingSphere=b.clone());this.drawRange.start=a.drawRange.start;this.drawRange.count=a.drawRange.count;return this},dispose:function(){this.dispatchEvent({type:"dispose"})}});Ba.prototype=Object.assign(Object.create(B.prototype),{constructor:Ba,
	isMesh:!0,setDrawMode:function(a){this.drawMode=a},copy:function(a){B.prototype.copy.call(this,a);this.drawMode=a.drawMode;return this},updateMorphTargets:function(){var a=this.geometry,b,c;if(a.isBufferGeometry){if(a=a.morphAttributes,b=Object.keys(a),0<b.length){var d=a[b[0]];if(void 0!==d)for(this.morphTargetInfluences=[],this.morphTargetDictionary={},a=0,b=d.length;a<b;a++)c=d[a].name||String(a),this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=a}}else if(d=a.morphTargets,void 0!==
	d&&0<d.length)for(this.morphTargetInfluences=[],this.morphTargetDictionary={},a=0,b=d.length;a<b;a++)c=d[a].name||String(a),this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=a},raycast:function(){function a(a,b,c,d,e,f,g){Ua.barycoordFromPoint(a,b,c,d,r);e.multiplyScalar(r.x);f.multiplyScalar(r.y);g.multiplyScalar(r.z);e.add(f).add(g);return e.clone()}function b(a,b,c,d,e,f,g){var h=a.material;if(null===(1===h.side?c.intersectTriangle(f,e,d,!0,g):c.intersectTriangle(d,e,f,2!==h.side,
	g)))return null;x.copy(g);x.applyMatrix4(a.matrixWorld);c=b.ray.origin.distanceTo(x);return c<b.near||c>b.far?null:{distance:c,point:x.clone(),object:a}}function c(c,d,e,f,m,l,u,q){g.fromBufferAttribute(f,l);h.fromBufferAttribute(f,u);k.fromBufferAttribute(f,q);if(c=b(c,d,e,g,h,k,y))m&&(n.fromBufferAttribute(m,l),t.fromBufferAttribute(m,u),z.fromBufferAttribute(m,q),c.uv=a(y,g,h,k,n,t,z)),c.face=new Va(l,u,q,Ua.normal(g,h,k)),c.faceIndex=l;return c}var d=new J,e=new hb,f=new Ga,g=new p,h=new p,k=
	new p,m=new p,l=new p,q=new p,n=new E,t=new E,z=new E,r=new p,y=new p,x=new p;return function(p,r){var w=this.geometry,x=this.material,C=this.matrixWorld;if(void 0!==x&&(null===w.boundingSphere&&w.computeBoundingSphere(),f.copy(w.boundingSphere),f.applyMatrix4(C),!1!==p.ray.intersectsSphere(f)&&(d.getInverse(C),e.copy(p.ray).applyMatrix4(d),null===w.boundingBox||!1!==e.intersectsBox(w.boundingBox)))){var D;if(w.isBufferGeometry){var F,E,x=w.index,B=w.attributes.position,C=w.attributes.uv,ca,I;if(null!==
	x)for(ca=0,I=x.count;ca<I;ca+=3){if(w=x.getX(ca),F=x.getX(ca+1),E=x.getX(ca+2),D=c(this,p,e,B,C,w,F,E))D.faceIndex=Math.floor(ca/3),r.push(D)}else for(ca=0,I=B.count;ca<I;ca+=3)if(w=ca,F=ca+1,E=ca+2,D=c(this,p,e,B,C,w,F,E))D.index=w,r.push(D)}else if(w.isGeometry){var G,C=Array.isArray(x);ca=w.vertices;I=w.faces;F=w.faceVertexUvs[0];0<F.length&&(B=F);for(var J=0,M=I.length;J<M;J++){var Q=I[J];D=C?x[Q.materialIndex]:x;if(void 0!==D){F=ca[Q.a];E=ca[Q.b];G=ca[Q.c];if(!0===D.morphTargets){D=w.morphTargets;
	var K=this.morphTargetInfluences;g.set(0,0,0);h.set(0,0,0);k.set(0,0,0);for(var V=0,ba=D.length;V<ba;V++){var R=K[V];if(0!==R){var O=D[V].vertices;g.addScaledVector(m.subVectors(O[Q.a],F),R);h.addScaledVector(l.subVectors(O[Q.b],E),R);k.addScaledVector(q.subVectors(O[Q.c],G),R)}}g.add(F);h.add(E);k.add(G);F=g;E=h;G=k}if(D=b(this,p,e,F,E,G,y))B&&B[J]&&(K=B[J],n.copy(K[0]),t.copy(K[1]),z.copy(K[2]),D.uv=a(y,F,E,G,n,t,z)),D.face=Q,D.faceIndex=J,r.push(D)}}}}}}(),clone:function(){return(new this.constructor(this.geometry,
	this.material)).copy(this)}});Ib.prototype=Object.create(M.prototype);Ib.prototype.constructor=Ib;kb.prototype=Object.create(I.prototype);kb.prototype.constructor=kb;xc.prototype=Object.create(M.prototype);xc.prototype.constructor=xc;lb.prototype=Object.create(I.prototype);lb.prototype.constructor=lb;Oa.prototype=Object.assign(Object.create(B.prototype),{constructor:Oa,isCamera:!0,copy:function(a,b){B.prototype.copy.call(this,a,b);this.matrixWorldInverse.copy(a.matrixWorldInverse);this.projectionMatrix.copy(a.projectionMatrix);
	return this},getWorldDirection:function(){var a=new pa;return function(b){b=b||new p;this.getWorldQuaternion(a);return b.set(0,0,-1).applyQuaternion(a)}}(),updateMatrixWorld:function(a){B.prototype.updateMatrixWorld.call(this,a);this.matrixWorldInverse.getInverse(this.matrixWorld)},clone:function(){return(new this.constructor).copy(this)}});wa.prototype=Object.assign(Object.create(Oa.prototype),{constructor:wa,isPerspectiveCamera:!0,copy:function(a,b){Oa.prototype.copy.call(this,a,b);this.fov=a.fov;
	this.zoom=a.zoom;this.near=a.near;this.far=a.far;this.focus=a.focus;this.aspect=a.aspect;this.view=null===a.view?null:Object.assign({},a.view);this.filmGauge=a.filmGauge;this.filmOffset=a.filmOffset;return this},setFocalLength:function(a){a=.5*this.getFilmHeight()/a;this.fov=2*X.RAD2DEG*Math.atan(a);this.updateProjectionMatrix()},getFocalLength:function(){var a=Math.tan(.5*X.DEG2RAD*this.fov);return.5*this.getFilmHeight()/a},getEffectiveFOV:function(){return 2*X.RAD2DEG*Math.atan(Math.tan(.5*X.DEG2RAD*
	this.fov)/this.zoom)},getFilmWidth:function(){return this.filmGauge*Math.min(this.aspect,1)},getFilmHeight:function(){return this.filmGauge/Math.max(this.aspect,1)},setViewOffset:function(a,b,c,d,e,f){this.aspect=a/b;this.view={fullWidth:a,fullHeight:b,offsetX:c,offsetY:d,width:e,height:f};this.updateProjectionMatrix()},clearViewOffset:function(){this.view=null;this.updateProjectionMatrix()},updateProjectionMatrix:function(){var a=this.near,b=a*Math.tan(.5*X.DEG2RAD*this.fov)/this.zoom,c=2*b,d=this.aspect*
	c,e=-.5*d,f=this.view;if(null!==f)var g=f.fullWidth,h=f.fullHeight,e=e+f.offsetX*d/g,b=b-f.offsetY*c/h,d=f.width/g*d,c=f.height/h*c;f=this.filmOffset;0!==f&&(e+=a*f/this.getFilmWidth());this.projectionMatrix.makePerspective(e,e+d,b,b-c,a,this.far)},toJSON:function(a){a=B.prototype.toJSON.call(this,a);a.object.fov=this.fov;a.object.zoom=this.zoom;a.object.near=this.near;a.object.far=this.far;a.object.focus=this.focus;a.object.aspect=this.aspect;null!==this.view&&(a.object.view=Object.assign({},this.view));
	a.object.filmGauge=this.filmGauge;a.object.filmOffset=this.filmOffset;return a}});Jb.prototype=Object.assign(Object.create(Oa.prototype),{constructor:Jb,isOrthographicCamera:!0,copy:function(a,b){Oa.prototype.copy.call(this,a,b);this.left=a.left;this.right=a.right;this.top=a.top;this.bottom=a.bottom;this.near=a.near;this.far=a.far;this.zoom=a.zoom;this.view=null===a.view?null:Object.assign({},a.view);return this},setViewOffset:function(a,b,c,d,e,f){this.view={fullWidth:a,fullHeight:b,offsetX:c,offsetY:d,
	width:e,height:f};this.updateProjectionMatrix()},clearViewOffset:function(){this.view=null;this.updateProjectionMatrix()},updateProjectionMatrix:function(){var a=(this.right-this.left)/(2*this.zoom),b=(this.top-this.bottom)/(2*this.zoom),c=(this.right+this.left)/2,d=(this.top+this.bottom)/2,e=c-a,c=c+a,a=d+b,b=d-b;if(null!==this.view)var c=this.zoom/(this.view.width/this.view.fullWidth),b=this.zoom/(this.view.height/this.view.fullHeight),f=(this.right-this.left)/this.view.width,d=(this.top-this.bottom)/
	this.view.height,e=e+this.view.offsetX/c*f,c=e+this.view.width/c*f,a=a-this.view.offsetY/b*d,b=a-this.view.height/b*d;this.projectionMatrix.makeOrthographic(e,c,a,b,this.near,this.far)},toJSON:function(a){a=B.prototype.toJSON.call(this,a);a.object.zoom=this.zoom;a.object.left=this.left;a.object.right=this.right;a.object.top=this.top;a.object.bottom=this.bottom;a.object.near=this.near;a.object.far=this.far;null!==this.view&&(a.object.view=Object.assign({},this.view));return a}});var cg=0;Kb.prototype.isFogExp2=
	!0;Kb.prototype.clone=function(){return new Kb(this.color.getHex(),this.density)};Kb.prototype.toJSON=function(a){return{type:"FogExp2",color:this.color.getHex(),density:this.density}};Lb.prototype.isFog=!0;Lb.prototype.clone=function(){return new Lb(this.color.getHex(),this.near,this.far)};Lb.prototype.toJSON=function(a){return{type:"Fog",color:this.color.getHex(),near:this.near,far:this.far}};md.prototype=Object.assign(Object.create(B.prototype),{constructor:md,copy:function(a,b){B.prototype.copy.call(this,
	a,b);null!==a.background&&(this.background=a.background.clone());null!==a.fog&&(this.fog=a.fog.clone());null!==a.overrideMaterial&&(this.overrideMaterial=a.overrideMaterial.clone());this.autoUpdate=a.autoUpdate;this.matrixAutoUpdate=a.matrixAutoUpdate;return this},toJSON:function(a){var b=B.prototype.toJSON.call(this,a);null!==this.background&&(b.object.background=this.background.toJSON(a));null!==this.fog&&(b.object.fog=this.fog.toJSON());return b}});Yd.prototype=Object.assign(Object.create(B.prototype),
	{constructor:Yd,isLensFlare:!0,copy:function(a){B.prototype.copy.call(this,a);this.positionScreen.copy(a.positionScreen);this.customUpdateCallback=a.customUpdateCallback;for(var b=0,c=a.lensFlares.length;b<c;b++)this.lensFlares.push(a.lensFlares[b]);return this},add:function(a,b,c,d,e,f){void 0===b&&(b=-1);void 0===c&&(c=0);void 0===f&&(f=1);void 0===e&&(e=new G(16777215));void 0===d&&(d=1);c=Math.min(c,Math.max(0,c));this.lensFlares.push({texture:a,size:b,distance:c,x:0,y:0,z:0,scale:1,rotation:0,
	opacity:f,color:e,blending:d})},updateLensFlares:function(){var a,b=this.lensFlares.length,c,d=2*-this.positionScreen.x,e=2*-this.positionScreen.y;for(a=0;a<b;a++)c=this.lensFlares[a],c.x=this.positionScreen.x+d*c.distance,c.y=this.positionScreen.y+e*c.distance,c.wantedRotation=c.x*Math.PI*.25,c.rotation+=.25*(c.wantedRotation-c.rotation)}});cb.prototype=Object.create(Y.prototype);cb.prototype.constructor=cb;cb.prototype.isSpriteMaterial=!0;cb.prototype.copy=function(a){Y.prototype.copy.call(this,
	a);this.color.copy(a.color);this.map=a.map;this.rotation=a.rotation;return this};Ac.prototype=Object.assign(Object.create(B.prototype),{constructor:Ac,isSprite:!0,raycast:function(){var a=new p,b=new p,c=new p;return function(d,e){b.setFromMatrixPosition(this.matrixWorld);d.ray.closestPointToPoint(b,a);c.setFromMatrixScale(this.matrixWorld);var f=c.x*c.y/4;b.distanceToSquared(a)>f||(f=d.ray.origin.distanceTo(a),f<d.near||f>d.far||e.push({distance:f,point:a.clone(),face:null,object:this}))}}(),clone:function(){return(new this.constructor(this.material)).copy(this)}});
	Bc.prototype=Object.assign(Object.create(B.prototype),{constructor:Bc,copy:function(a){B.prototype.copy.call(this,a,!1);a=a.levels;for(var b=0,c=a.length;b<c;b++){var d=a[b];this.addLevel(d.object.clone(),d.distance)}return this},addLevel:function(a,b){void 0===b&&(b=0);b=Math.abs(b);for(var c=this.levels,d=0;d<c.length&&!(b<c[d].distance);d++);c.splice(d,0,{distance:b,object:a});this.add(a)},getObjectForDistance:function(a){for(var b=this.levels,c=1,d=b.length;c<d&&!(a<b[c].distance);c++);return b[c-
	1].object},raycast:function(){var a=new p;return function(b,c){a.setFromMatrixPosition(this.matrixWorld);var d=b.ray.origin.distanceTo(a);this.getObjectForDistance(d).raycast(b,c)}}(),update:function(){var a=new p,b=new p;return function(c){var d=this.levels;if(1<d.length){a.setFromMatrixPosition(c.matrixWorld);b.setFromMatrixPosition(this.matrixWorld);c=a.distanceTo(b);d[0].object.visible=!0;for(var e=1,f=d.length;e<f;e++)if(c>=d[e].distance)d[e-1].object.visible=!1,d[e].object.visible=!0;else break;
	for(;e<f;e++)d[e].object.visible=!1}}}(),toJSON:function(a){a=B.prototype.toJSON.call(this,a);a.object.levels=[];for(var b=this.levels,c=0,d=b.length;c<d;c++){var e=b[c];a.object.levels.push({object:e.object.uuid,distance:e.distance})}return a}});Object.assign(Cc.prototype,{calculateInverses:function(){this.boneInverses=[];for(var a=0,b=this.bones.length;a<b;a++){var c=new J;this.bones[a]&&c.getInverse(this.bones[a].matrixWorld);this.boneInverses.push(c)}},pose:function(){var a,b,c;b=0;for(c=this.bones.length;b<
	c;b++)(a=this.bones[b])&&a.matrixWorld.getInverse(this.boneInverses[b]);b=0;for(c=this.bones.length;b<c;b++)if(a=this.bones[b])a.parent&&a.parent.isBone?(a.matrix.getInverse(a.parent.matrixWorld),a.matrix.multiply(a.matrixWorld)):a.matrix.copy(a.matrixWorld),a.matrix.decompose(a.position,a.quaternion,a.scale)},update:function(){var a=new J,b=new J;return function(){for(var c=this.bones,d=this.boneInverses,e=this.boneMatrices,f=this.boneTexture,g=0,h=c.length;g<h;g++)a.multiplyMatrices(c[g]?c[g].matrixWorld:
	b,d[g]),a.toArray(e,16*g);void 0!==f&&(f.needsUpdate=!0)}}(),clone:function(){return new Cc(this.bones,this.boneInverses)}});nd.prototype=Object.assign(Object.create(B.prototype),{constructor:nd,isBone:!0});od.prototype=Object.assign(Object.create(Ba.prototype),{constructor:od,isSkinnedMesh:!0,initBones:function(){var a=[],b,c,d,e;if(this.geometry&&void 0!==this.geometry.bones){d=0;for(e=this.geometry.bones.length;d<e;d++)c=this.geometry.bones[d],b=new nd,a.push(b),b.name=c.name,b.position.fromArray(c.pos),
	b.quaternion.fromArray(c.rotq),void 0!==c.scl&&b.scale.fromArray(c.scl);d=0;for(e=this.geometry.bones.length;d<e;d++)c=this.geometry.bones[d],-1!==c.parent&&null!==c.parent&&void 0!==a[c.parent]?a[c.parent].add(a[d]):this.add(a[d])}this.updateMatrixWorld(!0);return a},bind:function(a,b){this.skeleton=a;void 0===b&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),b=this.matrixWorld);this.bindMatrix.copy(b);this.bindMatrixInverse.getInverse(b)},pose:function(){this.skeleton.pose()},normalizeSkinWeights:function(){var a,
	b;if(this.geometry&&this.geometry.isGeometry)for(b=0;b<this.geometry.skinWeights.length;b++){var c=this.geometry.skinWeights[b];a=1/c.lengthManhattan();Infinity!==a?c.multiplyScalar(a):c.set(1,0,0,0)}else if(this.geometry&&this.geometry.isBufferGeometry){var c=new ha,d=this.geometry.attributes.skinWeight;for(b=0;b<d.count;b++)c.x=d.getX(b),c.y=d.getY(b),c.z=d.getZ(b),c.w=d.getW(b),a=1/c.lengthManhattan(),Infinity!==a?c.multiplyScalar(a):c.set(1,0,0,0),d.setXYZW(b,c.x,c.y,c.z,c.w)}},updateMatrixWorld:function(a){Ba.prototype.updateMatrixWorld.call(this,
	a);"attached"===this.bindMode?this.bindMatrixInverse.getInverse(this.matrixWorld):"detached"===this.bindMode?this.bindMatrixInverse.getInverse(this.bindMatrix):console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)},clone:function(){return(new this.constructor(this.geometry,this.material)).copy(this)}});ga.prototype=Object.create(Y.prototype);ga.prototype.constructor=ga;ga.prototype.isLineBasicMaterial=!0;ga.prototype.copy=function(a){Y.prototype.copy.call(this,a);this.color.copy(a.color);
	this.linewidth=a.linewidth;this.linecap=a.linecap;this.linejoin=a.linejoin;return this};xa.prototype=Object.assign(Object.create(B.prototype),{constructor:xa,isLine:!0,raycast:function(){var a=new J,b=new hb,c=new Ga;return function(d,e){var f=d.linePrecision,f=f*f,g=this.geometry,h=this.matrixWorld;null===g.boundingSphere&&g.computeBoundingSphere();c.copy(g.boundingSphere);c.applyMatrix4(h);if(!1!==d.ray.intersectsSphere(c)){a.getInverse(h);b.copy(d.ray).applyMatrix4(a);var k=new p,m=new p,h=new p,
	l=new p,q=this&&this.isLineSegments?2:1;if(g.isBufferGeometry){var n=g.index,t=g.attributes.position.array;if(null!==n)for(var n=n.array,g=0,z=n.length-1;g<z;g+=q){var r=n[g+1];k.fromArray(t,3*n[g]);m.fromArray(t,3*r);r=b.distanceSqToSegment(k,m,l,h);r>f||(l.applyMatrix4(this.matrixWorld),r=d.ray.origin.distanceTo(l),r<d.near||r>d.far||e.push({distance:r,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this}))}else for(g=0,z=t.length/3-1;g<z;g+=q)k.fromArray(t,
	3*g),m.fromArray(t,3*g+3),r=b.distanceSqToSegment(k,m,l,h),r>f||(l.applyMatrix4(this.matrixWorld),r=d.ray.origin.distanceTo(l),r<d.near||r>d.far||e.push({distance:r,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this}))}else if(g.isGeometry)for(k=g.vertices,m=k.length,g=0;g<m-1;g+=q)r=b.distanceSqToSegment(k[g],k[g+1],l,h),r>f||(l.applyMatrix4(this.matrixWorld),r=d.ray.origin.distanceTo(l),r<d.near||r>d.far||e.push({distance:r,point:h.clone().applyMatrix4(this.matrixWorld),
	index:g,face:null,faceIndex:null,object:this}))}}}(),clone:function(){return(new this.constructor(this.geometry,this.material)).copy(this)}});Z.prototype=Object.assign(Object.create(xa.prototype),{constructor:Z,isLineSegments:!0});pd.prototype=Object.assign(Object.create(xa.prototype),{constructor:pd,isLineLoop:!0});La.prototype=Object.create(Y.prototype);La.prototype.constructor=La;La.prototype.isPointsMaterial=!0;La.prototype.copy=function(a){Y.prototype.copy.call(this,a);this.color.copy(a.color);
	this.map=a.map;this.size=a.size;this.sizeAttenuation=a.sizeAttenuation;return this};Mb.prototype=Object.assign(Object.create(B.prototype),{constructor:Mb,isPoints:!0,raycast:function(){var a=new J,b=new hb,c=new Ga;return function(d,e){function f(a,c){var f=b.distanceSqToPoint(a);if(f<l){var h=b.closestPointToPoint(a);h.applyMatrix4(k);var m=d.ray.origin.distanceTo(h);m<d.near||m>d.far||e.push({distance:m,distanceToRay:Math.sqrt(f),point:h.clone(),index:c,face:null,object:g})}}var g=this,h=this.geometry,
	k=this.matrixWorld,m=d.params.Points.threshold;null===h.boundingSphere&&h.computeBoundingSphere();c.copy(h.boundingSphere);c.applyMatrix4(k);c.radius+=m;if(!1!==d.ray.intersectsSphere(c)){a.getInverse(k);b.copy(d.ray).applyMatrix4(a);var m=m/((this.scale.x+this.scale.y+this.scale.z)/3),l=m*m,m=new p;if(h.isBufferGeometry){var q=h.index,h=h.attributes.position.array;if(null!==q)for(var n=q.array,q=0,t=n.length;q<t;q++){var z=n[q];m.fromArray(h,3*z);f(m,z)}else for(q=0,n=h.length/3;q<n;q++)m.fromArray(h,
	3*q),f(m,q)}else for(m=h.vertices,q=0,n=m.length;q<n;q++)f(m[q],q)}}}(),clone:function(){return(new this.constructor(this.geometry,this.material)).copy(this)}});Dc.prototype=Object.assign(Object.create(B.prototype),{constructor:Dc});qd.prototype=Object.create(da.prototype);qd.prototype.constructor=qd;Nb.prototype=Object.create(da.prototype);Nb.prototype.constructor=Nb;Nb.prototype.isCompressedTexture=!0;rd.prototype=Object.create(da.prototype);rd.prototype.constructor=rd;Ec.prototype=Object.create(da.prototype);
	Ec.prototype.constructor=Ec;Ec.prototype.isDepthTexture=!0;Ob.prototype=Object.create(I.prototype);Ob.prototype.constructor=Ob;Fc.prototype=Object.create(M.prototype);Fc.prototype.constructor=Fc;Pb.prototype=Object.create(I.prototype);Pb.prototype.constructor=Pb;Gc.prototype=Object.create(M.prototype);Gc.prototype.constructor=Gc;ia.prototype=Object.create(I.prototype);ia.prototype.constructor=ia;Hc.prototype=Object.create(M.prototype);Hc.prototype.constructor=Hc;Qb.prototype=Object.create(ia.prototype);
	Qb.prototype.constructor=Qb;Ic.prototype=Object.create(M.prototype);Ic.prototype.constructor=Ic;mb.prototype=Object.create(ia.prototype);mb.prototype.constructor=mb;Jc.prototype=Object.create(M.prototype);Jc.prototype.constructor=Jc;Rb.prototype=Object.create(ia.prototype);Rb.prototype.constructor=Rb;Kc.prototype=Object.create(M.prototype);Kc.prototype.constructor=Kc;Sb.prototype=Object.create(ia.prototype);Sb.prototype.constructor=Sb;Lc.prototype=Object.create(M.prototype);Lc.prototype.constructor=
	Lc;Tb.prototype=Object.create(I.prototype);Tb.prototype.constructor=Tb;Mc.prototype=Object.create(M.prototype);Mc.prototype.constructor=Mc;Ub.prototype=Object.create(I.prototype);Ub.prototype.constructor=Ub;Nc.prototype=Object.create(M.prototype);Nc.prototype.constructor=Nc;Vb.prototype=Object.create(I.prototype);Vb.prototype.constructor=Vb;var ya={area:function(a){for(var b=a.length,c=0,d=b-1,e=0;e<b;d=e++)c+=a[d].x*a[e].y-a[e].x*a[d].y;return.5*c},triangulate:function(){return function(a,b){var c=
	a.length;if(3>c)return null;var d=[],e=[],f=[],g,h,k;if(0<ya.area(a))for(h=0;h<c;h++)e[h]=h;else for(h=0;h<c;h++)e[h]=c-1-h;var m=2*c;for(h=c-1;2<c;){if(0>=m--){console.warn("THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()");break}g=h;c<=g&&(g=0);h=g+1;c<=h&&(h=0);k=h+1;c<=k&&(k=0);var l;a:{var q,n,t,p,r,y,x,v;q=a[e[g]].x;n=a[e[g]].y;t=a[e[h]].x;p=a[e[h]].y;r=a[e[k]].x;y=a[e[k]].y;if(0>=(t-q)*(y-n)-(p-n)*(r-q))l=!1;else{var H,w,C,E,D,F,B,N,I,G;H=r-t;w=y-p;C=q-r;E=n-y;D=t-q;F=p-n;
	for(l=0;l<c;l++)if(x=a[e[l]].x,v=a[e[l]].y,!(x===q&&v===n||x===t&&v===p||x===r&&v===y)&&(B=x-q,N=v-n,I=x-t,G=v-p,x-=r,v-=y,I=H*G-w*I,B=D*N-F*B,N=C*v-E*x,I>=-Number.EPSILON&&N>=-Number.EPSILON&&B>=-Number.EPSILON)){l=!1;break a}l=!0}}if(l){d.push([a[e[g]],a[e[h]],a[e[k]]]);f.push([e[g],e[h],e[k]]);g=h;for(k=h+1;k<c;g++,k++)e[g]=e[k];c--;m=2*c}}return b?f:d}}(),triangulateShape:function(a,b){function c(a){var b=a.length;2<b&&a[b-1].equals(a[0])&&a.pop()}function d(a,b,c){return a.x!==b.x?a.x<b.x?a.x<=
	c.x&&c.x<=b.x:b.x<=c.x&&c.x<=a.x:a.y<b.y?a.y<=c.y&&c.y<=b.y:b.y<=c.y&&c.y<=a.y}function e(a,b,c,e,f){var g=b.x-a.x,h=b.y-a.y,k=e.x-c.x,m=e.y-c.y,l=a.x-c.x,n=a.y-c.y,q=h*k-g*m,u=h*l-g*n;if(Math.abs(q)>Number.EPSILON){if(0<q){if(0>u||u>q)return[];k=m*l-k*n;if(0>k||k>q)return[]}else{if(0<u||u<q)return[];k=m*l-k*n;if(0<k||k<q)return[]}if(0===k)return!f||0!==u&&u!==q?[a]:[];if(k===q)return!f||0!==u&&u!==q?[b]:[];if(0===u)return[c];if(u===q)return[e];f=k/q;return[{x:a.x+f*g,y:a.y+f*h}]}if(0!==u||m*l!==
	k*n)return[];h=0===g&&0===h;k=0===k&&0===m;if(h&&k)return a.x!==c.x||a.y!==c.y?[]:[a];if(h)return d(c,e,a)?[a]:[];if(k)return d(a,b,c)?[c]:[];0!==g?(a.x<b.x?(g=a,k=a.x,h=b,a=b.x):(g=b,k=b.x,h=a,a=a.x),c.x<e.x?(b=c,q=c.x,m=e,c=e.x):(b=e,q=e.x,m=c,c=c.x)):(a.y<b.y?(g=a,k=a.y,h=b,a=b.y):(g=b,k=b.y,h=a,a=a.y),c.y<e.y?(b=c,q=c.y,m=e,c=e.y):(b=e,q=e.y,m=c,c=c.y));return k<=q?a<q?[]:a===q?f?[]:[b]:a<=c?[b,h]:[b,m]:k>c?[]:k===c?f?[]:[g]:a<=c?[g,h]:[g,m]}function f(a,b,c,d){var e=b.x-a.x,f=b.y-a.y;b=c.x-a.x;
	c=c.y-a.y;var g=d.x-a.x;d=d.y-a.y;a=e*c-f*b;e=e*d-f*g;return Math.abs(a)>Number.EPSILON?(b=g*c-d*b,0<a?0<=e&&0<=b:0<=e||0<=b):0<e}c(a);b.forEach(c);var g,h,k,m,l,q={};k=a.concat();g=0;for(h=b.length;g<h;g++)Array.prototype.push.apply(k,b[g]);g=0;for(h=k.length;g<h;g++)l=k[g].x+":"+k[g].y,void 0!==q[l]&&console.warn("THREE.ShapeUtils: Duplicate point",l,g),q[l]=g;g=function(a,b){function c(a,b){var d=h.length-1,e=a-1;0>e&&(e=d);var g=a+1;g>d&&(g=0);d=f(h[a],h[e],h[g],k[b]);if(!d)return!1;d=k.length-
	1;e=b-1;0>e&&(e=d);g=b+1;g>d&&(g=0);return(d=f(k[b],k[e],k[g],h[a]))?!0:!1}function d(a,b){var c,f;for(c=0;c<h.length;c++)if(f=c+1,f%=h.length,f=e(a,b,h[c],h[f],!0),0<f.length)return!0;return!1}function g(a,c){var d,f,h,k;for(d=0;d<m.length;d++)for(f=b[m[d]],h=0;h<f.length;h++)if(k=h+1,k%=f.length,k=e(a,c,f[h],f[k],!0),0<k.length)return!0;return!1}var h=a.concat(),k,m=[],l,n,q,u,p,C=[],E,B,I,G=0;for(l=b.length;G<l;G++)m.push(G);E=0;for(var J=2*m.length;0<m.length;){J--;if(0>J){console.log("Infinite Loop! Holes left:"+
	m.length+", Probably Hole outside Shape!");break}for(n=E;n<h.length;n++){q=h[n];l=-1;for(G=0;G<m.length;G++)if(u=m[G],p=q.x+":"+q.y+":"+u,void 0===C[p]){k=b[u];for(B=0;B<k.length;B++)if(u=k[B],c(n,B)&&!d(q,u)&&!g(q,u)){l=B;m.splice(G,1);E=h.slice(0,n+1);u=h.slice(n);B=k.slice(l);I=k.slice(0,l+1);h=E.concat(B).concat(I).concat(u);E=n;break}if(0<=l)break;C[p]=!0}if(0<=l)break}}return h}(a,b);var n=ya.triangulate(g,!1);g=0;for(h=n.length;g<h;g++)for(m=n[g],k=0;3>k;k++)l=m[k].x+":"+m[k].y,l=q[l],void 0!==
	l&&(m[k]=l);return n.concat()},isClockWise:function(a){return 0>ya.area(a)}};db.prototype=Object.create(M.prototype);db.prototype.constructor=db;Fa.prototype=Object.create(I.prototype);Fa.prototype.constructor=Fa;Fa.prototype.getArrays=function(){var a=this.getAttribute("position"),a=a?Array.prototype.slice.call(a.array):[],b=this.getAttribute("uv"),b=b?Array.prototype.slice.call(b.array):[],c=this.index,c=c?Array.prototype.slice.call(c.array):[];return{position:a,uv:b,index:c}};Fa.prototype.addShapeList=
	function(a,b){var c=a.length;b.arrays=this.getArrays();for(var d=0;d<c;d++)this.addShape(a[d],b);this.setIndex(b.arrays.index);this.addAttribute("position",new C(b.arrays.position,3));this.addAttribute("uv",new C(b.arrays.uv,2))};Fa.prototype.addShape=function(a,b){function c(a,b,c){b||console.error("THREE.ExtrudeGeometry: vec does not exist");return b.clone().multiplyScalar(c).add(a)}function d(a,b,c){var d,e,f;e=a.x-b.x;f=a.y-b.y;d=c.x-a.x;var g=c.y-a.y,h=e*e+f*f;if(Math.abs(e*g-f*d)>Number.EPSILON){var k=
	Math.sqrt(h),m=Math.sqrt(d*d+g*g),h=b.x-f/k;b=b.y+e/k;g=((c.x-g/m-h)*g-(c.y+d/m-b)*d)/(e*g-f*d);d=h+e*g-a.x;e=b+f*g-a.y;f=d*d+e*e;if(2>=f)return new E(d,e);f=Math.sqrt(f/2)}else a=!1,e>Number.EPSILON?d>Number.EPSILON&&(a=!0):e<-Number.EPSILON?d<-Number.EPSILON&&(a=!0):Math.sign(f)===Math.sign(g)&&(a=!0),a?(d=-f,f=Math.sqrt(h)):(d=e,e=f,f=Math.sqrt(h/2));return new E(d/f,e/f)}function e(a,b){var c,d;for(P=a.length;0<=--P;){c=P;d=P-1;0>d&&(d=a.length-1);var e,f=H+2*y;for(e=0;e<f;e++){var g=da*e,m=da*
	(e+1),n=b+d+g,q=b+d+m,m=b+c+m;h(b+c+g);h(n);h(m);h(n);h(q);h(m);g=l.length/3;g=D.generateSideWallUV(Y,l,g-6,g-3,g-2,g-1);k(g[0]);k(g[1]);k(g[3]);k(g[1]);k(g[2]);k(g[3])}}}function f(a,b,c){t.push(a);t.push(b);t.push(c)}function g(a,b,c){h(a);h(b);h(c);a=l.length/3;a=D.generateTopUV(Y,l,a-3,a-2,a-1);k(a[0]);k(a[1]);k(a[2])}function h(a){q.push(l.length/3);l.push(t[3*a+0]);l.push(t[3*a+1]);l.push(t[3*a+2])}function k(a){n.push(a.x);n.push(a.y)}var m=b.arrays?b.arrays:this.getArrays(),l=m.position,q=
	m.index,n=m.uv,t=[],m=void 0!==b.amount?b.amount:100,z=void 0!==b.bevelThickness?b.bevelThickness:6,r=void 0!==b.bevelSize?b.bevelSize:z-2,y=void 0!==b.bevelSegments?b.bevelSegments:3,x=void 0!==b.bevelEnabled?b.bevelEnabled:!0,v=void 0!==b.curveSegments?b.curveSegments:12,H=void 0!==b.steps?b.steps:1,w=b.extrudePath,B,I=!1,D=void 0!==b.UVGenerator?b.UVGenerator:db.WorldUVGenerator,F,G,N,J;w&&(B=w.getSpacedPoints(H),I=!0,x=!1,F=void 0!==b.frames?b.frames:w.computeFrenetFrames(H,!1),G=new p,N=new p,
	J=new p);x||(r=z=y=0);var M,L,U,Y=this,w=a.extractPoints(v),v=w.shape,Q=w.holes;if(!ya.isClockWise(v))for(v=v.reverse(),L=0,U=Q.length;L<U;L++)M=Q[L],ya.isClockWise(M)&&(Q[L]=M.reverse());var K=ya.triangulateShape(v,Q),V=v;L=0;for(U=Q.length;L<U;L++)M=Q[L],v=v.concat(M);var ba,R,O,X,T,da=v.length,Z,ha=K.length,w=[],P=0;O=V.length;ba=O-1;for(R=P+1;P<O;P++,ba++,R++)ba===O&&(ba=0),R===O&&(R=0),w[P]=d(V[P],V[ba],V[R]);var ia=[],ga,ja=w.concat();L=0;for(U=Q.length;L<U;L++){M=Q[L];ga=[];P=0;O=M.length;
	ba=O-1;for(R=P+1;P<O;P++,ba++,R++)ba===O&&(ba=0),R===O&&(R=0),ga[P]=d(M[P],M[ba],M[R]);ia.push(ga);ja=ja.concat(ga)}for(ba=0;ba<y;ba++){O=ba/y;X=z*Math.cos(O*Math.PI/2);R=r*Math.sin(O*Math.PI/2);P=0;for(O=V.length;P<O;P++)T=c(V[P],w[P],R),f(T.x,T.y,-X);L=0;for(U=Q.length;L<U;L++)for(M=Q[L],ga=ia[L],P=0,O=M.length;P<O;P++)T=c(M[P],ga[P],R),f(T.x,T.y,-X)}R=r;for(P=0;P<da;P++)T=x?c(v[P],ja[P],R):v[P],I?(N.copy(F.normals[0]).multiplyScalar(T.x),G.copy(F.binormals[0]).multiplyScalar(T.y),J.copy(B[0]).add(N).add(G),
	f(J.x,J.y,J.z)):f(T.x,T.y,0);for(O=1;O<=H;O++)for(P=0;P<da;P++)T=x?c(v[P],ja[P],R):v[P],I?(N.copy(F.normals[O]).multiplyScalar(T.x),G.copy(F.binormals[O]).multiplyScalar(T.y),J.copy(B[O]).add(N).add(G),f(J.x,J.y,J.z)):f(T.x,T.y,m/H*O);for(ba=y-1;0<=ba;ba--){O=ba/y;X=z*Math.cos(O*Math.PI/2);R=r*Math.sin(O*Math.PI/2);P=0;for(O=V.length;P<O;P++)T=c(V[P],w[P],R),f(T.x,T.y,m+X);L=0;for(U=Q.length;L<U;L++)for(M=Q[L],ga=ia[L],P=0,O=M.length;P<O;P++)T=c(M[P],ga[P],R),I?f(T.x,T.y+B[H-1].y,B[H-1].x+X):f(T.x,
	T.y,m+X)}(function(){var a=l.length/3;if(x){var c=0*da;for(P=0;P<ha;P++)Z=K[P],g(Z[2]+c,Z[1]+c,Z[0]+c);c=da*(H+2*y);for(P=0;P<ha;P++)Z=K[P],g(Z[0]+c,Z[1]+c,Z[2]+c)}else{for(P=0;P<ha;P++)Z=K[P],g(Z[2],Z[1],Z[0]);for(P=0;P<ha;P++)Z=K[P],g(Z[0]+da*H,Z[1]+da*H,Z[2]+da*H)}Y.addGroup(a,l.length/3-a,void 0!==b.material?b.material:0)})();(function(){var a=l.length/3,c=0;e(V,c);c+=V.length;L=0;for(U=Q.length;L<U;L++)M=Q[L],e(M,c),c+=M.length;Y.addGroup(a,l.length/3-a,void 0!==b.extrudeMaterial?b.extrudeMaterial:
	1)})();b.arrays||(this.setIndex(q),this.addAttribute("position",new C(l,3)),this.addAttribute("uv",new C(b.arrays.uv,2)))};db.WorldUVGenerator={generateTopUV:function(a,b,c,d,e){a=b[3*d];d=b[3*d+1];var f=b[3*e];e=b[3*e+1];return[new E(b[3*c],b[3*c+1]),new E(a,d),new E(f,e)]},generateSideWallUV:function(a,b,c,d,e,f){a=b[3*c];var g=b[3*c+1];c=b[3*c+2];var h=b[3*d],k=b[3*d+1];d=b[3*d+2];var m=b[3*e],l=b[3*e+1];e=b[3*e+2];var q=b[3*f],n=b[3*f+1];b=b[3*f+2];return.01>Math.abs(g-k)?[new E(a,1-c),new E(h,
	1-d),new E(m,1-e),new E(q,1-b)]:[new E(g,1-c),new E(k,1-d),new E(l,1-e),new E(n,1-b)]}};Oc.prototype=Object.create(M.prototype);Oc.prototype.constructor=Oc;Wb.prototype=Object.create(Fa.prototype);Wb.prototype.constructor=Wb;Pc.prototype=Object.create(M.prototype);Pc.prototype.constructor=Pc;nb.prototype=Object.create(I.prototype);nb.prototype.constructor=nb;Qc.prototype=Object.create(M.prototype);Qc.prototype.constructor=Qc;Xb.prototype=Object.create(I.prototype);Xb.prototype.constructor=Xb;Rc.prototype=
	Object.create(M.prototype);Rc.prototype.constructor=Rc;Yb.prototype=Object.create(I.prototype);Yb.prototype.constructor=Yb;Zb.prototype=Object.create(M.prototype);Zb.prototype.constructor=Zb;$b.prototype=Object.create(I.prototype);$b.prototype.constructor=$b;ac.prototype=Object.create(I.prototype);ac.prototype.constructor=ac;ob.prototype=Object.create(M.prototype);ob.prototype.constructor=ob;Wa.prototype=Object.create(I.prototype);Wa.prototype.constructor=Wa;Sc.prototype=Object.create(ob.prototype);
	Sc.prototype.constructor=Sc;Tc.prototype=Object.create(Wa.prototype);Tc.prototype.constructor=Tc;Uc.prototype=Object.create(M.prototype);Uc.prototype.constructor=Uc;bc.prototype=Object.create(I.prototype);bc.prototype.constructor=bc;var Ma=Object.freeze({WireframeGeometry:Ob,ParametricGeometry:Fc,ParametricBufferGeometry:Pb,TetrahedronGeometry:Hc,TetrahedronBufferGeometry:Qb,OctahedronGeometry:Ic,OctahedronBufferGeometry:mb,IcosahedronGeometry:Jc,IcosahedronBufferGeometry:Rb,DodecahedronGeometry:Kc,
	DodecahedronBufferGeometry:Sb,PolyhedronGeometry:Gc,PolyhedronBufferGeometry:ia,TubeGeometry:Lc,TubeBufferGeometry:Tb,TorusKnotGeometry:Mc,TorusKnotBufferGeometry:Ub,TorusGeometry:Nc,TorusBufferGeometry:Vb,TextGeometry:Oc,TextBufferGeometry:Wb,SphereGeometry:Pc,SphereBufferGeometry:nb,RingGeometry:Qc,RingBufferGeometry:Xb,PlaneGeometry:xc,PlaneBufferGeometry:lb,LatheGeometry:Rc,LatheBufferGeometry:Yb,ShapeGeometry:Zb,ShapeBufferGeometry:$b,ExtrudeGeometry:db,ExtrudeBufferGeometry:Fa,EdgesGeometry:ac,
	ConeGeometry:Sc,ConeBufferGeometry:Tc,CylinderGeometry:ob,CylinderBufferGeometry:Wa,CircleGeometry:Uc,CircleBufferGeometry:bc,BoxGeometry:Ib,BoxBufferGeometry:kb});cc.prototype=Object.create(Da.prototype);cc.prototype.constructor=cc;cc.prototype.isShadowMaterial=!0;dc.prototype=Object.create(Da.prototype);dc.prototype.constructor=dc;dc.prototype.isRawShaderMaterial=!0;Ra.prototype=Object.create(Y.prototype);Ra.prototype.constructor=Ra;Ra.prototype.isMeshStandardMaterial=!0;Ra.prototype.copy=function(a){Y.prototype.copy.call(this,
	a);this.defines={STANDARD:""};this.color.copy(a.color);this.roughness=a.roughness;this.metalness=a.metalness;this.map=a.map;this.lightMap=a.lightMap;this.lightMapIntensity=a.lightMapIntensity;this.aoMap=a.aoMap;this.aoMapIntensity=a.aoMapIntensity;this.emissive.copy(a.emissive);this.emissiveMap=a.emissiveMap;this.emissiveIntensity=a.emissiveIntensity;this.bumpMap=a.bumpMap;this.bumpScale=a.bumpScale;this.normalMap=a.normalMap;this.normalScale.copy(a.normalScale);this.displacementMap=a.displacementMap;
	this.displacementScale=a.displacementScale;this.displacementBias=a.displacementBias;this.roughnessMap=a.roughnessMap;this.metalnessMap=a.metalnessMap;this.alphaMap=a.alphaMap;this.envMap=a.envMap;this.envMapIntensity=a.envMapIntensity;this.refractionRatio=a.refractionRatio;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.wireframeLinecap=a.wireframeLinecap;this.wireframeLinejoin=a.wireframeLinejoin;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.morphNormals=
	a.morphNormals;return this};pb.prototype=Object.create(Ra.prototype);pb.prototype.constructor=pb;pb.prototype.isMeshPhysicalMaterial=!0;pb.prototype.copy=function(a){Ra.prototype.copy.call(this,a);this.defines={PHYSICAL:""};this.reflectivity=a.reflectivity;this.clearCoat=a.clearCoat;this.clearCoatRoughness=a.clearCoatRoughness;return this};sa.prototype=Object.create(Y.prototype);sa.prototype.constructor=sa;sa.prototype.isMeshPhongMaterial=!0;sa.prototype.copy=function(a){Y.prototype.copy.call(this,
	a);this.color.copy(a.color);this.specular.copy(a.specular);this.shininess=a.shininess;this.map=a.map;this.lightMap=a.lightMap;this.lightMapIntensity=a.lightMapIntensity;this.aoMap=a.aoMap;this.aoMapIntensity=a.aoMapIntensity;this.emissive.copy(a.emissive);this.emissiveMap=a.emissiveMap;this.emissiveIntensity=a.emissiveIntensity;this.bumpMap=a.bumpMap;this.bumpScale=a.bumpScale;this.normalMap=a.normalMap;this.normalScale.copy(a.normalScale);this.displacementMap=a.displacementMap;this.displacementScale=
	a.displacementScale;this.displacementBias=a.displacementBias;this.specularMap=a.specularMap;this.alphaMap=a.alphaMap;this.envMap=a.envMap;this.combine=a.combine;this.reflectivity=a.reflectivity;this.refractionRatio=a.refractionRatio;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.wireframeLinecap=a.wireframeLinecap;this.wireframeLinejoin=a.wireframeLinejoin;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.morphNormals=a.morphNormals;return this};qb.prototype=
	Object.create(sa.prototype);qb.prototype.constructor=qb;qb.prototype.isMeshToonMaterial=!0;qb.prototype.copy=function(a){sa.prototype.copy.call(this,a);this.gradientMap=a.gradientMap;return this};rb.prototype=Object.create(Y.prototype);rb.prototype.constructor=rb;rb.prototype.isMeshNormalMaterial=!0;rb.prototype.copy=function(a){Y.prototype.copy.call(this,a);this.bumpMap=a.bumpMap;this.bumpScale=a.bumpScale;this.normalMap=a.normalMap;this.normalScale.copy(a.normalScale);this.displacementMap=a.displacementMap;
	this.displacementScale=a.displacementScale;this.displacementBias=a.displacementBias;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.morphNormals=a.morphNormals;return this};sb.prototype=Object.create(Y.prototype);sb.prototype.constructor=sb;sb.prototype.isMeshLambertMaterial=!0;sb.prototype.copy=function(a){Y.prototype.copy.call(this,a);this.color.copy(a.color);this.map=a.map;this.lightMap=a.lightMap;this.lightMapIntensity=
	a.lightMapIntensity;this.aoMap=a.aoMap;this.aoMapIntensity=a.aoMapIntensity;this.emissive.copy(a.emissive);this.emissiveMap=a.emissiveMap;this.emissiveIntensity=a.emissiveIntensity;this.specularMap=a.specularMap;this.alphaMap=a.alphaMap;this.envMap=a.envMap;this.combine=a.combine;this.reflectivity=a.reflectivity;this.refractionRatio=a.refractionRatio;this.wireframe=a.wireframe;this.wireframeLinewidth=a.wireframeLinewidth;this.wireframeLinecap=a.wireframeLinecap;this.wireframeLinejoin=a.wireframeLinejoin;
	this.skinning=a.skinning;this.morphTargets=a.morphTargets;this.morphNormals=a.morphNormals;return this};tb.prototype=Object.create(Y.prototype);tb.prototype.constructor=tb;tb.prototype.isLineDashedMaterial=!0;tb.prototype.copy=function(a){Y.prototype.copy.call(this,a);this.color.copy(a.color);this.linewidth=a.linewidth;this.scale=a.scale;this.dashSize=a.dashSize;this.gapSize=a.gapSize;return this};var mg=Object.freeze({ShadowMaterial:cc,SpriteMaterial:cb,RawShaderMaterial:dc,ShaderMaterial:Da,PointsMaterial:La,
	MeshPhysicalMaterial:pb,MeshStandardMaterial:Ra,MeshPhongMaterial:sa,MeshToonMaterial:qb,MeshNormalMaterial:rb,MeshLambertMaterial:sb,MeshDepthMaterial:$a,MeshBasicMaterial:Na,LineDashedMaterial:tb,LineBasicMaterial:ga,Material:Y}),hd={enabled:!1,files:{},add:function(a,b){!1!==this.enabled&&(this.files[a]=b)},get:function(a){if(!1!==this.enabled)return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}},za=new Zd;Object.assign(ta.prototype,{load:function(a,b,
	c,d){void 0===a&&(a="");void 0!==this.path&&(a=this.path+a);var e=this,f=hd.get(a);if(void 0!==f)return e.manager.itemStart(a),setTimeout(function(){b&&b(f);e.manager.itemEnd(a)},0),f;var g=a.match(/^data:(.*?)(;base64)?,(.*)$/);if(g){var h=g[1],k=!!g[2],g=g[3],g=window.decodeURIComponent(g);k&&(g=window.atob(g));try{var m,l=(this.responseType||"").toLowerCase();switch(l){case "arraybuffer":case "blob":m=new ArrayBuffer(g.length);for(var q=new Uint8Array(m),k=0;k<g.length;k++)q[k]=g.charCodeAt(k);
	"blob"===l&&(m=new Blob([m],{type:h}));break;case "document":m=(new DOMParser).parseFromString(g,h);break;case "json":m=JSON.parse(g);break;default:m=g}window.setTimeout(function(){b&&b(m);e.manager.itemEnd(a)},0)}catch(p){window.setTimeout(function(){d&&d(p);e.manager.itemEnd(a);e.manager.itemError(a)},0)}}else{var n=new XMLHttpRequest;n.open("GET",a,!0);n.addEventListener("load",function(c){var f=c.target.response;hd.add(a,f);200===this.status?(b&&b(f),e.manager.itemEnd(a)):0===this.status?(console.warn("THREE.FileLoader: HTTP Status 0 received."),
	b&&b(f),e.manager.itemEnd(a)):(d&&d(c),e.manager.itemEnd(a),e.manager.itemError(a))},!1);void 0!==c&&n.addEventListener("progress",function(a){c(a)},!1);n.addEventListener("error",function(b){d&&d(b);e.manager.itemEnd(a);e.manager.itemError(a)},!1);void 0!==this.responseType&&(n.responseType=this.responseType);void 0!==this.withCredentials&&(n.withCredentials=this.withCredentials);n.overrideMimeType&&n.overrideMimeType(void 0!==this.mimeType?this.mimeType:"text/plain");for(h in this.requestHeader)n.setRequestHeader(h,
	this.requestHeader[h]);n.send(null)}e.manager.itemStart(a);return n},setPath:function(a){this.path=a;return this},setResponseType:function(a){this.responseType=a;return this},setWithCredentials:function(a){this.withCredentials=a;return this},setMimeType:function(a){this.mimeType=a;return this},setRequestHeader:function(a){this.requestHeader=a;return this}});Object.assign(Qe.prototype,{load:function(a,b,c,d){function e(e){k.load(a[e],function(a){a=f._parser(a,!0);g[e]={width:a.width,height:a.height,
	format:a.format,mipmaps:a.mipmaps};m+=1;6===m&&(1===a.mipmapCount&&(h.minFilter=1006),h.format=a.format,h.needsUpdate=!0,b&&b(h))},c,d)}var f=this,g=[],h=new Nb;h.image=g;var k=new ta(this.manager);k.setPath(this.path);k.setResponseType("arraybuffer");if(Array.isArray(a))for(var m=0,l=0,q=a.length;l<q;++l)e(l);else k.load(a,function(a){a=f._parser(a,!0);if(a.isCubemap)for(var c=a.mipmaps.length/a.mipmapCount,d=0;d<c;d++){g[d]={mipmaps:[]};for(var e=0;e<a.mipmapCount;e++)g[d].mipmaps.push(a.mipmaps[d*
	a.mipmapCount+e]),g[d].format=a.format,g[d].width=a.width,g[d].height=a.height}else h.image.width=a.width,h.image.height=a.height,h.mipmaps=a.mipmaps;1===a.mipmapCount&&(h.minFilter=1006);h.format=a.format;h.needsUpdate=!0;b&&b(h)},c,d);return h},setPath:function(a){this.path=a;return this}});Object.assign($d.prototype,{load:function(a,b,c,d){var e=this,f=new eb,g=new ta(this.manager);g.setResponseType("arraybuffer");g.load(a,function(a){if(a=e._parser(a))void 0!==a.image?f.image=a.image:void 0!==
	a.data&&(f.image.width=a.width,f.image.height=a.height,f.image.data=a.data),f.wrapS=void 0!==a.wrapS?a.wrapS:1001,f.wrapT=void 0!==a.wrapT?a.wrapT:1001,f.magFilter=void 0!==a.magFilter?a.magFilter:1006,f.minFilter=void 0!==a.minFilter?a.minFilter:1008,f.anisotropy=void 0!==a.anisotropy?a.anisotropy:1,void 0!==a.format&&(f.format=a.format),void 0!==a.type&&(f.type=a.type),void 0!==a.mipmaps&&(f.mipmaps=a.mipmaps),1===a.mipmapCount&&(f.minFilter=1006),f.needsUpdate=!0,b&&b(f,a)},c,d);return f}});Object.assign(Vc.prototype,
	{load:function(a,b,c,d){void 0===a&&(a="");void 0!==this.path&&(a=this.path+a);var e=this,f=hd.get(a);if(void 0!==f)return e.manager.itemStart(a),setTimeout(function(){b&&b(f);e.manager.itemEnd(a)},0),f;c=document.createElementNS("http://www.w3.org/1999/xhtml","img");c.addEventListener("load",function(){hd.add(a,this);b&&b(this);e.manager.itemEnd(a)},!1);c.addEventListener("error",function(b){d&&d(b);e.manager.itemEnd(a);e.manager.itemError(a)},!1);"data:"!==a.substr(0,5)&&void 0!==this.crossOrigin&&
	(c.crossOrigin=this.crossOrigin);e.manager.itemStart(a);c.src=a;return c},setCrossOrigin:function(a){this.crossOrigin=a;return this},setPath:function(a){this.path=a;return this}});Object.assign(ae.prototype,{load:function(a,b,c,d){function e(c){g.load(a[c],function(a){f.images[c]=a;h++;6===h&&(f.needsUpdate=!0,b&&b(f))},void 0,d)}var f=new Za,g=new Vc(this.manager);g.setCrossOrigin(this.crossOrigin);g.setPath(this.path);var h=0;for(c=0;c<a.length;++c)e(c);return f},setCrossOrigin:function(a){this.crossOrigin=
	a;return this},setPath:function(a){this.path=a;return this}});Object.assign(sd.prototype,{load:function(a,b,c,d){var e=new Vc(this.manager);e.setCrossOrigin(this.crossOrigin);e.setPath(this.path);var f=new da;f.image=e.load(a,function(){var c=0<a.search(/\.(jpg|jpeg)$/)||0===a.search(/^data\:image\/jpeg/);f.format=c?1022:1023;f.needsUpdate=!0;void 0!==b&&b(f)},c,d);return f},setCrossOrigin:function(a){this.crossOrigin=a;return this},setPath:function(a){this.path=a;return this}});ja.prototype=Object.assign(Object.create(B.prototype),
	{constructor:ja,isLight:!0,copy:function(a){B.prototype.copy.call(this,a);this.color.copy(a.color);this.intensity=a.intensity;return this},toJSON:function(a){a=B.prototype.toJSON.call(this,a);a.object.color=this.color.getHex();a.object.intensity=this.intensity;void 0!==this.groundColor&&(a.object.groundColor=this.groundColor.getHex());void 0!==this.distance&&(a.object.distance=this.distance);void 0!==this.angle&&(a.object.angle=this.angle);void 0!==this.decay&&(a.object.decay=this.decay);void 0!==
	this.penumbra&&(a.object.penumbra=this.penumbra);void 0!==this.shadow&&(a.object.shadow=this.shadow.toJSON());return a}});td.prototype=Object.assign(Object.create(ja.prototype),{constructor:td,isHemisphereLight:!0,copy:function(a){ja.prototype.copy.call(this,a);this.groundColor.copy(a.groundColor);return this}});Object.assign(ub.prototype,{copy:function(a){this.camera=a.camera.clone();this.bias=a.bias;this.radius=a.radius;this.mapSize.copy(a.mapSize);return this},clone:function(){return(new this.constructor).copy(this)},
	toJSON:function(){var a={};0!==this.bias&&(a.bias=this.bias);1!==this.radius&&(a.radius=this.radius);if(512!==this.mapSize.x||512!==this.mapSize.y)a.mapSize=this.mapSize.toArray();a.camera=this.camera.toJSON(!1).object;delete a.camera.matrix;return a}});ud.prototype=Object.assign(Object.create(ub.prototype),{constructor:ud,isSpotLightShadow:!0,update:function(a){var b=this.camera,c=2*X.RAD2DEG*a.angle,d=this.mapSize.width/this.mapSize.height;a=a.distance||b.far;if(c!==b.fov||d!==b.aspect||a!==b.far)b.fov=
	c,b.aspect=d,b.far=a,b.updateProjectionMatrix()}});vd.prototype=Object.assign(Object.create(ja.prototype),{constructor:vd,isSpotLight:!0,copy:function(a){ja.prototype.copy.call(this,a);this.distance=a.distance;this.angle=a.angle;this.penumbra=a.penumbra;this.decay=a.decay;this.target=a.target.clone();this.shadow=a.shadow.clone();return this}});wd.prototype=Object.assign(Object.create(ja.prototype),{constructor:wd,isPointLight:!0,copy:function(a){ja.prototype.copy.call(this,a);this.distance=a.distance;
	this.decay=a.decay;this.shadow=a.shadow.clone();return this}});xd.prototype=Object.assign(Object.create(ub.prototype),{constructor:xd});yd.prototype=Object.assign(Object.create(ja.prototype),{constructor:yd,isDirectionalLight:!0,copy:function(a){ja.prototype.copy.call(this,a);this.target=a.target.clone();this.shadow=a.shadow.clone();return this}});zd.prototype=Object.assign(Object.create(ja.prototype),{constructor:zd,isAmbientLight:!0});Ad.prototype=Object.assign(Object.create(ja.prototype),{constructor:Ad,
	isRectAreaLight:!0,copy:function(a){ja.prototype.copy.call(this,a);this.width=a.width;this.height=a.height;return this},toJSON:function(a){a=ja.prototype.toJSON.call(this,a);a.object.width=this.width;a.object.height=this.height;return a}});var ua={arraySlice:function(a,b,c){return ua.isTypedArray(a)?new a.constructor(a.subarray(b,void 0!==c?c:a.length)):a.slice(b,c)},convertArray:function(a,b,c){return!a||!c&&a.constructor===b?a:"number"===typeof b.BYTES_PER_ELEMENT?new b(a):Array.prototype.slice.call(a)},
	isTypedArray:function(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)},getKeyframeOrder:function(a){for(var b=a.length,c=Array(b),d=0;d!==b;++d)c[d]=d;c.sort(function(b,c){return a[b]-a[c]});return c},sortedArray:function(a,b,c){for(var d=a.length,e=new a.constructor(d),f=0,g=0;g!==d;++f)for(var h=c[f]*b,k=0;k!==b;++k)e[g++]=a[h+k];return e},flattenJSON:function(a,b,c,d){for(var e=1,f=a[0];void 0!==f&&void 0===f[d];)f=a[e++];if(void 0!==f){var g=f[d];if(void 0!==g)if(Array.isArray(g)){do g=
	f[d],void 0!==g&&(b.push(f.time),c.push.apply(c,g)),f=a[e++];while(void 0!==f)}else if(void 0!==g.toArray){do g=f[d],void 0!==g&&(b.push(f.time),g.toArray(c,c.length)),f=a[e++];while(void 0!==f)}else{do g=f[d],void 0!==g&&(b.push(f.time),c.push(g)),f=a[e++];while(void 0!==f)}}}};Object.assign(Ca.prototype,{evaluate:function(a){var b=this.parameterPositions,c=this._cachedIndex,d=b[c],e=b[c-1];a:{b:{c:{d:if(!(a<d)){for(var f=c+2;;){if(void 0===d){if(a<e)break d;this._cachedIndex=c=b.length;return this.afterEnd_(c-
	1,a,e)}if(c===f)break;e=d;d=b[++c];if(a<d)break b}d=b.length;break c}if(a>=e)break a;else{f=b[1];a<f&&(c=2,e=f);for(f=c-2;;){if(void 0===e)return this._cachedIndex=0,this.beforeStart_(0,a,d);if(c===f)break;d=e;e=b[--c-1];if(a>=e)break b}d=c;c=0}}for(;c<d;)e=c+d>>>1,a<b[e]?d=e:c=e+1;d=b[c];e=b[c-1];if(void 0===e)return this._cachedIndex=0,this.beforeStart_(0,a,d);if(void 0===d)return this._cachedIndex=c=b.length,this.afterEnd_(c-1,e,a)}this._cachedIndex=c;this.intervalChanged_(c,e,d)}return this.interpolate_(c,
	e,a,d)},settings:null,DefaultSettings_:{},getSettings_:function(){return this.settings||this.DefaultSettings_},copySampleValue_:function(a){var b=this.resultBuffer,c=this.sampleValues,d=this.valueSize;a*=d;for(var e=0;e!==d;++e)b[e]=c[a+e];return b},interpolate_:function(a,b,c,d){throw Error("call to abstract method");},intervalChanged_:function(a,b,c){}});Object.assign(Ca.prototype,{beforeStart_:Ca.prototype.copySampleValue_,afterEnd_:Ca.prototype.copySampleValue_});Bd.prototype=Object.assign(Object.create(Ca.prototype),
	{constructor:Bd,DefaultSettings_:{endingStart:2400,endingEnd:2400},intervalChanged_:function(a,b,c){var d=this.parameterPositions,e=a-2,f=a+1,g=d[e],h=d[f];if(void 0===g)switch(this.getSettings_().endingStart){case 2401:e=a;g=2*b-c;break;case 2402:e=d.length-2;g=b+d[e]-d[e+1];break;default:e=a,g=c}if(void 0===h)switch(this.getSettings_().endingEnd){case 2401:f=a;h=2*c-b;break;case 2402:f=1;h=c+d[1]-d[0];break;default:f=a-1,h=b}a=.5*(c-b);d=this.valueSize;this._weightPrev=a/(b-g);this._weightNext=
	a/(h-c);this._offsetPrev=e*d;this._offsetNext=f*d},interpolate_:function(a,b,c,d){var e=this.resultBuffer,f=this.sampleValues,g=this.valueSize;a*=g;var h=a-g,k=this._offsetPrev,m=this._offsetNext,l=this._weightPrev,q=this._weightNext,n=(c-b)/(d-b);c=n*n;d=c*n;b=-l*d+2*l*c-l*n;l=(1+l)*d+(-1.5-2*l)*c+(-.5+l)*n+1;n=(-1-q)*d+(1.5+q)*c+.5*n;q=q*d-q*c;for(c=0;c!==g;++c)e[c]=b*f[k+c]+l*f[h+c]+n*f[a+c]+q*f[m+c];return e}});Wc.prototype=Object.assign(Object.create(Ca.prototype),{constructor:Wc,interpolate_:function(a,
	b,c,d){var e=this.resultBuffer,f=this.sampleValues,g=this.valueSize;a*=g;var h=a-g;b=(c-b)/(d-b);c=1-b;for(d=0;d!==g;++d)e[d]=f[h+d]*c+f[a+d]*b;return e}});Cd.prototype=Object.assign(Object.create(Ca.prototype),{constructor:Cd,interpolate_:function(a,b,c,d){return this.copySampleValue_(a-1)}});var Ya;Ya={TimeBufferType:Float32Array,ValueBufferType:Float32Array,DefaultInterpolation:2301,InterpolantFactoryMethodDiscrete:function(a){return new Cd(this.times,this.values,this.getValueSize(),a)},InterpolantFactoryMethodLinear:function(a){return new Wc(this.times,
	this.values,this.getValueSize(),a)},InterpolantFactoryMethodSmooth:function(a){return new Bd(this.times,this.values,this.getValueSize(),a)},setInterpolation:function(a){var b;switch(a){case 2300:b=this.InterpolantFactoryMethodDiscrete;break;case 2301:b=this.InterpolantFactoryMethodLinear;break;case 2302:b=this.InterpolantFactoryMethodSmooth}if(void 0===b){b="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(void 0===this.createInterpolant)if(a!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);
	else throw Error(b);console.warn("THREE.KeyframeTrackPrototype:",b)}else this.createInterpolant=b},getInterpolation:function(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}},getValueSize:function(){return this.values.length/this.times.length},shift:function(a){if(0!==a)for(var b=this.times,c=0,d=b.length;c!==d;++c)b[c]+=a;return this},scale:function(a){if(1!==
	a)for(var b=this.times,c=0,d=b.length;c!==d;++c)b[c]*=a;return this},trim:function(a,b){for(var c=this.times,d=c.length,e=0,f=d-1;e!==d&&c[e]<a;)++e;for(;-1!==f&&c[f]>b;)--f;++f;if(0!==e||f!==d)e>=f&&(f=Math.max(f,1),e=f-1),d=this.getValueSize(),this.times=ua.arraySlice(c,e,f),this.values=ua.arraySlice(this.values,e*d,f*d);return this},validate:function(){var a=!0,b=this.getValueSize();0!==b-Math.floor(b)&&(console.error("THREE.KeyframeTrackPrototype: Invalid value size in track.",this),a=!1);var c=
	this.times,b=this.values,d=c.length;0===d&&(console.error("THREE.KeyframeTrackPrototype: Track is empty.",this),a=!1);for(var e=null,f=0;f!==d;f++){var g=c[f];if("number"===typeof g&&isNaN(g)){console.error("THREE.KeyframeTrackPrototype: Time is not a valid number.",this,f,g);a=!1;break}if(null!==e&&e>g){console.error("THREE.KeyframeTrackPrototype: Out of order keys.",this,f,g,e);a=!1;break}e=g}if(void 0!==b&&ua.isTypedArray(b))for(f=0,c=b.length;f!==c;++f)if(d=b[f],isNaN(d)){console.error("THREE.KeyframeTrackPrototype: Value is not a valid number.",
	this,f,d);a=!1;break}return a},optimize:function(){for(var a=this.times,b=this.values,c=this.getValueSize(),d=2302===this.getInterpolation(),e=1,f=a.length-1,g=1;g<f;++g){var h=!1,k=a[g];if(k!==a[g+1]&&(1!==g||k!==k[0]))if(d)h=!0;else for(var m=g*c,l=m-c,q=m+c,k=0;k!==c;++k){var n=b[m+k];if(n!==b[l+k]||n!==b[q+k]){h=!0;break}}if(h){if(g!==e)for(a[e]=a[g],h=g*c,m=e*c,k=0;k!==c;++k)b[m+k]=b[h+k];++e}}if(0<f){a[e]=a[f];h=f*c;m=e*c;for(k=0;k!==c;++k)b[m+k]=b[h+k];++e}e!==a.length&&(this.times=ua.arraySlice(a,
	0,e),this.values=ua.arraySlice(b,0,e*c));return this}};ec.prototype=Object.assign(Object.create(Ya),{constructor:ec,ValueTypeName:"vector"});Dd.prototype=Object.assign(Object.create(Ca.prototype),{constructor:Dd,interpolate_:function(a,b,c,d){var e=this.resultBuffer,f=this.sampleValues,g=this.valueSize;a*=g;b=(c-b)/(d-b);for(c=a+g;a!==c;a+=4)pa.slerpFlat(e,0,f,a-g,f,a,b);return e}});Xc.prototype=Object.assign(Object.create(Ya),{constructor:Xc,ValueTypeName:"quaternion",DefaultInterpolation:2301,InterpolantFactoryMethodLinear:function(a){return new Dd(this.times,
	this.values,this.getValueSize(),a)},InterpolantFactoryMethodSmooth:void 0});fc.prototype=Object.assign(Object.create(Ya),{constructor:fc,ValueTypeName:"number"});Ed.prototype=Object.assign(Object.create(Ya),{constructor:Ed,ValueTypeName:"string",ValueBufferType:Array,DefaultInterpolation:2300,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0});Fd.prototype=Object.assign(Object.create(Ya),{constructor:Fd,ValueTypeName:"bool",ValueBufferType:Array,DefaultInterpolation:2300,
	InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0});Gd.prototype=Object.assign(Object.create(Ya),{constructor:Gd,ValueTypeName:"color"});wb.prototype=Ya;Ya.constructor=wb;Object.assign(wb,{parse:function(a){if(void 0===a.type)throw Error("track type undefined, can not parse");var b=wb._getTrackTypeForValueTypeName(a.type);if(void 0===a.times){var c=[],d=[];ua.flattenJSON(a.keys,c,d,"value");a.times=c;a.values=d}return void 0!==b.parse?b.parse(a):new b(a.name,a.times,a.values,
	a.interpolation)},toJSON:function(a){var b=a.constructor;if(void 0!==b.toJSON)b=b.toJSON(a);else{var b={name:a.name,times:ua.convertArray(a.times,Array),values:ua.convertArray(a.values,Array)},c=a.getInterpolation();c!==a.DefaultInterpolation&&(b.interpolation=c)}b.type=a.ValueTypeName;return b},_getTrackTypeForValueTypeName:function(a){switch(a.toLowerCase()){case "scalar":case "double":case "float":case "number":case "integer":return fc;case "vector":case "vector2":case "vector3":case "vector4":return ec;
	case "color":return Gd;case "quaternion":return Xc;case "bool":case "boolean":return Fd;case "string":return Ed}throw Error("Unsupported typeName: "+a);}});Object.assign(Aa,{parse:function(a){for(var b=[],c=a.tracks,d=1/(a.fps||1),e=0,f=c.length;e!==f;++e)b.push(wb.parse(c[e]).scale(d));return new Aa(a.name,a.duration,b)},toJSON:function(a){var b=[],c=a.tracks;a={name:a.name,duration:a.duration,tracks:b};for(var d=0,e=c.length;d!==e;++d)b.push(wb.toJSON(c[d]));return a},CreateFromMorphTargetSequence:function(a,
	b,c,d){for(var e=b.length,f=[],g=0;g<e;g++){var h=[],k=[];h.push((g+e-1)%e,g,(g+1)%e);k.push(0,1,0);var m=ua.getKeyframeOrder(h),h=ua.sortedArray(h,1,m),k=ua.sortedArray(k,1,m);d||0!==h[0]||(h.push(e),k.push(k[0]));f.push((new fc(".morphTargetInfluences["+b[g].name+"]",h,k)).scale(1/c))}return new Aa(a,-1,f)},findByName:function(a,b){var c=a;Array.isArray(a)||(c=a.geometry&&a.geometry.animations||a.animations);for(var d=0;d<c.length;d++)if(c[d].name===b)return c[d];return null},CreateClipsFromMorphTargetSequences:function(a,
	b,c){for(var d={},e=/^([\w-]*?)([\d]+)$/,f=0,g=a.length;f<g;f++){var h=a[f],k=h.name.match(e);if(k&&1<k.length){var m=k[1];(k=d[m])||(d[m]=k=[]);k.push(h)}}a=[];for(m in d)a.push(Aa.CreateFromMorphTargetSequence(m,d[m],b,c));return a},parseAnimation:function(a,b){if(!a)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;for(var c=function(a,b,c,d,e){if(0!==c.length){var f=[],g=[];ua.flattenJSON(c,f,g,d);0!==f.length&&e.push(new a(b,f,g))}},d=[],e=a.name||"default",f=
	a.length||-1,g=a.fps||30,h=a.hierarchy||[],k=0;k<h.length;k++){var m=h[k].keys;if(m&&0!==m.length)if(m[0].morphTargets){for(var f={},l=0;l<m.length;l++)if(m[l].morphTargets)for(var q=0;q<m[l].morphTargets.length;q++)f[m[l].morphTargets[q]]=-1;for(var n in f){for(var p=[],z=[],q=0;q!==m[l].morphTargets.length;++q){var r=m[l];p.push(r.time);z.push(r.morphTarget===n?1:0)}d.push(new fc(".morphTargetInfluence["+n+"]",p,z))}f=f.length*(g||1)}else l=".bones["+b[k].name+"]",c(ec,l+".position",m,"pos",d),
	c(Xc,l+".quaternion",m,"rot",d),c(ec,l+".scale",m,"scl",d)}return 0===d.length?null:new Aa(e,f,d)}});Object.assign(Aa.prototype,{resetDuration:function(){for(var a=0,b=0,c=this.tracks.length;b!==c;++b)var d=this.tracks[b],a=Math.max(a,d.times[d.times.length-1]);this.duration=a},trim:function(){for(var a=0;a<this.tracks.length;a++)this.tracks[a].trim(0,this.duration);return this},optimize:function(){for(var a=0;a<this.tracks.length;a++)this.tracks[a].optimize();return this}});Object.assign(Hd.prototype,
	{load:function(a,b,c,d){var e=this;(new ta(e.manager)).load(a,function(a){b(e.parse(JSON.parse(a)))},c,d)},setTextures:function(a){this.textures=a},parse:function(a){function b(a){void 0===c[a]&&console.warn("THREE.MaterialLoader: Undefined texture",a);return c[a]}var c=this.textures,d=new mg[a.type];void 0!==a.uuid&&(d.uuid=a.uuid);void 0!==a.name&&(d.name=a.name);void 0!==a.color&&d.color.setHex(a.color);void 0!==a.roughness&&(d.roughness=a.roughness);void 0!==a.metalness&&(d.metalness=a.metalness);
	void 0!==a.emissive&&d.emissive.setHex(a.emissive);void 0!==a.specular&&d.specular.setHex(a.specular);void 0!==a.shininess&&(d.shininess=a.shininess);void 0!==a.clearCoat&&(d.clearCoat=a.clearCoat);void 0!==a.clearCoatRoughness&&(d.clearCoatRoughness=a.clearCoatRoughness);void 0!==a.uniforms&&(d.uniforms=a.uniforms);void 0!==a.vertexShader&&(d.vertexShader=a.vertexShader);void 0!==a.fragmentShader&&(d.fragmentShader=a.fragmentShader);void 0!==a.vertexColors&&(d.vertexColors=a.vertexColors);void 0!==
	a.fog&&(d.fog=a.fog);void 0!==a.shading&&(d.shading=a.shading);void 0!==a.blending&&(d.blending=a.blending);void 0!==a.side&&(d.side=a.side);void 0!==a.opacity&&(d.opacity=a.opacity);void 0!==a.transparent&&(d.transparent=a.transparent);void 0!==a.alphaTest&&(d.alphaTest=a.alphaTest);void 0!==a.depthTest&&(d.depthTest=a.depthTest);void 0!==a.depthWrite&&(d.depthWrite=a.depthWrite);void 0!==a.colorWrite&&(d.colorWrite=a.colorWrite);void 0!==a.wireframe&&(d.wireframe=a.wireframe);void 0!==a.wireframeLinewidth&&
	(d.wireframeLinewidth=a.wireframeLinewidth);void 0!==a.wireframeLinecap&&(d.wireframeLinecap=a.wireframeLinecap);void 0!==a.wireframeLinejoin&&(d.wireframeLinejoin=a.wireframeLinejoin);void 0!==a.skinning&&(d.skinning=a.skinning);void 0!==a.morphTargets&&(d.morphTargets=a.morphTargets);void 0!==a.size&&(d.size=a.size);void 0!==a.sizeAttenuation&&(d.sizeAttenuation=a.sizeAttenuation);void 0!==a.map&&(d.map=b(a.map));void 0!==a.alphaMap&&(d.alphaMap=b(a.alphaMap),d.transparent=!0);void 0!==a.bumpMap&&
	(d.bumpMap=b(a.bumpMap));void 0!==a.bumpScale&&(d.bumpScale=a.bumpScale);void 0!==a.normalMap&&(d.normalMap=b(a.normalMap));if(void 0!==a.normalScale){var e=a.normalScale;!1===Array.isArray(e)&&(e=[e,e]);d.normalScale=(new E).fromArray(e)}void 0!==a.displacementMap&&(d.displacementMap=b(a.displacementMap));void 0!==a.displacementScale&&(d.displacementScale=a.displacementScale);void 0!==a.displacementBias&&(d.displacementBias=a.displacementBias);void 0!==a.roughnessMap&&(d.roughnessMap=b(a.roughnessMap));
	void 0!==a.metalnessMap&&(d.metalnessMap=b(a.metalnessMap));void 0!==a.emissiveMap&&(d.emissiveMap=b(a.emissiveMap));void 0!==a.emissiveIntensity&&(d.emissiveIntensity=a.emissiveIntensity);void 0!==a.specularMap&&(d.specularMap=b(a.specularMap));void 0!==a.envMap&&(d.envMap=b(a.envMap));void 0!==a.reflectivity&&(d.reflectivity=a.reflectivity);void 0!==a.lightMap&&(d.lightMap=b(a.lightMap));void 0!==a.lightMapIntensity&&(d.lightMapIntensity=a.lightMapIntensity);void 0!==a.aoMap&&(d.aoMap=b(a.aoMap));
	void 0!==a.aoMapIntensity&&(d.aoMapIntensity=a.aoMapIntensity);void 0!==a.gradientMap&&(d.gradientMap=b(a.gradientMap));return d}});Object.assign(be.prototype,{load:function(a,b,c,d){var e=this;(new ta(e.manager)).load(a,function(a){b(e.parse(JSON.parse(a)))},c,d)},parse:function(a){var b=new I,c=a.data.index;void 0!==c&&(c=new gf[c.type](c.array),b.setIndex(new L(c,1)));var d=a.data.attributes,e;for(e in d){var f=d[e],c=new gf[f.type](f.array);b.addAttribute(e,new L(c,f.itemSize,f.normalized))}e=
	a.data.groups||a.data.drawcalls||a.data.offsets;if(void 0!==e)for(c=0,d=e.length;c!==d;++c)f=e[c],b.addGroup(f.start,f.count,f.materialIndex);a=a.data.boundingSphere;void 0!==a&&(e=new p,void 0!==a.center&&e.fromArray(a.center),b.boundingSphere=new Ga(e,a.radius));return b}});var gf={Int8Array:Int8Array,Uint8Array:Uint8Array,Uint8ClampedArray:Uint8ClampedArray,Int16Array:Int16Array,Uint16Array:Uint16Array,Int32Array:Int32Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array};
	gc.Handlers={handlers:[],add:function(a,b){this.handlers.push(a,b)},get:function(a){for(var b=this.handlers,c=0,d=b.length;c<d;c+=2){var e=b[c+1];if(b[c].test(a))return e}return null}};Object.assign(gc.prototype,{crossOrigin:void 0,extractUrlBase:function(a){a=a.split("/");if(1===a.length)return"./";a.pop();return a.join("/")+"/"},initMaterials:function(a,b,c){for(var d=[],e=0;e<a.length;++e)d[e]=this.createMaterial(a[e],b,c);return d},createMaterial:function(){var a={NoBlending:0,NormalBlending:1,
	AdditiveBlending:2,SubtractiveBlending:3,MultiplyBlending:4,CustomBlending:5},b=new G,c=new sd,d=new Hd;return function(e,f,g){function h(a,b,d,e,h){a=f+a;var m=gc.Handlers.get(a);null!==m?a=m.load(a):(c.setCrossOrigin(g),a=c.load(a));void 0!==b&&(a.repeat.fromArray(b),1!==b[0]&&(a.wrapS=1E3),1!==b[1]&&(a.wrapT=1E3));void 0!==d&&a.offset.fromArray(d);void 0!==e&&("repeat"===e[0]&&(a.wrapS=1E3),"mirror"===e[0]&&(a.wrapS=1002),"repeat"===e[1]&&(a.wrapT=1E3),"mirror"===e[1]&&(a.wrapT=1002));void 0!==
	h&&(a.anisotropy=h);b=X.generateUUID();k[b]=a;return b}var k={},m={uuid:X.generateUUID(),type:"MeshLambertMaterial"},l;for(l in e){var q=e[l];switch(l){case "DbgColor":case "DbgIndex":case "opticalDensity":case "illumination":break;case "DbgName":m.name=q;break;case "blending":m.blending=a[q];break;case "colorAmbient":case "mapAmbient":console.warn("THREE.Loader.createMaterial:",l,"is no longer supported.");break;case "colorDiffuse":m.color=b.fromArray(q).getHex();break;case "colorSpecular":m.specular=
	b.fromArray(q).getHex();break;case "colorEmissive":m.emissive=b.fromArray(q).getHex();break;case "specularCoef":m.shininess=q;break;case "shading":"basic"===q.toLowerCase()&&(m.type="MeshBasicMaterial");"phong"===q.toLowerCase()&&(m.type="MeshPhongMaterial");"standard"===q.toLowerCase()&&(m.type="MeshStandardMaterial");break;case "mapDiffuse":m.map=h(q,e.mapDiffuseRepeat,e.mapDiffuseOffset,e.mapDiffuseWrap,e.mapDiffuseAnisotropy);break;case "mapDiffuseRepeat":case "mapDiffuseOffset":case "mapDiffuseWrap":case "mapDiffuseAnisotropy":break;
	case "mapEmissive":m.emissiveMap=h(q,e.mapEmissiveRepeat,e.mapEmissiveOffset,e.mapEmissiveWrap,e.mapEmissiveAnisotropy);break;case "mapEmissiveRepeat":case "mapEmissiveOffset":case "mapEmissiveWrap":case "mapEmissiveAnisotropy":break;case "mapLight":m.lightMap=h(q,e.mapLightRepeat,e.mapLightOffset,e.mapLightWrap,e.mapLightAnisotropy);break;case "mapLightRepeat":case "mapLightOffset":case "mapLightWrap":case "mapLightAnisotropy":break;case "mapAO":m.aoMap=h(q,e.mapAORepeat,e.mapAOOffset,e.mapAOWrap,
	e.mapAOAnisotropy);break;case "mapAORepeat":case "mapAOOffset":case "mapAOWrap":case "mapAOAnisotropy":break;case "mapBump":m.bumpMap=h(q,e.mapBumpRepeat,e.mapBumpOffset,e.mapBumpWrap,e.mapBumpAnisotropy);break;case "mapBumpScale":m.bumpScale=q;break;case "mapBumpRepeat":case "mapBumpOffset":case "mapBumpWrap":case "mapBumpAnisotropy":break;case "mapNormal":m.normalMap=h(q,e.mapNormalRepeat,e.mapNormalOffset,e.mapNormalWrap,e.mapNormalAnisotropy);break;case "mapNormalFactor":m.normalScale=[q,q];break;
	case "mapNormalRepeat":case "mapNormalOffset":case "mapNormalWrap":case "mapNormalAnisotropy":break;case "mapSpecular":m.specularMap=h(q,e.mapSpecularRepeat,e.mapSpecularOffset,e.mapSpecularWrap,e.mapSpecularAnisotropy);break;case "mapSpecularRepeat":case "mapSpecularOffset":case "mapSpecularWrap":case "mapSpecularAnisotropy":break;case "mapMetalness":m.metalnessMap=h(q,e.mapMetalnessRepeat,e.mapMetalnessOffset,e.mapMetalnessWrap,e.mapMetalnessAnisotropy);break;case "mapMetalnessRepeat":case "mapMetalnessOffset":case "mapMetalnessWrap":case "mapMetalnessAnisotropy":break;
	case "mapRoughness":m.roughnessMap=h(q,e.mapRoughnessRepeat,e.mapRoughnessOffset,e.mapRoughnessWrap,e.mapRoughnessAnisotropy);break;case "mapRoughnessRepeat":case "mapRoughnessOffset":case "mapRoughnessWrap":case "mapRoughnessAnisotropy":break;case "mapAlpha":m.alphaMap=h(q,e.mapAlphaRepeat,e.mapAlphaOffset,e.mapAlphaWrap,e.mapAlphaAnisotropy);break;case "mapAlphaRepeat":case "mapAlphaOffset":case "mapAlphaWrap":case "mapAlphaAnisotropy":break;case "flipSided":m.side=1;break;case "doubleSided":m.side=
	2;break;case "transparency":console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity");m.opacity=q;break;case "depthTest":case "depthWrite":case "colorWrite":case "opacity":case "reflectivity":case "transparent":case "visible":case "wireframe":m[l]=q;break;case "vertexColors":!0===q&&(m.vertexColors=2);"face"===q&&(m.vertexColors=1);break;default:console.error("THREE.Loader.createMaterial: Unsupported",l,q)}}"MeshBasicMaterial"===m.type&&delete m.emissive;"MeshPhongMaterial"!==
	m.type&&delete m.specular;1>m.opacity&&(m.transparent=!0);d.setTextures(k);return d.parse(m)}}()});Object.assign(ce.prototype,{load:function(a,b,c,d){var e=this,f=this.texturePath&&"string"===typeof this.texturePath?this.texturePath:gc.prototype.extractUrlBase(a),g=new ta(this.manager);g.setWithCredentials(this.withCredentials);g.load(a,function(c){c=JSON.parse(c);var d=c.metadata;if(void 0!==d&&(d=d.type,void 0!==d)){if("object"===d.toLowerCase()){console.error("THREE.JSONLoader: "+a+" should be loaded with THREE.ObjectLoader instead.");
	return}if("scene"===d.toLowerCase()){console.error("THREE.JSONLoader: "+a+" should be loaded with THREE.SceneLoader instead.");return}}c=e.parse(c,f);b(c.geometry,c.materials)},c,d)},setTexturePath:function(a){this.texturePath=a},parse:function(){return function(a,b){void 0!==a.data&&(a=a.data);a.scale=void 0!==a.scale?1/a.scale:1;var c=new M,d=a,e,f,g,h,k,m,l,q,n,t,z,r,y,x,v=d.faces;n=d.vertices;var B=d.normals,w=d.colors;m=d.scale;var C=0;if(void 0!==d.uvs){for(e=0;e<d.uvs.length;e++)d.uvs[e].length&&
	C++;for(e=0;e<C;e++)c.faceVertexUvs[e]=[]}h=0;for(k=n.length;h<k;)e=new p,e.x=n[h++]*m,e.y=n[h++]*m,e.z=n[h++]*m,c.vertices.push(e);h=0;for(k=v.length;h<k;)if(n=v[h++],t=n&1,g=n&2,e=n&8,l=n&16,z=n&32,m=n&64,n&=128,t){t=new Va;t.a=v[h];t.b=v[h+1];t.c=v[h+3];r=new Va;r.a=v[h+1];r.b=v[h+2];r.c=v[h+3];h+=4;g&&(g=v[h++],t.materialIndex=g,r.materialIndex=g);g=c.faces.length;if(e)for(e=0;e<C;e++)for(y=d.uvs[e],c.faceVertexUvs[e][g]=[],c.faceVertexUvs[e][g+1]=[],f=0;4>f;f++)q=v[h++],x=y[2*q],q=y[2*q+1],x=
	new E(x,q),2!==f&&c.faceVertexUvs[e][g].push(x),0!==f&&c.faceVertexUvs[e][g+1].push(x);l&&(l=3*v[h++],t.normal.set(B[l++],B[l++],B[l]),r.normal.copy(t.normal));if(z)for(e=0;4>e;e++)l=3*v[h++],z=new p(B[l++],B[l++],B[l]),2!==e&&t.vertexNormals.push(z),0!==e&&r.vertexNormals.push(z);m&&(m=v[h++],m=w[m],t.color.setHex(m),r.color.setHex(m));if(n)for(e=0;4>e;e++)m=v[h++],m=w[m],2!==e&&t.vertexColors.push(new G(m)),0!==e&&r.vertexColors.push(new G(m));c.faces.push(t);c.faces.push(r)}else{t=new Va;t.a=v[h++];
	t.b=v[h++];t.c=v[h++];g&&(g=v[h++],t.materialIndex=g);g=c.faces.length;if(e)for(e=0;e<C;e++)for(y=d.uvs[e],c.faceVertexUvs[e][g]=[],f=0;3>f;f++)q=v[h++],x=y[2*q],q=y[2*q+1],x=new E(x,q),c.faceVertexUvs[e][g].push(x);l&&(l=3*v[h++],t.normal.set(B[l++],B[l++],B[l]));if(z)for(e=0;3>e;e++)l=3*v[h++],z=new p(B[l++],B[l++],B[l]),t.vertexNormals.push(z);m&&(m=v[h++],t.color.setHex(w[m]));if(n)for(e=0;3>e;e++)m=v[h++],t.vertexColors.push(new G(w[m]));c.faces.push(t)}d=a;h=void 0!==d.influencesPerVertex?d.influencesPerVertex:
	2;if(d.skinWeights)for(k=0,v=d.skinWeights.length;k<v;k+=h)c.skinWeights.push(new ha(d.skinWeights[k],1<h?d.skinWeights[k+1]:0,2<h?d.skinWeights[k+2]:0,3<h?d.skinWeights[k+3]:0));if(d.skinIndices)for(k=0,v=d.skinIndices.length;k<v;k+=h)c.skinIndices.push(new ha(d.skinIndices[k],1<h?d.skinIndices[k+1]:0,2<h?d.skinIndices[k+2]:0,3<h?d.skinIndices[k+3]:0));c.bones=d.bones;c.bones&&0<c.bones.length&&(c.skinWeights.length!==c.skinIndices.length||c.skinIndices.length!==c.vertices.length)&&console.warn("When skinning, number of vertices ("+
	c.vertices.length+"), skinIndices ("+c.skinIndices.length+"), and skinWeights ("+c.skinWeights.length+") should match.");k=a;v=k.scale;if(void 0!==k.morphTargets)for(d=0,h=k.morphTargets.length;d<h;d++)for(c.morphTargets[d]={},c.morphTargets[d].name=k.morphTargets[d].name,c.morphTargets[d].vertices=[],B=c.morphTargets[d].vertices,w=k.morphTargets[d].vertices,C=0,n=w.length;C<n;C+=3)m=new p,m.x=w[C]*v,m.y=w[C+1]*v,m.z=w[C+2]*v,B.push(m);if(void 0!==k.morphColors&&0<k.morphColors.length)for(console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.'),
	v=c.faces,k=k.morphColors[0].colors,d=0,h=v.length;d<h;d++)v[d].color.fromArray(k,3*d);k=a;d=[];h=[];void 0!==k.animation&&h.push(k.animation);void 0!==k.animations&&(k.animations.length?h=h.concat(k.animations):h.push(k.animations));for(k=0;k<h.length;k++)(v=Aa.parseAnimation(h[k],c.bones))&&d.push(v);c.morphTargets&&(h=Aa.CreateClipsFromMorphTargetSequences(c.morphTargets,10),d=d.concat(h));0<d.length&&(c.animations=d);c.computeFaceNormals();c.computeBoundingSphere();if(void 0===a.materials||0===
	a.materials.length)return{geometry:c};d=gc.prototype.initMaterials(a.materials,b,this.crossOrigin);return{geometry:c,materials:d}}}()});Object.assign(Re.prototype,{load:function(a,b,c,d){""===this.texturePath&&(this.texturePath=a.substring(0,a.lastIndexOf("/")+1));var e=this;(new ta(e.manager)).load(a,function(c){var g=null;try{g=JSON.parse(c)}catch(h){void 0!==d&&d(h);console.error("THREE:ObjectLoader: Can't parse "+a+".",h.message);return}c=g.metadata;void 0===c||void 0===c.type||"geometry"===c.type.toLowerCase()?
	console.error("THREE.ObjectLoader: Can't load "+a+". Use THREE.JSONLoader instead."):e.parse(g,b)},c,d)},setTexturePath:function(a){this.texturePath=a},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(a,b){var c=this.parseGeometries(a.geometries),d=this.parseImages(a.images,function(){void 0!==b&&b(e)}),d=this.parseTextures(a.textures,d),d=this.parseMaterials(a.materials,d),e=this.parseObject(a.object,c,d);a.animations&&(e.animations=this.parseAnimations(a.animations));void 0!==a.images&&
	0!==a.images.length||void 0===b||b(e);return e},parseGeometries:function(a){var b={};if(void 0!==a)for(var c=new ce,d=new be,e=0,f=a.length;e<f;e++){var g,h=a[e];switch(h.type){case "PlaneGeometry":case "PlaneBufferGeometry":g=new Ma[h.type](h.width,h.height,h.widthSegments,h.heightSegments);break;case "BoxGeometry":case "BoxBufferGeometry":case "CubeGeometry":g=new Ma[h.type](h.width,h.height,h.depth,h.widthSegments,h.heightSegments,h.depthSegments);break;case "CircleGeometry":case "CircleBufferGeometry":g=
	new Ma[h.type](h.radius,h.segments,h.thetaStart,h.thetaLength);break;case "CylinderGeometry":case "CylinderBufferGeometry":g=new Ma[h.type](h.radiusTop,h.radiusBottom,h.height,h.radialSegments,h.heightSegments,h.openEnded,h.thetaStart,h.thetaLength);break;case "ConeGeometry":case "ConeBufferGeometry":g=new Ma[h.type](h.radius,h.height,h.radialSegments,h.heightSegments,h.openEnded,h.thetaStart,h.thetaLength);break;case "SphereGeometry":case "SphereBufferGeometry":g=new Ma[h.type](h.radius,h.widthSegments,
	h.heightSegments,h.phiStart,h.phiLength,h.thetaStart,h.thetaLength);break;case "DodecahedronGeometry":case "IcosahedronGeometry":case "OctahedronGeometry":case "TetrahedronGeometry":g=new Ma[h.type](h.radius,h.detail);break;case "RingGeometry":case "RingBufferGeometry":g=new Ma[h.type](h.innerRadius,h.outerRadius,h.thetaSegments,h.phiSegments,h.thetaStart,h.thetaLength);break;case "TorusGeometry":case "TorusBufferGeometry":g=new Ma[h.type](h.radius,h.tube,h.radialSegments,h.tubularSegments,h.arc);
	break;case "TorusKnotGeometry":case "TorusKnotBufferGeometry":g=new Ma[h.type](h.radius,h.tube,h.tubularSegments,h.radialSegments,h.p,h.q);break;case "LatheGeometry":case "LatheBufferGeometry":g=new Ma[h.type](h.points,h.segments,h.phiStart,h.phiLength);break;case "BufferGeometry":g=d.parse(h);break;case "Geometry":g=c.parse(h,this.texturePath).geometry;break;default:console.warn('THREE.ObjectLoader: Unsupported geometry type "'+h.type+'"');continue}g.uuid=h.uuid;void 0!==h.name&&(g.name=h.name);
	b[h.uuid]=g}return b},parseMaterials:function(a,b){var c={};if(void 0!==a){var d=new Hd;d.setTextures(b);for(var e=0,f=a.length;e<f;e++){var g=a[e];if("MultiMaterial"===g.type){for(var h=[],k=0;k<g.materials.length;k++)h.push(d.parse(g.materials[k]));c[g.uuid]=h}else c[g.uuid]=d.parse(g)}}return c},parseAnimations:function(a){for(var b=[],c=0;c<a.length;c++){var d=Aa.parse(a[c]);b.push(d)}return b},parseImages:function(a,b){function c(a){d.manager.itemStart(a);return g.load(a,function(){d.manager.itemEnd(a)},
	void 0,function(){d.manager.itemEnd(a);d.manager.itemError(a)})}var d=this,e={};if(void 0!==a&&0<a.length){var f=new Zd(b),g=new Vc(f);g.setCrossOrigin(this.crossOrigin);for(var f=0,h=a.length;f<h;f++){var k=a[f],l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(k.url)?k.url:d.texturePath+k.url;e[k.uuid]=c(l)}}return e},parseTextures:function(a,b){function c(a,b){if("number"===typeof a)return a;console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",a);return b[a]}var d={};if(void 0!==
	a)for(var e=0,f=a.length;e<f;e++){var g=a[e];void 0===g.image&&console.warn('THREE.ObjectLoader: No "image" specified for',g.uuid);void 0===b[g.image]&&console.warn("THREE.ObjectLoader: Undefined image",g.image);var h=new da(b[g.image]);h.needsUpdate=!0;h.uuid=g.uuid;void 0!==g.name&&(h.name=g.name);void 0!==g.mapping&&(h.mapping=c(g.mapping,ng));void 0!==g.offset&&h.offset.fromArray(g.offset);void 0!==g.repeat&&h.repeat.fromArray(g.repeat);void 0!==g.wrap&&(h.wrapS=c(g.wrap[0],hf),h.wrapT=c(g.wrap[1],
	hf));void 0!==g.minFilter&&(h.minFilter=c(g.minFilter,jf));void 0!==g.magFilter&&(h.magFilter=c(g.magFilter,jf));void 0!==g.anisotropy&&(h.anisotropy=g.anisotropy);void 0!==g.flipY&&(h.flipY=g.flipY);d[g.uuid]=h}return d},parseObject:function(){var a=new J;return function(b,c,d){function e(a){void 0===c[a]&&console.warn("THREE.ObjectLoader: Undefined geometry",a);return c[a]}function f(a){if(void 0!==a){if(Array.isArray(a)){for(var b=[],c=0,e=a.length;c<e;c++){var f=a[c];void 0===d[f]&&console.warn("THREE.ObjectLoader: Undefined material",
	f);b.push(d[f])}return b}void 0===d[a]&&console.warn("THREE.ObjectLoader: Undefined material",a);return d[a]}}var g;switch(b.type){case "Scene":g=new md;void 0!==b.background&&Number.isInteger(b.background)&&(g.background=new G(b.background));void 0!==b.fog&&("Fog"===b.fog.type?g.fog=new Lb(b.fog.color,b.fog.near,b.fog.far):"FogExp2"===b.fog.type&&(g.fog=new Kb(b.fog.color,b.fog.density)));break;case "PerspectiveCamera":g=new wa(b.fov,b.aspect,b.near,b.far);void 0!==b.focus&&(g.focus=b.focus);void 0!==
	b.zoom&&(g.zoom=b.zoom);void 0!==b.filmGauge&&(g.filmGauge=b.filmGauge);void 0!==b.filmOffset&&(g.filmOffset=b.filmOffset);void 0!==b.view&&(g.view=Object.assign({},b.view));break;case "OrthographicCamera":g=new Jb(b.left,b.right,b.top,b.bottom,b.near,b.far);break;case "AmbientLight":g=new zd(b.color,b.intensity);break;case "DirectionalLight":g=new yd(b.color,b.intensity);break;case "PointLight":g=new wd(b.color,b.intensity,b.distance,b.decay);break;case "RectAreaLight":g=new Ad(b.color,b.intensity,
	b.width,b.height);break;case "SpotLight":g=new vd(b.color,b.intensity,b.distance,b.angle,b.penumbra,b.decay);break;case "HemisphereLight":g=new td(b.color,b.groundColor,b.intensity);break;case "SkinnedMesh":console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");case "Mesh":g=e(b.geometry);var h=f(b.material);g=g.bones&&0<g.bones.length?new od(g,h):new Ba(g,h);break;case "LOD":g=new Bc;break;case "Line":g=new xa(e(b.geometry),f(b.material),b.mode);break;case "LineLoop":g=
	new pd(e(b.geometry),f(b.material));break;case "LineSegments":g=new Z(e(b.geometry),f(b.material));break;case "PointCloud":case "Points":g=new Mb(e(b.geometry),f(b.material));break;case "Sprite":g=new Ac(f(b.material));break;case "Group":g=new Dc;break;default:g=new B}g.uuid=b.uuid;void 0!==b.name&&(g.name=b.name);void 0!==b.matrix?(a.fromArray(b.matrix),a.decompose(g.position,g.quaternion,g.scale)):(void 0!==b.position&&g.position.fromArray(b.position),void 0!==b.rotation&&g.rotation.fromArray(b.rotation),
	void 0!==b.quaternion&&g.quaternion.fromArray(b.quaternion),void 0!==b.scale&&g.scale.fromArray(b.scale));void 0!==b.castShadow&&(g.castShadow=b.castShadow);void 0!==b.receiveShadow&&(g.receiveShadow=b.receiveShadow);b.shadow&&(void 0!==b.shadow.bias&&(g.shadow.bias=b.shadow.bias),void 0!==b.shadow.radius&&(g.shadow.radius=b.shadow.radius),void 0!==b.shadow.mapSize&&g.shadow.mapSize.fromArray(b.shadow.mapSize),void 0!==b.shadow.camera&&(g.shadow.camera=this.parseObject(b.shadow.camera)));void 0!==
	b.visible&&(g.visible=b.visible);void 0!==b.userData&&(g.userData=b.userData);if(void 0!==b.children)for(var k in b.children)g.add(this.parseObject(b.children[k],c,d));if("LOD"===b.type)for(b=b.levels,h=0;h<b.length;h++){var l=b[h];k=g.getObjectByProperty("uuid",l.object);void 0!==k&&g.addLevel(k,l.distance)}return g}}()});var ng={UVMapping:300,CubeReflectionMapping:301,CubeRefractionMapping:302,EquirectangularReflectionMapping:303,EquirectangularRefractionMapping:304,SphericalReflectionMapping:305,
	CubeUVReflectionMapping:306,CubeUVRefractionMapping:307},hf={RepeatWrapping:1E3,ClampToEdgeWrapping:1001,MirroredRepeatWrapping:1002},jf={NearestFilter:1003,NearestMipMapNearestFilter:1004,NearestMipMapLinearFilter:1005,LinearFilter:1006,LinearMipMapNearestFilter:1007,LinearMipMapLinearFilter:1008};Object.assign(ma.prototype,{getPoint:function(){console.warn("THREE.Curve: .getPoint() not implemented.");return null},getPointAt:function(a){a=this.getUtoTmapping(a);return this.getPoint(a)},getPoints:function(a){void 0===
	a&&(a=5);for(var b=[],c=0;c<=a;c++)b.push(this.getPoint(c/a));return b},getSpacedPoints:function(a){void 0===a&&(a=5);for(var b=[],c=0;c<=a;c++)b.push(this.getPointAt(c/a));return b},getLength:function(){var a=this.getLengths();return a[a.length-1]},getLengths:function(a){void 0===a&&(a=this.arcLengthDivisions);if(this.cacheArcLengths&&this.cacheArcLengths.length===a+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;var b=[],c,d=this.getPoint(0),e,f=0;b.push(0);for(e=1;e<=a;e++)c=
	this.getPoint(e/a),f+=c.distanceTo(d),b.push(f),d=c;return this.cacheArcLengths=b},updateArcLengths:function(){this.needsUpdate=!0;this.getLengths()},getUtoTmapping:function(a,b){var c=this.getLengths(),d,e=c.length,f;f=b?b:a*c[e-1];for(var g=0,h=e-1,k;g<=h;)if(d=Math.floor(g+(h-g)/2),k=c[d]-f,0>k)g=d+1;else if(0<k)h=d-1;else{h=d;break}d=h;if(c[d]===f)return d/(e-1);g=c[d];return(d+(f-g)/(c[d+1]-g))/(e-1)},getTangent:function(a){var b=a-1E-4;a+=1E-4;0>b&&(b=0);1<a&&(a=1);b=this.getPoint(b);return this.getPoint(a).clone().sub(b).normalize()},
	getTangentAt:function(a){a=this.getUtoTmapping(a);return this.getTangent(a)},computeFrenetFrames:function(a,b){var c=new p,d=[],e=[],f=[],g=new p,h=new J,k,l;for(k=0;k<=a;k++)l=k/a,d[k]=this.getTangentAt(l),d[k].normalize();e[0]=new p;f[0]=new p;k=Number.MAX_VALUE;l=Math.abs(d[0].x);var u=Math.abs(d[0].y),q=Math.abs(d[0].z);l<=k&&(k=l,c.set(1,0,0));u<=k&&(k=u,c.set(0,1,0));q<=k&&c.set(0,0,1);g.crossVectors(d[0],c).normalize();e[0].crossVectors(d[0],g);f[0].crossVectors(d[0],e[0]);for(k=1;k<=a;k++)e[k]=
	e[k-1].clone(),f[k]=f[k-1].clone(),g.crossVectors(d[k-1],d[k]),g.length()>Number.EPSILON&&(g.normalize(),c=Math.acos(X.clamp(d[k-1].dot(d[k]),-1,1)),e[k].applyMatrix4(h.makeRotationAxis(g,c))),f[k].crossVectors(d[k],e[k]);if(!0===b)for(c=Math.acos(X.clamp(e[0].dot(e[a]),-1,1)),c/=a,0<d[0].dot(g.crossVectors(e[0],e[a]))&&(c=-c),k=1;k<=a;k++)e[k].applyMatrix4(h.makeRotationAxis(d[k],c*k)),f[k].crossVectors(d[k],e[k]);return{tangents:d,normals:e,binormals:f}}});Sa.prototype=Object.create(ma.prototype);
	Sa.prototype.constructor=Sa;Sa.prototype.isLineCurve=!0;Sa.prototype.getPoint=function(a){if(1===a)return this.v2.clone();var b=this.v2.clone().sub(this.v1);b.multiplyScalar(a).add(this.v1);return b};Sa.prototype.getPointAt=function(a){return this.getPoint(a)};Sa.prototype.getTangent=function(a){return this.v2.clone().sub(this.v1).normalize()};Yc.prototype=Object.assign(Object.create(ma.prototype),{constructor:Yc,add:function(a){this.curves.push(a)},closePath:function(){var a=this.curves[0].getPoint(0),
	b=this.curves[this.curves.length-1].getPoint(1);a.equals(b)||this.curves.push(new Sa(b,a))},getPoint:function(a){var b=a*this.getLength(),c=this.getCurveLengths();for(a=0;a<c.length;){if(c[a]>=b)return b=c[a]-b,a=this.curves[a],c=a.getLength(),a.getPointAt(0===c?0:1-b/c);a++}return null},getLength:function(){var a=this.getCurveLengths();return a[a.length-1]},updateArcLengths:function(){this.needsUpdate=!0;this.cacheLengths=null;this.getCurveLengths()},getCurveLengths:function(){if(this.cacheLengths&&
	this.cacheLengths.length===this.curves.length)return this.cacheLengths;for(var a=[],b=0,c=0,d=this.curves.length;c<d;c++)b+=this.curves[c].getLength(),a.push(b);return this.cacheLengths=a},getSpacedPoints:function(a){void 0===a&&(a=40);for(var b=[],c=0;c<=a;c++)b.push(this.getPoint(c/a));this.autoClose&&b.push(b[0]);return b},getPoints:function(a){a=a||12;for(var b=[],c,d=0,e=this.curves;d<e.length;d++)for(var f=e[d],f=f.getPoints(f&&f.isEllipseCurve?2*a:f&&f.isLineCurve?1:f&&f.isSplineCurve?a*f.points.length:
	a),g=0;g<f.length;g++){var h=f[g];c&&c.equals(h)||(b.push(h),c=h)}this.autoClose&&1<b.length&&!b[b.length-1].equals(b[0])&&b.push(b[0]);return b},createPointsGeometry:function(a){a=this.getPoints(a);return this.createGeometry(a)},createSpacedPointsGeometry:function(a){a=this.getSpacedPoints(a);return this.createGeometry(a)},createGeometry:function(a){for(var b=new M,c=0,d=a.length;c<d;c++){var e=a[c];b.vertices.push(new p(e.x,e.y,e.z||0))}return b}});Xa.prototype=Object.create(ma.prototype);Xa.prototype.constructor=
	Xa;Xa.prototype.isEllipseCurve=!0;Xa.prototype.getPoint=function(a){for(var b=2*Math.PI,c=this.aEndAngle-this.aStartAngle,d=Math.abs(c)<Number.EPSILON;0>c;)c+=b;for(;c>b;)c-=b;c<Number.EPSILON&&(c=d?0:b);!0!==this.aClockwise||d||(c=c===b?-b:c-b);b=this.aStartAngle+a*c;a=this.aX+this.xRadius*Math.cos(b);var e=this.aY+this.yRadius*Math.sin(b);0!==this.aRotation&&(b=Math.cos(this.aRotation),c=Math.sin(this.aRotation),d=a-this.aX,e-=this.aY,a=d*b-e*c+this.aX,e=d*c+e*b+this.aY);return new E(a,e)};zb.prototype=
	Object.create(ma.prototype);zb.prototype.constructor=zb;zb.prototype.isSplineCurve=!0;zb.prototype.getPoint=function(a){var b=this.points,c=(b.length-1)*a;a=Math.floor(c);var c=c-a,d=b[0===a?a:a-1],e=b[a],f=b[a>b.length-2?b.length-1:a+1],b=b[a>b.length-3?b.length-1:a+2];return new E(Se(c,d.x,e.x,f.x,b.x),Se(c,d.y,e.y,f.y,b.y))};hc.prototype=Object.create(ma.prototype);hc.prototype.constructor=hc;hc.prototype.getPoint=function(a){var b=this.v0,c=this.v1,d=this.v2,e=this.v3;return new E(yb(a,b.x,c.x,
	d.x,e.x),yb(a,b.y,c.y,d.y,e.y))};ic.prototype=Object.create(ma.prototype);ic.prototype.constructor=ic;ic.prototype.getPoint=function(a){var b=this.v0,c=this.v1,d=this.v2;return new E(xb(a,b.x,c.x,d.x),xb(a,b.y,c.y,d.y))};var ue=Object.assign(Object.create(Yc.prototype),{fromPoints:function(a){this.moveTo(a[0].x,a[0].y);for(var b=1,c=a.length;b<c;b++)this.lineTo(a[b].x,a[b].y)},moveTo:function(a,b){this.currentPoint.set(a,b)},lineTo:function(a,b){var c=new Sa(this.currentPoint.clone(),new E(a,b));
	this.curves.push(c);this.currentPoint.set(a,b)},quadraticCurveTo:function(a,b,c,d){a=new ic(this.currentPoint.clone(),new E(a,b),new E(c,d));this.curves.push(a);this.currentPoint.set(c,d)},bezierCurveTo:function(a,b,c,d,e,f){a=new hc(this.currentPoint.clone(),new E(a,b),new E(c,d),new E(e,f));this.curves.push(a);this.currentPoint.set(e,f)},splineThru:function(a){var b=[this.currentPoint.clone()].concat(a),b=new zb(b);this.curves.push(b);this.currentPoint.copy(a[a.length-1])},arc:function(a,b,c,d,
	e,f){this.absarc(a+this.currentPoint.x,b+this.currentPoint.y,c,d,e,f)},absarc:function(a,b,c,d,e,f){this.absellipse(a,b,c,c,d,e,f)},ellipse:function(a,b,c,d,e,f,g,h){this.absellipse(a+this.currentPoint.x,b+this.currentPoint.y,c,d,e,f,g,h)},absellipse:function(a,b,c,d,e,f,g,h){a=new Xa(a,b,c,d,e,f,g,h);0<this.curves.length&&(b=a.getPoint(0),b.equals(this.currentPoint)||this.lineTo(b.x,b.y));this.curves.push(a);a=a.getPoint(1);this.currentPoint.copy(a)}});Zc.prototype=ue;ue.constructor=Zc;Ab.prototype=
	Object.assign(Object.create(ue),{constructor:Ab,getPointsHoles:function(a){for(var b=[],c=0,d=this.holes.length;c<d;c++)b[c]=this.holes[c].getPoints(a);return b},extractAllPoints:function(a){return{shape:this.getPoints(a),holes:this.getPointsHoles(a)}},extractPoints:function(a){return this.extractAllPoints(a)}});Object.assign(de.prototype,{moveTo:function(a,b){this.currentPath=new Zc;this.subPaths.push(this.currentPath);this.currentPath.moveTo(a,b)},lineTo:function(a,b){this.currentPath.lineTo(a,
	b)},quadraticCurveTo:function(a,b,c,d){this.currentPath.quadraticCurveTo(a,b,c,d)},bezierCurveTo:function(a,b,c,d,e,f){this.currentPath.bezierCurveTo(a,b,c,d,e,f)},splineThru:function(a){this.currentPath.splineThru(a)},toShapes:function(a,b){function c(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c],f=new Ab;f.curves=e.curves;b.push(f)}return b}function d(a,b){for(var c=b.length,d=!1,e=c-1,f=0;f<c;e=f++){var g=b[e],h=b[f],k=h.x-g.x,l=h.y-g.y;if(Math.abs(l)>Number.EPSILON){if(0>l&&(g=b[f],k=-k,
	h=b[e],l=-l),!(a.y<g.y||a.y>h.y))if(a.y===g.y){if(a.x===g.x)return!0}else{e=l*(a.x-g.x)-k*(a.y-g.y);if(0===e)return!0;0>e||(d=!d)}}else if(a.y===g.y&&(h.x<=a.x&&a.x<=g.x||g.x<=a.x&&a.x<=h.x))return!0}return d}var e=ya.isClockWise,f=this.subPaths;if(0===f.length)return[];if(!0===b)return c(f);var g,h,k,l=[];if(1===f.length)return h=f[0],k=new Ab,k.curves=h.curves,l.push(k),l;var p=!e(f[0].getPoints()),p=a?!p:p;k=[];var q=[],n=[],t=0,z;q[t]=void 0;n[t]=[];for(var r=0,y=f.length;r<y;r++)h=f[r],z=h.getPoints(),
	g=e(z),(g=a?!g:g)?(!p&&q[t]&&t++,q[t]={s:new Ab,p:z},q[t].s.curves=h.curves,p&&t++,n[t]=[]):n[t].push({h:h,p:z[0]});if(!q[0])return c(f);if(1<q.length){r=!1;h=[];e=0;for(f=q.length;e<f;e++)k[e]=[];e=0;for(f=q.length;e<f;e++)for(g=n[e],p=0;p<g.length;p++){t=g[p];z=!0;for(y=0;y<q.length;y++)d(t.p,q[y].p)&&(e!==y&&h.push({froms:e,tos:y,hole:p}),z?(z=!1,k[y].push(t)):r=!0);z&&k[e].push(t)}0<h.length&&(r||(n=k))}r=0;for(e=q.length;r<e;r++)for(k=q[r].s,l.push(k),h=n[r],f=0,g=h.length;f<g;f++)k.holes.push(h[f].h);
	return l}});Object.assign(ee.prototype,{isFont:!0,generateShapes:function(a,b,c){void 0===b&&(b=100);void 0===c&&(c=4);var d=this.data;a=String(a).split("");var e=b/d.resolution,f=(d.boundingBox.yMax-d.boundingBox.yMin+d.underlineThickness)*e,g=0,h=0;b=[];for(var k=0;k<a.length;k++){var l=a[k];if("\n"===l)g=0,h-=f;else{var p;p=e;var q=g,n=h;if(l=d.glyphs[l]||d.glyphs["?"]){var t=new de,z=[],r,y,x,v,B,w,C,E;if(l.o)for(var D=l._cachedOutline||(l._cachedOutline=l.o.split(" ")),F=0,I=D.length;F<I;)switch(D[F++]){case "m":r=
	D[F++]*p+q;y=D[F++]*p+n;t.moveTo(r,y);break;case "l":r=D[F++]*p+q;y=D[F++]*p+n;t.lineTo(r,y);break;case "q":r=D[F++]*p+q;y=D[F++]*p+n;B=D[F++]*p+q;w=D[F++]*p+n;t.quadraticCurveTo(B,w,r,y);if(v=z[z.length-1]){x=v.x;v=v.y;for(var G=1;G<=c;G++){var J=G/c;xb(J,x,B,r);xb(J,v,w,y)}}break;case "b":if(r=D[F++]*p+q,y=D[F++]*p+n,B=D[F++]*p+q,w=D[F++]*p+n,C=D[F++]*p+q,E=D[F++]*p+n,t.bezierCurveTo(B,w,C,E,r,y),v=z[z.length-1])for(x=v.x,v=v.y,G=1;G<=c;G++)J=G/c,yb(J,x,B,C,r),yb(J,v,w,E,y)}p={offsetX:l.ha*p,path:t}}else p=
	void 0;g+=p.offsetX;b.push(p.path)}}c=[];d=0;for(a=b.length;d<a;d++)Array.prototype.push.apply(c,b[d].toShapes());return c}});Object.assign(Te.prototype,{load:function(a,b,c,d){var e=this;(new ta(this.manager)).load(a,function(a){var c;try{c=JSON.parse(a)}catch(d){console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),c=JSON.parse(a.substring(65,a.length-2))}a=e.parse(c);b&&b(a)},c,d)},parse:function(a){return new ee(a)}});var Od,ie={getContext:function(){void 0===
	Od&&(Od=new (window.AudioContext||window.webkitAudioContext));return Od},setContext:function(a){Od=a}};Object.assign(fe.prototype,{load:function(a,b,c,d){var e=new ta(this.manager);e.setResponseType("arraybuffer");e.load(a,function(a){ie.getContext().decodeAudioData(a,function(a){b(a)})},c,d)}});Object.assign(Ue.prototype,{update:function(){var a,b,c,d,e,f,g,h,k=new J,l=new J;return function(p){if(a!==this||b!==p.focus||c!==p.fov||d!==p.aspect*this.aspect||e!==p.near||f!==p.far||g!==p.zoom||h!==this.eyeSep){a=
	this;b=p.focus;c=p.fov;d=p.aspect*this.aspect;e=p.near;f=p.far;g=p.zoom;var q=p.projectionMatrix.clone();h=this.eyeSep/2;var n=h*e/b,t=e*Math.tan(X.DEG2RAD*c*.5)/g,z,r;l.elements[12]=-h;k.elements[12]=h;z=-t*d+n;r=t*d+n;q.elements[0]=2*e/(r-z);q.elements[8]=(r+z)/(r-z);this.cameraL.projectionMatrix.copy(q);z=-t*d-n;r=t*d-n;q.elements[0]=2*e/(r-z);q.elements[8]=(r+z)/(r-z);this.cameraR.projectionMatrix.copy(q)}this.cameraL.matrixWorld.copy(p.matrixWorld).multiply(l);this.cameraR.matrixWorld.copy(p.matrixWorld).multiply(k)}}()});
	Id.prototype=Object.create(B.prototype);Id.prototype.constructor=Id;ge.prototype=Object.assign(Object.create(wa.prototype),{constructor:ge,isArrayCamera:!0});he.prototype=Object.assign(Object.create(B.prototype),{constructor:he,getInput:function(){return this.gain},removeFilter:function(){null!==this.filter&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null)},getFilter:function(){return this.filter},setFilter:function(a){null!==
	this.filter?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination);this.filter=a;this.gain.connect(this.filter);this.filter.connect(this.context.destination)},getMasterVolume:function(){return this.gain.gain.value},setMasterVolume:function(a){this.gain.gain.value=a},updateMatrixWorld:function(){var a=new p,b=new pa,c=new p,d=new p;return function(e){B.prototype.updateMatrixWorld.call(this,e);e=this.context.listener;var f=
	this.up;this.matrixWorld.decompose(a,b,c);d.set(0,0,-1).applyQuaternion(b);e.positionX?(e.positionX.setValueAtTime(a.x,this.context.currentTime),e.positionY.setValueAtTime(a.y,this.context.currentTime),e.positionZ.setValueAtTime(a.z,this.context.currentTime),e.forwardX.setValueAtTime(d.x,this.context.currentTime),e.forwardY.setValueAtTime(d.y,this.context.currentTime),e.forwardZ.setValueAtTime(d.z,this.context.currentTime),e.upX.setValueAtTime(f.x,this.context.currentTime),e.upY.setValueAtTime(f.y,
	this.context.currentTime),e.upZ.setValueAtTime(f.z,this.context.currentTime)):(e.setPosition(a.x,a.y,a.z),e.setOrientation(d.x,d.y,d.z,f.x,f.y,f.z))}}()});jc.prototype=Object.assign(Object.create(B.prototype),{constructor:jc,getOutput:function(){return this.gain},setNodeSource:function(a){this.hasPlaybackControl=!1;this.sourceType="audioNode";this.source=a;this.connect();return this},setBuffer:function(a){this.buffer=a;this.sourceType="buffer";this.autoplay&&this.play();return this},play:function(){if(!0===
	this.isPlaying)console.warn("THREE.Audio: Audio is already playing.");else if(!1===this.hasPlaybackControl)console.warn("THREE.Audio: this Audio has no playback control.");else{var a=this.context.createBufferSource();a.buffer=this.buffer;a.loop=this.loop;a.onended=this.onEnded.bind(this);a.playbackRate.setValueAtTime(this.playbackRate,this.startTime);a.start(0,this.startTime);this.isPlaying=!0;this.source=a;return this.connect()}},pause:function(){if(!1===this.hasPlaybackControl)console.warn("THREE.Audio: this Audio has no playback control.");
	else return this.source.stop(),this.startTime=this.context.currentTime,this.isPlaying=!1,this},stop:function(){if(!1===this.hasPlaybackControl)console.warn("THREE.Audio: this Audio has no playback control.");else return this.source.stop(),this.startTime=0,this.isPlaying=!1,this},connect:function(){if(0<this.filters.length){this.source.connect(this.filters[0]);for(var a=1,b=this.filters.length;a<b;a++)this.filters[a-1].connect(this.filters[a]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());
	return this},disconnect:function(){if(0<this.filters.length){this.source.disconnect(this.filters[0]);for(var a=1,b=this.filters.length;a<b;a++)this.filters[a-1].disconnect(this.filters[a]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this},getFilters:function(){return this.filters},setFilters:function(a){a||(a=[]);!0===this.isPlaying?(this.disconnect(),this.filters=a,this.connect()):this.filters=a;return this},getFilter:function(){return this.getFilters()[0]},
	setFilter:function(a){return this.setFilters(a?[a]:[])},setPlaybackRate:function(a){if(!1===this.hasPlaybackControl)console.warn("THREE.Audio: this Audio has no playback control.");else return this.playbackRate=a,!0===this.isPlaying&&this.source.playbackRate.setValueAtTime(this.playbackRate,this.context.currentTime),this},getPlaybackRate:function(){return this.playbackRate},onEnded:function(){this.isPlaying=!1},getLoop:function(){return!1===this.hasPlaybackControl?(console.warn("THREE.Audio: this Audio has no playback control."),
	!1):this.loop},setLoop:function(a){if(!1===this.hasPlaybackControl)console.warn("THREE.Audio: this Audio has no playback control.");else return this.loop=a,!0===this.isPlaying&&(this.source.loop=this.loop),this},getVolume:function(){return this.gain.gain.value},setVolume:function(a){this.gain.gain.value=a;return this}});je.prototype=Object.assign(Object.create(jc.prototype),{constructor:je,getOutput:function(){return this.panner},getRefDistance:function(){return this.panner.refDistance},setRefDistance:function(a){this.panner.refDistance=
	a},getRolloffFactor:function(){return this.panner.rolloffFactor},setRolloffFactor:function(a){this.panner.rolloffFactor=a},getDistanceModel:function(){return this.panner.distanceModel},setDistanceModel:function(a){this.panner.distanceModel=a},getMaxDistance:function(){return this.panner.maxDistance},setMaxDistance:function(a){this.panner.maxDistance=a},updateMatrixWorld:function(){var a=new p;return function(b){B.prototype.updateMatrixWorld.call(this,b);a.setFromMatrixPosition(this.matrixWorld);this.panner.setPosition(a.x,
	a.y,a.z)}}()});Object.assign(ke.prototype,{getFrequencyData:function(){this.analyser.getByteFrequencyData(this.data);return this.data},getAverageFrequency:function(){for(var a=0,b=this.getFrequencyData(),c=0;c<b.length;c++)a+=b[c];return a/b.length}});Object.assign(le.prototype,{accumulate:function(a,b){var c=this.buffer,d=this.valueSize,e=a*d+d,f=this.cumulativeWeight;if(0===f){for(f=0;f!==d;++f)c[e+f]=c[f];f=b}else f+=b,this._mixBufferRegion(c,e,0,b/f,d);this.cumulativeWeight=f},apply:function(a){var b=
	this.valueSize,c=this.buffer;a=a*b+b;var d=this.cumulativeWeight,e=this.binding;this.cumulativeWeight=0;1>d&&this._mixBufferRegion(c,a,3*b,1-d,b);for(var d=b,f=b+b;d!==f;++d)if(c[d]!==c[d+b]){e.setValue(c,a);break}},saveOriginalState:function(){var a=this.buffer,b=this.valueSize,c=3*b;this.binding.getValue(a,c);for(var d=b;d!==c;++d)a[d]=a[c+d%b];this.cumulativeWeight=0},restoreOriginalState:function(){this.binding.setValue(this.buffer,3*this.valueSize)},_select:function(a,b,c,d,e){if(.5<=d)for(d=
	0;d!==e;++d)a[b+d]=a[c+d]},_slerp:function(a,b,c,d){pa.slerpFlat(a,b,a,b,a,c,d)},_lerp:function(a,b,c,d,e){for(var f=1-d,g=0;g!==e;++g){var h=b+g;a[h]=a[h]*f+a[c+g]*d}}});Object.assign(Ve.prototype,{getValue:function(a,b){this.bind();var c=this._bindings[this._targetGroup.nCachedObjects_];void 0!==c&&c.getValue(a,b)},setValue:function(a,b){for(var c=this._bindings,d=this._targetGroup.nCachedObjects_,e=c.length;d!==e;++d)c[d].setValue(a,b)},bind:function(){for(var a=this._bindings,b=this._targetGroup.nCachedObjects_,
	c=a.length;b!==c;++b)a[b].bind()},unbind:function(){for(var a=this._bindings,b=this._targetGroup.nCachedObjects_,c=a.length;b!==c;++b)a[b].unbind()}});Object.assign(na,{Composite:Ve,create:function(a,b,c){return a&&a.isAnimationObjectGroup?new na.Composite(a,b,c):new na(a,b,c)},parseTrackName:function(){var a=new RegExp("^"+/((?:[\w-]+[\/:])*)/.source+/([\w-\.]+)?/.source+/(?:\.([\w-]+)(?:\[(.+)\])?)?/.source+/\.([\w-]+)(?:\[(.+)\])?/.source+"$"),b=["material","materials","bones"];return function(c){var d=
	a.exec(c);if(!d)throw Error("PropertyBinding: Cannot parse trackName: "+c);var d={nodeName:d[2],objectName:d[3],objectIndex:d[4],propertyName:d[5],propertyIndex:d[6]},e=d.nodeName&&d.nodeName.lastIndexOf(".");if(void 0!==e&&-1!==e){var f=d.nodeName.substring(e+1);-1!==b.indexOf(f)&&(d.nodeName=d.nodeName.substring(0,e),d.objectName=f)}if(null===d.propertyName||0===d.propertyName.length)throw Error("PropertyBinding: can not parse propertyName from trackName: "+c);return d}}(),findNode:function(a,b){if(!b||
	""===b||"root"===b||"."===b||-1===b||b===a.name||b===a.uuid)return a;if(a.skeleton){var c=function(a){for(var c=0;c<a.bones.length;c++){var d=a.bones[c];if(d.name===b)return d}return null}(a.skeleton);if(c)return c}if(a.children){var d=function(a){for(var c=0;c<a.length;c++){var g=a[c];if(g.name===b||g.uuid===b||(g=d(g.children)))return g}return null};if(c=d(a.children))return c}return null}});Object.assign(na.prototype,{_getValue_unavailable:function(){},_setValue_unavailable:function(){},BindingType:{Direct:0,
	EntireArray:1,ArrayElement:2,HasFromToArray:3},Versioning:{None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},GetterByBindingType:[function(a,b){a[b]=this.node[this.propertyName]},function(a,b){for(var c=this.resolvedProperty,d=0,e=c.length;d!==e;++d)a[b++]=c[d]},function(a,b){a[b]=this.resolvedProperty[this.propertyIndex]},function(a,b){this.resolvedProperty.toArray(a,b)}],SetterByBindingTypeAndVersioning:[[function(a,b){this.node[this.propertyName]=a[b]},function(a,b){this.node[this.propertyName]=a[b];
	this.targetObject.needsUpdate=!0},function(a,b){this.node[this.propertyName]=a[b];this.targetObject.matrixWorldNeedsUpdate=!0}],[function(a,b){for(var c=this.resolvedProperty,d=0,e=c.length;d!==e;++d)c[d]=a[b++]},function(a,b){for(var c=this.resolvedProperty,d=0,e=c.length;d!==e;++d)c[d]=a[b++];this.targetObject.needsUpdate=!0},function(a,b){for(var c=this.resolvedProperty,d=0,e=c.length;d!==e;++d)c[d]=a[b++];this.targetObject.matrixWorldNeedsUpdate=!0}],[function(a,b){this.resolvedProperty[this.propertyIndex]=
	a[b]},function(a,b){this.resolvedProperty[this.propertyIndex]=a[b];this.targetObject.needsUpdate=!0},function(a,b){this.resolvedProperty[this.propertyIndex]=a[b];this.targetObject.matrixWorldNeedsUpdate=!0}],[function(a,b){this.resolvedProperty.fromArray(a,b)},function(a,b){this.resolvedProperty.fromArray(a,b);this.targetObject.needsUpdate=!0},function(a,b){this.resolvedProperty.fromArray(a,b);this.targetObject.matrixWorldNeedsUpdate=!0}]],getValue:function(a,b){this.bind();this.getValue(a,b)},setValue:function(a,
	b){this.bind();this.setValue(a,b)},bind:function(){var a=this.node,b=this.parsedPath,c=b.objectName,d=b.propertyName,e=b.propertyIndex;a||(this.node=a=na.findNode(this.rootNode,b.nodeName)||this.rootNode);this.getValue=this._getValue_unavailable;this.setValue=this._setValue_unavailable;if(a){if(c){var f=b.objectIndex;switch(c){case "materials":if(!a.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!a.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",
	this);return}a=a.material.materials;break;case "bones":if(!a.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}a=a.skeleton.bones;for(c=0;c<a.length;c++)if(a[c].name===f){f=c;break}break;default:if(void 0===a[c]){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}a=a[c]}if(void 0!==f){if(void 0===a[f]){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",
	this,a);return}a=a[f]}}f=a[d];if(void 0===f)console.error("THREE.PropertyBinding: Trying to update property for track: "+b.nodeName+"."+d+" but it wasn't found.",a);else{b=this.Versioning.None;void 0!==a.needsUpdate?(b=this.Versioning.NeedsUpdate,this.targetObject=a):void 0!==a.matrixWorldNeedsUpdate&&(b=this.Versioning.MatrixWorldNeedsUpdate,this.targetObject=a);c=this.BindingType.Direct;if(void 0!==e){if("morphTargetInfluences"===d){if(!a.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",
	this);return}if(a.geometry.isBufferGeometry){if(!a.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}for(c=0;c<this.node.geometry.morphAttributes.position.length;c++)if(a.geometry.morphAttributes.position[c].name===e){e=c;break}}else{if(!a.geometry.morphTargets){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.",
	this);return}for(c=0;c<this.node.geometry.morphTargets.length;c++)if(a.geometry.morphTargets[c].name===e){e=c;break}}}c=this.BindingType.ArrayElement;this.resolvedProperty=f;this.propertyIndex=e}else void 0!==f.fromArray&&void 0!==f.toArray?(c=this.BindingType.HasFromToArray,this.resolvedProperty=f):Array.isArray(f)?(c=this.BindingType.EntireArray,this.resolvedProperty=f):this.propertyName=d;this.getValue=this.GetterByBindingType[c];this.setValue=this.SetterByBindingTypeAndVersioning[c][b]}}else console.error("THREE.PropertyBinding: Trying to update node for track: "+
	this.path+" but it wasn't found.")},unbind:function(){this.node=null;this.getValue=this._getValue_unbound;this.setValue=this._setValue_unbound}});Object.assign(na.prototype,{_getValue_unbound:na.prototype.getValue,_setValue_unbound:na.prototype.setValue});Object.assign(We.prototype,{isAnimationObjectGroup:!0,add:function(a){for(var b=this._objects,c=b.length,d=this.nCachedObjects_,e=this._indicesByUUID,f=this._paths,g=this._parsedPaths,h=this._bindings,k=h.length,l=0,p=arguments.length;l!==p;++l){var q=
	arguments[l],n=q.uuid,t=e[n];if(void 0===t){t=c++;e[n]=t;b.push(q);for(var n=0,z=k;n!==z;++n)h[n].push(new na(q,f[n],g[n]))}else if(t<d){var r=--d,z=b[r];e[z.uuid]=t;b[t]=z;e[n]=r;b[r]=q;n=0;for(z=k;n!==z;++n){var y=h[n],x=y[t];y[t]=y[r];void 0===x&&(x=new na(q,f[n],g[n]));y[r]=x}}else void 0!==b[t]&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=d},remove:function(a){for(var b=
	this._objects,c=this.nCachedObjects_,d=this._indicesByUUID,e=this._bindings,f=e.length,g=0,h=arguments.length;g!==h;++g){var k=arguments[g],l=k.uuid,p=d[l];if(void 0!==p&&p>=c){var q=c++,n=b[q];d[n.uuid]=p;b[p]=n;d[l]=q;b[q]=k;k=0;for(l=f;k!==l;++k){var n=e[k],t=n[p];n[p]=n[q];n[q]=t}}}this.nCachedObjects_=c},uncache:function(a){for(var b=this._objects,c=b.length,d=this.nCachedObjects_,e=this._indicesByUUID,f=this._bindings,g=f.length,h=0,k=arguments.length;h!==k;++h){var l=arguments[h].uuid,p=e[l];
	if(void 0!==p)if(delete e[l],p<d){var l=--d,q=b[l],n=--c,t=b[n];e[q.uuid]=p;b[p]=q;e[t.uuid]=l;b[l]=t;b.pop();q=0;for(t=g;q!==t;++q){var z=f[q],r=z[n];z[p]=z[l];z[l]=r;z.pop()}}else for(n=--c,t=b[n],e[t.uuid]=p,b[p]=t,b.pop(),q=0,t=g;q!==t;++q)z=f[q],z[p]=z[n],z.pop()}this.nCachedObjects_=d},subscribe_:function(a,b){var c=this._bindingsIndicesByPath,d=c[a],e=this._bindings;if(void 0!==d)return e[d];var f=this._paths,g=this._parsedPaths,h=this._objects,k=this.nCachedObjects_,l=Array(h.length),d=e.length;
	c[a]=d;f.push(a);g.push(b);e.push(l);c=k;for(d=h.length;c!==d;++c)l[c]=new na(h[c],a,b);return l},unsubscribe_:function(a){var b=this._bindingsIndicesByPath,c=b[a];if(void 0!==c){var d=this._paths,e=this._parsedPaths,f=this._bindings,g=f.length-1,h=f[g];b[a[g]]=c;f[c]=h;f.pop();e[c]=e[g];e.pop();d[c]=d[g];d.pop()}}});Object.assign(Xe.prototype,{play:function(){this._mixer._activateAction(this);return this},stop:function(){this._mixer._deactivateAction(this);return this.reset()},reset:function(){this.paused=
	!1;this.enabled=!0;this.time=0;this._loopCount=-1;this._startTime=null;return this.stopFading().stopWarping()},isRunning:function(){return this.enabled&&!this.paused&&0!==this.timeScale&&null===this._startTime&&this._mixer._isActiveAction(this)},isScheduled:function(){return this._mixer._isActiveAction(this)},startAt:function(a){this._startTime=a;return this},setLoop:function(a,b){this.loop=a;this.repetitions=b;return this},setEffectiveWeight:function(a){this.weight=a;this._effectiveWeight=this.enabled?
	a:0;return this.stopFading()},getEffectiveWeight:function(){return this._effectiveWeight},fadeIn:function(a){return this._scheduleFading(a,0,1)},fadeOut:function(a){return this._scheduleFading(a,1,0)},crossFadeFrom:function(a,b,c){a.fadeOut(b);this.fadeIn(b);if(c){c=this._clip.duration;var d=a._clip.duration,e=c/d;a.warp(1,d/c,b);this.warp(e,1,b)}return this},crossFadeTo:function(a,b,c){return a.crossFadeFrom(this,b,c)},stopFading:function(){var a=this._weightInterpolant;null!==a&&(this._weightInterpolant=
	null,this._mixer._takeBackControlInterpolant(a));return this},setEffectiveTimeScale:function(a){this.timeScale=a;this._effectiveTimeScale=this.paused?0:a;return this.stopWarping()},getEffectiveTimeScale:function(){return this._effectiveTimeScale},setDuration:function(a){this.timeScale=this._clip.duration/a;return this.stopWarping()},syncWith:function(a){this.time=a.time;this.timeScale=a.timeScale;return this.stopWarping()},halt:function(a){return this.warp(this._effectiveTimeScale,0,a)},warp:function(a,
	b,c){var d=this._mixer,e=d.time,f=this._timeScaleInterpolant,g=this.timeScale;null===f&&(this._timeScaleInterpolant=f=d._lendControlInterpolant());d=f.parameterPositions;f=f.sampleValues;d[0]=e;d[1]=e+c;f[0]=a/g;f[1]=b/g;return this},stopWarping:function(){var a=this._timeScaleInterpolant;null!==a&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(a));return this},getMixer:function(){return this._mixer},getClip:function(){return this._clip},getRoot:function(){return this._localRoot||
	this._mixer._root},_update:function(a,b,c,d){if(this.enabled){var e=this._startTime;if(null!==e){b=(a-e)*c;if(0>b||0===c)return;this._startTime=null;b*=c}b*=this._updateTimeScale(a);c=this._updateTime(b);a=this._updateWeight(a);if(0<a){b=this._interpolants;for(var e=this._propertyBindings,f=0,g=b.length;f!==g;++f)b[f].evaluate(c),e[f].accumulate(d,a)}}else this._updateWeight(a)},_updateWeight:function(a){var b=0;if(this.enabled){var b=this.weight,c=this._weightInterpolant;if(null!==c){var d=c.evaluate(a)[0],
	b=b*d;a>c.parameterPositions[1]&&(this.stopFading(),0===d&&(this.enabled=!1))}}return this._effectiveWeight=b},_updateTimeScale:function(a){var b=0;if(!this.paused){var b=this.timeScale,c=this._timeScaleInterpolant;if(null!==c){var d=c.evaluate(a)[0],b=b*d;a>c.parameterPositions[1]&&(this.stopWarping(),0===b?this.paused=!0:this.timeScale=b)}}return this._effectiveTimeScale=b},_updateTime:function(a){var b=this.time+a;if(0===a)return b;var c=this._clip.duration,d=this.loop,e=this._loopCount;if(2200===
	d)a:{if(-1===e&&(this._loopCount=0,this._setEndings(!0,!0,!1)),b>=c)b=c;else if(0>b)b=0;else break a;this.clampWhenFinished?this.paused=!0:this.enabled=!1;this._mixer.dispatchEvent({type:"finished",action:this,direction:0>a?-1:1})}else{d=2202===d;-1===e&&(0<=a?(e=0,this._setEndings(!0,0===this.repetitions,d)):this._setEndings(0===this.repetitions,!0,d));if(b>=c||0>b){var f=Math.floor(b/c),b=b-c*f,e=e+Math.abs(f),g=this.repetitions-e;0>g?(this.clampWhenFinished?this.paused=!0:this.enabled=!1,b=0<a?
	c:0,this._mixer.dispatchEvent({type:"finished",action:this,direction:0<a?1:-1})):(0===g?(a=0>a,this._setEndings(a,!a,d)):this._setEndings(!1,!1,d),this._loopCount=e,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:f}))}if(d&&1===(e&1))return this.time=b,c-b}return this.time=b},_setEndings:function(a,b,c){var d=this._interpolantSettings;c?(d.endingStart=2401,d.endingEnd=2401):(d.endingStart=a?this.zeroSlopeAtStart?2401:2400:2402,d.endingEnd=b?this.zeroSlopeAtEnd?2401:2400:2402)},_scheduleFading:function(a,
	b,c){var d=this._mixer,e=d.time,f=this._weightInterpolant;null===f&&(this._weightInterpolant=f=d._lendControlInterpolant());d=f.parameterPositions;f=f.sampleValues;d[0]=e;f[0]=b;d[1]=e+a;f[1]=c;return this}});Object.assign(Ye.prototype,ra.prototype,{_bindAction:function(a,b){var c=a._localRoot||this._root,d=a._clip.tracks,e=d.length,f=a._propertyBindings,g=a._interpolants,h=c.uuid,k=this._bindingsByRootAndName,l=k[h];void 0===l&&(l={},k[h]=l);for(k=0;k!==e;++k){var p=d[k],q=p.name,n=l[q];if(void 0===
	n){n=f[k];if(void 0!==n){null===n._cacheIndex&&(++n.referenceCount,this._addInactiveBinding(n,h,q));continue}n=new le(na.create(c,q,b&&b._propertyBindings[k].binding.parsedPath),p.ValueTypeName,p.getValueSize());++n.referenceCount;this._addInactiveBinding(n,h,q)}f[k]=n;g[k].resultBuffer=n.buffer}},_activateAction:function(a){if(!this._isActiveAction(a)){if(null===a._cacheIndex){var b=(a._localRoot||this._root).uuid,c=a._clip.uuid,d=this._actionsByClip[c];this._bindAction(a,d&&d.knownActions[0]);this._addInactiveAction(a,
	c,b)}b=a._propertyBindings;c=0;for(d=b.length;c!==d;++c){var e=b[c];0===e.useCount++&&(this._lendBinding(e),e.saveOriginalState())}this._lendAction(a)}},_deactivateAction:function(a){if(this._isActiveAction(a)){for(var b=a._propertyBindings,c=0,d=b.length;c!==d;++c){var e=b[c];0===--e.useCount&&(e.restoreOriginalState(),this._takeBackBinding(e))}this._takeBackAction(a)}},_initMemoryManager:function(){this._actions=[];this._nActiveActions=0;this._actionsByClip={};this._bindings=[];this._nActiveBindings=
	0;this._bindingsByRootAndName={};this._controlInterpolants=[];this._nActiveControlInterpolants=0;var a=this;this.stats={actions:{get total(){return a._actions.length},get inUse(){return a._nActiveActions}},bindings:{get total(){return a._bindings.length},get inUse(){return a._nActiveBindings}},controlInterpolants:{get total(){return a._controlInterpolants.length},get inUse(){return a._nActiveControlInterpolants}}}},_isActiveAction:function(a){a=a._cacheIndex;return null!==a&&a<this._nActiveActions},
	_addInactiveAction:function(a,b,c){var d=this._actions,e=this._actionsByClip,f=e[b];void 0===f?(f={knownActions:[a],actionByRoot:{}},a._byClipCacheIndex=0,e[b]=f):(b=f.knownActions,a._byClipCacheIndex=b.length,b.push(a));a._cacheIndex=d.length;d.push(a);f.actionByRoot[c]=a},_removeInactiveAction:function(a){var b=this._actions,c=b[b.length-1],d=a._cacheIndex;c._cacheIndex=d;b[d]=c;b.pop();a._cacheIndex=null;var b=a._clip.uuid,c=this._actionsByClip,d=c[b],e=d.knownActions,f=e[e.length-1],g=a._byClipCacheIndex;
	f._byClipCacheIndex=g;e[g]=f;e.pop();a._byClipCacheIndex=null;delete d.actionByRoot[(a._localRoot||this._root).uuid];0===e.length&&delete c[b];this._removeInactiveBindingsForAction(a)},_removeInactiveBindingsForAction:function(a){a=a._propertyBindings;for(var b=0,c=a.length;b!==c;++b){var d=a[b];0===--d.referenceCount&&this._removeInactiveBinding(d)}},_lendAction:function(a){var b=this._actions,c=a._cacheIndex,d=this._nActiveActions++,e=b[d];a._cacheIndex=d;b[d]=a;e._cacheIndex=c;b[c]=e},_takeBackAction:function(a){var b=
	this._actions,c=a._cacheIndex,d=--this._nActiveActions,e=b[d];a._cacheIndex=d;b[d]=a;e._cacheIndex=c;b[c]=e},_addInactiveBinding:function(a,b,c){var d=this._bindingsByRootAndName,e=d[b],f=this._bindings;void 0===e&&(e={},d[b]=e);e[c]=a;a._cacheIndex=f.length;f.push(a)},_removeInactiveBinding:function(a){var b=this._bindings,c=a.binding,d=c.rootNode.uuid,c=c.path,e=this._bindingsByRootAndName,f=e[d],g=b[b.length-1];a=a._cacheIndex;g._cacheIndex=a;b[a]=g;b.pop();delete f[c];a:{for(var h in f)break a;
	delete e[d]}},_lendBinding:function(a){var b=this._bindings,c=a._cacheIndex,d=this._nActiveBindings++,e=b[d];a._cacheIndex=d;b[d]=a;e._cacheIndex=c;b[c]=e},_takeBackBinding:function(a){var b=this._bindings,c=a._cacheIndex,d=--this._nActiveBindings,e=b[d];a._cacheIndex=d;b[d]=a;e._cacheIndex=c;b[c]=e},_lendControlInterpolant:function(){var a=this._controlInterpolants,b=this._nActiveControlInterpolants++,c=a[b];void 0===c&&(c=new Wc(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),
	c.__cacheIndex=b,a[b]=c);return c},_takeBackControlInterpolant:function(a){var b=this._controlInterpolants,c=a.__cacheIndex,d=--this._nActiveControlInterpolants,e=b[d];a.__cacheIndex=d;b[d]=a;e.__cacheIndex=c;b[c]=e},_controlInterpolantsResultBuffer:new Float32Array(1),clipAction:function(a,b){var c=b||this._root,d=c.uuid,e="string"===typeof a?Aa.findByName(c,a):a,c=null!==e?e.uuid:a,f=this._actionsByClip[c],g=null;if(void 0!==f){g=f.actionByRoot[d];if(void 0!==g)return g;g=f.knownActions[0];null===
	e&&(e=g._clip)}if(null===e)return null;e=new Xe(this,e,b);this._bindAction(e,g);this._addInactiveAction(e,c,d);return e},existingAction:function(a,b){var c=b||this._root,d=c.uuid,c="string"===typeof a?Aa.findByName(c,a):a,c=this._actionsByClip[c?c.uuid:a];return void 0!==c?c.actionByRoot[d]||null:null},stopAllAction:function(){for(var a=this._actions,b=this._nActiveActions,c=this._bindings,d=this._nActiveBindings,e=this._nActiveBindings=this._nActiveActions=0;e!==b;++e)a[e].reset();for(e=0;e!==d;++e)c[e].useCount=
	0;return this},update:function(a){a*=this.timeScale;for(var b=this._actions,c=this._nActiveActions,d=this.time+=a,e=Math.sign(a),f=this._accuIndex^=1,g=0;g!==c;++g)b[g]._update(d,a,e,f);a=this._bindings;b=this._nActiveBindings;for(g=0;g!==b;++g)a[g].apply(f);return this},getRoot:function(){return this._root},uncacheClip:function(a){var b=this._actions;a=a.uuid;var c=this._actionsByClip,d=c[a];if(void 0!==d){for(var d=d.knownActions,e=0,f=d.length;e!==f;++e){var g=d[e];this._deactivateAction(g);var h=
	g._cacheIndex,k=b[b.length-1];g._cacheIndex=null;g._byClipCacheIndex=null;k._cacheIndex=h;b[h]=k;b.pop();this._removeInactiveBindingsForAction(g)}delete c[a]}},uncacheRoot:function(a){a=a.uuid;var b=this._actionsByClip,c;for(c in b){var d=b[c].actionByRoot[a];void 0!==d&&(this._deactivateAction(d),this._removeInactiveAction(d))}c=this._bindingsByRootAndName[a];if(void 0!==c)for(var e in c)a=c[e],a.restoreOriginalState(),this._removeInactiveBinding(a)},uncacheAction:function(a,b){var c=this.existingAction(a,
	b);null!==c&&(this._deactivateAction(c),this._removeInactiveAction(c))}});Jd.prototype.clone=function(){return new Jd(void 0===this.value.clone?this.value:this.value.clone())};me.prototype=Object.assign(Object.create(I.prototype),{constructor:me,isInstancedBufferGeometry:!0,addGroup:function(a,b,c){this.groups.push({start:a,count:b,materialIndex:c})},copy:function(a){var b=a.index;null!==b&&this.setIndex(b.clone());var b=a.attributes,c;for(c in b)this.addAttribute(c,b[c].clone());a=a.groups;c=0;for(b=
	a.length;c<b;c++){var d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}return this}});Object.defineProperties(ne.prototype,{count:{get:function(){return this.data.count}},array:{get:function(){return this.data.array}}});Object.assign(ne.prototype,{isInterleavedBufferAttribute:!0,setX:function(a,b){this.data.array[a*this.data.stride+this.offset]=b;return this},setY:function(a,b){this.data.array[a*this.data.stride+this.offset+1]=b;return this},setZ:function(a,b){this.data.array[a*this.data.stride+
	this.offset+2]=b;return this},setW:function(a,b){this.data.array[a*this.data.stride+this.offset+3]=b;return this},getX:function(a){return this.data.array[a*this.data.stride+this.offset]},getY:function(a){return this.data.array[a*this.data.stride+this.offset+1]},getZ:function(a){return this.data.array[a*this.data.stride+this.offset+2]},getW:function(a){return this.data.array[a*this.data.stride+this.offset+3]},setXY:function(a,b,c){a=a*this.data.stride+this.offset;this.data.array[a+0]=b;this.data.array[a+
	1]=c;return this},setXYZ:function(a,b,c,d){a=a*this.data.stride+this.offset;this.data.array[a+0]=b;this.data.array[a+1]=c;this.data.array[a+2]=d;return this},setXYZW:function(a,b,c,d,e){a=a*this.data.stride+this.offset;this.data.array[a+0]=b;this.data.array[a+1]=c;this.data.array[a+2]=d;this.data.array[a+3]=e;return this}});Object.defineProperty(kc.prototype,"needsUpdate",{set:function(a){!0===a&&this.version++}});Object.assign(kc.prototype,{isInterleavedBuffer:!0,setArray:function(a){if(Array.isArray(a))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
	this.count=void 0!==a?a.length/this.stride:0;this.array=a},setDynamic:function(a){this.dynamic=a;return this},copy:function(a){this.array=new a.array.constructor(a.array);this.count=a.count;this.stride=a.stride;this.dynamic=a.dynamic;return this},copyAt:function(a,b,c){a*=this.stride;c*=b.stride;for(var d=0,e=this.stride;d<e;d++)this.array[a+d]=b.array[c+d];return this},set:function(a,b){void 0===b&&(b=0);this.array.set(a,b);return this},clone:function(){return(new this.constructor).copy(this)},onUpload:function(a){this.onUploadCallback=
	a;return this}});oe.prototype=Object.assign(Object.create(kc.prototype),{constructor:oe,isInstancedInterleavedBuffer:!0,copy:function(a){kc.prototype.copy.call(this,a);this.meshPerAttribute=a.meshPerAttribute;return this}});pe.prototype=Object.assign(Object.create(L.prototype),{constructor:pe,isInstancedBufferAttribute:!0,copy:function(a){L.prototype.copy.call(this,a);this.meshPerAttribute=a.meshPerAttribute;return this}});Object.assign(Ze.prototype,{linePrecision:1,set:function(a,b){this.ray.set(a,
	b)},setFromCamera:function(a,b){b&&b.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(b.matrixWorld),this.ray.direction.set(a.x,a.y,.5).unproject(b).sub(this.ray.origin).normalize()):b&&b.isOrthographicCamera?(this.ray.origin.set(a.x,a.y,(b.near+b.far)/(b.near-b.far)).unproject(b),this.ray.direction.set(0,0,-1).transformDirection(b.matrixWorld)):console.error("THREE.Raycaster: Unsupported camera type.")},intersectObject:function(a,b){var c=[];qe(a,this,c,b);c.sort($e);return c},intersectObjects:function(a,
	b){var c=[];if(!1===Array.isArray(a))return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."),c;for(var d=0,e=a.length;d<e;d++)qe(a[d],this,c,b);c.sort($e);return c}});Object.assign(af.prototype,{start:function(){this.oldTime=this.startTime=("undefined"===typeof performance?Date:performance).now();this.elapsedTime=0;this.running=!0},stop:function(){this.getElapsedTime();this.running=!1},getElapsedTime:function(){this.getDelta();return this.elapsedTime},getDelta:function(){var a=
	0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){var b=("undefined"===typeof performance?Date:performance).now(),a=(b-this.oldTime)/1E3;this.oldTime=b;this.elapsedTime+=a}return a}});Object.assign(bf.prototype,{set:function(a,b,c){this.radius=a;this.phi=b;this.theta=c;return this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.radius=a.radius;this.phi=a.phi;this.theta=a.theta;return this},makeSafe:function(){this.phi=Math.max(1E-6,Math.min(Math.PI-
	1E-6,this.phi));return this},setFromVector3:function(a){this.radius=a.length();0===this.radius?this.phi=this.theta=0:(this.theta=Math.atan2(a.x,a.z),this.phi=Math.acos(X.clamp(a.y/this.radius,-1,1)));return this}});Object.assign(cf.prototype,{set:function(a,b,c){this.radius=a;this.theta=b;this.y=c;return this},clone:function(){return(new this.constructor).copy(this)},copy:function(a){this.radius=a.radius;this.theta=a.theta;this.y=a.y;return this},setFromVector3:function(a){this.radius=Math.sqrt(a.x*
	a.x+a.z*a.z);this.theta=Math.atan2(a.x,a.z);this.y=a.y;return this}});qa.prototype=Object.create(Ba.prototype);qa.prototype.constructor=qa;qa.prototype.createAnimation=function(a,b,c,d){b={start:b,end:c,length:c-b+1,fps:d,duration:(c-b)/d,lastFrame:0,currentFrame:0,active:!1,time:0,direction:1,weight:1,directionBackwards:!1,mirroredLoop:!1};this.animationsMap[a]=b;this.animationsList.push(b)};qa.prototype.autoCreateAnimations=function(a){for(var b=/([a-z]+)_?(\d+)/i,c,d={},e=this.geometry,f=0,g=e.morphTargets.length;f<
	g;f++){var h=e.morphTargets[f].name.match(b);if(h&&1<h.length){var k=h[1];d[k]||(d[k]={start:Infinity,end:-Infinity});h=d[k];f<h.start&&(h.start=f);f>h.end&&(h.end=f);c||(c=k)}}for(k in d)h=d[k],this.createAnimation(k,h.start,h.end,a);this.firstAnimation=c};qa.prototype.setAnimationDirectionForward=function(a){if(a=this.animationsMap[a])a.direction=1,a.directionBackwards=!1};qa.prototype.setAnimationDirectionBackward=function(a){if(a=this.animationsMap[a])a.direction=-1,a.directionBackwards=!0};qa.prototype.setAnimationFPS=
	function(a,b){var c=this.animationsMap[a];c&&(c.fps=b,c.duration=(c.end-c.start)/c.fps)};qa.prototype.setAnimationDuration=function(a,b){var c=this.animationsMap[a];c&&(c.duration=b,c.fps=(c.end-c.start)/c.duration)};qa.prototype.setAnimationWeight=function(a,b){var c=this.animationsMap[a];c&&(c.weight=b)};qa.prototype.setAnimationTime=function(a,b){var c=this.animationsMap[a];c&&(c.time=b)};qa.prototype.getAnimationTime=function(a){var b=0;if(a=this.animationsMap[a])b=a.time;return b};qa.prototype.getAnimationDuration=
	function(a){var b=-1;if(a=this.animationsMap[a])b=a.duration;return b};qa.prototype.playAnimation=function(a){var b=this.animationsMap[a];b?(b.time=0,b.active=!0):console.warn("THREE.MorphBlendMesh: animation["+a+"] undefined in .playAnimation()")};qa.prototype.stopAnimation=function(a){if(a=this.animationsMap[a])a.active=!1};qa.prototype.update=function(a){for(var b=0,c=this.animationsList.length;b<c;b++){var d=this.animationsList[b];if(d.active){var e=d.duration/d.length;d.time+=d.direction*a;if(d.mirroredLoop){if(d.time>
	d.duration||0>d.time)d.direction*=-1,d.time>d.duration&&(d.time=d.duration,d.directionBackwards=!0),0>d.time&&(d.time=0,d.directionBackwards=!1)}else d.time%=d.duration,0>d.time&&(d.time+=d.duration);var f=d.start+X.clamp(Math.floor(d.time/e),0,d.length-1),g=d.weight;f!==d.currentFrame&&(this.morphTargetInfluences[d.lastFrame]=0,this.morphTargetInfluences[d.currentFrame]=1*g,this.morphTargetInfluences[f]=0,d.lastFrame=d.currentFrame,d.currentFrame=f);e=d.time%e/e;d.directionBackwards&&(e=1-e);d.currentFrame!==
	d.lastFrame?(this.morphTargetInfluences[d.currentFrame]=e*g,this.morphTargetInfluences[d.lastFrame]=(1-e)*g):this.morphTargetInfluences[d.currentFrame]=g}}};$c.prototype=Object.create(B.prototype);$c.prototype.constructor=$c;$c.prototype.isImmediateRenderObject=!0;ad.prototype=Object.create(Z.prototype);ad.prototype.constructor=ad;ad.prototype.update=function(){var a=new p,b=new p,c=new Ka;return function(){var d=["a","b","c"];this.object.updateMatrixWorld(!0);c.getNormalMatrix(this.object.matrixWorld);
	var e=this.object.matrixWorld,f=this.geometry.attributes.position,g=this.object.geometry;if(g&&g.isGeometry)for(var h=g.vertices,k=g.faces,l=g=0,p=k.length;l<p;l++)for(var q=k[l],n=0,t=q.vertexNormals.length;n<t;n++){var z=q.vertexNormals[n];a.copy(h[q[d[n]]]).applyMatrix4(e);b.copy(z).applyMatrix3(c).normalize().multiplyScalar(this.size).add(a);f.setXYZ(g,a.x,a.y,a.z);g+=1;f.setXYZ(g,b.x,b.y,b.z);g+=1}else if(g&&g.isBufferGeometry)for(d=g.attributes.position,h=g.attributes.normal,n=g=0,t=d.count;n<
	t;n++)a.set(d.getX(n),d.getY(n),d.getZ(n)).applyMatrix4(e),b.set(h.getX(n),h.getY(n),h.getZ(n)),b.applyMatrix3(c).normalize().multiplyScalar(this.size).add(a),f.setXYZ(g,a.x,a.y,a.z),g+=1,f.setXYZ(g,b.x,b.y,b.z),g+=1;f.needsUpdate=!0}}();lc.prototype=Object.create(B.prototype);lc.prototype.constructor=lc;lc.prototype.dispose=function(){this.cone.geometry.dispose();this.cone.material.dispose()};lc.prototype.update=function(){var a=new p,b=new p;return function(){this.light.updateMatrixWorld();var c=
	this.light.distance?this.light.distance:1E3,d=c*Math.tan(this.light.angle);this.cone.scale.set(d,d,c);a.setFromMatrixPosition(this.light.matrixWorld);b.setFromMatrixPosition(this.light.target.matrixWorld);this.cone.lookAt(b.sub(a));this.cone.material.color.copy(this.light.color)}}();mc.prototype=Object.create(Z.prototype);mc.prototype.constructor=mc;mc.prototype.onBeforeRender=function(){var a=new p,b=new J,c=new J;return function(){var d=this.bones,e=this.geometry,f=e.getAttribute("position");c.getInverse(this.root.matrixWorld);
	for(var g=0,h=0;g<d.length;g++){var k=d[g];k.parent&&k.parent.isBone&&(b.multiplyMatrices(c,k.matrixWorld),a.setFromMatrixPosition(b),f.setXYZ(h,a.x,a.y,a.z),b.multiplyMatrices(c,k.parent.matrixWorld),a.setFromMatrixPosition(b),f.setXYZ(h+1,a.x,a.y,a.z),h+=2)}e.getAttribute("position").needsUpdate=!0}}();nc.prototype=Object.create(Ba.prototype);nc.prototype.constructor=nc;nc.prototype.dispose=function(){this.geometry.dispose();this.material.dispose()};nc.prototype.update=function(){this.material.color.copy(this.light.color)};
	oc.prototype=Object.create(B.prototype);oc.prototype.constructor=oc;oc.prototype.dispose=function(){this.children[0].geometry.dispose();this.children[0].material.dispose()};oc.prototype.update=function(){var a=this.children[0];a.material.color.copy(this.light.color);var b=.5*this.light.width,c=.5*this.light.height,a=a.geometry.attributes.position,d=a.array;d[0]=b;d[1]=-c;d[2]=0;d[3]=b;d[4]=c;d[5]=0;d[6]=-b;d[7]=c;d[8]=0;d[9]=-b;d[10]=-c;d[11]=0;d[12]=b;d[13]=-c;d[14]=0;a.needsUpdate=!0};pc.prototype=
	Object.create(B.prototype);pc.prototype.constructor=pc;pc.prototype.dispose=function(){this.children[0].geometry.dispose();this.children[0].material.dispose()};pc.prototype.update=function(){var a=new p,b=new G,c=new G;return function(){var d=this.children[0],e=d.geometry.getAttribute("color");b.copy(this.light.color);c.copy(this.light.groundColor);for(var f=0,g=e.count;f<g;f++){var h=f<g/2?b:c;e.setXYZ(f,h.r,h.g,h.b)}d.lookAt(a.setFromMatrixPosition(this.light.matrixWorld).negate());e.needsUpdate=
	!0}}();bd.prototype=Object.create(Z.prototype);bd.prototype.constructor=bd;Kd.prototype=Object.create(Z.prototype);Kd.prototype.constructor=Kd;cd.prototype=Object.create(Z.prototype);cd.prototype.constructor=cd;cd.prototype.update=function(){var a=new p,b=new p,c=new Ka;return function(){this.object.updateMatrixWorld(!0);c.getNormalMatrix(this.object.matrixWorld);for(var d=this.object.matrixWorld,e=this.geometry.attributes.position,f=this.object.geometry,g=f.vertices,f=f.faces,h=0,k=0,l=f.length;k<
	l;k++){var p=f[k],q=p.normal;a.copy(g[p.a]).add(g[p.b]).add(g[p.c]).divideScalar(3).applyMatrix4(d);b.copy(q).applyMatrix3(c).normalize().multiplyScalar(this.size).add(a);e.setXYZ(h,a.x,a.y,a.z);h+=1;e.setXYZ(h,b.x,b.y,b.z);h+=1}e.needsUpdate=!0}}();qc.prototype=Object.create(B.prototype);qc.prototype.constructor=qc;qc.prototype.dispose=function(){var a=this.children[0],b=this.children[1];a.geometry.dispose();a.material.dispose();b.geometry.dispose();b.material.dispose()};qc.prototype.update=function(){var a=
	new p,b=new p,c=new p;return function(){a.setFromMatrixPosition(this.light.matrixWorld);b.setFromMatrixPosition(this.light.target.matrixWorld);c.subVectors(b,a);var d=this.children[0],e=this.children[1];d.lookAt(c);d.material.color.copy(this.light.color);e.lookAt(c);e.scale.z=c.length()}}();dd.prototype=Object.create(Z.prototype);dd.prototype.constructor=dd;dd.prototype.update=function(){function a(a,g,h,k){d.set(g,h,k).unproject(e);a=c[a];if(void 0!==a)for(g=b.getAttribute("position"),h=0,k=a.length;h<
	k;h++)g.setXYZ(a[h],d.x,d.y,d.z)}var b,c,d=new p,e=new Oa;return function(){b=this.geometry;c=this.pointMap;e.projectionMatrix.copy(this.camera.projectionMatrix);a("c",0,0,-1);a("t",0,0,1);a("n1",-1,-1,-1);a("n2",1,-1,-1);a("n3",-1,1,-1);a("n4",1,1,-1);a("f1",-1,-1,1);a("f2",1,-1,1);a("f3",-1,1,1);a("f4",1,1,1);a("u1",.7,1.1,-1);a("u2",-.7,1.1,-1);a("u3",0,2,-1);a("cf1",-1,0,1);a("cf2",1,0,1);a("cf3",0,-1,1);a("cf4",0,1,1);a("cn1",-1,0,-1);a("cn2",1,0,-1);a("cn3",0,-1,-1);a("cn4",0,1,-1);b.getAttribute("position").needsUpdate=
	!0}}();Bb.prototype=Object.create(Z.prototype);Bb.prototype.constructor=Bb;Bb.prototype.update=function(){var a=new Ta;return function(b){void 0!==b&&console.warn("THREE.BoxHelper: .update() has no longer arguments.");void 0!==this.object&&a.setFromObject(this.object);if(!a.isEmpty()){b=a.min;var c=a.max,d=this.geometry.attributes.position,e=d.array;e[0]=c.x;e[1]=c.y;e[2]=c.z;e[3]=b.x;e[4]=c.y;e[5]=c.z;e[6]=b.x;e[7]=b.y;e[8]=c.z;e[9]=c.x;e[10]=b.y;e[11]=c.z;e[12]=c.x;e[13]=c.y;e[14]=b.z;e[15]=b.x;
	e[16]=c.y;e[17]=b.z;e[18]=b.x;e[19]=b.y;e[20]=b.z;e[21]=c.x;e[22]=b.y;e[23]=b.z;d.needsUpdate=!0;this.geometry.computeBoundingSphere()}}}();Bb.prototype.setFromObject=function(a){this.object=a;this.update();return this};var Ld,re;Cb.prototype=Object.create(B.prototype);Cb.prototype.constructor=Cb;Cb.prototype.setDirection=function(){var a=new p,b;return function(c){.99999<c.y?this.quaternion.set(0,0,0,1):-.99999>c.y?this.quaternion.set(1,0,0,0):(a.set(c.z,0,-c.x).normalize(),b=Math.acos(c.y),this.quaternion.setFromAxisAngle(a,
	b))}}();Cb.prototype.setLength=function(a,b,c){void 0===b&&(b=.2*a);void 0===c&&(c=.2*b);this.line.scale.set(1,Math.max(0,a-b),1);this.line.updateMatrix();this.cone.scale.set(c,b,c);this.cone.position.y=a;this.cone.updateMatrix()};Cb.prototype.setColor=function(a){this.line.material.color.copy(a);this.cone.material.color.copy(a)};Md.prototype=Object.create(Z.prototype);Md.prototype.constructor=Md;var Pd=new p,ve=new se,we=new se,xe=new se;Ja.prototype=Object.create(ma.prototype);Ja.prototype.constructor=
	Ja;Ja.prototype.getPoint=function(a){var b=this.points,c=b.length;a*=c-(this.closed?0:1);var d=Math.floor(a);a-=d;this.closed?d+=0<d?0:(Math.floor(Math.abs(d)/b.length)+1)*b.length:0===a&&d===c-1&&(d=c-2,a=1);var e,f,g;this.closed||0<d?e=b[(d-1)%c]:(Pd.subVectors(b[0],b[1]).add(b[0]),e=Pd);f=b[d%c];g=b[(d+1)%c];this.closed||d+2<c?b=b[(d+2)%c]:(Pd.subVectors(b[c-1],b[c-2]).add(b[c-1]),b=Pd);if(void 0===this.type||"centripetal"===this.type||"chordal"===this.type){var h="chordal"===this.type?.5:.25,
	c=Math.pow(e.distanceToSquared(f),h),d=Math.pow(f.distanceToSquared(g),h),h=Math.pow(g.distanceToSquared(b),h);1E-4>d&&(d=1);1E-4>c&&(c=d);1E-4>h&&(h=d);ve.initNonuniformCatmullRom(e.x,f.x,g.x,b.x,c,d,h);we.initNonuniformCatmullRom(e.y,f.y,g.y,b.y,c,d,h);xe.initNonuniformCatmullRom(e.z,f.z,g.z,b.z,c,d,h)}else"catmullrom"===this.type&&(c=void 0!==this.tension?this.tension:.5,ve.initCatmullRom(e.x,f.x,g.x,b.x,c),we.initCatmullRom(e.y,f.y,g.y,b.y,c),xe.initCatmullRom(e.z,f.z,g.z,b.z,c));return new p(ve.calc(a),
	we.calc(a),xe.calc(a))};ed.prototype=Object.create(ma.prototype);ed.prototype.constructor=ed;ed.prototype.getPoint=function(a){var b=this.v0,c=this.v1,d=this.v2,e=this.v3;return new p(yb(a,b.x,c.x,d.x,e.x),yb(a,b.y,c.y,d.y,e.y),yb(a,b.z,c.z,d.z,e.z))};fd.prototype=Object.create(ma.prototype);fd.prototype.constructor=fd;fd.prototype.getPoint=function(a){var b=this.v0,c=this.v1,d=this.v2;return new p(xb(a,b.x,c.x,d.x),xb(a,b.y,c.y,d.y),xb(a,b.z,c.z,d.z))};gd.prototype=Object.create(ma.prototype);gd.prototype.constructor=
	gd;gd.prototype.getPoint=function(a){if(1===a)return this.v2.clone();var b=new p;b.subVectors(this.v2,this.v1);b.multiplyScalar(a);b.add(this.v1);return b};Nd.prototype=Object.create(Xa.prototype);Nd.prototype.constructor=Nd;ma.create=function(a,b){console.log("THREE.Curve.create() has been deprecated");a.prototype=Object.create(ma.prototype);a.prototype.constructor=a;a.prototype.getPoint=b;return a};ef.prototype=Object.create(Ja.prototype);ff.prototype=Object.create(Ja.prototype);te.prototype=Object.create(Ja.prototype);
	Object.assign(te.prototype,{initFromArray:function(a){console.error("THREE.Spline: .initFromArray() has been removed.")},getControlPointsArray:function(a){console.error("THREE.Spline: .getControlPointsArray() has been removed.")},reparametrizeByArcLength:function(a){console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.")}});bd.prototype.setColors=function(){console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")};mc.prototype.update=
	function(){console.error("THREE.SkeletonHelper: update() no longer needs to be called.")};Object.assign(id.prototype,{center:function(a){console.warn("THREE.Box2: .center() has been renamed to .getCenter().");return this.getCenter(a)},empty:function(){console.warn("THREE.Box2: .empty() has been renamed to .isEmpty().");return this.isEmpty()},isIntersectionBox:function(a){console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox().");return this.intersectsBox(a)},size:function(a){console.warn("THREE.Box2: .size() has been renamed to .getSize().");
	return this.getSize(a)}});Object.assign(Ta.prototype,{center:function(a){console.warn("THREE.Box3: .center() has been renamed to .getCenter().");return this.getCenter(a)},empty:function(){console.warn("THREE.Box3: .empty() has been renamed to .isEmpty().");return this.isEmpty()},isIntersectionBox:function(a){console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox().");return this.intersectsBox(a)},isIntersectionSphere:function(a){console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere().");
	return this.intersectsSphere(a)},size:function(a){console.warn("THREE.Box3: .size() has been renamed to .getSize().");return this.getSize(a)}});Hb.prototype.center=function(a){console.warn("THREE.Line3: .center() has been renamed to .getCenter().");return this.getCenter(a)};X.random16=function(){console.warn("THREE.Math.random16() has been deprecated. Use Math.random() instead.");return Math.random()};Object.assign(Ka.prototype,{flattenToArrayOffset:function(a,b){console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.");
	return this.toArray(a,b)},multiplyVector3:function(a){console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");return a.applyMatrix3(this)},multiplyVector3Array:function(a){console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")},applyToBuffer:function(a,b,c){console.warn("THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.");return this.applyToBufferAttribute(a)},applyToVector3Array:function(a,
	b,c){console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")}});Object.assign(J.prototype,{extractPosition:function(a){console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().");return this.copyPosition(a)},flattenToArrayOffset:function(a,b){console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.");return this.toArray(a,b)},getPosition:function(){var a;return function(){void 0===a&&(a=new p);console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
	return a.setFromMatrixColumn(this,3)}}(),setRotationFromQuaternion:function(a){console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().");return this.makeRotationFromQuaternion(a)},multiplyToArray:function(){console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")},multiplyVector3:function(a){console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead.");return a.applyMatrix4(this)},multiplyVector4:function(a){console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
	return a.applyMatrix4(this)},multiplyVector3Array:function(a){console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")},rotateAxis:function(a){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");a.transformDirection(this)},crossVector:function(a){console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");return a.applyMatrix4(this)},translate:function(){console.error("THREE.Matrix4: .translate() has been removed.")},
	rotateX:function(){console.error("THREE.Matrix4: .rotateX() has been removed.")},rotateY:function(){console.error("THREE.Matrix4: .rotateY() has been removed.")},rotateZ:function(){console.error("THREE.Matrix4: .rotateZ() has been removed.")},rotateByAxis:function(){console.error("THREE.Matrix4: .rotateByAxis() has been removed.")},applyToBuffer:function(a,b,c){console.warn("THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.");return this.applyToBufferAttribute(a)},
	applyToVector3Array:function(a,b,c){console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")},makeFrustum:function(a,b,c,d,e,f){console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead.");return this.makePerspective(a,b,d,c,e,f)}});va.prototype.isIntersectionLine=function(a){console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine().");return this.intersectsLine(a)};pa.prototype.multiplyVector3=
	function(a){console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");return a.applyQuaternion(this)};Object.assign(hb.prototype,{isIntersectionBox:function(a){console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox().");return this.intersectsBox(a)},isIntersectionPlane:function(a){console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane().");return this.intersectsPlane(a)},isIntersectionSphere:function(a){console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere().");
	return this.intersectsSphere(a)}});Object.assign(Ab.prototype,{extrude:function(a){console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead.");return new db(this,a)},makeGeometry:function(a){console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead.");return new Zb(this,a)}});Object.assign(E.prototype,{fromAttribute:function(a,b,c){console.error("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute().");return this.fromBufferAttribute(a,
	b,c)}});Object.assign(p.prototype,{setEulerFromRotationMatrix:function(){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")},setEulerFromQuaternion:function(){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")},getPositionFromMatrix:function(a){console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().");return this.setFromMatrixPosition(a)},
	getScaleFromMatrix:function(a){console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().");return this.setFromMatrixScale(a)},getColumnFromMatrix:function(a,b){console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().");return this.setFromMatrixColumn(b,a)},applyProjection:function(a){console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead.");return this.applyMatrix4(a)},fromAttribute:function(a,
	b,c){console.error("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute().");return this.fromBufferAttribute(a,b,c)}});Object.assign(ha.prototype,{fromAttribute:function(a,b,c){console.error("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute().");return this.fromBufferAttribute(a,b,c)}});M.prototype.computeTangents=function(){console.warn("THREE.Geometry: .computeTangents() has been removed.")};Object.assign(B.prototype,{getChildByName:function(a){console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().");
	return this.getObjectByName(a)},renderDepth:function(){console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")},translate:function(a,b){console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.");return this.translateOnAxis(b,a)}});Object.defineProperties(B.prototype,{eulerOrder:{get:function(){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");return this.rotation.order},set:function(a){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");
	this.rotation.order=a}},useQuaternion:{get:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}});Object.defineProperties(Bc.prototype,{objects:{get:function(){console.warn("THREE.LOD: .objects has been renamed to .levels.");return this.levels}}});Object.defineProperty(Cc.prototype,"useVertexTexture",{get:function(){console.warn("THREE.Skeleton: useVertexTexture has been removed.")},
	set:function(){console.warn("THREE.Skeleton: useVertexTexture has been removed.")}});Object.defineProperty(ma.prototype,"__arcLengthDivisions",{get:function(){console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.");return this.arcLengthDivisions},set:function(a){console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.");this.arcLengthDivisions=a}});wa.prototype.setLens=function(a,b){console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup.");
	void 0!==b&&(this.filmGauge=b);this.setFocalLength(a)};Object.defineProperties(ja.prototype,{onlyShadow:{set:function(){console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(a){console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov.");this.shadow.camera.fov=a}},shadowCameraLeft:{set:function(a){console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left.");this.shadow.camera.left=a}},shadowCameraRight:{set:function(a){console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right.");
	this.shadow.camera.right=a}},shadowCameraTop:{set:function(a){console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top.");this.shadow.camera.top=a}},shadowCameraBottom:{set:function(a){console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom.");this.shadow.camera.bottom=a}},shadowCameraNear:{set:function(a){console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near.");this.shadow.camera.near=a}},shadowCameraFar:{set:function(a){console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far.");
	this.shadow.camera.far=a}},shadowCameraVisible:{set:function(){console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(a){console.warn("THREE.Light: .shadowBias is now .shadow.bias.");this.shadow.bias=a}},shadowDarkness:{set:function(){console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(a){console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width.");
	this.shadow.mapSize.width=a}},shadowMapHeight:{set:function(a){console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height.");this.shadow.mapSize.height=a}}});Object.defineProperties(L.prototype,{length:{get:function(){console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead.");return this.array.length}}});Object.assign(I.prototype,{addIndex:function(a){console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().");this.setIndex(a)},addDrawCall:function(a,
	b,c){void 0!==c&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.");console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup().");this.addGroup(a,b)},clearDrawCalls:function(){console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().");this.clearGroups()},computeTangents:function(){console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")},computeOffsets:function(){console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")}});
	Object.defineProperties(I.prototype,{drawcalls:{get:function(){console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups.");return this.groups}},offsets:{get:function(){console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups.");return this.groups}}});Object.defineProperties(Jd.prototype,{dynamic:{set:function(){console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.")}},onUpdate:{value:function(){console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead.");
	return this}}});Object.defineProperties(Y.prototype,{wrapAround:{get:function(){console.warn("THREE.Material: .wrapAround has been removed.")},set:function(){console.warn("THREE.Material: .wrapAround has been removed.")}},wrapRGB:{get:function(){console.warn("THREE.Material: .wrapRGB has been removed.");return new G}}});Object.defineProperties(sa.prototype,{metal:{get:function(){console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead.");return!1},set:function(){console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")}}});
	Object.defineProperties(Da.prototype,{derivatives:{get:function(){console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");return this.extensions.derivatives},set:function(a){console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");this.extensions.derivatives=a}}});Object.assign(Xd.prototype,{getCurrentRenderTarget:function(){console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget().");return this.getRenderTarget()},
	supportsFloatTextures:function(){console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' ).");return this.extensions.get("OES_texture_float")},supportsHalfFloatTextures:function(){console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' ).");return this.extensions.get("OES_texture_half_float")},supportsStandardDerivatives:function(){console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' ).");
	return this.extensions.get("OES_standard_derivatives")},supportsCompressedTextureS3TC:function(){console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' ).");return this.extensions.get("WEBGL_compressed_texture_s3tc")},supportsCompressedTexturePVRTC:function(){console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' ).");return this.extensions.get("WEBGL_compressed_texture_pvrtc")},
	supportsBlendMinMax:function(){console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' ).");return this.extensions.get("EXT_blend_minmax")},supportsVertexTextures:function(){console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures.");return this.capabilities.vertexTextures},supportsInstancedArrays:function(){console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' ).");
	return this.extensions.get("ANGLE_instanced_arrays")},enableScissorTest:function(a){console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest().");this.setScissorTest(a)},initMaterial:function(){console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")},addPrePlugin:function(){console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")},addPostPlugin:function(){console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")},updateShadowMap:function(){console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")}});
	Object.defineProperties(Xd.prototype,{shadowMapEnabled:{get:function(){return this.shadowMap.enabled},set:function(a){console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.");this.shadowMap.enabled=a}},shadowMapType:{get:function(){return this.shadowMap.type},set:function(a){console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.");this.shadowMap.type=a}},shadowMapCullFace:{get:function(){return this.shadowMap.cullFace},set:function(a){console.warn("THREE.WebGLRenderer: .shadowMapCullFace is now .shadowMap.cullFace.");
	this.shadowMap.cullFace=a}}});Object.defineProperties(Je.prototype,{cullFace:{get:function(){return this.renderReverseSided?2:1},set:function(a){a=1!==a;console.warn("WebGLRenderer: .shadowMap.cullFace is deprecated. Set .shadowMap.renderReverseSided to "+a+".");this.renderReverseSided=a}}});Object.defineProperties(Db.prototype,{wrapS:{get:function(){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");return this.texture.wrapS},set:function(a){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");
	this.texture.wrapS=a}},wrapT:{get:function(){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");return this.texture.wrapT},set:function(a){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");this.texture.wrapT=a}},magFilter:{get:function(){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");return this.texture.magFilter},set:function(a){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");this.texture.magFilter=
	a}},minFilter:{get:function(){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");return this.texture.minFilter},set:function(a){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");this.texture.minFilter=a}},anisotropy:{get:function(){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");return this.texture.anisotropy},set:function(a){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");this.texture.anisotropy=
	a}},offset:{get:function(){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");return this.texture.offset},set:function(a){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");this.texture.offset=a}},repeat:{get:function(){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");return this.texture.repeat},set:function(a){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");this.texture.repeat=a}},format:{get:function(){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");
	return this.texture.format},set:function(a){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");this.texture.format=a}},type:{get:function(){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");return this.texture.type},set:function(a){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");this.texture.type=a}},generateMipmaps:{get:function(){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");return this.texture.generateMipmaps},
	set:function(a){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");this.texture.generateMipmaps=a}}});jc.prototype.load=function(a){console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");var b=this;(new fe).load(a,function(a){b.setBuffer(a)});return this};ke.prototype.getData=function(){console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData().");return this.getFrequencyData()};l.WebGLRenderTargetCube=Eb;l.WebGLRenderTarget=
	Db;l.WebGLRenderer=Xd;l.ShaderLib=ab;l.UniformsLib=U;l.UniformsUtils=Ha;l.ShaderChunk=T;l.FogExp2=Kb;l.Fog=Lb;l.Scene=md;l.LensFlare=Yd;l.Sprite=Ac;l.LOD=Bc;l.SkinnedMesh=od;l.Skeleton=Cc;l.Bone=nd;l.Mesh=Ba;l.LineSegments=Z;l.LineLoop=pd;l.Line=xa;l.Points=Mb;l.Group=Dc;l.VideoTexture=qd;l.DataTexture=eb;l.CompressedTexture=Nb;l.CubeTexture=Za;l.CanvasTexture=rd;l.DepthTexture=Ec;l.Texture=da;l.CompressedTextureLoader=Qe;l.DataTextureLoader=$d;l.CubeTextureLoader=ae;l.TextureLoader=sd;l.ObjectLoader=
	Re;l.MaterialLoader=Hd;l.BufferGeometryLoader=be;l.DefaultLoadingManager=za;l.LoadingManager=Zd;l.JSONLoader=ce;l.ImageLoader=Vc;l.FontLoader=Te;l.FileLoader=ta;l.Loader=gc;l.Cache=hd;l.AudioLoader=fe;l.SpotLightShadow=ud;l.SpotLight=vd;l.PointLight=wd;l.RectAreaLight=Ad;l.HemisphereLight=td;l.DirectionalLightShadow=xd;l.DirectionalLight=yd;l.AmbientLight=zd;l.LightShadow=ub;l.Light=ja;l.StereoCamera=Ue;l.PerspectiveCamera=wa;l.OrthographicCamera=Jb;l.CubeCamera=Id;l.ArrayCamera=ge;l.Camera=Oa;l.AudioListener=
	he;l.PositionalAudio=je;l.AudioContext=ie;l.AudioAnalyser=ke;l.Audio=jc;l.VectorKeyframeTrack=ec;l.StringKeyframeTrack=Ed;l.QuaternionKeyframeTrack=Xc;l.NumberKeyframeTrack=fc;l.ColorKeyframeTrack=Gd;l.BooleanKeyframeTrack=Fd;l.PropertyMixer=le;l.PropertyBinding=na;l.KeyframeTrack=wb;l.AnimationUtils=ua;l.AnimationObjectGroup=We;l.AnimationMixer=Ye;l.AnimationClip=Aa;l.Uniform=Jd;l.InstancedBufferGeometry=me;l.BufferGeometry=I;l.GeometryIdCount=function(){return Td++};l.Geometry=M;l.InterleavedBufferAttribute=
	ne;l.InstancedInterleavedBuffer=oe;l.InterleavedBuffer=kc;l.InstancedBufferAttribute=pe;l.Face3=Va;l.Object3D=B;l.Raycaster=Ze;l.Layers=Rd;l.EventDispatcher=ra;l.Clock=af;l.QuaternionLinearInterpolant=Dd;l.LinearInterpolant=Wc;l.DiscreteInterpolant=Cd;l.CubicInterpolant=Bd;l.Interpolant=Ca;l.Triangle=Ua;l.Math=X;l.Spherical=bf;l.Cylindrical=cf;l.Plane=va;l.Frustum=jd;l.Sphere=Ga;l.Ray=hb;l.Matrix4=J;l.Matrix3=Ka;l.Box3=Ta;l.Box2=id;l.Line3=Hb;l.Euler=bb;l.Vector4=ha;l.Vector3=p;l.Vector2=E;l.Quaternion=
	pa;l.Color=G;l.MorphBlendMesh=qa;l.ImmediateRenderObject=$c;l.VertexNormalsHelper=ad;l.SpotLightHelper=lc;l.SkeletonHelper=mc;l.PointLightHelper=nc;l.RectAreaLightHelper=oc;l.HemisphereLightHelper=pc;l.GridHelper=bd;l.PolarGridHelper=Kd;l.FaceNormalsHelper=cd;l.DirectionalLightHelper=qc;l.CameraHelper=dd;l.BoxHelper=Bb;l.ArrowHelper=Cb;l.AxisHelper=Md;l.CatmullRomCurve3=Ja;l.CubicBezierCurve3=ed;l.QuadraticBezierCurve3=fd;l.LineCurve3=gd;l.ArcCurve=Nd;l.EllipseCurve=Xa;l.SplineCurve=zb;l.CubicBezierCurve=
	hc;l.QuadraticBezierCurve=ic;l.LineCurve=Sa;l.Shape=Ab;l.Path=Zc;l.ShapePath=de;l.Font=ee;l.CurvePath=Yc;l.Curve=ma;l.ShapeUtils=ya;l.SceneUtils={createMultiMaterialObject:function(a,b){for(var c=new Dc,d=0,e=b.length;d<e;d++)c.add(new Ba(a,b[d]));return c},detach:function(a,b,c){a.applyMatrix(b.matrixWorld);b.remove(a);c.add(a)},attach:function(a,b,c){a.applyMatrix((new J).getInverse(c.matrixWorld));b.remove(a);c.add(a)}};l.WireframeGeometry=Ob;l.ParametricGeometry=Fc;l.ParametricBufferGeometry=
	Pb;l.TetrahedronGeometry=Hc;l.TetrahedronBufferGeometry=Qb;l.OctahedronGeometry=Ic;l.OctahedronBufferGeometry=mb;l.IcosahedronGeometry=Jc;l.IcosahedronBufferGeometry=Rb;l.DodecahedronGeometry=Kc;l.DodecahedronBufferGeometry=Sb;l.PolyhedronGeometry=Gc;l.PolyhedronBufferGeometry=ia;l.TubeGeometry=Lc;l.TubeBufferGeometry=Tb;l.TorusKnotGeometry=Mc;l.TorusKnotBufferGeometry=Ub;l.TorusGeometry=Nc;l.TorusBufferGeometry=Vb;l.TextGeometry=Oc;l.TextBufferGeometry=Wb;l.SphereGeometry=Pc;l.SphereBufferGeometry=
	nb;l.RingGeometry=Qc;l.RingBufferGeometry=Xb;l.PlaneGeometry=xc;l.PlaneBufferGeometry=lb;l.LatheGeometry=Rc;l.LatheBufferGeometry=Yb;l.ShapeGeometry=Zb;l.ShapeBufferGeometry=$b;l.ExtrudeGeometry=db;l.ExtrudeBufferGeometry=Fa;l.EdgesGeometry=ac;l.ConeGeometry=Sc;l.ConeBufferGeometry=Tc;l.CylinderGeometry=ob;l.CylinderBufferGeometry=Wa;l.CircleGeometry=Uc;l.CircleBufferGeometry=bc;l.BoxGeometry=Ib;l.BoxBufferGeometry=kb;l.ShadowMaterial=cc;l.SpriteMaterial=cb;l.RawShaderMaterial=dc;l.ShaderMaterial=
	Da;l.PointsMaterial=La;l.MeshPhysicalMaterial=pb;l.MeshStandardMaterial=Ra;l.MeshPhongMaterial=sa;l.MeshToonMaterial=qb;l.MeshNormalMaterial=rb;l.MeshLambertMaterial=sb;l.MeshDepthMaterial=$a;l.MeshBasicMaterial=Na;l.LineDashedMaterial=tb;l.LineBasicMaterial=ga;l.Material=Y;l.Float64BufferAttribute=wc;l.Float32BufferAttribute=C;l.Uint32BufferAttribute=jb;l.Int32BufferAttribute=vc;l.Uint16BufferAttribute=ib;l.Int16BufferAttribute=uc;l.Uint8ClampedBufferAttribute=tc;l.Uint8BufferAttribute=sc;l.Int8BufferAttribute=
	rc;l.BufferAttribute=L;l.REVISION="86dev";l.MOUSE={LEFT:0,MIDDLE:1,RIGHT:2};l.CullFaceNone=0;l.CullFaceBack=1;l.CullFaceFront=2;l.CullFaceFrontBack=3;l.FrontFaceDirectionCW=0;l.FrontFaceDirectionCCW=1;l.BasicShadowMap=0;l.PCFShadowMap=1;l.PCFSoftShadowMap=2;l.FrontSide=0;l.BackSide=1;l.DoubleSide=2;l.FlatShading=1;l.SmoothShading=2;l.NoColors=0;l.FaceColors=1;l.VertexColors=2;l.NoBlending=0;l.NormalBlending=1;l.AdditiveBlending=2;l.SubtractiveBlending=3;l.MultiplyBlending=4;l.CustomBlending=5;l.AddEquation=
	100;l.SubtractEquation=101;l.ReverseSubtractEquation=102;l.MinEquation=103;l.MaxEquation=104;l.ZeroFactor=200;l.OneFactor=201;l.SrcColorFactor=202;l.OneMinusSrcColorFactor=203;l.SrcAlphaFactor=204;l.OneMinusSrcAlphaFactor=205;l.DstAlphaFactor=206;l.OneMinusDstAlphaFactor=207;l.DstColorFactor=208;l.OneMinusDstColorFactor=209;l.SrcAlphaSaturateFactor=210;l.NeverDepth=0;l.AlwaysDepth=1;l.LessDepth=2;l.LessEqualDepth=3;l.EqualDepth=4;l.GreaterEqualDepth=5;l.GreaterDepth=6;l.NotEqualDepth=7;l.MultiplyOperation=
	0;l.MixOperation=1;l.AddOperation=2;l.NoToneMapping=0;l.LinearToneMapping=1;l.ReinhardToneMapping=2;l.Uncharted2ToneMapping=3;l.CineonToneMapping=4;l.UVMapping=300;l.CubeReflectionMapping=301;l.CubeRefractionMapping=302;l.EquirectangularReflectionMapping=303;l.EquirectangularRefractionMapping=304;l.SphericalReflectionMapping=305;l.CubeUVReflectionMapping=306;l.CubeUVRefractionMapping=307;l.RepeatWrapping=1E3;l.ClampToEdgeWrapping=1001;l.MirroredRepeatWrapping=1002;l.NearestFilter=1003;l.NearestMipMapNearestFilter=
	1004;l.NearestMipMapLinearFilter=1005;l.LinearFilter=1006;l.LinearMipMapNearestFilter=1007;l.LinearMipMapLinearFilter=1008;l.UnsignedByteType=1009;l.ByteType=1010;l.ShortType=1011;l.UnsignedShortType=1012;l.IntType=1013;l.UnsignedIntType=1014;l.FloatType=1015;l.HalfFloatType=1016;l.UnsignedShort4444Type=1017;l.UnsignedShort5551Type=1018;l.UnsignedShort565Type=1019;l.UnsignedInt248Type=1020;l.AlphaFormat=1021;l.RGBFormat=1022;l.RGBAFormat=1023;l.LuminanceFormat=1024;l.LuminanceAlphaFormat=1025;l.RGBEFormat=
	1023;l.DepthFormat=1026;l.DepthStencilFormat=1027;l.RGB_S3TC_DXT1_Format=2001;l.RGBA_S3TC_DXT1_Format=2002;l.RGBA_S3TC_DXT3_Format=2003;l.RGBA_S3TC_DXT5_Format=2004;l.RGB_PVRTC_4BPPV1_Format=2100;l.RGB_PVRTC_2BPPV1_Format=2101;l.RGBA_PVRTC_4BPPV1_Format=2102;l.RGBA_PVRTC_2BPPV1_Format=2103;l.RGB_ETC1_Format=2151;l.LoopOnce=2200;l.LoopRepeat=2201;l.LoopPingPong=2202;l.InterpolateDiscrete=2300;l.InterpolateLinear=2301;l.InterpolateSmooth=2302;l.ZeroCurvatureEnding=2400;l.ZeroSlopeEnding=2401;l.WrapAroundEnding=
	2402;l.TrianglesDrawMode=0;l.TriangleStripDrawMode=1;l.TriangleFanDrawMode=2;l.LinearEncoding=3E3;l.sRGBEncoding=3001;l.GammaEncoding=3007;l.RGBEEncoding=3002;l.LogLuvEncoding=3003;l.RGBM7Encoding=3004;l.RGBM16Encoding=3005;l.RGBDEncoding=3006;l.BasicDepthPacking=3200;l.RGBADepthPacking=3201;l.CubeGeometry=Ib;l.Face4=function(a,b,c,d,e,f,g){console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead.");return new Va(a,b,c,e,f,g)};l.LineStrip=0;l.LinePieces=1;l.MeshFaceMaterial=
	function(a){console.warn("THREE.MeshFaceMaterial has been removed. Use an Array instead.");return a};l.MultiMaterial=function(a){void 0===a&&(a=[]);console.warn("THREE.MultiMaterial has been removed. Use an Array instead.");a.isMultiMaterial=!0;a.materials=a;a.clone=function(){return a.slice()};return a};l.PointCloud=function(a,b){console.warn("THREE.PointCloud has been renamed to THREE.Points.");return new Mb(a,b)};l.Particle=function(a){console.warn("THREE.Particle has been renamed to THREE.Sprite.");
	return new Ac(a)};l.ParticleSystem=function(a,b){console.warn("THREE.ParticleSystem has been renamed to THREE.Points.");return new Mb(a,b)};l.PointCloudMaterial=function(a){console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial.");return new La(a)};l.ParticleBasicMaterial=function(a){console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial.");return new La(a)};l.ParticleSystemMaterial=function(a){console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial.");
	return new La(a)};l.Vertex=function(a,b,c){console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead.");return new p(a,b,c)};l.DynamicBufferAttribute=function(a,b){console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead.");return(new L(a,b)).setDynamic(!0)};l.Int8Attribute=function(a,b){console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead.");return new rc(a,b)};l.Uint8Attribute=
	function(a,b){console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead.");return new sc(a,b)};l.Uint8ClampedAttribute=function(a,b){console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead.");return new tc(a,b)};l.Int16Attribute=function(a,b){console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead.");return new uc(a,b)};l.Uint16Attribute=function(a,b){console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead.");
	return new ib(a,b)};l.Int32Attribute=function(a,b){console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead.");return new vc(a,b)};l.Uint32Attribute=function(a,b){console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead.");return new jb(a,b)};l.Float32Attribute=function(a,b){console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead.");return new C(a,b)};l.Float64Attribute=
	function(a,b){console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead.");return new wc(a,b)};l.ClosedSplineCurve3=ef;l.SplineCurve3=ff;l.Spline=te;l.BoundingBoxHelper=function(a,b){console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead.");return new Bb(a,b)};l.EdgesHelper=function(a,b){console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead.");return new Z(new ac(a.geometry),new ga({color:void 0!==
	b?b:16777215}))};l.WireframeHelper=function(a,b){console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead.");return new Z(new Ob(a.geometry),new ga({color:void 0!==b?b:16777215}))};l.XHRLoader=function(a){console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader.");return new ta(a)};l.BinaryTextureLoader=function(a){console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader.");return new $d(a)};l.GeometryUtils={merge:function(a,b,
	c){console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");var d;b.isMesh&&(b.matrixAutoUpdate&&b.updateMatrix(),d=b.matrix,b=b.geometry);a.merge(b,d,c)},center:function(a){console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.");return a.center()}};l.ImageUtils={crossOrigin:void 0,loadTexture:function(a,b,c,d){console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
	var e=new sd;e.setCrossOrigin(this.crossOrigin);a=e.load(a,c,void 0,d);b&&(a.mapping=b);return a},loadTextureCube:function(a,b,c,d){console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");var e=new ae;e.setCrossOrigin(this.crossOrigin);a=e.load(a,c,void 0,d);b&&(a.mapping=b);return a},loadCompressedTexture:function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")},loadCompressedTextureCube:function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")}};
	l.Projector=function(){console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js.");this.projectVector=function(a,b){console.warn("THREE.Projector: .projectVector() is now vector.project().");a.project(b)};this.unprojectVector=function(a,b){console.warn("THREE.Projector: .unprojectVector() is now vector.unproject().");a.unproject(b)};this.pickingRay=function(){console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")}};l.CanvasRenderer=function(){console.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js");
	this.domElement=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");this.clear=function(){};this.render=function(){};this.setClearColor=function(){};this.setSize=function(){}};Object.defineProperty(l,"__esModule",{value:!0})});

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

	var THREE = __webpack_require__(40);
	THREE.ColladaLoader = function () {

		var COLLADA = null;
		var scene = null;
		var visualScene;
		var kinematicsModel;

		var readyCallbackFunc = null;

		var sources = {};
		var images = {};
		var animations = {};
		var controllers = {};
		var geometries = {};
		var materials = {};
		var effects = {};
		var cameras = {};
		var lights = {};

		var animData;
		var kinematics;
		var visualScenes;
		var kinematicsModels;
		var baseUrl;
		var morphs;
		var skins;

		var flip_uv = true;
		var preferredShading = THREE.SmoothShading;

		var options = {
			// Force Geometry to always be centered at the local origin of the
			// containing Mesh.
			centerGeometry: false,

			// Axis conversion is done for geometries, animations, and controllers.
			// If we ever pull cameras or lights out of the COLLADA file, they'll
			// need extra work.
			convertUpAxis: false,

			subdivideFaces: true,

			upAxis: 'Y',

			// For reflective or refractive materials we'll use this cubemap
			defaultEnvMap: null

		};

		var colladaUnit = 1.0;
		var colladaUp = 'Y';
		var upConversion = null;

		function load ( url, readyCallback, progressCallback, failCallback ) {

			var length = 0;

			if ( document.implementation && document.implementation.createDocument ) {

				var request = new XMLHttpRequest();

				request.onreadystatechange = function() {

					if ( request.readyState === 4 ) {

						if ( request.status === 0 || request.status === 200 ) {

							if ( request.response ) {

								readyCallbackFunc = readyCallback;
								parse( request.response, undefined, url );

							} else {

								if ( failCallback ) {

									failCallback( { type: 'error', url: url } );

								} else {

									console.error( "ColladaLoader: Empty or non-existing file (" + url + ")" );

								}

							}

						}else{

							if( failCallback ){

								failCallback( { type: 'error', url: url } );

							}else{

								console.error( 'ColladaLoader: Couldn\'t load "' + url + '" (' + request.status + ')' );

							}

						}

					} else if ( request.readyState === 3 ) {

						if ( progressCallback ) {

							if ( length === 0 ) {

								length = request.getResponseHeader( "Content-Length" );

							}

							progressCallback( { total: length, loaded: request.responseText.length } );

						}

					}

				};

				request.open( "GET", url, true );
				request.send( null );

			} else {

				alert( "Don't know how to parse XML!" );

			}

		}

		function parse( text, callBack, url ) {

			COLLADA = new DOMParser().parseFromString( text, 'text/xml' );
			callBack = callBack || readyCallbackFunc;

			if ( url !== undefined ) {

				var parts = url.split( '/' );
				parts.pop();
				baseUrl = ( parts.length < 1 ? '.' : parts.join( '/' ) ) + '/';

			}

			parseAsset();
			setUpConversion();
			images = parseLib( "library_images image", _Image, "image" );
			materials = parseLib( "library_materials material", Material, "material" );
			effects = parseLib( "library_effects effect", Effect, "effect" );
			geometries = parseLib( "library_geometries geometry", Geometry, "geometry" );
			cameras = parseLib( "library_cameras camera", Camera, "camera" );
			lights = parseLib( "library_lights light", Light, "light" );
			controllers = parseLib( "library_controllers controller", Controller, "controller" );
			animations = parseLib( "library_animations animation", Animation, "animation" );
			visualScenes = parseLib( "library_visual_scenes visual_scene", VisualScene, "visual_scene" );
			kinematicsModels = parseLib( "library_kinematics_models kinematics_model", KinematicsModel, "kinematics_model" );

			morphs = [];
			skins = [];

			visualScene = parseScene();
			scene = new THREE.Group();

			for ( var i = 0; i < visualScene.nodes.length; i ++ ) {

				scene.add( createSceneGraph( visualScene.nodes[ i ] ) );

			}

			// unit conversion
			scene.scale.multiplyScalar( colladaUnit );

			createAnimations();

			kinematicsModel = parseKinematicsModel();
			createKinematics();

			var result = {

				scene: scene,
				morphs: morphs,
				skins: skins,
				animations: animData,
				kinematics: kinematics,
				dae: {
					images: images,
					materials: materials,
					cameras: cameras,
					lights: lights,
					effects: effects,
					geometries: geometries,
					controllers: controllers,
					animations: animations,
					visualScenes: visualScenes,
					visualScene: visualScene,
					scene: visualScene,
					kinematicsModels: kinematicsModels,
					kinematicsModel: kinematicsModel
				}

			};

			if ( callBack ) {

				callBack( result );

			}

			return result;

		}

		function setPreferredShading ( shading ) {

			preferredShading = shading;

		}

		function parseAsset () {

			var elements = COLLADA.querySelectorAll('asset');

			var element = elements[0];

			if ( element && element.childNodes ) {

				for ( var i = 0; i < element.childNodes.length; i ++ ) {

					var child = element.childNodes[ i ];

					switch ( child.nodeName ) {

						case 'unit':

							var meter = child.getAttribute( 'meter' );

							if ( meter ) {

								colladaUnit = parseFloat( meter );

							}

							break;

						case 'up_axis':

							colladaUp = child.textContent.charAt(0);
							break;

					}

				}

			}

		}

		function parseLib ( q, classSpec, prefix ) {

			var elements = COLLADA.querySelectorAll(q);

			var lib = {};

			var i = 0;

			var elementsLength = elements.length;

			for ( var j = 0; j < elementsLength; j ++ ) {

				var element = elements[j];
				var daeElement = ( new classSpec() ).parse( element );

				if ( !daeElement.id || daeElement.id.length === 0 ) daeElement.id = prefix + ( i ++ );
				lib[ daeElement.id ] = daeElement;

			}

			return lib;

		}

		function parseScene() {

			var sceneElement = COLLADA.querySelectorAll('scene instance_visual_scene')[0];

			if ( sceneElement ) {

				var url = sceneElement.getAttribute( 'url' ).replace( /^#/, '' );
				return visualScenes[ url.length > 0 ? url : 'visual_scene0' ];

			} else {

				return null;

			}

		}

		function parseKinematicsModel() {

			var kinematicsModelElement = COLLADA.querySelectorAll('instance_kinematics_model')[0];

			if ( kinematicsModelElement ) {

				var url = kinematicsModelElement.getAttribute( 'url' ).replace(/^#/, '');
				return kinematicsModels[ url.length > 0 ? url : 'kinematics_model0' ];

			} else {

				return null;

			}

		}

		function createAnimations() {

			animData = [];

			// fill in the keys
			recurseHierarchy( scene );

		}

		function recurseHierarchy( node ) {

			var n = visualScene.getChildById( node.colladaId, true ),
				newData = null;

			if ( n && n.keys ) {

				newData = {
					fps: 60,
					hierarchy: [ {
						node: n,
						keys: n.keys,
						sids: n.sids
					} ],
					node: node,
					name: 'animation_' + node.name,
					length: 0
				};

				animData.push(newData);

				for ( var i = 0, il = n.keys.length; i < il; i ++ ) {

					newData.length = Math.max( newData.length, n.keys[i].time );

				}

			} else {

				newData = {
					hierarchy: [ {
						keys: [],
						sids: []
					} ]
				}

			}

			for ( var i = 0, il = node.children.length; i < il; i ++ ) {

				var d = recurseHierarchy( node.children[i] );

				for ( var j = 0, jl = d.hierarchy.length; j < jl; j ++ ) {

					newData.hierarchy.push( {
						keys: [],
						sids: []
					} );

				}

			}

			return newData;

		}

		function calcAnimationBounds () {

			var start = 1000000;
			var end = -start;
			var frames = 0;
			var ID;
			for ( var id in animations ) {

				var animation = animations[ id ];
				ID = ID || animation.id;
				for ( var i = 0; i < animation.sampler.length; i ++ ) {

					var sampler = animation.sampler[ i ];

					sampler.create();

					start = Math.min( start, sampler.startTime );
					end = Math.max( end, sampler.endTime );
					frames = Math.max( frames, sampler.input.length );

				}

			}

			return { start:start, end:end, frames:frames,ID:ID };

		}

		function createMorph ( geometry, ctrl ) {

			var morphCtrl = ctrl instanceof InstanceController ? controllers[ ctrl.url ] : ctrl;

			if ( !morphCtrl || !morphCtrl.morph ) {

				console.log("could not find morph controller!");
				return;

			}

			var morph = morphCtrl.morph;

			for ( var i = 0; i < morph.targets.length; i ++ ) {

				var target_id = morph.targets[ i ];
				var daeGeometry = geometries[ target_id ];

				if ( !daeGeometry.mesh ||
					 !daeGeometry.mesh.primitives ||
					 !daeGeometry.mesh.primitives.length ) {
					 continue;
				}

				var target = daeGeometry.mesh.primitives[ 0 ].geometry;

				if ( target.vertices.length === geometry.vertices.length ) {

					geometry.morphTargets.push( { name: "target_1", vertices: target.vertices } );

				}

			}

			geometry.morphTargets.push( { name: "target_Z", vertices: geometry.vertices } );

		}

		function createSkin ( geometry, ctrl, applyBindShape ) {

			var skinCtrl = controllers[ ctrl.url ];

			if ( !skinCtrl || !skinCtrl.skin ) {

				console.log( "could not find skin controller!" );
				return;

			}

			if ( !ctrl.skeleton || !ctrl.skeleton.length ) {

				console.log( "could not find the skeleton for the skin!" );
				return;

			}

			var skin = skinCtrl.skin;
			var skeleton = visualScene.getChildById( ctrl.skeleton[ 0 ] );
			var hierarchy = [];

			applyBindShape = applyBindShape !== undefined ? applyBindShape : true;

			var bones = [];
			geometry.skinWeights = [];
			geometry.skinIndices = [];

			//createBones( geometry.bones, skin, hierarchy, skeleton, null, -1 );
			//createWeights( skin, geometry.bones, geometry.skinIndices, geometry.skinWeights );

			/*
			geometry.animation = {
				name: 'take_001',
				fps: 30,
				length: 2,
				JIT: true,
				hierarchy: hierarchy
			};
			*/

			if ( applyBindShape ) {

				for ( var i = 0; i < geometry.vertices.length; i ++ ) {

					geometry.vertices[ i ].applyMatrix4( skin.bindShapeMatrix );

				}

			}

		}

		function setupSkeleton ( node, bones, frame, parent ) {

			node.world = node.world || new THREE.Matrix4();
			node.localworld = node.localworld || new THREE.Matrix4();
			node.world.copy( node.matrix );
			node.localworld.copy( node.matrix );

			if ( node.channels && node.channels.length ) {

				var channel = node.channels[ 0 ];
				var m = channel.sampler.output[ frame ];

				if ( m instanceof THREE.Matrix4 ) {

					node.world.copy( m );
					node.localworld.copy(m);
					if (frame === 0)
						node.matrix.copy(m);
				}

			}

			if ( parent ) {

				node.world.multiplyMatrices( parent, node.world );

			}

			bones.push( node );

			for ( var i = 0; i < node.nodes.length; i ++ ) {

				setupSkeleton( node.nodes[ i ], bones, frame, node.world );

			}

		}

		function setupSkinningMatrices ( bones, skin ) {

			// FIXME: this is dumb...

			for ( var i = 0; i < bones.length; i ++ ) {

				var bone = bones[ i ];
				var found = -1;

				if ( bone.type != 'JOINT' ) continue;

				for ( var j = 0; j < skin.joints.length; j ++ ) {

					if ( bone.sid === skin.joints[ j ] ) {

						found = j;
						break;

					}

				}

				if ( found >= 0 ) {

					var inv = skin.invBindMatrices[ found ];

					bone.invBindMatrix = inv;
					bone.skinningMatrix = new THREE.Matrix4();
					bone.skinningMatrix.multiplyMatrices(bone.world, inv); // (IBMi * JMi)
					bone.animatrix = new THREE.Matrix4();

					bone.animatrix.copy(bone.localworld);
					bone.weights = [];

					for ( var j = 0; j < skin.weights.length; j ++ ) {

						for (var k = 0; k < skin.weights[ j ].length; k ++ ) {

							var w = skin.weights[ j ][ k ];

							if ( w.joint === found ) {

								bone.weights.push( w );

							}

						}

					}

				} else {

					console.warn( "ColladaLoader: Could not find joint '" + bone.sid + "'." );

					bone.skinningMatrix = new THREE.Matrix4();
					bone.weights = [];

				}
			}

		}

		//Walk the Collada tree and flatten the bones into a list, extract the position, quat and scale from the matrix
		function flattenSkeleton(skeleton) {

			var list = [];
			var walk = function(parentid, node, list) {

				var bone = {};
				bone.name = node.sid;
				bone.parent = parentid;
				bone.matrix = node.matrix;
				var data = [ new THREE.Vector3(),new THREE.Quaternion(),new THREE.Vector3() ];
				bone.matrix.decompose(data[0], data[1], data[2]);

				bone.pos = [ data[0].x,data[0].y,data[0].z ];

				bone.scl = [ data[2].x,data[2].y,data[2].z ];
				bone.rotq = [ data[1].x,data[1].y,data[1].z,data[1].w ];
				list.push(bone);

				for (var i in node.nodes) {

					walk(node.sid, node.nodes[i], list);

				}

			};

			walk(-1, skeleton, list);
			return list;

		}

		//Move the vertices into the pose that is proper for the start of the animation
		function skinToBindPose(geometry,skeleton,skinController) {

			var bones = [];
			setupSkeleton( skeleton, bones, -1 );
			setupSkinningMatrices( bones, skinController.skin );
			var v = new THREE.Vector3();
			var skinned = [];

			for (var i = 0; i < geometry.vertices.length; i ++) {

				skinned.push(new THREE.Vector3());

			}

			for ( i = 0; i < bones.length; i ++ ) {

				if ( bones[ i ].type != 'JOINT' ) continue;

				for ( var j = 0; j < bones[ i ].weights.length; j ++ ) {

					var w = bones[ i ].weights[ j ];
					var vidx = w.index;
					var weight = w.weight;

					var o = geometry.vertices[vidx];
					var s = skinned[vidx];

					v.x = o.x;
					v.y = o.y;
					v.z = o.z;

					v.applyMatrix4( bones[i].skinningMatrix );

					s.x += (v.x * weight);
					s.y += (v.y * weight);
					s.z += (v.z * weight);
				}

			}

			for (var i = 0; i < geometry.vertices.length; i ++) {

				geometry.vertices[i] = skinned[i];

			}

		}

		function applySkin( geometry, instanceCtrl, frame ) {

			if ( frame === undefined ) frame = 40;

			var skinController = controllers[ instanceCtrl.url ];

			if ( !skinController || !skinController.skin ) {

				console.log( 'ColladaLoader: Could not find skin controller.' );
				return;

			}

			if ( !instanceCtrl.skeleton || !instanceCtrl.skeleton.length ) {

				console.log( 'ColladaLoader: Could not find the skeleton for the skin. ' );
				return;

			}

			var animationBounds = calcAnimationBounds();
			var skeleton = visualScene.getChildById( instanceCtrl.skeleton[0], true ) || visualScene.getChildBySid( instanceCtrl.skeleton[0], true );

			//flatten the skeleton into a list of bones
			var bonelist = flattenSkeleton(skeleton);
			var joints = skinController.skin.joints;

			//sort that list so that the order reflects the order in the joint list
			var sortedbones = [];
			for (var i = 0; i < joints.length; i ++) {

				for (var j = 0; j < bonelist.length; j ++) {

					if (bonelist[j].name === joints[i]) {

						sortedbones[i] = bonelist[j];

					}

				}

			}

			//hook up the parents by index instead of name
			for (var i = 0; i < sortedbones.length; i ++) {

				for (var j = 0; j < sortedbones.length; j ++) {

					if (sortedbones[i].parent === sortedbones[j].name) {

						sortedbones[i].parent = j;

					}

				}

			}


			var i, j, w, vidx, weight;
			var v = new THREE.Vector3(), o, s;

			// move vertices to bind shape
			for ( i = 0; i < geometry.vertices.length; i ++ ) {
				geometry.vertices[i].applyMatrix4( skinController.skin.bindShapeMatrix );
			}

			var skinIndices = [];
			var skinWeights = [];
			var weights = skinController.skin.weights;

			// hook up the skin weights
			// TODO - this might be a good place to choose greatest 4 weights
			for ( var i =0; i < weights.length; i ++ ) {

				var indicies = new THREE.Vector4(weights[i][0] ? weights[i][0].joint : 0,weights[i][1] ? weights[i][1].joint : 0,weights[i][2] ? weights[i][2].joint : 0,weights[i][3] ? weights[i][3].joint : 0);
				var weight = new THREE.Vector4(weights[i][0] ? weights[i][0].weight : 0,weights[i][1] ? weights[i][1].weight : 0,weights[i][2] ? weights[i][2].weight : 0,weights[i][3] ? weights[i][3].weight : 0);

				skinIndices.push(indicies);
				skinWeights.push(weight);

			}

			geometry.skinIndices = skinIndices;
			geometry.skinWeights = skinWeights;
			geometry.bones = sortedbones;
			// process animation, or simply pose the rig if no animation

			//create an animation for the animated bones
			//NOTE: this has no effect when using morphtargets
			var animationdata = { "name":animationBounds.ID,"fps":30,"length":animationBounds.frames / 30,"hierarchy":[] };

			for (var j = 0; j < sortedbones.length; j ++) {

				animationdata.hierarchy.push({ parent:sortedbones[j].parent, name:sortedbones[j].name, keys:[] });

			}

			console.log( 'ColladaLoader:', animationBounds.ID + ' has ' + sortedbones.length + ' bones.' );



			skinToBindPose(geometry, skeleton, skinController);


			for ( frame = 0; frame < animationBounds.frames; frame ++ ) {

				var bones = [];
				var skinned = [];
				// process the frame and setup the rig with a fresh
				// transform, possibly from the bone's animation channel(s)

				setupSkeleton( skeleton, bones, frame );
				setupSkinningMatrices( bones, skinController.skin );

				for (var i = 0; i < bones.length; i ++) {

					for (var j = 0; j < animationdata.hierarchy.length; j ++) {

						if (animationdata.hierarchy[j].name === bones[i].sid) {

							var key = {};
							key.time = (frame / 30);
							key.matrix = bones[i].animatrix;

							if (frame === 0)
								bones[i].matrix = key.matrix;

							var data = [ new THREE.Vector3(),new THREE.Quaternion(),new THREE.Vector3() ];
							key.matrix.decompose(data[0], data[1], data[2]);

							key.pos = [ data[0].x,data[0].y,data[0].z ];

							key.scl = [ data[2].x,data[2].y,data[2].z ];
							key.rot = data[1];

							animationdata.hierarchy[j].keys.push(key);

						}

					}

				}

				geometry.animation = animationdata;

			}

		}

		function createKinematics() {

			if ( kinematicsModel && kinematicsModel.joints.length === 0 ) {
				kinematics = undefined;
				return;
			}

			var jointMap = {};

			var _addToMap = function( jointIndex, parentVisualElement ) {

				var parentVisualElementId = parentVisualElement.getAttribute( 'id' );
				var colladaNode = visualScene.getChildById( parentVisualElementId, true );
				var joint = kinematicsModel.joints[ jointIndex ];

				scene.traverse(function( node ) {

					if ( node.colladaId == parentVisualElementId ) {

						jointMap[ jointIndex ] = {
							node: node,
							transforms: colladaNode.transforms,
							joint: joint,
							position: joint.zeroPosition
						};

					}

				});

			};

			kinematics = {

				joints: kinematicsModel && kinematicsModel.joints,

				getJointValue: function( jointIndex ) {

					var jointData = jointMap[ jointIndex ];

					if ( jointData ) {

						return jointData.position;

					} else {

						console.log( 'getJointValue: joint ' + jointIndex + ' doesn\'t exist' );

					}

				},

				setJointValue: function( jointIndex, value ) {

					var jointData = jointMap[ jointIndex ];

					if ( jointData ) {

						var joint = jointData.joint;

						if ( value > joint.limits.max || value < joint.limits.min ) {

							console.log( 'setJointValue: joint ' + jointIndex + ' value ' + value + ' outside of limits (min: ' + joint.limits.min + ', max: ' + joint.limits.max + ')' );

						} else if ( joint.static ) {

							console.log( 'setJointValue: joint ' + jointIndex + ' is static' );

						} else {

							var threejsNode = jointData.node;
							var axis = joint.axis;
							var transforms = jointData.transforms;

							var matrix = new THREE.Matrix4();
							var m1 = new THREE.Matrix4();

							for (i = 0; i < transforms.length; i ++ ) {

								var transform = transforms[ i ];

								// kinda ghetto joint detection

								if ( transform.sid && transform.sid.indexOf( 'joint' + jointIndex ) !== -1 ) {

									// apply actual joint value here
									switch ( joint.type ) {

										case 'revolute':

											matrix.multiply( m1.makeRotationAxis( axis, THREE.Math.degToRad(value) ) );
											break;

										case 'prismatic':

											matrix.multiply( m1.makeTranslation(axis.x * value, axis.y * value, axis.z * value ) );
											break;

										default:

											console.warn( 'setJointValue: unknown joint type: ' + joint.type );
											break;

									}

								} else {

									switch ( transform.type ) {

										case 'matrix':

											matrix.multiply( transform.obj );

											break;

										case 'translate':

											matrix.multiply( m1.makeTranslation( transform.obj.x, transform.obj.y, transform.obj.z ) );

											break;

										case 'rotate':

											matrix.multiply( m1.makeRotationAxis( transform.obj, transform.angle ) );

											break;

									}
								}
							}

							// apply the matrix to the threejs node
							var elementsFloat32Arr = matrix.elements;
							var elements = Array.prototype.slice.call( elementsFloat32Arr );

							var elementsRowMajor = [
								elements[ 0 ],
								elements[ 4 ],
								elements[ 8 ],
								elements[ 12 ],
								elements[ 1 ],
								elements[ 5 ],
								elements[ 9 ],
								elements[ 13 ],
								elements[ 2 ],
								elements[ 6 ],
								elements[ 10 ],
								elements[ 14 ],
								elements[ 3 ],
								elements[ 7 ],
								elements[ 11 ],
								elements[ 15 ]
							];

							threejsNode.matrix.set.apply( threejsNode.matrix, elementsRowMajor );
							threejsNode.matrix.decompose( threejsNode.position, threejsNode.quaternion, threejsNode.scale );

							jointMap[ jointIndex ].position = value;

						}

					} else {

						console.log( 'setJointValue: joint ' + jointIndex + ' doesn\'t exist' );

					}

				}

			};

			var element = COLLADA.querySelector('scene instance_kinematics_scene');

			if ( element ) {

				for ( var i = 0; i < element.childNodes.length; i ++ ) {

					var child = element.childNodes[ i ];

					if ( child.nodeType != 1 ) continue;

					switch ( child.nodeName ) {

						case 'bind_joint_axis':

							var visualTarget = child.getAttribute( 'target' ).split( '/' ).pop();
							var axis = child.querySelector('axis param').textContent;
							var jointIndex = parseInt( axis.split( 'joint' ).pop().split( '.' )[0] );
							var visualTargetElement = COLLADA.querySelector( '[sid="' + visualTarget + '"]' );

							if ( visualTargetElement ) {
								var parentVisualElement = visualTargetElement.parentElement;
								_addToMap(jointIndex, parentVisualElement);
							}

							break;

						default:

							break;

					}

				}
			}

		}

		function createSceneGraph ( node, parent ) {

			var obj = new THREE.Object3D();
			var skinned = false;
			var skinController;
			var morphController;
			var i, j;

			// FIXME: controllers

			for ( i = 0; i < node.controllers.length; i ++ ) {

				var controller = controllers[ node.controllers[ i ].url ];

				switch ( controller.type ) {

					case 'skin':

						if ( geometries[ controller.skin.source ] ) {

							var inst_geom = new InstanceGeometry();

							inst_geom.url = controller.skin.source;
							inst_geom.instance_material = node.controllers[ i ].instance_material;

							node.geometries.push( inst_geom );
							skinned = true;
							skinController = node.controllers[ i ];

						} else if ( controllers[ controller.skin.source ] ) {

							// urgh: controller can be chained
							// handle the most basic case...

							var second = controllers[ controller.skin.source ];
							morphController = second;
						//	skinController = node.controllers[i];

							if ( second.morph && geometries[ second.morph.source ] ) {

								var inst_geom = new InstanceGeometry();

								inst_geom.url = second.morph.source;
								inst_geom.instance_material = node.controllers[ i ].instance_material;

								node.geometries.push( inst_geom );

							}

						}

						break;

					case 'morph':

						if ( geometries[ controller.morph.source ] ) {

							var inst_geom = new InstanceGeometry();

							inst_geom.url = controller.morph.source;
							inst_geom.instance_material = node.controllers[ i ].instance_material;

							node.geometries.push( inst_geom );
							morphController = node.controllers[ i ];

						}

						console.log( 'ColladaLoader: Morph-controller partially supported.' );

					default:
						break;

				}

			}

			// geometries

			var double_sided_materials = {};

			for ( i = 0; i < node.geometries.length; i ++ ) {

				var instance_geometry = node.geometries[i];
				var instance_materials = instance_geometry.instance_material;
				var geometry = geometries[ instance_geometry.url ];
				var used_materials = {};
				var used_materials_array = [];
				var num_materials = 0;
				var first_material;

				if ( geometry ) {

					if ( !geometry.mesh || !geometry.mesh.primitives )
						continue;

					if ( obj.name.length === 0 ) {

						obj.name = geometry.id;

					}

					// collect used fx for this geometry-instance

					if ( instance_materials ) {

						for ( j = 0; j < instance_materials.length; j ++ ) {

							var instance_material = instance_materials[ j ];
							var mat = materials[ instance_material.target ];
							var effect_id = mat.instance_effect.url;
							var shader = effects[ effect_id ].shader;
							var material3js = shader.material;

							if ( geometry.doubleSided ) {

								if ( !( instance_material.symbol in double_sided_materials ) ) {

									var _copied_material = material3js.clone();
									_copied_material.side = THREE.DoubleSide;
									double_sided_materials[ instance_material.symbol ] = _copied_material;

								}

								material3js = double_sided_materials[ instance_material.symbol ];

							}

							material3js.opacity = !material3js.opacity ? 1 : material3js.opacity;
							used_materials[ instance_material.symbol ] = num_materials;
							used_materials_array.push( material3js );
							first_material = material3js;
							first_material.name = mat.name === null || mat.name === '' ? mat.id : mat.name;
							num_materials ++;

						}

					}

					var mesh;
					var material = first_material || new THREE.MeshLambertMaterial( { color: 0xdddddd, side: geometry.doubleSided ? THREE.DoubleSide : THREE.FrontSide } );
					var geom = geometry.mesh.geometry3js;

					if ( num_materials > 1 ) {

						material = new THREE.MultiMaterial( used_materials_array );

						for ( j = 0; j < geom.faces.length; j ++ ) {

							var face = geom.faces[ j ];
							face.materialIndex = used_materials[ face.daeMaterial ]

						}

					}

					if ( skinController !== undefined ) {


						applySkin( geom, skinController );

						if ( geom.morphTargets.length > 0 ) {

							material.morphTargets = true;
							material.skinning = false;

						} else {

							material.morphTargets = false;
							material.skinning = true;

						}


						mesh = new THREE.SkinnedMesh( geom, material, false );


						//mesh.skeleton = skinController.skeleton;
						//mesh.skinController = controllers[ skinController.url ];
						//mesh.skinInstanceController = skinController;
						mesh.name = 'skin_' + skins.length;



						//mesh.animationHandle.setKey(0);
						skins.push( mesh );

					} else if ( morphController !== undefined ) {

						createMorph( geom, morphController );

						material.morphTargets = true;

						mesh = new THREE.Mesh( geom, material );
						mesh.name = 'morph_' + morphs.length;

						morphs.push( mesh );

					} else {

						if ( geom.isLineStrip === true ) {

							mesh = new THREE.Line( geom );

						} else {

							mesh = new THREE.Mesh( geom, material );

						}

					}

					obj.add(mesh);

				}

			}

			for ( i = 0; i < node.cameras.length; i ++ ) {

				var instance_camera = node.cameras[i];
				var cparams = cameras[instance_camera.url];

				var cam = new THREE.PerspectiveCamera(cparams.yfov, parseFloat(cparams.aspect_ratio),
						parseFloat(cparams.znear), parseFloat(cparams.zfar));

				obj.add(cam);
			}

			for ( i = 0; i < node.lights.length; i ++ ) {

				var light = null;
				var instance_light = node.lights[i];
				var lparams = lights[instance_light.url];

				if ( lparams && lparams.technique ) {

					var color = lparams.color.getHex();
					var intensity = lparams.intensity;
					var distance = lparams.distance;
					var angle = lparams.falloff_angle;

					switch ( lparams.technique ) {

						case 'directional':

							light = new THREE.DirectionalLight( color, intensity, distance );
							light.position.set(0, 0, 1);
							break;

						case 'point':

							light = new THREE.PointLight( color, intensity, distance );
							break;

						case 'spot':

							light = new THREE.SpotLight( color, intensity, distance, angle );
							light.position.set(0, 0, 1);
							break;

						case 'ambient':

							light = new THREE.AmbientLight( color );
							break;

					}

				}

				if (light) {
					obj.add(light);
				}
			}

			obj.name = node.name || node.id || "";
			obj.colladaId = node.id || "";
			obj.layer = node.layer || "";
			obj.matrix = node.matrix;
			obj.matrix.decompose( obj.position, obj.quaternion, obj.scale );

			if ( options.centerGeometry && obj.geometry ) {

				var delta = obj.geometry.center();
				delta.multiply( obj.scale );
				delta.applyQuaternion( obj.quaternion );

				obj.position.sub( delta );

			}

			for ( i = 0; i < node.nodes.length; i ++ ) {

				obj.add( createSceneGraph( node.nodes[i], node ) );

			}

			return obj;

		}

		function getJointId( skin, id ) {

			for ( var i = 0; i < skin.joints.length; i ++ ) {

				if ( skin.joints[ i ] === id ) {

					return i;

				}

			}

		}

		function getLibraryNode( id ) {

			var nodes = COLLADA.querySelectorAll('library_nodes node');

			for ( var i = 0; i < nodes.length; i++ ) {

				var attObj = nodes[i].attributes.getNamedItem('id');

				if ( attObj && attObj.value === id ) {

					return nodes[i];

				}

			}

			return undefined;

		}

		function getChannelsForNode ( node ) {

			var channels = [];
			var startTime = 1000000;
			var endTime = -1000000;

			for ( var id in animations ) {

				var animation = animations[id];

				for ( var i = 0; i < animation.channel.length; i ++ ) {

					var channel = animation.channel[i];
					var sampler = animation.sampler[i];
					var id = channel.target.split('/')[0];

					if ( id == node.id ) {

						sampler.create();
						channel.sampler = sampler;
						startTime = Math.min(startTime, sampler.startTime);
						endTime = Math.max(endTime, sampler.endTime);
						channels.push(channel);

					}

				}

			}

			if ( channels.length ) {

				node.startTime = startTime;
				node.endTime = endTime;

			}

			return channels;

		}

		function calcFrameDuration( node ) {

			var minT = 10000000;

			for ( var i = 0; i < node.channels.length; i ++ ) {

				var sampler = node.channels[i].sampler;

				for ( var j = 0; j < sampler.input.length - 1; j ++ ) {

					var t0 = sampler.input[ j ];
					var t1 = sampler.input[ j + 1 ];
					minT = Math.min( minT, t1 - t0 );

				}
			}

			return minT;

		}

		function calcMatrixAt( node, t ) {

			var animated = {};

			var i, j;

			for ( i = 0; i < node.channels.length; i ++ ) {

				var channel = node.channels[ i ];
				animated[ channel.sid ] = channel;

			}

			var matrix = new THREE.Matrix4();

			for ( i = 0; i < node.transforms.length; i ++ ) {

				var transform = node.transforms[ i ];
				var channel = animated[ transform.sid ];

				if ( channel !== undefined ) {

					var sampler = channel.sampler;
					var value;

					for ( j = 0; j < sampler.input.length - 1; j ++ ) {

						if ( sampler.input[ j + 1 ] > t ) {

							value = sampler.output[ j ];
							//console.log(value.flatten)
							break;

						}

					}

					if ( value !== undefined ) {

						if ( value instanceof THREE.Matrix4 ) {

							matrix.multiplyMatrices( matrix, value );

						} else {

							// FIXME: handle other types

							matrix.multiplyMatrices( matrix, transform.matrix );

						}

					} else {

						matrix.multiplyMatrices( matrix, transform.matrix );

					}

				} else {

					matrix.multiplyMatrices( matrix, transform.matrix );

				}

			}

			return matrix;

		}

		function bakeAnimations ( node ) {

			if ( node.channels && node.channels.length ) {

				var keys = [],
					sids = [];

				for ( var i = 0, il = node.channels.length; i < il; i ++ ) {

					var channel = node.channels[i],
						fullSid = channel.fullSid,
						sampler = channel.sampler,
						input = sampler.input,
						transform = node.getTransformBySid( channel.sid ),
						member;

					if ( channel.arrIndices ) {

						member = [];

						for ( var j = 0, jl = channel.arrIndices.length; j < jl; j ++ ) {

							member[ j ] = getConvertedIndex( channel.arrIndices[ j ] );

						}

					} else {

						member = getConvertedMember( channel.member );

					}

					if ( transform ) {

						if ( sids.indexOf( fullSid ) === -1 ) {

							sids.push( fullSid );

						}

						for ( var j = 0, jl = input.length; j < jl; j ++ ) {

							var time = input[j],
								data = sampler.getData( transform.type, j, member ),
								key = findKey( keys, time );

							if ( !key ) {

								key = new Key( time );
								var timeNdx = findTimeNdx( keys, time );
								keys.splice( timeNdx === -1 ? keys.length : timeNdx, 0, key );

							}

							key.addTarget( fullSid, transform, member, data );

						}

					} else {

						console.log( 'Could not find transform "' + channel.sid + '" in node ' + node.id );

					}

				}

				// post process
				for ( var i = 0; i < sids.length; i ++ ) {

					var sid = sids[ i ];

					for ( var j = 0; j < keys.length; j ++ ) {

						var key = keys[ j ];

						if ( !key.hasTarget( sid ) ) {

							interpolateKeys( keys, key, j, sid );

						}

					}

				}

				node.keys = keys;
				node.sids = sids;

			}

		}

		function findKey ( keys, time) {

			var retVal = null;

			for ( var i = 0, il = keys.length; i < il && retVal === null; i ++ ) {

				var key = keys[i];

				if ( key.time === time ) {

					retVal = key;

				} else if ( key.time > time ) {

					break;

				}

			}

			return retVal;

		}

		function findTimeNdx ( keys, time) {

			var ndx = -1;

			for ( var i = 0, il = keys.length; i < il && ndx === -1; i ++ ) {

				var key = keys[i];

				if ( key.time >= time ) {

					ndx = i;

				}

			}

			return ndx;

		}

		function interpolateKeys ( keys, key, ndx, fullSid ) {

			var prevKey = getPrevKeyWith( keys, fullSid, ndx ? ndx - 1 : 0 ),
				nextKey = getNextKeyWith( keys, fullSid, ndx + 1 );

			if ( prevKey && nextKey ) {

				var scale = (key.time - prevKey.time) / (nextKey.time - prevKey.time),
					prevTarget = prevKey.getTarget( fullSid ),
					nextData = nextKey.getTarget( fullSid ).data,
					prevData = prevTarget.data,
					data;

				if ( prevTarget.type === 'matrix' ) {

					data = prevData;

				} else if ( prevData.length ) {

					data = [];

					for ( var i = 0; i < prevData.length; ++ i ) {

						data[ i ] = prevData[ i ] + ( nextData[ i ] - prevData[ i ] ) * scale;

					}

				} else {

					data = prevData + ( nextData - prevData ) * scale;

				}

				key.addTarget( fullSid, prevTarget.transform, prevTarget.member, data );

			}

		}

		// Get next key with given sid

		function getNextKeyWith( keys, fullSid, ndx ) {

			for ( ; ndx < keys.length; ndx ++ ) {

				var key = keys[ ndx ];

				if ( key.hasTarget( fullSid ) ) {

					return key;

				}

			}

			return null;

		}

		// Get previous key with given sid

		function getPrevKeyWith( keys, fullSid, ndx ) {

			ndx = ndx >= 0 ? ndx : ndx + keys.length;

			for ( ; ndx >= 0; ndx -- ) {

				var key = keys[ ndx ];

				if ( key.hasTarget( fullSid ) ) {

					return key;

				}

			}

			return null;

		}

		function _Image() {

			this.id = "";
			this.init_from = "";

		}

		_Image.prototype.parse = function(element) {

			this.id = element.getAttribute('id');

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];

				if ( child.nodeName === 'init_from' ) {

					this.init_from = child.textContent;

				}

			}

			return this;

		};

		function Controller() {

			this.id = "";
			this.name = "";
			this.type = "";
			this.skin = null;
			this.morph = null;

		}

		Controller.prototype.parse = function( element ) {

			this.id = element.getAttribute('id');
			this.name = element.getAttribute('name');
			this.type = "none";

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];

				switch ( child.nodeName ) {

					case 'skin':

						this.skin = (new Skin()).parse(child);
						this.type = child.nodeName;
						break;

					case 'morph':

						this.morph = (new Morph()).parse(child);
						this.type = child.nodeName;
						break;

					default:
						break;

				}
			}

			return this;

		};

		function Morph() {

			this.method = null;
			this.source = null;
			this.targets = null;
			this.weights = null;

		}

		Morph.prototype.parse = function( element ) {

			var sources = {};
			var inputs = [];
			var i;

			this.method = element.getAttribute( 'method' );
			this.source = element.getAttribute( 'source' ).replace( /^#/, '' );

			for ( i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'source':

						var source = ( new Source() ).parse( child );
						sources[ source.id ] = source;
						break;

					case 'targets':

						inputs = this.parseInputs( child );
						break;

					default:

						console.log( child.nodeName );
						break;

				}

			}

			for ( i = 0; i < inputs.length; i ++ ) {

				var input = inputs[ i ];
				var source = sources[ input.source ];

				switch ( input.semantic ) {

					case 'MORPH_TARGET':

						this.targets = source.read();
						break;

					case 'MORPH_WEIGHT':

						this.weights = source.read();
						break;

					default:
						break;

				}
			}

			return this;

		};

		Morph.prototype.parseInputs = function(element) {

			var inputs = [];

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[i];
				if ( child.nodeType != 1) continue;

				switch ( child.nodeName ) {

					case 'input':

						inputs.push( (new Input()).parse(child) );
						break;

					default:
						break;
				}
			}

			return inputs;

		};

		function Skin() {

			this.source = "";
			this.bindShapeMatrix = null;
			this.invBindMatrices = [];
			this.joints = [];
			this.weights = [];

		}

		Skin.prototype.parse = function( element ) {

			var sources = {};
			var joints, weights;

			this.source = element.getAttribute( 'source' ).replace( /^#/, '' );
			this.invBindMatrices = [];
			this.joints = [];
			this.weights = [];

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[i];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'bind_shape_matrix':

						var f = _floats(child.textContent);
						this.bindShapeMatrix = getConvertedMat4( f );
						break;

					case 'source':

						var src = new Source().parse(child);
						sources[ src.id ] = src;
						break;

					case 'joints':

						joints = child;
						break;

					case 'vertex_weights':

						weights = child;
						break;

					default:

						console.log( child.nodeName );
						break;

				}
			}

			this.parseJoints( joints, sources );
			this.parseWeights( weights, sources );

			return this;

		};

		Skin.prototype.parseJoints = function ( element, sources ) {

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'input':

						var input = ( new Input() ).parse( child );
						var source = sources[ input.source ];

						if ( input.semantic === 'JOINT' ) {

							this.joints = source.read();

						} else if ( input.semantic === 'INV_BIND_MATRIX' ) {

							this.invBindMatrices = source.read();

						}

						break;

					default:
						break;
				}

			}

		};

		Skin.prototype.parseWeights = function ( element, sources ) {

			var v, vcount, inputs = [];

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'input':

						inputs.push( ( new Input() ).parse( child ) );
						break;

					case 'v':

						v = _ints( child.textContent );
						break;

					case 'vcount':

						vcount = _ints( child.textContent );
						break;

					default:
						break;

				}

			}

			var index = 0;

			for ( var i = 0; i < vcount.length; i ++ ) {

				var numBones = vcount[i];
				var vertex_weights = [];

				for ( var j = 0; j < numBones; j ++ ) {

					var influence = {};

					for ( var k = 0; k < inputs.length; k ++ ) {

						var input = inputs[ k ];
						var value = v[ index + input.offset ];

						switch ( input.semantic ) {

							case 'JOINT':

								influence.joint = value;//this.joints[value];
								break;

							case 'WEIGHT':

								influence.weight = sources[ input.source ].data[ value ];
								break;

							default:
								break;

						}

					}

					vertex_weights.push( influence );
					index += inputs.length;
				}

				for ( var j = 0; j < vertex_weights.length; j ++ ) {

					vertex_weights[ j ].index = i;

				}

				this.weights.push( vertex_weights );

			}

		};

		function VisualScene () {

			this.id = "";
			this.name = "";
			this.nodes = [];
			this.scene = new THREE.Group();

		}

		VisualScene.prototype.getChildById = function( id, recursive ) {

			for ( var i = 0; i < this.nodes.length; i ++ ) {

				var node = this.nodes[ i ].getChildById( id, recursive );

				if ( node ) {

					return node;

				}

			}

			return null;

		};

		VisualScene.prototype.getChildBySid = function( sid, recursive ) {

			for ( var i = 0; i < this.nodes.length; i ++ ) {

				var node = this.nodes[ i ].getChildBySid( sid, recursive );

				if ( node ) {

					return node;

				}

			}

			return null;

		};

		VisualScene.prototype.parse = function( element ) {

			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );
			this.nodes = [];

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'node':

						this.nodes.push( ( new Node() ).parse( child ) );
						break;

					default:
						break;

				}

			}

			return this;

		};

		function Node() {

			this.id = "";
			this.name = "";
			this.sid = "";
			this.nodes = [];
			this.controllers = [];
			this.transforms = [];
			this.geometries = [];
			this.channels = [];
			this.matrix = new THREE.Matrix4();

		}

		Node.prototype.getChannelForTransform = function( transformSid ) {

			for ( var i = 0; i < this.channels.length; i ++ ) {

				var channel = this.channels[i];
				var parts = channel.target.split('/');
				var id = parts.shift();
				var sid = parts.shift();
				var dotSyntax = (sid.indexOf(".") >= 0);
				var arrSyntax = (sid.indexOf("(") >= 0);
				var arrIndices;

				if ( dotSyntax ) {

					parts = sid.split(".");
					sid = parts.shift();

				} else if ( arrSyntax ) {

					arrIndices = sid.split("(");
					sid = arrIndices.shift();

					for ( var j = 0; j < arrIndices.length; j ++ ) {

						arrIndices[ j ] = parseInt( arrIndices[ j ].replace( /\)/, '' ) );

					}

				}

				if ( sid === transformSid ) {

					channel.info = { sid: sid, dotSyntax: dotSyntax, arrSyntax: arrSyntax, arrIndices: arrIndices };
					return channel;

				}

			}

			return null;

		};

		Node.prototype.getChildById = function ( id, recursive ) {

			if ( this.id === id ) {

				return this;

			}

			if ( recursive ) {

				for ( var i = 0; i < this.nodes.length; i ++ ) {

					var n = this.nodes[ i ].getChildById( id, recursive );

					if ( n ) {

						return n;

					}

				}

			}

			return null;

		};

		Node.prototype.getChildBySid = function ( sid, recursive ) {

			if ( this.sid === sid ) {

				return this;

			}

			if ( recursive ) {

				for ( var i = 0; i < this.nodes.length; i ++ ) {

					var n = this.nodes[ i ].getChildBySid( sid, recursive );

					if ( n ) {

						return n;

					}

				}
			}

			return null;

		};

		Node.prototype.getTransformBySid = function ( sid ) {

			for ( var i = 0; i < this.transforms.length; i ++ ) {

				if ( this.transforms[ i ].sid === sid ) return this.transforms[ i ];

			}

			return null;

		};

		Node.prototype.parse = function( element ) {

			var url;

			this.id = element.getAttribute('id');
			this.sid = element.getAttribute('sid');
			this.name = element.getAttribute('name');
			this.type = element.getAttribute('type');
			this.layer = element.getAttribute('layer');

			this.type = this.type === 'JOINT' ? this.type : 'NODE';

			this.nodes = [];
			this.transforms = [];
			this.geometries = [];
			this.cameras = [];
			this.lights = [];
			this.controllers = [];
			this.matrix = new THREE.Matrix4();

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'node':

						this.nodes.push( ( new Node() ).parse( child ) );
						break;

					case 'instance_camera':

						this.cameras.push( ( new InstanceCamera() ).parse( child ) );
						break;

					case 'instance_controller':

						this.controllers.push( ( new InstanceController() ).parse( child ) );
						break;

					case 'instance_geometry':

						this.geometries.push( ( new InstanceGeometry() ).parse( child ) );
						break;

					case 'instance_light':

						this.lights.push( ( new InstanceLight() ).parse( child ) );
						break;

					case 'instance_node':

						url = child.getAttribute( 'url' ).replace( /^#/, '' );
						var iNode = getLibraryNode( url );

						if ( iNode ) {

							this.nodes.push( ( new Node() ).parse( iNode )) ;

						}

						break;

					case 'rotate':
					case 'translate':
					case 'scale':
					case 'matrix':
					case 'lookat':
					case 'skew':

						this.transforms.push( ( new Transform() ).parse( child ) );
						break;

					case 'extra':
						break;

					default:

						console.log( child.nodeName );
						break;

				}

			}

			this.channels = getChannelsForNode( this );
			bakeAnimations( this );

			this.updateMatrix();

			return this;

		};

		Node.prototype.updateMatrix = function () {

			this.matrix.identity();

			for ( var i = 0; i < this.transforms.length; i ++ ) {

				this.transforms[ i ].apply( this.matrix );

			}

		};

		function Transform () {

			this.sid = "";
			this.type = "";
			this.data = [];
			this.obj = null;

		}

		Transform.prototype.parse = function ( element ) {

			this.sid = element.getAttribute( 'sid' );
			this.type = element.nodeName;
			this.data = _floats( element.textContent );
			this.convert();

			return this;

		};

		Transform.prototype.convert = function () {

			switch ( this.type ) {

				case 'matrix':

					this.obj = getConvertedMat4( this.data );
					break;

				case 'rotate':

					this.angle = THREE.Math.degToRad( this.data[3] );

				case 'translate':

					fixCoords( this.data, -1 );
					this.obj = new THREE.Vector3( this.data[ 0 ], this.data[ 1 ], this.data[ 2 ] );
					break;

				case 'scale':

					fixCoords( this.data, 1 );
					this.obj = new THREE.Vector3( this.data[ 0 ], this.data[ 1 ], this.data[ 2 ] );
					break;

				default:
					console.log( 'Can not convert Transform of type ' + this.type );
					break;

			}

		};

		Transform.prototype.apply = function () {

			var m1 = new THREE.Matrix4();

			return function ( matrix ) {

				switch ( this.type ) {

					case 'matrix':

						matrix.multiply( this.obj );

						break;

					case 'translate':

						matrix.multiply( m1.makeTranslation( this.obj.x, this.obj.y, this.obj.z ) );

						break;

					case 'rotate':

						matrix.multiply( m1.makeRotationAxis( this.obj, this.angle ) );

						break;

					case 'scale':

						matrix.scale( this.obj );

						break;

				}

			};

		}();

		Transform.prototype.update = function ( data, member ) {

			var members = [ 'X', 'Y', 'Z', 'ANGLE' ];

			switch ( this.type ) {

				case 'matrix':

					if ( ! member ) {

						this.obj.copy( data );

					} else if ( member.length === 1 ) {

						switch ( member[ 0 ] ) {

							case 0:

								this.obj.n11 = data[ 0 ];
								this.obj.n21 = data[ 1 ];
								this.obj.n31 = data[ 2 ];
								this.obj.n41 = data[ 3 ];

								break;

							case 1:

								this.obj.n12 = data[ 0 ];
								this.obj.n22 = data[ 1 ];
								this.obj.n32 = data[ 2 ];
								this.obj.n42 = data[ 3 ];

								break;

							case 2:

								this.obj.n13 = data[ 0 ];
								this.obj.n23 = data[ 1 ];
								this.obj.n33 = data[ 2 ];
								this.obj.n43 = data[ 3 ];

								break;

							case 3:

								this.obj.n14 = data[ 0 ];
								this.obj.n24 = data[ 1 ];
								this.obj.n34 = data[ 2 ];
								this.obj.n44 = data[ 3 ];

								break;

						}

					} else if ( member.length === 2 ) {

						var propName = 'n' + ( member[ 0 ] + 1 ) + ( member[ 1 ] + 1 );
						this.obj[ propName ] = data;

					} else {

						console.log('Incorrect addressing of matrix in transform.');

					}

					break;

				case 'translate':
				case 'scale':

					if ( Object.prototype.toString.call( member ) === '[object Array]' ) {

						member = members[ member[ 0 ] ];

					}

					switch ( member ) {

						case 'X':

							this.obj.x = data;
							break;

						case 'Y':

							this.obj.y = data;
							break;

						case 'Z':

							this.obj.z = data;
							break;

						default:

							this.obj.x = data[ 0 ];
							this.obj.y = data[ 1 ];
							this.obj.z = data[ 2 ];
							break;

					}

					break;

				case 'rotate':

					if ( Object.prototype.toString.call( member ) === '[object Array]' ) {

						member = members[ member[ 0 ] ];

					}

					switch ( member ) {

						case 'X':

							this.obj.x = data;
							break;

						case 'Y':

							this.obj.y = data;
							break;

						case 'Z':

							this.obj.z = data;
							break;

						case 'ANGLE':

							this.angle = THREE.Math.degToRad( data );
							break;

						default:

							this.obj.x = data[ 0 ];
							this.obj.y = data[ 1 ];
							this.obj.z = data[ 2 ];
							this.angle = THREE.Math.degToRad( data[ 3 ] );
							break;

					}
					break;

			}

		};

		function InstanceController() {

			this.url = "";
			this.skeleton = [];
			this.instance_material = [];

		}

		InstanceController.prototype.parse = function ( element ) {

			this.url = element.getAttribute('url').replace(/^#/, '');
			this.skeleton = [];
			this.instance_material = [];

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'skeleton':

						this.skeleton.push( child.textContent.replace(/^#/, '') );
						break;

					case 'bind_material':

						var instances = child.querySelectorAll('instance_material');

						for ( var j = 0; j < instances.length; j ++ ) {

							var instance = instances[j];
							this.instance_material.push( (new InstanceMaterial()).parse(instance) );

						}


						break;

					case 'extra':
						break;

					default:
						break;

				}
			}

			return this;

		};

		function InstanceMaterial () {

			this.symbol = "";
			this.target = "";

		}

		InstanceMaterial.prototype.parse = function ( element ) {

			this.symbol = element.getAttribute('symbol');
			this.target = element.getAttribute('target').replace(/^#/, '');
			return this;

		};

		function InstanceGeometry() {

			this.url = "";
			this.instance_material = [];

		}

		InstanceGeometry.prototype.parse = function ( element ) {

			this.url = element.getAttribute('url').replace(/^#/, '');
			this.instance_material = [];

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[i];
				if ( child.nodeType != 1 ) continue;

				if ( child.nodeName === 'bind_material' ) {

					var instances = child.querySelectorAll('instance_material');

					for ( var j = 0; j < instances.length; j ++ ) {

						var instance = instances[j];
						this.instance_material.push( (new InstanceMaterial()).parse(instance) );

					}

					break;

				}

			}

			return this;

		};

		function Geometry() {

			this.id = "";
			this.mesh = null;

		}

		Geometry.prototype.parse = function ( element ) {

			this.id = element.getAttribute('id');

			extractDoubleSided( this, element );

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[i];

				switch ( child.nodeName ) {

					case 'mesh':

						this.mesh = (new Mesh(this)).parse(child);
						break;

					case 'extra':

						// console.log( child );
						break;

					default:
						break;
				}
			}

			return this;

		};

		function Mesh( geometry ) {

			this.geometry = geometry.id;
			this.primitives = [];
			this.vertices = null;
			this.geometry3js = null;

		}

		Mesh.prototype.parse = function ( element ) {

			this.primitives = [];

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];

				switch ( child.nodeName ) {

					case 'source':

						_source( child );
						break;

					case 'vertices':

						this.vertices = ( new Vertices() ).parse( child );
						break;

					case 'linestrips':

						this.primitives.push( ( new LineStrips().parse( child ) ) );
						break;

					case 'triangles':

						this.primitives.push( ( new Triangles().parse( child ) ) );
						break;

					case 'polygons':

						this.primitives.push( ( new Polygons().parse( child ) ) );
						break;

					case 'polylist':

						this.primitives.push( ( new Polylist().parse( child ) ) );
						break;

					default:
						break;

				}

			}

			this.geometry3js = new THREE.Geometry();

			if ( this.vertices === null ) {

				// TODO (mrdoob): Study case when this is null (carrier.dae)

				return this;

			}

			var vertexData = sources[ this.vertices.input['POSITION'].source ].data;

			for ( var i = 0; i < vertexData.length; i += 3 ) {

				this.geometry3js.vertices.push( getConvertedVec3( vertexData, i ).clone() );

			}

			for ( var i = 0; i < this.primitives.length; i ++ ) {

				var primitive = this.primitives[ i ];
				primitive.setVertices( this.vertices );
				this.handlePrimitive( primitive, this.geometry3js );

			}

			if ( this.geometry3js.calcNormals ) {

				this.geometry3js.computeVertexNormals();
				delete this.geometry3js.calcNormals;

			}

			return this;

		};

		Mesh.prototype.handlePrimitive = function ( primitive, geom ) {

			if ( primitive instanceof LineStrips ) {

				// TODO: Handle indices. Maybe easier with BufferGeometry?

				geom.isLineStrip = true;
				return;

			}

			var j, k, pList = primitive.p, inputs = primitive.inputs;
			var input, index, idx32;
			var source, numParams;
			var vcount, vcIndex = 0, maxOffset = 0;
			var texture_sets = [];

			for ( j = 0; j < inputs.length; j ++ ) {

				input = inputs[ j ];

				var offset = input.offset + 1;
				maxOffset = (maxOffset < offset) ? offset : maxOffset;

				switch ( input.semantic ) {

					case 'TEXCOORD':
						texture_sets.push( input.set );
						break;

				}

			}

			for ( var pCount = 0; pCount < pList.length; ++ pCount ) {

				var p = pList[ pCount ], i = 0;

				while ( i < p.length ) {

					var vs = [];
					var ns = [];
					var ts = null;
					var cs = [];

					if ( primitive.vcount ) {

						vcount = primitive.vcount.length ? primitive.vcount[ vcIndex ++ ] : primitive.vcount;

					} else {

						vcount = p.length / maxOffset;

					}


					for ( j = 0; j < vcount; j ++ ) {

						for ( k = 0; k < inputs.length; k ++ ) {

							input = inputs[ k ];
							source = sources[ input.source ];

							index = p[ i + ( j * maxOffset ) + input.offset ];
							numParams = source.accessor.params.length;
							idx32 = index * numParams;

							switch ( input.semantic ) {

								case 'VERTEX':

									vs.push( index );

									break;

								case 'NORMAL':

									ns.push( getConvertedVec3( source.data, idx32 ) );

									break;

								case 'TEXCOORD':

									ts = ts || { };
									if ( ts[ input.set ] === undefined ) ts[ input.set ] = [];
									// invert the V
									ts[ input.set ].push( new THREE.Vector2( source.data[ idx32 ], source.data[ idx32 + 1 ] ) );

									break;

								case 'COLOR':

									cs.push( new THREE.Color().setRGB( source.data[ idx32 ], source.data[ idx32 + 1 ], source.data[ idx32 + 2 ] ) );

									break;

								default:

									break;

							}

						}

					}

					if ( ns.length === 0 ) {

						// check the vertices inputs
						input = this.vertices.input.NORMAL;

						if ( input ) {

							source = sources[ input.source ];
							numParams = source.accessor.params.length;

							for ( var ndx = 0, len = vs.length; ndx < len; ndx ++ ) {

								ns.push( getConvertedVec3( source.data, vs[ ndx ] * numParams ) );

							}

						} else {

							geom.calcNormals = true;

						}

					}

					if ( !ts ) {

						ts = { };
						// check the vertices inputs
						input = this.vertices.input.TEXCOORD;

						if ( input ) {

							texture_sets.push( input.set );
							source = sources[ input.source ];
							numParams = source.accessor.params.length;

							for ( var ndx = 0, len = vs.length; ndx < len; ndx ++ ) {

								idx32 = vs[ ndx ] * numParams;
								if ( ts[ input.set ] === undefined ) ts[ input.set ] = [ ];
								// invert the V
								ts[ input.set ].push( new THREE.Vector2( source.data[ idx32 ], 1.0 - source.data[ idx32 + 1 ] ) );

							}

						}

					}

					if ( cs.length === 0 ) {

						// check the vertices inputs
						input = this.vertices.input.COLOR;

						if ( input ) {

							source = sources[ input.source ];
							numParams = source.accessor.params.length;

							for ( var ndx = 0, len = vs.length; ndx < len; ndx ++ ) {

								idx32 = vs[ ndx ] * numParams;
								cs.push( new THREE.Color().setRGB( source.data[ idx32 ], source.data[ idx32 + 1 ], source.data[ idx32 + 2 ] ) );

							}

						}

					}

					var face = null, faces = [], uv, uvArr;

					if ( vcount === 3 ) {

						faces.push( new THREE.Face3( vs[0], vs[1], vs[2], ns, cs.length ? cs : new THREE.Color() ) );

					} else if ( vcount === 4 ) {

						faces.push( new THREE.Face3( vs[0], vs[1], vs[3], ns.length ? [ ns[0].clone(), ns[1].clone(), ns[3].clone() ] : [], cs.length ? [ cs[0], cs[1], cs[3] ] : new THREE.Color() ) );

						faces.push( new THREE.Face3( vs[1], vs[2], vs[3], ns.length ? [ ns[1].clone(), ns[2].clone(), ns[3].clone() ] : [], cs.length ? [ cs[1], cs[2], cs[3] ] : new THREE.Color() ) );

					} else if ( vcount > 4 && options.subdivideFaces ) {

						var clr = cs.length ? cs : new THREE.Color(),
							vec1, vec2, vec3, v1, v2, norm;

						// subdivide into multiple Face3s

						for ( k = 1; k < vcount - 1; ) {

							faces.push( new THREE.Face3( vs[0], vs[k], vs[k + 1], ns.length ? [ ns[0].clone(), ns[k ++].clone(), ns[k].clone() ] : [], clr ) );

						}

					}

					if ( faces.length ) {

						for ( var ndx = 0, len = faces.length; ndx < len; ndx ++ ) {

							face = faces[ndx];
							face.daeMaterial = primitive.material;
							geom.faces.push( face );

							for ( k = 0; k < texture_sets.length; k ++ ) {

								uv = ts[ texture_sets[k] ];

								if ( vcount > 4 ) {

									// Grab the right UVs for the vertices in this face
									uvArr = [ uv[0], uv[ndx + 1], uv[ndx + 2] ];

								} else if ( vcount === 4 ) {

									if ( ndx === 0 ) {

										uvArr = [ uv[0], uv[1], uv[3] ];

									} else {

										uvArr = [ uv[1].clone(), uv[2], uv[3].clone() ];

									}

								} else {

									uvArr = [ uv[0], uv[1], uv[2] ];

								}

								if ( geom.faceVertexUvs[k] === undefined ) {

									geom.faceVertexUvs[k] = [];

								}

								geom.faceVertexUvs[k].push( uvArr );

							}

						}

					} else {

						console.log( 'dropped face with vcount ' + vcount + ' for geometry with id: ' + geom.id );

					}

					i += maxOffset * vcount;

				}

			}

		};

		function Polygons () {

			this.material = "";
			this.count = 0;
			this.inputs = [];
			this.vcount = null;
			this.p = [];
			this.geometry = new THREE.Geometry();

		}

		Polygons.prototype.setVertices = function ( vertices ) {

			for ( var i = 0; i < this.inputs.length; i ++ ) {

				if ( this.inputs[ i ].source === vertices.id ) {

					this.inputs[ i ].source = vertices.input[ 'POSITION' ].source;

				}

			}

		};

		Polygons.prototype.parse = function ( element ) {

			this.material = element.getAttribute( 'material' );
			this.count = _attr_as_int( element, 'count', 0 );

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];

				switch ( child.nodeName ) {

					case 'input':

						this.inputs.push( ( new Input() ).parse( element.childNodes[ i ] ) );
						break;

					case 'vcount':

						this.vcount = _ints( child.textContent );
						break;

					case 'p':

						this.p.push( _ints( child.textContent ) );
						break;

					case 'ph':

						console.warn( 'polygon holes not yet supported!' );
						break;

					default:
						break;

				}

			}

			return this;

		};

		function Polylist () {

			Polygons.call( this );

			this.vcount = [];

		}

		Polylist.prototype = Object.create( Polygons.prototype );
		Polylist.prototype.constructor = Polylist;

		function LineStrips() {

			Polygons.call( this );

			this.vcount = 1;

		}

		LineStrips.prototype = Object.create( Polygons.prototype );
		LineStrips.prototype.constructor = LineStrips;

		function Triangles () {

			Polygons.call( this );

			this.vcount = 3;

		}

		Triangles.prototype = Object.create( Polygons.prototype );
		Triangles.prototype.constructor = Triangles;

		function Accessor() {

			this.source = "";
			this.count = 0;
			this.stride = 0;
			this.params = [];

		}

		Accessor.prototype.parse = function ( element ) {

			this.params = [];
			this.source = element.getAttribute( 'source' );
			this.count = _attr_as_int( element, 'count', 0 );
			this.stride = _attr_as_int( element, 'stride', 0 );

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];

				if ( child.nodeName === 'param' ) {

					var param = {};
					param[ 'name' ] = child.getAttribute( 'name' );
					param[ 'type' ] = child.getAttribute( 'type' );
					this.params.push( param );

				}

			}

			return this;

		};

		function Vertices() {

			this.input = {};

		}

		Vertices.prototype.parse = function ( element ) {

			this.id = element.getAttribute('id');

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				if ( element.childNodes[i].nodeName === 'input' ) {

					var input = ( new Input() ).parse( element.childNodes[ i ] );
					this.input[ input.semantic ] = input;

				}

			}

			return this;

		};

		function Input () {

			this.semantic = "";
			this.offset = 0;
			this.source = "";
			this.set = 0;

		}

		Input.prototype.parse = function ( element ) {

			this.semantic = element.getAttribute('semantic');
			this.source = element.getAttribute('source').replace(/^#/, '');
			this.set = _attr_as_int(element, 'set', -1);
			this.offset = _attr_as_int(element, 'offset', 0);

			if ( this.semantic === 'TEXCOORD' && this.set < 0 ) {

				this.set = 0;

			}

			return this;

		};

		function Source ( id ) {

			this.id = id;
			this.type = null;

		}

		Source.prototype.parse = function ( element ) {

			this.id = element.getAttribute( 'id' );

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[i];

				switch ( child.nodeName ) {

					case 'bool_array':

						this.data = _bools( child.textContent );
						this.type = child.nodeName;
						break;

					case 'float_array':

						this.data = _floats( child.textContent );
						this.type = child.nodeName;
						break;

					case 'int_array':

						this.data = _ints( child.textContent );
						this.type = child.nodeName;
						break;

					case 'IDREF_array':
					case 'Name_array':

						this.data = _strings( child.textContent );
						this.type = child.nodeName;
						break;

					case 'technique_common':

						for ( var j = 0; j < child.childNodes.length; j ++ ) {

							if ( child.childNodes[ j ].nodeName === 'accessor' ) {

								this.accessor = ( new Accessor() ).parse( child.childNodes[ j ] );
								break;

							}
						}
						break;

					default:
						// console.log(child.nodeName);
						break;

				}

			}

			return this;

		};

		Source.prototype.read = function () {

			var result = [];

			//for (var i = 0; i < this.accessor.params.length; i++) {

			var param = this.accessor.params[ 0 ];

				//console.log(param.name + " " + param.type);

			switch ( param.type ) {

				case 'IDREF':
				case 'Name': case 'name':
				case 'float':

					return this.data;

				case 'float4x4':

					for ( var j = 0; j < this.data.length; j += 16 ) {

						var s = this.data.slice( j, j + 16 );
						var m = getConvertedMat4( s );
						result.push( m );
					}

					break;

				default:

					console.log( 'ColladaLoader: Source: Read dont know how to read ' + param.type + '.' );
					break;

			}

			//}

			return result;

		};

		function Material () {

			this.id = "";
			this.name = "";
			this.instance_effect = null;

		}

		Material.prototype.parse = function ( element ) {

			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				if ( element.childNodes[ i ].nodeName === 'instance_effect' ) {

					this.instance_effect = ( new InstanceEffect() ).parse( element.childNodes[ i ] );
					break;

				}

			}

			return this;

		};

		function ColorOrTexture () {

			this.color = new THREE.Color();
			this.color.setRGB( Math.random(), Math.random(), Math.random() );
			this.color.a = 1.0;

			this.texture = null;
			this.texcoord = null;
			this.texOpts = null;

		}

		ColorOrTexture.prototype.isColor = function () {

			return ( this.texture === null );

		};

		ColorOrTexture.prototype.isTexture = function () {

			return ( this.texture != null );

		};

		ColorOrTexture.prototype.parse = function ( element ) {

			if (element.nodeName === 'transparent') {

				this.opaque = element.getAttribute('opaque');

			}

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'color':

						var rgba = _floats( child.textContent );
						this.color = new THREE.Color();
						this.color.setRGB( rgba[0], rgba[1], rgba[2] );
						this.color.a = rgba[3];
						break;

					case 'texture':

						this.texture = child.getAttribute('texture');
						this.texcoord = child.getAttribute('texcoord');
						// Defaults from:
						// https://collada.org/mediawiki/index.php/Maya_texture_placement_MAYA_extension
						this.texOpts = {
							offsetU: 0,
							offsetV: 0,
							repeatU: 1,
							repeatV: 1,
							wrapU: 1,
							wrapV: 1
						};
						this.parseTexture( child );
						break;

					default:
						break;

				}

			}

			return this;

		};

		ColorOrTexture.prototype.parseTexture = function ( element ) {

			if ( ! element.childNodes ) return this;

			// This should be supported by Maya, 3dsMax, and MotionBuilder

			if ( element.childNodes[1] && element.childNodes[1].nodeName === 'extra' ) {

				element = element.childNodes[1];

				if ( element.childNodes[1] && element.childNodes[1].nodeName === 'technique' ) {

					element = element.childNodes[1];

				}

			}

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];

				switch ( child.nodeName ) {

					case 'offsetU':
					case 'offsetV':
					case 'repeatU':
					case 'repeatV':

						this.texOpts[ child.nodeName ] = parseFloat( child.textContent );

						break;

					case 'wrapU':
					case 'wrapV':

						// some dae have a value of true which becomes NaN via parseInt

						if ( child.textContent.toUpperCase() === 'TRUE' ) {

							this.texOpts[ child.nodeName ] = 1;

						} else {

							this.texOpts[ child.nodeName ] = parseInt( child.textContent );

						}
						break;

					default:

						this.texOpts[ child.nodeName ] = child.textContent;

						break;

				}

			}

			return this;

		};

		function Shader ( type, effect ) {

			this.type = type;
			this.effect = effect;
			this.material = null;

		}

		Shader.prototype.parse = function ( element ) {

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'emission':
					case 'diffuse':
					case 'specular':
					case 'transparent':

						this[ child.nodeName ] = ( new ColorOrTexture() ).parse( child );
						break;

					case 'bump':

						// If 'bumptype' is 'heightfield', create a 'bump' property
						// Else if 'bumptype' is 'normalmap', create a 'normal' property
						// (Default to 'bump')
						var bumpType = child.getAttribute( 'bumptype' );
						if ( bumpType ) {
							if ( bumpType.toLowerCase() === "heightfield" ) {
								this[ 'bump' ] = ( new ColorOrTexture() ).parse( child );
							} else if ( bumpType.toLowerCase() === "normalmap" ) {
								this[ 'normal' ] = ( new ColorOrTexture() ).parse( child );
							} else {
								console.error( "Shader.prototype.parse: Invalid value for attribute 'bumptype' (" + bumpType + ") - valid bumptypes are 'HEIGHTFIELD' and 'NORMALMAP' - defaulting to 'HEIGHTFIELD'" );
								this[ 'bump' ] = ( new ColorOrTexture() ).parse( child );
							}
						} else {
							console.warn( "Shader.prototype.parse: Attribute 'bumptype' missing from bump node - defaulting to 'HEIGHTFIELD'" );
							this[ 'bump' ] = ( new ColorOrTexture() ).parse( child );
						}

						break;

					case 'shininess':
					case 'reflectivity':
					case 'index_of_refraction':
					case 'transparency':

						var f = child.querySelectorAll('float');

						if ( f.length > 0 )
							this[ child.nodeName ] = parseFloat( f[ 0 ].textContent );

						break;

					default:
						break;

				}

			}

			this.create();
			return this;

		};

		Shader.prototype.create = function() {

			var props = {};

			var transparent = false;

			if (this['transparency'] !== undefined && this['transparent'] !== undefined) {
				// convert transparent color RBG to average value
				var transparentColor = this['transparent'];
				var transparencyLevel = (this.transparent.color.r + this.transparent.color.g + this.transparent.color.b) / 3 * this.transparency;

				if (transparencyLevel > 0) {
					transparent = true;
					props[ 'transparent' ] = true;
					props[ 'opacity' ] = 1 - transparencyLevel;

				}

			}

			var keys = {
				'diffuse':'map',
				'ambient':'lightMap',
				'specular':'specularMap',
				'emission':'emissionMap',
				'bump':'bumpMap',
				'normal':'normalMap'
				};

			for ( var prop in this ) {

				switch ( prop ) {

					case 'ambient':
					case 'emission':
					case 'diffuse':
					case 'specular':
					case 'bump':
					case 'normal':

						var cot = this[ prop ];

						if ( cot instanceof ColorOrTexture ) {

							if ( cot.isTexture() ) {

								var samplerId = cot.texture;
								var sampler = this.effect.sampler[samplerId];

								if ( sampler !== undefined && sampler.source !== undefined ) {

									var surface = this.effect.surface[sampler.source];

									if ( surface !== undefined ) {

										var image = images[ surface.init_from ];

										if ( image ) {

											var url = baseUrl + image.init_from;

											var texture;
											var loader = THREE.Loader.Handlers.get( url );

											if ( loader !== null ) {

												texture = loader.load( url );

											} else {

												texture = new THREE.Texture();

												loadTextureImage( texture, url );

											}

											if ( sampler.wrap_s === "MIRROR" ) {

												texture.wrapS = THREE.MirroredRepeatWrapping;

											} else if ( sampler.wrap_s === "WRAP" || cot.texOpts.wrapU ) {

												texture.wrapS = THREE.RepeatWrapping;

											} else {

												texture.wrapS = THREE.ClampToEdgeWrapping;

											}

											if ( sampler.wrap_t === "MIRROR" ) {

												texture.wrapT = THREE.MirroredRepeatWrapping;

											} else if ( sampler.wrap_t === "WRAP" || cot.texOpts.wrapV ) {

												texture.wrapT = THREE.RepeatWrapping;

											} else {

												texture.wrapT = THREE.ClampToEdgeWrapping;

											}

											texture.offset.x = cot.texOpts.offsetU;
											texture.offset.y = cot.texOpts.offsetV;
											texture.repeat.x = cot.texOpts.repeatU;
											texture.repeat.y = cot.texOpts.repeatV;
											props[keys[prop]] = texture;

											// Texture with baked lighting?
											if (prop === 'emission') props['emissive'] = 0xffffff;

										}

									}

								}

							} else if ( prop === 'diffuse' || !transparent ) {

								if ( prop === 'emission' ) {

									props[ 'emissive' ] = cot.color.getHex();

								} else {

									props[ prop ] = cot.color.getHex();

								}

							}

						}

						break;

					case 'shininess':

						props[ prop ] = this[ prop ];
						break;

					case 'reflectivity':

						props[ prop ] = this[ prop ];
						if ( props[ prop ] > 0.0 ) props['envMap'] = options.defaultEnvMap;
						props['combine'] = THREE.MixOperation;	//mix regular shading with reflective component
						break;

					case 'index_of_refraction':

						props[ 'refractionRatio' ] = this[ prop ]; //TODO: "index_of_refraction" becomes "refractionRatio" in shader, but I'm not sure if the two are actually comparable
						if ( this[ prop ] !== 1.0 ) props['envMap'] = options.defaultEnvMap;
						break;

					case 'transparency':
						// gets figured out up top
						break;

					default:
						break;

				}

			}

			props[ 'shading' ] = preferredShading;
			props[ 'side' ] = this.effect.doubleSided ? THREE.DoubleSide : THREE.FrontSide;

			if ( props.diffuse !== undefined ) {

				props.color = props.diffuse;
				delete props.diffuse;

			}

			switch ( this.type ) {

				case 'constant':

					if (props.emissive != undefined) props.color = props.emissive;
					this.material = new THREE.MeshBasicMaterial( props );
					break;

				case 'phong':
				case 'blinn':

					this.material = new THREE.MeshPhongMaterial( props );
					break;

				case 'lambert':
				default:

					this.material = new THREE.MeshLambertMaterial( props );
					break;

			}

			return this.material;

		};

		function Surface ( effect ) {

			this.effect = effect;
			this.init_from = null;
			this.format = null;

		}

		Surface.prototype.parse = function ( element ) {

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'init_from':

						this.init_from = child.textContent;
						break;

					case 'format':

						this.format = child.textContent;
						break;

					default:

						console.log( "unhandled Surface prop: " + child.nodeName );
						break;

				}

			}

			return this;

		};

		function Sampler2D ( effect ) {

			this.effect = effect;
			this.source = null;
			this.wrap_s = null;
			this.wrap_t = null;
			this.minfilter = null;
			this.magfilter = null;
			this.mipfilter = null;

		}

		Sampler2D.prototype.parse = function ( element ) {

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'source':

						this.source = child.textContent;
						break;

					case 'minfilter':

						this.minfilter = child.textContent;
						break;

					case 'magfilter':

						this.magfilter = child.textContent;
						break;

					case 'mipfilter':

						this.mipfilter = child.textContent;
						break;

					case 'wrap_s':

						this.wrap_s = child.textContent;
						break;

					case 'wrap_t':

						this.wrap_t = child.textContent;
						break;

					default:

						console.log( "unhandled Sampler2D prop: " + child.nodeName );
						break;

				}

			}

			return this;

		};

		function Effect () {

			this.id = "";
			this.name = "";
			this.shader = null;
			this.surface = {};
			this.sampler = {};

		}

		Effect.prototype.create = function () {

			if ( this.shader === null ) {

				return null;

			}

		};

		Effect.prototype.parse = function ( element ) {

			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );

			extractDoubleSided( this, element );

			this.shader = null;

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'profile_COMMON':

						this.parseTechnique( this.parseProfileCOMMON( child ) );
						break;

					default:
						break;

				}

			}

			return this;

		};

		Effect.prototype.parseNewparam = function ( element ) {

			var sid = element.getAttribute( 'sid' );

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'surface':

						this.surface[sid] = ( new Surface( this ) ).parse( child );
						break;

					case 'sampler2D':

						this.sampler[sid] = ( new Sampler2D( this ) ).parse( child );
						break;

					case 'extra':

						break;

					default:

						console.log( child.nodeName );
						break;

				}

			}

		};

		Effect.prototype.parseProfileCOMMON = function ( element ) {

			var technique;

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];

				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'profile_COMMON':

						this.parseProfileCOMMON( child );
						break;

					case 'technique':

						technique = child;
						break;

					case 'newparam':

						this.parseNewparam( child );
						break;

					case 'image':

						var _image = ( new _Image() ).parse( child );
						images[ _image.id ] = _image;
						break;

					case 'extra':
						break;

					default:

						console.log( child.nodeName );
						break;

				}

			}

			return technique;

		};

		Effect.prototype.parseTechnique = function ( element ) {

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[i];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'constant':
					case 'lambert':
					case 'blinn':
					case 'phong':

						this.shader = ( new Shader( child.nodeName, this ) ).parse( child );
						break;
					case 'extra':
						this.parseExtra(child);
						break;
					default:
						break;

				}

			}

		};

		Effect.prototype.parseExtra = function ( element ) {

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[i];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'technique':
						this.parseExtraTechnique( child );
						break;
					default:
						break;

				}

			}

		};

		Effect.prototype.parseExtraTechnique = function ( element ) {

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[i];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'bump':
						this.shader.parse( element );
						break;
					default:
						break;

				}

			}

		};

		function InstanceEffect () {

			this.url = "";

		}

		InstanceEffect.prototype.parse = function ( element ) {

			this.url = element.getAttribute( 'url' ).replace( /^#/, '' );
			return this;

		};

		function Animation() {

			this.id = "";
			this.name = "";
			this.source = {};
			this.sampler = [];
			this.channel = [];

		}

		Animation.prototype.parse = function ( element ) {

			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );
			this.source = {};

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];

				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'animation':

						var anim = ( new Animation() ).parse( child );

						for ( var src in anim.source ) {

							this.source[ src ] = anim.source[ src ];

						}

						for ( var j = 0; j < anim.channel.length; j ++ ) {

							this.channel.push( anim.channel[ j ] );
							this.sampler.push( anim.sampler[ j ] );

						}

						break;

					case 'source':

						var src = ( new Source() ).parse( child );
						this.source[ src.id ] = src;
						break;

					case 'sampler':

						this.sampler.push( ( new Sampler( this ) ).parse( child ) );
						break;

					case 'channel':

						this.channel.push( ( new Channel( this ) ).parse( child ) );
						break;

					default:
						break;

				}

			}

			return this;

		};

		function Channel( animation ) {

			this.animation = animation;
			this.source = "";
			this.target = "";
			this.fullSid = null;
			this.sid = null;
			this.dotSyntax = null;
			this.arrSyntax = null;
			this.arrIndices = null;
			this.member = null;

		}

		Channel.prototype.parse = function ( element ) {

			this.source = element.getAttribute( 'source' ).replace( /^#/, '' );
			this.target = element.getAttribute( 'target' );

			var parts = this.target.split( '/' );

			var id = parts.shift();
			var sid = parts.shift();

			var dotSyntax = ( sid.indexOf(".") >= 0 );
			var arrSyntax = ( sid.indexOf("(") >= 0 );

			if ( dotSyntax ) {

				parts = sid.split(".");
				this.sid = parts.shift();
				this.member = parts.shift();

			} else if ( arrSyntax ) {

				var arrIndices = sid.split("(");
				this.sid = arrIndices.shift();

				for (var j = 0; j < arrIndices.length; j ++ ) {

					arrIndices[j] = parseInt( arrIndices[j].replace(/\)/, '') );

				}

				this.arrIndices = arrIndices;

			} else {

				this.sid = sid;

			}

			this.fullSid = sid;
			this.dotSyntax = dotSyntax;
			this.arrSyntax = arrSyntax;

			return this;

		};

		function Sampler ( animation ) {

			this.id = "";
			this.animation = animation;
			this.inputs = [];
			this.input = null;
			this.output = null;
			this.strideOut = null;
			this.interpolation = null;
			this.startTime = null;
			this.endTime = null;
			this.duration = 0;

		}

		Sampler.prototype.parse = function ( element ) {

			this.id = element.getAttribute( 'id' );
			this.inputs = [];

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'input':

						this.inputs.push( (new Input()).parse( child ) );
						break;

					default:
						break;

				}

			}

			return this;

		};

		Sampler.prototype.create = function () {

			for ( var i = 0; i < this.inputs.length; i ++ ) {

				var input = this.inputs[ i ];
				var source = this.animation.source[ input.source ];

				switch ( input.semantic ) {

					case 'INPUT':

						this.input = source.read();
						break;

					case 'OUTPUT':

						this.output = source.read();
						this.strideOut = source.accessor.stride;
						break;

					case 'INTERPOLATION':

						this.interpolation = source.read();
						break;

					case 'IN_TANGENT':

						break;

					case 'OUT_TANGENT':

						break;

					default:

						console.log(input.semantic);
						break;

				}

			}

			this.startTime = 0;
			this.endTime = 0;
			this.duration = 0;

			if ( this.input.length ) {

				this.startTime = 100000000;
				this.endTime = -100000000;

				for ( var i = 0; i < this.input.length; i ++ ) {

					this.startTime = Math.min( this.startTime, this.input[ i ] );
					this.endTime = Math.max( this.endTime, this.input[ i ] );

				}

				this.duration = this.endTime - this.startTime;

			}

		};

		Sampler.prototype.getData = function ( type, ndx, member ) {

			var data;

			if ( type === 'matrix' && this.strideOut === 16 ) {

				data = this.output[ ndx ];

			} else if ( this.strideOut > 1 ) {

				data = [];
				ndx *= this.strideOut;

				for ( var i = 0; i < this.strideOut; ++ i ) {

					data[ i ] = this.output[ ndx + i ];

				}

				if ( this.strideOut === 3 ) {

					switch ( type ) {

						case 'rotate':
						case 'translate':

							fixCoords( data, -1 );
							break;

						case 'scale':

							fixCoords( data, 1 );
							break;

					}

				} else if ( this.strideOut === 4 && type === 'matrix' ) {

					fixCoords( data, -1 );

				}

			} else {

				data = this.output[ ndx ];

				if ( member && type === 'translate' ) {
					data = getConvertedTranslation( member, data );
				}

			}

			return data;

		};

		function Key ( time ) {

			this.targets = [];
			this.time = time;

		}

		Key.prototype.addTarget = function ( fullSid, transform, member, data ) {

			this.targets.push( {
				sid: fullSid,
				member: member,
				transform: transform,
				data: data
			} );

		};

		Key.prototype.apply = function ( opt_sid ) {

			for ( var i = 0; i < this.targets.length; ++ i ) {

				var target = this.targets[ i ];

				if ( !opt_sid || target.sid === opt_sid ) {

					target.transform.update( target.data, target.member );

				}

			}

		};

		Key.prototype.getTarget = function ( fullSid ) {

			for ( var i = 0; i < this.targets.length; ++ i ) {

				if ( this.targets[ i ].sid === fullSid ) {

					return this.targets[ i ];

				}

			}

			return null;

		};

		Key.prototype.hasTarget = function ( fullSid ) {

			for ( var i = 0; i < this.targets.length; ++ i ) {

				if ( this.targets[ i ].sid === fullSid ) {

					return true;

				}

			}

			return false;

		};

		// TODO: Currently only doing linear interpolation. Should support full COLLADA spec.
		Key.prototype.interpolate = function ( nextKey, time ) {

			for ( var i = 0, l = this.targets.length; i < l; i ++ ) {

				var target = this.targets[ i ],
					nextTarget = nextKey.getTarget( target.sid ),
					data;

				if ( target.transform.type !== 'matrix' && nextTarget ) {

					var scale = ( time - this.time ) / ( nextKey.time - this.time ),
						nextData = nextTarget.data,
						prevData = target.data;

					if ( scale < 0 ) scale = 0;
					if ( scale > 1 ) scale = 1;

					if ( prevData.length ) {

						data = [];

						for ( var j = 0; j < prevData.length; ++ j ) {

							data[ j ] = prevData[ j ] + ( nextData[ j ] - prevData[ j ] ) * scale;

						}

					} else {

						data = prevData + ( nextData - prevData ) * scale;

					}

				} else {

					data = target.data;

				}

				target.transform.update( data, target.member );

			}

		};

		// Camera
		function Camera() {

			this.id = "";
			this.name = "";
			this.technique = "";

		}

		Camera.prototype.parse = function ( element ) {

			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'optics':

						this.parseOptics( child );
						break;

					default:
						break;

				}

			}

			return this;

		};

		Camera.prototype.parseOptics = function ( element ) {

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				if ( element.childNodes[ i ].nodeName === 'technique_common' ) {

					var technique = element.childNodes[ i ];

					for ( var j = 0; j < technique.childNodes.length; j ++ ) {

						this.technique = technique.childNodes[ j ].nodeName;

						if ( this.technique === 'perspective' ) {

							var perspective = technique.childNodes[ j ];

							for ( var k = 0; k < perspective.childNodes.length; k ++ ) {

								var param = perspective.childNodes[ k ];

								switch ( param.nodeName ) {

									case 'yfov':
										this.yfov = param.textContent;
										break;
									case 'xfov':
										this.xfov = param.textContent;
										break;
									case 'znear':
										this.znear = param.textContent;
										break;
									case 'zfar':
										this.zfar = param.textContent;
										break;
									case 'aspect_ratio':
										this.aspect_ratio = param.textContent;
										break;

								}

							}

						} else if ( this.technique === 'orthographic' ) {

							var orthographic = technique.childNodes[ j ];

							for ( var k = 0; k < orthographic.childNodes.length; k ++ ) {

								var param = orthographic.childNodes[ k ];

								switch ( param.nodeName ) {

									case 'xmag':
										this.xmag = param.textContent;
										break;
									case 'ymag':
										this.ymag = param.textContent;
										break;
									case 'znear':
										this.znear = param.textContent;
										break;
									case 'zfar':
										this.zfar = param.textContent;
										break;
									case 'aspect_ratio':
										this.aspect_ratio = param.textContent;
										break;

								}

							}

						}

					}

				}

			}

			return this;

		};

		function InstanceCamera() {

			this.url = "";

		}

		InstanceCamera.prototype.parse = function ( element ) {

			this.url = element.getAttribute('url').replace(/^#/, '');

			return this;

		};

		// Light

		function Light() {

			this.id = "";
			this.name = "";
			this.technique = "";

		}

		Light.prototype.parse = function ( element ) {

			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'technique_common':

						this.parseCommon( child );
						break;

					case 'technique':

						this.parseTechnique( child );
						break;

					default:
						break;

				}

			}

			return this;

		};

		Light.prototype.parseCommon = function ( element ) {

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				switch ( element.childNodes[ i ].nodeName ) {

					case 'directional':
					case 'point':
					case 'spot':
					case 'ambient':

						this.technique = element.childNodes[ i ].nodeName;

						var light = element.childNodes[ i ];

						for ( var j = 0; j < light.childNodes.length; j ++ ) {

							var child = light.childNodes[j];

							switch ( child.nodeName ) {

								case 'color':

									var rgba = _floats( child.textContent );
									this.color = new THREE.Color(0);
									this.color.setRGB( rgba[0], rgba[1], rgba[2] );
									this.color.a = rgba[3];
									break;

								case 'falloff_angle':

									this.falloff_angle = parseFloat( child.textContent );
									break;

								case 'quadratic_attenuation':
									var f = parseFloat( child.textContent );
									this.distance = f ? Math.sqrt( 1 / f ) : 0;
							}

						}

				}

			}

			return this;

		};

		Light.prototype.parseTechnique = function ( element ) {

			this.profile = element.getAttribute( 'profile' );

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];

				switch ( child.nodeName ) {

					case 'intensity':

						this.intensity = parseFloat(child.textContent);
						break;

				}

			}

			return this;

		};

		function InstanceLight() {

			this.url = "";

		}

		InstanceLight.prototype.parse = function ( element ) {

			this.url = element.getAttribute('url').replace(/^#/, '');

			return this;

		};

		function KinematicsModel( ) {

			this.id = '';
			this.name = '';
			this.joints = [];
			this.links = [];

		}

		KinematicsModel.prototype.parse = function( element ) {

			this.id = element.getAttribute('id');
			this.name = element.getAttribute('name');
			this.joints = [];
			this.links = [];

			for (var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'technique_common':

						this.parseCommon(child);
						break;

					default:
						break;

				}

			}

			return this;

		};

		KinematicsModel.prototype.parseCommon = function( element ) {

			for (var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( element.childNodes[ i ].nodeName ) {

					case 'joint':
						this.joints.push( (new Joint()).parse(child) );
						break;

					case 'link':
						this.links.push( (new Link()).parse(child) );
						break;

					default:
						break;

				}

			}

			return this;

		};

		function Joint( ) {

			this.sid = '';
			this.name = '';
			this.axis = new THREE.Vector3();
			this.limits = {
				min: 0,
				max: 0
			};
			this.type = '';
			this.static = false;
			this.zeroPosition = 0.0;
			this.middlePosition = 0.0;

		}

		Joint.prototype.parse = function( element ) {

			this.sid = element.getAttribute('sid');
			this.name = element.getAttribute('name');
			this.axis = new THREE.Vector3();
			this.limits = {
				min: 0,
				max: 0
			};
			this.type = '';
			this.static = false;
			this.zeroPosition = 0.0;
			this.middlePosition = 0.0;

			var axisElement = element.querySelector('axis');
			var _axis = _floats(axisElement.textContent);
			this.axis = getConvertedVec3(_axis, 0);

			var min = element.querySelector('limits min') ? parseFloat(element.querySelector('limits min').textContent) : -360;
			var max = element.querySelector('limits max') ? parseFloat(element.querySelector('limits max').textContent) : 360;

			this.limits = {
				min: min,
				max: max
			};

			var jointTypes = [ 'prismatic', 'revolute' ];
			for (var i = 0; i < jointTypes.length; i ++ ) {

				var type = jointTypes[ i ];

				var jointElement = element.querySelector(type);

				if ( jointElement ) {

					this.type = type;

				}

			}

			// if the min is equal to or somehow greater than the max, consider the joint static
			if ( this.limits.min >= this.limits.max ) {

				this.static = true;

			}

			this.middlePosition = (this.limits.min + this.limits.max) / 2.0;
			return this;

		};

		function Link( ) {

			this.sid = '';
			this.name = '';
			this.transforms = [];
			this.attachments = [];

		}

		Link.prototype.parse = function( element ) {

			this.sid = element.getAttribute('sid');
			this.name = element.getAttribute('name');
			this.transforms = [];
			this.attachments = [];

			for (var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'attachment_full':
						this.attachments.push( (new Attachment()).parse(child) );
						break;

					case 'rotate':
					case 'translate':
					case 'matrix':

						this.transforms.push( (new Transform()).parse(child) );
						break;

					default:

						break;

				}

			}

			return this;

		};

		function Attachment( ) {

			this.joint = '';
			this.transforms = [];
			this.links = [];

		}

		Attachment.prototype.parse = function( element ) {

			this.joint = element.getAttribute('joint').split('/').pop();
			this.links = [];

			for (var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;

				switch ( child.nodeName ) {

					case 'link':
						this.links.push( (new Link()).parse(child) );
						break;

					case 'rotate':
					case 'translate':
					case 'matrix':

						this.transforms.push( (new Transform()).parse(child) );
						break;

					default:

						break;

				}

			}

			return this;

		};

		function _source( element ) {

			var id = element.getAttribute( 'id' );

			if ( sources[ id ] != undefined ) {

				return sources[ id ];

			}

			sources[ id ] = ( new Source(id )).parse( element );
			return sources[ id ];

		}

		function _nsResolver( nsPrefix ) {

			if ( nsPrefix === "dae" ) {

				return "http://www.collada.org/2005/11/COLLADASchema";

			}

			return null;

		}

		function _bools( str ) {

			var raw = _strings( str );
			var data = [];

			for ( var i = 0, l = raw.length; i < l; i ++ ) {

				data.push( (raw[i] === 'true' || raw[i] === '1') ? true : false );

			}

			return data;

		}

		function _floats( str ) {

			var raw = _strings(str);
			var data = [];

			for ( var i = 0, l = raw.length; i < l; i ++ ) {

				data.push( parseFloat( raw[ i ] ) );

			}

			return data;

		}

		function _ints( str ) {

			var raw = _strings( str );
			var data = [];

			for ( var i = 0, l = raw.length; i < l; i ++ ) {

				data.push( parseInt( raw[ i ], 10 ) );

			}

			return data;

		}

		function _strings( str ) {

			return ( str.length > 0 ) ? _trimString( str ).split( /\s+/ ) : [];

		}

		function _trimString( str ) {

			return str.replace( /^\s+/, "" ).replace( /\s+$/, "" );

		}

		function _attr_as_float( element, name, defaultValue ) {

			if ( element.hasAttribute( name ) ) {

				return parseFloat( element.getAttribute( name ) );

			} else {

				return defaultValue;

			}

		}

		function _attr_as_int( element, name, defaultValue ) {

			if ( element.hasAttribute( name ) ) {

				return parseInt( element.getAttribute( name ), 10) ;

			} else {

				return defaultValue;

			}

		}

		function _attr_as_string( element, name, defaultValue ) {

			if ( element.hasAttribute( name ) ) {

				return element.getAttribute( name );

			} else {

				return defaultValue;

			}

		}

		function _format_float( f, num ) {

			if ( f === undefined ) {

				var s = '0.';

				while ( s.length < num + 2 ) {

					s += '0';

				}

				return s;

			}

			num = num || 2;

			var parts = f.toString().split( '.' );
			parts[ 1 ] = parts.length > 1 ? parts[ 1 ].substr( 0, num ) : "0";

			while ( parts[ 1 ].length < num ) {

				parts[ 1 ] += '0';

			}

			return parts.join( '.' );

		}

		function loadTextureImage ( texture, url ) {

			var loader = new THREE.ImageLoader();

			loader.load( url, function ( image ) {

				texture.image = image;
				texture.needsUpdate = true;

			} );

		}

		function extractDoubleSided( obj, element ) {

			obj.doubleSided = false;

			var node = element.querySelectorAll('extra double_sided')[0];

			if ( node ) {

				if ( node && parseInt( node.textContent, 10 ) === 1 ) {

					obj.doubleSided = true;

				}

			}

		}

		// Up axis conversion

		function setUpConversion() {

			if ( options.convertUpAxis !== true || colladaUp === options.upAxis ) {

				upConversion = null;

			} else {

				switch ( colladaUp ) {

					case 'X':

						upConversion = options.upAxis === 'Y' ? 'XtoY' : 'XtoZ';
						break;

					case 'Y':

						upConversion = options.upAxis === 'X' ? 'YtoX' : 'YtoZ';
						break;

					case 'Z':

						upConversion = options.upAxis === 'X' ? 'ZtoX' : 'ZtoY';
						break;

				}

			}

		}

		function fixCoords( data, sign ) {

			if ( options.convertUpAxis !== true || colladaUp === options.upAxis ) {

				return;

			}

			switch ( upConversion ) {

				case 'XtoY':

					var tmp = data[ 0 ];
					data[ 0 ] = sign * data[ 1 ];
					data[ 1 ] = tmp;
					break;

				case 'XtoZ':

					var tmp = data[ 2 ];
					data[ 2 ] = data[ 1 ];
					data[ 1 ] = data[ 0 ];
					data[ 0 ] = tmp;
					break;

				case 'YtoX':

					var tmp = data[ 0 ];
					data[ 0 ] = data[ 1 ];
					data[ 1 ] = sign * tmp;
					break;

				case 'YtoZ':

					var tmp = data[ 1 ];
					data[ 1 ] = sign * data[ 2 ];
					data[ 2 ] = tmp;
					break;

				case 'ZtoX':

					var tmp = data[ 0 ];
					data[ 0 ] = data[ 1 ];
					data[ 1 ] = data[ 2 ];
					data[ 2 ] = tmp;
					break;

				case 'ZtoY':

					var tmp = data[ 1 ];
					data[ 1 ] = data[ 2 ];
					data[ 2 ] = sign * tmp;
					break;

			}

		}

		function getConvertedTranslation( axis, data ) {

			if ( options.convertUpAxis !== true || colladaUp === options.upAxis ) {

				return data;

			}

			switch ( axis ) {
				case 'X':
					data = upConversion === 'XtoY' ? data * -1 : data;
					break;
				case 'Y':
					data = upConversion === 'YtoZ' || upConversion === 'YtoX' ? data * -1 : data;
					break;
				case 'Z':
					data = upConversion === 'ZtoY' ? data * -1 : data ;
					break;
				default:
					break;
			}

			return data;
		}

		function getConvertedVec3( data, offset ) {

			var arr = [ data[ offset ], data[ offset + 1 ], data[ offset + 2 ] ];
			fixCoords( arr, -1 );
			return new THREE.Vector3( arr[ 0 ], arr[ 1 ], arr[ 2 ] );

		}

		function getConvertedMat4( data ) {

			if ( options.convertUpAxis ) {

				// First fix rotation and scale

				// Columns first
				var arr = [ data[ 0 ], data[ 4 ], data[ 8 ] ];
				fixCoords( arr, -1 );
				data[ 0 ] = arr[ 0 ];
				data[ 4 ] = arr[ 1 ];
				data[ 8 ] = arr[ 2 ];
				arr = [ data[ 1 ], data[ 5 ], data[ 9 ] ];
				fixCoords( arr, -1 );
				data[ 1 ] = arr[ 0 ];
				data[ 5 ] = arr[ 1 ];
				data[ 9 ] = arr[ 2 ];
				arr = [ data[ 2 ], data[ 6 ], data[ 10 ] ];
				fixCoords( arr, -1 );
				data[ 2 ] = arr[ 0 ];
				data[ 6 ] = arr[ 1 ];
				data[ 10 ] = arr[ 2 ];
				// Rows second
				arr = [ data[ 0 ], data[ 1 ], data[ 2 ] ];
				fixCoords( arr, -1 );
				data[ 0 ] = arr[ 0 ];
				data[ 1 ] = arr[ 1 ];
				data[ 2 ] = arr[ 2 ];
				arr = [ data[ 4 ], data[ 5 ], data[ 6 ] ];
				fixCoords( arr, -1 );
				data[ 4 ] = arr[ 0 ];
				data[ 5 ] = arr[ 1 ];
				data[ 6 ] = arr[ 2 ];
				arr = [ data[ 8 ], data[ 9 ], data[ 10 ] ];
				fixCoords( arr, -1 );
				data[ 8 ] = arr[ 0 ];
				data[ 9 ] = arr[ 1 ];
				data[ 10 ] = arr[ 2 ];

				// Now fix translation
				arr = [ data[ 3 ], data[ 7 ], data[ 11 ] ];
				fixCoords( arr, -1 );
				data[ 3 ] = arr[ 0 ];
				data[ 7 ] = arr[ 1 ];
				data[ 11 ] = arr[ 2 ];

			}

			return new THREE.Matrix4().set(
				data[0], data[1], data[2], data[3],
				data[4], data[5], data[6], data[7],
				data[8], data[9], data[10], data[11],
				data[12], data[13], data[14], data[15]
				);

		}

		function getConvertedIndex( index ) {

			if ( index > -1 && index < 3 ) {

				var members = [ 'X', 'Y', 'Z' ],
					indices = { X: 0, Y: 1, Z: 2 };

				index = getConvertedMember( members[ index ] );
				index = indices[ index ];

			}

			return index;

		}

		function getConvertedMember( member ) {

			if ( options.convertUpAxis ) {

				switch ( member ) {

					case 'X':

						switch ( upConversion ) {

							case 'XtoY':
							case 'XtoZ':
							case 'YtoX':

								member = 'Y';
								break;

							case 'ZtoX':

								member = 'Z';
								break;

						}

						break;

					case 'Y':

						switch ( upConversion ) {

							case 'XtoY':
							case 'YtoX':
							case 'ZtoX':

								member = 'X';
								break;

							case 'XtoZ':
							case 'YtoZ':
							case 'ZtoY':

								member = 'Z';
								break;

						}

						break;

					case 'Z':

						switch ( upConversion ) {

							case 'XtoZ':

								member = 'X';
								break;

							case 'YtoZ':
							case 'ZtoX':
							case 'ZtoY':

								member = 'Y';
								break;

						}

						break;

				}

			}

			return member;

		}

		return {

			load: load,
			parse: parse,
			setPreferredShading: setPreferredShading,
			applySkin: applySkin,
			geometries : geometries,
			options: options

		};

	};

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 */
	var THREE = __webpack_require__(40);
	THREE.Animation = function ( root, data ) {

	   this.root = root;
	   this.data = THREE.AnimationHandler.init( data );
	   this.hierarchy = THREE.AnimationHandler.parse( root );

	   this.currentTime = 0;
	   this.timeScale = 1;

	   this.isPlaying = false;
	   this.loop = true;
	   this.weight = 0;

	   this.interpolationType = THREE.AnimationHandler.LINEAR;

	};

	THREE.Animation.prototype = {

	   constructor: THREE.Animation,

	   keyTypes:  [ "pos", "rot", "scl" ],

	   play: function ( startTime, weight ) {

	      this.currentTime = startTime !== undefined ? startTime : 0;
	      this.weight = weight !== undefined ? weight : 1;

	      this.isPlaying = true;

	      this.reset();

	      THREE.AnimationHandler.play( this );

	   },

	   stop: function() {

	      this.isPlaying = false;

	      THREE.AnimationHandler.stop( this );

	   },

	   reset: function () {

	      for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

	         var object = this.hierarchy[ h ];

	         if ( object.animationCache === undefined ) {

	            object.animationCache = {
	               animations: {},
	               blending: {
	                  positionWeight: 0.0,
	                  quaternionWeight: 0.0,
	                  scaleWeight: 0.0
	               }
	            };

	         }

	         var name = this.data.name;
	         var animations = object.animationCache.animations;
	         var animationCache = animations[ name ];

	         if ( animationCache === undefined ) {

	            animationCache = {
	               prevKey: { pos: 0, rot: 0, scl: 0 },
	               nextKey: { pos: 0, rot: 0, scl: 0 },
	               originalMatrix: object.matrix
	            };

	            animations[ name ] = animationCache;

	         }

	         // Get keys to match our current time

	         for ( var t = 0; t < 3; t ++ ) {

	            var type = this.keyTypes[ t ];

	            var prevKey = this.data.hierarchy[ h ].keys[ 0 ];
	            var nextKey = this.getNextKeyWith( type, h, 1 );

	            while ( nextKey.time < this.currentTime && nextKey.index > prevKey.index ) {

	               prevKey = nextKey;
	               nextKey = this.getNextKeyWith( type, h, nextKey.index + 1 );

	            }

	            animationCache.prevKey[ type ] = prevKey;
	            animationCache.nextKey[ type ] = nextKey;

	         }

	      }

	   },

	   resetBlendWeights: function () {

	      for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

	         var object = this.hierarchy[ h ];
	         var animationCache = object.animationCache;

	         if ( animationCache !== undefined ) {

	            var blending = animationCache.blending;

	            blending.positionWeight = 0.0;
	            blending.quaternionWeight = 0.0;
	            blending.scaleWeight = 0.0;

	         }

	      }

	   },

	   update: ( function() {

	      var points = [];
	      var target = new THREE.Vector3();
	      var newVector = new THREE.Vector3();
	      var newQuat = new THREE.Quaternion();

	      // Catmull-Rom spline

	      var interpolateCatmullRom = function ( points, scale ) {

	         var c = [], v3 = [],
	         point, intPoint, weight, w2, w3,
	         pa, pb, pc, pd;

	         point = ( points.length - 1 ) * scale;
	         intPoint = Math.floor( point );
	         weight = point - intPoint;

	         c[ 0 ] = intPoint === 0 ? intPoint : intPoint - 1;
	         c[ 1 ] = intPoint;
	         c[ 2 ] = intPoint > points.length - 2 ? intPoint : intPoint + 1;
	         c[ 3 ] = intPoint > points.length - 3 ? intPoint : intPoint + 2;

	         pa = points[ c[ 0 ] ];
	         pb = points[ c[ 1 ] ];
	         pc = points[ c[ 2 ] ];
	         pd = points[ c[ 3 ] ];

	         w2 = weight * weight;
	         w3 = weight * w2;

	         v3[ 0 ] = interpolate( pa[ 0 ], pb[ 0 ], pc[ 0 ], pd[ 0 ], weight, w2, w3 );
	         v3[ 1 ] = interpolate( pa[ 1 ], pb[ 1 ], pc[ 1 ], pd[ 1 ], weight, w2, w3 );
	         v3[ 2 ] = interpolate( pa[ 2 ], pb[ 2 ], pc[ 2 ], pd[ 2 ], weight, w2, w3 );

	         return v3;

	      };

	      var interpolate = function ( p0, p1, p2, p3, t, t2, t3 ) {

	         var v0 = ( p2 - p0 ) * 0.5,
	            v1 = ( p3 - p1 ) * 0.5;

	         return ( 2 * ( p1 - p2 ) + v0 + v1 ) * t3 + ( - 3 * ( p1 - p2 ) - 2 * v0 - v1 ) * t2 + v0 * t + p1;

	      };

	      return function ( delta ) {

	         if ( this.isPlaying === false ) return;

	         this.currentTime += delta * this.timeScale;

	         if ( this.weight === 0 )
	            return;

	         //

	         var duration = this.data.length;

	         if ( this.currentTime > duration || this.currentTime < 0 ) {

	            if ( this.loop ) {

	               this.currentTime %= duration;

	               if ( this.currentTime < 0 )
	                  this.currentTime += duration;

	               this.reset();

	            } else {

	               this.stop();

	            }

	         }

	         for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

	            var object = this.hierarchy[ h ];
	            var animationCache = object.animationCache.animations[ this.data.name ];
	            var blending = object.animationCache.blending;

	            // loop through pos/rot/scl

	            for ( var t = 0; t < 3; t ++ ) {

	               // get keys

	               var type    = this.keyTypes[ t ];
	               var prevKey = animationCache.prevKey[ type ];
	               var nextKey = animationCache.nextKey[ type ];

	               if ( ( this.timeScale > 0 && nextKey.time <= this.currentTime ) ||
	                  ( this.timeScale < 0 && prevKey.time >= this.currentTime ) ) {

	                  prevKey = this.data.hierarchy[ h ].keys[ 0 ];
	                  nextKey = this.getNextKeyWith( type, h, 1 );

	                  while ( nextKey.time < this.currentTime && nextKey.index > prevKey.index ) {

	                     prevKey = nextKey;
	                     nextKey = this.getNextKeyWith( type, h, nextKey.index + 1 );

	                  }

	                  animationCache.prevKey[ type ] = prevKey;
	                  animationCache.nextKey[ type ] = nextKey;

	               }

	               var scale = ( this.currentTime - prevKey.time ) / ( nextKey.time - prevKey.time );

	               var prevXYZ = prevKey[ type ];
	               var nextXYZ = nextKey[ type ];

	               if ( scale < 0 ) scale = 0;
	               if ( scale > 1 ) scale = 1;

	               // interpolate

	               if ( type === "pos" ) {

	                  if ( this.interpolationType === THREE.AnimationHandler.LINEAR ) {

	                     newVector.x = prevXYZ[ 0 ] + ( nextXYZ[ 0 ] - prevXYZ[ 0 ] ) * scale;
	                     newVector.y = prevXYZ[ 1 ] + ( nextXYZ[ 1 ] - prevXYZ[ 1 ] ) * scale;
	                     newVector.z = prevXYZ[ 2 ] + ( nextXYZ[ 2 ] - prevXYZ[ 2 ] ) * scale;

	                     // blend
	                     var proportionalWeight = this.weight / ( this.weight + blending.positionWeight );
	                     object.position.lerp( newVector, proportionalWeight );
	                     blending.positionWeight += this.weight;

	                  } else if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
	                           this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

	                     points[ 0 ] = this.getPrevKeyWith( "pos", h, prevKey.index - 1 )[ "pos" ];
	                     points[ 1 ] = prevXYZ;
	                     points[ 2 ] = nextXYZ;
	                     points[ 3 ] = this.getNextKeyWith( "pos", h, nextKey.index + 1 )[ "pos" ];

	                     scale = scale * 0.33 + 0.33;

	                     var currentPoint = interpolateCatmullRom( points, scale );
	                     var proportionalWeight = this.weight / ( this.weight + blending.positionWeight );
	                     blending.positionWeight += this.weight;

	                     // blend

	                     var vector = object.position;

	                     vector.x = vector.x + ( currentPoint[ 0 ] - vector.x ) * proportionalWeight;
	                     vector.y = vector.y + ( currentPoint[ 1 ] - vector.y ) * proportionalWeight;
	                     vector.z = vector.z + ( currentPoint[ 2 ] - vector.z ) * proportionalWeight;

	                     if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

	                        var forwardPoint = interpolateCatmullRom( points, scale * 1.01 );

	                        target.set( forwardPoint[ 0 ], forwardPoint[ 1 ], forwardPoint[ 2 ] );
	                        target.sub( vector );
	                        target.y = 0;
	                        target.normalize();

	                        var angle = Math.atan2( target.x, target.z );
	                        object.rotation.set( 0, angle, 0 );

	                     }

	                  }

	               } else if ( type === "rot" ) {

	                  THREE.Quaternion.slerp( prevXYZ, nextXYZ, newQuat, scale );

	                  // Avoid paying the cost of an additional slerp if we don't have to
	                  if ( blending.quaternionWeight === 0 ) {

	                     object.quaternion.copy( newQuat );
	                     blending.quaternionWeight = this.weight;

	                  } else {

	                     var proportionalWeight = this.weight / ( this.weight + blending.quaternionWeight );
	                     THREE.Quaternion.slerp( object.quaternion, newQuat, object.quaternion, proportionalWeight );
	                     blending.quaternionWeight += this.weight;

	                  }

	               } else if ( type === "scl" ) {

	                  newVector.x = prevXYZ[ 0 ] + ( nextXYZ[ 0 ] - prevXYZ[ 0 ] ) * scale;
	                  newVector.y = prevXYZ[ 1 ] + ( nextXYZ[ 1 ] - prevXYZ[ 1 ] ) * scale;
	                  newVector.z = prevXYZ[ 2 ] + ( nextXYZ[ 2 ] - prevXYZ[ 2 ] ) * scale;

	                  var proportionalWeight = this.weight / ( this.weight + blending.scaleWeight );
	                  object.scale.lerp( newVector, proportionalWeight );
	                  blending.scaleWeight += this.weight;

	               }

	            }

	         }

	         return true;

	      };

	   } )(),

	   getNextKeyWith: function ( type, h, key ) {

	      var keys = this.data.hierarchy[ h ].keys;

	      if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
	          this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

	         key = key < keys.length - 1 ? key : keys.length - 1;

	      } else {

	         key = key % keys.length;

	      }

	      for ( ; key < keys.length; key ++ ) {

	         if ( keys[ key ][ type ] !== undefined ) {

	            return keys[ key ];

	         }

	      }

	      return this.data.hierarchy[ h ].keys[ 0 ];

	   },

	   getPrevKeyWith: function ( type, h, key ) {

	      var keys = this.data.hierarchy[ h ].keys;

	      if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
	         this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

	         key = key > 0 ? key : 0;

	      } else {

	         key = key >= 0 ? key : key + keys.length;

	      }


	      for ( ; key >= 0; key -- ) {

	         if ( keys[ key ][ type ] !== undefined ) {

	            return keys[ key ];

	         }

	      }

	      return this.data.hierarchy[ h ].keys[ keys.length - 1 ];

	   }

	};

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @author mikael emtinger / http://gomo.se/
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author khang duong
	 * @author erik kitson
	 */
	var THREE = __webpack_require__(40);
	THREE.KeyFrameAnimation = function ( data ) {

	   this.root = data.node;
	   this.data = THREE.AnimationHandler.init( data );
	   this.hierarchy = THREE.AnimationHandler.parse( this.root );
	   this.currentTime = 0;
	   this.timeScale = 0.001;
	   this.isPlaying = false;
	   this.isPaused = true;
	   this.loop = true;

	   // initialize to first keyframes

	   for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

	      var keys = this.data.hierarchy[ h ].keys,
	         sids = this.data.hierarchy[ h ].sids,
	         obj = this.hierarchy[ h ];

	      if ( keys.length && sids ) {

	         for ( var s = 0; s < sids.length; s ++ ) {

	            var sid = sids[ s ],
	               next = this.getNextKeyWith( sid, h, 0 );

	            if ( next ) {

	               next.apply( sid );

	            }

	         }

	         obj.matrixAutoUpdate = false;
	         this.data.hierarchy[ h ].node.updateMatrix();
	         obj.matrixWorldNeedsUpdate = true;

	      }

	   }

	};

	THREE.KeyFrameAnimation.prototype = {

	   constructor: THREE.KeyFrameAnimation,

	   play: function ( startTime ) {

	      this.currentTime = startTime !== undefined ? startTime : 0;

	      if ( this.isPlaying === false ) {

	         this.isPlaying = true;

	         // reset key cache

	         var h, hl = this.hierarchy.length,
	            object,
	            node;

	         for ( h = 0; h < hl; h ++ ) {

	            object = this.hierarchy[ h ];
	            node = this.data.hierarchy[ h ];

	            if ( node.animationCache === undefined ) {

	               node.animationCache = {};
	               node.animationCache.prevKey = null;
	               node.animationCache.nextKey = null;
	               node.animationCache.originalMatrix = object.matrix;

	            }

	            var keys = this.data.hierarchy[ h ].keys;

	            if ( keys.length > 1 ) {

	               node.animationCache.prevKey = keys[ 0 ];
	               node.animationCache.nextKey = keys[ 1 ];

	               this.startTime = Math.min( keys[ 0 ].time, this.startTime );
	               this.endTime = Math.max( keys[ keys.length - 1 ].time, this.endTime );

	            }

	         }

	         this.update( 0 );

	      }

	      this.isPaused = false;
	   },

	   stop: function () {

	      this.isPlaying = false;
	      this.isPaused  = false;

	      // reset JIT matrix and remove cache

	      for ( var h = 0; h < this.data.hierarchy.length; h ++ ) {

	         var obj = this.hierarchy[ h ];
	         var node = this.data.hierarchy[ h ];

	         if ( node.animationCache !== undefined ) {

	            var original = node.animationCache.originalMatrix;

	            original.copy( obj.matrix );
	            obj.matrix = original;

	            delete node.animationCache;

	         }

	      }

	   },

	   update: function ( delta ) {

	      if ( this.isPlaying === false ) return;

	      this.currentTime += delta * this.timeScale;

	      //

	      var duration = this.data.length;

	      if ( this.loop === true && this.currentTime > duration ) {

	         this.currentTime %= duration;

	      }

	      this.currentTime = Math.min( this.currentTime, duration );

	      for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

	         var object = this.hierarchy[ h ];
	         var node = this.data.hierarchy[ h ];

	         var keys = node.keys,
	            animationCache = node.animationCache;


	         if ( keys.length ) {

	            var prevKey = animationCache.prevKey;
	            var nextKey = animationCache.nextKey;

	            if ( nextKey.time <= this.currentTime ) {

	               while ( nextKey.time < this.currentTime && nextKey.index > prevKey.index ) {

	                  prevKey = nextKey;
	                  nextKey = keys[ prevKey.index + 1 ];

	               }

	               animationCache.prevKey = prevKey;
	               animationCache.nextKey = nextKey;

	            }

	            if ( nextKey.time >= this.currentTime ) {

	               prevKey.interpolate( nextKey, this.currentTime );

	            } else {

	               prevKey.interpolate( nextKey, nextKey.time );

	            }

	            this.data.hierarchy[ h ].node.updateMatrix();
	            object.matrixWorldNeedsUpdate = true;

	         }

	      }

	   },

	   getNextKeyWith: function ( sid, h, key ) {

	      var keys = this.data.hierarchy[ h ].keys;
	      key = key % keys.length;

	      for ( ; key < keys.length; key ++ ) {

	         if ( keys[ key ].hasTarget( sid ) ) {

	            return keys[ key ];

	         }

	      }

	      return keys[ 0 ];

	   },

	   getPrevKeyWith: function ( sid, h, key ) {

	      var keys = this.data.hierarchy[ h ].keys;
	      key = key >= 0 ? key : key + keys.length;

	      for ( ; key >= 0; key -- ) {

	         if ( keys[ key ].hasTarget( sid ) ) {

	            return keys[ key ];

	         }

	      }

	      return keys[ keys.length - 1 ];

	   }

	};

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @author mikael emtinger / http://gomo.se/
	 */
	var THREE = __webpack_require__(40);

	THREE.AnimationHandler = {

	   LINEAR: 0,
	   CATMULLROM: 1,
	   CATMULLROM_FORWARD: 2,

	   //

	   add: function () {

	      console.warn( 'THREE.AnimationHandler.add() has been deprecated.' );

	   },
	   get: function () {

	      console.warn( 'THREE.AnimationHandler.get() has been deprecated.' );

	   },
	   remove: function () {

	      console.warn( 'THREE.AnimationHandler.remove() has been deprecated.' );

	   },

	   //

	   animations: [],

	   init: function ( data ) {

	      if ( data.initialized === true ) return data;

	      // loop through all keys

	      for ( var h = 0; h < data.hierarchy.length; h ++ ) {

	         for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

	            // remove minus times

	            if ( data.hierarchy[ h ].keys[ k ].time < 0 ) {

	                data.hierarchy[ h ].keys[ k ].time = 0;

	            }

	            // create quaternions

	            if ( data.hierarchy[ h ].keys[ k ].rot !== undefined &&
	              ! ( data.hierarchy[ h ].keys[ k ].rot instanceof THREE.Quaternion ) ) {

	               var quat = data.hierarchy[ h ].keys[ k ].rot;
	               data.hierarchy[ h ].keys[ k ].rot = new THREE.Quaternion().fromArray( quat );

	            }

	         }

	         // prepare morph target keys

	         if ( data.hierarchy[ h ].keys.length && data.hierarchy[ h ].keys[ 0 ].morphTargets !== undefined ) {

	            // get all used

	            var usedMorphTargets = {};

	            for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

	               for ( var m = 0; m < data.hierarchy[ h ].keys[ k ].morphTargets.length; m ++ ) {

	                  var morphTargetName = data.hierarchy[ h ].keys[ k ].morphTargets[ m ];
	                  usedMorphTargets[ morphTargetName ] = - 1;

	               }

	            }

	            data.hierarchy[ h ].usedMorphTargets = usedMorphTargets;


	            // set all used on all frames

	            for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

	               var influences = {};

	               for ( var morphTargetName in usedMorphTargets ) {

	                  for ( var m = 0; m < data.hierarchy[ h ].keys[ k ].morphTargets.length; m ++ ) {

	                     if ( data.hierarchy[ h ].keys[ k ].morphTargets[ m ] === morphTargetName ) {

	                        influences[ morphTargetName ] = data.hierarchy[ h ].keys[ k ].morphTargetsInfluences[ m ];
	                        break;

	                     }

	                  }

	                  if ( m === data.hierarchy[ h ].keys[ k ].morphTargets.length ) {

	                     influences[ morphTargetName ] = 0;

	                  }

	               }

	               data.hierarchy[ h ].keys[ k ].morphTargetsInfluences = influences;

	            }

	         }


	         // remove all keys that are on the same time

	         for ( var k = 1; k < data.hierarchy[ h ].keys.length; k ++ ) {

	            if ( data.hierarchy[ h ].keys[ k ].time === data.hierarchy[ h ].keys[ k - 1 ].time ) {

	               data.hierarchy[ h ].keys.splice( k, 1 );
	               k --;

	            }

	         }


	         // set index

	         for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

	            data.hierarchy[ h ].keys[ k ].index = k;

	         }

	      }

	      data.initialized = true;

	      return data;

	   },

	   parse: function ( root ) {

	      var parseRecurseHierarchy = function ( root, hierarchy ) {

	         hierarchy.push( root );

	         for ( var c = 0; c < root.children.length; c ++ )
	            parseRecurseHierarchy( root.children[ c ], hierarchy );

	      };

	      // setup hierarchy

	      var hierarchy = [];

	      if ( root instanceof THREE.SkinnedMesh ) {

	         for ( var b = 0; b < root.skeleton.bones.length; b ++ ) {

	            hierarchy.push( root.skeleton.bones[ b ] );

	         }

	      } else {

	         parseRecurseHierarchy( root, hierarchy );

	      }

	      return hierarchy;

	   },

	   play: function ( animation ) {

	      if ( this.animations.indexOf( animation ) === - 1 ) {

	         this.animations.push( animation );

	      }

	   },

	   stop: function ( animation ) {

	      var index = this.animations.indexOf( animation );

	      if ( index !== - 1 ) {

	         this.animations.splice( index, 1 );

	      }

	   },

	   update: function ( deltaTimeMS ) {

	      for ( var i = 0; i < this.animations.length; i ++ ) {

	         this.animations[ i ].resetBlendWeights();

	      }

	      for ( var i = 0; i < this.animations.length; i ++ ) {

	         this.animations[ i ].update( deltaTimeMS );

	      }

	   }

	};

/***/ })

/******/ });