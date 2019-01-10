
export default function showdownCopyCode() {
    return [{
        type: "html",
        regex: /(<\/code>)(<\/pre>)/gm,
        replace: `$1<button class="button code-button">Copy</button>$2`,
    }]
}
