
import * as React from 'react';
import styles from './styles';
import {Button} from './button';
import store from './store';

export class Toolbar extends React.Component {
    private file: HTMLInputElement | null;
    private link: HTMLElement | null;
    
    handleLoad = () => {
        if (!this.file) return;
        this.file.click();
    }
    
    handleSave = () => {
        if (!this.link) return;
        
        // @todo this should be elsewhere
        const {content} = store.getState();
        const url = URL.createObjectURL(new Blob([content]));
        this.link.setAttribute("href", url);
        this.link.click();
        URL.revokeObjectURL(url);
    }
    
    handlePreview = () => {
        store.dispatch({type: "RENDER"});
    }
    
    handlePresent = () => {
        store.dispatch({type: "FULLSCREEN"});
    }
    
    componentDidMount() {
        if (!this.file) return;
        this.file.addEventListener('change', this.handleFileLoad);
    }
    
    componentWillUnmount() {
        if (!this.file) return;
        this.file.removeEventListener('change', this.handleFileLoad);
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
    
    render() {
        return (
            <div className={styles('toolbar')}>
                <Button
                    icon="file-import"
                    title="Load from disk"
                    onClick={this.handleLoad}
                />
                <Button 
                    icon="save"
                    title="Save to disk"
                    onClick={this.handleSave}
                />
                <Button 
                    icon="running" 
                    title="Render Preview" 
                    onClick={this.handlePreview}
                />
                <Button 
                    icon="play" 
                    title="Present Slideshow"
                    onClick={this.handlePresent}
                />
                
                <input 
                    type="file"
                    ref={r => this.file = r}
                    style={{display: 'none'}}
                />
                <a
                    href="data:"
                    download="presentation.md"
                    ref={r => this.link = r}
                    style={{display: 'none'}}
                />
            </div>
        )
    }
}
