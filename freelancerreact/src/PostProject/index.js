import React from 'react';
import { connect } from 'react-redux';

class PostProject extends React.Component {
   /* constructor(props) {
        super(props);


};*/


    render() {
        const {user}=this.props;

        return (
            <div>
                <p>hi - {user.username} Post Project Page!</p>
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

const connectedPostProject= connect(mapStateToProps)(PostProject);
export { connectedPostProject as PostProject };