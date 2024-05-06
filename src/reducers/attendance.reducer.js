import { attendanceConstants } from "../constants";

const initialState =  { loading: null, attendanceList: null, } || {};

export function attendances(state = initialState, action) {
    switch (action.type) {
    case attendanceConstants.GETALLATTENDANCE_REQUEST:
        return {
            loading: true
        };
    case attendanceConstants.GETALLATTENDANCE_SUCCESS:
        return {
            loading: false,
            attendanceList:action.attendanceList.data
          
        };
    case attendanceConstants.GETALLATTENDANCE_FAILURE:
        return { 
            error: action.error
        };
    case attendanceConstants.ATTENDANCEINOUT_REQUEST:
        return {
            loading: true
           
        };
    case attendanceConstants.ATTENDANCEINOUT_SUCCESS:
        return {
            loading: false,
            refreshList:true,
            clockInOut:true
        };
    case attendanceConstants.ATTENDANCEINOUT_FAILURE:
        return { 
            error: action.error,
          
        };
    case attendanceConstants.ATTENDANCECLOCKCHECK_REQUEST:
        return {
            loading: true,
        };
    case attendanceConstants.ATTENDANCECLOCKCHECK_SUCCESS:
        return {
            loading: false,
            checkClock:action.checkClock.data,
         
        };
    case attendanceConstants.ATTENDANCECLOCKCHECK_FAILURE:
        return { 
            error: action.error,
      
        };
   
    case attendanceConstants.GETATTENDANCEBYDATE_REQUEST:
        return {
            loading: true,
          
        };
    case attendanceConstants.GETATTENDANCEBYDATE_SUCCESS:
        return {
            loading: false,
         
        };
    case attendanceConstants.GETATTENDANCEBYDATE_FAILURE:
        return { 
            error: action.error,
        };

    case attendanceConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
            ...state,
            usersList: state.usersList.map(user =>
                user._id === action.id
                    ? { ...user, deleting: true }
                    : user
            )
        };
    case attendanceConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
            deleteModal:false,
            refreshList:true
        };
    case attendanceConstants.DELETE_FAILURE:
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
    case attendanceConstants.REGULARIZE_BYDATE_REQUEST:
        return {
            loading: true
        };
    case attendanceConstants.REGULARIZE_BYDATE_SUCCESS:
        return {
            regularize_modal: false,
            success:action.success,
            loading: false

        };
    case attendanceConstants.REGULARIZE_BYDATE_FAILURE:
        return {
            error: action.error
        };

    case attendanceConstants.CHECKREGULARIZE_BYDATE_REQUEST:
        return {
            success: action.success,
            loading: false,
        };
    case attendanceConstants.CHECKREGULARIZE_BYDATE_SUCCESS:
        return {
            success: action.success,
            loading: false,
        };
    case attendanceConstants.CHECKREGULARIZE_BYDATE_FAILURE:
        return {
            CheckRegerror: action.error,
        };
 
    default:
        return state;
    }
}