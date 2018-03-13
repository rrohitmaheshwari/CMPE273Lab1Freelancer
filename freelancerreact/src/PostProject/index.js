import React from 'react';
import { connect } from 'react-redux';

class PostProject extends React.Component {
   /* constructor(props) {
        super(props);


};*/

    componentWillMount(){
        const {dispatch} = this.props;
        dispatch({type: "POST_A_PROJECT"});

    }


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