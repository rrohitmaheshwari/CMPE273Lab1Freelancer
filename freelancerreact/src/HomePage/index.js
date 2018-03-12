import React from 'react';
import {connect} from 'react-redux';
import Banner from '../Images/Banner.png';
import Icon from '../Images/Freelancer Icon Short.png';


class HomePage extends React.Component {


    render() {
        const {user} = this.props;
        console.log("User Details from Store-->");
        console.log(user);
        const {homecontent} = this.props;


        if(homecontent && homecontent.payload) {
            console.log("homecontent from store-->");
            console.log(homecontent);
            console.log(homecontent.payload);
            console.log(homecontent.payload.result);

        }
        return (
            <div>




                <div className="jumbotron">

                    <div>
                        <div className="col-sm-7 col-sm-offset-1">
                            <div className="col-md-12 col-md-offset-0">
                                <div className="panel panel-primary" id="shadowpanel">
                                    <img className="Banner" src={Banner} alt="BannerImage"/>
                                </div>

                                <div>

                                    <div className="panel panel-primary" id="shadowpanel">
                                        <div className="ProjectFeedTitle">

                                            <h5><b>Project feed</b></h5>

                                        </div>


                                        {homecontent.payload &&
                                        homecontent.payload.result.map((data) =>


                                                <div className="ProjectFeed" key={data.project_id}>

                                                    <div className="col-sm-1 col-sm-offset-0">

                                                        <img className="FreeLancerIcon" src={Icon} alt="FreelancerIcon"/>

                                                    </div>
                                                    <div className="col-sm-11 col-sm-offset-0">

                                                        {data.title},
                                                        {data.description},
                                                        SkillsRequired,
                                                        Employer,
                                                        Budget Range,
                                                        Number of Bid yet,
                                                        Bid Now

                                                    </div>

                                                </div>

                                        )
                                        }




                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3 col-sm-offset-0">
                            <div className="col-md-12 col-md-offset-0">
                                <div className="panel panel-primary" id="shadowpanelUser">

                                    <div className="col-sm-5 col-sm-offset-0">
                                        <div className="col-md-12 col-md-offset-0">
                                            <img className="FreeLancerIcon" src={Icon} alt="UserProfileImage"/>
                                        </div>
                                    </div>


                                    <div className="col-sm-7 col-sm-offset-0">
                                        <div className="col-md-11 col-md-offset-0">
                                            <h5><b>Welcome back,</b></h5>
                                            <h4><b>{user.username}</b></h4>
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
    const {homecontent} = state;
    return {
        user,
        homecontent
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};