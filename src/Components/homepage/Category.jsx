"use client";

import {
  FaCode,
  FaChartLine,
  FaPaintBrush,
  FaBullhorn,
  FaCamera,
  FaLanguage,
} from "react-icons/fa";

const categories = [
  {
    name: "Programming",
    courses: 120,
    icon: <FaCode className="text-blue-600 text-2xl" />,
    bg: "bg-blue-100",
  },
  {
    name: "Business",
    courses: 95,
    icon: <FaChartLine className="text-green-600 text-2xl" />,
    bg: "bg-green-100",
  },
  {
    name: "Design",
    courses: 78,
    icon: <FaPaintBrush className="text-purple-600 text-2xl" />,
    bg: "bg-purple-100",
  },
  {
    name: "Marketing",
    courses: 67,
    icon: <FaBullhorn className="text-red-600 text-2xl" />,
    bg: "bg-red-100",
  },
  {
    name: "Photography",
    courses: 45,
    icon: <FaCamera className="text-yellow-600 text-2xl" />,
    bg: "bg-yellow-100",
  },
  {
    name: "Languages",
    courses: 89,
    icon: <FaLanguage className="text-indigo-600 text-2xl" />,
    bg: "bg-indigo-100",
  },
];

export default function CategoriesPage() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Explore Categories
        </h2>
        <p className="text-gray-500 mb-12">
          Choose from our wide range of course categories designed to help you
          achieve your learning goals
        </p>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 w-full">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 flex items-center justify-center mx-auto rounded-full ${cat.bg}`}
              >
                {cat.icon}
              </div>
              <h3 className="mt-4 font-semibold text-gray-800">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.courses} Courses</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
