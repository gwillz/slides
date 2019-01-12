
import { createStore } from 'redux';
import {persistStore, persistReducer, PersistConfig, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export type ActionTypes = 'LOAD' | 'EDIT' | 'OPEN' | 'FULLSCREEN' | 'RENDER' | 'DARK' | typeof REHYDRATE | null;

type State = {
    action: ActionTypes;
    content: string;
    dark: boolean;
    modalOpen: boolean;
    currentFile?: string;
    files: {[k: string]: string};
}

type Action = {
    type: 'EDIT';
    content: string;
} | {
    type: 'LOAD';
    content: string;
} | {
    type: 'OPEN';
    filename: string;
    content: string;
} | {
    type: 'SAVE';
    filename: string;
} | {
    type: 'DELETE';
    filename: string;
} | {
    type: 'MODAL_OPEN' | 'MODAL_CLOSE';
} | {
    type: 'RENDER' | 'FULLSCREEN' | 'DARK';
}

const config: PersistConfig = {
    key: 'root',
    storage,
    blacklist: ['action', 'modalOpen', 'content', 'currentFile'],
}

const INIT_STATE: State = {
    action: null,
    content: '',
    dark: false,
    modalOpen: false,
    files: {},
}

function reducer(state = INIT_STATE, action: Action) {
    switch (action.type) {
        case "LOAD":
            return {
                ...state,
                action: action.type,
                content: action.content,
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
                filename: action.filename,
                content: state.files[action.filename] || '',
                modalOpen: false,
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
                modalOpen: false,
            }
        case "EDIT":
            if (!state.currentFile) return {
                ...state,
                content: action.content,
            }
            // else
            return {
                ...state,
                content: action.content,
                files: {
                    ...state.files,
                    [state.currentFile]: action.content,
                }
            }
        case "DELETE":
            delete state.files[action.filename];
            return state;
        
        case "MODAL_OPEN":
            return {
                ...state,
                modalOpen: true,
            }
        case "MODAL_CLOSE":
            return {
                ...state,
                modalOpen: false,
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