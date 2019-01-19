/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"vendors~plugins":"vendors~plugins","plugins":"plugins"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.tsx","vendors~index~plugins","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./css/index.css":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("./node_modules/dts-css-modules-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./css/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/dts-css-modules-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./css/index.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\n\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\n\nbody {\n\tline-height: 1;\n}\n\nol, ul {\n\tlist-style: none;\n}\n\nblockquote, q {\n\tquotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\n\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/**\n * Draft v0.10.5\n *\n * Copyright (c) 2013-present, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n */\n\n.DraftEditor-editorContainer,.DraftEditor-root,.public-DraftEditor-content{height:inherit;text-align:left;text-align:initial}\n\n.public-DraftEditor-content[contenteditable=true]{-webkit-user-modify:read-write-plaintext-only}\n\n.DraftEditor-root{position:relative}\n\n.DraftEditor-editorContainer{background-color:rgba(255,255,255,0);border-left:.1px solid transparent;position:relative;z-index:1}\n\n.public-DraftEditor-block{position:relative}\n\n.DraftEditor-alignLeft .public-DraftStyleDefault-block{text-align:left}\n\n.DraftEditor-alignLeft .public-DraftEditorPlaceholder-root{left:0;text-align:left}\n\n.DraftEditor-alignCenter .public-DraftStyleDefault-block{text-align:center}\n\n.DraftEditor-alignCenter .public-DraftEditorPlaceholder-root{margin:0 auto;text-align:center;width:100%}\n\n.DraftEditor-alignRight .public-DraftStyleDefault-block{text-align:right}\n\n.DraftEditor-alignRight .public-DraftEditorPlaceholder-root{right:0;text-align:right}\n\n.public-DraftEditorPlaceholder-root{color:#9197a3;position:absolute;z-index:1}\n\n.public-DraftEditorPlaceholder-hasFocus{color:#bdc1c9}\n\n.DraftEditorPlaceholder-hidden{display:none}\n\n.public-DraftStyleDefault-block{position:relative;white-space:pre-wrap}\n\n.public-DraftStyleDefault-ltr{direction:ltr;text-align:left}\n\n.public-DraftStyleDefault-rtl{direction:rtl;text-align:right}\n\n.public-DraftStyleDefault-listLTR{direction:ltr}\n\n.public-DraftStyleDefault-listRTL{direction:rtl}\n\n.public-DraftStyleDefault-ol,.public-DraftStyleDefault-ul{margin:16px 0;padding:0}\n\n.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR{margin-left:1.5em}\n\n.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL{margin-right:1.5em}\n\n.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR{margin-left:3em}\n\n.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL{margin-right:3em}\n\n.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR{margin-left:4.5em}\n\n.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL{margin-right:4.5em}\n\n.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR{margin-left:6em}\n\n.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL{margin-right:6em}\n\n.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR{margin-left:7.5em}\n\n.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL{margin-right:7.5em}\n\n.public-DraftStyleDefault-unorderedListItem{list-style-type:square;position:relative}\n\n.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0{list-style-type:disc}\n\n.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1{list-style-type:circle}\n\n.public-DraftStyleDefault-orderedListItem{list-style-type:none;position:relative}\n\n.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before{left:-36px;position:absolute;text-align:right;width:30px}\n\n.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before{position:absolute;right:-36px;text-align:left;width:30px}\n\n.public-DraftStyleDefault-orderedListItem:before{content:counter(ol0) \". \";counter-increment:ol0}\n\n.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before{content:counter(ol1) \". \";counter-increment:ol1}\n\n.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before{content:counter(ol2) \". \";counter-increment:ol2}\n\n.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before{content:counter(ol3) \". \";counter-increment:ol3}\n\n.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before{content:counter(ol4) \". \";counter-increment:ol4}\n\n.public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset{counter-reset:ol0}\n\n.public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset{counter-reset:ol1}\n\n.public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset{counter-reset:ol2}\n\n.public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset{counter-reset:ol3}\n\n.public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset{counter-reset:ol4}\n\n/*\n\nRailscasts-like style (c) Visoft, Inc. (Damien White)\n\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: #232323;\n  color: #e6e1dc;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #bc9458;\n  font-style: italic;\n}\n\n.hljs-keyword,\n.hljs-selector-tag {\n  color: #c26230;\n}\n\n.hljs-string,\n.hljs-number,\n.hljs-regexp,\n.hljs-variable,\n.hljs-template-variable {\n  color: #a5c261;\n}\n\n.hljs-subst {\n  color: #519f50;\n}\n\n.hljs-tag,\n.hljs-name {\n  color: #e8bf6a;\n}\n\n.hljs-type {\n  color: #da4939;\n}\n\n.hljs-symbol,\n.hljs-bullet,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-attr,\n.hljs-link {\n  color: #6d9cbe;\n}\n\n.hljs-params {\n  color: #d0d0ff;\n}\n\n.hljs-attribute {\n  color: #cda869;\n}\n\n.hljs-meta {\n  color: #9b859d;\n}\n\n.hljs-title,\n.hljs-section {\n  color: #ffc66d;\n}\n\n.hljs-addition {\n  background-color: #144212;\n  color: #e6e1dc;\n  display: inline-block;\n  width: 100%;\n}\n\n.hljs-deletion {\n  background-color: #600;\n  color: #e6e1dc;\n  display: inline-block;\n  width: 100%;\n}\n\n.hljs-selector-class {\n  color: #9b703f;\n}\n\n.hljs-selector-id {\n  color: #8b98ab;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n\n.hljs-link {\n  text-decoration: underline;\n}\n\na {\n    color: #4ad;\n    text-decoration: none;\n}\n\n.split-view {\n    height: calc(100% - 50px);\n    overflow: hidden\n}\n\n.split-view > * {\n        display: inline-block;\n        outline: 1px solid #ddd;\n        overflow-x: hidden;\n        overflow-y: scroll;\n        height: 100%;\n        width: 50%;\n    }\n\n.toolbar {\n    height: 50px;\n    padding: 5px 10px;\n    border-bottom: 1px solid #ddd\n}\n\n.toolbar .toolbar-line {\n        height: 30px;\n        border-right: 2px solid #eee;\n        margin: 0 5px;\n    }\n\n.editor {\n    padding: 10px;\n}\n\n.DraftEditor-root {\n    font-family: monospace;\n    font-size: 14px;\n    height: 100%;\n}\n\n.present {\n    background: white\n}\n\n.present .slide {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        text-align: center;\n        outline: 1px solid #ddd;\n        overflow: hidden;\n        padding: 5%;\n        position: relative;\n        height: 33vw;\n        width: 100%\n    }\n\n.present .slide .md {\n            margin: 0 auto;\n            min-width: 50%;\n        }\n\n.present .notes {\n        display: none;\n        text-align: left;\n        width: 100%;\n    }\n\n@media all and (display-mode: fullscreen) {\n    .present {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        width: 100%\n    }\n        \n        .present .slide {\n            outline: none;\n            display: none;\n            height: 100%;\n            position: absolute\n        }\n            \n            .present .slide.active {\n                display: flex;\n            }\n    \n    .toolbar { \n        display: none !important;\n    }\n    .editor {\n        display: none !important;\n    }\n    .scrolling {\n        overflow: hidden !important;\n    }\n}\n\n.button {\n    background: #eee;\n    border: 1px solid #aaa;\n    border-radius: 3px;\n    cursor: pointer;\n    margin: 0 5px;\n    min-width: 30px;\n    padding: 5px;\n    text-align: center;\n}\n\n.md pre:hover .code-button {\n    opacity: 0.7;\n}\n\n.md .code-button {\n    float: right;\n    font-size: 0.7em;\n    opacity: 0;\n    padding: 2px 5px;\n    margin-top: calc(-1em - 10px)\n}\n\n.md .code-button:hover {\n        opacity: 1;\n    }\n\n.modal {\n    background: rgba(0,0,0,0.75);\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: 1000\n}\n\n.modal.active {\n        display: block;\n    }\n\n.modal .inner {\n        background: #fff;\n        border: 1px solid #aaa;\n        box-shadow: 5px 5px rgba(0,0,0,0.2);\n        display: flex;\n        flex-direction: column;\n        margin: 200px auto 0;\n        padding: 20px;\n        height: 400px;\n        width: 500px;\n    }\n\n.modal .header {\n        margin-bottom: 20px;\n    }\n\n.modal .md {\n        font-size: 14px;\n    }\n\n.modal input {\n        background: #eee;\n        border: none;\n        padding: 5px;\n        margin: 20px 0;\n        width: 100%;\n    }\n\n.modal .file-list {\n        flex: 1 1 auto;\n    }\n\n.modal .file-select {\n        cursor: pointer;\n        padding: 5px;\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none\n    }\n\n.modal .file-select:hover {\n            background: #eee;\n        }\n\n.scrolling {\n    overflow-x: hidden;\n    overflow-y: scroll;\n}\n\n.flex-nav {\n    align-items: center;\n    display: flex;\n}\n\n.flex-nav .pull,\n.flex-nav .spacer {\n    margin-left: auto !important;\n}\n\n.flex-nav .push {\n    margin-right: auto !important;\n}\n\n.sticky {\n    display: flex !important;\n    flex-direction: column;\n}\n\n.sticky > .stick {\n    margin-top: auto;\n}\n\n/* Adapted from modest.css */\n\n/* http://markdowncss.github.io/modest/ */\n\n.md pre,\n    .md code {\n        overflow: hidden;\n        text-align: left;\n        text-overflow: clip;\n    }\n\n.md code {\n        background-color: #eee;\n        font-family: monospace;\n        padding: 0 .2em;\n    }\n\n.md pre code {\n        background-color: inherit !important;\n        display: block;\n        margin: 1em;\n        padding: 0;\n    }\n\n.md pre {\n        background-color: #232323;\n        color: #e8e8e8;\n        line-height: 1.25;\n        padding: .5em;\n        margin: 0 auto 1.5em;\n        max-width: 80ch;\n    }\n\n.md a,\n    .md a:hover,\n    .md a:focus,\n    .md a:active,\n    .md a:visited {\n        color: #3498db;\n    }\n\n.md p, .md ul, .md ol {\n        font-size: 1.2em;\n        margin-bottom: 1.3em;\n        text-align: left;\n    }\n\n.md ul {\n        list-style: disc;\n    }\n\n.md ol {\n        list-style: decimal;\n    }\n\n.md li {\n        margin-left: 1.5em;\n    }\n\n.md h1,\n    .md h2,\n    .md h3 {\n        font-weight: inherit;\n        line-height: 1.42;\n        margin: 0.75em 0 .5em;\n    }\n\n.md h1 {\n        margin-top: 0;\n        font-size: 2.5em;\n    }\n\n.md h2 {\n        font-size: 1.85em;\n    }\n\n.md h3 {\n        font-size: 1.5em;\n    }\n\n.md h4 {\n        font-size: 1.3em;\n    }\n\n.md h5 {\n        font-size: 1.2em;\n    }\n\n.md h6 {\n        font-size: .88em;\n    }\n\n.md small {\n        font-size: .707em;\n    }\n\n.md {\n\n    /* https://github.com/mrmrs/fluidity */\n}\n\n.md canvas,\n    .md iframe,\n    .md video,\n    .md svg,\n    .md select,\n    .md textarea {\n        max-width: 100%;\n    }\n\n.md h1,\n    .md h2,\n    .md h3,\n    .md h4,\n    .md h5,\n    .md h6 {\n        font-family: Arimo, Helvetica, sans-serif;\n    }\n\n.md blockquote {\n        border-left: 8px solid #fafafa;\n        padding: 1em;\n    }\n\n.md em {\n        font-style: italic;\n    }\n\n.md strong {\n        font-weight: bold;\n    }\n\n.md table {\n        margin-bottom: 1.5em;\n        width: 100%\n    }\n\n.md table th, .md table td {\n            border: 1px solid #ddd;\n            padding: 5px;\n        }\n\n.md table th {\n            font-weight: bold;\n        }\n\n.md {\n    font-size: 16px;\n    line-height: 1.85;\n    color: #444;\n    font-family: 'Open Sans', sans-serif;\n    font-weight: 300;\n    line-height: 1.45;\n    padding: .25em;\n}\n\n@media screen and (display-mode: fullscreen) {\n    .md {\n        font-size: 26px;\n    }\n}\n\n.md img {\n    display: block;\n    margin: 1em auto;\n    max-width: 100%\n}\n\n.md img.left {\n        float: left;\n        position: relative;\n        left: 0;\n        margin: 0 1em 1em 0;\n        max-height: 100%;\n        max-width: 35%;\n    }\n\n.md img.right {\n        float: right;\n        position: relative;\n        right: 0;\n        margin: 0 0 1em 1em;\n        max-height: 100%;\n        max-width: 35%;\n    }\n\n.md img.hard {\n        position: absolute;\n        margin: 1em;\n    \n    }\n\n.md img.top {\n        top: 0;\n    }\n\n.md img.bottom {\n        bottom: 0;\n    }\n\n.md img.inline {\n        display: inline-block;\n    }\n\n.md img.big {\n        max-width: 100%;\n        width: 100%;\n    }\n\n.md img.medium {\n        max-width: 60%;\n        width: 60%;\n    }\n\n.md img.small {\n        max-width: 40%;\n        width: 40%;\n    }\n\n.md img.tiny {\n        max-width: 20%;\n        width: 20%;\n    }\n\n@media screen {\n.dark {\n    color: #fff;\n    background: #232323\n}\n    \n    .dark .md {\n        color: #ddd\n    }\n        \n        .dark .md code, .dark .md pre, .dark .md blockquote {\n            background-color: #353535;\n        }\n        \n        .dark .md blockquote {\n            border-color: #666;\n        }\n    \n    .dark .button {\n        background: #444;\n        border-color: #777;\n        color: #eee;\n    }\n    \n    .dark .toolbar {\n        border-color: #444\n    }\n        \n        .dark .toolbar .toolbar-line {\n            border-color: #444;\n        }\n\n    .dark .present, .dark .editor {\n        background-color: inherit;\n        outline-color: #444;\n    }\n    \n    .dark .present .slide {\n        outline-color: #444;\n    }\n        .dark .modal .inner {\n            background: #444;\n            border: 1px solid #666;\n        }\n        \n        .dark .modal input {\n            background: #555;\n            color: #eee;\n            font-size: inherit;\n        }\n        \n        .dark .modal .file-select:hover {\n            background: #555;\n        }\n    \n    .dark .scrolling::-webkit-scrollbar-thumb {\n\t\tbackground-color: #555;\n\t}\n    \n    .dark .scrolling::-webkit-scrollbar-track {\n\t\tbackground-color: #333;\n\t}\n    \n    .dark .scrolling {\n        scrollbar-color: #555 #333;\n    }\n}\n\n@page {\n    size: portrait;\n    margin: 2cm;\n}\n\n@media print {\n    .present {\n        border: none;\n        counter-reset: page;\n        min-height: 100%;\n        min-width: 100%;\n        padding: 0 2.5%\n    }\n        \n        .present .slide {\n            counter-increment: page;\n            height: 40vh;\n            margin: 2.5% 0\n        }\n            \n            .present .slide::after {\n                background: #fff;\n                border-radius: 50%;\n                content: counter(page);\n                padding: .5em;\n                position: absolute;\n                margin: .5em;\n                bottom: 0;\n                right: 0;\n                z-index: 1000;\n            }\n            \n            .present .slide .md {\n                font-size: 8pt !important\n            }\n                \n                .present .slide .md pre {\n                    outline: 1px solid #888;\n                }\n                \n                .present .slide .md pre, .present .slide .md pre code {\n                    color: #000;\n                    background: #fff;\n                }\n        \n        .present .notes {\n            page-break-after: always;\n            -webkit-column-break-after: always;\n                    break-after: always;\n            display: block;\n            margin-top: 5%;\n        }\n    \n    .toolbar { \n        display: none;\n    }\n    .editor {\n        display: none;\n    }\n    .files-modal {\n        display: none;\n    }\n    \n    #root, #app, .split-view, .present {\n        display: block !important;\n        height: unset;\n        overflow: visible;\n    }\n}\n\nhtml, body, #root, #root > div, #app {\n    height: 100%;\n    width: 100%;\n}\n\nbody {\n    box-sizing: border-box;\n    font-family: sans-serif;\n    line-height: 1.3;\n}\n\n*, *::before, *::after {\n    box-sizing: inherit;\n}\n\n.hidden {\n    display: none !important;\n}\n", ""]);

// Exports
exports.locals = {
	"DraftEditor-editorContainer": "DraftEditor-editorContainer",
	"DraftEditor-root": "DraftEditor-root",
	"public-DraftEditor-content": "public-DraftEditor-content",
	"public-DraftEditor-block": "public-DraftEditor-block",
	"DraftEditor-alignLeft": "DraftEditor-alignLeft",
	"public-DraftStyleDefault-block": "public-DraftStyleDefault-block",
	"public-DraftEditorPlaceholder-root": "public-DraftEditorPlaceholder-root",
	"DraftEditor-alignCenter": "DraftEditor-alignCenter",
	"DraftEditor-alignRight": "DraftEditor-alignRight",
	"public-DraftEditorPlaceholder-hasFocus": "public-DraftEditorPlaceholder-hasFocus",
	"DraftEditorPlaceholder-hidden": "DraftEditorPlaceholder-hidden",
	"public-DraftStyleDefault-ltr": "public-DraftStyleDefault-ltr",
	"public-DraftStyleDefault-rtl": "public-DraftStyleDefault-rtl",
	"public-DraftStyleDefault-listLTR": "public-DraftStyleDefault-listLTR",
	"public-DraftStyleDefault-listRTL": "public-DraftStyleDefault-listRTL",
	"public-DraftStyleDefault-ol": "public-DraftStyleDefault-ol",
	"public-DraftStyleDefault-ul": "public-DraftStyleDefault-ul",
	"public-DraftStyleDefault-depth0": "public-DraftStyleDefault-depth0",
	"public-DraftStyleDefault-depth1": "public-DraftStyleDefault-depth1",
	"public-DraftStyleDefault-depth2": "public-DraftStyleDefault-depth2",
	"public-DraftStyleDefault-depth3": "public-DraftStyleDefault-depth3",
	"public-DraftStyleDefault-depth4": "public-DraftStyleDefault-depth4",
	"public-DraftStyleDefault-unorderedListItem": "public-DraftStyleDefault-unorderedListItem",
	"public-DraftStyleDefault-orderedListItem": "public-DraftStyleDefault-orderedListItem",
	"public-DraftStyleDefault-reset": "public-DraftStyleDefault-reset",
	"hljs": "hljs",
	"hljs-comment": "hljs-comment",
	"hljs-quote": "hljs-quote",
	"hljs-keyword": "hljs-keyword",
	"hljs-selector-tag": "hljs-selector-tag",
	"hljs-string": "hljs-string",
	"hljs-number": "hljs-number",
	"hljs-regexp": "hljs-regexp",
	"hljs-variable": "hljs-variable",
	"hljs-template-variable": "hljs-template-variable",
	"hljs-subst": "hljs-subst",
	"hljs-tag": "hljs-tag",
	"hljs-name": "hljs-name",
	"hljs-type": "hljs-type",
	"hljs-symbol": "hljs-symbol",
	"hljs-bullet": "hljs-bullet",
	"hljs-built_in": "hljs-built_in",
	"hljs-builtin-name": "hljs-builtin-name",
	"hljs-attr": "hljs-attr",
	"hljs-link": "hljs-link",
	"hljs-params": "hljs-params",
	"hljs-attribute": "hljs-attribute",
	"hljs-meta": "hljs-meta",
	"hljs-title": "hljs-title",
	"hljs-section": "hljs-section",
	"hljs-addition": "hljs-addition",
	"hljs-deletion": "hljs-deletion",
	"hljs-selector-class": "hljs-selector-class",
	"hljs-selector-id": "hljs-selector-id",
	"hljs-emphasis": "hljs-emphasis",
	"hljs-strong": "hljs-strong",
	"split-view": "split-view",
	"toolbar": "toolbar",
	"toolbar-line": "toolbar-line",
	"editor": "editor",
	"present": "present",
	"slide": "slide",
	"md": "md",
	"notes": "notes",
	"active": "active",
	"scrolling": "scrolling",
	"button": "button",
	"code-button": "code-button",
	"modal": "modal",
	"inner": "inner",
	"header": "header",
	"file-list": "file-list",
	"file-select": "file-select",
	"flex-nav": "flex-nav",
	"pull": "pull",
	"spacer": "spacer",
	"push": "push",
	"sticky": "sticky",
	"stick": "stick",
	"left": "left",
	"right": "right",
	"hard": "hard",
	"top": "top",
	"bottom": "bottom",
	"inline": "inline",
	"big": "big",
	"medium": "medium",
	"small": "small",
	"tiny": "tiny",
	"dark": "dark",
	"files-modal": "files-modal",
	"root": "root",
	"app": "app",
	"hidden": "hidden"
};

/***/ }),

