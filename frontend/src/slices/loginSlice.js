import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    password: "",
    email: ""
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        }
    }
});

export const {setPassword, setEmail} = loginSlice.actions;
export default loginSlice.reducer;