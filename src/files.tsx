
import * as React from 'react'
import styles from './styles';
import { connect, DispatchProp } from 'react-redux';
import { Store } from './store';
import { string } from 'prop-types';

type Props = DispatchProp & {
    isOpen: boolean;
    filename: string;
    fileslist: string[];
}

type State = {
    filename: string;
}

export class FileFolder extends React.Component<Props, State> {
    state: State = {
        filename: '',
    }
    
    private file: HTMLInputElement | null;
    
    handleClose = () => {
        this.props.dispatch({ type: "MODAL_CLOSE" });
    }
    
    handleLoad = () => {
        this.props.dispatch({
            type: "OPEN",
            filename: this.state.filename,
        });
        this.setState({ filename: '' });
    }
    
    handleSave = () => {
        this.props.dispatch({
            type: 'SAVE',
            filename: this.state.filename,
        });
        this.setState({ filename: '' });
    }
    
    handleDelete = () => {
        this.props.dispatch({
            type: "DELETE",
            filename: this.state.filename,
        })
        this.setState({ filename: '' });
    }
    
    handleImport = () => {
        if (!this.file) return;
        this.file.click();
    }
    
    handleSelect(filename: string) {
        return () => this.setState({ filename });
    }
    
    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // if (event.key === "Enter") {
        //     this.handleSave();
        //     return;
        // }
        this.setState({
            filename: event.currentTarget.value,
         });
    }
    
    handleFileLoad = () => {
        if (!this.file || !this.file.files) return;
        
        const file = this.file.files[0];
        const reader = new FileReader();
        
        reader.onload = () => {
            this.props.dispatch({
                type: "LOAD",
                content: reader.result + "",
                filename: file.name.replace(/(\.\w+)$/, ''),
            })
        }
        reader.readAsText(file);
    }
    
    handleKeys = (event: KeyboardEvent) => {
        if (this.props.isOpen && event.key === "Escape") {
            this.props.dispatch({ type: "MODAL_CLOSE" });
        }
    }
    
    componentDidMount() {
        window.addEventListener('keyup', this.handleKeys);
        if (this.file)
            this.file.addEventListener('change', this.handleFileLoad);
    }
    
    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeys);
        if (this.file)
            this.file.removeEventListener('change', this.handleFileLoad);
    }
    
    render() {
        return (
            <div className={styles({
                'file-modal': true,
                'active': this.props.isOpen,
            })}>
                <div className={styles('inner')}>
                    <div className={styles('header')}>
                        Local Files
                    </div>
                    <div className={styles('file-list', 'scrolling')}>
                        {this.props.fileslist.map(filename => (
                            <div
                                key={filename}
                                className={styles('file-select')}
                                onClick={this.handleSelect(filename)}>
                                {filename}
                            </div>
                        ))}
                    </div>
                    <div>
                        <input 
                            type="text"
                            placeholder="Filename..."
                            value={this.state.filename}
                            onChange={this.handleInput}
                        />
                        <div className={styles('flex-nav')}>
                            <button
                                onClick={this.handleClose}
                                className={styles('button')}>
                                Close
                            </button>
                            <button
                                onClick={this.handleImport}
                                className={styles('button')}>
                                Upload
                            </button>
                            <button
                                onClick={this.handleDelete}
                                disabled={!this.state.filename}
                                className={styles('button', 'pull')}>
                                Delete
                            </button>
                            <button
                                onClick={this.handleLoad}
                                disabled={!this.state.filename}
                                className={styles('button')}>
                                Open
                            </button>
                            <button
                                onClick={this.handleSave}
                                disabled={!this.state.filename}
                                className={styles('button')}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <input
                    type="file"
                    ref={r => this.file = r}
                    className={styles('hidden')}
                />
            </div>
        )
    }
}

const map = (state: Store) => ({
    isOpen: state.modalOpen,
    filename: state.currentFile,
    fileslist: Object.keys(state.files),
})

export default connect(map)(FileFolder);