/***/ "./src/button.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/styles.ts");




function Button(props) {
    var icon = props.icon, other = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](props, ["icon"]);
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ className: Object(_styles__WEBPACK_IMPORTED_MODULE_3__["default"])("button") }, other),
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: icon })));
}


/***/ }),

/***/ "./src/dark.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dark", function() { return Dark; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/styles.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-redux/es/index.js");





var Dark = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Dark, _super);
    function Dark(props) {
        var _this = _super.call(this, props) || this;
        var params = qs__WEBPACK_IMPORTED_MODULE_2__["parse"](window.location.search.slice(1));
        _this.isDark = typeof params.dark !== 'undefined';
        return _this;
    }
    Dark.prototype.componentDidMount = function () {
        if (this.isDark && !this.props.isDark) {
            this.props.dispatch({ type: 'DARK' });
        }
        this.isDark = false;
    };
    Dark.prototype.render = function () {
        var _a = this.props, isDark = _a.isDark, dispatch = _a.dispatch, props = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["isDark", "dispatch"]);
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ className: Object(_styles__WEBPACK_IMPORTED_MODULE_3__["default"])({ dark: this.isDark || this.props.isDark }) }, props)));
    };
    return Dark;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var map = function (store) { return ({
    isDark: store.dark,
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(map)(Dark));


/***/ }),

