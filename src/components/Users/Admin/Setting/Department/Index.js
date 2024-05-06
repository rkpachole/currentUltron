import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Pagination from "react-js-pagination";
import Footer from "../../../../GlobalComponents/Footer";
import { Modal, ModalBody, ModalHeader, ModalFooter, Input } from "reactstrap";
import Navbar from "../../Layout/Navbar";
import { userActions ,departmentActions } from "../../../../../actions";
// import { Button } from "reactstrap";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Link } from "react-router-dom";

class Index extends Component {
    constructor(props) {
        super(props);
        // reset login status
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            addNewModal: false,
            search: "",
            activePage: 1,
            limit: 10,
            totalItemsCount: 1,
            userInfo: {
                user_role: "",
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                status: "Active",
                department_type: "",
                designation: "",
                reportTo: "",
                date_of_birth: "",
                date_of_joining: "",
                password: "",
                confirm_password: "",

            },
            UserListForReporting: [],
            error: false,
            deleteConfirmation: false,
            id: "",
            editModal: false,
            deleteModal: false,
            resetPasswordModal: false,
            editUserData: {
                id: "",
                user_role: "",
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                designation: "",
                department_type: ""
            },
            resetPasswordData: {
                id: "",
                password: "",
                confirm_password: ""
            }
        };

