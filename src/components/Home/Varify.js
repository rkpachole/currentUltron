import React, { Component } from "react";
import logo from "../../assets/images/logo.jpg";
import { connect } from "react-redux";
import { APIURL } from "../../constants/config";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Verify extends Component {
    constructor(props) {
        super(props);
        // reset login status
        this.state = {
            username: "",
            password: "",
            submitted: false,
            activationMessage:"",
            redirect:false
        };

    }

    
   
    ActivationMsg = () => {
        const params = this.props.match.params;
        // console.log(params.id)
        if(params.token){
           
            axios
                .get(APIURL + "user/verify/"+params.id+"/"+ params.token)
                .then((response) => {
              
                    this.setState({
                        activationMessage:response.data.message
                    });
                    setTimeout(() => this.setState({ activationMessage: false,redirect:true }), 4000);
               
                });
           
           
        }
    };
    componentDidMount(){
        this.ActivationMsg();  
    }

    render() {
        if(this.state.redirect)
        {
            return <Redirect to="/" />;
        }
      
        // const { message } = this.props;
        // console.log(message);
        return (
            <div className="fw">
                <div className="fw__right">
                    <div className="text-center">
                        <img src={logo} width="250" alt="Logo"/>
                       
                        {this.state.activationMessage && 
                            <React.Fragment>
                                <h4 className="mt-5">Account Verify</h4>
                                <div className="alert alert-success" role="alert">
                                    {this.state.activationMessage}
                                </div> 
                            </React.Fragment>
                        } 
                    </div>
                    
                </div>
            </div>  
        );
    }
}

function mapStateToProps(state) {
    
    const { error } = state.rootReducer.authentication;
    return {
        error
    };
}

export default connect(mapStateToProps)(Verify);