import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Input } from "reactstrap";
import Footer from "../../../../GlobalComponents/Footer";
import Navbar from "../../Layout/Navbar";
import { userActions } from "../../../../../actions";
import { APIURL } from "../../../../../constants/config";

//import ImageCropper from "./ImageCropped/Index";

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
                profileImage: "",

            },
            
            editImage: "",
            imageToCrop: "",
            croppedImage: "",
            error: false,

        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.editUserInfoHandler = this.editUserInfoHandler.bind(this);

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
                const image = reader.result;
                // console.log("sss", reader.result);
                editUserData["profileImage"] = reader.result;
                this.setState({
                    imageToCrop: image,
                    editUserData: editUserData
                });
            });

            reader.readAsDataURL(value);
        }
        else {
            editUserData[name] = value;
        }
        this.setState({
            editUserData,

        });
    };

    handleUpdate() {
        const { editUserData,user } = this.state;
        

        /*const formData = new FormData();
        formData.append("profileImage",this.state.imageToCrop);
        formData.append("id",editUserData["id"]);
        formData.append("user_role",editUserData["user_role"]);
        formData.append("first_name",editUserData["first_name"]);
        formData.append("last_name",editUserData["last_name"]);
        formData.append("email",editUserData["email"]);
        formData.append("phone",editUserData["phone"]);*/

        // Create the Blob object (of course, it can be of any type and defined in any way)

        this.props.dispatch(userActions.updateUser(editUserData));

        let userss=user;
        userss.data.first_name=editUserData["first_name"];
        userss.data.last_name=editUserData["last_name"];
        userss.data.email=editUserData["email"];
        userss.data.phone=editUserData["phone"];
        userss.data.profileImage=editUserData["profileImage"];
        userss.data.id=editUserData["id"];
      
        // console.log(userss);

        localStorage.setItem("user", JSON.stringify(userss));

        this.setState({
            user:userss
        });
        // console.log(JSON.parse(localStorage.getItem("user")));
    }
    setEditUser(data) {
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
                this.setState({
                    message: false
                });


            }, 50);
        }
        if (nextProps.error !== undefined) {
            this.setState({
                error: true
            });


        }
    }

    render() {
        const { loading } = this.props;
        // console.log('User updated successfully);
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user.data.user_role !== "Admin") {
            return <Redirect to="/" />;
        }
        if(this.state.message==true)
        {
            return <Redirect to="/admin/edit-profile" />;
        }
        const { error} = this.props;
    
        return (
            <div>
                <Navbar />
                <section className="b-burger">
                    <div className="container">
                        {/* <h1 className="date-scroll pt-4"> <Link to="/reps/open-booking"><i className="fa fa-long-arrow-left smbtn"></i> <strong>Back</strong></Link></h1> */}
                        <div className="row pt-4 mt-5">
                            <div className="col-lg-6 offset-lg-1">
                                <div className="pt-4">
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
                                    </div>

                                    <div className="form-group">
                                        <label>Profile Upload </label>
                                        <Input type="file" accept="image/*"
                                            className="form-control"
                                            onChange={(e) => this.editUserInfoHandler("profileImage", e.target.files[0])}
                                        />
                                        {this.state.editUserData.profileImage != "" &&
                                            <img style={{ width: 200, height: 100 }} alt="Cropped Img " src={this.state.editUserData.profileImage} />
                                        }
                                        {this.state.editUserData.profileImage == "" && this.state.editImage != "" &&
                                            <img style={{ width: 200, height: 100 }} alt="Cropped Img " src={this.state.editImage} />
                                        }

                                    </div>

                                    <div>
                                        {this.state.message && <span className="text-success">User updated successfully.</span>}
                                    </div>

                                    <div className="mt-5 text-right">
                                        {
                                            loading ?
                                                <button className="btn btn-primary">Loading...</button>
                                                :
                                                <Button className="btn btn-primary" color="primary" onClick={this.handleUpdate}>Save Changes</Button>
                                        }
                                    </div>

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
    const { editModal, successMsg, loading } = state.rootReducer.users;

    return {
        error,
        editModal,
        user,
        successMsg,
        loading
        
    };
}

export default connect(mapStateToProps)(Index);