/***/ "./src/editor.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorView", function() { return EditorView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var draft_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/draft-js/lib/Draft.js");
/* harmony import */ var draft_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(draft_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/styles.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-redux/es/index.js");





var TAB = "    ";
function keyBinding(e) {
    if (e.key == "Enter" && e.ctrlKey) {
        return 'editor-render';
    }
    if (e.key == "s" && e.ctrlKey) {
        e.preventDefault();
        return 'editor-save';
    }
    if (e.key == "o" && e.ctrlKey) {
        e.preventDefault();
        return 'editor-load';
    }
    return Object(draft_js__WEBPACK_IMPORTED_MODULE_2__["getDefaultKeyBinding"])(e);
}
var EditorView = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EditorView, _super);
    function EditorView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            draft: draft_js__WEBPACK_IMPORTED_MODULE_2__["EditorState"].createEmpty(),
            content: '',
        };
        _this.handleKey = function (event) {
            if (!event.ctrlKey)
                return;
            switch (event.key) {
                case "1":
                    _this.editor && _this.editor.focus();
                    break;
                case "Home":
                    _this.view && _this.view.scrollTo({ top: 0 });
                    break;
                case "End":
                    _this.view && _this.view.scrollTo({ top: _this.view.scrollHeight });
                    break;
            }
        };
        _this.handleChange = function (draft) {
            var content = draft.getCurrentContent().getPlainText('');
            if (content !== _this.state.content) {
                clearTimeout(_this.timer);
                _this.timer = setTimeout(function () {
                    _this.props.dispatch({ type: 'EDIT', content: content });
                }, 350);
            }
            _this.setState({
                draft: draft,
                content: content,
            });
        };
        _this.handleCommand = function (command) {
            switch (command) {
                case 'editor-render':
                case 'editor-save':
                case 'editor-open':
                    return 'handled';
                default:
                    return 'not-handled';
            }
        };
        _this.insertTab = function (e) {
            if (e) {
                e.preventDefault();
                if (e.ctrlKey || e.shiftKey || e.altKey)
                    return;
            }
            _this.setState(function (_a) {
                var draft = _a.draft;
                return ({
                    draft: draft_js__WEBPACK_IMPORTED_MODULE_2__["EditorState"].push(draft, draft_js__WEBPACK_IMPORTED_MODULE_2__["Modifier"].insertText(draft.getCurrentContent(), draft.getSelection(), TAB), "insert-characters"),
                });
            });
        };
        return _this;
    }
    EditorView.getDerivedStateFromProps = function (props, state) {
        switch (props.action) {
            case 'LOAD':
            case 'OPEN':
            case 'persist/REHYDRATE':
                props.dispatch({ type: 'ACK' });
                return {
                    content: props.content,
                    draft: draft_js__WEBPACK_IMPORTED_MODULE_2__["EditorState"].push(state.draft, draft_js__WEBPACK_IMPORTED_MODULE_2__["ContentState"].createFromText(props.content), "insert-characters"),
                };
        }
        return null;
    };
    EditorView.prototype.componentDidMount = function () {
        window.addEventListener("keyup", this.handleKey);
    };
    EditorView.prototype.componentWillUnmount = function () {
        window.addEventListener("keyup", this.handleKey);
    };
    EditorView.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: function (r) { return _this.view = r; }, className: Object(_styles__WEBPACK_IMPORTED_MODULE_3__["default"])('editor', 'scrolling') },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](draft_js__WEBPACK_IMPORTED_MODULE_2__["Editor"], { ref: function (r) { return _this.editor = r; }, placeholder: "Type markdown here", editorState: this.state.draft, onChange: this.handleChange, onTab: this.insertTab, keyBindingFn: keyBinding, handleKeyCommand: this.handleCommand })));
    };
    return EditorView;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var map = function (store) { return ({
    action: store.action,
    content: store.content,
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(map)(EditorView));


/***/ }),

