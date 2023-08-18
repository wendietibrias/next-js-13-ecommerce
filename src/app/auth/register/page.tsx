import { RegisterForm,Alert } from "@/components";
import { Toaster } from 'react-hot-toast';
import type { Metadata } from "next";
import Link from "next/link";

export const metadata : Metadata = {
    title:"WMART | Register"
}

const Register = () => {
   return (
     <div className="w-[600px] sm:w-full sm:px-5">
        <Alert/>
         <h2 className="text-2xl text-gray-700 font-bold">Create Account</h2>
         <p className="text-[13px] text-gray-400 mt-2">Complete your profile and start your shopping journey</p>
         <RegisterForm/>
         <p className="text-gray-400 text-center text-[13px] font-medium mt-3">Already have account? <Link href="/auth/login"><span className="text-blue-500 font-semibold">Login</span></Link></p>
         <Toaster/>
     </div>
   )
}

export default Register;