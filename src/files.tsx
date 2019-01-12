
import * as React from 'react'
import styles from './styles';

type Props = {
    
}

type State = {
    
}

export class FileFolder extends React.Component<Props, State> {
    state: State = {}
    
    render() {
        return (
            <div className={styles('files-modal')}>
                <div className={styles('inner sticky')}>
                    <div className={styles('header')}>
                        Local Files
                    </div>
                    <div className={styles('scrolling')}>
                        {}
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                        abcd
                        <br/>
                    </div>
                    <div className={styles('stick')}>
                        <input 
                            type="text"
                            placeholder=""
                        />
                        <div className={styles('flex-nav')}>
                            <button className={styles('button')}>
                                Cancel
                            </button>
                            <button className={styles('button', 'pull')}>
                                Load
                            </button>
                            <button className={styles('button')}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileFolder;