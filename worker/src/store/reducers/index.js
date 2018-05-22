import { combineReducers } from 'redux';
import User from './user.js';
import Workorderlist from './workorderlist';
import Itemworkorder from './itemworkorder';
let reducers = combineReducers({
    User,
    Workorderlist,
    Itemworkorder
})
export default reducers