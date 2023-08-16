import { IProductPromise } from "@/interfaces/product.interface";
import { LiaCartPlusSolid } from 'react-icons/lia';
import { useAppDispatch } from "@/hooks/redux.hook";
import { addToCart } from "@/slices/cart.slice";
import { redirect,useRouter } from 'next/navigation'
import toast from "react-hot-toast";
import urlFor from "@/utils/sanityImage";
import convertMoney from "@/utils/convertMoney";

type ProductCardProps = {
    product:IProductPromise
}

const ProductCard = ({
    product 
} : ProductCardProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const navigateToDetailHandler = (e : any) => {
       if(e.target.tagName === "svg" || e.target.tagName === "BUTTON") return;
       router.push(`/product/${product?.slug?.current}`);
    }

    const addProductToCartHandler = () => {
        if(product) {
            dispatch(addToCart({
                title:product?.title,
                price:Number(product?.price),
                qty:1,
                slug:product?.slug?.current,
                category:product?.category?.title,
                total:Number(product?.price) * 1,
                thumbnail:urlFor(product?.thumbnail?.asset?._ref).url()
            }));

            return toast.success('Add to cart' , {
                position:'top-center',
                duration:4000
            });
        }
    }

    return (
         <div onClick={navigateToDetailHandler} className="w-full cursor-pointer bg-white shadow-md shadow-gray-300 p-4 rounded-lg">
             <div className="w-full relative flex items-center justify-center h-[220px] rounded-lg bg-gray-100">
                <img src={urlFor(product?.thumbnail?.asset?._ref).url()} alt={product?.slug?.current} className="w-[60%]" />
             </div>
             <div className="pt-4">
                <div className="flex justify-between items-center">
                   <h4 className="text-[12px] font-semibold  text-gray-700">{product.title}</h4>
                   <h4 className="text-[12px] font-bold text-blue-500">{convertMoney(product.price)}</h4>
                </div>
                <p className="text-gray-400 text-[12px] mt-1">{product?.category?.title}</p>
               <div className="w-full flex justify-start">
                    <button onClick={addProductToCartHandler} className="flex items-center gap-x-1 mt-4 text-blue-500 text-[11px] font-semibold">
                        <LiaCartPlusSolid className="text-[18px]"/>
                        Add to cart
                    </button>
               </div>
             </div>
         </div>
    )
}

export default ProductCard;