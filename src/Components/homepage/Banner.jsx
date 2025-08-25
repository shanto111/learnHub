"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaProjectDiagram,
  FaCertificate,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import axios from "axios";

export default function Banner() {
  const [statsCounts, setStatsCounts] = useState({
    totalCourses: null,
    totalTeachers: null,
    totalStudents: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/summary")
      .then((res) => {
        if (res.data.success) {
          setStatsCounts(res.data.data);
        } else {
          setStatsCounts({
            totalCourses: 0,
            totalTeachers: 0,
            totalStudents: 0,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setStatsCounts({
          totalCourses: 0,
          totalTeachers: 0,
          totalStudents: 0,
        });
        setLoading(false);
      });
  }, []);

  const stats = [
    {
      label: "Total Courses",
      value:
        loading || statsCounts.totalCourses === null
          ? "..."
          : String(statsCounts.totalCourses),
      icon: <FaChalkboardTeacher />,
    },
    {
      label: "Teachers",
      value:
        loading || statsCounts.totalTeachers === null
          ? "..."
          : String(statsCounts.totalTeachers),
      icon: <FaUserGraduate />,
    },
    {
      label: "Students",
      value:
        loading || statsCounts.totalStudents === null
          ? "..."
          : String(statsCounts.totalStudents),
      icon: <FaCertificate />,
    },
  ];

  return (
    <section className="bg-base-300 py-16">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-xl">
            <p className="inline-block mb-4 rounded-full bg-indigo-50 text-indigo-600 px-3 py-1 text-sm font-medium shadow-sm">
              NEW • Live classes
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mt-3">
              Your Journey to Knowledge Starts Here
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600">
              Explore a world of high-quality courses taught by industry
              experts. Learn at your own pace and reach your goals with
              practical projects and mentor support.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn btn-primary btn-md shadow-md transform transition hover:-translate-y-0.5">
                Start Learning Now
              </button>
              <button className="btn btn-ghost btn-md border border-slate-200 text-slate-700">
                Explore Courses
              </button>
            </div>

            {/* small features */}
            <div className="mt-6 flex gap-3 flex-wrap text-sm">
              <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2">
                <FaProjectDiagram className="text-indigo-500" />
                Project-based
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2">
                <FaCertificate className="text-indigo-500" />
                Certificate
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform transition hover:scale-[1.02]">
              <Image
                src={`/images/bannerImg.webp`}
                alt="Students learning"
                width={600}
                height={520}
                className="w-full h-[420px] object-cover rounded-2xl"
                priority
              />
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-28px] w-full max-w-[720px] px-4">
              <div className="flex flex-wrap justify-center gap-4">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center min-w-[150px] bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 text-center backdrop-blur-sm hover:shadow-xl transition"
                  >
                    <div className="text-indigo-500 text-xl">{s.icon}</div>
                    <div className="text-xs text-slate-400 uppercase mt-1">
                      {s.label}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="hidden lg:block absolute -right-10 -top-10 w-40 h-40 rounded-full bg-indigo-100/50 blur-3xl"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
