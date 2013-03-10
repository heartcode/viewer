
/*!
	* Utils
	*
	* Utils namespace for making the utilities nice and modular
	*
	* 2013 Robert Pataki [robert@robertpataki.com]
	*
*/

/*global log Modernizr console*/

var Utils = Utils || {};
Utils.debug = true;

/*
	* Helper method that helps to keep the namespaces modules tidy
	* @method namespace
	* @param ns {String} The module string to be namespaced
	* @return {Object}
*/
Utils.namespace = function (ns) {
	'use strict';
	var parts = ns.split('.'),
			parent = Utils,
			i;

	for (; i < parts.length; i++) {
		if (typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}

	return parent;
};

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f() {
	'use strict';
	if (Utils.debug) {
		log.history = log.history || [];
		log.history.push(arguments);
		if (window.console) {
			var args = arguments;
			var newarr;

			try {
				args.callee = f.caller;
			} catch (e) {

			}

			newarr = [].slice.call(args);

			if (typeof console.log === 'object') {
				log.apply.call(console.log, console, newarr);
			} else {
				console.log.apply(console, newarr);
			}
		}
	}
};

// make it safe to use console.log always
(function (a) {
	'use strict';
	function b() {}
	var c = 'assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn';
	var d;
	for (c = c.split(','); !!(d = c.pop());) {
		a[d] = a[d] || b;
	}
})(function () {
	'use strict';
	try {
		console.log();
		return window.console;
	} catch (a) {
		return (window.console = {});
	}
}());

/*
*/
Utils.detect = (function () {
	'use strict';
	Utils.device = {
		touch: Modernizr.touch,
		clickEvent: Modernizr.touch ? 'touchstart' : 'click'
	};
}());