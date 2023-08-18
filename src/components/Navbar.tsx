"use client"

import Link from "next/link"; 
import { AiOutlineHeart,AiOutlineLogout } from 'react-icons/ai';
import { MdOutlinePayment } from 'react-icons/md';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from "next-auth/react"
import { FiShoppingCart } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
import { useAppSelector } from "@/hooks/redux.hook";
import { useRouter } from 'next/navigation';

const token = null;

const Navbar = () => {
   const [openDropdown,setOpenDropdown] = useState<boolean>(false);
   const { carts } = useAppSelector(state=>state.cart);
   const { favorites } = useAppSelector(state=>state.favorite);
   const { data: session,status } = useSession();

   const router = useRouter();
   
   return (
     <nav className="w-full relative pt-4 pb-3 sm:pb-4 lg:px-3 border-b border-gray-300 flex justify-between items-center">
       <Link href="/">
         <span className="font-extrabold block text-gray-700 text-[22px]">WMART</span>
       </Link>
       <div className="flex items-center gap-x-4">
         <Link href="/cart">
           <button className="relative">
               <FiShoppingCart className="text-lg text-gray-700"/>
               <span className="bg-rose-500 absolute -top-2 -right-2 flex justify-center items-center w-[16px] h-[16px] rounded-full text-white font-semibold text-[11px]">{carts && Array.isArray(carts) ? carts.length : 0}</span>
           </button>
         </Link>
           <Link href="/favorite">
           <button className="relative text-gray-700">
               <AiOutlineHeart className="text-lg"/>
               <span className="bg-rose-500 absolute -top-2 -right-2 flex justify-center items-center w-[16px] h-[16px] rounded-full text-white font-semibold text-[11px]">{favorites && Array.isArray(favorites) ? favorites.length : 0}</span>
           </button>
         </Link>
         {status === "authenticated" ? (
           <button onClick={() => setOpenDropdown(!openDropdown)} className="flex items-center gap-x-1 mb-2 text-gray-700">
           <BiUserCircle className="text-xl text-gray-700" />
           <span className="text-[12px] font-semibold text-gray-700">{session.user?.name}</span>
         </button>
         ) : (
           <Link href={status === "loading" ? "/" : "/auth"}>
              <button className="text-white font-semibold capitalize bg-blue-500 text-[12px] ml-3 rounded-md py-2 px-3">Sign in</button>
           </Link>
         )}
       </div>
       {status === "authenticated" && openDropdown && (
          <div className="flex flex-col gap-y-3 absolute -bottom-[70px] border border-gray-300 z-[999] right-1 bg-white rounded-md w-[250px] py-4 px-3">
          <button onClick={() => signOut()} className="text-[12px] text-gray-700 font-semibold flex items-center gap-x-3">
            <AiOutlineLogout className="text-lg"/>
            Logout
          </button>
            <button onClick={() => router.push("/transaction/history")} className="text-[12px] text-gray-700 font-semibold flex items-center gap-x-3">
            <MdOutlinePayment className="text-lg"/>
            Transactions
          </button>
        </div>
       )}
     </nav>
   )
}

export default Navbar;