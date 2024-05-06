import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../../../assets/images/logo.svg";
import Nprospect from "../../../../assets/images/nprospect.png";
import ToDoList from "../../../../assets/images/to-do-list.png";
import Rrequest from "../../../../assets/images/request.png";
import regularization from "../../../../assets/images/reg.png";
import Nsetting from "../../../../assets/images/nsetting.png";
import dashboard from "../../../../assets/images/ndashboard.png";
import { adminAuthActions, adminAttendanceActions, adminLeaveActions, regularizationActions } from "../../../../actions";
import dateFormat from "dateformat";
import socketClient from "socket.io-client";
import { APIURL } from "../../../../constants/config";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            timeDate: new Date(),
            clockStatus: "loading",
            leaveRequestPendingCount: 0,
            regularizationPendingCount: 0,
            pathname: window.location.pathname,

        };
        this.handleLogout = this.handleLogout.bind(this);
        this.timer = this.timer.bind(this);
    }

    getUserInitials(Name) {
        if (Name != "") {
            const initials = Name.charAt(0);
            return initials.toUpperCase();
        }
        else {
            return "";
        }

    }

    handleLogout(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(adminAuthActions.logout());
    }

    handleClockInOut() {
        this.setState({
            clockStatus: "loading"
        });
        this.props.dispatch(adminAttendanceActions.clockInOut({ userId: this.state.user.data._id }));
    }

    checkClock() {
        this.props.dispatch(adminAttendanceActions.checkClock({ userId: this.state.user.data._id }));
    }

    getClockStatus(data) {
        if (data.length < 1) {
            this.setState({
                clockStatus: "out"
            });
        }
        else {
            this.setState({
                clockStatus: "in"
            });
        }
    }

    timer() {
        this.setState({ timeDate: new Date() });
    }

    showClock(data) {

        var socket = socketClient(APIURL, { transports: ["websocket"] });
        socket.emit("attendance", data);

    }

    configureSocket = () => {
        var socket = socketClient(APIURL, { transports: ["websocket"] });
        socket.on("attendance", data => {
            if (this.state.user.data._id == data.userId) {
                this.checkClock();
            }
        });

        socket.on("leave", data => {
            console.log(data);
            this.getLeaveRequestPending();
        });

        socket.on("regularization", data => {
            console.log(data);
            this.getPendingRegularization();

        });
    };

    getLeaveRequestPending() {

        this.props.dispatch(adminLeaveActions.pendingLeaveRequestCount({ search: "" }));
    }

    getPendingRegularization() {
        this.props.dispatch(regularizationActions.getPendingRegularizationCount({ reportTo: this.state.user.data._id }));
    }

    setLeaveRequestPending(count) {
        this.setState({ leaveRequestPendingCount: count });
    }

    setRegularizationPending(count) {
        this.setState({ regularizationPendingCount: count });
    }

    componentDidMount() {
        this.checkClock();
        setInterval(this.timer, 1000);
        this.configureSocket();
        this.getLeaveRequestPending();
        this.getPendingRegularization();
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.checkClock != undefined) {
            this.getClockStatus(nextProps.checkClock);
            // console.log("clockInOut",nextProps.checkClock);
        }

        if (nextProps.clockInOut != undefined) {
            var data = { userId: this.state.user.data._id, name: this.state.user.data.first_name };
            this.showClock(data);
            //this.checkClock();
        }
        if (nextProps.adminPendingCount != undefined) {
            this.setLeaveRequestPending(nextProps.adminPendingCount);
        }

        if (nextProps.regularizationCount != undefined) {
            this.setRegularizationPending(nextProps.regularizationCount);
        }

    }


    render() {
        const { user, clockStatus } = this.state;
        // console.log(user.data.profileImage);
        return (
            <div>
                <aside className="nav-options">
                    <Link className="" to="/admin/attendance">
                        <Logo className="logo-sml" width="120" />
                    </Link>
                    <div className="navbar-collapse" id="navbarSupportedContent">
                        <ul>
                            <li><Link className={`${this.state.pathname.match("/admin/dashboard") ? "active" : ""}`} to="/admin/dashboard"><img src={dashboard} /> Dashboard</Link></li>
                            <li><Link className={`${this.state.pathname.match("/admin/attendance") ? "active" : ""}`} to="/admin/attendance"><img src={Nprospect} /> Attendance</Link></li>
                            <li><Link className={`${this.state.pathname.match("/admin/leaves") ? "active" : ""}`} to="/admin/leaves"><img src={ToDoList} /> Leaves {this.state.leaveRequestPendingCount > 0 && <span className="translate-middle badge rounded-pill nofication_badge">{this.state.leaveRequestPendingCount}</span>}</Link></li>
                            <li><Link className={`${this.state.pathname.match("/admin/settings/users") ? "active" : ""}`} to="/admin/settings/users"><img src={Nsetting} /> Organization</Link></li>
                            <li><Link className={`${this.state.pathname.match("/admin/regularization") ? "active" : ""}`} to="/admin/regularization"><img src={regularization} /> Regularization {this.state.regularizationPendingCount > 0 && <span className="translate-middle badge rounded-pill nofication_badge">{this.state.regularizationPendingCount}</span>}</Link></li>
                            <li><Link className={`${this.state.pathname.match("/admin/leave-request") ? "active" : ""}`} to="/admin/leave-request"><img src={Rrequest} />Leave Request {this.state.leaveRequestPendingCount > 0 && <span className="translate-middle badge rounded-pill nofication_badge">{this.state.leaveRequestPendingCount}</span>}</Link></li>
                            <li><Link className={`${this.state.pathname.match("/admin/payslip") ? "active" : ""}`} to="/admin/payslip"><img src={Rrequest} />Salary </Link></li>
                        </ul>
                    </div>
                </aside>

                <nav className="navbar navbar-expand-lg fixed-top">
                    <div className="navbar-logo">
                        <span className="subhead">

                            <span className="date-box">{this.state.timeDate.toLocaleTimeString()} <small>{dateFormat(this.state.timeDate, "ddd, dd mmmm  yyyy")}</small></span>
                            {clockStatus == "loading" &&
                                <a href="javascript:;" className="btn  ml-4" >Loading ...</a>
                            }
                            {clockStatus == "in" &&
                                <a href="javascript:;" onClick={() => this.handleClockInOut()} className="btn btn-danger ml-4">Punch-out </a>
                            }
                            {clockStatus == "out" &&
                                <a href="javascript:;" onClick={() => this.handleClockInOut()} className="btn in_btn ml-4">Punch-in </a>
                            }

                        </span>
                    </div>
                    <div className="my-2 my-lg-0">
                        <div className="ml-auto userinfo">
                            <div className="user-area dropdown">
                                <a className='icon__mg dropdown-toggle' href="" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user && user.data.profileImage != "" && user.data.profileImage != undefined ?
                                        // <img src={APIURL + "./assets/profileImages/" + user.data.profileImage} className="avtar" alt="Employee image" />
                                        <img src={user.data.profileImage.indexOf("data:image")>=0 ? user.data.profileImage:APIURL + "./assets/profileImages/" + user.data.profileImage} className="avtar" alt="Employee image" />
                                        :
                                        <div className="avtar">
                                            {this.getUserInitials(user.data.first_name) + this.getUserInitials(user.data.last_name)}
                                        </div>
                                    }
                                    
                                    
                                    <span className="hide-mobile">{user && user.data.first_name + " " + user.data.last_name}</span>
                                </a>

                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/admin/edit-profile">Edit Profile</Link>
                                    <Link className="dropdown-item" to="/admin/change-password">Change Password</Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="" onClick={this.handleLogout}>Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.rootReducer.adminAuthentication;
    const { user } = state.rootReducer.adminAuthentication;
    const { checkClock, clockInOut } = state.rootReducer.adminAttendances;

    const { adminPendingCount } = state.rootReducer.adminLeaves;
    const { regularizationCount } = state.rootReducer.regularization;

    return {
        loggingIn,
        user,
        checkClock,
        clockInOut,
        adminPendingCount,
        regularizationCount

    };
}

export default connect(mapStateToProps)(Navbar);
