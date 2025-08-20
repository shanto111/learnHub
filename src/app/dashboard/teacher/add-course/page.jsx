"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function AddCoursePage() {
  const router = useRouter();
  const [thumbnailLink, setThumbnailLink] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <>loding...</>;
  }
  const TeacherId = session?.user?.id;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [serverError, setServerError] = useState("");
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
        formData
      );
      if (res.data.success) {
        setThumbnailLink(res.data.data.display_url);
      } else {
        Swal.fire("❌ Thumbnail upload failed");
      }
    } catch (error) {
      Swal.fire("❌ Thumbnail upload error");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setServerError("");
    try {
      if (thumbnailLink) data.thumbnail = thumbnailLink;
      data.status = "draft";
      data.teacherId = TeacherId;
      data.rejectionReason = null;
      data.isFeatured = false;
      data.meta = {
        totalLectures: 0,
        totalDuration: 0,
      };
      data.createdAt = new Date().toISOString();
      data.updatedAt = new Date().toISOString();
      data.publishedAt = null;
      const res = await axios.post("/api/teacher/add-course", data);
      console.log("response", res);
      if (res?.data) {
        reset();
        setThumbnailLink(null);
        Swal.fire("✅ Course added successfully");
      }
    } catch (err) {
      console.error(err);
      setServerError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add Course</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Course Title *
            </label>
            <input
              type="text"
              {...register("title", { required: "Course title is required" })}
              className={`input input-bordered w-full ${
                errors.title ? "input-error" : ""
              }`}
              placeholder="e.g. Advanced Mathematics"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Short description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Short Description *
            </label>
            <input
              type="text"
              {...register("shortDescription", {
                required: "Short description is required",
              })}
              className={`input input-bordered w-full ${
                errors.shortDescription ? "input-error" : ""
              }`}
              placeholder="Brief summary of the course"
            />
            {errors.shortDescription && (
              <p className="text-sm text-red-600 mt-1">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          {/* Long description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Long Description
            </label>
            <textarea
              {...register("longDescription")}
              rows={5}
              className="textarea textarea-bordered w-full"
              placeholder="Course content, syllabus, who it's for..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                {...register("category")}
                className="input input-bordered w-full"
                placeholder="Mathematics, Science, Programming..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Duration (weeks)
              </label>
              <input
                type="number"
                {...register("durationWeeks", { valueAsNumber: true })}
                className="input input-bordered w-full"
                placeholder="12"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Price (BDT)
              </label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="input input-bordered w-full"
                placeholder="0"
                min={0}
              />
            </div>
          </div>

          {/* Thumbnail upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Thumbnail (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail")}
              onChange={handleThumbnailUpload}
              className="file-input file-input-bordered w-full"
            />
            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}
            {thumbnailLink && (
              <div className="mt-3">
                <p className="text-sm mb-2">Preview:</p>
                <img
                  src={thumbnailLink}
                  alt="preview"
                  className="w-48 h-32 object-cover rounded-md shadow"
                />
              </div>
            )}
          </div>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "Submitting..." : "Add Course"}
            </button>

            <button
              type="button"
              onClick={() => {
                reset();
                setThumbnailLink(null);
              }}
              className="btn btn-ghost"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
