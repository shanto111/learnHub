"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

// 🔹 Demo Teacher Data (static)
const teachers = [
  {
    id: 1,
    name: "Hasibul Hasan",
    subject: "Web Development",
    photo:
      "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
    bio: "Expert in MERN Stack with 5+ years experience.",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Sadia Akter",
    subject: "UI/UX Design",
    photo:
      "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
    bio: "Creative designer focusing on smooth user experience.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Rakibul Islam",
    subject: "Digital Marketing",
    photo:
      "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
    bio: "Specialist in SEO & social media growth strategies.",
    rating: 4.7,
  },
];

export default function OurTeachers() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Our Expert Teachers
          </h2>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            Meet the passionate mentors who will help you grow and succeed.
          </p>
        </div>

        {/* Teacher Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="group bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:bg-white/90"
            >
              {/* Image */}
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-200 shadow-md group-hover:scale-110 transition-transform duration-500">
                <Image
                  src={teacher.photo}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="mt-6 text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {teacher.name}
              </h3>
              <p className="text-base text-gray-500 italic">
                {teacher.subject}
              </p>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {teacher.bio}
              </p>

              {/* Rating */}
              <div className="flex justify-center items-center gap-1 mt-4 text-yellow-500">
                <FaStar className="animate-pulse" />
                <span className="font-semibold text-gray-700">
                  {teacher.rating}
                </span>
              </div>

              {/* Button */}
              <button className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
