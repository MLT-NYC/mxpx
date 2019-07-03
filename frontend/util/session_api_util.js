export const fetchUsers = userIds => {
    return $.ajax({
        method: 'GET',
        url: 'api/users',
        data: { users: userIds }
    });
};

export const signUp = (user) => {
    return $.ajax({
        method: 'POST',
        url: '/api/users',
        data: { user }
    });
};

export const logIn = (user) => {
    return $.ajax({
        method: 'POST',
        url: '/api/session',
        data: { user }
    });
};

export const logOut = () => {
    return $.ajax({
        method: 'DELETE',
        url: '/api/session'
    });
};

export const updateUser = (user) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/users/${user.id}`,
        data: { user }
    });
};