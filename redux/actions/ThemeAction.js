import { ActionTypes } from "../constants/action-types"

export const setTheme = (data) => {
    return {
        type: ActionTypes.SET_THEME,
        payload: data
    }
}

export const changeTheme = (data) => {
    return {
        type: ActionTypes.CHANGE_THEME,
        payload: data
    }
}

export const setCurrentTheme = (data) => {
    return {
        type: ActionTypes.CURRENT_THEME,
        payload: data
    }
}

export const setModalForTHeme = (data) => {
    return {
        type: ActionTypes.SET_MODAL_FOR_THEME,
        payload: data
    }
}