import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPassword } from "../api/auth-api";
import {
  resetPasswordSchema,
  type ResetPasswordForm,
} from "../validation/reset-password-schema";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      if (!token) {
        setMessage("Token is missing!");
        return;
      }
      console.log(import.meta.env.VITE_BASE_URL);

      const result = await resetPassword({
        token,
        password: data.password,
      });

      setMessage(result.message);
    } catch (error: any) {
      setMessage(error?.response?.data?.errors || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen max-w-full flex justify-center items-center p-3 box-border bg-gray-300">
      <div className="p-3 sm:p-6 md:p-10 bg-slate-100 shadow rounded-xl ">
        <h2 className="font-bold text-center text-xl mb-8 sm:text-2xl md:text-3xl">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="text-lg text-center">New Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full  px-1 py-0.5 focus:outline-none bg-slate-200 rounded-sm"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-7">
            <label className="text-lg">Confirm New Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full  px-1 py-0.5 focus:outline-none bg-slate-200 rounded-sm"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full cursor-pointer px-1  focus:outline-none rounded-md bg-green-400 text-white py-2"
          >
            {isSubmitting ? "Processing..." : "Confirm Password"}
          </button>
        </form>

        {message && <p className="text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
}
