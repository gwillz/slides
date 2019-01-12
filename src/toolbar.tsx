
import * as React from 'react';
import styles from './styles';
import {Button} from './button';
import {store} from './store'

export class Toolbar extends React.PureComponent {
    private file: HTMLInputElement | null;
    private link: HTMLElement | null;
    
    handleLoad = () => {
        if (!this.file) return;
        this.file.click();
    }
    
    handleSave = () => {
        if (!this.link) return;
        
        const {content} = store.getState();
        const url = URL.createObjectURL(new Blob([content]));
        this.link.setAttribute("href", url);
        this.link.click();
        URL.revokeObjectURL(url);
    }
    
    handleFileLoad = () => {
        if (!this.file || !this.file.files) return;
        
        const reader = new FileReader();
        reader.onload = () => {
            store.dispatch({
                type: "LOAD",
                content: reader.result + "",
            })
        }
        reader.readAsText(this.file.files[0]);
    }
    
    handleKey = (event: KeyboardEvent) => {
        if (!event.ctrlKey) return;
        
        switch (event.key) {
            case "s":
                event.preventDefault();
                this.handleSave();
                break;
                
            case "o":
                event.preventDefault();
                this.handleLoad();
                break;
        }
    }
    
    handlePreview = () => {
        store.dispatch({type: "RENDER"});
    }
    
    handlePresent = () => {
        store.dispatch({type: "FULLSCREEN"});
    }
    
    handleClear = () => {
        store.dispatch({type: "LOAD", content: ""});
    }
    
    handleDark = () => {
        store.dispatch({type: "DARK"});
    }
    
    handlePrint = () => {
        store.dispatch({type: "RENDER"});
        setTimeout(() => window.print(), 250);
    }
    
    componentDidMount() {
        if (!this.file) return;
        this.file.addEventListener('change', this.handleFileLoad);
        window.addEventListener("keyup", this.handleKey);
    }
    
    componentWillUnmount() {
        if (!this.file) return;
        this.file.removeEventListener('change', this.handleFileLoad);
        window.addEventListener("keyup", this.handleKey);
    }
    
    render() {
        // @todo ctrl+s, ctrl+o don't work atm.
        return (
            <div className={styles('toolbar')}>
                <Button
                    icon="file-import"
                    title="Load from disk (Ctrl+O)"
                    onClick={this.handleLoad}
                />
                <Button 
                    icon="save"
                    title="Save to disk (Ctrl+S)"
                    onClick={this.handleSave}
                />
                <Button
                    icon="broom"
                    title="Clear"
                    onClick={this.handleClear}
                />
                <Button
                    icon="adjust"
                    title="Dark Mode"
                    onClick={this.handleDark}
                />
                <Button 
                    icon="print"
                    title="Print (with notes)"
                    onClick={this.handlePrint}
                />
                <Button 
                    icon="play"
                    title="Render Preview (Ctrl+Enter)"
                    onClick={this.handlePreview}
                />
                <Button 
                    icon="chalkboard-teacher"
                    title="Present Slideshow (Ctrl-F1)"
                    onClick={this.handlePresent}
                />
                <input
                    type="file"
                    ref={r => this.file = r}
                    className={styles('hidden')}
                />
                <a
                    href="data:"
                    download="presentation.md"
                    ref={r => this.link = r}
                    className={styles('hidden')}
                />
            </div>
        )
    }
}

export default Toolbar;
