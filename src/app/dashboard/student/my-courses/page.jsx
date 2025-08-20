"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaCertificate, FaClock } from "react-icons/fa";

export default function MyCoursesPage() {
  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-courses"],
    queryFn: async () => {
      const res = await axios.get("/api/student/courses");
      return res.data;
    },
    staleTime: 1000 * 60, // optional
  });

  const calcProgress = (course) => {
    // Prefer server-provided enrollment.progress (safe-guard & cap to 100)
    const enrollment = course.enrollment || {};
    if (typeof enrollment.progress === "number") {
      return Math.min(100, Math.max(0, Math.round(enrollment.progress)));
    }

    // Fallback: count completedLectures vs course.lectures (if available)
    const lectures = Array.isArray(course.lectures) ? course.lectures : [];
    const completed = Array.isArray(enrollment.completedLectures)
      ? new Set(enrollment.completedLectures.map(String))
      : new Set();

    if (!lectures.length) return 0;
    const completedCount = lectures.reduce(
      (acc, lec) => acc + (completed.has(String(lec._id)) ? 1 : 0),
      0
    );
    const pct = Math.round((completedCount / lectures.length) * 100);
    return Math.min(100, Math.max(0, pct));
  };

  if (isLoading)
    return (
      <div className="p-6 grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-white rounded-lg p-4 shadow">
            <div className="h-40 bg-gray-200 rounded mb-3" />
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-8 bg-gray-200 rounded w-2/3" />
          </div>
        ))}
      </div>
    );

  if (error)
    return <div className="p-6 text-red-600">Error loading your courses.</div>;

  if (!courses.length)
    return <div className="p-6 text-gray-600">No courses yet. Buy one!</div>;

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {courses.map((course) => {
        const progress = calcProgress(course);
        const purchasedAt =
          course.enrollment?.purchasedAt ||
          course.enrollment?.purchaseDate ||
          null;
        const dateStr = purchasedAt
          ? new Date(purchasedAt).toLocaleDateString()
          : null;

        return (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
          >
            <div className="h-44 w-full overflow-hidden">
              <img
                src={course.thumbnail || "/placeholder-course.png"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {course.title}
              </h3>

              {course.instructorName && (
                <p className="text-sm text-gray-500 mt-1">
                  By {course.instructorName}
                </p>
              )}

              {dateStr && (
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-2">
                  <FaClock /> <span>{dateStr}</span>
                </p>
              )}

              {/* progress bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm text-gray-600">Progress</div>
                  <div className="text-sm font-medium text-gray-700">
                    {progress}%
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all`}
                    style={{
                      width: `${progress}%`,
                      background: progress === 100 ? "#16a34a" : "#2563eb",
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {course.enrollment?.completedLectures
                    ? `${
                        (course.enrollment.completedLectures || []).length
                      } completed`
                    : ""}
                </div>
              </div>

              {/* actions */}
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/dashboard/student/my-courses/${course._id}`}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
                >
                  Continue learning
                </Link>

                <button
                  onClick={() => {
                    // adjust certificate route if you use different path
                    window.location.href = `/dashboard/student/certificate/${course._id}`;
                  }}
                  disabled={progress < 100}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                    progress >= 100
                      ? "bg-amber-500 text-white hover:brightness-90"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FaCertificate />
                  {progress >= 100 ? "Get Certificate" : "Certificate locked"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
