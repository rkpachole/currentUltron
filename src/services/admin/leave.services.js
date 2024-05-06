import { authHeader } from "../../helpers";
import { APIURL } from "../../constants/config";

export const adminLeaveService = {
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
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(search)
    };

    return fetch(APIURL+"leaves/getLeaves", requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}
function getLeavesRequestsList(data) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return fetch(APIURL+"admin/leaves/getAll", requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}
function sendLeaveRequest(user) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    return fetch(APIURL+"leaves/sendLeaveRequest", requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}
function updateRequestedLeave(id) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(id)
    };

    return fetch(APIURL+"leaves/updateSendLeaveRequest", requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}
function updateRequestedLeaveStatus(user) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    return fetch(APIURL+"leaves/updateRequestedLeaveStatus", requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}
function editLeaveRequest(id) {
    const requestOptions = {
        method: "GET",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify()
    };

    return fetch(APIURL+"leaves/editSendLeaveRequest/"+id, requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}
// function editLeaveRequest(id) {
//     const requestOptions = {
//         method: "GET",
//         headers: authHeader()
//     };
//     return fetch(APIURL+"leaves/editSendLeaveRequest/"+id, requestOptions).then(handleResponse);
// }
function deleteSendLeaveRequest(user) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    return fetch(APIURL+"leaves/deleteSendLeaveRequest", requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}
function checkCasualLeaves(user) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    return fetch(APIURL+"leaves/getCasualLeaveCount", requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}
function checkSickLeaves(user) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    return fetch(APIURL+"leaves/getSickLeaveCount", requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}

function pendingLeaveRequestCount(user) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    return fetch(APIURL+"admin/leaves/getLeavesCount", requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}

function getLeavesCountUsingUserId(user) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    return fetch(APIURL+"leaves/getLeavesCountUsingUserId", requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
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