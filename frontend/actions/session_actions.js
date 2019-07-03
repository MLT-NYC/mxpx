import * as SessionApiUtils from '../util/session_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOG_OUT_CURRENT_USER = 'LOG_OUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users: users
});

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

export const fetchUsers = userIds => dispatch => {
    return SessionApiUtils.fetchUsers(userIds)
        .then(users => dispatch(receiveUsers(users)));
};

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS,
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

export const updateUser = (user) => dispatch => {
    return SessionApiUtils.updateUser(user)
        .then(currentUser => dispatch(receiveCurrentUser(currentUser)),
            errors => dispatch(receiveSessionErrors(errors)));
};