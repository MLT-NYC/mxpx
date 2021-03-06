import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as SessionAPIActions from './actions/session_actions';
import * as PicturesAPIActions from './actions/pictures_actions';
import * as FollowsAPIActions from './actions/follows_actions';
import * as CommentAPIActions from './actions/comment_actions';
import * as LikesAPIActions from './actions/likes_actions';
import * as CommentUtils from './util/comments_api_util';
import * as FollowsUtils from './util/follows_api_util';
import * as LikesUtils from './util/likes_api_util';
import * as SessionUtils from './util/session_api_util';

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
    // window.updateUser = SessionAPIActions.updateUser;
    // window.fetchUsers = SessionAPIActions.fetchUsers;

    // PICTURES ACTION CREATORS
    // window.fetchPictures = PicturesAPIActions.fetchPictures;
    // window.fetchPicture = PicturesAPIActions.fetchPicture;
    // window.createPicture = PicturesAPIActions.createPicture;
    // window.updatePicture = PicturesAPIActions.updatePicture;
    // window.deletePicture = PicturesAPIActions.deletePicture;

    // FOLLOWS ACTION CREATORS
    // window.createFollow = FollowsAPIActions.createFollow;
    // window.deleteFollow = FollowsAPIActions.deleteFollow;

    // COMMENTS ACTION CREATORS
    // window.fetchPictureComments = CommentAPIActions.fetchPictureComments;
    // window.createPictureComment = CommentAPIActions.createPictureComment;
    // window.deletePictureComment = CommentAPIActions.deletePictureComment;
    // window.fetchSubComments = CommentAPIActions.fetchSubComments;
    // window.createSubComment = CommentAPIActions.createSubComment;
    // window.deleteSubComment = CommentAPIActions.deleteSubComment;

    // LIKES ACTION CREATORS
    // window.likePicture = LikesAPIActions.likePicture;
    // window.unlikePicture = LikesAPIActions.unlikePicture;

    // SESSION UTILS
    // window.fetchUsers = SessionUtils.fetchUsers;

    // COMMENT UTILS
    // window.fetchPictureComments = CommentUtils.fetchPictureComments;
    // window.createPictureComment = CommentUtils.createPictureComment;
    // window.deletePictureComment = CommentUtils.deletePictureComment;
    // window.fetchSubComments = CommentUtils.fetchSubComments;
    // window.createSubComment = CommentUtils.createSubComment;
    // window.deleteSubComment = CommentUtils.deleteSubComment;
    
    // FOLLOWS UTILS
    // window.createFollow = FollowsUtils.createFollow;
    // window.deleteFollow = FollowsUtils.deleteFollow;

    // LIKES UTILS
    // window.likePicture = LikesUtils.likePicture;
    // window.unlikePicture = LikesUtils.unlikePicture;

    // STATE
    // window.store = store;
    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
    
    // TESTING END//

    ReactDOM.render(<Root store={store}/>, root)
});