import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slices/counterSlice.js';
import signupReducer from '../slices/signupSlice.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signup: signupReducer,
  },
});
