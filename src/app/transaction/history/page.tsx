import { Footer, Navbar, TransactionItems } from '@/components';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata : Metadata = {
    title:"WMART | Transaction History"
}

const History = () => {
    return (
        <div className="w-[80%] lg:w-full mx-auto min-h-screen lg:px-3 flex flex-col justify-between">
            <Navbar/>
            <main className="flex-1">
                <TransactionItems/>
            </main>
            <Footer/>
            <Toaster/>
        </div>
    )
}

export default History;