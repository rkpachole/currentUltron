import { userConstants } from "../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user, error: null, msg: null } : { loggedIn: false, user: null, error: null, msg: null };

export function authentication(state = initialState, action) {
    switch (action.type) {
    case userConstants.LOGIN_REQUEST:
        return {
            loggingIn: true,
            user: action.user,
        };
    case userConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.user,
        };
    case userConstants.LOGIN_FAILURE:
        return {
            loggingIn: false,
            error: action.error
        };
    case userConstants.LOGOUT:
        return {
            loggedIn: false,
            user: null,
            error: null
        };
    case userConstants.FORGOTPASSWORD_REQUEST:
        return {
            loading: true
        };
    case userConstants.FORGOTPASSWORD_SUCCESS:
        return {
            msg: action.msg,
            resetForm:true,
            redirectLogin:true
        };
    case userConstants.FORGOTPASSWORD_FAILURE:
        return {
            error: action.error
        };
    default:
        return state;
    }
}