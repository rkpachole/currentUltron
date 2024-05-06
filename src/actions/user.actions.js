import { userConstants } from "../constants";
import { userService } from "../services";

export const userActions = {
    getUsersList,
    addUser,
    getById,
    updateUser,
    resetPassword,
    delete: _delete,
    getUserListForReporting,
    getReportingList
};

function getUsersList(search) {
    return dispatch => {
        dispatch(request());
        userService.getUsersList(search)
            .then(
                usersList => dispatch(success(usersList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALLUSERS_REQUEST }; }
    function success(usersList) { return { type: userConstants.GETALLUSERS_SUCCESS, usersList }; }
    function failure(error) { return { type: userConstants.GETALLUSERS_FAILURE, error }; }
}
function addUser(userInfo) {
    return dispatch => {
        dispatch(request());
        userService.addUser(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERADD_REQUEST }; }
    function success(userInfo) { return { type: userConstants.USERADD_SUCCESS, userInfo }; }
    function failure(error) { return { type: userConstants.USERADD_FAILURE, error }; }
}
function getById(id) {
    return dispatch => {
        dispatch(request(id));

        userService.getById(id)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: userConstants.USEREDIT_REQUEST, id }; }
    function success(user) { return { type: userConstants.USEREDIT_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.USEREDIT_FAILURE, error }; }
}

function updateUser(userInfo) {
    return dispatch => {
        dispatch(request());

        userService.update(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERUPDATE_REQUEST }; }
    function success(userInfo) { return { type: userConstants.USERUPDATE_SUCCESS, userInfo }; }
    function failure(error) { return { type: userConstants.USERUPDATE_FAILURE, error }; }
}
function resetPassword(passInfo) {
    return dispatch => {
        dispatch(request());

        userService.resetUserPassword(passInfo)
            .then(
                passInfo => dispatch(success(passInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.RESETPASSWORD_REQUEST }; }
    function success(passInfo) { return { type: userConstants.RESETPASSWORD_SUCCESS, passInfo }; }
    function failure(error) { return { type: userConstants.RESETPASSWORD_FAILURE, error }; }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.deleteUser(id)
            .then(
                user => { 
                    dispatch(success(id, user));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id }; }
    function success(id, user) { return { type: userConstants.DELETE_SUCCESS, id, user }; }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error }; }
}
function getUserListForReporting(search) {
    return dispatch => {
        dispatch(request());
        userService.getUserListForReporting(search)
            .then(
                UserListForReporting => dispatch(success(UserListForReporting)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALLUSERS_REPORTING_LIST_REQUEST }; }
    function success(UserListForReporting) { return { type: userConstants.GETALLUSERS_REPORTING_LIST_SUCCESS, UserListForReporting }; }
    function failure(error) { return { type: userConstants.GETALLUSERS_REPORTING_LIST_FAILURE, error }; }
}
function getReportingList(search) {
    return dispatch => {
        dispatch(request());
        userService.getReportingList(search)
            .then(
                ReportingList => dispatch(success(ReportingList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_REQUEST }; }
    function success(ReportingList) { return { type: userConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_SUCCESS, ReportingList }; }
    function failure(error) { return { type: userConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_FAILURE, error }; }
}

