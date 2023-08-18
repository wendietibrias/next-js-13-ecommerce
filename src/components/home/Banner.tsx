"use client"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useEffect, useState } from "react";
import { IBannerPromise } from "@/interfaces/banner.interface";
import { sanityClient } from "@/utils/sanityClient";
import toast , { Toaster } from "react-hot-toast";
import urlFor from "@/utils/sanityImage";
import Slider from "react-slick";

const Banner = () => {
    const [loading,setLoading] = useState<boolean>(true);
    const [bannerItems,setBannerItems] = useState<IBannerPromise[]>([]);

     const settings = {
       dots: true,
       infinite: true,
       speed: 500,
       slidesToShow: 1,
       slidesToScroll: 1,
       autoplay:true
    };

    const getAllBanner = async () => {
        try {
          const banners = await sanityClient.fetch(`*[_type == "banner"]`);
          if(banners) {
            setBannerItems(banners);
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
        getAllBanner();
    },[]);

    if(loading) {
        return (
          <SkeletonTheme baseColor="#ecf0f1" highlightColor="#fff">
            <div className="w-full">
              <Skeleton count={1} width="100%" height={400} containerClassName='rounded-lg' />
            </div>
         </SkeletonTheme>
        )
    }

    if(bannerItems.length < 1 && !loading) {
       return (
         <div className="w-full rounded-lg flex justify-center h-[400px] items-center bg-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-400">NO BANNERS</h2>
         </div>
       )
    }

    return (
        <div className="w-full">
          <Slider {...settings}>
           {bannerItems.map((banner : IBannerPromise , idx : number) => (
             <div className={`w-full relative overflow-hidden`} key={idx}>
               <img src={urlFor(banner.thumbnail.asset._ref).url()} alt={banner.title} className="w-full object-cover rounded-lg lg:rounded-none h-[400px]"/>
               <div className="w-full absolute top-0 left-0 rounded-lg sm:rounded-none bg-gray-700/50 flex h-full items-center">
                 <div className="w-full text-white px-10 sm:px-3">
                   <h2 className="text-3xl sm:text-xl font-extrabold capitalize">{banner.title}</h2>
                   <p className="text-sm text-white sm:text-[13px] sm:mt-1 font-medium mt-3">{banner.description}</p>
                   <button className="bg-white p-3 mt-7 sm:mt-5 rounded-md text-gray-700 text-[13px] font-semibold">Explore Now</button>
                 </div>
               </div>
             </div>
           ))}
          </Slider>
          <Toaster/>
        </div>
    )
}

export default Banner;