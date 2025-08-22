"use client";

import {
  FaGraduationCap,
  FaBookOpen,
  FaClipboard,
  FaStar,
  FaCircle,
} from "react-icons/fa";

export default function TeacherDashboardPage() {
  const stats = [
    {
      icon: <FaGraduationCap></FaGraduationCap>,
      title: "Total Enrrol Student",
      value: "১২৮",
    },
    {
      icon: <FaBookOpen></FaBookOpen>,
      title: "Total Course",
      value: "৬",
    },
    {
      icon: <FaClipboard></FaClipboard>,
      title: "Total Quiz",
      value: "২৪",
    },
    { icon: <FaStar></FaStar>, title: "Total Revenu", value: "833" },
  ];

  const recentCourses = [
    {
      title: "উচ্চতর গণিত - ক্লাসক্লাস",
      students: 145,
      weeks: 12,
      status: "সক্রিয়",
    },
    {
      title: "লিনিয়ার অ্যালজেবরা",
      students: 98,
      weeks: 10,
      status: "সক্রিয়",
    },
    {
      title: "পরিসংখ্যান ও সম্ভাবনা",
      students: 62,
      weeks: 8,
      status: "প্রস্তুত",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl text-indigo-600">
                {s.icon}
              </div>
              <div>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-gray-500">{s.title}</div>
                <div className="text-xs text-green-500 mt-2">{s.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* two-column content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Recent courses list */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">সাম্প্রতিক কোর্সসমূহ</h3>
            <button className="btn btn-sm btn-ghost">সব দেখুন</button>
          </div>

          <div className="space-y-4">
            {recentCourses.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg border"
              >
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                  <img
                    src={`/api/placeholder?img=${i}`}
                    alt="thumb"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{c.title}</div>
                  <div className="text-xs text-gray-500 mt-1 flex gap-4">
                    <span>👥 {c.students} শিক্ষার্থী</span>
                    <span>⏱ {c.weeks} সপ্তাহ</span>
                  </div>
                </div>
                <div>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      c.status === "সক্রিয়"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">সাম্প্রতিক কার্যক্রম</h3>
          <ul className="space-y-3">activities</ul>
        </div>
      </div>

      {/* wide content: placeholder for other cards */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="font-semibold mb-3">নোটিশ ও গুরুত্বপূর্ণ তথ্য</h4>
        <p className="text-sm text-gray-600">
          এখানে আপনি স্কুল/ক্লাস সম্পর্কিত নোটিশ, গুরুত্বপূর্ণ আপডেট বা রিপোর্ট
          দেখতে পারবেন। আপনার চাহিদা অনুযায়ী আমি এগুলোকে API ডেটা থেকে রেন্ডার
          করে দিতে পারি।
        </p>
      </div>
    </div>
  );
}
