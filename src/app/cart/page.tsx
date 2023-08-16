import { Navbar,Footer,CartItems,CartSummary } from "@/components";
import type { Metadata } from "next";

export const metadata : Metadata = {
    title:"WMART | Cart"
}

const Cart = () => {
    return (
        <div className="w-[80%] mx-auto min-h-screen flex flex-col justify-between">
            <Navbar/>
             <main className="w-full py-8 flex-1 flex items-start gap-x-10">
                <CartItems/>
                <CartSummary/>
             </main>
            <Footer/>
        </div>
    )
}

export default Cart;