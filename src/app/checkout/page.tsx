import { Footer, Navbar,CheckoutForm, CheckoutItems } from '@/components';
import type { Metadata } from 'next';

export const metadata : Metadata = {
    title:"WMART | Checkout"
}

const Checkout = () => {
    return (
        <div className="w-[80%] mx-auto min-h-screen flex justify-between flex-col">
             <Navbar/>
             <main className="py-8 flex-1 flex items-start gap-x-10">
                <CheckoutItems/>
                <CheckoutForm/>
             </main>
             <Footer/>
        </div>
    )
}

export default Checkout 