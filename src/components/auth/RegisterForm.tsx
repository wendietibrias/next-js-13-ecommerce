"use client";
import { useRouter, redirect } from "next/navigation";
import { closeAlert, openAlert } from "@/slices/alert.slice";
import { useAppDispatch } from "@/hooks/redux.hook";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "../Input";
import Loading from "../Loading";
import { useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (formData: any) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`,
        formData
      );
      if (data && data.status === 200) {
        dispatch(
          openAlert({
            open: true,
            message: data.message,
            variant: "success",
          })
        );

        setLoading(false);
        setTimeout(() => router.push("/auth/login"), 3000);
      }
    } catch (err: any) {
      const {
        response: { data },
      } = err;
      dispatch(
        openAlert({
          open: true,
          message: data.message,
          variant: "error",
        })
      );
      setLoading(false);
    }

    setTimeout(() => dispatch(closeAlert()), 5000);
  };

  if (status === "loading") {
    return <div>Authenticating User...</div>;
  }

  if (status === "authenticated") {
    return redirect("/");
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="mt-7 flex flex-col gap-y-3"
    >
      <Input
        name="name"
        register={register}
        type="text"
        showlable={true}
        error={errors?.name ? true : false}
        placeholder="Username"
      />
      <Input
        name="email"
        register={register}
        type="email"
        showlable={true}
        error={errors?.email ? true : false}
        placeholder="Example@gmail.com"
      />
      <Input
        name="password"
        register={register}
        type="password"
        showlable={true}
        error={errors?.password ? true : false}
        placeholder="Password"
      />
      <Input
        name="confirm"
        register={register}
        type="password"
        showlable={true}
        error={errors?.confirm ? true : false}
        placeholder="Confirm"
      />
      <button className="w-full bg-blue-500 mt-4 text-white p-3 rounded-md font-semibold text-[13px] flex justify-center items-center">
        {loading ? <Loading width={16} height={16} color="#fff" /> : "Sign up"}
      </button>{" "}
    </form>
  );
};

export default RegisterForm;
