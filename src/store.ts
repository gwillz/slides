
import { createStore } from "redux";
import * as React from 'react'

export type State = {
    action: 'LOAD' | 'EDIT' | 'SAVE' | 'FULLSCREEN' | 'RENDER' | 'DARK' | 'FOCUS' | null;
    focus: 'editor' | 'preview' | 'scroll-bottom' | 'scroll-top' | null;
    dark: boolean;
    content: string;
}

export type Action = {
    type: 'EDIT';
    content: string;
} | {
    type: 'LOAD';
    content: string;
} | {
    type: 'SAVE' | 'RENDER' | 'FULLSCREEN' | 'DARK';
} | {
    type: 'FOCUS';
    target: 'editor' | 'preview' | 'scroll-bottom' | 'scroll-top';
}

const INIT_STATE: State = {
    action: null,
    focus: null,
    dark: false,
    content: '',
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
        case 'FOCUS': {
            return {
                ...state,
                action: action.type,
                focus: action.target,
            }
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
