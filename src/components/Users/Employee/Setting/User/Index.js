import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Pagination from "react-js-pagination";
import Footer from "../../../../GlobalComponents/Footer";
import { Modal, ModalBody, ModalHeader, ModalFooter, Input } from "reactstrap";
import Navbar from "../../Layout/Navbar";
import { userActions } from "../../../../../actions";
// import { Button } from "reactstrap";
// import { Link } from "react-router-dom";

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
                date_of_birth: "",
                date_of_joining: "",
                password: "",
                confirm_password: "",

            },
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
                phone: ""
            },
            resetPasswordData: {
                id: "",
                password: "",
                confirm_password: ""
            }
        };

        this.getUsersList = this.getUsersList.bind(this);
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

    getUsersList() {
        this.props.dispatch(userActions.getUsersList({ search: this.state.search, page: this.state.activePage, limit: this.state.limit }));
    }

    handleSearch(val) {
        this.setState({
            search: val,
            activePage: 1
        }, () => { this.getUsersList(); });

    }

    userInfoHandler = (name, value) => {
        console.log(value);
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
    handleUpdate() {
        this.props.dispatch(userActions.updateUser(this.state.editUserData));
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
                status: "Active"
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
                status: "Active"
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
    componentDidMount() {
        this.getUsersList();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.refreshList) {
            this.setState({
                activePage: 1
            }, () => { this.getUsersList(); });
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
        if (this.state.user.data.user_role !== "Employee") {
            return <Redirect to="/" />;
        }
        const { usersList } = this.props;
        const { error, loading } = this.props;
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
                                    <li className="active"><a href="">Employees</a></li>

                                  

                                </ul>
                            </div>
                            <div className="col-lg-4">

                            </div>

                        </div>



                        <div id="table-scroll" className="table-scroll mt-4">
                            <table id="main-table" className="main-table">
                                <thead>
                                    <tr>
                                        <th scope="col" width="400">#</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">User Role</th>
                                        <th scope="col">Status</th>
                                      

                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList && usersList.map((item) => (
                                        <tr key={item._id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="name">
                                                        <strong>
                                                            <div className="avtar">{this.getUserInitials(item.first_name)}{this.getUserInitials(item.last_name)}</div>
                                                            {item.first_name} {item.last_name ? item.last_name : ""}
                                                        </strong>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.phone}</td>
                                            <td><small>{item.user_role === "Admin" ? "Admin" : "Employee"}</small></td>
                                            <td>
                                                <a href="" data-toggle="modal" data-target="#userStatus"><span className="capsule green-dim">
                                                    {item.status === "Active" ? "Active" : "Deactive"}
                                                </span></a>
                                            </td>
                                           
                                        </tr>
                                    ))}
                                    {usersList && usersList.length == 0 && loading == false &&
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
                    <p className="mt-5 text-center"><small>June Attendance Summary</small> Alice Smith</p>

                    <div className="stats">
                        <div className="stats-big">8h:20m</div>
                        <div className="stats-small">Avg/Day</div>
                    </div>
                    <div className="stats">
                        <div className="stats-big">50%</div>
                        <div className="stats-small">On-time Arrival</div>
                    </div>
                </div>
                {usersList && usersList.length > 0 &&
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
                    <ModalHeader charcode="Y" toggle={() => this.addNewModalClose()}>
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
                                    <option value="Bde">BDE</option>
                                </select>
                                {/* {(this.state.error && error) ? <span className="text-danger">{error.user_role ? error.user_role : ""}</span> : ""} */}
                            </div>
                            <div className="form-group">
                                <label>Designation <strong className="text-danger">*</strong></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.userInfo.designation}
                                    onChange={(e) => this.userInfoHandler("designation", e.target.value)}
                                />
                                {(this.state.error && error) ? <span className="text-danger">{error.password ? error.password : ""}</span> : ""}
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
                                    <option value="admin">Admin</option>
                                    <option value="reps">Reps</option>
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
    const { usersList, user, activePage, totalItemsCount, limit } = state.rootReducer.users;
    const { error } = state.rootReducer.users;
    const { addModal, editModal, resetModal, deleteModal } = state.rootReducer.users;
    const { refreshList, loading } = state.rootReducer.users;

    return {
        usersList,
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