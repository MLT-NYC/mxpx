import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import * as SessionApiUtils from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
    let root = document.getElementById('root');
    let store = configureStore();

    // TESTING START //

    // action creators
    window.signUp = SessionApiUtils.signUp;
    window.logIn = SessionApiUtils.logIn;
    window.logOut = SessionApiUtils.logOut;

    // state
    window.store = store;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // TESTING END//

    ReactDOM.render(<h1>mxpx.nyc</h1>, root)
});