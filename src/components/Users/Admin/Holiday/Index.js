import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Pagination from "react-js-pagination";
import Footer from "../../../GlobalComponents/Footer";
import { Modal, ModalBody, ModalHeader, ModalFooter, Input } from "reactstrap";
import Navbar from "../Layout/Navbar";
import { HoliDayActions, } from "../../../../actions";
import { Button } from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            userInfo: {
                title: "",
                description: "",
                from_date: "",
                to_date: ""
            },
            editUserData: {
                id: "",
                title: "",
                description: "",
                from_date: "",
                to_date: ""
            },
            search: "",
            error: false,
            editModal: false,
            deleteModal: false,
            addNewModal: false,
            activePage: 1,
            limit: 10,
            totalItemsCount: 1,
        };

        this.getHolidayList = this.getHolidayList.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.editUserInfoHandler = this.editUserInfoHandler.bind(this);
        this.saveHoliday = this.saveHoliday.bind(this);
        this.addNewModalOpen = this.addNewModalOpen.bind(this);
        this.editModalClose = this.editModalClose.bind(this);
        this.deleteModalOpen = this.deleteModalOpen.bind(this);
        this.deleteModalClose = this.deleteModalClose.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    handlePageChange(pageNumber) {
        this.setState(
            {
                activePage: pageNumber
            }
            , () => {
                this.getHolidayList();
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
    handleSearch(val) {
        this.setState({
            search: val,
            activePage: 1
        }, () => { this.getHolidayList(); });

    }
    userInfoHandler = (name, value) => {
        const { userInfo } = this.state;
        userInfo[name] = value;
        this.setState({
            userInfo
        });
    };
    editUserInfoHandler = (name, value) => {
        const { editUserData } = this.state;
        // console.log(name, value);
        editUserData[name] = value;
        this.setState({
            editUserData,

        }, () => {
            // console.log(editUserData);
        });
    };
    saveHoliday() {
        this.props.dispatch(HoliDayActions.saveHoliday(this.state.userInfo));
    }
    addNewModalOpen() {
        this.setState({ addNewModal: !this.state.addNewModal });
    }

    addNewModalClose() {
        this.setState({
            addNewModal: false,
            ScsMsg: "",
            error: "",
            userInfo: {
                title: "",
                description: "",
                from_date: "",
                to_date: ""
            },
        });
    }
    editModalClose() {
        this.setState({
            editModal: false,
            editOpenFlag: 0,
            error: "",
            editUserData: {
                id: "",
                title: "",
                description: "",
                from_date: "",
                to_date: ""
            }
        });
    }
    getSingleUser(id) {
        this.setState({
            editModal: true,
            editOpenCount: 0
        }, () => {
            this.props.dispatch(HoliDayActions.editHoliday(id));
        });

    }
    setEditUser(data) {
        this.setState({
            editUserData: {
                id: data._id,
                title: data.title,
                description: data.description,
                from_date: dateFormat(data.from_date, "yyyy-mm-dd"),
                to_date: dateFormat(data.to_date, "yyyy-mm-dd"),
            },
        });
    }
    getHolidayList() {
        this.props.dispatch(HoliDayActions.getHolidayList({ search: this.state.search, page: this.state.activePage, limit: this.state.limit }));
    }

    handleUpdate() {
        this.props.dispatch(HoliDayActions.updateHolidays(this.state.editUserData));
    }
    deleteModalOpen(id) {
        this.setState({
            deleteModal: true,
            id: id
        });
    }
    deleteModalClose() {
        this.setState({
            deleteModal: false
        }, () => {
            this.getHolidayList();
        });
    }
    doDelete() {
        this.props.dispatch(HoliDayActions.delete({ id: this.state.id }));
    }
    setRefreshList() {
        this.setState({
            activePage: 1,
            error: "",
            ScsMsg: "",
            deleteScsMsg: "",
            message: "",
        }, () => {
            this.getHolidayList();
            this.deleteModalClose();
            this.editModalClose();
            this.addNewModalClose();
        });
       
    }
    componentDidMount() {
        this.getHolidayList();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.refreshList == true) {
            this.setRefreshList();
        }
        if (nextProps.activePage != undefined && nextProps.totalItemsCount != undefined && nextProps.limit != undefined) {
            this.handlePageStates(nextProps.activePage, nextProps.totalItemsCount, 10);
        }
        if (nextProps.editModal == true && this.state.editOpenCount == 0) {
            this.setEditUser(nextProps.holidays.data);

        }
        if (nextProps.error != undefined) {
            this.setState({
                error: true,

            });
        }
    }


    render() {
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user.data.user_role !== "Admin") {
            return <Redirect to="/" />;
        }
        const { totalItemsCount, holidaysList } = this.props;
        const { error, loading, ScsMsg, message, deleteScsMsg } = this.props;
        // console.log(totalItemsCount);
        return (
            <div>
                <Navbar activePage="dashboard" />
                <main className="offset">
                    <div className="container-fluid hard-pad mb-5">
                        <div className="row align-items-center pt-4 border-mobile">
                            <div className="col-lg-4 col-6">
                                <h2 className="page-heading"> Holidays</h2>
                            </div>
                        </div>
                        <div className="row align-items-center pt-4 border-mobile">

                            <div className="col-lg-8">
                                <ul className="submenu">
                                    <li className=""><Link to="/admin/settings/users">Employees</Link></li>
                                    <li className=""><Link to="/admin/settings/department">Departments</Link></li>
                                    <li className="active"><a href="javascript:;">Holidays</a></li>
                            
                                </ul>
                            </div>
                            <div className="col-lg-4">

                            </div>

                        </div>
                        <div className="table-scroll mt-4">
                            <table className="main-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">From Date</th>
                                        <th scope="col">To Date</th>
                                        <th scope="col" className="text-right hight_index">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {holidaysList && holidaysList.map((item) => (
                                        <tr key={item._id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="name">{item.title}</div>
                                                </div>
                                            </td>

                                            <td>{item.description}</td>
                                            <td>{dateFormat(item.from_date, "ddd, dd mmmm  yyyy")} </td>
                                            <td> {dateFormat(item.to_date, "ddd, dd mmmm  yyyy")}</td>
                                            <td className="text-right">
                                                <div className="action-area dropdown">
                                                    <a className="dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <span className="dots">...</span>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" onClick={() => this.getSingleUser(item._id)}>Edit</a>
                                                        <a className="dropdown-item" onClick={() => this.deleteModalOpen(item._id)}>Delete</a>


                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {holidaysList && holidaysList.length == 0 && loading == false &&
                                        <tr className="text-center">
                                            <td colSpan="5">No Record Found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </main>
                <div className="right-aside">
                    <p className="mt-5 text-center">Holidays Summary</p>

                    <div className="stats">
                        <div className="stats-big">{totalItemsCount}</div>
                        <div className="stats-small">Holidays</div>
                    </div>
                    <div className="mt-5 text-center">
                        <Button onClick={this.addNewModalOpen} color='primary' className="btn btn-primary btn-sml">Add Holidays</Button>
                    </div>
                </div>
                {holidaysList && holidaysList.length > 0 &&
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
                <Modal size="md" isOpen={this.state.addNewModal} toggle={() => this.addNewModalClose()}>
                    <ModalHeader toggle={() => this.addNewModalClose()}>
                        Add Holiday
                    </ModalHeader>
                    <ModalBody>
                        <form className="">
                            <div className="form-group">
                                <label>Title <strong className="text-danger">*</strong></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.userInfo.title}
                                    onChange={(e) => this.userInfoHandler("title", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.title ? error.title : ""}</span> : ""}
                                {(this.state.error && error) ? <span className="text-danger">{error.common ? error.common : ""}</span> : ""}

                            </div>
                            <div className="form-group">
                                <label>Description <strong className="text-danger">*</strong></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.userInfo.description}
                                    onChange={(e) => this.userInfoHandler("description", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.description ? error.description : ""}</span> : ""}
                            </div>

                            <div className="form-group row">
                                <div className="col">
                                    <label>From Date<strong className="text-danger">*</strong> </label>
                                    <Input
                                        type="date"
                                        max={new Date()}
                                        className="form-control"
                                        value={this.state.userInfo.from_date}
                                        onChange={(e) => this.userInfoHandler("from_date", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.from_date ? error.from_date : ""}</span> : ""}
                                </div>
                                <div className="col">
                                    <label>To Date <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="date"

                                        max={new Date()}
                                        className="form-control"
                                        value={this.state.userInfo.to_date}
                                        onChange={(e) => this.userInfoHandler("to_date", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.to_date ? error.to_date : ""}</span> : ""}
                                </div>
                            </div>
                        </form>
                        <div className="col-12">
                            {ScsMsg ? <span className="text-success">{ScsMsg.message}</span> : ""}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="">
                            <button className="btn btn-secondary mr-2" onClick={() => this.addNewModalClose()}>Cancel</button>
                            {
                                loading ?
                                    <Button color="primary" >Loading...</Button>
                                    :
                                    <button className="btn btn-primary" onClick={this.saveHoliday}>Submit</button>
                            }
                        </div>
                    </ModalFooter>
                </Modal>
                {/* Add Modal */}
                <Modal size="md" isOpen={this.state.editModal} toggle={() => this.editModalClose()}>
                    <ModalHeader className="" toggle={() => this.editModalClose()}>
                        Edit Holiday
                    </ModalHeader>
                    <ModalBody>
                        <form className="">
                            <div className="form-group">
                                <label>Title <strong className="text-danger">*</strong></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.editUserData.title}
                                    onChange={(e) => this.editUserInfoHandler("title", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.title ? error.title : ""}</span> : ""}

                            </div>
                            <div className="form-group">
                                <label>Description <strong className="text-danger">*</strong></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.editUserData.description}
                                    onChange={(e) => this.editUserInfoHandler("description", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.description ? error.description : ""}</span> : ""}
                            </div>

                            <div className="form-group row">
                                <div className="col">
                                    <label>From Date <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="date"
                                        max={new Date()}
                                        className="form-control"
                                        value={this.state.editUserData.from_date}
                                        onChange={(e) => this.editUserInfoHandler("from_date", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.from_date ? error.from_date : ""}</span> : ""}
                                </div>
                                <div className="col">
                                    <label>To Date<strong className="text-danger">*</strong> </label>
                                    <Input
                                        type="date"
                                        max={new Date()}
                                        className="form-control"
                                        value={this.state.editUserData.to_date}
                                        onChange={(e) => this.editUserInfoHandler("to_date", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.to_date ? error.to_date : ""}</span> : ""}
                                </div>
                            </div>
                        </form>
                        <div className="col-12 p-0">
                            {message ? <span className="text-success">{message}</span> : ""}
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <div className="">
                            <button className="btn btn-secondary mr-2" onClick={this.editModalClose}>Cancel</button>
                            {
                                loading ?
                                    <Button color="primary" >Loading...</Button>
                                    :
                                    <button className="btn btn-primary" onClick={() => this.handleUpdate()}>Update</button>
                            }
                        </div>
                    </ModalFooter>
                </Modal>
                {/* Edit Modal */}
                <Modal size="md" isOpen={this.state.deleteModal} toggle={() => this.deleteModalClose()}>
                    <ModalHeader className="" toggle={() => this.deleteModalClose()}>
                        Delete Holiday
                    </ModalHeader>
                    <ModalBody>
                        <div className="my-2">Please confirm if you want to delete this Holidays?</div>
                    </ModalBody>
                    <div className="col-12">
                        {deleteScsMsg ? <span className="text-success">{deleteScsMsg}</span> : ""}
                    </div>

                    <ModalFooter>
                        <div className="">
                            <button className="btn btn-secondary mr-2" onClick={() => this.deleteModalClose()}>Cancel</button>
                            {
                                loading ?
                                    <Button color="primary" >Loading...</Button>
                                    :
                                    <button className="btn btn-primary" onClick={() => this.doDelete()}>Delete</button>
                            }
                        </div>
                    </ModalFooter>
                </Modal>
                {/* Delete Modal */}

                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { editModal, refreshList, loading, holidays, deleteScsMsg } = state.rootReducer.holidays;
    const { holidaysList, activePage, totalItemsCount, limit, error, ScsMsg, message } = state.rootReducer.holidays;
    return {
        error,
        ScsMsg,
        holidays,
        editModal,
        refreshList,
        loading,
        activePage,
        totalItemsCount,
        limit,
        holidaysList,
        message,
        deleteScsMsg

    };
}

export default connect(mapStateToProps)(Index);