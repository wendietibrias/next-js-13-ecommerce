"use client"
import toast, { Toaster } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useState,useEffect } from "react";
import { IProductPromise } from "@/interfaces/product.interface";
import { ProductCard } from "..";
import { sanityClient } from "@/utils/sanityClient";

const RecommendedProduct = () => {
    const [loading,setLoading] = useState<boolean>(true);
    const [products,setProducts] = useState<IProductPromise[]>([]);

    const getRecommendedProduct = async () => {
         try {
           const fetchRecommendedProduct = await sanityClient.fetch(`*[_type == "product" && recommended == true] {
             title,
             price,
             thumbnail,
             slug,
             "category":category->
           }`)
           if(fetchRecommendedProduct) {
               setLoading(false);
               setProducts(fetchRecommendedProduct);
           }

         } catch(err : any) {
            const { response:{ data } } = err;
            return toast.error(data?.message, {
                position:'top-center',
                duration:5000
            });
         }
    }

    useEffect(() => {
        getRecommendedProduct();
    },[]);


    if(loading) {
        return (
        <SkeletonTheme baseColor="#ecf0f1" highlightColor="#fff">
          <div className="mt-10 w-full">
            <Skeleton count={4} width="23%" height={300} containerClassName='flex flex-wrap gap-y-4 items-center justify-between' />
          </div>
        </SkeletonTheme>
        )
    }

    return (
        <div className="mt-7">
            <h3 className="text-lg font-bold text-gray-700">Recommended Product</h3>
            <div className="w-full grid grid-cols-4 mt-5 gap-4">
              {products.map((product : IProductPromise , idx : number) => <ProductCard key={idx} product={product} />)}
            </div>
        </div>
    )
}

export default RecommendedProduct;