export const createFollow = (follow) => {
    return $.ajax({
        method: 'POST',
        url: `/api/users/${follow.follower_id}/follows`,
        data: follow
    });
};

export const deleteFollow = (follow) => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/users/${follow.follower_id}/follows/${follow.id}`
    });
};