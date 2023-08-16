import { Footer, Navbar, ProductDetailDisplay } from '@/components';
import type { Metadata } from 'next';

type ProductDetailProps = {
    params: {
        slug:string;
    }
}

export const metadata : Metadata = {
    title:"WMART | Product Detail"
}

const ProductDetail = ({
    params 
} : ProductDetailProps) => {

    return (
        <div className="w-[80%] mx-auto flex flex-col justify-between min-h-screen">
            <Navbar/>
             <main className="w-full py-8 flex-1">
                <ProductDetailDisplay slug={params.slug} />
             </main>
            <Footer/>
        </div>
    )
}

export default ProductDetail;