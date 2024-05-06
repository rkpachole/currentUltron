import { leaveConstants } from "../constants";
import { leaveService } from "../services";

export const leaveActions = {
    getLeavesList,
    getLeavesRequestsList,
    sendLeaveRequest,
    updateRequestedLeave,
    editLeaveRequest,
    deleteSendLeaveRequest,
    updateRequestedLeaveStatus,
    checkCasualLeaves,
    checkSickLeaves,
    checkUnpaidLeave,
    pendingLeaveRequestCount,
    pendingLeaveRequestWithSelfCount

};
function getLeavesList(search) {
    return dispatch => {
        dispatch(request(search));
        leaveService.getLeavesList(search)
            .then(
                LeaveList => dispatch(success(LeaveList)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {
            type: leaveConstants.GETLEAVELIST_REQUEST,
        };
    }
    function success(LeaveList) { return { type: leaveConstants.GETLEAVELIST_SUCCESS, LeaveList }; }
    function failure(error) { return { type: leaveConstants.GETLEAVELIST_FAILURE, error }; }
}
function getLeavesRequestsList(data) {
    // console.log("action",search);
    return dispatch => {
        dispatch(request(data));
        leaveService.getLeavesRequestsList(data)
            .then(
                LeaveList => dispatch(success(LeaveList)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: leaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_REQUEST }; }
    function success(LeavesRequestsList) { return { type: leaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_SUCCESS, LeavesRequestsList }; }
    function failure(error) { return { type: leaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_FAILURE, error }; }
}

function sendLeaveRequest(user) {
    return dispatch => {
        dispatch(request(user));
        leaveService.sendLeaveRequest(user)
            .then(
                LeaveList => {
                    dispatch(success(LeaveList));
                },
                error => {
                    dispatch(failure(error));
                }

            );
    };

    function request() { return { type: leaveConstants.SENDLEAVE_REQUEST }; }
    function success(ScsMsg) { return { type: leaveConstants.SENDLEAVE_SUCCESS, ScsMsg }; }
    function failure(error) { return { type: leaveConstants.SENDLEAVE_FAILURE, error }; }
}
function updateRequestedLeave(id) {
    return dispatch => {
        dispatch(request(id));
        console.log("request", id);
        leaveService.updateRequestedLeave(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    console.log("action", error);
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: leaveConstants.UPDATELEAVE_REQUEST }; }
    function success(LeaveScsMsg) { return { type: leaveConstants.UPDATELEAVE_SUCCESS, LeaveScsMsg }; }
    function failure(error) { return { type: leaveConstants.UPDATELEAVE_FAILURE, error }; }
}
function editLeaveRequest(id) {
    return dispatch => {
        dispatch(request());
        leaveService.editLeaveRequest(id)
            .then(
                EditList => {
                    dispatch(success(EditList));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: leaveConstants.EDITLEAVE_REQUEST }; }
    function success(EditList) { return { type: leaveConstants.EDITLEAVE_SUCCESS, EditList }; }
    function failure(error) { return { type: leaveConstants.EDITLEAVE_FAILURE, error }; }
}
function deleteSendLeaveRequest(id) {

    return dispatch => {
        dispatch(request(id));
        leaveService.deleteSendLeaveRequest(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {

                    dispatch(failure(error));
                }

            );


    };

    function request() { return { type: leaveConstants.DELETELEAVE_REQUEST }; }
    function success(success) { return { type: leaveConstants.DELETELEAVE_SUCCESS, success }; }
    function failure(error) { return { type: leaveConstants.DELETELEAVE_FAILURE, error }; }
}
function updateRequestedLeaveStatus(id) {
    return dispatch => {
        dispatch(request(id));
        leaveService.updateRequestedLeaveStatus(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: leaveConstants.STATUSUPDATELEAVE_REQUEST }; }
    function success(ApproveScsMsg) { return { type: leaveConstants.STATUSUPDATELEAVE_SUCCESS, ApproveScsMsg }; }
    function failure(error) { return { type: leaveConstants.STATUSUPDATELEAVE_FAILURE, error }; }
}
function checkCasualLeaves(id) {
    return dispatch => {
        dispatch(request(id));
        leaveService.checkCasualLeaves(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: leaveConstants.CHECKCASUAL_LEAVES_REQUEST }; }
    function success(CLeavecount) { return { type: leaveConstants.CHECKCASUAL_LEAVES_SUCCESS, CLeavecount }; }
    function failure(error) { return { type: leaveConstants.CHECKCASUAL_LEAVES_FAILURE, error }; }
}
function checkSickLeaves(id) {
    return dispatch => {
        dispatch(request(id));
        leaveService.checkSickLeaves(id)
            .then(
                user => {

                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: leaveConstants.CHECKSICK_LEAVES_REQUEST }; }
    function success(SLeaveData) { return { type: leaveConstants.CHECKSICK_LEAVES_SUCCESS, SLeaveData }; }
    function failure(error) { return { type: leaveConstants.CHECKSICK_LEAVES_FAILURE, error }; }
}
function checkUnpaidLeave(id) {
    return dispatch => {
        dispatch(request(id));
        leaveService.checkUnpaidLeave(id)
            .then(
                user => {

                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: leaveConstants.CHECKUNPAID_LEAVES_REQUEST }; }
    function success(UnpaidLeaveData) { return { type: leaveConstants.CHECKUNPAID_LEAVES_SUCCESS, UnpaidLeaveData }; }
    function failure(error) { return { type: leaveConstants.CHECKUNPAID_LEAVES_FAILURE, error }; }
}


function pendingLeaveRequestCount(data) {
    return dispatch => {
        dispatch(request(data));
        leaveService.pendingLeaveRequestCount(data)
            .then(
                count => {
                    dispatch(success(count));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: leaveConstants.PENDINGLEAVE_REQUEST }; }
    function success(count) { return { type: leaveConstants.PENDINGLEAVE_SUCCESS, count }; }
    function failure(error) { return { type: leaveConstants.PENDINGLEAVE_FAILURE, error }; }
}

function pendingLeaveRequestWithSelfCount(data) {
    return dispatch => {
        dispatch(request(data));
        leaveService.pendingLeaveRequestWithSelfCount(data)
            .then(
                count => {
                    dispatch(success(count));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: leaveConstants.PENDINGSTEAMLEAVE_REQUEST }; }
    function success(count) { return { type: leaveConstants.PENDINGSTEAMLEAVE_SUCCESS, count }; }
    function failure(error) { return { type: leaveConstants.PENDINGSTEAMLEAVE_FAILURE, error }; }
}

