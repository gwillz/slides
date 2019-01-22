
import * as React from 'react'
import * as showdown from 'showdown'
import styles from './styles'
import {store} from './store'

type Props = {
    className?: string;
    noScrollTo?: boolean;
    content: string;
}

const markdown = new showdown.Converter({
    disableForced4SpacesIndentedSublists: true,
    excludeTrailingPunctuationFromURLs: true,
    literalMidWordUnderscores: true,
    noHeaderId: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tables: true,
})

let PLUGINS_LOADED = false;

;(async function() {
    const plugins = await import('./showdown-plugins' /* webpackChunkName: 'plugins' */);
    
    plugins.default.forEach(plugin => {
        markdown.addExtension(plugin, plugin.name);
    });
    
    PLUGINS_LOADED = true;
    store.dispatch({type: 'RENDER'});
})();


function doCopy(text: string) {
    const element = document.createElement('textarea');
    element.value = text;
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
}


export class Markdown extends React.Component<Props> {
    private element: HTMLElement | null;
    private plugins_loaded = false;
    
    static last_rendered: number;
    
    // Perform an update once plugins are loaded.
    // Otherwise only update on prop changes, aka PureComponent.
    shouldComponentUpdate(props: Props) {
        if (PLUGINS_LOADED && !this.plugins_loaded) {
            this.plugins_loaded = true;
            return true;
        }
        return (
            this.props.className !== props.className ||
            this.props.content !== props.content
        )
    }
    
    componentDidMount() {
        // mounted, but rendering is delayed by makeHtml() / DOM insertion.
        setTimeout(() => {
            if (!this.element) return;
            this.element.querySelectorAll('.code-button')
            .forEach(button => {
                
                const target = button.previousElementSibling as HTMLElement;
                if (!target) return;
                
                // button.removeEventListener();
                button.addEventListener("click", event => {
                    event.stopPropagation();
                    doCopy(target.innerText);
                    return true;
                });
            })
        }, 350);
    }
    
    // This will scroll to the last rendered slide. Although this
    // isn't be best behaviour, it's pretty close to what we want.
    componentDidUpdate() {
        if (this.props.noScrollTo) return;
        
        clearTimeout(Markdown.last_rendered);
        Markdown.last_rendered = setTimeout(() => {
            this.element && this.element.scrollIntoView({
                behavior: 'smooth', 
                block: 'center',
            });
        }, 100);
    }
    
    render() {
        return (
            <div
                ref={r => this.element = r}
                className={(this.props.className || '') + ' ' + styles("md")}
                dangerouslySetInnerHTML={{
                    __html: markdown.makeHtml(this.props.content)
                }}
            />
        )
    }
}
