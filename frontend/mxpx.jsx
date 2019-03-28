import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as SessionApiUtils from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    let root = document.getElementById('root');
    
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { currentUserId: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

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

    ReactDOM.render(<Root store={store}/>, root)
});