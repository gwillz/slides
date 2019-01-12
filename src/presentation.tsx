
import * as React from 'react';
import styles from './styles';
import store from './store';
import { Markdown } from './markdown';
import { Unsubscribe } from 'redux';

const FILTER_NOTES = /\s*\[\/\/\]:\s*#\s*\(([^\n]+)\)/g;


function recurseRegex(expr: RegExp, src: string, index = 0) {
    let result = [];
    while (true) {
        let match = FILTER_NOTES.exec(src);
        if (!match) break;
        result.push(match[1]);
    }
    return result;
}


type State = {
    slides: string[];
    notes: string[];
    active: number;
}

export class PresentView extends React.PureComponent<{}, State> {
    state: State = {
        slides: [],
        notes: [],
        active: 0,
    }
    
    private lastSelection = "";
    private element: HTMLElement | null;
    private unsubscribe: Unsubscribe;
    
    private handleStore = () => {
        const state = store.getState();
        
        switch (state.action) {
            case "FULLSCREEN":
                this.goFullscreen();
                // fallthrough
            case "RENDER":
            case "LOAD":
                this.doRender();
                break;
        }
    }
    
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
            case "Enter":
                this.doRender();
                break;
            
            case "F1":
                this.doRender();
                this.goFullscreen();
                break;
            
            case '1':
                store.dispatch({
                    type: 'FOCUS',
                    target: 'editor',
                })
                break;
                
            case '2': 
                this.element && this.element.focus();
                break;
            
            case "Home":
                this.element && this.element.scrollTo({top: 0});
                store.dispatch({
                    type: 'FOCUS',
                    target: 'scroll-top',
                })
                break;
            
            case "End":
                this.element && this.element.scrollTo({top: this.element.scrollHeight});
                store.dispatch({
                    type: 'FOCUS',
                    target: 'scroll-bottom',
                })
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
    
    componentDidMount() {
        this.unsubscribe = store.subscribe(this.handleStore);
        window.addEventListener("keyup", this.handleKey);
    }
    
    componentWillUnmount() {
        this.unsubscribe();
        window.addEventListener("keyup", this.handleKey);
    }
    
    public doRender() {
        const state = store.getState();
        const slides = state.content.split(/\n\s*---+\s*\n/);
        const notes = slides.map(slide => (
            recurseRegex(FILTER_NOTES, slide, 1)
            .map(note => " + " + note)
            .join('\n')
        ));
        
        this.setState({ slides, notes });
    }
    
    public goFullscreen() {
        this.setState({
            active: 0,
        }, () => {
            if (!this.element) return;
            this.element.requestFullscreen();
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
    
    render() {
        return (
            <div ref={r => this.element = r}
                onClick={this.handleClick}
                className={styles('present')}>
                {this.state.slides.map((slide, i) => (
                <React.Fragment key={i}>
                    <div className={styles({
                        slide: true,
                        active: i == this.state.active,
                    })}>
                        <Markdown content={slide}/>
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

