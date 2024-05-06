import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();
let separator="-";
const todayDate =`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;

class DashboardSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestCount: this.props.requestCount,
            dispatchCount: this.props.dispatchCount,
            returnCount: this.props.returnCount,
            collectionCount: this.props.collectionCount,
            today:todayDate
        };
    }
  

    componentDidMount(){

      
          
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
       
        console.log(nextProps);
        

        
    }

    render() {
      
        //const { username, password} = this.state;
        const { activePage } = this.props;
        return (
            <div>
                <div className="list-group mt-4 pr-4">
                    {/*<Link to="/admin/dashboard/" className="list-group-item d-flex justify-content-between align-items-center active">
                        Dispatch
                        <span className="badge badge-primary badge-pill">14</span>        
                    </Link>
                    <a href="dashboard-return.php" className="list-group-item d-flex justify-content-between align-items-center">
                    Returns
                        <span className="badge badge-primary badge-pill">2</span>
                    </a>
                    <a href="dashboard-collections.php" className="list-group-item d-flex justify-content-between align-items-center">
                    Collections
                        <span className="badge badge-primary badge-pill">2</span>
                    </a> */}
                    <Link to="/admin/dashboard/booking-dispatch" className={"list-group-item d-flex justify-content-between align-items-center "+(activePage=="dispatch"?"active ":"") }>
                    Dispatch  
                        <span className="badge badge-primary badge-pill">
                            
                        </span>
                    </Link>

                    <Link to="/admin/dashboard/booking-returns" className={"list-group-item d-flex justify-content-between align-items-center "+(activePage=="return"?"active ":"") }>
                    Returns
                        <span className="badge badge-primary badge-pill">
                            
                        </span>
                    </Link>
                    <Link to="/admin/dashboard/booking-collections" className={"list-group-item d-flex justify-content-between align-items-center "+(activePage=="collection"?"active ":"") }>
                    Collections
                        <span className="badge badge-primary badge-pill">
                           
                        </span>
                    </Link>

                    
                    <Link to="/admin/dashboard/booking-request" className={"list-group-item d-flex justify-content-between align-items-center "+(activePage=="request"?"active ":"") }>
                    Booking Requests
                        <span className="badge badge-primary badge-pill">
                           
                        </span>
                    </Link>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log(state);
    return {};
}

export default connect(mapStateToProps)(DashboardSidebar);