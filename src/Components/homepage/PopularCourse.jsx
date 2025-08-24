"use client";

import CoursesList from "@/app/dashboard/student/all-course/page";
import Link from "next/link";

export default function PopularCoursePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-2">Popular Courses</h2>
      <p className="text-center text-gray-500 mb-8">
        Enhance your skills with our top-rated courses
      </p>

      <CoursesList></CoursesList>
    </div>
  );
}
