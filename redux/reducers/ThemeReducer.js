import { ActionTypes } from "../constants/action-types";

const initialState = {
    dark: false,
    name: null,
    currentTheme: null,
}
export const themeReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_THEME:
            return { ...state, dark: payload };
        case ActionTypes.CHANGE_THEME:
            return { ...state, name: payload };
        case ActionTypes.CURRENT_THEME:
            return { ...state, currentTheme: payload }
        default:
            return state;
    }
}