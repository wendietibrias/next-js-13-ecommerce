import { IFavoriteState } from "@/interfaces/favorite.interface";
import { setItemLocalstorage } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";

let favoriteItems : any;

export type FavoriteState = {
    favorites:IFavoriteState[]
}

if(typeof window !== "undefined") {
    favoriteItems = JSON.parse(localStorage.getItem("wmart-favorite-user") || "null")
}

const initialState : FavoriteState = {
    favorites:favoriteItems || []
}

const favoriteSlice = createSlice({
    name:'favorite',
    initialState,
    reducers:{
        addToFavorite(state : FavoriteState, { payload }) {
            //check if favorite item exists;
            const findFavorite = state.favorites.find((item : IFavoriteState) => item.slug === payload.slug);

            if(findFavorite) return;

            state.favorites = [
                ...state.favorites,
                {
                    title:payload.title,
                    price:Number(payload.price),
                    thumbnail:payload.thumbnail,
                    category:payload.category,
                    slug:payload.slug
                }
            ];

            setItemLocalstorage('wmart-favorite-user' , state.favorites);
            return state;
        },
        removeFavorite(state : FavoriteState, { payload }) {
            const filterFavorite = state.favorites.filter((item : IFavoriteState) => item.slug !== payload?.slug ? item : "");
            state.favorites = filterFavorite;

            setItemLocalstorage('wmart-favorite-user' , state.favorites);
            return state;
        }
    }
});

export const { addToFavorite,removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;