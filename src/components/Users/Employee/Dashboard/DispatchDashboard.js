import React, { Component } from "react";
//import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "../../../GlobalComponents/Footer";
import Navbar from "../Navbar";
import DashboardSidebar from "./DashboardSidebar";

export default class DispatchDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };

    //     this.handleUsernameChange = this.handleUsernameChange.bind(this);
    //     this.handlePasswordChange = this.handlePasswordChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // handleSubmit(e) {
    //     console.log("dsads");
    //     e.preventDefault();
    //     this.setState({ submitted: true });
    //     const { username, password } = this.state;
    //     const { dispatch } = this.props;
    //     console.log(username,password);
        
    //     //if (username && password) {
    //     dispatch(authActions.login(username, password));
    //     //}
    // }

    // handleUsernameChange(e) {
    //     this.setState({ username: e.target.value });
    // }

    // handlePasswordChange(e) {
    //     this.setState({ password: e.target.value });
    // }

    // componentDidMount(){
          
    // }

    render() {
        if (!this.state.user) {
            return <Redirect to="/" />;
        }

        if(this.state.user.data.user_role !== "Admin") {
            return <Redirect to="/" />;
        }

        //const { loggingIn } = this.props;
        //const { username, password} = this.state;
        return (
            <div>
                <Navbar activePage="dashboard"/>
                <main className="offset">
                    <div className="container-fluid">
                        <div className="row pt-4">
                            <div className="col-lg-2 side-filters">     
                                <span className="side-heading">Dashboard</span>
                                <DashboardSidebar  />
                                
                            </div>
                           
                            <div className="col-lg-10" style={{"display":"none"}}>
                                <div className="ground">
                                    <div className="row">
                                        <div className="col-lg-4"> 
                                            <div className="btn-group" role="group" aria-label="Basic example">          		  
                                                <button type="button" className="btn btn-secondary active">Today</button>
                                                <button type="button" className="btn btn-secondary">Tomorrow</button>	
                                            </div>  
                                        </div>
                                        <div className="col-lg-4">
                                            <form className="form-search">
                                                <input className="form-control mr-sm-2" type="search" placeholder="Search.." aria-label="Search" />
                                            </form>
                                        </div>

                                    

                                        <div className="col-lg-4 text-right">
                                            <button type="button" className="btn btn-default"> Print </button>
                                        </div>
                                    </div>
                                    <div className="table-scroll mt-4">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{minWidth:"150px"}}>Booking #</th>
                                                    <th scope="col" style={{minWidth:"200px"}}>Hospital Name</th>
                                                    <th scope="col">Kit</th>
                                                    <th scope="col" className="text-right"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><strong><a href="dispatch.php">B001</a></strong></td>
                                                    <td> Spire Gatwick Park</td>
                                                    <td> RTS MTP implant </td>              
                                                    <td className="text-right"><span className="capsule green-dim">Dispatched</span></td>              
                                                </tr>
                                                <tr>
                                                    <td><strong><a href="dispatch.php">B002</a></strong></td>
                                                    <td>Bupa Cromwell</td>
                                                    <td> Laser Toe </td>              
                                                    <td className="text-right">
                                                        <a href="" data-toggle="modal" data-target="#addDispatch" className="btn btn-primary">Dispatch</a>
                                                    </td>              
                                                </tr>
                                                <tr>
                                                    <td><strong><a href="dispatch.php">B003</a></strong></td>
                                                    <td>Spire Gatwick Park</td>
                                                    <td> RTS MTP implant </td> 
                                                    <td className="text-right">
                                                        <a href="" data-toggle="modal" data-target="#addDispatch" className="btn btn-primary">Dispatch</a>
                                                    </td>      
                                                </tr>
                                                <tr>
                                                    <td><strong><a href="dispatch.php">B004</a></strong></td>
                                                    <td>Bupa Cromwell</td>
                                                    <td> Laser Toe </td>              
                                                    <td className="text-right"><span className="capsule green-dim">Dispatched</span></td>            
                                                </tr>
                                                <tr>
                                                    <td><strong><a href="dispatch.php">B005</a></strong></td>
                                                    <td>Spire Gatwick Park</td>
                                                    <td> RTS MTP implant </td>              
                                                    <td className="text-right"><span className="capsule green-dim">Dispatched</span></td>              
                                                </tr>
                                                <tr>
                                                    <td><strong><a href="dispatch.php">B006</a></strong></td>
                                                    <td>Bupa Cromwell</td>
                                                    <td> Laser Toe </td>              
                                                    <td className="text-right">
                                                        <a href="" data-toggle="modal" data-target="#addDispatch" className="btn btn-primary">Dispatch</a>
                                                    </td>              
                                                </tr> 
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>{/*<!--/row-->*/}
                    </div>
                </main>

                {/* <!-- Add Dispatch --> */}
                {/* <div class="modal fade" id="addDispatch" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="">Add Dispatch</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form class="">
                        <div class="form-group">
                            <label>Courier</label>
                            <input type="" class="form-control" name="">
                        </div>
                        <div class="form-group">
                            <label>Tracker</label>
                            <select class="chosen-select">
                            <option>Select Role</option>
                            <option>A</option>
                            <option>B</option>                             
                            </select>                
                        </div>
                        <label>Number of Boxes</label>
                        <div class="form-group row">
                            <div class="col">              
                            <input type="" class="form-control" placeholder="Box Type" name="">
                            </div>
                            <div class="col">              
                            <input type="" class="form-control" name="" placeholder="Number of Boxes">
                            </div>
                        </div>
                        <a href="" class="sml-btn"><i class="fa fa-plus"></i> Add More</a>             
                        

                        </form>
                    </div>
                    <div class="modal-footer">
                        <a href="" class="btn btn-secondary" data-dismiss="modal">Cancel</a>
                        <a href="" class="btn btn-primary">Submit</a>
                    </div>
                    
                    </div>
                </div>
                </div> */}
                <Footer />
            </div>
        );
    }
}

//export default connect()(Dashboard);