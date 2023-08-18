import { Footer, Navbar,FavoriteItems } from "@/components";
import type { Metadata } from 'next';

export const metadata : Metadata = {
    title:"WMART | Favorite"
}

const Favorite = () => {
    return (
        <div className="w-[80%] lg:w-full sm:w-full lg:px-3 mx-auto flex flex-col justify-between min-h-screen">
          <Navbar/>
          <main className="flex-1 py-8">
             <h3 className="text-lg sm:text-sm text-gray-700 font-bold mb-5">Favorite products</h3>
             <FavoriteItems/>
          </main>
          <Footer/>
        </div>
    )
}

export default Favorite;