"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaChalkboardTeacher,
  FaClipboardList,
  FaPenFancy,
  FaEnvelope,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaUsers,
} from "react-icons/fa";

export default function StudentDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navItems = [
    {
      href: "/dashboard/student",
      label: "Dashboard",
      icon: <FaTachometerAlt></FaTachometerAlt>,
    },
    {
      href: "/dashboard/student/all-course",
      label: "All Courses",
      icon: <FaBookOpen></FaBookOpen>,
    },
    {
      href: "/dashboard/student/my-courses",
      label: "My Courses",
      icon: <FaChalkboardTeacher></FaChalkboardTeacher>,
    },
    {
      href: "/dashboard/student/SupportSection",
      label: "Support",
      icon: <FaClipboardList></FaClipboardList>,
    },
    {
      href: "/dashboard/student/exams",
      label: "Quizzes",
      icon: <FaPenFancy></FaPenFancy>,
    },
    {
      href: "/dashboard/student/payment-history",
      label: "Payment History",
      icon: <FaEnvelope></FaEnvelope>,
    },
    {
      href: "/dashboard/student/calendar",
      label: "Calendar",
      icon: <FaCalendarAlt></FaCalendarAlt>,
    },
    {
      href: "/dashboard/student/progress",
      label: "Progress Report",
      icon: <FaChartLine></FaChartLine>,
    },
    {
      href: "/dashboard/student/settings",
      label: "Settings",
      icon: <FaCog></FaCog>,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-600">
      <aside className="w-80 bg-white shadow-lg flex flex-col justify-between border-r">
        <div>
          <h1 className="text-2xl font-bold px-6 py-4 border-b">LearnHub</h1>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    active
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white/60"
                  }`}
                >
                  <span
                    className={`text-lg ${
                      active ? "opacity-100" : "text-indigo-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="m-4 p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/48?img=12"
              alt="teacher"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">name</span>
                <button
                  onClick={() => {}}
                  className="text-white/80 text-sm hover:text-white"
                  title="option"
                >
                  ▾
                </button>
              </div>
              <p className="text-xs">role</p>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => router.push("/dashboard/teacher/profile")}
              className="btn btn-ghost btn-sm bg-white/20 text-white flex-1"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Alex!</h2>
            <p className="text-gray-500">
              Ready to continue your learning journey?
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn btn-ghost btn-circle">
              <span className="indicator">
                🔔
                <span className="indicator-item badge badge-error"></span>
              </span>
            </button>
            <img src="user.jpg" alt="user" className="rounded-full border" />
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
