"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const EMOJI = {
  "Web Development": "💻",
  Business: "📈",
  Design: "🎨",
  Marketing: "📣",
  Photography: "📷",
  "Data Science": "📊",
  Languages: "🗣️",
  default: "📂",
};

export default function CategoriesPage() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/summary")
      .then((r) => r.json())
      .then((j) => {
        if (j?.success && j.data?.categories) {
          setCats(j.data.categories);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Explore Categories
        </h2>
        <p className="text-gray-600 mb-14 text-lg">
          Choose from our wide range of course categories designed to help you
          achieve your learning goals
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full">
          {cats.map((cat) => (
            <div
              key={cat.category}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer 
              transition transform hover:-translate-y-2 hover:scale-105 flex flex-col items-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 text-3xl shadow-sm">
                {EMOJI[cat.category] || EMOJI.default}
              </div>

              <h3 className="mt-4 font-semibold text-gray-800 text-lg">
                <Link href={`/all-course/${cat.category}`}>{cat.category}</Link>
              </h3>

              <p className="text-sm text-gray-500 mt-1">{cat.count} Courses</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
