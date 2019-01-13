
import { createStore } from 'redux';
import {persistStore, persistReducer, PersistConfig, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import files from './files';

export type ActionTypes = 'ACK' | 'LOAD' | 'EDIT' | 'OPEN' | 'FULLSCREEN' | 'RENDER' | 'DARK' | typeof REHYDRATE | null;
export type ModalTypes = 'files' | 'help' | null;

type State = {
    action: ActionTypes;
    content: string;
    dark: boolean;
    modal: ModalTypes;
    currentFile?: string;
    files: {[k: string]: string};
}

type Action = {
    type: 'EDIT';
    content: string;
} | {
    type: 'LOAD';
    filename?: string;
    content: string;
} | {
    type: 'OPEN';
    filename: string;
} | {
    type: 'SAVE';
    filename: string;
} | {
    type: 'DELETE';
    filename: string;
} | {
    type: 'MODAL_OPEN';
    modal: ModalTypes;
} | {
    type: 'MODAL_CLOSE' | 'RENDER' | 'FULLSCREEN' | 'DARK' | 'ACK';
}

const config: PersistConfig = {
    key: 'root',
    storage,
    blacklist: ['action', 'modal', 'content', 'currentFile'],
}

const INIT_STATE: State = {
    action: null,
    content: '',
    dark: false,
    modal: null,
    files: {},
}

function reducer(state = INIT_STATE, action: Action) {
    switch (action.type) {
        case "LOAD":
            return {
                ...state,
                action: action.type,
                currentFile: action.filename,
                content: action.content,
                files: action.filename ? {
                    ...state.files,
                    [action.filename]: action.content,
                } : state.files,
                modalOpen: false,
            }
        case "DARK":
            return {
                ...state,
                action: action.type,
                dark: !state.dark,
            }
        case "OPEN":
            return {
                ...state,
                action: action.type,
                currentFile: action.filename,
                content: state.files[action.filename] || '',
                modal: null,
            }
        case "SAVE":
            if (!action.filename) return state;
            return {
                ...state,
                files: {
                    ...state.files,
                    [action.filename]: state.content,
                },
                currentFile: action.filename,
                modal: null,
            }
        case "EDIT":
            return {
                ...state,
                content: action.content,
                files: state.currentFile ? {
                    ...state.files,
                    [state.currentFile]: action.content
                } : state.files,
            }
        case "DELETE":
            delete state.files[action.filename];
            return {
                ...state,
                currentFile: undefined,
                files: {...state.files},
            }
        case "MODAL_OPEN":
            return {
                ...state,
                modal: action.modal,
            }
        case "MODAL_CLOSE":
            return {
                ...state,
                modal: null,
            }
    }
    return {
        ...state,
        action: action.type,
    }
}

export const store = createStore(
    persistReducer(config, reducer),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

export type Store = State;