/***/ "./src/files.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileModal", function() { return FileModal; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/styles.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-redux/es/index.js");




var FileModal = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FileModal, _super);
    function FileModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            filename: '',
        };
        _this.handleClose = function () {
            _this.props.dispatch({ type: "MODAL_CLOSE" });
        };
        _this.handleLoad = function () {
            _this.props.dispatch({
                type: "OPEN",
                filename: _this.state.filename,
            });
            _this.setState({ filename: '' });
        };
        _this.handleSave = function () {
            _this.props.dispatch({
                type: 'SAVE',
                filename: _this.state.filename,
            });
            _this.setState({ filename: '' });
        };
        _this.handleDelete = function () {
            _this.props.dispatch({
                type: "DELETE",
                filename: _this.state.filename,
            });
            _this.setState({ filename: '' });
        };
        _this.handleImport = function () {
            if (!_this.file)
                return;
            _this.file.click();
        };
        _this.handleInput = function (event) {
            _this.setState({
                filename: event.currentTarget.value,
            });
        };
        _this.handleInputKey = function (event) {
            if (event.key === "Enter") {
                _this.handleSave();
                return;
            }
        };
        _this.handleFileLoad = function () {
            if (!_this.file || !_this.file.files)
                return;
            var file = _this.file.files[0];
            var reader = new FileReader();
            reader.onload = function () {
                _this.props.dispatch({
                    type: "LOAD",
                    content: reader.result + "",
                    filename: file.name.replace(/(\.\w+)$/, ''),
                });
            };
            reader.readAsText(file);
        };
        _this.handleKeys = function (event) {
            if (_this.props.isOpen && event.key === "Escape") {
                _this.props.dispatch({ type: "MODAL_CLOSE" });
                return;
            }
            if (event.ctrlKey && event.key === "o") {
                event.preventDefault();
                _this.props.dispatch({
                    type: "MODAL_OPEN",
                    modal: 'files',
                });
                return;
            }
        };
        return _this;
    }
    FileModal.prototype.handleSelect = function (filename) {
        var _this = this;
        return function () {
            if (_this.state.filename === filename) {
                _this.handleLoad();
            }
            else {
                _this.setState({ filename: filename });
            }
        };
    };
    FileModal.prototype.componentDidMount = function () {
        // Browser ctrl+o actions cannot be prevented() on keyup.
        window.addEventListener('keydown', this.handleKeys);
        if (this.file)
            this.file.addEventListener('change', this.handleFileLoad);
    };
    FileModal.prototype.componentWillUnmount = function () {
        window.removeEventListener('keydown', this.handleKeys);
        if (this.file)
            this.file.removeEventListener('change', this.handleFileLoad);
    };
    FileModal.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])({
                'modal': true,
                'active': this.props.isOpen,
            }) },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('inner') },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('header') }, "Local Files"),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('file-list', 'scrolling') }, this.props.fileslist.map(function (filename) { return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { key: filename, className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('file-select'), onClick: _this.handleSelect(filename) }, filename)); })),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", { type: "text", placeholder: "Filename...", value: this.state.filename, onChange: this.handleInput, onKeyUp: this.handleInputKey }),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('flex-nav') },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", { onClick: this.handleClose, className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('button') }, "Close"),
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", { onClick: this.handleImport, className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('button') }, "Upload"),
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", { onClick: this.handleDelete, disabled: !this.state.filename, className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('button', 'pull') }, "Delete"),
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", { onClick: this.handleLoad, disabled: !this.state.filename, className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('button') }, "Open"),
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", { onClick: this.handleSave, disabled: !this.state.filename, className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('button') }, "Save")))),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", { type: "file", ref: function (r) { return _this.file = r; }, className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('hidden') })));
    };
    return FileModal;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

