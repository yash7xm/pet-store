import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
    name: "fav",
    initialState: {
        items: [],
        loggedIn: false,
    },

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
            state.items = action.payload;
        },

        // IMPORTANT FIX
        changeAuthStatus(state, action) {
            state.loggedIn = action.payload; // true or false
            if (!action.payload) {
                state.items = []; // clear favorites when logging out
            }
        },
    },
});

export const { addFav, removeFav, setFavorites, changeAuthStatus } =
    favSlice.actions;
export default favSlice.reducer;
