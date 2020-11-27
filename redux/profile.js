import * as ActionTypes from './ActionTypes';

export const profile = (state = {
    isLoading: true,
    errMess: null,
    profile: []
}, action) => {
    switch (action.type) {
        case ActionTypes.PROFILE_LOADING:
            return { ...state, isLoading: true, errMess: null, profile: [] }

        case ActionTypes.PROFILE_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};