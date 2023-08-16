"use client"
import { useAppSelector } from "@/hooks/redux.hook";
import { CartItemCard } from "..";
import { ICartState } from "@/interfaces/cart.interface";
import { CartState } from "@/slices/cart.slice";

const CartItems = () => {
    const { carts } = useAppSelector(state=>state.cart) as CartState;

    if(carts && Array.isArray(carts) && carts.length > 0) {
        return (
            <div className="flex-1 grid grid-cols-2 gap-4">
                 {carts.map((cart : ICartState , idx : number) => <CartItemCard key={idx} cart={cart}/>)}
            </div>
        )
    }

    return (
        <div className="flex-1">
             <h3 className="text-lg font-semibold text-gray-700">No cart items(0)</h3>
        </div>
    )
}

export default CartItems;