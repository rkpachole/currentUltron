import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from ".";
import { history } from "../helpers";

export const authActions = {
    login,
    logout,
    forgotPassword,
    resetPassword
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    if (user.data.user_role === "Admin") {
                        history.push("/admin/dashboard");
                    }
                    if (user.data.user_role === "Employee") {
                        history.push("/employee/dashboard");
                    }
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
}

function logout() {
    userService.logout();
    //     .then(
    //         loggedOut => {
    //             history.push("/");
    //         }
    //     );
    history.push("/");
    return { type: userConstants.LOGOUT };
}

function forgotPassword(email) {
    return dispatch => {
        dispatch(request({ email }));

        userService.forgotPassword(email)
            .then(
                msg => {
                    dispatch(success(msg));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(email) { return { type: userConstants.FORGOTPASSWORD_REQUEST, email }; }
    function success(msg) { return { type: userConstants.FORGOTPASSWORD_SUCCESS, msg }; }
    function failure(error) { return { type: userConstants.FORGOTPASSWORD_FAILURE, error }; }
}

function resetPassword(resetPassword) {
    return dispatch => {
        dispatch(request({ resetPassword }));

        userService.resetPassword(resetPassword)
            .then(
                msg => {
                    dispatch(success(msg));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(email) { return { type: userConstants.FORGOTPASSWORD_REQUEST, email }; }
    function success(msg) { return { type: userConstants.FORGOTPASSWORD_SUCCESS, msg }; }
    function failure(error) { return { type: userConstants.FORGOTPASSWORD_FAILURE, error }; }
}