import {
    RECEIVE_ALL_PICTURES,
    RECEIVE_PICTURE,
    REMOVE_PICTURE
} from '../actions/pictures_actions';

import {
    RECEIVE_PICTURE_COMMENT,
    REMOVE_PICTURE_COMMENT
} from '../actions/comment_actions';

import merge from 'lodash/merge';

const picturesReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState;
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
        default:
            return oldState;
    }
};

export default picturesReducer;