"use client";
import { useRouter, redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/hooks/redux.hook";
import { useState } from "react";
import { closeAlert, openAlert } from "@/slices/alert.slice";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Loading from "../Loading";
import Input from "../Input";

const LoginForm = () => {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const submitHandler = async (formData: any) => {
    setLoading(true);

    try {
      const loginHandler = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      if (loginHandler?.error) {
        dispatch(
          openAlert({
            open: true,
            message: loginHandler.error,
            variant: "error",
          })
        );
      }

      setLoading(false);
    } catch (err: any) {
      const {
        response: { data },
      } = err;
      console.log(data);
    }

    setTimeout(() => dispatch(closeAlert()), 6000);
  };

  if (status === "authenticated") {
    return redirect("/");
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full mt-7 flex flex-col gap-y-3"
    >
      <Input
        showlable={true}
        register={register}
        name="email"
        placeholder="example@gmail.com"
        error={errors?.email ? true : false}
        type="email"
      />
      <Input
        showlable={true}
        register={register}
        name="password"
        placeholder="Password"
        error={errors?.password ? true : false}
        type="password"
      />
      <button className="w-full bg-blue-500 mt-4 text-white p-3 rounded-md font-semibold text-[13px] flex justify-center items-center">
        {loading ? <Loading width={16} height={16} color="#fff" /> : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
