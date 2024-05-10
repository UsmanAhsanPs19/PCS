import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'AuthState',
    initialState: {
        user: {} || null,
        isAuthorized: false,
    },
    reducers: {
        setAuth(state, action) {
            state.user = action.payload;
        },
        setIsAuthorized(state, action) {
            state.isAuthorized = action.payload;
        },
    },
});

export const { setAuth, setIsAuthorized } = authSlice.actions;
export default authSlice.reducer;
