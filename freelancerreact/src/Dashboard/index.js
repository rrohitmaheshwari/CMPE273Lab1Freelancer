import React from 'react';
import {connect} from 'react-redux';
import Icon from '../Images/Freelancer Icon Short.png';
import {history} from "../Helpers";
import {RESTService} from "../API";

class DashboardPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            my_project_details: [],
            my_project_details_status: false,
        }


    };


    componentWillMount() {
        const {dispatch} = this.props;
        dispatch({type: "DASHBOARD"});
        const {user} = this.props;

        RESTService.getMyProjectDetails(user.username)
            .then(
                response => {
                    if (response.result.length > 0)
                        this.setState({my_project_details_status: true});
                    this.setState({"my_project_details": response.result});
                    console.log("this.state.my_project_details");
                    console.log(this.state.my_project_details);
                },
                error => {
                    console.log("Error/fetchHomeProject:");
                    console.log(error);
                    localStorage.removeItem('user');
                    dispatch({type: "USERS_LOGOUT"});
                    RESTService.logout();
                    history.push('/Login');  //home page after session expire

                }
            );

    }

    handleSubmitPost(push_page, e) {
        e.preventDefault();
        console.log(e.target.value);
        var project_id = e.target.value;
        const {dispatch} = this.props;
        dispatch({type: "UNSET"});
        history.push(push_page + "?project_id=" + project_id);
    }

    render() {


        return (
            <div>


                <div className="jumbotron">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="col-md-12 col-md-offset-0">
                            <span className="ProjectTitleBid"> My Projects</span>
                        </div>
                    </div>

                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="col-md-12 col-md-offset-0">


                            <div className="panel panel-primary" id="shadowpanel">
                                <div className="BidDetailsTable">


                                    {!this.state.my_project_details_status &&
                                    <div className="noProject">
                                        <div className="col-sm-8 col-sm-offset-0">
                                            <div className="col-md-12 col-md-offset-0">
                                                <span
                                                    className="labelnoproject"> You haven't posted any project yet!</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 col-sm-offset-1">
                                            <div className="col-md-12 col-md-offset-0">
                                                <button className="btn btn-primary" id="PostProjectButton"
                                                        onClick={this.handleSubmitPost.bind(this, "/PostProject", "POST_A_PROJECT")}>
                                                    Post a Project
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    }


                                    {this.state.my_project_details_status &&

                                    <table className="m-table">
                                        <thead>
                                        <tr>
                                            <th>Project Title</th>
                                            <th>Avg Bid</th>
                                            <th>Deadline</th>
                                            <th>Status</th>
                                            <th>Freelancer</th>
                                        </tr>
                                        </thead>
                                        <tbody>


                                        {this.state.my_project_details.map((data) =>
                                            <tr key={data.project_id}>
                                                <td><img className="FreeLancerIconDashboard" src={Icon} alt="FreelancerIcon"/>
                                                    {data.title}</td>
                                                <td>{data.avg_bid}</td>
                                                <td>{data.complete_by_shortdate}</td>
                                                <td>{data.status}</td>
                                                <td>{data.freelancer_username && `@${data.freelancer_username}`}
                                                    {!data.freelancer_username &&
                                                    <button className="btn btn-primary" id="BidProjectButton"
                                                            value={data.project_id}
                                                            onClick={this.handleSubmitPost.bind(this, "/HireProject")}>
                                                        Hire
                                                    </button>
                                                    }</td>
                                            </tr>
                                        )
                                        }

                                        </tbody>
                                    </table>
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {user} = state.authentication;
    return {
        user
    };
}

const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export {connectedDashboardPage as DashboardPage};