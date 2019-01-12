
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
    if (e.key == "s" && e.ctrlKey) {
        e.preventDefault();
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
    private view: HTMLElement | null;
    private editor: Editor | null;
    
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
        
        if (state.action == "FOCUS") {
            switch (state.focus) {
                case 'scroll-bottom':
                    this.view && this.view.scrollTo({top: this.view.scrollHeight});
                    break;
                    
                case 'scroll-top':
                    this.view && this.view.scrollTo({top: 0});
                    break;
                    
                case 'editor':
                    this.editor && this.editor.focus();
                    break;
            }
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
            <div ref={r => this.view = r}
                className={styles('editor')}>
                <Editor
                    ref={r => this.editor = r}
                    placeholder="Type markdown here."
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
