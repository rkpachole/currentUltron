import { reportConstants } from "../constants";

const initialState =  { loading: null, departmentList: null, } || {};

export function report(state = initialState, action) {
    switch (action.type) {
    case reportConstants.GETREPORTINGLIST_REQUEST:
        return {
            loading: true
        };
    case reportConstants.GETREPORTINGLIST_SUCCESS:
        return {
            loading: false,
            reportList: action.reportList.data,
            activePage: action.reportList.page,
            totalItemsCount: action.reportList.total_count,
            limit: action.reportList.page_count
        };
    case reportConstants.GETREPORTINGLIST_FAILURE:
        return { 
            error: action.error
        };
  
    default:
        return state;
    }
}