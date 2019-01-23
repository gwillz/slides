
import * as React from 'react';
import styles from './styles';
import {ActionTypes, State as Store, Action} from './store';
import { Markdown } from './markdown';
import { connect, DispatchProp } from 'react-redux';

const FILTER_NOTES = /\s*\[\/\/\]:\s*#\s*\(([^\n]+)\)/g;


function bigRegex(expr: RegExp, src: string) {
    let result = [];
    while (true) {
        let match = expr.exec(src);
        if (!match) break;
        result.push(match[1]);
    }
    return result;
}

type Props = DispatchProp<Action> & {
    action: ActionTypes;
    content: string;
}

type State = {
    slides: string[];
    notes: string[];
    active: number;
    scrollTo: boolean;
}

export class PresentView extends React.PureComponent<Props, State> {
    state: State = {
        slides: [],
        notes: [],
        active: 0,
        scrollTo: false,
    }
    
    private lastSelection = "";
    private element: HTMLElement | null;
    
    private handleKey = (event: KeyboardEvent) => {
        switch (event.key) {
            case "Up":
            case "ArrowUp":
            case "Left":
            case "ArrowLeft":
                this.previous();
                break;
            
            case "Down":
            case "ArrowDown":
            case "Right":
            case "ArrowRight":
                this.next();
                break;
        }
        
        if (!event.ctrlKey) return;
        switch (event.key) {
            case "F1":
                this.goFullscreen();
                this.doRender();
                break;
                
            case '2': 
                this.element && this.element.focus();
                break;
            
            case "Home":
                this.element && this.element.scrollTo({top: 0});
                break;
            
            case "End":
                this.element && this.element.scrollTo({top: this.element.scrollHeight});
                break;
        }
    }
    
    private handleClick = (event: React.MouseEvent) => {
        if (event.type === "click") {
            const selection = window.getSelection().toString();
            
            if (!selection && !this.lastSelection) {
                this.next();
            }
            this.lastSelection = selection;
        }
    }
    
    public doRender(scrollTo = false) {
        const slides = this.props.content.split(/\n\s*---+\s*\n/);
        const notes = slides.map(slide => (
            bigRegex(FILTER_NOTES, slide)
            .map(note => " + " + note)
            .join('\n')
        ));
        // Force no-scroll if adding or deleting slides.
        // When the list size changes, the node keys may change and cause
        // an unplanned re-render.
        if (slides.length !== this.state.slides.length) {
            scrollTo = false;
        }
        this.setState({ slides, notes, scrollTo });
    }
    
    public goFullscreen() {
        this.setState({
            active: 0,
        }, () => {
            if (!this.element) return;
            this.element.focus();
            let rfs =
                this.element.requestFullscreen ||
                // @ts-ignore
                this.element.webkitRequestFullScreen ||
                // @ts-ignore
                this.element.webkitRequestFullscreen ||
                // @ts-ignore
                this.element.mozRequestFullScreen ||
                // @ts-ignore
                this.element.msRequestFullscreen;
            rfs.call(this.element);
        })
    }
    
    public next() {
        this.setState(state => ({
            active: Math.min(state.slides.length, state.active + 1),
        }))
    }
    
    public previous() {
        this.setState(state => ({
            active: Math.max(0, state.active - 1),
        }))
    }
    
    componentDidUpdate(props: Props) {
        if (props.action === this.props.action) return;
        switch (this.props.action) {
            case "FULLSCREEN":
                this.goFullscreen();
                this.props.dispatch({type: 'ACK'});
                break;
                
            case "RENDER":
            case "EDIT":
                this.doRender(true);
                this.props.dispatch({type: 'ACK'});
                break;
                
            case "OPEN":
            case "LOAD":
                if (props.content === this.props.content) return;
                this.doRender();
                break;
        }
    }
    
    componentDidMount() {
        window.addEventListener("keyup", this.handleKey);
        if (this.props.content) {
            this.doRender();
        }
    }
    
    componentWillUnmount() {
        window.addEventListener("keyup", this.handleKey);
    }
    
    render() {
        return (
            <div ref={r => this.element = r}
                onClick={this.handleClick}
                className={styles('present', 'scrolling')}>
                {this.state.slides.map((slide, i) => (
                <React.Fragment key={i}>
                    <div className={styles({
                        slide: true,
                        active: i == this.state.active,
                    })}>
                        <Markdown
                            scrollTo={this.state.scrollTo}
                            content={slide}
                        />
                    </div>
                    <Markdown
                        className={styles('notes')}
                        content={this.state.notes[i]}
                    />
                </React.Fragment>
                ))}
            </div>
        )
    }
}

const map = (store: Store) => ({
    action: store.action,
    content: store.content,
})

export default connect(map)(PresentView);