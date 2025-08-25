"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaClipboardList,
  FaPenFancy,
  FaEnvelope,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaBell,
} from "react-icons/fa";

export default function TeacherDashboardLayout({ children }) {
  const pathname = usePathname() || "";
  const router = useRouter();

  const { data: session, status } = useSession();
  console.log("session", session);

  const TeacherName = session?.user?.name;
  const role = session?.user?.role;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navItems = [
    {
      href: "/dashboard/teacher",
      label: "Dashboard",
      icon: <FaTachometerAlt></FaTachometerAlt>,
    },
    {
      href: "/dashboard/teacher/add-course",
      label: "Add Course",
      icon: <FaBook></FaBook>,
    },
    {
      href: "/dashboard/teacher/my-courses",
      label: "My Courses",
      icon: <FaUsers></FaUsers>,
    },
    {
      href: "/dashboard/teacher/Marks",
      label: "Marks",
      icon: <FaPenFancy></FaPenFancy>,
    },
    {
      href: "/dashboard/teacher/messages",
      label: "Messsage",
      icon: <FaEnvelope></FaEnvelope>,
    },
    {
      href: "/dashboard/teacher/calendar",
      label: "Calendar",
      icon: <FaCalendarAlt></FaCalendarAlt>,
    },
    {
      href: "/dashboard/teacher/reports",
      label: "Report",
      icon: <FaChartLine></FaChartLine>,
    },
    {
      href: "/dashboard/teacher/settings",
      label: "Settings",
      icon: <FaCog></FaCog>,
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-600">
      <aside className="w-72 bg-white/95 backdrop-blur-sm shadow-2xl flex flex-col justify-between">
        <div>
          <div className="px-6 py-6 border-b">
            <h1 className="text-2xl font-extrabold text-indigo-600">
              LearnHub
            </h1>
            <p className="text-sm text-gray-500">Teacher Panel</p>
          </div>

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
                <span className="font-semibold">{TeacherName}</span>
                <button
                  onClick={() => {}}
                  className="text-white/80 text-sm hover:text-white"
                  title="অপশন"
                >
                  ▾
                </button>
              </div>
              <p className="text-xs">{role}</p>
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

      {/* Main area */}
      <main className="flex-1 p-6 overflow-auto">
        {/* header */}
        <header className="mb-6">
          <div className="flex bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-2 justify-between items-center gap-6 border border-gray-100">
            <div className="flex-1 flex items-center gap-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome Back, {TeacherName}!
              </h2>

              <div className="relative w-80">
                <input
                  type="text"
                  placeholder="🔍  Search courses, students..."
                  className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-300 placeholder:text-gray-400 text-gray-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <button className="relative p-3 rounded-full bg-white/80 shadow-md hover:shadow-lg hover:bg-gray-50 transition duration-300">
                <FaBell className="text-xl text-gray-600" />

                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              <div className="flex items-center px-3 py-2 ">
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="me"
                  className="w-12 h-12 rounded-full border-2 border-gray-200"
                />
              </div>
            </div>
          </div>
        </header>

        <section>{children}</section>
      </main>
    </div>
  );
}
