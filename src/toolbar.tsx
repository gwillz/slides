
import * as React from 'react';
import styles from './styles';
import {Button} from './button';
import {Store} from './store'
import { connect, DispatchProp } from 'react-redux';

type Props = DispatchProp & {
    content: string;
    filename?: string;
}

export class Toolbar extends React.PureComponent<Props> {
    private link: HTMLElement | null;
    
    handleDownload = () => {
        if (!this.link) return;
        
        const {content} = this.props;
        const url = URL.createObjectURL(new Blob([content]));
        this.link.setAttribute("href", url);
        this.link.click();
        URL.revokeObjectURL(url);
    }
    
    handleOpenModal = () => {
        this.props.dispatch({type: "MODAL_OPEN"});
    }
    
    handlePreview = () => {
        this.props.dispatch({type: "RENDER"});
    }
    
    handlePresent = () => {
        this.props.dispatch({type: "FULLSCREEN"});
    }
    
    handleClear = () => {
        this.props.dispatch({type: "LOAD", content: ""});
    }
    
    handleDark = () => {
        this.props.dispatch({type: "DARK"});
    }
    
    handlePrint = () => {
        this.props.dispatch({type: "RENDER"});
        setTimeout(() => window.print(), 250);
    }
    
    render() {
        const filename = this.props.filename || 'presentation';
        
        return (
            <div className={styles('toolbar')}>
                <Button 
                    icon="save"
                    title="Save/Open files"
                    onClick={this.handleOpenModal}
                />
                <Button 
                    icon="file-download"
                    title="Export/Download"
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
                <a
                    href="data:"
                    download={filename + ".md"}
                    ref={r => this.link = r}
                    className={styles('hidden')}
                />
            </div>
        )
    }
}

const map = (state: Store) => ({
    filename: state.currentFile,
    content: state.content,
})

export default connect(map)(Toolbar);
