import { ActionTypes } from "../constants/action-types"

export const setUser = (user) => {
    return {
        type: ActionTypes.SET_USER,
        payload: user
    }
}

export const setUserToken = (usertoken) => {
    return {
        type: ActionTypes.SET_USERTOKEN,
        payload: usertoken,
    }
}

export const setUserId = (userid) => {
    return {
        type: ActionTypes.SET_USERID,
        payload: userid
    }
}

export const setUserFollowers = (followers) => {
    return {
        type: ActionTypes.USER_FOLLOWERS,
        payload: followers
    }
}
export const setUserFollowings = (following) => {
    return {
        type: ActionTypes.USER_FOLLOWING,
        payload: following
    }
} 