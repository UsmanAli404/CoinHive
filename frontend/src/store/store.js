import { configureStore } from '@reduxjs/toolkit';
import otpReducer from '../slices/otpSlice.js';
import messageReducer from '../slices/messageSlice.js';
import loginReducer from '../slices/loginSlice.js';
import dashboardReducer from '../slices/dashboardSlice.js';
import coinTableReducer from '../slices/coinTableSlice.js';
import userReducer from '../slices/userSlice.js';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    otp: otpReducer,
    login: loginReducer,
    dashboard: dashboardReducer,
    coinTable: coinTableReducer,
    user: userReducer
  },
});
