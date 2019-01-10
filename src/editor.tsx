
import * as React from 'react';
import { Unsubscribe } from 'redux';
import { EditorState, Editor, ContentState, getDefaultKeyBinding, Modifier } from 'draft-js';
import styles from './styles';
import store from './store';

const TAB = "    ";

function keyBinding(e: React.KeyboardEvent): string | null {
    if (e.key == "Enter" && e.ctrlKey) {
        return 'editor-render';
    }
    if (e.key == "S" && e.ctrlKey) {
        return 'editor-save';
    }
    return getDefaultKeyBinding(e);
}

type State = {
    draft: EditorState;
}

export class EditorView extends React.PureComponent<{}, State> {
    
    private unsubscribe: Unsubscribe;
    private timer: number;
    
    state: State = {
        draft: EditorState.createEmpty(),
    }
    
    // @todo I hate this. Why is state management such a bitch?
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
    
    private handleCommand = (command: string) => {
        switch (command) {
            case 'editor-render':
            case 'editor-save':
                return 'handled';
            default:
                return 'not-handled';
        }
    }
    
    public insertTab = (e?: React.KeyboardEvent<{}>) => {
        if (e) {
            e.preventDefault();
            if (e.ctrlKey || e.shiftKey || e.altKey) return;
        }
        this.setState(({draft}) => ({
            draft: EditorState.push(
                draft,
                Modifier.insertText(
                    draft.getCurrentContent(), 
                    draft.getSelection(), 
                    TAB),
                "insert-characters"),
        }));
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
                    onTab={this.insertTab}
                    keyBindingFn={keyBinding}
                    handleKeyCommand={this.handleCommand}
                />
            </div>
        )
    }
}