        this.getDepartmentList = this.getDepartmentList.bind(this);
        //this.handleSearch = this.handleSearch.bind(this);
        // this.editUserInfoHandler = this.editUserInfoHandler.bind(this);
        this.addUserSubmit = this.addUserSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.doResetPassword = this.doResetPassword.bind(this);
        this.addNewModalOpen = this.addNewModalOpen.bind(this);
        this.addNewModalClose = this.addNewModalClose.bind(this);
        this.editModalOpen = this.editModalOpen.bind(this);
        this.editModalClose = this.editModalClose.bind(this);
        this.deleteModalOpen = this.deleteModalOpen.bind(this);
        this.deleteModalClose = this.deleteModalClose.bind(this);
        this.resetPasswordModalOpen = this.resetPasswordModalOpen.bind(this);
        this.resetPasswordModalClose = this.resetPasswordModalClose.bind(this);
        this.getUserInitials = this.getUserInitials.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleUserReportSearch = this.handleUserReportSearch.bind(this);
        this.handleOnUserReportSelect = this.handleOnUserReportSelect.bind(this);
    }
    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        this.setState(
            {
                activePage: pageNumber
            }
            , () => {
                this.getUsersList();
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
        }, () => { this.getUsersList(); });

    }

    userInfoHandler = (name, value) => {
        console.log(name, value);
        const { userInfo } = this.state;
        userInfo[name] = value;
        this.setState({
            userInfo
        }, () => {
            console.log(userInfo);
        });
    };

    editUserInfoHandler = (name, value) => {
        const { editUserData } = this.state;
        editUserData[name] = value;
        this.setState({
            editUserData
        }, () => {
            console.log("editUserData", editUserData);
        });
    };

    resetPasswordInfoHandler = (name, value) => {
        const { resetPasswordData } = this.state;
        resetPasswordData[name] = value;
        this.setState({
            resetPasswordData
        });
    };
    addUserSubmit() {
        this.props.dispatch(userActions.addUser(this.state.userInfo));
    }  
    addNewModalOpen() {
        this.setState({ addNewModal: !this.state.addNewModal });
    }
    addNewModalClose() {
        this.setState({
            addNewModal: false,
            userInfo: {
                user_role: "",
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                status: "Active",
                department_type: "",
                designation: "",
                date_of_birth: "",
                date_of_joining: "",
                password: "",
                confirm_password: "",
            },
            error: false
        });
    }
    editModalOpen() {
        this.setState({
            editModal: true,
        });
    }
    editModalClose() {
        this.setState({
            editModal: false,
            editUserData: {
                id: "",
                user_role: "",
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                status: "Active",
                designation: "",
                department_type: "",
                reportTo:""
            }
        });
    }
    resetPasswordModalOpen() {
        this.setState({
            resetPasswordModal: true
        });
    }
    resetPasswordModalClose() {
        this.setState({
            resetPasswordModal: false,
            resetPasswordData: {
                id: "",
                password: "",
                confirm_password: ""
            },
        });
    }
    handleResetPassword(id) {
        this.setState({
            resetPasswordData: {
                id: id
            }
        });
        this.resetPasswordModalOpen();
    }
    doResetPassword() {
        this.props.dispatch(userActions.resetPassword(this.state.resetPasswordData));
    }
    getSingleUser(id) {
        this.props.dispatch(userActions.getById(id));
    }
    setEditUser(data) {
        console.log(data);
        this.setState({
            editUserData: {
                id: data._id,
                user_role: data.user_role,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                status: "Active",
                designation: data.designation,
                department_type: data.department_type,
            }
        });
        this.editModalOpen();
    }
    deleteModalOpen() {
        this.setState({
            deleteModal: true
        });
    }
    deleteModalClose() {
        this.setState({
            deleteModal: false
        });
    }
    handleDelete(id) {
        this.setState({
            id: id
        });
        this.deleteModalOpen();
    }
    doDelete() {
        this.props.dispatch(userActions.delete({ id: this.state.id }));
    }
    getUserInitials(Name) {
        if (Name != "" && Name != null) {
            const initials = Name.charAt(0);
            return initials.toUpperCase();
        }
        else {
            return "";
        }
    }
    handleUserReportSearch(searchString) {
        this.props.dispatch(userActions.getUserListForReporting({ search: searchString }));
    }
    handleOnUserReportSelect(item) {
        this.userInfoHandler("reportTo",item.id);
        this.editUserInfoHandler("reportTo",item.id);

    }
    getDepartmentList() {
        this.props.dispatch(departmentActions.getDepartmentList({ search: this.state.search, page: this.state.activePage, limit: this.state.limit }));
    }
    handleUpdate() {
        this.props.dispatch(userActions.updateUser(this.state.editUserData));
    }
    componentDidMount() {
        this.getDepartmentList();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.refreshList) {
            this.setState({
                activePage: 1
            }, () => { this.getDepartmentList(); });
        }

        if (nextProps.activePage != "" && nextProps.totalItemsCount != "" && nextProps.limit != "") {
            this.handlePageStates(nextProps.activePage, nextProps.totalItemsCount, 10);
        }

        if (nextProps.addModal == false) {
            this.addNewModalClose();
        }
        if (nextProps.addModal == true) {
            this.addNewModalOpen();
        }

        if (nextProps.editModal == false) {
            this.editModalClose();
        }
        if (nextProps.editModal == true) {
            this.setEditUser(nextProps.user.data);
        }

        if (nextProps.resetModal == false) {
            this.resetPasswordModalClose();
        }
        if (nextProps.resetModal == true) {
            this.resetPasswordModalOpen();
        }

        if (nextProps.deleteModal == false) {
            this.deleteModalClose();
        }
        if (nextProps.deleteModal == true) {
            this.deleteModalOpen();
        }

        // if(nextProps.editModalClose) {
        //     this.editModalClose();
        // }

        if (nextProps.error !== "") {
            this.setState({
                error: true
            });

            setTimeout(() => {
                this.setState({
                    error: false
                });
            }, 5000);
        }
    }
    render() {
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user.data.user_role !== "Admin") {
            return <Redirect to="/" />;
        }
        const {
            departmentList,
            totalItemsCount
        } = this.props;
        const { error, loading } = this.props;
        console.log("department",this.props.departmentList);
     
        return (
            <div>
                <Navbar activePage="dashboard" />
                <main className="offset">
                    <div className="container-fluid hard-pad">
                        <div className="row align-items-center pt-4 border-mobile">
                            <div className="col-lg-4 col-6">
                                <h2 className="page-heading"> Settings </h2>
                            </div>
                        </div>

                        <div className="row align-items-center pt-4 border-mobile">

                            <div className="col-lg-8">
                                <ul className="submenu">
                                    <li className=""><Link to="/admin/settings/users">Employees</Link></li>
                                    <li className="active"><a href="javascript:;">Departments</a></li>
                                    <li className=""><Link to="/admin/holidays">Holidays</Link></li>
                            
                                </ul>
                            </div>
                            <div className="col-lg-4">

                            </div>

                        </div>



                        <div className="table-scroll mt-4">
                            <table className="main-table">
                                <thead>
                                    <tr>
                                        <th scope="col" >#</th>
                                        <th scope="col">Department Name</th>
                                        <th scope="col">Status</th>
                                        {/* <th scope="col" className="text-right">Actions</th> */}

                                    </tr>
                                </thead>
                                <tbody>
                                    {departmentList && departmentList.map((item) => (
                                        <tr key={item._id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="name">
                                                        <strong>
                                                            <div className="avtar">{this.getUserInitials(item.name)}</div>
                                                            {/* {item.name} {item.last_name ? item.last_name : ""} */}
                                                        </strong>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>  <strong>{item.name}</strong></td>
                                            <td>
                                                <a ><span className="capsule green-dim">
                                                    {item.status === "Active" ? "Active" : "Deactive"}
                                                </span></a>
                                            </td>
                                            {/* <td className="text-right">
                                                <div className="action-area dropdown">
                                                    <a className="dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <span className="dots">...</span>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" onClick={() => this.getSingleUser(item._id)}>Edit</a>
                                                        {this.state.user.data._id !== item._id &&
                                                            <a className="dropdown-item" onClick={() => this.handleDelete(item._id)}>Delete</a>
                                                        }
                                                        <a className="dropdown-item" onClick={() => this.handleResetPassword(item._id)}>Reset Password</a>
                                                    </div>
                                                </div>
                                            </td> */}
                                        </tr>
                                    ))}
                                    {departmentList && departmentList.length == 0 && loading == false &&
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
                    <p className="mt-5 text-center">Department Summary</p>

                    <div className="stats">
                        <div className="stats-big">{totalItemsCount}</div>
                        <div className="stats-small">Department</div>
                    </div>
                    {/* <div className="mt-5 text-center">
                        <Button onClick={this.addNewModalOpen} color='primary' className="btn btn-primary btn-sml">Add New Department</Button>
                    </div> */}
                </div>
                {departmentList && departmentList.length > 0 &&
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
                    <ModalHeader  toggle={() => this.addNewModalClose()}>
                        Add New User
                    </ModalHeader>
                    <ModalBody>
                        <form className="">
                            <div className="form-group">
                                <label>User Role <strong className="text-danger">*</strong></label>
                                <select
                                    className="form-control chosen-select"
                                    value={this.state.userInfo.user_role}
                                    onChange={(e) => this.userInfoHandler("user_role", e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">Employee</option>
                                </select>
                                {(this.state.error && error) ? <span className="text-danger">{error.user_role ? error.user_role : ""}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Report  <strong className="text-danger">*</strong></label>
                                <ReactSearchAutocomplete
                                    // className="form-control chosen-select"
                                    items={this.state.UserListForReporting}
                                    onSearch={this.handleUserReportSearch}
                                    onSelect={this.handleOnUserReportSelect}
                                    fuseOptions={{ minMatchCharLength: 1 }}
                                    inputDebounce="100"
                                    autoFocus
                                />
                                {/* {(this.state.error && error) ? <span className="text-danger">{error.designation ? error.designation : ""}</span> : ""} */}
                            </div>
                            <div className="form-group row">
                                <div className="col">
                                    <label>First Name <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        value={this.state.userInfo.first_name}
                                        onChange={(e) => this.userInfoHandler("first_name", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.first_name ? error.first_name : ""}</span> : ""}
                                </div>
                                <div className="col">
                                    <label>Last Name <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        value={this.state.userInfo.last_name}
                                        onChange={(e) => this.userInfoHandler("last_name", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.last_name ? error.last_name : ""}</span> : ""}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email Address (Username) <strong className="text-danger">*</strong></label>
                                <Input
                                    type="email"
                                    className="form-control"
                                    value={this.state.userInfo.email}
                                    onChange={(e) => this.userInfoHandler("email", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.email ? error.email : ""}</span> : ""}
                                {(this.state.error && error) ? <span className="text-danger">{error.common ? error.common : ""}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Phone Number </label>
                                <Input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    value={this.state.userInfo.phone}
                                    onChange={(e) => this.userInfoHandler("phone", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.phone ? error.phone : ""}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Department Type <strong className="text-danger">*</strong></label>
                                <select
                                    className="form-control chosen-select"
                                    value={this.state.userInfo.department_type}
                                    onChange={(e) => this.userInfoHandler("department_type", e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Developer">Developer</option>
                                    <option value="QA">QA</option>
                                </select>
                                {(this.state.error && error) ? <span className="text-danger">{error.department_type ? error.department_type : ""}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Designation <strong className="text-danger">*</strong></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.userInfo.designation}
                                    onChange={(e) => this.userInfoHandler("designation", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.designation ? error.designation : ""}</span> : ""}
                            </div>
                            
                            <div className="form-group row">
                                <div className="col">
                                    <label>Date Of Birth <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="date"
                                        className="form-control"
                                        value={this.state.userInfo.date_of_birth}
                                        onChange={(e) => this.userInfoHandler("date_of_birth", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.first_name ? error.first_name : ""}</span> : ""}
                                </div>
                                <div className="col">
                                    <label>Date Of Joining <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="date"
                                        className="form-control"
                                        value={this.state.userInfo.date_of_joining}
                                        onChange={(e) => this.userInfoHandler("date_of_joining", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.last_name ? error.last_name : ""}</span> : ""}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Password <strong className="text-danger">*</strong></label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    value={this.state.userInfo.password}
                                    onChange={(e) => this.userInfoHandler("password", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.password ? error.password : ""}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Confirm Password <strong className="text-danger">*</strong></label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    value={this.state.userInfo.confirm_password}
                                    onChange={(e) => this.userInfoHandler("confirm_password", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.confirm_password ? error.confirm_password : ""}</span> : ""}
                            </div>

                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <div className="">
                            <button className="btn btn-secondary mr-2" onClick={this.addNewModalClose}>Cancel</button>
                            <button className="btn btn-primary" onClick={this.addUserSubmit}>Submit</button>
                        </div>
                    </ModalFooter>
                </Modal>
                {/* Add Modal */}
                <Modal size="md" isOpen={this.state.editModal} toggle={() => this.editModalClose()}>
                    <ModalHeader className="" toggle={() => this.editModalClose()}>
                        Edit User Details
                    </ModalHeader>
                    <ModalBody>
                        <form className="">
                            <div className="form-group">
                                <label>User Role <strong className="text-danger">*</strong></label>
                                <select
                                    className="form-control chosen-select"
                                    value={this.state.editUserData.user_role}
                                    disabled
                                >
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <div className="col">
                                    <label>First Name <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        value={this.state.editUserData.first_name}
                                        onChange={(e) => this.editUserInfoHandler("first_name", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.first_name ? error.first_name : ""}</span> : ""}
                                </div>
                                <div className="col">
                                    <label>Last Name <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        value={this.state.editUserData.last_name}
                                        onChange={(e) => this.editUserInfoHandler("last_name", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.last_name ? error.last_name : ""}</span> : ""}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email Address (Username) <strong className="text-danger">*</strong></label>
                                <Input
                                    type="email"
                                    className="form-control"
                                    value={this.state.editUserData.email}
                                    onChange={(e) => this.editUserInfoHandler("email", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.email ? error.email : ""}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Phone Number </label>
                                <Input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    value={this.state.editUserData.phone}
                                    onChange={(e) => this.editUserInfoHandler("phone", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.phone ? error.phone : ""}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Department Type <strong className="text-danger">*</strong></label>
                                <select
                                    className="form-control chosen-select"
                                    value={this.state.editUserData.department_type}
                                    onChange={(e) => this.userInfoHandler("department_type", e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Developer">Developer</option>
                                    <option value="QA">QA</option>
                                </select>
                                {(this.state.error && error) ? <span className="text-danger">{error.department_type ? error.department_type : ""}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Designation {this.state.editUserData.designation}<strong className="text-danger">*</strong></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.editUserData.designation}
                                    onChange={(e) => this.userInfoHandler("designation", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.designation ? error.designation : ""}</span> : ""}
                            </div>
                            <div className="form-group">
                                <label>Designation <strong className="text-danger">*</strong></label>
                                <ReactSearchAutocomplete
                                    // className="form-control chosen-select"
                                    items={this.state.UserListForReporting}
                                    onSearch={this.handleUserReportSearch}
                                    onSelect={this.handleOnUserReportSelect}
                                    fuseOptions={{ minMatchCharLength: 1 }}
                                    inputDebounce="100"
                                    autoFocus
                                />
                                {/* {(this.state.error && error) ? <span className="text-danger">{error.designation ? error.designation : ""}</span> : ""} */}
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <div className="">
                            <button className="btn btn-secondary mr-2" onClick={this.editModalClose}>Cancel</button>
                            <button className="btn btn-primary" onClick={this.handleUpdate}>Update</button>
                        </div>
                    </ModalFooter>
                </Modal>
                {/* Edit Modal */}
                <Modal size="md" isOpen={this.state.deleteModal} toggle={() => this.deleteModalClose()}>
                    <ModalHeader className="" toggle={() => this.deleteModalClose()}>
                        Delete User
                    </ModalHeader>
                    <ModalBody>
                        <div className="my-2">Please confirm if you want to delete this user?</div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="">
                            <button className="btn btn-secondary mr-2" onClick={() => this.deleteModalClose()}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => this.doDelete()}>Delete</button>
                        </div>
                    </ModalFooter>
                </Modal>
                {/* Delete Modal */}
                <Modal size="md" isOpen={this.state.resetPasswordModal} toggle={() => this.resetPasswordModalClose()}>
                    <ModalHeader className="" toggle={() => this.resetPasswordModalClose()}>
                        Reset Password
                    </ModalHeader>
                    <ModalBody>
                        <form className="">
                            <div>
                                <div className="form-group">
                                    <label>Password <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        value={this.state.resetPasswordData.password}
                                        onChange={(e) => this.resetPasswordInfoHandler("password", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.password ? error.password : ""}</span> : ""}
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        value={this.state.resetPasswordData.confirm_password}
                                        onChange={(e) => this.resetPasswordInfoHandler("confirm_password", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.confirm_password ? error.confirm_password : ""}</span> : ""}
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <div className="">
                            <button className="btn btn-secondary mr-2" onClick={this.resetPasswordModalClose}>Cancel</button>
                            <button className="btn btn-primary" onClick={this.doResetPassword}>Update Password</button>
                        </div>
                    </ModalFooter>
                </Modal>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { departmentList, user, activePage, totalItemsCount, limit } = state.rootReducer.departments;
    const { error } = state.rootReducer.users;
    const { addModal, editModal, resetModal, deleteModal } = state.rootReducer.users;
    const { refreshList, loading } = state.rootReducer.users;
    console.log(departmentList);
    return {
        departmentList,
        error,
        addModal,
        editModal,
        resetModal,
        deleteModal,
        user,
        refreshList,
        loading,
        activePage,
        totalItemsCount,
        limit
    };
}

export default connect(mapStateToProps)(Index);