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
  FaSearch,
} from "react-icons/fa";

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname() || "";
  const router = useRouter();

  const { data: session, status } = useSession();

  const AdminName = session?.user?.name;
  const role = session?.user?.role;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navItems = [
    {
      href: "/dashboard/admin",
      label: "Dashboard",
      icon: <FaTachometerAlt></FaTachometerAlt>,
    },
    {
      href: "/dashboard/admin/manage-course",
      label: "All Courses",
      icon: <FaBook></FaBook>,
    },
    {
      href: "/dashboard/admin/manage-users",
      label: "Manage User",
      icon: <FaUsers></FaUsers>,
    },
    {
      href: "/dashboard/admin/payment",
      label: "Payment History",
      icon: <FaPenFancy></FaPenFancy>,
    },
    {
      href: "/dashboard/admin/support",
      label: "Support Message",
      icon: <FaEnvelope></FaEnvelope>,
    },
    {
      href: "/dashboard/teacher/calendar",
      label: "Calendar",
      icon: <FaCalendarAlt></FaCalendarAlt>,
    },
    {
      href: "/dashboard/teacher/settings",
      label: "Settings",
      icon: <FaCog></FaCog>,
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-600">
      <aside className="w-72 bg-white/95 backdrop-blur-sm shadow-2xl  flex flex-col justify-between">
        <div>
          <div className="px-6 py-6 border-b">
            <h1 className="text-2xl font-extrabold text-indigo-600">
              LearnHub
            </h1>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>

          <nav className="p-4 space-y-2">
            {navItems.map((item, idx) => {
              const href = item.href ?? `#${idx}`;
              const active =
                pathname === href ||
                pathname.startsWith(href.endsWith("/") ? href : href + "/");

              return (
                <Link
                  key={`${href}-${idx}`}
                  href={href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all`}
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
                <span className="font-semibold">{AdminName}</span>
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

      <main className="flex-1 p-6 overflow-auto">
        <header className="mb-6">
          <div className="flex bg-white rounded-2xl shadow-lg px-6 py-4 justify-between items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome Back,
                <span className="text-indigo-600">{AdminName}!</span>
              </h2>
            </div>

            <div className="flex-1 max-w-md hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-5">
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <FaBell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-xl cursor-pointer hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white text-xl font-semibold shadow">
                  T
                </div>
                <div className="hidden sm:block">
                  <div className="text-lg font-medium text-gray-800">
                    {AdminName}
                  </div>
                  <div className="text-sm text-gray-500">{role}</div>
                </div>
                <button className="text-gray-400 text-xl">▾</button>
              </div>
            </div>
          </div>
        </header>

        {/* children (page content) */}
        <section>{children}</section>
      </main>
    </div>
  );
}
