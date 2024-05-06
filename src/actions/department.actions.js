import { departmentConstants } from "../constants";
import { departmentService } from "../services";

export const departmentActions = {
    getDepartmentList,
};
function getDepartmentList(search) {
    return dispatch => {
        dispatch(request());
        departmentService.getDepartmentList(search)
            .then(
                departmentList => dispatch(success(departmentList)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: departmentConstants.GETALLDEPARTMENTS_REQUEST }; }
    function success(departmentList) { return { type: departmentConstants.GETALLDEPARTMENTS_SUCCESS, departmentList }; }
    function failure(error) { return { type: departmentConstants.GETALLDEPARTMENTS_FAILURE, error }; }
}

