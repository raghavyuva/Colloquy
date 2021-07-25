import { ActionTypes } from "../constants/action-types"

export const setNotifications = (data) => {
    return {
        type: ActionTypes.SET_NOTIFICATIONS,
        payload: data,
    }
}

