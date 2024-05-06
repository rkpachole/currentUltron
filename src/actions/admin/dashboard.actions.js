import { adminDashboardConstants } from "../../constants";
import { adminDashboardService } from "../../services";
export const adminDashboardActions = {
    getOnLeaveList,
    getWorkAnniversaryList,
    getBirthdayList
};
function getOnLeaveList(search) {
    return dispatch => {
        dispatch(request());
        adminDashboardService.getOnLeaveList(search)
            .then(
                onLeaveList => dispatch(success(onLeaveList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminDashboardConstants.GETONLEAVELIST_REQUEST }; }
    function success(onLeaveList) { return { type: adminDashboardConstants.GETONLEAVELIST_SUCCESS, onLeaveList }; }
    function failure(error) { return { type: adminDashboardConstants.GETONLEAVELIST_FAILURE, error }; }
}
function getWorkAnniversaryList(search) {
    return dispatch => {
        dispatch(request());
        adminDashboardService.getWorkAnniversaryList(search)
            .then(
                anniversaryList => dispatch(success(anniversaryList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminDashboardConstants.GETANNIVERSARYLIST_REQUEST }; }
    function success(anniversaryList) { return { type: adminDashboardConstants.GETANNIVERSARYLIST_SUCCESS, anniversaryList }; }
    function failure(error) { return { type: adminDashboardConstants.GETANNIVERSARYLIST_FAILURE, error }; }
}
function getBirthdayList(search) {
    return dispatch => {
        dispatch(request());
        adminDashboardService.getBirthdayList(search)
            .then(
                birthDayList => dispatch(success(birthDayList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: adminDashboardConstants.GETBIRTHDAYLIST_REQUEST }; }
    function success(birthDayList) { return { type: adminDashboardConstants.GETBIRTHDAYLIST_SUCCESS, birthDayList }; }
    function failure(error) { return { type: adminDashboardConstants.GETBIRTHDAYLIST_FAILURE, error }; }
}