var map = function (state) { return ({
    isOpen: state.modal === 'files',
    filename: state.currentFile,
    fileslist: Object.keys(state.files),
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(map)(FileModal));


/***/ }),

/***/ "./src/head.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Head", function() { return Head; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-redux/es/index.js");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-helmet/lib/Helmet.js");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_2__);



var TITLE = 'Slides';
function Head(props) {
    var filename = props.filename
        ? TITLE + " :: " + props.filename
        : TITLE;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_helmet__WEBPACK_IMPORTED_MODULE_2___default.a, null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("title", null, filename)));
}
var map = function (state) { return ({
    filename: state.currentFile,
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(map)(Head));


/***/ }),

/***/ "./src/help.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpModal", function() { return HelpModal; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/styles.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-redux/es/index.js");
/* harmony import */ var _markdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/markdown.tsx");





var HELP_TEXT = "\n## Markdown Slides\n\nQuicky create a presentation with just a bit of \n[markdown](//www.markdownguide.org/cheat-sheet/).\n\n * Use `---` to create a new slide.\n * Use `[//]: # (...)` to create notes.\n * Add `?url=...` in the address bar to load remote files.\n\nTutorial [here](//" + window.location.host + "/?tutorial).\n\nCode [here](//github.com/gwillz/slides).\n";
var HelpModal = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](HelpModal, _super);
    function HelpModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClose = function () {
            _this.props.dispatch({ type: 'MODAL_CLOSE' });
        };
        return _this;
    }
    HelpModal.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])({
                'modal': true,
                'active': this.props.isOpen,
            }) },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('inner', 'sticky') },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_markdown__WEBPACK_IMPORTED_MODULE_4__["Markdown"], { content: HELP_TEXT }),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('stick', 'flex-nav') },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", { onClick: this.handleClose, className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('button') }, "thnx, bye")))));
    };
    return HelpModal;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var map = function (state) { return ({
    isOpen: state.modal === "help",
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(map)(HelpModal));


/***/ }),

