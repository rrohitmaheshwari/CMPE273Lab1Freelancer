import React from 'react';
import { connect } from 'react-redux';

class MyProfile extends React.Component {
    /*constructor(props) {
        super(props);


};*/

    componentWillMount(){
        const {dispatch} = this.props;
        dispatch({type: "MY_PROFILE"});

    }
    render() {
        const {user}=this.props;

        return (
            <div>
                <p>hi - {user.username} my Profile Page!</p>
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

const connectedMyProfile = connect(mapStateToProps)(MyProfile);
export { connectedMyProfile as MyProfile };