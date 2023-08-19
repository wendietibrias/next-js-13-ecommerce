"use client"
import axios from 'axios';
import CheckoutItemCard from '@/components/checkout/CheckoutItemCard';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useEffect,useState } from 'react';
import { useParams,redirect,useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { ITransactionResponse,TransactionDetails } from '@/interfaces/transaction.interface';
import convertMoney from '@/utils/convertMoney';
import SkeletonProductCard from '@/components/skeleton/SkeletonProductCard';

const arrayDummy = [1,2,3,4];

const TransactionDetailitems = () => {
    const { data:session,status } = useSession();
    const searchParams = useParams();
    const router = useRouter();

    const [loading,setLoading] = useState<boolean>(true);
    const [transaction,setTransaction] = useState<ITransactionResponse | null>(null);

    const fetchTransactionDetail = async () => {
         try {

            if(status === "authenticated") {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/detail/${searchParams.id}`);
                if(data && data.data) {
                   setTransaction(data.data);
                   setLoading(false);
                }
            }

         } catch(err) {
            return router.push("/transaction/history");
         }
    }

    useEffect(() => {
        fetchTransactionDetail();
    },[status])

    if(status === "unauthenticated") {
        return redirect("/");
    }

    if(loading === false && !transaction) {
        return (
            <div>No Detail</div>
        )
    }

    return (
        <SkeletonTheme baseColor="#ecf0f1" highlightColor="#fff">
        <div className="w-full flex items-start lg:flex-col lg:gap-y-7 gap-x-10">
           <div className="flex-1 lg:w-full">
             {loading ? <Skeleton width="100px" height="15px"/> : <h3 className="text-lg font-semibold text-gray-700">Order products</h3>}
             <div className="grid grid-cols-2 gap-4 mt-5">
                {loading ? (
                    arrayDummy.map((item : number) => <SkeletonProductCard key={item}/>)
                ) : (
                    Array.isArray(transaction?.detail) && transaction?.detail.map((transaction : TransactionDetails, idx : number) => <CheckoutItemCard item={{...transaction,slug:null}} key={idx} />)
                )}
             </div>
           </div>
           <div className="w-[600px] lg:mx-auto sm:w-full bg-white border shadow-md shadow-gray-300 border-gray-300 rounded-md p-4">
           {loading ? <Skeleton width="100%" height="15px" /> : <h3 className="text-sm text-gray-700 font-semibold pb-2 border-b border-gray-300">Order Summary</h3> }
           {loading ? (
              <div className="py-5 flex flex-col gap-y-2">
                 <Skeleton count={4} width="100%" height="12px"/>
              </div>
           ) : (
            <div className="py-5 flex flex-col gap-y-2">
                <p className=" font-medium text-[13px] text-gray-500">To : {transaction?.address}</p>
                <p className=" font-medium text-[13px] text-gray-500">Name : {transaction?.name}</p>
                <p className=" font-medium text-[13px] text-gray-500">Email : {transaction?.email}</p>
                <p className=" font-medium text-[13px] text-gray-500">Delivery : {transaction?.delivery}</p>
                <p className=" font-medium text-[13px] text-gray-500">Payment Method : {transaction?.paymentMethod}</p>
             </div>
           )}
             <div className="border-t border-gray-300 pt-3 flex items-center justify-between text-gray-700">
                {loading ? <Skeleton width="100px" height="15px" /> : <h3 className="text-lg font-bold">Total</h3>}
                {loading ? <Skeleton width="100px" height="15px" /> : <h3 className="text-lg font-bold text-blue-500">{convertMoney(Number(transaction?.grandTotal))}</h3>}
             </div>
           </div>
        </div>
        </SkeletonTheme>
    )
}

export default TransactionDetailitems;