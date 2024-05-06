import { dashboardConstants } from "../constants";
import { dashboardService } from "../services";
export const dashboardActions = {
    getOnLeaveList,
    getWorkAnniversaryList,
    getBirthdayList
};
function getOnLeaveList(search) {
    return dispatch => {
        dispatch(request());
        dashboardService.getOnLeaveList(search)
            .then(
                onLeaveList => dispatch(success(onLeaveList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dashboardConstants.GETONLEAVELIST_REQUEST }; }
    function success(onLeaveList) { return { type: dashboardConstants.GETONLEAVELIST_SUCCESS, onLeaveList }; }
    function failure(error) { return { type: dashboardConstants.GETONLEAVELIST_FAILURE, error }; }
}
function getWorkAnniversaryList(search) {
    return dispatch => {
        dispatch(request());
        dashboardService.getWorkAnniversaryList(search)
            .then(
                anniversaryList => dispatch(success(anniversaryList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dashboardConstants.GETANNIVERSARYLIST_REQUEST }; }
    function success(anniversaryList) { return { type: dashboardConstants.GETANNIVERSARYLIST_SUCCESS, anniversaryList }; }
    function failure(error) { return { type: dashboardConstants.GETANNIVERSARYLIST_FAILURE, error }; }
}
function getBirthdayList(search) {
    return dispatch => {
        dispatch(request());
        dashboardService.getBirthdayList(search)
            .then(
                birthDayList => dispatch(success(birthDayList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dashboardConstants.GETBIRTHDAYLIST_REQUEST }; }
    function success(birthDayList) { return { type: dashboardConstants.GETBIRTHDAYLIST_SUCCESS, birthDayList }; }
    function failure(error) { return { type: dashboardConstants.GETBIRTHDAYLIST_FAILURE, error }; }
}
