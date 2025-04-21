import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    otp: 0,
    timer: 0,
    timerString: "",
}

const otpSlice = createSlice({
    name: 'otp',
    initialState,
    reducers: {
        setOtp: (state, action) => {
            state.otp = action.payload;
        },

        setTimer: (state, action) => {
            state.timer = action.payload;
        },

        setTimerString: (state, action) => {
            state.timerString = action.payload;
        }
    },
});

export const {setOtp, setTimer, setTimerString} = otpSlice.actions;
export default otpSlice.reducer;