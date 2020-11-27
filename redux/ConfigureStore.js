import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { posts } from './posts';
import { profile } from './profile';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            posts,
            profile,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}