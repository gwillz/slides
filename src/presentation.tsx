
import * as React from 'react';
import styles from './styles';
import store from './store';
import { Markdown } from './markdown';
import { Unsubscribe } from 'redux';

type State = {
    slides: string[];
    active: number;
}

export class PresentView extends React.PureComponent<{}, State> {
    state: State = {
        slides: [],
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
            
            case "Enter":
                if (event.ctrlKey) this.doRender();
                break;
            
            case "F1":
                this.doRender();
                this.goFullscreen();
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
        this.setState({ slides });
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
                    <div key={i} className={styles({
                        slide: true,
                        active: i == this.state.active,
                    })}>
                        <Markdown content={slide}/>
                    </div>
                ))}
            </div>
        )
    }
}

