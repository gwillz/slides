
import * as React from 'react';
import styles from './styles';
import { EditorState, Editor } from 'draft-js';

type Props = {}

type State = {
    draft: EditorState;
}


export class EditorView extends React.Component<Props, State> {
    
    private timer: number;
    
    constructor(props: Props) {
        super(props);
        this.state = {
            draft: EditorState.createEmpty(),
        }
    }
    
    private onChange = (draft: EditorState) => {
        this.setState({ draft });
        const content = draft.getCurrentContent();
        
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            const text = content.getPlainText('');
            console.log(text);
        }, 350);
    }
    
    render() {
        return (
            <div className={styles('editor')}>
                <Editor
                    placeholder="Thnx!"
                    editorState={this.state.draft}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}
