import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "../../../GlobalComponents/Footer";
import Navbar from "../Layout/Navbar";
import { adminUserActions, adminLeaveActions } from "../../../../actions";
import dateFormat from "dateformat";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Select from "react-select";
import Pagination from "react-js-pagination";
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
            allMonth: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            ReportingList: [],
            ReportingName: "",
            timeDate: new Date(),
            search: "",
            Modal: false,
            status: "",
            textAreaValue: "",
            rejectModal: false,
            leave_type: "",
            filterStatus: [{ value: "pending", label: "Pending" }],
            fromDate: "",
            toDate: "",
            reportUser: [{ value: "", label: "All User" }],
            activePage: 1,
            limit: 10,
            totalItemsCount: 1,
            actionUserId: 0,
            from_date_half: "",
            to_date_half: "",
            leave_count: 0
        };
        this.userChangeHandle = this.userChangeHandle.bind(this);
        this.statusChangeHandle = this.statusChangeHandle.bind(this);
        this.fromDateHandle = this.fromDateHandle.bind(this);
        this.toDateHandle = this.toDateHandle.bind(this);
    }
    approvalModal(id, status) {
        console.log(status, id);
        this.props.dispatch(adminLeaveActions.updateRequestedLeaveStatus({ id: id, status: status }));
    }
    approvalRejectModal(id, status) {
        console.log(status, id);
        this.props.dispatch(adminLeaveActions.updateRequestedLeaveStatus({ id: id, status: status }));
    }


    getLeavesRequestsList() {
        var reportUser = "";
        if (this.state.reportUser && this.state.reportUser.length > 0) {
            reportUser = this.state.reportUser[0].value;
        }
        this.props.dispatch(adminLeaveActions.getLeavesRequestsList({ page: this.state.activePage, search: "", leaveStatusFilter: this.state.filterStatus[0].value, userId: reportUser, startDate: this.state.fromDate, endDate: this.state.toDate }));
    }


    getReportingList() {
        this.props.dispatch(adminUserActions.getUserListForReporting({ search: "" }));
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
            from_date_half: data.from_date_half,
            to_date_half: data.to_date_half,
            leave_count: data.leave_count

        }
        );
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
            from_date_half: data.from_date_half,
            to_date_half: data.to_date_half,
            leave_count: data.leave_count
        }
        );
    }

    closeRejectModal = () => {
        this.setState({
            rejectModal: false,
            textAreaValue: ""


        });
    };

    handleChange = (e) => {
        this.setState({ textAreaValue: e });
    };

    getCasualLeaveData() {
        this.props.dispatch(adminLeaveActions.checkCasualLeaves({ userId: this.state.user.data._id }));
    }

    getSickLeaveData() {
        this.props.dispatch(adminLeaveActions.checkSickLeaves({ userId: this.state.user.data._id }));
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
            else if (this.state.reportUser == "") {
                this.state.ReportingList.map((item) => {
                    if (item.value == data.userId) {
                        this.getLeaveCausalSick();
                    }
                });
            }
            else if (this.state.reportUser.length > 0 && this.state.reportUser[0].value == "") {
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

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    componentDidMount() {
        if (this.state.user) {
            this.getReportingList();
            this.getLeavesRequestsList();
            this.getCasualLeaveData();
            this.getSickLeaveData();
            this.configureSocket();
        }

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.LeavesRequestsList != undefined) {
            this.setState({
                LeavesRequestsList: nextProps.LeavesRequestsList
            });

        }
        if (nextProps.updateList != undefined) {
            this.setState({
                Modal: false,
                rejectModal: false,
            }, () => {
                this.addToSocket();
            });

        }
        if (nextProps.message != undefined) {
            this.setState({
                rejectModal: false,
                Modal: false,
            }, () => {
                this.addToSocket();
            });

        }
        if (nextProps.ApproveScsMsg != undefined) {
            this.setState({
                ApproveScsMsg: nextProps.ApproveScsMsg
            });

            this.setState({
                rejectModal: false,
                Modal: false,
            }, () => {
                this.addToSocket();
            });

        }

        if (nextProps.UserListForReporting != undefined) {
            this.setReportingList(nextProps.UserListForReporting);
        }

        if (nextProps.activePage != undefined && nextProps.totalItemsCount != undefined && nextProps.limit != undefined) {
            this.handlePageStates(nextProps.activePage, nextProps.totalItemsCount, 10);
        }
    }

    render() {
        const { ApproveScsMsg, loading, SLeaveData, CLeaveData } = this.props;

        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user.data.user_role !== "Admin") {
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
                                        <th scope="col" className="text_primary col-2">Employee Name</th>
                                        <th scope="col" className="text-left text_primary col-4">Type/Reason</th>
                                        <th scope="col" className="text-left text_primary col-1">Status</th>
                                        <th scope="col" className="text-left text_primary col-2"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.LeavesRequestsList && this.state.LeavesRequestsList.map((item, index) => (
                                        <tr key={index}>

                                            <td> <small>Applied on: {dateFormat(item.leaves.createdAt, "ddd, dd mmm")}</small>
                                                <div><small><strong>{dateFormat(item.leaves.from_date, "ddd, dd mmm")} - {dateFormat(item.leaves.to_date, "ddd, dd mmm")}</strong></small>
                                                </div>
                                                <div>
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
                                                </div>
                                            </td>
                                            <td>{item.leaveRequestBy[0].first_name} {item.leaveRequestBy[0].last_name}</td>
                                            <td data-th="" className="text-left">{this.Capitalize(item.leaves.leave_type)}<div><small>{item.leaves.note}</small>
                                            </div> </td>

                                            {item.leaves.status == "pending" ?
                                                <td className="text-left">
                                                    <span className="capsule red-dim">Pending</span>
                                                </td>
                                                :
                                                item.leaves.status == "approved" ?
                                                    <td data-th="" className="text-left me-1">Approved <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="Approval notes display here"></a><div><small>by  {item.leaveRequestBy[0].reportToData[0].first_name} {item.leaveRequestBy[0].reportToData[0].last_name}</small></div></td>
                                                    :
                                                    <td data-th="" className="text-left">Rejected <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="Approval notes display here"></a><div><small>by {item.leaveRequestBy[0].reportToData[0].first_name} {item.leaveRequestBy[0].reportToData[0].last_name}</small></div></td>
                                            }

                                            <td data-th="Order Value" className="text-left">
                                                {item.leaves.status == "pending" ?
                                                    <div className="action-area d-flex align-items-center justify-content-between">
                                                        <a onClick={this.openModel.bind(this, item.leaves)} className="btn btn-success btn-small mr-1">Approve</a>
                                                        <a href="javascript:;" data-toggle="modal" data-target="#RejectLeave" className="btn btn-danger btn-small" onClick={this.openRejectModel.bind(this, item.leaves)}>Reject</a>
                                                    </div>
                                                    : ""}

                                            </td>

                                        </tr>
                                    ))}
                                    {this.state.LeavesRequestsList && this.state.LeavesRequestsList.length == 0 && loading == false &&
                                        <tr className="text-center">
                                            <td colSpan="5">No Record Found</td>
                                        </tr>
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                    {this.state.LeavesRequestsList && this.state.LeavesRequestsList.length > 0 &&
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
                        <div>Jan 1 - Dec 23</div></p>


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
                                            <th scope="col" className="text_primary text-left col-6">Leave Date</th>
                                            <th scope="col" className="text-right text_primary col-6">Type/Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <small >Applied on: {dateFormat(this.state.Requestdate, "ddd, dd mmm")}</small>
                                                <div><small><strong>{dateFormat(this.state.from_date, "ddd, dd mmm")} - {dateFormat(this.state.to_date, "ddd, dd mmm")}</strong></small>
                                                </div>
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
                                            </td>
                                            <td data-th="" className="text-right">{this.Capitalize(this.state.leave_type)}
                                                <div><small>{this.state.notes}</small></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* <Form>
                                <div className="col-12">
                                    <Label>Approval Notes</Label>
                                    <textarea className="form-control" rows="3" cols="20" id="aproval_notes" name={this.state.textAreaValue}
                                        onChange={(e) => this.handleChange(e.target.value)} placeholder=""></textarea>
                                </div>
                            </Form> */}
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
                        <ModalBody className="border-0">
                            <div id="table-scroll" className="table-scroll h-auto popup_table my-3 modal_table">
                                <table id="main-table" className="main-table full-first-td">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text_primary text-left col-6">Leave Date</th>
                                            <th scope="col" className="text-right text_primary col-6">Type/Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <small >Applied on: {dateFormat(this.state.Requestdate, "ddd, dd mmm")}</small>
                                                <div><small><strong>{dateFormat(this.state.from_date, "ddd, dd mmm")} - {dateFormat(this.state.to_date, "ddd, dd mmm")}</strong></small>
                                                </div>
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
                                            </td>
                                            <td data-th="" className="text-right">{this.Capitalize(this.state.leave_type)}
                                                <div><small>{this.state.notes}</small></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* <Form>
                                <div className="col-12">
                                    <Label>Approval Notes</Label>
                                    <textarea className="form-control" rows="3" cols="20" id="aproval_notes" name={this.state.textAreaValue}
                                        onChange={(e) => this.handleChange(e.target.value)} placeholder=""></textarea>
                                </div>
                            </Form> */}
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
    const { UserListForReporting } = state.rootReducer.adminUsers;
    const { updateList, } = state.rootReducer.adminRegularization;
    const { LeavesRequestsList, success, message, ApproveScsMsg, loading, CLeaveData, SLeaveData, activePage, totalItemsCount, limit } = state.rootReducer.adminLeaves;
    return {
        updateList,
        ApproveScsMsg,
        UserListForReporting,
        LeavesRequestsList,
        success,
        message,
        loading,
        CLeaveData,
        SLeaveData,
        activePage,
        totalItemsCount,
        limit

    };
}

export default connect(mapStateToProps)(Index);