
import * as React from 'react';
import styles from './styles';
import {Button} from './button';
import {store} from './store'

export class Toolbar extends React.PureComponent {
    private file: HTMLInputElement | null;
    private link: HTMLElement | null;
    
    handleUpload = () => {
        if (!this.file) return;
        this.file.click();
    }
    
    handleDownload = () => {
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
    
    handleOpenModal = () => {
        store.dispatch({type: "MODAL_OPEN"});
    }
    
    handleKey = (event: KeyboardEvent) => {
        if (!event.ctrlKey) return;
        
        switch (event.key) {
            case "s":
                event.preventDefault();
                this.handleDownload();
                break;
                
            case "o":
                event.preventDefault();
                this.handleUpload();
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
        return (
            <div className={styles('toolbar')}>
                <Button 
                    icon="save"
                    title="Save/Open files"
                    onClick={this.handleOpenModal}
                />
                <Button
                    icon="file-upload"
                    title="Load from disk"
                    onClick={this.handleUpload}
                />
                <Button 
                    icon="file-download"
                    title="Save to disk"
                    onClick={this.handleDownload}
                />
                <div className={styles('spacer')}/>
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
                <div className={styles('spacer')}/>
                <Button 
                    icon="play"
                    title="Render Preview (Ctrl+Enter)"
                    onClick={this.handlePreview}
                />
                <Button 
                    icon="print"
                    title="Print with notes (Ctrl+P)"
                    onClick={this.handlePrint}
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
