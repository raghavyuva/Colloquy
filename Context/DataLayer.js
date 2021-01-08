import React, {
    createContext,
    useReducer,
    useContext
} from 'react'

export const DataLayerContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
);
export const DataLayerValue = () => useContext(DataLayerContext);

export const initialState = {
    isLoading: true,
    userToken: null,
    UserId: null,
    postData: null,
    fullview: null,
    EventData: null,
    subscribeddata: null,
    ExploreData: null,
    followerslist:null,
    followinglist:null,
    notifylist:null,
    user:null,
    otherprofile:null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'RETRIEVE_TOKEN':
            return {
                ...state,
                userToken: action.token, 
                UserId:action.id,
                isLoading: false,
            };
        case 'LOGIN':
            return {
                ...state,
                userToken: action.token,
                UserId:action.id,
                isLoading: false,

            };
        case 'LOGOUT':
            return {
                ...state,
                userToken: null,
                UserId:null,
                isLoading: false,
            };
        case 'REGISTER':
            return {
                ...state,
                userToken: action.token,
                UserId:action.id,
                isLoading: false,
            };
        case 'POSTDATA':
            return {
                ...state,
                postData: action.postData,
                isLoading: false,
            }
        case 'FULLVIEW':
            return {
                ...state,
                fullview: action.data,
                isLoading: false
            }
        case 'EVENTS':
            return {
                ...state,
                EventData: action.eventdata,
                isLoading: false
            }
        case 'SUBSCRIPTION':
            return {
                ...state,
                subscribeddata: action.data,
                isLoading: false
            }
        case 'EXPLOREDATA':
            return {
                ...state,
                ExploreData: action.data,
                isLoading: false
            }
        case 'FOLLOWERSLIST':
            return{
                ...state,
                followerslist:action.data,
                isLoading:false
            }
        case 'FOLLOWINGLIST':
            return{
                ...state,
                followinglist:action.data,
                isLoading:false
            }
        case 'NOTIFYLIST':
            return{
                ...state,
                notifylist:action.data,
                isLoading:false,
                
            }
        case 'USERPROFILE':
            return{
                ...state,
                user: action.data,
                isLoading:false,
            }
        case 'PROFILEOFOTHER':
            return{
                ...state,
                otherprofile:action.data,
                isLoading:false
            }
    }
}
export default reducer;