import { useQuery } from "@tanstack/react-query";

const fetchCourse = async () => {
  const res = await fetch("http://localhost:3000/api/student/all-course");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export default function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourse,
  });
}
