import * as CommentApiUtils from  '../util/comments_api_util';

// export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_ALL_PICTURE_COMMENTS = 'RECEIVE_ALL_PICTURE_COMMENTS';
export const RECEIVE_PICTURE_COMMENT = 'RECEIVE_PICTURE_COMMENT';
export const REMOVE_PICTURE_COMMENT = 'REMOVE_PICTURE_COMMENT';
export const RECEIVE_ALL_SUB_COMMENTS = 'RECEIVE_ALL_SUB_COMMENTS';
export const RECEIVE_SUB_COMMENT = 'RECEIVE_SUB_COMMENT';
export const REMOVE_SUB_COMMENT = 'REMOVE_SUB_COMMENT';

const receivePictureComments = pictureComments => ({
    type: RECEIVE_ALL_PICTURE_COMMENTS,
    pictureComments: pictureComments
});

const receivePictureComment = pictureComment => ({
    type: RECEIVE_PICTURE_COMMENT,
    pictureComment: pictureComment
});

const removePictureComment = pictureComment => ({
    type: REMOVE_PICTURE_COMMENT,
    pictureComment: pictureComment
});

const receiveSubComments = subComments => ({
    type: RECEIVE_ALL_SUB_COMMENTS,
    subComments: subComments
});

const receiveSubComment = subComment => ({
    type: RECEIVE_SUB_COMMENT,
    subComment: subComment
});

const removeSubComment = subComment => ({
    type: REMOVE_SUB_COMMENT,
    subComment: subComment
});

export const fetchPictureComments = pictureId => dispatch => {
    return CommentApiUtils.fetchPictureComments(pictureId)
        .then(pictureComments => dispatch(receivePictureComments(pictureComments)));
};

export const createPictureComment = pictureId => dispatch => {
    return CommentApiUtils.createPictureComment(pictureId)
        .then(pictureComment => dispatch(receivePictureComment(pictureComment)));
};

export const deletePictureComment = (pictureId, commentId) => dispatch => {
    return CommentApiUtils.deletePictureComment(pictureId, commentId)
        .then((pictureComment) => dispatch(removePictureComment(pictureComment)));
};

export const fetchSubComments = commentId => dispatch => {
    return CommentApiUtils.fetchSubComments(commentId)
        .then(subComments => dispatch(receiveSubComments(subComments)));
};

export const createSubComment = commentId => dispatch => {
    return CommentApiUtils.createSubComment(commentId)
        .then(subComment => dispatch(receiveSubComment(subComment)));
};

export const deleteSubComment = (commentId, subCommentId) => dispatch => {
    return CommentApiUtils.deleteSubComment(commentId, subCommentId)
        .then((subComment) => dispatch(removeSubComment(subComment)));
};