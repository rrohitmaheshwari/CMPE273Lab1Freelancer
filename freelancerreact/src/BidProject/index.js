import React from 'react';
import { connect } from 'react-redux';
import {history} from "../Helpers";

class BidProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bid_button: false,
        };

};


    componentWillMount(){
        const {dispatch} = this.props;
        dispatch({type: "UNSET"});

    }


    handleBidProject(e) {
        e.preventDefault();

        this.setState({
            bid_button: !this.state.bid_button,
    });

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




                            { this.state.bid_button &&
                            <div className="panel panel-primary" id="shadowpanel">
                                <div className="BidDetails">


                                    <div className="col-sm-10 col-sm-offset-0" >



                                        <span className="ProjectTitleSubheading">  Bid Proposal </span>
                                        <br/>
                                        <br/>

                                        <div className="col-sm-12 col-sm-offset-0">
                                            <div className="col-md-4 col-md-offset-0">
                                                <b>Bid Price</b>
                                                <br/>


                                                <span className="input-group">
                                            <span className="add-on">$</span>
                                            <input className="BidProposal-form-input" name="sum" type="text"/>
                                            <span className="add-on">USD</span>
                                        </span>
                                            <br/>
                                            </div>

                                            <div className="col-md-4 col-md-offset-0">
                                                <b>Bid Days</b>

                                                <br/>


                                                <span className="input-group">
                                            <span className="add-on">$</span>
                                            <input className="BidProposal-form-input" name="sum" type="text"/>
                                            <span className="add-on">Days</span>
                                        </span>
                                                <br/>
                                            </div>
                                        </div>

                                        <br/>


                                        <br/>
                                        <br/>

                                        <div className="col-sm-7 col-sm-offset-0">
                                            <div className="col-md-5 col-md-offset-0">
                                                <span><em>Project Fee   </em></span>
                                            </div>
                                            <div className="col-md-7 col-md-offset-0">
                                                <b>$2.44 USD / Hr</b>
                                            </div>
                                        </div>


                                        <br/>
                                        <div className="col-sm-7 col-sm-offset-0">


                                            <div className="col-md-5 col-md-offset-0">
                                                <span><em>Your Total Bid   </em></span>
                                            </div>
                                            <div className="col-md-7 col-md-offset-0">
                                                <b>$24.44 USD / Hr</b>
                                            </div>

                                            </div>

                                        <br/>
                                            <div className="col-sm-7 col-sm-offset-0">


                                            <div className="col-md-5 col-md-offset-0">
                                                <span><em>Weekly Milestone    </em></span>
                                            </div>
                                            <div className="col-md-7 col-md-offset-0">
                                                <b>$1050 USD</b>
                                            </div>
                                        </div>




                                        <br/>
                                        <br/>
                                        <br/>

                                        <button className="btn btn-primary" id="BidProjectButtonProjectDetails">Place Bid</button>
                                        <a onClick={this.handleBidProject.bind(this)}>Cancel</a>

                                    </div>






                                </div>
                            </div>
                            }


                            <div className="panel panel-primary" id="shadowpanel">
                                <div className="ProjectDetails">

                                    <div className="col-sm-8 col-sm-offset-0" >

                                        <span className="ProjectTitleSubheading"> Project Description </span>
                                        <br/>
                                        <span>Project Description from database-Hi there, I need to build a crypto-currency
                                            website like www.coinbase.com and a conversion algorithm will be there.
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

                                        <button className="btn btn-primary" id="BidProjectButtonBig"  onClick={this.handleBidProject.bind(this)}>Bid On This Project</button>
                                        <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/><br/> <br/> <br/> <br/> <br/> <br/> <br/>
                                        <span id="textrightshift100"><b>Project Id:</b></span>Project_ID
                                    </div>

                                </div>
                            </div>




                            <div className="panel panel-primary" id="shadowpanel">
                                <div className="BidDetailsTable">
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