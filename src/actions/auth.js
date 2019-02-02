export const startLogin = ({ username, password }) => {
    // Make authentication call to the server
    return dispatch => {
        return fetch('/api/user/login', {
            method: 'POST',
            body: {
                username,
                password
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json().then(user =>
            dispatch(login(user))
        ));
    };
};

export const startLogout = () => {
    return dispatch => {
        return fetch('/api/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json().then(data => dispatch(logout())))
    };
};

export const login = user => ({
    type: 'LOGIN',
    user
});

export const logout = () => ({
    type: 'LOGOUT'
});