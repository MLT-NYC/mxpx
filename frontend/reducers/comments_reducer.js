import {
    RECEIVE_ALL_PICTURE_COMMENTS,
    RECEIVE_PICTURE_COMMENT,
    REMOVE_PICTURE_COMMENT,
    RECEIVE_ALL_SUB_COMMENTS,
    RECEIVE_SUB_COMMENT,
    REMOVE_SUB_COMMENT
} from '../actions/comment_actions';

import merge from 'lodash/merge';

const commentsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState;
    switch (action.type) {
        case RECEIVE_ALL_PICTURE_COMMENTS:
            newState = merge({}, oldState);
            action.pictureComments.forEach((pictureComment) => {
                newState[pictureComment.id] = pictureComment;
            });
            return newState;
        case RECEIVE_PICTURE_COMMENT:
            newState = merge({}, oldState, {[action.pictureComment.id]: action.pictureComment});
            return newState;
        case REMOVE_PICTURE_COMMENT:
            newState = merge({}, oldState);
            delete newState[action.pictureComment.id];
            return newState;
        case RECEIVE_ALL_SUB_COMMENTS:
            newState = merge({}, oldState);
            action.subComments.forEach((subComment) => {
                newState[subComment.id] = subComment;
            });
            return newState;
        case RECEIVE_SUB_COMMENT:
            newState = merge({}, oldState, { [action.subComment.id]: action.subComment });
            newState[action.subComment.commentable_id].subCommentIds.unshift(action.subComment.id);
            return newState;
        case REMOVE_SUB_COMMENT:
            newState = merge({}, oldState);
            delete newState[action.subComment.id];
            let subCommentIds = newState[action.subComment.commentable_id].subCommentIds;
            let newSubCommentIds = subCommentIds.filter(subCommentId => subCommentId != action.subComment.id);
            newState[action.subComment.commentable_id].subCommentIds = newSubCommentIds;
            return newState;   
        default:
            return oldState;
    }
};

export default commentsReducer;