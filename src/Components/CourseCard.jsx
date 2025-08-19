"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CourseCard({ course }) {
  const [loading, setLoading] = useState(false);

  // ✅ সঠিক বানান: session
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
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="relative overflow-hidden rounded-t-2xl">
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={400}
          height={250}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {course.price} {course.currency?.toUpperCase() || ""}
        </span>
        <span className="absolute bottom-3 left-3 bg-blue-600/90 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
          {course.category}
        </span>
      </div>

      <div className="p-6 text-center">
        <h3 className="text-lg font-bold mb-1 text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
          {course.title}
        </h3>

        <p className="text-blue-600 text-sm mb-2 font-medium">
          {course.instructor}
        </p>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {course.shortDescription}
        </p>

        <div className="flex justify-center items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <FaStar
              key={idx}
              className={
                idx < Math.floor(course.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <p className="text-gray-500 text-xs mb-5">
          {course?.students?.toLocaleString()} students enrolled
        </p>

        <button
          onClick={handleEnroll}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-2.5 rounded-full font-medium shadow-md hover:shadow-lg disabled:opacity-60"
        >
          {loading ? "Redirecting..." : "এনরোল করুন"}
        </button>
      </div>
    </div>
  );
}
