import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMessageVisible: false,
    message: '',
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        showMessage: (state) => {
            state.isMessageVisible = true;
        },
        hideMessage: (state) => {
            state.isMessageVisible = false;
        },
        toggleMessageVisibility: (state) => {
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

export const { showMessage, hideMessage, toggleMessageVisibility, setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
