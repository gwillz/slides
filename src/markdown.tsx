
import * as React from 'react'
import * as showdown from 'showdown'
import * as showdownHighlight from 'showdown-highlight'
import styles from './styles'

type Props = {
    content: string;
}

const markdown = new showdown.Converter({
    simplifiedAutoLink: true,
    excludeTrailingPunctuationFromURLs: true,
    extensions: [showdownHighlight],
})

const Markdown = React.memo((props: Props) => (
    <div
        className={styles("markdown-body")}
        dangerouslySetInnerHTML={{
            __html: markdown.makeHtml(props.content)
        }}
    />
))

export {Markdown};
