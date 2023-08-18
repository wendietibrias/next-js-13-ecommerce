import { Footer, Navbar,CheckoutForm, CheckoutItems } from '@/components';
import { Toaster } from "react-hot-toast";
import {Alert} from '@/components';
import type { Metadata } from 'next';

export const metadata : Metadata = {
    title:"WMART | Checkout"
}

const Checkout = () => {
    return (
        <div className="w-[80%] lg:w-full lg:px-3 sm:px-5  mx-auto min-h-screen flex justify-between flex-col">
             <Navbar/>
             <main className="py-8 flex-1">
                <Alert/>
                <div className="py-8 flex-1 flex items-start gap-x-10 lg:flex-col lg:gap-y-2 sm:gap-y-7">
                    <CheckoutItems/>
                    <CheckoutForm/>
                </div>
             </main>
             <Footer/>
        </div>
    )
}

export default Checkout 