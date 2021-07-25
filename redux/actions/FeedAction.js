import { ActionTypes } from "../constants/action-types"

export const setFeeds = (feeds) => {
    return {
        type: ActionTypes.SET_FEEDS,
        payload: feeds
    }
}

export const selectedFeed = (feed) => {
    return {
        type: ActionTypes.SELECTED_FEEDS,
        payload: feed
    }
}

export const removeFeed = (feed) => {
    return {
        type: ActionTypes.REMOVE_SELECTED_FEED,
        payload: feed
    }
}

export const setSubscribedFeeds = (feed) => {
    return {
        type: ActionTypes.SET_SUBSCRIBED_FEED,
        payload: feed
    }
}