"use client"
import { useAppDispatch,useAppSelector } from "@/hooks/redux.hook";
import FavoriteItemCard from "../favorite/FavoriteItemCard";
import { ICartState } from "@/interfaces/cart.interface";
import CheckoutItemCard from "./CheckoutItemCard";
import convertMoney from "@/utils/convertMoney";

const CheckoutItems = () => {
    const { carts } = useAppSelector(state=>state.cart);

    if(!carts) {
        return (
            <div className="flex-1">No Items</div>
        )
    }

    return (
        <div className="flex-1 sm:w-full sm:order-2">
            <h3 className="text-xl font-bold text-gray-700">Total :  {convertMoney(Number(carts.reduce((a : number , b : ICartState) => a + b.total,0)))}</h3>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-2">
                {carts && Array.isArray(carts) && carts.map((item : ICartState,idx : number) => <CheckoutItemCard key={idx} item={item} />)}
            </div>
        </div>
    )
}

export default CheckoutItems;