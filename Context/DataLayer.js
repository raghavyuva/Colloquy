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
    followerslist: null,
    followinglist: null,
    notifylist: null,
    user: null,
    otherprofile: null,
    defdarktheme: true,
    searchactive: false,
    routename: null,
    chattee: null,
    allusers: null,
    isOnline: null,
    chatteeOnline: null,
    refreshhome: false,
    permstorage: null
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'THEME':
            return {
                ...state,
                defdarktheme: action.data
            };
        case 'RETRIEVE_TOKEN':
            return {
                ...state,
                userToken: action.token,
                UserId: action.id,
                isLoading: false,

            };
        case 'LOGIN':
            return {
                ...state,
                userToken: action.token,
                UserId: action.id,
                isLoading: false,

            };
        case 'LOGOUT':
            return {
                ...state,
                userToken: null,
                UserId: null,
                isLoading: false,
            };
        case 'REGISTER':
            return {
                ...state,
                userToken: action.token,
                UserId: action.id,
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
            return {
                ...state,
                followerslist: action.data,
                isLoading: false
            }
        case 'FOLLOWINGLIST':
            return {
                ...state,
                followinglist: action.data,
                isLoading: false
            }
        case 'NOTIFYLIST':
            return {
                ...state,
                notifylist: action.data,
                isLoading: false,

            }
        case 'USERPROFILE':
            return {
                ...state,
                user: action.data,
                isLoading: false,
            }
        case 'PROFILEOFOTHER':
            return {
                ...state,
                otherprofile: action.data,
                isLoading: false
            }

        case 'SEARCHCOMPONENT':
            return {
                ...state,
                searchactive: action.data
            }
        case 'ROUTEPROP':
            return {
                ...state,
                routename: action.data
            }
        case 'CHATTINGUSER':
            return {
                ...state,
                chattee: action.data,
            }
        case 'RETRIEVEALLUSERS':
            return {
                ...state,
                allusers: action.data
            }
        case 'ONLINESTATUS':
            return {
                ...state,
                isOnline: action.data
            }
        case 'CHATTEEONLINE':
            return {
                ...state,
                chatteeOnline: action.isonline
            }
        case 'REFRESH':
            return {
                ...state,
                refreshhome: action.data
            }
        case 'STORAGEPERMISSION':
            return {
                ...state,
                permstorage: action.data
            }
    }
}
export default reducer;