import { configureStore } from "@reduxjs/toolkit";
import favReducer from './favSlice'

const appStore = configureStore({
    reducer: {
        fav: favReducer
    }
});

export default appStore;