
import { createStore } from "redux";
import * as React from 'react'

export type State = {
    action: 'LOAD' | 'EDIT' | 'SAVE' | 'FULLSCREEN' | 'RENDER' | null;
    content: string;
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
}

const INIT_STATE: State = {
    action: null,
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
    }
    return {
        ...state,
        action: action.type,
    }
}

const store = createStore(reducer);
export default store;

export type Store = typeof store;
export const context = React.createContext(store);
export const {Provider, Consumer} = context;
