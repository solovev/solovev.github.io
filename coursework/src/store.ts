import { createStore } from "redux";
import { reducer } from './reducer';

import { AppState } from './interfaces';

export const store = createStore(reducer);