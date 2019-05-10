import { 
    RECEIVE_CURRENT_USER
} from '../actions/session_actions';

import {
    RECEIVE_PICTURE,
    REMOVE_PICTURE
} from '../actions/pictures_actions';

import {
    RECEIVE_FOLLOW,
    REMOVE_FOLLOW
} from '../actions/follows_actions';

import merge from 'lodash/merge';

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState;
    let followeeIds;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState = merge({}, oldState, {[action.currentUser.id]: action.currentUser});
            
            return newState;
        case RECEIVE_PICTURE:
            newState = merge({}, oldState);

            let pictureIdsArr = newState[action.picture.photographer_id].pictureIds;
            if (pictureIdsArr) {
                if (!pictureIdsArr.includes(action.picture.id)) {
                    pictureIdsArr.push(action.picture.id);
                }
            } else {
                pictureIdsArr = [action.picture.id];
            }

            return newState;
        case REMOVE_PICTURE:
            newState = merge({}, oldState);

            let pictureIds = newState[action.picture.photographer_id].pictureIds;
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
        default:
            return oldState;
    }
};

export default usersReducer;