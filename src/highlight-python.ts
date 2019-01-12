/*
Language: Python 3
Category: common
*/

export default function(hljs: any) {
    var KEYWORDS = {
      keyword:
        'and elif is global as in if from raise for except finally import pass return ' +
        'else break not with class assert yield try while continue del or def lambda ' +
        'async await nonlocal|10',
      built_in:
        'Ellipsis NotImplemented None True False abc all any ascii bin bool breakpoint' +
        'bytearray bytes callable chr classmethod compile complex delattr dict dir divmod' +
        'enumerate eval exec filter float format frozenset getattr globals hasattr hash' + 
        'help hex id input int isinstance issubclass iter len list locals map max memoryview' + 
        'min next object oct open ord pow print property range repr reversed round set setattr' +
        'slice sorted staticmethod str sum super tuple type vars zip __import__'
    };
    var PROMPT = {
      className: 'meta',  begin: /^(>>>|\.\.\.) /
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
        {begin: hljs.BINARY_NUMBER_RE + '[lLjJ]?'},
        {begin: '\\b(0o[0-7]+)[lLjJ]?'},
        {begin: hljs.C_NUMBER_RE + '[lLjJ]?'}
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
            {className: 'function', beginKeywords: 'def'},
            {className: 'class', beginKeywords: 'class'}
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
  }
  