type InputProps = {
    name:string;
    type:string;
    placeholder:string;
    register:any;
    error:boolean;
    showlable:boolean
}

const Input = ({
  name,
  type,
  placeholder,
  register,
  error,
  showlable
} : InputProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2">
         {showlable && <label className="text-[13px] text-gray-500 font-medium capitalize">{name}</label>}
         <input {...register(name , { required:true })} placeholder={placeholder} type={type} name={name} className={`w-full p-3 rounded-md border text-[13px] ${error ? "border-rose-500" : "border-gray-300"} outline-none`}/>
         {error && <p className="text-[12px] font-semibold  text-rose-500">{name} field is required</p>}
    </div>
  )
}

export default Input