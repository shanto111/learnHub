"use client";

import Link from "next/link";

export default function PopularCoursePage() {
  const courses = [
    {
      id: "web-dev",
      title: "Complete Web Development Bootcamp",
      description:
        "Learn HTML, CSS, JavaScript, React, Node.js and become a full-stack developer",
      rating: 4.8,
      reviews: 2341,
      hours: 40,
      lectures: 156,
      price: 89.99,
      oldPrice: 199.99,
      badge: "Bestseller",
      image: "/images/webdev.jpg",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-2">Popular Courses</h2>
      <p className="text-center text-gray-500 mb-8">
        Enhance your skills with our top-rated courses
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure>
              <img
                src={course.image}
                alt={course.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="flex items-center justify-between">
                <span className="badge badge-primary">{course.badge}</span>
                <span className="text-yellow-500">
                  ⭐ {course.rating} ({course.reviews} reviews)
                </span>
              </div>
              <h2 className="card-title mt-2">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>

              <div className="mt-3">
                <p className="text-lg font-bold text-indigo-600">
                  ${course.price}
                </p>
                <p className="line-through text-gray-400 text-sm">
                  ${course.oldPrice}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                ⏱ {course.hours} hours • 📚 {course.lectures} lectures
              </p>

              <div className="card-actions justify-end mt-3">
                <Link href={`/courses/${course.id}`}>
                  <button className="btn btn-primary w-full">Enroll Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
