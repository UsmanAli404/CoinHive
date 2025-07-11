import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMessageVisible: false,
    message: '',
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        showDiv: (state) => {
            state.isMessageVisible = true;
        },
        hideDiv: (state) => {
            state.isMessageVisible = false;
        },
        toggleDiv: (state) => {
            state.isMessageVisible = !state.isMessageVisible;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = '';
        },
    },
});

export const { showDiv, hideDiv, toggleDiv, setMessage, clearMessage } = signupSlice.actions;
export default signupSlice.reducer;
