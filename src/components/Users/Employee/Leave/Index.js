import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Pagination from "react-js-pagination";
import Footer from "../../../GlobalComponents/Footer";
import Navbar from "../Layout/Navbar";
import { leaveActions, userActions, HoliDayActions } from "../../../../actions";
import dateFormat from "dateformat";
import Select from "react-select";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { APIURL } from "../../../../constants/config";
import socketClient from "socket.io-client";
import {colourStyles} from "../../../../constants/ColorStyle";




const statusOptions = [
    { value: "", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "reject", label: "Rejected" }
];

const HalfDays = [
    { id: 1, value: "full_day", label: "Full Day" },
    { id: 2, value: "first_half", label: "First Half" },
    { id: 3, value: "second_half", label: "Second Half" },
];
const fromHalfDays = [
    { id: 2, value: "full_day", label: "First Half" },
    { id: 3, value: "second_half", label: "Second Half" },
];

const toHalfDays = [
    { id: 2, value: "first_half", label: "First Half" },
    { id: 3, value: "full_day", label: "Second Half" },
];

// const colourStyles = {
//     option: (styles, { isFocused, isSelected, isVisited }) => {
//         return {
//             ...styles,
//             cursor: "pointer",
//             backgroundColor: isFocused
//                 ? "#f8f9fa"
//                 : isSelected
//                     ? "#eee"
//                     : isVisited
//                         ? "#eee"
//                         : undefined,
//             color: isSelected ? "#000" : "#111",
//         };
//     },
//     control: (styles) => ({
//         ...styles,
//         cursor: "pointer"
//     }),
// };
const hoildayName = { "second_half": "second half", "first_half": "first half", "full_day": "full day" };
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            leaveType: { "value": "", "label": "" },
            ReportingList: [],
            ReportingName: "",
            note: "",
            value: "",
            userId: "",
            leave_id: "",
            notify: "",
            startDate: "",
            endDate: "",
            modal: false,
            error: {},
            ScsMsg: "",
            LeaveScsMsg: "",
            LeaveDaysCount: 0,
            deleteModal: false,
            deleteLeaveId: "",
            CLeaveData: "",
            SLeaveData: "",
            selectdate: false,
            filterStatus: [{ value: "", label: "All" }],
            filterFromDate: "",
            filterToDate: "",
            filterReportUser: [{ value: "", label: "" }],
            activePage: 1,
            limit: 10,
            totalItemsCount: 1,
            difultLeaveType: [],
            openModel: false,
            compaireDate: false,
            diffDays: 0,
            activeFrom: "full_day",
            activeto: "full_day",
            isHoliday: false,
            holidayList: []


        };

        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.userChangeHandle = this.userChangeHandle.bind(this);
        this.statusChangeHandle = this.statusChangeHandle.bind(this);
        this.fromDateHandle = this.fromDateHandle.bind(this);
        this.toDateHandle = this.toDateHandle.bind(this);
    }

    handleLeaveType = (leaveType) => {
        // const value = this.state.leaveType.label;
        this.setState({
            leaveType: { "value": leaveType.value, "label": leaveType.label }
        });
    };

    setShift(value, type) {
        if (type === "from_half_day") {
            if (value === "full_day") {
                this.setState({
                    activeFrom: value,
                }, () => this.getDiff());
            } else {
                this.setState({
                    activeFrom: value,
                }, () => this.getDiff());
            }
        }
        if (type === "to_half_day") {
            if (value === "full_day") {
                this.setState({
                    activeto: value,
                }, () => this.getDiff());
            } else {
                this.setState({
                    activeto: value,
                }, () => this.getDiff());
            }
        }
    }

    handleStartDate(date) {
        var startdat = dateFormat(date, "yyyy-mm-dd");
        var endDate = this.state.endDate;
        if (this.state.endDate != "") {
            var enddat = dateFormat(this.state.endDate, "yyyy-mm-dd");
            if (startdat > enddat) {
                endDate = date;
            }
        }

        this.setState({
            startDate: date,
            endDate: endDate,
            activeFrom: "full_day",
            activeto: "full_day",
        }, () => {
            this.filterHolidayList();

        });
    }

    handleEndDate(date) {
        var enddat = dateFormat(date, "yyyy-mm-dd");
        var startDate = this.state.startDate;
        if (this.state.startDate != "") {
            var startdat = dateFormat(this.state.startDate, "yyyy-mm-dd");
            if (startdat > enddat) {
                startDate = date;
            }
        }
        this.setState({
            openModel: true,
            endDate: date,
            startDate: startDate,
            selectdate: true,
            activeFrom: "full_day",
            activeto: "full_day",
        }, () => {

            this.filterHolidayList();
        });
    }

    openModel(data) {

        this.setState({
            modal: !this.state.modal,
            userId: data._id,
            activeFrom: "full_day",
            activeto: "full_day",
            // LeaveDaysCount:""

        });
    }

    closeModal = () => {
        this.setState({
            modal: false,
            ScsMsg: "",
            note: "",
            error: "",
            startDate: "",
            endDate: "",
            leaveType: { "value": "", "label": "" },
            selectdate: false,
            activeto: "",
            activeFrom: "",
            LeaveDaysCount: "",
        });
    };

    sendLeaveRequest = () => {
        if ((this.state.LeaveDaysCount > 0) || (this.state.startDate == "" || this.state.endDate == "")) {
            this.setState({ error: "" });
            this.props.dispatch(leaveActions.sendLeaveRequest({
                userId: this.state.userId,
                from_date: this.state.startDate !== "" ? dateFormat(this.state.startDate, "yyyy-mm-dd") : "",
                to_date: this.state.endDate !== "" ? dateFormat(this.state.endDate, "yyyy-mm-dd") : "",
                note: this.state.note,
                leave_type: this.state.leaveType.value,
                notify_to: this.state.userId,
                from_date_half: this.state.activeFrom,
                to_date_half: this.state.activeto,
                leave_count: this.state.LeaveDaysCount
            }));
        }

    };
    openEditModel(data) {
        this.editLeaveRequest(data._id);
        this.setState({
            editModal: !this.state.editModal,
            userId: data.userId,
            error: "",
            startDate: "",
            endDate: "",

        });
    }


    closeEditModal = () => {
        this.setState({
            editModal: false,
            note: "",
            startDate: "",
            endDate: "",
            leaveType: { "value": "", "label": "" },
            error: "",
            activeto: "",
            activeFrom: "",
            LeaveDaysCount: ""
        });
    };

    onChangeHandle = (e) => {
        this.setState({
            note: e
        });

    };

    handleChangeLeave(event) {
        this.setState({
            value: event.target.value
        });
    }

    updateSendLeaveRequest(userId) {
        if ((this.state.LeaveDaysCount > 0) || (this.state.startDate == "" || this.state.endDate == "")) {
            this.props.dispatch(leaveActions.updateRequestedLeave({
                userId: userId, id: this.state.leave_id,
                from_date: this.state.startDate === "" ? dateFormat(this.state.startDate, "yyyy-mm-dd") : this.state.startDate,
                to_date: this.state.endDate === "" ? dateFormat(this.state.endDate, "yyyy-mm-dd") : this.state.endDate,
                note: this.state.note,
                leave_type: this.state.leaveType.value === "null" ? "" : this.state.leaveType.value,
                notify_to: this.state.userId,
                from_date_half: this.state.activeFrom,
                to_date_half: this.state.activeto,
                leave_count: this.state.LeaveDaysCount
            }));
        }

    }

    editLeaveRequest(id) {
        this.props.dispatch(leaveActions.editLeaveRequest(id));
    }

    deleteLeaveRequest(id) {
        this.props.dispatch(leaveActions.deleteSendLeaveRequest({ id: id }));
    }

    openDeleteModal(id) {
        this.setState({
            deleteModal: true,
            deleteLeaveId: id
        });
    }

    closeDeleteModal = () => {
        this.setState({
            deleteModal: false
        });
    };

    getLeavesList() {
        var reportUser = "";
        if (this.state.filterReportUser && this.state.filterReportUser.length > 0) {
            reportUser = this.state.filterReportUser[0].value;
        }
        this.props.dispatch(leaveActions.getLeavesList({ page: this.state.activePage, userId: reportUser, search: "", reportTo: "", leaveStatusFilter: this.state.filterStatus[0].value, startDate: this.state.filterFromDate, endDate: this.state.filterToDate }));
    }

    getCasualLeaveData() {
        if (this.state.filterReportUser && this.state.filterReportUser.length > 0) {
            this.props.dispatch(leaveActions.checkCasualLeaves({ userId: this.state.filterReportUser[0].value }));
        }
    }

    getSickLeaveData() {
        if (this.state.filterReportUser && this.state.filterReportUser.length > 0) {
            this.props.dispatch(leaveActions.checkSickLeaves({ userId: this.state.filterReportUser[0].value }));
        }
    }
    getUnpaidLeaveCount() {
        if (this.state.filterReportUser && this.state.filterReportUser.length > 0) {
            this.props.dispatch(leaveActions.checkUnpaidLeave({ userId: this.state.filterReportUser[0].value }));
        }
    }
    getReportingList() {
        if (this.state.user) {
            this.props.dispatch(userActions.getReportingList({ reportTo: this.state.user.data._id }));
        }
    }
    setReportingList(item) {
        // console.log(item)
        let reportList = [];
        reportList.push({ value: this.state.user.data._id, label: this.state.user.data.first_name + " " + this.state.user.data.last_name });
        for (var c = 0; c < item.length; c++) {
            reportList.push({ value: item[c]._id, label: item[c].first_name + " " + item[c].last_name });
        }
        this.setState({
            ReportingList: reportList
        });

    }

    getDiff = () => {
        // new Date(dateFormat(this.state.endDate, "dd mmmm yyyy")).getDate() - new Date(dateFormat(this.state.startDate, "dd mmmm yyyy")).getDate()
        const date1 = new Date(dateFormat(this.state.startDate, "dd mmmm yyyy"));
        const date2 = new Date(dateFormat(this.state.endDate, "dd mmmm yyyy"));

        const diffTime = Math.abs(date2 - date1);

        let count = [];
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        var currentDate = new Date(dateFormat(this.state.startDate, "yyyy-mm-dd"));
        const endDate = new Date(dateFormat(this.state.endDate, "yyyy-mm-dd"));
        if (diffDays == 0) {
            if (currentDate.getDay() == 6 || currentDate.getDay() == 0) {
                if (this.state.activeFrom == "full_day") {
                    count = 1;
                }
            }
            else { count = (this.state.activeFrom == "first_half" || this.state.activeFrom == "second_half") ? 0.5 : 1; }
        }
        if (diffDays > 0) {
            count = diffDays + 1;
            if (this.state.activeFrom == "second_half" && currentDate.getDay() != 6 && currentDate.getDay() != 0) {
                count = count - 0.5;
            }

            if (this.state.activeto == "first_half" && endDate.getDay() != 6 && endDate.getDay() != 0) {
                count = count - 0.5;
            }

            this.state.holidayList.map((item) => {


                if (item == dateFormat(this.state.startDate, "yyyy-mm-dd") && this.state.activeFrom == "second_half" && currentDate.getDay() != 6 && currentDate.getDay() != 0) {
                    count = count + 0.5;
                }

                if (item == dateFormat(this.state.endDate, "yyyy-mm-dd") && this.state.activeto == "first_half" && endDate.getDay() != 6 && endDate.getDay() != 0) {
                    count = count + 0.5;
                }

            });
        }
        let leaveCount = [];
        leaveCount = count;
        var holidayCount = 0;
        this.setState({ isHoliday: false });
        while (currentDate <= endDate) {

            if (currentDate.getDay() == 6) {
                this.setState({ isHoliday: true });
                holidayCount++;
            }

            if (currentDate.getDay() == 0) {
                this.setState({ isHoliday: true });
                holidayCount++;
            }

            currentDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() + 1, // Will increase month if over range
            );

        }

        leaveCount -= holidayCount;

        if (this.state.holidayList && this.state.holidayList.length > 0) {
            leaveCount -= this.state.holidayList.length;
        }


        if (leaveCount < 0) {
            leaveCount = 0;
        }
        this.setState({
            LeaveDaysCount: leaveCount,
            diffDays: diffDays
        });
    };
    userChangeHandle(e) {
        this.setState({
            activePage: 1,
            filterReportUser: [{ value: e.value, label: e.label }]
        }, () => {
            this.getLeavesList();
            this.getCasualLeaveData();
            this.getSickLeaveData();
            this.getUnpaidLeaveCount();
        });
    }

    statusChangeHandle(e) {
        this.setState({
            activePage: 1,
            filterStatus: [{ value: e.value, label: e.label }]
        }, () => { this.getLeavesList(); });
    }

    fromDateHandle(e) {
        this.setState({
            activePage: 1,
            filterFromDate: e.target.value
        }, () => { this.getLeavesList(); });
    }

    toDateHandle(e) {
        this.setState({
            activePage: 1,
            filterToDate: e.target.value,
        }, () => {
            this.getLeavesList();

        });
    }

    handlePageChange(pageNumber) {
        this.setState(
            {
                activePage: pageNumber
            }
            , () => {
                this.getLeavesList();
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
    leaveModelFalse() {
        //this.getLeavesList();
        this.closeEditModal();
        this.closeModal();
        this.closeDeleteModal();
        this.addToSocket();
    }
    addLeaveModelfalse() {
        this.setState({
            error: "",
            ScsMsg: ""
        }, () => {
            this.closeModal();
            this.closeDeleteModal();
            this.addToSocket();
            // this.getLeavesList();

        });
    }

    addToSocket() {
        var socket = socketClient(APIURL, { transports: ["websocket"] });
        socket.emit("leave", { userId: this.state.user.data._id });

    }



    leaveType() {
        if (this.state.user) {
            let leaveType = [];
            var JoiningDate = [];
            const date = new Date();
            let joinDate = dateFormat(this.state.user.data.date_of_joining, "yyyy-mm-dd");
            var nextMonth = new Date(joinDate);
            JoiningDate = nextMonth.setMonth(nextMonth.getMonth() + 2);
            if (JoiningDate < date) {
                leaveType.push({ value: "casual leave", label: "Casual Leave " });
                leaveType.push({ value: "sick leave", label: "Sick Leave" });
            }
            leaveType.push({ value: "unpaid leave", label: "Unpaid Leave" });

            this.setState({
                difultLeaveType: leaveType
            });
        }
    }

    configureSocket = () => {
        var socket = socketClient(APIURL, { transports: ["websocket"] });
        socket.on("leave", data => {
            if (this.state.filterReportUser[0].value == data.userId) {
                this.getLeavesList();
            }
        });

    };

    setDefultFilter() {
        if (JSON.parse(localStorage.getItem("user"))) {
            this.setState({
                user: JSON.parse(localStorage.getItem("user")),
                filterReportUser: [{ value: JSON.parse(localStorage.getItem("user")).data._id, label: JSON.parse(localStorage.getItem("user")).data.first_name + " " + JSON.parse(localStorage.getItem("user")).data.last_name }]
            }, () => {
                this.leaveType();
                this.getReportingList();
                this.getLeavesList();
                this.getDiff();
                this.getCasualLeaveData();
                this.getSickLeaveData();
                this.getUnpaidLeaveCount();
                this.configureSocket();
            });

        }
    }
    filterHolidayList() {
        if (this.state.startDate != "" && this.state.endDate != "") {
            var sdate = new Date(this.state.startDate);

            var edate = new Date(this.state.endDate);
            var separator = "-";
            sdate = `${sdate.getFullYear()}${separator}${sdate.getMonth() + 1 < 10 ? `0${sdate.getMonth() + 1}` : `${sdate.getMonth() + 1}`}${separator}${sdate.getDate() < 10 ? `0${sdate.getDate()}` : `${sdate.getDate()}`}`;
            edate = `${edate.getFullYear()}${separator}${edate.getMonth() + 1 < 10 ? `0${edate.getMonth() + 1}` : `${edate.getMonth() + 1}`}${separator}${edate.getDate() < 10 ? `0${edate.getDate()}` : `${edate.getDate()}`}`;


            this.props.dispatch(HoliDayActions.filterHolidayList({
                from_date: sdate + " 00:00:00",
                to_date: edate + " 23:59:59"
            }));

        } else {

            console.log("noRecorde ");
        }
    }
    setHolidayFilter(data) {
        var holidaResult = [];
        var result = [];
        var getCurrentDate = "";
        var getEndDate = "";
        var separator = "-";

        data.map((item) => {
            getCurrentDate = new Date(item.from_date);
            getEndDate = new Date(item.to_date);
            getCurrentDate = new Date(
                getCurrentDate.getFullYear(),
                getCurrentDate.getMonth(),
                getCurrentDate.getDate()
            );

            getEndDate = new Date(
                getEndDate.getFullYear(),
                getEndDate.getMonth(),
                getEndDate.getDate()
            );

            while (getCurrentDate <= getEndDate) {
                holidaResult.push(`${getCurrentDate.getFullYear()}${separator}${getCurrentDate.getMonth() + 1 < 10 ? `0${getCurrentDate.getMonth() + 1}` : `${getCurrentDate.getMonth() + 1}`}${separator}${getCurrentDate.getDate() < 10 ? `0${getCurrentDate.getDate()}` : `${getCurrentDate.getDate()}`}`);
                getCurrentDate = new Date(
                    getCurrentDate.getFullYear(),
                    getCurrentDate.getMonth(),
                    getCurrentDate.getDate() + 1, // Will increase month if over range
                );
            }
        });
        console.log("holidaResult before", holidaResult);
        holidaResult = holidaResult.filter((v, i, a) => a.indexOf(v) === i);
        console.log("holidaResult after", holidaResult);
        if (holidaResult.length > 0) {
            /*console.log("dates",holidaResult);
            var max= holidaResult.sort((a,b)=>a-b)[0];
            var min= holidaResult.slice(-1)[0];
            console.log("min max", min+"  "+max);
            min=new Date(min);
            max=new Date(max);

            

            let currentDate = new Date(
                min.getFullYear(),
                min.getMonth(),
                min.getDate()
            );

            let endDate = new Date(
                max.getFullYear(),
                max.getMonth(),
                max.getDate()
            );*/



            /*while (currentDate <= endDate) {
               
                if(currentDate>=this.state.startDate && currentDate<=this.state.endDate &&  currentDate.getDay() != 6 && currentDate.getDay() != 0)
                {
                    result.push(`${currentDate.getFullYear()}${separator}${currentDate.getMonth()+1<10?`0${currentDate.getMonth()+1}`:`${currentDate.getMonth()+1}`}${separator}${currentDate.getDate()<10?`0${currentDate.getDate()}`:`${currentDate.getDate()}`}`);
                }

                currentDate = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() + 1, // Will increase month if over range
                );
            }*/
            var item1 = "";

            var strt = dateFormat(this.state.startDate, "yyyy-mm-dd");
            var endd = dateFormat(this.state.endDate, "yyyy-mm-dd");

            holidaResult.map((item) => {
                item1 = new Date(item);
                if (item >= strt && item <= endd && item1.getDay() != 6 && item1.getDay() != 0) {
                    result.push(`${item1.getFullYear()}${separator}${item1.getMonth() + 1 < 10 ? `0${item1.getMonth() + 1}` : `${item1.getMonth() + 1}`}${separator}${item1.getDate() < 10 ? `0${item1.getDate()}` : `${item1.getDate()}`}`);
                }


            });
        }

        this.setState({
            holidayList: result
        }, () => { this.getDiff(); });

    }
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    componentDidMount() {
        this.setDefultFilter();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error != undefined) {
            this.setState({
                error: nextProps.error
            });
        }

        if (nextProps.LeaveActivePage != undefined && nextProps.LeaveTotalItemsCount != undefined && nextProps.LeaveLimit != undefined) {
            this.handlePageStates(nextProps.LeaveActivePage, nextProps.LeaveTotalItemsCount, 10);
        }


        if (nextProps.LeaveList != undefined) {
            this.setState({
                model: false
            });
        }
        if (nextProps.EditList != undefined && this.state.startDate == "") {

            this.setState({
                userId: nextProps.EditList.userId,
                startDate: new Date(nextProps.EditList.from_date),
                endDate: new Date(nextProps.EditList.to_date),
                note: nextProps.EditList.note,
                leaveType: nextProps.EditList.leave_type === "unpaid leave" ? { value: "unpaid leave", label: "Unpaid Leave" } : nextProps.EditList.leave_type === "casual leave" ? { value: "casual leave", label: "Casual Leave " } : { value: "sick leave", label: "Sick Leave" },
                notify_to: nextProps.EditList.notify_to,
                leave_id: nextProps.EditList._id,
                activeFrom: nextProps.EditList.from_date_half == "" ? "full_day" : nextProps.EditList.from_date_half,
                activeto: nextProps.EditList.to_date_half == "" ? "full_day" : nextProps.EditList.to_date_half,
                LeaveDaysCount: nextProps.EditList.leave_count
            }, () => {
                this.filterHolidayList();
            });

        }

        if (nextProps.addModal == false) {
            this.addLeaveModelfalse();
        }

        if (nextProps.ReportingList != undefined) {
            this.setReportingList(nextProps.ReportingList);
        }
        if (nextProps.editModal == false) {
            this.leaveModelFalse();
        }
        if (nextProps.deleteModel == false) {
            this.leaveModelFalse();
        }
        if (nextProps.holidaysList != undefined) {
            this.setHolidayFilter(nextProps.holidaysList);
        }



    }
    render() {
        const { error, ScsMsg } = this.state;
        const { LeaveList, loading, SLeaveData, CLeaveData, UnpaidLeaveData, LeaveScsMsg } = this.props;

        if (!this.state.user) {
            return <Redirect to="/" />;
        }

        if (this.state.user.data.user_role !== "Employee") {
            return <Redirect to="/" />;
        }

        return (
            <>
                <Navbar activePage="dashboard" />
                <main className="offset">
                    <div className="container-fluid hard-pad">
                        <div className="row align-items-center pt-4 border-mobile">
                            <div className="col-lg-4 col-6">
                                <h2 className="page-heading">Leaves</h2>
                            </div>
                            <div className="col-lg-8 text-right">
                                <a href="javascript:;" data-toggle="modal" data-target="#applyLeave" onClick={this.openModel.bind(this, this.state.user.data)} className="link">Apply Leave</a>
                            </div>
                        </div>
                        <div className="row align-items-center pt-4 border-mobile">
                            <div className="col-lg-12">
                                <ul className="submenu menu_width" style={{ position: "relative", zIndex: 2 }}>
                                    <li>
                                        <Select styles={colourStyles} onChange={this.statusChangeHandle} value={this.state.filterStatus} options={statusOptions} />
                                    </li>
                                    <li>
                                        <Select styles={colourStyles} onChange={this.userChangeHandle} value={this.state.filterReportUser} options={this.state.ReportingList} />
                                    </li>
                                    <li>
                                        <input className="date_picker" type="date" onChange={this.fromDateHandle} value={this.state.filterFromDate} />
                                    </li>
                                    <li>
                                        <input className="date_picker" type="date" onChange={this.toDateHandle} value={this.state.filterToDate} />
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div id="table-scroll" className="table-scroll mt-4 pagination_mrg">
                            <table id="main-table" className="main-table full-first-td">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text_primary col-4">Leave Date</th>
                                        <th scope="col" className="text_primary col-6">Type/Reason</th>
                                        <th scope="col" className="text-left text_primary col-1">Status</th>
                                        <th scope="col" className="text_primary col-1" style={{ zIndex: "9999" }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {LeaveList && LeaveList.map((item, index) => (
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
                                            <td data-th="" className="">{this.Capitalize(item.leaves.leave_type)}<div><small>{item.leaves.note}</small>
                                            </div> </td>

                                            {item.leaves.status === "pending" ? <td data-th="" className="text-left">


                                                <span className="capsule red-dim ">{item.leaves.status}</span>
                                            </td> : item.leaves.status === "reject" ? <td data-th="" className="text-left">
                                                <span className="capsule Blackberry-dim ">rejected</span></td> : <td data-th="" className="text-left">

                                                <span className="capsule green-dim ">{item.leaves.status}</span></td>}
                                            <td className="text-right">

                                                {this.state.filterReportUser && this.state.user && this.state.user.data._id == this.state.filterReportUser[0].value && item.leaves.status === "pending" &&

                                                    <div className="action-area dropdown">
                                                        <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <span className="dots">...</span>
                                                        </a>
                                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <a className="dropdown-item" href="" data-toggle="modal" onClick={this.openEditModel.bind(this, item.leaves)} data-target="#editUser">Edit</a>
                                                            <Link className="dropdown-item" data-toggle="modal" onClick={this.openDeleteModal.bind(this, item.leaves._id)} data-target="#deleteUser">Delete</Link>
                                                        </div>

                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                    {
                                        LeaveList && LeaveList.length == 0 && loading == false &&
                                        <tr>
                                            <td colSpan="5" className="text-center">No record</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {LeaveList && LeaveList.length > 0 &&
                        <Pagination
                            className="pagination_mrg"
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
                    <p className="mt-5 text-center"><small>Leave balance</small>
                        <div>Jan 1 - Dec 31</div></p>


                    <div className="stats">
                        <div className="stats-big">{CLeaveData && CLeaveData.consumedLeave}/{CLeaveData && CLeaveData.totalLeave}</div>
                        <div className="stats-small">Casual Leaves</div>
                    </div>
                    <div className="stats">
                        <div className="stats-big">{SLeaveData && SLeaveData.consumedLeave}/{SLeaveData && SLeaveData.totalLeave}</div>
                        <div className="stats-small">Sick Leaves</div>
                    </div>
                    <div className="stats">
                        <div className="stats-big">{UnpaidLeaveData && UnpaidLeaveData.consumedLeave}/∞</div>
                        <div className="stats-small">Unpaid Leaves</div>
                    </div>
                </div>

                <Modal size="xl" isOpen={this.state.modal} toggle={() => this.closeModal()}>
                    <div className="modal-content">
                        <ModalHeader className="header-less" toggle={() => this.closeModal()}>
                            <h5 className="modal-title" id="exampleModalLabel">Apply Leave</h5>
                        </ModalHeader>
                        <ModalBody className="modal-body">
                            <div className="my-2">
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label >From<strong className="text-danger" >*</strong></label>
                                            <DatePicker
                                                placeholderText="Start Date"
                                                className="form-control"
                                                selected={this.state.startDate}
                                                onChange={this.handleStartDate}
                                                name="startDate"
                                                dateFormat="dd-MM-yyyy"
                                                autoComplete="off"
                                            />

                                            {error ? <span className="text-danger"> {error.from_date}</span> : ""}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>To<strong className="text-danger" >*</strong></label>
                                            <DatePicker
                                                placeholderText="End Date"
                                                className="form-control"
                                                selected={this.state.endDate}
                                                onChange={this.handleEndDate}
                                                name="startDate"
                                                dateFormat="dd-MM-yyyy"
                                                autoComplete="off"
                                            />


                                            {error ? <span className="text-danger"> {error.to_date}</span> : ""}
                                        </div>
                                    </div>
                                </div>


                                {(this.state.openModel && this.state.diffDays == 0) ?
                                    <div className="leave-rows my-3">
                                        <div className="form-row align-items-center border-top border-bottom py-2">
                                            <div className="col-4">{dateFormat(this.state.startDate, "dd mmm yyyy")}</div>
                                            <div className="col-8">
                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination mb-0">
                                                        {
                                                            HalfDays.map((shift, idx) =>
                                                                <li key={idx} className={"page-item" + (this.state.activeFrom == shift.value ? " active" : "")}><a onClick={() => this.setShift(shift.value, "from_half_day")} className="page-link  active" href="javascript:;">{shift.label}</a></li>

                                                            )
                                                        }

                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div> : ""}
                                {(this.state.openModel && this.state.diffDays > 0) ?
                                    <div className="leave-rows my-3">
                                        <div className="form-row align-items-center border-top border-bottom py-2">
                                            <div className="col-4">{dateFormat(this.state.startDate, "dd mmm yyyy")}</div>
                                            <div className="col-8">
                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination mb-0">
                                                        {
                                                            fromHalfDays.map((shift, idx) =>
                                                                <li key={idx} className={"page-item" + (this.state.activeFrom == shift.value ? " active" : "")}><a onClick={() => this.setShift(shift.value, "from_half_day")} className="page-link  active" href="javascript:;">{shift.label}</a></li>

                                                            )
                                                        }

                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>

                                        <div className="form-row align-items-center border-top border-bottom py-2">
                                            <div className="col-4">{dateFormat(this.state.endDate, "dd mmm yyyy")}</div>
                                            <div className="col-8">
                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination mb-0">
                                                        {
                                                            toHalfDays.map((shift, idx) =>
                                                                <li key={idx} className={"page-item" + (this.state.activeto == shift.value ? " active" : "")}><a onClick={() => this.setShift(shift.value, "to_half_day")} className="page-link  active" href="javascript:;">{shift.label}</a></li>
                                                            )
                                                        }
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div> : ""}


                                <div className="form-group">
                                    {(this.state.startDate && this.state.endDate) && this.state.LeaveDaysCount <= 1 ?
                                        <div className="form-group">

                                            <div className="alert alert-success" role="alert">
                                                Leave request is for {this.state.LeaveDaysCount} day.
                                            </div>
                                        </div> : ""}
                                    {(this.state.startDate && this.state.endDate) && this.state.LeaveDaysCount > 1 ?
                                        <div className="form-group">

                                            <div className="alert alert-success" role="alert">
                                                Leave request is for {this.state.LeaveDaysCount} days.
                                            </div>
                                        </div> : ""}

                                    <div className="form-group">
                                        <label >Select available leave types<strong className="text-danger" >*</strong></label>
                                        <Select
                                            styles={colourStyles}
                                            placeholder="Select Leave Type"
                                            value={this.state.leaveType}
                                            onChange={this.handleLeaveType}
                                            options={this.state.difultLeaveType}
                                            isClearable={true}
                                            getOptionLabel={e => (
                                                <div style={{ display: "flex", alignItems: "center" }}>


                                                    <span style={{ marginLeft: 5 }}>{e.label}</span>

                                                </div>
                                            )}
                                        />
                                        {error ? <span className="text-danger"> {error.leave_type}</span> : ""}
                                    </div>



                                    <div className="form-group">
                                        <label>Reason<strong className="text-danger" >*</strong></label>
                                        <textarea rows="3" className="form-control"
                                            name={this.state.note}
                                            onChange={(e) => this.onChangeHandle(e.target.value)}></textarea>
                                        {error ? <span className="text-danger"> {error.note}</span> : ""}
                                    </div>

                                </div>
                                <div className="col-12 p-0">
                                    {ScsMsg && <span className="text-success">{ScsMsg.message}</span>}
                                    {error ? <span className="text-danger"> {error.common}</span> : ""}
                                    {this.state.startDate != "" && this.state.endDate != "" && this.state.LeaveDaysCount <= 0 ? <span className="text-danger">Leave count should be greater than 0</span> : ""}

                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="modal-footer">
                            <Button color="secondary" onClick={() => this.closeModal()} >Cancel</Button>
                            {
                                loading ?
                                    <Button color="primary" >Loading...</Button>
                                    :

                                    <Button color="primary" onClick={this.sendLeaveRequest}>Request Leave</Button>
                            }
                        </ModalFooter>
                    </div>
                </Modal>
                <Modal size="xl" isOpen={this.state.editModal} toggle={() => this.closeEditModal()}>
                    <div className="modal-content">
                        <ModalHeader className="header-less" toggle={() => this.closeEditModal()}>
                            <h5 className="modal-title" id="exampleModalLabel">Edit Leave</h5>
                        </ModalHeader>

                        <ModalBody className="modal-body">
                            <div className="my-2">
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label >From<strong className="text-danger" > *</strong></label>

                                            <DatePicker
                                                placeholderText="Start Date"
                                                className="form-control"
                                                selected={this.state.startDate}
                                                onChange={this.handleStartDate}
                                                dateFormat="dd-MM-yyyy"
                                                autoComplete="off"
                                            />
                                            {error ? <span className="text-danger"> {error.from_date}</span> : ""}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>To<strong className="text-danger" >*</strong></label>
                                            <DatePicker
                                                placeholderText="End Date"
                                                className="form-control"
                                                selected={this.state.endDate}
                                                onChange={this.handleEndDate}
                                                dateFormat="dd-MM-yyyy"
                                                autoComplete='off'
                                            />
                                            {error ? <span className="text-danger"> {error.to_date}</span> : ""}
                                        </div>
                                    </div>
                                </div>
                                {this.state.diffDays == 0 ?
                                    <div className="leave-rows my-3">
                                        <div className="form-row align-items-center border-top border-bottom py-2">
                                            <div className="col-4">{dateFormat(this.state.startDate, "dd mmm yyyy")}</div>
                                            <div className="col-8">
                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination mb-0">
                                                        {
                                                            HalfDays.map((shift, idx) =>
                                                                <li key={idx} className={"page-item" + (this.state.activeFrom == shift.value ? " active" : "")}><a onClick={() => this.setShift(shift.value, "from_half_day")} className="page-link  active" href="javascript:;">{shift.label}</a></li>
                                                            )
                                                        }
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div> : <div className="leave-rows my-3">
                                        <div className="form-row align-items-center border-top border-bottom py-2">
                                            <div className="col-4">{dateFormat(this.state.startDate, "dd mmm yyyy")}</div>
                                            <div className="col-8">
                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination mb-0">
                                                        {
                                                            fromHalfDays.map((shift, idx) =>
                                                                <li key={idx} className={"page-item" + (this.state.activeFrom == shift.value ? " active" : "")}><a onClick={() => this.setShift(shift.value, "from_half_day")} className="page-link  active" href="javascript:;">{shift.label}</a></li>
                                                            )
                                                        }
                                                        {/* {
                                                        this.state.halfDays.map((shift, idx) =>
                                                            <li key={idx} className="page-item"><a onClick={() => this.setShift(shift)} className="page-link  active" href="javascript:;">{shift}</a></li>
                                                        )
                                                    } */}
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>

                                        <div className="form-row align-items-center border-top border-bottom py-2">
                                            <div className="col-4">{dateFormat(this.state.endDate, "dd mmm yyyy")}</div>
                                            <div className="col-8">
                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination mb-0">
                                                        {
                                                            toHalfDays.map((shift, idx) =>
                                                                <li key={idx} className={"page-item" + (this.state.activeto == shift.value ? " active" : "")}><a onClick={() => this.setShift(shift.value, "to_half_day")} className="page-link  active" href="javascript:;">{shift.label}</a></li>
                                                            )
                                                        }
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>}
                                {this.state.endDate ? <div className="form-group">
                                    {this.state.isHoliday === true &&
                                        <div className="alert alert-warning" role="alert">
                                            selected date is holiday.
                                        </div>
                                    }
                                    {(this.state.startDate && this.state.endDate) && this.state.LeaveDaysCount <= 1 ?
                                        <div className="form-group">

                                            <div className="alert alert-success" role="alert">
                                                Leave request is for {this.state.LeaveDaysCount} day.
                                            </div>
                                        </div> : ""}
                                    {(this.state.startDate && this.state.endDate) && this.state.LeaveDaysCount > 1 ?
                                        <div className="form-group">

                                            <div className="alert alert-success" role="alert">
                                                Leave request is for {this.state.LeaveDaysCount} days.
                                            </div>
                                        </div> : ""}
                                </div> : ""}
                                <div className="form-group">
                                    <label >Leave Type<strong className="text-danger" > *</strong></label>
                                    <Select
                                        styles={colourStyles}
                                        placeholder="Type"
                                        value={this.state.leaveType}
                                        onChange={this.handleLeaveType}
                                        options={this.state.difultLeaveType}
                                        isClearable={true}
                                        getOptionLabel={e => (
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <span style={{ marginLeft: 5 }}>{e.label}</span>
                                            </div>
                                        )}
                                    />

                                    {error ? <span className="text-danger"> {error.leave_type}</span> : ""}
                                </div>
                                <div className="form-group">
                                    <label>Reason<strong className="text-danger" > *</strong></label>
                                    <textarea rows="3" className="form-control"
                                        value={this.state.note}
                                        onChange={(e) => this.onChangeHandle(e.target.value)}></textarea>
                                    {error ? <span className="text-danger"> {error.note}</span> : ""}
                                </div>
                            </div>
                            <div className="col-12 p-0">
                                {LeaveScsMsg ? <span className="text-success">{LeaveScsMsg.message}</span> : ""}
                                {error ? <span className="text-danger"> {error.common}</span> : ""}
                                {this.state.startDate != "" && this.state.endDate != "" && this.state.LeaveDaysCount <= 0 ? <span className="text-danger">Leave count should be greater than 0</span> : ""}
                            </div>

                        </ModalBody>
                        <ModalFooter className="modal-footer">
                            <Button color="secondary" onClick={() => this.closeEditModal()} >Cancel</Button>
                            {
                                loading ?
                                    <Button color="primary" >Loading...</Button>
                                    :
                                    <Button color="primary" onClick={this.updateSendLeaveRequest.bind(this, this.state.userId)}>Update Leave</Button>
                            }
                        </ModalFooter>
                    </div>
                </Modal>
                <Modal size="ml" isOpen={this.state.deleteModal} toggle={() => this.closeDeleteModal()}>
                    <div className="modal-content">
                        <ModalHeader className="header-less" toggle={() => this.closeDeleteModal()}>
                            <div>Leave Request</div>
                        </ModalHeader>
                        <ModalBody className="border-0 text-left">
                            Are you sure want to delete leave ?
                            <div className="col-12 p-0">
                                {ScsMsg.message && <span className="text-success">{ScsMsg.message}</span>}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => this.closeDeleteModal()}>Cancel</Button>
                            {
                                loading ?
                                    <Button color="primary" >Loading... </Button>
                                    :
                                    <Button color="primary" onClick={this.deleteLeaveRequest.bind(this, this.state.deleteLeaveId)}>Delete</Button>
                            }
                        </ModalFooter>
                    </div>
                </Modal>
                <Footer />
            </>
        );
    }
}

function mapStateToProps(state) {
    const { ReportingList } = state.rootReducer.users;
    const { LeaveList, LeaveScsMsg, error, success, ScsMsg, EditList, loading, CLeaveData, SLeaveData, LeaveActivePage, LeaveTotalItemsCount, LeaveLimit, UnpaidLeaveData, addModal, editModal, deleteModel } = state.rootReducer.leaves;
    const { holidaysList } = state.rootReducer.holidays;
    return {
        error,
        success,
        ScsMsg,
        ReportingList,
        LeaveList,
        EditList,
        loading,
        CLeaveData,
        SLeaveData,
        UnpaidLeaveData,
        LeaveActivePage,
        LeaveTotalItemsCount,
        LeaveLimit,
        LeaveScsMsg,
        addModal,
        editModal,
        deleteModel,
        holidaysList
    };
}
export default connect(mapStateToProps)(Index);


