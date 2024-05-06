import { reportConstants } from "../constants";
import { reportService } from "../services";

export const reportActions = {
    getreportList,
};
function getreportList(search) {
    return dispatch => {
        dispatch(request());
        reportService.getreportList(search)
            .then(
                reportList => dispatch(success(reportList)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: reportConstants.GETREPORTINGLIST_REQUEST }; }
    function success(reportList) { return { type: reportConstants.GETREPORTINGLIST_SUCCESS, reportList }; }
    function failure(error) { return { type: reportConstants.GETREPORTINGLIST_FAILURE, error }; }
}

