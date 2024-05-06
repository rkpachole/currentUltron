import React, { Component } from "react";
import Signin from "../Signin";
import Footer from "../GlobalComponents/Footer";

export default class Index extends Component {
    constructor(){
        super();
        this.state = {
            stylePath:true
        };
    }
    componentDidMount(){
          
    }
    render() {
        return (
            <div>
                <Signin />
                <Footer />
            </div>	
        );
    }
}
