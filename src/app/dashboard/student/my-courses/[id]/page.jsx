"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaPlayCircle, FaLock, FaCheckCircle } from "react-icons/fa";

export default function CourseLecturesPage() {
  const { id: courseId } = useParams();
  const [activeLecture, setActiveLecture] = useState(null);
  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    data: rawData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course-lectures", courseId],
    queryFn: async () => {
      const res = await axios.get(`/api/student/courses/${courseId}`);
      return res.data;
    },
    enabled: !!courseId,
  });

  const lectures = (() => {
    if (!rawData)
      return {
        course: {},
        lectures: [],
        enrollment: { progress: 0, completedLectures: [] },
      };
    if (Array.isArray(rawData)) {
      if (rawData.length && rawData[0] && Array.isArray(rawData[0].lectures)) {
        return rawData[0].lectures;
      }
      return rawData; // assume it's already lectures array
    }
    // rawData is object
    if (Array.isArray(rawData.lectures)) return rawData.lectures;
    return [];
  })();

  const enrollment = (() => {
    if (!rawData) return { progress: 0, completedLectures: [] };
    if (Array.isArray(rawData) && rawData[0] && rawData[0].enrollment)
      return rawData[0].enrollment;
    if (rawData.enrollment) return rawData.enrollment;
    return { progress: 0, completedLectures: [] };
  })();

  const completedLectures = (enrollment.completedLectures || []).map(String);
  const progress = enrollment.progress ?? 0;

  // auto-select first lecture after lectures load
  useEffect(() => {
    if (!activeLecture && lectures.length) setActiveLecture(lectures[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectures]);

  // mark-complete mutation
  const markComplete = useMutation({
    mutationFn: async (lectureId) => {
      const res = await axios.post(
        `/api/student/courses/${courseId}/lectures/${current._id}`
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["course-lectures", courseId]);
    },
  });

  const onVideoEnd = (lec) => {
    if (!lec) return;
    const id = String(lec._id);
    if (completedLectures.includes(id)) return;
    markComplete.mutate(id);
  };

  if (isLoading) return <div className="p-6">Loading lectures...</div>;
  if (error)
    return <div className="p-6 text-red-600">Error loading lectures</div>;
  if (!lectures.length) return <div className="p-6">No lectures yet</div>;

  const current = activeLecture || lectures[0];

  return (
    <div className="p-4 lg:flex gap-6">
      <div className="flex-1 bg-white p-4 rounded shadow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaPlayCircle className="text-blue-600" />
              {current?.title || "Select a lecture"}
            </h2>
            <p className="text-sm text-gray-500">
              {/* optional course title */}
            </p>
          </div>

          <div className="w-48">
            <div className="text-xs mb-1">Course progress: {progress}%</div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  background: progress === 100 ? "#16a34a" : "#2563eb",
                }}
              />
            </div>
          </div>
        </div>

        {current ? (
          <video
            key={String(current._id)}
            controls
            className="w-full rounded-md bg-black"
            preload="metadata"
            onEnded={() => onVideoEnd(current)}
          >
            <source src={current.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="py-12 text-center text-gray-500">
            Please select a lecture from the list.
          </div>
        )}
      </div>

      <aside className="w-full lg:w-80 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FaPlayCircle className="text-green-600" /> Chapters
        </h3>

        <div className="space-y-2 max-h-[70vh] overflow-auto">
          {lectures.map((lec, idx) => {
            const isCompleted = completedLectures.includes(String(lec._id));
            return (
              <div
                key={String(lec._id)}
                onClick={() => setActiveLecture(lec)}
                className={`flex justify-between items-center p-2 rounded cursor-pointer border ${
                  isCompleted
                    ? "bg-green-50 border-green-200"
                    : "hover:bg-gray-50 border-gray-100"
                }`}
              >
                <div>
                  <div className="font-medium">
                    {idx + 1}. {lec.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {lec.isFreePreview ? "Preview" : "Full"}
                  </div>
                </div>

                <div className="text-sm">
                  {isCompleted ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaLock className="text-gray-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              router.push(`dashboard/student/my-courses/${courseId}/quiz`);
            }}
            className="btn btn-primary btn-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </aside>
    </div>
  );
}
