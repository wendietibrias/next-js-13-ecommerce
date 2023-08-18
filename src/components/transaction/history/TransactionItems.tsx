"use client"
import { useEffect,useState } from 'react';
import { ITransactionResponse } from '@/interfaces/transaction.interface';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AiOutlineEye } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import convertMoney from '@/utils/convertMoney';

const arrayDummy = [1,2,3,4];

const TransactionItems = () => {
   const [loading,setLoading] = useState<boolean>(true);
   const [transactions,setTransactions] = useState<ITransactionResponse[]>([]);
   const [windowSize,setWindowSize] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

   const fetchTransactions = async () => {
      try {
         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/history`);
         if(data && data.data) {
             setTransactions(data.data);
             setLoading(false);
         }

      } catch(err : any) {
          const { response:{ data } } = err;
          toast.error(data.message, {
            position:'top-center',
            duration:5000
          });
          setLoading(false);
      }
   }

   useEffect(() => {
      fetchTransactions();
   },[]);

   if(!Array.isArray(transactions)) {
      return (
        <div className="w-full py-8">
            <h3 className="text-lg text-gray-700 text-center font-semibold">No transactions found</h3>
        </div>
      )
   }


   return (
     <SkeletonTheme baseColor="#ecf0f1" highlightColor="#fff">
        <div className="py-8">
            <h3 className="text-lg font-bold text-gray-700 mb-5">Transaction history ({transactions.length})</h3>
            <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
                {loading ? (
                    arrayDummy.map((item : number) => (
                         <Skeleton key={item} width="100%" height="150px" />
                    ))
                ) : (
                    transactions && Array.isArray(transactions) && transactions.map((transaction : ITransactionResponse , idx : number) => (
                    <div key={idx} className="w-full rounded-md border p-4 border-gray-300 shadow-md shadow-gray-300">
                        <div className="flex justify-between items-center">
                            <h5 className="text-[17px] font-bold text-gray-700">Total {convertMoney(Number(transaction.grandTotal))}</h5>
                            <button className="text-[12px] text-blue-500 font-semibold flex items-center gap-x-2">
                                <AiOutlineEye className="text-[18px]"/>
                                See detail
                            </button>
                        </div>
                        <p className="text-[13px] text-gray-400 mt-1">{transaction.detail.length} products</p>
                        <p className="text-[13px] text-gray-400">{transaction.paymentMethod}</p>
                    </div>
                ))
                )}
            </div>
        </div>
     </SkeletonTheme>
   )
}

export default TransactionItems;