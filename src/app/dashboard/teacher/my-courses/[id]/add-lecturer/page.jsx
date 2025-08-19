"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddLecturerPage() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

  // --- ফাংশন: ফর্ম সাবমিট (ভিডিও আপলোড) ---
  const onSubmit = async (data) => {
    setMessage("");
    setError("");

    const file = data.video?.[0];
    if (!file) {
      setError("Please select the video!!");
      return;
    }
    if (!file.type.startsWith("video/")) {
      setError("File must be a valid video type (mp4, mov, etc)");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError(
        `File size exceeds ${(MAX_SIZE_BYTES / (1024 * 1024)).toFixed(2)} MB`
      );
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("video", file);
      formData.append("lecturerName", data.lecturerName || "Unknown");
      formData.append("courseId", id);
      formData.append(
        "title",
        data.title || data.lecturerName || "Untitled Lecture"
      );

      const res = await axios.post("/api/teacher/upload-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) => {
          if (!p.total) return;
          const percent = Math.round((p.loaded * 100) / p.total);
          setProgress(percent);
        },
      });

      if (res.data?.success) {
        setMessage("Lecturer and video uploaded successfully!");
        reset();
        setProgress(0);
      } else {
        setError(res.data?.error || "Upload failed");
      }
    } catch (err) {
      console.error("upload err:", err);
      setError(err.response?.data?.error || err.message || "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  // --- UI ---
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Card */}
      <div className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-indigo-700 mb-2 text-center">
          📚 Lecturer ম্যানেজার
        </h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Course ID: <span className="font-semibold text-indigo-600">{id}</span>
        </p>

        {/* Upload Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Lecture Title
            </label>
            <input
              {...register("title")}
              placeholder="Lecture title (optional)"
              className="w-full border border-indigo-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Lecturer Name
            </label>
            <input
              {...register("lecturerName", { required: true })}
              placeholder="Lecturer এর নাম লিখুন"
              className="w-full border border-indigo-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Video File (≤ 50MB)
            </label>
            <input
              type="file"
              accept="video/*"
              {...register("video", { required: true })}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-1">📏 নিরাপদ সাইজ: ≤ 50MB</p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="submit"
              disabled={uploading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {uploading
                ? `⏳ Uploading... (${progress}%)`
                : "🚀 Upload Lecturer"}
            </button>

            <button
              type="button"
              onClick={() => {
                reset();
                setMessage("");
                setError("");
              }}
              className="bg-white border border-indigo-200 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Reset
            </button>
          </div>

          {progress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 bg-indigo-600"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {message && (
            <p className="text-green-600 text-center font-medium">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
