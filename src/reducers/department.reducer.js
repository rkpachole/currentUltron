import { departmentConstants } from "../constants";

const initialState =  { loading: null, departmentList: null, } || {};

export function departments(state = initialState, action) {
    switch (action.type) {
    case departmentConstants.GETALLDEPARTMENTS_REQUEST:
        return {
            loading: true
        };
    case departmentConstants.GETALLDEPARTMENTS_SUCCESS:
        return {
            loading: false,
            departmentList: action.departmentList.data,
            activePage: action.departmentList.page,
            totalItemsCount: action.departmentList.total_count,
            limit: action.departmentList.page_count
        };
    case departmentConstants.GETALLDEPARTMENTS_FAILURE:
        return { 
            error: action.error
        };
  
    default:
        return state;
    }
}