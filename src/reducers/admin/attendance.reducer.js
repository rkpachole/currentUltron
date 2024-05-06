import { adminAttendanceConstants } from "../../constants";

const initialState =  { loading: null, attendanceList: null, } || {};

export function adminAttendances(state = initialState, action) {
    switch (action.type) {
    case adminAttendanceConstants.GETALLATTENDANCE_REQUEST:
        return {
            loading: true
        };
    case adminAttendanceConstants.GETALLATTENDANCE_SUCCESS:
        return {
            loading: false,
            attendanceList:action.attendanceList.data
          
        };
    case adminAttendanceConstants.GETALLATTENDANCE_FAILURE:
        return { 
            error: action.error
        };
    case adminAttendanceConstants.ATTENDANCEINOUT_REQUEST:
        return {
            loading: true,
           
        };
    case adminAttendanceConstants.ATTENDANCEINOUT_SUCCESS:
        return {
            loading: false,
            refreshList:true,
            clockInOut:true,
         
        };
    case adminAttendanceConstants.ATTENDANCEINOUT_FAILURE:
        return { 
            error: action.error,
          
        };
    case adminAttendanceConstants.ATTENDANCECLOCKCHECK_REQUEST:
        return {
            loading: true,
        };
    case adminAttendanceConstants.ATTENDANCECLOCKCHECK_SUCCESS:
        return {
            loading: false,
            checkClock:action.checkClock.data,
         
        };
    case adminAttendanceConstants.ATTENDANCECLOCKCHECK_FAILURE:
        return { 
            error: action.error,
      
        };
   
    case adminAttendanceConstants.GETATTENDANCEBYDATE_REQUEST:
        return {
            loading: true,
          
        };
    case adminAttendanceConstants.GETATTENDANCEBYDATE_SUCCESS:
        return {
            loading: false,
         
        };
    case adminAttendanceConstants.GETATTENDANCEBYDATE_FAILURE:
        return { 
            error: action.error,
           
        };

    case adminAttendanceConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
            ...state,
            usersList: state.usersList.map(user =>
                user._id === action.id
                    ? { ...user, deleting: true }
                    : user
            )
        };
    case adminAttendanceConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
            deleteModal:false,
            refreshList:true
        };
    case adminAttendanceConstants.DELETE_FAILURE:
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
    case adminAttendanceConstants.REGULARIZE_BYDATE_REQUEST:
        return {
            loading: true,
        };
    case adminAttendanceConstants.REGULARIZE_BYDATE_SUCCESS:
        return {
            regularize_modal: false,
            success:action.success,
            loading: false,

        };
    case adminAttendanceConstants.REGULARIZE_BYDATE_FAILURE:
        return {
            error: action.error
        };

    case adminAttendanceConstants.CHECKREGULARIZE_BYDATE_REQUEST:
        return {
            success: action.success,
            loading: false,

        };
    case adminAttendanceConstants.CHECKREGULARIZE_BYDATE_SUCCESS:
        return {
            success: action.success,
            loading: false,

        };
    case adminAttendanceConstants.CHECKREGULARIZE_BYDATE_FAILURE:
        return {
            CheckRegerror: action.error,
        };
 
    default:
        return state;
    }
}