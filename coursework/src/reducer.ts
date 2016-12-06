import { Action } from 'redux';

import { AppState, AppAction } from './interfaces';
import { SET_CURRENT_MODEL, SET_Y, SET_M, SET_A, SET_V, SET_N, SET_SELECTED_VALUE } from './actions';

const initialState: AppState = {
    currentModelId: 4, a: 0.3, m: 20, V: 10, N: 50, y: 1, selectedValue: -1
};

export function reducer(state: AppState = initialState, action: AppAction): AppState {
    switch (action.type) {
        case SET_CURRENT_MODEL:
            return Object.assign({}, initialState, { currentModelId: action.payload });
        case SET_Y:
            return Object.assign({}, state, { y: action.payload });
        case SET_M:
            return Object.assign({}, state, { m: action.payload });
        case SET_A:
            return Object.assign({}, state, { a: action.payload });
        case SET_N:
            return Object.assign({}, state, { N: action.payload });
        case SET_V:
            return Object.assign({}, state, { V: action.payload });
        case SET_SELECTED_VALUE:
            return Object.assign({}, state, { selectedValue: action.payload });
        default:
            return state;
    }
}