import { authHeader } from "../helpers";
import { APIURL } from "../constants/config";

export const userService = {
    login,
    logout,
    forgotPassword,
    resetUserPassword,
    resetPassword,
    addUser,
    getUsersList,
    getById,
    update,
    deleteUser,
    getUserListForReporting,
    getReportingList
};

function login(email, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    };

    return fetch(APIURL+"auth/doSignin", requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("user", JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    //return loggedOut;
}

function forgotPassword(email) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email})
    };

    return fetch(APIURL+"password/reset", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}

function resetPassword(resetPassword) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetPassword)
    };

    return fetch(APIURL+"password/reset/update", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}

function resetUserPassword(resetPassword) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetPassword)
    };

    return fetch(APIURL+"users/changePassword", requestOptions)
        .then(handleResponse)
        .then(msg => {
            return msg;
        });
}

function getUsersList(search) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(search)
    };

    return fetch(APIURL+"users/getUsers", requestOptions).then(handleResponse)
        .then(usersList => {
            return usersList;
        });
}

function getById(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    return fetch(APIURL+`employees/editUser/${id}`, requestOptions).then(handleResponse);
}

function addUser(userInfo) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
    };

    return fetch(APIURL+"users/saveUsers", requestOptions).then(handleResponse);
}

function update(user) {
    console.log("serviceUpdate",user);
   
    const requestOptions = {
        method:"POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user),
        
    };

    return fetch(APIURL+"employees/updateUsers", requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id)
    };

    return fetch(APIURL+"users/deleteUsers", requestOptions).then(handleResponse);
}

function getUserListForReporting(search) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(search)
    };

    return fetch(APIURL+"users/getUserListForReporting", requestOptions).then(handleResponse)
        .then(UserListForReporting => {
            return UserListForReporting;
        });
}

function getReportingList(reportTo) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportTo)
    };

    return fetch(APIURL+"users/getUserDropDownForAttendancePage", requestOptions).then(handleResponse)
        .then(ReportingList => {
            return ReportingList;
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