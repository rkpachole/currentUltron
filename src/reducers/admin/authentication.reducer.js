import {adminUserConstants } from "../../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user, error: null, msg: null } : { loggedIn: false, user: null, error: null, msg: null };

export function adminAuthentication(state = initialState, action) {
    switch (action.type) {
    case adminUserConstants.LOGIN_REQUEST:
        return {
            loggingIn: true,
            user: action.user,
        };
    case adminUserConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.user,
        };
    case adminUserConstants.LOGIN_FAILURE:
        return {
            loggingIn: false,
            error: action.error
        };
    case adminUserConstants.LOGOUT:
        return {
            loggedIn: false,
            user: null,
            error: null
        };
    case adminUserConstants.FORGOTPASSWORD_REQUEST:
        return {
            loading: true
        };
    case adminUserConstants.FORGOTPASSWORD_SUCCESS:
        return {
            msg: action.msg,
            resetForm:true,
            redirectLogin:true
        };
    case adminUserConstants.FORGOTPASSWORD_FAILURE:
        return {
            error: action.error
        };
    default:
        return state;
    }
}