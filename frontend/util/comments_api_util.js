export const fetchPictureComments = (pictureId) => {
    return $.ajax({
        method: 'GET',
        url: `api/${pictureId}/comments`
    });
};

export const createPictureComment = (pictureId) => {
    return $.ajax({
        method: 'POST',
        url: `api/${pictureId}/comments`
    });
};

export const deletePictureComment = (pictureId, commentId) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/${pictureId}/comments/${commentId}`
    });
};

export const fetchSubComments = (commentId) => {
    return $.ajax({
        method: 'GET',
        url: `api/${commentId}/comments/`
    });
};

export const createSubComment = (commentId) => {
    return $.ajax({
        method: 'POST',
        url: `api/${commentId}/comments/`
    });
};

export const deleteSubComment = (commentId, subCommentId) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/${commentId}/comments/${subCommentId}`
    });
};