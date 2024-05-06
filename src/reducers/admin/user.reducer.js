import { adminUserConstants } from "../../constants";

const initialState =  { loading: null, usersList: null, } || {};

export function adminUsers(state = initialState, action) {
    switch (action.type) {
    case adminUserConstants.GETALLUSERS_REQUEST:
        return {
            loading: true
        };
    case adminUserConstants.GETALLUSERS_SUCCESS:
        return {
            loading: false,
            usersList: action.usersList.data,
            activePage: action.usersList.page,
            totalItemsCount: action.usersList.total_count,
            limit: action.usersList.page_count
        };
    case adminUserConstants.GETALLUSERS_FAILURE:
        return { 
            error: action.error
        };
    case adminUserConstants.USERADD_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.USERADD_SUCCESS:
        return {
            loading: false,
            usersList: state.usersList,
            addModal: false,
            refreshList: true
        };
    case adminUserConstants.USERADD_FAILURE:
        return { 
            error: action.error,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.USEREDIT_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.USEREDIT_SUCCESS:
        return {
            loading: false,
            usersList: state.usersList,
            user: action.user,
            editModal: true,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.USEREDIT_FAILURE:
        return { 
            error: action.error,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.USERUPDATE_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            user: state.user,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.USERUPDATE_SUCCESS:
        // console.log("action",action.userInfo.message);
        return {
            loading: false,
            usersList: state.usersList,
            ScsMsg:action.userInfo.message,
            refreshList:true,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.USERUPDATE_FAILURE:
        return { 
            error: action.error,
            usersList: state.usersList,
            user: state.user,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.RESETPASSWORD_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            user: state.user,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.RESETPASSWORD_SUCCESS:
        return {
            loading: false,
            usersList: state.usersList, 
            resetModal:false,
            refreshList:true,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.RESETPASSWORD_FAILURE:
        return { 
            error: action.error,
            usersList: state.usersList,
            user: state.user,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
            ...state,
            usersList: state.usersList.map(user =>
                user._id === action.id
                    ? { ...user, deleting: true }
                    : user
            )
        };
    case adminUserConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
            deleteModal:false,
            refreshList:true
        };
    case adminUserConstants.DELETE_FAILURE:
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
    case adminUserConstants.GETALLUSERS_REPORTING_LIST_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.GETALLUSERS_REPORTING_LIST_SUCCESS:
        return {
            loading: false,
            UserListForReporting: action.UserListForReporting.data,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.GETALLUSERS_REPORTING_LIST_FAILURE:
        return { 
            error: action.error,
            UserListForReporting: state.UserListForReporting,
        };
    case adminUserConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_REQUEST:
        return {
            loading: true,
            usersList: state.usersList,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_SUCCESS:
        return {
            loading: false,
            ReportingList:action.ReportingList.data,
            activePage: state.activePage,
            totalItemsCount: state.totalItemsCount,
            limit: state.limit
        };
    case adminUserConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_FAILURE:
        return { 
            error: action.error
        };

    default:
        return state;
    }
}