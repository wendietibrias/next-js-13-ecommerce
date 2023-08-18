"use client"

import { IFavoriteState } from "@/interfaces/favorite.interface";
import FavoriteItemCard from "./FavoriteItemCard";
import { useAppSelector } from "@/hooks/redux.hook";
import { FavoriteState } from "@/slices/favorite.slice";

const FavoriteItems = () => {
    const { favorites } = useAppSelector(state=>state.favorite) as FavoriteState;

    if(Array.isArray(favorites) && favorites.length > 0) {
        return (
            <div className="grid grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 sm:gap-2 gap-4">
                {favorites.map((item : IFavoriteState , idx : number) => <FavoriteItemCard key={idx} favorite={item} />)}
            </div>
        )
    }

    return (
            <div className="w-full">
               <h3 className="text-lg font-semibold text-gray-700">No favorite item found</h3>
            </div>
    )
}

export default FavoriteItems;