import { leaveConstants } from "../constants";

const initialState =  { loading: null, LeaveList: null,EditList:null,CLeaveData:null,LeavesRequestsList:null ,SLeaveData:null,UnpaidLeaveData:null } || {};

export function leaves(state = initialState, action) {
    switch (action.type) {
        
    case leaveConstants.GETLEAVELIST_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            loading: true,
            success:false
        };
    case leaveConstants.GETLEAVELIST_SUCCESS:
        // console.log("LeaveList",action.LeaveList.data);
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:action.LeaveList.data,
            LeaveActivePage: action.LeaveList.page,
            LeaveTotalItemsCount:action.LeaveList.total_count,
            LeaveLimit:action.LeaveList.page_count,
            loading: false,
            
        };
    case leaveConstants.GETLEAVELIST_FAILURE:
        return { 
            error: action.error,
            success:false,
            loading: false,
        };

    case leaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            loading: true,
            success:false
        };
    case leaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_SUCCESS:
        return {
            LeavesRequestsList:action.LeavesRequestsList.data,
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            activePage: action.LeavesRequestsList.page,
            totalItemsCount:action.LeavesRequestsList.total_count,
            limit:action.LeavesRequestsList.page_count,
            loading: false,
        };
    case leaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_FAILURE:
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            error: action.error,
            success:false,
            loading: false,
        };      

    case leaveConstants.CHECKCASUAL_LEAVES_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            LeaveList:state.LeaveList,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: true,
            success:false
        };
    case leaveConstants.CHECKCASUAL_LEAVES_SUCCESS:
        return {
            CLeaveData:action.CLeavecount.data,
            SLeaveData:state.SLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: false,
            success:true
        };
    case leaveConstants.CHECKCASUAL_LEAVES_FAILURE:
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            error: action.error,
            success:false,
            loading: false,
        };
    
    case leaveConstants.CHECKSICK_LEAVES_REQUEST:
        return {
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: true,
            success:false
        };
    case leaveConstants.CHECKSICK_LEAVES_SUCCESS:
        return {
            SLeaveData:action.SLeaveData.data,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: false,
            success:true
        };
    case leaveConstants.CHECKSICK_LEAVES_FAILURE:
        return { 
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            error: action.error,
            success:false,
            loading: false,
        };
        
    case leaveConstants.CHECKUNPAID_LEAVES_REQUEST:
        return {
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: true,
            success:false
        };
    case leaveConstants.CHECKUNPAID_LEAVES_SUCCESS:
        return {
            UnpaidLeaveData:action.UnpaidLeaveData.data,
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: false,
            success:true
        };
    case leaveConstants.CHECKUNPAID_LEAVES_FAILURE:
        return { 
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            error: action.error,
            success:false,
            loading: false,
        };
      
    case leaveConstants.SENDLEAVE_REQUEST:
        return {
            UnpaidLeaveData:state.UnpaidLeaveData,
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            loading: true,
            success:false,
            error:""
        };
    case leaveConstants.SENDLEAVE_SUCCESS:
        return {
            UnpaidLeaveData:state.UnpaidLeaveData,
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            ScsMsg:action.ScsMsg,
            success:true,
            error:"",
            loading: false,
            addModal:false
        };
    case leaveConstants.SENDLEAVE_FAILURE:
        return { 
            UnpaidLeaveData:state.UnpaidLeaveData,
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            error: action.error,
            success:false,
            loading: false,
        };

    case leaveConstants.UPDATELEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            loading: true,    
        };
    case leaveConstants.UPDATELEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeaveScsMsg:action.LeaveScsMsg,
            loading: false,  
            editModal:false 
        };
    case leaveConstants.UPDATELEAVE_FAILURE:
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            error: action.error, 
            loading: false, 
        };

    case leaveConstants.EDITLEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            loading: true,
            LeaveList:state.LeaveList,
            // EditList:action.EditList.data,
        };
    case leaveConstants. EDITLEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            loading: false,
            LeaveList:state.LeaveList,
            EditList:action.EditList.data,
        };
    case leaveConstants.EDITLEAVE_FAILURE :
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            error: action.error,
            loading: false,
        };
    
    case leaveConstants.DELETELEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            loading: true,
        };
    case leaveConstants.DELETELEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            ScsMsg:action.success,
            success:true,
            loading: false,
            deleteModel:false
        };
    case leaveConstants.DELETELEAVE_FAILURE :
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            error: action.error,
            success:false,
            loading: false,
        };
    
    case leaveConstants.STATUSUPDATELEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: true,
        };
    case leaveConstants.STATUSUPDATELEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            success:false,
            loading:false,
            ApproveScsMsg:action.ApproveScsMsg,
             
        };
    case leaveConstants.STATUSUPDATELEAVE_FAILURE :
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            error: action.error,
            loading:false,
        }; 
    case leaveConstants.PENDINGLEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: true,
        };
    case leaveConstants.PENDINGLEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading:false,
            pendingCount:action.count.data,
             
        };
    case leaveConstants.PENDINGLEAVE_FAILURE :
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            error: action.error,
            loading:false,
        }; 
    case leaveConstants.PENDINGSTEAMLEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: true,
        };
    case leaveConstants.PENDINGSTEAMLEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading:false,
            pendingSelfWithTeamCount:action.count.data,
             
        };
    case leaveConstants.PENDINGSTEAMLEAVE_FAILURE :
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            UnpaidLeaveData:state.UnpaidLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            error: action.error,
            loading:false,
        }; 
    case leaveConstants.CLEAR :
        return { 
            clearMsg: action.error,
        };
    default:
        return state;
    }
}