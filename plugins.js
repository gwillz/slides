(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["plugins"],{

/***/ "./src/highlight-python.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
Language: Python 3
Category: common
*/
/* harmony default export */ __webpack_exports__["default"] = (function (hljs) {
    var KEYWORDS = {
        keyword: 'and elif is global as in if from raise for except finally import pass return ' +
            'else break not with class assert yield try while continue del or def lambda ' +
            'async await nonlocal|10',
        built_in: 'Ellipsis NotImplemented None True False abc all any ascii bin bool breakpoint' +
            'bytearray bytes callable chr classmethod compile complex delattr dict dir divmod' +
            'enumerate eval exec filter float format frozenset getattr globals hasattr hash' +
            'help hex id input int isinstance issubclass iter len list locals map max memoryview' +
            'min next object oct open ord pow print property range repr reversed round set setattr' +
            'slice sorted staticmethod str sum super tuple type vars zip __import__'
    };
    var PROMPT = {
        className: 'meta', begin: /^(>>>|\.\.\.) /
    };
    var SUBST = {
        className: 'subst',
        begin: /\{/, end: /\}/,
        keywords: KEYWORDS,
        illegal: /#/
    };
    var STRING = {
        className: 'string',
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
            {
                begin: /(u|b)?r?'''/, end: /'''/,
                contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
                relevance: 10
            },
            {
                begin: /(u|b)?r?"""/, end: /"""/,
                contains: [hljs.BACKSLASH_ESCAPE, PROMPT],
                relevance: 10
            },
            {
                begin: /(fr|rf|f)'''/, end: /'''/,
                contains: [hljs.BACKSLASH_ESCAPE, PROMPT, SUBST]
            },
            {
                begin: /(fr|rf|f)"""/, end: /"""/,
                contains: [hljs.BACKSLASH_ESCAPE, PROMPT, SUBST]
            },
            {
                begin: /(u|r|ur)'/, end: /'/,
                relevance: 10
            },
            {
                begin: /(u|r|ur)"/, end: /"/,
                relevance: 10
            },
            {
                begin: /(b|br)'/, end: /'/
            },
            {
                begin: /(b|br)"/, end: /"/
            },
            {
                begin: /(fr|rf|f)'/, end: /'/,
                contains: [hljs.BACKSLASH_ESCAPE, SUBST]
            },
            {
                begin: /(fr|rf|f)"/, end: /"/,
                contains: [hljs.BACKSLASH_ESCAPE, SUBST]
            },
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE
        ]
    };
    var NUMBER = {
        className: 'number', relevance: 0,
        variants: [
            { begin: hljs.BINARY_NUMBER_RE + '[lLjJ]?' },
            { begin: '\\b(0o[0-7]+)[lLjJ]?' },
            { begin: hljs.C_NUMBER_RE + '[lLjJ]?' }
        ]
    };
    var PARAMS = {
        className: 'params',
        begin: /\(/, end: /\)/,
        contains: ['self', PROMPT, NUMBER, STRING]
    };
    //@ts-ignore
    SUBST.contains = [STRING, NUMBER, PROMPT];
    return {
        aliases: ['py', 'gyp', 'ipython'],
        keywords: KEYWORDS,
        illegal: /(<\/|->|\?)|=>/,
        contains: [
            PROMPT,
            NUMBER,
            STRING,
            hljs.HASH_COMMENT_MODE,
            {
                variants: [
                    { className: 'function', beginKeywords: 'def' },
                    { className: 'class', beginKeywords: 'class' }
                ],
                end: /:/,
                illegal: /[${=;\n,]/,
                contains: [
                    hljs.UNDERSCORE_TITLE_MODE,
                    PARAMS,
                    {
                        begin: /->/, endsWithParent: true,
                        keywords: 'None'
                    }
                ]
            },
            {
                className: 'meta',
                begin: /^[\t ]*@/, end: /$/
            }
        ]
    };
});


/***/ }),

/***/ "./src/showdown-plugins.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/highlight.js/lib/index.js");
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(highlight_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _highlight_python__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/highlight-python.ts");
/* harmony import */ var showdown_highlight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/showdown-highlight/lib/index.js");
/* harmony import */ var showdown_highlight__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(showdown_highlight__WEBPACK_IMPORTED_MODULE_2__);



//@ts-ignore
highlight_js__WEBPACK_IMPORTED_MODULE_0__["registerLanguage"]('python', _highlight_python__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = ([
    showdown_highlight__WEBPACK_IMPORTED_MODULE_2__,
    showdownCopyCode,
    showdownImageFloat,
    showdownBlankLinks,
]);
function showdownCopyCode() {
    return [{
            type: "html",
            regex: /(<\/code>)(<\/pre>)/gm,
            replace: "$1<button class=\"button code-button\">Copy</button>$2",
        }];
}
// @todo convert to an 'output' type
function showdownImageFloat() {
    return [{
            type: "lang",
            regex: /[^`]!\[([^\]]+)\]\(([^\)]+)\)/g,
            replace: "<img class=\"$1\" src=\"$2\" alt=\"$2\"/>",
        }];
}
function showdownBlankLinks() {
    return [{
            type: 'html',
            regex: /(<a [^>]+?)(>.*<\/a>)/g,
            replace: '$1 target="_blank"$2'
        }];
}


/***/ })

}]);
//# sourceMappingURL=plugins.js.map