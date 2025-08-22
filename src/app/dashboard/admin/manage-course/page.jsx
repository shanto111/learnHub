"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/api/admin/courses").then((res) => {
      setCourses(res.data.courses || []);
    });
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/admin/courses/${id}`, { status });
      setCourses((prev) =>
        prev.map((c) => (String(c._id) === String(id) ? { ...c, status } : c))
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Course has been ${status} successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Operation failed, please try again.";
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: msg,
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/admin/courses/${id}`);
        setCourses((prev) => prev.filter((c) => String(c._id) !== String(id)));

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Course has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: "Could not delete the course, please try again.",
        });
      }
    }
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="">
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          🎓 Courses —{" "}
          <span className="text-primary">Total {courses.length}</span>
        </h2>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Search by title or teacher id..."
              className="input input-sm input-bordered"
              onChange={(e) => {
                const q = e.target.value.toLowerCase();
                if (!q) return setCourses((prev) => prev);
                setCourses((prev) => prev.map((x) => x));
              }}
            />
          </div>
          <div className="text-sm text-base-content/60">
            Updated: {new Date().toLocaleString()}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300 bg-white">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-300 text-base font-semibold">
                <th>#</th>
                <th>Course</th>
                <th className="hidden md:table-cell">Thumbnail</th>
                <th className="hidden sm:table-cell">Price</th>
                <th>Teacher</th>
                <th className="text-center">Status</th>
                <th className="text-right">Created</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-lg">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-8 text-lg text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-xl">
                    🚫 No courses found
                  </td>
                </tr>
              ) : (
                courses.map((course, idx) => {
                  const status = course?.status || "draft";
                  const thumbnail = course?.thumbnail || null;
                  const price = course?.price ?? course?.meta?.price ?? null;
                  const teacher = course?.teacherId || "—";
                  const createdAt = course?.createdAt
                    ? new Date(course.createdAt).toLocaleString()
                    : "—";

                  return (
                    <tr key={String(course._id)} className="hover:bg-base-100">
                      <td className="font-medium">{idx + 1}</td>

                      <td className="max-w-[26rem]">
                        <div className="flex items-start gap-3">
                          <div>
                            <div className="font-semibold line-clamp-1">
                              {course?.title || "Untitled"}
                            </div>
                            <div className="text-sm text-base-content/60 line-clamp-2">
                              {course?.shortDescription ||
                                course?.description?.slice?.(0, 80) ||
                                "—"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="hidden md:table-cell">
                        <div className="w-20 h-12 rounded overflow-hidden bg-base-200 flex items-center justify-center">
                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt={course?.title || "thumb"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-sm text-base-content/50">
                              No image
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="hidden sm:table-cell">
                        {price != null ? (
                          <div className="font-medium">
                            {typeof price === "number"
                              ? price.toLocaleString()
                              : price}{" "}
                          </div>
                        ) : (
                          <div className="text-sm text-base-content/60">—</div>
                        )}
                      </td>

                      <td className="">{teacher}</td>

                      <td className="text-center">
                        <span
                          className={`badge badge-lg ${
                            status === "approved"
                              ? "badge-success"
                              : status === "rejected"
                              ? "badge-error"
                              : "badge-neutral"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="text-right text-sm text-base-content/60">
                        {createdAt}
                      </td>

                      <td className="text-center space-x-2">
                        {status !== "approved" && (
                          <button
                            onClick={() => updateStatus(course._id, "approved")}
                            className="btn btn-xs btn-primary"
                          >
                            Approve
                          </button>
                        )}

                        {status !== "rejected" && (
                          <button
                            onClick={() => updateStatus(course._id, "rejected")}
                            className="btn btn-xs btn-warning"
                          >
                            Reject
                          </button>
                        )}

                        <button
                          onClick={() =>
                            window.open(`/courses/${course._id}`, "_blank")
                          }
                          className="btn btn-xs btn-ghost"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDelete(course._id)}
                          className="btn btn-xs btn-error"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
