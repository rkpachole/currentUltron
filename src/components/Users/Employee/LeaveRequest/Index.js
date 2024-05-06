import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Pagination from "react-js-pagination";
import Footer from "../../../GlobalComponents/Footer";
import Navbar from "../Layout/Navbar";
import { userActions, leaveActions } from "../../../../actions";
import dateFormat from "dateformat";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Select from "react-select";
import { APIURL } from "../../../../constants/config";
import socketClient from "socket.io-client";
import {colourStyles} from "../../../../constants/ColorStyle";

const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "reject", label: "Rejected" }
];
const hoildayName = { "second_half": "second half", "first_half": "first half", "full_day": "full day" };


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            ReportingList: [],
            ReportingName: "",
            LeavesRequestsList: [],
            search: "",
            Modal: false,
            status: "",
            filterStatus: [{ value: "pending", label: "Pending" }],
            fromDate: "",
            toDate: "",
            reportUser: [{ value: "", label: "All User" }],
            rejectModal: false,
            leave_type: "",
            CLeaveData: "",
            SLeaveData: "",
            activePage: 1,
            limit: 10,
            totalItemsCount: 1,
            actionUserId: 0,
            to_date_half: "",
            from_date_half: "",
            from_date: "",
            to_date: "",
            Requestdate: "",
            notes: "",

        };

        this.userChangeHandle = this.userChangeHandle.bind(this);
        this.statusChangeHandle = this.statusChangeHandle.bind(this);
        this.fromDateHandle = this.fromDateHandle.bind(this);
        this.toDateHandle = this.toDateHandle.bind(this);
    }

    approvalModal(id, status) {
        this.props.dispatch(leaveActions.updateRequestedLeaveStatus({ id: id, status: status }));
    }

    approvalRejectModal(id, status) {
        this.props.dispatch(leaveActions.updateRequestedLeaveStatus({ id: id, status: status }));
    }

    getLeavesRequestsList() {
        var reportUser = "";
        if (this.state.reportUser && this.state.reportUser.length > 0) {
            reportUser = this.state.reportUser[0].value;
        }
        if (this.state.user) {
            this.props.dispatch(leaveActions.getLeavesRequestsList({ page: this.state.activePage, reportTo: this.state.user.data._id, search: "", leaveStatusFilter: this.state.filterStatus[0].value, userId: reportUser, startDate: this.state.fromDate, endDate: this.state.toDate }));
        }
    }

    getReportingList() {
        if (this.state.user) {
            this.props.dispatch(userActions.getReportingList({ reportTo: this.state.user.data._id }));

        }
    }

    openModel(data) {
        this.setState({
            Modal: !this.state.Modal,
            notes: data.note,
            Requestdate: data.createdAt,
            from_date: data.from_date,
            to_date: data.to_date,
            leave_type: data.leave_type,
            status: data.status,
            id: data._id,
            actionUserId: data.userId,
            to_date_half: data.to_date_half,
            from_date_half: data.from_date_half,
            leave_count: data.leave_count

        });
    }

    closeModal = () => {
        this.setState({
            Modal: false,
        });
    };

    openRejectModel(data) {
        this.setState({
            rejectModal: !this.state.Modal,
            notes: data.note,
            Requestdate: data.createdAt,
            from_date: data.from_date,
            to_date: data.to_date,
            leave_type: data.leave_type,
            status: data.status,
            id: data._id,
            actionUserId: data.userId,
            to_date_half: data.to_date_half,
            from_date_half: data.from_date_half,
            leave_count: data.leave_count
        });
    }
    closeRejectModal = () => {
        this.setState({
            rejectModal: false,
            textAreaValue: ""
        });
    };

    getCasualLeaveData() {
        if (this.state.user) {
            this.props.dispatch(leaveActions.checkCasualLeaves({ userId: this.state.user.data._id }));
        }
    }
    getSickLeaveData() {
        if (this.state.user) {
            this.props.dispatch(leaveActions.checkSickLeaves({ userId: this.state.user.data._id }));
        }
    }

    handlePageChange(pageNumber) {
        this.setState(
            {
                activePage: pageNumber
            }
            , () => {
                this.getLeavesRequestsList();
            }
        );
    }

    handlePageStates(activePage, totalItemsCount, limit) {
        this.setState(
            {
                activePage: activePage,
                totalItemsCount: totalItemsCount,
                limit: limit
            }
        );
    }

    setReportingList(item) {
        let reportList = [];
        reportList.push({ value: "", label: "All User" });
        for (var c = 0; c < item.length; c++) {
            reportList.push({ value: item[c]._id, label: item[c].first_name + " " + item[c].last_name });
        }
        this.setState({
            ReportingList: reportList
        });
    }

    afterSuccessApproveReject(ApproveScsMsg) {
        this.setState({
            rejectModal: false,
            Modal: false,
            ApproveScsMsg: ApproveScsMsg
        }, () => {
            this.addToSocket();
        });
    }

    userChangeHandle(e) {
        this.setState({
            activePage: 1,
            reportUser: [{ value: e.value, label: e.label }]
        }, () => {
            this.getCasualLeaveData();
            this.getSickLeaveData();
            this.getLeavesRequestsList();
        });
    }

    statusChangeHandle(e) {
        this.setState({
            activePage: 1,
            filterStatus: [{ value: e.value, label: e.label }]
        }, () => { this.getLeavesRequestsList(); });
    }

    fromDateHandle(e) {
        this.setState({
            activePage: 1,
            fromDate: e.target.value
        }, () => { this.getLeavesRequestsList(); });
    }

    toDateHandle(e) {
        this.setState({
            activePage: 1,
            toDate: e.target.value
        }, () => { this.getLeavesRequestsList(); });
    }

    getLeaveCausalSick() {
        this.getCasualLeaveData();
        this.getSickLeaveData();
        this.getLeavesRequestsList();
    }

    configureSocket = () => {
        var socket = socketClient(APIURL, { transports: ["websocket"] });
        socket.on("leave", data => {

            if (this.state.reportUser && this.state.reportUser.length > 0 && this.state.reportUser[0].value == data.userId) {
                this.getLeaveCausalSick();
            }
            else if (this.state.reportUser && this.state.reportUser.length > 0 && this.state.reportUser[0].value == "") {
                this.state.ReportingList.map((item) => {
                    if (item.value == data.userId) {
                        this.getLeaveCausalSick();
                    }
                });
            }
            else if (this.state.reportUser == "") {
                this.state.ReportingList.map((item) => {
                    if (item.value == data.userId) {
                        this.getLeaveCausalSick();
                    }
                });
            }
        });

    };

    addToSocket() {
        var socket = socketClient(APIURL, { transports: ["websocket"] });
        socket.emit("leave", { userId: this.state.actionUserId });

    }

    setUser() {

        if (JSON.parse(localStorage.getItem("user"))) {
            this.setState({
                user: JSON.parse(localStorage.getItem("user")),
            }, () => {
                this.getReportingList();
                this.getLeavesRequestsList();
                this.getCasualLeaveData();
                this.getSickLeaveData();
                this.configureSocket();

            });

        }

    }
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    componentDidMount() {
        this.setUser();

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ApproveScsMsg != undefined) {
            this.afterSuccessApproveReject(nextProps.ApproveScsMsg);
        }
        if (nextProps.ReportingList != undefined) {
            this.setReportingList(nextProps.ReportingList);
        }
        if (nextProps.activePage != undefined && nextProps.totalItemsCount != undefined && nextProps.limit != undefined) {
            this.handlePageStates(nextProps.activePage, nextProps.totalItemsCount, 10);
        }

    }

    render() {
        const { LeavesRequestsList, ApproveScsMsg, loading } = this.props;
        const { SLeaveData, CLeaveData } = this.props;

        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user.data.user_role !== "Employee") {
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
                            <div className="col-lg-12">
                                <ul className="submenu menu_width" style={{ position: "relative", zIndex: 2 }}>
                                    <li>
                                        <Select styles={colourStyles} onChange={this.statusChangeHandle} value={this.state.filterStatus} options={statusOptions} />
                                    </li>
                                    <li>
                                        <Select styles={colourStyles} onChange={this.userChangeHandle} value={this.state.reportUser} options={this.state.ReportingList} />
                                    </li>
                                    <li>
                                        <input className="date_picker" type="date" onChange={this.fromDateHandle} value={this.state.fromDate} />
                                    </li>
                                    <li>
                                        <input className="date_picker" type="date" onChange={this.toDateHandle} value={this.state.toDate} />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div id="table-scroll" className="table-scroll mt-4 pagination_mrg">
                            <table id="main-table" className="main-table full-first-td">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text_primary col-3">Leave Date</th>
                                        <th scope="col" className="text-left text_primary col-2">Request By</th>
                                        <th scope="col" className="text-left text_primary col-4">Type/Reason</th>
                                        <th scope="col" className="text-left text_primary col-1">Status</th>
                                        <th scope="col" className="text-left text_primary col-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {LeavesRequestsList && LeavesRequestsList.map((item, index) => (
                                        <tr key={index}>
                                            <td> <small>Applied on: {dateFormat(item.leaves.createdAt, "ddd, dd mmm")}</small>
                                                <div><small><strong>{dateFormat(item.leaves.from_date, "ddd, dd mmm")} - {dateFormat(item.leaves.to_date, "ddd, dd mmm")}</strong></small>
                                                </div>
                                                <div> <div>
                                                    <small>
                                                        {dateFormat(item.leaves.from_date, "yyyy-mm-dd") == dateFormat(item.leaves.to_date, "yyyy-mm-dd") &&
                                                            hoildayName[item.leaves.from_date_half]
                                                        }
                                                        {dateFormat(item.leaves.from_date, "yyyy-mm-dd") != dateFormat(item.leaves.to_date, "yyyy-mm-dd") &&
                                                            hoildayName[item.leaves.from_date_half]
                                                        }
                                                        {dateFormat(item.leaves.from_date, "yyyy-mm-dd") != dateFormat(item.leaves.to_date, "yyyy-mm-dd") &&
                                                            " - " + hoildayName[item.leaves.to_date_half]
                                                        }
                                                        <span className="ml-1">({item.leaves.leave_count} {item.leaves.leave_count > 1 ? "days" : "day"})</span>
                                                    </small>
                                                </div></div>
                                            </td>
                                            <td>
                                                {item.leaveRequestBy && item.leaveRequestBy.map((requestBy) => (
                                                    requestBy.first_name + " " + requestBy.last_name
                                                ))}

                                            </td>
                                            <td data-th="" className="text-left">{this.Capitalize(item.leaves.leave_type)}<div><small>{item.leaves.note}</small>
                                            </div> </td>
                                            {item.leaves.status == "pending" ?
                                                <td data-th="" className="text-left">
                                                    <span className="capsule red-dim">Pending</span>
                                                </td>
                                                :
                                                item.leaves.status == "approved" ?
                                                    <td data-th="" className="text-left">Approved <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="Approval notes display here"></a><div> <small> by {item.leaveRequestBy[0].reportToData[0].first_name} {item.leaveRequestBy[0].reportToData[0].last_name}</small></div></td>
                                                    :
                                                    <td data-th="" className="text-left">Rejected <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="Approval notes display here"></a><div><small>by  {item.leaveRequestBy[0].reportToData[0].first_name} {item.leaveRequestBy[0].reportToData[0].last_name}</small></div></td>
                                            }
                                            <td className="text-left">
                                                {item.leaves.status == "pending" ?
                                                    <div className="action-area d-flex align-items-center justify-content-end">

                                                        <a onClick={this.openModel.bind(this, item.leaves)} className="btn btn-success btn-small apr_rjt_btn">Approve</a>
                                                        <a href="javascript:;" data-toggle="modal" data-target="#RejectLeave" className="btn btn-danger btn-small ml-2 apr_rjt_btn" onClick={this.openRejectModel.bind(this, item.leaves)}>Reject</a>
                                                    </div> :
                                                    ""}
                                            </td>

                                        </tr>
                                    ))}
                                    {LeavesRequestsList && LeavesRequestsList.length == 0 && loading == false &&
                                        <tr className="text-center">
                                            <td colSpan="5">No record</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {LeavesRequestsList && LeavesRequestsList.length > 0 &&
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.limit}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                            itemClass="page-item"
                            linkClass="page-link"
                            innerClass="pagination justify-content-center"
                            activeLinkClass="active"
                            nextPageText="Next"
                            prevPageText="Previous"
                        />
                    }
                </main>
                <div className="right-aside">
                    <p className="mt-5 text-center" style={{ display: "none" }}><small>Leave balance</small>
                        <div>Jan 1 - Dec 31</div></p>


                    <div className="stats" style={{ display: "none" }}>
                        <div className="stats-big">{CLeaveData && CLeaveData.consumedLeave}/{CLeaveData && CLeaveData.totalLeave}</div>
                        <div className="stats-small">Casual Leaves</div>
                    </div>
                    <div className="stats" style={{ display: "none" }}>
                        <div className="stats-big">{SLeaveData && SLeaveData.consumedLeave}/{SLeaveData && SLeaveData.totalLeave}</div>
                        <div className="stats-small">Sick Leaves</div>
                    </div>
                </div>


                <Modal size="ml" isOpen={this.state.rejectModal} toggle={() => this.closeRejectModal()}>
                    <div className="modal-content">
                        <ModalHeader className="header-less ml-2" toggle={() => this.closeRejectModal()}>Reject leave request

                        </ModalHeader>
                        <ModalBody className="border-0">

                            <div id="table-scroll" className="table-scroll h-auto popup_table my-3 modal_table">
                                <table id="main-table" className="main-table full-first-td">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text_primary text-left">Requested Leave Date</th>
                                            <th scope="col" className="text-right text_primary">Type/Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-left">
                                                <small>Applied on: {dateFormat(this.state.Requestdate, "ddd, dd mmm")}</small>
                                                <div><small><strong>{dateFormat(this.state.from_date, "ddd, dd mmm")} - {dateFormat(this.state.to_date, "ddd, dd mmm")}</strong></small>
                                                </div>
                                                <div> <div>
                                                    <small>
                                                        {dateFormat(this.state.from_date, "yyyy-mm-dd") == dateFormat(this.state.to_date, "yyyy-mm-dd") &&
                                                            hoildayName[this.state.from_date_half]
                                                        }
                                                        {dateFormat(this.state.from_date, "yyyy-mm-dd") != dateFormat(this.state.to_date, "yyyy-mm-dd") &&
                                                            hoildayName[this.state.from_date_half]
                                                        }
                                                        {dateFormat(this.state.from_date, "yyyy-mm-dd") != dateFormat(this.state.to_date, "yyyy-mm-dd") &&
                                                            " - " + hoildayName[this.state.to_date_half]
                                                        }
                                                        <span className="ml-1">({this.state.leave_count} {this.state.leave_count > 1 ? "days" : "day"})</span>
                                                    </small>
                                                </div></div>
                                            </td>
                                            <td data-th="" className="text-right">{this.Capitalize(this.state.leave_type)}
                                                <div><small>{this.state.notes}</small></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-12">
                                {
                                    ApproveScsMsg && <span className="text-success fs-5">{ApproveScsMsg.message}</span>
                                }
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-secondary" onClick={() => this.closeRejectModal()}> Cancel</button>
                            {
                                loading ?
                                    <Button color="danger"> Loading... </Button>
                                    :
                                    <Button color="danger" onClick={this.approvalRejectModal.bind(this, this.state.id, "reject")}> Reject </Button>
                            }
                        </ModalFooter>
                    </div>
                </Modal>
                <Modal size="ml" isOpen={this.state.Modal} toggle={() => this.closeModal()}>
                    <div className="modal-content">
                        <ModalHeader className="header-less ml-2" toggle={() => this.closeModal()}>Approve leave request
                        </ModalHeader>
                        <ModalBody className="border-0 text-center">
                            <div id="table-scroll" className="table-scroll h-auto popup_table my-3 modal_table">
                                <table id="main-table" className="main-table full-first-td">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text_primary text-left">Leave Date</th>
                                            <th scope="col" className="text-right text_primary">Type/Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-left">
                                                <small>Applied on: {dateFormat(this.state.Requestdate, "ddd, dd mmm")}</small>
                                                <div><small><strong>{dateFormat(this.state.from_date, "ddd, dd mmm")} - {dateFormat(this.state.to_date, "ddd, dd mmm")}</strong></small>
                                                </div>
                                                <div> <div>
                                                    <small>
                                                        {dateFormat(this.state.from_date, "yyyy-mm-dd") == dateFormat(this.state.to_date, "yyyy-mm-dd") &&
                                                            hoildayName[this.state.from_date_half]
                                                        }
                                                        {dateFormat(this.state.from_date, "yyyy-mm-dd") != dateFormat(this.state.to_date, "yyyy-mm-dd") &&
                                                            hoildayName[this.state.from_date_half]
                                                        }
                                                        {dateFormat(this.state.from_date, "yyyy-mm-dd") != dateFormat(this.state.to_date, "yyyy-mm-dd") &&
                                                            " - " + hoildayName[this.state.to_date_half]
                                                        }
                                                        <span className="ml-1">({this.state.leave_count} {this.state.leave_count > 1 ? "days" : "day"})</span>
                                                    </small>
                                                </div></div>
                                            </td>
                                            <td data-th="" className="text-right">{this.Capitalize(this.state.leave_type)}
                                                <div><small>{this.state.notes}</small></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-12">
                                {
                                    ApproveScsMsg && <span className="text-success">{ApproveScsMsg.message}</span>
                                }
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-secondary" onClick={() => this.closeModal()}> Cancel</button>
                            {
                                loading ?
                                    <Button color="success" className="btn btn-success"> Loading... </Button>
                                    :
                                    <Button color="success" className="btn btn-success" onClick={this.approvalModal.bind(this, this.state.id, "approved")}> Approve </Button>
                            }
                        </ModalFooter>
                    </div>

                </Modal>

                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { ReportingList } = state.rootReducer.users;
    const { LeavesRequestsList, success, message, ApproveScsMsg, loading, CLeaveData, SLeaveData, activePage, totalItemsCount, limit } = state.rootReducer.leaves;
    return {
        ApproveScsMsg,
        ReportingList,
        LeavesRequestsList,
        success,
        message,
        CLeaveData,
        SLeaveData,
        loading,
        activePage,
        totalItemsCount,
        limit

    };
}

export default connect(mapStateToProps)(Index);