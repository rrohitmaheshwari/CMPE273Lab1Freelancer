import {combineReducers} from 'redux';
import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {alert} from './alert.reducer';
import {navbar} from './navbar';


const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    navbar

});

export default rootReducer;