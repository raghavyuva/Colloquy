import { ActionTypes } from "../constants/action-types";

const initialState = {
    loading: null,
}
export const loadingReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_LOADING:
            return { ...state, loading: payload };
        case ActionTypes.STOP_LOADING:
            return { ...state, loading: payload };
        default:
            return state;
    }
}