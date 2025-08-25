"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CourseCard({ course }) {
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  async function handleEnroll() {
    if (!userId) {
      alert("Please login to enroll");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course._id || course.id,
          studentId: userId,
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert(data?.error || "Failed to start payment");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="group relative flex flex-col  rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500">
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={400}
          height={250}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Price */}
        <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          ${course.price} {course.currency?.toUpperCase()}
        </span>

        {/* Category */}
        <span className="absolute bottom-3 left-3 bg-indigo-600/90 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
          {course.category}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
            {course.title}
          </h3>

          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
            {course.shortDescription}
          </p>
        </div>

        {/* Enroll Button - always bottom */}
        <div className="mt-3">
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="w-full bg-indigo-700 text-white py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Redirecting..." : "Enroll Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
