export const login = (login: string, token: string) => ({
    type: 'LOGIN',
    payload: { login, token },
});

export const logout = () => ({
    type: 'LOGOUT',
});
