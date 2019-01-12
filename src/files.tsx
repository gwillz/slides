
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
    
    handleClose = () => {
        this.props.dispatch({ type: "MODAL_CLOSE" });
    }
    
    handleLoad = () => {
        this.props.dispatch({
            type: "OPEN",
            filename: this.state.filename,
        });
    }
    
    handleSave = () => {
        this.props.dispatch({
            type: 'SAVE',
            filename: this.state.filename,
        });
        this.setState({
            filename: '',
        })
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
    
    handleKeys = (event: KeyboardEvent) => {
        if (this.props.isOpen && event.key === "Escape") {
            this.props.dispatch({ type: "MODAL_CLOSE" });
        }
    }
    
    componentDidMount() {
        window.addEventListener('keyup', this.handleKeys);
    }
    
    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeys);
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
                                onClick={this.handleLoad}
                                className={styles('button', 'pull')}>
                                Load
                            </button>
                            <button
                                onClick={this.handleSave}
                                className={styles('button')}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
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
