import {adminRegularizationConstants } from "../../constants";
import {adminRegularizationService } from "../../services";

export const adminRegularizaActions = {
    getPendingRequests,
    updateRequestStatus,
    getAttendanceDetail,

};



function getPendingRequests(search) {
    // console.log("_id", search);
    return dispatch => {
        dispatch(request(search));

        adminRegularizationService.getPendingRequests(search)

            .then(
                user => {

                    dispatch(success(user));
                },
                error => {

                    dispatch(failure(error));
                }

            );


    };

    function request() { return { type: adminRegularizationConstants.PENDINGREQUEST_REQUEST }; }
    function success(pendingList) { return { type: adminRegularizationConstants.PENDINGREQUEST_SUCCESS, pendingList }; }
    function failure(error) { return { type: adminRegularizationConstants.PENDINGREQUEST_FAILURE, error }; }
}
function updateRequestStatus(id) {

    return dispatch => {
        dispatch(request(id));

        adminRegularizationService.updateRequestStatus(id)

            .then(
                user => {
                   
                    dispatch(success(user));
                },
                error => {

                    dispatch(failure(error));
                }

            );


    };

    function request() { return { type: adminRegularizationConstants.UPDATEREGULARIZATION_REQUEST }; }
    function success(updateList) { return { type: adminRegularizationConstants.UPDATEREGULARIZATION_SUCCESS, updateList }; }
    function failure(error) { return { type: adminRegularizationConstants.UPDATEREGULARIZATION_FAILURE, error }; }
}
function getAttendanceDetail(search) {
    return dispatch => {
        dispatch(request());
        adminRegularizationService.getAttendanceDetail(search)
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

    function request() { return { type: adminRegularizationConstants.GETATTENDANCEDETAIL_REQUEST }; }
    function success(getAllAttendanceDetail) { return { type: adminRegularizationConstants.GETATTENDANCEDETAIL_SUCCESS, getAllAttendanceDetail }; }
    function failure(error) { return { type: adminRegularizationConstants.GETATTENDANCEDETAIL_FAILURE, error }; }
}