import { 
    RECEIVE_CURRENT_USER
} from '../actions/session_actions';

import {
    RECEIVE_PICTURE,
    REMOVE_PICTURE,
    RECEIVE_ALL_PICTURES
} from '../actions/pictures_actions';

import {
    RECEIVE_FOLLOW,
    REMOVE_FOLLOW
} from '../actions/follows_actions';

import {
    RECEIVE_LIKE,
    REMOVE_LIKE
} from '../actions/likes_actions';

import merge from 'lodash/merge';

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState;
    let followeeIds;
    let pictureIds = [];
    let likedPictureIds = [];
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState = merge({}, oldState, {[action.currentUser.id]: action.currentUser});
            return newState;
        case RECEIVE_ALL_PICTURES:
            newState = merge({}, oldState);
    
            action.pictures.forEach((picture) => {
                if (picture.profile) {
                    newState[picture.photographer_id].profile_picture_id = picture.id;
                }
                
                if (picture.cover) {
                    newState[picture.photographer_id].cover_picture_id = picture.id;
                }
                
                if (picture.showcase) {
                    pictureIds.push(picture.id);
                }

                newState[picture.photographer_id].pictureIds = pictureIds;
            });

            return newState;
        case RECEIVE_PICTURE:
            newState = merge({}, oldState);

            if (action.picture.profile) {
                newState[action.picture.photographer_id].profile_picture_id = action.picture.id;
            }

            if (action.picture.cover) {
                newState[action.picture.photographer_id].cover_picture_id = action.picture.id;
            }

            pictureIds = newState[action.picture.photographer_id].pictureIds;
            if (pictureIds) {
                if (!pictureIds.includes(action.picture.id) && action.picture.showcase) {
                    pictureIds.push(action.picture.id);
                }
            } else {
                if (action.picture.showcase) {
                    pictureIds = [action.picture.id];
                }
            }

            return newState;
        case REMOVE_PICTURE:
            newState = merge({}, oldState);
            pictureIds = newState[action.picture.photographer_id].pictureIds;
            let newPictureIds = pictureIds.filter(pictureId => pictureId != action.picture.id);
            newState[action.picture.photographer_id].pictureIds = newPictureIds;
            return newState;
        case RECEIVE_FOLLOW:
            newState = merge({}, oldState);

            followeeIds = newState[action.follow.follower_id].followeeIds;
            if (followeeIds) {
                if (!followeeIds.includes(action.follow.followee_id)) {
                    followeeIds.push(action.follow.followee_id);
                }
            } else {
                followeeIds = [action.follow.followee_id];
            }

            return newState;
        case REMOVE_FOLLOW:
            newState = merge({}, oldState);
            followeeIds = newState[action.follow.follower_id].followeeIds;
            let updatedFolloweeIds = followeeIds.filter(followeeId => followeeId != action.follow.followee_id);
            newState[action.follow.follower_id].followeeIds = updatedFolloweeIds;
            return newState;
        case RECEIVE_LIKE:
            newState = merge({}, oldState);
            
            if (newState[action.like.liker_id]) {
                likedPictureIds = newState[action.like.liker_id].likedPictureIds;
            }

            if (!likedPictureIds.includes(action.like.picture_id)) {
                likedPictureIds.push(action.like.picture_id);
            }

            return newState;
        case REMOVE_LIKE:
            newState = merge({}, oldState);

            if (newState[action.like.liker_id]) {
                likedPictureIds = newState[action.like.liker_id].likedPictureIds;
                let updatedLikedPictureIds = likedPictureIds.filter(likedPictureId => likedPictureId != action.like.picture_id);
                newState[action.like.liker_id].likedPictureIds = updatedLikedPictureIds;
            }
            
            return newState;
        default:
            return oldState;
    }
};

export default usersReducer;