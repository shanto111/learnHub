"use client";

import Navbar from "../Shared/Navbar";
import Banner from "./Banner";
import CategoriesPage from "./Category";
import PopularCoursePage from "./PopularCourse";
import OurTeachers from "./Teacher";
import WhyChooseUs from "./WhyChooseUs";

export default function HomePage() {
  return (
    <section className="min-h-screen">
      <Banner></Banner>
      <CategoriesPage></CategoriesPage>
      <PopularCoursePage></PopularCoursePage>
      <OurTeachers></OurTeachers>
      <WhyChooseUs></WhyChooseUs>
    </section>
  );
}
