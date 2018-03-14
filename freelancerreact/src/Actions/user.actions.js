import { userConstants } from '../Constants';
import { RESTService } from '../API';
import { alertActions } from './';
import { history } from '../Helpers';
import {HomePage} from "../HomePage";

export const userActions = {

    login,
    logout,
    register,
    getAll,
    delete: _delete,
    fetchHomeProject,
};



function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        RESTService.login(username, password)
            .then(
                user => {
                    console.log("user");
                    console.log(user);
                    dispatch(success(user));
                    dispatch({type: "HOME"});
                    history.push('/HomePage');  //home page after login
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: "USERS_LOGIN_REQUEST", user } }
    function success(user) { return { type: "USERS_LOGIN_SUCCESS", user } }
    function failure(error) { return { type: "USERS_LOGIN_FAILURE", error } }


}

function logout() {



    RESTService.logout();
    return { type: "USERS_LOGOUT" };
}

function register(user) {
    return (dispatch) => {
       // dispatch(request(user));

        RESTService.register(user)
            .then(
                user => { 
                    //dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));

                }
            );
    };

  //  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
   // function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function fetchHomeProject(user) {


    return dispatch => { RESTService.fetchHomeProject(user)
        .then(
            result => {
                console.log("user result");
                console.log(result);
                console.log("user result.result");
                console.log(result.result);
                dispatch({type:'SET_DATA',result});
                return result;
            },
            error => {
                console.log("Error/fetchHomeProject:");
                console.log(error);

                localStorage.removeItem('user');
                dispatch( { type: "USERS_LOGOUT" });
                dispatch( { type: "UNSET" });
                RESTService.logout();
               history.push('/Login');  //home page after session expire
                return error;
            }
        );};


}


function getAll() {
    return dispatch => {
        dispatch(request());

        RESTService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        RESTService.delete(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

