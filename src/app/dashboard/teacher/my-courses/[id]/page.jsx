"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlay, FaPlusCircle, FaTrashAlt, FaFileAlt } from "react-icons/fa";
import { FiRefreshCw, FiX } from "react-icons/fi";
import axios from "axios";

export default function ManageLecturerQuiz() {
  const { id } = useParams(); // courseId
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLecture, setActiveLecture] = useState(null);

  const fetchLectures = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/teacher/lectures?courseId=${id}`);
      setLectures(res.data.lectures || []);
    } catch (err) {
      console.error("Error fetching lectures:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, [id]);

  const handleDelete = async (lectureId) => {
    if (!confirm("Are you sure you want to delete this lecture?")) return;
    try {
      await axios.delete(`/api/teacher/lectures/${lectureId}?courseId=${id}`);
      fetchLectures();
    } catch (err) {
      console.error("Error deleting lecture:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto rounded-2xl overflow-hidden shadow-lg border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/60 backdrop-blur-sm p-6 md:flex md:items-center md:justify-between gap-6 transition-all duration-300 hover:shadow-xl">
        <div className="md:flex-1">
          <h1 className="text-3xl font-extrabold text-indigo-800 drop-shadow-sm">
            🎓 Lecturers Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            এই পেজ থেকে Lecturer যোগ, Quiz তৈরি ও দ্রুত ওভারভিউ দেখা যাবে
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-3">
          <button
            onClick={() =>
              (window.location.href = `/dashboard/teacher/my-courses/${id}/add-lecturer`)
            }
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            <FaPlusCircle size={18} /> Add Lecturer
          </button>
          <button className="px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-700 font-medium shadow hover:bg-yellow-100 hover:scale-105 transition flex items-center gap-2">
            <FaFileAlt size={18} /> Add Quiz
          </button>
          <button
            onClick={fetchLectures}
            className="px-4 py-2 rounded-lg bg-white border text-gray-700 shadow hover:bg-gray-50 hover:scale-105 transition flex items-center gap-2"
          >
            <FiRefreshCw size={18} /> Refresh
          </button>
        </div>
      </div>

      {/* Lectures List */}
      <div className="max-w-[1280px] mx-auto  gap-6">
        <div className="md:col-span-2 bg-white/90 backdrop-blur-md border rounded-2xl shadow-sm p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              📚 Lectures Preview
            </h2>
            <span className="text-sm text-gray-500">
              Showing {lectures.length}
            </span>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : lectures.length === 0 ? (
            <p className="text-gray-500">এই কোর্সে কোনো লেকচার নেই।</p>
          ) : (
            <div className="space-y-3 max-w-full mx-auto">
              {lectures.map((lec) => (
                <div
                  key={lec._id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-white to-indigo-50/40 hover:shadow-md hover:scale-[1.01] transition-all duration-200"
                >
                  <div>
                    <div className="font-medium text-indigo-800">
                      {lec.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {lec.lecturerName || "Unknown"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveLecture(lec)}
                      className="text-sm px-3 py-1 rounded bg-indigo-50 border text-indigo-700 flex items-center gap-1 hover:bg-indigo-100 transition"
                    >
                      <FaPlay size={14} /> Watch
                    </button>
                    <button className="text-sm px-3 py-1 rounded bg-yellow-50 border text-yellow-700 flex items-center gap-1 hover:bg-yellow-100 transition">
                      <FaFileAlt size={14} /> Quiz
                    </button>
                    <button
                      onClick={() => handleDelete(lec._id)}
                      className="text-sm px-3 py-1 rounded bg-red-50 border text-red-700 flex items-center gap-1 hover:bg-red-100 transition"
                    >
                      <FaTrashAlt size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <button className="text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white hover:shadow-md hover:scale-105 transition">
              View All Lectures
            </button>
          </div>
        </div>
      </div>

      {/* Video Sidebar / Popup */}
      {activeLecture && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full  bg-white p-6 shadow-xl relative flex flex-col rounded-l-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveLecture(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <FiX size={24} />
            </button>

            {/* Lecture Info */}
            <h3 className="text-xl font-bold mb-3">{activeLecture.title}</h3>
            <p className="text-sm text-gray-500 mb-4">
              Lecturer: {activeLecture.lecturerName || "Unknown"}
            </p>

            {/* Video Player */}
            <video
              src={activeLecture.videoUrl}
              controls
              className="w-full rounded-lg shadow-md"
            />

            {/* Footer Actions */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setActiveLecture(null)}
                className="px-4 py-2 rounded-lg bg-red-50 border text-red-700 hover:bg-red-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
