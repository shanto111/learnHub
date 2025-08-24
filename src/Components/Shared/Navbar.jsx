"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-6 lg:px-12 py-3  shadow-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/20 font-extrabold text-lg">
            EL
          </div>
          <span className="text-xl font-bold">EduLearn</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l, i) => (
            <Link
              key={i}
              href={l.href}
              className="relative group text-sm font-medium"
            >
              {l.name}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <form className="hidden md:flex items-center bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
            <input
              placeholder="Search..."
              className="bg-transparent text-sm outline-none text-white placeholder-gray-200 px-2"
            />
            <button
              type="submit"
              className="p-1 rounded-full hover:bg-white/20 transition"
            >
              <FaSearch size={14} />
            </button>
          </form>

          <Link
            href="/login"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white text-indigo-700 font-medium shadow hover:bg-gray-100 transition"
          >
            <FaUserCircle size={18} /> Login
          </Link>

          <Link
            href="/become-teacher"
            className="hidden md:block px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold shadow hover:bg-yellow-300 transition"
          >
            Become a Teacher
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/20"
            onClick={() => setIsOpen((s) => !s)}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white text-gray-800 border-t shadow-lg">
          <div className="px-6 py-4 space-y-4">
            <form className="flex items-center bg-gray-100 rounded-full px-3 py-2">
              <input
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button type="submit" className="text-indigo-600">
                <FaSearch />
              </button>
            </form>

            <div className="flex flex-col space-y-2">
              {navLinks.map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  {l.name}
                </Link>
              ))}

              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md bg-indigo-600 text-white text-center"
              >
                <FaUserCircle className="inline mr-2" /> Login
              </Link>

              <Link
                href="/become-teacher"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md bg-yellow-400 text-gray-900 text-center font-semibold"
              >
                Become a Teacher
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
