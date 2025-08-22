"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/users").then((res) => {
      setUsers(res.data.users || []);
    });
  }, []);

  const handleRoleChange = async (id, role) => {
    await axios.patch(`/api/admin/users/${id}`, { role });
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/users/${id}`);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        👥 Total Users - ({users.length})
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-xl border border-base-300 bg-white">
        <table className="table w-full text-lg">
          <thead>
            <tr className="bg-base-300 text-base font-semibold">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Current Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="hover:bg-base-100">
                <td>{idx + 1}</td>
                <td className="font-medium">{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  <span
                    className={`badge badge-lg ${
                      user.role === "admin" ? "badge-success" : "badge-neutral"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="text-center space-x-3">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(user._id, "admin")}
                      className="btn btn-sm btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-xl">
                  🚫 No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
