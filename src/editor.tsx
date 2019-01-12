
import * as React from 'react';
import { EditorState, Editor, ContentState, getDefaultKeyBinding, Modifier } from 'draft-js';
import styles from './styles';
import { connect, DispatchProp } from 'react-redux';
import { Store, ActionTypes } from './store';

const TAB = "    ";

function keyBinding(e: React.KeyboardEvent): string | null {
    if (e.key == "Enter" && e.ctrlKey) {
        return 'editor-render';
    }
    if (e.key == "s" && e.ctrlKey) {
        e.preventDefault();
        return 'editor-save';
    }
    if (e.key == "o" && e.ctrlKey) {
        e.preventDefault();
        return 'editor-load';
    }
    return getDefaultKeyBinding(e);
}

type Props = DispatchProp & {
    action: ActionTypes;
    content: string;
}

type State = {
    draft: EditorState;
    content: string;
}

export class EditorView extends React.PureComponent<Props, State> {
    
    private timer: number;
    private view: HTMLElement | null;
    private editor: Editor | null;
    
    state: State = {
        draft: EditorState.createEmpty(),
        content: '',
    }
    
    static getDerivedStateFromProps(props: Props, state: State) {
        switch (props.action) {
            case 'LOAD':
            case 'OPEN':
            case 'persist/REHYDRATE':
                return {
                    content: props.content,
                    draft: EditorState.push(state.draft,
                        ContentState.createFromText(props.content), 
                        "insert-characters"),
                }
        }
        return null;
    }
    
    private handleKey = (event: KeyboardEvent) => {
        if (!event.ctrlKey) return;
        switch (event.key) {
            case "1":
                this.editor && this.editor.focus();
                break;
                
            case "Home":
                this.view && this.view.scrollTo({top: 0});
                break;
                
            case "End":
                this.view && this.view.scrollTo({top: this.view.scrollHeight});
                break;
        }
    }
    
    private handleChange = (draft: EditorState) => {
        const content = draft.getCurrentContent().getPlainText('');
        
        if (content !== this.state.content) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.props.dispatch({ type: 'EDIT', content });
            }, 350);
        }
        
        this.setState({ 
            draft,
            content,
        });
    }
    
    private handleCommand = (command: string) => {
        switch (command) {
            case 'editor-render':
            case 'editor-save':
            case 'editor-open':
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
        window.addEventListener("keyup", this.handleKey);
    }
    
    componentWillUnmount() {
        window.addEventListener("keyup", this.handleKey);
    }
    
    render() {
        return (
            <div ref={r => this.view = r}
                className={styles('editor scrolling')}>
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

const map = (store: Store) => ({
    action: store.action,
    content: store.content,
})

export default connect(map)(EditorView);
