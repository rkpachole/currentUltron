import React, { Component } from "react";
import {ReactComponent as ImnLogo} from "../assets/images/logo.svg";
import { connect } from "react-redux";
import { authActions } from "../actions";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class Signin extends Component {
    constructor(props) {
        super(props);
        // reset login status
        //this.props.dispatch(authActions.logout());
        this.state = {
            username: "",
            password: "",
            submitted: false,
            user: JSON.parse(localStorage.getItem("user")),
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        
        //if (username && password) {
        dispatch(authActions.login(username, password));

        //}
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    componentDidMount(){

          
    }

    render() {
        if (this.state.user && this.state.user.data.user_role === "Admin") {
            return <Redirect to="/admin/dashboard" />;
        }
        else if (this.state.user && this.state.user.data.user_role === "Employee") {
            return <Redirect to="/employee/dashboard" />;
        }
        const { error } = this.props;
        const { username, password} = this.state;
        console.log("dasdasdas sfsdfdsf", error);
        // const { message } = this.props;
        // console.log(message);
        return (
            <div className="fw">
                <div className="fw__left">
                </div>  
                <div className="fw__right">
                    <div className="text-center">
                        <ImnLogo width="150"/>
                        <h4 className="mt-5">Login</h4>
                    </div>
                    <form className="mt-5">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={username} onChange={this.handleUsernameChange}/>
                            {error ? <span className="text-danger">{error.email ? error.email : ""}</span> : ""}                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={this.handlePasswordChange}/>
                            {error ? <span className="text-danger">{error.password ? error.password : ""}</span> : ""}
                            {error ? <span className="text-danger">{error.common ? error.common : ""}</span> : ""}
                        </div>
                        {/* {message} */}
                        <Link to="/forgot-password"><small>Forgot Password?</small></Link>
                        <button className="btn btn-primary btn-block mt-5" onClick={this.handleSubmit}>Login</button>
                    </form>
                </div>
            </div>	
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.rootReducer.authentication;
    const { user } = state.rootReducer.authentication;
    const { error } = state.rootReducer.authentication;
    // console.log(loggingIn);
    // console.log(user);
    return {
        loggingIn,
        user,
        error
    };
}

export default connect(mapStateToProps)(Signin);