import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    userEmail: '',
    userName: '',
    balance: 0.0,
    profileData: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserBalance: (state, action) => {
      state.balance = action.payload;
    },
    setUserProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setUserId, setUserEmail, setUserName, setUserBalance, setUserProfileData } = userSlice.actions;
export default userSlice.reducer;