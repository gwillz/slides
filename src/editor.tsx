
import * as React from 'react';
import { Unsubscribe } from 'redux';
import { EditorState, Editor, Modifier, SelectionState, ContentState } from 'draft-js';
import styles from './styles';
import store, {State as StoreState} from './store';

type State = {
    draft: EditorState;
}


export class EditorView extends React.Component<{}, State> {
    
    private unsubscribe: Unsubscribe;
    private timer: number;
    
    state: State = {
        draft: EditorState.createEmpty(),
    }
    
    private handleStore = () => {
        const state = store.getState();
        if (state.action == "LOAD") {
            this.setState(({draft}) => ({
                draft: EditorState.push(draft,
                    ContentState.createFromText(state.content), 
                    "insert-characters"),
            }))
        }
    }
    
    private handleChange = (draft: EditorState) => {
        this.setState({ draft });
        
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            const content = draft.getCurrentContent().getPlainText('');
            store.dispatch({ type: 'EDIT', content });
        }, 350);
    }
    
    componentDidMount() {
        this.unsubscribe = store.subscribe(this.handleStore);
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }
    
    render() {
        return (
            <div className={styles('editor')}>
                <Editor
                    placeholder="Thnx!"
                    editorState={this.state.draft}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}
