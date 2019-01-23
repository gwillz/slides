
import { createStore } from 'redux';
import {persistStore, persistReducer, PersistConfig, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export type State = {
    // the last action.type dispatched
    action: ActionTypes;
    // current editor content (note: delayed by 200ms)
    content: string;
    // current file name, empty if new file
    currentFile: string | null;
    // dark mode toggle
    dark: boolean;
    // which modal is open
    modal: ModalTypes;
    // 'local' file store (filename -> content)
    files: {[k: string]: string};
}

export type Action = {
    // editor content updates
    type: 'EDIT';
    content: string;
} | {
    // file loading from ?url= or upload
    type: 'LOAD';
    filename?: string;
    content: string;
} | {
    // file loading from local
    type: 'OPEN';
    filename: string;
} | {
    // save current content to local
    type: 'SAVE';
    filename: string;
} | {
    // delete from local
    type: 'DELETE';
    filename: string;
} | {
    // open a modal
    type: 'MODAL_OPEN';
    modal: ModalTypes;
} | {
    // everything else
    type: 'MODAL_CLOSE' | 'RENDER' | 'FULLSCREEN' | 'DARK' | 'ACK';
}

export type ModalTypes = 'files' | 'help' | null;

export type ActionTypes = Action['type'] | typeof REHYDRATE | null;

const config: PersistConfig = {
    key: 'root',
    storage,
    // don't store these
    // - don't re-open modals on load
    // - don't open last content/filename
    // - 'action' can cause problems
    blacklist: ['action', 'modal', 'content', 'currentFile'],
}

const INIT_STATE: State = {
    action: null,
    content: '',
    currentFile: null,
    dark: false,
    modal: null,
    files: {},
}

function reducer(state = INIT_STATE, action: Action) {
    switch (action.type) {
        // load into editor, but also store in local
        // close any open modals
        case "LOAD":
            return {
                ...state,
                action: action.type,
                currentFile: action.filename || null,
                content: action.content,
                files: action.filename ? {
                    ...state.files,
                    [action.filename]: action.content,
                } : state.files,
                modal: null,
            }
        // toggle dark mode
        case "DARK":
            return {
                ...state,
                dark: !state.dark,
            }
        // fetch content from local
        // close any open modals
        case "OPEN":
            return {
                ...state,
                action: action.type,
                currentFile: action.filename,
                content: state.files[action.filename] || '',
                modal: null,
            }
        // save current content to local, with a filename
        // close any open modals
        case "SAVE":
            return {
                ...state,
                files: {
                    ...state.files,
                    [action.filename]: state.content,
                },
                currentFile: action.filename,
                modal: null,
            }
        // update content
        // update file in local store if present
        case "EDIT":
            return {
                ...state,
                content: action.content,
                files: state.currentFile ? {
                    ...state.files,
                    [state.currentFile]: action.content
                } : state.files,
            }
        // delete this file
        case "DELETE":
            delete state.files[action.filename];
            return {
                ...state,
                // EDIT actions will re-save unless were clear this
                currentFile: action.filename === state.currentFile
                    ? null
                    : state.currentFile,
                // this creates a copy of 'files'
                files: {...state.files},
            }
        // open a modal dialog
        case "MODAL_OPEN":
            return {
                ...state,
                modal: action.modal,
        }
        // close any open modals
        case "MODAL_CLOSE":
            return {
                ...state,
                modal: null,
            }
    }
    // everything else, just store the action
    return {
        ...state,
        action: action.type,
    }
}

export const store = createStore(
    persistReducer<State, Action>(config, reducer),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
