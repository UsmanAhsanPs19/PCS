import { createSlice } from '@reduxjs/toolkit';

const generalInfoSlice = createSlice({
    name: 'GeneralState',
    initialState: {
        general_info: {},
    },
    reducers: {
        setGeneralInfo(state, action) {
            state.general_info = action.payload;
        }
    },
});

export const { setGeneralInfo } = generalInfoSlice.actions;
export default generalInfoSlice.reducer;
