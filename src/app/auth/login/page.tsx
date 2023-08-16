import type { Metadata } from 'next';
import { Alert, LoginForm } from '@/components';
import Link from "next/link";

export const metadata : Metadata = {
    title:"WMART | Credential Login"
}

const CredentialLogin = () => {
    return (
        <div className="w-[600px]">
            <Alert/>
            <h2 className="text-2xl text-gray-700 font-bold">Welcome back</h2>
            <p className="text-[13px] text-gray-400 mt-2">Complete your credentials login and start your shopping journey</p>
            <LoginForm/>
            <p className="text-gray-400 text-center text-[13px] font-medium mt-3">Don't have account? <Link href="/auth/register"><span className="text-blue-500 font-semibold">Register</span></Link></p>
        </div>
    )
}

export default CredentialLogin;