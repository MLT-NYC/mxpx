export const likePicture = like => {
    return $.ajax({
        method: 'POST',
        url: `api/pictures/${like.pictureId}/like`,
        data: {like: {picture_id: like.pictureId, liker_id: like.likerId}}
    });
};

export const unlikePicture = like => {
    return $.ajax({
        method: 'DELETE',
        url: `api/pictures/${like.pictureId}/unlike`,
        data: {like: {picture_id: like.pictureId, liker_id: like.likerId} }
    });
};
