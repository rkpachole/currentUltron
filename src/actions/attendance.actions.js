import { attendanceConstants } from "../constants";
import { attendanceService } from "../services";

export const attendanceActions = {
    getAttendanceList,
    clockInOut,
    checkClock,
    getByDate,
    checkRegularize,
    regularize
 

};

function getAttendanceList(search) {
    return dispatch => {
        dispatch(request());
        attendanceService.getAttendanceList(search)
            .then(
                usersList => dispatch(success(usersList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: attendanceConstants.GETALLATTENDANCE_REQUEST }; }
    function success(attendanceList) { return { type: attendanceConstants.GETALLATTENDANCE_SUCCESS, attendanceList }; }
    function failure(error) { return { type: attendanceConstants.GETALLATTENDANCE_FAILURE, error }; }
}

function clockInOut(userInfo) {
    return dispatch => {
        dispatch(request());
        attendanceService.clockInOut(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: attendanceConstants.ATTENDANCEINOUT_REQUEST }; }
    function success(clockIn) { return { type: attendanceConstants.ATTENDANCEINOUT_SUCCESS, clockIn }; }
    function failure(error) { return { type: attendanceConstants.ATTENDANCEINOUT_FAILURE, error }; }
}

function checkClock(userInfo) {
    return dispatch => {
        dispatch(request());
        attendanceService.checkClock(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: attendanceConstants.ATTENDANCECLOCKCHECK_REQUEST }; }
    function success(checkClock) { return { type: attendanceConstants.ATTENDANCECLOCKCHECK_SUCCESS, checkClock }; }
    function failure(error) { return { type: attendanceConstants.ATTENDANCECLOCKCHECKT_FAILURE, error }; }
}

function getByDate(id) {
    return dispatch => {
        dispatch(request(id));

        attendanceService.getByDate(id)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: attendanceConstants.GETATTENDANCEBYDATE_REQUEST, id }; }
    function success(byDate) { return { type: attendanceConstants.GETATTENDANCEBYDATE_SUCCESS, byDate }; }
    function failure(error) { return { type: attendanceConstants.GETATTENDANCEBYDATE_FAILURE, error }; }
}
function regularize(userId) {

    return dispatch => {
        dispatch(request(userId));

        attendanceService.regularize(userId)
            .then(
                Success => {
                    dispatch(success(Success));
                },
                error => {
                    dispatch(failure(error));

                }
            );

    };

    function request(userId) { return { type: attendanceConstants.REGULARIZE_BYDATE_REQUEST, userId }; }
    function success(success) { return { type: attendanceConstants.REGULARIZE_BYDATE_SUCCESS, success }; }
    function failure(error) { return { type: attendanceConstants.REGULARIZE_BYDATE_FAILURE, error }; }
}
function checkRegularize(userId) {

    return dispatch => {
        dispatch(request(userId));

        attendanceService.checkRegularize(userId)
            .then(
                checkRegularize => {
                    dispatch(success(checkRegularize));
                    
                },
                error => {
                    console.log("dsdsdsdsd",error);
                    dispatch(failure(error));
                }


            );

    };

    function request(userId) { return { type: attendanceConstants.CHECKREGULARIZE_BYDATE_REQUEST, userId }; }
    function success(checkRegularize) { return { type: attendanceConstants.CHECKREGULARIZE_BYDATE_SUCCESS, checkRegularize }; }
    function failure(error) { return { type: attendanceConstants.CHECKREGULARIZE_BYDATE_FAILURE, error }; }
}