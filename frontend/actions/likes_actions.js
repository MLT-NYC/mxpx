import * as LikesApiUtils from '../util/likes_api_util';

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';

const receiveLike = like => ({
    type: RECEIVE_LIKE,
    like: like
});

const removeLike = like => ({
    type: REMOVE_LIKE,
    like: like
});

export const likePicture = like => dispatch => {
    return LikesApiUtils.likePicture(like)
        .then(like => dispatch(receiveLike(like)));
};

export const unlikePicture = like => dispatch => {
    return LikesApiUtils.unlikePicture(like)
        .then(like => dispatch(removeLike(like)));
};