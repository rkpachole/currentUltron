import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "../../../GlobalComponents/Footer";
import Navbar from "../Layout/Navbar";
import { regularizationActions } from "../../../../actions";
import dateFormat from "dateformat";
import socketClient from "socket.io-client";
import { APIURL } from "../../../../constants/config";
// import { Label, Form } from "reactstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import Pagination from "react-js-pagination";



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
            getDetails: [],
            textAreaValue: "",
            attendanceDetail: "",
            rejectClick: false,
            UpdateScsMsg: "",
            rejectModal: false,
            activePage: 1,
            limit: 10,
            totalItemsCount: 1,
            actionUserId: 0,
            id: "",
            Requestdate: "",
            note: "",
            first_name: "",
            last_name: ""
        };
    }
    showAttendanceDetail(data) {
        this.setState({
            attendanceList: data
        });
    }
    getAttendanceDetail(userId, request_date) {
        this.props.dispatch(regularizationActions.getAttendanceDetail({ userId: userId, attendanceDate: dateFormat(request_date, "yyyy-mm-dd") }));

    }
    approvalModal(id, status) {
        this.setState({
            approveClick: true
        });
        this.props.dispatch(regularizationActions.updateRequestStatus({ id: id, status: status }
        ));
    }
    rejectedModal(id, status) {
        this.setState({
            rejectClick: true
        });
        this.props.dispatch(regularizationActions.updateRequestStatus({ id: id, status: status }
        ));
    }

    getPendingRequests() {
        this.props.dispatch(regularizationActions.getPendingRequests({ page: this.state.activePage, search: this.state.search, reportTo: this.state.user.data._id }));
    }

    showPendingRequests(data) {
        this.setState({
            attendanceList: data
        });
    }


    configureSocket = () => {
        var socket = socketClient(APIURL, { transports: ["websocket"] });
        socket.on("attendance", data => {
            if (this.state.filterUser == data.userId) {
                this.getAttendanceList();
            }
        });

    };

    openModel(data) {
        // console.log("suyyyyas", data.regularizationRequestBy[0].first_name,);
        this.setState({
            Modal: !this.state.Modal,
            notes: data.requestRegularizes.note,
            Requestdate: data.requestRegularizes.request_date,
            status: data.requestRegularizes.status,
            id: data.requestRegularizes._id,
            actionUserId: data.requestRegularizes.userId,
            first_name: data.regularizationRequestBy[0].first_name,
            last_name: data.regularizationRequestBy[0].last_name
        });
    }
    RejectModel(data) {
        this.setState({
            rejectModal: !this.state.rejectModal,
            notes: data.requestRegularizes.note,
            Requestdate: data.requestRegularizes.request_date,
            status: data.requestRegularizes.status,
            id: data.requestRegularizes._id,
            actionUserId: data.requestRegularizes.userId,
            first_name: data.regularizationRequestBy[0].first_name,
            last_name: data.regularizationRequestBy[0].last_name
        });
    }
    closeModal = () => {
        this.setState({
            Modal: false,
            textAreaValue: ""


        });
    };

    handleChange = (e) => {
        this.setState({ textAreaValue: e });
    };
    closeRejectModal = () => {
        this.setState({
            rejectModal: false,
            textAreaValue: ""
        });
    };
    handlePageChange(pageNumber) {
        this.setState(
            {
                activePage: pageNumber
            }
            , () => {
                this.getPendingRequests();
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

    addReulrizeToSocket() {
        var socket = socketClient(APIURL, { transports: ["websocket"] });
        socket.emit("regularization", { userId: this.state.actionUserId });
        socket.emit("attendance", { userId: this.state.actionUserId, name: "" });

    }
    componentDidMount() {
        if (this.state.user) {
            this.configureSocket();
            this.getPendingRequests();
        }


    }

    UNSAFE_componentWillReceiveProps(nextProps) {


        if (nextProps.UpdateScsMsg != undefined) {
            this.setState({
                UpdateScsMsg: nextProps.UpdateScsMsg
            });
            this.setState({
                rejectModal: false,
                Modal: false,
                UpdateScsMsg: ""
            }, () => {
                this.addReulrizeToSocket();
                this.getPendingRequests();
            });
        }

        if (nextProps.activePage != undefined && nextProps.totalItemsCount != undefined && nextProps.limit != undefined) {
            this.handlePageStates(nextProps.activePage, nextProps.totalItemsCount, 10);
        }
        if (nextProps.pendingList != undefined) {
            let getPendingRequests = nextProps.pendingList;

            this.setState({
                pendingList: getPendingRequests
            });
            // console.log(getPendingRequests);
        }
        if (nextProps.getAllAttendanceDetail != undefined) {
            let DetailList = nextProps.getAllAttendanceDetail;

            this.setState({
                getAllAttendanceDetail: DetailList
            });
            console.log(DetailList);
        }
    }


    render() {
        const { pendingList } = this.props;
        const { getAllAttendanceDetail, loading } = this.props;
        const { UpdateScsMsg } = this.state;

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
                            <div className="col-lg-6 col-6">
                                <h2 className="page-heading"> Regularization Requests</h2>
                            </div>
                        </div>

                        <div id="table-scroll" className="table-scroll mt-4">
                            <table id="main-table" className="main-table full-first-td pagination_mrg">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text_primary">Employee Name</th>
                                        <th scope="col" className="text-left text_primary">Request Date</th>
                                        <th scope="col" className="text-left text_primary">Note</th>
                                        <th scope="col" className="text-left text_primary">Status</th>
                                        <th scope="col" className="text-left text_primary">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingList && pendingList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.regularizationRequestBy[0].first_name + " " + item.regularizationRequestBy[0].last_name}</td>
                                            {item.requestRegularizes.request_date ? <td className="text-left">
                                                {dateFormat(item.requestRegularizes.request_date, "ddd, dd mmm")}
                                            </td> : ""}
                                            <td className="text-left ">{item.requestRegularizes.note}</td>
                                            {item.requestRegularizes.status == "pending" ? <td data-th="" className="text-left"><span className="capsule red-dim">Pending Approval</span></td> : <td data-th="" className="text-left"><span className="capsule red-dim"></span></td>}

                                            {getAllAttendanceDetail ?
                                                <td data-th="Order Value" className="text-left">
                                                    <React.Fragment>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <Button
                                                                id={`btn-${index}`}
                                                                // id={parseInt(index)}
                                                                type="button"
                                                                color="light"
                                                                size="sm"
                                                            >
                                                                <i className="fa fa-check-circle text-warning fa-lg" aria-hidden="true" onClick={this.getAttendanceDetail.bind(this, item.requestRegularizes.userId, item.requestRegularizes.request_date)}></i>
                                                            </Button>

                                                            <a onClick={this.openModel.bind(this, item)} className="btn btn-success btn-small">Approve</a>
                                                            <a onClick={this.RejectModel.bind(this, item, "rejected")} className="btn btn-danger btn-small">Reject</a>

                                                            <UncontrolledPopover
                                                                placement="top"
                                                                target={`btn-${index}`}
                                                                // target={parseInt(index)}
                                                                trigger="legacy"
                                                            >

                                                                <PopoverHeader>
                                                                    {dateFormat(getAllAttendanceDetail[0].loginDate, "ddd, dd mmm")}
                                                                </PopoverHeader>
                                                                <PopoverBody>
                                                                    <div className="row m-0">
                                                                        <div className="col-12 p-0">
                                                                            <p className="mb-3"><strong>Web Clock In</strong></p>
                                                                            {
                                                                                getAllAttendanceDetail[0].attendanceDetail.map((atten, idx) =>
                                                                                    <div key={idx} className="log_stats">

                                                                                        <div className="row m-0">
                                                                                            <div className="col-6 p-0">
                                                                                                <span><i className="fa fa-long-arrow-left mr-1 rotate_arrow green_text"></i>{atten.log_in_time}</span>
                                                                                            </div>
                                                                                            <div className="col-6 p-0 ">
                                                                                                <span className="text-uppercase"><i className="fa fa-long-arrow-right mr-1 rotate_arrow red_text"></i>{atten.log_out_time ? atten.log_out_time : "Missing"} </span>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                </PopoverBody>
                                                            </UncontrolledPopover>
                                                        </div>
                                                    </React.Fragment>
                                                </td>

                                                : <td data-th="Order Value" className="text-left rmv_tbl_padding">
                                                    <React.Fragment>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <Button
                                                                id={`btn-${index}`}
                                                                // id={parseInt(index)}
                                                                type="button"
                                                                color="light"
                                                                size="sm"
                                                            >
                                                                <i className="fa fa-check-circle text-warning fa-lg" aria-hidden="true" onClick={this.getAttendanceDetail.bind(this, item.requestRegularizes.userId, item.requestRegularizes.request_date)}></i>
                                                            </Button>
                                                            <a onClick={this.openModel.bind(this, item)} className="btn btn-success btn-small">Approve</a>
                                                            <a onClick={this.RejectModel.bind(this, item, "rejected")} className="btn btn-danger btn-small">Reject</a>
                                                            <UncontrolledPopover
                                                                placement="top"
                                                                target={`btn-${index}`}
                                                                // target={parseInt(index)}
                                                                trigger="legacy"
                                                            >
                                                                <PopoverHeader>

                                                                </PopoverHeader>
                                                                <PopoverBody>


                                                                </PopoverBody>
                                                            </UncontrolledPopover>
                                                        </div>
                                                    </React.Fragment>
                                                </td>}
                                        </tr>
                                    ))}
                                    {pendingList && pendingList.length < 1 &&
                                        <tr>
                                            <td colSpan="5" className="text-center">No record</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {pendingList && pendingList.length > 0 &&
                        <Pagination
                            className=""
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
                    <p className="mt-5 text-center">Regularization Summary</p>

                    <div className="stats mt-3">
                        <div className="stats-big">{pendingList && pendingList.length}</div>
                        <div className="stats-small">Pending Requests</div>
                    </div>
                </div>
                <Modal size="ml" isOpen={this.state.Modal} toggle={() => this.closeModal()}>
                    <div className="modal-content">
                        <ModalHeader className="header-less ml-2" toggle={() => this.closeModal()}>
                            Regularize request
                        </ModalHeader>
                        <ModalBody className="border-0 text-center">
                            <div id="table-scroll" className="table-scroll h-auto popup_table my-3">
                                <table id="main-table" className="main-table full-first-td">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text_primary text-left">Regularization Date</th>
                                            <th scope="col" className="text-right text_primary">Type/Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-left">
                                                <strong>{dateFormat(this.state.Requestdate, "ddd, dd mmm")}</strong>
                                                <div><small><span>
                                                    {this.state.first_name} {this.state.last_name}</span></small></div>
                                            </td>
                                            <td data-th="" className="text-right">{this.state.leave_type}
                                                <div><small>{this.state.notes}</small></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12">
                                {
                                    UpdateScsMsg && <span className="text-success fs-5">{UpdateScsMsg}</span>
                                }
                            </div>
                        </ModalBody>
                        <ModalFooter>   
                            <button className="btn btn-secondary" onClick={() => this.closeModal()}> Cancel</button>
                            {
                                loading ?
                                    <Button color="danger"> Loading... </Button>
                                    :
                                    <button className="btn btn-success" onClick={this.approvalModal.bind(this, this.state.id, "approved")}> Approval </button>
                            }
                        </ModalFooter>
                    </div>

                </Modal>
                <Modal size="ml" isOpen={this.state.rejectModal} toggle={() => this.closeRejectModal()}>
                    <div className="modal-content">
                        <ModalHeader className="header-less ml-2" toggle={() => this.closeRejectModal()}>
                            Regularize request
                        </ModalHeader>
                        <ModalBody className="border-0 text-center">
                            <div id="table-scroll" className="table-scroll h-auto popup_table my-3">
                                <table id="main-table" className="main-table full-first-td">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text_primary text-left">Regularization Date</th>
                                            <th scope="col" className="text-right text_primary">Type/Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-left">
                                                <strong>{dateFormat(this.state.Requestdate, "ddd, dd mmm")}</strong>
                                                <div><small>
                                                    <span>{this.state.first_name} {this.state.last_name}</span></small></div>
                                            </td>
                                            <td data-th="" className="text-right">{this.state.leave_type}
                                                <div><small>{this.state.notes}</small></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12">
                                {
                                    UpdateScsMsg && <span className="text-success fs-5">{UpdateScsMsg}</span>
                                }
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-secondary" onClick={() => this.closeRejectModal()}> Cancel</button>
                            {
                                loading ?
                                    <Button color="danger"> Loading... </Button>
                                    :
                                    <Button color="danger" onClick={this.rejectedModal.bind(this, this.state.id, "rejected")}> Reject </Button>
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
    const { attendanceList, error } = state.rootReducer.attendances;
    const { ReportingList } = state.rootReducer.users;
    const { pendingList, updateList, getAllAttendanceDetail, UpdateScsMsg, activePage, totalItemsCount, limit, loading } = state.rootReducer.regularization;
    return {
        error,
        updateList,
        attendanceList,
        ReportingList,
        pendingList,
        UpdateScsMsg,
        getAllAttendanceDetail,
        activePage,
        totalItemsCount,
        limit,
        loading
    };
}

export default connect(mapStateToProps)(Index);