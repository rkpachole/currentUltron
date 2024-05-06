import { adminRegularizationConstants } from "../../constants";

const initialState =  { loading: null, regularizationList: null,pendingList:null, message:null } || {};

export function adminRegularization(state = initialState, action) {
    switch (action.type) {
    case adminRegularizationConstants.PENDINGREQUEST_REQUEST:
        return {
            loading: true,
                
                  
        };
    case adminRegularizationConstants.PENDINGREQUEST_SUCCESS:
        return {
            loading: false,
            pendingList:action.pendingList.data,              
            activePage: action.pendingList.page,
            totalItemsCount: action.pendingList.total_count,
            limit: action.pendingList.page_count    
        };
    case adminRegularizationConstants.PENDINGREQUEST_FAILURE:
        return { 
            error: action.error
                   
        };
    case adminRegularizationConstants.UPDATEREGULARIZATION_REQUEST:
        return {
            updateList:state.updateList ,
            loading: true,    
        };
    case adminRegularizationConstants.UPDATEREGULARIZATION_SUCCESS:
        return {
            loading: false,
            updateList:state.updateList ,
            UpdateScsMsg: action.updateList.message ,
        };
    case adminRegularizationConstants.UPDATEREGULARIZATION_FAILURE:
        return { 
            updateList:state.updateList ,
            error: action.error
        };
    case adminRegularizationConstants.GETATTENDANCEDETAIL_REQUEST:
        return { 
            pendingList:state.pendingList,
            getAllAttendanceList: action.getAllAttendanceList
        };
    case adminRegularizationConstants.GETATTENDANCEDETAIL_SUCCESS:
        return { 
            pendingList:state.pendingList,
            getAllAttendanceDetail: action.getAllAttendanceDetail.data
                   
        };
    case adminRegularizationConstants.GETATTENDANCEDETAIL_FAILURE:
        return { 
            pendingList:state.pendingList,
            error: action.error
        };
    default:
        return state;
    }
}