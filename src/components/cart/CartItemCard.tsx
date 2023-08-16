import { removeCart,updateQty } from "@/slices/cart.slice";
import { ICartState } from "@/interfaces/cart.interface";
import { useAppDispatch } from "@/hooks/redux.hook";
import { FiTrash } from 'react-icons/fi';
import convertMoney from "@/utils/convertMoney"

type CartItemCardProps = {
   cart:ICartState
}

const CartItemCard = ({
  cart 
} : CartItemCardProps) => {
  const dispatch = useAppDispatch();

  const removeCartHandler = () => {
      dispatch(removeCart(cart.slug));
  }

  const updateQtyHandler = (type : string) => {
      dispatch(updateQty({ slug:cart.slug, type:type,qty:cart.qty }));
  }

  return (
    <div className="w-full shadow-md shadow-gray-300 p-4 rounded-lg">
       <div className="w-full rounded-lg h-[220px] bg-gray-100 flex justify-center items-center">
         <img src={cart.thumbnail} alt={cart.slug} className="w-[60%]"/>
       </div>
       <div className="pt-4">
         <div className="flex justify-between items-center">
            <h4 className="text-[12px] font-semibold  text-gray-700">{cart.title}</h4>
             <h4 className="text-[12px] font-bold text-blue-500">{convertMoney(cart.price)}</h4>
         </div>
         <p className="text-[12px] text-gray-400 mt-1">{cart.category}</p>
         <div className="w-full flex justify-between items-center mt-3">
           <button onClick={removeCartHandler} className="text-[12px] font-semibold text-rose-500 flex items-center gap-x-2">
              <FiTrash/>
              Remove
           </button>
           <div className="flex items-center gap-x-3">
             <button onClick={() => updateQtyHandler("decrease")} className="text-blue-500 font-semibold text-md">-</button>
              <span className="text-gray-700 text-[13px] font-bold">{cart.qty}</span>
             <button  onClick={() => updateQtyHandler("increase")} className="text-blue-500 font-semibold text-md">+</button>

           </div>
         </div>
       </div>
    </div>
  )
}

export default CartItemCard