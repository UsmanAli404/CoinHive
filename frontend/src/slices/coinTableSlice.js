import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortField: "change_24h",
    sortOrder: "desc",
    currentPage: 1,
    coins: [],
    inputPage: 1,
};

const coinTableSlice = createSlice({
    name: "coinTable",
    initialState,
    reducers: {
        setSortField: (state, action) => {
            state.sortField = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setCoins: (state, action) => {
            state.coins = action.payload;
        },
        setInputPage: (state, action) => {
            state.inputPage = action.payload;
        },
    }
});

export const {
    setSortField,
    setSortOrder,
    setCurrentPage,
    setCoins,
    setInputPage,
} = coinTableSlice.actions;

export default coinTableSlice.reducer;
