import qs from 'qs'

export const startLogin = ({ username, password }) => {
    // Make authentication call to the server
    return dispatch => {
        return fetch('/api/user/login', {
            method: 'POST',
            credentials: "same-origin",
            body: qs.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            res.json().then(({ user }) => {
                if (user) dispatch(login(user))
            }).catch(err => console.log(err))
        });
    };
};

export const getUser = () => {
    return dispatch => {
        return fetch('/api/user', {
            credentials: "same-origin",
        }).then(res => {
            res.json().then(({ user }) => {
                if (user) dispatch(login(user))
            })
        })
    }
}

export const startLogout = () => {
    return dispatch => {
        return fetch('/api/user/logout', {
            method: 'POST',
            credentials: "same-origin",
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            console.log(res)
            res.json().then(() => {
                dispatch(logout())
            })
        });
    };
};

export const login = user => ({
    type: 'LOGIN',
    user
});

export const logout = () => ({
    type: 'LOGOUT'
});