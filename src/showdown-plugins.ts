
import * as hljs from 'highlight.js';
import python from './highlight-python';
import * as showdownHighlight from 'showdown-highlight'
import showdownCopyCode from './showdown-copycode'

//@ts-ignore
hljs.registerLanguage('python', python);

export default [
    showdownHighlight,
    showdownCopyCode,
] as any[]
