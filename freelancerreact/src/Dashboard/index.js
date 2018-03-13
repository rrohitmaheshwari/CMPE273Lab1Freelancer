import React from 'react';
import { connect } from 'react-redux';

class DashboardPage extends React.Component {

   /* constructor(props) {
        super(props);


    };
*/
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch({type: "DASHBOARD"});

    }

    render() {

      //  const {user}=this.props;
        return (
            <div>


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