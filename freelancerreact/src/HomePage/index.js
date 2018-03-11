import React from 'react';
import {connect} from 'react-redux';
import Banner from '../Images/Banner.png';
import Icon from '../Images/Freelancer Icon Short.png';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        //   var Results = dispatch(userActions.fetchHomeProject(user));
    };


    render() {
        const {user} = this.props;
        console.log("User Details from Store-->");
        console.log(user);
        return (
            <div>
                <div className="jumbotron">

                    <div>
                        <div className="col-sm-7 col-sm-offset-1">
                            <div className="col-md-12 col-md-offset-0">
                                <div className="panel panel-primary" id="shadowpanel">
                                    <img className="Banner" src={Banner}/>
                                </div>

                                <div>

                                            <div className="panel panel-primary" id="shadowpanel">
                                                <div className="ProjectFeedTitle">

                                                    <h4><b>Project feed</b></h4>

                                                </div>

                                                <div className="ProjectFeed">

                                                    <div className="col-sm-1 col-sm-offset-0">

                                                        <img className="FreeLancerIcon" src={Icon}/>

                                                    </div>
                                                    <div className="col-sm-11 col-sm-offset-0">

                                                        ProjectName,
                                                        Description,
                                                        SkillsRequired,
                                                        Employer,
                                                        Budget Range,
                                                        Number of Bid yet,
                                                        Bid Now

                                                    </div>

                                                </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3 col-sm-offset-0">
                            <div className="col-md-12 col-md-offset-0">
                                <div className="panel panel-primary" id="shadowpanelUser">

                                    <div className="col-sm-5 col-sm-offset-0">
                                        <div className="col-md-12 col-md-offset-0">
                                            <img className="FreeLancerIcon" src={Icon}/>
                                        </div>
                                    </div>


                                    <div className="col-sm-7 col-sm-offset-0">
                                        <div className="col-md-11 col-md-offset-0">
                                            <h4><b>Welcome back,</b></h4>
                                            <h3><b>{user.username}</b></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        )
    }
}


function mapStateToProps(state) {
    const {user} = state.authentication;

    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};