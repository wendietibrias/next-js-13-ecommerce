"use client"
import { useAppDispatch,useAppSelector } from '@/hooks/redux.hook';
import { closeAlert, openAlert } from '@/slices/alert.slice';
import { useEffect,useState } from 'react';
import { clearCart } from '@/slices/cart.slice';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from "react-hook-form";
import { Alert } from '..';
import Loading from '../Loading';
import Input from "../Input";
import Select from "../Select";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CheckoutForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { open } = useAppSelector(state=>state.alert);
    const { carts } = useAppSelector(state=>state.cart);
    const { data:session,status } = useSession();
    const { register,handleSubmit,formState:{ errors },setValue,reset } = useForm();
    const [loading,setLoading] = useState<boolean>(false);

    const submitHandler = async (formData : any) => {
        setLoading(true);
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/checkout` , {...formData,detail:carts});
          if(data) {
             dispatch(clearCart());
             setLoading(false);
             dispatch(openAlert({
                 open:true,
                 variant:'success',
                 message:`${data?.message}, redirected to homepage...`
             }));
 
             reset();
             setTimeout(() => router.push("/") ,2000);
          }

        } catch(err : any) {
            const { response:{ data } } = err;
            dispatch(openAlert({
                 open:true,
                 variant:'error',
                 message:data.message
            }));
            setLoading(false);
        }

        setTimeout(() => dispatch(closeAlert()) ,5000);
    }

    useEffect(() => {
        if(status === "authenticated") {
            setValue('name' , session.user?.name);
            setValue('email' , session.user?.email)
        }
    },[session]);


    return (
        <form onSubmit={handleSubmit(submitHandler)} className="w-[600px] lg:mx-auto sm:mx-0 sm:w-full sm:order-1 bg-white rounded-md shadow-md shadow-gray-300 border border-gray-300 p-4">
           <div className="border-b border-gray-300 pb-2">
              <h4 className="text-[13px] font-bold text-gray-700">Payment Process</h4>
            </div> 
           <div className="grid grid-cols-2 gap-3 mt-5 mb-3 sm:grid-cols-1">
                <Input name="name" type="text" placeholder="Username" register={register} error={errors?.name ? true : false} showlable={false}/>
                <Input name="email" type="email" placeholder="Gmail" register={register} error={errors?.email ? true : false} showlable={false}/>
                <Input name="country" type="text" placeholder="Country" register={register} error={errors?.country ? true : false} showlable={false}/>
                <Input name="city" type="text" placeholder="City" register={register} error={errors?.city ? true : false} showlable={false}/>
                <Input name="address" type="text" placeholder="Address" register={register} error={errors?.address ? true : false} showlable={false}/>
                <Input name="phone" type="text" placeholder="Phone" register={register} error={errors?.phone ? true : false} showlable={false}/>
                <Select name="delivery" register={register} error={errors?.delivery ? true : false} items={["Ninja" , "J&T" , "J&T Express" , "J&T Economy", "Traveloka"]} />
                <Select name="paymentMethod" register={register} error={errors?.paymentMethod ? true : false} items={["Stripe" , "Midtrans" , "Xendit" , "Bank", "Credit Card"]} />
           </div>
           <Input name="cardNumber" type="text" placeholder="Card Number" register={register} error={errors?.cardNumber ? true : false} showlable={false}/>
           <button className="w-full mt-7 text-[13px] font-semibold py-3 flex justify-center items-center rounded-md bg-blue-500 text-white">
             {loading ? <Loading width={16} height={16} color="#fff"/> : "Proceed Payment"}
           </button>
        </form>
    )
}

export default CheckoutForm;