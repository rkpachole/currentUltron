import { regularizationConstants } from "../constants";
import { regularizationService } from "../services";

export const regularizationActions = {
    getRegularizationList,
    clockInOut,
    checkClock,
    getByDate,
    getPendingRequests,
    updateRequestStatus,
    getAttendanceDetail,
    getPendingRegularizationCount

};

function getRegularizationList(search) {
    return dispatch => {
        dispatch(request());
        regularizationService.getRegularizationList(search)
            .then(
                regularizationList => dispatch(success(regularizationList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: regularizationConstants.GETALLREGULARIZATION_REQUEST }; }
    function success(regularizationList) { return { type: regularizationConstants.GETALLREGULARIZATION_SUCCESS, regularizationList }; }
    function failure(error) { return { type: regularizationConstants.GETALLREGULARIZATION_FAILURE, error }; }
}

function clockInOut(userInfo) {
    return dispatch => {
        dispatch(request());
        regularizationService.clockInOut(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: regularizationConstants.ATTENDANCEINOUT_REQUEST }; }
    function success(clockIn) { return { type: regularizationConstants.ATTENDANCEINOUT_SUCCESS, clockIn }; }
    function failure(error) { return { type: regularizationConstants.ATTENDANCEINOUT_FAILURE, error }; }
}

function checkClock(userInfo) {
    return dispatch => {
        dispatch(request());
        regularizationService.checkClock(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: regularizationConstants.ATTENDANCECLOCKCHECK_REQUEST }; }
    function success(checkClock) { return { type: regularizationConstants.ATTENDANCECLOCKCHECK_SUCCESS, checkClock }; }
    function failure(error) { return { type: regularizationConstants.ATTENDANCECLOCKCHECKT_FAILURE, error }; }
}

function getByDate(id) {
    return dispatch => {
        dispatch(request(id));

        regularizationService.getByDate(id)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: regularizationConstants.GETATTENDANCEBYDATE_REQUEST, id }; }
    function success(byDate) { return { type: regularizationConstants.GETATTENDANCEBYDATE_SUCCESS, byDate }; }
    function failure(error) { return { type: regularizationConstants.GETATTENDANCEBYDATE_FAILURE, error }; }
}
function getPendingRequests(search) {
    // console.log("_id", search);
    return dispatch => {
        dispatch(request(search));

        regularizationService.getPendingRequests(search)

            .then(
                user => {

                    dispatch(success(user));
                },
                error => {

                    dispatch(failure(error));
                }

            );


    };

    function request() { return { type: regularizationConstants.PENDINGREQUEST_REQUEST }; }
    function success(pendingList) { return { type: regularizationConstants.PENDINGREQUEST_SUCCESS, pendingList }; }
    function failure(error) { return { type: regularizationConstants.PENDINGREQUEST_FAILURE, error }; }
}
function updateRequestStatus(id) {

    return dispatch => {
        dispatch(request(id));

        regularizationService.updateRequestStatus(id)

            .then(
                user => {
                   
                    dispatch(success(user));
                },
                error => {

                    dispatch(failure(error));
                }

            );


    };

    function request() { return { type: regularizationConstants.UPDATEREGULARIZATION_REQUEST }; }
    function success(updateList) { return { type: regularizationConstants.UPDATEREGULARIZATION_SUCCESS, updateList }; }
    function failure(error) { return { type: regularizationConstants.UPDATEREGULARIZATION_FAILURE, error }; }
}
function getAttendanceDetail(search) {
    return dispatch => {
        dispatch(request());
        regularizationService.getAttendanceDetail(search)
            .then(
                getAllAttendanceDetail => {
                    // console.log("action",getAllAttendanceList.data);
                    dispatch(success(getAllAttendanceDetail));
                },
                error => {

                    dispatch(failure(error));
                }

            );


    };

    function request() { return { type: regularizationConstants.GETATTENDANCEDETAIL_REQUEST }; }
    function success(getAllAttendanceDetail) { return { type: regularizationConstants.GETATTENDANCEDETAIL_SUCCESS, getAllAttendanceDetail }; }
    function failure(error) { return { type: regularizationConstants.GETATTENDANCEDETAIL_FAILURE, error }; }
}

function getPendingRegularizationCount(search) {
    return dispatch => {
        dispatch(request());
        regularizationService.getPendingRegularizationCount(search)
            .then(
                details => {
                    // console.log("action",getAllAttendanceList.data);
                    dispatch(success(details));
                },
                error => {

                    dispatch(failure(error));
                }

            );


    };

    function request() { return { type: regularizationConstants.REGULARIZATIONCOUNT_REQUEST }; }
    function success(count) { return { type: regularizationConstants.REGULARIZATIONCOUNT_SUCCESS, count }; }
    function failure(error) { return { type: regularizationConstants.REGULARIZATIONCOUNT_FAILURE, error }; }
}
