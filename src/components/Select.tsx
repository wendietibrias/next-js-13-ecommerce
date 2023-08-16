type SelectProps = {
    name:string;
    items:string[];
    register:any;
    error:boolean;
}

const Select = ({
  name,
  items,
  register,
  error,
} : SelectProps) => {
    return (
        <div className="w-full flex gap-y-2">
            <select {...register(name, { required:true })} name={name} className={`outline-none text-gray-500 text-[13px] w-full border ${error ? "border-rose-500" : "border-gray-300"} p-3 rounded-md `}>
                {items.map((item : string , idx : number) => <option key={idx} value={item} className="capitalize">{item}</option>)}
            </select>
            {error && <p className={`text-rose-500 text-[12px] font-semibold mt-1`}>{name} field is required</p>}
        </div>
    )
}

export default Select;