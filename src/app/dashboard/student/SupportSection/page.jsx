"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function SupportSection() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/student/support", data);
      alert("✅ Complaint submitted successfully!");
      reset();
    } catch (error) {
      alert("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl rounded-2xl p-8 border border-blue-100">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Support & Complaints
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Have an issue? Let us know, and we’ll assist you quickly.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Subject
            </label>
            <input
              type="text"
              {...register("subject", { required: true })}
              placeholder="Enter subject"
              className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Category
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Category --</option>
              <option value="technical">⚙️ Technical Issue</option>
              <option value="payment">💳 Payment Issue</option>
              <option value="course">📚 Course Related</option>
              <option value="other">📝 Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Your Complaint
            </label>
            <textarea
              {...register("message", { required: true })}
              placeholder="Write your complaint..."
              className="textarea textarea-bordered w-full h-32 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
            {!loading && <FiSend className="ml-2 text-lg" />}
          </button>
        </form>
      </div>
    </div>
  );
}
