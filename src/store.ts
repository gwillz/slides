
import * as React from 'react'
import { createStore } from 'redux';
import {persistStore, persistReducer, PersistConfig, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export type ActionTypes = 'LOAD' | 'OPEN' | 'SAVE' | 'EDIT' | 'FULLSCREEN' | 'RENDER' | 'DARK' | typeof REHYDRATE | null;

type State = {
    action: ActionTypes;
    content: string;
    dark: boolean;
    
}

type Action = {
    type: 'EDIT';
    content: string;
} | {
    type: 'LOAD';
    content: string;
} | {
    type: 'OPEN' | 'SAVE' | 'RENDER' | 'FULLSCREEN' | 'DARK';
}

const config: PersistConfig = {
    key: 'root',
    storage,
}

const INIT_STATE: State = {
    action: null,
    content: '',
    dark: false,
}

function reducer(state = INIT_STATE, action: Action) {
    switch (action.type) {
        case "EDIT":
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