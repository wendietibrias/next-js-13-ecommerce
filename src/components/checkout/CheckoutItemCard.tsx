import { ICartState } from "@/interfaces/cart.interface";
import convertMoney from "@/utils/convertMoney";

type CheckoutItemCardProps = {
    item:ICartState
}

const CheckoutItemCard = ({
   item
} : CheckoutItemCardProps) => {
  return (
      <div className="w-full p-4 rounded-lg shadow-md shadow-gray-300">
        <div className="w-full bg-gray-100 h-[220px] rounded-lg flex justify-center items-center">
            <img src={item.thumbnail} alt={item.slug} className="w-[60%]"/>
        </div>
        <div className="pt-4">
            <div className="flex justify-between items-center">
                <h4 className="text-[12px] font-semibold text-gray-700">{item.title}</h4>
                <h5 className="text-[12px] font-bold text-blue-500">{convertMoney(Number(item.price))}</h5>
            </div>
            <p className="text-[12px] text-gray-500 mt-1">Quantity {item.qty}</p>
        </div>
    </div>
  )
}

export default CheckoutItemCard