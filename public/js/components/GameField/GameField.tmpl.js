;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['js/components/GameField/GameField.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var data=__fest_context;__fest_buf+=("<div class=\"game\"><div id=\"indicator\" class=\"blue-turn\"></div><div class=\"table\"><div class=\"tableBody\"><div id=\"game-event\"></div><div class=\"row\"><div id=\"0\" class=\"cell\"></div><div id=\"1\" class=\"cell\"></div><div id=\"2\" class=\"cell\"></div><div id=\"3\" class=\"cell\"></div><div id=\"4\" class=\"cell\"></div><div id=\"5\" class=\"cell\"></div><div id=\"6\" class=\"cell\"></div></div><div class=\"row\"><div id=\"7\" class=\"cell\"></div><div id=\"8\" class=\"cell\"></div><div id=\"9\" class=\"cell\"></div><div id=\"10\" class=\"cell\"></div><div id=\"11\" class=\"cell\"></div><div id=\"12\" class=\"cell\"></div><div id=\"13\" class=\"cell\"></div></div><div class=\"row\"><div id=\"14\" class=\"cell\"></div><div id=\"15\" class=\"cell\"></div><div id=\"16\" class=\"cell\"></div><div id=\"17\" class=\"cell\"></div><div id=\"18\" class=\"cell\"></div><div id=\"19\" class=\"cell\"></div><div id=\"20\" class=\"cell\"></div></div><div class=\"row\"><div id=\"21\" class=\"cell\"></div><div id=\"22\" class=\"cell\"></div><div id=\"23\" class=\"cell\"></div><div id=\"24\" class=\"cell\"></div><div id=\"25\" class=\"cell\"></div><div id=\"26\" class=\"cell\"></div><div id=\"27\" class=\"cell\"></div></div><div class=\"row\"><div id=\"28\" class=\"cell\"></div><div id=\"29\" class=\"cell\"></div><div id=\"30\" class=\"cell\"></div><div id=\"31\" class=\"cell\"></div><div id=\"32\" class=\"cell\"></div><div id=\"33\" class=\"cell\"></div><div id=\"34\" class=\"cell\"></div></div><div class=\"row\"><div id=\"35\" class=\"cell\"></div><div id=\"36\" class=\"cell\"></div><div id=\"37\" class=\"cell\"></div><div id=\"38\" class=\"cell\"></div><div id=\"39\" class=\"cell\"></div><div id=\"40\" class=\"cell\"></div><div id=\"41\" class=\"cell\"></div></div></div></div><div class=\"gamefield__back\" style=\"text-align: center;\"><a id=\"gamefield_back_btn\" href=\"\/menu\" data-href=\"menu\" class=\"back_btn\">Quit game</a></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();