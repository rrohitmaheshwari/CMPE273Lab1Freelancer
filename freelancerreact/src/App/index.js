import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../Helpers';
import {alertActions} from '../Actions';

import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { DashboardPage } from "../Dashboard";


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
           // dispatch({ type: userConstants.LOGOUT },{});

        });
    }

    render() {
        const { alert,user } = this.props;

       console.log("####user from App:"+user);
       // console.log("####user.tostring from App:"+user.toString());
        return (

<div>

                        {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                {!user ? <Route exact path="/" component={LoginPage}/> : <Route exact path="/" component={HomePage}/>}
                                {!user ? <Route exact path="/login" component={LoginPage}/> : <Route exact path="/login" component={HomePage}/>}
                                {!user ? <Route exact path="/register" component={RegisterPage}/> : <Route exact path="/register" component={HomePage}/>}
                                {!user ? <Route exact path="/dashboard" component={LoginPage}/> : <Route exact path="/dashboard" component={DashboardPage}/>}

                            </div>
                        </Router>


            </div>

        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;    //try alert?
    const { user } = state.authentication;
    return {
        alert,
        user
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };


