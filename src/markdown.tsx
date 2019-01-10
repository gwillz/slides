
import * as React from 'react'
import * as showdown from 'showdown'
import * as showdownHighlight from 'showdown-highlight'
import showdownCopyCode from './showdown-copycode'
import styles from './styles'

type Props = {
    content: string;
}

const markdown = new showdown.Converter({
    simplifiedAutoLink: true,
    excludeTrailingPunctuationFromURLs: true,
    tables: true,
    extensions: [
        showdownHighlight,
        showdownCopyCode,
    ],
})

export class Markdown extends React.PureComponent<Props> {
    private element: HTMLElement | null;
    
    componentDidMount() {
        if (!this.element) return;
        
        this.element.querySelectorAll('.code-button')
        .forEach(button => {
            button.addEventListener("click", this.handleCopy)
        })
    }
    
    handleCopy = (event: MouseEvent) => {
        if (!event.currentTarget) return;
        event.stopPropagation();
        
        const button = event.currentTarget as HTMLElement;
        const target = button.previousElementSibling as HTMLElement;
        
        const text = document.createElement('textarea');
        text.value = target.innerText;
        text.style.position = 'absolute';
        text.style.left = '-9999px';
        
        document.body.appendChild(text);
        text.select();
        document.execCommand('copy');
        document.body.removeChild(text);
    }
    
    render() {
        return (
            <div
                ref={r => this.element = r}
                className={styles("md")}
                dangerouslySetInnerHTML={{
                    __html: markdown.makeHtml(this.props.content)
                }}
            />
        )
    }
}
