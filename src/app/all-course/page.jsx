"use client";
import CourseCard from "@/Components/CourseCard";
import useCourses from "@/hooks/UseCourse";
import { useSearchParams } from "next/navigation";

export default function CoursesList() {
  const { data, isLoading, isError } = useCourses();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  console.log("category", category);

  if (isLoading) return <p>Loading courses...</p>;
  if (isError) return <p>Failed to load courses.</p>;

  console.log("couese", data);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
      {data.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        data.map((course) => <CourseCard key={course._id} course={course} />)
      )}
    </div>
  );
}
