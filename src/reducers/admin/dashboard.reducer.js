import {adminDashboardConstants } from "../../constants";

const initialState =  { loading: null,onLeaveList: null, anniversaryList:null, birthDayList:null} || {};

export function adminDashboard(state = initialState, action) {
    switch (action.type) {
    case adminDashboardConstants.GETONLEAVELIST_REQUEST:
        return {
            loading: true
        };
    case adminDashboardConstants.GETONLEAVELIST_SUCCESS:
        return {
            loading: false,
            onLeaveList:action.onLeaveList.data
          
        };
    case adminDashboardConstants.GETONLEAVELIST_FAILURE:
        return { 
            error: action.error
        };
    case adminDashboardConstants.GETANNIVERSARYLIST_REQUEST:
        return {
            loading: true,
           
        };
    case adminDashboardConstants.GETANNIVERSARYLIST_SUCCESS:
        return {
            loading: false,
            anniversaryList:action.anniversaryList.data
         
        };
    case adminDashboardConstants.GETANNIVERSARYLIST_FAILURE:
        return { 
            error: action.error,
          
        };
    case adminDashboardConstants.GETBIRTHDAYLIST_REQUEST:
        return {
            loading: true,
        };
    case adminDashboardConstants.GETBIRTHDAYLIST_SUCCESS:
        return {
            loading: false,
            birthDayList:action.birthDayList.data
        };
    case adminDashboardConstants.GETBIRTHDAYLIST_FAILURE:
        return { 
            error: action.error,
      
        };
    default:
        return state;
    }
}