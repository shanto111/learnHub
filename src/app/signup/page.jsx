"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("/api/register", data);
      Swal.fire(
        "Success!",
        "Signup successful. You can now log in.",
        "success"
      );
      reset();
      router.push("/login");
    } catch {
      Swal.fire("Error!", "Signup failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <select
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
              {...register("role", { required: "Role is required" })}
              defaultValue=""
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="loader border-t-2 border-white rounded-full w-4 h-4 animate-spin"></span>
            )}
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t"></div>
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-gray-900 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
