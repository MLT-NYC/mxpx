import * as SessionApiUtils from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOG_OUT_CURRENT_USER = 'LOG_OUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser
});

const logOutCurrentUser = () => ({
    type: LOG_OUT_CURRENT_USER
});

const receiveSessionErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
});

export const signUp = (user) => dispatch => {
    return SessionApiUtils.signUp(user)
        .then(currentUser => dispatch(receiveCurrentUser(currentUser)), 
            errors => dispatch(receiveSessionErrors(errors)));
};

export const logIn = (user) => dispatch => {
    return SessionApiUtils.logIn(user)
        .then(currentUser => dispatch(receiveCurrentUser(currentUser)),
            errors => dispatch(receiveSessionErrors(errors)));
};

export const logOut = () => dispatch => {
    return SessionApiUtils.logOut()
        .then(() => dispatch(logOutCurrentUser()));
};