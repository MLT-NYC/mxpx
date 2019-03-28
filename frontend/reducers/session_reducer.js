import { 
    RECEIVE_CURRENT_USER,
    LOG_OUT_CURRENT_USER,
} from '../actions/session_actions';

const sessionReducer = ( oldState = {currentUserId: null}, action ) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            return {currentUserId: action.currentUser.id};
        case LOG_OUT_CURRENT_USER:
            return { currentUserId: null };
        default:
            return oldState;
    }
};

export default sessionReducer;