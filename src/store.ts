import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart.slice";
import favoriteSlice from "./slices/favorite.slice";
import alertSlice from "./slices/alert.slice";

const store = configureStore({
    reducer: {
        cart:cartSlice ,
        favorite:favoriteSlice,
        alert:alertSlice
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;