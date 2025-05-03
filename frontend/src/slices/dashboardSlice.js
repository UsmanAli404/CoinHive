import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    activeTab: "home",
    collapsed: true,
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        setCollapsed: (state, action) => {
            state.collapsed = action.payload;
        }
    }
});

export const {setActiveTab, setCollapsed} = dashboardSlice.actions;
export default dashboardSlice.reducer;