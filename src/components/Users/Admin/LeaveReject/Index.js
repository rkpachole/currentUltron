import React, { Component } from "react";
import { connect } from "react-redux";
import {  Redirect } from "react-router-dom";
import Footer from "../../../GlobalComponents/Footer";
import Navbar from "../Layout/Navbar";
import { attendanceActions, userActions, leaveActions } from "../../../../actions";
import dateFormat from "dateformat";
import socketClient from "socket.io-client";
import { APIURL } from "../../../../constants/config";


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),

            allMonth: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            attendanceList: [],
            pendingList: [],
            filterUser: "",
            filterFromDate: "",
            filterToDate: "",
            selectedMonth: "",
            selectedYear: "",
            ReportingList: [],
            ReportingName: "",
            timeDate: new Date(),
            search: "",
            Modal: false,
            status: "",
            textAreaValue: "",
            rejectModal: false,
            leave_type: ""
        };
        this.handleReportUser = this.handleReportUser.bind(this);
    }
    approvalModal(id) {

        this.props.dispatch(leaveActions.updateRequestedLeaveStatus({ id: id, status: this.state.textAreaValue }

        ));
    }
    approvalRejectModal(id) {

        this.props.dispatch(leaveActions.updateRequestedLeaveStatus({ id: id, status: this.state.textAreaValue }

        ));
    }
    getLeavesList() {
        this.props.dispatch(leaveActions.getLeavesList({ userId: "", search: "", reportTo: this.state.filterUser, leaveStatusFilter:["reject"] }));
    }
    getAttendanceList() {
        this.props.dispatch(attendanceActions.getAttendanceList({ userId: this.state.filterUser, fromdate: this.state.filterFromDate, todate: this.state.filterToDate }));
    }

    showAttandanceList(data) {

        this.setState({
            attendanceList: data
        });
    }




    setMonth(setm) {
        this.handleSelectedMonth(setm);
        var firstDay = new Date(this.state.selectedYear, setm, 1);
        var lastDay = new Date(this.state.selectedYear, setm + 1, 0);

        let month = firstDay.getMonth() + 1;
        let year = firstDay.getFullYear();
        let date = firstDay.getDate();

        let lmonth = lastDay.getMonth() + 1;
        let lyear = lastDay.getFullYear();
        let ldate = lastDay.getDate();
        let separator = "-";
        const todayDate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
        const lastDate = `${lyear}${separator}${lmonth < 10 ? `0${lmonth}` : `${month}`}${separator}${ldate < 10 ? `0${ldate}` : `${ldate}`}`;

        // console.log(todayDate, lastDate);

        this.setState({
            filterFromDate: todayDate,
            filterToDate: lastDate,
            selectedMonth: firstDay.getMonth() + 1,
            selectedYear: firstDay.getFullYear()
        }, () => {
            this.getAttendanceList();
        });
    }
    handleSelectedMonth(Indexing) {
        this.setState({
            SelectedMonth: this.state.allMonth[Indexing]
        });
    }
    getToday() {
        let cdate = new Date();
        var firstDay = new Date(cdate.getFullYear(), cdate.getMonth(), 1);
        var lastDay = new Date(cdate.getFullYear(), cdate.getMonth() + 1, 0);

        let month = firstDay.getMonth() + 1;
        let year = firstDay.getFullYear();
        let date = firstDay.getDate();

        let lmonth = lastDay.getMonth() + 1;
        let lyear = lastDay.getFullYear();
        let ldate = lastDay.getDate();
        let separator = "-";
        const todayDate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
        const lastDate = `${lyear}${separator}${lmonth < 10 ? `0${lmonth}` : `${month}`}${separator}${ldate < 10 ? `0${ldate}` : `${ldate}`}`;

        // console.log(todayDate, lastDate);

        this.setState({
            filterUser: this.state.user.data._id,
            filterFromDate: todayDate,
            filterToDate: lastDate,
            selectedMonth: firstDay.getMonth() + 1,
            selectedYear: firstDay.getFullYear()
        }, () => { this.getAttendanceList(); });
    }
    getReportingList(searchString) {
        this.props.dispatch(userActions.getReportingList({ reportTo: searchString }));
    }
    handleReportUser(event) {
        const d = new Date();
        let month = d.getMonth();
        this.handleSelectedMonth(month);

        const { user } = this.state;
        let item = this.state.ReportingList;
        let selectedReportingItem = [];
        selectedReportingItem = item.filter(Result => Result.value == event.target.value);

        if (event.target.value === user.data._id) {
            this.setState({
                filterUser: event.target.value,
                ReportingName: user.data.first_name + " " + user.data.last_name
            }, () => {
                this.getAttendanceList();
            });
        } else {
            this.setState({
                filterUser: event.target.value,
                ReportingName: selectedReportingItem[0].label
            }, () => {
                this.getAttendanceList();
            });
        }
    }
    configureSocket = () => {
        var socket = socketClient(APIURL, { transports: ["websocket"] });
        socket.on("attendance", data => {
            if (this.state.filterUser == data.userId) {
                this.getAttendanceList();
            }
        });

    };

    componentDidMount() {

        const d = new Date();
        let month = d.getMonth();
        this.handleSelectedMonth(month);
        this.getToday();
        this.getReportingList(this.state.user.data._id);
        this.configureSocket();

        this.getLeavesList();

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.updateList) {
            this.setState({
                Modal: false
            }, () => {
                this.getLeavesList();
            });

        }
        if (nextProps.message) {
            this.setState({
                rejectModal: false,
            }, () => {
                this.getLeavesList();
            });
        }
        if (nextProps.attendanceList != undefined) {
            this.showAttandanceList(nextProps.attendanceList);
        }
        if (nextProps.ReportingList) {
            let item = nextProps.ReportingList;
            let reportList = [];
            for (var c = 0; c < item.length; c++) {
                reportList.push({ value: item[c]._id, label: item[c].first_name + " " + item[c].last_name });
            }
            this.setState({
                ReportingList: reportList
            });
        }
        if (nextProps.pendingList) {
            let getPendingRequests = nextProps.pendingList;

            this.setState({
                pendingList: getPendingRequests
            });
            // console.log(getPendingRequests);
        }


    }

    render() {
        const { LeaveList } = this.props;
        const { message } = this.props;
        // const { success } = this.props;
        console.log("LeaveList", LeaveList);
        // const { attendanceList } = this.state;
        // const { pendingList } = this.props;
        // const { updateList } = this.props;
        console.log("updateList", message);
        if (!this.state.user) {
            return <Redirect to="/" />;
        }

        if(this.state.user.data.user_role !== "Admin") {
            return <Redirect to="/" />;
        }


        return (
            <div>
                <Navbar activePage="dashboard" />
                <main className="offset">
                    <div className="container-fluid hard-pad">
                        <div className="row align-items-center pt-4 border-mobile">
                            <div className="col-lg-4 col-6">
                                <h2 className="page-heading">Leave Requests </h2>
                            </div>
                        </div>
                        <div className="row align-items-center pt-4 border-mobile">
                            <div className="col-lg-6">
                                <ul className="submenu">
                                    <li className="active"><a href="/admin/leaves-request">Requests</a></li>
                                    <li className=""><a href="/admin/leaves-rejected">Rejected</a></li>
                                </ul>
                            </div>
                        </div>

                        <div id="table-scroll" className="table-scroll mt-4">
                            <table id="main-table" className="main-table full-first-td">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text_primary">Leave Date</th>
                                        <th scope="col" className="text-right text_primary">Type/Reason</th>
                                        <th scope="col" className="text-right text_primary">Status</th>
                                        <th scope="col" className="text-right text_primary"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {LeaveList && LeaveList.map((item, index) => (
                                        <tr key={index}>

                                            <td> <strong>{dateFormat(item.leaves.createdAt, "ddd, dd mmmm")}</strong>
                                                <div>{dateFormat(item.leaves.from_date, "ddd, dd mmmm")} - {dateFormat(item.leaves.to_date, "ddd, dd mmmm")}
                                                </div></td>
                                            <td data-th="" className="text-right">{item.leaves.leave_type}<div><small>{item.leaves.note}</small>
                                            </div> </td>
                                            {item.leaves.status == "pending" ? <td data-th="" className="text-right"><span className="capsule red-dim">Pending Approval
                                            </span></td> : <td data-th="" className="text-right">Rejected <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="Rejected notes display here"><i className="fa fa-info-circle action_notes red_text"></i></a>
                                                <div><small>by Jay Parihar</small></div></td>}


                                        </tr>
                                    ))}






                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                <div className="right-aside">
                    <p className="mt-5 text-center"><small>Leave balance</small>
                        <div>Jan 22 - Dec 23</div></p>


                    <div className="stats">
                        <div className="stats-big">8/12</div>
                        <div className="stats-small">Casual Leaves</div>
                    </div>
                    <div className="stats">
                        <div className="stats-big">5/6</div>
                        <div className="stats-small">Sick Leaves</div>
                    </div>
                </div>



                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    // const { attendanceList, error } = state.rootReducer.attendances;
    const { ReportingList } = state.rootReducer.users;
    const { pendingList, updateList, } = state.rootReducer.regularization;
    const { LeaveList, success, message } = state.rootReducer.leaves;
    return {
        // error,
        updateList,
        // attendanceList,
        ReportingList,
        pendingList,
        LeaveList,
        success,
        message

    };
}

export default connect(mapStateToProps)(Index);