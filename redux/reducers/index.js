import { combineReducers } from 'redux';
import { eventReducer } from './eventReducer';
import { feedReducer, } from './feedReducer';
import { loadingReducer } from './loadingReducer';
import { themeReducer } from './ThemeReducer';
import { userReducer } from './userReducer'
export const reducers = combineReducers({
    allfeeds: feedReducer,
    userDetails: userReducer,
    loadingDetails: loadingReducer,
    theme: themeReducer,
    EventData: eventReducer
})
