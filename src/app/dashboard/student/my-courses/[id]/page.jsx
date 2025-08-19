"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export default function CourseLecturesPage() {
  const params = useParams();
  const courseId = params.id;

  const {
    data: lectures = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course-lectures", courseId],
    queryFn: async () => {
      const res = await axios.get(`/api/student/courses/${courseId}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading lectures...</div>;
  if (error) return <div>Error loading lectures.</div>;
  if (!lectures.length) return <div>No lectures available yet.</div>;

  return (
    <div className="space-y-4">
      {lectures.map((lec) => (
        <div key={lec._id} className="border rounded p-4 shadow">
          <h3 className="text-lg font-semibold">{lec.title}</h3>
          <p className="text-sm mt-1">{lec.description}</p>
          {lec.videoUrl && (
            <video controls className="w-full mt-2 rounded">
              <source src={lec.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </div>
  );
}
