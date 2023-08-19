"use client"
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import toast , { Toaster } from 'react-hot-toast';
import { useState,useEffect } from "react";
import { sanityClient } from "@/utils/sanityClient";
import { ProductCard } from "..";
import { IProductPromise } from "@/interfaces/product.interface";
import Link from "next/link";
import SkeletonProductCard from '../skeleton/SkeletonProductCard';

const arrayDummy = [1,2,3,4,5,6,7,8];

const AllProduct = () => {
    const [loading,setLoading] = useState<boolean>(true);
    const [products,setProducts] = useState<IProductPromise[]>([]);
    const [countSkeleton,setCountSkeleton] = useState<number>(8);
    const [windowSize,setWindowSize] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

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
             setTimeout(() => setLoading(false) , 3500);
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

        if(typeof window !== "undefined") {
            setWindowSize(window.innerWidth);

            window.addEventListener('resize' , function() {
                setWindowSize(this.innerWidth);
            })
        }
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
            <div className="w-full mt-10 lg:px-3">    
            <div className="flex justify-between items-center">
                <h3 className="text-lg sm:text-md font-bold text-gray-700">All Product</h3>
                <Link href="/product">
                    <button className="text-blue-500 text-[12px] font-semibold">See more</button>
                </Link>
            </div>
                <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 gap-4 mt-5 sm:mt-3">
                    {
                        loading ? (
                           arrayDummy.map((item : number) => <SkeletonProductCard key={item} />)
                        ) : (
                           products.map((product : IProductPromise , idx : number) => <ProductCard key={idx} loading={loading} product={product} />)
                        )
                    }
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default AllProduct;