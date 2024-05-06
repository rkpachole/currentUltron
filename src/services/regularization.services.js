import { authHeader } from "../helpers";
import { APIURL } from "../constants/config";

export const regularizationService = {
    getRegularizationList,
    clockInOut,
    checkClock,
    getByDate,
    getPendingRequests,
    updateRequestStatus,
    getAttendanceDetail,
    getPendingRegularizationCount
};

function getRegularizationList(search) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(search)
    };

    return fetch(APIURL+"attendance/getAttendanceList", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}

function clockInOut(resetPassword) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(resetPassword)
    };

    return fetch(APIURL+"attendance/userClockInAndOut", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}

function checkClock(resetPassword) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(resetPassword)
    };

    return fetch(APIURL+"attendance/checkUserClockIn", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}

function getByDate(resetPassword) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(resetPassword)
    };

    return fetch(APIURL+"users/changePassword", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}
function getPendingRequests(search) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(search)
    };

    return fetch(APIURL+"attendance/getPendingRequests", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}


function updateRequestStatus(id) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(id)
    };

    return fetch(APIURL+"attendance/updateRequestStatus", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}
function getAttendanceDetail(id) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(id)
    };

    return fetch(APIURL+"attendance/getAttendanceDetail", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}

function getPendingRegularizationCount(id) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(id)
    };

    return fetch(APIURL+"attendance/getRegularizeRequestCount", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        //const data = text;
        if (!response.ok) {
            if (response.status === 400) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
                const error = (data && data.data.errors) || response.statusText;
                return Promise.reject(error);
            }

            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        }

        return data;
    });
}