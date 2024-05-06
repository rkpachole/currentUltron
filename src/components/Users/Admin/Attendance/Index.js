import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "../../../GlobalComponents/Footer";
import Navbar from "../Layout/Navbar";
import { attendanceActions, adminUserActions, HoliDayActions, leaveActions } from "../../../../actions";
import dateFormat from "dateformat";
import socketClient from "socket.io-client";
import { APIURL } from "../../../../constants/config";
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Select from "react-select";
import Warrning from "../../../../assets/images/Warnning.png";
import { colourStyles } from "../../../../constants/ColorStyle";

let cdate = new Date();
let currentYear = cdate.getFullYear();


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            allMonth: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            attendanceList: [],
            filterUser: JSON.parse(localStorage.getItem("user")) ? [{ value: JSON.parse(localStorage.getItem("user")).data._id, lable: JSON.parse(localStorage.getItem("user")).data.first_name }] : [{ value: 0, label: "" }],
            filterFromDate: "",
            filterToDate: "",
            selectedMonth: cdate.getMonth() + 1,
            selectedYear: currentYear,
            ReportingList: [],
            ReportingName: "",
            timeDate: new Date(),
            result: [],
            filteredKeywords: [],
            regularizeModal: false,
            note: "",
            success: "",
            hrs: "",
            min: "",
            loading: false,
            yearList: [{ value: 2020, label: 2020 }, { value: 2021, label: 2021 }, { value: 2022, label: 2022 }],
            filterYear: [{ value: currentYear, label: currentYear }],
            filterMonth: cdate.getMonth(),
            filterReportUser: [{ value: "", label: "" }],
            totalHours: 0,
            shortDays: 0,
            currentDate: "",
            holidayList: [],
            LeaveList: [],
            leave:"",
            holidays:""
        };
        this.handleReportUser = this.handleReportUser.bind(this);
        this.closeRegularizeModal = this.closeRegularizeModal.bind(this);
        this.yearChangeHandle = this.yearChangeHandle.bind(this);
    }
    openModel(userId, loginDate) {
        this.setState({
            userId: userId,
            loginDate: loginDate,
            regularizeModal: true,
        }, () => { this.checkRegularize(); }
        );
    }
    closeRegularizeModal = () => {
        this.setState({
            note: "",
            regularizeModal: false,

        }, () => {
            this.getAttendanceList();
            // this.getLeavesList();
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
        this.props.dispatch(attendanceActions.regularize({ userId: this.state.userId, note: this.state.note, request_date: this.state.loginDate }));
        // this.setState({loading:false})
    };
    getAttendanceList() {
        this.props.dispatch(attendanceActions.getAttendanceList({ userId: this.state.filterUser[0].value, fromdate: this.state.filterFromDate, todate: this.state.filterToDate }));
    }



    getMonthDate() {
        var currentM = new Date().getMonth();
        var currentY = new Date().getFullYear();
        var date = new Date(this.state.selectedYear + "-" + this.state.selectedMonth + "-" + "01");
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date();

        if (date.getMonth() == currentM && currentY == date.getFullYear()) {

            lastDay = new Date();
        }
        else {
            lastDay = new Date(this.state.selectedYear, this.state.selectedMonth, 0);
        }

        var oneDay = 24 * 3600 * 1000;
        for (var fulldate = [], ms = firstDay * 1, last = lastDay * 1; ms <= last; ms += oneDay) {
            fulldate.push(dateFormat(new Date(ms), "yyyy-mm-dd"));
        }

        var newArray = [];
        for (var i = fulldate.length - 1; i >= 0; i--) {
            newArray.push(fulldate[i]);
        }

        return newArray;

    }
    showAttandanceList(data1) {
        let attendanceList = data1;
        var newArray1 = this.getMonthDate();
        const getDate = newArray1.map(item => item);


        var filteredKeywords = [];
        getDate.map((item) => {
            var tracker = 1;
            attendanceList.map((data) => {
                if (item === data.loginDate) {
                    filteredKeywords.push(data);

                    tracker = 0;
                }
            });
            if (tracker) {
                attendanceList;
                filteredKeywords.push({ loginDate: item });
            }
        });

        var currentDate = new Date();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let date = currentDate.getDate();
        let separator = "-";

        currentDate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
        this.setState({
            filteredKeywords,
            attendanceList: data1,
            currentDate: currentDate
        }, () => { this.calculateOneTime(); this.calculateAvrageDay(); this.calculateTotalHourse(); this.calculateShortDays(); });


    }
    calculateOneTime() {
        let attendanceList = this.state.attendanceList;
        var loginDateLength = attendanceList.length;

        let sum = 0; let logindateTime = ""; let fromDateTime = ""; let toDateTime = "";

        attendanceList.map((value) => {
            logindateTime = new Date(value.loginDate + " " + value.log_in_time);
            fromDateTime = new Date(value.loginDate + " 12:01:00 AM");
            toDateTime = new Date(value.loginDate + " 11:01:00 AM");
            if (logindateTime.getTime() >= fromDateTime.getTime() && logindateTime.getTime() <= toDateTime.getTime()) {
                sum = sum + 1;
            }
            return 0;
        });

        var percentage = Math.floor(sum / loginDateLength * 100);

        this.setState({
            percentage: isNaN(percentage) ? 0 : percentage
        });
    }

    calculateShortDays() {
        let totalEffectiveTime = [];
        let AlltotalRecords = []; let staurday = 0;

        let attendanceList = this.state.attendanceList;
        attendanceList = attendanceList.filter((item) => item.loginDate != this.state.currentDate);

        attendanceList.map((item) =>
            item.totalEffectiveTime.map((sItem) =>
                totalEffectiveTime.push(sItem)
            )
        );

        for (var d = 0; d < totalEffectiveTime.length; d++) {
            if (new Date(totalEffectiveTime[d].date1).getDay() == 6) {
                staurday++;
            }
            AlltotalRecords.push({ seconds: parseFloat(totalEffectiveTime[d].seconds), minutes: parseFloat(totalEffectiveTime[d].minutes), hours: parseFloat(totalEffectiveTime[d].hours) });
        }

        const hours = AlltotalRecords.reduce((total, currentValue) => total = total + currentValue.hours, 0);
        const minutes = AlltotalRecords.reduce((total, currentValue) => total = total + currentValue.minutes, 0);

        var hrsconvertToMinute = Math.floor(hours * 60);
        var combine = Math.floor(hrsconvertToMinute + minutes);
        var hrs = Math.floor(combine / 60);

        let totalWorkingDay = AlltotalRecords.length - staurday;
        let totalWorkingHours = totalWorkingDay * 8;
        if (staurday > 0) {
            totalWorkingHours += staurday * 4;
        }
        var shortHours = totalWorkingHours - hrs;
        if (shortHours < 1) {
            shortHours = 0;
        }
        else {
            shortHours = Math.floor(shortHours / 8);
        }

        this.setState({
            shortDays: shortHours,
        });


    }

    calculateTotalHourse() {

        let totalEffectiveTime = [];
        let AlltotalRecords = [];

        let attendanceList = this.state.attendanceList;

        attendanceList = attendanceList.filter((item) => item.loginDate != this.state.currentDate);

        attendanceList.map((item) =>
            item.totalEffectiveTime.map((sItem) =>
                totalEffectiveTime.push(sItem)
            )
        );

        for (var d = 0; d < totalEffectiveTime.length; d++) {
            AlltotalRecords.push({ seconds: parseFloat(totalEffectiveTime[d].seconds), minutes: parseFloat(totalEffectiveTime[d].minutes), hours: parseFloat(totalEffectiveTime[d].hours) });
        }

        const hours = AlltotalRecords.reduce((total, currentValue) => total = total + currentValue.hours, 0);
        const minutes = AlltotalRecords.reduce((total, currentValue) => total = total + currentValue.minutes, 0);

        var hrsconvertToMinute = Math.floor(hours * 60);
        var combine = Math.floor(hrsconvertToMinute + minutes);

        var hrs = Math.floor(combine / 60);
        var convertmin = combine % 60;
        var min = parseInt(convertmin);

        hrs = isNaN(hrs) ? 0 : hrs;
        min = isNaN(min) ? 0 : min;
        this.setState({
            totalHours: hrs + " h :" + min + " m",
        });
    }

    calculateAvrageDay() {
        let totalEffectiveTime = [];
        let AlltotalRecords = [];

        let attendanceList = this.state.attendanceList;
        attendanceList = attendanceList.filter((item) => item.loginDate != this.state.currentDate);
        attendanceList.map((item) =>
            item.totalEffectiveTime.map((sItem) =>
                totalEffectiveTime.push(sItem)
            )
        );

        for (var d = 0; d < totalEffectiveTime.length; d++) {
            AlltotalRecords.push({ seconds: parseFloat(totalEffectiveTime[d].seconds), minutes: parseFloat(totalEffectiveTime[d].minutes), hours: parseFloat(totalEffectiveTime[d].hours) });
        }

        const hours = AlltotalRecords.reduce((total, currentValue) => total = total + currentValue.hours, 0);
        const minutes = AlltotalRecords.reduce((total, currentValue) => total = total + currentValue.minutes, 0);

        var hrsconvertToMinute = Math.floor(hours * 60);
        var combine = Math.floor(hrsconvertToMinute + minutes);

        var totalAvg = combine / AlltotalRecords.length;
        var hrs = Math.floor(totalAvg / 60);
        var convertmin = totalAvg % 60;
        var min = parseInt(convertmin);

        this.setState({
            hrs: isNaN(hrs) ? 0 : hrs,
            min: isNaN(min) ? 0 : min
        });
    }


    setMonth(setm) {
        this.handleSelectedMonth(setm);
        this.getHolidayList();
        this.getLeavesList();

        this.setState({
            filterMonth: setm
        }, () => {
            this.calculateFromTodate();
            // this.getHolidayList();
            // this.getLeavesList();

        });
    }

    yearChangeHandle(e) {
        this.getHolidayList();
        this.getLeavesList();
        this.setState({
            filterYear: [{ value: e.value, label: e.label }],
            selectedYear: e.value
        }, () => {
            this.calculateFromTodate();
           
        });
    }

    calculateFromTodate() {

        var firstDay = new Date(this.state.selectedYear, this.state.filterMonth, 1);
        var lastDay = new Date(this.state.selectedYear, this.state.filterMonth + 1, 0);
        let month = firstDay.getMonth() + 1;
        let year = firstDay.getFullYear();
        let date = firstDay.getDate();

        let lmonth = lastDay.getMonth() + 1;
        let lyear = lastDay.getFullYear();
        let ldate = lastDay.getDate();
        let separator = "-";
        const todayDate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
        const lastDate = `${lyear}${separator}${lmonth < 10 ? `0${lmonth}` : `${month}`}${separator}${ldate < 10 ? `0${ldate}` : `${ldate}`}`;
        this.setState({
            filterFromDate: todayDate,
            filterToDate: lastDate,
            selectedMonth: firstDay.getMonth() + 1,
            selectedYear: firstDay.getFullYear()
        }, () => {
            this.getAttendanceList();
            this.getHolidayList();
            this.getLeavesList();
        });

    }

    handleSelectedMonth(Indexing) {
        this.setState({
            SelectedMonth: this.state.allMonth[Indexing]
        });
    }



    getReportingList() {
        this.props.dispatch(adminUserActions.getUserListForReporting({ search: "" }));
    }

    handleReportUser(event) {
        const d = new Date();
        let month = d.getMonth();
        this.handleSelectedMonth(month);
        const { user } = this.state;
        let item = this.state.ReportingList;
        let selectedReportingItem = [];
        selectedReportingItem = item.filter(Result => Result.value == event.value);
        if (event.value === user.data._id) {
            this.setState({
                filterUser: [event],
                ReportingName: user.data.first_name + " " + user.data.last_name,
            }, () => {
                this.getAttendanceList();
                this.getHolidayList();
                this.getLeavesList();

            });
        } else {
            this.setState({
                filterUser: [event],
                ReportingName: selectedReportingItem[0].label
            }, () => {
                console.log("filterUser", this.state.filterUser);
                this.getAttendanceList();
                this.getHolidayList();
                this.getLeavesList();

            });
        }
    }

    configureSocket = () => {
        var socket = socketClient(APIURL, { transports: ["websocket"] });
        socket.on("attendance", data => {
            if (this.state.filterUser[0].value == data.userId) {
                this.getAttendanceList();
                // this.getHolidayList();
                this.getLeavesList();
            }

        });

    };
    reportingGet(item) {
        let reportList = [];
        if (this.state.ReportingList && this.state.ReportingList.length == 0) {
            reportList.push({ value: this.state.user.data._id, label: this.state.user.data.first_name + " " + this.state.user.data.last_name });
            for (var c = 0; c < item.length; c++) {
                reportList.push({ value: item[c]._id, label: item[c].first_name + " " + item[c].last_name });
            }
            this.setState({
                ReportingList: reportList,
                filterUser: [{ value: this.state.user.data._id, label: this.state.user.data.first_name + " " + this.state.user.data.last_name }],

            });
        }
    }


    filterHoliday() {
        let attendance = this.state.filteredKeywords;
        attendance.map((item) => {
            this.state.holidayList.filter((data) => {
                if (data.from_date <= item.loginDate && (data.to_date >= item.loginDate)) {
                    item.holidays = "yes";

                }
            });
        });

        this.setState({
            filteredKeywords: attendance
        });
    }

    setHolidayFilter(data) {
        this.setState({
            holidayList: data
        }, () => {
            this.filterHoliday();
        });


    }
    getHolidayList() {
        this.props.dispatch(HoliDayActions.filterHolidayList({
            from_date: this.state.filterFromDate,
            to_date: this.state.filterToDate
        }));
    }
    getLeavesList() {
        var reportUser = "";
        if (this.state.filterUser && this.state.filterUser.length > 0) {
            reportUser = this.state.filterUser[0].value;
        }
        this.props.dispatch(leaveActions.getLeavesList({ userId: reportUser, search: "", reportTo: "", leaveStatusFilter: "approved", startDate: this.state.filterFromDate, endDate: this.state.filterToDate }));
    }
    filterLeaveList() {
        let attendance = this.state.filteredKeywords;
        console.log(attendance);
        console.log(this.state.LeaveList);
        attendance.map((item) => {
            this.state.LeaveList.filter((data) => {
                if (dateFormat(data.leaves.from_date, "ddd, dd mmm") == dateFormat(item.loginDate, "ddd, dd mmm")) {
                    item.leave = "yes";
                }
                else if (data.leaves.from_date <= item.loginDate && (data.leaves.to_date >= item.loginDate)) {

                    item.leave = "yes";

                }
            });
        });
        this.setState({
            filteredKeywords: attendance
        });
    }



    setLeaveList(data) {
        this.setState({
            LeaveList: data
        }, () => {
            this.filterLeaveList();
        });
    }


    componentDidMount() {

        if (this.state.user) {
            const d = new Date();
            let month = d.getMonth();
            this.handleSelectedMonth(month);
            this.calculateFromTodate();
            this.getReportingList(this.state.user.data._id);
            this.configureSocket();
        }


    }
    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.regularize_modal == false) {
            this.closeRegularizeModal();
        }

        if (nextProps.attendanceList != undefined) {
            this.showAttandanceList(nextProps.attendanceList);
        }
        /*if (nextProps.ReportingList) {
            this.reportingGet(nextProps.ReportingList);
        }*/

        if (nextProps.UserListForReporting != undefined) {
            this.reportingGet(nextProps.UserListForReporting);
        }
        if (nextProps.holidaysList != undefined) {
            this.setHolidayFilter(nextProps.holidaysList);
        }

        if (nextProps.LeaveList != undefined) {
            this.setLeaveList(nextProps.LeaveList);
        }


    }

    render() {
        const { error, success, loading, CheckRegerror, LeaveList } = this.props;
        console.log("render", LeaveList);

        const { user, filterUser, } = this.state;
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
                                <h2 className="page-heading"> Attendance </h2>
                            </div>
                            <div className="col-lg-6">
                            </div>
                            <div className="col-lg-2" style={{ position: "relative", zIndex: 2 }}>
                                <Select styles={colourStyles} onChange={this.yearChangeHandle} value={this.state.filterYear} options={this.state.yearList} />
                            </div>
                        </div>

                        <div className="row m-0 align-items-center pt-4 border-mobile">
                            <div className="col-lg-3">
                                <div className="menu_width" style={{ position: "relative", zIndex: 2 }}>
                                    <Select styles={colourStyles} onChange={this.handleReportUser} value={this.state.filterUser} options={this.state.ReportingList} />
                                </div>

                            </div>
                            <div className="col-lg-9 p-0">
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

                        <div id="table-scroll" className="table-scroll mt-4" >
                            <table id="main-table" className="main-table full-first-td">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col" className="text-left">Net Hrs</th>
                                        <th scope="col" className="text-left">Gross Hrs</th>
                                        <th scope="col" className="text-left">Arrival</th>
                                        <th scope="col" className="text-left">Log Out</th>
                                        <th scope="col" className="text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filteredKeywords && this.state.filteredKeywords.map((item, index) => (
                                        <tr key={index}>

                                            <td className="">{dateFormat(item.loginDate, "ddd, dd mmm")}
                                                {item.regularizationStatus == "approved" ? <span className="capsule alt_capsule green-dim text-center ml-3 ">REG</span> : ""}</td>
                                            {

                                                item.totalEffectiveTime ?
                                                    <td className="text-left">{item.totalEffectiveTime[0].hours + "h" + ":" + item.totalEffectiveTime[0].minutes + "m"}
                                                    </td>
                                                    :
                                                    (new Date(item.loginDate).getDay() === 6 || (new Date(item.loginDate).getDay() === 0))
                                                        ?

                                                        <td colSpan="5" className="text-left"> <span className="capsule text-center week_off_bg">Week off</span></td> :
                                                        (item.holidays && item.holidays == "yes") ?
                                                            <td colSpan="5" className="text-left"> <span className="capsule text-center text-green">Holiday</span></td>
                                                            : (item.leave && item.leave == "yes") ?
                                                                <td colSpan="5" className="text-left"><span className="capsule  text-center text-green">Leave</span></td>
                                                                :
                                                                <td colSpan="5" className="text-left"><span className="capsule lable_weekoff text-center">No Time Entries Logged</span></td>}





                                            {item.grossTime ?
                                                <td className="text-left">{item.grossTime.hours + "h" + ":" + item.grossTime.minutes + "m"}</td> : ""}
                                            {
                                                item.log_in_time ? <td className="text-left">
                                                    {item.log_in_time}
                                                </td> : ""
                                            }
                                            {item.attendanceDetail ? <td className="text-left">
                                                {item.attendanceDetail[item.attendanceDetail.length - 1].log_out_time}
                                            </td> : ""}
                                            {item.attendanceDetail ?
                                                <td data-th="Order Value" className="text-left">
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
                                                                        {item.regularizationStatus != "pending" &&
                                                                            <i className="fa-lg fa fa-exclamation-circle text-warning" aria-hidden="true"></i>
                                                                        }
                                                                        {item.regularizationStatus == "pending" &&
                                                                            <i className="fa-lg fa fa-hourglass-half text-warning" aria-hidden="true"></i>
                                                                        }


                                                                    </Button>
                                                                    {
                                                                        this.state.regularizeModal === false &&

                                                                        <UncontrolledPopover
                                                                            placement="top"
                                                                            target={`btn-${index}`}
                                                                            // target={parseInt(index)}
                                                                            trigger="legacy"
                                                                        >
                                                                            <PopoverHeader>
                                                                                {dateFormat(item.loginDate, "ddd, dd mmmm  yyyy")}
                                                                            </PopoverHeader>
                                                                            {filterUser[0].value === user.data._id && item.regularizationStatus == "" &&
                                                                                <PopoverHeader>
                                                                                    <Button id={`btn-${index}`} className="ic-edit icon icon-sm text-link mr-8 regularize_btn" onClick={this.openModel.bind(this, item.userId, item.loginDate)}>Regularize</Button>
                                                                                </PopoverHeader>
                                                                            }

                                                                            <PopoverBody>
                                                                                <div className="row m-0">
                                                                                    <div className="col-12 p-0">
                                                                                        <p className="mb-3"><strong>Web Clock In</strong></p>
                                                                                        {
                                                                                            item.attendanceDetail.map((atten, idx) =>
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
                                                                    }
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
                                                                        {item.regularizationStatus != "pending" &&
                                                                            <i className="fa fa-check-circle text-success fa-lg" aria-hidden="true"></i>
                                                                        }
                                                                        {item.regularizationStatus == "pending" &&
                                                                            <i className="fa-lg fa fa-hourglass-half text-warning" aria-hidden="true"></i>

                                                                        }


                                                                        {/* <i className="fa fa-check text-success fa-lg" aria-hidden="true"></i> */}
                                                                    </Button>
                                                                    {
                                                                        this.state.regularizeModal === false &&
                                                                        <UncontrolledPopover
                                                                            placement="top"
                                                                            target={`btn-${index}`}
                                                                            // target={parseInt(index)}
                                                                            trigger="legacy"
                                                                        >
                                                                            <PopoverHeader>
                                                                                {dateFormat(item.loginDate, "ddd, dd mmmm  yyyy")}
                                                                            </PopoverHeader>
                                                                            {filterUser[0].value === user.data._id && item.regularizationStatus == "" &&
                                                                                <PopoverHeader>
                                                                                    <Button className="ic-edit icon icon-sm text-link mr-8 regularize_btn" onClick={this.openModel.bind(this, item.userId, item.loginDate)}>Regularize</Button>
                                                                                </PopoverHeader>
                                                                            }

                                                                            <PopoverBody>
                                                                                <div className="row m-0">
                                                                                    <div className="col-12 p-0">
                                                                                        <p className="mb-3"><strong>Web Clock In</strong></p>
                                                                                        {
                                                                                            item.attendanceDetail.map((atten, idx) =>
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
                                                                    }
                                                                </div>
                                                            </React.Fragment>
                                                    }
                                                </td>
                                                : ""}
                                        </tr>
                                    ))}
                                    {
                                        this.state.filteredKeywords && this.state.filteredKeywords.length == 0 && loading == false &&
                                        <tr>
                                            <td colSpan="6" className="text-center">No record</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                <div className="right-aside">
                    <p className="mt-4 text-center"><small><b>{this.state.SelectedMonth} Month</b> <br /> Attendance Summary</small><br /> {this.state.ReportingName ? this.state.ReportingName : this.state.user.data.first_name + " " + this.state.user.data.last_name}</p>

                    <div className="stats">
                        <div className="stats-big">{"" + this.state.hrs + "h" + ":" + this.state.min + "m"}</div>

                        <div className="stats-small">Avg/Day</div>
                    </div>
                    <div className="stats">
                        <div className="stats-big">{this.state.totalHours}</div>

                        <div className="stats-small">Total Net Work Hours</div>
                    </div>

                    <div className="stats">
                        <div className="stats-big">{this.state.shortDays}</div>

                        <div className="stats-small">Short Days</div>
                    </div>
                    <div className="stats">
                        <div className="stats-big">{this.state.percentage}%</div>
                        <div className="stats-small">On-time Arrival</div>
                    </div>
                </div>
                <Footer />
                <Modal size="md" isOpen={this.state.regularizeModal} toggle={() => this.closeRegularizeModal()}>

                    <ModalHeader className="header-less" toggle={() => this.closeRegularizeModal()} >
                        <h5> Attendance Regularization</h5>

                        {CheckRegerror ? <span className="text-danger text-center">{CheckRegerror.common}</span> : ""}
                    </ModalHeader>
                    {/* {
                        !CheckRegerror && */}
                    <ModalBody className="border-0">

                        <div className="row m-0">
                            <div className="col-1 p-0">
                                <img width={"18px"} src={Warrning} alt="" />
                            </div>
                            <div className="col-11 p-0 d-flex align-items-center">
                                <p className="mb-0 d-flex align-items-center warning_text_rgl">Raise regularization request to exempt this day from tracking policy penalization.</p>
                            </div>
                        </div>

                        <h5 className="text-left mt-2">Note</h5>
                        <textarea rows="4" cols="40" className="form-control"
                            name={this.state.note}
                            onChange={(e) => this.onChangeNote(e.target.value)}></textarea>

                        {error ? <span className="text-danger">{error.note}</span> : ""}
                        <div className="col-12">
                            {
                                success && <span className="text-success text-center"> {success && success.message}</span>
                            }
                        </div>

                    </ModalBody>
                    {/* } */}

                    <ModalFooter>
                        <div className="d-flex justify-content-end w-100">
                            <Button color="secondary" className="mr-2" onClick={this.closeRegularizeModal}>Cancel</Button>
                            {
                                loading ?
                                    <Button className="btn btn-primary" >Loading...</Button>
                                    :
                                    !CheckRegerror &&
                                    <Button color="primary" className="btn btn-primary" onClick={this.submitNotes}>Request</Button>
                            }
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { attendanceList, error, success, regularize_modal, loading, CheckRegerror } = state.rootReducer.attendances;
    const { ReportingList } = state.rootReducer.users;
    const { UserListForReporting } = state.rootReducer.adminUsers;
    const { holidaysList } = state.rootReducer.holidays;
    const { LeaveList } = state.rootReducer.leaves;
    // console.log("success", attendanceList);
    return {
        error,
        success,
        attendanceList,
        ReportingList,
        regularize_modal,
        loading,
        CheckRegerror,
        UserListForReporting,
        holidaysList,
        LeaveList
    };
}

export default connect(mapStateToProps)(Index);