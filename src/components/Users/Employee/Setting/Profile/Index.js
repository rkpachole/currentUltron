import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Input } from "reactstrap";
import Footer from "../../../../GlobalComponents/Footer";
import Navbar from "../../Layout/Navbar";
import { userActions } from "../../../../../actions";
import { APIURL } from "../../../../../constants/config";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            editUserData: {
                id: "",
                user_role: "",
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                profileImage: ""
            },
            editImage: "",
            // changePassword: {
            //     id: "",
            //     password: "",
            //     confirm_password: ""
            // },
            error: false,
            message: false
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        //this.changePasswordSubmit = this.changePasswordSubmit.bind(this);
        // this.handleOnKitSelect = this.handleOnKitSelect.bind(this);
        // this.handleOnProductSearch = this.handleOnProductSearch.bind(this);
        // this.handleOnProductSelect = this.handleOnProductSelect.bind(this);
        // this.handleKitList = this.handleKitList.bind(this);
        // this.handleProductList = this.handleProductList.bind(this);
    }

    getUserData() {
        this.props.dispatch(userActions.getById(this.state.user.data._id));
    }

    editUserInfoHandler = (name, value) => {
        const { editUserData } = this.state;

        if (name === "profileImage") {
            editUserData[name] = value;
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                editUserData["profileImage"] = reader.result;
                this.setState({
                    editUserData: editUserData
                });
            });

            reader.readAsDataURL(value);
        }
        else {
            editUserData[name] = value;
        }
        this.setState({
            editUserData
        });
    };

    handleUpdate() {
        this.props.dispatch(userActions.updateUser(this.state.editUserData));
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
                profileImage: ""
            },
            editImage: data.profileImage != "" && data.profileImage != undefined ? APIURL + "assets/profileImages/" + data.profileImage : ""

        });
    }

    // handlePassword = (name, value) => {
    //     const { changePassword } = this.state;
    //     changePassword[name] = value;
    //     this.setState({
    //         changePassword
    //     });
    // };

    // changePasswordSubmit(id) {
    //     this.setState({
    //         changePassword: {
    //             id: id,
    //             password: this.state.changePassword.password,
    //             confirm_password: this.state.changePassword.confirm_password
    //         }
    //     }, () => {
    //         this.props.dispatch(userActions.resetPassword(this.state.changePassword));
    //     });
    // }

    // handleOnKitSearch(searchString, result) {
    //     console.log(result);
    //     this.props.dispatch(setActions.getKitsList({search: searchString}));
    // }

    // handleOnKitSelect(item) {
    //     this.setState({ 
    //         selectedKit:  item
    //     });
    // }

    // handleOnProductSearch(searchString, result) {
    //     console.log(result);
    //     this.props.dispatch(setActions.getProductsList({search: searchString}));
    // }

    // handleOnProductSelect(item) {
    //     console.log(item);
    //     this.setState({ 
    //         selectedProduct:  item
    //     });

    //     this.setState(prevState => ({
    //         selectedProductList: [ item, ...prevState.selectedProductList]
    //     }));
    // }

    // handleKitList(kitList) {
    //     this.setState({ 
    //         kitList:  kitList
    //     });
    // }

    // handleProductList(productList) {
    //     this.setState({ 
    //         productList:  productList
    //     });
    // }

    // deleteProduct(e, id) {
    //     e.preventDefault();
    //     console.log("before", this.state.selectedProductList);
    //     const newProductList = this.state.selectedProductList.filter(product => product._id !== id);
    //     this.setState({ selectedProductList: newProductList },
    //         ()=>{
    //             console.log("after", this.state.selectedProductList);
    //         });
    // }

    componentDidMount() {
        if (this.state.user) {
            this.getUserData();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {


        if (nextProps.editModal == true) {

            this.setEditUser(nextProps.user.data);
        }

        if (nextProps.editModal == false) {
            this.setState({
                message: true
            });

            setTimeout(() => {
                this.setState({ message: false });
            }, 2000);

        }

        if (nextProps.error !== "") {
            this.setState({
                error: true
            });


        }
    }

    render() {
        const { loading } = this.props;
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user.data.user_role !== "Employee") {
            return <Redirect to="/" />;
        }
        const { error } = this.props;

        return (
            <div>
                <Navbar />
                <section className="b-burger">
                    <div className="container">
                        {/* <h1 className="date-scroll pt-4"> <Link to="/reps/open-booking"><i className="fa fa-long-arrow-left smbtn"></i> <strong>Back</strong></Link></h1> */}

                        <div className="row pt-4 mt-5">
                            <div className="col-lg-6 offset-lg-1">
                                <div className="pt-4"></div>

                                <h2 className="page-heading">Edit Profile</h2>

                                <div className="form-group pt-4">
                                    <label>First Name <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        value={this.state.editUserData.first_name}
                                        onChange={(e) => this.editUserInfoHandler("first_name", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.first_name ? error.first_name : ""}</span> : ""}
                                </div>

                                <div className="form-group">
                                    <label>Last Name <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        value={this.state.editUserData.last_name}
                                        onChange={(e) => this.editUserInfoHandler("last_name", e.target.value)}
                                    />
                                    {(this.state.error && error) ? <span className="text-danger">{error.last_name ? error.last_name : ""}</span> : ""}
                                </div>

                                <div className="form-group">
                                    <label>Email Address (Username) <strong className="text-danger">*</strong></label>
                                    <Input
                                        type="email"
                                        className="form-control"
                                        value={this.state.editUserData.email}
                                        disabled
                                    />
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
                                    <label>Profile Upload </label>
                                    <Input type="file" accept="image/*"
                                        className="form-control"
                                        onChange={(e) => this.editUserInfoHandler("profileImage", e.target.files[0])}
                                    />
                                    {this.state.editUserData.profileImage != "" &&
                                        <img className="mt-2" style={{ width: 200, height: 100 }} alt="Cropped Img" src={this.state.editUserData.profileImage} />
                                    }
                                    {this.state.editUserData.profileImage == "" && this.state.editImage != "" &&
                                        <img className="mt-2" style={{ width: 200, height: 100 }} alt="Cropped Img" src={this.state.editImage} />
                                    }
                                </div>

                                <div>
                                    {this.state.message == true && <span className="text-success">User updated successfully.</span>}
                                </div>

                                <div className="mt-5 text-right">

                                    {
                                        loading ?
                                            <button className="btn btn-primary">Loading...</button>
                                            :
                                            <button className="btn btn-primary" onClick={this.handleUpdate}>Save Changes</button>
                                    }
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.rootReducer.users;
    const { error } = state.rootReducer.users;
    const { editModal, loading } = state.rootReducer.users;

    return {
        loading,
        error,
        editModal,
        user

    };
}
export default connect(mapStateToProps)(Index);