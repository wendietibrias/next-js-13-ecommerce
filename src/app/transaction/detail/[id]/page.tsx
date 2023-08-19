import type { Metadata } from "next";
import { Navbar,Footer, TransactionDetailitems } from "@/components";

export const metadata : Metadata = {
    title:"WMART | Transaction Detail"
}

const TransactionDetail = () => {
    return (
        <div className="w-[80%] lg:w-full mx-auto min-h-screen flex justify-between flex-col">
          <Navbar/>
          <main className="flex-1 lg:px-3 py-8">
             <TransactionDetailitems/>
          </main>
          <Footer/>
        </div>
    )
}

export default TransactionDetail;