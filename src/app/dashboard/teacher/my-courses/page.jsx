"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TeacherCourses() {
  const router = useRouter();

  // courses state - ekhane backend theke paoya array store hobe
  const [courses, setCourses] = useState([]);
  // loading state - data load hocche kina indicate korbe
  const [loading, setLoading] = useState(true);
  // search query
  const [q, setQ] = useState("");

  //handleredrect page add-lecturer
  const handleAddPageRediret = () => {};

  // ------------- fetch courses -------------
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/teacher/my-courses") // <-- adjust endpoint jodi apnar backend onno path thake
      .then((res) => {
        // backend du-rokom return korte pare:
        // 1) direct array: res.data === [ ... ]
        // 2) object with courses: res.data = { courses: [...] }
        const d = res.data;
        const arr = Array.isArray(d) ? d : d?.courses ?? [];
        setCourses(arr);
      })
      .catch((e) => {
        console.error("fetch courses error:", e);
        setCourses([]); // error hole empty list set korun
      })
      .finally(() => setLoading(false));
  }, []);

  // ------------- simple search (title diye) -------------
  const filtered = q
    ? courses.filter((c) =>
        (c.title || "").toLowerCase().includes(q.toLowerCase())
      )
    : courses;

  // ------------- publish toggle (optimistic update) -------------
  // backend e PATCH /api/teacher/courses/:id/publish expect kore { status: "published" | "draft" }
  const togglePublish = async (id, currentStatus) => {
    const next = currentStatus === "published" ? "draft" : "published";

    // optimistic UI: age frontend e change dekhiye dei
    setCourses((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status: next } : c))
    );

    try {
      await axios.patch(`/api/teacher/courses/${id}/publish`, { status: next });
    } catch (err) {
      console.error("publish toggle failed:", err);
      // error hole quick refetch kore original restore kore nilam
      try {
        const r = await axios.get("/api/teacher/my-courses");
        const d = r.data;
        setCourses(Array.isArray(d) ? d : d?.courses ?? []);
      } catch {
        // fallback: set empty na kore previous value keep kora jeto, but ekhane simplicity-r jonno ignore
      }
      alert("Status change failed. Check console for details.");
    }
  };

  // ------------- small helpers for UI -------------
  const statusBadge = (s) =>
    s === "published"
      ? "badge badge-success"
      : s === "rejected"
      ? "badge badge-error"
      : "badge badge-warning";

  const fmtPrice = (p) =>
    typeof p === "number" ? p.toLocaleString() + " ৳" : p ? p + " ৳" : "Free";

  // ------------- render -------------
  return (
    <section className="p-6">
      {/* Header: title + counts + search */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">My Courses</h1>
          <p className="text-sm text-white mt-1">
            Showing <strong>{filtered.length}</strong> of
            <strong>{courses.length}</strong>
          </p>
        </div>

        <div className="flex gap-2 items-center">
          {/* search input */}
          <div className="flex items-center bg-base-200 rounded px-3 py-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by course title..."
              className="bg-transparent outline-none text-sm"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="btn btn-xs btn-ghost ml-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Add Course button (navigate to add page) */}
          <button
            onClick={() => router.push("/teacher/courses/new")} // adjust route jodi onno hoy
            className="btn btn-primary"
          >
            Add Course
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12 text-white">Loading courses...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-white">
          No courses found{q ? ` for "${q}"` : ""}.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <article
              key={course._id}
              className="bg-base-100 border rounded-lg shadow-sm hover:shadow-md transition p-0 overflow-hidden"
            >
              {/* Thumbnail area (fallback image provided) */}
              <div className="h-40 w-full">
                <img
                  src={course.thumbnail || "/placeholder-course.jpg"}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-4">
                {/* Title and status/category badges */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <div className="flex text-sm flex-col items-end gap-1">
                    <span className={statusBadge(course.status)}>
                      {course.status ?? "draft"}
                    </span>
                    <span className="badge badge-sm text-sm">
                      {course.category ?? "General"}
                    </span>
                  </div>
                </div>

                {/* short description */}
                <p className="text-xl text-gray-600 mt-2 mb-3">
                  {course.shortDescription ??
                    course.longDescription?.slice(0, 110) + "..."}
                </p>

                {/* small meta row */}
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                  <span className="px-2 py-1 rounded-md bg-base-200">
                    Duration: {course.durationWeeks ?? "—"} w
                  </span>
                  <span className="px-2 py-1 rounded-md bg-base-200">
                    Max students: {course.totalStudents ?? 0}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-base-200">
                    Price: {fmtPrice(course.price)}
                  </span>
                </div>

                {/* actions */}
                <div className="flex items-center justify-between gap-2 mt-3">
                  <div className="flex gap-2">
                    {/* View lectures - navigate */}
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/teacher/my-courses/${course._id}`
                        )
                      }
                      className="btn btn-sm btn-outline"
                    >
                      Manage lecturer and quiz
                    </button>

                    {/* Add lecturer - navigate */}
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/teacher/my-courses/${course._id}/add-lecturer`
                        )
                      }
                      className="btn btn-sm btn-outline"
                    >
                      add lecturer
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {/* publish toggle */}
                    <button
                      onClick={() => togglePublish(course._id, course.status)}
                      className={`btn btn-sm ${
                        course.status === "published"
                          ? "btn-success"
                          : "btn-warning"
                      }`}
                    >
                      {course.status === "published" ? "Published" : "Publish"}
                    </button>

                    {/* details - navigate */}
                    <button
                      onClick={() =>
                        router.push(`/teacher/courses/${course._id}`)
                      }
                      className="btn btn-sm btn-outline"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
