import { Footer, Navbar } from "@/components";

const Product = () => {
    return (
        <div className="w-[80%] lg:w-full lg:px-3 sm:px-5 min-h-screen flex flex-col justify-between">
            <Navbar/>
            <main className="w-full flex-1 flex justify-center items-center">
                <h3 className="text-lg font-semibold text-gray-700">Coming soon</h3>
            </main>
            <Footer/>
        </div>
    )
}

export default Product;