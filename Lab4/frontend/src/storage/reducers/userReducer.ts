export type userState = {
    login: string | null,
    isLogin: boolean,
    token: string | null,
}

const initialState = {
    login: null,
    isLogin: false,
    token: null,
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                login: action.payload.login,
                isLogin: true,
                token: action.payload.token
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state
    }
}

export default userReducer;