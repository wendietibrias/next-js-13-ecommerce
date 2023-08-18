import { createSlice } from "@reduxjs/toolkit";
import { ICartState } from "@/interfaces/cart.interface";
import { setItemLocalstorage } from "@/utils/localStorage";

export type CartState = {
    carts:ICartState[]
}

let cartItems;

if(typeof window !== "undefined") {
    cartItems = JSON.parse(localStorage.getItem("wmart-cart-user") || "null") || [];
}

const initialState : CartState = {
   carts:cartItems
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state : CartState , { payload }) {
           const findCartBySlug = state.carts.find((item : ICartState) => item.slug === payload?.slug);

           if(findCartBySlug) {
              const mapCart = state.carts.map((item : ICartState) => {
                  if(item.slug === payload.slug) {
                     return {
                        ...item,
                        qty:Number(item.qty) + Number(payload?.qty),
                        total:(Number(item.qty) + Number(payload.qty)) * Number(payload?.price)
                     }
                  }

                  return item;
              });

              state.carts = mapCart;
           } else {
               state.carts = [
                  ...state.carts,
                  {
                     title:payload?.title,
                     price:payload?.price,
                     thumbnail:payload?.thumbnail,
                     category:payload?.category,
                     qty:payload?.qty,
                     slug:payload?.slug,
                     total:Number(payload?.price) * Number(payload?.qty)
                  }
               ];
           }

 
           setItemLocalstorage('wmart-cart-user' , state.carts);
           return state;
        },
        removeCart(state : CartState, { payload }){
            const filterCart = state.carts.filter((cart : ICartState) => cart.slug !== payload ? cart : "");
            state.carts = filterCart;
            setItemLocalstorage('wmart-cart-user' , state.carts);

            return state;
        },
        updateQty(state : CartState , { payload }) {

           if(payload.qty < 1) {
              state.carts = state.carts.filter((item : ICartState) => item.slug !== payload.slug ? item : "");
           }

           if(payload?.type === "increase") {
              const mapIncreaseCartItem : any = state.carts.map((item : ICartState) => {
                  if(item.slug === payload?.slug) {
                     return {
                        ...item,
                        qty:Number(item.qty) + 1,
                        total:Number(item.total) + Number(item.price)
                     }
                  }

                  return item;
              });

              state.carts = mapIncreaseCartItem;
           } 
           
           if(payload?.type === "decrease") {
              const mapDecreaseCartItem : any = state.carts.map((item : ICartState) => {
                  if(item.slug === payload.slug) {
                     return {
                        ...item,
                        qty: Number(item.qty) - 1,
                        total:item.total < 1 ? 0 : Number(item.total) - Number(item.price)
                     }
                  }

                  return item 
              });

              state.carts = mapDecreaseCartItem;
           }

           setItemLocalstorage('wmart-cart-user' , state.carts);
        },
        clearCart(state : CartState) {
            state.carts = [];
            setItemLocalstorage('wmart-cart-user' , state.carts);

            return state;
        }
    }
});

export const { addToCart,removeCart,updateQty,clearCart } = cartSlice.actions;
export default cartSlice.reducer;