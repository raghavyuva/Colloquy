import { ActionTypes } from "../constants/action-types";

const initialState = {
    user: [],
    userToken: null,
    userId: null,
    notificationlist: [],
    followers: [],
    following: [],
    otheruser: null,
    Allusers: null,
}
export const userReducer = (state = initialState, { type, payload }) => {
    console.log(type);
    switch (type) {
        case ActionTypes.SET_USER:
            return { ...state, user: payload };
        case ActionTypes.SET_USERTOKEN:
            return { ...state, userToken: payload };
        case ActionTypes.SET_USERID:
            return { ...state, userId: payload };
        case ActionTypes.SET_NOTIFICATIONS:
            return { ...state, notificationlist: payload };
        case ActionTypes.USER_FOLLOWERS:
            return { ...state, followers: payload };
        case ActionTypes.USER_FOLLOWING:
            return { ...state, following: payload };
        case ActionTypes.SET_OTHER_USER:
            return { ...state, otheruser: payload };
        case ActionTypes.SET_ALL_USERS_LIST:
            return { ...state, Allusers: payload }
        default:
            return state;
    }
}