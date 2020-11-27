import * as ActionTypes from './ActionTypes';
import { URL } from '../config';
import { AsyncStorage } from 'react-native';
export const fetchProfile = () => (dispatch) => {
    dispatch(profileLoading());
    AsyncStorage.getItem('userName').then(userName => {
        AsyncStorage.getItem('userToken').then(token => {
            const Listener = fetch(`${URL.url}` + `/user/${userName}`, {
                headers: {
                    'Authorization': 'Bearer ' + `${token}`,
                }
            })
                .then(response => {
                    if (response.ok) {
                        console.log(response)
                        return response;
                        
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then(response => response.json())
                .catch(error => dispatch(profileFailed(error.message)));
        })
    })
};

export const profileFailed = (errmess) => ({
    type: ActionTypes.PROFILE_FAILED,
    payload: errmess
});

export const profileLoading = () => ({
    type: ActionTypes.PROFILE_LOADING
});

export const fetchPosts = () => (dispatch) => {
    dispatch(postsLoading());
    return AsyncStorage.getItem('userName').then(userName => {
        AsyncStorage.getItem('userToken').then(token => {
            const Listener = fetch(`${URL.url}` + `/post`, {
                headers: {
                    'Authorization': 'Bearer ' + `${token}`,
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then(response => response.json())
                .then(posts => dispatch(addPosts(posts)))
                .catch(error => dispatch(postsFailed(error.message)));
        })
    })
};
export const postsLoading = () => ({
    type: ActionTypes.POSTS_LOADING
});

export const postsFailed = (errmess) => ({
    type: ActionTypes.POSTS_FAILED,
    payload: errmess
});

export const addPosts = (posts) => ({
    type: ActionTypes.ADD_POSTS,
    payload: posts
});