import {adminUserConstants } from "../../constants";
import { adminUserService } from "../../services";

export const adminUserActions = {
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
        adminUserService.getUsersList(search)
            .then(
                usersList => dispatch(success(usersList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminUserConstants.GETALLUSERS_REQUEST }; }
    function success(usersList) { return { type: adminUserConstants.GETALLUSERS_SUCCESS, usersList }; }
    function failure(error) { return { type: adminUserConstants.GETALLUSERS_FAILURE, error }; }
}
function addUser(userInfo) {
    return dispatch => {
        dispatch(request());
        adminUserService.addUser(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminUserConstants.USERADD_REQUEST }; }
    function success(userInfo) { return { type: adminUserConstants.USERADD_SUCCESS, userInfo }; }
    function failure(error) { return { type: adminUserConstants.USERADD_FAILURE, error }; }
}
function getById(id) {
    return dispatch => {
        dispatch(request(id));

        adminUserService.getById(id)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: adminUserConstants.USEREDIT_REQUEST, id }; }
    function success(user) { return { type: adminUserConstants.USEREDIT_SUCCESS, user }; }
    function failure(error) { return { type: adminUserConstants.USEREDIT_FAILURE, error }; }
}

function updateUser(userInfo) {
    return dispatch => {
        dispatch(request());

        adminUserService.update(userInfo)
            .then(
                
                userInfo => {
                    console.log("mess",userInfo.message);
                    dispatch(success(userInfo));},
                error => {dispatch(failure(error));}
            );
    };

    function request() { return { type: adminUserConstants.USERUPDATE_REQUEST }; }
    function success(userInfo) { return { type: adminUserConstants.USERUPDATE_SUCCESS, userInfo }; }
    function failure(error) { return { type: adminUserConstants.USERUPDATE_FAILURE, error }; }
}
function resetPassword(passInfo) {
    return dispatch => {
        dispatch(request());

        adminUserService.resetUserPassword(passInfo)
            .then(
                passInfo => dispatch(success(passInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminUserConstants.RESETPASSWORD_REQUEST }; }
    function success(passInfo) { return { type: adminUserConstants.RESETPASSWORD_SUCCESS, passInfo }; }
    function failure(error) { return { type: adminUserConstants.RESETPASSWORD_FAILURE, error }; }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        adminUserService.deleteUser(id)
            .then(
                user => { 
                    dispatch(success(id, user));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: adminUserConstants.DELETE_REQUEST, id }; }
    function success(id, user) { return { type: adminUserConstants.DELETE_SUCCESS, id, user }; }
    function failure(id, error) { return { type: adminUserConstants.DELETE_FAILURE, id, error }; }
}
function getUserListForReporting(search) {
    return dispatch => {
        dispatch(request());
        adminUserService.getUserListForReporting(search)
            .then(
                UserListForReporting => dispatch(success(UserListForReporting)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminUserConstants.GETALLUSERS_REPORTING_LIST_REQUEST }; }
    function success(UserListForReporting) { return { type: adminUserConstants.GETALLUSERS_REPORTING_LIST_SUCCESS, UserListForReporting }; }
    function failure(error) { return { type: adminUserConstants.GETALLUSERS_REPORTING_LIST_FAILURE, error }; }
}
function getReportingList(search) {
    return dispatch => {
        dispatch(request());
        adminUserService.getReportingList(search)
            .then(
                ReportingList => dispatch(success(ReportingList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminUserConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_REQUEST }; }
    function success(ReportingList) { return { type: adminUserConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_SUCCESS, ReportingList }; }
    function failure(error) { return { type: adminUserConstants.GETALLUSERS_ATTENDANCE_REPORTING_LIST_FAILURE, error }; }
}

