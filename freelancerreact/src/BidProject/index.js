import React from 'react';
import { connect } from 'react-redux';

class BidProject extends React.Component {
   /* constructor(props) {
        super(props);


};*/
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch({type: "UNSET"});

    }

    render() {
        const {user}=this.props;

        return (
            <div>



                <div className="jumbotron">


                        <div className="col-sm-8 col-sm-offset-2">
                            <div className="col-md-12 col-md-offset-0">
                                <span className="ProjectTitleBid"> Project Title </span>
                            </div>
                        </div>

                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="col-md-12 col-md-offset-0">

                            <div className="panel panel-primary" id="shadowpanel">
                                <div className="ProjectDetailHeader">

                                    <div className="col-sm-2 col-sm-offset-0" id="ProjectDetailBox">

                                        <span>Bids</span>
                                        <br/><span className="ProjectHeaderValue">2</span>

                                    </div>
                                    <div className="col-sm-2 col-sm-offset-0" id="ProjectDetailBox">


                                        <span>Avg Bid</span>
                                        <br/><span className="ProjectHeaderValue">250$</span>
                                    </div>
                                    <div className="col-sm-2 col-sm-offset-0" id="ProjectDetailBox">


                                        <span>Project Budget </span>
                                        <br/><span className="ProjectHeaderValue">230$-500$</span>
                                    </div>
                                    <div className="col-sm-5 col-sm-offset-0" id="ProjectDetailBoxEnd">
                                        <span>Expected</span>
                                        <br/><span className="ProjectHeaderValue">12/12/2012</span>

                                    </div>

                                </div>
                            </div>


                            <div className="panel panel-primary" id="shadowpanel">
                                <div className="ProjectDetails">

                                    <div className="col-sm-8 col-sm-offset-0" >

                                        <span className="ProjectTitleSubheading"> Project Description </span>
                                        <br/>
                                        <span>Project Description from database-Hi there, I need to build a cryptocurrency
                                            website like www.coinbase.com and a conversion algorihtm will be there.
                                            More details will be shared on chat.</span>
                                        <br/>
                                        <br/>
                                        <span className="ProjectTitleSubheading"> About the employer</span>
                                        <br/>
                                        <span>@Employer from DB</span>
                                        <br/>
                                        <br/>
                                        <span className="ProjectTitleSubheading"> Skills Required</span>
                                        <span>Skills Required from database-Graphic Design, HTML, Javascript, PHP, Website Design</span>


                                    </div>
                                    <div className="col-sm-4 col-sm-offset-0" >

                                        <button className="btn btn-primary" id="BidProjectButtonBig"  >Bid On This Project</button>
                                        <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/><br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                                        <span id="textrightshift100"><b>Project Id:</b></span>Project_ID
                                    </div>





                                </div>
                            </div>




                            <div className="panel panel-primary" id="shadowpanel">
                                <div className="BidDetails">
                                    All bids related to this Project
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
    const { user } = state.authentication;
    return {
        user
    };
}

const connectedBidProject= connect(mapStateToProps)(BidProject);
export { connectedBidProject as BidProject };