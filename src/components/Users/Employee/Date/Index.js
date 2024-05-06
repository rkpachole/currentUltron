import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Footer from "../../../GlobalComponents/Footer";
import Navbar from "../Layout/Navbar";
import { attendanceActions, userActions } from "../../../../actions";
import dateFormat from "dateformat";
import socketClient from "socket.io-client";
import { APIURL } from "../../../../constants/config";
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";


var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

var lastDay = new Date();

var oneDay = 24 * 3600 * 1000;
for (var fulldate = [], ms = firstDay * 1, last = lastDay * 1; ms < last; ms += oneDay) {
    fulldate.push(dateFormat(new Date(ms), "yyyy-mm-dd"));
}

var newArray = [];
for (var i = fulldate.length - 1; i >= 0; i--) {
    newArray.push(fulldate[i]);
}


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            allMonth: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            attendanceList: [],
            filterUser: "",
            filterFromDate: "",
            filterToDate: "",
            selectedMonth: "",
            selectedYear: "",
            ReportingList: [],
            ReportingName: "",
            timeDate: new Date(),
            result: [],
            filteredKeywords: [],
            deleteModal: false,
            note: "",
            success: "",
            hrs: "",
            min: ""
        };
        this.handleReportUser = this.handleReportUser.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
    }
    openModel(userId, loginDate) {
        // console.log("data", userId);
        // console.log("loginDate", loginDate);

        this.setState({
            userId: userId,
            loginDate: loginDate,
            deleteModal: !this.state.deleteModal,
        }, () => { this.checkRegularize(); }
        );
    }



    closeDeleteModal = () => {
        this.setState({
            note: "",
            deleteModal: false,

        });
    };


    onChangeNote = (e) => {

        this.setState({
            note: e
        });
    };
    checkRegularize() {
        this.props.dispatch(attendanceActions.checkRegularize({ userId: this.state.userId, request_date: this.state.loginDate }));
    }
    submitNotes = () => {

        this.props.dispatch(attendanceActions.regularize({ userId: this.state.userId, note: this.state.note }));


    };


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
    // percentage = (partialValue, totalValue) => {
    //     console.log(("avg", 100 * partialValue) / totalValue);
        // return (100 * partialValue) / totalValue;
    // };
    componentDidMount() {

        const d = new Date();
        let month = d.getMonth();
        this.handleSelectedMonth(month);
        this.getToday();
        this.getReportingList(this.state.user.data._id);
        this.configureSocket();


    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.success) {
            setTimeout(() => {
                this.setState({
                    deleteModal: false
                });

            }, 3000);
        }
        if (nextProps.attendanceList != undefined) {
            this.showAttandanceList(nextProps.attendanceList);
            if (nextProps.attendanceList) {


                let attendanceList = nextProps.attendanceList;
                const getDate = newArray.map(item => item);
                var filteredKeywords = [];
                getDate.map((item) => {
                    var tracker = 1;
                    attendanceList.map((date) => {
                        if (item === date.loginDate) {
                            filteredKeywords.push(date);
                            tracker = 0;
                        }
                    });
                    if (tracker) {
                        filteredKeywords.push({ loginDate: item });
                    }
                });

                this.setState({
                    filteredKeywords
                });
                let data = [];
                let AlltotalRecords = [];

                let netHours = nextProps.attendanceList;

                var loginDate = netHours.map(item => item.log_in_time);
            
                var loginDateLength = loginDate.length;

                let sum = 0;
                loginDate.map((value) => {
                    if (value === "12:35:17 PM") {
                        sum = sum + 1;
                       
                    }
                    return 0;
                });
                var percentage = Math.floor(sum / loginDateLength * 100);
                this.setState({
                    percentage
                });
                console.log("pecentage",percentage);
               
                netHours.map((item) =>
                    item.totalEffectiveTime.map((sItem) =>
                        data.push(sItem)
                    ));
                for (var d = 0; d < data.length; d++) {
                    AlltotalRecords.push({ seconds: parseFloat(data[d].seconds), minutes: parseFloat(data[d].minutes), hours: parseFloat(data[d].hours) });
                }
                var length = AlltotalRecords.length;
                // console.log(AlltotalRecords);

                this.setState({
                    length
                });

                const hours = AlltotalRecords.reduce((total, currentValue) => total = total + currentValue.hours, 0);
                const minutes = AlltotalRecords.reduce((total, currentValue) => total = total + currentValue.minutes, 0);
                // console.log("raksha", "" + hours + "h" + ":" + minutes + "m");

                var hrsconvertToMinute = Math.floor(hours * 60);
                var combine = Math.floor(hrsconvertToMinute + minutes);
                var totalAvg = combine / length;

                // console.log(totalAvg);
                var hrs = Math.floor(totalAvg / 60);
                var convertmin = totalAvg % 60;
                var min = parseInt(convertmin);
                this.setState({
                    hrs,
                    min
                });
                // console.log(hrs,min);

            }



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
    }

    render() {
        const { error } = this.props;
        const { success } = this.props;
        const { attendanceList } = this.state;
        console.log("attendanceList",attendanceList);
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
                                <h2 className="page-heading"> Attendance </h2>
                            </div>
                        </div>
                        <div className="row align-items-center pt-4 border-mobile">

                            <div className="col-lg-2">
                                <select
                                    className="filter-dd dropdown"
                                    onChange={this.handleReportUser}
                                >
                                    <option value={this.state.user.data._id} >{this.state.user.data.first_name + " " + this.state.user.data.last_name}</option>
                                    {this.state.ReportingList.map((repo, idx) =>
                                        <option key={idx} value={repo.value}>{repo.label}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-lg-10">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination mb-0">
                                        {
                                            this.state.allMonth.map((month, idx) =>
                                                <li key={idx} className={"page-item " + (this.state.selectedMonth == idx + 1 ? "active" : "")}><a onClick={() => this.setMonth(idx)} className="page-link" href="javascript:;">{month}</a></li>
                                            )
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div id="table-scroll" className="table-scroll mt-4">
                            <table id="main-table" className="main-table full-first-td">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col" className="text-right">Net Hrs</th>
                                        <th scope="col" className="text-right">Gross Hrs</th>
                                        <th scope="col" className="text-right">Arrival</th>
                                        <th scope="col" className="text-right">Log Out</th>
                                        <th scope="col" className="text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filteredKeywords.map((item, index) => (
                                        <tr key={index}>

                                            <td>{dateFormat(item.loginDate, "ddd, dd mmmm")}</td>
                                            {
                                                item.totalEffectiveTime ? <td className="text-right">{item.totalEffectiveTime[0].hours + "h" + ":" + item.totalEffectiveTime[0].minutes + "m"}
                                                </td> : (new Date(item.loginDate).getDay() === 6 || (new Date(item.loginDate).getDay() === 0)) ? <td colSpan="5"> <span className="capsule lable_weekoff text-center ml-1">Week Off</span></td> : <td colSpan="5"><span className="capsule lable_weekoff text-center ml-1">Leave</span> </td>

                                            }
                                            {item.totalEffectiveTime ? <td className="text-right">9h:30m</td> : ""}

                                            {item.log_in_time ? <td className="text-right">
                                                {dateFormat("2022-01-01 " + item.log_in_time, "hh:MM")}
                                            </td> : ""}
                                            {item.attendanceDetail ? <td className="text-right">
                                                {item.attendanceDetail[item.attendanceDetail.length - 1].log_out_time}
                                            </td> : ""}
                                            {item.attendanceDetail ?
                                                <td data-th="Order Value" className="text-right">
                                                    {
                                                        item.attendanceDetail[item.attendanceDetail.length - 1].log_out_time === null
                                                            ?
                                                            <React.Fragment>
                                                                <div>
                                                                    <Button
                                                                        id={`btn-${index}`}
                                                                        // id={parseInt(index)}
                                                                        type="button"
                                                                        color="light"
                                                                        size="sm"
                                                                    >
                                                                        <i className="fa-lg fa fa-exclamation-circle text-warning" aria-hidden="true"></i>
                                                                    </Button>
                                                                    <UncontrolledPopover
                                                                        placement="top"
                                                                        target={`btn-${index}`}
                                                                        // target={parseInt(index)}
                                                                        trigger="click"
                                                                    >
                                                                        <PopoverHeader>
                                                                            {dateFormat(item.loginDate, "ddd, dd mmmm  yyyy")}
                                                                        </PopoverHeader>
                                                                        <PopoverHeader>

                                                                            <span className="ic-edit icon icon-sm text-link mr-8" onClick={this.openModel.bind(this, item.userId, item.loginDate)}>Regularize</span>

                                                                        </PopoverHeader>
                                                                        <PopoverBody>
                                                                            {
                                                                                item.attendanceDetail.map((atten, idx) =>
                                                                                    <div key={idx} className="row">
                                                                                        <div className="col-6">{atten.log_in_time}</div>
                                                                                        <div className="col">{atten.log_out_time}</div>
                                                                                    </div>
                                                                                )}
                                                                        </PopoverBody>
                                                                    </UncontrolledPopover>
                                                                </div>
                                                            </React.Fragment>
                                                            :
                                                            <React.Fragment>
                                                                <div>
                                                                    <Button
                                                                        id={`btn-${index}`}
                                                                        // id={parseInt(index)}
                                                                        type="button"
                                                                        color="light"
                                                                        size="sm"
                                                                    >
                                                                        <i className="fa fa-check-circle text-success fa-lg" aria-hidden="true"></i>

                                                                        {/* <i className="fa fa-check text-success fa-lg" aria-hidden="true"></i> */}
                                                                    </Button>
                                                                    <UncontrolledPopover
                                                                        placement="top"
                                                                        target={`btn-${index}`}
                                                                        // target={parseInt(index)}
                                                                        trigger="focus"
                                                                    >
                                                                        <PopoverHeader>
                                                                            {dateFormat(item.loginDate, "ddd, dd mmmm  yyyy")}
                                                                        </PopoverHeader>
                                                                        <PopoverHeader>
                                                                            <Link to="#" >Regularization</Link>
                                                                        </PopoverHeader>
                                                                        <PopoverBody>
                                                                            {
                                                                                item.attendanceDetail.map((atten, idx) =>
                                                                                    <div key={idx} className="row">
                                                                                        <div className="col">{atten.log_in_time}</div>
                                                                                        <div className="col">{atten.log_out_time}</div>
                                                                                    </div>
                                                                                )}
                                                                        </PopoverBody>
                                                                    </UncontrolledPopover>
                                                                </div>
                                                            </React.Fragment>

                                                    }
                                                </td>
                                                : ""}


                                        </tr>
                                    ))}
                                    {this.state.filteredKeywords.length < 1 &&
                                        <tr>
                                            <td colSpan="5" className="text-center">No record</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                <div className="right-aside">
                    <p className="mt-5 text-center"><small>{this.state.SelectedMonth} Attendance Summary</small><br /> {this.state.ReportingName ? this.state.ReportingName : this.state.user.data.first_name + " " + this.state.user.data.last_name}</p>

                    <div className="stats">
                        <div className="stats-big">{"" + this.state.hrs + "h" + ":" + this.state.min + "m"}</div>

                        <div className="stats-small">Avg/Day</div>
                    </div>
                    <div className="stats">
                        <div className="stats-big">{this.state.percentage}%</div>
                        <div className="stats-small">On-time Arrival</div>
                    </div>
                </div>
                <Footer />
                <Modal size="md" isOpen={this.state.deleteModal} toggle={() => this.closeDeleteModal()}>

                    <ModalHeader className="header-less ml-3" toggle={() => this.closeDeleteModal()} >
                        <h5> Attendance Regularization -  {dateFormat(new Date(), "dd mmmm  yyyy")}</h5>
                        {error ? <span className="text-danger">{error.note}</span> : ""}
                        {success ? <span className="text-success">{success.message}</span> : ""}
                    </ModalHeader>
                    <ModalBody className="border-0 text-center">
                        <label>Reason</label>
                        <textarea rows="4" cols="40" className="form-control"
                            name={this.state.note}
                            onChange={(e) => this.onChangeNote(e.target.value)}></textarea>

                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex justify-content-end w-100">
                            <button className="btn btn-secondary mr-2" onClick={this.closeDeleteModal}>Cancel</button>
                            <button className="btn btn-primary" onClick={this.submitNotes}>Request</button>


                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { attendanceList, error, success } = state.rootReducer.attendances;
    const { ReportingList } = state.rootReducer.users;
    return {
        error,
        success,
        attendanceList,
        ReportingList
    };
}

export default connect(mapStateToProps)(Index);