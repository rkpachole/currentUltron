import { userConstants } from "../constants";

const initialState =  { loading: null, usersList: null, } || {};

export function users(state = initialState, action) {
    switch (action.type) {
    case userConstants.GETALLUSERS_REQUEST:
        return {
            loading: true
        };
    case userConstants.GETALLUSERS_SUCCESS:
        return {
            loading: false,
            usersList: action.usersList.data,
            activePage: action.usersList.page,
            totalItemsCount: action.usersList.total_count,
            limit: action.usersList.page_count
        };
    case userConstants.GETALLUSERS_FAILURE:
        return { 
            error: action.error
        };
    case userConstants.USERADD_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.USERADD_SUCCESS:
        return {
            loading: false,
            usersList: state.usersList,
            addModal: false,
            refreshList: true
        };
    case userConstants.USERADD_FAILURE:
        return { 
            error: action.error,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.USEREDIT_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.USEREDIT_SUCCESS:
        return {
            loading: false,
            usersList: state.usersList,
            user: action.user,
            editModal: true,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.USEREDIT_FAILURE:
        return { 
            error: action.error,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.USERUPDATE_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            user: state.user,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.USERUPDATE_SUCCESS:
       
        return {
            loading: false,
            usersList: state.usersList,
            successMsg:action.userInfo,
            editModal:false,
            refreshList:true,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.USERUPDATE_FAILURE:
        return { 
            error: action.error,
            usersList: state.usersList,
            user: state.user,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };

    case userConstants.RESETPASSWORD_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            user: state.user,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.RESETPASSWORD_SUCCESS:
        console.log("actionss",action.passInfo);
        return {
            loading: false,
            successMsg:action.passInfo,
            usersList: state.usersList, 
            resetModal:false,
            refreshList:true,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit,
        };
    case userConstants.RESETPASSWORD_FAILURE:
        return { 
            error: action.error,
            usersList: state.usersList,
            user: state.user,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
            ...state,
            usersList: state.usersList.map(user =>
                user._id === action.id
                    ? { ...user, deleting: true }
                    : user
            )
        };
    case userConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
            deleteModal:false,
            refreshList:true
        };
    case userConstants.DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
            ...state,
            usersList: state.usersList.map(user => {
                if (user._id === action.id) {
                    // make copy of user without 'deleting:true' property
                    // const { deleting, ...userCopy } = user;
                    const { ...userCopy } = user;
                    // return copy of user with 'deleteError:[error]' property
                    return { ...userCopy, deleteError: action.error };
                }

                return user;
            })
        };
    case userConstants.GETALLUSERS_REPORTING_LIST_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.GETALLUSERS_REPORTING_LIST_SUCCESS:
        return {
            loading: false,
            UserListForReporting: action.UserListForReporting.data,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.GETALLUSERS_REPORTING_LIST_FAILURE:
        return { 
            error: action.error
        };
    case userConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_SUCCESS:
        return {
            loading: false,
            ReportingList:action.ReportingList.data,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case userConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_FAILURE:
        return { 
            error: action.error
        };

    default:
        return state;
    }
}