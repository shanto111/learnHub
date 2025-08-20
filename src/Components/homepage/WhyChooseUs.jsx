"use client";

import {
  FaChalkboardTeacher,
  FaInfinity,
  FaCertificate,
  FaClock,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaChalkboardTeacher className="text-4xl text-primary" />,
      title: "Expert Instructors",
      desc: "Learn from industry experts with years of teaching and real-world experience.",
    },
    {
      icon: <FaInfinity className="text-4xl text-primary" />,
      title: "Lifetime Access",
      desc: "Once enrolled, enjoy lifetime access to your courses and resources.",
    },
    {
      icon: <FaCertificate className="text-4xl text-primary" />,
      title: "Certified Courses",
      desc: "Earn recognized certificates to boost your career and showcase your skills.",
    },
    {
      icon: <FaClock className="text-4xl text-primary" />,
      title: "Flexible Learning",
      desc: "Learn anytime, anywhere at your own pace with mobile-friendly content.",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-3">Why Choose Us</h2>
        <p className="text-gray-500 mb-12">
          Discover the key reasons why thousands of students trust our platform
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="card bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 p-6 rounded-2xl"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
