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

        // if (user) {
        //     this.handleShortName(user.data.first_name+" "+user.data.last_name);
        // }

        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top">
                    <a className="navbar-brand" href="#">
                        <img src={logo} width="180" alt="Logo"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto ml-5" id="menu">
                            <li className={this.props.activePage === "dashboard" ? "nav-item active" : "nav-item"}>
                                <Link className="nav-link" to="/admin/dashboard/booking-dispatch" >Dashboard</Link>
                            </li>
                            <li className={this.props.activePage === "availability" ? "nav-item active" : "nav-item"}>
                                <Link className="nav-link" to="/admin/availability" >Availability</Link>
                            </li>
                            <li className={this.props.activePage === "bookings" ? "nav-item active" : "nav-item"}>
                                <Link className="nav-link" to="/admin/bookings" >Bookings</Link>
                            </li> 
                            <li className={this.props.activePage === "hospitals" ? "nav-item active" : "nav-item"}>
                                <Link className="nav-link" to="/admin/hospitals" >Hospitals</Link>
                            </li>
                            {/* <!--  <li class="nav-item">
                                <a class="nav-link" href="charges.php">Charges</a>
                            </li> --> */}
                            <li className={this.props.activePage === "kits" ? "nav-item active" : "nav-item"}>
                                <Link className="nav-link" to="/admin/categories" >Kits</Link>
                            </li>
                            <li className={this.props.activePage === "users" ? "nav-item active" : "nav-item"}>
                                <Link className="nav-link" to="/admin/users" >Users</Link>
                            </li>
                        </ul>
                        {/* <button onClick={this.handleLogout}>Logout</button> */}
                        <div className="my-2 my-lg-0">
                            <div className="ml-auto userinfo">      
                                <div className="user-area dropdown">       
                                    <a className='icon__mg dropdown-toggle' href="" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="avtar">{user && this.getUserInitials(user.data.first_name)+this.getUserInitials(user.data.last_name)}</div>
                                        <span className="hide-mobile">{user && user.data.first_name+" "+user.data.last_name}</span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Profile</a>
                                        <a className="dropdown-item" href="#">Setting</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="" onClick={this.handleLogout}>Logout</a>
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