import { authHeader } from "../../helpers";
import { APIURL } from "../../constants/config";

export const holidayService = {
    getHolidayList,
    saveHoliday ,
    editHoliday,
    updateHolidays,
    deleteUser,
    filterHolidayList
};

function getHolidayList(search) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(search)
    };

    return fetch(APIURL+"holidays/getHolidayList", requestOptions).then(handleResponse)
        .then(usersList => {
            return usersList;
        });
}

function editHoliday(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    return fetch(APIURL+`holidays/editHoliday/${id}`, requestOptions).then(handleResponse);
   


}
function saveHoliday(userInfo) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
    };

    return fetch(APIURL+"holidays/saveHoliday", requestOptions).then(handleResponse);
}
function updateHolidays(userInfo) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
      
    };
    return fetch(APIURL+"holidays/updateHoliday", requestOptions).then(handleResponse);
}
function deleteUser(id) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id)
    };

    return fetch(APIURL+"holidays/deleteHoliday", requestOptions).then(handleResponse);
}
function filterHolidayList(userInfo) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(),"Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
    };

    return fetch(APIURL+"holidays/getHolidayAccordingToDate", requestOptions).then(handleResponse);
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