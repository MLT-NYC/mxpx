import { combineReducers } from 'redux';
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
    currentUsers: usersReducer
});

export default entitiesReducer;