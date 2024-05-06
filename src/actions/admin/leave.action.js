import { adminLeaveConstants } from "../../constants";
import { adminLeaveService } from "../../services";

export const adminLeaveActions = {
    getLeavesList,
    getLeavesRequestsList,
    sendLeaveRequest,
    updateRequestedLeave,
    editLeaveRequest,
    deleteSendLeaveRequest,
    updateRequestedLeaveStatus,
    checkCasualLeaves,
    checkSickLeaves,
    pendingLeaveRequestCount,
    getLeavesCountUsingUserId
   
};
function getLeavesList(search) {
    // console.log("action",search);
    return dispatch => {
        dispatch(request(search));
        adminLeaveService.getLeavesList(search)
            .then(
                LeaveList => dispatch(success(LeaveList)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {
            type: adminLeaveConstants.GETLEAVELIST_REQUEST,
        };
    }
    function success(LeaveList) { return { type: adminLeaveConstants.GETLEAVELIST_SUCCESS, LeaveList }; }
    function failure(error) { return { type: adminLeaveConstants.GETLEAVELIST_FAILURE, error }; }
}
function getLeavesRequestsList(data) {
    // console.log("action",search);
    return dispatch => {
        dispatch(request(data));
        adminLeaveService.getLeavesRequestsList(data)
            .then(
                LeaveList =>dispatch(success(LeaveList)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: adminLeaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_REQUEST};}
    function success(LeavesRequestsList) { return { type: adminLeaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_SUCCESS, LeavesRequestsList }; }
    function failure(error) { return { type: adminLeaveConstants.GETLEAVELIST_REQUESTLIST_REQUEST_FAILURE, error }; }
}

function sendLeaveRequest(user) {
    return dispatch => {
        dispatch(request(user));
        adminLeaveService.sendLeaveRequest(user)
            .then(
                LeaveList => {
                    dispatch(success(LeaveList));
                },
                error => {
                    dispatch(failure(error));
                }

            );
    };

    function request() { return { type: adminLeaveConstants.SENDLEAVE_REQUEST }; }
    function success(ScsMsg) { return { type: adminLeaveConstants.SENDLEAVE_SUCCESS, ScsMsg }; }
    function failure(error) { return { type: adminLeaveConstants.SENDLEAVE_FAILURE, error }; }
}
function updateRequestedLeave(id) {
    return dispatch => {
        dispatch(request(id));
        console.log("request",id);
        adminLeaveService.updateRequestedLeave(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    console.log("action",error);
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: adminLeaveConstants.UPDATELEAVE_REQUEST }; }
    function success(LeaveScsMsg) { return { type: adminLeaveConstants.UPDATELEAVE_SUCCESS, LeaveScsMsg }; }
    function failure(error) { return { type: adminLeaveConstants.UPDATELEAVE_FAILURE, error }; }
}
function editLeaveRequest(id) {
    return dispatch => {
        dispatch(request());
        adminLeaveService.editLeaveRequest(id)
            .then(
                EditList => {
                    dispatch(success(EditList));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: adminLeaveConstants.EDITLEAVE_REQUEST }; }
    function success(EditList) { return { type: adminLeaveConstants.EDITLEAVE_SUCCESS, EditList }; }
    function failure(error) { return { type: adminLeaveConstants.EDITLEAVE_FAILURE, error }; }
}
function deleteSendLeaveRequest(id) {

    return dispatch => {
        dispatch(request(id));
        adminLeaveService.deleteSendLeaveRequest(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {

                    dispatch(failure(error));
                }

            );


    };

    function request() { return { type: adminLeaveConstants.DELETELEAVE_REQUEST }; }
    function success(success) { return { type: adminLeaveConstants.DELETELEAVE_SUCCESS, success }; }
    function failure(error) { return { type: adminLeaveConstants.DELETELEAVE_FAILURE, error }; }
}
function updateRequestedLeaveStatus(id) {
    return dispatch => {
        dispatch(request(id));
        adminLeaveService.updateRequestedLeaveStatus(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: adminLeaveConstants.STATUSUPDATELEAVE_REQUEST }; }
    function success(ApproveScsMsg) { return { type: adminLeaveConstants.STATUSUPDATELEAVE_SUCCESS, ApproveScsMsg }; }
    function failure(error) { return { type: adminLeaveConstants.STATUSUPDATELEAVE_FAILURE, error }; }
}
function checkCasualLeaves(id) {
    return dispatch => {
        dispatch(request(id));
        adminLeaveService.checkCasualLeaves(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: adminLeaveConstants.CHECKCASUAL_LEAVES_REQUEST }; }
    function success(CLeavecount) { return { type: adminLeaveConstants.CHECKCASUAL_LEAVES_SUCCESS, CLeavecount }; }
    function failure(error) { return { type: adminLeaveConstants.CHECKCASUAL_LEAVES_FAILURE, error }; }
}
function checkSickLeaves(id) {
    return dispatch => {
        dispatch(request(id));
        adminLeaveService.checkSickLeaves(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: adminLeaveConstants.CHECKSICK_LEAVES_REQUEST }; }
    function success(SLeaveData) { return { type: adminLeaveConstants.CHECKSICK_LEAVES_SUCCESS, SLeaveData }; }
    function failure(error) { return { type: adminLeaveConstants.CHECKSICK_LEAVES_FAILURE, error }; }
}


function pendingLeaveRequestCount(data) {
    return dispatch => {
        dispatch(request(data));
        adminLeaveService.pendingLeaveRequestCount(data)
            .then(
                count => {
                    dispatch(success(count));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: adminLeaveConstants.PENDINGLEAVE_REQUEST }; }
    function success(count) { return { type: adminLeaveConstants.PENDINGLEAVE_SUCCESS, count }; }
    function failure(error) { return { type: adminLeaveConstants.PENDINGLEAVE_FAILURE, error }; }
}

function getLeavesCountUsingUserId(data) {
    return dispatch => {
        dispatch(request(data));
        adminLeaveService.getLeavesCountUsingUserId(data)
            .then(
                count => {
                    dispatch(success(count));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: adminLeaveConstants.PENDINGLEAVECOUNTBYUSERID_REQUEST }; }
    function success(count) { return { type: adminLeaveConstants.PENDINGLEAVECOUNTBYUSERID_SUCCESS, count }; }
    function failure(error) { return { type: adminLeaveConstants.PENDINGLEAVECOUNTBYUSERID_FAILURE, error }; }
}
