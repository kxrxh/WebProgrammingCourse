export const loginAction = (login: string, token: string) => ({
  type: 'LOGIN',
  payload: { login, token },
});

export const logoutAction = () => ({
  type: 'LOGOUT',
});
