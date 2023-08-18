"use client"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/hooks/redux.hook";
import { ICartState } from "@/interfaces/cart.interface";
import convertMoney from "@/utils/convertMoney";

const CartSummary = () => {
  const { carts } = useAppSelector(state=>state.cart);
  const { status } = useSession();

  const router = useRouter();

  const navigateHandler = () => {
    if(status === "authenticated") {
      return router.push("/checkout")
    } 

    router.push("/auth");
  }

  if(carts && Array.isArray(carts)) {
     return (
          <div className="w-[450px] lg:w-full bg-slate-100 rounded-md p-4">
            <div className="border-b border-gray-300 pb-2">
                <h3 className="text-gray-700 text-sm font-semibold">Order Summary</h3>
            </div>
            <div className="w-full mt-4">
                    <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-500">Products</p>
                    <h5 className="text-blue-500 font-bold text-md">{carts.length}</h5>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-medium text-gray-500">Total</p>
                    <h5 className="text-blue-500 font-bold text-md">{convertMoney(carts.reduce((a : number,b : ICartState) => a + b.total ,0))}</h5>
                </div>
                <button onClick={navigateHandler} disabled={carts.length === 0 ? true : false} className={`${carts.length === 0 ? "cursor-not-allowed" : "cursor-pointer"} mt-5 rounded-md bg-blue-500 w-full py-2 text-white text-[13px] font-semibold`}>Pay Now</button>
            </div>
        </div>
     )
  }

  return (
      <div className="w-[450px] bg-slate-100 rounded-md p-4">
            <p className="text-center text-gray-400 text-sm">No Carts</p>
        </div>
  )
}

export default CartSummary