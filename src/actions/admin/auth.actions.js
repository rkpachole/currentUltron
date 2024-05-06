import { adminUserConstants } from "../../constants";
import {adminUserService } from "../../services";
import { alertActions } from "..";
import { history } from "../../helpers";

export const adminAuthActions = {
    login,
    logout,
    forgotPassword,
    resetPassword
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        adminUserService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    if (user.data.user_role === "Admin") {
                        history.push("/admin/attendance");
                    }
                    if (user.data.user_role === "Employee") {
                        history.push("/employee/attendance");
                    }
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: adminUserConstants.LOGIN_REQUEST, user }; }
    function success(user) { return { type: adminUserConstants.LOGIN_SUCCESS, user }; }
    function failure(error) { return { type: adminUserConstants.LOGIN_FAILURE, error }; }
}

function logout() {
    adminUserService.logout();
    //     .then(
    //         loggedOut => {
    //             history.push("/");
    //         }
    //     );
    history.push("/");
    return { type: adminUserConstants.LOGOUT };
}

function forgotPassword(email) {
    return dispatch => {
        dispatch(request({ email }));

        adminUserService.forgotPassword(email)
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

    function request(email) { return { type: adminUserConstants.FORGOTPASSWORD_REQUEST, email }; }
    function success(msg) { return { type: adminUserConstants.FORGOTPASSWORD_SUCCESS, msg }; }
    function failure(error) { return { type: adminUserConstants.FORGOTPASSWORD_FAILURE, error }; }
}

function resetPassword(resetPassword) {
    return dispatch => {
        dispatch(request({ resetPassword }));

        adminUserService.resetPassword(resetPassword)
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

    function request(email) { return { type: adminUserConstants.FORGOTPASSWORD_REQUEST, email }; }
    function success(msg) { return { type: adminUserConstants.FORGOTPASSWORD_SUCCESS, msg }; }
    function failure(error) { return { type: adminUserConstants.FORGOTPASSWORD_FAILURE, error }; }
}