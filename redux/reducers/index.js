import { combineReducers } from 'redux';
import { feedReducer } from './feedReducer';

export const reducers = combineReducers({
    allfeeds: feedReducer,
})
