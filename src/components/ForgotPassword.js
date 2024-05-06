import React, { Component } from "react";
import {ReactComponent as ImnLogo} from "../assets/images/logo.svg";
import { connect } from "react-redux";
import { authActions } from "../actions";
import Footer from "./GlobalComponents/Footer";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstSubmit:0
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            firstSubmit:1
        });
        
        const { dispatch } = this.props;
        dispatch(authActions.forgotPassword(this.state.email));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.resetForm==true) {
           
            this.setState({
                email:""
            });
           
        }

    }


    componentDidMount(){
          
    }

    render() {
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
                            <h4 className="mt-5">Forgot Password?</h4>
                        </div>
                        <form className="mt-5">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Enter your Email address to reset your password</label>
                                <Input 
                                    type="email" 
                                    className="form-control" 
                                    value={this.state.email} 
                                    onChange={(e) => this.handleEmailChange(e)}
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter email"
                                />
                                {msg && this.state.firstSubmit==1 ? <span className="text-success">{msg.message}</span> : ""}
                                {error && this.state.firstSubmit==1 ? <span className="text-danger">{error.email}</span> : ""}
                                {error && this.state.firstSubmit==1 ? <span className="text-danger">{error.common}</span> : ""}
                            </div>		  
                        
                            <button className="btn btn-primary btn-block mt-5" onClick={(e) => this.handleSubmit(e)}>Forgot Password</button>
                            <div className="mt-4">
                                <Link to="/"><small>Back to Login page</small></Link>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <Footer />
            </div>    	
        );
    }
}

function mapStateToProps(state) {
    const { msg } = state.rootReducer.authentication;
    // const { user } = state.rootReducer.authentication;
    const { error,resetForm } = state.rootReducer.authentication;
    // console.log(loggingIn);
    // console.log(user);
    return {
        msg,
        error,
        resetForm
    };
}

export default connect(mapStateToProps)(ForgotPassword);