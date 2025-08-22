"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0 });

  useEffect(() => {
    axios
      .get("/api/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Drawer layout */}
      <div className="drawer lg:drawer-open">
        <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main content */}
        <div className="drawer-content flex flex-col">
          {/* Page Content */}
          <main className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="stat bg-base-100 shadow rounded-xl">
                <div className="stat-title">Total Users</div>
                <div className="stat-value text-primary">
                  {stats.totalUsers}
                </div>
              </div>
              <div className="stat bg-base-100 shadow rounded-xl">
                <div className="stat-title">Courses</div>
                <div className="stat-value text-secondary">
                  {stats.totalCourses}
                </div>
              </div>
              <div className="stat bg-base-100 shadow rounded-xl">
                <div className="stat-title">Revenue</div>
                <div className="stat-value text-accent">$32.5k</div>
                <div className="stat-desc">↗︎ 15% from last month</div>
              </div>
            </div>

            {/* Recent table */}
            <div className="bg-base-100 p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Enrollments</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Hasan</td>
                      <td>React Basics</td>
                      <td>2025-08-21</td>
                      <td>
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Ayesha</td>
                      <td>Node.js Mastery</td>
                      <td>2025-08-20</td>
                      <td>
                        <span className="badge badge-warning">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Rahim</td>
                      <td>MongoDB Pro</td>
                      <td>2025-08-18</td>
                      <td>
                        <span className="badge badge-error">Cancelled</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
