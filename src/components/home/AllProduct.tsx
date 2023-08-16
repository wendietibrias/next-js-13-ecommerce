"use client"
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import toast , { Toaster } from 'react-hot-toast';
import { useState,useEffect } from "react";
import { sanityClient } from "@/utils/sanityClient";
import { ProductCard } from "..";
import { IProductPromise } from "@/interfaces/product.interface";
import Link from "next/link";

const AllProduct = () => {
    const [loading,setLoading] = useState<boolean>(true);
    const [products,setProducts] = useState<IProductPromise[]>([]);
    const [countSkeleton,setCountSkeleton] = useState<number>(8);

    const getAllProduct = async () => {
        setLoading(true);
        try {
          const fetchAllProduct = await sanityClient.fetch(`*[_type=="product"] {
              title,
              price,
              thumbnail,
              slug,
              "category":category-> 
          }`);

          if(fetchAllProduct) {
             setProducts(fetchAllProduct);
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
    
    useEffect(()=>{
        getAllProduct();
        
        window.addEventListener('resize' , (e : any) => {
           if(typeof window !== 'undefined') {
               if(window.innerWidth < 600) {
                  setCountSkeleton(2);
               }
           }
        })
    },[]);


    if(loading) {
        return (
        <SkeletonTheme baseColor="#ecf0f1" highlightColor="#fff">
          <div className="mt-10 w-full">
            <Skeleton count={countSkeleton} width="23%" height={300} containerClassName='flex flex-wrap gap-y-4 items-center justify-between' />
          </div>
        </SkeletonTheme>
        )
    }

    return (
        <div className="w-full mt-10">    
         <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-700">All Product</h3>
            <Link href="/product">
                <button className="text-blue-500 text-[12px] font-semibold">See more</button>
            </Link>
         </div>
            <div className="grid grid-cols-4 gap-4 mt-5">
                 {products.map((product : IProductPromise , idx : number) => <ProductCard key={idx} product={product} />)}
            </div>
        </div>
    )
}

export default AllProduct;