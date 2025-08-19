"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

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
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses.</div>;
  if (!courses.length) return <div>No courses yet. Buy one!</div>;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div key={course._id} className="border rounded p-4 shadow">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
          <p className="text-sm mt-1">
            {course.enrollment?.purchasedAt
              ? new Date(course.enrollment.purchasedAt).toLocaleDateString()
              : ""}
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              href={`/dashboard/student/my-courses/${course._id}/`}
              className="btn"
            >
              Continue learning
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
