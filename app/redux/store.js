import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import GeneralInfoSlice from './GeneralInfoSlice';

export const store = configureStore({
    reducer: {
        AuthStore: authReducer,
        GeneralState: GeneralInfoSlice
    },
});