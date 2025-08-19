"use client";

export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-20 gap-10">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Learn Without <span className="text-yellow-300">Limits</span>
          </h1>
          <p className="text-white/90 text-lg max-w-lg">
            Discover thousands of courses from world-class instructors. Build
            skills that matter for your career and personal growth.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button className="btn bg-yellow-400 border-0 hover:bg-yellow-500 text-black font-semibold px-6 rounded-full shadow-lg transition-all duration-300">
              Start Learning Today
            </button>
            <button className="btn border border-white text-white hover:bg-white hover:text-purple-600 rounded-full px-6 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Side Single Image */}
        <div className="flex-1 w-full max-w-lg">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="/banner1.png"
              alt="Learning Banner"
              className="w-full h-[350px] object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
            />

            {/* Floating Icons Example */}
            <div className="absolute top-5 left-5 bg-white/80 p-3 rounded-full shadow-lg animate-bounce">
              📘
            </div>
            <div className="absolute bottom-10 right-10 bg-white/80 p-3 rounded-full shadow-lg animate-pulse">
              🎥
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg animate-spin-slow">
              📊
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
