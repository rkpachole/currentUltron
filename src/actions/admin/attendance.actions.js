import { adminAttendanceConstants } from "../../constants";
import { adminAttendanceService } from "../../services";

export const adminAttendanceActions = {
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
        adminAttendanceService.getAttendanceList(search)
            .then(
                usersList => dispatch(success(usersList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminAttendanceConstants.GETALLATTENDANCE_REQUEST }; }
    function success(attendanceList) { return { type: adminAttendanceConstants.GETALLATTENDANCE_SUCCESS, attendanceList }; }
    function failure(error) { return { type: adminAttendanceConstants.GETALLATTENDANCE_FAILURE, error }; }
}

function clockInOut(userInfo) {
    return dispatch => {
        dispatch(request());
        adminAttendanceService.clockInOut(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminAttendanceConstants.ATTENDANCEINOUT_REQUEST }; }
    function success(clockIn) { return { type: adminAttendanceConstants.ATTENDANCEINOUT_SUCCESS, clockIn }; }
    function failure(error) { return { type: adminAttendanceConstants.ATTENDANCEINOUT_FAILURE, error }; }
}

function checkClock(userInfo) {
    return dispatch => {
        dispatch(request());
        adminAttendanceService.checkClock(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminAttendanceConstants.ATTENDANCECLOCKCHECK_REQUEST }; }
    function success(checkClock) { return { type: adminAttendanceConstants.ATTENDANCECLOCKCHECK_SUCCESS, checkClock }; }
    function failure(error) { return { type: adminAttendanceConstants.ATTENDANCECLOCKCHECKT_FAILURE, error }; }
}

function getByDate(id) {
    return dispatch => {
        dispatch(request(id));

        adminAttendanceService.getByDate(id)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: adminAttendanceConstants.GETATTENDANCEBYDATE_REQUEST, id }; }
    function success(byDate) { return { type: adminAttendanceConstants.GETATTENDANCEBYDATE_SUCCESS, byDate }; }
    function failure(error) { return { type: adminAttendanceConstants.GETATTENDANCEBYDATE_FAILURE, error }; }
}
function regularize(userId) {

    return dispatch => {
        dispatch(request(userId));

        adminAttendanceService.regularize(userId)
            .then(
                Success => {
                    dispatch(success(Success));
                },
                error => {
                    dispatch(failure(error));

                }
            );

    };

    function request(userId) { return { type: adminAttendanceConstants.REGULARIZE_BYDATE_REQUEST, userId }; }
    function success(success) { return { type: adminAttendanceConstants.REGULARIZE_BYDATE_SUCCESS, success }; }
    function failure(error) { return { type: adminAttendanceConstants.REGULARIZE_BYDATE_FAILURE, error }; }
}
function checkRegularize(userId) {

    return dispatch => {
        dispatch(request(userId));

        adminAttendanceService.checkRegularize(userId)
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

    function request(userId) { return { type: adminAttendanceConstants.CHECKREGULARIZE_BYDATE_REQUEST, userId }; }
    function success(checkRegularize) { return { type: adminAttendanceConstants.CHECKREGULARIZE_BYDATE_SUCCESS, checkRegularize }; }
    function failure(error) { return { type: adminAttendanceConstants.CHECKREGULARIZE_BYDATE_FAILURE, error }; }
}