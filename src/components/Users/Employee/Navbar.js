import React, { Component } from "react";
import logo from "../../../assets/images/logo.jpg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../../actions";

class Navbar extends Component {
    constructor(props) {
        super(props);
        // reset login status
        //this.props.dispatch(authActions.logout());
        // this.state = {
        //     shortName: ""
        // };

        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        //this.handleShortName = this.handleShortName.bind(this);
    }

    getUserInitials(Name) {
        if(Name != "")
        {
            const initials = Name.charAt(0) ;
            return initials.toUpperCase();
        }
        else
        {
            return "";
        }
    }
    
    handleLogout(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(authActions.logout());
    }

    render() {
        const { user} = this.props;

        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top">
                    <Link className="navbar-brand" to="/employee/attendance">
                        <img src={logo} width="180" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto ml-5" id="menu">     
                            <li className="nav-item">
                                <Link className="nav-link" to="/reps/open-booking">My Bookings</Link>
                            </li>     
                    
                        </ul>
                        <div className="my-2 my-lg-0">
                            <div className="ml-auto userinfo">      
                                <div className="user-area dropdown">       
                                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <div className="avtar">{user && this.getUserInitials(user.data.first_name)+this.getUserInitials(user.data.last_name)}</div>
                                        <span className="hide-mobile">{user && user.data.first_name+" "+user.data.last_name}</span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/reps/edit-profile" >Profile</Link>
                                        <Link className="dropdown-item" to="/reps/change-password" >Change Password</Link>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#" onClick={this.handleLogout}>Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="offset"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.rootReducer.authentication;
    const { user } = state.rootReducer.authentication;
    // console.log(loggingIn);
    // console.log(user);
    return {
        loggingIn,
        user
    };
}

export default connect(mapStateToProps)(Navbar);
//export default connect()(Navbar);