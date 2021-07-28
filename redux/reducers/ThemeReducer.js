import { ActionTypes } from "../constants/action-types";

const initialState = {
    dark: false,
    name: null,
    currentTheme: null,
    active: false
}
export const themeReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_THEME:
            return { ...state, dark: payload };
        case ActionTypes.CHANGE_THEME:
            return { ...state, name: payload };
        case ActionTypes.CURRENT_THEME:
            return { ...state, currentTheme: payload };
        case ActionTypes.SET_MODAL_FOR_THEME:
            return { ...state, active: payload }
        default:
            return state;
    }
}