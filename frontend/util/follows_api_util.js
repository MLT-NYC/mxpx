export const createFollow = (follow) => {
    // debugger
    return $.ajax({
        method: 'POST',
        url: `/api/users/${follow.follower_id}/follow`,
        data: { follow }
    });
};

export const deleteFollow = (follow) => {
    // debugger
    return $.ajax({
        method: 'DELETE',
        url: `/api/users/${follow.follower_id}/unfollow`,
        data: { follow }
    });
};