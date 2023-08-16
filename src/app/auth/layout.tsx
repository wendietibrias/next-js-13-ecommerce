import type { Metadata } from "next";

export const metadata : Metadata = {
   title:"WMART | Auth"
}

export default function AuthLayout({ children } : { children:React.ReactNode }) {
     return (
        <div className="w-full h-screen flex items-start">
            <div className="flex-1 h-screen flex justify-center items-center">{children}</div>
            <div className="w-[50%] h-screen relative" style={{ backgroundImage:`url("/assets/images/auth-bg.jpg")`,backgroundSize:"cover",backgroundPosition:"center" }}>
               <div className="w-full h-full bg-gray-700/50  flex justify-center items-center">
                 <h2 className="text-center text-3xl font-bold text-white">WMART STORE</h2>
               </div>
            </div>
        </div>
     )
}