import { combineReducers } from "redux";
import { users } from "./user.reducer";
import { departments } from "./department.reducer";
import { authentication } from "./authentication.reducer";
import { attendances } from "./attendance.reducer";
import { regularization } from "./regularization.reducer";
import { leaves } from "./leave.reducer";
import { adminRegularization } from "./admin/regularization.reducer";
import { adminLeaves} from "./admin/leave.reducer";
import {adminAttendances} from "./admin/attendance.reducer";
import {adminUsers} from "./admin/user.reducer";
import {adminAuthentication} from "./admin/authentication.reducer";
import {holidays} from "./admin/holiday.reducer";
import {dashboard}  from "./dashboard.reducer";
import {adminDashboard} from "./admin/dashboard.reducer";
import {report} from "./report.reducer";



const rootReducer = combineReducers({
    authentication,
    users,
    departments,
    attendances,
    regularization,
    leaves,
    adminRegularization,
    adminLeaves,
    adminAttendances,
    adminUsers,
    adminAuthentication,
    holidays,
    dashboard,
    adminDashboard,
    report
});

export default rootReducer;