"use client";
import {
  FaBookOpen,
  FaClock,
  FaCheckCircle,
  FaUserFriends,
} from "react-icons/fa";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center gap-4">
            <FaBookOpen className="text-3xl text-blue-500" />
            <div>
              <h3 className="text-lg font-bold">Enrolled Courses</h3>
              <p className="text-2xl">12</p>
              <span className="text-green-500 text-sm">↑ 2 new this month</span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-3xl text-green-500" />
            <div>
              <h3 className="text-lg font-bold">Completed</h3>
              <p className="text-2xl">8</p>
              <span className="text-green-500 text-sm">
                ↑ 67% completion rate
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center gap-4">
            <FaClock className="text-3xl text-yellow-500" />
            <div>
              <h3 className="text-lg font-bold">Assignments Due</h3>
              <p className="text-2xl">5</p>
              <span className="text-red-500 text-sm">⚠ 2 due this week</span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center gap-4">
            <FaUserFriends className="text-3xl text-purple-500" />
            <div>
              <h3 className="text-lg font-bold">Study Hours</h3>
              <p className="text-2xl">34</p>
              <span className="text-green-500 text-sm">↑ This week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses and Calendar */}
      <div className="grid grid-cols-3 gap-6">
        {/* Courses */}
        <div className="col-span-2 bg-white shadow rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-bold">Current Courses</h3>
            <a className="text-blue-500">View All</a>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Advanced Web Development</h4>
              <p className="text-sm text-gray-500">Prof. Sarah Chen</p>
              <progress
                className="progress progress-primary w-full"
                value="75"
                max="100"
              ></progress>
              <p className="text-sm">Next: React Hooks</p>
            </div>
            <div>
              <h4 className="font-semibold">Data Science Fundamentals</h4>
              <p className="text-sm text-gray-500">Dr. Michael Roberts</p>
              <progress
                className="progress progress-info w-full"
                value="45"
                max="100"
              ></progress>
              <p className="text-sm">Next: Machine Learning</p>
            </div>
            <div>
              <h4 className="font-semibold">UI/UX Design Principles</h4>
              <p className="text-sm text-gray-500">Anna Martinez</p>
              <progress
                className="progress progress-warning w-full"
                value="0"
                max="100"
              ></progress>
              <p className="text-sm">Starting Soon</p>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4">March 2024</h3>
          <div className="calendar">📅 Calendar Placeholder</div>
        </div>
      </div>
    </div>
  );
}
