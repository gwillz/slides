
import { createStore } from "redux";
import * as React from 'react'

export type State = {
    action: 'LOAD' | 'EDIT' | 'SAVE' | 'FULLSCREEN' | 'RENDER' | 'DARK' | null;
    content: string;
    dark: boolean;
}

export type Action = {
    type: 'EDIT';
    content: string;
} | {
    type: 'LOAD';
    content: string;
} | {
    type: 'SAVE';
} | {
    type: 'RENDER';
} | {
    type: 'FULLSCREEN';
} | {
    type: 'DARK';
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

const store = createStore(
    reducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;

export type Store = typeof store;
export const context = React.createContext(store);
export const {Provider, Consumer} = context;
