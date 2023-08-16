import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Banner,Navbar,RecommendedProduct,AllProduct,Footer } from '@/components';

export const metadata : Metadata = {
  title:"WMART | Homepage"
}

export default function Home() {
  return (
     <div className="w-[80%] mx-auto">
        <Navbar/>
        <main className="py-8">
           <Banner/>
           <RecommendedProduct/>
           <AllProduct/>
        </main>
        <Toaster/>
        <Footer/>
     </div>
  )
}
