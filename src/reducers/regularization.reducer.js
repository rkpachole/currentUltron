import { regularizationConstants } from "../constants";

const initialState =  { loading: null, regularizationList: null,pendingList:null, message:null } || {};

export function regularization(state = initialState, action) {
    switch (action.type) {
    case regularizationConstants.GETREGULARIZATIONIN_REQUEST:
        return {
            loading: true
        };
    case regularizationConstants.GETREGULARIZATIONIN_SUCCESS:
        // console.log("dsdsd",action.regularizationList.data);
        return {
            loading: false,
            regularizationList:action.regularizationList.data
          
        };
    case regularizationConstants.GETREGULARIZATIONIN_FAILURE:
        return { 
            error: action.error
        };
    case regularizationConstants. REGULARIZATIONINOUT_REQUEST:
        return {
            loading: true
           
        };
    case regularizationConstants. REGULARIZATIONINOUT_SUCCESS:
        return {
            loading: false,
            refreshList:true,
            clockInOut:true
         
        };
    case regularizationConstants. REGULARIZATIONINOUT_FAILURE:
        return { 
            error: action.error
          
        };
    case regularizationConstants. REGULARIZATIONCLOCKCHECK_REQUEST:
        return {
            loading: true
        };
    case regularizationConstants. REGULARIZATIONCLOCKCHECK_SUCCESS:
        return {
            loading: false,
            checkClock:action.checkClock.data
         
        };
    case regularizationConstants. REGULARIZATIONCLOCKCHECK_FAILURE:
        return { 
            error: action.error,
            loading: false,
        };
   
    case regularizationConstants.GETREGULARIZATIONBYDATE_REQUEST:
        return {
            updateList:state.updateList ,
            loading: true
          
        };
    case regularizationConstants.GETREGULARIZATIONBYDATE_SUCCESS:
        return {
            updateList:state.updateList ,
            loading: false
         
        };
    case regularizationConstants.GETREGULARIZATIONBYDATE_FAILURE:
        return { 
            updateList:state.updateList ,
            error: action.error
           
        };

    case regularizationConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
            ...state,
            usersList: state.usersList.map(user =>
                user._id === action.id
                    ? { ...user, deleting: true }
                    : user
            )
        };
    case regularizationConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
            deleteModal:false,
            refreshList:true,
            loading: false,
        };
    case regularizationConstants.DELETE_FAILURE:
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
    case regularizationConstants.PENDINGREQUEST_REQUEST:
        return {
            loading: true,
                
                  
        };
    case regularizationConstants.PENDINGREQUEST_SUCCESS:
        return {
            loading: false,
            pendingList:action.pendingList.data,
            activePage: action.pendingList.page,
            totalItemsCount:action.pendingList.total_count,
            limit:action.pendingList.page_count,               
                 
        };
    case regularizationConstants.PENDINGREQUEST_FAILURE:
        return { 
            error: action.error
        };
    case regularizationConstants.UPDATEREGULARIZATION_REQUEST:
        return {
            loading: true,    
        };
    case regularizationConstants.UPDATEREGULARIZATION_SUCCESS:
        return {
            loading: false,
            updateList:state.updateList ,
            UpdateScsMsg: action.updateList.message ,
        };
    case regularizationConstants.UPDATEREGULARIZATION_FAILURE:
        return { 
            updateList:state.updateList ,
            error: action.error
        };
    case regularizationConstants.GETATTENDANCEDETAIL_REQUEST:
        return { 
            pendingList:state.pendingList,
            getAllAttendanceList: action.getAllAttendanceList
        };
    case regularizationConstants.GETATTENDANCEDETAIL_SUCCESS:
        return { 
            pendingList:state.pendingList,
            getAllAttendanceDetail: action.getAllAttendanceDetail.data
                   
        };
    case regularizationConstants.GETATTENDANCEDETAIL_FAILURE:
        return { 
            pendingList:state.pendingList,
            error: action.error
        };

    case regularizationConstants.REGULARIZATIONCOUNT_REQUEST:
        return { 
            pendingList:state.pendingList,
            getAllAttendanceDetail: state.getAllAttendanceDetail,

        };
    case regularizationConstants.REGULARIZATIONCOUNT_SUCCESS:
        return { 
            pendingList:state.pendingList,
            getAllAttendanceDetail: state.getAllAttendanceDetail,
            regularizationCount:action.count.data
                   
        };
    case regularizationConstants.REGULARIZATIONCOUNT_FAILURE:
        return { 
            pendingList:state.pendingList,
            getAllAttendanceDetail: state.getAllAttendanceDetail,
            error: action.error
        };
    default:
        return state;
    }
}