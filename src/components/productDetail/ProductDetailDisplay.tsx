"use client"
import toast, { Toaster } from "react-hot-toast";
import { useState,useEffect } from "react";
import { useAppDispatch,useAppSelector } from "@/hooks/redux.hook";
import { IProductImageObject, IProductPromise } from "@/interfaces/product.interface";
import { sanityClient } from "@/utils/sanityClient";
import { LiaCartPlusSolid } from 'react-icons/lia';
import { AiOutlineHeart,AiFillHeart } from 'react-icons/ai';
import { addToCart } from "@/slices/cart.slice";
import { FavoriteState, addToFavorite, removeFavorite } from "@/slices/favorite.slice";
import convertMoney from "@/utils/convertMoney";
import urlFor from "@/utils/sanityImage";
import { IFavoriteState } from "@/interfaces/favorite.interface";

type ProductDetailDisplayProps = {
    slug:string;
}

const ProductDetailDisplay = ({ slug } : ProductDetailDisplayProps) => {
    const dispatch = useAppDispatch();
    const { favorites } = useAppSelector(state=>state.favorite) as FavoriteState;

    const [loading,setLoading] = useState<boolean>(true);
    const [product,setProduct] = useState<IProductPromise | null>(null);
    const [imageIndex,setImageIndex] = useState<number>(0);
    const [qty,setQty] = useState<number>(1);

    const getProduct = async () => {
        try {
          const detailProduct = await sanityClient.fetch(`*[_type=="product" && slug.current == $slug] {
              title,
              thumbnail,
              price,
              images,
              stock,
              slug,
              excerpt,
              description,
              "category":category->
          }` , { slug:slug });

           if(detailProduct) {
               setProduct(detailProduct[0]);
               setLoading(false);
           }
             
        } catch(err) {
          return err;
        }
    }

    const addToCartHandler = () => {
       dispatch(addToCart({
          title:product?.title,
          price:product?.price,
          thumbnail:urlFor(product?.thumbnail?.asset?._ref).url(),
          qty:qty,
          slug:product?.slug?.current,
          category:product?.category?.title
       }));

       setQty(1);
       return toast.success('already add to cart' , {
         position:'top-center',
         duration:5000
       });
    }

    const addToFavoriteHandler = () => {
        dispatch(addToFavorite({
            title:product?.title,
            price:product?.price,
            slug:product?.slug?.current,
            category:product?.category?.title,
            thumbnail:urlFor(product?.thumbnail?.asset?._ref).url()
        }));

        return toast.success('product add to favorite' , {
            position:'top-center',
            duration:5000
        });
    }

    const removeFavoriteHandler = () => {
        dispatch(removeFavorite(product?.slug?.current));
        return toast.success('product removed from favorite' , {
            position:'top-center',
            duration:5000
        });
    }

    useEffect(() => {
      getProduct();
    },[]);

    if(loading) {
        return (
            <div>Loading...</div>
        )
    }

    if(!product && loading === false) {
        return (
            <div>No products</div>
        )
    }

    return (
        <div className="w-full flex items-start gap-x-10">
          <div className="w-[450px]">
             <div className="w-full h-[400px] bg-gray-100 flex justify-center items-center rounded-lg">
                 <img src={urlFor(product?.images[imageIndex]?.asset?._ref).url()} alt={product?.title} className="w-[60%]" />
             </div>
             <div className="grid grid-cols-4 gap-x-3 mt-5">
                {product?.images?.map((image : IProductImageObject,idx : number) => (
                   <div onClick={() => setImageIndex(idx)} className={`w-full cursor-pointer rounded-lg flex  justify-center items-center h-[80px] ${imageIndex === idx ? "bg-gray-100/70" : "bg-gray-100"}`}>
                      <img src={urlFor(image.asset._ref).url()} alt={product?.slug?.current} className="w-[60%]"/>
                   </div>
                ))}
             </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-x-7">
                 <h2 className="text-xl font-bold text-gray-700">{product?.title}</h2>
                 <h5 className="text-md font-bold text-blue-500">{convertMoney(product?.price || 0)}</h5>
            </div>
             <p className="text-sm text-gray-400 mt-1">{product?.category?.title}</p>
             <p className="text-sm text-gray-400 mt-5">{product?.excerpt}</p>
             <p className="text-sm text-gray-400 mt-1">{product?.stock} Stocks</p>
             <p className="text-sm mt-2 text-gray-400">{product?.description}</p>
             <div className="mt-7">
                <div className="flex items-center gap-x-3">
                    <button onClick={()=>setQty(qty <= 1 ? 1 : qty - 1)} className="text-blue-500 font-semibold text-lg">-</button>
                    <span className="text-gray-700 text-[13px] font-bold">{qty}</span>
                    <button onClick={() => setQty(qty+1)} className="text-blue-500 font-semibold text-lg">+</button>
                 </div>
                 <div className="flex items-center gap-x-3">
                    {favorites.find((item : IFavoriteState) => item.slug === product?.slug?.current) ? (
                     <button onClick={removeFavoriteHandler} className="text-rose-500 flex items-center gap-x-2 text-[13px] font-semibold">
                       <AiFillHeart/>
                       Remove favorite
                     </button>
                    ) : (
                     <button onClick={addToFavoriteHandler} className="text-rose-500 flex items-center gap-x-2 text-[13px] font-semibold">
                       <AiOutlineHeart/>
                       Mark as favorite
                     </button>
                    )}
                     <button onClick={addToCartHandler} className="flex-1 flex justify-center items-center bg-blue-500 text-center font-semibold text-[13px] py-2 rounded-md text-white gap-x-3">
                        <LiaCartPlusSolid className="text-lg"/>
                        Add to cart
                    </button>
                 </div>
             </div>
          </div>
          <Toaster/>
        </div>
    )
}

export default ProductDetailDisplay;