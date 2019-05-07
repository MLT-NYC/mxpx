import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as SessionAPIActions from './actions/session_actions';
import * as PicturesAPIActions from './actions/pictures_actions';
import * as FollowsAPIActions from './actions/follows_actions';
import * as FollowsUtils from './util/follows_api_util';

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

    // SESSION ACTION CREATORS
    // window.signUp = SessionAPIActions.signUp;
    // window.logIn = SessionAPIActions.logIn;
    // window.logOut = SessionAPIActions.logOut;

    // PICTURES ACTION CREATORS
    // window.fetchPictures = PicturesAPIActions.fetchPictures;
    // window.fetchPicture = PicturesAPIActions.fetchPicture;
    // window.createPicture = PicturesAPIActions.createPicture;
    // window.updatePicture = PicturesAPIActions.updatePicture;
    // window.deletePicture = PicturesAPIActions.deletePicture;

    // FOLLOWS ACTION CREATORS
    window.createFollow = FollowsUtils.createFollow;
    window.deleteFollow = FollowsAPIActions.deleteFollow;
    
    // FOLLOWS UTILS
    // window.createFollow = FollowsUtils.createFollow;
    // window.deleteFollow = FollowsUtils.deleteFollow;

    // STATE
    // window.store = store;
    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
    
    // TESTING END//

    ReactDOM.render(<Root store={store}/>, root)
});