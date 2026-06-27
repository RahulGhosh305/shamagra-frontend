import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './type';

import { Constants } from '@/utils/app.constant';

const getUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const userInfo = localStorage.getItem(Constants.USER_INFO);
        if (userInfo) {
            try {
                return JSON.parse(userInfo);
            } catch (e) {
                return null;
            }
        }
    }
    return null;
};

const getTokenFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem(Constants.ACCESS_TOKEN);
        if (token) {
            try {
                return JSON.parse(token).token;
            } catch (e) {
                return null;
            }
        }
    }
    return null;
};

const initialState: AuthState = {
    token: getTokenFromLocalStorage(),
    user: getUserFromLocalStorage(),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: any; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
