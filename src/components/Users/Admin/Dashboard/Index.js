import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "../../../GlobalComponents/Footer";
import Navbar from "../Layout/Navbar";
import cake from "../../../../assets/images/cake.png";
import workAnniverysary from "../../../../assets/images/work_anniverysary1.png";
import leave from "../../../../assets/images/working.png";
import empPicture from "../../../../assets/images/emp_img1.jpg";
import { adminDashboardActions, HoliDayActions } from "../../../../actions";
import dateFormat from "dateformat";
import { APIURL } from "../../../../constants/config";

const LeaveName = { "first_half": "first half", "second_half": "second half", "full_day": "full day" };
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            from_date: new Date(new Date().getFullYear(), 0, 1),
            to_date: new Date(),
            birthList: [],
            anniversaryList: [],
            onLeaveList: [],
            leave_from_date: new Date(),
            leave_to_date: new Date(),
            current_date: new Date(),
            work_form_date: new Date(),
            work_to_date: new Date(),
            holidayList: [],
            leaveNorecorde: false,
            holidayNorecorde: false,
            workAnniverysaryNoRecorde: false,
            birthDayNorecorde: false,
        };
        this.getOnLeaveList = this.getOnLeaveList.bind(this);

    }

    getOnLeaveList() {
        this.props.dispatch(adminDashboardActions.getOnLeaveList({
            from_date: dateFormat(this.state.leave_from_date, "yyyy-mm-dd"),
            to_date: dateFormat(this.state.leave_to_date, "yyyy-mm-dd")
        }));
    }
    getWorkAnniversaryList() {
        this.props.dispatch(adminDashboardActions.getWorkAnniversaryList({
            from_date: dateFormat(this.state.work_form_date, "yyyy-mm-dd"),
            to_date: dateFormat(this.state.work_to_date, "yyyy-mm-dd")
        }));
    }
    getBirthdayList() {
        this.props.dispatch(adminDashboardActions.getBirthdayList(
            {
                from_date: dateFormat(this.state.current_date, "yyyy-mm-dd"),
                to_date: dateFormat(this.state.current_date, "yyyy-mm-dd")
            }));
    }
    getHolidayList() {
        this.props.dispatch(HoliDayActions.filterHolidayList({
            from_date: this.state.current_date,
            to_date  : dateFormat(this.state.current_date, "yyyy")+"-12-31"
        }));
    }
    showBirthDayList(data1) {
        this.setState({
            birthList: data1,
            birthDayNorecorde: true
        });
    }
    ShowAnniversaryList(data2) {
        this.setState({
            anniversaryList: data2,
            workAnniverysaryNoRecorde: true,

        });
    }
    ShowOnLeaveList(data3) {
        this.setState({
            onLeaveList: data3,
            leaveNorecorde: true
        });
    }
    showHolidayList(data4) {
        let sortedCars1 = data4.sort((a, b) =>
            a.from_date.split("/").reverse().join().localeCompare(b.from_date.split("/").reverse().join()));
        this.setState({
            holidayList: sortedCars1,
            holidayNorecorde: true
        });
    }
    componentDidMount() {
        this.getOnLeaveList();
        this.getWorkAnniversaryList();
        this.getBirthdayList();
        this.getHolidayList();

    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.birthDayList != undefined) {
            this.showBirthDayList(nextProps.birthDayList);
        }
        if (nextProps.anniversaryList != undefined) {
            this.ShowAnniversaryList(nextProps.anniversaryList);
        }
        if (nextProps.onLeaveList != undefined) {
            this.ShowOnLeaveList(nextProps.onLeaveList);
        }
        if (nextProps.holidaysList != undefined) {
            this.showHolidayList(nextProps.holidaysList);
        }


    }

    render() {

        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user.data.user_role !== "Admin") {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <Navbar activePage="dashboard" />
                <Footer />

                <main className="offset mr-0">
                    <div className="container-fluid hard-pad pb-5">
                        <div className="row align-items-center pt-4 border-mobile">
                            <div className="col-lg-4 col-6">
                                <h2 className="page-heading"> Dashboard </h2>
                            </div>
                        </div>

                        <div className="row mt-5 dashboard_info_box">
                            <div className="col-lg-4">
                                <div className="card ">
                                    <div className="card-header d-flex justify-content-between">
                                        <span className="text_primary">On Leave Today</span>
                                        <span className="numbers_of"> {this.state.onLeaveList ? this.state.onLeaveList.length : ""}</span>
                                    </div>

                                    <div className="card-body record_box">
                                        {this.state.onLeaveList && this.state.leaveNorecorde === true && this.state.onLeaveList.length == 0 ?
                                            <div className="media record_info common_box align-items-center">
                                                <img src={leave} className="common_img img-fluid" alt="Employee image" />
                                                <div className="media-body">
                                                    <p className="lh1 mb-0">Everyone working today!</p>
                                                </div>
                                            </div> : ""}

                                        {this.state.onLeaveList && this.state.onLeaveList.map((item, i) => (
                                            <div key={i} className="media record_info align-items-center">
                                                { item.leaveRequestBy[0].profileImagePath!=undefined ?
                                                    <img src={APIURL+"/"+item.leaveRequestBy[0].profileImagePath} className="mr-3 emp_img img-fluid" alt="Employee image" />
                                                    :
                                                    <img src={empPicture} className="mr-3 emp_img img-fluid" alt="Employee image" />
                                                }
                                                <div className="media-body">
                                                    <p className="lh1 mb-0">{item.leaveRequestBy[0].first_name} {item.leaveRequestBy[0].last_name}</p>
                                                    <small><strong>{dateFormat(item.leaves.from_date, "ddd, dd mmm")}  - {dateFormat(item.leaves.to_date, "ddd, dd mmm")}</strong></small>
                                                    <div>
                                                        <small>
                                                            {/*{dateFormat(item.leaves.from_date, "yyyy-mm-dd") == dateFormat(this.state.current_date, "yyyy-mm-dd") &&
                                                                <span>{LeaveName[item.leaves.from_date_half]}</span>
                                                            }
                                                            {dateFormat(item.leaves.from_date, "yyyy-mm-dd") != dateFormat(this.state.current_date, "yyyy-mm-dd") && dateFormat(item.leaves.to_date, "yyyy-mm-dd") == dateFormat(this.state.current_date, "yyyy-mm-dd") &&
                                                                <span>{LeaveName[item.leaves.to_date_half]}</span>
                                                            }
                                                            
                                                            {dateFormat(item.leaves.from_date, "yyyy-mm-dd") < dateFormat(this.state.current_date, "yyyy-mm-dd") && dateFormat(item.leaves.to_date, "yyyy-mm-dd") > dateFormat(this.state.current_date, "yyyy-mm-dd") &&
                                                                <span>full day</span>
                                                            }
                                                            {dateFormat(item.leaves.from_date, "yyyy-mm-dd") == dateFormat(item.leaves.to_date, "yyyy-mm-dd") &&
                                                                <span>{LeaveName[item.leaves.from_date_half]}</span>
                                                            }*/}
                                                            {dateFormat(item.leaves.from_date, "yyyy-mm-dd") != dateFormat(item.leaves.to_date, "yyyy-mm-dd") &&
                                                                <span>{LeaveName[item.leaves.from_date_half] } - {LeaveName[item.leaves.to_date_half]}</span>
                                                            }
                                                            <span className="ml-1">({item.leaves.leave_count} {item.leaves.leave_count > 1 ? "days" : "day"})</span>
                                                        </small>
                                                    </div>

                                                </div>

                                            </div>


                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card ">
                                    <div className="card-header">
                                        <span className="text_primary">Holidays</span>
                                    </div>
                                    <div className="card-body holiday_box">
                                        <div id="holider_slider" className="carousel slide" data-interval="false">
                                            <div className="carousel-inner">
                                                {this.state.holidayList && this.state.holidayNorecorde == true && this.state.holidayList.map((item, i) => (
                                                    <div key={i} className={i == 0 ? "carousel-item active" : "carousel-item"}>
                                                        <div className="carousel-caption">
                                                            <div className="media record_info common_box align-items-center">
                                                                {/* <img src={Dussehra} className="mr-3 common_img img-fluid" alt="Employee image" /> */}
                                                                <div className="media-body">
                                                                    <h4 className="lh1">{item.title}</h4>
                                                                    <small>{dateFormat(item.from_date, "ddd, dd mmm")} - {dateFormat(item.to_date, "ddd, dd mmm")}</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <a className="carousel-control-prev" href="#holider_slider" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#holider_slider" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5 dashboard_info_box">

                            <div className="col-lg-4">
                                <div className="card ">
                                    <div className="card-header d-flex justify-content-between">
                                        <span className="text_primary">Birthdays</span>
                                        <span className="numbers_of ">{this.state.birthList ? this.state.birthList.length : ""}</span>
                                    </div>
                                    <div className="card-body record_box">
                                        {this.state.birthList && this.state.birthDayNorecorde == true && this.state.birthList.length == 0 ?
                                            <div className="media record_info common_box align-items-center">
                                                <img src={cake} className="common_img img-fluid" alt="Employee image" />

                                                <div className="media-body">
                                                    <p>No one is having Birthday today!</p>
                                                </div>
                                            </div>
                                            : ""
                                        }
                                        {this.state.birthList && this.state.birthList.map((item, i) => (
                                            <div key={i} className="media record_info align-items-center">
                                                { item.profileImagePath!=undefined ?
                                                    <img src={APIURL+"/"+item.profileImagePath} className="mr-3 emp_img img-fluid" alt="Employee image" />
                                                    :
                                                    <img src={empPicture} className="mr-3 emp_img img-fluid" alt="Employee image" />
                                                }
                                                <div className="media-body">
                                                    <p className="mb-0 lh1">Today's <span><b>{item.first_name} {item.last_name}</b> </span>Birthday</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card ">
                                    <div className="card-header d-flex justify-content-between">
                                        <span className="text_primary">Work Anniversaries</span>
                                        <span className="numbers_of">{this.state.anniversaryList ? this.state.anniversaryList.length : ""}</span>
                                    </div>
                                    <div className="card-body record_box">
                                        {this.state.anniversaryList && this.state.anniversaryList.map((item, i) => (
                                            <div key={i} className="media record_info align-items-center">
                                                { item.profileImagePath!=undefined ?
                                                    <img src={APIURL+"/"+item.profileImagePath} className="mr-3 emp_img img-fluid" alt="Employee image" />
                                                    :
                                                    <img src={empPicture} className="mr-3 emp_img img-fluid" alt="Employee image" />
                                                }
                                                <div className="media-body">
                                                    <p className="mb-0 lh1">Today's <span><b>{item.first_name} {item.last_name}</b> </span>Work Anniversary</p>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                    {this.state.anniversaryList && this.state.workAnniverysaryNoRecorde === true && this.state.anniversaryList.length == 0 ?
                                        <div className="card-body record_box">
                                            <div className="media record_info common_box align-items-center">
                                                <img src={workAnniverysary} className="common_img img-fluid" alt="Employee image" />
                                                <div className="media-body">
                                                    <p>No one is having work anniversary today!</p>
                                                </div>
                                            </div>
                                        </div>
                                        : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { error } = state.rootReducer.users;
    const { onLeaveList, birthDayList, anniversaryList } = state.rootReducer.dashboard;
    const { holidaysList } = state.rootReducer.holidays;
    return {
        error,
        onLeaveList,
        birthDayList,
        anniversaryList,
        holidaysList

    };
}

export default connect(mapStateToProps)(Index);