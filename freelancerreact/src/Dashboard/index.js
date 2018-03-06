import React from 'react';
import { connect } from 'react-redux';
import {userActions} from "../Actions";
import {history} from "../Helpers";
import fllogo from '../Images/Logo.png';
class DashboardPage extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log("calling gotolink");
        // dispatch(userActions.gotolink('dashboard'));


        history.push('/');

    }

    handleLogout(e) {
        e.preventDefault();


        console.log("Logging out...");
        const {dispatch}=this.props;
        dispatch(userActions.logout());
        history.push('/login');

    }
    render() {

        const {user}=this.props;
        return (
            <div>
                <nav className="navbar navbar-inverse">

                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"> </span>
                                <span className="icon-bar"> </span>
                                <span className="icon-bar"> </span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li className="image-li">  <img className="li-fl-logo " src={fllogo} alt="Freelancer" /></li>
                                <li><a onClick={this.handleSubmit}>Home</a></li>
                                <li className="active"><a>Dashboard</a></li>
                                <li><a>My Profile</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><button className="btn btn-primary" id="PostProjectButton">Post a Project</button></li>

                                <li><a onClick={this.handleLogout}><span className="glyphicon glyphicon-log-in"></span>Logout</a></li>
                            </ul>


                    </div>
                </nav>

            <p> Hi I am inside dashboard</p>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
}

const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export { connectedDashboardPage as DashboardPage };