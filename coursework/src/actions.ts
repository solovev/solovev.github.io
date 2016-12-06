import { AppState, AppAction } from './interfaces';

export const SET_CURRENT_MODEL = 'SET_CURRENT_MODEL';
export const SET_Y = 'SET_Y';
export const SET_M = 'SET_M';
export const SET_A = 'SET_A';
export const SET_V = 'SET_V';
export const SET_N = 'SET_N';
export const SET_SELECTED_VALUE = 'SET_SELECTED_VALUE';

export function setCurrentModelAction(id: number): AppAction {
    return {
        type: SET_CURRENT_MODEL,
        payload: id
    };
}

export function setY(value: number): AppAction {
    return {
        type: SET_Y,
        payload: value
    };
}

export function setM(value: number): AppAction {
    return {
        type: SET_M,
        payload: value
    };
}

export function setA(value: number): AppAction {
    return {
        type: SET_A,
        payload: value
    };
}

export function setV(value: number): AppAction {
    return {
        type: SET_V,
        payload: value
    };
}

export function setN(value: number): AppAction {
    return {
        type: SET_N,
        payload: value
    };
}

export function setSelectedValue(value: number): AppAction {
    return {
        type: SET_SELECTED_VALUE,
        payload: value
    };
}