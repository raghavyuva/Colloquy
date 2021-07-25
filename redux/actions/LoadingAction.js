import { ActionTypes } from "../constants/action-types"

export const setLoading = (data) => {
    return {
        type: ActionTypes.SET_LOADING,
        payload: data
    }
}
export const stopLoading = (data) => {
    return {
        type: ActionTypes.STOP_LOADING,
        payload: data
    }
}