"use client"
import { useAppSelector,useAppDispatch } from "@/hooks/redux.hook";
import { closeAlert } from "@/slices/alert.slice";

const Alert = () => {
  const dispatch = useAppDispatch();
  const { message,variant,open } = useAppSelector(state=>state.alert);

  if(!open) return;

  return (
    <div className={`w-full py-2 px-3 rounded-md flex justify-between items-center ${open && "mb-5"} ${variant === 'success' ? 'bg-green-100 text-green-500' : 'bg-rose-100 text-rose-500'}`}>
        <h5 className="text-[13px] font-semibold">{message}</h5>
        <button onClick={() => dispatch(closeAlert())} className="text-sm font-bold">x</button>
    </div>
  )
}

export default Alert