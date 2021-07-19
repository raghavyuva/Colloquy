import { ActionTypes } from "../constants/action-types";

const initialState = {
    feeds: []
}
export const feedReducer = (state=initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_FEEDS:
            return state;
        default:
            return state;
    }
}