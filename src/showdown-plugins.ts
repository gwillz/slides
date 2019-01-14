
import * as hljs from 'highlight.js';
import python from './highlight-python';
import * as showdownHighlight from 'showdown-highlight'

//@ts-ignore
hljs.registerLanguage('python', python);

export default [
    showdownHighlight,
    showdownCopyCode,
    showdownImageFloat,
    showdownBlankLinks,
] as any[]

function showdownCopyCode() {
    return [{
        type: "html",
        regex: /(<\/code>)(<\/pre>)/gm,
        replace: `$1<button class="button code-button">Copy</button>$2`,
    }]
}

function showdownImageFloat() {
    return [{
        type: "lang",
        regex: /!\[([^\]]+)\]\(([^\)]+)\)/,
        replace: `<img class="$1" src="$2" alt="$2"/>`,
    }]
}

function showdownBlankLinks() {
    return [{
        type: 'html',
        regex: /(<a [^>]+?)(>.*<\/a>)/g,
        replace: '$1 target="_blank"$2'
    }]
}
