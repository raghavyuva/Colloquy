import { ActionTypes } from "../constants/action-types";

const initialState = {
    feeds: [],
    subscribedfeeds: [],
    search: false,
}
export const feedReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_FEEDS:
            return { ...state, feeds: payload };
        case ActionTypes.SET_SUBSCRIBED_FEED:
            return { ...state, subscribedfeeds: payload };
        case ActionTypes.SET_HOME_SEARCH:
            return { ...state, search: payload };
        default:
            return state;
    }
}