"use client"

import { IFavoriteState } from "@/interfaces/favorite.interface";
import FavoriteItemCard from "./FavoriteItemCard";
import { useAppSelector } from "@/hooks/redux.hook";
import { FavoriteState } from "@/slices/favorite.slice";

const FavoriteItems = () => {
    const { favorites } = useAppSelector(state=>state.favorite) as FavoriteState;

    return (
        <div className="grid grid-cols-4 gap-4">
            {favorites.map((item : IFavoriteState , idx : number) => <FavoriteItemCard key={idx} favorite={item} />)}
        </div>
    )
}

export default FavoriteItems;