import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showMessage: false,
    message: '',
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        showDiv: (state) => {
            state.showMessage = true;
        },
        hideDiv: (state) => {
            state.showMessage = false;
        },
        toggleDiv: (state) => {
            state.showMessage = !state.showMessage;
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
