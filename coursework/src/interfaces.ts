import { Action } from 'redux';

export interface AppState {
    currentModelId: number;
    a: number;
    m: number;
    V: number;
    N: number;
    y: number;
    selectedValue: number;
}

export interface AppAction extends Action {
    payload: any;
}