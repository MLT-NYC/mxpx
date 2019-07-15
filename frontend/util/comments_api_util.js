export const fetchPictureComments = (pictureId) => {
    return $.ajax({
        method: 'GET',
        url: `api/pictures/${pictureId}/comments`,
        data: {comment: {picture_id: pictureId}}
    });
};

export const createPictureComment = (comment) => {
    debugger
    return $.ajax({
        method: 'POST',
        url: `api/pictures/${comment.picture_id}/comments`,
        data: { comment }
    });
};

export const deletePictureComment = (comment) => {
    debugger
    return $.ajax({
        method: 'DELETE',
        url: `api/pictures/${comment.commentable_id}/comments/${comment.id}`,
        data: { comment }
    });
};

export const fetchSubComments = (commentId) => {
    return $.ajax({
        method: 'GET',
        url: `api/comments/${commentId}/comments/`,
        data: { comment: {comment_id: commentId}}
    });
};

export const createSubComment = (subComment) => {
    return $.ajax({
        method: 'POST',
        url: `api/comments/${subComment.comment_id}/comments/`,
        data: { comment: subComment }
    });
};

export const deleteSubComment = (subComment) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/comments/${subComment.comment_id}/comments/${subComment.id}`,
        data: { comment: subComment }
    });
};