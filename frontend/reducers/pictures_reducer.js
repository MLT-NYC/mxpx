import {
    RECEIVE_ALL_PICTURES,
    RECEIVE_PICTURE,
    REMOVE_PICTURE
} from '../actions/pictures_actions';

import {
    RECEIVE_PICTURE_COMMENT,
    REMOVE_PICTURE_COMMENT
} from '../actions/comment_actions';

import {
    RECEIVE_LIKE,
    REMOVE_LIKE
} from '../actions/likes_actions';

import merge from 'lodash/merge';

const picturesReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState;
    let likerIds = [];
    switch (action.type) {
        case RECEIVE_ALL_PICTURES:
            newState = merge({}, oldState);
            action.pictures.forEach((picture) => {
                    newState[picture.id] = picture;
            });
            return newState;
        case RECEIVE_PICTURE:
            newState = merge({}, oldState, {[action.picture.id]: action.picture});
            return newState;
        case REMOVE_PICTURE:
            newState = merge({}, oldState);
            delete newState[action.picture.id];
            return newState;
        case RECEIVE_PICTURE_COMMENT:
            newState = merge({}, oldState);
            newState[action.pictureComment.commentable_id].commentIds.push(action.pictureComment.id);
            return newState;
        case REMOVE_PICTURE_COMMENT:
            newState = merge({}, oldState);
            let commentIds = newState[action.pictureComment.commentable_id].commentIds;
            let newCommentIds = commentIds.filter(commentId => commentId != action.pictureComment.id);
            newState[action.pictureComment.commentable_id].commentIds = newCommentIds;
            return newState;
        case RECEIVE_LIKE:
            newState = merge({}, oldState);

            if (newState[action.like.picture_id]) {
                likerIds = newState[action.like.picture_id].likerIds;
            }

            if (!likerIds.includes(action.like.liker_id)) {
                likerIds.push(action.like.liker_id);
            }

            return newState;
        case REMOVE_LIKE:
            newState = merge({}, oldState);

            if (newState[action.like.picture_id]) {
                likerIds = newState[action.like.picture_id].likerIds;
                let updatedLikerIds = likerIds.filter(likerId => likerId != action.like.liker_id);
                newState[action.like.picture_id].likerIds = updatedLikerIds;
            }
            
            return newState;
        default:
            return oldState;
    }
};

export default picturesReducer;