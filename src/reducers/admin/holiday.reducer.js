import { holidayConstants } from "../../constants";

const initialState =  { loading: null, holidaysList: null,holidays:null,ScsMsg:null } || {};

export function holidays(state = initialState, action) {
    switch (action.type) {
    case holidayConstants.GETALLHOLIDAYSS_REQUEST:
        return {
            loading: true
        };
    case holidayConstants.GETALLHOLIDAYSS_SUCCESS:
        return {
            loading: false,
            holidaysList: action.holidaysList.data,
            activePage: action.holidaysList.page,
            totalItemsCount:action.holidaysList.total_count,
            limit:action.holidaysList.page_count,
        };
    case holidayConstants.GETALLHOLIDAYSS_FAILURE:
        return { 
            error: action.error
        };
    case holidayConstants.HOLIDAYSADD_REQUEST:
        return {
            loading: true,
            userInfo:action.userInfo,
            holidaysList: state.holidaysList,
           
        };
    case holidayConstants.HOLIDAYSADD_SUCCESS:
        return {
            loading: false,
            holidaysList: state.holidaysList,
            ScsMsg:action.userInfo,
            refreshList: true
        };
    case holidayConstants.HOLIDAYSADD_FAILURE:
        return { 
            error: action.error,
            holidaysList: state.holidaysList,
           
        };
    case holidayConstants.HOLIDAYSEDIT_REQUEST:
        return {
            loading: true,
            holidaysList: state.holidaysList,
            
        };
    case holidayConstants.HOLIDAYSEDIT_SUCCESS:
        return {
            loading: false,
            holidaysList: state.holidaysList,
            holidays: action.holidays,
            editModal: true,
           
        };
    case holidayConstants.HOLIDAYSEDIT_FAILURE:
        return { 
            error: action.error,
            holidaysList: state.holidaysList,
           
            
        };
    case holidayConstants.HOLIDAYSUPDATE_REQUEST:
        return { 
            loading: true,
            holidaysList: state.holidaysList,
        };
    case holidayConstants.HOLIDAYSUPDATE_SUCCESS:
        return { 
            loading: false,
            holidaysList: state.holidaysList,
            message:action.userInfo.message,
            refreshList:true,
            
        };
    case holidayConstants.HOLIDAYSUPDATE_FAILURE:
        return { 
            loading: false,
            error: action.error,
            holidaysList: state.holidaysList,
            refreshList:false,
          
        };
    case holidayConstants.DELETE_REQUEST:
        return {
            loading: false,
            holidaysList: state.holidaysList,
            refreshList:false,
            
        };
    case holidayConstants.DELETE_SUCCESS:
        return {
            deleteScsMsg: action.holidaysList.message,
            refreshList:true
        };
    case holidayConstants.DELETE_FAILURE:
        return {
            loading: false,
            error: action.error,
        };
    case holidayConstants.FILTERHOLIDAY_REQUEST:
        return { 
            loading: true
            
        };
    case holidayConstants.FILTERHOLIDAY_SUCCESS:
        return { 
            loading: false,
            holidaysList: action.userInfo.data,
        };
    case holidayConstants.FILTERHOLIDAY_FAILURE:
        return { 
            loading: false,
            error: action.error,
        };
    default:
    
        return state;
    }
}  
