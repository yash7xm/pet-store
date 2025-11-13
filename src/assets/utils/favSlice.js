import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
    name: "fav",
    initialState: { items: [] },

    reducers: {
        addFav(state, action) {
            state.items.push(action.payload);
        },
        removeFav(state, action) {
            state.items = state.items.filter(
                (pet) => pet._id !== action.payload
            );
        },
        setFavorites(state, action) {
            state.items = action.payload; // load from backend
        },
        changeAuthStatus(state) {
            // optional: clear favorites when logging out
            state.items = [];
        },
    },
});

export const { addFav, removeFav, setFavorites, changeAuthStatus } =
    favSlice.actions;
export default favSlice.reducer;
