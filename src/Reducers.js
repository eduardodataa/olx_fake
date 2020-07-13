import { combineReducers } from 'redux';
import useReducer  from './reducers/useReducer';


export default combineReducers({
    user:useReducer
});