import { configureStore } from '@reduxjs/toolkit';
import otpReducer from '../slices/otpSlice.js';
import messageReducer from '../slices/messageSlice.js';
import loginReducer from '../slices/loginSlice.js';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    otp: otpReducer,
    login: loginReducer,
  },
});