/***/ "./src/icons.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");


_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faAdjust"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faChalkboardTeacher"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faFile"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faFileDownload"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faFolderOpen"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faPlay"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faPrint"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faQuestion"]);


/***/ }),

/***/ "./src/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/redux-persist/es/integration/react.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-redux/es/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/styles.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/store.ts");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/icons.ts");
/* harmony import */ var _head__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/head.tsx");
/* harmony import */ var _dark__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/dark.tsx");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/toolbar.tsx");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./src/editor.tsx");
/* harmony import */ var _presentation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./src/presentation.tsx");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./src/files.tsx");
/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./src/help.tsx");
















var App = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_redux__WEBPACK_IMPORTED_MODULE_4__["Provider"], { store: _store__WEBPACK_IMPORTED_MODULE_7__["store"] },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_3__["PersistGate"], { loading: null, persistor: _store__WEBPACK_IMPORTED_MODULE_7__["persistor"] },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_dark__WEBPACK_IMPORTED_MODULE_10__["default"], { id: Object(_styles__WEBPACK_IMPORTED_MODULE_6__["default"])('app') },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_head__WEBPACK_IMPORTED_MODULE_9__["default"], null),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolbar__WEBPACK_IMPORTED_MODULE_11__["default"], null),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_6__["default"])("split-view") },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editor__WEBPACK_IMPORTED_MODULE_12__["default"], null),
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_presentation__WEBPACK_IMPORTED_MODULE_13__["default"], null)),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_files__WEBPACK_IMPORTED_MODULE_14__["default"], null),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_help__WEBPACK_IMPORTED_MODULE_15__["default"], null)))));
    };
    return App;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
function loadParams() {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var params, url, req, content;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = qs__WEBPACK_IMPORTED_MODULE_5__["parse"](window.location.search.slice(1));
                    url = params.url;
                    if (typeof params.tutorial !== "undefined") {
                        url = window.location.host + window.location.pathname + "tutorial.md";
                    }
                    if (!url) return [3 /*break*/, 3];
                    url = window.location.protocol + "//" + url.replace(/^http:/, '');
                    return [4 /*yield*/, fetch(url, {
                            mode: 'cors',
                            redirect: 'follow',
                        })];
                case 1:
                    req = _a.sent();
                    return [4 /*yield*/, req.text()];
                case 2:
                    content = _a.sent();
                    _store__WEBPACK_IMPORTED_MODULE_7__["store"].dispatch({ type: "LOAD", content: content });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["render"])(react__WEBPACK_IMPORTED_MODULE_1__["createElement"](App, null), document.getElementById("root"));
loadParams();


/***/ }),

