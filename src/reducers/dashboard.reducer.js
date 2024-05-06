import { dashboardConstants } from "../constants";

const initialState =  { loading: null,onLeaveList: null, anniversaryList:null, birthDayList:null} || {};

export function dashboard(state = initialState, action) {
    switch (action.type) {
    case dashboardConstants.GETONLEAVELIST_REQUEST:
        return {
            loading: true
        };
    case dashboardConstants.GETONLEAVELIST_SUCCESS:
        return {
            loading: false,
            onLeaveList:action.onLeaveList.data
          
        };
    case dashboardConstants.GETONLEAVELIST_FAILURE:
        return { 
            error: action.error
        };
    case dashboardConstants.GETANNIVERSARYLIST_REQUEST:
        return {
            loading: true,
           
        };
    case dashboardConstants.GETANNIVERSARYLIST_SUCCESS:
        return {
            loading: false,
            anniversaryList:action.anniversaryList.data
         
        };
    case dashboardConstants.GETANNIVERSARYLIST_FAILURE:
        return { 
            error: action.error,
          
        };
    case dashboardConstants.GETBIRTHDAYLIST_REQUEST:
        return {
            loading: true,
        };
    case dashboardConstants.GETBIRTHDAYLIST_SUCCESS:
        return {
            loading: false,
            birthDayList:action.birthDayList.data
        };
    case dashboardConstants.GETBIRTHDAYLIST_FAILURE:
        return { 
            error: action.error,
      
        };
    default:
        return state;
    }
}