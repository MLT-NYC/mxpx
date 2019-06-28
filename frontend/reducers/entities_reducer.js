import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import picturesReducer from './pictures_reducer';
import commentsReducer from './comments_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    pictures: picturesReducer,
    comments: commentsReducer
});

export default entitiesReducer;