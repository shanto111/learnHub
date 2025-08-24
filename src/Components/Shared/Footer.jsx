"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            About
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="hover:text-purple-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/mission"
                className="hover:text-purple-400 transition"
              >
                Our Mission
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:text-purple-400 transition"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link href="/press" className="hover:text-purple-400 transition">
                Press
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Courses
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/courses"
                className="hover:text-purple-400 transition"
              >
                All Courses
              </Link>
            </li>
            <li>
              <Link
                href="/courses/free"
                className="hover:text-purple-400 transition"
              >
                Free Courses
              </Link>
            </li>
            <li>
              <Link
                href="/courses/premium"
                className="hover:text-purple-400 transition"
              >
                Premium
              </Link>
            </li>
            <li>
              <Link
                href="/certificates"
                className="hover:text-purple-400 transition"
              >
                Certificates
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Support
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/help" className="hover:text-purple-400 transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-purple-400 transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-purple-400 transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/chat" className="hover:text-purple-400 transition">
                Live Chat
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Stay Updated
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            Subscribe to get the latest courses and updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full rounded-r-none bg-gray-800 border-gray-700 text-gray-200 focus:border-purple-500"
            />
            <button className="btn bg-purple-600 border-0 rounded-l-none hover:bg-purple-700 transition">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-600 p-3 rounded-xl shadow-lg">🎓</div>
            <span className="font-bold text-white text-xl">LearnHub</span>
          </div>

          <div className="flex space-x-5 text-gray-400 text-lg">
            <Link href="#">
              <FaFacebookF className="hover:text-purple-400 transition" />
            </Link>
            <Link href="#">
              <FaTwitter className="hover:text-purple-400 transition" />
            </Link>
            <Link href="#">
              <FaInstagram className="hover:text-purple-400 transition" />
            </Link>
            <Link href="#">
              <FaLinkedinIn className="hover:text-purple-400 transition" />
            </Link>
            <Link href="#">
              <FaYoutube className="hover:text-purple-400 transition" />
            </Link>
          </div>

          <div className="text-sm text-gray-400 text-center md:text-right">
            © 2024 LearnHub. All rights reserved.
            <Link href="/privacy" className="ml-4 hover:text-purple-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="ml-4 hover:text-purple-400">
              Terms of Service
            </Link>
            <Link href="/cookies" className="ml-4 hover:text-purple-400">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
