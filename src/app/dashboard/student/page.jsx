"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaClock,
  FaCheckCircle,
  FaUserFriends,
  FaCalendarAlt,
} from "react-icons/fa";

const defaultSummary = {
  enrolled: 0,
  completed: 0,
  nextQuiz: { title: "No quiz", date: null },
  studyHours: 0,
  studyGoal: 50,
  studyProgress: 0,
  daysLeft: null,
};

export default function StudentDashboardPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState(defaultSummary);
  const [loading, setLoading] = useState(true);

  const studentId = session?.user?.id;

  useEffect(() => {
    if (status === "loading") return;

    if (!studentId) {
      setLoading(false);
      setData(defaultSummary);
      return;
    }

    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/student/summary", {
          params: { studentId },
        });
        setData(res.data || defaultSummary);
      } catch (err) {
        console.error("Failed to load summary:", err);
        setData(defaultSummary);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [studentId, status]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (!data) return <p className="text-center py-8 text-red-500">No data</p>;

  const {
    enrolled = 0,
    completed = 0,
    nextQuiz = { title: "No quiz", date: null },
    studyHours = 0,
    studyGoal = 50,
    studyProgress = 0,
    daysLeft = null,
  } = data;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Enrolled */}
        <div className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50">
              <FaBookOpen className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Enrolled Courses
              </h3>
              <p className="text-2xl font-bold mt-1">{enrolled}</p>
              <p className="text-xs text-gray-400 mt-1">Keep learning 🎓</p>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-green-100 to-green-50">
              <FaCheckCircle className="text-2xl text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="text-2xl font-bold mt-1">{completed}</p>
              <p className="text-xs text-gray-400 mt-1">
                Great job — keep it up!
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Quiz */}
        <div className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 rounded-xl p-5">
          <div className="flex items-center gap-4 w-full">
            <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50">
              <FaCalendarAlt className="text-2xl text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500">
                Upcoming Quiz
              </h3>
              <p className="text-lg font-semibold mt-1">{nextQuiz.title}</p>
              {nextQuiz.date ? (
                <div className="mt-2 text-xs text-gray-500">
                  <div>Date: {new Date(nextQuiz.date).toLocaleString()}</div>
                  <div>
                    Starts in:{" "}
                    <span className="font-medium text-gray-700">
                      {daysLeft === 0 ? "Today" : `${daysLeft} day(s)`}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-2">No upcoming quiz</p>
              )}
            </div>
          </div>
        </div>

        {/* Study Hours */}
        <div className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 rounded-xl p-5">
          <div className="flex items-center gap-4 w-full">
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50">
              <FaClock className="text-2xl text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500">Study Hours</h3>
              <p className="text-2xl font-bold mt-1">{studyHours}h</p>

              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${studyProgress}%`,
                      background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {studyProgress}% of {studyGoal}h goal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* rest of page (courses, calendar) ... you can keep your existing markup */}
    </div>
  );
}
