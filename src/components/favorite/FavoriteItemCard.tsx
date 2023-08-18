import { IFavoriteState } from "@/interfaces/favorite.interface";
import { FiTrash } from "react-icons/fi";
import { useAppDispatch } from "@/hooks/redux.hook";
import { useRouter } from 'next/navigation';
import { removeFavorite } from "@/slices/favorite.slice";
import convertMoney from "@/utils/convertMoney";

type FavoriteItemCardProps = {
    favorite:IFavoriteState
}

const FavoriteItemCard = ({
  favorite
} : FavoriteItemCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const removeFavoriteHandler = () => {
     dispatch(removeFavorite(favorite.slug));
  }

  const navigateHandler = (e : any) => {
    if(e.target.tagName === "BUTTON") return;
    router.push(`/product/${favorite.slug}`);
  }

  return (
    <div onClick={navigateHandler} className="w-full p-4 cursor-pointer rounded-lg shadow-md shadow-gray-300">
        <div className="w-full bg-gray-100 h-[220px] sm:h-[170px] xs:h-[150px] overflow-hidden rounded-lg flex justify-center items-center">
            <img src={favorite.thumbnail} alt={favorite.slug} className="w-[60%] xs:w-[55%]"/>
        </div>
        <div className="pt-4">
            <div className="flex justify-between sm:flex-col sm:items-start items-center">
                <h4 className="text-[12px] sm:w-[100px] sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap font-semibold text-gray-700">{favorite.title}</h4>
                <h5 className="text-[12px] font-bold text-blue-500">{convertMoney(Number(favorite.price))}</h5>
            </div>
             <button onClick={removeFavoriteHandler} className="text-[12px] font-semibold mt-2 text-rose-500 flex items-center gap-x-2">
              <FiTrash/>
              Remove
           </button>
        </div>
    </div>
  )
}

export default FavoriteItemCard