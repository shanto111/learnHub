"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaPlayCircle, FaLock, FaClock, FaCheckCircle } from "react-icons/fa";

export default function CourseLecturesPage() {
  const { id: courseId } = useParams();
  const [activeLecture, setActiveLecture] = useState(null);
  const qc = useQueryClient();

  // --- fetch course meta (lectures + enrollment) ---
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course-lectures", courseId],
    queryFn: async () => {
      const res = await axios.get(`/api/student/courses/${courseId}`);
      return res.data;
    },
    enabled: !!courseId,
    staleTime: 1000 * 60, // optional: 1min
  });

  // normalize data (your API returns array like [ { lectures: [...], enrollment: {...} } ])
  const meta = Array.isArray(data) ? data[0] || {} : data || {};
  const lectures = Array.isArray(meta.lectures) ? meta.lectures : [];
  const enrollment = meta.enrollment || { completedLectures: [], progress: 0 };

  // create Set of completed ids (strings) to avoid type mismatch issues
  const completedSet = new Set(
    (enrollment.completedLectures || []).map(String)
  );

  // compute completedCount only counting lectures that belong to this course
  const completedCount = lectures.reduce(
    (acc, lec) => acc + (completedSet.has(String(lec._id)) ? 1 : 0),
    0
  );
  const totalCount = lectures.length;
  let progress = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;
  if (progress < 0) progress = 0;
  if (progress > 100) progress = 100;

  // mark-complete mutation (v5 object signature)
  const markComplete = useMutation({
    mutationFn: (lectureId) =>
      axios.post(`/api/student/courses/${courseId}/progress`, { lectureId }),
    onSuccess: () => {
      // refetch latest meta (including updated enrollment)
      qc.invalidateQueries({ queryKey: ["course-lectures", courseId] });
    },
    onError: (err) => {
      console.error("Mark complete failed:", err);
    },
  });

  // current lecture to play
  const current = activeLecture || lectures[0] || null;

  const handleComplete = (lectureId) => {
    if (!lectureId) return;
    if (completedSet.has(String(lectureId))) return; // already done
    markComplete.mutate(lectureId);
  };

  const formatDuration = (sec) => {
    if (!sec) return "00:00";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  if (isLoading) return <div className="p-6">Loading lectures...</div>;
  if (error)
    return <div className="p-6 text-red-600">Error loading lectures</div>;
  if (!lectures.length) return <div className="p-6">No lectures yet</div>;

  return (
    <div className="p-4 lg:flex gap-6">
      {/* Main video area */}
      <div className="flex-1 bg-white p-4 rounded shadow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaPlayCircle className="text-blue-600" />
              {current?.title || "Select a lecture"}
            </h2>
            <p className="text-sm text-gray-500">{meta.title || ""}</p>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">Progress</div>
            <div className="w-36 bg-gray-200 rounded-full h-2 overflow-hidden mt-1">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm text-gray-600 mt-1">{progress}%</div>
            <div className="text-xs text-gray-500 mt-1">
              {completedCount} / {totalCount} completed
            </div>
          </div>
        </div>

        {current ? (
          <>
            <video
              key={String(current._id)} // force reload on lecture change
              controls
              onEnded={() => handleComplete(current._id)}
              className="w-full rounded-md bg-black"
              preload="metadata"
            >
              <source src={current.videoUrl} type="video/mp4" />
              Your browser does not support the video element.
            </video>

            <div className="mt-3 flex items-center gap-3">
              {completedSet.has(String(current._id)) ? (
                <div className="flex items-center gap-2 text-green-600">
                  <FaCheckCircle /> Completed
                </div>
              ) : (
                <button
                  onClick={() => handleComplete(current._id)}
                  disabled={markComplete.isLoading}
                  className="px-3 py-1 border rounded hover:bg-gray-50"
                >
                  {markComplete.isLoading ? "Saving..." : "Mark as complete"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="py-12 text-center text-gray-500">
            Please select a lecture from the list.
          </div>
        )}
      </div>

      {/* Chapters list */}
      <aside className="w-full lg:w-80 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FaPlayCircle className="text-green-600" /> Chapters
        </h3>

        <div className="space-y-2 max-h-[70vh] overflow-auto">
          {lectures.map((lec, idx) => {
            const done = completedSet.has(String(lec._id));
            return (
              <div
                key={String(lec._id)}
                onClick={() => setActiveLecture(lec)}
                className={`flex justify-between items-center p-2 rounded cursor-pointer border ${
                  done
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

                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span>{formatDuration(lec.durationSec)}</span>
                  <span>
                    {done ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : lec.isFreePreview ? (
                      "▶"
                    ) : (
                      <FaLock />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