/***/ "./src/markdown.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Markdown", function() { return Markdown; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/showdown/dist/showdown.js");
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(showdown__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/styles.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/store.ts");





var markdown = new showdown__WEBPACK_IMPORTED_MODULE_2__["Converter"]({
    disableForced4SpacesIndentedSublists: true,
    excludeTrailingPunctuationFromURLs: true,
    literalMidWordUnderscores: true,
    noHeaderId: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tables: true,
});
(function () {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var plugins;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(/* import() | plugins */[__webpack_require__.e("vendors~index~plugins"), __webpack_require__.e("vendors~plugins"), __webpack_require__.e("plugins")]).then(__webpack_require__.bind(null, "./src/showdown-plugins.ts"))];
                case 1:
                    plugins = _a.sent();
                    plugins.default.forEach(function (plugin) {
                        markdown.addExtension(plugin, plugin.name);
                    });
                    _store__WEBPACK_IMPORTED_MODULE_4__["store"].dispatch({ type: 'RENDER' });
                    return [2 /*return*/];
            }
        });
    });
})();
function doCopy(text) {
    var element = document.createElement('textarea');
    element.value = text;
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
}
var Markdown = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Markdown, _super);
    function Markdown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Markdown.prototype.componentDidMount = function () {
        var _this = this;
        // mounted, but rendering is delayed by makeHtml() / DOM insertion.
        setTimeout(function () {
            if (!_this.element)
                return;
            _this.element.querySelectorAll('.code-button')
                .forEach(function (button) {
                var target = button.previousElementSibling;
                if (!target)
                    return;
                button.addEventListener("click", function (event) {
                    event.stopPropagation();
                    doCopy(target.innerText);
                    return true;
                });
            });
        }, 300);
    };
    Markdown.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: function (r) { return _this.element = r; }, className: (this.props.className || '') + ' ' + Object(_styles__WEBPACK_IMPORTED_MODULE_3__["default"])("md"), dangerouslySetInnerHTML: {
                __html: markdown.makeHtml(this.props.content)
            } }));
    };
    return Markdown;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "./src/presentation.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentView", function() { return PresentView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/styles.ts");
/* harmony import */ var _markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/markdown.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-redux/es/index.js");





var FILTER_NOTES = /\s*\[\/\/\]:\s*#\s*\(([^\n]+)\)/g;
function recurseRegex(expr, src, index) {
    if (index === void 0) { index = 0; }
    var result = [];
    while (true) {
        var match = FILTER_NOTES.exec(src);
        if (!match)
            break;
        result.push(match[1]);
    }
    return result;
}
var PresentView = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PresentView, _super);
    function PresentView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            slides: [],
            notes: [],
            active: 0,
        };
        _this.lastSelection = "";
        _this.handleKey = function (event) {
            switch (event.key) {
                case "Up":
                case "ArrowUp":
                case "Left":
                case "ArrowLeft":
                    _this.previous();
                    break;
                case "Down":
                case "ArrowDown":
                case "Right":
                case "ArrowRight":
                    _this.next();
                    break;
            }
            if (!event.ctrlKey)
                return;
            switch (event.key) {
                case "F1":
                    _this.goFullscreen();
                // fallthrough
                case "Enter":
                    _this.doRender();
                    break;
                case '2':
                    _this.element && _this.element.focus();
                    break;
                case "Home":
                    _this.element && _this.element.scrollTo({ top: 0 });
                    break;
                case "End":
                    _this.element && _this.element.scrollTo({ top: _this.element.scrollHeight });
                    break;
            }
        };
        _this.handleClick = function (event) {
            if (event.type === "click") {
                var selection = window.getSelection().toString();
                if (!selection && !_this.lastSelection) {
                    _this.next();
                }
                _this.lastSelection = selection;
            }
        };
        return _this;
    }
    PresentView.prototype.doRender = function () {
        var slides = this.props.content.split(/\n\s*---+\s*\n/);
        var notes = slides.map(function (slide) { return (recurseRegex(FILTER_NOTES, slide, 1)
            .map(function (note) { return " + " + note; })
            .join('\n')); });
        this.setState({ slides: slides, notes: notes });
    };
    PresentView.prototype.goFullscreen = function () {
        var _this = this;
        this.setState({
            active: 0,
        }, function () {
            if (!_this.element)
                return;
            _this.element.focus();
            _this.element.requestFullscreen();
        });
    };
    PresentView.prototype.next = function () {
        this.setState(function (state) { return ({
            active: Math.min(state.slides.length, state.active + 1),
        }); });
    };
    PresentView.prototype.previous = function () {
        this.setState(function (state) { return ({
            active: Math.max(0, state.active - 1),
        }); });
    };
    PresentView.prototype.componentDidUpdate = function (props) {
        if (props.action === this.props.action)
            return;
        switch (this.props.action) {
            case "FULLSCREEN":
                this.goFullscreen();
            // fallthrough
            case "RENDER":
                this.props.dispatch({ type: 'ACK' });
            // fallthrough
            case "OPEN":
            case "LOAD":
                if (props.content === this.props.content)
                    return;
                this.doRender();
        }
    };
    PresentView.prototype.componentDidMount = function () {
        window.addEventListener("keyup", this.handleKey);
        if (this.props.content) {
            this.doRender();
        }
    };
    PresentView.prototype.componentWillUnmount = function () {
        window.addEventListener("keyup", this.handleKey);
    };
    PresentView.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: function (r) { return _this.element = r; }, onClick: this.handleClick, className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('present', 'scrolling') }, this.state.slides.map(function (slide, i) { return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], { key: i },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])({
                    slide: true,
                    active: i == _this.state.active,
                }) },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_markdown__WEBPACK_IMPORTED_MODULE_3__["Markdown"], { content: slide })),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_markdown__WEBPACK_IMPORTED_MODULE_3__["Markdown"], { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('notes'), content: _this.state.notes[i] }))); })));
    };
    return PresentView;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

var map = function (store) { return ({
    action: store.action,
    content: store.content,
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(map)(PresentView));


/***/ }),

/***/ "./src/store.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "persistor", function() { return persistor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/redux/es/redux.js");
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/redux-persist/es/index.js");
/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/redux-persist/lib/storage/index.js");
/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_3__);




