import { holidayConstants } from "../../constants";
import { holidayService } from "../../services";

export const HoliDayActions = {
    getHolidayList,
    saveHoliday,
    editHoliday,
    updateHolidays,
    delete: _delete,
    filterHolidayList
};

function getHolidayList(search) {
    return dispatch => {
        dispatch(request());
        holidayService.getHolidayList(search)
            .then(
                holidaysList => {
                    (dispatch(success(holidaysList)));
                    console.log("action", holidaysList);
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: holidayConstants.GETALLHOLIDAYSS_REQUEST }; }
    function success(holidaysList) { return { type: holidayConstants.GETALLHOLIDAYSS_SUCCESS, holidaysList }; }
    function failure(error) { return { type: holidayConstants.GETALLHOLIDAYSS_FAILURE, error }; }
}
function saveHoliday(userInfo) {
    return dispatch => {
        dispatch(request());
        holidayService.saveHoliday(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: holidayConstants.HOLIDAYSADD_REQUEST }; }
    function success(userInfo) { return { type: holidayConstants.HOLIDAYSADD_SUCCESS, userInfo }; }
    function failure(error) { return { type: holidayConstants.HOLIDAYSADD_FAILURE, error }; }
}

function editHoliday(id) {
    return dispatch => {
        dispatch(request(id));

        holidayService.editHoliday(id)
            .then(
                holidays => dispatch(success(holidays)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: holidayConstants.HOLIDAYSEDIT_REQUEST, id }; }
    function success(holidays) { return { type: holidayConstants.HOLIDAYSEDIT_SUCCESS, holidays }; }
    function failure(error) { return { type: holidayConstants.HOLIDAYSEDIT_FAILURE, error }; }
}
function updateHolidays(userInfo) {
    return dispatch => {
        dispatch(request());
        holidayService.updateHolidays(userInfo)

            .then(
                userInfo => {

                    dispatch(success(userInfo));
                },
                error => {
                    console.log(failure(error));
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: holidayConstants.HOLIDAYSUPDATE_REQUEST, }; }
    function success(userInfo) { return { type: holidayConstants.HOLIDAYSUPDATE_SUCCESS, userInfo }; }
    function failure(error) { return { type: holidayConstants.HOLIDAYSUPDATE_FAILURE, error }; }
}
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        holidayService.deleteUser(id)
            .then(
                holidaysList => {
                    dispatch(success(holidaysList));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(id) { return { type: holidayConstants.DELETE_REQUEST, id }; }
    function success(holidaysList) { return { type: holidayConstants.DELETE_SUCCESS, holidaysList }; }
    function failure(error) { return { type: holidayConstants.DELETE_FAILURE, id, error }; }
}
function filterHolidayList(userInfo) {
    return dispatch => {
        dispatch(request());
        holidayService.filterHolidayList(userInfo)

            .then(
                userInfo => {
                    dispatch(success(userInfo));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: holidayConstants.FILTERHOLIDAY_REQUEST, }; }
    function success(userInfo) { return { type: holidayConstants.FILTERHOLIDAY_SUCCESS, userInfo }; }
    function failure(error) { return { type: holidayConstants.FILTERHOLIDAY_FAILURE, error }; }
} 