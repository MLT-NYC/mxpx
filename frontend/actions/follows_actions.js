import * as FollowApiUtils from '../util/follows_api_util';

export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';

const receiveFollow = follow => ({
    type: RECEIVE_FOLLOW,
    follow: follow
});

const removeFollow = follow => ({
    type: REMOVE_FOLLOW,
    follow: follow
});


export const createFollow = (follow) => dispatch => {
    return FollowApiUtils.createFollow(follow)
        .then(follow => dispatch(receiveFollow(follow)));

};

export const deleteFollow = (follow) => dispatch => {
    return FollowApiUtils.deleteFollow(follow)
        .then(follow => dispatch(removeFollow(follow)));
};