var config = {
    key: 'root',
    storage: redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_3___default.a,
    // don't store these
    // - don't re-open modals on load
    // - don't open last content/filename
    // - 'action' can cause problems
    blacklist: ['action', 'modal', 'content', 'currentFile'],
};
var INIT_STATE = {
    action: null,
    content: '',
    dark: false,
    modal: null,
    files: {},
};
function reducer(state, action) {
    if (state === void 0) { state = INIT_STATE; }
    var _a, _b, _c;
    switch (action.type) {
        // load into editor, but also store in local
        // close any open modals
        case "LOAD":
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { action: action.type, currentFile: action.filename, content: action.content, files: action.filename ? tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state.files, (_a = {}, _a[action.filename] = action.content, _a)) : state.files, modal: null });
        // toggle dark mode
        case "DARK":
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { action: action.type, dark: !state.dark });
        // fetch content from local
        // close any open modals
        case "OPEN":
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { action: action.type, currentFile: action.filename, content: state.files[action.filename] || '', modal: null });
        // save current content to local, with a filename
        // close any open modals
        case "SAVE":
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { files: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state.files, (_b = {}, _b[action.filename] = state.content, _b)), currentFile: action.filename, modal: null });
        // update content
        // update file in local store if present
        case "EDIT":
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { content: action.content, files: state.currentFile ? tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state.files, (_c = {}, _c[state.currentFile] = action.content, _c)) : state.files });
        // delete this file
        case "DELETE":
            delete state.files[action.filename];
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { 
                // EDIT actions will re-save unless were clear this
                currentFile: action.filename === state.currentFile
                    ? undefined
                    : state.currentFile, 
                // this creates a copy of 'files'
                files: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state.files) });
        // open a modal dialog
        case "MODAL_OPEN":
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { modal: action.modal });
        // close any open modals
        case "MODAL_CLOSE":
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { modal: null });
    }
    // everything else, just store the action
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { action: action.type });
}
var store = Object(redux__WEBPACK_IMPORTED_MODULE_1__["createStore"])(Object(redux_persist__WEBPACK_IMPORTED_MODULE_2__["persistReducer"])(config, reducer), window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());
var persistor = Object(redux_persist__WEBPACK_IMPORTED_MODULE_2__["persistStore"])(store);


/***/ }),

/***/ "./src/styles.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./css/index.css");
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_index_css__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (classnames_bind__WEBPACK_IMPORTED_MODULE_0___default.a.bind(_css_index_css__WEBPACK_IMPORTED_MODULE_1___default.a));


/***/ }),

/***/ "./src/toolbar.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toolbar", function() { return Toolbar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/styles.ts");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/button.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-redux/es/index.js");





var Toolbar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Toolbar, _super);
    function Toolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleDownload = function () {
            if (!_this.link)
                return;
            var content = _this.props.content;
            var url = URL.createObjectURL(new Blob([content]));
            _this.link.setAttribute("href", url);
            _this.link.click();
            URL.revokeObjectURL(url);
        };
        _this.handleOpenModal = function () {
            _this.props.dispatch({
                type: "MODAL_OPEN",
                modal: 'files',
            });
        };
        _this.handlePreview = function () {
            _this.props.dispatch({ type: "RENDER" });
        };
        _this.handlePresent = function () {
            _this.props.dispatch({ type: "FULLSCREEN" });
        };
        _this.handleNew = function () {
            if (!_this.props.filename) {
                var yes = window.confirm("You will lose changes, are you sure?");
                if (!yes)
                    return;
            }
            _this.props.dispatch({ type: "LOAD", content: "" });
        };
        _this.handleDark = function () {
            _this.props.dispatch({ type: "DARK" });
        };
        _this.handlePrint = function () {
            _this.props.dispatch({ type: "RENDER" });
            setTimeout(function () { return window.print(); }, 250);
        };
        _this.handleHelp = function () {
            _this.props.dispatch({
                type: "MODAL_OPEN",
                modal: 'help',
            });
        };
        return _this;
    }
    Toolbar.prototype.render = function () {
        var _this = this;
        var filename = this.props.filename || 'presentation';
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('toolbar', 'flex-nav') },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_button__WEBPACK_IMPORTED_MODULE_3__["Button"], { icon: "file", title: "New file", onClick: this.handleNew }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_button__WEBPACK_IMPORTED_MODULE_3__["Button"], { icon: "folder-open", title: "Save/Open files", onClick: this.handleOpenModal }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_button__WEBPACK_IMPORTED_MODULE_3__["Button"], { icon: "file-download", title: "Export/Download", onClick: this.handleDownload }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('toolbar-line') }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_button__WEBPACK_IMPORTED_MODULE_3__["Button"], { icon: "play", title: "Render Preview (Ctrl+Enter)", onClick: this.handlePreview }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_button__WEBPACK_IMPORTED_MODULE_3__["Button"], { icon: "print", title: "Print with notes (Ctrl+P)", onClick: this.handlePrint }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_button__WEBPACK_IMPORTED_MODULE_3__["Button"], { icon: "chalkboard-teacher", title: "Present Slideshow (Ctrl-F1)", onClick: this.handlePresent }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('toolbar-line') }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_button__WEBPACK_IMPORTED_MODULE_3__["Button"], { icon: "adjust", title: "Dark Mode", onClick: this.handleDark }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_button__WEBPACK_IMPORTED_MODULE_3__["Button"], { icon: "question", title: "About", onClick: this.handleHelp }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", { href: "data:", download: filename + ".md", ref: function (r) { return _this.link = r; }, className: Object(_styles__WEBPACK_IMPORTED_MODULE_2__["default"])('hidden') })));
    };
    return Toolbar;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var map = function (state) { return ({
    filename: state.currentFile,
    content: state.content,
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(map)(Toolbar));


/***/ })

/******/ });
//# sourceMappingURL=index.js.map