"use client"
import toast, { Toaster } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useState,useEffect } from "react";
import { IProductPromise } from "@/interfaces/product.interface";
import { ProductCard } from "..";
import { sanityClient } from "@/utils/sanityClient";
import SkeletonProductCard from "../skeleton/SkeletonProductCard";

const arrayDummy = [1,2,3,4];

const RecommendedProduct = () => {
    const [loading,setLoading] = useState<boolean>(true);
    const [products,setProducts] = useState<IProductPromise[]>([]);
    const [sizeWindow,setSizeWindow] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1920);

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
             setProducts(fetchRecommendedProduct);
             setLoading(false);
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
      if(typeof window !== "undefined") {
        window.addEventListener('load' , function() {
          setSizeWindow(Number(this.innerWidth));
        });
        
        window.addEventListener('resize' , function() {
          setSizeWindow(this.innerWidth);
        });
      }

      getRecommendedProduct();
    },[]);

      if(!products) {
         return (
            <div className="w-full">
                <h3 className="font-semibold text-gray-700 text-center">No Products</h3>
            </div>
         )
    }

    return (
      <SkeletonTheme baseColor="#ecf0f1" highlightColor="#fff">
          <div className="mt-7 lg:px-3 sm:mt-10">
              <h3 className="text-lg sm:text-sm font-bold text-gray-700">Recommended Product</h3>
              <div className="grid grid-cols-4 lg:grid-cols-2 gap-4 mt-5 sm:mt-3">
                {loading ? (
                  arrayDummy.map((item : number) => <SkeletonProductCard key={item} />)
                ) : (
                  products.map((product : IProductPromise , idx : number) => <ProductCard key={idx} product={product} loading={loading} />)
                  )}
              </div>
          </div>
        </SkeletonTheme>
    )
}

export default RecommendedProduct;