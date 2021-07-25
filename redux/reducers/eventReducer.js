import { ActionTypes } from "../constants/action-types";

const initialState = {
    events: null,
}
export const eventReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_EVENTDATA:
            return { ...state, events: payload };
        default:
            return state;
    }
}