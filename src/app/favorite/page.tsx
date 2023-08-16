import { Footer, Navbar,FavoriteItems } from "@/components";
import type { Metadata } from 'next';

export const metadata : Metadata = {
    title:"WMART | Favorite"
}

const Favorite = () => {
    return (
        <div className="w-[80%] mx-auto flex flex-col justify-between min-h-screen">
          <Navbar/>
          <main className="flex-1 py-8">
             <FavoriteItems/>
          </main>
          <Footer/>
        </div>
    )
}

export default Favorite;