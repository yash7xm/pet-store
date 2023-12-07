import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "fav",
  initialState: {
    items: [],
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
  },
});

export const { addFav, removeFav, clear } = favSlice.actions;
export default favSlice.reducer;
