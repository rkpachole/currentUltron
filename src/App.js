import React, { Component } from "react";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/style.css";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home/Index";
import Varify from "./components/Home/Varify";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AdminDashboard from "./components/Users/Admin/Dashboard/Index";
import AdminUsers from "./components/Users/Admin/Users/Index";
import AdminAttendance from "./components/Users/Admin/Attendance/Index";
import AdminLeave from "./components/Users/Admin/Leave/Index";
import AdminSetting from "./components/Users/Admin/Setting/User/Index";
import Departments from "./components/Users/Admin/Setting/Department/Index";
import AdminEmployeeRequests from "./components/Users/Admin/Regularization/Index";
import AdminLeaveRequest from "./components/Users/Admin/LeaveRequest/Index";
import AdminHolidays from "./components/Users/Admin/Holiday/Index";
import AdminSalary from "./components/Users/Admin/Salary/Index";

import EmployeeDashboard from "./components/Users/Employee/Dashboard/Index";
import EmployeeAttendance from "./components/Users/Employee/Attendance/Index";
import EmployeeRequests from "./components/Users/Employee/Regularization/Index";
// import EmployeeSetting from "./components/Users/Employee/Setting/User/Index";
import EmployeeLeave from "./components/Users/Employee/Leave/Index";
// import ChangePassword from "./components/Users/Employee/User/ChangePassword";
// import EditProfile from "./components/Users/Employee/User/EditProfile";
import AdminEditProfile from "./components/Users/Admin/Setting/Profile/Index";
import AdminChangePassword from "./components/Users/Admin/Setting/ChangePassword/Index";
import ChangePassword from "./components/Users/Employee/Setting/ChangePassword/Index";
import EditProfile from "./components/Users/Employee/Setting/Profile/Index";
import Date from "./components/Users/Employee/Date/Index";
import LeaveRequest from "./components/Users/Employee/LeaveRequest/Index";
import LeaveReject from "./components/Users/Employee/LeaveReject/Index";



import { history } from "./helpers";
import { alertActions } from "./actions";



class App extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            console.log(location, action);
            dispatch(alertActions.clear());
        });
    }

    render() {
        //const login = localStorage.getItem("isLoggedIn");
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/forgot-password" component={ForgotPassword} />
                        <Route exact path="/password/reset/:token" component={ResetPassword} />
                        <Route path="/user/verify/:id/:token" component={Varify} />
                        <Route exact path="/admin/dashboard" component={AdminDashboard} />
                        <Route exact path="/admin/attendance" component={AdminAttendance} />
                        <Route exact path="/admin/leaves" component={AdminLeave} />
                        <Route exact path="/admin/settings/users" component={AdminSetting} />
                        <Route exact path="/admin/users" component={AdminUsers} />
                        <Route exact path="/admin/settings/department" component={Departments} />
                        <Route exact path="/admin/edit-profile" component={AdminEditProfile} />
                        <Route exact path="/admin/change-password" component={AdminChangePassword} />
                        <Route exact path="/admin/regularization" component={AdminEmployeeRequests} />
                        <Route exact path="/admin/leave-request" component={AdminLeaveRequest} />
                        <Route exact path="/admin/holidays" component={AdminHolidays} />
                        <Route exact path="/admin/payslip" component={AdminSalary} />


                        <Route exact path="/employee/dashboard" component={EmployeeDashboard} />
                        <Route exact path="/employee/attendance" component={EmployeeAttendance} />
                        <Route exact path="/employee/regularization" component={EmployeeRequests} />
                        {/* <Route exact path="/employee/settings/users" component={EmployeeSetting} /> */}
                        <Route exact path="/employee/leaves" component={EmployeeLeave} />
                        <Route path="/employee/change-password" component={ChangePassword} />
                        <Route path="/employee/edit-profile" component={EditProfile} />
                        <Route exact path="/employee/date" component={Date} />
                        <Route exact path="/employee/leave-request" component={LeaveRequest} />
                        <Route exact path="/employee/leaves-rejected" component={LeaveReject} />

                    </div>
                </Router>
            </div>
        );
    }
}

export default connect()(App);