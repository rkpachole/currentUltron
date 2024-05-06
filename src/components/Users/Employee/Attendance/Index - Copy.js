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
        };
        this.handleReportUser = this.handleReportUser.bind(this);
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
    percentage = (partialValue, totalValue) => {
        console.log(("avg", 100 * partialValue) / totalValue);
        // return (100 * partialValue) / totalValue;
    };
    componentDidMount() {
        console.log("props",this.props.result);
        const d = new Date();
        let month = d.getMonth();
        this.handleSelectedMonth(month);
        this.getToday();
        this.getReportingList(this.state.user.data._id);
        this.configureSocket();

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.attendanceList != undefined) {
            this.showAttandanceList(nextProps.attendanceList);


            // let attendanceList = nextProps.attendanceList;
            // let AllTimes = [];
            // attendanceList.map((item) =>
            //     AllTimes.push(item.log_in_time)
            // );
            // const data = AllTimes.filter((val) => dateFormat("2022-01-01 " + val, "hh:MM") < dateFormat("2022-01-01 " + "11:15", "hh:MM"));
            // console.log("AllTimes", data);

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
        const { attendanceList } = this.state;
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
                                    {attendanceList && attendanceList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{dateFormat(item.loginDate, "ddd, dd mmmm")}{(new Date(item.loginDate).getDay()=== 6 ||(new Date(item.loginDate).getDay()=== 0))? <span className="capsule lable_weekoff text-white ml-1">Week Off</span>:""}</td>
                                           
                                            <td className="text-right">{item.totalEffectiveTime[0].hours + "h" + ":" + item.totalEffectiveTime[0].minutes + "m"} </td>
                                            <td className="text-right">9h:30m</td>
                                            <td className="text-right">
                                                {dateFormat("2022-01-01 " + item.log_in_time, "hh:MM")}
                                            </td>
                                            <td className="text-right">
                                                {item.attendanceDetail[item.attendanceDetail.length - 1].log_out_time}
                                            </td>
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
                                                                    <i id={`btn-${index}`} className="fa-lg fa fa-exclamation-circle text-warning" aria-hidden="true"></i>
                                                                </Button>
                                                                <UncontrolledPopover
                                                                    placement="top"
                                                                    target={`btn-${index}`}
                                                                    // target={parseInt(index)}
                                                                    trigger="legacy"
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
                                        </tr>
                                    ))}
                                    {attendanceList.length < 1 &&
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
                        <div className="stats-big">8h:20m</div>
                        <div className="stats-small">Avg/Day</div>
                    </div>
                    <div className="stats">
                        <div className="stats-big">50%</div>
                        <div className="stats-small">On-time Arrival</div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { attendanceList, error } = state.rootReducer.attendances;
    const { ReportingList } = state.rootReducer.users;
    return {
        error,
        attendanceList,
        ReportingList
    };
}

export default connect(mapStateToProps)(Index);