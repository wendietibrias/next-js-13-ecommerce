"use client"
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react";
import Link from "next/link";

const Auth = () => {

    const loginGoogleHandler = async () => {
        try {
           await signIn("google" , { redirect:true,callbackUrl:process.env.NEXT_PUBLIC_CALLBACK_URL });
        } catch(err : any) {
            const { response:{ data } } = err;
            return toast.error(data?.message, {
                position:'top-center',
                duration:5000
            });
        }
    }

    return (
        <div className="w-[600px] sm:w-full sm:px-3">
            <h2 className="text-xl font-bold text-center text-gray-700 mb-7">WMART Authentication</h2>
            <div className="flex flex-col gap-y-4">
                <button onClick={loginGoogleHandler} className="w-full border bg-white border-gray-300 p-3 rounded-md text-[13px] text-gray-700 font-semibold flex items-center justify-center gap-x-2">
                    <FcGoogle className="text-lg"/>
                    Sign with Google
                </button>
                <Link href="/auth/login"><button className="w-full bg-blue-500 text-[13px] font-semibold text-white p-3 rounded-md">Sign with Gmail</button></Link>
            </div>
            <Toaster/>
        </div>
    )
}

export default Auth;