import { ActionTypes } from "../constants/action-types"

export const setEvents = (data) => {
    return {
        type: ActionTypes.SET_EVENTDATA,
        payload: data
    }
}

