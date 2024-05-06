import {adminLeaveConstants } from "../../constants";

const initialState =  { loading: null, LeaveList: null,EditList:null,CLeaveData:null,LeavesRequestsList:null ,SLeaveData:null } || {};

export function adminLeaves(state = initialState, action) {
    switch (action.type) {
        
    case adminLeaveConstants.GETLEAVELIST_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            loading: true,
            success:false
        };
    case adminLeaveConstants.GETLEAVELIST_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:action.LeaveList.data,
            loading: false,
        };
    case adminLeaveConstants.GETLEAVELIST_FAILURE:
        return { 
            error: action.error,
            LeaveList:state.LeaveList,
            success:false,
            loading: false,
        };

    case adminLeaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            loading: true,
            success:false
        };
    case adminLeaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_SUCCESS:
        return {
            LeavesRequestsList:action.LeavesRequestsList.data,
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            activePage: action.LeavesRequestsList.page,
            totalItemsCount:action.LeavesRequestsList.total_count,
            limit:action.LeavesRequestsList.page_count,
            loading: false,
        };
    case adminLeaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_FAILURE:
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            error: action.error,
            success:false,
            loading: false,
        };      

    case adminLeaveConstants.CHECKCASUAL_LEAVES_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: true,
            success:false
        };
    case adminLeaveConstants.CHECKCASUAL_LEAVES_SUCCESS:
        return {
            CLeaveData:action.CLeavecount.data,
            SLeaveData:state.SLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: false,
            success:true
        };
    case adminLeaveConstants.CHECKCASUAL_LEAVES_FAILURE:
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            error: action.error,
            success:false,
            loading: false,
        };
    
    case adminLeaveConstants.CHECKSICK_LEAVES_REQUEST:
        return {
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: true,
            success:false
        };
    case adminLeaveConstants.CHECKSICK_LEAVES_SUCCESS:
        return {
            SLeaveData:action.SLeaveData.data,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: false,
            success:true
        };
    case adminLeaveConstants.CHECKSICK_LEAVES_FAILURE:
        return { 
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            error: action.error,
            success:false,
            loading: false,
        };
      
    case adminLeaveConstants.SENDLEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            loading: true,
            success:false,
            error:""
        };
    case adminLeaveConstants.SENDLEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            ScsMsg:action.ScsMsg,
            success:true,
            error:"",
            loading: false,
        };
    case adminLeaveConstants.SENDLEAVE_FAILURE:
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            error: action.error,
            success:false,
            loading: false,
        };

    case adminLeaveConstants.UPDATELEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            loading: true,    
        };
    case adminLeaveConstants.UPDATELEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            ScsMsg:action.LeaveScsMsg,
            loading: false,   
        };
    case adminLeaveConstants.UPDATELEAVE_FAILURE:
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            error: action.error, 
            loading: false, 
        };

    case adminLeaveConstants.EDITLEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            loading: true,
            LeaveList:state.LeaveList,
            // EditList:action.EditList.data,
        };
    case adminLeaveConstants. EDITLEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            loading: false,
            LeaveList:state.LeaveList,
            EditList:action.EditList.data,
        };
    case adminLeaveConstants.EDITLEAVE_FAILURE :
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            error: action.error,
            loading: false,
        };
    
    case adminLeaveConstants.DELETELEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            loading: true,
        };
    case adminLeaveConstants.DELETELEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            ScsMsg:action.success,
            success:true,
            loading: false,
        };
    case adminLeaveConstants.DELETELEAVE_FAILURE :
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            error: action.error,
            success:false,
            loading: false,
        };
    
    case adminLeaveConstants.STATUSUPDATELEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: true,
        };
    case adminLeaveConstants.STATUSUPDATELEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            success:false,
            loading:false,
            ApproveScsMsg:action.ApproveScsMsg,
             
        };
    case adminLeaveConstants.STATUSUPDATELEAVE_FAILURE :
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            error: action.error,
            loading:false,
        }; 
    case adminLeaveConstants.PENDINGLEAVE_REQUEST:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading: true,
        };
    case adminLeaveConstants.PENDINGLEAVE_SUCCESS:
        return {
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            loading:false,
            adminPendingCount:action.count.data,
             
        };
    case adminLeaveConstants.PENDINGLEAVE_FAILURE :
        return { 
            SLeaveData:state.SLeaveData,
            CLeaveData:state.CLeaveData,
            LeaveList:state.LeaveList,
            LeavesRequestsList:state.LeavesRequestsList,
            error: action.error,
            loading:false,
        }; 
    case adminLeaveConstants.PENDINGLEAVECOUNTBYUSERID_REQUEST:
        return {
           
            loading: true,
        };
    case adminLeaveConstants.PENDINGLEAVECOUNTBYUSERID_SUCCESS:
        return {
           
            loading:false,
            adminLeaveCountForSallery:action.count.data,
             
        };
    case adminLeaveConstants.PENDINGLEAVECOUNTBYUSERID_FAILURE :
        return { 
          
            error: action.error,
            loading:false,
        }; 
    
    default:
        return state;
    }
}