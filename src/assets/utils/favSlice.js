import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "fav",
  initialState: {
    items: [],
    loggedIn: false
  },
  reducers: {
    addFav: (state, action) => {
      console.log(action.payload);
      state.items.push(action.payload);
    },
    removeFav: (state, action) => {
      const idToRemove = action.payload;
      const newArr = state.items.filter((item) => item.id !== idToRemove);
      state.items = newArr;
    },
    clear: (state, action) => {
      state.items.length = 0;
    },
    changeAuthStatus: (state, action) => {
      state.loggedIn = !state.loggedIn;
    }
  },
});

export const { addFav, removeFav, changeAuthStatus } = favSlice.actions;
export default favSlice.reducer;
