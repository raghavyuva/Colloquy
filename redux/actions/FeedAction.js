import { ActionTypes } from "../constants/action-types"

export const setFeeds = (feeds)=>{
    return{
        type:ActionTypes.SET_FEEDS,
        payload:feeds
    }
}

export const selectedFeed = (feed)=>{
    return{
        type:ActionTypes.SELECTED_FEEDS,
        payload:feed
    }
}

