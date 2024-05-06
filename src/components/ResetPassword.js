import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {ReactComponent as ImnLogo} from "../assets/images/logo.svg";
import { connect } from "react-redux";
import { authActions } from "../actions";
import Footer from "./GlobalComponents/Footer";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resetPassword: {
                token: "",
                email: "",
                password: "",
                password_confirmation: ""
            },
            error: false,
            redirectLogin:false
        };

        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleResetPassword = (name, value) => {
        const { resetPassword } = this.state;
        resetPassword[name] = value;
        this.setState({
            resetPassword
        });
    };

    handleSubmit() { 
        const tokenParemeter = this.props.match.params;
        const { resetPassword } = this.state;
        resetPassword["token"] = tokenParemeter.token;
        this.setState({
            resetPassword
        });
        this.props.dispatch(authActions.resetPassword(this.state.resetPassword));
      
    }

    resetFild(){
        this.setState({
            resetPassword: {
                token: "",
                email: "",
                password: "",
                password_confirmation: ""
            }
        });

        setTimeout(() => {
            this.setState({ 
                redirectLogin: true 
            });
        }, 2000);
    }

    componentDidMount(){
          
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.redirectLogin==true) {
            this.resetFild();
        }

        if(nextProps.error !== "")
        {
            this.setState({ 
                error: true 
            });

        }

    }


    render() {
        if (this.state.redirectLogin) {
            return <Redirect to="/" />;
        }
        const { msg } = this.props;
        const { error } = this.props;
        // const { username, password} = this.state;
        return (
            <div>
                <div className="fw">
                    <div className="fw__left">
                    </div> 
                    <div className="fw__right">
                        <div className="text-center">
                            <ImnLogo width="150"/>
                            <h4 className="mt-5">Reset Password</h4>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input 
                                type="email" 
                                className="form-control" 
                                value={this.state.resetPassword.email} 
                                onChange={(e) => this.handleResetPassword("email", e.target.value)}
                                aria-describedby="emailHelp" 
                                placeholder="Enter email"
                            />
                            
                            {(this.state.error && error) ? <span className="text-danger">{error.email ? error.email : ""}</span> : ""}
                        </div>	

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input 
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={this.state.resetPassword.password} 
                                onChange = {(e) => this.handleResetPassword("password", e.target.value)}
                            />
                            {(this.state.error && error) ? <span className="text-danger">{error.password ? error.password : ""}</span> : ""}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Input 
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={this.state.resetPassword.password_confirmation} 
                                onChange = {(e) => this.handleResetPassword("password_confirmation", e.target.value)}
                            />
                            {(this.state.error && error) ? <span className="text-danger">{error.password_confirmation ? error.password_confirmation : ""}</span> : ""}
                            {(this.state.error && error) ? <span className="text-danger">{error.common ? error.common : ""}</span> : ""}
                            {msg ? <span className="text-success">{msg.message}</span> : ""}
                        </div>	  
                    
                        <button className="btn btn-primary btn-block mt-5" onClick={(e) => this.handleSubmit(e)}>Reset Password</button>
                        <div className="mt-4">
                            <Link to="/"><small>Back to Login page</small></Link>
                        </div>
                            
                        
                    </div>
                </div>
                <Footer />
            </div>    	
        );
    }
}

function mapStateToProps(state) {
    const { msg } = state.rootReducer.authentication;
    const { error,redirectLogin } = state.rootReducer.authentication;
    // console.log(loggingIn);
    // console.log(user);
    return {
        msg,
        error,
        redirectLogin
    };
}

export default connect(mapStateToProps)(ResetPassword);