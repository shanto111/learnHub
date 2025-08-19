"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res.error || "Invalid credentials",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-xl p-10 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              autoComplete="off"
              className={`peer w-full px-3 pt-4 pb-2 border rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-200 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=" "
              {...register("email", { required: "Email is required" })}
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-1 text-gray-500 text-xs font-medium transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:font-medium bg-white px-1"
            >
              Email Address
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`peer w-full px-3 pt-4 pb-2 border rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-200 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=" "
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-1 text-gray-500 text-xs font-medium transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:font-medium bg-white px-1"
            >
              Password
            </label>

            <span
              className="absolute right-3 top-3.5 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full border bg-gray-50 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
        >
          <FaGoogle className="w-5 h-5 text-[#0F9D58]" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-gray-900 font-medium hover:underline transition-all duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
