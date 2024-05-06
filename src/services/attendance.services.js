import { authHeader } from "../helpers";
import { APIURL } from "../constants/config";

export const attendanceService = {
    getAttendanceList,
    clockInOut,
    checkClock,
    getByDate,
    regularize,
    checkRegularize
   
};

function getAttendanceList(search) {
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

function regularize(userId) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(userId)
    };

    return fetch(APIURL+"attendance/saveRequest", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}

function checkRegularize(userId) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(userId)
    };

    return fetch(APIURL+"attendance/checkPreviousRequestStatus", requestOptions)
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
                const error = (data && data.data.errors) || response.statusText ;
                return Promise.reject(error);
            }

            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        }

        return data;
    });
}