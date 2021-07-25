import { ActionTypes } from "../constants/action-types";

const initialState = {
    feeds: [],
    subscribedfeeds: []
}
export const feedReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_FEEDS:
            return { ...state, feeds: payload };
        case ActionTypes.SET_SUBSCRIBED_FEED:
            return { ...state, subscribedfeeds: payload };
        default:
            return state;
    }
}