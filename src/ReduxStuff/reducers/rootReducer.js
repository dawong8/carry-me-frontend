import {combineReducers} from 'redux';
import authReducer from './authReducer';
import getReducer from './getReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    get: getReducer,
});

export default rootReducer;